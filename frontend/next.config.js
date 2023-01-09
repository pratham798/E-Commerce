/** @type {import('next').NextConfig} */
const nextConfig = {
  //without this  fix css for applied through styled components will not work
  reactStrictMode: true,   
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
