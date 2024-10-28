git clone https://github.com/shivang821/rule_engine

cd Weather-Monitoring

Frontend Setup
Prerequisites:

Node.js

npm or yarn

Installation
Switch to frontend:

cd frontend

Install dependencies:

npm install

or

yarn install

Start the frontend server after starting backend server :

npm run dev

or

yarn dev

The frontend will run on http://localhost:3000.

Backend Setup
Prerequisites:

Java 22 (copy the your system java versioin in pom.xml. This project has java 22)

Intellij idea prefered

Maven

Installation
Switch to backend (first move to parent directory)

cd backend

Install dependencies:

mvn clean install

Start backend server

mvn spring-boot:run
