import { Route, Routes } from "react-router-dom";

import {
  AuthContainer,
  ConnectionContainer,
  FilesContainer,
} from "./containers";
import { SourceEditor, SideMenu, SourceEditorConnect } from "./components";

import styles from "./app.css";
import { ModeContainer } from "./containers/ModeContainer/ModeContainer";

export const App = () => {
  return (
    <AuthContainer>
      <ConnectionContainer>
        <FilesContainer>
          <ModeContainer>
            <div id="board" className={styles.board}>
              <SideMenu />
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className={styles.welcome}>
                      Create a new document from the side menu
                    </div>
                  }
                />
                <Route
                  path="/document/:collectionId/:documentName"
                  element={
                    <SourceEditorConnect>
                      {({ userStatus, activeFile, connection, mode }) => (
                        <SourceEditor
                          key={activeFile.name + activeFile.creator}
                          activeFile={activeFile}
                          connection={connection}
                          userStatus={userStatus}
                          mode={mode}
                        />
                      )}
                    </SourceEditorConnect>
                  }
                />
              </Routes>
            </div>
          </ModeContainer>
        </FilesContainer>
      </ConnectionContainer>
    </AuthContainer>
  );
};

export default App;
