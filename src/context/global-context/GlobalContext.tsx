import { PropsWithChildren, createContext, useContext, useState } from "react";
import {
  ActiveTabValues,
  FileValues,
  TGlobalContext,
} from "./types/GlobalContext";
import ArtworkPanelWrapper from "../../classes/ArtworkPanelWrapper";

const GlobalContext = createContext<TGlobalContext>(undefined);

export function GlobalContextProvider(props: PropsWithChildren) {
  const [status, _setStatus] = useState<string>("Idle");
  const [activeTab, _setActiveTab] = useState<ActiveTabValues>("artwork");
  const [file, _setFile] = useState<FileValues>({
    name: "No file chosen",
    data: undefined,
  });

  function loadMedia() {
    if (activeTab == "artwork") {
      if (GlobalContextValues?.panels.artworkPanel === null) {
        GlobalContextValues.panels.artworkPanel = new ArtworkPanelWrapper();
      }
    }
  }

  const GlobalContextValues: TGlobalContext = {
    status: {
      value: status,
      set: (value) => _setStatus(value),
    },
    activeTab: {
      value: activeTab,
      set: (value) => _setActiveTab(value),
    },
    file: {
      value: file,
      set: (value) => _setFile(value),
    },
    panels: {
      artworkPanel: null,
      loadMedia,
    },
  };

  return (
    <GlobalContext.Provider value={GlobalContextValues}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
