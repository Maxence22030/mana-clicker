let mana = 0;
let manaPerSecond = 0;
let clickPower = 1;

// Tous les bâtiments avec coûts de base et mana/sec
const buildings = [
  { name: "Cursor", baseCost: 15, baseMps: 0.1, amount: 0 },
  { name: "Former", baseCost: 100, baseMps: 1, amount: 0 },
  { name: "Generatino Chain", baseCost: 1100, baseMps: 8, amount: 0 },
  { name: "Mine", baseCost: 12000, baseMps: 47, amount: 0 },
  { name: "Company", baseCost: 130000, baseMps: 260, amount: 0 },
  { name: "Bank", baseCost: 1400000, baseMps: 1400, amount: 0 },
  { name: "Sanctuary", baseCost: 20000000, baseMps: 7800, amount: 0 },
  { name: "Celestial Tower", baseCost: 330000000, baseMps: 44000, amount: 0 },
  { name: "Conquest", baseCost: 5100000000, baseMps: 260000, amount: 0 },
  { name: "Laboratory", baseCost: 75000000000, baseMps: 1600000, amount: 0 },
  { name: "Fault", baseCost: 1e12, baseMps: 10000000, amount: 0 },
  { name: "Interdimensional Gun", baseCost: 1.4e13, baseMps: 65000000, amount: 0 },
  { name: "Condenser of dark energy", baseCost: 1.7e14, baseMps: 430000000, amount: 0 },
  { name: "Crystal", baseCost: 2.1e15, baseMps: 2900000000, amount: 0 },
  { name: "Clover", baseCost: 2.6e16, baseMps: 21000000000, amount: 0 },
  { name: "Fractal Engine", baseCost: 3.1e17, baseMps: 150000000000, amount: 0 },
  { name: "Source Code", baseCost: 7.1e19, baseMps: 1.1e12, amount: 0 },
  { name: "Multiverse", baseCost: 1.2e22, baseMps: 8.3e12, amount: 0 },
  { name: "Knowledge", baseCost: 1.9e24, baseMps: 6.4e13, amount: 0 },
  { name: "Omniscience", baseCost: 5.4e26, baseMps: 5.1e14, amount: 0 }
];

// Fonction pour calculer le coût actuel d’un bâtiment
function getCost(b) {
  return Math.floor(b.baseCost * Math.pow(1.15, b.amount));
}

// Mettre à jour le mana/sec total
function updateMps() {
  manaPerSecond = buildings.reduce((sum, b) => sum + b.amount * b.baseMps, 0);
}

// Mettre à jour l’UI (mana, mana/sec, boutons)
function updateUI() {
  document.getElementById("mana").textContent = Math.floor(mana);
  document.getElementById("mps").textContent = manaPerSecond.toFixed(1);

  const container = document.getElementById("buildings");
  container.innerHTML = "";

  buildings.forEach((b, i) => {
    const cost = getCost(b);
    const div = document.createElement("div");
    div.className = "building";

    div.innerHTML = `
      <strong>${b.name}</strong><br>
      Possédés : ${b.amount}<br>
      Coût : ${cost}<br>
      <button ${mana < cost ? "disabled" : ""} onclick="buyBuilding(${i})">
        Acheter
      </button>
    `;
    container.appendChild(div);
  });
}

// Acheter un bâtiment
function buyBuilding(index) {
  const b = buildings[index];
  const cost = getCost(b);
  if (mana >= cost) {
    mana -= cost;
    b.amount++;
    updateMps();
    updateUI();
  }
}

// Clic manuel
document.getElementById("click").onclick = () => {
  mana += clickPower;
  updateUI();
};

// Génération automatique toutes les secondes
setInterval(() => {
  mana += manaPerSecond;
  updateUI();
}, 1000);

// Initialisation de l’UI
updateUI();
