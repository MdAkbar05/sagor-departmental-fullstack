import React from "react";
import { Pie } from "react-chartjs-2";

const OrdersByRegionChart = () => {
  const data = {
    labels: ["Chittagong", "Dhaka", "Rajhshahi", "Sylhet"],
    datasets: [
      {
        label: "Orders by Division",
        data: [56, 124, 28, 36],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="size-60">
      <Pie data={data} />
    </div>
  );
};

export default OrdersByRegionChart;
