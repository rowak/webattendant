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

#Set up Node
printf "\033[1;33mSetting up Node...\033[0m\n"
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

printf "\033[1;33mDone!\033[0m\n"

deactivate