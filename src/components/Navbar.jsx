import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
const Navbar = () => {
    const { user, signOutUser } = useContext(UserContext);

    const handleClickLogout = async () => {
        try {
            await signOutUser();
        } catch (error) {
            console.log(error.code);
        }
    };

    const classButtonBlue = "text-white bg-blue-700 hover:bg-blue-800  focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mx-2";
    const classButtonRed = "text-white bg-red-700 hover:bg-red-800  focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center";

    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">URLShort APP</span>
                </Link>
                <div className="flex md:order-2">
                    {user ? (
                        <>
                            <NavLink to="/" className={classButtonBlue}>Inicio</NavLink>
                            <button onClick={handleClickLogout} className={classButtonRed}>cerrar sesión</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={classButtonBlue}>Login</NavLink>
                            <NavLink to="/register" className={classButtonBlue}>Register</NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
