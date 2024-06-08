import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBath} from '@fortawesome/free-solid-svg-icons'
import {faBed} from '@fortawesome/free-solid-svg-icons'
import {faHome} from '@fortawesome/free-solid-svg-icons'


const Card = (props) => {
    
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full h-64 object-cover" src={props.photo_main} alt="" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl text-gray-700">{props.price}€</div>
            </div>
            <div className="px-6">
                <div className="font-bold text-sm text-gray-700">{props.address} {props.zip_code} {props.city}</div>
            </div>
            <div className="px-6 pt-4 pb-2 items-center">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <FontAwesomeIcon icon={faHome} className="mr-1"/>
                    {props.surface}m²
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <FontAwesomeIcon icon={faBed} className="mr-1"/>
                    {props.bedrooms}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <FontAwesomeIcon icon={faBath} className="mr-1"/>{props.bathrooms}
                </span>
                <span className="text-xl font-semibold text-gray-300 mr-1">|</span>            
                <span className="text-sm font-semibold text-gray-700">{props.type}</span>
            </div>
        </div>
    )
};

export default Card;