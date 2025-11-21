#!/bin/sh
# wait-for-it.sh

# Alamat host dan port MongoDB
HOST="$1"
PORT="$2"
shift 2

# Tunggu hingga host:port merespons (sudah siap)
echo "Menunggu ${HOST}:${PORT}..."
while ! nc -z $HOST $PORT; do
  sleep 0.5
done
echo "${HOST}:${PORT} siap! Melanjutkan..."
exec "$@"