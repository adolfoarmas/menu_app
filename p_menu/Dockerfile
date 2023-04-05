FROM python:3.9

WORKDIR /code

COPY requirements.txt /code/

RUN pip install --upgrade pip && pip install -r requirements.txt

# RUN python manage.py makemigrations && python manage.py migrate 

COPY . /code/

CMD ["gunicorn", "p_menu.wsgi:application", "--bind", "0.0.0.0:8000"]