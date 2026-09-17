import { getWeddingBySlug } from '@/lib/api/weddings';
import InvitationRenderer from '@/components/invitation/InvitationRenderer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const wedding = await getWeddingBySlug('dineth-and-thathsarani');
  
  if (!wedding) {
    return {
      title: 'Wedding Invitation',
    }
  }

  const title = `${wedding.bride_name} & ${wedding.groom_name} — Wedding Invitation`;
  
  return {
    title,
    description: wedding.invitation_message || `Join us to celebrate the wedding of ${wedding.bride_name} and ${wedding.groom_name}.`,
    openGraph: {
      title,
      description: wedding.invitation_message || undefined,
      images: wedding.cover_image_url ? [wedding.cover_image_url] : [],
    },
  }
}

export default async function Home() {
  const wedding = await getWeddingBySlug('dineth-and-thathsarani');

  if (!wedding) {
    notFound();
  }

  return <InvitationRenderer wedding={wedding} />;
}
