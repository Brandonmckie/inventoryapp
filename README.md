This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

For local development and Vercel deployment, you will need the following environment variables from your Supabase project dashboard:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Deploying to Vercel

The easiest way to put Recurra into production is using the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub repository.
2. Sign in to Vercel and click **Add New Project**.
3. Import your GitHub repository.
4. Open the **Environment Variables** section in the Vercel project settings during import.
5. Paste the two Supabase variables listed above.
6. Click **Deploy**. Vercel will automatically build the Next.js app and assign you a secure URL.

*(Note: Recurra has been configured with strict HTTP security headers for production, ensuring a trusted environment for optical inventory data.)*
