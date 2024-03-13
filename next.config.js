/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "images.pexels.com",
                port: '',
                pathname: '/photos/**'
            },
            {
                protocol: 'https',
                hostname: "avatars.githubusercontent.com",
                port: '',
                pathname: '/u/**'
            },
            {
                protocol: 'https',
                hostname: "z-p3-scontent.fmba2-1.fna.fbcdn.net",
                port: '',
                pathname: '/v/**'
            },
            {
                protocol: 'https',
                hostname: "www.unsplash.com"
            },
        ]
    }
}

module.exports = nextConfig
