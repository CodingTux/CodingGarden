# About Coding Garden Webapp

[https://coding-garden-livid.vercel.app/](https://coding-garden-livid.vercel.app/)

---
# WELCOME!
---

## Working Functionalities

<div class="dark-bg">
  <ul>
  <li>Code editor on frontend
  <li>Terminal on frontend.</li>
  <li>Multiple Resizable windows</li>
  <li>Code files are saved and restored</li>
  </ul>
</div>

---
## What can be imporved
<div class="dark-bg">
  <ul>
  <li>Security. As of now there is technically no security.</li>
  <li>Better saving of files. As of now file content is saved in database along with its metadata. What we can do is we can store file in S3 and store its object id in database.</li>
  <li>Integration with real terminal.</li>
  <li>UI can be improved like show proper loadings and all.</li>
  </ul>
</div>

---

# Screenshots

<div class="dark-bg">
    <ul>
    <li><h2>Landing Page</h2></li>
        <img src="https://i.postimg.cc/HnWwY3sR/landing-coding-garden.png" class="lg-img">
    <h2>Enter username. For first time it will register automatically and second time when enter with same userid it fetches previously saved data.</h2>
        <br />
    <li><h2>Main Page</h2></li>
        <img src="https://i.postimg.cc/ryt04v7j/main.png" class="lg-img">
    </ul>
</div>

---
# How the build this repo
----

## Clone this repo
```bash
$ git clone https://github.com/CodingTux/CodingGarden

# Frontend
$ cd client
$ yarn install
$ yarn start

# Backend
$ cd server
$ npm install
$ touch .env 

# set these env variables in .env
# NODE_ENV=production
# MONGO_ENDPOINT_DEVELOPMENT=mongodb://localhost:27017/<database_name>
# MONGO_ENDPOINT_PRODUCTION=prod_mongo_uri

# For development
$ npm run dev

# For production
$ npm start
```

### Thanks!
