module.exports = {
  VERCEL_ADD_DOMAIN_PATH: `https://api.vercel.com/v10/projects/${process.env.VERCEL_PROJECT}/domains`,
  VERCEL_DELETE_DOMAIN_PATH: `https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT}/domains`,
};
