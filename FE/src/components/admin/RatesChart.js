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

function RatesChart({ data = [], name = "default" }) {
  useEffect(() => {
    if (data.length === 0) {
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

    let config = {
      type: "bar",
      data: {
        labels: monthData.reverse(),
        datasets: [
          {
            label: name,
            backgroundColor: "red",
            borderColor: "red",
            data: data,
            fill: false,
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
    window.myRatesChart = new Chart(ctx, config);
  }, [data]);
  return (
    <Card>
      <CardHeader color="red" contentPosition="left">
        <h6 className="uppercase text-gray-200 text-xs font-medium">{name}</h6>
        <h2 className="text-white text-2xl">Avarage of 6 month lately</h2>
      </CardHeader>
      <CardBody>
        <div className="relative h-96">
          <canvas id="bar-chart"></canvas>
        </div>
      </CardBody>
    </Card>
  );
}

export default RatesChart;
