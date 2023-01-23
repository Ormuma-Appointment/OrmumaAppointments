// import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

// export function middleware(req, event) {
//   const token = req.headers["Authorization"]; // can get the token from localstorage or cookies too

//   const isLoggedIn = validate(token); // an api to backend ,this will return true or false based on auth token.

//   if (!isLoggedIn) {
//     return new Response("Access granted");
//   } else {
//     return event.responseWith(NextResponse.redirect("/login")); // redirect
//   }
// }
