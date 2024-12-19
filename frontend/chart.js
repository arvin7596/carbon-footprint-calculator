//-------------- Energy Usage Charts ------------------------

// ----Bar Chart----
const energyChartElement = document
  .getElementById("energy-chart-element")
  .getContext("2d");
const energyConsumptionChart = new Chart(energyChartElement, {
  type: "bar",
  data: {
    labels: ["Energy Category"],
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
      title: { display: true, text: "Energy Usage Per Year (kgCO2)" },
      tooltip: { mode: "index", intersect: false },
      legend: { position: "top" },
    },
    responsive: true,
    scales: { x: { stacked: false }, y: { stacked: false } },
  },
});

// ----Stacked Chart----

const totalEnergyChartElement = document
  .getElementById("total-energy-chart-element")
  .getContext("2d");
const totalEnergyConsumptionChart = new Chart(totalEnergyChartElement, {
  type: "bar",
  data: {
    labels: ["Total Energy Usage"],
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
        text: "Total Emission Per Year (kgCO2)",
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
  .getElementById("waste-recycle-chart-element")
  .getContext("2d");
const wasteRecycleChart = new Chart(wasteRecycledChartElement, {
  type: "bar",
  data: {
    labels: ["Categories"],
    datasets: [
      { label: "Waste", data: [0], backgroundColor: "#0384ff" },
      { label: "Recycled/Composted", data: [0], backgroundColor: "#007726" },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Waste Generated And Recycled Per Year (kgCO2)",
      },
      tooltip: { mode: "index", intersect: false },
      legend: { position: "top" },
    },
    responsive: true,
    scales: { x: { stacked: false }, y: { stacked: false } },
  },
});

// ----Bar Chart----

const remainedWasteChartElement = document
  .getElementById("remained-waste-chart-element")
  .getContext("2d");
const remainedWasteChart = new Chart(remainedWasteChartElement, {
  type: "bar",
  data: {
    labels: ["Waste"],
    datasets: [{ label: "Waste", data: [0], backgroundColor: "#0188ff" }],
  },
  options: {
    responsive: true,
    plugins: {
      title: { display: true, text: "Waste Emission Per Year (kgCO2)" },
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
  .getElementById("travel-emission-chart-element")
  .getContext("2d");
const travelEmissionChart = new Chart(travelEmissionChartElement, {
  type: "bar",
  data: {
    labels: ["Travel"],
    datasets: [
      { label: "Business Travel", data: [0], backgroundColor: "#c3c3c3" },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Business Travel Emission Per Year (kgCO2)",
      },
      tooltip: { mode: "index", intersect: false },
      legend: { position: "top" },
    },
    responsive: true,
    scales: { x: { stacked: false }, y: { stacked: false } },
  },
});

//----------------------------- Total Emission Charts -----------------------------

const totalEmissionChartElement = document
  .getElementById("total-emission-chart-element")
  .getContext("2d");
const data = {
  labels: ["Electricity", "Gas", "Fuel", "Waste", "Business Travel"],
  datasets: [
    {
      data: [0, 0, 0, 0, 0],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    title: {
      display: true,
      text: "Total Emission(kgCO2)",
    },
    legend: {
      position: "right",
    },
  },
  responsive: true,
};

const totalEmissionChart = new Chart(totalEmissionChartElement, {
  type: "pie",
  data: data,
  options: options,
});
