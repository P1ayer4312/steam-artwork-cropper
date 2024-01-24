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
    }
  | undefined;
