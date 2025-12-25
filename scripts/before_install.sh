#!/bin/bash
echo "Running before install script..."
mkdir -p /var/www/nodejs-api
chown -R ec2-user:ec2-user /var/www/nodejs-api
rm -rf /var/www/nodejs-api/*
echo "Before install completed"