const { default: axios } = require('axios');
const { CLOUDFLARE_DNS_PATH } = require('../constant/cloudflareApiPath');
const { cloudflareHeader } = require('../constant/apiHeaders');

/**
 * To add a Subdomain with ENV data to cloudflare
 *
 * @param {string} subdomain
 */
const addSubdomainToCloudflare = (subdomain) => axios.post(
  CLOUDFLARE_DNS_PATH,
  {
    type: 'CNAME',
    name: subdomain,
    content: process.env.TARGET_DOMAIN,
    ttl: 120,
    proxied: false,
  },
  {
    headers: cloudflareHeader,
  },
);

/**
 * To get the given subdomain data
 *
 * @param {string} subdomain
 */
const getSubdomain = async (subdomain) => axios.get(CLOUDFLARE_DNS_PATH, {
  params: {
    type: 'CNAME',
    name: `${subdomain}.${process.env.DOMAIN}`,
  },
  headers: cloudflareHeader,
});

module.exports = {
  addSubdomainToCloudflare,
  getSubdomain,
};
