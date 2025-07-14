import React, { useEffect } from "react";
import { BackgroundLines } from "./ui/background-lines";
import { Instagram } from "lucide-react";

export function BackgroundLinesDemo() {
  // Load Facebook SDK when the component mounts
  useEffect(() => {
    // If FB SDK is already loaded, do nothing
    if (window.FB) return;

    // This function will be called once the SDK script loads
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1090787969658880", // ✅ Replace with your App ID
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

          // Example: Fetch basic user info
          window.FB.api("/me", { fields: "name,email" }, function (userInfo) {
            console.log("🙋 User Info:", userInfo);
          });
        } else {
          console.log("⚠️ User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile,email" } // ✅ Add more scopes if needed
    );
  };

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <div
        className="flex items-center justify-center w-full flex-col px-4 cursor-pointer"
        onClick={handleLogin}
      >
        <Instagram className="w-[100px] h-[100px] text-pink-600" />
        <p className="font-[_fantasy] text-white text-3xl">Login with Instagram</p>
      </div>
    </BackgroundLines>
  );
}
