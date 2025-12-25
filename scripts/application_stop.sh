#!/bin/bash
echo "Stopping Node.js application..."
pm2 stop nodejs-api || true
pm2 delete nodejs-api || true
echo "Application stopped"