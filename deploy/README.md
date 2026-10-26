# Azure VPS deployment

Current URLs: documentation `http://4.165.133.94/`; landing page
`http://4.165.133.94/landing/`. The landing navigation links back to the
documentation. The source tree is `/opt/school-framework-landing/`; static
frontend files are in `/var/www/school-framework-landing/`.

This layout keeps the existing documentation at `/`. The Vite site is served
at `/landing/`; only `GET /api/common` and `GET /api/page` reach Payload through
Nginx. The CMS runs on `127.0.0.1:3000`. Until HTTPS is configured, keep
`/admin` inaccessible from the public internet and edit through an SSH tunnel.

Build the frontend with:

```sh
cd frontend
VITE_CMS_URL='' VITE_DOCS_URL='/' npm run build -- --base=/landing/
```

Copy `frontend/dist/` to `/var/www/school-framework-landing/`. Include
`deploy/nginx-locations.conf` inside the *existing* documentation Nginx server
block; do not replace its root location. Test with `nginx -t` before reloading.

Copy `cms/` to `/opt/school-framework-landing/cms/` and `deploy/compose.yaml`
to `/opt/school-framework-landing/deploy/`. Build and start the CMS with Docker
Compose after reviewing migration state; seed only if required. The private
`cms/.env` must contain
`DATABASE_URL`, `PAYLOAD_SECRET`, `SERVER_URL=http://localhost:3000`, and
`FRONTEND_ORIGIN=http://<VPS IP>`. Keep it out of Git and readable only by the
VPS account. The container binds only to `127.0.0.1:3000` on the host.

For editor access, forward your local port to the CMS loopback port:

```sh
ssh -F /dev/null -i "/home/shadowlock/Завантажене/devops-server-key.pem" -L 3000:127.0.0.1:3000 shadowlock@4.165.133.94
```

Then open `http://localhost:3000/admin` locally. When a domain and HTTPS are
configured, revise the Nginx routing and CMS URLs before exposing the admin.
