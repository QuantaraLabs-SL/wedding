export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      events: {
        Row: {
          address: string
          description: string | null
          end_time: string | null
          event_date: string
          id: string
          latitude: number | null
          longitude: number | null
          maps_url: string | null
          sort_order: number | null
          start_time: string
          title: string
          venue_name: string
          wedding_id: string | null
        }
        Insert: {
          address: string
          description?: string | null
          end_time?: string | null
          event_date: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          maps_url?: string | null
          sort_order?: number | null
          start_time: string
          title: string
          venue_name: string
          wedding_id?: string | null
        }
        Update: {
          address?: string
          description?: string | null
          end_time?: string | null
          event_date?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          maps_url?: string | null
          sort_order?: number | null
          start_time?: string
          title?: string
          venue_name?: string
          wedding_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_wedding_id_fkey"
            columns: ["wedding_id"]
            isOneToOne: false
            referencedRelation: "weddings"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery_images: {
        Row: {
          caption: string | null
          created_at: string | null
          id: string
          image_url: string
          sort_order: number | null
          wedding_id: string | null
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          id?: string
          image_url: string
          sort_order?: number | null
          wedding_id?: string | null
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          id?: string
          image_url?: string
          sort_order?: number | null
          wedding_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gallery_images_wedding_id_fkey"
            columns: ["wedding_id"]
            isOneToOne: false
            referencedRelation: "weddings"
            referencedColumns: ["id"]
          },
        ]
      }
      guests: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          invitation_token: string | null
          name: string
          phone: string | null
          wedding_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          invitation_token?: string | null
          name: string
          phone?: string | null
          wedding_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          invitation_token?: string | null
          name?: string
          phone?: string | null
          wedding_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guests_wedding_id_fkey"
            columns: ["wedding_id"]
            isOneToOne: false
            referencedRelation: "weddings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      rsvps: {
        Row: {
          attendance: string
          created_at: string | null
          email: string | null
          guest_count: number | null
          guest_id: string | null
          guest_name: string
          id: string
          message: string | null
          updated_at: string | null
          wedding_id: string | null
        }
        Insert: {
          attendance: string
          created_at?: string | null
          email?: string | null
          guest_count?: number | null
          guest_id?: string | null
          guest_name: string
          id?: string
          message?: string | null
          updated_at?: string | null
          wedding_id?: string | null
        }
        Update: {
          attendance?: string
          created_at?: string | null
          email?: string | null
          guest_count?: number | null
          guest_id?: string | null
          guest_name?: string
          id?: string
          message?: string | null
          updated_at?: string | null
          wedding_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rsvps_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rsvps_wedding_id_fkey"
            columns: ["wedding_id"]
            isOneToOne: false
            referencedRelation: "weddings"
            referencedColumns: ["id"]
          },
        ]
      }
      themes: {
        Row: {
          configuration: Json | null
          id: string
          name: string
        }
        Insert: {
          configuration?: Json | null
          id: string
          name: string
        }
        Update: {
          configuration?: Json | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      weddings: {
        Row: {
          bride_name: string
          couple_image_url: string | null
          cover_image_url: string | null
          created_at: string | null
          groom_name: string
          id: string
          invitation_message: string | null
          music_url: string | null
          owner_id: string | null
          published: boolean | null
          slug: string
          theme_id: string | null
          updated_at: string | null
          wedding_date: string | null
        }
        Insert: {
          bride_name: string
          couple_image_url?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          groom_name: string
          id?: string
          invitation_message?: string | null
          music_url?: string | null
          owner_id?: string | null
          published?: boolean | null
          slug: string
          theme_id?: string | null
          updated_at?: string | null
          wedding_date?: string | null
        }
        Update: {
          bride_name?: string
          couple_image_url?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          groom_name?: string
          id?: string
          invitation_message?: string | null
          music_url?: string | null
          owner_id?: string | null
          published?: boolean | null
          slug?: string
          theme_id?: string | null
          updated_at?: string | null
          wedding_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "weddings_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "weddings_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
