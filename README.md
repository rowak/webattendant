# CIS3760

## Webserver URL
https://34.130.255.55

## Running the app in development mode
There are two main components to the app: the Flask backend and the React frontend.

### Backend (Flask)
This will create a localhosted flask server
```
make run
```

### Frontend (React)
Run the following command inside of the project root.
```
npm start
```

## Installing the app
If your distribution doesn't ship with `make` you will need to install it using `sudo apt install make`.

The following command will install all of the required packages needed to run the app.
```
make install
```

## Deploying the app
In order to run the app in a production environment, you will first need to build and deploy it.

The following command deploys the app to the /app directory on the system.
```
make deploy
```

The flask server is automatically started as a daemon after this script finishes running, but the react server needs to be started manually using the following command:

```
cd /app && serve -s .
```

The flask server runs as a daemon on port 5000 and the react app run on port 3000.

## Configuration
The deploy script creates basic config files for NGINX and Gunicorn that are necessary to run the app. The NGINX config is copied to /etc/nginx/sites-available/react.conf and a symlink is created to the config in /etc/nginx/sites-enabled. The flask service file is copied to /etc/systemd/system/flask.service. No additional changes are necessary.