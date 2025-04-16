const productTypes = ["Mens", "Womens", "Youth", "Childs"];
const sizes = ["XL", "M", "S", "XS"];
const kinds = ["pants", "shirt", "shoes", "socks", "sweater", "belt"];

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateData() {
  const tbody = document.querySelector("tbody");

  for (let i = 1; i <= 25; i++) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${i}</td>
      <td>${productTypes[randomInt(4)]} ${sizes[randomInt(4)]} ${kinds[randomInt(6)]}</td>
      <td>${randomInt(20)}</td>
      <td>${(Math.random() * 80 + 5).toFixed(2)}</td>
    `;

    tbody.appendChild(row);
  }
}

function sortTable(columnIndex, isNumeric, order) {
  const tbody = document.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.sort((a, b) => {
    let valA = a.children[columnIndex].textContent.trim();
    let valB = b.children[columnIndex].textContent.trim();

    if (isNumeric) {
      valA = parseFloat(valA);
      valB = parseFloat(valB);
    }

    if (valA < valB) return -order;
    if (valA > valB) return order;
    return 0;
  });

  tbody.innerHTML = "";
  rows.forEach(row => tbody.appendChild(row));
}

function filterTable() {
  const filters = Array.from(document.querySelectorAll("thead input"));
  const rows = document.querySelectorAll("tbody tr");

  rows.forEach(row => {
    let visible = true;
    filters.forEach((input, colIndex) => {
      const cellText = row.children[colIndex].textContent.toLowerCase();
      const filterValue = input.value.trim().toLowerCase();
      const isNumeric = document.querySelectorAll("thead tr:first-child th")[colIndex].classList.contains("numeric");

      if (filterValue !== "") {
        if (isNumeric) {
          const cellNumber = parseFloat(cellText);
          const filterNumber = parseFloat(filterValue);
          if (isNaN(filterNumber) || cellNumber <= filterNumber) visible = false;
        } else {
          if (!cellText.includes(filterValue)) visible = false;
        }
      }
    });

    row.style.display = visible ? "" : "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  generateData();

  const headers = document.querySelectorAll("thead tr:first-child th");
  headers.forEach((header, index) => {
    let sortOrder = 1; // ascending by default
    header.addEventListener("click", () => {
      const isNumeric = header.classList.contains("numeric");
      sortTable(index, isNumeric, sortOrder);
      sortOrder *= -1; // toggle sort order
    });
  });

  document.querySelectorAll("thead input").forEach(input => {
    input.addEventListener("input", filterTable);
  });
});
