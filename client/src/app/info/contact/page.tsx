import { PUBLIC_ROUTES } from '@/config/route.config';
import pageService from '@/service/page.server.service';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import parseEdjsToHtml from '@/lib/edjs-parser';

const getContactData = cache(async () => {
  const res = await pageService.getPageCommonStructure('policy');
  return res ?? notFound();
});

export async function generateMetadata() {
  const contact = await getContactData();
  return {
    title: contact.metadata?.title,
    description: contact.metadata?.metaDescription,
    alternates: {
      canonical: PUBLIC_ROUTES.CONTACT,
    },
    openGraph: {
      title: contact.metadata?.title,
      description: contact.metadata?.metaDescription,
      url: PUBLIC_ROUTES.CONTACT,
      type: 'website',
      siteName: contact.title,
      images: [
        {
          width: 800,
          height: 600,
          alt: contact.title,
        },
      ],
    },
  };
}

const AboutPage = async () => {
  const about = await getContactData();
  const html = parseEdjsToHtml(about.content);
  return (
    <div className="container" dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};

export default AboutPage;
