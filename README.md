# Appointment Application

This application was built as the third project of the Wild Code School 20 week Full-Stack Developer program as a client project.

It is an appointment booking application targeting hair dresser salons.

## Main features

- appointment creation / management
- user management
- account creation
- salon creation / editing

## Technologies used

- NextJS
- Firebase
- Storybook

## Running it

### create firebase account

To run this app valid firebase credetials are necessary. Head to https://firebase.google.com/ to create an account and a project.
We are using firebase storage and firebase cloud functions to assign a user an admin status - currently to use this an upgrade to the Firebase Blaze package is relevant.

### install pnpm

Follow - https://pnpm.io/installation

### run the app

- clone this repository
- `cd OrmumaAppointments`
- `pnpm install`
- create `env.local` file from `env.local.sample` file (apps/web)
- cd apps/web
- `pnpm run dev`
