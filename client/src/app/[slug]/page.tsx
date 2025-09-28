import { PageProps } from '.next/types/app/layout';

type DynamicPageType = {
  params: Promise<{ slug: string }>;
};

const DynamicPage = async ({ params }: DynamicPageType) => {
  const { slug } = await params;

  return <div>{slug}</div>;
};

export default DynamicPage;
