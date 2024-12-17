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
