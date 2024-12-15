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
      energyChart.data.datasets[0].data = [result.electricity_usage];
      energyChart.data.datasets[1].data = [result.gas_usage];
      energyChart.data.datasets[2].data = [result.fuel_usage];
      energyChart.update();
    });
}
