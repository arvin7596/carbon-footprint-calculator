function submitEnergy() {
  const data = {
    electricity: Number(document.getElementById("electricity").value),
    gas: Number(document.getElementById("gas").value),
    fuel: Number(document.getElementById("fuel").value),
  };
  fetch("http://127.0.0.1:5000/calculate-energy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => {
      energyConsumptionChart.data.datasets[0].data = [result.electricity_usage];
      energyConsumptionChart.data.datasets[1].data = [result.gas_usage];
      energyConsumptionChart.data.datasets[2].data = [result.fuel_usage];
      energyConsumptionChart.update();
      totalEnergyConsumptionChart.data.datasets[0].data = [
        result.electricity_usage,
      ];
      totalEnergyConsumptionChart.data.datasets[1].data = [result.gas_usage];
      totalEnergyConsumptionChart.data.datasets[2].data = [result.fuel_usage];
      totalEnergyConsumptionChart.update();
    });
}

function submitWaste() {
  const data = {
    waste: Number(document.getElementById("waste-generated").value),
    recycle: Number(document.getElementById("recycle").value),
  };
  fetch("http://127.0.0.1:5000/calculate-waste", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);

      wasteRecycleChart.data.datasets[0].data = [result.waste_generated];
      wasteRecycleChart.data.datasets[1].data = [result.waste_recycled];
      wasteRecycleChart.update();
      remainedWasteChart.data.datasets[0].data = [result.waste_remained];
      remainedWasteChart.update();
    });
}

function submitTravel() {
  const data = {
    traveled: Number(document.getElementById("kilometers-traveled").value),
    vehicles: Number(document.getElementById("vehicles-fuel").value),
  };
  fetch("http://127.0.0.1:5000/calculate-travel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => {
      travelEmissionChart.data.datasets[0].data = [
        result.business_travel_emission,
      ];
      travelEmissionChart.update();
    });
}

function getReportData() {
  fetch("http://127.0.0.1:5000/get_report_data", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((result) => {
      totalEmissionChart.data.datasets[0].data = [
        result.electricity_emission,
        result.gas_emission,
        result.fuel_emission,
        result.waste_emission,
        result.business_travel_emission,
      ];
      totalEmissionChart.update();
      document.getElementById("electricity-table").textContent =
        result.electricity_emission;
      document.getElementById("gas-table").textContent = result.gas_emission;
      document.getElementById("fuel-table").textContent = result.fuel_emission;
      document.getElementById("waste-table").textContent =
        result.waste_emission;
      document.getElementById("travel-table").textContent =
        result.business_travel_emission;
      document.getElementById("total-table").textContent =
        result.total_emission;
    });
}

function init() {
  fetch("http://127.0.0.1:5000/init");
}
window.onload = init;

function createPDF() {
  fetch("http://127.0.0.1:5000/generate_pdf")
    .then((response) => {
      if (response.ok) {
        return response.blob();
      }
      throw new Error("Failed to generate PDF");
    })
    .then((blob) => {
      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "carbon_footprint_report.pdf"; // Set the file name
      link.click(); // Trigger the download
    })
    .catch((error) => console.error("Error:", error));
}
