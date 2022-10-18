sudo apt update

printf "\033[1;33mDeploying files...\033[0m\n"

# Copy files to deploy directory
sudo mkdir -p /app
sudo cp -r src/flask/* venv /app

# Update permissions of deploy directory
sudo groupadd -f cis3760
sudo chown root:cis3760 /app
sudo chmod 770 /app

# Set up nginx
printf "\033[1;33mSetting up Nginx...\033[0m\n"
sudo apt install nginx -y
sudo cp config/nginx/cis3760.conf /etc/nginx/sites-available
sudo ln -s /etc/nginx/sites-available/cis3760.conf /etc/nginx/sites-enabled
sudo systemctl restart nginx

# Set up Flask
printf "\033[1;33mSetting up Flask...\033[0m\n"
sudo apt install python3 -y
sudo apt install python3-pip -y
sudo apt install python3-venv -y
pip install virtualenv
python3 -m venv venv
. venv/bin/activate
pip install Flask

# Set up Gunicorn
printf "\033[1;33mSetting up Gunicorn...\033[0m\n"
sudo apt install gunicorn -y
pip install gunicorn
sudo cp config/gunicorn/cis3760.service /etc/systemd/system
sudo systemctl restart cis3760.service
sudo systemctl daemon-reload

deactivate