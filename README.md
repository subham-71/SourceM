
#  **SourceM**

[Full Documention](https://github.com/subham-71/CS305-T07/wiki)

##  **1. Introduction**

###  **1.1 Purpose of the Project**

The purpose of this project is to build a source code analyzer. The application aims to provide tooling allowing the detection of bottlenecks in code and execution sequences, allowing rapid improvement and development.

  

###  **1.2 Scope of the Project**

Currently in order to generate usage information, developers have to use an amalgamation of language specific tools. These varied tools can be replaced by our tool that takes the load of tooling the code off the programmer and provides easy to access data about the program that may otherwise have required effort on the part of the programmer. This involves uploading jar files onto the platform which is automatically recompiled with the tooling and linked with the backend and visualization tools.

  

###  **1.3 Intended Audience**

Here we list some groups of people who may require this document or come across this document in some shape or form. This section does not list any technical details.

Here we list some groups of people who may require this document or come across this document in some shape or form. This section does not list any technical details.

| ID  | Stakeholder                                | Description                                                                                                                                                                                  |
| --- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S-1 | Course Instructor and Teaching Assistances | Provide tasks and necessary deadlines to U-2 and U-3 and confirm whether satisfactory progress is being made in the correct direction in application development.                            |
| S-2 | Development Team                           | Develop fully functioning application with afore-mentioned specifications from U-1 and input from U-4. Ensure integration between different teams and components developed.                  |
| S-3 | Testing and Maintenance Team               | Test the application and ensure proper functioning under boundary conditions and identify and rectify possible vulnerabilities. Update and monitor possible breaking changes to dependencies |
| S-4 | End User                                   | Use the platform for tooling and monitoring purposes   
  

##  **2. Overall Description of the Project**

The application aims to improve developer experience while building applications by tracking various facets of the application, such as exceptions, function call frequencies, function execution paths and function execution times. The application provides a visual representation of data that allows the developer to identify possible bottlenecks and points of disruption in the program.

  

###  **2.1 Product Perspective**

The product that is developed will reduce the time that is spent during Java program development in analysing and optimising the program by enabling rapid identification of bottlenecks. The visibility of favoured paths through the application can also enable developers to quickly figure out possible flaws in program logic causing repetitive processing. The exception statistics will allow developers to quickly figure out buggy pieces of code and fix them before going into production.

  

###  **2.2 Overall Functionality**

The primary functions that the application provides can be described as follows

- Bytecode Weaving - The application takes a jar file and instruments it with the aspect code. The woven code contains the necessary ability to monitor various aspects of the code that the user wishes to monitor and is integrated with the rest of the monitoring suite.

- Data Collection - The code modifications collect data regarding the woven application and send the information to the server, which acts as a central repository. This is done while allowing different users to function separately and monitor and access only data that belongs to their own applications.

- Data Visualization - The collected data is shown in an easily comprehensible manner to the user so that complex runtime data can be easily understood and used to make decisions regarding application design and performance.

  

###  **2.3 Operating Environment**

The operating environment for the application is listed below:

* Frameworks - External libraries and dependencies include:

* AspectJ: ajc, aspectjrt, aspectjtools, aspectjweaver have been used to generate weaved bytecode.

* Gson: Library to serialize the generated data so that it can be sent to the backend

* ExpressJS: To create the REST endpoint, which is used by the application to push data to the database and fetch data to the front end.

* ReactJS: To design the analytics dashboard.

* Operating System - All code has been written and tested on the Windows Operating System

* Database - Cloud Firestore (non-relational database) has been used to store the generated data

* Hardware Platform - Any hardware with the capability to host a ExpressJS server that can handle 2880 requests per day per user. Varies based on the expected audience size

  

##  **3. Block Diagram**
  ![Block Diagram](https://user-images.githubusercontent.com/72215169/236674305-22d44dd6-b662-4a8f-a3f8-5a69dd3542bf.png)


##  **4. Software Stack**

###  **4.1 AspectJ Compiler (AJC)**

The AspectJ compiler will be used to perform the weaving of the pre-written aspects with the provided JAR file. The AspectJ compiler is capable of instrumenting the code by itself and also provides functionality to call user defined functions at particular “Join Points” in the code. We have leveraged this to gain insights on the execution of the program and send this data to our backend server to store and analyze.

  

###  **4.2 Database**

We will be using Firebase as a NoSQL database. A NoSQL database would be suitable for this purpose as data of various structures, such as graph edge structures and function call orders, have to be handled by the database. A cloud-based database also facilitates rapid development, as well-established APIs are available for CRUD operations. It would also be easier to switch in the future to other NoSQL providers in the future if required, as there are no language-specific structures weighing down the application. Deployment on physical servers is also feasible if ever required.

  

###  **4.3 Frontend**

We will be using ReactJS along with Tailwind to develop the front-end application. The component-based facet of React allows us to develop reusable code that can be used throughout the application. We will also use the visualization tools provided by React Google Charts to create graphs and charts to better analyze the data generated by the woven applications. Authentication and login have also been implemented using Firebase.

  

###  **4.4 Backend**

We will be using NodeJS along with ExpressJS to develop the back-end application. applications: Express.js provides a set of features that make it easy to build web applications using Node.js. It includes a routing system for handling HTTP requests, middleware for handling requests and responses, and templating engines for rendering HTML views. They are used for building RESTful APIs in real-time applications. Express.js provides a set of features that make it easy to create APIs, including support for handling different HTTP methods (GET, POST, PUT, DELETE).

  

##  **5. Specific System Functions and Requirements**

###  **5.1 Hardware Features**

* Web Interface - A web browser is necessary for end users to upload JAR files and perform the weaving operations and also view data that has been collected from the application. It is a completely online tool with no offline functionality.

* Client Server System - A client server system has been adopted so as to not put the load of dependencies on the client side system. An internet connection is crucial for proper functioning. Client server communication is essential for the application as that is the sole means to collect and visualize data on the browser.

* Database - An easily accessible online database is necessary for the application. An always on database is necessary to monitor and receive information from clients at all times. The database must support concurrent read-write requests from multiple users.

  

###  **5.2 Non-functional Requirements**

* Availability - The system must be always on and listening. Mechanisms should be implemented on the client side application to facilitate short term local storage of information in case of server outages. Care must be taken to not hog network bandwidth causing disruptions in functioning of applications that may be running on the client side system during data recovery after outages.

* Performance - Package sizes of bundled web application must be minimal so as to allow quick loading and visualization and not hinder the user experience. Database must be distributed and always on to minimize client-side latency in pushing application data and latency between running the app and viewing the data on the dashboard.

* Security - Applications uploaded by one user should not be available for access by another user. Users should only be allowed to access information from the server once they are logged in. Users should only be able to view data collected from applications that they have uploaded and not from the applications of other users.

* Scalability - Databases used must be such that they can be easily commissioned if greater load is received that expected. The application must be designed in such a way that it can be easily deployed on multiple servers to handle greater load. Minimal dependencies must be used so as to not hinder the ability to deploy on different servers due to package sizes.

  

###  **5.3 Software System Attributes**

* Maintainability - Aspect weaving system must be easily extensible so as to add more features, if required, in the future. Integration between various components such as the SPA, API and database must be such that modifications can be made in the tech stack if need is felt in the future. Test cases must be use based and not structure based to minimize need to rewrite tests due to changes in code.

* Reliability - The aspects must communicate with the server without the ability of users to inject malicious content into them. The application must be able to handle multiple requests from multiple users at the same time without crashing, losing data or sending data to the wrong user.

* Robustness - The aspects must be able to handle exceptions and errors that may occur during runtime. The web browser should not contain any vulnerabilities that may allow malicious users to access data that does not belong to them. Sections of the application should not fail to function due to errors the aspect.

  

###  **5.4 Database Requirements**

The database will not contain any sensitive information and will be used only to store the data generated by the woven applications. The database will be used to store the following information:

* Application Name - The name of the application that has been woven

* Function Name - The name of the function that has been sent by the aspect

* Execution Time - The time taken by the function to execute

* Execution Count - The number of times the function has been executed

* Path Counters - The number of times each path of functions in the application has been executed

* Exception Counters - The number of times each exception has been thrown by various functions in the application

  

##  **6. Functional Requirements**

###  **6.1 File Upload and Aspect Weaving**

  

<table  class="c41 c47"><tbody><tr  class="c11"><td  class="c13"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c22">Brief description</span><span  class="c3">&nbsp;</span></p></td><td  class="c21"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">Uploading files to the server and subsequent weaving of the files on the server</span></p></td></tr><tr  class="c11"><td  class="c13"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">Target user</span></p></td><td  class="c21"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">U-2</span></p></td></tr><tr  class="c11"><td  class="c13"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">Business trigger</span></p></td><td  class="c21"  colspan="1"  rowspan="1"><p  class="c7"><span>Pressing the upload jar button on the app</span><span></span><span  class="c3">&nbsp;</span></p></td></tr><tr  class="c11"><td  class="c13"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">Preconditions</span></p></td><td  class="c21"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">The user has logged in</span></p></td></tr></tbody></table>

  

<table  class="c41 c47"><tbody><tr  class="c5"><td  class="c8"  colspan="3"  rowspan="1"><p  class="c7"><span  class="c22">Basic Flow:</span></p><ol  class="c6 lst-kix_2zww4fokxmdg-0 start"  start="1"><li  class="c0 li-bullet-0"><span  class="c3">The user presses the upload jar button and selects the file on their local system</span></li><li  class="c0 li-bullet-0"><span  class="c3">The file is sent to the server where AJC is used to weave the available aspects with the file</span></li></ol></td></tr><tr  class="c5"><td  class="c8"  colspan="3"  rowspan="1"><p  class="c7"><span  class="c9">Assumptions:</span></p><ol  class="c6 lst-kix_eybd5m7lbs5u-0 start"  start="1"><li  class="c0 li-bullet-0"><span  class="c3">The external API’s work correctly.</span></li><li  class="c0 li-bullet-0"><span>AJC and corresponding commands and dependencies are set up on the server</span></li><li  class="c0 li-bullet-0"><span>There is an active internet connection on the client side</span></li></ol></td></tr><tr  class="c11"><td  class="c26"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">Line</span></p></td><td  class="c16"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">System Actor Action</span></p></td><td  class="c10"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">System Response</span></p></td></tr><tr  class="c11"><td  class="c26"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">1.</span></p></td><td  class="c16"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">User logs into the system</span></p></td><td  class="c10"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">Web browser sends an authentication request to the backend and receives a postive response</span></p></td></tr><tr  class="c11"><td  class="c26"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">2. </span></p></td><td  class="c16"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">User uploads the file</span></p></td><td  class="c10"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">Browser sends the file to the firebase backend and AJC is used to weave the available aspects</span></p></td></tr><tr  class="c5"><td  class="c26"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">Post condition</span></p></td><td  class="c44"  colspan="2"  rowspan="1"><p  class="c7"><span  class="c3">User is shown a message if the weaving was successful</span></p></td></tr></tbody></table>

  

<table  class="c41 c42"><tbody><tr  class="c5"><td  class="c34"  colspan="2"  rowspan="1"><p  class="c7"><span  class="c9">Alternate Flow : 1) The external APIs do not function properly or there is no internet connection</span></p></td></tr><tr  class="c5"><td  class="c34"  colspan="2"  rowspan="1"><p  class="c7"><span  class="c3">File upload is unsuccessful and the file is not sent to the server. The user has to reupload the file as and when they get internet connectivity again or the API starts functioning properly again.</span></p></td></tr><tr  class="c5"><td  class="c34"  colspan="2"  rowspan="1"><p  class="c7"><span  class="c3">The use case terminates</span></p></td></tr><tr  class="c5"><td  class="c67"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">Post condition:</span></p></td><td  class="c18"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">User is notified that the weaving was not successful / File upload was not successful</span></p></td></tr></tbody></table>

  

###  **6.2 Data Collection**

<table  class="c41 c47"><tbody><tr  class="c11"><td  class="c13"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c22">Brief description</span><span  class="c3">&nbsp;</span></p></td><td  class="c21"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">Woven client application sends data to the API which is stored in the database</span></p></td></tr><tr  class="c11"><td  class="c13"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">Target user</span></p></td><td  class="c21"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">U-2</span></p></td></tr><tr  class="c11"><td  class="c13"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">Business trigger</span></p></td><td  class="c21"  colspan="1"  rowspan="1"><p  class="c7"><span>User runs the woven application</span><span></span><span  class="c3">&nbsp;</span></p></td></tr><tr  class="c11"><td  class="c13"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">Preconditions</span></p></td><td  class="c21"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">The application has been downloaded to the server and it has performed the weaving</span></p></td></tr></tbody></table>

  

<table  class="c41 c47"><tbody><tr  class="c5"><td  class="c8"  colspan="3"  rowspan="1"><p  class="c7"><span  class="c22">Basic Flow:</span></p><ol  class="c6 lst-kix_2zww4fokxmdg-0 start"  start="1"><li  class="c0 li-bullet-0"><span  class="c3">The application starts running on any system</span></li><li  class="c0 li-bullet-0"><span  class="c3">The aspect code starts collecting data about the application and starts sending it to the backend</span></li></ol></td></tr><tr  class="c5"><td  class="c8"  colspan="3"  rowspan="1"><p  class="c7"><span  class="c9">Assumptions:</span></p><ol  class="c6 lst-kix_eybd5m7lbs5u-0 start"  start="1"><li  class="c0 li-bullet-0"><span  class="c3">The external API’s work correctly.</span></li><li  class="c0 li-bullet-0"><span>There is an active internet connection on the system running the application</span></li><li  class="c0 li-bullet-0"><span>The aspect code has all dependencies to run properly</span></li></ol></td></tr><tr  class="c11"><td  class="c26"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">Line</span></p></td><td  class="c16"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">System Actor Action</span></p></td><td  class="c10"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">System Response</span></p></td></tr><tr  class="c11"><td  class="c26"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">1.</span></p></td><td  class="c16"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">User starts the woven application</span></p></td><td  class="c10"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">Application starts collecting data about the application locally in a class that the aspect is going to include along with the woven application</span></p></td></tr><tr  class="c11"><td  class="c26"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">2. </span></p></td><td  class="c16"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">User keeps the application running</span></p></td><td  class="c10"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">Application sends a request to the API periodically containing data that was collected from the previous period until current time and clears out the local memory</span></p></td></tr><tr  class="c5"><td  class="c26"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">Post condition</span></p></td><td  class="c44"  colspan="2"  rowspan="1"><p  class="c7"><span  class="c3">None</span></p></td></tr></tbody></table>

  

<table  class="c41 c42"><tbody><tr  class="c5"><td  class="c34"  colspan="2"  rowspan="1"><p  class="c7"><span  class="c9">Alternate Flow : 1) The external APIs do not function properly or there is no internet connection</span></p></td></tr><tr  class="c5"><td  class="c34"  colspan="2"  rowspan="1"><p  class="c7"><span  class="c3">If ever there is a problem with connecting to the server, the aspect code waits to send until an active connection is detected and data collection continues normally. The local store grows in size until the connectivity is regained at which point normal functioning will resume</span></p></td></tr><tr  class="c5"><td  class="c34"  colspan="2"  rowspan="1"><p  class="c7"><span  class="c3">The use case terminates</span></p></td></tr><tr  class="c5"><td  class="c67"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">Post condition:</span></p></td><td  class="c18"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">None</span></p></td></tr></tbody></table>

  

