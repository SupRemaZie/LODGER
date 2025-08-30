#!/bin/sh
set -e

echo "Waiting for database to be ready..."
while ! nc -z lodger-bd 3306; do
  echo "Database is not ready yet. Retrying in 2 seconds..."
  sleep 2
done
echo "Database is ready!"

# En prod, on utilise deploy (idempotent) et pas 'migrate dev'
npx prisma migrate deploy

# Seed (exécute 'tsx prisma/addinfos.ts' via la config Prisma)
npx tsx prisma/addinfos.ts
