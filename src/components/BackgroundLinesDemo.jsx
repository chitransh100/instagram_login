import React, { useEffect, useState } from "react";
import axios from "axios";

const INSTAGRAM_CLIENT_ID = "1112094804104263";
const REDIRECT_URI = "https://instagram-login-gamma-rust.vercel.app/dashboard"; // Must match Facebook App OAuth Redirect URI

export function BackgroundLinesDemo() {
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);

  // Step 1: On mount, check for ?code in URL (after Instagram login redirect)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code && !accessToken) {
      console.log("OAuth code received:", code);
      exchangeCodeForToken(code);
    }
  }, []);

  // Step 2: Open Instagram login popup
  const handleLogin = () => {
    const authURL = `https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=1112094804104263&redirect_uri=https://instagram-login-gamma-rust.vercel.app/dashboard&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights`;
    window.open(authURL, "Instagram Login", "width=600,height=700");
  };

  // Step 3: Exchange code for access token
  const exchangeCodeForToken = async (code) => {
    console.log("Exchanging code for token:", code);
    try {
      const response = await axios.post(
        "https://cors-anywhere.herokuapp.com/https://api.instagram.com/oauth/access_token",
        null,
        {
          params: {
            client_id: INSTAGRAM_CLIENT_ID,
            client_secret: "2222953956615d5101b1aaf7929dbe15", // 🔴 Don't expose this in production
            grant_type: "authorization_code",
            redirect_uri: REDIRECT_URI,
            code: code,
          },
        }
      );

      const token = response.data.access_token;
      console.log("Access token received:", token);

      setAccessToken(token);
      localStorage.setItem("insta_token", token);
      fetchUserData(token);
    } catch (error) {
      console.error("Token exchange failed:", error.response || error);
    }
  };

  // Step 4: Use token to fetch user data
  const fetchUserData = async (token) => {
    console.log("Fetching user data with token:", token);
    try {
      const response = await axios.get(
        `https://graph.instagram.com/me?fields=id,username,account_type,media_count,profile_picture_url&access_token=${token}`
      );
      setUserData(response.data);
      console.log("Instagram User Data:", response.data);
    } catch (error) {
      console.error("Fetching user data failed:", error.response || error);
    }
  };

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "5rem" }}>
      {!accessToken ? (
        <button onClick={handleLogin} style={{ fontSize: "20px", padding: "10px 20px" }}>
          🔗 Login with Instagram
        </button>
      ) : userData ? (
        <div>
          <img
            src={userData.profile_picture_url}
            alt="Profile"
            width="100"
            height="100"
            style={{ borderRadius: "50%" }}
          />
          <h2>@{userData.username}</h2>
          <p>Account Type: {userData.account_type}</p>
          <p>Media Posts: {userData.media_count}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
