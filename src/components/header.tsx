"use client"
import Link from "next/link";
import Image from "next/image";
import logo from '@/public/assets/logo.png'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/userSlice";
import { toast } from 'react-toastify';

export default function Header() {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cartReducer?.cartItems);
    const user = useAppSelector((state) => state.userReducer.user);
    const handleLogout = () => {
        dispatch(logout())
        toast.success("Logout successfully", {
            position: "bottom-left"
        });
    }

    return (
        <header >
            <div className="w-[100%] m-auto">
                <nav className="w-[95%] min-h-[10vh] flex justify-between items-center m-auto">
                    <Link href={"/products"}><Image alt="logo" src={logo} height={50} width={50}></Image></Link>
                    <ul className="header__nav__menu">
                        <li className="header__nav__menu_link">
                            <Link
                                className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
                                href="/cart"

                            >
                                <span className="lg:inline ml-1">
                                    Cart (<b>{!!cartItems.length ? cartItems.reduce((a: number, c: any) => a + c?.qty, 0) : 0}</b>)
                                </span>
                            </Link>
                        </li>
                        <li className="header__nav__menu_link">

                            <Link
                                className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
                                href="/login"
                                onClick={!user ? () => { } : handleLogout}

                            >
                                {!user ? "Login" : "Logout"}
                            </Link>

                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}