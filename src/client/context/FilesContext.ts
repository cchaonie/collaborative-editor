import React from 'react';
import { Connection } from 'sharedb/lib/client';
import { UserStatus } from '../model/core/type';
import FileDescription from '../model/state/FileDescription';

export interface FilesContextValue {
  userId: string;
  userStatus: UserStatus;
  files: FileDescription[];
  connection: Connection;
  setFiles: (files: FileDescription[]) => void;
}

const FilesContext = React.createContext<FilesContextValue | null>(null);

export default FilesContext;