###  **6.3 Data Visualization and Summary**

<table  class="c41 c47"><tbody><tr  class="c11"><td  class="c13"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c22">Brief description</span><span  class="c3">&nbsp;</span></p></td><td  class="c21"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">Web application fetches data from the database through the backend API and displays it on the React SPA</span></p></td></tr><tr  class="c11"><td  class="c13"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">Target user</span></p></td><td  class="c21"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">U-2</span></p></td></tr><tr  class="c11"><td  class="c13"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">Business trigger</span></p></td><td  class="c21"  colspan="1"  rowspan="1"><p  class="c7"><span>User selects an application from the dashboard to view analytics</span><span></span><span  class="c3">&nbsp;</span></p></td></tr><tr  class="c11"><td  class="c13"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">Preconditions</span></p></td><td  class="c21"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">The application has been woven and the woven application has run for sufficient time to facilitate collection of data</span></p></td></tr></tbody></table>

<table  class="c41 c47"><tbody><tr  class="c5"><td  class="c8"  colspan="3"  rowspan="1"><p  class="c7"><span  class="c22">Basic Flow:</span></p><ol  class="c6 lst-kix_2zww4fokxmdg-0 start"  start="1"><li  class="c0 li-bullet-0"><span  class="c3">The user logs into the SPA and selects a particular application</span></li><li  class="c0 li-bullet-0"><span  class="c3">The web application makes API calls to fetch data and arranges it into diagrammatic forms</span></li></ol></td></tr><tr  class="c5"><td  class="c8"  colspan="3"  rowspan="1"><p  class="c7"><span  class="c9">Assumptions:</span></p><ol  class="c6 lst-kix_eybd5m7lbs5u-0 start"  start="1"><li  class="c0 li-bullet-0"><span  class="c3">The external API’s work correctly.</span></li><li  class="c0 li-bullet-0"><span>There is an active internet connection on the system running the application</span></li><li  class="c0 li-bullet-0"><span>The browser is compatible with all necessary dependencies required by the frontend application</span></li></ol></td></tr><tr  class="c11"><td  class="c26"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">Line</span></p></td><td  class="c16"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">System Actor Action</span></p></td><td  class="c10"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">System Response</span></p></td></tr><tr  class="c11"><td  class="c26"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">1.</span></p></td><td  class="c16"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">User logs into the web application</span></p></td><td  class="c10"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">Browser fetches data regarding all the applications that the user has uploaded apriori and shows them on the dashboard</span></p></td></tr><tr  class="c11"><td  class="c26"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">2. </span></p></td><td  class="c16"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">User selects a particular application</span></p></td><td  class="c10"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">Browser fetches data from the API regarding various functions in the applications and application specific data such as call histories</span></p></td></tr><tr  class="c5"><td  class="c26"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">Post condition</span></p></td><td  class="c44"  colspan="2"  rowspan="1"><p  class="c7"><span  class="c3">Graphical representation of application specific data is displayed to the user</span></p></td></tr></tbody></table>

