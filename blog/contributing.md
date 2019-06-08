---
type: doc
---

# Contributing

Open blog is before all an open source project to share a publication of blog posts with the community.

> **"Developed by the community for everyone freely"**

## Share your blog posts

### Post rules

- Post should follow the [Code of Conduct](https://github.com/open-blog-initiative/open-blog.dev/blob/master/CODE_OF_CONDUCT.md).
- Post can't be direct advertising.
- Post can't break any copyright in its content.
- Post content should be related to "Development" or "Tech"

### How to

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
date: 2017-07-04 # A valid date corresponding to the publish date
canonical: https://example.com # If your blog post is published elsewhere, indicate it here
title: Exemple title # Required
hero: ./assets/enseigner-autrement.jpeg  # Required
description:
    This description is great for SEO # Required
tags: # array of tags to help users find your blog posts (max 3)
  - teaching
  - foo
  - bar
---
```

### Open your pull request

When you are happy of your blog post, open a `pull request` with it.

**Your pull request should only contain a single post**

- Make sure the build is passing (We use prettier to format markdowns)
- Resolve your conflicts
- Ask for two reviews from the community

When those steps are checked, a maintainer will review it.

We will check you followed the rules above:

If it looks good to them, one of them will ask you _"When do you want to publish it ?"_.

As soon as you tell us when to merge it, we will schedule it.

#### Run it locally (not required)

In order to work locally on your blog post and see how it will be displayed when merged, be sur to have NodeJS installed (>=10.15).

- Fork this repository ["Fork me !"](https://github.com/open-blog-initiative/open-blog.dev)
- Clone your forked version
- Install dependencies

```sh
yarn install
```

- Generate a github empty token https://github.com/settings/tokens
- create a `.env` file containing

```
GITHUB_TOKEN=<your generated token>
```

- Start dev server

```sh
yarn start
```

## Make "Open Blog" a better place

If you have any idea to improve _Open blog_ globally, don't hesitate to open a discussion [Github issues](https://github.com/open-blog-initiative/open-blog.dev/issues/new) (Take 5 minutes to check if your idea has not been submitted yet).

Look at our ["Good first issue"](https://github.com/open-blog-initiative/open-blog.dev/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) list if you are looking for an idea.
