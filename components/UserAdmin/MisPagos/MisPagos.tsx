import React, { FC, Fragment, useEffect, useState } from "react";
import money from "../../../public/images/🦆 icon _Dollar Sign icon_.png";
import axios from "axios";
import styles from "../styles.module.css";
import { useAuthContext } from "@/context/AuthContext";

const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK;

type Pago = {
  id_pay: string;
  order_date: string;
  total_order: string;
  payment_status: string;
  date_approved: string;
  createdAt: string;
  updatedAt: string;
  UserId: string;
};

const TabPagos: FC<{}> = () => {
  const { user } = useAuthContext();
  const [pagos, setPagos] = useState<Pago[]>([]);

  useEffect(() => {
    // Realiza la solicitud GET a la API para obtener la información de los pagos
    const fetchPagos = async () => {
      try {
        const response = await axios.get(`${bookscapeback}/pays/${user?.id}`);
        setPagos(response.data);
      } catch (error) {
        console.error("Error al obtener la información de los pagos:", error);
      }
    };
    fetchPagos();
  }, []);

  return (
    <Fragment>
      <div className={styles.contenedor}>
        <div className={styles.titulo}>
          <h2>
            <img src={money.src} alt="Logo" />
            Mis Pagos
          </h2>
        </div>
        <div className={styles.resultados}>
          <div className={styles.titulo}></div>
          <table className={styles.tabla}>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" name="" id="" />
                  Seleccione
                </th>
                <th>Pedido</th>
                <th>Valor</th>
                <th>Fecha</th>
                <th>Estado transacción</th>
              </tr>
            </thead>
            <tbody>
              {pagos.length === 0
                ? "No hay Pagos disponibles"
                : pagos.map((pago, index) => (
                    <tr key={index}>
                      <td>
                        <input type="checkbox" name="" id="" />
                      </td>
                      <td>{pago.id_pay}</td>
                      <td>{pago.total_order}</td>
                      <td>{new Date(pago.createdAt).toLocaleString()}</td>
                      <td>{pago.payment_status}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};
export default TabPagos;
