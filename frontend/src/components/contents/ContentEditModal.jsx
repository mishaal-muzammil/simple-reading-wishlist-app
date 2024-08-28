import React from 'react';

export default function EditContentModal({ showModal, setShowModal, onSubmit }) {
  if (!showModal) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black opacity-50"></div>

      {/*  Content */}
      <div className="fixed inset-0 z-50 flex justify-center items-center">
        <div className="relative max-w-lg w-full bg-white rounded-2xl border text-gray-800 shadow-lg mx-4 sm:mx-0">
          <div className="p-6 pb-1">
            {/* Header */}
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold my-2">Update your Wishlist content</p>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-col items-center py-6">
              <form className="w-full" onSubmit={onSubmit}>
                <label className="block w-full mb-4">
                  <p className="mb-1 text-sm text-gray-600 font-semibold">Title: *</p>
                  <input
                    className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-accent focus:ring-1"
                    type="text"
                    placeholder="Title of the content (e.g. Book Name, Article title, etc.)"
                    required
                  />
                </label>
                <label className="block w-full mb-4">
                  <p className="mb-1 text-sm text-gray-600 font-semibold">Author: *</p>
                  <input
                    className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-accent focus:ring-1"
                    type="text"
                    placeholder="Author Name"
                    required
                  />
                </label>
                <label className="block w-full mb-4">
                  <p className="mb-1 text-sm text-gray-600 font-semibold">Notes:</p>
                  <textarea rows={5}
                    className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-accent focus:ring-1"
                    type="text"
                    placeholder="Comments or any additional notes"
                  />
                </label>

                <label className="block w-full mb-4">
                  <p className="mb-1 text-sm font-semibold text-gray-600">Source URL: *</p>
                  <input
                    className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-accent focus:ring-1"
                    type="text"
                    placeholder="Web Address of the the source, e.g. https://example.com"
                    required
                  />
                </label>
                <span className="mb-1 text-md text-gray-600 font-semibold">Priority: </span>
                    <div className="flex items-center mt-2">
                    <span className="font-regular">Low (0)</span>
                    <input className="bg-deep-secondary accent-secondary mr-2 h-2 w-full appearance-none rounded-full bg-blue-100" value="0" defaultValue={0} maxLength={20} type="range" />
                    <span className="font-regular">High (20)</span>
                    </div>

                {/* Footer */}
                <div className="flex justify-between mt-20 ">
                  <button
                    type="button"
                    className=" transition-all duration-400 whitespace-nowrap rounded-lg px-4 py-3 border border-destructive hover:border-red-500 hover:bg-red-500 hover:text-white text-destructive bg-white font-medium"
                  >
                    Delete 
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="whitespace-nowrap rounded-lg bg-gray-200 px-4 py-3 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="whitespace-nowrap rounded-lg bg-accent px-4 py-3 font-medium text-white"
                  >
                    Done
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}