import React, {useEffect, useState} from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

export const options = {
    chartArea: { width: "50%" },
    legend: { position: "none" },
    hAxis: {
        title: "Exceptions",
        minValue: 0,
        // slantedText: true,
        // slantedTextAngle: 45,
    },
    vAxis: {
        title: "Frequency",
    },
    bar: {
        groupWidth: "20%",
    }
};

export function NewBarChart(props) {
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
                console.log(error);
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
        const tempData = [["Exception", "Frequency", { role: "style" }]];
        let itr = 0;
        for ( let [key, value] of dataMap ) {
            if ( itr === 0 ) tempData.push([key, value, "red"]);
            else tempData.push([key, value, "blue"]);
            itr++;
        }
        setChartData(tempData);
    }, [exceptionData])

    return (
        <>{chartData.length > 1 && <Chart chartType="ColumnChart" width={width} height={height} data={chartData} options={options} />}</>
    );
}
