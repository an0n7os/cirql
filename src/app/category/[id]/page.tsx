import CategoryClient from './CategoryClient';

export function generateStaticParams() {
  return [{ id: 'plumbing' }]
}

export default async function CategoryPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = await paramsPromise;
  return <CategoryClient id={params.id} />;
}
