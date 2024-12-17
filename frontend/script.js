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
