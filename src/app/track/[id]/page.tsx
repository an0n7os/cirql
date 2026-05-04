import TrackingClient from './TrackingClient';

export function generateStaticParams() {
  return [{ id: '1' }]
}

export default async function TrackingPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = await paramsPromise;
  return <TrackingClient id={params.id} />;
}
