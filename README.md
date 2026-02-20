# Letterhead Builder

A professional letterhead builder built with React, Vite, and Tailwind CSS.

## Deployment to GitHub Pages

This project is configured to be easily deployed to GitHub Pages.

1.  **Build the project**:
    ```bash
    npm run build
    ```

2.  **Deploy the `dist` folder**:
    The build output is located in the `dist` folder. You can deploy this folder to GitHub Pages.

    If using `gh-pages` package:
    ```bash
    npm install gh-pages --save-dev
    ```
    Add to `package.json`:
    ```json
    "scripts": {
      "deploy": "gh-pages -d dist"
    }
    ```
    Then run:
    ```bash
    npm run deploy
    ```

## Local Development

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Start the development server:
    ```bash
    npm run dev
    ```

3.  Open `http://localhost:5173` in your browser.

## Troubleshooting

-   **Blank Page**: If you see a blank page when opening `index.html` directly from your file system, this is expected behavior for modern web applications using ES Modules. You must use a local server (like `npm run preview` or VS Code Live Server) or deploy to a hosting service like GitHub Pages.
