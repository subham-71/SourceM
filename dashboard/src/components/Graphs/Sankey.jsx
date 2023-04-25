import React, {useEffect, useState} from "react";
import {Chart} from "react-google-charts";
import axios from "axios";

export const options = {};

export function Sankey(props) {
    const { height, width, appId, useWeight } = props;
    const [flowData, setFlowData] = useState(null);
    const [chartData, setChartData] = useState([["From", "To", "Weight"]]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.post(
                    "https://sourcem.onrender.com/funcn-cycle/get-func-cycle",
                    {
                        "appId": appId,
                    }
                )
                setFlowData(data);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    useEffect(() => {
        if ( flowData == null ) return;
        let newChartData = [["From", "To", "Weight"]]
        let flowMap = new Map();
        flowData.map((item) => {
            let fromTo = [item.parent.split(".").slice(-1)[0] + "(" + item.parent_id + ")", item.name.split(".").slice(-1)[0] + "(" + item.call_id + ")"];
            if ( fromTo[0].startsWith("None(-1)") ) return;
            if ( fromTo[0] === fromTo[1] ) return;
            if ( flowMap.has(fromTo) ) {
                if ( useWeight === false ) flowMap.set(fromTo, flowMap.get(fromTo) + 1);
                else flowMap.set(fromTo, flowMap.get(fromTo) + (item.end_time - item.start_time)/1e9);
            } else {
                if ( useWeight === true ) flowMap.set(fromTo, (item.end_time - item.start_time)/1e9);
                else flowMap.set(fromTo, 1);
            }
        })
        for ( let [key, value] of flowMap ) {
            newChartData.push([key[0], key[1], value])
        }
        setChartData(newChartData);
    }, [flowData])

    return (
        <div style={{background: "white"}}>
            <Chart
                chartType="Sankey"
                width={width}
                height={height}
                data={chartData}
                options={options}
            />
        </div>
    );
}
