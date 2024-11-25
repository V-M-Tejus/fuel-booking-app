// pages/index.tsx
import { useEffect, useState } from "react";
import GoogleMap from "../components/GoogleMap";
import { getUserLocation } from "../utils/getUserLocation";
import { fetchNearbyPlaces } from "../utils/fetchNearbyPlaces";

const Home = () => {
    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [markers, setMarkers] = useState<{ position: google.maps.LatLngLiteral; title: string }[]>([]);

    useEffect(() => {
        getUserLocation()
            .then((position) => {
                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setUserLocation(location);

                return fetchNearbyPlaces(location);
            })
            .then((places) => {
                const newMarkers = places.map((place) => ({
                    position: place.position,
                    title: place.name,
                }));
                setMarkers(newMarkers);
            })
            .catch((error) => console.error("Error fetching location or places:", error));
    }, []);

    return (
        <div>
            <h1>Nearby Petrol Pumps</h1>
            {userLocation ? (
                <>
                    <GoogleMap center={userLocation} zoom={14} markers={markers} />
                    <ul>
                        {markers.map((marker, index) => (
                            <li key={index}>{marker.title}</li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Loading map...</p>
            )}
        </div>
    );
};

export default Home;
