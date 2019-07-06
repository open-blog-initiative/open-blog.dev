---
type: doc
commentIssueId: 31
canonical: https://open-blog.dev/contributing
title: Contribute
description: This page explains how to contribute to Open blog by publishing your own content in it.
---

Open blog is before all an open source project to share a publication of blog posts with the community.

> **"Developed by the community for everyone, freely without tracking or ads"**

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
commentIssueId: 31 # Id of a issue that will keep comments about your post
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

## Question and answer

- **Should I share content I don't directly own ?**

  No you can't, the only one who can is the author.

- **Can I use GIF in my articles ?**

  Not for now sorry :'(

- **Can I share my article on my own blog ?**

  Yes, of course, that is the model we are defending **POSSE: Publish (on your) Own Site, Syndicate Elsewhere**.
  Make sure you define `canonical` in _frontmatter_ part of your blog post here targeting your blog post page.
  This will prevent a duplicate content error.

- **How can I submit my ideas and comments ?**

  Just open an issue ! https://github.com/open-blog-initiative/open-blog.dev/issues/new

- **How can I add "comments section" in my blog post ?**

  Just add `commentIssueId` with id of an existing github issue in https://github.com/open-blog-initiative/open-blog.dev to let your readers exchange with you.

- **Can I remove my blog post ?**

  If you are the author, yes of course.

- **Will you ever move my content without asking ?**

  No way !

- **I don't have Github account, how can I add a blog post ?**

  You actually can't open a `Pull request` on this project without a github account.

- **Can I use a Github organisation as an author?**

  Yes, of course. Submitter should be member of the organisation.

- **How can I move my Medium content to Open Blog ?**

  Like many authors, if you want to avoid your readers getting stuck behind a paywall, you can simply export your article in Markdown format with this [tool](https://www.npmjs.com/package/mediumexporter).

- **Can my article be rejected ?**

  Yes, unfortunately if your article does not respect the rules it can be rejected.
  For example, if your article just contains an advertisement for your company, we let ourselves the right to refuse it.

- **Can I correct a typography ?**

  Of course, but try as much as possible not to submit an article with typos.

- **Can I share my old blog post ?**

  There is no concept of old blog post when it is really great to read.

## Make "Open Blog" a better place

If you have any idea to improve _Open blog_ globally, don't hesitate to open a discussion [Github issues](https://github.com/open-blog-initiative/open-blog.dev/issues/new) (Take 5 minutes to check if your idea has not been submitted yet).

Look at our ["Good first issue"](https://github.com/open-blog-initiative/open-blog.dev/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) list if you are looking for an idea.
