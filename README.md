# Readme

## For developers

### Installation

All microservice basic dependencies are listed in the package.json file, hence there is no need to install any global packages. Simply run npm install.

```
npm install
```

**NOTE:** if you required additional packages, ensure you install using --save-exact so that your project is compatible when other developers contribute.

Example:

```
npm install http-proxy --save --save-exact
```

### Start development server
```
npm start
```

### Run tests

Test cases be written and then added to the ./test/index.ts file for compilation.
Yaou are also able to add tests to the

### Deployment

#### Prerequites
Before deploying, the following prerequisites need to met:

* [Docker](https://docs.docker.com/install/) needs to be installed on the host server.
* [bridge network](https://docs.docker.com/engine/reference/commandline/network_create/) needs to be created using docker on the host server to link microservices.
* [git](https://gist.github.com/derhuerst/1b15ff4652a867391f03) needs to be installed on the host server.
* [ssh](https://confluence.atlassian.com/bitbucketserver/creating-ssh-keys-776639788.html) key link to project so that git pull is possible using ssh.
* [npm token](https://docs.npmjs.com/files/npmrc) (optional) so that you can install @simplus packages if there is such a dependency.

#### Installation
1. clone solution
    To install the solution, first clone the repo to the host server
    ```
    git clone git@bitbucket.org:simplusinnovation/mymicroservice.git
    ```
    In some cases, you may need to activate your ssh-agent to link your local private key to the command in the following manner:
    ```
    eval $(ssh-agent -s) && $(ssh-add /path/to/your/.ssh/id_rsa; git pull git@bitbucket.org:simplusinnovation/mymicroservice.git)
    ```

2. build docker container
    move to cloned folder.
    ```
    cd mymicroservice
    ```
    build docker container by passing the `npm token` as a build parameter if required, otherwise build container excluding the build arg.
    ```
    sudo docker build -t ms:mymicroservice --build-arg NPM_SECRET=<npm token> .
    ```
3. run the container
    run the container using the `--network` flag, linking the container to the `bridge network` you created on server.
    ```
    sudo docker run --network 'mynetwork' -p <hostport>:<containerport> -d --name microservice --restart always ms:mymicroservice
    ```
4. test server
    open http://localhost:port/api/v1/microservice/ in your browser.

### Technical users

The microservice has the following standard urls:

* http://localhost:port/api/v1/microservice/                           - Base url for testing
* http://localhost:port/api/v1/microservice/tests                      - Test status of solution
* http://localhost:port/api/v1/microservice/blueprint                  - APi Blueprint documentation
* http://localhost:port/api/v1/microservice/documentation              - Code type documentation


### Scripts

