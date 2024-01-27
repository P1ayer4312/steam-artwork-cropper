import "./assets/css/buttons.css";
import "./assets/css/old_buttons.css";
import "./assets/css/globalv2.css";
import "./assets/css/profile.css";
import "./assets/css/profilev2.css";
import "./assets/css/shared_global.css";
import "./assets/css/shared_responsive.css";
import ProfileTemplate from "./components/profile/profile-template";
import { GlobalContextProvider } from "./context/global-context/GlobalContext";
import SmallWindowDialog from "./components/dialog/small-window-dialog";
import { ArtworkShowcaseContextProvider } from "./context/showcase-context/ArtworkShowcaseContext";

function App() {
  return (
    <GlobalContextProvider>
      <ArtworkShowcaseContextProvider>
        <SmallWindowDialog>
          <ProfileTemplate />
        </SmallWindowDialog>
      </ArtworkShowcaseContextProvider>
    </GlobalContextProvider>
  );
}

export default App;
