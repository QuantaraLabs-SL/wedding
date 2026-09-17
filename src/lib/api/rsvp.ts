import { createClient } from '../supabase/client';
import { Database } from '@/types/database';

type RsvpInsert = Database['public']['Tables']['rsvps']['Insert'];

export async function submitRSVP(rsvpData: RsvpInsert): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();
    
    const { error } = await supabase
      .from('rsvps')
      .insert(rsvpData);

    if (error) {
      console.error('Supabase RSVP insert error:', error);
      return { success: false, error: 'Database error while saving RSVP.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error during RSVP submission:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
