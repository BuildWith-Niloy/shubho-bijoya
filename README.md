# Shubho Bijoya Greeting Website

A responsive single-page greeting made with HTML, CSS, and vanilla JavaScript. The cleaned watercolor artwork is optimized with Python/Pillow into `assets/bijoya-background.webp`.

## Preview locally
1. Extract this folder.
2. Open `index.html` in a modern browser. For the most reliable copy-to-clipboard behavior, serve the folder locally (for example, with VS Code Live Server).

## Personal links
The page reads the recipient from the URL query parameter `?to=username` and replaces `x` in the wish with that value. Examples:
- `index.html?to=ananya`
- `https://your-site.example/?to=ananya`

Type a recipient name and press **Create Personal Link** to create the URL and copy it. **Copy Wish** copies the currently displayed greeting.

## Publish
Upload the contents of this folder (not just the ZIP) to GitHub Pages, Netlify, or another static host. The personalized links will then use the live website URL.

## Files
- `index.html` — page structure
- `style.css` — layout, colors, responsive styling, animation
- `script.js` — typewriter effect, recipient personalization, clipboard actions, falling flowers
- `assets/bijoya-background.webp` — cleaned background artwork
