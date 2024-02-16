import { useEffect } from "react"
import { useAppDispatch } from "@/redux/hooks";
import { fetchProducts } from "@/redux/slices/productsSlice"

const useFetchProducts = (): void => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    return
}

export default useFetchProducts;