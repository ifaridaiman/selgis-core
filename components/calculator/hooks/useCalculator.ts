import React, { useState } from 'react'
import { toast } from "react-toastify";

export const useCalculator = () => {

    const [latitudeDegrees, setLatitudeDegrees] = useState("");
    const [latitudeMinutes, setLatitudeMinutes] = useState("");
    const [latitudeSeconds, setLatitudeSeconds] = useState("");

    const [longitudeDegrees, setLongitudeDegrees] = useState("");
    const [longitudeMinutes, setLongitudeMinutes] = useState("");
    const [longitudeSeconds, setLongitudeSeconds] = useState("");

    const [decimalLatitude, setDecimalLatitude] = useState("");
    const [decimalLongitude, setDecimalLongitude] = useState("");
    const [showCalculator, setShowCalcultor] = useState<boolean>(false);

    // Helper function to convert DMS to Decimal Degrees
    const convertDmsToDecimal = (degrees: number, minutes: number, seconds: number) => {
        return degrees + minutes / 60 + seconds / 3600;
    };

    const handleConvertToDecimal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const latDegrees = parseFloat(latitudeDegrees) || 0;
        const latMinutes = parseFloat(latitudeMinutes) || 0;
        const latSeconds = parseFloat(latitudeSeconds) || 0;

        const longDegrees = parseFloat(longitudeDegrees) || 0;
        const longMinutes = parseFloat(longitudeMinutes) || 0;
        const longSeconds = parseFloat(longitudeSeconds) || 0;

        const decimalLat = convertDmsToDecimal(latDegrees, latMinutes, latSeconds);
        const decimalLong = convertDmsToDecimal(longDegrees, longMinutes, longSeconds);

        setDecimalLatitude(decimalLat.toFixed(6));
        setDecimalLongitude(decimalLong.toFixed(6));
    };

    const copyToClipboard = (text: string, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        navigator.clipboard.writeText(text);
        toast.success(`Copied: ${text}`);
    };

    return { latitudeDegrees, latitudeMinutes, latitudeSeconds ,setLatitudeDegrees, setLatitudeMinutes, setLatitudeSeconds, longitudeDegrees, longitudeMinutes, longitudeSeconds ,setLongitudeDegrees, setLongitudeMinutes, setLongitudeSeconds, decimalLatitude, decimalLongitude, handleConvertToDecimal, copyToClipboard, showCalculator, setShowCalcultor}
}

