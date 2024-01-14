const {
  getAllData,
  allDataToDb,
  bindSubdomain,
} = require('../services/cardData.services');
const {
  addSubdomainToCloudflare,
  getSubdomain,
} = require('../services/cloudflare.services');
const { addSubdomainToVercel } = require('../services/vercel.services');
// const { filterObjects } = require('../helpers');

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
    res.status(error?.code || 500).json(error);
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
    return res.status(400).json({ status: false, data: error });
  }
};

const validateDomain = async (req, res) => {
  const { body } = req;
  try {
    const { data } = await getSubdomain(body.subdomain);

    if (data.result_info.count === 0) {
      return res
        .status(202)
        .json({ msg: 'Subdomain Available', success: true });
    }
    return res
      .status(409)
      .json({ msg: 'Subdomain Unavailable', success: false });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: 'Internal Server Error', success: false, data: error });
  }
};

const addSubdomain = async (req, res) => {
  const { body, uid } = req;
  try {
    // To add subdomain to cloudflare
    const { data } = await addSubdomainToCloudflare(body.subdomain);

    // To add subdomain to Vercel
    await addSubdomainToVercel(body.subdomain);

    // Add subdomain to DB
    const dbRes = await bindSubdomain({
      email: uid,
      subdomain: body.subdomain,
      subDomainId: data.result.id,
    });

    res.status(201).json({
      msg: 'Subdomain Added',
      success: true,
      data: dbRes,
      newUser: false,
    });
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
