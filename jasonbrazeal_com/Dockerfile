FROM python:3-alpine

WORKDIR /app

COPY ./Pipfile /app
COPY ./Pipfile.lock /app

RUN pip install pipenv
RUN pipenv install --system --deploy

COPY ./templates /app/templates
COPY ./app.py /app

EXPOSE 5000

ENV NGINX_HOST=http://localhost
ENV JS_BUNDLE=$NGINX_HOST/app.0eeed7f5de53cfc96945.js

# CMD ["/bin/sh"]
CMD ["pipenv", "run", "gunicorn", "-w", "4", "app:app", "-b", "0.0.0.0:5000", "--access-logfile", "-", "--error-logfile", "-", "--log-level", "DEBUG"]
# CMD ["pipenv", "run", "gunicorn", "-w", "4", "app:app", "-b", "unix:/socket/gunicorn.sock", "--access-logfile", "-", "--error-logfile", "-", "--log-level", "DEBUG"]

# docker build -t jasonbrazeal.com .
# docker run --rm -it -p 8000:8000 --name=jasonbrazeal.com jasonbrazeal.com
# docker run --rm -it -p 8000:8000 --name=jasonbrazeal.com -v $(pwd):/app jasonbrazeal.com
