import BookingClient from './BookingClient';

export function generateStaticParams() {
  return [{ id: '1' }]
}

export default async function BookingPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = await paramsPromise;
  return <BookingClient id={params.id} />;
}
