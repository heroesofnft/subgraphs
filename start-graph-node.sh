#!/bin/bash


#stop on errors
set -e

#helper function to create graph.service file
create_service_file () {
  rm -f graph.service
  echo "[Unit]">>graph.service
  echo "Description=The Graph systemd service">>graph.service
  echo "StartLimitIntervalSec=0">>graph.service
  echo "[Service]">>graph.service
  echo "Type=simple">>graph.service
  echo "User=$(whoami)">>graph.service
  echo "WorkingDirectory=$HOME">>graph.service
  echo "ExecStart=sudo docker compose -f /home/hon/subgraphs/hero-heroes-token/docker-compose-fuji.yml up">>graph.service
  echo "LimitNOFILE=32768">>graph.service
  echo "Restart=always">>graph.service
  echo "RestartSec=1">>graph.service
  echo "[Install]">>graph.service
  echo "WantedBy=multi-user.target">>graph.service
  echo "">>graph.service
}

remove_service_file () {
if test -f "/etc/systemd/system/graph.service"; then
    sudo systemctl stop graph
    sudo systemctl disable graph
    rm /etc/systemd/system/graph.service
  fi
}

remove_service_file
create_service_file
chmod 644 graph.service
sudo cp -f graph.service /etc/systemd/system/graph.service
sudo systemctl daemon-reload
sudo systemctl start graph
sudo systemctl enable graph
echo
echo "Done!"