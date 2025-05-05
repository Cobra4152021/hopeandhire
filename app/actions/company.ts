export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      },
      companies: {
        Row: {
          id: string
          name: string
          description: string | null
          industry: string | null
          size: string | null
          founded_year: number | null
          address: string | null
          city: string | null
          state: string | null
          zip: string | null
          country: string | null
          website: string | null
          phone: string | null
          email: string | null
          user_id: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          industry?: string | null
          size?: string | null
          founded_year?: number | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip?: string | null
          country?: string | null
          website?: string | null
          phone?: string | null
          email?: string | null
          user_id: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          industry?: string | null
          size?: string | null
          founded_year?: number | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip?: string | null
          country?: string | null
          website?: string | null
          phone?: string | null
          email?: string | null
          user_id?: string
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
      },
      hiring_preferences: {
        Row: {
          id: string
          company_id: string
          job_types: string[]
          industries: string[]
          open_to_all_records: boolean
          background_restrictions: string | null
          support_services: string[]
          wotc_interest: boolean
          updated_at: string | null
        }
        Insert: {
          id?: string
          company_id: string
          job_types: string[]
          industries: string[]
          open_to_all_records: boolean
          background_restrictions?: string | null
          support_services: string[]
          wotc_interest: boolean
          updated_at?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          job_types?: string[]
          industries?: string[]
          open_to_all_records?: boolean
          background_restrictions?: string | null
          support_services?: string[]
          wotc_interest?: boolean
          updated_at?: string | null
        }
        Relationships: []
      },
      job_listings: {
        Row: {
          id: string
          company_id: string
          title: string
          description: string | null
          location: string | null
          type: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          company_id: string
          title: string
          description?: string | null
          location?: string | null
          type?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          title?: string
          description?: string | null
          location?: string | null
          type?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
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
