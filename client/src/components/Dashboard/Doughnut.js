import React from "react";
import {Doughnut} from "react-chartjs-2"

const state= {
    labels: ["Applied", "Interviews", "Offers"], 
    datasets: [
        {
           label: "Application Overview", 
            backgroundColor: [
                "#05ACE1", 
                "#32CEC5",
                "#2ED47A"
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
                position:'bottom'
              }, 
              cutoutPercentage: 80,
            }}
          />
        </div>
      </div>
    )
}

export default DoughtnutChart;
