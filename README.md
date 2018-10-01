![angular](https://mtzfactory.github.io/logos/png-2/angular.png)
![firebase](https://mtzfactory.github.io/logos/png-2/firebase.png)
![javascript](https://mtzfactory.github.io/logos/png-2/javascript.png)
![html](https://mtzfactory.github.io/logos/png-2/html-5.png)
![css](https://mtzfactory.github.io/logos/png-2/css-3.png)

# JOB HELPER

The goal for this web app was to help me find a new job,  one that fulfilled all my passions and motivations for change, and practice at the same time with __Angular__ . 

__[Infojobs][infojobs-api]__'s free api is used to look for job offers.

The backend was clear: [__Firebase__][firebase], with its realtime database, it was all I needed to store user's configuration and perform user authentication.

You can try it, just [sign up][sign-up] and play with it, it's published in Firebase cloud.

## Development server

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.17.

Clone the repo and do:

```bash
$ git clone https://github.com/mtzfactory/job_helper.git
$ cd job_helper
$ npm install
```

Before running anything, you have to add one project in [Firebase][firebase] and edit the configuration in `app.module.ts`.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Screens

· General view showing job list once selected filter applied.
[![m](images/m2.jpg)](images/m2_original.png)

· Job description.
[![m](images/m3.jpg)](images/m3_original.png)

· Job filter list, the true core of the app.
[![m](images/m4.jpg)](images/m4_original.png)

[infojobs-api]:https://developer.infojobs.net/
[firebase]:[https://console.firebase.google.com]
[sign-up]:https://job-helper.firebaseapp.com/login#top
[job-helper]:https://job-helper.firebaseapp.com/
