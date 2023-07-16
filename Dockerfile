# FROM python:3.9.1
# RUN mkdir /app
# WORKDIR /app
# RUN cd /app
# COPY /requirements.txt /app/requirements.txt
# RUN pip install -r requirements.txt
# EXPOSE 8000
# RUN rm -rf /app
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
# FROM python:3.11.4

# RUN mkdir /code

# WORKDIR /code

# COPY requirements.txt .

# RUN pip install -r requirements.txt

# COPY . .
# RUN pwd
# RUN ls
# CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--port=8000"]


FROM python

WORKDIR /

COPY ./requirements.txt .

RUN pip install -r ./requirements.txt

COPY . .

EXPOSE 8000