<table  class="c41 c42"><tbody><tr  class="c5"><td  class="c34"  colspan="2"  rowspan="1"><p  class="c7"><span  class="c9">Alternate Flow : 1) The external APIs do not function properly or there is no internet connection</span></p></td></tr><tr  class="c5"><td  class="c34"  colspan="2"  rowspan="1"><p  class="c7"><span  class="c3">In case of a problem with the external APIs the web application not display anything. Whenever the API is restored a reload will trigger the call that will fetch the corresponding data from the database</span></p></td></tr><tr  class="c5"><td  class="c34"  colspan="2"  rowspan="1"><p  class="c7"><span  class="c3">The use case terminates</span></p></td></tr><tr  class="c5"><td  class="c67"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c9">Post condition:</span></p></td><td  class="c18"  colspan="1"  rowspan="1"><p  class="c7"><span  class="c3">Graphical data is not displayed to the user</span></p></td></tr></tbody></table>

  

##  **7. Interface Requirements**

###  **7.1 User Interfaces**

Every user who interacts with the system will have the same user interface. The single central interface for interacting with the application will be the web application. This will be a highly visual interface involving a minimal, easy to navigate UI. The interface would be primarily useful to users to view the analytics of their applications. The interface will be designed to be intuitive and easy to use. The interface will be designed to be responsive and work on all devices. The interface will be designed to be compatible with all major browsers. <br/>

