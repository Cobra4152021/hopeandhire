-- Insert sample companies
insert into companies (name, description, website, location)
values
    ('TechCorp', 'Leading technology solutions provider', 'https://techcorp.example.com', 'San Francisco, CA'),
    ('DataSystems', 'Data analytics and management', 'https://datasystems.example.com', 'New York, NY'),
    ('WebSolutions', 'Web development and design', 'https://websolutions.example.com', 'Austin, TX')
on conflict (name) do update set
    description = excluded.description,
    website = excluded.website,
    location = excluded.location;

-- Insert sample jobs
insert into jobs (company_id, title, description, requirements, location, salary_range, job_type)
select 
    c.id,
    'Senior Software Engineer',
    'We are looking for an experienced software engineer to join our team.',
    '5+ years of experience, React, Node.js, PostgreSQL',
    c.location,
    '$120,000 - $150,000',
    'Full-time'
from companies c
where c.name = 'TechCorp'
on conflict (company_id, title) do update set
    description = excluded.description,
    requirements = excluded.requirements,
    location = excluded.location,
    salary_range = excluded.salary_range,
    job_type = excluded.job_type;

insert into jobs (company_id, title, description, requirements, location, salary_range, job_type)
select 
    c.id,
    'Data Analyst',
    'Join our data team to help drive business decisions.',
    '3+ years of experience, SQL, Python, Data visualization',
    c.location,
    '$90,000 - $110,000',
    'Full-time'
from companies c
where c.name = 'DataSystems'
on conflict (company_id, title) do update set
    description = excluded.description,
    requirements = excluded.requirements,
    location = excluded.location,
    salary_range = excluded.salary_range,
    job_type = excluded.job_type;

insert into jobs (company_id, title, description, requirements, location, salary_range, job_type)
select 
    c.id,
    'Frontend Developer',
    'Create beautiful and responsive web applications.',
    '2+ years of experience, React, TypeScript, CSS',
    c.location,
    '$80,000 - $100,000',
    'Full-time'
from companies c
where c.name = 'WebSolutions'
on conflict (company_id, title) do update set
    description = excluded.description,
    requirements = excluded.requirements,
    location = excluded.location,
    salary_range = excluded.salary_range,
    job_type = excluded.job_type;

-- Create a test user if it doesn't exist
insert into auth.users (id, email, raw_user_meta_data)
values (
    '00000000-0000-0000-0000-000000000000',
    'test@example.com',
    '{"full_name": "Test User"}'
)
on conflict (id) do nothing;

-- Insert sample notifications only if we have a profile
do $$
declare
    v_profile_id uuid;
begin
    select id into v_profile_id from profiles where email = 'test@example.com';
    if v_profile_id is not null then
        insert into notifications (profile_id, type, title, message, data)
        values (
            v_profile_id,
            'system',
            'Welcome to Hope & Hire',
            'Thank you for joining our platform!',
            '{"action": "welcome"}'
        )
        on conflict (profile_id, type, title) do update set
            message = excluded.message,
            data = excluded.data;
    end if;
end $$;

-- Insert sample user settings only if we have a profile
do $$
declare
    v_profile_id uuid;
begin
    select id into v_profile_id from profiles where email = 'test@example.com';
    if v_profile_id is not null then
        insert into user_settings (profile_id, email_notifications, application_updates, new_messages, marketing_emails)
        values (
            v_profile_id,
            true,
            true,
            true,
            false
        )
        on conflict (profile_id) do update set
            email_notifications = excluded.email_notifications,
            application_updates = excluded.application_updates,
            new_messages = excluded.new_messages,
            marketing_emails = excluded.marketing_emails;
    end if;
end $$; 