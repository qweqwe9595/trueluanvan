import { useEffect } from "react";
import Chart from "chart.js";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
const month = [
  `Jan1`,
  `Feb2`,
  `Mar3`,
  `Apr4`,
  `May5`,
  `June6`,
  `July7`,
  `Aug8`,
  `Sep9`,
  `Oct10`,
  `Nov11`,
  `Dec12`,
];

export default function ChartBar({ data1, data2, data1Name, data2Name }) {
  useEffect(() => {
    if (data1.length === 0 || data2.length === 0) {
      return;
    }
    let thisMonth = new Date().getMonth();
    let monthData = [];
    for (let i = 0; i < 6; i++) {
      monthData.push(...month.filter((item, index) => index === thisMonth));
      if (thisMonth == 0) {
        thisMonth = 12;
      }
      thisMonth--;
    }

    const temp1 = data1.reverse();
    const temp2 = data2.reverse();
    let config = {
      type: "bar",
      data: {
        labels: monthData.reverse(),
        datasets: [
          {
            label: data1Name,
            backgroundColor: "#110E30",
            borderColor: "#110E30",
            data: temp1,
            fill: false,
            barThickness: 10,
          },
          {
            label: data2Name,
            fill: false,
            backgroundColor: "#f44336",
            borderColor: "#f44336",
            data: temp2,
            barThickness: 10,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },

        legend: {
          labels: {
            fontColor: "rgba(17,17,17,.7)",
          },
          align: "end",
          position: "bottom",
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, [data1, data2]);
  return (
    <Card>
      <CardHeader color="red" contentPosition="left">
        <h6 className="uppercase text-gray-200 text-xs font-medium">
          Overview
        </h6>
        <h2 className="text-white text-2xl">Sales value</h2>
      </CardHeader>
      <CardBody>
        <div className="relative h-96">
          <canvas id="bar-chart"></canvas>
        </div>
      </CardBody>
    </Card>
  );
}
