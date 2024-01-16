import ArtworkPanelWrapper from "../../../classes/ArtworkPanelWrapper";

type FileValues = {
  name: string;
  data: File | undefined;
};

type ActiveTabValues = "artwork" | "workshop";

type TGlobalContext =
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
      panels: {
        artworkPanel: ArtworkPanelWrapper | null;
        loadMedia: () => void; //TODO: Might need to make it async
      };
      statusPanel;
    }
  | undefined;
