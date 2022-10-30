# CIS3760

## Webserver URL
https://34.130.208.221

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
In order to run the app in a production environment, you will need to build and run the docker images.

First, connect to the machine you want to deploy the app on using `ssh`. Clone the project repository and navigate into it.

If you don't have `make` installed, you must install it using `sudo apt install make`.

Run the following command to install docker and docker-compose:
```
sudo apt install docker.io docker-compose
```

Run this command to build the docker images (you may need to run this as root):
```
make build
```

Finally, you can run the app using (you may also need to run this as root):
```
docker-compose up -d
```

The app should now be running in the background as two docker containers on your machine (`cis3760-react` and `cis3760-api`).

## Configuration
The deploy script creates basic config files for NGINX and Gunicorn that are necessary to run the app. The NGINX config is copied to /etc/nginx/sites-available/react.conf and a symlink is created to the config in /etc/nginx/sites-enabled. The flask service file is copied to /etc/systemd/system/flask.service. No additional changes are necessary.

## Server commands
```
sudo systemctl restart nginx
```
Restarts the nginx server. This does not change the status of the flask server, only the nginx component. Check wiki for more documentation on the flasks server aspect

```
sudo systemctl stop nginx
```
Stops the flask server. Should only be reserved for major problems.

```
sudo systemctl start nginx
```
Will start the server, use if the server has been stopped and a new instance needs to be started.