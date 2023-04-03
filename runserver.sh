#!/bin/bash

echo $1
echo $2

env=$1
project_folder=$2

cd frontend/menu
npm start </dev/null &>/dev/null & 

sleep 3

cd ..
cd ..

echo starting django server
source ${env}/bin/activate

#adding  </dev/null &>/dev/null & at the end run programs and commands detatched in console
python ${project_folder}/manage.py runserver #</dev/null &>/dev/null &
