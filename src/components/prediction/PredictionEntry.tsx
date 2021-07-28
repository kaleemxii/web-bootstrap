import React from "react";
import "./PredictionEntry.css";
var labelFrameCounts: { [id: string] : number; } = {};
var labelCounts: { [id: string] : number; } = {};
var lastLabel:string;
type PredictionEntryProps = {
    label: string
    confidence?: number
    top?: boolean
}

function PredictionEntry({label, confidence, top}: PredictionEntryProps) {
    // render the predicted label and a bar representing the confidence value
    // make the top confidence value green
    if(top && !!confidence && confidence > 0.5 && label!='None'){
        var count = labelFrameCounts[label] = (labelFrameCounts[label] || 0) + 1;
        var maxCount = Object.entries(labelFrameCounts).filter(a => a[0] != label).reduce((a, b) => a[1] > b[1] ? a : b , ['', 0])[1]
        if(count - maxCount > 8){
            labelFrameCounts = {};
            if(lastLabel != label) {
                labelCounts[label] = (labelCounts[label] || 0) + 1;
                lastLabel = label;
            }
        }
    }
    return (
        <div key={label} className="prediction-entry">
            {label + (labelCounts[label] ? '->' : '') + (labelCounts[label] || '') }
            {!!confidence ?
                <div
                    className={"prediction-bar" + (top ? " prediction-green" : "")}
                    style={{width: (confidence*100).toString() + "%"}}
                />
            : null}
        </div>
    );
}

export default PredictionEntry;
