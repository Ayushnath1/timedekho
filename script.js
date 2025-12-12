// Generate all 242 country names automatically
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

// Load all timezones
const timeZones = Intl.supportedValuesOf("timeZone");

// Convert timezone "Europe/Paris" → "FRANCE"
function getCountryFromTZ(tz) {
  try {
    const code = tz.split("/")[0].toUpperCase();
    return regionNames.of(code) || null;
  } catch {
    return null;
  }
}

// Build country → timezone mapping
const countries = {};

// Map each timezone to its country
timeZones.forEach(tz => {
  const parts = tz.split("/");
  if (parts.length === 2) {
    const region = parts[0].toUpperCase();
    const country = regionNames.of(region);
    if (country && !countries[country]) {
      countries[country] = tz;
    }
  }
});

// DOM ELEMENTS
const countryList = document.getElementById("countryList");
const searchBar = document.getElementById("searchBar");

// Populate the 242 countries list
function loadCountryList(filter = "") {
  countryList.innerHTML = "";

  Object.keys(countries)
    .sort()
    .filter(c => c.toLowerCase().includes(filter.toLowerCase()))
    .forEach(country => {
      const li = document.createElement("li");
      li.textContent = country;
      li.onclick = () => showCountryTime(country, countries[country]);
      countryList.appendChild(li);
    });
}

loadCountryList();

// SEARCH BAR LISTENER
searchBar.addEventListener("input", e => {
  loadCountryList(e.target.value);
});

// DISPLAY COUNTRY TIME
function showCountryTime(country, timezone) {
  document.getElementById("countryTitle").textContent = country;

  const dateStr = new Date().toLocaleString("en-US", { timeZone: timezone });
  const dt = new Date(dateStr);

  document.getElementById("timeDisplay").textContent =
    dt.toLocaleTimeString("en-US", { hour12: false });

  document.getElementById("dateDisplay").textContent =
    dt.toDateString();
}

// Auto-refresh selected country
setInterval(() => {
  const selected = document.getElementById("countryTitle").textContent;
  if (selected !== "Select a Country") {
    showCountryTime(selected, countries[selected]);
  }
}, 1000);
