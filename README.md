# Node.js Project

Simple Node.js + GraphQL app in which user can discover & share beautiful images.
The backend is deployed at [leafy-backend.herokuapp.com/graphql](host
https://leafy-backend.herokuapp.com/graphql)
 
### Run project
 - Install [docker](https://www.docker.com/)
 - Create `.env` file in project's root directory and paste in
    ```
    DB_URL=mongodb://mongo:27017
    SECRET=secret
    ```
    NOTE: DB_URL should be in Dockerfile? Maybe?
 - And hit `docker-compose up` in the project's root directory
 
### Tech
  - GraphQL
  - MongoDB
  - Node.js
 
### Features
- [x] Upload images
- [x] Like others images
- [x] View other profiles
- [x] Authenticate user
- [ ] Search images (TODO)
- [ ] Comment to images (TODO)
- [ ] Follow other users (TODO)
- [ ] Access control such as admin (TODO)
 
### Used service
  - This project uses [Amazon S3](https://aws.amazon.com/s3/) as a simple storage service for images.
 
### CI/CD
Regarding CI/CD a pipeline has been setup with [Jenkins](https://jenkins.muzify.eu)
Github Webhook: https://jenkins.muzify.eu/github-webhook/ (push)

Please checkout Jenkinsfile for the pipeline

### Unit testing & app structure
  - GraphQL Resolvers contain most of the logics and process requests therefore they need to be unit-tested carefully.
  - Dependencies which are injected to the resolvers: `authenticationController` and `imageService`.
  - Testing tools & libraries: 
    - [mocha](https://mochajs.org/)
    - [sinon](https://sinonjs.org/)
    - [mongodb-memory-server](https://www.chaijs.com/)
    - [istanbul](https://istanbul.js.org/)
    - [chai](https://www.chaijs.com/)
  - Why [mongodb-memory-server](https://www.chaijs.com/) instead of `Sinon.stub`?
    - no need to know which method the implementation code (mongoose model) uses
    - no need to write many lines of code for stubbing/mocking

### Docker
This project has been dockerized so it is easy to fireup on any machine running [docker](https://docker.com)

### Todos
  -  Search images
  - Comment to images
  - Follow other users
  - Access control such as admin
  - Integration tests
  - More unit tests for Post resolver
