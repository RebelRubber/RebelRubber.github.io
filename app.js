// JavaScript logic, now with localStorage persistence!
const pageAccessPassword = "RT9k#mP2$vL8@qX3";
let isPageUnlocked = false;
let isAdminLoggedIn = false;
const adminPassword = "Drezden3!";

// Tire spec arrays
const commonWidths = [185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315, 325, 335];
const commonAspectRatios = [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
const commonDiameters = [14, 15, 16, 17, 18, 19, 20, 21, 22, 24];
const topBrands = ['Michelin', 'Goodyear', 'Bridgestone', 'Continental', 'Pirelli', 'BF Goodrich', 'Cooper', 'Firestone', 'General', 'Hankook', 'Kumho', 'Nitto', 'Toyo', 'Yokohama', 'Falken', 'Nexen', 'Mastercraft', 'Arroyo'];
const commonModels = ['All Season', 'Summer Performance', 'Winter/Snow', 'All Terrain', 'Mud Terrain', 'Highway', 'Touring', 'Sport', 'Ultra High Performance', 'Run Flat', 'Eco/Fuel Efficient'];

// Original and new tires
const originalTires = [
    {width: 32, height: 11.5, diameter: 15, brand: "BFGOODRICH", style: "ALL TERRAIN T/A BAJA CHAMPION"},
    {width: 285, height: 75, diameter: 17, brand: "BFGOODRICH", style: "ALL TERRAIN T/A BAJA CHAMPION"},
    {width: 245, height: 70, diameter: 17, brand: "HANKOOK", style: "DYNAPRO MTM"},
    {width: 235, height: 45, diameter: 17, brand: "MASTERCRAFT", style: "GLACIER GRIP II"},
    {width: 235, height: 95, diameter: 17, brand: "NEXEN", style: "N7000 PLUS"},
    {width: 255, height: 35, diameter: 18, brand: "MICHELIN", style: "PILOT SUPER SPORT"},
    {width: 255, height: 35, diameter: 18, brand: "MICHELIN", style: "PILOT SUPER SPORT"},
    {width: 255, height: 35, diameter: 18, brand: "PIRELLI", style: "SOTTO ZERO"},
    {width: 255, height: 70, diameter: 18, brand: "NITTO", style: "CROSSTEK"},
    {width: 275, height: 65, diameter: 18, brand: "GOODYEAR", style: "WRANGLER"},
    {width: 255, height: 70, diameter: 18, brand: "GOODYEAR", style: "WRANGLER"},
    {width: 275, height: 65, diameter: 18, brand: "MICHELIN", style: "PRIMACY"},
    {width: 235, height: 40, diameter: 19, brand: "CONTINENTAL", style: "CONTI PRO CONTACT"},
    {width: 265, height: 35, diameter: 19, brand: "PIRELLI", style: "SOTTO ZERO (WINTER SERIE II)"},
    {width: 265, height: 55, diameter: 19, brand: "MICHELIN", style: "PILOT SUPER SPORT"},
    {width: 295, height: 35, diameter: 19, brand: "MICHELIN", style: "PILOT SUPER SPORT"},
    {width: 265, height: 50, diameter: 19, brand: "PIRELLI", style: "SCORPION VERDE (ALL SEASON)"},
    {width: 235, height: 35, diameter: 20, brand: "MICHELIN", style: "PILOT SUPER SPORT"},
    {width: 245, height: 40, diameter: 20, brand: "GOODYEAR", style: "EAGLE F1"},
    {width: 255, height: 60, diameter: 20, brand: "COOPER", style: "DISCOVERY AT3 XLT"},
    {width: 275, height: 35, diameter: 20, brand: "GOODYEAR", style: "EAGLE F1"},
    {width: 275, height: 40, diameter: 20, brand: "ARROYO", style: "GRAND SPORT A/S"},
    {width: 275, height: 55, diameter: 20, brand: "BF GOODRICH", style: "ALL TERRAIN T/A BAJA CHAMPION"},
    {width: 275, height: 55, diameter: 20, brand: "BF GOODRICH", style: "ALL TERRAIN T/A BAJA CHAMPION"},
    {width: 275, height: 55, diameter: 20, brand: "BF GOODRICH", style: "ALL TERRAIN T/A BAJA CHAMPION"},
    {width: 275, height: 55, diameter: 20, brand: "BF GOODRICH", style: "ALL TERRAIN T/A BAJA CHAMPION"},
    {width: 275, height: 55, diameter: 20, brand: "GOODYEAR", style: "WRANGLER DURATRAC"},
    {width: 275, height: 55, diameter: 20, brand: "GOODYEAR", style: "WRANGLER DURATRAC"},
    {width: 275, height: 55, diameter: 20, brand: "COOPER", style: "DISCOVERY H/T PLUS"},
    {width: 285, height: 60, diameter: 20, brand: "COOPER", style: "DISCOVER AT3 XLT"},
    {width: 285, height: 30, diameter: 20, brand: "GOODYEAR", style: "EAGLE F1 SUPERCAR3"}
];
const newTires = [
    {width: 295, height: 30, diameter: 19, brand: "PIRELLI", style: "NEW TIRE", isNew: true},
    {width: 275, height: 35, diameter: 19, brand: "PIRELLI", style: "NEW TIRE", isNew: true},
    {width: 295, height: 35, diameter: 18, brand: "PIRELLI", style: "NEW TIRE", isNew: true},
    {width: 295, height: 30, diameter: 20, brand: "PIRELLI", style: "NEW TIRE", isNew: true},
    {width: 275, height: 30, diameter: 20, brand: "PIRELLI", style: "NEW TIRE", isNew: true},
    {width: 295, height: 30, diameter: 20, brand: "PIRELLI", style: "NEW TIRE", isNew: true}
];

// Use localStorage for persistence
function getStoredTires() {
    const tires = localStorage.getItem('tireInventory');
    return tires ? JSON.parse(tires) : null;
}
function saveTires(tires) {
    localStorage.setItem('tireInventory', JSON.stringify(tires));
}

let allTires = getStoredTires() || [...originalTires, ...newTires];

// --- All other functions from your script, but update allTires with saveTires(allTires) after any add/delete

function checkPageAccess() {
    const enteredPassword = document.getElementById('pagePassword').value;
    const errorDiv = document.getElementById('loginError');
    if (enteredPassword === pageAccessPassword) {
        isPageUnlocked = true;
        document.getElementById('loginOverlay').style.display = 'none';
        document.getElementById('protectedContent').style.display = 'block';
        errorDiv.style.display = 'none';
        populateTable();
        initializeDropdowns();
    } else {
        errorDiv.textContent = 'Incorrect password. Please try again.';
        errorDiv.style.display = 'block';
        document.getElementById('pagePassword').value = '';
        document.getElementById('pagePassword').focus();
    }
}

function handlePasswordKeypress(event) {
    if (event.key === 'Enter') {
        checkPageAccess();
    }
}

function initializeDropdowns() {
    // ... unchanged ...
    // fill dropdowns
    const widthSelect = document.getElementById('tireWidth');
    commonWidths.forEach(width => {
        const option = document.createElement('option');
        option.value = width;
        option.textContent = width + ' mm';
        widthSelect.appendChild(option);
    });

    const aspectRatioSelect = document.getElementById('tireAspectRatio');
    commonAspectRatios.forEach(ratio => {
        const option = document.createElement('option');
        option.value = ratio;
        option.textContent = ratio + '%';
        aspectRatioSelect.appendChild(option);
    });

    const diameterSelect = document.getElementById('tireDiameter');
    commonDiameters.forEach(diameter => {
        const option = document.createElement('option');
        option.value = diameter;
        option.textContent = diameter + '"';
        diameterSelect.appendChild(option);
    });

    const brandSelect = document.getElementById('tireBrand');
    topBrands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand.toUpperCase();
        option.textContent = brand;
        brandSelect.appendChild(option);
    });

    const modelSelect = document.getElementById('tireModel');
    commonModels.forEach(model => {
        const option = document.createElement('option');
        option.value = model.toUpperCase();
        option.textContent = model;
        modelSelect.appendChild(option);
    });
}

