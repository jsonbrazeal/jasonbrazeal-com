FROM nginx:latest

ARG HOST

# Validate --build-arg HOST=<HOST> was passed
RUN : "${HOST:?Build argument HOST needs to be set and non-empty.}"

RUN rm -rf /etc/nginx/conf.d/*
COPY ./nginx.conf /etc/nginx/
COPY ./build /ui

RUN sed -i "s/HOST/$HOST/g" /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443
