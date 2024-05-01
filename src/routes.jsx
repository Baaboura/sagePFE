import { redirect } from "react-router-dom";
import { useAuth } from "./hooks/auth";
import Signin from "./pages/auth/Signin";
import Home from "./pages/home/home";
import RechercherPage from "./pages/recherche";

export default function CustomRoutes() {
    const { isAuthed } = useAuth()

    const withAuth = () => (isAuthed) ? null : redirect("/signin")
    const withoutAuth = () => (!isAuthed) ? null : redirect("/")
    return [
        { path: "/", element: <Home />, loader: withAuth },
        { path: "/recherche", element: <RechercherPage />, loader: withAuth },


        { path: "/signin", element: <Signin />, loader: withoutAuth },
    ]
}