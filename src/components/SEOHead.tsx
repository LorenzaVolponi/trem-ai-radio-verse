import { Helmet } from 'react-helmet-async';

export const SITE_URL = 'https://radiotrem.ai';
export const DEFAULT_TITLE = 'Rádio Trem AI | Rádio Online com Inteligência Artificial 24/7';
export const DEFAULT_DESCRIPTION =
  'Ouça a Rádio Trem AI, uma rádio online com inteligência artificial, música gerada por IA, locução sintética e programação ao vivo 24 horas por dia.';
export const DEFAULT_IMAGE = `${SITE_URL}/og-radio-trem-ai.png`;

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'article';
}

const SEOHead = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonicalPath = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
}: SEOHeadProps) => {
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return (
    <Helmet>
      <html lang="pt-BR" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:locale" content="pt_BR" />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Rádio Trem AI" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Rádio Trem AI transmitindo música e locução com inteligência artificial" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEOHead;
