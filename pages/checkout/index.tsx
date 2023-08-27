import React, { useState } from "react";
import Link from "next/link";

const CheckoutPage: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleItemSelection = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleConfirmOrder = () => {
    // implementar la lógica para confirmar el pedido
    setConfirmed(true);
  };

  if (confirmed) {
    // Renderizar la página de confirmación
    return (
      <div>
        <h1>Confirmación del Pedido</h1>
        {/* Mostrar detalles del pedido y total */}
      </div>
    );
  }

  return (
    <div>
      <h1>Finalizar Compra</h1>
      <section>
        <h2>Dirección de correo para envío del libro digital</h2>
        {/* Ingresar dirección de correo */}
      </section>
      <section>
        <h2>Seleccionar método de pago</h2>
        {/* Mostrar opciones de método de pago */}
      </section>
      <section>
        <h2>Revisar artículos</h2>
        {/* Mostrar lista de artículos seleccionados */}
      </section>
      <button onClick={handleConfirmOrder}>Confirmar Pedido</button>
      <Link href="/carritoDeCompra">Cancelar</Link>
    </div>
  );
};

export default CheckoutPage;
