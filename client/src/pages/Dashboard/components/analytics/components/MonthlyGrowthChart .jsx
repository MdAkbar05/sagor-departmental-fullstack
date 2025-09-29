import React from "react";
import { Line } from "react-chartjs-2";

const MonthlyGrowthChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Growth Percentage",
        data: [5, 10, 15, 20, 18, 25, 30, 35, 40],
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
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
      <h4 className="text-xl font-semibold mb-4">Monthly Growth</h4>
      <Line data={data} options={options} />
    </div>
  );
};

export default MonthlyGrowthChart;
