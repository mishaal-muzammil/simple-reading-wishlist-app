import React from 'react';
import ContentStore from "../../stores/ContentStore";

export default function AddContentModal({ showModal, setShowModal }) {

  if (!showModal) return null;

   const removeContent = ContentStore((state) => state.removeContent);
   const updateContent = ContentStore((state) => state.updateContent);
   const setFormData = ContentStore((state) => state.setFormData);
   const resetFormData = ContentStore((state) => state.resetFormData);
   const formData = ContentStore((state) => state.formData); 


  
  //Adding Content logic starts here 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({...formData, [name]: type === 'checkbox'  ? checked : value });
  };

  const deleteContent = async (id) => {

      const res = await fetch(`http://localhost:5000/api/contents/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }); 
      if(res.ok) {
        //const result = await res.json();
        removeContent(formData._id);
        setShowModal(false);
      }
       else {
        console.error('Failed to delete content');
      }
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    try {
      const res = await fetch(`http://localhost:5000/api/contents/${formData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formData, _id: undefined}),
      });

      if(res.ok) {
        const result = await res.json();
        console.log(result);
        updateContent(formData);
        resetFormData();
      }
       else {
        console.error('Failed to update content');
      }
    } catch (error) {
      console.error('An error occurred while updating content:', error);
    }
    setShowModal(false); 
  };

  // Layout and UI for Add Contents Modal
  return (
    <>
       <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
      <div className="fixed inset-0 z-50 flex justify-center sm:items-center overflow-scroll max-md:shadow-lg max-md:bg-white">
        <div className="sm:relative md:max-w-lg w-full bg-white text-gray-800 sm:rounded-2xl md:border md:shadow-lg sm:mx-4 sm:mx-0">
          <div className="p-6 pb-1">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold my-2">
                Add a new content in your Wishlist
              </p>
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

            {/*form  Section*/}
            <div className="flex flex-col items-center py-6">
              <form className="w-full" onSubmit={handleSubmit}>
                <label className="block w-full mb-4">
                  <p className="mb-1 text-sm text-gray-600 font-semibold">
                    Title: *
                  </p>
                  <input
                    className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-accent focus:ring-1"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title of the content (e.g. Book Name, Article title, etc.)"
                    required
                  />
                </label>
                <label className="block w-full mb-4">
                  <p className="mb-1 text-sm text-gray-600 font-semibold">
                    Author: *
                  </p>
                  <input
                    className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-accent focus:ring-1"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    type="text"
                    placeholder="Author Name"
                    required
                  />
                </label>
                <label className="block w-full mb-4">
                  <p className="mb-1 text-sm text-gray-600 font-semibold">
                    Notes:
                  </p>
                  <textarea
                    rows={2}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-accent focus:ring-1"
                    type="text"
                    placeholder="Comments or any additional notes"
                    multiple
                  />
                </label>

                <label className="block w-full mb-4">
                  <p className="mb-1 text-sm font-semibold text-gray-600">
                    Source URL:{" "}
                  </p>
                  <input
                  name="sourceUrl"
                  value={formData.sourceUrl}
                  onChange={handleChange}
                    className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-accent focus:ring-1"
                    type="text"
                    placeholder="Web Address of the the source, e.g. https://example.com"
                  />
                </label>

                <p className="mb-2 text-sm font-semibold text-gray-600">
                  Reading Progress:
                </p>
                <div className="rounded-lg border bg-white p-1 mb-4">
                  <div className="flex gap-x-4">
                    {/* Completed Option */}
                    <div className="relative flex w-56 items-center justify-center rounded-lg bg-white px-4 py-2 font-semibold text-foreground cursor-pointer">
                      <input
                        className="peer hidden"
                        type="radio"
                        name="readStatus"
                        value="completed"
                        checked={formData.readStatus === "completed"}
                        onChange={handleChange}
                        id="completed"
                      />
                      <label
                        htmlFor="completed"
                        className="peer-checked:bg-[#E4E3EE] hover:bg-[#EDECF4] absolute inset-0 h-full w-full cursor-pointer rounded-lg transition-colors duration-200 ease-in-out"
                      ></label>
                      <span className="pointer-events-none z-10">
                        Completed
                      </span>
                    </div>

                    {/* Reading Option */}
                    <div className="relative flex w-56 items-center justify-center rounded-lg bg-white px-4 py-2 font-semibold text-foreground cursor-pointer">
                      <input
                        className="peer hidden"
                        type="radio"
                        name="readStatus"
                        value="reading"
                        checked={formData.readStatus === 'reading'}
                        onChange={handleChange}
                        id="reading"
                      />
                      <label
                        htmlFor="reading"
                        className=" peer-checked:bg-[#E4E3EE] hover:bg-[#EDECF4] absolute inset-0 h-full w-full cursor-pointer rounded-lg transition-colors duration-200 ease-in-out"
                      ></label>
                      <span className="pointer-events-none z-10">Reading</span>
                    </div>
                    {/* Not Started Option */}
                    <div className="relative flex w-56 items-center justify-center rounded-lg bg-white px-4 py-2 font-semibold text-foreground cursor-pointer">
                      <input
                        className="peer hidden"
                        type="radio"
                        name="readStatus"
                        value="notStarted"
                        checked={formData.readStatus === 'notStarted'}
                        onChange={handleChange}
                        id="notStarted"
                      />
                      <label
                        htmlFor="notStarted"
                        className="peer-checked:bg-[#E4E3EE] hover:bg-[#EDECF4] absolute inset-0 h-full w-full cursor-pointer rounded-lg transition-colors duration-200 ease-in-out"
                      ></label>
                      <span className="pointer-events-none z-10">Not Started</span>
                    </div>

                  </div>
                </div>

                <span className="mb-1 text-sm text-gray-600 font-semibold">
                  Priority:{" "}
                </span>
                <div className="flex items-center mt-2">
                  <span className="font-regular">Low (0)</span>
                  <input
                    className="bg-deep-secondary accent-secondary mr-2 h-2 w-full appearance-none rounded-full bg-blue-100"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    min="0"
                    max="20"
                    type="range"
                  />
                  <span className="font-regular">High (20)</span>
                </div>

                <div className="flex justify-between mt-20">
                <button
                    type="button"
                    onClick={() => deleteContent(formData._id)}
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
