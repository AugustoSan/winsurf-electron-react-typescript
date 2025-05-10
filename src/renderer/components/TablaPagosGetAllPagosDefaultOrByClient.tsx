/* import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useGetAllPagos } from '../hooks';
import { TablaPagos } from './TablaPagos';
import { IClient } from '../../main/interfaces';
import { useCustomSelector } from '../hooks/redux';
import { TablaPagosGetAllPagos } from './TablaPagosGetAllPagos';
import { TablaPagosByCliente } from './TablaPagosByCliente';

export const TablaPagosGetAllPagosDefaultOrByClient = ():JSX.Element => {
  const {selectClient} = useCustomSelector((state) => state.clientSlice);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const {
    result,
    isLoading,
    isSuccess,
    error,
    status
  } = useGetAllPagos(isEnabled);

  useEffect(() => {
    if(result !== null || isSuccess)
    {
      setIsEnabled(false);
    }
  }, [isSuccess, result]);



  return selectClient === null
  ? <TablaPagosGetAllPagos />
  : <TablaPagosByCliente client={selectClient.id} setClient={setClientID}/>
}
 */
