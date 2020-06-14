FROM nginx:stable

RUN apt-get update && apt-get install --no-install-recommends -y curl

COPY src /usr/share/nginx/html

HEALTHCHECK --interval=1m CMD curl -f http://localhost/ || exit 1
