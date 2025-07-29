import { Link } from "react-router-dom";

const Properties = () => {

    return (
        <Link to="/add-property" className={`mr-5 hover:text-gray-900 ? 'text-blue-500' : ''}`}>Ajouter une propriété</Link>
    )
}

export default Properties