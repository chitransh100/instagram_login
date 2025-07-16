import React, { useEffect } from "react";
import { BackgroundLines } from "./ui/background-lines";
import { Instagram } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export function BackgroundLinesDemo() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.FB) return;

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1391874735257085",
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });
      console.log("✅ Facebook SDK initialized");
    };

    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleLogin = () => {
    if (!window.FB) {
      console.error("❌ Facebook SDK not loaded yet!");
      return;
    }

    window.FB.login(
      async function (response) {
        if (response.authResponse) {
          console.log("✅ Successfully logged in!");
          const accessToken = response.authResponse.accessToken;
          console.log("🔑 User Access Token:", accessToken);
          localStorage.setItem("fb_token", accessToken);

          const graphUrl = "https://graph.facebook.com/v19.0";

          try {
            // Get basic user info
            const meRes = await axios.get(
              `${graphUrl}/me?fields=name,email&access_token=${accessToken}`
            );
            console.log("🙋 User Info:", meRes.data);

            // Get user's Pages
            const pagesRes = await axios.get(
              `${graphUrl}/me/accounts?access_token=${accessToken}`
            );
            console.log("📄 Pages:", pagesRes.data);

            if (
              pagesRes.data.data &&
              pagesRes.data.data.length > 0
            ) {
              const page = pagesRes.data.data[0];
              console.log("✅ Using Page:", page.name);

              // Get IG Business Account
              const pageDetails = await axios.get(
                `${graphUrl}/${page.id}?fields=instagram_business_account&access_token=${accessToken}`
              );
              console.log("📷 IG Business:", pageDetails.data);

              if (pageDetails.data.instagram_business_account) {
                const igId = pageDetails.data.instagram_business_account.id;

                // Get IG profile details
                const igProfile = await axios.get(
                  `${graphUrl}/${igId}?fields=username,followers_count,biography,profile_picture_url&access_token=${accessToken}`
                );
                console.log("✅ IG Profile:", igProfile.data);
              } else {
                console.log("⚠️ No IG Business Account linked to this Page");
              }
            } else {
              console.log("⚠️ No managed Pages found");
            }

            // Finally go to dashboard
            navigate("/dashboard");
          } catch (err) {
            console.error("❌ Error:", err);
          }
        } else {
          console.log("⚠️ User cancelled login or did not fully authorize.");
        }
      },
      {
        scope:
          "public_profile,email,pages_show_list,pages_read_engagement,pages_manage_posts,instagram_basic,instagram_content_publish",
      }
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
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Terms Of Service
        </button>
      </Link>
    </BackgroundLines>
  );
}
