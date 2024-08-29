import { useEffect, useState } from "react";
import AddContentModal from "../components/contents/ContentAddModal";
import ContentCardList from "../components/contents/ContentCardList";
import ContentStore from "../stores/ContentStore";

// Main page of reading wishlist
// Contains the contents page layout.


const ContentsPage = () => {

    //fetch contents from api endpoint and store in state
    const contents = ContentStore((state) => state.contents);
    const setContents = ContentStore((state) => state.setContents);


    useEffect(() => {
      async function fetchContent() {
        const res = await fetch("http://localhost:5000/api/contents")
          const data = await res.json();
          setContents(data);
          console.log("Got Data:"+ data+"--- Loaded Data: "+contents);
      }
      fetchContent();
    },[setContents]);

  const [showModal, setShowModal] = useState(false);





  //Adding Content logic ends here 

  return (
    <div className="px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">

      {/* Content Add Modal Section */}
      
      <AddContentModal showModal={showModal} setShowModal={setShowModal} />

      <div className="mb-5 pb-5 flex md:justify-between justify-center items-center border-b">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Reading WishList</h2>
        </div>

        <div className="md:static z-10  fixed bottom-8 right-8">
          <button
          onClick={() => setShowModal(true)}
            className="group backdrop-filter backdrop-blur-lg sm:py-4 sm:px-6 py-2 px-3 inline-flex items-center gap-x-2 text-md font-medium rounded-lg border border-accent hover:border-accent shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-200 focus:outline-none focus:bg-gray-50"
            href="#"
          >
            <svg
            className="sm:w-6 sm:h-6 w-7 h-7"
            fill="#fff"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M4 12H20M12 4V20" className="group-hover:stroke-accent-foreground stroke-accent"  strokeWidth="2" />
            </svg>
            New Wishlist
          </button>
        </div>
      </div>
        <ContentCardList contents={contents} />
    </div>
  );
};

export default ContentsPage;
