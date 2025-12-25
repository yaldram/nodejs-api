#!/bin/bash
echo "Validating service..."
sleep 10

response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/health)

if [ "$response" = "200" ]; then
    echo "Service validation successful - HTTP $response"
    exit 0
else
    echo "Service validation failed - HTTP $response"
    pm2 logs nodejs-api --nostream --lines 50
    exit 1
fi