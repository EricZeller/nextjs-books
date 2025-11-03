import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: 'export',
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "books.googleusercontent.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "books.google.com",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "books.google.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
