CREATE DATABASE ms_providers;

CREATE USER ms_dev with password 'docker';

GRANT ALL PRIVILEGES ON DATABASE ms_providers TO ms_dev;