function handleCustomSelection(field) {
    const select = document.getElementById(`tire${field.charAt(0).toUpperCase() + field.slice(1)}`);
    const customInput = document.getElementById(`custom${field.charAt(0).toUpperCase() + field.slice(1)}`);
    if (select.value === 'other') {
        customInput.classList.add('show');
    } else {
        customInput.classList.remove('show');
        customInput.value = '';
    }
}

function populateTable() {
    const tbody = document.getElementById('tireTableBody');
    tbody.innerHTML = '';
    allTires.forEach((tire, index) => {
        const row = document.createElement('tr');
        if (tire.isNew) row.classList.add('new-tire');
        const deleteButton = isAdminLoggedIn ? 
            `<button class="btn" onclick="deleteTire(${index})" style="padding: 6px 12px; font-size: 12px;">Delete</button>` : 
            '<span style="color: #bbb;">Admin Only</span>';
        row.innerHTML = `
            <td>${tire.width}</td>
            <td>${tire.height}</td>
            <td>${tire.diameter}</td>
            <td class="brand-cell">${tire.brand}${tire.isNew ? '<span class="new-badge">NEW</span>' : ''}</td>
            <td class="model-cell">${tire.style}</td>
            <td>${deleteButton}</td>
        `;
        tbody.appendChild(row);
    });
    updateStats();
    saveTires(allTires);
}

