import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Auth, Editor, SideMenu } from './components';
import FilesContext, { FilesContextValue } from './contexts/FilesContext';
import FileDescription from './models/state/FileDescription';
import { getShareDBConnection } from './models/core/getShareDBConnection';
import { parseUrl } from './utils/parseUrl';

import styles from './app.css';

export default () => {
  const location = useLocation();
  const [_, collectionId, documentName] = parseUrl(location.pathname);
  const [files, setFiles] = useState<FileDescription[]>(() => {
    if (collectionId && documentName) {
      const file = new FileDescription(documentName, collectionId, new Date());
      file.active = true;
      return [file];
    }
    return [];
  });

  const [connection, setConnection] = useState(null);

  const initialFilesContext: FilesContextValue = {
    files,
    connection,
    setFiles,
  };

  const openedFile = files.filter(f => f.active)?.[0];

  useEffect(() => {
    setConnection(getShareDBConnection());
  }, []);

  return (
    <Auth>
      <FilesContext.Provider value={initialFilesContext}>
        <div id='board' className={styles.board}>
          <SideMenu />
          <Routes>
            <Route
              path='/'
              element={
                <div className={styles.welcome}>
                  Create a new document from the side menu
                </div>
              }
            />
            <Route
              path='/document/:collectionId/:documentName'
              element={<Editor file={openedFile} />}
            />
          </Routes>
        </div>
      </FilesContext.Provider>
    </Auth>
  );
};
