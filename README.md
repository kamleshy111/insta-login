# Instagram Login & Like App

A Next.js application that integrates with Instagram's API to allow users to login with their Instagram account and like posts.

## Features

- 🔐 Instagram OAuth login
- 📸 Display user's Instagram posts
- ❤️ Like posts functionality
- 🎨 Modern, responsive UI with Tailwind CSS
- ⚡ Built with Next.js 14 and TypeScript

## Prerequisites

Before you begin, you'll need:

1. A Facebook Developer account
2. An Instagram app configured in Facebook Developer Console
3. Node.js 18+ installed

## Instagram App Setup

### 1. Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "Create App"
3. Select "Consumer" as the app type
4. Fill in the app details

### 2. Add Instagram Basic Display

1. In your Facebook app dashboard, click "Add Product"
2. Find "Instagram Basic Display" and click "Set Up"
3. Go to Instagram Basic Display > Basic Display
4. Click "Create New App" and follow the instructions

### 3. Configure Instagram App

1. **Valid OAuth Redirect URIs**: Add `http://localhost:3000/api/auth/callback/instagram`
2. **Deauthorize Callback URL**: Add `http://localhost:3000/api/auth/callback/instagram`
3. **Data Deletion Request URL**: Add `http://localhost:3000/api/auth/callback/instagram`

### 4. Add Test Users

1. Go to Instagram Basic Display > Basic Display
2. Scroll down to "User Token Generator"
3. Add Instagram test users (you can add your own Instagram account)

### 5. Get App Credentials

1. Go to Instagram Basic Display > Basic Display
2. Note down your:
   - Instagram App ID
   - Instagram App Secret
   - Client OAuth Settings

## Environment Setup

1. Copy the environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Instagram app credentials in `.env.local`:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   
   INSTAGRAM_CLIENT_ID=your-instagram-client-id
   INSTAGRAM_CLIENT_SECRET=your-instagram-client-secret
   
   INSTAGRAM_APP_ID=your-instagram-app-id
   INSTAGRAM_APP_SECRET=your-instagram-app-secret
   ```

3. Generate a secure secret for `NEXTAUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Click "Sign in with Instagram" to authenticate
2. Authorize the app to access your Instagram data
3. View your Instagram posts in the dashboard
4. Click the "❤️ Like" button to like posts

## API Endpoints

- `GET /api/instagram/posts` - Fetch user's Instagram posts
- `POST /api/instagram/like` - Like an Instagram post

## Important Notes

### Instagram API Limitations

1. **Basic Display API**: Only provides read access to user's own media
2. **Liking Posts**: Requires Instagram Graph API and additional permissions
3. **Business Verification**: For production use, you may need to submit your app for review

### Permissions Required

- `user_profile`: Access to user's profile information
- `user_media`: Access to user's media (posts)

### Development vs Production

This app is configured for development. For production:

1. Update the redirect URIs in Facebook Developer Console
2. Submit your app for Instagram review if using Graph API features
3. Update environment variables for production URLs

## Troubleshooting

### Common Issues

1. **"App Not Set Up" Error**: Make sure you've added test users in Facebook Developer Console
2. **Invalid Redirect URI**: Ensure the redirect URI in Facebook matches exactly
3. **Access Token Issues**: Check that your Instagram app is properly configured

### Getting Help

- [Instagram Basic Display API Documentation](https://developers.facebook.com/docs/instagram-basic-display-api)
- [NextAuth.js Documentation](https://next-auth.js.org/)

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **API**: Instagram Basic Display API
- **Deployment**: Vercel (recommended)

## License

MIT License - see LICENSE file for details.
