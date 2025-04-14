import { pgClient } from "../database/connection";
import { IDirection } from "../interfaces/IClients";
import { fn_getAllAddressByClient } from "../database/queries";

export const findAddressByIDClient = async (
  id: number
): Promise<Array<IDirection>> => {
  try {
    if ((pgClient as any)._ending) {
      await pgClient.connect();
    }
    const temp = await pgClient.query(
      `SELECT * FROM ${fn_getAllAddressByClient.name}(${id})`
    );
    const result: Array<IDirection> = temp.rows;
    return result;
  } catch (error) {
    return [];
  }
};
