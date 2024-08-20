# Basic setup
echo "------------------------------"
echo "-------- Global setup --------"
echo "------------------------------"
sudo apt-get update -y
sudo apt-get install -y libgconf-2-4 libatk1.0-0 libatk-bridge2.0-0 libgdk-pixbuf2.0-0 libgtk-3-0 libgbm-dev libnss3-dev libxss-dev libxshmfence1
code-server --install-extension mgmcdermott.vscode-language-babel

########## Install angular related extensions ##############
code-server --install-extension johnpapa.angular2


# Setup frontend angular server
echo "---------- Setup frontend angular server ------------"
# Install node and npm
sudo apt-get install -y npm
sudo npm install -g n
sudo n 19
npm install --force
#cd ../