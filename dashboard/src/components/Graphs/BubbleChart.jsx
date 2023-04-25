import React, {useEffect, useState} from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

export const options = {
    title: "Execution Count and Time Executed of Functions",
    hAxis: { title: "Execution Count" },
    vAxis: { title: "Average Time Executed"},
    bubble: { textStyle: { color: 'none' } },
    sizeAxis: {
        maxSize: 40,
        minSize: 20,
    },
};

export function BubbleChart(props) {
    const { height, width, appId } = props;
    const [executionData, setExecutionData] = useState(null);
    const [chartData, setChartData] = useState([["Function Name", "Frequency", "Time Executed", "Criticality", ""], ["", 0, 0, "", 0]]);
    const [chartOptions, setChartOptions] = useState(options);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.post(
                    "https://sourcem.onrender.com/exec-time/all-func-exec",
                    {
                        "appId": appId
                    }
                )
                setExecutionData((oldValue) => data);
            } catch ( error ) {
                console.log(error);
            }
        })()
    }, [])

    useEffect(() => {
        if ( executionData == null ) return;
        let maxYValue = -1;
        let maxXValue = -1;
        const newChartData = [["Function Name", "Frequency", "Time Executed", "Criticality", ""]];
        let averageCriticality = 0;
        executionData.forEach((data) => {
            let averageTime = data.executionTime/data.executionCount/1e9;
            averageCriticality += averageTime*data.executionCount;
        })
        averageCriticality /= executionData.length;

        executionData.forEach((data) => {
            let averageTime = data.executionTime/data.executionCount/1e9;
            let criticality = averageTime*data.executionCount;
            let criticalityLevel = criticality/averageCriticality;
            if (criticalityLevel > 1.5) {
                criticalityLevel = "High";
            } else if ( criticalityLevel > 0.8 ) {
                criticalityLevel = "Medium";
            } else criticalityLevel = "Low";

            newChartData.push([data.functionName.split(".").slice(-1)[0], data.executionCount, averageTime, criticalityLevel, averageTime*data.executionCount ]);
            maxYValue = Math.max(maxYValue, data.executionTime/data.executionCount/1e9);
            maxXValue = Math.max(maxXValue, data.executionCount);
        })
        let newOptions = options;
        newOptions['vAxis']['viewWindow'] = {
            min: -1,
            max: maxYValue+3
        }
        newOptions['hAxis']['viewWindow'] = {
            min: 0,
            max: maxXValue+3
        }
        setChartOptions(newOptions);
        setChartData(newChartData);
    }, [executionData])

    return (
        <Chart
            chartType="BubbleChart"
            width={width}
            height={height}
            data={chartData}
            options={chartOptions}
        />
    );
}
