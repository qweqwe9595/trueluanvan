import { useEffect, useState } from "react";
import Chart from "chart.js";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import axios from "axios";
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

export default function ChartLine({ name, bg, line1, data }) {
  useEffect(() => {
    let thisMonth = new Date().getMonth();
    let monthData = [];
    for (let i = 0; i < 6; i++) {
      monthData.push(...month.filter((item, index) => index === thisMonth));
      if (thisMonth == 0) {
        thisMonth = 12;
      }
      thisMonth--;
    }
    if (data.length == 0) return;
    var config = {
      type: "line",
      data: {
        labels: monthData.reverse(),
        datasets: [
          {
            label: "Number of user",
            backgroundColor: bg,
            borderColor: bg,
            data: data.reverse(),
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "black",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(17,17,17,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(17,17,17,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [4],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(17, 17, 17, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, [data]);

  return (
    <Card>
      <CardHeader color="pink" contentPosition="left">
        <h6 className="uppercase text-gray-200 text-xs font-medium">
          Overview
        </h6>
        <h2 className="text-white text-2xl">{name}</h2>
      </CardHeader>
      <CardBody>
        <div className="relative h-96">
          <canvas id="line-chart"></canvas>
        </div>
      </CardBody>
    </Card>
  );
}
