import { PUBLIC_ROUTES } from '@/config/route.config';
import pageService from '@/service/page.server.service';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import parseEdjsToHtml from '@/lib/edjs-parser';

const getPolicyData = cache(async () => {
  const res = await pageService.getPageCommonStructure('policy');
  return res ?? notFound();
});

export async function generateMetadata() {
  const policy = await getPolicyData();
  return {
    title: policy.metadata?.title,
    description: policy.metadata?.metaDescription,
    alternates: {
      canonical: PUBLIC_ROUTES.POLICY,
    },
    openGraph: {
      title: policy.metadata?.title,
      description: policy.metadata?.metaDescription,
      url: PUBLIC_ROUTES.POLICY,
      type: 'website',
      siteName: policy.title,
      images: [
        {
          width: 800,
          height: 600,
          alt: policy.title,
        },
      ],
    },
  };
}

const AboutPage = async () => {
  const about = await getPolicyData();
  const html = parseEdjsToHtml(about.content);
  return (
    <div
      className="container min-h-[200px]"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
};

export default AboutPage;
