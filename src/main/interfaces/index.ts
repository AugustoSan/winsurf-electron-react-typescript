export type { IFiltersGraphics, IGraphicResponse } from "./IGraphics";

export type {
  IClient,
  IDataAddClient,
  IDataAddAddress,
  IDataUpdateAddress,
  IDataUpdateClient,
  IDirection,
  IDataRequestSearchWithString,
  IDataRequestSearchWithStringAndPagination,
} from "./IClients";

export type {
  IPagination,
  IPaginationForSlides,
  IDataRequestFindById,
  IDataPagination,
} from "./Pagination";

export type { IPago, IAddPago } from "./IPagos";

export type {
  IDataUpdateProduct,
  IDataFindPricesProduct,
  IPriceProduct,
  IProducto,
  IPrecioProductoCliente,
  IProductoGraphics,
} from "./IProducts";

export type {
  IDataAddVentaProductos,
  IDataAddVenta,
  IVentasProductos,
  ITypeVenta,
  IVenta,
} from "./IVentas";

export interface IItemMenu {
  title: string;
  href: string;
  icon: JSX.Element;
}

export interface IDataRequestDelete {
  isValid: boolean;
  id: number;
}

export interface IDataRequestWithPagination {
  page: number;
  sizePage: number;
  isValid: boolean;
}

export interface IQueryDB {
  name: string;
  type: "table" | "function" | "type";
  query: string;
}

// export interface ISetting {
//   title: string;
//   value: string;
// }

export interface IConfig {
  host: string;
  port: string;
  database: string;
  user: string;
}
