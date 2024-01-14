const { default: axios } = require('axios');
const { VERCEL_ADD_DOMAIN_PATH } = require('../constant/vercelApiPath');

/**
 * Will add the domain to vercel project
 * @param {string} subdomain
 * @returns
 */
const addSubdomainToVercel = (subdomain) => axios.post(
  VERCEL_ADD_DOMAIN_PATH,
  { name: `${subdomain}.${process.env.DOMAIN}` },
  { headers: { Authorization: `Bearer ${process.env.VERCEL_TOKEN}` } },
);

/**
 * Will Delete the domain from vercel project
 * @param {string} subdomain
 * @returns
 */
const deleteSubdomainFromVercel = (subdomain) => axios.delete(
  `${VERCEL_ADD_DOMAIN_PATH}/${subdomain}.${process.env.DOMAIN}`,
  { headers: { Authorization: `Bearer ${process.env.VERCEL_TOKEN}` } },
);

module.exports = { addSubdomainToVercel, deleteSubdomainFromVercel };
