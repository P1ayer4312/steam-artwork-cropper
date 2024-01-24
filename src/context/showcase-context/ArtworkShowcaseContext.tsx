import { PropsWithChildren, createContext, useContext } from "react";

const ArtworkShowcaseContext =
  createContext<TArtworkShowcaseContext>(undefined);

export function ArtworkShowcaseContextProvider(props: PropsWithChildren) {
  return (
    <ArtworkShowcaseContext.Provider value={undefined}>
      {props.children}
    </ArtworkShowcaseContext.Provider>
  );
}

export function useArtworkShowcaseContext() {
  return useContext(ArtworkShowcaseContext)!;
}
