#!/bin/bash

set -e 

ENV=$1

echo "Using environment $ENV"

ng build --configuration=$ENV

ssh mbisignani@linode "rm -rf ~/toodaiFrontend"

scp -r dist/toodaiFrontend mbisignani@linode:~/

ssh -X mbisignani@linode "sudo sh -c 'rm -rf /opt/toodaiFrontend; mv /home/mbisignani/toodaiFrontend /opt/toodaiFrontend'"
