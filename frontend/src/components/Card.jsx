import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBath, faBed, faHome } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

const Card = (props) => {
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out border border-[rgb(223,198,103)]">
            {/* Image Section */}
            <div className="overflow-hidden rounded-t-lg">
                <img className="w-full h-64 object-cover rounded-t-lg" src={props.photo_main} alt="Property" />
            </div>
            <div className="px-6 py-4">
                {/* Price */}
                <div className="text-2xl font-semibold text-[rgb(223,198,103)] mb-2">{props.price}€</div>
                {/* Address */}
                <div className="text-sm text-white-800 mb-4">
                    <p>{props.address}, {props.zip_code}, {props.city}</p>
                </div>
                {/* Property Details */}
                <div className="flex flex-wrap gap-2 text-sm font-medium text-gray-800">
                    <div className="inline-flex items-center bg-[rgb(223,198,103)] text-white rounded-full px-3 py-1">
                        <FontAwesomeIcon icon={faHome} className="mr-1" />
                        {props.surface}m²
                    </div>
                    <div className="inline-flex items-center bg-[rgb(223,198,103)] text-white rounded-full px-3 py-1">
                        <FontAwesomeIcon icon={faBed} className="mr-1" />
                        {props.bedrooms}
                    </div>
                    <div className="inline-flex items-center bg-[rgb(223,198,103)] text-white rounded-full px-3 py-1">
                        <FontAwesomeIcon icon={faBath} className="mr-1" />
                        {props.bathrooms}
                    </div>
                </div>
                {/* Property Type */}
                <div className="text-center mt-4 text-[rgb(223,198,103)] font-bold">{props.type}</div>
            </div>
        </div>
    )
};

// Proptypes for Card component to define the expected props
Card.propTypes = {
    photo_main: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    surface: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    zip_code: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired
};

export default Card;
