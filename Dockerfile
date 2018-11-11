# pull base image
FROM node:carbon

# maintainer details
LABEL author=""
LABEL company=""
LABEL issues=""
LABEL majorVersion="1"
LABEL name=''

######################################################################
# Place and system utilities in this section.
# this ensures that they are done first then cached for faster builds.
#######################################################################

## System dependencies ad utilities here:



########################################################################
# npm token argument so that is it not stored in the file
ARG NPM_SECRET
ENV NPM_TOKEN ${NPM_SECRET -''}

# setup application directory
RUN mkdir /app
WORKDIR /app

# build .npmrc file for npm installation of private packages
RUN printf "//`node -p \"require('url').parse(process.env.NPM_REGISTRY_URL || 'https://registry.npmjs.org').host\"`/:_authToken=${NPM_TOKEN}\nregistry=${NPM_REGISTRY_URL:-https://registry.npmjs.org}\n" >> ~/.npmrc

# copy application build files.
ADD ./package.json /app

# install pacakges and global packages
RUN npm install
RUN npm prune

# copy application run files and test for standard
ADD ./src /app/src
ADD ./tsconfig.json /app
ADD ./tslint.json /app
RUN npm run lint

# copy application test documentation files and build documentation
ADD ./docs /app/docs
ADD ./test /app/test
RUN npm run document:test

# build technical documentation
RUN npm run document:blueprint
ADD ./README.md /app
RUN npm run document:typedoc

# build solution
RUN npm run build

# setup environment variables
ENV NODE_ENV 'production'
ENV PORT 3002
ENV BASE_URI '/api/v1/microservice1'
ENV DB_CONNNECTION_URL 'http://arangodb:8529/_db/_system'

# expose microservice on selected port. Defaults to 3002
EXPOSE ${PORT}

# run microservice
ENTRYPOINT [ "node" , "./build/bin/server.js"]
CMD ["/bin/bash"]