The interface will primarily be required to display information about the applications that the user has previously uploaded, the functions in those applications and various data collected about those applications. The interface will also be required to display the analytics of the applications in the form of graphs and charts. The primary objective of the interface is to allow users to grasp information about their programs quickly without having to go through the inconvenience of manually sifting through the textual data that is collected.

  

###  **7.2 Software Interfaces**

There are 4 primary components in the application which are the web application, an Express server, a non-relational database and the aspect files. These require the following components to interact with each other:

- The web application will be built using ReactJS and will communicate with the Express server through an API.

- The Express server will be built using NodeJS and will communicate with the database through the Firebase SDK.

- The AJC files will be written in AspectJ and will be compiled using the AspectJ compiler which is on the Firebase server.

  

###  **7.3 Communication Interfaces**

The communication interfaces are primarily between the React SPA - Express server and the Express server - Firebase server. The communication between the React SPA and the Express server will be through HTTP AJAX requests. The communication between the Express server and the Firebase server will be through the Firebase SDK that uses HTTPS for communication.

  

##  **8. Assumptions and Dependencies**

###  **8.1 Assumptions**

1. The users have a beginner level grasp of English to be able to understand the interface.

2. The users understand how to run a compiled JAR file on their server with the requisite parameters.

3. The users have a reasonably fast internet connection to be able to upload the JAR files to the server.

  

