# CronyGlasses Frontend

This is the frontend for CronyGlasses, an e-commerce platform for unique beverages. It is built with React, Vite, and Tailwind CSS, and it communicates with a Supabase backend.

## Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API
- **Backend Service**: [Supabase](https://supabase.io/)

## Prerequisites

- Node.js (v16 or later)
- npm or yarn

## Environment Variables

To run this project, you will need to create a `.env` file in the `frontend` directory and add the following environment variables. You can use the `sample.env` file in the root directory as a template.

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

- `VITE_SUPABASE_URL`: The URL for your Supabase project.
- `VITE_SUPABASE_ANON_KEY`: The anonymous public key for your Supabase project.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/freedompraise/CronyGlasses.git
    cd CronyGlasses/frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    Create a `.env` file in the `frontend` directory and add the variables as described above.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Available Scripts

### `npm run dev`

Runs the app in development mode with hot-reloading.

### `npm run build`

Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`

Serves the production build locally to preview it before deployment.

