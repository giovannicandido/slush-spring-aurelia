#!/usr/bin/env bash

if psql -lqt | cut -d \| -f 1 | grep -w shippable_test; then
    echo "Database Exist"
else
 echo "Create database"
 psql -c 'create database shippable_test;' -U postgres
fi