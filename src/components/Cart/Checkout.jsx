import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";            // Assuming you have a PaypalButton component

const cart = {
  products: [
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Black",
      price: 120,
      image:  "https://picsum.photos/150?random=1",
    },
    {
      name: "Casual Sneakers",
      size: "42",
      color: "White",
      price: 75,
      image: "https://picsum.photos/150?random=2",
    },
  ],
  totalPrice: 195,
};

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleCreateCheckout = (e) => {             // On crée ici une fonction handleCreateCheckout qui sera appelée lors de la soumission du formulaire de paiement. Cette fonction est responsable de la création d'un identifiant de paiement (checkoutId) et de la gestion des détails de livraison.
    e.preventDefault();
    setCheckoutId(123); // Simulate checkout ID creation
  };

  const handlePaymentSuccess = (details) => {         // On crée une fonction handlePaymentSuccess qui sera appelée lorsque le paiement est réussi. Cette fonction peut être utilisée pour gérer les détails du paiement et rediriger l'utilisateur vers une page de confirmation.
  console.log("Payment Successful !", details);
  navigate("/order-confirmation")
}

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 
    tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
         <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value="user@example.com"
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
           <div className="mt-6">
            {!checkoutId ? (
                <button 
                  type="submit" 
                  className="w-full bg-black text-white py-3 rounded"
                >
                Continue to Payment
                </button>
            ) : (
                <div>
                    <h3 className="text-lg mb-4">Pay with Paypal</h3>
                    <PayPalButton 
                     amount={100}                                    // Ceci est le montant total du panier. Nous avons mis 100 pour l'exemple, mais vous devriez le remplacer par le montant total de votre panier. Ce montant est transmis à l'API de PayPal pour créer une commande.
                     onSuccess={handlePaymentSuccess} 
                     onError={(err) => alert("Payment failed. Please try again.")} 
                     />
                </div>
            )}
            </div>
        </form>
      </div>
      {/* Right Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => (
            <div 
              key={index} 
              className="flex items-start justify-between py-2 border-b"
              >
              <div className="flex items-start">
                <img 
                src={product.image} 
                alt={product.name} 
                className="w-20 h-24 object-cover mr-4" 
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className=" text-gray-500"> Size: {product.size}</p>
                  <p className="text-gray-500"> Color: {product.color}</p>                  
            </div>
              </div>
             <p className="text-xl">${product.price?.toLocaleString()}</p>
            </div>
          ))}
      </div>
      <div className="flex justify-between items-center text-lg mb-4">
        <p>Subtotal</p>
        <p> ${cart.totalPrice?.toLocaleString()}</p>
      </div>
      <div className="flex justify-between items-center text-lg">
        <p>Shipping</p>
        <p>Free</p>
      </div>
      <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
        <p>Total</p>
        <p>${cart.totalPrice?.toLocaleString()}</p>
      </div>
    </div>
    </div>
  );
};

export default Checkout;
