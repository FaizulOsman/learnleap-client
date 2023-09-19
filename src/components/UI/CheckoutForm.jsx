import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useUpdateUserMutation,
} from "@/redux/user/userApi";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckoutForm = () => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");

  let price = 12;
  let email = "test@example.com";
  let userName = "userName";
  let _id = "_id";
  let productId = "productId";

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const headers = {
    authorization: accessToken,
  };

  const { data: getMyProfile } = useGetMyProfileQuery({ headers });
  const [
    updateUser,
    {
      isSuccess: isUpdateUserSuccess,
      isError: isUpdateUserError,
      error: updateUserError,
    },
  ] = useUpdateUserMutation();
  const [
    updateMyProfile,
    {
      isSuccess: updateProfileIsSuccess,
      isError: updateProfileIsError,
      error: updateProfileError,
    },
  ] = useUpdateMyProfileMutation();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      "https://b612-used-products-resale-server-side-faizul-osman.vercel.app/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ price }),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  // Handle Submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userName,
            email: email,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      console.log("Card Info: ", card);

      // store payment info in database
      const payment = {
        price,
        transactionId: paymentIntent.id,
        email,
        phone: getMyProfile?.data?.phone,
      };
      fetch(
        `https://b612-used-products-resale-server-side-faizul-osman.vercel.app/payments`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(payment),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            const data = { isPremium: true };
            updateMyProfile({ data, headers });
            setSuccess("Congrats! Your payment completed.");
            toast.success(`Congrats! Your payment completed.`);
            setTransactionId(paymentIntent.id);
            router.push("/");
          }
        });
    }
  };
  console.log(getMyProfile?.data?.id);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          className="border p-2 rounded-md w-full"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-sm mt-4 btn-primary text-white"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>

      {success && (
        <>
          <p className="text-green-500">{success}</p>
          <p>
            Your transactionId:{" "}
            <span className="font-bold">{transactionId}</span>
          </p>
        </>
      )}
    </>
  );
};

export default CheckoutForm;
