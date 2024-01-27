import { create } from "zustand";

const useGlobalStore = create<GlobalStoreValues>()((set) => ({
  file: { data: undefined, name: "No file chosen" },
  setFile: (value) => set({ file: value }),

  status: "Idle",
  setStatus: (value) => set({ status: value }),

  activeTab: "artwork",
  setActiveTab: (value) => set({ activeTab: value }),
}));

export default useGlobalStore;
