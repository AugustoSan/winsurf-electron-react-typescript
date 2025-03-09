import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as fs from "fs";

app.commandLine.appendSwitch("disable-gpu");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: process.env.NODE_ENV === "development",
    },
  });

  // Si NODE_ENV no está definido, lo forzamos a producción
  process.env.NODE_ENV = process.env.NODE_ENV || "production";
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    // Carga la URL del webpack-dev-server
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else {
    // Carga el index.html que genera Webpack en dist/renderer
    const indexHtml = path.join(__dirname, "..", "renderer", "index.html");
    console.log("Buscando HTML en:", indexHtml);

    if (fs.existsSync(indexHtml)) {
      mainWindow.loadFile(indexHtml);
    } else {
      console.error("No se encontró el archivo index.html en:", indexHtml);
    }
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
