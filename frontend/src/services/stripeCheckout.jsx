import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const useStripePayment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (clientSecret, billingDetails) => {
    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: billingDetails,
        },
      }
    );

    return { error, paymentIntent };
  };

  return { stripePromise, handlePayment };
};
