// I had some issues with the react 'useState' hook. So I have used 'zustand' package to store the state of the data, 


import { create } from 'zustand'


const ContentStore = create((set) => ({
    contents: [],
    setContents: (newContents) => set({ contents: newContents }),
  }))

  export default ContentStore;