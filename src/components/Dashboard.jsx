import React, { useEffect, useState } from "react";
import axios from "axios";
import { BackgroundLines } from "./ui/background-lines";

export default function Dashboard() {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [message, setMessage] = useState("");
  const [instagramData, setInstagramData] = useState(null);

  useEffect(() => {
    const userAccessToken = localStorage.getItem("fb_token");
    if (!userAccessToken) {
      console.error("No user token found!");
      return;
    }

    // STEP 1: Fetch Facebook Pages
    axios
      .get(`https://graph.facebook.com/v19.0/me/accounts`, {
        params: {
          access_token: userAccessToken,
        },
      })
      .then((response) => {
        console.log("Facebook Pages:", response.data);
        setPages(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching pages:", error);
      });
  }, []);

  // STEP 2: Fetch Instagram Business Account Info (after page is selected)
  useEffect(() => {
    if (!selectedPage) return;

    const fetchInstagramInfo = async () => {
      try {
        // Get Instagram Business Account ID linked to the selected page
        const pageInfo = await axios.get(
          `https://graph.facebook.com/v19.0/${selectedPage.id}`,
          {
            params: {
              fields: "instagram_business_account",
              access_token: selectedPage.access_token,
            },
          }
        );

        const igAccount = pageInfo.data.instagram_business_account;
        if (!igAccount) {
          console.warn("No Instagram business account linked to this page.");
          setInstagramData(null);
          return;
        }

        // STEP 3: Fetch Instagram account details
        const igData = await axios.get(
          `https://graph.facebook.com/v19.0/${igAccount.id}`,
          {
            params: {
              fields: "username,profile_picture_url,followers_count,biography,ig_id,account_type",
              access_token: selectedPage.access_token,
            },
          }
        );

        setInstagramData(igData.data);
        console.log("Instagram Business Info:", igData.data);
      } catch (error) {
        console.error("Error fetching Instagram data:", error.response || error);
      }
    };

    fetchInstagramInfo();
  }, [selectedPage]);

  const handlePost = async () => {
    if (!selectedPage) {
      alert("Please select a Page");
      return;
    }

    try {
      const response = await axios.post(
        `https://graph.facebook.com/v19.0/${selectedPage.id}/feed`,
        {
          message: message,
          access_token: selectedPage.access_token,
        }
      );

      console.log("Post result:", response.data);
      alert("Post created: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error posting:", error);
      alert("Failed to create post: " + error.message);
    }
  };

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <div className="p-8 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <label>Select Page:</label>
        <select
          className="border p-2 mb-4"
          onChange={(e) =>
            setSelectedPage(pages.find((p) => p.id === e.target.value))
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

        {/* Show Instagram Info if available */}
        {instagramData && (
          <div className="mt-8 p-4 border rounded bg-white shadow-md">
            <h2 className="text-lg font-semibold mb-2">
              Instagram Account Linked
            </h2>
            <img
              src={instagramData.profile_picture_url}
              alt="IG Profile"
              className="rounded-full w-20 h-20 mb-2"
            />
            <p><strong>Username:</strong> @{instagramData.username}</p>
            <p><strong>Followers:</strong> {instagramData.followers_count}</p>
            <p><strong>Account Type:</strong> {instagramData.account_type}</p>
            <p><strong>Bio:</strong> {instagramData.biography}</p>
          </div>
        )}
      </div>
    </BackgroundLines>
  );
}
