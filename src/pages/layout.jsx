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
    { name: "Consulter Fiche SAV", link: `/consulte`, icon: CiViewBoard },
    { name: "Consulter Fiche Sinistre", link: `/sinistre`, icon: CiViewBoard },
    { name: "Consulter bon SAV", link: `/`, icon: CiViewBoard },
    
    { name: "Recherche Decharge", link: `/decharge`, icon: CiSearch },
    { name: "Suivi point de collecte", link: `#`, icon: IoIosList, haveChildren: true, children: [
              {name: "Retour Entrepot Terminaux SWAP", link: ""},
                

    ] 
},
    { name: "Go for Swap", link: `#`, icon: IoIosList, haveChildren: true, children: [
        {name: "Liste des Terminaux", link: ""},
        {name: "Liste des Terminaux Assurés", link: ""}
    ]
    
    },
    { name: "Suivi Fiche Sinistre", link: `/`, icon: CiViewBoard },
    {
        name: "Suivi Retour Réparateurs", link: `/reparateur`, icon: IoIosList, haveChildren: true, children: [
            { name: "Expedier reparateur interne", link: "" },
            { name: "Expedier reparateur externe", link: "/externe" },
            { name: "Recu reparateur interne", link: "" },
            { name: "Recu reparateur externe", link: "/recuExterne" },
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

        <section className="flex bg-gray-200">

            <div className={`bg-[#09090b] min-h-screen ${open ? "w-72" : "w-16"} duration-500  text-gray-100 px-4`}>
                <div className="auth-header-logo">
                    <Link to={"/"}>
                        <img src="/assets/img/logo2.png" alt="" className="auth-header-logo-img" />
                    </Link>
                </div>
                <div className="py-3 flex justify-end">
                    <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
                </div>
                <div className="mt-4 flex flex-col gap-1 relative">
                    {
                        menus?.map((menu, i) => {
                            if (menu.haveChildren && open) {
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
            <div className=" flex-1 flex flex-col">
                <div className="bg-white p-3 flex justify-between items-center shadow-md">
                    <div className="uppercase font-bold text-xs"></div>
                    <div>
                        <div className="bg-gray-100 rounded-lg p-2 flex gap-2">
                            <svg viewBox="0 0 24 24" className="w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </g>
                            </svg>
                            <input type="text" className="bg-transparent outline-none text-sm flex-grow" placeholder="search for projects" />
                        </div>
                    </div>
                    <div>
                        <img src="/assets/img/profile.avif" className="w-8 rounded-lg" alt="" srcset="" />
                    </div>
                </div>
                <div className="flex-1 p-2">
                    {children}
                </div>
            </div>
        </section>
    )
}
