// utils/fetchNearbyPlaces.ts
export const fetchNearbyPlaces = async (
    location: google.maps.LatLngLiteral,
    type: string = "gas_station",
    radius: number = 5000
) => {
    const service = new google.maps.places.PlacesService(
        document.createElement("div")
    );

    return new Promise<{ name: string; position: google.maps.LatLngLiteral }[]>((resolve, reject) => {
        service.nearbySearch(
            {
                location,
                radius,
                type,
            },
            (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    const places = results.map((place) => ({
                        name: place.name || "Unnamed Place",
                        position: {
                            lat: place.geometry?.location?.lat() || 0,
                            lng: place.geometry?.location?.lng() || 0,
                        },
                    }));
                    resolve(places);
                } else {
                    reject(`Places API error: ${status}`);
                }
            }
        );
    });
};
