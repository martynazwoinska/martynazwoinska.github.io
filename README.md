# martynazwoinska.github.io

The personal academic website of **Martyna Katarzyna Zwoińska**, evolutionary
biologist at Uppsala University. It is a single page of plain HTML and CSS
(`index.html`) — no build tools, nothing to install.

## Turning the website on (GitHub Pages)

The files are here, but GitHub still needs to be told to publish them. If a preview
says “site cannot be reached,” it usually means GitHub Pages is not enabled yet,
or the latest pull request has not been merged into `main` yet.

1. On GitHub, open this repository → **Settings** (top menu) → **Pages** (left menu).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Set the branch to **`main`** and the folder to **`/ (root)`**, then **Save**.
4. Wait 1–5 minutes, refresh the Pages settings page, and it will show your live link.
5. If you are viewing changes from a pull request, click **Merge pull request** first;
   GitHub Pages normally publishes what is on `main`, not an unmerged preview branch.

### If GitHub says “Apply changes and continue locally”

You do **not** need to click that just to make the website live. It is GitHub’s
message for people who want to download the pull-request changes and keep editing
them on their own computer. For this website, the simpler path is usually:

1. Open the pull request.
2. Click **Merge pull request**.
3. Go to **Settings → Pages** and make sure the source is `main` / `/ (root)`.
4. Open the Pages link after GitHub finishes deploying.

### What your web address will be

Your GitHub username is `martynazwoinska`, and this repo is also named
`martynazwoinska.github.io`, so GitHub Pages should publish it at:

> **https://martynazwoinska.github.io/**

If GitHub shows a different repository owner, use the Pages link shown in that
repository’s **Settings → Pages** screen.

## Editing the site

Open `index.html` in any text editor. Everything is written in plain English
between the tags. Placeholders I left for you:

| What | Find this | Do this |
|------|-----------|---------|
| **Email** | `mailto:martyna.zwoinska@ebc.uu.se` | Replace if you want a different public email (appears twice) |
| **Photo** | hero image area in `index.html` | The site currently keeps the initials placeholder because this text-only review flow does not support binary image files. Add `photo.jpg` later when binary uploads are available if you want the headshot displayed. |
| **ORCID** | the `ORCID` link | Paste your ORCID URL |
| **Publications** | the Publications section | Add/remove entries |
| **Collaborators** | the Collaborators section | Add/remove people |

Or just tell me what to change and I'll edit it here, commit it, and open a pull request for you to merge.

## What would make it even better

1. A fuller publication list or a preferred subset of selected publications
2. A short bio in your own words, if you'd like to replace the current draft
3. A `photo.jpg` headshot uploaded directly in GitHub once binary uploads are available
4. A social-preview image for richer link previews on Bluesky, LinkedIn, and search results
