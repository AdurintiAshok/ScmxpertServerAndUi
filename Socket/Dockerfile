# Use an official Python runtime as a parent image
FROM python:3.9
# Set the working directory to /app
WORKDIR /server
# Copy the current directory contents into the container at /app
COPY . .
EXPOSE 12345
# Run the command to start the script
CMD [ "python", "Server.py" ]
