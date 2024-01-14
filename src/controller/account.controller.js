const { SUBDOMAIN_MISSING } = require('../constant/errorCodes');
const { addUserToDb, getAllData, deleteFromDb } = require('../services/cardData.services');
const { deleteDomainFromCloudflare } = require('../services/cloudflare.services');
const { deleteSubdomainFromVercel } = require('../services/vercel.services');

/**
 * To add a new user in DB
 */
const addNewUser = async (req, res) => {
  const { name = '', email, picture } = req.userData;
  try {
    await addUserToDb({ name, email, picture });
    return res.status(201).json({
      success: true,
      data: { msg: 'User Created Successfully', newUser: true },
    });
  } catch (error) {
    if (error.code === 11000) {
      const data = await getAllData({ email });
      if (!data.subDomain) {
        return res.status(417).json({
          success: false,
          data: {
            msg: 'Please add subdomain.',
            code: SUBDOMAIN_MISSING,
            newUser: true,
          },
        });
      }
      return res.status(200).json({
        success: true,
        data: { msg: 'User already Present', newUser: false },
      });
    }
    return res.status(500).json({ success: false, data: error });
  }
};

/**
 * To delete a user from DB and remove subdomains form Clouflare and Vercel
 */
const deleteUser = async (req, res) => {
  const { email } = req.userData;
  try {
    const data = await getAllData({ email }, ['subDomainId', 'subDomain']);
    // To delete a domain Record from cloudflare
    await deleteDomainFromCloudflare(data.subDomainId);
    // To delete a domain from vercel
    await deleteSubdomainFromVercel(data.subDomain);
    // To delete a record from database
    await deleteFromDb(email);
    res.status(200).json({ success: true, data: { msg: 'User Deleted successfully' } });
  } catch (error) {
    res.status(error.code || 500).json({ success: false, data: { msg: 'User Deletion Failed' } });
  }
};

module.exports = { addNewUser, deleteUser };
