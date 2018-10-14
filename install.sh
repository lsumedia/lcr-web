cp config.sample.json config.json
npm install --unsafe-perm=true --allow-root
cd player
npm install --unsafe-perm=true --allow-root
npm run build --unsafe-perm=true --allow-root
cd ../dashboard
npm install --unsafe-perm=true --allow-root
npm run build --unsafe-perm=true --allow-root
