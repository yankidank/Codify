import React from "react";
import {Doughnut} from "react-chartjs-2"

const state= {
    labels: ["Applied", "Rejected", "Interviewed"], 
    datasets: [
        {
           label: "Application Overview", 
            backgroundColor: [
                "#8a0036", 
                "#50247f",
                "#13339b"
            ], 
            data: [160, 56, 16]
        }
    ]
    
  };


function DoughtnutChart(){
    return (
        <div>
        <Doughnut
          data={state}
          options={{
            title:{
              display:true,
              text:'Application Overview',
              fontSize:20, 
            },
            legend:{
              display:true,
              position:'right'
            }, 
            cutoutPercentage: 80,
          }}
        />
      </div>
    )
}

export default DoughtnutChart;
