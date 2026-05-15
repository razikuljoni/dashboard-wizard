// Utility function for direct formatting if needed
const formatAccuracy = (value, defaultValue = "N/A", decimalPlaces = undefined) => {
    // Handle null or undefined values
    if (value == null || (typeof value !== "number" && Number?.isNaN(Number(value)))) {
        return defaultValue;
    }

    // Convert to number
    const numValue = Number(value);

    // If value is 0, return '0'
    if (numValue === 0) {
        return "0";
    }

    // Handle decimal precision
    if (decimalPlaces !== undefined) {
        // Ensure decimalPlaces is a non-negative integer
        const precision = Math.max(0, Math.floor(decimalPlaces));
        return `${numValue.toFixed(precision)}%`;
    }

    // Default to integer percentage
    return `${Math.round(numValue)}%`;
};

export default formatAccuracy;
