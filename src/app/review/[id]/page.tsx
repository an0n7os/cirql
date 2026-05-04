import ReviewClient from './ReviewClient';

export function generateStaticParams() {
  return [{ id: '1' }]
}

export default async function ReviewPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = await paramsPromise;
  return <ReviewClient id={params.id} />;
}
