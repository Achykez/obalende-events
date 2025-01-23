/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { Constants } from "./redux";

// const excludeUrls = [
//   '/',
//   '/karoke-events',
//   '/password-otp',
//   '/login',
//   '/sign-up',
//   '/sent-email',
// ];

const includedUrls = [
  "/admin-page",
  "/events",
  "/participants",
  "/events/create",
  "/participants/create",
  "events/edit/:eventsId",
  "/participants/edit/:participantsId",
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Normalize the protocol in production to handle Heroku-specific header issues
  const url = new URL(request.url);
  const protocol = request.headers.get("x-forwarded-proto");

  if (process.env.NODE_ENV === "production" && protocol) {
    if (protocol.includes(",")) {
      // Use the first valid protocol from the "x-forwarded-proto" header
      url.protocol = protocol.split(",")[0];
    } else {
      url.protocol = protocol; // Assign directly if there's no comma
    }
  }

  // Check if user is authenticated for protected routes
  const user = request.cookies.get(Constants.TOKEN); // Check for the user token

  if (!user) {
    // Redirect to the sign-in page if the user is not authenticated
    return NextResponse.redirect(new URL("/", url.href));
  }

  // Proceed to the next middleware or route handler
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-page",
    "/events",
    "/participants",
    "/events/create",
    "/events/edit/*",
    "/participants/edit/*", // Protect dynamic edit route for events
    "/participants/create/:eventId", // Protect dynamic
    "/participants/edit/:participantId*", // Protect dynamic edit route for participants
  ],
};
