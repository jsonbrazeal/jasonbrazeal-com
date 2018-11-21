#!/usr/bin/env bash

set -eux
set -o pipefail

# ensure HOST environment variable is set
: "${HOST:?Build argument HOST needs to be set and non-empty.}"

# clean out build dir
rimraf nginx/build/*

# run webpack to create build with prod config
node_modules/.bin/webpack --env.HOST=$HOST --display-error-details --config webpack.prod.js --progress --profile --colors

# update flask Dockerfile with newly built js bundle
scriptdir="$( cd "$(dirname "$0")" ; pwd -P )"
newbundle=$(basename -- $(ls $scriptdir/../nginx/build/app*))
sed -i "s/app.*\.js/$newbundle/g" $scriptdir/../jasonbrazeal_com/Dockerfile

# build, tag, and push new images
docker build --build-arg HOST=$HOST -t jsonbrazeal/jasonbrazeal.com:nginx $scriptdir/../nginx
docker push jsonbrazeal/jasonbrazeal.com:nginx

# build, tag, and push new images
docker build --build-arg HOST=$HOST -t jsonbrazeal/jasonbrazeal.com:flask $scriptdir/../jasonbrazeal_com
docker push jsonbrazeal/jasonbrazeal.com:flask
