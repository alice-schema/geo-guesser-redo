// https://www.npmjs.com/package/react-streetview
import ReactStreetView from 'react-streetview';

const StreetView = ({ API_KEY, position }) => {

    const options = {
        position: position,
        pov: {heading: 100, pitch: 0},
        zoom: 1,
        disableDefaultUI: true
    }

    return (
        // react fragment: <> ... </>
        <>
            {position && (
            <ReactStreetView
                apiKey={API_KEY}
                streetViewPanoramaOptions={options}
            />
            )}
        </>
    )
}

export default StreetView;