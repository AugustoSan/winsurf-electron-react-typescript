// src/main/services/initializer.ts
import { QueryResult } from "pg";
import { pgClient } from "../database/connection"; // Función que retorna un cliente de PostgreSQL
import { IQueryDB } from "../interfaces";

// Importa todas las queries definidas
import {
  tblClientes,
  tblDirecciones,
  tblProductos,
  tblVentas,
  tblVentaProductos,
  tblPagos,
  tblTiempoPago,
  type_address,
  type_datos_clientes,
  type_datos_direcciones,
  type_datos_productos,
  type_ventas,
  type_venta_productos,
  type_product_venta,
  type_pago,
  fn_getAddressById,
  fn_getAllAddressByClient,
  fn_getAllClients,
  fn_getMatchClients,
  fn_getClientById,
  fn_insertClient,
  fn_updateClient,
  fn_deleteClient,
  fn_getAllAddress,
  fn_insertAddress,
  fn_updateAddress,
  fn_deleteAddress,
  fn_getAllProducts,
  fn_getMatchProducts,
  fn_getProductById,
  fn_insertProduct,
  fn_updateProduct,
  fn_deleteProduct,
  fn_getAllVentas,
  fn_getVentaById,
  fn_getAllVentasByClient,
  fn_getAllProductsByVenta,
  fn_insertVenta,
  fn_getPagoById,
  fn_GetAllPagos,
  fn_getPagosByVenta,
  fn_getPagosByCliente,
  fn_getDeudaByCliente,
  fn_InsertPagos,
  fn_DeletePagoById,
  fn_GetAllRegistryTiempoPago,
  fn_getRegistryTiempoPagoById,
  fn_insertRegTiempoPago,
  fn_updateRegTiempoPago,
  fn_deleteRegTiempoPago,
} from "../database/queries";

/**
 * Arreglos que agrupan las queries por categoría.
 * Puedes modificar estos arreglos según la organización que necesites.
 */
const tableQueries: IQueryDB[] = [
  tblClientes,
  tblDirecciones,
  tblProductos,
  tblVentas,
  tblVentaProductos,
  tblPagos,
  tblTiempoPago,
];

const typeQueries: IQueryDB[] = [
  type_address,
  type_datos_clientes,
  type_datos_direcciones,
  type_datos_productos,
  type_ventas,
  type_venta_productos,
  type_product_venta,
  type_pago,
];

const functionQueries: IQueryDB[] = [
  fn_getAddressById,
  fn_getAllAddressByClient,
  fn_getAllClients,
  fn_getMatchClients,
  fn_getClientById,
  fn_insertClient,
  fn_updateClient,
  fn_deleteClient,
  fn_getAllAddress,
  fn_insertAddress,
  fn_updateAddress,
  fn_deleteAddress,
  fn_getAllProducts,
  fn_getMatchProducts,
  fn_getProductById,
  fn_insertProduct,
  fn_updateProduct,
  fn_deleteProduct,
  fn_getAllVentas,
  fn_getVentaById,
  fn_getAllVentasByClient,
  fn_getAllProductsByVenta,
  fn_insertVenta,
  fn_getPagoById,
  fn_GetAllPagos,
  fn_getPagosByVenta,
  fn_getPagosByCliente,
  fn_getDeudaByCliente,
  fn_InsertPagos,
  fn_DeletePagoById,
  fn_GetAllRegistryTiempoPago,
  fn_getRegistryTiempoPagoById,
  fn_insertRegTiempoPago,
  fn_updateRegTiempoPago,
  fn_deleteRegTiempoPago,
];

/**
 * Función genérica para ejecutar una query y capturar errores.
 */
const executeQuery = async (queryObj: IQueryDB): Promise<string | null> => {
  try {
    if ((pgClient as any)._ending) {
      await pgClient.connect();
    }
    await pgClient.query(queryObj.query);
    return null;
  } catch (error: any) {
    console.error(`Error ejecutando ${queryObj.name}:`, error);
    return `Error en ${queryObj.name}: ${
      error.message || JSON.stringify(error)
    }`;
  }
};

/**
 * Inicializa las tablas en la base de datos.
 */
export const initializerTables = async (): Promise<string[]> => {
  const errors: string[] = [];
  for (const queryObj of tableQueries) {
    const err = await executeQuery(queryObj);
    if (err) errors.push(err);
  }
  return errors;
};

/**
 * Inicializa los tipos en la base de datos.
 */
export const initializerTypes = async (): Promise<string[]> => {
  const errors: string[] = [];
  for (const queryObj of typeQueries) {
    const err = await executeQuery(queryObj);
    if (err) errors.push(err);
  }
  return errors;
};

/**
 * Inicializa las funciones en la base de datos.
 */
export const initializerFunctions = async (): Promise<string[]> => {
  const errors: string[] = [];
  for (const queryObj of functionQueries) {
    const err = await executeQuery(queryObj);
    if (err) errors.push(err);
  }
  return errors;
};

/**
 * Función inicializadora general.
 * Valida si la base de datos existe y, en caso negativo, la crea.
 * Luego, ejecuta los inicializadores de tablas, tipos y funciones.
 */
export const initializer = async (): Promise<string[]> => {
  console.log("Entrando en initializer");
  try {
    const validateDB = await checkDatabaseIfExist();
    let errors: string[] = [];
    if (!validateDB) errors = await createDatabaseIfNotExist();

    if (errors.length > 0) return errors;

    const errorsTables = await initializerTables();
    errors.push(...errorsTables);

    const errorsTypes = await initializerTypes();
    errors.push(...errorsTypes);

    const errorsFunctions = await initializerFunctions();
    errors.push(...errorsFunctions);

    return errors;
  } catch (error: any) {
    console.error("Error en initializer:", error);
    return [
      "Ocurrió un error en el initializer",
      error.message || JSON.stringify(error),
    ];
  }
};

/**
 * Función que verifica si la base de datos existe.
 */
const checkDatabaseIfExist = async (): Promise<boolean> => {
  try {
    if ((pgClient as any)._ending) {
      await pgClient.connect();
    }
    const dbName = process.env.DATABASE_DATABASE ?? "gestion-ventas";
    const query = `SELECT EXISTS(SELECT 1 FROM pg_database WHERE datname = '${dbName}') AS exists`;
    const res: QueryResult<{ exists: boolean }> = await pgClient.query(query);
    return res.rows[0].exists;
  } catch (error: any) {
    throw new Error(error.message || JSON.stringify(error));
  }
};

/**
 * Función para crear la base de datos si no existe.
 */
const createDatabaseIfNotExist = async (): Promise<string[]> => {
  let errors: string[] = [];
  try {
    if ((pgClient as any)._ending) {
      await pgClient.connect();
    }
    const dbName = process.env.DATABASE_DATABASE ?? "gestion-ventas";
    const query = `CREATE DATABASE "${dbName}"`;
    await pgClient.query(query);
  } catch (err: any) {
    console.error("Error creating database:", err);
    errors.push(
      `Error creating database: ${err.message || JSON.stringify(err)}`
    );
  }
  return errors;
};
