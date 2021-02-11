# Build environment
FROM node:alpine as build

# Create app directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./

ARG REACT_APP_API_ENDPOINT
ENV REACT_APP_API_ENDPOINT=$REACT_APP_API_ENDPOINT

RUN yarn
# Bundle app source
COPY . ./
RUN yarn export

# Production environment
FROM nginx:alpine
COPY --from=build /usr/src/app/out /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
