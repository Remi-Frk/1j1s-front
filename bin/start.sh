#!/usr/bin/env bash

psmgr=/tmp/nginx-buildpack-wait
rm -f $psmgr
mkfifo $psmgr

# Initialize log directory.
mkdir -p logs/nginx
touch logs/nginx/access.log logs/nginx/error.log
echo 'buildpack=nginx at=logs-initialized'

# Start log redirection.
(
  # Redirect nginx logs to stdout.
  tail -qF -n 0 logs/nginx/*.log
  echo 'logs' >$psmgr
) &

# Start App Server
(
  # Take the command passed to this bin and start it.
  # E.g. bin/start-nginx bundle exec unicorn -c config/unicorn.rb
  COMMAND="node server.js"
  echo "buildpack=nginx at=start-app cmd=$COMMAND"
  $COMMAND
  echo 'app' >$psmgr
) &

# Attends que le serveur d'app soit UP
(
  FILE="/tmp/app-initialized"

  # We block on app-initialized so that when nginx binds to $PORT
  # are app is ready for traffic.
  while [[ ! -f "$FILE" ]]
  do
    echo 'buildpack=nginx at=app-initialization'
    sleep 1
  done
  echo 'buildpack=nginx at=app-initialized'
)


# Diagnostic
pwd
ls -ali
which nginx

echo "Contenu de conf, avant :"
ls vendor/nginx/conf/

erb "servers.conf.erb" > "vendor/nginx/conf/servers.conf"

echo "Contenu de conf, après erb :"
ls vendor/nginx/conf/

echo "Contenu du fichier :"
cat vendor/nginx/conf/servers.conf

# Start nginx
(
  # We expect nginx to run in foreground.
  # We also expect a socket to be at /tmp/nginx.socket.
  echo 'buildpack=nginx at=nginx-start'
  nginx -p vendor/nginx -c "conf/servers.conf"
  echo 'nginx' >$psmgr
) &

# This read will block the process waiting on a msg to be put into the fifo.
# If any of the processes defined above should exit,
# a msg will be put into the fifo causing the read operation
# to un-block. The process putting the msg into the fifo
# will use it's process name as a msg so that we can print the offending
# process to stdout.
read exit_process <$psmgr
echo "buildpack=nginx at=exit process=$exit_process"
exit 1
