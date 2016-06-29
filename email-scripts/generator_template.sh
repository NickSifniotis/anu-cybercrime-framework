#!/bin/bash

while IFS=, read col0
do
	echo "the contents you want" >> "$col0".fileextensionyouwant
done < userlist.csv
