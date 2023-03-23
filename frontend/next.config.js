/** @type {import('next').NextConfig} */
const nextConfig = {
  //without this  fix css for applied through styled components will not work
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [{ source: "/canceled", destination: "/", permanent: true }];
  },
};

module.exports = nextConfig;
