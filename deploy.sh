echo “Building App…”
npm run build

echo “Deploying file to server…
scp -r build/* root@159.223.122.178:/var/www/nursd

echo “Done !”