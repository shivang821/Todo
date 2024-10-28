git clone https://github.com/shivang821/Todo.git

cd Todo

# Frontend Setup
# #Prerequisites:

Node.js

npm or yarn

# #Installation
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

# Backend Setup
# #Prerequisites:

Java 22 (copy the your system java versioin in pom.xml. This project has java 22)

Intellij idea prefered

Maven

Installation

# #update application.properties file

spring.application.name=backend

spring.datasource.url=jdbc:mysql://localhost:3306/todo_management

spring.datasource.username=user_name

spring.datasource.password=password

spring.jpa.hibernate.ddl-auto=update

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

github.token=your_github_token_for_gist

Switch to backend (first move to parent directory)

cd backend

Install dependencies:

mvn clean install

Start backend server

mvn spring-boot:run
