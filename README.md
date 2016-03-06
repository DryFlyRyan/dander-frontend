# Dander

Front-end client for those of us nipped by puppy love.

## About the project branches
- [deployed](https://github.com/DryFlyRyan/dander-frontend/tree/deployed): Contains the currently code for the deployed site.
- [q2presentation](https://github.com/DryFlyRyan/dander-frontend/tree/q2presentation): What we presented at Galvanize on January 15, 2016.
- [ng](https://github.com/DryFlyRyan/dander-frontend/tree/ng): Converting the app to Angular. A work in progress.


## Deployed site
The site is deployed at [dander.co](http://dander.co/).

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
