import React from "react";
import { useNavigate } from "react-router-dom";

export default function TermsOfService() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>

      <p className="mb-4">
        Welcome to <strong>Brandfolio</strong>! By accessing or using our web
        application, you agree to be bound by these Terms of Service and our
        Privacy Policy.
      </p>

      <h2 className="text-xl font-semibold mb-2">Use of Our Service</h2>
      <p className="mb-4">
        You may use our service only if you comply with all applicable laws and
        these Terms. You are responsible for maintaining the security of your
        account and connected social media accounts.
      </p>

      <h2 className="text-xl font-semibold mb-2">Content Scheduling</h2>
      <p className="mb-4">
        Our platform allows you to schedule and publish content to your
        connected Facebook Pages and Instagram Business Accounts. You are
        solely responsible for the content you schedule and publish.
      </p>

      <h2 className="text-xl font-semibold mb-2">User Data</h2>
      <p className="mb-4">
        By connecting your social media accounts, you grant us permission to
        access and use the necessary data to provide our service. Please review
        our Privacy Policy for more details.
      </p>

      <h2 className="text-xl font-semibold mb-2">Termination</h2>
      <p className="mb-4">
        We may suspend or terminate your access to the service at any time if
        you violate these Terms or misuse the platform.
      </p>

      <h2 className="text-xl font-semibold mb-2">Changes to These Terms</h2>
      <p className="mb-4">
        We reserve the right to modify these Terms at any time. Updated terms
        will be posted on this page. Continued use of the service means you
        accept the updated Terms.
      </p>

      <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
      <p className="mb-4">
        If you have any questions about these Terms, please contact us at: <br />
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
