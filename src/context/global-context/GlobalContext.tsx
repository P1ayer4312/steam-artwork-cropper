import { PropsWithChildren, createContext, useContext, useState } from "react";

type FileValues = {
  name: string;
  data: File | undefined;
};

type ActiveTabValues = "artwork" | "workshop";

export type TGlobalContext =
  | {
      file: {
        value: FileValues;
        set: (value: FileValues) => void;
      };
      status: {
        value: string;
        set: (value: string) => void;
      };
      activeTab: {
        value: ActiveTabValues;
        set: (value: ActiveTabValues) => void;
      };
    }
  | undefined;

// ============================================================================

const GlobalContext = createContext<TGlobalContext>(undefined);

export function GlobalContextProvider(props: PropsWithChildren) {
  const [status, _setStatus] = useState<string>("Idle");
  const [activeTab, _setActiveTab] = useState<ActiveTabValues>("artwork");
  const [file, _setFile] = useState<FileValues>({
    name: "No file chosen",
    data: undefined,
  });

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
