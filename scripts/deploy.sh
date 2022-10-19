# This script deploys the app to /app on the system.
# The frontend is deployed to /app and the backend is
# deployed to /app/backend.

# The install script must be run before this script can be run.


# Set up nginx
printf "\033[1;33mSetting up Nginx...\033[0m\n"
sudo apt install nginx -y
sudo cp config/nginx/react.conf /etc/nginx/sites-available
sudo ln -s /etc/nginx/sites-available/react.conf /etc/nginx/sites-enabled
sudo rm /etc/nginx/sites-enabled/default
sudo systemctl restart nginx

# Deploy to /app
printf "\033[1;33mDeploying files...\033[0m\n"
sudo mkdir -p /app/backend
npm run build
sudo cp -r build/* /app
sudo cp -r src/flask/* venv /app/backend
sudo groupadd -f cis3760
sudo useradd -g cis3760 cis3760
sudo chown -R root:cis3760 /app
sudo chmod 771 /app

# Daemonize Flask
printf "\033[1;33mSetting up Flask...\033[0m\n"
sudo cp config/gunicorn/flask.service /etc/systemd/system
sudo systemctl restart flask.service
sudo systemctl daemon-reload

printf "\033[1;33mDeployed to /app\033[0m\n"