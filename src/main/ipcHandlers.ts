// ipcHandlers.ts
import { ipcMain } from "electron";
import {
  findAllClientsHandler,
  findAllClientsWithPaginationHandler,
  findClienteHandler,
} from "./handlers/clientsHandler";
// import { /* ... otros handlers de direcciones, productos, etc. */ } from './handlers/addressHandler';
// ... Importa los demás handlers

// Settings
ipcMain.handle("settings:getConfig", async () => {
  // Implementa la lógica para obtener la configuración (puede ser de un archivo o base de datos)
  return { theme: "dark", language: "es" };
});

// Clientes
ipcMain.handle("clients:getAllClients", findAllClientsHandler);
ipcMain.handle(
  "clients:getAllClientsWithPagination",
  findAllClientsWithPaginationHandler
);
ipcMain.handle("clients:findClient", findClienteHandler);
// ipcMain.handle('clients:findClientById', findClienteByIdHandler);
// ipcMain.handle('clients:addlClient', addClienteHandler);
// ipcMain.handle('clients:updateClient', updateClienteHandler);
// ipcMain.handle('clients:deleteClient', deleteClienteHandler);

// Direcciones, Productos, Ventas, Pagos y demás...
// Registra los demás handlers de la misma forma.