###  **8.2 Dependencies**

1. The only dependency of the application is the Firebase server. The application will be hosted on the Firebase server and will use the Firebase SDK to communicate with the database. The Firebase server will also be used to compile the AJC files.

##  **9. Constraints**

The major limitations are listed below:

1. The application will only be able to analyze Java applications.

2. The application has to constantly communicate with the API to exchange data. There is no feature to do the opposite side communication which would substantially minimize traffic.

3. There is no option to select the files to be woven. The application will weave all the files in the application.

4. True measure of time is difficult to accomplish due to the overhead of data collection. API calls occur on a different thread however.

##  **10. User Description**

###  **10.1 General User Description**

Given below is a general description of the various users who would be involved with the application

| ID  | User Class              | Description                                                                                                                                                                                                                                           |
| --- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| U-1 | Developers, Maintainers | This would includes people from S-2, S-3 and possibly S-1 who would be involved in actively making changes to the application, maintenance etc. These users would have access to non graphical components such as the database and the Express server |
| U-2 | External Java Developers |  These users are from the stakeholder class S-4 who would be uploading JAR files, instrumenting them and using the services of the web application to monitor their application. They will only have access to the web application component  |

  

###  **10.2 User Documentation**

Documentation of the entire codebase would have to be provided to users of the U-1 class so that they can actively maintain the application. This includes the Aspect files, the Express server and the React application. Suitable test files must also be given so as to ensure maintenance of prior functionality.<br/>

