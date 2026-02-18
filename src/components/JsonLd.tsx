export default function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'SnipieAI',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Windows, macOS',
        offers: {
            '@type': 'Offer',
            price: '49.99', // Example price or keep 0 if freemium base
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            category: 'Software > Multimedia'
        },
        description: 'The #1 local, no-subscription AI video clipper. Alternative to Opus Clip that runs offline.',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            ratingCount: '156',
        },
        featureList: 'Offline AI Processing, No Monthly Fees, Auto-Captioning, Viral Short Creation, 100% Privacy',
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
