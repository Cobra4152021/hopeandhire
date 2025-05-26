# Hope & Hire

A modern job board platform built with Next.js, Supabase, and Tailwind CSS.

## Features

- 🔐 Authentication and Authorization
- 👤 User Profiles
- 🔍 Job Search and Filtering
- 📝 Job Applications
- 💬 Messaging System
- 🔔 Real-time Notifications
- ⚙️ User Settings

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Supabase
- **Database**: PostgreSQL
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Deployment**: Vercel

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/hopeandhire.git
   cd hopeandhire
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

1. Run the test script:

   ```bash
   node scripts/test.js
   ```

2. Manual Testing Checklist:
   - [ ] User Registration and Login
   - [ ] Profile Creation and Updates
   - [ ] Job Search and Filtering
   - [ ] Job Application Process
   - [ ] Messaging System
   - [ ] Notifications
   - [ ] Settings Management

## Deployment

1. Push your code to GitHub:

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. Connect your GitHub repository to Vercel:

   - Go to [Vercel](https://vercel.com)
   - Import your repository
   - Configure environment variables
   - Deploy

3. Set up environment variables in Vercel:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Deploy:
   ```bash
   vercel --prod
   ```

## Database Schema

### Tables

1. **profiles**

   - id (uuid, primary key)
   - full_name (text)
   - email (text)
   - phone (text)
   - location (text)
   - bio (text)
   - skills (text)
   - experience (text)
   - education (text)
   - avatar_url (text)

2. **jobs**

   - id (uuid, primary key)
   - title (text)
   - company_id (uuid, foreign key)
   - description (text)
   - requirements (text)
   - location (text)
   - salary_range (text)
   - job_type (text)
   - created_at (timestamp)

3. **applications**

   - id (uuid, primary key)
   - job_id (uuid, foreign key)
   - user_id (uuid, foreign key)
   - resume_url (text)
   - cover_letter (text)
   - status (text)
   - created_at (timestamp)

4. **notifications**

   - id (uuid, primary key)
   - user_id (uuid, foreign key)
   - type (text)
   - title (text)
   - message (text)
   - is_read (boolean)
   - data (jsonb)
   - created_at (timestamp)

5. **user_settings**
   - id (uuid, primary key)
   - user_id (uuid, foreign key)
   - email_notifications (boolean)
   - application_updates (boolean)
   - new_messages (boolean)
   - marketing_emails (boolean)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
