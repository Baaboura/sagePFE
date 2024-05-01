import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { CiViewBoard } from "react-icons/ci";
import { IoIosList } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoAlert } from "react-icons/go";
import { Link } from "react-router-dom";

let menus = [
    { name: "Recherche", link: `/recherche`, icon: CiSearch },
    { name: "Consulter Fiche SAV", link: `/`, icon: CiViewBoard },
    { name: "Consulter Ficher Sinistre", link: `/`, icon: CiViewBoard },
    { name: "Consulter bon SAV", link: `/`, icon: CiViewBoard },
    { name: "Consulter Assurance", link: `/`, icon: CiViewBoard },
    { name: "Recherche Decharge", link: `/`, icon: CiSearch },
    { name: "Suivi point de collecte", link: `/`, icon: IoIosList },
    { name: "Go for Swap", link: `/`, icon: IoIosList },
    { name: "Suivi Fiche Sinistre", link: `/`, icon: CiViewBoard },
    {
        name: "Suivi Retour Réparateurs", link: `#`, icon: IoIosList, haveChildren: true, children: [
            { name: "name", link: "" },
            { name: "2", link: "" },
            { name: "s", link: "" },
            { name: "name", link: "" },
        ]
    },
    { name: "Notifications", link: `/`, icon: IoMdNotificationsOutline },
    { name: "Alerts", link: `/`, icon: GoAlert },

];
export default function Layout({ children }) {
    const [openSub, setOpenSub] = useState(-1)
    const [open, setOpen] = useState(false);


    const openSubMenu = (i) => {
        setOpenSub(i === openSub ? -1 : i)
    }

    return (

        <section className="flex gap-6 bg-gray-200">

            <div className={`bg-[#09090b] min-h-screen ${open ? "w-72" : "w-16"} duration-500  text-gray-100 px-4`}>
                <div className="auth-header-logo">
                   <img src="/assets/img/logo2.png" alt="" className="auth-header-logo-img" />
                </div>
                <div className="py-3 flex justify-end">
                    <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
                </div>
                <div className="mt-4 flex flex-col gap-1 relative">
                    {
                        menus?.map((menu, i) => {
                            if (menu.haveChildren) {
                                return (
                                    <div key={i} className="p-2 hover:bg-green-700 rounded-md">
                                        <div onClick={() => openSubMenu(i)} className="no-underline flex mb-2 items-center text-sm gap-2 text-white font-medium ">
                                            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                                            <h2
                                                style={{ transitionDelay: `${i + 3}00ms` }}
                                                className={`whitespace-pre duration-500 text-sm text-white ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
                                                {menu?.name}
                                            </h2>
                                            <div>
                                                <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                                                </svg>

                                            </div>
                                        </div>
                                        {
                                            openSub === i && (
                                                <div className="px-6">
                                                    <ul>
                                                        {
                                                            menu.children.map((e, ii) => {
                                                                return (
                                                                    <Link to={e?.link} key={ii} className="no-underline flex items-center text-sm gap-2 text-white font-medium  hover:bg-green-700 py-2 px-2 rounded-md">
                                                                        <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                                                                        <h2
                                                                            style={{ transitionDelay: `${i + 3}00ms` }}
                                                                            className={`whitespace-pre duration-500 text-sm text-white ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
                                                                            {e?.name}
                                                                        </h2>

                                                                    </Link>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            } else {
                                return <Link to={menu?.link} key={i} className="p-2 no-underline flex items-center text-sm gap-2 text-white font-medium  hover:bg-green-700 rounded-md">
                                    <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                                    <h2
                                        style={{ transitionDelay: `${i + 3}00ms` }}
                                        className={`whitespace-pre duration-500 text-sm text-white ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
                                        {menu?.name}
                                    </h2>
                                </Link>
                            }
                        }


                        )
                    }
                </div>
            </div>
            <div className="m-3 flex-1 ">
                {children}
            </div>
        </section>
    )
}