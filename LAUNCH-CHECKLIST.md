# NOVA Web Services launch checklist

## Required before launch

- [ ] Configure the purchased domain and Cloudflare email service.
- [x] Update `app/api/project-inquiry/route.ts` to use the Cloudflare `EMAIL` binding.
- [ ] Configure the Cloudflare `EMAIL` binding on the production Worker and set `PROJECT_INBOX` to the verified destination.
- [ ] Test the project inquiry form end to end, including delivery to `novawebservices2026@outlook.com` and reply handling.
- [ ] Confirm the Privacy Policy accurately describes the live email provider.

**Launch gate:** Do not launch or publish the production site until the Cloudflare inquiry endpoint is configured on the production Worker and tested successfully.
