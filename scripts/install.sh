APPDIR = /app

sudo apt update

# Set up nginx
sudo apt install nginx -y
sudo cp config/nginx/sites-available/cis3760.conf /etc/nginx/sites-available
sudo ln -s /etc/nginx/sites-available/cis3760.conf /etc/nginx/sites-enabled
sudo systemctl restart nginx

# Set up Flask
sudo apt install python3 -y
sudo apt install python3-pip -y
sudo apt install python3-venv -y
pip install virtualenv
python3 -m venv venv
. venv/bin/activate
pip install Flask

# Set up Gunicorn
sudo apt install gunicorn -y
pip install gunicorn
sudo cp config/gunicorn/cis3760.service /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl restart cis3760.service

deactivate