# Dander Luv

Front-end client for those of us nipped by puppy love.

## About this branch
This branch (q2presentation) represents our Front-end code as it appeared for our presentation at Galvanize on January 15, 2016. For the currently deployed code, see the "master" branch.

## Staging site
The staging site is deployed [here](https://dander.firebaseapp.com/).

## Usage
First, run:

```npm install```

This will install all dependencies listed in package.json.

Then:

```gulp watch```

This watches the source files. Anytime there is a change it rebuilds the contents of the 'public' folder, which contains the files for the publicly accessible site.

To smooth the development process, open another terminal tab and run:

```gulp browser-sync```

[browser-sync](https://www.npmjs.com/package/browser-sync) reloads the browser when anything changes. It also gives you a link to the locally hosted site, which is kinda nice.

To end the *gulp watch* and *browser-sync*, hit *control-c*
