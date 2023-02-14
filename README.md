# Appointment Application

This application was built as the third project of the Wild Code School 20 week Full-Stack Developer program as a client project. 

It is an appointment booking application targeting hair dresser salons.

## Main features

- appointment creation / management
- user management
- account creation
- salon creation / editing incl. services & employees

## Technologies used

- NextJS
- Firebase
- Storybook

## Running it
- clone the repository
```
cd OrmumaAppointments
pnpm install
```
### Preparation: install pnpm

Follow - https://pnpm.io/installation

### Preparation: create firebase account

To run this app valid firebase credetials are necessary. Head to https://firebase.google.com/ to create an account and a project.
We are using firebase storage and firebase cloud functions to assign a user an admin status - currently to use this an upgrade to the Firebase Blaze package is relevant.
- create `env.local` file from `env.local.sample` file (apps/web)

### Preparation: set cloud function
- in `firebase-cloud-functions/.firebaserc` replace `appointment---web-app` with own firebase-projectId.

### Preparation: get firebase CLI & deploy function
1. Install Firebase CLI:  `npm install -g firebase-tools` 
2. Log in to Firebase CLI: `firebase login`
3. Navigate to folder `firebase-cloud-functions` in terminal
4. Delploy function: `firebase deploy --only functions`

### run the app locally
```
cd apps/web
pnpm run dev
```

## Iterations / Improvements for the future
- localization 
- improved securtiy 
- usage of Typescript