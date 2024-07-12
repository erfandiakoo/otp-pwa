import { Link } from "react-router-dom"

const NotFoundPage = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-500">
            <h1 className="text-white font-bold text-9xl">404</h1>
            <span className="text-white font-thin text-2xl">Page Not Found</span>
            <Link to={'/'} className="rounded-xl bg-black text-white mt-12 px-8 py-3">back to home</Link>
        </div>
    )
}

export default NotFoundPage