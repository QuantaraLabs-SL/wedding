import { createClient } from '../supabase/server';
import { WeddingConfig } from '@/types/database';

// A mock fallback for the seed wedding to ensure the UI works before Supabase is connected
const SEED_WEDDING: WeddingConfig = {
  id: '00000000-0000-0000-0000-000000000001',
  owner_id: '00000000-0000-0000-0000-000000000002',
  slug: 'dineth-and-thathsarani',
  bride_name: 'Thathsarani',
  groom_name: 'Dineth',
  wedding_date: '2026-10-07T09:00:00+05:30', // Sri Lanka Time (UTC+5:30)
  invitation_message: 'Together with our families, we joyfully invite you to share in the celebration of our marriage.',
  cover_image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
  couple_image_url: '/images/poruwa-couple.png',
  music_url: null,
  theme_id: 'classic',
  published: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  events: [
    {
      id: 'e1',
      wedding_id: '00000000-0000-0000-0000-000000000001',
      title: 'Wedding Celebration',
      description: 'Join us for our wedding ceremony and reception.',
      event_date: '2026-10-07',
      start_time: '09:00:00',
      end_time: '16:00:00',
      venue_name: 'Seven Say Banquet Hotel',
      address: 'Veyangoda, Sri Lanka',
      latitude: 7.14603,
      longitude: 80.03532,
      maps_url: 'https://www.google.com/maps/search/?api=1&query=7.14603,80.03532',
      sort_order: 1
    }
  ],
  gallery_images: [
    {
      id: 'g1',
      wedding_id: '00000000-0000-0000-0000-000000000001',
      image_url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop',
      caption: null,
      sort_order: 1,
      created_at: new Date().toISOString()
    }
  ]
};

export async function getWeddingBySlug(slug: string): Promise<WeddingConfig | null> {
  const supabase = await createClient();

  try {
    const { data: wedding, error } = await supabase
      .from('weddings')
      .select(`
        *,
        events(*),
        gallery_images(*)
      `)
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      console.warn('Supabase fetch failed or returned no results:', error.message);
      // Fallback for development if keys are not configured or DB is empty
      if (slug === 'dineth-and-thathsarani' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
        return SEED_WEDDING;
      }
      return null;
    }

    // Sort events and gallery_images
    const config = wedding as WeddingConfig;
    config.events = config.events?.sort((a, b) => a.sort_order - b.sort_order) || [];
    config.gallery_images = config.gallery_images?.sort((a, b) => a.sort_order - b.sort_order) || [];

    return config;
  } catch (err) {
    console.warn('Error connecting to Supabase:', err);
    if (slug === 'dineth-and-thathsarani') {
      return SEED_WEDDING;
    }
    return null;
  }
}
