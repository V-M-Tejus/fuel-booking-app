// components/GoogleMap.tsx
import React, { useEffect, useRef } from "react";

interface Marker {
    position: google.maps.LatLngLiteral;
    title: string;
}

interface GoogleMapProps {
    center: google.maps.LatLngLiteral;
    zoom: number;
    markers?: Marker[];
}

const GoogleMap: React.FC<GoogleMapProps> = ({ center, zoom, markers = [] }) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapRef.current) {
            // Initialize the map
            const map = new google.maps.Map(mapRef.current, {
                center,
                zoom,
            });

            // Add markers to the map
            markers.forEach((marker) => {
                new google.maps.Marker({
                    position: marker.position,
                    map,
                    title: marker.title,
                    icon: {
                        url: "data:image/png;base64,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", // Icon for petrol pumps
                        scaledSize: new google.maps.Size(32, 32), // Adjust the size of the icon
                    },
                });
            });
        }
    }, [center, zoom, markers]);

    return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default GoogleMap;
