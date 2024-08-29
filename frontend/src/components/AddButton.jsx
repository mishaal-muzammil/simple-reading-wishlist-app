export default function AddButton({text, className, isIcon, handleClick }) {

    return (
        <button
          onClick={handleClick}
          className={!className ? `mt-4 group backdrop-filter backdrop-blur-lg sm:py-4 sm:px-6 py-2 px-3 inline-flex items-center gap-x-2 text-md font-medium rounded-lg border border-accent hover:border-accent shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-200 focus:outline-none focus:bg-gray-50` : className}
        >
            {isIcon && (
                <svg
                className="sm:w-6 sm:h-6 w-7 h-7"
                fill="#fff"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M4 12H20M12 4V20" className="group-hover:stroke-accent-foreground stroke-accent" strokeWidth="2" />
              </svg>
            )}
          
          {text}
        </button>
);
}