FROM python:3.10-alpine

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt

RUN apk add --update --no-cache postgresql-client build-base postgresql-dev \
                                musl-dev zlib zlib-dev linux-headers

RUN python3 -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    /py/bin/pip install -r /requirements.txt


COPY . .

# RUN /py/bin/pip show django && \
#     python3 --version

# RUN echo $PYTHONPATH

WORKDIR /

COPY ./entrypoint.sh /

ENTRYPOINT [ "sh", "entrypoint.sh" ]

# CMD ["sh", "-c", "source /py/bin/activate && gunicorn p_menu.wsgi:application --bind 0.0.0.0:8000"]
