import React, { useEffect, useState } from "react";
import { BackgroundLines } from "./ui/background-lines";

export default function Dashboard() {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const userAccessToken = localStorage.getItem("fb_token");
    if (!userAccessToken) {
      console.error("No user token found!");
      return;
    }

    fetch(
      `https://graph.facebook.com/v19.0/me/accounts?access_token=${userAccessToken}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Pages:", data);
        setPages(data.data);
      });
  }, []);

  const handlePost = async () => {
    if (!selectedPage) {
      alert("Please select a Page");
      return;
    }

    const res = await fetch(
      `https://graph.facebook.com/v19.0/${selectedPage.id}/feed`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message,
          access_token: selectedPage.access_token,
        }),
      }
    );

    const data = await res.json();
    console.log("Post result:", data);
    alert("✅ Post created: " + JSON.stringify(data));
  };

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <label>Select Page:</label>
      <select
        className="border p-2 mb-4"
        onChange={(e) =>
          setSelectedPage(
            pages.find((p) => p.id === e.target.value)
          )
        }
      >
        <option value="">-- Select --</option>
        {pages.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <textarea
        className="border p-2 w-full mb-4"
        placeholder="Write your post..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handlePost}
      >
        Publish Post
      </button>
    </div>
    </BackgroundLines>
  );
}
