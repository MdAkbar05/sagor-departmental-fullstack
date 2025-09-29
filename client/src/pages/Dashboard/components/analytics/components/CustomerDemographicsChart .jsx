import React from "react";
import { Bar } from "react-chartjs-2";

const CustomerDemographicsChart = () => {
  const data = {
    labels: ["18-25", "26-35", "36-45", "46-55", "56+"],
    datasets: [
      {
        label: "Customer Age Groups",
        data: [120, 180, 150, 90, 60],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h4 className="text-xl font-semibold mb-4">Customer Demographics</h4>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CustomerDemographicsChart;
