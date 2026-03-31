# Newspaper - Astro Blog Theme

`newspaper` is a minimal, accessible, and SEO-friendly Astro blog theme designed for long-form writing. It is an ideal starter for personal blogs, technical notes, and project journals, with built-in support for bilingual content (Chinese and English).

This theme extends the clean, readable aesthetic of themes like Paper and PaperMod, while leveraging Astro's native features for a modern, performant, and maintainable structure.

## Features

- **Bilingual Structure**: Pre-configured for `zh-cn` and `en` content.
- **Content-First**: Built with `astro:content` for robust content management.
- **Markdown & MDX**: Write in standard Markdown or use Astro components with MDX.
- **Responsive Images**: Automatic image optimization with `astro:assets` and `sharp`.
- **Core Blog Features**: Homepage, pagination, archive, tags, search, about page, 404, and RSS feeds.
- **Enhanced Reading Experience**: Table of contents, reading progress bar, code block copy button, back-to-top link, and view transitions.
- **Theming**: Light and dark mode support.
- **Comments**: Optional integration with Waline for comments.

## Live Demo

- **Demo Site**: [https://mufengyian.github.io/astro-newspaper/](https://mufengyian.github.io/astro-newspaper/)
- **GitHub Wiki (Full Docs)**: [https://github.com/mufengyian/astro-newspaper/wiki](https://github.com/mufengyian/astro-newspaper/wiki)

## Quick Start

**Prerequisites:**
- Node.js `>= 22.12.0`
- npm `>= 10`

**1. Get the Project**

Clone the repository or use it as a template on GitHub:

```bash
git clone https://github.com/mufengyian/astro-newspaper.git your-blog-name
cd your-blog-name
```

**2. Install Dependencies**

```bash
npm install
```

**3. Configure Environment**

Copy the example environment file and update it with your site's URL.

```bash
cp .env.example .env
```

**File: `.env`**
```
PUBLIC_SITE_URL="https://your-domain.com"
PUBLIC_WALINE_SERVER_URL="https://your-waline-server.vercel.app" # Optional
```

**4. Run the Development Server**

```bash
npm run dev
```

Your site is now available at `http://localhost:4321`.

## Project Customization

Key configuration files to get you started:

- **`src/config.ts`**: Site title, author name, typography, pagination settings, and social media links.
- **`src/utils/i18n.ts`**: UI text for both Chinese and English versions of the site.
- **`src/content/posts/`**: Directory for your blog posts. Feel free to remove the sample posts.
- **`src/assets/covers/`**: Directory for post cover images.

For more detailed guides on configuration, content creation, MDX, images, i18n, and deployment, please refer to the [official project Wiki](https://github.com/mufengyian/astro-newspaper/wiki).

## Contributing

Contributions are welcome! If you find a bug or have a suggestion for improvement, please open an issue or submit a pull request. Please ensure your code follows the existing style and that all tests pass.

## License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

*This theme is inspired by [Paper](https://github.com/nanxiaobei/hugo-paper), [PaperMod](https://github.com/adityatelange/hugo-PaperMod), and [astro-paper](https://github.com/satnaing/astro-paper).*
