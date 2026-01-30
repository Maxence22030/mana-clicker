let mana = 0;
let manaPerSecond = 0;

const buildings = [
  { name: "Cursor", baseCost: 15, baseMps: 0.1, amount: 0 },
  { name: "Former", baseCost: 100, baseMps: 1, amount: 0 }
];

function cost(b) {
  return Math.floor(b.baseCost * Math.pow(1.15, b.amount));
}

function updateMps() {
  manaPerSecond = buildings.reduce(
    (sum, b) => sum + b.amount * b.baseMps,
    0
  );
}

function updateUI() {
  document.getElementById("mana").textContent = Math.floor(mana);
  document.getElementById("mps").textContent = manaPerSecond.toFixed(1);

  const container = document.getElementById("buildings");
  container.innerHTML = "";

  buildings.forEach((b, i) => {
    const c = cost(b);
    const div = document.createElement("div");

    div.innerHTML = `
      <strong>${b.name}</strong><br>
      Possédés : ${b.amount}<br>
      Coût : ${c}<br>
      <button ${mana < c ? "disabled" : ""} onclick="buy(${i})">
        Acheter
      </button>
    `;
    container.appendChild(div);
  });
}

function buy(i) {
  const b = buildings[i];
  const c = cost(b);
  if (mana >= c) {
    mana -= c;
    b.amount++;
    updateMps();
    updateUI();
  }
}

document.getElementById("click").onclick = () => {
  mana++;
  updateUI();
};

setInterval(() => {
  mana += manaPerSecond;
  updateUI();
}, 1000);

updateUI();
