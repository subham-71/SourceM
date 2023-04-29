import React, {useEffect, useState} from "react";
import {Chart} from "react-google-charts";
import axios from "axios";

const options = {
    // sankey: {
    //     node: {
    //         interactivity: true,
    //         label: {
    //             fontName: "Arial",
    //             fontSize: 12,
    //             color: "none",
    //             bold: false,
    //             italic: false,
    //             auraColor: "none",
    //         },
    //     },
    // },
};

export function NewSankey(props) {
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
        let fromCount = new Map();
        flowData.map((item) => {
            let fromTo = [item.parent.split(".").slice(-1)[0] , item.name.split(".").slice(-1)[0] ];
            if ( fromTo[0].startsWith("None") ) return;
            if ( fromTo[0] === fromTo[1] ) return;
            if ( fromCount.has(fromTo[0]) ) {
                if ( fromCount.get(fromTo[0]) > 5 ) return;
                fromCount.set(fromTo[0], fromCount.get(fromTo[0]) + 1);
            } else {
                fromCount.set(fromTo[0], 1);
            }
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
