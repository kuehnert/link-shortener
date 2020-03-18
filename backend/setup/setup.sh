#!/bin/bash
source '.env'
sudo mongo localhost:27017/admin --username mk --password XXXX --eval "var DBNAME='$DBNAME'; var PASSWORD='$PASSWORD';" setupDB.js
