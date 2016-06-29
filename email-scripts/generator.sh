#!/bin/bash

while IFS=, read col0
do
	echo "sampletext" > "$col0".txt
done < userlist.csv
