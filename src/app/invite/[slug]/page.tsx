import { notFound } from 'next/navigation';
import { getWeddingBySlug } from '@/lib/api/weddings';
import InvitationRenderer from '@/components/invitation/InvitationRenderer';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const p = await params;
  const wedding = await getWeddingBySlug(p.slug);
  
  if (!wedding) {
    return {
      title: 'Wedding Not Found',
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

export default async function InvitePage({ params }: Props) {
  const p = await params;
  const wedding = await getWeddingBySlug(p.slug);

  if (!wedding) {
    notFound();
  }

  return <InvitationRenderer wedding={wedding} />;
}
