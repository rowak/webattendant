# This script installs the necessary packages and performs setup
# needed to be able to run the app.

printf "\033[1;33mUpdating packages...\033[0m\n"
sudo apt update

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

# Set up Node
printf "\033[1;33mSetting up Node...\033[0m\n"
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

# Install React
printf "\033[1;33mInstalling React libraries...\033[0m\n"
npm install

# Install Docker
printf "\033[1;33mInstalling Docker...\033[0m\n"
sudo apt install docker.io docker-compose -y

# Install Linter
printf "\033[1;33mInstalling Linter...\033[0m\n"
sudo apt install pylint==2.15.5 -y

printf "\033[1;33mDone!\033[0m\n"

deactivate
