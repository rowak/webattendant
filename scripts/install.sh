# Set up nginx
sudo apt install nginx

# Set up Flask
sudo apt install python3
pip3 install virtualenv
python3 -m vnenv venv
. venv/bin/activate
pip install Flask
deactivate