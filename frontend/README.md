# Avenza

A responsive storefront built with React and Vite. Product records are synced
from `public/products.json` into the backend PostgreSQL catalog.

## Run locally

```sh
npm install
npm run dev
```

The development server is available at `http://localhost:5173`.

## Storefront features

- Search products and filter by category, with featured, rating, and price sorting.
- Open product quick views and save items to a wishlist.
- Add products from catalog cards or the full product details page to a signed-in user's cart.
- Secure the cart by account and continue to Stripe Checkout with server-validated prices.
- Sign up with email verification, sign in, and use role-aware user, seller, and admin dashboards.
- Responsive layouts, reduced-motion support, loading and error states, and a newsletter sign-up interaction.

The storefront reads its full product catalog from the backend PostgreSQL
database. After applying backend migrations, run `npm run catalog:sync` from
`backend/` to safely import/update every product from `public/products.json`.
If the catalog API is unavailable or has no products, the home page and product
listing show clearly labeled sample cards; the posts section similarly shows
sample stories when no posts are available. Sample cards are previews only and
cannot be added to the cart or opened as live product/post details.
Payments require the backend to be running with `STRIPE_SECRET_KEY` configured.
Prices, variants, and stock are validated against PostgreSQL before Stripe
Checkout. Signed-in customers can view payments and order status in their
dashboard. Account registration also requires the backend email service to be
configured for verification. Set `VITE_API_BASE_URL` when the backend is not
available at `http://localhost:4000`.

## Google sign-in

1. Copy `.env.example` to `.env` in `frontend/` (`Copy-Item .env.example .env` in PowerShell). Vite does not load `.env.example` directly.
2. In Firebase Console, enable **Authentication → Sign-in method → Google** and
   add the local and deployed frontend hosts under **Authorized domains**.
3. Register a Firebase web app and copy its web configuration values into
   `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`,
   `VITE_FIREBASE_PROJECT_ID`, and `VITE_FIREBASE_APP_ID`. These are public
   client settings and are included in the frontend build; never put Firebase
   Admin service-account credentials in frontend variables.
4. Configure `FIREBASE_PROJECT_ID` in the backend with the same project ID and
   allow the frontend origin in `CORS_ORIGINS`. The backend verifies ID tokens
   without a service-account file or Firebase Web API key.
5. Restart the frontend and backend after changing environment variables.

If sign-in reports `CONFIGURATION_NOT_FOUND`, Firebase Authentication has not
been initialized or enabled for the project selected by the web app. In that
project's Firebase Console, select **Authentication → Get started**, enable
**Google** under **Sign-in method**, save, and ensure the frontend host is listed
under **Authorized domains**. A backend `503` is separate: verify that
`FIREBASE_PROJECT_ID` is set to the same project ID configured in the frontend.

The backend stores the login token in an HttpOnly cookie; the frontend
automatically includes it with API requests and does not expose it to JavaScript.
For local development, run the frontend on port `5173` and the backend on port
`4000`; the API defaults to the frontend's hostname so cookies remain same-site
whether you use `localhost` or `127.0.0.1`. Production cookies require HTTPS.

Profile image uploads use ImgBB. Create an ImgBB API key, set it as
`VITE_IMGBB_API_KEY` in `frontend/.env`, and restart the frontend. The key is
included in the client build, so use an ImgBB key intended for public client-side
uploads. Uploaded image URLs are saved to the signed-in account and displayed
in the profile, dashboard, and storefront navigation.
