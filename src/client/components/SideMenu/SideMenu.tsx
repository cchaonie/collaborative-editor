import { useContext } from "react";
import { ModeContext } from "../../contexts";
import { Mode } from "../../contexts/constants";
import { Iconfont } from "../Iconfont";
import { Files } from "./component/Files";
import MenuItem from "./component/MenuItem";

import styles from "./sideMenu.css";

export const SideMenu = () => {
  const { mode, setMode } = useContext(ModeContext);

  const handleClickSource = () =>
    setMode(mode === Mode.Editing ? Mode.SourceCode : Mode.Editing);

  return (
    <div className={`${styles.sideMenu} ${styles["sideMenu-background"]}`}>
      <h1 className={styles["sideMenu-title"]}>Collaborative Editor</h1>
      <div className={styles["sideMenu-operationSection"]}>
        <MenuItem name="FILES">
          <Files />
        </MenuItem>
        <div className={styles.sourceCode} onClick={handleClickSource}>
          <Iconfont name="code" fontSize="20px" />
        </div>
      </div>
    </div>
  );
};
