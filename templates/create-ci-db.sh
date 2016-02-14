#!/usr/bin/env bash

if psql -lqt | cut -d \| -f 1 | grep -w shippable_test; then
    echo "Database Exist"
else
 echo "Create database"
 psql -c 'create database shippable_test;' -U postgres
fi

if [ -z $POSTGRES_PASSWORD ]; then
   export POSTGRES_PASSWORD=AeXai1Oh
fi
echo "Setting database postgres user password to $POSTGRES_PASSWORD"
SQL=`echo "alter role postgres with password '${POSTGRES_PASSWORD}';"`
echo $SQL
psql -c "${SQL}" -U postgres
