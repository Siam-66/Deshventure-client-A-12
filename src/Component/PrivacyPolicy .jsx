import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p>
        Your privacy is important to us. This policy explains how we collect, use, and protect your personal information:
      </p>
      <ul className="list-disc ml-5 mt-4">
        <li>We collect personal information only when necessary.</li>
        <li>We do not sell or share your data with third parties.</li>
        <li>We use secure methods to protect your information.</li>
        {/* Add more privacy policy details */}
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