function updateStats() {
    const totalTires = allTires.length;
    const brands = new Set(allTires.map(tire => tire.brand)).size;
    document.getElementById('totalCount').textContent = totalTires;
    document.getElementById('totalTires').textContent = totalTires;
    document.getElementById('totalBrands').textContent = brands;
    document.getElementById('newTires').textContent = allTires.filter(t => t.isNew).length;
}

// ... Rest of your functions (handleSearch, showSuggestions, etc.) unchanged, except use saveTires(allTires) after any array mutation ...

function addNewTire() {
    const widthSelect = document.getElementById('tireWidth');
    const aspectRatioSelect = document.getElementById('tireAspectRatio');
    const diameterSelect = document.getElementById('tireDiameter');
    const brandSelect = document.getElementById('tireBrand');
    const modelSelect = document.getElementById('tireModel');
    let width = widthSelect.value;
    let aspectRatio = aspectRatioSelect.value;
    let diameter = diameterSelect.value;
    let brand = brandSelect.value;
    let model = modelSelect.value;
    if (width === 'other') width = document.getElementById('customWidth').value;
    if (aspectRatio === 'other') aspectRatio = document.getElementById('customAspectRatio').value;
    if (diameter === 'other') diameter = document.getElementById('customDiameter').value;
    if (brand === 'other') brand = document.getElementById('customBrand').value.toUpperCase();
    if (model === 'other') model = document.getElementById('customModel').value.toUpperCase();
    if (!width || !aspectRatio || !diameter || !brand || !model) {
        alert('Please fill in all fields');
        return;
    }
    const newTire = {
        width: parseInt(width),
        height: parseInt(aspectRatio),
        diameter: parseInt(diameter),
        brand: brand,
        style: model,
        isNew: true
    };
    allTires.push(newTire);
    saveTires(allTires);
    populateTable();
    closeAddTireModal();
    alert('Tire added successfully!');
}

function deleteTire(index) {
    if (confirm('Are you sure you want to delete this tire?')) {
        allTires.splice(index, 1);
        saveTires(allTires);
        populateTable();
        filterTires();
    }
}

// ... rest unchanged ...
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('pagePassword').focus();
});
window.onclick = function(event) {
    const modal = document.getElementById('addTireModal');
    if (event.target === modal) closeAddTireModal();
}
