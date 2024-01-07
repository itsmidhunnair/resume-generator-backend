const cloudflareHeader = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
};

module.exports = { cloudflareHeader };
