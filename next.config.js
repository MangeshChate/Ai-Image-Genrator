/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      lintDirs: ['pages', 'components'],
      ignoreDuringBuilds: true,
      rules: {
        'react/no-unescaped-entities': 'off',
      },
    },
  };
  
  export default nextConfig;