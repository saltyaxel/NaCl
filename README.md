# Push subfolder to Heroku
git subtree push --prefix server heroku master

# Client
cd client && npm start

# Server
cd server && npm run watch