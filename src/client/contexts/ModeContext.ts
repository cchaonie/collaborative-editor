import React from "react";
import { Mode } from "./constants";

export interface ModeValue {
  mode: Mode;
  setMode: (m: Mode) => void;
}

export const ModeContext = React.createContext<ModeValue | null>(null);
