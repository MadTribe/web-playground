#!/bin/sh
set -e



PWD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source $PWD/env.sh

REMOTE_SITE_USER_HOME=/home/$PWESITE_REMOTE_SITE_USER
REMOTE_CMD="ssh -i $PWEBSITE_KEY $PWEBSITE_REMOTE_SUDO_USER@$PWEBSITE_IP -C"

TIMESTAMP=$(date +%Y%m%d%H%M%S)

echo building...

pushd $PWD/..

gulp

mv ./dist $TIMESTAMP

ZIP_FILE=$TIMESTAMP.tgz

tar -cvzf ./$ZIP_FILE ./$TIMESTAMP

scp -i $PWEBSITE_KEY $ZIP_FILE $PWEBSITE_REMOTE_SUDO_USER@$PWEBSITE_IP:$ZIP_FILE

$REMOTE_CMD sudo mv $ZIP_FILE $REMOTE_SITE_USER_HOME
$REMOTE_CMD sudo tar -xvf $REMOTE_SITE_USER_HOME/$ZIP_FILE -C $REMOTE_SITE_USER_HOME
$REMOTE_CMD sudo rm -rf $REMOTE_SITE_USER_HOME/site
$REMOTE_CMD sudo mv $REMOTE_SITE_USER_HOME/$TIMESTAMP $REMOTE_SITE_USER_HOME/site

rm -rf $TIMESTAMP

popd
