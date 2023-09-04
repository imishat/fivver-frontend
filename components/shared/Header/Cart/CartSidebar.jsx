import { removeFromCart } from "@/components/redux/features/cart/cart";
import { checkoutCart } from "@/components/redux/features/cart/checkoutCart/checkoutSlice";
import useToast from "@/components/utility/useToast";
import Link from "next/link";
import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
const CartSidebar = ({ cartShow, setCartShow }) => {
  const dispatch = useDispatch();
  //get data from reduc store
  // const {products,isAdded}=useSelector((state)=>state.cart)
  // const {products:selectedDesign} = useSelector((state)=>state.checkoutCart)

  // toast
  const { Toast, showToast } = useToast();

  // get selected designs
  const [selectedDesign, setSelectedDesign] = useState([]);
  // dispatch(checkoutCart(selectedDesign))

  // console.log(selectedDesign,'Selected Design')

  // send checkout added product to redux store
  const handlecheckoutProduct = (design) => {
    if (selectedDesign?.length) {
      dispatch(checkoutCart(selectedDesign));
    }
  };

  // get all design from localstorage

  const products = JSON.parse(
    typeof window !== "undefined" && window.localStorage.getItem("selected")
  ) || []
  


  return (
    <div
      className={`h-screen duration-300 top-0 z-50 fixed w-full sm:w-96 ${
        cartShow ? " right-0" : "-right-[999px] duration-300 "
      }`}
    >
      <Toast />
      <button
        hidden={!cartShow}
        onClick={() => setCartShow(!cartShow)}
        className="w-screen h-screen fixed left-0 top-0 bg-black bg-opacity-25 backdrop-blur-sm -z-50 "
      ></button>

      <div className="sticky w-full bg-[#3B82F6] text-white py-2 text-center top-0 ">
        <p>Checkout Your Projects</p>
      </div>
      {/* designs */}
      <div className=" bg-base-100 text-black w-full h-full overflow-auto ">
        {/* Single Desing */}
        {!products.length ?<div className="flex justify-center h-full items-center"><p>No Design Selected</p></div>:
          products.map((cart) => {
            return (
              <label
                key={cart.designId}
                htmlFor={cart?._id}
                className="flex relative items-center"
              >
                <input
                  onChange={(e) =>
                    e.target.checked
                      ? setSelectedDesign([...selectedDesign, cart])
                      : setSelectedDesign(
                          selectedDesign.filter(
                            (design) => design.designId !== cart.designId
                          )
                        )
                  }
                  className="checkbox absolute checkbox-primary left-4 top-3 checkbox-sm rounded"
                  type="checkbox"
                  value={cart.designId}
                  id={cart?._id}
                />
                <div
                  key={cart.id}
                  className="flex justify-between items-center px-3 py-2 border"
                >
                  <div className="flex gap-2 w-full ">
                    <div className="w-20 h-16">
                      <img
                        className="w-full h-full object-cover"
                        src={`http://103.49.169.89:30912/api/v1.0/files/download/public/${cart.imageIds[0]}`}
                        alt=""
                      />
                    </div>
                    <div className="w-full">
                      <p className="font-bold leading-5 ">
                        {cart.title} Quantity: {cart.quantity}
                      </p>
                      <p className="text-xs">{cart.subcategoryName}</p>
                      <p className="text-xs">Size: {cart.size}</p>
                    </div>
                  </div>
                  <div>
                    <button>
                      <RiCloseLine
                        onClick={() => dispatch(removeFromCart(cart))}
                        size={24}
                      />
                    </button>
                  </div>
                </div>
              </label>
            );
          })}
      </div>
      {/* Bottom buttons */}
      <div className="w-full flex items-center sticky bottom-0">
        <button
          onClick={() => setCartShow(!cartShow)}
          className="w-1/2 bg-red-500 py-2 border-r"
        >
          Close
        </button>
        {!selectedDesign.length ? (
          <button
            onClick={() => showToast("Select a design", "error")}
            className="w-1/2 inline-block text-center bg-[#3B82F6] py-2 "
          >
            Checkout
          </button>
        ) : (
          <Link
            onClick={() => handlecheckoutProduct(selectedDesign)}
            href={"/project"}
            className="w-1/2 inline-block text-center bg-[#3B82F6] py-2"
          >
            Checkout
          </Link>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
