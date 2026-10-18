# LTG mock portals (demo only)

Static mock pages for the Loblaws Agent demo:

- `/tender.html?load=01-497570` — broker tender accept page (add `&rate=3250.00` for the review case)
- `/rail/login.html` — rail booking portal: sign in, reserve equipment, book ramp-to-ramp, track by container

Any non-empty username and password signs in. No data leaves the browser.

## Deploy to Railway

```
npm i -g @railway/cli
railway login            # or: export RAILWAY_TOKEN=<your token>
railway init             # create a new project, e.g. ltg-mock-portals
railway up               # deploys; Railway runs `npm start`
railway domain           # generates the public URL
```

Send the public URL back so it can be set as MOCK_RAIL_PORTAL_URL and the tender link in the demo emails.
