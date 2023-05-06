import React, {useEffect, useState} from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

export const data = [
    ["City", "2010 Population", "2000 Population"],
    ["New York City, NY", 8175000, 8008000],
    ["Los Angeles, CA", 3792000, 3694000],
    ["Chicago, IL", 2695000, 2896000],
    ["Houston, TX", 2099000, 1953000],
    ["Philadelphia, PA", 1526000, 1517000],
];

export const options = {
    chartArea: { width: "50%" },
    legend: { position: "none" },
    hAxis: {
        title: "Exceptions",
        minValue: 0,
    },
    vAxis: {
        title: "Frequency",
    },
};

export function BarChart(props) {
    const { height, width, appId } = props;
    const [exceptionData, setExceptionData] = useState(null);
    const [chartData, setChartData] = useState(["Exception"]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.post(
                    "https://sourcem.onrender.com/exception-throw/all-func-all-exception",
                    {
                        "appId": appId
                    }
                )
                setExceptionData(data);
            } catch (error) {
                    (error);
            }
        })()
    }, [])

    useEffect(() => {
        if ( exceptionData == null ) return;
        const dataMap = new Map();
        for ( let i=0; i<exceptionData.length; i++ ) {
            if ( dataMap.has(exceptionData[i]["exceptionName"]) ) {
                dataMap.set(exceptionData[i]["exceptionName"], dataMap.get(exceptionData[i]["exceptionName"]) + exceptionData[i]["timestamps"].length);
            } else {
                dataMap.set(exceptionData[i]["exceptionName"], exceptionData[i]["timestamps"].length);
            }
        }
        const tempData = [["Exception", ""]];
        for ( let [key, value] of dataMap ) {
            tempData.push([key, value]);
        }
        setChartData(tempData);
    }, [exceptionData])

    return (
        <>{chartData.length > 1 && <Chart chartType="ColumnChart" width={width} height={height} data={chartData} options={options} />}</>
    );
}
