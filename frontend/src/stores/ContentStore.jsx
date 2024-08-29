

// I had some unknown object issues with the react 'useState' hook. So I have used 'zustand' package to store the state of the data, 

import { create } from 'zustand'

// zustand store
const ContentStore = create((set) => ({
    contents: [],
    formData: {
      title: '',
      author: '',
      sourceUrl: '',
      notes: '',
      readStatus: 'reading',
      priority: 0,
  },
  addContent: (newContent) => set((state) => ({ contents: [...state.contents, { ...newContent }] })),
  removeContent: (id) => set((state) => ({ contents: state.contents.filter((content) => content._id !== id) })),
  updateContent: (updatedContent) => set((state) => ({
    contents: state.contents.map((content) => content._id === updatedContent._id ? { ...content, ...updatedContent } : content)
  })),
  setFormData: (newData) => set((state) => ({
    formData: { ...state.formData, ...newData }
  })),

  resetFormData: () => set(() => ({
    formData: {
      title: '',
      author: '',
      publishedDate: '',
      sourceUrl: '',
      notes: '',
      readStatus: 'reading',
      priority: 0,
    }
  })),
    setContents: (newContents) => set({ contents: newContents }),
  }))

  export default ContentStore;

