/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "www.pexels.com"
            },
            {
                protocol: 'https',
                hostname: "www.unsplash.com"
            },
        ]
    }
}

module.exports = nextConfig
