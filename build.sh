#!/bin/bash

cd frontend
yarn install
yarn build
cd ..
cd backend
cfg = $(cat .env)
echo ${cfg/development/production}
yarn install
mkdir files
cd ..
mv frontend/dist backend/


