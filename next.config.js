/** @type {import('next').NextConfig} */

//.env 파일에 API_KEY 숨기기
const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  // 새로운 address로 리다이렉트 하는 방법
  async redirects() {
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-sexy-blog/:path*",
        permanent: false,
      },
    ];
  },
  // 새로운 address로 리다이렉트 하는 방법 (새로운 url은 안가르쳐 줌)
  // 숨기고 싶은 API키는 여기에 넣으면 됨
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
