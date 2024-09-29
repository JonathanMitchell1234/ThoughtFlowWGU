# Use the official MySQL image as the base image
FROM mysql:8.0

# Define build arguments
ARG MYSQL_ROOT_PASSWORD
ARG MYSQL_DATABASE

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
ENV MYSQL_DATABASE=${MYSQL_DATABASE}

# Copy the SQL script to the Docker container
COPY thoughtflow_journal_db.sql /docker-entrypoint-initdb.d/

# Expose the MySQL port
EXPOSE 3306