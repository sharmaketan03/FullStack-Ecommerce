import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { instance } from "../axios";

const stripePromise = loadStripe("pk_test_51S5LGyFYioXiBE2AKNUcoaK9ZjEqjsQEZi3rOYkXXFeJLMMD7s2vdKUB2FM8VOAhnZhsLxfd6P8w4IxQR1IJ9ZsT00UuU3VKu4");

function OrderFormWrapper({ product, onClose }) {
    return (
        <Elements stripe={stripePromise}>
            <OrderForm product={product} onClose={onClose} />
        </Elements>
    );
}

function OrderForm({ product, onClose }) {
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState("standard");
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(0);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        setAmount(product.Discountedprice || 0);
    }, [product]);

    function getPayement(e) {
        setPaymentMethod(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!phone.trim() || !address.trim()) {
            alert("Please fill in all required fields.");
            return;
        }

        if (paymentMethod === "card") {
            if (!stripe || !elements) {
                alert("Stripe is not loaded.");
                return;
            }

            setLoading(true);
            try {
                let res = await instance.post("/app/detail/create-payment-intent", {
                    amount: amount 
                });

                const { clientSecret } = res.data;

                const cardElement = elements.getElement(CardElement);

                const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: "Customer",
                            phone: phone
                        }
                    }
                });

                if (result.error) {
                    alert(result.error.message);
                } else {
                    if (result.paymentIntent.status === "succeeded") {
                        alert("Payment successful!");
                        setSubmitted(true);
                    }
                }
            } catch (err) {
                console.error("Payment error:", err);
                alert("Payment failed.");
            } finally {
                setLoading(false);
            }
        } else {
            console.log({
                phone,
                address,
                deliveryMethod,
                paymentMethod,
                product,
            });
            setSubmitted(true);
        }
    };
    

    if (submitted) {
        return (
            <div className="max-w-sm mx-auto p-4 bg-white rounded shadow mt-8 text-center">
                <h2 className="text-xl font-bold mb-4">Thank you!</h2>
                <p>We will deliver your product soon.</p>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Close
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-sm mx-auto p-4 bg-white rounded shadow mt-5 overflow-auto">
            <h2 className="text-lg font-semibold mb-3">Order Details</h2>

            <div className="mb-4 border p-3 rounded bg-gray-50">
                <h3 className="font-semibold mb-1">{product.name || "Product Name"}</h3>
                <img
                    src={product.PrimaryImage || "/placeholder-image.png"}
                    alt={product.name}
                    className="w-24 h-8 object-contain mb-1"
                />
                <p className="text-gray-700 text-sm">
                    Price: ₹{product.Discountedprice || product.Originalprice || "N/A"}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1 text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1 text-gray-700">
                        Delivery Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="address"
                        required
                        placeholder="Enter your delivery address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Delivery Method</label>
                    <select
                        value={deliveryMethod}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option value="standard">Standard Delivery - Free</option>
                        <option value="express">Express Delivery - ₹100</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Payment Method</label>
                    <select
                        value={paymentMethod}
                        onChange={getPayement}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option value="cod">Cash On Delivery</option>
                        <option value="card">Credit/Debit Card</option>
                    </select>
                </div>

                {paymentMethod === "card" && (
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Card Details</label>
                        <div className="p-2 border border-gray-300 rounded bg-gray-50">
                            <CardElement options={{
                                style: {
                                    base: {
                                        fontSize: '14px',
                                        color: '#32325d',
                                        '::placeholder': {
                                            color: '#a0aec0',
                                        },
                                    },
                                },
                            }} />
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition text-sm"
                    >
                        {paymentMethod === "card"
                            ? `Pay ₹${product.Discountedprice}`
                            : 'Place Order'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition text-sm"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default OrderFormWrapper;
