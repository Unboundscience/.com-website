#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Deploy Script - Unbound Science
# Usage: bash deploy.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

VPS_HOST="root@161.97.139.193"
VPS_PORT="22"
REMOTE_DIR="/var/www/digaoriginal.com/mockup-unbound"

SSH="ssh -o StrictHostKeyChecking=accept-new -p $VPS_PORT $VPS_HOST"
SCP="scp -o StrictHostKeyChecking=accept-new -P $VPS_PORT"

echo "=== Deploy Unbound Science ==="

# Step 1: Build
echo "[1/3] Building..."
npm run build

# Step 2: Upload dos arquivos
echo "[2/3] Enviando arquivos..."
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
$SSH "mkdir -p $REMOTE_DIR"
$SCP -r "$SCRIPT_DIR/dist/"* "$VPS_HOST:$REMOTE_DIR/"

# Step 3: Ajustar permissões e reiniciar
echo "[3/3] Finalizando..."
$SSH "chown -R www-data:www-data $REMOTE_DIR && chmod -R 755 $REMOTE_DIR && cd /var/www/digaoriginal.com && docker compose restart"

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "  Deploy concluído!"
echo "  Site: https://digaoriginal.com/mockup-unbound/"
echo "════════════════════════════════════════════════════════════════"
