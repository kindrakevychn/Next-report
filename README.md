# Valurank Report

## Content

- [Content](#content)
- [Overview](#overview)
- [Changelog](#changelog)
- [Architecture](#architecture)
- [Version](#version)
- [Development](#development)
  - [Requirements](#requirements)
  - [Wrangler](#wrangler)
  - [Installation](#installation)
  - [Scripts](#scripts)
  - [How to make a release](#how-to-make-a-release)
  - [How to organize pull requests](#how-to-organize-pull-requests)
  - [How to create OG images](#how-to-create-og-images)
- [Version naming](#version-naming)

## Overview

It is a web app which provides detailed report about specific Valurank score. To get data it interacts with Valurank API.

## Changelog

See [Releases](https://github.com/Valurank/report/releases).

## Architecture

This app is intended to be deployed with [Cloudflare Pages](https://pages.cloudflare.com/). App is built with [Next.js](https://nextjs.org/). It is intended to be static web app, i.e. it uses [static HTML export](https://nextjs.org/docs/advanced-features/static-html-export). The reason is Cloudflare Pages. It uses [Cloudflare Workers Functions](https://developers.cloudflare.com/pages/platform/functions) to implement needed logic on backend side.

Also see the [docs](docs/) folder which might give you some overview.

## Version

`version` from `package.json` will not give you any valuable information. This project uses commit hash as pointer to specific version, and tags to mark release. See [version naming](#version-naming) for tags.

## Development

### Requirements

- [Node.js 16.13.1+](https://nodejs.org)
- [npm 8.3.0+](https://www.npmjs.com/package/npm)
- [git](https://git-scm.com/)

### Wrangler

Note that you don't need to install [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler) by yourself. The reason is that at the moment Cloudflare Pages requires Wrangler 2.0 which is still in beta. Most likely that you just want to have one official Wrangler 1.x on your machine, not to mess with several Wrangler apps. So the project comes with Wrangler 2.0 as NPM package.

### Installation

1. Clone this repository.
2. Install NPM packages.

### Scripts

See the [package.json](package.json). Script purpose should be clear from the script title.

### How to make a release

Try to do frequent small releases instead of large infrequent ones.

1. In separate PR add specific change. Try to do one PR per specific change.
2. Merge this PR into `master`. Note that it will go in production instantly.
3. Perform 1-2 steps as much as needed, i.e. decide what changes will be in one specific release.
4. When № 3 is done, open [Releases](https://github.com/Valurank/report/releases).
5. Click on "Draft new release".
6. Fill next tag, release title, click on "Auto-generate release notes".
7. Click on "Publish release".
8. Specific release will refer to specific commit. Use this commit as specific version indicator. Using CF Pages console you can rollback to this commit if needed.

### How to organize pull requests

Try to make one PR per one logical change. Don't commit unconnected changes into one PR. Treat PR title as a line in changelog, it should help you to organize them properly.

It is recommended to request review from project maintainers. If PR introduces complex changes, it is recommended to write description in PR conversation thread.

### How to create OG images

At the moment there is no tool that automates this process, so you need to create all OG images manually. Easiest way is to create necessary HTML template in the extension by modifying popup page, then open Developer Console (CTRL+SHIFT+C), select needed element to capture screenshot, open Commands (CTRL+SHIFT+P), search for "Capture node screenshot" and click on it. Toggle page zoom and modify CSS styles to achieve needed size, aspect ratio and style. There is a plans to automate this process using [puppeteer](https://github.com/puppeteer/puppeteer) or something similar.

## Version naming

This project uses following structure for version naming: `<MAJOR RELEASE>.<CHANGES OF ANY KIND>`.

Because of frequent releases this project refused of [semantic versioning](https://semver.org/).
