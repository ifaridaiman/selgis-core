/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        mapData: JSON.stringify([
            { title: "Sempadan", id: "c71e8e3c14b74f3483a4eaf3005e6a9a" },
            { title: "Maklumat Banjir", id: "5761834ca35d4da89be36df9ca131a15" },
            { title: "Maklumat Asas", id: "75b422d354fb45c3b853d1e0700568c5" },
            { title: "Maklumat Saliran", id: "b82c2a8e107f4e0fbcf43274588d1713" },
            { title: "Lot Kadaster", id: "9872a1ce1563482187ded7301adbc1a5" },
            { title: "Maklumat Kolam", id: "9053a8dccc1d46e2b64c2ea4b0a7e3c7" },
            { title: "Maklumat Sungai", id: "9760aba7c3cc46a19f0721a83fca44b3" }
        ])
    },
    basePath:"/ulasan-teknikal"
};

export default nextConfig;
