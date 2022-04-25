#!/bin/bash

cd frontend
echo "--- INSTALLING FRONTEND MODULES ---"
yarn install
echo "--- BUILDING FRONTEND ---"
yarn build
cd ..
mv frontend/dist backend/
cd backend
echo "--- TRANSPILING BACKEND ---"
tsc --build --verbose
echo "--- INSTALLING BACKEND MODULES ---"
yarn install
cd ..
echo "--- CREATING SERVER STRUCTURE ---"
mkdir OpenCloudServer
cp backend/package.json OpenCloudServer/package.json
cd OpenCloudServer
mkdir files
mv ../backend/dist .
mv ../backend/dist_srv .
cp ../backend/.env.example .
mv .env.example .env
cfg=$(cat .env)
echo ${cfg/development/production} > .env
mkdir TLS
mkdir log
echo "--- INSTALLING SERVER MODULES ---"
yarn install
echo "CREATING START SCRIPT"
echo "node dist_srv/app.js" > start.sh
echo "DONE"


