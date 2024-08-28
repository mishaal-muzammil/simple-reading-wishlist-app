import ContentCardList from "../components/contents/ContentCardList";



const ContentsPage = () => {

  return (
    <div className="px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
      <div className="mb-5 pb-5 flex md:justify-between justify-center items-center border-b">
        <div>
          <h2 className="text-xl sm:text-3xl font-bold">Reading WishList</h2>
        </div>

        <div className="md:static fixed bottom-8 right-8">
          <a
            className="sm:py-4 sm:px-6 py-2 px-3 inline-flex items-center gap-x-2 text-md font-medium rounded-lg border hover:border-primary shadow-sm hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
            href="#"
          >
            <svg
            className="sm:w-6 sm:h-6 w-7 h-7"
              fill="#000"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="2" />
            </svg>
            New Wishlist
          </a>
        </div>
      </div>
        <ContentCardList />
    </div>
  );
};

export default ContentsPage;
