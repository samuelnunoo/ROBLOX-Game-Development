Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"
  config.vm.provision "shell", path: "setup.sh"
  config.vm.synced_folder "main/", "/home/vagrant/main"
  #config.ssh.port = 2222
  #config.ssh.config = "ssh_config"
end
