import { useState } from "react";
import ContentStore from "../../stores/ContentStore";
import EditContentModal from "./ContentEditModal";

//Layout and UI for contents card list
//List is fetched and stored in zustand store for state management

const ContentCardList = () => {
  const setContents = ContentStore((state) => state.setContents);
  const contents = ContentStore((state) => state.contents);
  const formData = ContentStore((state) => state.formData);
  const setFormData = ContentStore((state) => state.setFormData);

  //Modal State
  const [showModal, setShowModal] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setShowModal(false);
  };

  if (!contents) return <p>Loading...</p>;

  //sort contents by priority and render items higher in the list
  const sortedContents = contents.sort((a, b) => {
    return parseInt(b.priority) - parseInt(a.priority);
  });

  //render cards with content
  const card = sortedContents.map((cont) => (
    <div
      key={cont._id}
      className="bg-card z-0 hover:border hover:border-deep-secondary transition-all ease duration-500 relative mb-3 rounded-3xl border px-12 py-7 text-left shadow-lg hover:shadow-sm lg:px-7"
    >
      {/* Title and Author */}
      <p className="mb-2 text-xl font-medium text-gray-800">{cont.title}</p>
      <p className="text-md font-light text-accent">
        By <b>{cont.author}</b>
      </p>

      {/* Notes Section */}
      {cont.notes ? (
        <p className="text-sm font-light text-gray-400">{cont.notes}</p>
      ) : null}

      {/* Read Status in the Place of "Visit Website" */}
      <div className="mt-3 flex items-end justify-between">
        <div className="mr-2 mt-1 rounded-lg font-semibold bg-accent-foreground py-1.5 px-3 text-xs text-secondary">
          {cont.readStatus === "reading"
            ? "Reading"
            : cont.readStatus === "notStarted"
            ? "Not Started"
            : "Completed"}
        </div>

        <div className="mt-3 flex items-end justify-between">
  <div className="flex gap-2">
    {/* Open Website Button */}
    {cont.sourceUrl && (
      <a
        href={cont.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-xl bg-accent-foreground p-1 hover:bg-deep-secondary"
      >
        <svg
          className="group-hover:text-accent h-6 w-6 text-secondary"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM8.18 16.77C8.16 16.77 8.13 16.77 8.11 16.77C7.14 16.68 6.23 16.23 5.55 15.51C3.95 13.83 3.95 11.1 5.55 9.42L7.74 7.12C8.52 6.3 9.57 5.84 10.69 5.84C11.81 5.84 12.86 6.29 13.64 7.12C15.24 8.8 15.24 11.53 13.64 13.21L12.55 14.36C12.26 14.66 11.79 14.67 11.49 14.39C11.19 14.1 11.18 13.63 11.46 13.33L12.55 12.18C13.61 11.07 13.61 9.26 12.55 8.16C11.56 7.12 9.82 7.12 8.82 8.16L6.63 10.46C5.57 11.57 5.57 13.38 6.63 14.48C7.06 14.94 7.64 15.22 8.25 15.28C8.66 15.32 8.96 15.69 8.92 16.1C8.89 16.48 8.56 16.77 8.18 16.77ZM18.45 14.59L16.26 16.89C15.48 17.71 14.43 18.17 13.31 18.17C12.19 18.17 11.14 17.72 10.36 16.89C8.76 15.21 8.76 12.48 10.36 10.8L11.45 9.65C11.74 9.35 12.21 9.34 12.51 9.62C12.81 9.91 12.82 10.38 12.54 10.68L11.45 11.83C10.39 12.94 10.39 14.75 11.45 15.85C12.44 16.89 14.18 16.9 15.18 15.85L17.37 13.55C18.43 12.44 18.43 10.63 17.37 9.53C16.94 9.07 16.36 8.79 15.75 8.73C15.34 8.69 15.04 8.32 15.08 7.91C15.12 7.5 15.48 7.19 15.9 7.24C16.87 7.34 17.78 7.78 18.46 8.5C20.05 10.17 20.05 12.91 18.45 14.59Z" fill="currentColor"/>
        </svg>
        
      </a>
    )}

    {/* Edit Modal Button */}
    <button
      onClick={() => {
        setShowModal(true), setFormData(cont);
      }}
      className="group rounded-xl bg-accent-foreground p-1 hover:bg-deep-secondary"
    >
      <svg
        className="group-hover:text-accent h-6 w-6 text-secondary"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM10.95 17.51C10.66 17.8 10.11 18.08 9.71 18.14L7.25 18.49C7.16 18.5 7.07 18.51 6.98 18.51C6.57 18.51 6.19 18.37 5.92 18.1C5.59 17.77 5.45 17.29 5.53 16.76L5.88 14.3C5.94 13.89 6.21 13.35 6.51 13.06L10.97 8.6C11.05 8.81 11.13 9.02 11.24 9.26C11.34 9.47 11.45 9.69 11.57 9.89C11.67 10.06 11.78 10.22 11.87 10.34C11.98 10.51 12.11 10.67 12.19 10.76C12.24 10.83 12.28 10.88 12.3 10.9C12.55 11.2 12.84 11.48 13.09 11.69C13.16 11.76 13.2 11.8 13.22 11.81C13.37 11.93 13.52 12.05 13.65 12.14C13.81 12.26 13.97 12.37 14.14 12.46C14.34 12.58 14.56 12.69 14.78 12.8C15.01 12.9 15.22 12.99 15.43 13.06L10.95 17.51ZM17.37 11.09L16.45 12.02C16.39 12.08 16.31 12.11 16.23 12.11C16.2 12.11 16.16 12.11 16.14 12.1C14.11 11.52 12.49 9.9 11.91 7.87C11.88 7.76 11.91 7.64 11.99 7.57L12.92 6.64C14.44 5.12 15.89 5.15 17.38 6.64C18.14 7.4 18.51 8.13 18.51 8.89C18.5 9.61 18.13 10.33 17.37 11.09Z"
          fill="currentColor"
        />
      </svg>
    </button>
  </div>
</div>
      </div>
    </div>
    // <div
    //   key={cont._id}
    //   className="bg-card z-0 hover:border hover:border-deep-secondary transition-all ease duration-500 relative mb-3 rounded-3xl border px-12 py-7 text-left shadow-lg hover:shadow-sm lg:px-7"
    // >
    //   <p className="mb-2 text-xl font-medium text-gray-800">{cont.title}</p>
    //   <p className="text-md font-light text-accent">By <b>{cont.author}</b></p>

    //   {(cont.notes) ? <p className="text-sm font-light text-gray-400">{cont.notes}</p> : null}
    //   <div className="justify-starts mt-4 flex flex-wrap items-center">
    //     <div className="mr-2 mt-1 rounded-lg font-semibold bg-accent-foreground py-1.5 px-3 text-xs text-secondary">
    //       {cont.readStatus === "reading" ? "Reading" : cont.readStatus === "notStarted" ? "Not Started" : "Completed"}
    //     </div>
    //   </div>
    //   <div className="mt-3 flex items-end justify-between">

    //     <p className="text-md items-bottom font-medium text-accent">
    //     {(cont.sourceUrl) ?
    //       <a
    //         className="duration-500 hover:border-b hover:border-accent mb-2"
    //         target="_blank" href={cont.sourceUrl}
    //       >
    //         Visit website
    //       </a> : null}
    //    </p>

    //     <button onClick={() => {setShowModal(true), setFormData(cont)}} className="group rounded-xl bg-accent-foreground p-1 hover:bg-deep-secondary">
    //       <svg
    //         className="group-hover:text-accent h-6 w-6 text-secondary"
    //         version="1.1"
    //         id="Capa_1"
    //         xmlns="http://www.w3.org/2000/svg"
    //          viewBox="0 0 24 24" fill="none"
    //       >
    //         <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM10.95 17.51C10.66 17.8 10.11 18.08 9.71 18.14L7.25 18.49C7.16 18.5 7.07 18.51 6.98 18.51C6.57 18.51 6.19 18.37 5.92 18.1C5.59 17.77 5.45 17.29 5.53 16.76L5.88 14.3C5.94 13.89 6.21 13.35 6.51 13.06L10.97 8.6C11.05 8.81 11.13 9.02 11.24 9.26C11.34 9.47 11.45 9.69 11.57 9.89C11.67 10.06 11.78 10.22 11.87 10.34C11.98 10.51 12.11 10.67 12.19 10.76C12.24 10.83 12.28 10.88 12.3 10.9C12.55 11.2 12.84 11.48 13.09 11.69C13.16 11.76 13.2 11.8 13.22 11.81C13.37 11.93 13.52 12.05 13.65 12.14C13.81 12.26 13.97 12.37 14.14 12.46C14.34 12.58 14.56 12.69 14.78 12.8C15.01 12.9 15.22 12.99 15.43 13.06L10.95 17.51ZM17.37 11.09L16.45 12.02C16.39 12.08 16.31 12.11 16.23 12.11C16.2 12.11 16.16 12.11 16.14 12.1C14.11 11.52 12.49 9.9 11.91 7.87C11.88 7.76 11.91 7.64 11.99 7.57L12.92 6.64C14.44 5.12 15.89 5.15 17.38 6.64C18.14 7.4 18.51 8.13 18.51 8.89C18.5 9.61 18.13 10.33 17.37 11.09Z" fill="currentColor"/>

    //       </svg>
    //     </button>

    //   </div>
    // </div>
  ));

  // card's container
  return (
    <>
      <EditContentModal showModal={showModal} setShowModal={setShowModal} />

      <div className="flex flex-wrap gap-4">
        <div className="relative mx-auto flex h-full w-full flex-col items-center justify-center px-4 py-8 backdrop-blur-md sm:px-4 sm:py-12 lg:px-0">
          <div className="mx-auto grid grid-cols-1 gap-y-4 gap-x-5 text-center sm:mt-12 sm:text-left md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4">
            {card}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentCardList;
