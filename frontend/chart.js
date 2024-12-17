//-------------- Energy Usage Charts ------------------------

// ----Bar Chart----
const energyBarChartElement = document
  .getElementById("energyBarChart")
  .getContext("2d");
const energyConsumptionChart = new Chart(energyBarChartElement, {
  type: "bar",
  data: {
    labels: ["Energy Usage"],
    datasets: [
      {
        label: "Electricity",
        data: [0],
        backgroundColor: "#FFD700",
      },
      {
        label: "Gas",
        data: [0],
        backgroundColor: "#FF5733",
      },
      {
        label: "Fuel",
        data: [0],
        backgroundColor: "#A0522D",
      },
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

// ----Stacked Chart----

const energyStackedChartElement = document
  .getElementById("energyStackedChart")
  .getContext("2d");
const totalEnergyConsumptionChart = new Chart(energyStackedChartElement, {
  type: "bar",
  data: {
    labels: ["Energy Usage"],
    datasets: [
      {
        label: "Electricity",
        data: [0],
        backgroundColor: "#FFD700",
      },
      {
        label: "Gas",
        data: [0],
        backgroundColor: "#FF5733",
      },
      {
        label: "Fuel",
        data: [0],
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

//----------------------------- Waste Charts -----------------------------

// ----Bar Chart----
const wasteRecycledChartElement = document
  .getElementById("wasteRecycledChartElement")
  .getContext("2d");
const wasteRecycleChart = new Chart(wasteRecycledChartElement, {
  type: "bar",
  data: {
    labels: ["Waste"],
    datasets: [
      { label: "Waste", data: [0], backgroundColor: "#0384ff" },
      { label: "Recycled/Composted", data: [0], backgroundColor: "#007726" },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      title: { display: true, text: "Waste" },
      tooltip: { mode: "index", intersect: false },
      legend: { position: "top" },
    },
    responsive: true,
    scales: { x: { stacked: false }, y: { stacked: false } },
  },
});

// ----Bar Chart----

const remainedWasteChartElement = document
  .getElementById("remainedWasteChartElement")
  .getContext("2d");
const remainedWasteChart = new Chart(remainedWasteChartElement, {
  type: "bar",
  data: {
    labels: ["Waste"],
    datasets: [{ label: "Waste", data: [0], backgroundColor: "#0384ff" }],
  },
  options: {
    responsive: true,
    plugins: {
      title: { display: true, text: "Waste" },
      tooltip: { mode: "index", intersect: false },
      legend: { position: "top" },
    },
    responsive: true,
    scales: { x: { stacked: false }, y: { stacked: false } },
  },
});

//----------------------------- Travel Charts -----------------------------

// ----Bar Chart----

const travelEmissionChartElement = document
  .getElementById("travelEmissionChartElement")
  .getContext("2d");
const travelEmissionChart = new Chart(remainedWasteChartElement, {
  type: "bar",
  data: {
    labels: ["Travel"],
    datasets: [{ label: "Travel", data: [0], backgroundColor: "#c3c3c3" }],
  },
  options: {
    responsive: true,
    plugins: {
      title: { display: true, text: "Travel" },
      tooltip: { mode: "index", intersect: false },
      legend: { position: "top" },
    },
    responsive: true,
    scales: { x: { stacked: false }, y: { stacked: false } },
  },
});

//----------------------------- Total Emission Charts -----------------------------

// const wastePieChart = document.getElementById("wastePieChart").getContext("2d");
// new Chart(wastePieChart, {
//   type: "pie",
//   data: {
//     labels: ["Waste", "Recycled/Composted"],
//     datasets: [
//       {
//         data: [60, 40],
//         backgroundColor: ["#0384ff", "#007726"],
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     plugins: {
//       title: { display: true, text: "Waste vs Recycle" },
//       tooltip: { mode: "index", intersect: false },
//       legend: { position: "top" },
//     },
//     responsive: true,
//   },
// });
