import React from 'react';
import {PayPalButtons} from "@paypal/react-paypal-js";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";

const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK;

interface PaypalButtonInterface {
    totalValue : string;
    invoice : string;
    selectBook: number[];
}
const PaypalButton: React.FC<PaypalButtonInterface> = (props) => {

  const {user} = useAuthContext();

  return (
      <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create ({
            purchase_units: [
                {
                    description: props.invoice,
                    amount: {
                        value: props.totalValue
                    },
                },
            ],
        });
      }}

      onApprove={ async(data, actions) => {
        const order = await actions.order?.capture()
        console.log("order", order)
        
       const orderResponse = await axios.post(`${bookscapeback}/pays/set`, 
        {
          orden: order,
          factura: props.invoice,
          id: user?.id,
          selectBook: props.selectBook,
        })
       console.log("orderResponse", orderResponse)
       console.log("esto es .data.UserId: ", orderResponse.data.UserId)
       console.log("esto es .data.message: ", orderResponse.data.message)
      }

      }
      
      />
    
  )
}

export default PaypalButton
