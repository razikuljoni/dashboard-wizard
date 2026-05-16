import React from "react";

const ExpandCommonHeader = ({ title, onBack, onClose }) => {
    return (
        <div className="flex items-center justify-between rounded-t-lg">
            {" "}
            {/* Added rounded top corners */}
            <button onClick={onBack} className="text-zinc-800 mr-4 hover:text-zinc-900">
                {" "}
                {/* Added hover effect */}
                &lt; Back
            </button>
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
                onClick={onClose}
                className="bg-red-500 text-white rounded-full size-8 flex items-center justify-center hover:bg-red-700 focus:outline-none"
            >
                {" "}
                {/* Improved close button style */}X
            </button>
        </div>
    );
};

export default ExpandCommonHeader;
