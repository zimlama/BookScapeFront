import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";

const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK;

interface PaypalButtonInterface {
  totalValue: string;
  invoice: string;
  selectBook: number[];
}


const PaypalButton: React.FC<PaypalButtonInterface> = (props) => {
  const { user } = useAuthContext();

  const handleSuccessfulPayment = async (orderId: any) => {
    // Almacenar la información de la orden en Local Storage
    const orderData = {
      orderId,
      totalValue: props.totalValue,
      invoice: props.invoice,
      userId: user?.id,
      selectBook: props.selectBook,
    };
  };

  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: props.invoice,
              amount: {
                value: props.totalValue,
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order?.capture();
        console.log("order", order);

        const orderResponse = await axios.post(`${bookscapeback}/pays/set`, {
          orden: order,
          factura: props.invoice,
          id: user?.id,
        });

        // Obtener el ID del usuario actual (esto puede variar según tu lógica de autenticación)
        const userId = user?.id;

        if (
          orderResponse.data.message === "Pay registered successfully" &&
          userId
        ) {
          const bookPays = orderResponse.data.selectBook;

          // Obtener los datos actuales del usuario desde el almacenamiento local
          const currentUserDataString = localStorage.getItem(
            `bookPays_${userId}`
          );
          const currentUserData = currentUserDataString
            ? JSON.parse(currentUserDataString)
            : [];

          // Agregar los nuevos valores al array actual del usuario
          currentUserData.push(...bookPays);

          // Guardar el array actualizado en el almacenamiento local usando la clave específica del usuario
          localStorage.setItem(
            `bookPays_${userId}`,
            JSON.stringify(currentUserData)
          );
        } else {
          alert("El pago no fue exitoso");
        }

        console.log("orderResponse", orderResponse);
        // Almacenar el ID de la orden en Local Storage

        handleSuccessfulPayment(order?.id);
      }}
    />
  );
};

export default PaypalButton;
