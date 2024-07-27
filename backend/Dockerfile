# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt /app/requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app

# Copy wait-for-it script and set execute permissions
COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run the application with wait-for-it
CMD ["sh", "-c", "./wait-for-it.sh db:5432 -- python manage.py runserver 0.0.0.0:8000"]

