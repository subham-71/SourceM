#!/bin/bash
rm *.jar
mv config_data/input.jar .
ajc -source 1.8 -cp "./DemoJars/aspectjrt.jar:./DemoJars/gson-2.10.1.jar" -sourceroots "../analytics/javaM/src/main/org/java/org/example/AOPDeps/" -injars ./input.jar -outjar output.jar
mkdir outputs
mv output.jar outputs/
cp ./DemoJars/aspectjrt.jar outputs/
cp ./DemoJars/gson-2.10.1.jar outputs/
rm *.jar
zip -r output.zip outputs/