FROM nginx:stable

ENV HOME_EULER_URL="https://euler.loicviennois.com"
ENV HOME_BINARY_URL="https://binary.loicviennois.com"
ENV HOME_KSP_URL="https://ksp.loicviennois.com"

RUN apt-get update && apt-get install --no-install-recommends -y curl

COPY src /usr/share/nginx/html

HEALTHCHECK CMD curl -f http://localhost/ || exit 1
