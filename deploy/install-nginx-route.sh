#!/usr/bin/env bash
# Install the /hindsight route into the dev.perspectivity.co nginx config.
# Run:  sudo bash /home/projects/hindsight/deploy/install-nginx-route.sh
set -euo pipefail

CONF="/etc/nginx/sites-enabled/dev.perspectivity.co.conf"
MARKER="location /hindsight/"

if grep -q "$MARKER" "$CONF"; then
    echo "✓ /hindsight route already present in $CONF — nothing to do."
    exit 0
fi

cp "$CONF" "$CONF.bak.$(date +%Y%m%d%H%M%S)"
echo "Backed up $CONF"

python3 - "$CONF" <<'PY'
import sys

conf = sys.argv[1]
s = open(conf).read()

SNIPPET = """    # ── Hindsight — the YouTube narrative map (API + static dashboard on :8300)
    location = /hindsight { return 301 /hindsight/; }
    location /hindsight/ {
        proxy_pass http://127.0.0.1:8300/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
        proxy_read_timeout 300s;   # grounded chat + contradiction runs are long calls
    }

"""

anchor = "    location / {"
if anchor not in s:
    sys.exit("anchor 'location / {' not found in " + conf)
s = s.replace(anchor, SNIPPET + anchor, 1)
open(conf, "w").write(s)
print("Inserted /hindsight route above 'location / {'")
PY

nginx -t
systemctl reload nginx
echo "✓ nginx reloaded — https://dev.perspectivity.co/hindsight is live"
