// const Profile = () => {
//   return (
//     <div className="p-4 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Profile</h2>
//       <p>This is your profile page.</p>
//     </div>
//   );
// };

// export default Profile;

import { useState } from "react";

const Profile = () => {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p>This is your profile page.</p>

      {/* Button to open Terms & Conditions */}
      <button
        onClick={() => setShowTerms(true)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        View Terms & Conditions
      </button>

      {/* Modal */}
      {showTerms && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowTerms(false)}
          ></div>

          {/* Modal content */}
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full z-10 p-6 relative">
            <h3 className="text-xl font-bold mb-4">Terms & Conditions</h3>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              convallis egestas rhoncus. Donec facilisis fermentum sem, ac
              viverra ante luctus vel.
            </p>
            <p className="mb-4">
              Curabitur sed iaculis dolor, non congue ligula. Maecenas imperdiet
              nunc et urna laoreet, nec venenatis nisl tincidunt.
            </p>

            {/* Close button */}
            <button
              onClick={() => setShowTerms(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <div className="text-right mt-4">
              <button
                onClick={() => setShowTerms(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
