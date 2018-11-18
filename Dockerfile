FROM python:3-alpine

WORKDIR /app

COPY . /app
RUN pip install --no-cache-dir -e /app

EXPOSE 5000

CMD ["python"]


# docker build -t jasonbrazeal.com .
# docker run --rm -it -p 8000:8000 --name=jasonbrazeal.com jasonbrazeal.com
# docker run --rm -it -p 8000:8000 --name=jasonbrazeal.com -v $(pwd):/app jasonbrazeal.com
