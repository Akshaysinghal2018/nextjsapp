"use client"
import { ReactNode } from "react";
import useFetchProducts from "@/hooks/useFetchProducts"
import Card from "@/components/card";

import { TProductType } from "@/types/type"

import { useAppSelector } from "@/redux/hooks";
import withAuth from "@/components/withAuth"
const Products = () => {

    useFetchProducts()
    const products = useAppSelector((state) => state.productsReducer?.products);
    return (
        <div className="products__container">
            {!!products && products?.map((product: TProductType): ReactNode => {
                return (
                    <Card
                        product={product}
                        key={product?.id}
                        image={product?.image}
                        title={product?.title}
                        id={product?.id}
                        price={product?.price}
                    />
                )
            })}
        </div>
    )
}

export default withAuth(Products)