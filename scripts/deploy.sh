# Set up nginx
printf "\033[1;33mSetting up Nginx...\033[0m\n"
sudo apt install nginx -y
sudo cp config/nginx/cis3760.conf /etc/nginx/sites-available
sudo ln -s /etc/nginx/sites-available/cis3760.conf /etc/nginx/sites-enabled
sudo rm /etc/nginx/sites-enabled/default
sudo systemctl restart nginx

# Deploy to /app
printf "\033[1;33mDeploying files...\033[0m\n"
sudo mkdir -p /app/backend
sudo cp -r src/flask/* venv /app/backend
sudo groupadd -f cis3760
sudo useradd -g cis3760 cis3760
sudo chown -R root:cis3760 /app
sudo chmod 771 /app