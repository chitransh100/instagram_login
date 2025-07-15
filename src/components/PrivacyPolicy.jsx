import React from "react";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        <strong>Brandfolio</strong> ("we", "us", or "our") operates this web
        application that connects to Facebook and Instagram.
      </p>

      <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
      <p className="mb-4">
        We collect information when you connect your social media accounts,
        including:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Public Facebook profile information</li>
        <li>Facebook Pages you manage</li>
        <li>Instagram Business Account information</li>
        <li>Access tokens for Facebook and Instagram</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
      <p className="mb-4">
        We use this information to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          Enable you to schedule and publish posts to your Facebook Pages and
          Instagram accounts
        </li>
        <li>Provide you with related functionality and support</li>
      </ul>

      <p className="mb-4">
        We do not sell your personal data. We store your tokens securely and
        only use them to perform actions that you request through our app.
      </p>

      <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this Privacy Policy, please contact us
        at: <br />
        <a
          href="mailto:contact@yourdomain.com"
          className="text-blue-600 underline"
        >
          contact@yourdomain.com
        </a>
      </p>

      <p className="text-gray-600 mb-8">Last updated: July 2025</p>

      <button
        onClick={handleBack}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Home
      </button>
    </div>
  );
}
