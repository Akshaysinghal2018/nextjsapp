"use client"
import Image from "next/image"
import { useState } from "react";
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice"
import Link from "next/link";
import withAuth from "@/components/withAuth"
import { TProductType } from "@/types/type";

type PropsType = {
    params: { productId: string }
}

const Product = ({ params }: PropsType) => {

    const [qty, setQty] = useState<number>(1)
    const dispatch = useAppDispatch()
    const product = useAppSelector((state) => state.productReducer?.product);
    const cartItems = useAppSelector((state) => state.cartReducer.cartItems)
    const handleClick = (product: TProductType) => {
        const isItemExist = cartItems.find((item) => item.id === product.id)
        if (isItemExist) {
            const newProduct = { ...product, qty: isItemExist.qty + qty }
            dispatch(addToCart(newProduct))
            toast.success("Item added successfully", {
                position: "bottom-left"
            });
            setQty(1)
        } else {
            const newProduct = { ...product, qty }
            dispatch(addToCart(newProduct))
            toast.success("Item added successfully", {
                position: "bottom-left"
            });
            setQty(1)
        }

    }

    return (

        <div className="grid grid-cols-2 gap-[50px] min-h-[90vh] p-[100px] content-center justify-center">
            <Link href={"/products"} className="px-3 py-2 col-span-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300">
                BACK TO PRODUCTS
            </Link>
            <div className="grid justify-center content-center bg-[#f1f1f1] p-2.5">
                <Image
                    src={product?.image}
                    alt="product image"
                    className="object-contain"
                    width={300}
                    height={300}
                />
            </div>
            <div className="grid justify-center content-center">
                <div className="flex flex-col gap-5">
                    <h2 className="text-4xl font-semibold">{product?.title}</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-lg font-bold">$:{product?.price}</span>
                    </div>
                    <p className="text-sm tracking-wide text-gray-600">
                        {product?.description}
                    </p>
                    <p className="font-normal text-sm">
                        <span className="text-base font-medium">Rating:</span> {product?.rating?.rate}
                        <span className="text-base font-medium pl-4">Review:</span> {product?.rating?.count}
                    </p>

                    <div>
                        <button
                            type="button"
                            onClick={() => setQty((prev) => prev - 1)}
                            className="bg-gray-200 px-1.5"
                        >
                            -
                        </button>
                        <span className="px-4">{qty}</span>
                        <button
                            type="button"
                            onClick={() => setQty((prev) => prev + 1)}
                            className="bg-gray-200 px-1.5"
                        >
                            +
                        </button>
                    </div>

                    <button onClick={() => handleClick(product)} className="w-full py-4 bg-blue-500 hover:bg-blue-700 duration-300 text-white text-lg rounded-md">
                        Add to Cart
                    </button>
                    <p className="font-normal text-sm">
                        <span className="text-base font-medium">Categories:</span> {product?.category}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default withAuth(Product)