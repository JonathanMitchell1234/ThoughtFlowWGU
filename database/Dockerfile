# Use the official MySQL image as the base image
FROM mysql:8.0

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=Camelwides9864!
ENV MYSQL_DATABASE=journal_db

# Copy the SQL script to the Docker container
COPY thoughtflow_journal_db.sql /docker-entrypoint-initdb.d/

# Expose the MySQL port
EXPOSE 3306