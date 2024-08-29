import { useState } from "react";
import ContentStore from "../../stores/ContentStore";
import EditContentModal from "./ContentEditModal";
import { ReadMore } from "../ReadMore";

//Layout and UI for contents card list
//List is fetched and stored in zustand store for state management

const ContentCardList = () => {
  const contents = ContentStore((state) => state.contents);
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
      className="bg-card dcard min-h-[182px] h-fit z-0 hover:border hover:border-deep-secondary transition-all ease duration-500 relative mb-3 rounded-3xl border px-12 py-7 text-left shadow-lg hover:shadow-sm lg:px-7"
    >
      {/* Title and Author */}
      <a className="mb-2 text-xl font-medium text-gray-800" target="_blank"
      onClick={(e) => {
        !cont.sourceUrl ? e.preventDefault() : null;
      }}
      href={cont.sourceUrl ? cont.sourceUrl : "#"}>{cont.title}</a>
      <p className="text-md font-regular text-accent ">
        By {cont.author}
      </p>

      {/* Notes Section */}
      {cont.notes ? (
        <p className="text-sm font-light text-gray-400 mt-2"><ReadMore buttonClass={"text-muted-foreground font-semibold"} text={cont.notes} limit={10}/></p>
      ) : null}

      {/* Read Status in the Place of "Visit Website" */}
      <div className="mt-3 flex items-center justify-between">
        <div className="rounded-lg font-semibold bg-accent-foreground py-1.5 px-3 text-xs text-secondary">
          {cont.readStatus === "reading"
            ? "Reading"
            : cont.readStatus === "notStarted"
            ? "Not Started"
            : "Completed"}
        </div>

        <div className=" flex items-end justify-between">

          <div className="flex gap-2">
            {/* Open Website Button */}
            {cont.sourceUrl && (
              <a
                title="Open Website"
                href={cont.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl bg-accent-foreground p-1 hover:bg-deep-secondary hover:scale-110 duration-300 transition-all ease-out"
              >
                <svg
                  className="h-6 w-6 text-muted-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19H17C18.1046 19 19 18.1046 19 17V12.25M19 5H15M19 5V9M19 5L9 15"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            )}

            {/* Edit Modal Button */}
            <button
              title="Edit Content"
              onClick={() => {
                setShowModal(true), setFormData(cont);
              }}
              className="group rounded-xl bg-accent-foreground p-1 px-2 hover:bg-deep-secondary hover:scale-110 duration-300 transition-all ease-out"
            >
              <svg
                className="h-5 w-5 text-muted-foreground "
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M11 4.00023H6.8C5.11984 4.00023 4.27976 4.00023 3.63803 4.32721C3.07354 4.61483 2.6146 5.07377 2.32698 5.63826C2 6.27999 2 7.12007 2 8.80023V17.2002C2 18.8804 2 19.7205 2.32698 20.3622C2.6146 20.9267 3.07354 21.3856 3.63803 21.6732C4.27976 22.0002 5.11984 22.0002 6.8 22.0002H15.2C16.8802 22.0002 17.7202 22.0002 18.362 21.6732C18.9265 21.3856 19.3854 20.9267 19.673 20.3622C20 19.7205 20 18.8804 20 17.2002V13.0002M7.99997 16.0002H9.67452C10.1637 16.0002 10.4083 16.0002 10.6385 15.945C10.8425 15.896 11.0376 15.8152 11.2166 15.7055C11.4184 15.5818 11.5914 15.4089 11.9373 15.063L21.5 5.50023C22.3284 4.6718 22.3284 3.32865 21.5 2.50023C20.6716 1.6718 19.3284 1.6718 18.5 2.50022L8.93723 12.063C8.59133 12.4089 8.41838 12.5818 8.29469 12.7837C8.18504 12.9626 8.10423 13.1577 8.05523 13.3618C7.99997 13.5919 7.99997 13.8365 7.99997 14.3257V16.0002Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  
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
