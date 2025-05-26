-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Drop existing tables in correct order (due to dependencies)
drop table if exists user_settings cascade;
drop table if exists notifications cascade;
drop table if exists applications cascade;
drop table if exists jobs cascade;
drop table if exists companies cascade;
drop table if exists profiles cascade;

-- Create profiles table first since it's referenced by other tables
create table profiles (
    id uuid references auth.users on delete cascade primary key,
    full_name text,
    email text unique,
    phone text,
    location text,
    bio text,
    skills text,
    experience text,
    education text,
    avatar_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create companies table
create table companies (
    id uuid default uuid_generate_v4() primary key,
    name text not null unique,
    description text,
    website text,
    logo_url text,
    location text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create jobs table
create table jobs (
    id uuid default uuid_generate_v4() primary key,
    company_id uuid references companies on delete cascade not null,
    title text not null,
    description text not null,
    requirements text,
    location text,
    salary_range text,
    job_type text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique (company_id, title)
);

-- Create applications table
create table applications (
    id uuid default uuid_generate_v4() primary key,
    job_id uuid references jobs on delete cascade not null,
    profile_id uuid references profiles on delete cascade not null,
    resume_url text,
    cover_letter text,
    status text default 'pending' check (status in ('pending', 'reviewed', 'accepted', 'rejected')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(job_id, profile_id)
);

-- Create notifications table
create table notifications (
    id uuid default uuid_generate_v4() primary key,
    profile_id uuid references profiles on delete cascade not null,
    type text not null check (type in ('application_status', 'message', 'system')),
    title text not null,
    message text not null,
    is_read boolean default false,
    data jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique (profile_id, type, title)
);

-- Create user_settings table
create table user_settings (
    id uuid default uuid_generate_v4() primary key,
    profile_id uuid references profiles on delete cascade not null unique,
    email_notifications boolean default true,
    application_updates boolean default true,
    new_messages boolean default true,
    marketing_emails boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Drop existing policies if they exist
drop policy if exists "Public profiles are viewable by everyone" on profiles;
drop policy if exists "Users can update their own profile" on profiles;
drop policy if exists "Companies are viewable by everyone" on companies;
drop policy if exists "Companies can be created by authenticated users" on companies;
drop policy if exists "Jobs are viewable by everyone" on jobs;
drop policy if exists "Jobs can be created by authenticated users" on jobs;
drop policy if exists "Users can view their own applications" on applications;
drop policy if exists "Users can create applications" on applications;
drop policy if exists "Users can view their own notifications" on notifications;
drop policy if exists "Users can update their own notifications" on notifications;
drop policy if exists "Users can view their own settings" on user_settings;
drop policy if exists "Users can update their own settings" on user_settings;

-- Create RLS policies
alter table profiles enable row level security;
alter table companies enable row level security;
alter table jobs enable row level security;
alter table applications enable row level security;
alter table notifications enable row level security;
alter table user_settings enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
    on profiles for select
    using (true);

create policy "Users can update their own profile"
    on profiles for update
    using (auth.uid() = id);

-- Companies policies
create policy "Companies are viewable by everyone"
    on companies for select
    using (true);

create policy "Companies can be created by authenticated users"
    on companies for insert
    with check (auth.role() = 'authenticated');

-- Jobs policies
create policy "Jobs are viewable by everyone"
    on jobs for select
    using (true);

create policy "Jobs can be created by authenticated users"
    on jobs for insert
    with check (auth.role() = 'authenticated');

-- Applications policies
create policy "Users can view their own applications"
    on applications for select
    using (auth.uid() = profile_id);

create policy "Users can create applications"
    on applications for insert
    with check (auth.role() = 'authenticated');

-- Notifications policies
create policy "Users can view their own notifications"
    on notifications for select
    using (auth.uid() = profile_id);

create policy "Users can update their own notifications"
    on notifications for update
    using (auth.uid() = profile_id);

-- User settings policies
create policy "Users can view their own settings"
    on user_settings for select
    using (auth.uid() = profile_id);

create policy "Users can update their own settings"
    on user_settings for update
    using (auth.uid() = profile_id);

-- Drop existing function and trigger if they exist
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- Create functions
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, full_name, email)
    values (new.id, new.raw_user_meta_data->>'full_name', new.email);

    insert into public.user_settings (profile_id)
    values (new.id);

    return new;
end;
$$ language plpgsql security definer;

-- Create triggers
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- Create indexes
create index if not exists jobs_company_id_idx on jobs(company_id);
create index if not exists applications_job_id_idx on applications(job_id);
create index if not exists applications_profile_id_idx on applications(profile_id);
create index if not exists notifications_profile_id_idx on notifications(profile_id);
create index if not exists notifications_created_at_idx on notifications(created_at);
create index if not exists user_settings_profile_id_idx on user_settings(profile_id); 