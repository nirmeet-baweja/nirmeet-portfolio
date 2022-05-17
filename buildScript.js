// /buildScript.js

import { existsSync } from "fs";
import { removeSync, moveSync } from "fs-extra";
import { execSync } from "child_process";

if (existsSync("./build")) {
  removeSync("./build");
}

// Run 'react-scripts build' script
execSync("react-scripts build", { stdio: "inherit" });

// Move app build to server/build directory
moveSync("./build", "./server/build", { overwrite: true });
