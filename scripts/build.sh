#!/usr/bin/env bash

set -euxo pipefail

scriptdir="$( cd "$(dirname "$0")" ; pwd -P )"

# ensure HOST environment variable is set
: "${HOST:?Build argument HOST needs to be set and non-empty.}"

# clean out build dir
rimraf nginx/build/*

# generate code snippets from kb
$scriptdir/generate_snippets.py ~/Drive/Notes/ex

# run webpack to create build with prod config
node_modules/.bin/webpack --env.HOST=$HOST --display-error-details --config webpack.prod.js --progress --profile --colors

# update flask Dockerfile with newly built js bundle
newbundle=$(basename -- $(ls $scriptdir/../nginx/build/app*.js))
sed -E "s/app\.[0-9a-f]{20}\.js/$newbundle/g" -i $scriptdir/../jasonbrazeal_com/Dockerfile

# build, tag, and push new images
docker build --build-arg HOST=$HOST -t jsonbrazeal/jasonbrazeal.com:nginx-$HOST $scriptdir/../nginx
docker push jsonbrazeal/jasonbrazeal.com:nginx-$HOST

# build, tag, and push new images
docker build --build-arg HOST=$HOST -t jsonbrazeal/jasonbrazeal.com:flask-$HOST $scriptdir/../jasonbrazeal_com
docker push jsonbrazeal/jasonbrazeal.com:flask-$HOST
