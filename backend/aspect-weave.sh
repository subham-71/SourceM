#!/bin/bash

if test -f *.zip; then
  rm -rf *.zip
fi
# Check if the output directory exists
if test -d outputs; then
  rm -rf outputs
fi

mv config_data/input.jar .
sleep 2
echo "Input jar moved"

ajc -source 1.8 -cp "./ReqJars/aspectjrt.jar:./ReqJars/gson-2.10.1.jar" -sourceroots "./AOPDeps/" -injars ./input.jar -outjar output.jar
sleep 5
echo "Aspect weaved"

mkdir outputs
sleep 2
echo "Output directory created"

mv output.jar outputs/
mv config_data/config.properties outputs/
cp ./ReqJars/aspectjrt.jar outputs/
cp ./ReqJars/gson-2.10.1.jar outputs/
sleep 5
echo "Output contents moved"

if test -f *.jar; then
  rm -rf *.jar
fi
sleep 2
echo "Removed input and output jars"

zip -r output.zip outputs/
sleep 2
echo "Output zipped"

