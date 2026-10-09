# Meal Mate

Meal Mate is a small recipe app: discover recipes, create your own, save favorites, and get nutrition values estimated automatically.

## Features

- **Browse recipes** – search and filter by category (carousel)
- **Recipe details** – ingredients, instructions, duration, image and nutrition info
- **Your own recipes** – create, edit and delete; ingredients and instruction steps via form, steps can be reordered with up/down buttons
- **Image upload** – images are compressed in the browser and stored on Cloudinary
- **Automatic nutrition** – calories, protein, carbs and fat are estimated from the ingredients via Google Gemini when saving
- **Favorites** – save recipes with one click and view them in one place
- **Copy recipes** – take someone else's recipe as a private copy into "My recipes"
- **Private recipes** – visible only to you, no approval needed
- **Admin approval** – new public recipes only appear after being approved in the admin area
- **Google login** and a profile page with user details
- **Dark/light mode**

## Pages

| Route | Description |
| --- | --- |
| `/` | Home |
| `/landingPage` | Recipe overview with search and filter |
| `/recipes/[id]` | Recipe details |
| `/recipes/createRecipe` | Create a new recipe |
| `/recipes/[id]/editRecipe` | Edit a recipe |
| `/recipes/favoriteRecipes` | Favorites |
| `/my-recipes` | Your recipes with category filter |
| `/profile` | Profile |
| `/admin` | Approve pending recipes (admin only) |

## Tech stack

- [Next.js](https://nextjs.org) (Pages Router), React, TypeScript
- Tailwind CSS 4, shadcn/ui (Base UI), Motion, Lucide icons
- MongoDB with Mongoose
- NextAuth (Google provider)
- SWR for data fetching
- Cloudinary for images
- Google Gemini (`@google/genai`) for nutrition estimates

## Project structure

```
components/   UI components
db/           MongoDB connection and schemas (Recipe, Category, User)
hooks/        Custom hooks (e.g. useFavorites)
lib/          Helpers (nutrition, Cloudinary, form parsing, ...)
pages/        Pages and API routes (pages/api)
types/        Shared TypeScript types
```

## Getting started

Requirements: Node.js, a MongoDB database, a Cloudinary account, a Google OAuth client and a Gemini API key.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create a `.env.local`:

```env
MONGODB_URI=
CLOUDINARY_URL=
GEMINI_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=         # Google email of the admin
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm start` | Production server |
| `npm run lint` | ESLint |
