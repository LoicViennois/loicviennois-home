FROM nginx:stable

ENV HOME_EULER_URL="https://euler.loicviennois.com"
ENV HOME_BINARY_URL="https://binary.loicviennois.com"
ENV HOME_KSP_URL="https://ksp.loicviennois.com"

COPY src /usr/share/nginx/html

COPY docker-entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
