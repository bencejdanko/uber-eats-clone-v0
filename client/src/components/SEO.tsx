import { Helmet } from "react-helmet-async";

interface SEOProps {
    title: string;
    description: string;
    favicon: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, favicon }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href={favicon} />
        </Helmet>
    );
}

export { SEO };