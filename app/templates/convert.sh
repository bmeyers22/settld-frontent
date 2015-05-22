#!/bin/bash

for FILE in `find . -name "app.emblem" -type f`
do
    if [ -e $FILE ] ; then
        COFFEE=${FILE//.emblem}

        echo "converting ${FILE} to ${COFFEE}"
        emblem2hbs "$FILE" > "$COFFEE"
        mv $COFFEE "${FILE}.hbs"
    else
        echo "File: {$1} does not exist!"
    fi
done
