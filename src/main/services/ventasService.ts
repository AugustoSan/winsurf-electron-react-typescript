import { pgClient } from "../database/connection";
import { fn_getDeudaByCliente } from "../database/queries";

export const getDeudaByClient = async (id_client: number): Promise<number> => {
  try {
    if ((pgClient as any)._ending) {
      await pgClient.connect();
    }
    const query = `SELECT * FROM ${fn_getDeudaByCliente.name}(${id_client}) AS deuda`;
    const temp = await pgClient.query(query);
    console.log(query);
    const result: Array<number> = temp.rows;
    console.log(result);
    const deuda: number = result.length > 0 ? temp.rows[0].deuda : -1;
    console.log(`deuda: ${deuda}`);
    return deuda;
  } catch (error) {
    console.log("ERROR:", error);
    return -1;
  }
};
