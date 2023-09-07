import Main from "@/Layout/Main";
import config from '@/components/2Checkout/2CKconfig';
import Payment from "@/components/Project/Payment";
import axios from "axios";
import { useState } from "react";

const index = () => {

    const [paymentInfo, setPaymentInfo] = useState({
        name: '',
        email: '',
        amount: '',
        // Add other necessary fields
      });
    
      const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(
            'https://api.2checkout.com/rest/6.0/checkout/authorizations',
            {
              sellerId: config.sellerId,
              privateKey: config.secretKey,
              // Include other payment data from the form
            }
          );
    
          // Handle the response from 2Checkout
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
  return (
    <Main title={"Payment"}>
      <Payment />
    </Main>
  );
};

export default index;
