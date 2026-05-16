import ChartHeader from "@/pages/Dashboard/Chart/ChartHeader";
import { AdvancedMarker, APIProvider, Map, Pin } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { PiMapPinFill } from "react-icons/pi";

const LocationStatus = ({ data: pmmData }) => {
    const handleRefresh = () => {};
    const [expandedChart, setExpandedChart] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const csvData = [
        {
            Match: pmmData?.filter(item => item.withinRadius)?.length,
            NotMatch: pmmData?.filter(item => !item.withinRadius)?.length,
        },
    ];

    return (
        <>
            <div className="w-full bg-white shadow rounded-lg h-[285px]" id="location-status">
                <ChartHeader
                    title="Location Status"
                    setExpandedChart={setExpandedChart}
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    cssId="location-status"
                    isMinimized={isMinimized}
                    setIsMinimized={setIsMinimized}
                    visibleMinimize
                    visibleClose
                    // visibleFullScreen
                    additionalActions={[
                        { label: "Refresh", onClick: handleRefresh },
                        {
                            label: "Filter",
                            onClick: () => console.log("filtering chart"),
                        },
                    ]}
                />
                {!isMinimized && (
                    <>
                        <PmmDashboardMap data={pmmData || []} />
                    </>
                )}
            </div>
        </>
    );
};

const PmmDashboardMap = ({ data, state, setState }) => {
    const [animatedMarkers, setAnimatedMarkers] = useState([]);
    const [mapState, setMapState] = useState(
        state || {
            windowVisible: false,
            windowPosition: null,
        }
    );

    useEffect(() => {
        const timerIds = [];

        if (data?.length) {
            for (let i = 0; i < data.length; i++) {
                const id = setTimeout(() => {
                    setAnimatedMarkers(prev => [...prev, data[i]]);
                }, Math.random() * 1000);
                timerIds.push(id);
            }
        }

        return () => {
            for (let i = 0; i < timerIds.length; i++) {
                clearTimeout(timerIds[i]);
            }
        };
    }, [data]);

    const handleCloseInfoWindow = () => {
        const newState = {
            ...mapState,
            windowVisible: false,
            windowPosition: null,
        };
        setMapState(newState);
        setState?.(newState);
    };

    return (
        <div className="">
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY || ""}>
                <Map
                    className="w-full h-[210px] p-2 rounded-lg"
                    defaultZoom={7}
                    defaultCenter={{ lat: 23.777176, lng: 90.399452 }}
                    mapId={"pmm-dashboard/streets-v11"}
                    onClick={handleCloseInfoWindow}
                >
                    {animatedMarkers?.map((marker, index) => (
                        <AdvancedMarker
                            key={`marker-${marker?.lat}-${marker?.lon}`}
                            position={{
                                lat: Number(marker?.lat),
                                lng: Number(marker?.lon),
                            }}
                            className="transition-transform duration-300 transform popout-animation hover:scale-125"
                        >
                            <Pin
                                background={marker.withinRadius ? "#008000" : ""}
                                borderColor={marker.withinRadius ? "#006A4E" : ""}
                                glyphColor={marker.withinRadius ? "#006A4E" : ""}
                            />
                        </AdvancedMarker>
                    ))}
                </Map>
            </APIProvider>

            <div className="flex gap-5 justify-center items-center px-2 pb-2 w-full">
                <p className="flex gap-2 items-center font-bold text-md">
                    <PiMapPinFill size={15} color="red" /> Not Match
                </p>
                <p className="flex gap-2 items-center font-bold text-md">
                    <PiMapPinFill size={15} color="green" /> Match
                </p>
            </div>
        </div>
    );
};

export default LocationStatus;
