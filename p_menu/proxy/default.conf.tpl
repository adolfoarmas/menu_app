server {
    listen ${LISTEN_PORT};

    location /static {
        alias /vol/web;
    }

    location / {
        include /etc/nginx/headers.conf;

        # we don't 