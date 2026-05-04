import ChatClient from './ChatClient';

export function generateStaticParams() {
  return [{ id: '1' }]
}

export default async function ChatPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = await paramsPromise;
  return <ChatClient id={params.id} />;
}
