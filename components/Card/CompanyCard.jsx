import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiCartAdd } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/features/cart/cart";
import useToast from "../utility/useToast";

const CompanyCard = ({ data }) => {

  const { Toast, showToast } = useToast();

  const { products } = useSelector((state) => state.cart);
  const design = data;

  const isAddedData = products.find((item) => item.designId === data.designId);

  const [showCart,setShowCart] = useState(isAddedData ? true : false)

  const dispatch = useDispatch();
  console.log(isAddedData);
  const isAdded =isAddedData ? true : false

  const handleAddProduct = (product) => {
    dispatch(addToCart(product)); // Assuming you're dispatching an action to add to cart
    showToast("Product Added", "success");
  };

  const handleDeletedProduct = (design) => {
    dispatch(removeFromCart(design));
  };
  return (
    <div
      onMouseEnter={() => setShowCart(true)}
      onMouseLeave={() => setShowCart(isAddedData ? true : false)}
      className="border border-gray-300 relative"
    >
      {showCart ? (
        <div className="absolute right-0 top-0 flex justify-center items-center p-2 rounded-md bg-base-200">
          {/* <button><BiCartAdd size={28} /></button> */}
          {isAdded ? (
            <button
              onClick={() => handleDeletedProduct(design)}
              className="text-rose-500"
            >
              <CgClose size={28} />
            </button>
          ) : (
            <button
              onClick={() => handleAddProduct(design)}
              className="text-rose-500"
            >
              <BiCartAdd size={28} />
            </button>
          )}
        </div>
      ) : (
        ""
      )}
      <div className="bg-rose-100 h-56 w-full">
        <Image
          height={160}
          width={224}
          className="w-full h-56 object-cover"
          src={`${process.env.NEXT_PUBLIC_API}/files/download/public/${
            data?.featuredImageId ? data?.featuredImageId : data?.imageIds[0]
          }`}
          alt=""
        />
      </div>
      <Link
        href={`/design/${data?.designId}`}
        className="px-2 inline-block py-1 text-sm"
      >
        <h3>{data?.title}</h3>
      </Link>
    </div>
  );
};

export default CompanyCard;
