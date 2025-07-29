#!/bin/sh

echo "Collect static files"
python manage.py collectstatic --noinput

echo "Gunicorn starting"
exec "$@"