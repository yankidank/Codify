import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes';
import { Story6 } from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.office';  

function DoughtnutChart({ statusReport, loading }) {

  const data = {
    labels: [],
    datasets: [
      {
        data: [],
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
                    maintainAspectRatio: false,
                    plugins: {
                      colorschemes: {
                        scheme: Story6,
                      },
                    }
                  }}
                />
              ) : (
                <h3>You currently have 0 jobs saved!</h3>
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
  statusReport: PropTypes.string,
  loading: PropTypes.bool,
}

export default DoughtnutChart;
