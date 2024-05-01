import Layout from "../layout";
import {FaSearch} from "react-icons/fa";

export default function RechercherPage() {
    return (
        <Layout>
            <div className="search-bar-container">
                <div className="input wrapper">
                    <FaSearch id="search-icon" />
                    <input placeholder="saisir Rechercher" />
                    
                </div>
                <div>
                    Informations produits
                </div>
                
            </div>
        </Layout>
    )
}