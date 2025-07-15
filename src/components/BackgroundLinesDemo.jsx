import React, { useEffect } from "react";
import { BackgroundLines } from "./ui/background-lines";
import { Instagram } from "lucide-react";
import PrivacyPolicy from "./PrivacyPolicy";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function BackgroundLinesDemo() {
  const navigate = useNavigate();
  // Load Facebook SDK when the component mounts
  useEffect(() => {
    // If FB SDK is already loaded, do nothing
    if (window.FB) return;

    // This function will be called once the SDK script loads
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1391874735257085", // ✅ Replace with your App ID
        cookie: true,
        xfbml: true,
        version: "v19.0", // ✅ Replace with your Graph API version
      });

      console.log("✅ Facebook SDK initialized");
    };

    // Dynamically load the Facebook SDK script
    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  // Handle Facebook Login
  const handleLogin = () => {
    if (!window.FB) {
      console.error("❌ Facebook SDK not loaded yet!");
      return;
    }

    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("✅ Successfully logged in!");
          const accessToken = response.authResponse.accessToken;
          console.log("🔑 User Access Token:", accessToken);
          localStorage.setItem("fb_token", accessToken);

          // Example: Fetch basic user info
          window.FB.api("/me", { fields: "name,email" }, function (userInfo) {
            console.log("🙋 User Info:", userInfo);
            console.log("✅ Logged in, redirecting...");
            navigate("/dashboard");
          });
        } else {
          console.log("⚠️ User cancelled login or did not fully authorize.");
        }
      },
      {  scope: "public_profile,email,pages_show_list,pages_read_engagement,pages_manage_posts,instagram_basic,instagram_content_publish" } // ✅ Add more scopes if needed
    );
  };

  const handlePolicy = () => {
    navigate("/privacy-policy");
  };

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <div
        className="flex items-center justify-center w-full flex-col px-4 cursor-pointer"
        onClick={handleLogin}
      >
        <Instagram className="w-[100px] h-[100px] text-pink-600" />
        <p className="font-[_fantasy] text-white text-3xl">
          Login with Instagram
        </p>
      </div>
      <button
        onClick={handlePolicy}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        View Privacy Policy
      </button>
      <Link to="/terms-of-service">
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Terms Of Service
        </button>
      </Link>
    </BackgroundLines>
  );
}
