# EduInnovate - Edtech Platform

## Overview

EduInnovate is a modern EdTech platform built with Next.js, MongoDB, and next-auth. It offers a robust authentication system (email magic link and Google OAuth), role-based access, and a clean, responsive UI for online learning.

## Tech Stack

- **Frontend:** Next.js (React), Tailwind CSS, Radix UI, Lucide Icons
- **Backend:** Next.js API routes
- **Database:** MongoDB
- **Authentication:** next-auth (Email Magic Link, Google OAuth), MongoDB Adapter, Resend

## Features

- User authentication (email magic link & Google)
- Role-based access (admin/user)
- Course management (CRUD)
- Enrollment system
- Responsive, modern UI

## Project Structure

- `app/` - Next.js app directory (pages, API routes)
- `components/` - UI components
- `lib/` - Utilities (auth, MongoDB)
- `auth.js` - next-auth configuration

## Setup Instructions

1. **Clone the repo:**
   ```bash
   git clone <repo-url>
   cd Edtech-Platform
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure environment variables:**
   Create a `.env.local` file with:
   ```env
   MONGODB_URI=your_mongodb_uri
   RESEND_API_KEY=your_resend_api_key
   EMAIL_FROM=your_email_from_address
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_URL=http://localhost:3000
   DB_NAME=your_db_name
   MONGO_URL=your_mongodb_uri
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Authentication Flow

- **Sign Up / Sign In:**
  - Enter your email to receive a magic link, or use Google to sign up/sign in.
  - New users are created on first sign-in.
- **Role-based access:**
  - Admin and User roles are supported. Admins can access `/admin`.

## API Endpoints

- `/api/courses` - Manage courses
- `/api/users` - Manage users
- `/api/enrollments` - Manage enrollments

## Customization

- UI components are in `components/ui/`
- Auth logic in `auth.js` and `lib/auth-utils.js`

## License

MIT
