import { useContext } from "react";
import {
  AuthContext,
  ConnectionContext,
  FilesContext,
  ModeContext,
} from "../../contexts";

export const SourceEditorConnect = ({ children }) => {
  const { userStatus } = useContext(AuthContext);
  const { files } = useContext(FilesContext);
  const { connection } = useContext(ConnectionContext);
  const { mode } = useContext(ModeContext);

  const activeFile = files.find((f) => f.active);

  return children({ userStatus, activeFile, connection, mode });
};
