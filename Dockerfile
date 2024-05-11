FROM node:18

WORKDIR /usr/app
COPY package.json .
RUN npm install

# Add your source files
COPY . .  
CMD ["npm","start"]  