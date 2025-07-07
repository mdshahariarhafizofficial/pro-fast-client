import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../Loading/Loading';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState();
    const {parcelId} = useParams();
    console.log(parcelId);
    
    const axiosSecure = useAxiosSecure();

    const { isPending, data: parcel = {},} = useQuery({
        queryKey: ['parcel', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data;
        }
    })
    if (isPending) {
        return <Loading></Loading>
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            setError(error.message)
        }
        else{
            setError('')
            console.log('payment method:', paymentMethod);
        }

    };
    const amount = parcel?.costDetails.totalCost;
    console.log(parcel);
    

    return (
    <div className="w-lg max-w-6xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
        💳 Payment Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#fa755a",
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className="btn btn-primary font-bold text-black w-full"
        >
            💳 Pay ${amount}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
      </form>
    </div>
    );
};

export default CheckoutForm;