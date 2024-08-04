const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  //add react developer tools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.handle("create-file", async (event, filePath: string) => {
  if (fs.existsSync(filePath)) {
    return false; // File already exists
  } else {
    fs.writeFileSync(filePath, "", "utf-8"); // throws error if file creation fails
    return true; // New file created
  }
});

ipcMain.handle("delete-file", async (event, filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath); // throws error if file deletion fails
    return true;
  }
  return false;
});

ipcMain.handle("list-files", async (event, directoryPath) => {
  if (
    fs.existsSync(directoryPath) &&
    fs.lstatSync(directoryPath).isDirectory()
  ) {
    const fileInfos = fs.readdirSync(directoryPath).map((fileName) => ({
      fileName,
      filePath: path.join(directoryPath, fileName),
    }));
    return fileInfos; // Return list of files
  } else {
    return []; // Return empty array if directory does not exist
  }
});

// function to load file content
ipcMain.handle("load-file", async (event, filePath) => {
  if (fs.existsSync(filePath)) {
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      return { success: true, content };
    } catch (error) {
      console.error("Error reading the file:", error);
      return { success: false, error: error.message };
    }
  } else {
    return { success: false, error: "File does not exist" };
  }
});
