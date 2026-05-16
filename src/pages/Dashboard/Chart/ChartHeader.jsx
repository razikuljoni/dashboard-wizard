import { setDashboardWidgets } from "@/redux/features/dashboard/dashboardWidgets";
import { downloadCsv } from "@/utils/exportTOCsv";
import {
    CloseOutlined,
    DownloadOutlined,
    FullscreenOutlined,
    MinusOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Button, message } from "antd";
import { toPng, toSvg } from "html-to-image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChartHeader = ({
    title,
    downloadOptions,
    setExpandedChart,
    setIsMinimized,
    isMinimized,
    cssId,
    visibleMinimize,
    visibleClose,
    visibleFullScreen,
    csvData,
    extended,
    legend,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleDownloadClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const captureImage = type => {
        const node = document.getElementById(cssId);

        if (type === "PNG") {
            // Generate PNG
            toPng(node, { skipFonts: true })
                .then(dataUrl => {
                    const link = document.createElement("a");
                    link.download = `${title}.png`;
                    link.href = dataUrl;
                    link.click();
                })
                .catch(error => {
                    console.error("Failed to capture PNG", error);
                });
        } else if (type === "SVG") {
            // Generate SVG
            toSvg(node, { skipFonts: true })
                .then(dataUrl => {
                    const link = document.createElement("a");
                    link.download = `${title}.svg`;
                    link.href = dataUrl;
                    link.click();
                })
                .catch(error => {
                    console.error("Failed to capture SVG", error);
                });
        } else if (type === "CSV") {
            if (csvData.length) {
                downloadCsv(csvData, `${title}.csv`);
            } else {
                message.error("No data to download");
            }
        } else {
            console.error("Invalid type selected for download.");
        }
    };

    const handleDownloadOptionClick = format => {
        if (format) {
            captureImage(format);
        }
        setIsDropdownOpen(false);
    };

    const handleClickOutside = event => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMinimize = () => {
        setIsMinimized(!isMinimized);
    };
    const { dashboardWidgets } = useSelector(state => state.dashboardWidgets);
    const dispatch = useDispatch();

    const handleClose = () => {
        console.log("closed", title);

        dispatch(setDashboardWidgets(dashboardWidgets.filter(x => x !== title)));
    };

    const handleFullScreen = () => {
        setExpandedChart(true);
    };

    return (
        <div
            className={`${extended ? "flex justify-between items-center pb-2" : "flex justify-between items-center px-3 pt-3 pb-1"}`}
        >
            <span
                className={`${extended ? "text-lg font-bold" : "font-bold text-[10px] md:text-sm"}`}
            >
                {title}
            </span>
            <div className="flex items-center gap-2">
                {visibleMinimize && (
                    <Button
                        // type="primary"
                        icon={isMinimized ? <PlusOutlined /> : <MinusOutlined />}
                        size="small"
                        onClick={handleMinimize}
                    />
                )}
                {visibleClose && (
                    <Button
                        // type="primary"
                        icon={<CloseOutlined />}
                        size="small"
                        onClick={handleClose}
                    />
                )}

                {visibleFullScreen && (
                    <Button
                        // type="primary"
                        icon={<FullscreenOutlined />}
                        size="small"
                        onClick={handleFullScreen}
                    />
                )}

                {legend && legend}

                {downloadOptions.length > 0 && (
                    <div className="inline-block relative" ref={dropdownRef}>
                        <Button
                            // type="primary"
                            icon={<DownloadOutlined />}
                            size="small"
                            onClick={handleDownloadClick}
                        />
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-24 bg-white border border-zinc-300 rounded shadow-lg z-[999999]">
                                {downloadOptions.map(option => (
                                    <button
                                        key={option}
                                        onClick={() => handleDownloadOptionClick(option)}
                                        className="block px-4 py-2 w-full text-left hover:bg-zinc-100 focus:outline-none"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChartHeader;
