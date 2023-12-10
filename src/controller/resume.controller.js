const { default: axios } = require('axios');
const { CLOUDFLARE_DNS_PATH } = require('../constant/cloudflareApiPath');
const {
  getAllData,
  allDataToDb,
  bindSubdomain,
} = require('../services/resumeData.services');

const cloudflareHeader = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
};

const getUserData = async (req, res) => {
  const { uid } = req;
  try {
    let data;
    if (uid?.includes('@')) {
      data = await getAllData({ email: uid });
    } else {
      data = await getAllData({ subDomain: uid });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

const addData = async (req, res) => {
  const { body, userData, editor } = req;
  try {
    if (editor) {
      const data = await allDataToDb(userData.email, body);
      return res.status(200).json({ success: true, data });
    }
    return res
      .status(401)
      .json({ success: false, data: { msg: 'Please login and try again!' } });
  } catch (error) {
    res.status(400).json({ status: false, data: error });
  }
};

const validateDomain = async (req, res) => {
  const { body } = req;
  try {
    const { data } = await axios.get(CLOUDFLARE_DNS_PATH, {
      params: {
        type: 'CNAME',
        name: `${body.subdomain}.${process.env.DOMAIN}`,
      },
      headers: cloudflareHeader,
    });

    if (data.result_info.count === 0) {
      return res
        .status(202)
        .json({ msg: 'Subdomain Available', success: true });
    }
    return res
      .status(409)
      .json({ msg: 'Subdomain Unavailable', success: false });
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Internal Server Error', success: false, data: error });
  }
};

const addSubdomain = async (req, res) => {
  const { body, uid } = req;
  console.log(
    '🚀 ~ file: resume.controller.js:72 ~ addSubdomain ~ body, uid:',
    body,
    uid,
  );
  try {
    await axios.post(
      CLOUDFLARE_DNS_PATH,
      {
        type: 'CNAME',
        name: body.subdomain,
        content: process.env.TARGET_DOMAIN,
        ttl: 120,
        proxied: false,
      },
      {
        headers: cloudflareHeader,
      },
    );
    const dbRes = await bindSubdomain({
      email: uid,
      subdomain: body.subdomain,
    });
    res
      .status(201)
      .json({ msg: 'Subdomain Added', success: true, data: dbRes });
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Subdomain Binding Failed', success: false, data: error });
  }
};

module.exports = {
  getUserData,
  addData,
  addSubdomain,
  validateDomain,
};
