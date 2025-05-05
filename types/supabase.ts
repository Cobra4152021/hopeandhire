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
          }
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
      job_listings: {
        Row: {
          id: string
          title: string
          description: string
          location: string
          job_type: string
          salary_min: number
          salary_max: number
          benefits: string[]
          requirements: string[]
          company_id: string
          is_remote: boolean
          status: "draft" | "active" | "closed"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          location: string
          job_type: string
          salary_min: number
          salary_max: number
          benefits?: string[]
          requirements?: string[]
          company_id: string
          is_remote?: boolean
          status?: "draft" | "active" | "closed"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          location?: string
          job_type?: string
          salary_min?: number
          salary_max?: number
          benefits?: string[]
          requirements?: string[]
          company_id?: string
          is_remote?: boolean
          status?: "draft" | "active" | "closed"
          created_at?: string
          updated_at?: string
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
