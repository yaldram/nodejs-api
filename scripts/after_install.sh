#!/bin/bash
echo "Running after install script..."
cd /var/www/nodejs-api
chown -R ec2-user:ec2-user /var/www/nodejs-api
chmod -R 755 /var/www/nodejs-api

# Create .env file
cat > .env << EOF
NODE_ENV=production
PORT=3000
EOF

# Optional: Fetch from Secrets Manager
# aws secretsmanager get-secret-value --secret-id your-secret-name --query SecretString --output text | jq -r 'to_entries|map("\(.key)=\(.value|tostring)")|.[]' > .env

echo "After install completed"