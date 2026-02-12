import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
        ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
        : 'https://www.clipiee.com'

    // Fetch all news IDs
    const { data: posts } = await supabase
        .from('news')
        .select('id, updated_at')

    const newsUrls = posts?.map((post) => ({
        url: `${baseUrl}/news/${post.id}`,
        lastModified: new Date(post.updated_at || new Date()),
        priority: 0.6,
    })) || []

    // Static routes
    const routes = [
        '',
        '/about',
        '/changelog',
        '/news',
        '/pricing',
        '/download',
        '/features',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        priority: route === '' ? 1 : 0.8,
    }))

    return [...routes, ...newsUrls]
}
