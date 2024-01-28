import { create } from "zustand";

const useGlobalStore = create<GlobalStoreValues>()((set) => ({
  file: {
    name: "No file chosen",
    data: undefined,
    dataUrl: undefined,
    height: -1,
    width: -1,
  },
  setFile: (value) => set({ file: value }),

  status: "Idle",
  setStatus: (value) => set({ status: value }),

  activeTab: "artwork",
  setActiveTab: (value) => set({ activeTab: value }),

  artwork: {
    isLoaded: false,
    isMeasured: false,
    imageLinks: {
      primary: "./img/1.jpg",
      rightCol: "./img/2.jpg",
    },
  },
  setArtwork: (value) => {
    set((state) => ({
      artwork: { ...state.artwork, ...value },
    }));
  },
}));

export default useGlobalStore;
