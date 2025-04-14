// preload.ts
// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import {
  IClient,
  IConfig,
  IDataPagination,
  IDirection,
  IFiltersGraphics,
  IGraphicResponse,
  IPriceProduct,
  IProducto,
  IVenta,
  IVentasProductos,
} from "../main/interfaces";
import {
  IDataAddAddress,
  IDataAddClient,
  IDataUpdateAddress,
  IDataUpdateClient,
} from "../main/interfaces/IClients";
import {
  IDataAddProduct,
  IDataUpdateProduct,
} from "../main/interfaces/IProducts";
import { IDataAddVenta } from "../main/interfaces/IVentas";
import { PagedList } from "../main/utils/Pagination";
import { IAddPago, IPago } from "../main/interfaces/IPagos";

export type Channels = "ipc-example";

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);
      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    // Settings
    GetConfig: (): Promise<IConfig> =>
      ipcRenderer.invoke("settings:getConfig", []),
    // Clients
    GetAllClients: (): Promise<Array<IClient>> =>
      ipcRenderer.invoke("clients:getAllClients", []),
    GetAllClientsWithPagination: (
      data: IDataPagination
    ): Promise<PagedList<IClient>> =>
      ipcRenderer.invoke("clients:getAllClientsWithPagination", data),
    FindCliente: (
      texto: string,
      data: IDataPagination
    ): Promise<PagedList<IClient>> =>
      ipcRenderer.invoke("clients:findClient", texto, data),
    FindClienteById: (id: number): Promise<IClient | null> =>
      ipcRenderer.invoke("clients:findClientById", id),
    AddClient: (data: IDataAddClient): Promise<number> =>
      ipcRenderer.invoke("clients:addlClient", data),
    UpdateClient: (data: IDataUpdateClient): Promise<number> =>
      ipcRenderer.invoke("clients:updateClient", data),
    DeleteClient: (data: number): Promise<number> =>
      ipcRenderer.invoke("clients:deleteClient", data),
    // Direcciones
    GetAllAddress: (): Promise<Array<IDirection>> =>
      ipcRenderer.invoke("address:getAllAddress", []),
    FindAddressById: (id: number): Promise<IDirection | null> =>
      ipcRenderer.invoke("address:findAddressById", id),
    FindAllAddressByClient: (id: number): Promise<Array<IDirection>> =>
      ipcRenderer.invoke("address:getAllAddressByClient", id),
    AddAddress: (data: IDataAddAddress): Promise<number> =>
      ipcRenderer.invoke("address:addlAddress", data),
    UpdateAddress: (data: IDataUpdateAddress): Promise<number> =>
      ipcRenderer.invoke("address:updateAddress", data),
    DeleteAddress: (data: number): Promise<number> =>
      ipcRenderer.invoke("address:deleteAddress", data),
    // Products
    GetAllProducts: (): Promise<Array<IProducto>> =>
      ipcRenderer.invoke("products:getAllProducts"),
    GetAllProductsWithPagination: (
      data: IDataPagination
    ): Promise<PagedList<IProducto>> =>
      ipcRenderer.invoke("products:getAllProductsWithPagination", data),
    FindProducto: (
      concepto: string,
      data: IDataPagination
    ): Promise<PagedList<IProducto>> =>
      ipcRenderer.invoke("products:findProduct", concepto, data),
    FindProductoById: (id: number): Promise<IProducto | null> =>
      ipcRenderer.invoke("products:findProductById", id),
    // FindPricesProducto: (data: IDataFindPricesProduct): Promise<Array<IPriceProduct>> =>
    //   ipcRenderer.invoke('products:findPricesProduct', data),
    AddProduct: (data: IDataAddProduct): Promise<number> =>
      ipcRenderer.invoke("products:addlProduct", data),
    UpdateProduct: (data: IDataUpdateProduct): Promise<number> =>
      ipcRenderer.invoke("products:updateProduct", data),
    DeleteProduct: (data: number): Promise<number> =>
      ipcRenderer.invoke("products:deleteProduct", data),
    // Ventas
    GetAllVentas: (data: IDataPagination): Promise<PagedList<IVenta>> =>
      ipcRenderer.invoke("ventas:getAllVentas", data),
    GetVentaById: (id: number): Promise<IVenta | null> =>
      ipcRenderer.invoke("ventas:getVentaById", id),
    GetAllVentasByCliente: (
      id: number,
      data: IDataPagination
    ): Promise<PagedList<IVenta>> =>
      ipcRenderer.invoke("ventas:getVentaByCliente", id, data),
    GetProductosFromVenta: (id: number): Promise<Array<IVentasProductos>> =>
      ipcRenderer.invoke("ventas:getProductosFromVenta", id),
    // GetVentaByID: (id: number): Promise<IVenta> => ipcRenderer.invoke('ventas:getVentaByID', id),
    AddVenta: (venta: IDataAddVenta): Promise<number> =>
      ipcRenderer.invoke("ventas:addVenta", venta),
    GetDeudaByCliente: (id: number): Promise<number> =>
      ipcRenderer.invoke("ventas:getDeudaByClientHandler", id),
    // Pagos
    GetAllPagos: (): Promise<Array<IPago>> =>
      ipcRenderer.invoke("pagos:getAllPagosHandler", []),
    GetAllPagosByVenta: (id: number): Promise<Array<IPago>> =>
      ipcRenderer.invoke("pagos:getAllPagosByVentaHandler", id),
    GetAllPagosByClient: (id: number): Promise<Array<IPago>> =>
      ipcRenderer.invoke("pagos:getAllPagosByClientHandler", id),
    FindPagoById: (id: number): Promise<IPago | null> =>
      ipcRenderer.invoke("pagos:findPagoByIdHandler", id),
    InsertPago: (pago: IAddPago): Promise<number> =>
      ipcRenderer.invoke("pagos:addPagoHandler", pago),
    DeletePago: (id: number): Promise<number> =>
      ipcRenderer.invoke("pagos:deletePagoHandler", id),
    // Graphics
    GetGraphics: (filters: IFiltersGraphics): Promise<IGraphicResponse> =>
      ipcRenderer.invoke("graphics:getGraphics", filters),
  },
};

contextBridge.exposeInMainWorld("electron", electronHandler);

export type ElectronHandler = typeof electronHandler;
