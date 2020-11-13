FROM nginx:stable

ENV HOME_EULER_URL="https://euler.loicviennois.com"
ENV HOME_BINARY_URL="https://binary.loicviennois.com"
ENV HOME_KSP_URL="https://ksp.loicviennois.com"
ENV MATOMO_URL="matomo.loicviennois.com"
ENV MATOMO_SITE_ID="2"

RUN apt-get update && apt-get install --no-install-recommends -y curl

COPY src /usr/share/nginx/html

COPY docker-entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

HEALTHCHECK CMD curl -f http://localhost/ || exit 1

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
