## Compile with ajc :

ajc -cp C:\aspectj1.9\lib\aspectjrt.jar -inpath  C:\Users\subha\Desktop\Acads\CS305\Major-Project\CS305-T07\analytics\javaM\src\main\java\org\example\


## Weaving Aspect files to JAR:

ajc -source 1.7 -cp C:\aspectj1.9\lib\aspectjrt.jar -sourceroots ./ -outjar output.jar

## Weaving into Third party

ajc -source 1.7 -cp C:\aspectj1.9\lib\aspectjrt.jar -injars .\app.jar HWTracer.aj -outjar output.jar

## Running the extracted output JAR file

java -cp ".;C:\aspectj1.9\lib\aspectjrt.jar" org.example.Main