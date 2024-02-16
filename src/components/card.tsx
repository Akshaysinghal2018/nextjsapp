import Image from "next/image";

import { TProductCardType } from "@/types/type"
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { selectProduct } from "@/redux/slices/productSlice"


const Card = ({ title, image, id, product }: TProductCardType) => {

    const dispatch = useAppDispatch();
    const handleClick = () => {
        dispatch(selectProduct(product))
    }

    return (
        <div key={id} className="bg-[#f2f2f2] p-10 rounded-sm border-2 border-solid border-[#f2f2f2] shadow hover:shadow-xl hover:-translate-y-2">
            <Link href={`/products/${id}`} onClick={handleClick}>
                <div className="flex flex-col items-center justify-between gap-2.5 h-[100%]">
                    <Image width={300} height={200} src={image} alt="product" className="h-[200px] rounded-sm" />
                    <div className="text-center font-semibold">Price : ${product.price}</div>
                    <div className="text-center font-light">{title}</div>
                    <div className="text-center font-semibold">Rating : {product.rating?.rate}</div>
                </div>
            </Link>
        </div>
    )
}

export default Card;