import connection from "../../../MongoDB/mongobd.js";
import Url from "../../../Model/Url.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Extract the shortId from the request URL query parameters
    const { searchParams } = new URL(req.url);
    const shortId = searchParams.get("id");

    // Validate that shortId is provided
    if (!shortId) {
      return NextResponse.json(
        { message: "Short ID is required" },
        { status: 400 }
      );
    }

    // Connect to the MongoDB database
    await connection();

    // Search for the shortId in the database
    const urlData = await Url.findOne({ shortId });

    // If no document is found, return a 404 response
    if (!urlData) {
      return NextResponse.json(
        { message: "Short URL not found" },
        { status: 404 }
      );
    }

    // Perform a redirect to the original URL
    return NextResponse.redirect(urlData.redirectURL);  // Correcting to perform an actual redirect
  } catch (err) {
    // Handle any unexpected errors
    console.error("Error:", err);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
