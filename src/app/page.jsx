"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShortenUrl = async () => {
    try {
      const response = await axios.post("/api/url", { url });
      setShortUrl(`${window.location.origin}/api/redirect?id=${response.data.data.shortId}`);
    } catch (error) {
      console.error("Error shortening URL:", error);
      alert("Failed to shorten URL. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full bg-blue-600 text-white py-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center">URL Shortener</h1>
      </header>

      <main className="flex flex-col items-center w-full max-w-md p-6 bg-white mt-8 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Shorten Your URL</h2>

        {/* URL Input */}
        <div className="w-full flex">
          <input
            type="text"
            placeholder="Enter your URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleShortenUrl}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Shorten
          </button>
        </div>

        {/* Display Short URL */}
        {shortUrl && (
          <div className="mt-4 text-center">
            <p className="text-gray-700">Your Short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
