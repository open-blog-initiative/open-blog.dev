module.exports = {
  title: "Open blog",
  plugins: {
    "@vuepress/pwa": {
      serviceWorker: true,
      updatePopup: {
        message: "New content is available.",
        buttonText: "Refresh"
      }
    },
    sitemap: {
      hostname: "https://open-blog.dev"
    },
    "@vuepress/medium-zoom": {}
  },
  locales: {
    "/": {
      lang: "en-US",
      title: "Open blog",
      description: "Share blog posts on an free open platform"
    },
    "/fr/": {
      lang: "fr-FR",
      title: "Blog libre",
      description: "Partage tes articles sur une plateforme libre"
    }
  },
  themeConfig: {
    locales: {
      "/": {
        selectText: "Languages",
        label: "English",
        editLinkText: "Edit this page on GitHub",
        lastUpdated: "Last Updated",
        repo: "open-blog-initiative/open-blog.dev",
        repoLabel: "Contribute!",
        docsRepo: "open-blog-initiative/open-blog.dev",
        docsDir: "docs",
        editLinks: true,
        sidebar: "auto"
      },
      "/fr/": {
        selectText: "Langues",
        label: "Français",
        editLinkText: "Edit cette page sur Github",
        lastUpdated: "Mis à jour le",
        repo: "open-blog-initiative/open-blog.dev",
        repoLabel: "Contribue !",
        docsRepo: "open-blog-initiative/open-blog.dev",
        docsDir: "docs",
        editLinks: true,
        sidebar: "auto"
      }
    }
  }
};
