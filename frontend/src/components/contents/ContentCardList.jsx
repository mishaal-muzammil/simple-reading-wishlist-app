import { useEffect } from 'react';
import ContentStore from './contentStore';

const ContentCardList = () => {
    const {contents, setContents} = ContentStore();
    useEffect( () => {
        async function fetchContent() {
            await fetch("http://localhost:5000/api/contents/")
            .then((response) => response.json())
            .then((data) => setContents(data));           
        }
        fetchContent();
    }, [setContents]);
    
    const card = contents.map(cont => 
            <div key={cont._id} className="bg-card transition-colors hover:border hover:border-primary duration-200 relative mb-3 rounded-3xl border px-12 py-10 text-left shadow backdrop-blur-lg lg:px-12">
            <p className="relative text-2xl font-black text-primary sm:text-4xl">
              {cont.title}
            </p>
            <p className="mt-2 text-gray-600">by {cont.author}</p>
            <p className="relative mt-5 text-gray-600">
              {cont.notes}
            </p>
          </div>
        )

    return (
        <div className="flex flex-wrap gap-4">
        <div className="relative mx-auto flex h-full w-full flex-col items-center justify-center px-4 py-8 backdrop-blur-md sm:px-4 sm:py-12 lg:px-0">
          <div className="mx-auto grid grid-cols-1 gap-y-4 gap-x-5 text-center sm:mt-12 sm:text-left md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">             
            {card}
          </div>
        </div>
        </div>
    )
}
    

export default ContentCardList;