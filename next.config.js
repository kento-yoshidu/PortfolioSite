/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    // next build / next lint の検査対象（既定は pages, app, components, lib, src のみ）
    dirs: ["."],
  },
};
