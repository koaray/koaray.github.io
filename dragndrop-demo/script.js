// Multi-selected items in the bucket
let selectedItems = [];

// occupantMap: key="court-time", value=<DOM item element>
let occupantMap = {};

// SHIFT+click logic for multi-selection in bucket
const bucketList = document.getElementById("bucketList");
bucketList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  if (e.shiftKey) {
    // Toggle selection
    if (selectedItems.includes(li)) {
      li.classList.remove("selected");
      selectedItems = selectedItems.filter((el) => el !== li);
    } else {
      li.classList.add("selected");
      selectedItems.push(li);
    }
  } else {
    // Normal click: clear existing selection, select only this item
    selectedItems.forEach((el) => el.classList.remove("selected"));
    selectedItems = [li];
    li.classList.add("selected");
  }
});

// Drag from bucket <li> (draggable="true")
bucketList.addEventListener("dragstart", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  // If li isn't in selectedItems, user wants only this item
  if (!selectedItems.includes(li)) {
    selectedItems.forEach((el) => el.classList.remove("selected"));
    selectedItems = [li];
    li.classList.add("selected");
  }
  // Hide default drag image
  e.dataTransfer.setDragImage(document.createElement("img"), 0, 0);
});

// The grid
const grid = document.getElementById("grid");
const cells = grid.querySelectorAll(".cell");

// Let each cell accept drops
cells.forEach((cell) => {
  cell.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  cell.addEventListener("drop", (e) => {
    e.preventDefault();
    // If we have selected items from the bucket
    if (selectedItems.length > 0) {
      const occupant = occupantMap[getCellKey(cell)];
      if (occupant) {
        shiftOccupant(occupant, cell);
      }
      placeItemsInCell(selectedItems, cell);
    } else {
      // Possibly dragging from grid => grid
      const itemId = e.dataTransfer.getData("text/plain");
      if (itemId) {
        const itemDiv = document.querySelector(`.item[data-id="${itemId}"]`);
        if (itemDiv) {
          // remove occupant from old cell
          const oldCellKey = itemDiv.dataset.cellKey;
          if (occupantMap[oldCellKey] === itemDiv) {
            occupantMap[oldCellKey] = null;
            const oldCell = grid.querySelector(`[data-court="${itemDiv.dataset.court}"][data-time="${itemDiv.dataset.time}"]`);
            if (oldCell) oldCell.classList.remove("occupied");
          }
          const occupant = occupantMap[getCellKey(cell)];
          if (occupant) {
            shiftOccupant(occupant, cell);
          }
          attachItemToCell(itemDiv, cell);
        }
      }
    }
  });
});

// If we drag from grid, store itemId in dataTransfer
grid.addEventListener("dragstart", (e) => {
  const itemDiv = e.target.closest(".item");
  if (itemDiv) {
    e.dataTransfer.setData("text/plain", itemDiv.dataset.id);
    e.dataTransfer.setDragImage(document.createElement("img"), 0, 0);
  }
});

/* Place multiple items into a cell, shifting occupant if needed */
function placeItemsInCell(items, cell) {
  for (let i = 0; i < items.length; i++) {
    let occupant = occupantMap[getCellKey(cell)];
    if (occupant) {
      shiftOccupant(occupant, cell);
    }
    attachItemToCell(items[i], cell);
  }
  // remove them from the bucket + reset selection
  selectedItems.forEach((li) => {
    if (li.parentNode === bucketList) {
      li.remove();
    }
    li.classList.remove("selected");
  });
  selectedItems = [];
}

/* Shift occupant from one cell to the next (reading order) */
function shiftOccupant(occupant, fromCell) {
  const cellsArr = Array.from(cells);
  let index = cellsArr.indexOf(fromCell);
  if (index === -1) return;

  let nextIndex = index + 1;
  if (nextIndex >= cellsArr.length) {
    // no place to shift => remove occupant or handle as needed
    occupant.remove();
    occupantMap[getCellKey(fromCell)] = null;
    fromCell.classList.remove("occupied");
    return;
  }

  const nextCell = cellsArr[nextIndex];
  const occupant2 = occupantMap[getCellKey(nextCell)];
  if (occupant2) {
    shiftOccupant(occupant2, nextCell);
  }
  attachItemToCell(occupant, nextCell);
  occupantMap[getCellKey(fromCell)] = null;
  fromCell.classList.remove("occupied");
}

/* Attach a single item to a cell (convert <li> to <div class="item"> if needed) */
function attachItemToCell(item, cell) {
  if (item.tagName === "LI") {
    const div = document.createElement("div");
    div.classList.add("item");
    div.draggable = true;
    div.innerText = item.innerText;
    div.dataset.id = item.dataset.id;
    item = div;
  }

  occupantMap[getCellKey(cell)] = item;
  cell.classList.add("occupied");

  item.dataset.court = cell.getAttribute("data-court");
  item.dataset.time = cell.getAttribute("data-time");
  item.dataset.cellKey = getCellKey(cell);

  cell.appendChild(item);
  // position inside cell
  item.style.top = "5px";
  item.style.left = "5px";
}

function getCellKey(cell) {
  const c = cell.getAttribute("data-court");
  const t = cell.getAttribute("data-time");
  return c + "-" + t;
}

/* Print occupant => cell assignment mapping in console */
function printAssignments() {
  const result = {};
  for (let key in occupantMap) {
    if (occupantMap[key]) {
      const it = occupantMap[key];
      result[it.dataset.id] = {
        court: it.dataset.court,
        time: it.dataset.time
      };
    }
  }
  console.log("Assignments:", result);
  alert("Check console for item assignments!");
}
