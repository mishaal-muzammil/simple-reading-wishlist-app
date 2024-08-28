import { create } from 'zustand'


const ContentStore = create((set) => ({
    contents: [],
    setContents: (newContents) => set({ contents: newContents }),
  }))

  export default ContentStore;