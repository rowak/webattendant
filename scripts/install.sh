printf "\033[1;33mUpdating packages...\033[0m\n"
sudo apt update

# Set up nginx
printf "\033[1;33mSetting up Nginx...\033[0m\n"
sudo apt install nginx -y
sudo cp config/nginx/cis3760.conf /etc/nginx/sites-available
sudo ln -s /etc/nginx/sites-available/cis3760.conf /etc/nginx/sites-enabled
sudo rm /etc/nginx/sites-enabled/default
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

# Deploy to /app
printf "\033[1;33mDeploying files...\033[0m\n"
sudo mkdir -p /app/backend
sudo cp -r src/flask/* venv /app/backend
sudo groupadd -f cis3760
sudo useradd -g cis3760 cis3760
sudo chown -R root:cis3760 /app
sudo chmod 771 /app

#Set up Node
printf "\033[1;33mSetting up Node...\033[0m\n"
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

printf "\033[1;33mDone!\033[0m\n"

deactivate