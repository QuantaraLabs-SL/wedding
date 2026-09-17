export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      weddings: {
        Row: {
          id: string
          owner_id: string
          slug: string
          bride_name: string
          groom_name: string
          wedding_date: string | null
          invitation_message: string | null
          cover_image_url: string | null
          couple_image_url: string | null
          music_url: string | null
          theme_id: string | null
          published: boolean
          created_at: string
          updated_at: string
        }
      }
      events: {
        Row: {
          id: string
          wedding_id: string
          title: string
          description: string | null
          event_date: string
          start_time: string
          end_time: string | null
          venue_name: string
          address: string
          latitude: number | null
          longitude: number | null
          maps_url: string | null
          sort_order: number
        }
      }
      gallery_images: {
        Row: {
          id: string
          wedding_id: string
          image_url: string
          caption: string | null
          sort_order: number
          created_at: string
        }
      }
      themes: {
        Row: {
          id: string
          name: string
          configuration: Json
        }
      }
      guests: {
        Row: {
          id: string
          wedding_id: string
          name: string
          phone: string | null
          email: string | null
          invitation_token: string | null
          created_at: string
        }
      }
      rsvps: {
        Row: {
          id: string
          wedding_id: string
          guest_id: string | null
          guest_name: string
          email: string | null
          attendance: 'attending' | 'not_attending'
          guest_count: number
          message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          wedding_id: string
          guest_id?: string | null
          guest_name: string
          email?: string | null
          attendance: 'attending' | 'not_attending'
          guest_count?: number
          message?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Wedding = Database['public']['Tables']['weddings']['Row']
export type WeddingEvent = Database['public']['Tables']['events']['Row']
export type GalleryImage = Database['public']['Tables']['gallery_images']['Row']
export type Theme = Database['public']['Tables']['themes']['Row']
export type Rsvp = Database['public']['Tables']['rsvps']['Row']

// Extended type including relations for the renderer
export interface WeddingConfig extends Wedding {
  events: WeddingEvent[];
  gallery_images: GalleryImage[];
}
