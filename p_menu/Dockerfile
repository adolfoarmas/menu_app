FROM python:alpine3.17

ENV PYTHONUNBUFFERED 1


WORKDIR /code

COPY requirements.txt /code/

RUN apk add --update --no-cache postgresql-client build-base postgresql-dev \
                                musl-dev zlib zlib-dev linux-headers

RUN pip install --upgrade pip && pip install -r requirements.txt

# RUN python manage.py makemigrations && python manage.py migrate 

COPY . /code/

RUN chmod -R +x ./scripts

CMD ["/scripts/run.sh"]