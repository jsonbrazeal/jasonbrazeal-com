#!/usr/bin/env bash

set -eux
set -o pipefail

# clean out build dir
rimraf nginx/build/*

# run webpack to create build with prod config
node_modules/.bin/webpack --display-error-details --config webpack.prod.js --progress --profile --colors

# update flask Dockerfile with newly built js bundle
scriptdir="$( cd "$(dirname "$0")" ; pwd -P )"
newbundle=$(basename -- $(ls $scriptdir/../nginx/build/app*))
sed -i "s/app.*\.js/$newbundle/g" $scriptdir/../jasonbrazeal_com/Dockerfile
