import React, {useEffect, useState} from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

export const data = [
    [
        "Day",
        "Guardians of the Galaxy",
        "The Avengers",
        "Transformers: Age of Extinction",
    ],
    [1, 37.8, 80.8, 41.8],
    [2, 30.9, 69.5, 32.4],
    [3, 25.4, 57, 25.7],
    [4, 11.7, 18.8, 10.5],
    [5, 11.9, 17.6, 10.4],
    [6, 8.8, 13.6, 7.7],
    [7, 7.6, 12.3, 9.6],
    [8, 12.3, 29.2, 10.6],
    [9, 16.9, 42.9, 14.8],
    [10, 12.8, 30.9, 11.6],
    [11, 5.3, 7.9, 4.7],
    [12, 6.6, 8.4, 5.2],
    [13, 4.8, 6.3, 3.6],
    [14, 4.2, 6.2, 3.4],
];

export const options = {
    title: 'Error Frequencies by Duration',
    curveType: 'function',
    series: {
        0: { pointShape: 'square' }
    },
    pointSize: 10,
    emphasis:true
};

export function LineChart(props) {
    const { height, width, appId, functionId } = props;
    const [exceptionData, setExceptionData] = useState(null);
    const [chartData, setChartData] = useState([[]]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.post(
                    "https://sourcem.onrender.com/exception-throw/all-func-exception",
                    {
                        "appId": appId,
                        "functionId": functionId
                    }
                )
                setExceptionData(data);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    useEffect(() => {
        if ( exceptionData === null || exceptionData.length === 0 ) return;
        let newChartData = [];
        newChartData.push(["Time"])

        let minimumTime = new Date(exceptionData[0].timestamps[0]);
        let maximumTime = new Date(exceptionData[0].timestamps[exceptionData[0].timestamps.length - 1]);

        exceptionData.map((item) => {
            newChartData[0].push(item.exceptionName);
            for (let i=0; i<item.timestamps.length; i++) {
                let time = new Date(item.timestamps[i]);
                if ( time < minimumTime ) minimumTime = time;
                if ( time > maximumTime ) maximumTime = time;
            }
        });
 
        let startingTime = minimumTime;
        while ( startingTime <= maximumTime ) {
            startingTime = new Date(startingTime.getTime() + 1000 * 60 * 20);
            let row = [newChartData.length];
            newChartData.push(row);
        }

        exceptionData.map((item) => {
            for (let i=1; i<newChartData.length; i++) {
                newChartData[i].push(0);
            }
            for (let i=0; i<item.timestamps.length; i++) {
                let time = new Date(item.timestamps[i]);
                let index = Math.floor((time - minimumTime) / (1000 * 60 * 20)) + 1;
                newChartData[index][newChartData[index].length - 1] += 1;
            }
        })

        setChartData(newChartData);
    }, [exceptionData])

    if (chartData.length<2) {
    return <div class ="mt-20 font-mono mb-20 text-red-400 items-center justify-center font-extrabold flex flex-wrap"> No exception calls history </div> ; 
    }
  return <Chart
        chartType="Line"
        width={width}
        height={height}
        data={chartData}
        options={options}
    />;
 
}
