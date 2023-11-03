import { useEffect } from 'react';

const CheckoutPage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.2checkout.com/checkout/purchase';
    script.async = true;
    script.onload = () => {
      TCO.loadPubKey('sandbox'); // Use 'sandbox' for testing, 'production' for live payments

      TCO.requestToken({
        data: {
          demo: 'Y', // 'Y' for testing, 'N' for live
          sid: process.env.TWOCHECKOUT_SELLER_ID,
          return_url: 'https://yourwebsite.com/success',
        },
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <form>
        {/* <!-- Your checkout form goes here --> */}
      </form>
    </div>
  );
};

export default CheckoutPage;
