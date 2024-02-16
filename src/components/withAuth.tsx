"use client"
import { useEffect } from "react"
import { redirect } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function withAuth(Components: any) {
    return function WithAuth(props: any) {
        const user = useAppSelector((state) => state.userReducer.user);

        useEffect(() => {
            if (!user) {
                redirect("/login")
            }
        }, [user])

        if (!user) {
            return null
        }

        return <Components {...props} />

    }
}