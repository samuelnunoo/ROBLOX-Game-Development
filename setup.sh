#!/usr/bin/env bash

# Update File
sudo apt-get update

# Install Zip
sudo apt install zip unzip

# Install Lua
sudo apt install build-essential libreadline-dev  
mkdir lua_build
cd lua_build
curl -R -O http://www.lua.org/ftp/lua-5.3.4.tar.gz
tar -zxf lua-5.3.4.tar.gz
cd lua-5.3.4
make linux test
sudo make install
cd ~

# Install LuaRocks
wget https://luarocks.org/releases/luarocks-3.3.1.tar.gz
tar zxpf luarocks-3.3.1.tar.gz
cd luarocks-3.3.1
./configure && make && sudo make install
sudo luarocks install luasocket
cd ..
yes| rm *.gz


# Install Rojo
wget https://github.com/Roblox/rojo/releases/download/v6.0.0-rc.1/rojo-6.0.0-rc.1-linux.zip
yes| unzip rojo-6.0.0-rc.1-linux.zip
sudo chmod ugo+x rojo
rm *.zip

# Install NodeJS
git clone https://github.com/nvm-sh/nvm.git .nvm
cd .nvm
sudo chmod -R 777 ./
. nvm.sh
nvm install node
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# Install Roblox-TS
npm install -g roblox-ts

cd ..

# Install Lemur 
sudo luarocks install luafilesystem
sudo luarocks install dkjson
sudo luarocks install luasocket
wget https://github.com/LPGhatguy/lemur/archive/master.zip
yes| unzip master.zip
rm *.zip


# Install TestEZ
wget https://github.com/Roblox/testez/archive/master.zip
yes| unzip master.zip
rm *.zip






# Load PATH Variables
source /vagrant/export.sh
echo "source /vagrant/export.sh" >> /home/vagrant/.bashrc
