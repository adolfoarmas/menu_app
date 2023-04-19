FROM python:3.12.0a7-alpine3.17

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt

RUN apk add --update --no-cache postgresql-client build-base postgresql-dev \
                                musl-dev zlib zlib-dev linux-headers

RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    /py/bin/pip install -r /requirements.txt

# RUN python manage.py makemigrations && python manage.py migrate 

COPY . /code/
WORKDIR /code

RUN chmod -R +x ./scripts

CMD ["/scripts/run.sh"]