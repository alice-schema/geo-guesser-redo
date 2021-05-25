import { RiMapPinLine, RiAccountPinCircleLine } from "react-icons/ri";

const Marker = ({ isGuess }) => {
    if (isGuess) {
        return <RiAccountPinCircleLine className="marker"/>
    }
    return <RiMapPinLine className="marker"/>
};

export default Marker;