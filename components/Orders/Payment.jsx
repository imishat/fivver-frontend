
const Payment = () => {
    return (
        <div className="md:w-[70%] mx-auto">
            <div>
                <div className="my-12">
                    <h2 className="text-2xl text-center font-semibold">Add your card details carefully</h2>
                </div>
               <div className="border mb-12">
                {/* Header */}
               <div className="px-4 py-4 bg-[#C6DFF5]">
                    <div className="sm:flex justify-between items-center">
                        <div className="flex items-center gap-4">
                        <div className="w-24 h-16 bg-rose-200">
                            <img src="" alt="" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Door Hanger Design</h3>
                        </div>
                        </div>
                        <div className="text-center">
                            <p>Quantity - 1 </p>
                        </div>
                    </div>
                    <div className="sm:flex space-y-3 my-2 text-center justify-between items-center">
                        <p>Double Sided Design</p>
                        <div className="flex justify-center items-center gap-2">
                            <input type="checkbox" className="toggle toggle-info border border-info toggle-sm w-9" id="" />
                            Extra fast 1 day delivery <span className="text-blue-500 font-bold">$10</span>
                        </div>
                            <h2 className="text-4xl font-bold px-4">$40</h2>
                    </div>
                </div>
                {/* Body */}
                <div className="p-6 bg-blue-50">
                    <div>
                        <div className="flex items-center gap-2">
                        <h3 className="text-xl my-2 font-bold">Card Payment</h3>
                            <div>
                                <img className="w-24" src="https://www.kindpng.com/picc/m/399-3995736_credit-card-payment-options-visa-mastercard-discover-logos.png" alt="" />
                            </div>
                        </div>
                        <p>Your credit card information is secure, and your card is not charged until after you've confirmed your order. Adding a new card?</p>
                    </div>
                    {/* Inputs */}
                    <div>
                        {/* card details */}
                        <div className="flex flex-col w-full my-6">
                            <label htmlFor="details">Card Details</label>
                            <select className="px-4 py-2 bg-white border border-gray-300" id="details">
                                <option value="add-new-card">Add new card</option>
                            </select>
                        </div>
                        {/* name on card */}
                        <div className="flex flex-col w-full my-6">
                            <label htmlFor="card-name">Card Details</label>
                            <input placeholder="Card Details" className="px-4 py-2 border border-gray-300" type="text" id="card-name" />
                        </div>
                        {/* card number */}
                        <div className="flex flex-col w-full my-6">
                            <label htmlFor="card-number">Card Number</label>
                            <input placeholder="Card Number" className="px-4 py-2 border border-gray-300" type="text" id="card-number" />
                        </div>
                        {/* Expire */}
                        <div className="md:flex items-center overflow-hidden justify-between gap-4">
                        <div className="flex flex-col lg:w-[60%] my-6">
                            <label htmlFor="expire-date">Expiry Date</label>
                            <input placeholder="MM/YY" className="px-4 py-2 border border-gray-300" type="text" id="expire-date" />
                        </div>
                        <div className="flex flex-col my-6">
                            <label htmlFor="cvv">CVV</label>
                            <input placeholder="CVV" className="px-4 py-2 border border-gray-300" type="text" id="cvv" />
                        </div>
                        </div>
                        {/* save */}
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="save" className="checkbox checkbox-info rounded-none checkbox-sm" />
                            <label htmlFor="save">Save this card information</label>
                        </div>
                        {/* Order info */}
                        <div className="sm:flex justify-between bg-white my-4 gap-12 p-4 border">
                            <div className="sm:w-1/2 space-y-3">
                                <ul className="flex justify-between items-center">
                                    <li>Door hanger design</li>
                                    <li className="font-bold">$40</li>
                                </ul>
                                <ul className="flex justify-between items-center">
                                    <li>Extra fast delivery</li>
                                    <li className="font-bold">$00</li>
                                </ul>
                                <ul className="flex border-b pb-3 border-gray-300 justify-between items-center">
                                    <li>Fee</li>
                                    <li className="font-bold">$00</li>
                                </ul>
                                <ul className="flex justify-between items-center">
                                    <li>Total</li>
                                    <li className="font-bold">$40</li>
                                </ul>
                            </div>
                            <div className="sm:w-1/2 flex items-center justify-center">
                                <div className="w-full text-center">
                                <p className="py-4">Single Payment</p>
                                <button className="px-4 py-4 bg-[#2692DD] w-full text-white text-2xl rounded-lg">Pay Now</button>
                                </div>
                            </div>
                        </div>
                        {/* Footer */}
                        <div className="flex justify-center">
                            <p className="py-2">Go to the Project Requirement option by clicking on "Pay Now"</p>
                        </div>
                    </div>
                </div>
               </div>
            </div>
        </div>
    );
};

export default Payment;