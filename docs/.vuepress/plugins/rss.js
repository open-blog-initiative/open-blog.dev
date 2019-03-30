const path = require("path");
const RSS = require("rss");
const chalk = require("chalk");
const _ = require("lodash");

module.exports = ({ count = 20, basePath = "https://open-blog.dev" }, ctx) => {
  return {
    name: "rss",

    generated() {
      const fs = require("fs-extra");
      const { pages, sourceDir } = ctx;
      const siteData = require(path.resolve(sourceDir, ".vuepress/config.js"));

      _.forEach(siteData.locales, (value, langPath) => {
        console.log(chalk.yellow(`Generating ${value.lang} RSS...`));

        const feed = new RSS({
          title: value.title,
          feed_url: `${basePath}${langPath}rss.xml`,
          site_url: basePath,
          copyright: `Open Blog 2019`,
          language: value.lang
        });

        pages
          .filter(
            page => String(page.frontmatter.type).toLowerCase() === "post"
          )
          .filter(page => page._localePath === langPath)
          .map(page => ({ ...page, date: Date.parse(page.frontmatter.date) }))
          .sort((a, b) => b.date - a.date)
          .map(page => ({
            title: page.title,
            url: `${basePath}${page.path}`,
            date: page.date
          }))
          .slice(0, count)
          .forEach(page => feed.item(page));

        fs.writeFile(
          path.resolve(path.join(ctx.outDir, langPath), "rss.xml"),
          feed.xml()
        );
        console.log(chalk.green(`${value.lang} RSS has been generated!`));
      });
    }
  };
};
