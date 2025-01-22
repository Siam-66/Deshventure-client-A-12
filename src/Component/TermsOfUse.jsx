import React from 'react';

const TermsOfUse = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
      <p>
        Welcome to our website. By accessing and using this site, you agree to the following terms and conditions:
      </p>
      <ul className="list-disc ml-5 mt-4">
        <li>Use of the site is at your own risk.</li>
        <li>Content may not be reproduced without permission.</li>
        <li>We reserve the right to modify these terms at any time.</li>
        {/* Add more terms as necessary */}
      </ul>
    </div>
  );
};

export default TermsOfUse;
