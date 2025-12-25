#!/bin/bash
echo "Starting Node.js application..."
cd /var/www/nodejs-api

pm2 start dist/index.js \
    --name nodejs-api \
    --instances 2 \
    --exec-mode cluster \
    --max-memory-restart 500M

pm2 save
pm2 startup systemd -u ec2-user --hp /home/ec2-user

echo "Application started"