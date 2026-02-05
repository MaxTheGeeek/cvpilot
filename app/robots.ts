import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://cvpilot.demo.com'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/protected/', '/api/'], // Disallow API and protected routes
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
