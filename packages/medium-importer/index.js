#!/usr/bin/env node
const axios = require("axios")
const fs = require("fs")
const sanitize = require("sanitize-filename")
const assert = require("assert").strict

const MEDIUM_IMG_CDN = "https://cdn-images-1.medium.com/max/"
let mentionedUsers = []

function createFolder(path) {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true })
    }
  } catch (err) {
    // may exist already, ignore
    console.error(err)
  }
  return
}

async function downloadImages(images, options = {}) {
  const articleImages = []

  for (const image of images) {
    let file = sanitize(image.split("/")[image.split("/").length - 1])

    if (options.featuredImage && options.featuredImage === file) {
      let type = file.split(".")[file.split(".").length - 1]
      file = `featuredImage.${type}`
    }

    const response = await axios
      .get(image, { responseType: "arraybuffer" })
      .then(response => Buffer.from(response.data, "binary"))
    console.log(image)
    fs.writeFileSync(
      `./blog/posts/${author}/assets/${file}`,
      response,
      "base64"
    )
    articleImages.push(file)
  }
  return articleImages
}

async function loadMediumPost(mediumURL, options = {}) {
  if (mediumURL.indexOf("?source") > -1) {
    mediumURL = mediumURL.split("?")[0]
  }
  if (mediumURL.match(/^http/i)) {
    mediumURL = mediumURL.replace(/#.*$/, "")
    mediumURL = `${mediumURL}?format=json`
    const response = await axios
      .get(mediumURL, { transformResponse: undefined, responseType: "text" })
      .then(res => res.data)
    const json = JSON.parse(response.substr(response.indexOf("{")))
    mentionedUsers = json.payload.mentionedUsers
    return json
  } else {
    json = require(process.cwd() + "/" + mediumURL)
    return json
  }
}

function processSection(s, slug, images, options = {}) {
  let section = ""
  if (s.backgroundImage) {
    const imgwidth = parseInt(s.backgroundImage.originalWidth, 10)
    const imgsrc =
      MEDIUM_IMG_CDN + Math.max(imgwidth * 2, 2000) + "/" + s.backgroundImage.id
    images.push(imgsrc)
    section = "\n![](" + s.backgroundImage.id + ")"
    if (!!options.jekyll) {
      section = `\n![](/assets/images/${options.imageFolder +
        s.backgroundImage.id})`
    }
  }
  return section
}

async function getPost(mediumURL) {
  options = {}

  let output = `./blog/posts/${author}`
  const json = await loadMediumPost(mediumURL, options)
  const s = json.payload.value
  const story = {}
  const images = []

  story.title = s.title.replace(/:/g, "&#58;")
  story.subtitle = s.virtuals.subtitle.trim().replace(/:/g, "&#58;")
  story.author = s.displayAuthor
  story.date = new Date(s.createdAt).toJSON()
  story.slug = s.slug
  story.url = s.canonicalUrl
  story.images = []
  story.language = s.detectedLanguage
  if (s.virtuals.tags) {
    story.tags = s.virtuals.tags.map(t => t.slug)
  }
  if (s.license && s.license !== 0) {
    story.license = s.license
  }

  if (s.virtuals.previewImage) {
    story.featuredImage = s.virtuals.previewImage.imageId
  }

  story.sections = s.content.bodyModel.sections
  story.paragraphs = s.content.bodyModel.paragraphs

  const sections = []
  for (let i = 0; i < story.sections.length; i++) {
    const s = story.sections[i]
    const section = processSection(s, story.slug, images, options)
    sections[s.startIndex] = section
  }

  if (story.paragraphs.length > 1) {
    story.subtitle = story.paragraphs[1].text
  }

  story.markdown = []

  let lastParagraph = null
  story.paragraphs = story.paragraphs.filter((p, idx) => {
    if (p.type === 8 && lastParagraph && lastParagraph.type === 8) {
      lastParagraph.text += "\n\n" + p.text
      return false
    }
    lastParagraph = p
    return true
  })

  const promises = []
  for (let i = 2; i < story.paragraphs.length; i++) {
    if (sections[i]) story.markdown.push(sections[i])

    const promise = new Promise(function(resolve, reject) {
      const p = story.paragraphs[i]

      const text = processParagraph(p, story.slug, images, options)
      return resolve(text)
    })
    promises.push(promise)
  }

  return Promise.all(promises)
    .then(async results => {
      if (!!images.length) {
        let featuredImage = story.featuredImage
        let outputPath = `./blog/posts/${author}/assets`

        createFolder(outputPath)
        story.images = await downloadImages(images, {
          featuredImage: featuredImage,
          imageFolder: outputPath,
        })
      } else {
        createFolder(output)
      }

      for (let text of results) {
        story.markdown.push(text)
      }

      // frontmatter
      let outputText = ""
      outputText = "---\n"
      outputText += `date: ${story.date}\n`
      outputText += `author: "${story.author}"\n`
      outputText += `title: "${story.title}"\n`
      outputText += `lang: ${story.language}\n`
      outputText += `canonical: ${mediumURL}\n`
      outputText += `pseudo: ${author}\n`
      if (story.subtitle) {
        outputText += `subtitle: "${story.subtitle}"\n`
      }
      if (story.images.length > 0) {
        outputText += "images:\n"
        for (const image of story.images) {
          outputText += `  - ${image}\n`
        }
      }
      if (story.tags.length > 0) {
        outputText += "tags:\n"
        for (const tag of story.tags) {
          outputText += `  - ${tag}\n`
        }
      }
      outputText += "---\n"

      outputText += story.markdown.join("\n")

      let outputPath = `${output}/${story.slug}.md`

      if (output) {
        fs.writeFileSync(outputPath, outputText)
        return
      } else {
        return outputText
      }
    })
    .catch(err => {
      console.log("something went wrong")
      console.log(err)
      return err
    })
}

async function processParagraph(p, slug, images, options = {}) {
  const markups_array = createMarkupsArray(p.markups)

  if (markups_array.length > 0) {
    let previousIndex = 0
    let j = 0
    const text = p.text
    const tokens = []
    for (j = 0; j < markups_array.length; j++) {
      if (markups_array[j]) {
        token = text.substring(previousIndex, j)
        previousIndex = j
        tokens.push(token)
        tokens.push(markups_array[j])
      }
    }
    tokens.push(text.substring(j - 1))
    p.text = tokens.join("")
  }

  if (p.type !== 8 && p.type !== 10) {
    p.text = p.text.replace(/>/g, "&gt;").replace(/</g, "&lt;")
  }

  let markup = ""
  switch (p.type) {
    case 1:
      markup = "\n"
      break
    case 2:
      p.text = "\n# " + p.text.replace(/\n/g, "\n# ")
      break
    case 3:
      p.text = "\n## " + p.text.replace(/\n/g, "\n## ")
      break
    case 4: // image & caption
      const imgwidth = parseInt(p.metadata.originalWidth, 10)
      const imgsrc =
        MEDIUM_IMG_CDN + Math.max(imgwidth * 2, 2000) + "/" + p.metadata.id
      images.push(imgsrc)
      let text =
        "\n![" + p.text + "](./assets/" + p.metadata.id.replace("*", "") + ")"
      p.text = text
      break
    case 6:
      markup = "> "
      break
    case 7: // quote
      p.text = "> # " + p.text.replace(/\n/g, "\n> # ")
      break
    case 8:
      p.text = "\n```\n" + p.text + "\n```\n"
      break
    case 9:
      markup = "\n* "
      break
    case 10:
      markup = "\n1. "
      break
    case 11:
      return await getGitHubEmbed(
        "https://medium.com/media/" + p.iframe.mediaResourceId,
        options
      )
    case 13:
      markup = "\n### "
      break
    case 15: // caption for section image
      p.text = "*" + p.text + "*"
      break
  }

  p.text = markup + p.text

  if (p.alignment == 2 && p.type != 6 && p.type != 7)
    p.text = "<center>" + p.text + "</center>"

  return p.text
}

function addMarkup(markups_array, open, close, start, end) {
  if (markups_array[start]) markups_array[start] += open
  else markups_array[start] = open

  if (markups_array[end]) markups_array[end] += close
  else markups_array[end] = close

  return markups_array
}

function createMarkupsArray(markups) {
  if (!markups || markups.length == 0) return []
  const markups_array = []
  for (let j = 0; j < markups.length; j++) {
    const m = markups[j]
    switch (m.type) {
      case 1: // bold
        addMarkup(markups_array, "**", "**", m.start, m.end)
        break
      case 2: // italic
        addMarkup(markups_array, "*", "*", m.start, m.end)
        break
      case 3: // anchor tag
        if (m.userId) {
          const user = mentionedUsers.find(u => u.userId === m.userId)
          if (user.twitterScreenName) {
            addMarkup(
              markups_array,
              `[`,
              `](https://twitter.com/${user.twitterScreenName})`,
              m.start,
              m.end
            )
          } else {
            addMarkup(
              markups_array,
              `[`,
              `](https://medium.com/@${user.username})`,
              m.start,
              m.end
            )
          }
        } else {
          addMarkup(markups_array, "[", "](" + m.href + ")", m.start, m.end)
        }
        break
      case 10: // code
        addMarkup(markups_array, "`", "`", m.start, m.end)
        break
      default:
        console.error("Unknown markup type " + m.type, m)
        break
    }
  }
  return markups_array
}

async function getGitHubEmbed(iframesrc, options = {}) {
  let response
  let json
  try {
    response = await axios
      .get(iframesrc + "?format=json", {
        transformResponse: undefined,
        responseType: "text",
      })
      .then(res => res.data)
    json = JSON.parse(response.substr(response.indexOf("{")))
  } catch (err) {
    return err
  }

  if (json.payload.value.gist) {
    const gist = json.payload.value.gist

    if (options.hugo) {
      return `\n{{< gist ${gist.githubUsername} ${gist.gistId} >}}`
    }

    const scriptsrc = `https://api.github.com/gists/${gist.gistId}`
    let gistJson = await axios.get(scriptsrc).then(res => res.data)
    let mdSoureCode = ""
    for (const key in gistJson.files) {
      if (gistJson.files.hasOwnProperty(key)) {
        const file = gistJson.files[key]
        const language = file.language.toLowerCase()
        let gistCode = await axios.get(file.raw_url).then(res => res.data)

        mdSoureCode += "\n```" + language + "\n"
        mdSoureCode += gistCode.replace(/\t/g, "  ")
        mdSoureCode += "\n```\n"
      }
    }
    if (mdSoureCode.length > 0) {
      // remove last newline
      mdSoureCode = mdSoureCode.substr(0, mdSoureCode.length - 1)
    }

    return mdSoureCode
  }
}

const [, , ...args] = process.argv

const mediumURL = args[0]
const author = args[1]

assert.strictEqual(
  process.argv.length,
  4,
  `Only 2 parameters allowed, found ${args.length}`
)
assert.strictEqual(
  /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(author),
  true,
  `Not a valid github username`
)

getPost(args[0])
