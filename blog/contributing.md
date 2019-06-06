---
type: doc
---

# Contributing

Open blog is before all an open source project to share a publication of blog posts with the community.

> Developed by the community for everyone freely

## Share your blog posts

Before adding your blog post to Open blog, you should check these 3 steps.

### Post rules

- Post should follow the [Code of Conduct](https://github.com/open-blog-initiative/open-blog.dev/blob/master/CODE_OF_CONDUCT.md).
- Post can't be direct advertising.
- Post can't break any copyright in its content.
- Post content should be related to "Development"
- Post should be written in English

NB: For now we only support two languages because those are maintainer ones.
If you want to be part of the maintainer of Open Blog for another language, just contact one of the maintainer.

### How to

#### Install

In order to work locally on your blog post and see how it will be displayed when merged, be sur to have NodeJS installed (>=10.15).

- Fork this repository ["Fork me !"](https://github.com/open-blog-initiative/open-blog.dev)
- Clone your forked version
- Install dependencies

```sh
yarn install
```

- Start dev server

```sh
npm run docs:dev
```

or

```sh
yarn docs:dev
```

#### Create your post file

In `blog/posts` folder, create a folder with your github name.
In this fresh new directory, just create a [Markdown file](https://fr.wikipedia.org/wiki/Markdown).
Name it with a dashCase title (example: `my-awesome-post.md`.

##### Metadata

At the beginning of you blog post, you must define `frontmatter` block to add metadata to your post.

```yml
------
type: post
author: Antoine CARON # Required
pseudo: Slashgear # If you have one
github_profile: Slashgear # will display github icon link to you profile
twitter_profile: Slashgear_ # will display twitter icon link to you profile
---
```

### Open your pull request

When you are happy of your blog post, open a `pull request` with it.

**Your pull request should only contain a single post**

- Make sure the build is passing (We use prettier to format markdowns)
- Resolve your conflicts
- Ask for two reviews from the community

When those steps are checked, a maintainer will review it.

We will check you followed the [rules](#post-rules):

If it looks good to them, one of them will ask you _"When do you want to publish it ?"_.

As soon as you tell us when to merge it, we will schedule it.

## Make "Open Blog" a better place :sparkles:

If you have any idea to improve _Open blog_ globally, don't hesitate to open a discussion [Github issues](https://github.com/open-blog-initiative/open-blog.dev/issues/new) (Take 5 minutes to check if your idea has not been submitted yet).

Look at our ["Good first issue"](https://github.com/open-blog-initiative/open-blog.dev/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) list if you are looking for an idea.
