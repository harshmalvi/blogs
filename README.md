# Article APIs: using express framework

## Requirements

For development, you will only need Node.js, mysql (database) and a node package manager installed in your environment.

- Development Node Version : v18.17.1 and npm: 9.6.7


## Project Setup

1. First of all , you need to clone the repo from [https://github.com/harshmalvi/blogs.git]

2. install the node module

   -command : $ npm install (there may different commands if you are using package manager)

3. then need to set up env variables in .env file,

   -database variables

4. after setup of .env file, you will need to execute below command in cli

   $ npm run migrate (this command will create required data table in database )

5. the setup complete, you can execute it by using below command

   $ npm run start:dev

6. execute the test case by using below command

   $ npm run test