// src/main/services/clientsService.ts
import { pgClient } from "../database/connection";
import { IClient } from "../interfaces";
import { IDataAddClient, IDataUpdateClient } from "../interfaces/IClients";
import { IDataPagination } from "../interfaces";
import { PagedList } from "../utils/Pagination";
import {
  fn_getAllClients,
  fn_getMatchClients,
  fn_getClientById,
  fn_insertClient,
  fn_updateClient,
  fn_deleteClient,
} from "../database/queries";
import { findAddressByIDClient } from "./addressService"; // Servicio para obtener direcciones
import { getDeudaByClient } from "./ventasService";

/**
 * Obtiene todos los clientes, agregando a cada uno sus direcciones y saldo.
 */
export async function getAllClientsService(): Promise<Array<IClient>> {
  try {
    // Verificamos si el cliente ya está conectado.
    // Nota: Client de 'pg' no expone directamente una propiedad "connected",
    // por lo que en una implementación real podrías querer usar un Pool.
    if ((pgClient as any)._ending) {
      await pgClient.connect();
    }
    const res = await pgClient.query(
      `SELECT * FROM ${fn_getAllClients.name}()`
    );
    const result: Array<IClient> = res.rows;
    const allClients: Array<IClient> = await Promise.all(
      result.map(async (cliente) => {
        // Agrega las direcciones para el cliente
        cliente.direcciones = await findAddressByIDClient(cliente.id);
        // Agrega el saldo (deuda) del cliente
        cliente.saldo = await getDeudaByClient(cliente.id);
        return cliente;
      })
    );
    return allClients;
  } catch (error) {
    console.error("Error en getAllClientsService:", error);
    return [];
  }
}

/**
 * Busca clientes que coincidan con el texto proporcionado y pagína el resultado.
 */
export async function findClientService(
  texto: string,
  data: IDataPagination
): Promise<PagedList<IClient>> {
  try {
    if ((pgClient as any)._ending) {
      await pgClient.connect();
    }
    const query = `SELECT * FROM ${fn_getMatchClients.name}('${texto}');`;
    const res = await pgClient.query(query);
    const result: Array<IClient> = res.rows;
    const clients: Array<IClient> = await Promise.all(
      result.map(async (cliente) => {
        cliente.direcciones = await findAddressByIDClient(cliente.id);
        return cliente;
      })
    );
    const pagedList: PagedList<IClient> = PagedList.create(
      clients,
      data.page,
      data.sizePage
    );
    return pagedList;
  } catch (error) {
    console.error("Error en findClientService:", error);
    return PagedList.create([], data.page, data.sizePage);
  }
}

/**
 * Obtiene un cliente por su ID, incluyendo direcciones y saldo.
 */
export async function getClientByIdService(
  id: number
): Promise<IClient | null> {
  try {
    if ((pgClient as any)._ending) {
      await pgClient.connect();
    }
    const query = `SELECT * FROM ${fn_getClientById.name}(${id});`;
    const res = await pgClient.query(query);
    const result: Array<IClient> = res.rows;
    const clients: Array<IClient> = await Promise.all(
      result.map(async (cliente) => {
        cliente.direcciones = await findAddressByIDClient(cliente.id);
        cliente.saldo = await getDeudaByClient(cliente.id);
        return cliente;
      })
    );
    return clients[0] ?? null;
  } catch (error) {
    console.error("Error en getClientByIdService:", error);
    return null;
  }
}

/**
 * Inserta un nuevo cliente y sus direcciones asociadas.
 */
export async function addClientService(
  cliente: IDataAddClient
): Promise<number> {
  try {
    if ((pgClient as any)._ending) {
      await pgClient.connect();
    }
    const { nombre, apellidopaterno, apellidomaterno, telefono, direccioness } =
      cliente;
    // Construye el arreglo de direcciones para la query SQL
    const addressesArray =
      direccioness.length > 0
        ? `ARRAY[${direccioness.map((dir) => `'${dir}'`).join(",")}]`
        : "ARRAY[]::text[]";
    const query = `SELECT ${fn_insertClient.name}('${nombre}', '${apellidopaterno}', '${apellidomaterno}', '${telefono}', ${addressesArray}) AS id`;
    console.log(`Query addClientService: ${query}`);
    const res = await pgClient.query(query);
    const result: Array<number> = res.rows;
    return result.length > 0 ? res.rows[0].id : -1;
  } catch (error) {
    console.error("Error en addClientService:", error);
    return -1;
  }
}

/**
 * Actualiza la información de un cliente.
 */
export async function updateClientService(
  cliente: IDataUpdateClient
): Promise<number> {
  try {
    if ((pgClient as any)._ending) {
      await pgClient.connect();
    }
    const { id, client: clientData } = cliente;
    const { nombre, apellidopaterno, apellidomaterno, telefono } = clientData;
    const query = `SELECT ${fn_updateClient.name}(${id}, '${nombre}', '${apellidopaterno}', '${apellidomaterno}', '${telefono}') AS id`;
    console.log(`Query updateClientService: ${query}`);
    const res = await pgClient.query(query);
    const result: Array<number> = res.rows;
    return result.length > 0 ? res.rows[0].id : -1;
  } catch (error) {
    console.error("Error en updateClientService:", error);
    return -1;
  }
}

/**
 * Elimina un cliente por su ID.
 */
export async function deleteClientService(id: number): Promise<number> {
  try {
    if ((pgClient as any)._ending) {
      await pgClient.connect();
    }
    const query = `SELECT ${fn_deleteClient.name}(${id}) AS id`;
    console.log(`Query deleteClientService: ${query}`);
    const res = await pgClient.query(query);
    const result: Array<number> = res.rows;
    return result.length > 0 ? res.rows[0].id : -1;
  } catch (error) {
    console.error("Error en deleteClientService:", error);
    return -1;
  }
}
