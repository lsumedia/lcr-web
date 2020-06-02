FROM node:12

# Be aware - the build context for this container is the parent directory
# (Usually the copy commands would just be COPY . /app/)
# Doing it this way lets us share the /common code between services
# Which is kinda against Docker's philosopy, but whatevs

WORKDIR  /app/

COPY ./admin /app/
RUN ls -al
COPY ./common/ /common/

RUN npm install

RUN npm run build

CMD ["npm", "start"]