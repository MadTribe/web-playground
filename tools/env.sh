#!/bin/bash
RET=0;

function checkVar {
  local TO_CHECK=$1

  if [ -z ${!TO_CHECK} ]; then
      echo "Please set environment variable $TO_CHECK";
      RET=1;
  fi

}

checkVar "PWEBSITE_IP"
checkVar "PWEBSITE_KEY"
checkVar "PWEBSITE_REMOTE_SUDO_USER"
checkVar "PWESITE_REMOTE_SITE_USER"

return $RET;
