import connection from "../../../MongoDB/mongobd";
import Url from "../../../Model/Url.js";
import { NextResponse } from "next/server";
import shortid from "shortid";

export async function POST(req) {
  try {
    // Parse the request body
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { message: "URL is required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connection();

    // Generate short ID
    const shortID = shortid.generate();

    // Create URL document
    const result = await Url.create({
      shortId: shortID,
      redirectURL: url,
      visitHistory: [],
    });

    return NextResponse.json(
      { data: result },
      { status: 200 }
    );
  } catch (err) {
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
