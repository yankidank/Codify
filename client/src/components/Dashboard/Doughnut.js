import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const state = {
  labels: ['Applied', 'Interviews', 'Offers'],
  datasets: [
    {
      label: 'Application Overview',
      backgroundColor: ['#05ACE1', '#32CEC5', '#2ED47A'],
      data: [160, 56, 16],
    },
  ],
};

function DoughtnutChart() {
  return (
    <div className="col s12 m12 l4">
      <div className="row card-image">
        <div className="col s12 card-title">
          Analytics
        </div>
      </div>
      <div className="card card-padded card-doughnut">
        <div className="offerInputs">
          <Doughnut
            data={state}
            options={{
              title: {
                display: false,
                text: 'Application Overview',
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'top',
              },
              cutoutPercentage: 77,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DoughtnutChart;
