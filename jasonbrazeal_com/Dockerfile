FROM python:3-alpine

ARG HOST

# Validate --build-arg HOST=<HOST> was passed
RUN : "${HOST:?Build argument HOST needs to be set and non-empty.}"

WORKDIR /app

COPY ./Pipfile /app
COPY ./Pipfile.lock /app

RUN pip install pipenv
RUN pipenv install --system --deploy

COPY ./templates /app/templates
COPY ./app.py /app

EXPOSE 5000

ENV JS_BUNDLE=https://$HOST/app.bae3004f33a0dbb6a96d.js

CMD ["pipenv", "run", "gunicorn", "-w", "4", "app:app", "-b", "0.0.0.0:5000", "--access-logfile", "-", "--error-logfile", "-", "--log-level", "DEBUG"]
