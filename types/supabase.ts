export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          website: string | null
          industry: string | null
          size: string | null
          location: string | null
          logo_url: string | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
          website?: string | null
          industry?: string | null
          size?: string | null
          location?: string | null
          logo_url?: string | null
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
          website?: string | null
          industry?: string | null
          size?: string | null
          location?: string | null
          logo_url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "companies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          requirements: string | null
          salary_range: string | null
          location: string
          job_type: string
          company_id: string
          is_active: boolean
          application_url: string | null
          contact_email: string | null
          deadline: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          requirements?: string | null
          salary_range?: string | null
          location: string
          job_type: string
          company_id: string
          is_active?: boolean
          application_url?: string | null
          contact_email?: string | null
          deadline?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          requirements?: string | null
          salary_range?: string | null
          location?: string
          job_type?: string
          company_id?: string
          is_active?: boolean
          application_url?: string | null
          contact_email?: string | null
          deadline?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          user_id: string
          full_name: string | null
          avatar_url: string | null
          role: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
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
  }
}
