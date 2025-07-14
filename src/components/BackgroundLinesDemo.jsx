import React, { useEffect } from "react";
import { BackgroundLines } from "./ui/background-lines";
import { Instagram } from "lucide-react";

export function BackgroundLinesDemo() {
  // Load Facebook SDK and initialize when component mounts
  useEffect(() => {
    // Check if SDK already loaded
    if (window.FB) return;

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1090787969658880", // 🔴 Replace with your App ID
        cookie: true,
        xfbml: true,
        version: "v19.0", // 🔴 Replace with your Graph API version
      });

      window.FB.AppEvents.logPageView();
    };

    // Load the SDK script
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  // Your login handler
  const handleLogin = () => {
    if (!window.FB) {
      console.error("Facebook SDK not loaded yet!");
      return;
    }

    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("Successfully logged in!", response);
          // Example: Get user info
          window.FB.api("/me", { fields: "name,email" }, function (userInfo) {
            console.log("User Info:", userInfo);
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <div
        className="flex items-center justify-center w-full flex-col px-4"
        onClick={handleLogin}
      >
        <Instagram className="w-[100px] h-[100px] text-pink-600" />
        <p className="font-[_fantasy] text-white text-3xl">Login with Instagram</p>
      </div>
    </BackgroundLines>
  );
}
