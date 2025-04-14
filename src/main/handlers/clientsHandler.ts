// clientsHandler.ts
import { PagedList } from "../utils/Pagination";
import {
  IClient,
  IDataPagination,
  IDataAddClient,
  IDataUpdateClient,
} from "../interfaces";
import {
  getAllClientsService,
  findClientService,
  getClientByIdService,
  addClientService,
  updateClientService,
  deleteClientService,
} from "../services/clientsService";

export const findAllClientsWithPaginationHandler = async (
  event: Electron.IpcMainInvokeEvent,
  pagination: IDataPagination
): Promise<PagedList<IClient>> => {
  try {
    const clients = await getAllClientsService();
    const pagedList: PagedList<IClient> = PagedList.create(
      clients,
      pagination.page,
      pagination.sizePage
    );
    return pagedList;
  } catch (error) {
    throw error;
  }
};
export const findAllClientsHandler = async (
  event: Electron.IpcMainInvokeEvent,
  data: IDataPagination
): Promise<Array<IClient>> => {
  return await getAllClientsService();
};

export const findClienteHandler = async (
  event: Electron.IpcMainInvokeEvent,
  texto: string,
  pagination: IDataPagination
): Promise<PagedList<IClient>> => {
  return await findClientService(texto, pagination);
};

export const findClienteByIdHandler = async (
  event: Electron.IpcMainInvokeEvent,
  id: number
): Promise<IClient | null> => {
  return await getClientByIdService(id);
};

export const addClienteHandler = async (
  event: Electron.IpcMainInvokeEvent,
  data: IDataAddClient
): Promise<number> => {
  return await addClientService(data);
};

export const updateClienteHandler = async (
  event: Electron.IpcMainInvokeEvent,
  data: IDataUpdateClient
): Promise<number> => {
  return await updateClientService(data);
};

export const deleteClienteHandler = async (
  event: Electron.IpcMainInvokeEvent,
  data: number
): Promise<number> => {
  return await deleteClientService(data);
};
