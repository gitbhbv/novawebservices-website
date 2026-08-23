# NOVA Web Services — portable source

This package is a portable copy of the website source. It does not include the
original ChatGPT Sites project connection, installed dependencies, or any runtime
email secrets.

## Open it in another ChatGPT account

Upload the ZIP file and ask the agent to extract and inspect it before making
changes. The normal build needs Node.js 22 or newer, npm, Bash, and GNU
`timeout`. In an environment without Bash or GNU `timeout`, run:

```sh
npm install
npm run build:portable
```

The contact-form email settings are deliberately not included. Configure those
only when deploying to the final Cloudflare Worker.
