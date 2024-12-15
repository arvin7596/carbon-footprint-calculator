// const energy = JSON.parse(localStorage.getItem("energy_calculated"));

//-------------- Energy Usage Charts ------------------------

// ----Bar Chart----
const energyBarChart = document
  .getElementById("energyBarChart")
  .getContext("2d");
const energyChart = new Chart(energyBarChart, {
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

const energyStackedChart = document
  .getElementById("energyStackedChart")
  .getContext("2d");
new Chart(energyStackedChart, {
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
const wasteBarChart = document.getElementById("wasteBarChart").getContext("2d");
new Chart(wasteBarChart, {
  type: "bar",
  data: {
    labels: ["Waste"],
    datasets: [
      { label: "Waste", data: [65], backgroundColor: "#0384ff" },
      { label: "Recycled/Composted", data: [28], backgroundColor: "#007726" },
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

// ----Stacked Chart----

const wastePieChart = document.getElementById("wastePieChart").getContext("2d");
new Chart(wastePieChart, {
  type: "pie",
  data: {
    labels: ["Waste", "Recycled/Composted"],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#0384ff", "#007726"],
        // borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    plugins: {
      title: { display: true, text: "Waste vs Recycle" },
      tooltip: { mode: "index", intersect: false },
      legend: { position: "top" },
    },
    responsive: true,
  },
});
