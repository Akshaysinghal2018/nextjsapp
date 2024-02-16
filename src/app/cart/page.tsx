"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteProduct, resetCart, decrease, increase } from "@/redux/slices/cartSlice"
import { selectProduct } from "@/redux/slices/productSlice"
import { ICartItemType } from "@/types/type"
import withAuth from "@/components/withAuth"
const Cart = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const cartItems = useAppSelector((state) => state.cartReducer?.cartItems);


    const handleDelete = <T,>(id: T): void => {
        dispatch(deleteProduct(id))
        toast.success("Item deleted successfully", {
            position: "bottom-left"
        });
    }

    const handleCheckout = () => {
        toast.success("Thanks for shopping.", {
            position: "bottom-left"
        });
        router.push("/products")
        dispatch(resetCart())
    }

    const handleDecrees = (item: ICartItemType) => {
        if (item?.qty > 1) {
            dispatch(decrease(item))
        } else {
            toast.error("use delete button for remove item from cart!", {
                position: "bottom-left"
            });
        }
    }


    const handleProductClick = (item: ICartItemType) => {
        dispatch(selectProduct(item))
    }
    const totalPrice = (): number => {
        const price = cartItems.reduce((a: number, c: any) => a + c?.price * c?.qty, 0)
        return Math.round((price + Number.EPSILON) * 100) / 100
    }
    return (
        <div className="mt-[10vh] min-h-[80vh]">
            <h1 className="mb-4 text-xl justify-center align-center px-10 pt-10 text-center font-bold">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="grid h-[70vh] justify-center content-center">
                    <h1 className="mb-4 text-xl justify-center align-center px-10"> Cart is empty. <Link href="/products" className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300">Go shopping</Link></h1>
                </div>
            ) : (
                <div className="grid md:grid-cols-4 md:gap-5 justify-center align-center p-10">
                    <div className="overflow-x-auto md:col-span-3">
                        <table className="min-w-full">
                            <thead className="border-b">
                                <tr>
                                    <th className="p-5 text-left">Product</th>
                                    <th className="p-5 text-right">Quantity</th>
                                    <th className="p-5 text-right">Price</th>
                                    <th className="p-5">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id} className="border-b">
                                        <td className="m-3 w-[50%]">
                                            <Link
                                                href={`/products/${item.id}`}
                                                className="flex items-center gap-5"
                                                onClick={() => handleProductClick(item)}
                                            >
                                                <Image
                                                    src={item?.image}
                                                    alt={item?.title}
                                                    width={100}
                                                    height={100}
                                                    className="p-1 bg-grey-300"
                                                ></Image>
                                                <p>{item.title}</p>
                                            </Link>
                                        </td>
                                        <td className="p-5 text-right">
                                            <button
                                                type="button"
                                                onClick={() => handleDecrees(item)}
                                                className="bg-gray-200 px-1.5"
                                            >
                                                -
                                            </button>
                                            <span className="px-4">{item.qty}</span>
                                            <button
                                                type="button"
                                                onClick={() => dispatch(increase(item))}
                                                className="bg-gray-200 px-1.5"
                                            >
                                                +
                                            </button>
                                        </td>

                                        <td className="p-5 text-right">${item.price}</td>
                                        <td className="p-5 text-center">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:ring-2 focus:ring-blue-300 rounded"

                                                onClick={() => handleDelete(item?.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div className="p-5">
                            <div className="pb-3 text-xl font-bold">
                                Subtotal : ${totalPrice()}
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:ring-2 focus:ring-blue-300 rounded"
                            >
                                Proceed to checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default withAuth(Cart);