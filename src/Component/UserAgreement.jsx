import React from 'react';

const UserAgreement = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Agreement</h1>
      <p>
        This agreement outlines the terms under which users may access and use our services:
      </p>
      <ul className="list-disc ml-5 mt-4">
        <li>By using our services, you agree to comply with our terms.</li>
        <li>You agree not to misuse the services provided.</li>
        <li>We are not responsible for any unauthorized access to your account.</li>
        {/* Add more user agreement terms */}
      </ul>
    </div>
  );
};

export default UserAgreement;
