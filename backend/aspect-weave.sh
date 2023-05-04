#!/bin/bash
mv config_data/input.jar .
ajc -source 1.8 -cp "./ReqJars/aspectjrt.jar:./ReqJars/gson-2.10.1.jar" -sourceroots "./AOPDeps/" -injars ./input.jar -outjar output.jar
mkdir outputs
mv output.jar outputs/
cp ./DemoJars/aspectjrt.jar outputs/
cp ./DemoJars/gson-2.10.1.jar outputs/
rm *.jar
tar -cvf output.tar outputs/

