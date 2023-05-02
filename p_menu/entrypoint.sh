#!/bin/sh
source /py/bin/activate
python3 manage.py makemigrations
python3 manage.py migrate --run-syncdb
# gunicorn p_menu.wsgi:application --bind 0.0.0.0:8000"]
exec "$@"
