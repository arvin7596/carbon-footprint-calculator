const energyBarChart = document
  .getElementById("energyBarChart")
  .getContext("2d");
new Chart(energyBarChart, {
  type: "bar",
  data: {
    labels: ["Energy Usage"],
    datasets: [
      { label: "Electricity", data: [65], backgroundColor: "#FFD700" },
      { label: "Gas", data: [28], backgroundColor: "#FF5733" },
      { label: "Fuel", data: [35], backgroundColor: "#A0522D" },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      title: { display: true, text: "Energy Bar Chart" },
      tooltip: { mode: "index", intersect: false },
      legend: { position: "top" },
    },
    responsive: true,
    scales: { x: { stacked: false }, y: { stacked: false } },
  },
});

const energyStackedChart = document
  .getElementById("energyStackedChart")
  .getContext("2d");
const myChart = new Chart(energyStackedChart, {
  type: "bar",
  data: {
    labels: ["Energy Usage"],
    datasets: [
      {
        label: "Electricity",
        data: [65],
        backgroundColor: "#FFD700",
      },
      {
        label: "Gas",
        data: [28],
        backgroundColor: "#FF5733",
      },
      {
        label: "Fuel",
        data: [35],
        backgroundColor: "#A0522D",
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Total Energy Used Per Month",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      legend: {
        position: "top",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  },
});
