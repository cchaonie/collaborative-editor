import { useState } from "react";
import { ModeContext } from "../../contexts";
import { Mode } from "../../contexts/constants";
import { ContainerProps } from "../type";

export const ModeContainer = ({ children }: ContainerProps) => {
  const [mode, setMode] = useState<Mode>(Mode.Editing);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};
