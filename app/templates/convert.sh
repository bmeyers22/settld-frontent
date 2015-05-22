#!/bin/bash

for FILE in `find . -name "*.emblem" -type f`
do
    if [ -e $FILE ] ; then
        # COFFEE=${FILE//.hbs}
        #
        echo "removing ${FILE}"
        rm "$FILE"
    else
        echo "File: does not exist!"
    fi
done
