#!/bin/bash

for FILE in `find . -name "*.emblem" -type f`
do
    if [ -e $FILE ] ; then
        # COFFEE=${FILE//.hbs}
        #
        echo "converting ${FILE} to ${COFFEE}"
        emblem2hbs "$FILE"
        mv "${FILE//.emblem}.js.hbs" "${FILE//.emblem}.hbs"
    else
        echo "File: does not exist!"
    fi
done
