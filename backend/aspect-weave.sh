#!/bin/bash

if test -f *.zip; then
  rm -rf *.zip
fi
if test -f outputs/; then
  rm -rf outputs/
fi

mv config_data/input.jar .

ajc -source 1.8 -cp "./ReqJars/aspectjrt.jar:./ReqJars/gson-2.10.1.jar" -sourceroots "./AOPDeps/" -injars ./input.jar -outjar output.jar
mkdir outputs

mv output.jar outputs/
mv config_data/config.properties outputs/
cp ./ReqJars/aspectjrt.jar outputs/
cp ./ReqJars/gson-2.10.1.jar outputs/

if test -f *.jar; then
  rm -rf *.jar
fi
zip -r output.zip outputs/

