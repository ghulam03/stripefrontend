import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

function App() {
  const [product, setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "facebook"
  });

  const makePayment = token => {
    const body = {
      token,
      product
    };
    const headers = {
      "Content-Type": "application/json"
    };

    return fetch(`http://localhost:8282/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log("RESPONSE ", response);
        const { status } = response;
        console.log("STATUS ", status);
      })
      .catch(error => console.log(error));
  };

  return (
    <div >
        <StripeCheckout
          stripeKey={process.env.REACT_APP_KEY}
          token={makePayment}
          name="Buy React"
          amount={product.price * 100}
          shippingAddress
          billingAddress
        >
          <button >
            Buy react is just {product.price} $
          </button>
        </StripeCheckout>
      
    </div>
  );
}

export default App;
