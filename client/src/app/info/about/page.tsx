import { PUBLIC_ROUTES } from '@/config/route.config';
import pageService from '@/service/page.server.service';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import parseEdjsToHtml from '@/lib/edjs-parser';

const getAboutData = cache(async () => {
  const res = await pageService.getPageCommonStructure('about');
  return res ?? notFound();
});

export async function generateMetadata() {
  const about = await getAboutData();
  return {
    title: about.metadata?.title,
    description: about.metadata?.metaDescription,
    alternates: {
      canonical: PUBLIC_ROUTES.ABOUT,
    },
    openGraph: {
      title: about.metadata?.title,
      description: about.metadata?.metaDescription,
      url: PUBLIC_ROUTES.ABOUT,
      type: 'website',
      siteName: about.title,
      images: [
        {
          width: 800,
          height: 600,
          alt: about.title,
        },
      ],
    },
  };
}

const AboutPage = async () => {
  const about = await getAboutData();
  const html = parseEdjsToHtml(about.content);
  return (
    <div className="container" dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};

export default AboutPage;
