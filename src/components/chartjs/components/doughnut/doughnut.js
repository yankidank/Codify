import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

function DoughtnutChart({ statusReport, loading }) {
  const data = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#646979",
          "#059ae1",
          "#02d4d4",
          "#0ac577",
          "#9094a065"
        ]
      },
    ],
  };
  statusReport.forEach(({ status, count }) => {
    if (status) {
      data.labels.push(status);
      data.datasets[0].data.push(count);
    }
  });

  return (
    <div className="col s12 m12 l4">
      <div className="row card-image">
        <div className="col s12 card-title">Analytics</div>
      </div>
      <div className="card card-padded card-doughnut">
        <div className="offerInputs">
          {!loading ? (
            <div>
              {data.labels.length ? (
                <Doughnut
                  data={data}
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
                    maintainAspectRatio: false
                  }}
                />
              ) : (
                <p className="center">You haven&apos;t acted on any jobs yet!</p>
              )}
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

DoughtnutChart.propTypes = {
  statusReport: PropTypes.array,
  loading: PropTypes.bool,
};

export default DoughtnutChart;
