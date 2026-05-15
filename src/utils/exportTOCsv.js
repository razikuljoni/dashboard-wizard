import { message } from "antd";
import { asBlob, generateCsv, mkConfig } from "export-to-csv";

// Function to generate and download CSV
export const downloadCsv = (data, fileName) => {
    // Check if data is provided
    if (!data || !Array.isArray(data) || data.length === 0) {
        message.error("Invalid data provided for CSV generation.");
        return;
    }

    // Create CSV configuration
    const csvConfig = mkConfig({
        useKeysAsHeaders: true, // Use object keys as headers
        filename: fileName, // Default filename
    });

    // Generate the CSV output
    const csv = generateCsv(csvConfig)(data);

    // Convert the CSV output to a Blob
    const blob = asBlob(csvConfig)(csv);

    // Create a download URL
    const url = URL.createObjectURL(blob);

    // Trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = csvConfig.filename || "output.csv";
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
