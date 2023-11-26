const { getAllData, allDataToDb } = require('../services/resumeData.services');

const getUserData = async (req, res) => {
  const { uid } = req.params;

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
  const { body, userData } = req;
  try {
    const data = await allDataToDb(userData.email, body);
    console.log('🚀 ~ file: resume.controller.js:18 ~ addData ~ data:', data);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ status: false, data: error });
  }
};

module.exports = { getUserData, addData };