Users of the U-2 class would only have to be given documentation as to how to use the web application and how to run the instrumented Java application. This would be provided in the form of a README.

  

###  **10.3 User Actions**

| User Type | Actions                                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------------------ |
| U-1       | General Maintenance <br/> Security patches on dependency updates <br/> Updating Aspect files on new releases |
| U-2 | Uploading JAR files <br/> Viewing analytics about woven applications <br/> Downloading and running JAR files|  

##  **11. User Interfaces**
### **11.1 Landing Page**

![Home](https://user-images.githubusercontent.com/72215169/236674329-46688e0b-7390-408c-98c9-4170845e8ea4.jpg)


### **11.2 Info Page**

![Info](https://user-images.githubusercontent.com/72215169/236674338-11ba6982-cfa9-45a8-9f02-0859230009c6.jpg)


### **11.3 Dashboard**

![Dashboard](https://user-images.githubusercontent.com/72215169/236674348-42605055-9984-41a1-b52c-c7fdc5666adf.PNG)


### **11.4 Control Flow Diagram**

![ControlFlow](https://user-images.githubusercontent.com/72215169/236674352-bee8d051-48b1-4ac6-8b00-588c49a7dc82.jpg)


### **11.5 Execution Time Diagram**

![ExecutionTime](https://user-images.githubusercontent.com/72215169/236674362-3980e8bc-67ba-4ae8-a537-697841d561bf.jpg)


### **11.6 Function Diagram**

![Functions](https://user-images.githubusercontent.com/72215169/236674371-44f149fa-2166-40ad-b302-085ebd075cfb.jpg)


##  **12. Contributors**

*  [Subham Subhasis Sahoo](https://github.com/subham-71) - 2020CSB1317

*  [Parth Jain](https://github.com/Parth-Jain-2002) - 2020CSB1106

*  [Aman Pankaj Adatia](https://github.com/adatiaaman) - 2020CSB1154

*  [Abhijith T R](https://github.com/Abhijith-TR) - 2020CSB1062

*  [Pratham Kundan](https://github.com/prathamkundan) - 2020CSB1114
