import React, { useState, useEffect } from 'react';

function AgeVerificationPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const isConfirmed = localStorage.getItem('isOver18');
    if (!isConfirmed) {
      setTimeout(() => {
        setShowPopup(true);
      }, 5000);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('isOver18', true);
    setShowPopup(false);
  };
  const handleDeny = () => {
    localStorage.setItem('isOver18', false);
    window.location.href = 'https://www.google.com';
    setShowPopup(false);
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen z-50 flex items-center justify-center bg-gray-900/75 transition duration-150 ease-in-out ${showPopup ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto p-8 text-center">
        <h2 className="text-3xl font-sans mb-4">Age Verification</h2>
        <p className="text-lg leading-relaxed mb-2">
          Before you proceed, we need to ensure you're above 18 years old. This
          content may contain mature themes or restricted materials, so we want
          to be responsible and compliant with age verification regulations.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          If you're over 18 and comfortable with the content, please click "Yes"
          to continue. Otherwise, please click "No" to be redirected to our
          general audience information.
        </p>
        <div className="flex items-center justify-center mt-8">
          <button
            onClick={handleConfirm}
            className="btn btn-primary mr-4 rounded-lg border border-gray-400 sm:p-1 p-2 hover:bg-green-800"
          >
            Yes, I'm Over 18
          </button>
          <button onClick={handleDeny} className="btn btn-secondary rounded-lg border border-gray-400 sm:p-1 p-2 hover:bg-red-800">No, I'm Not 18</button>
        </div>
      </div>
    </div>
  );
}

export default AgeVerificationPopup;
