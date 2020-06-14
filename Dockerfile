FROM nginx:stable

RUN apt-get update && apt-get install --no-install-recommends -y curl

COPY src /usr/share/nginx/html

HEALTHCHECK CMD curl -f http://localhost/ || exit 1
