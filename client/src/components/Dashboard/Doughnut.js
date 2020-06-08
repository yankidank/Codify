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
      <div className="col s12 m12 l4">
        <div className="card doughtnutChart">
          <div className="card-image">
            <span className="card-title">Analytics</span>
          </div>
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
      </div>
    )
}

export default DoughtnutChart;
