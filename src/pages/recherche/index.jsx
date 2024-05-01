import { useState } from "react";
import Layout from "../layout";

export default function RecherchePage() {
    const [showResult, setShowResult] = useState(false)
    const [searchResultData, setSearchResultData] = useState({})

    const [showFile, setShowFile] = useState(false)

    const search = (e) => {
        e.preventDefault()

        /// START API CALL
        setSearchResultData({})
        /// END API CALL

        setShowResult(true)
        setShowFile(false)
    }

    const createFile = () => {
        setShowResult(false)
        setShowFile(true)
    }

    const saveFile = (e) => {
        e.preventDefault()
    }

    return (
        <Layout>
            <form onSubmit={search} className="mb-3 p-4 flex justify-between items-center w-full bg-[#fafafa] rounded-lg">
                <div>
                    <input type="text" placeholder="Recherche" className="px-3 py-2 rounded-lg" />
                </div>
                <div>
                    <button className="px-4 py-2 bg-green-700 text-white rounded-lg">Rechercher</button>
                </div>
            </form>
            {showResult && <SearchResult action={createFile} data={searchResultData} />}
            {showFile && <FileCard action={saveFile} />}
        </Layout>
    )
}

const SearchResult = ({ action, data }) => {
    return (
        <div className="p-4 bg-white rounded-lg">
            <div className="flex flex-col justify-center items-center gap-3">
                <h2 className="text-2xl">information produits</h2>
                <hr className="w-20 border-2 border-gray-600" />
                <div className="felx flex-col">
                    <p>text: <b>{data.a}</b></p>
                    <p>text: <b>value</b></p>
                    <p>text: <b>value</b></p>
                    <p>text: <b>value</b></p>
                    <p>text: <b>value</b></p>
                    <p>text: <b>value</b></p>
                </div>
                <hr className="w-20 border-2 border-gray-600" />
                <button onClick={() => action()} className="bg-green-700 px-4 py-2.5 rounded-lg uppercase text-white text-sm font-bold"> creer ficher</button>
            </div>
        </div>
    )
}

const FileCard = ({ action }) => {
    return (
        <div className="w-full bg-white p-4 rounded-lg">
            <h2 className="font-bold">card details</h2>
            <form onSubmit={action}>

                <button className="bg-green-700 text-white px-4 py-3">___</button>
            </form>
        </div>
    )
}