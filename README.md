
# AI Image Generator

## Overview

This project is an AI-powered image generation web application built with Next.js. It features a unique and intuitive user interface, allowing users to create AI-generated images with ease.

## Features

- **Unique User Interface**: Clean, intuitive, and responsive design created using Next.js and shadcn/ui.
- **AI Image Generation**: Generate unique images using a pre-downloaded image dataset.
- **User Authentication**: Login functionality with Google authentication using Firebase Auth.
- **Rate Limiting**: Users can generate up to 3 images per hour.
- **User History**: Store and display user's image generation history.
- **Explore Page**: Discover images created by other users.
- **Edit Image**: Bonus feature allowing users to edit generated images with brushes and erasers.

## Technologies Used

- **Frontend**: Next.js, shadcn/ui
- **Backend**: Vercel KV for data storage
- **Authentication**: Firebase Auth
- **Deployment**: Vercel or Render

## Getting Started

1. Clone the repository
   ```
   git clone https://github.com/yourusername/ai-image-generator.git
   ```

2. Install dependencies
   ```
   cd ai-image-generator
   npm install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory and add the following:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   VERCEL_KV_URL=your_vercel_kv_url
   VERCEL_KV_REST_API_URL=your_vercel_kv_rest_api_url
   VERCEL_KV_REST_API_TOKEN=your_vercel_kv_rest_api_token
   VERCEL_KV_REST_API_READ_ONLY_TOKEN=your_vercel_kv_read_only_token
   ```

4. Run the development server
   ```
   npm run dev
   ```

5. Open [https://ai-image-genrator-seven.vercel.app/](https://ai-image-genrator-seven.vercel.app/) in your browser to see the application.

## Deployment

This project is configured for easy deployment on Vercel or Render. Follow the platform-specific instructions for deploying a Next.js application.





