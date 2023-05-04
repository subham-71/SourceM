#!/bin/bash
mv config_data/input.jar .

ajc -source 1.8 -cp "./ReqJars/aspectjrt.jar:./ReqJars/gson-2.10.1.jar" -sourceroots "./AOPDeps/" -injars ./input.jar -outjar output.jar
mkdir outputs

mv output.jar outputs/
mv config_data/config.properties outputs/
cp ./ReqJars/aspectjrt.jar outputs/
cp ./ReqJars/gson-2.10.1.jar outputs/

rm *.jar
tar -cvf output.tar outputs/
zip -r output.zip outputs/

