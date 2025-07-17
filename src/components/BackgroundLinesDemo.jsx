import React, { useEffect, useState } from "react";
import { BackgroundLines } from "./ui/background-lines";
import { Instagram } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export function BackgroundLinesDemo() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (window.FB) return;

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1391874735257085",
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });
      console.log("Facebook SDK initialized");
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
      console.error("Facebook SDK not loaded yet!");
      return;
    }

    window.FB.login(
      function (response) {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          console.log("User Access Token:", accessToken);
          localStorage.setItem("fb_token", accessToken);

          // Get list of pages user manages
          window.FB.api("/me/accounts", function (pagesResponse) {
            if (
              pagesResponse.data &&
              pagesResponse.data.length > 0 &&
              pagesResponse.data[0].id
            ) {
              const pageId = pagesResponse.data[0].id;

              // Get Instagram business account ID
              window.FB.api(
                `/${pageId}?fields=instagram_business_account`,
                function (pageInfo) {
                  const igId =
                    pageInfo.instagram_business_account &&
                    pageInfo.instagram_business_account.id;

                  if (!igId) {
                    alert("No connected Instagram Business account found.");
                    return;
                  }

                  // Get Instagram profile data
                  window.FB.api(
                    `/${igId}?fields=name,username,profile_picture_url,followers_count`,
                    function (igData) {
                      console.log("Instagram Info:", igData);
                      setUserData(igData); // Show modal with user data
                    }
                  );
                }
              );
            } else {
              alert("No Facebook Pages found or no permissions.");
            }
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      {
        scope:
          "public_profile,email,pages_show_list,pages_read_engagement,pages_manage_posts,instagram_basic,instagram_content_publish",
      }
    );
  };

  const handleContinue = () => {
    navigate("/dashboard");
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

      {/* Instagram User Info Modal */}
      {userData && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-md text-center relative">
            <img
              src={userData.profile_picture_url}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{userData.name}</h2>
            <p className="text-gray-600 mb-1">@{userData.username}</p>
            <p className="text-gray-700 mb-4">
              Followers: {userData.followers_count}
            </p>
            <button
              onClick={handleContinue}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}
    </BackgroundLines>
  );
}
