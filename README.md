![angular](https://mtzfactory.github.io/logos/png-2/angular.png)
![firebase](https://mtzfactory.github.io/logos/png-2/firebase.png)
![javascript](https://mtzfactory.github.io/logos/png-2/javascript.png)
![html](https://mtzfactory.github.io/logos/png-2/html-5.png)
![css](https://mtzfactory.github.io/logos/png-2/css-3.png)

# JOB HELPER

This web app was the last one I made before joining the bootcamp, back in 2016. At that time I had already done two more app in __Angular__, so I decided to make a third one to build knowledge.

The goal for this web app was to help me find a new job, one that fulfil all my passions and motivations for the change. For that purpose I used __[Infojobs][infojobs-api]__'s api to seek for job offers.

The backend was clear: __Firebase__, with its realtime database was all what I need to store user's configuration and perform user authentication.

You can try it, just [sing up][sign-up] and play with it, it's published in Firebase cloud and it's accesible in this [link][job-helper].

## Development server

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.17.

Clone the repo and do:

```bash
$ git clone https://github.com/mtzfactory/job-helper.git
$ cd job-helper
$ npm install
```

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Screens

· Main view: general view with the jobs list that fulfil the correspondand filter.
[![m](images/m2.jpg)](images/m2_original.png)

· Job description: show the related information about the job.
[![m](images/m3.jpg)](images/m3_original.png)

· Job filter: the true core of the app: the filter management.
[![m](images/m4.jpg)](images/m4_original.png)

[infojobs-api]:https://developer.infojobs.net/
[job-helper]:https://job-helper.firebaseapp.com/
[sign-up]:https://job-helper.firebaseapp.com/login#top
