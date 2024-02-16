"use client"
import { FocusEvent, ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/slices/userSlice"
const Login = () => {
    const dispatch = useAppDispatch()
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const router = useRouter()

    const handleInputNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setError(false)
        setName(event.target.value)
    }

    const handleInputPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setPassword(event.target.value)
    }

    const handleSubmit = (event: FocusEvent<HTMLFormElement>): void => {
        event.preventDefault()
        if (!name || !password) {
            setError(true)
            return
        }
        dispatch(login({ name, password }))
        router.push("/products")

    }

    return (


        <div className="flex min-h-[90vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account New
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit}>
                    <div className="my-2">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                id="name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name="name"
                                value={name}
                                onChange={handleInputNameChange}
                            />
                        </div>

                    </div>
                    <div className="my-2">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                type="password"
                                id="password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name="password"
                                value={password}

                                onChange={handleInputPasswordChange}
                            />
                        </div>

                    </div>
                    {error && <span className="font-medium text-red-600">name or password missing!</span>}
                    <div className="my-10">
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>


    )
}
export default Login