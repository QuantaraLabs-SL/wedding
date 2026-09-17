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
        Insert: any
        Update: any
        Relationships: any[]
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
        Insert: any
        Update: any
        Relationships: any[]
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
        Insert: any
        Update: any
        Relationships: any[]
      }
      themes: {
        Row: {
          id: string
          name: string
          configuration: Json
        }
        Insert: any
        Update: any
        Relationships: any[]
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
        Insert: any
        Update: any
        Relationships: any[]
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
        Update: {
          id?: string
          wedding_id?: string
          guest_id?: string | null
          guest_name?: string
          email?: string | null
          attendance?: 'attending' | 'not_attending'
          guest_count?: number
          message?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: any[]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
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
