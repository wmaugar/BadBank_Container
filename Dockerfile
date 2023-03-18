FROM node:slim

# Step 1 - Add container working directory
WORKDIR /app
# Step 2 - Copy npm dependencies
COPY package.json /app/package.json
COPY index.js /app/index.js
COPY dal.js /app/dal.js
# Step 3 - Install dependencies
RUN npm install
# Copy app source code
COPY . .
#Expose port and start application
EXPOSE 3000
CMD ["npm", "start"]