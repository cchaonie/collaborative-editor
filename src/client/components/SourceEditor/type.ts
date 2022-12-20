import { ReactNode } from "react";
import { Connection } from "sharedb/lib/client";
import { Mode } from "../../contexts/constants";
import { FileDescription, UserStatus } from "../../models";

export interface SourceEditorProps {
  userStatus: UserStatus;
  activeFile: FileDescription;
  connection: Connection;
  mode: Mode;
}

export interface SourceEditorConnectProps {
  children: (contextValues: SourceEditorProps) => ReactNode;
}
