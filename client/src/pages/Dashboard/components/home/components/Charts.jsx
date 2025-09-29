import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";

const Charts = () => {
  return (
    <div className="w-3/5">
      <Bar
        data={{
          labels: ["Massala", "Soap", "Soyabean", "Washing-powder"],
          datasets: [
            {
              label: "Buy",
              data: [12, 24, 6, 24],
            },
            {
              label: "Sales",
              data: [10, 10, 3, 15],
            },
          ],
        }}
      />
    </div>
  );
};

export default Charts;
