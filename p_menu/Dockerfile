FROM python:alpine3.17

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt

RUN apk add --update --no-cache postgresql-client build-base postgresql-dev \
                                musl-dev zlib zlib-dev linux-headers

RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    /py/bin/pip install -r /requirements.txt

COPY . .
WORKDIR .

CMD ["gunicorn", "p_menu.wsgi:application", "--bind", "0.0.0.0:8000"]
