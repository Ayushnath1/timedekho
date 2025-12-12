// 100 COUNTRIES WITH THEIR TIMEZONES
const countries = {
  "United States": "America/New_York",
  "Canada": "America/Toronto",
  "Mexico": "America/Mexico_City",
  "Brazil": "America/Sao_Paulo",
  "Argentina": "America/Argentina/Buenos_Aires",
  "Chile": "America/Santiago",
  "Colombia": "America/Bogota",
  "Peru": "America/Lima",
  "Venezuela": "America/Caracas",
  "Ecuador": "America/Guayaquil",
  "Bolivia": "America/La_Paz",
  "Uruguay": "America/Montevideo",
  "Paraguay": "America/Asuncion",

  "United Kingdom": "Europe/London",
  "France": "Europe/Paris",
  "Germany": "Europe/Berlin",
  "Italy": "Europe/Rome",
  "Spain": "Europe/Madrid",
  "Portugal": "Europe/Lisbon",
  "Netherlands": "Europe/Amsterdam",
  "Belgium": "Europe/Brussels",
  "Switzerland": "Europe/Zurich",
  "Austria": "Europe/Vienna",
  "Denmark": "Europe/Copenhagen",
  "Sweden": "Europe/Stockholm",
  "Norway": "Europe/Oslo",
  "Finland": "Europe/Helsinki",
  "Poland": "Europe/Warsaw",
  "Czech Republic": "Europe/Prague",
  "Hungary": "Europe/Budapest",
  "Greece": "Europe/Athens",
  "Ireland": "Europe/Dublin",
  "Russia": "Europe/Moscow",

  "Ukraine": "Europe/Kyiv",
  "Romania": "Europe/Bucharest",
  "Bulgaria": "Europe/Sofia",
  "Serbia": "Europe/Belgrade",
  "Croatia": "Europe/Zagreb",
  "Turkey": "Europe/Istanbul",

  "India": "Asia/Kolkata",
  "Pakistan": "Asia/Karachi",
  "Bangladesh": "Asia/Dhaka",
  "Sri Lanka": "Asia/Colombo",
  "Nepal": "Asia/Kathmandu",
  "Bhutan": "Asia/Thimphu",
  "Maldives": "Indian/Maldives",

  "China": "Asia/Shanghai",
  "Japan": "Asia/Tokyo",
  "South Korea": "Asia/Seoul",
  "North Korea": "Asia/Pyongyang",
  "Mongolia": "Asia/Ulaanbaatar",
  "Taiwan": "Asia/Taipei",
  "Hong Kong": "Asia/Hong_Kong",

  "Singapore": "Asia/Singapore",
  "Malaysia": "Asia/Kuala_Lumpur",
  "Indonesia": "Asia/Jakarta",
  "Philippines": "Asia/Manila",
  "Thailand": "Asia/Bangkok",
  "Vietnam": "Asia/Ho_Chi_Minh",
  "Myanmar": "Asia/Yangon",
  "Cambodia": "Asia/Phnom_Penh",
  "Laos": "Asia/Vientiane",
  "Brunei": "Asia/Brunei",

  "Australia": "Australia/Sydney",
  "New Zealand": "Pacific/Auckland",
  "Fiji": "Pacific/Fiji",
  "Samoa": "Pacific/Apia",
  "Tonga": "Pacific/Tongka",
  "Papua New Guinea": "Pacific/Port_Moresby",

  "South Africa": "Africa/Johannesburg",
  "Egypt": "Africa/Cairo",
  "Nigeria": "Africa/Lagos",
  "Kenya": "Africa/Nairobi",
  "Ethiopia": "Africa/Addis_Ababa",
  "Ghana": "Africa/Accra",
  "Morocco": "Africa/Casablanca",
  "Algeria": "Africa/Algiers",
  "Tunisia": "Africa/Tunis",
  "Uganda": "Africa/Kampala",
  "Tanzania": "Africa/Dar_es_Salaam",
  "Zimbabwe": "Africa/Harare",
  "Zambia": "Africa/Lusaka",

  "Saudi Arabia": "Asia/Riyadh",
  "UAE": "Asia/Dubai",
  "Qatar": "Asia/Qatar",
  "Bahrain": "Asia/Bahrain",
  "Kuwait": "Asia/Kuwait",
  "Oman": "Asia/Muscat",
  "Iran": "Asia/Tehran",
  "Iraq": "Asia/Baghdad",
  "Jordan": "Asia/Amman",
  "Lebanon": "Asia/Beirut",

  "Iceland": "Atlantic/Reykjavik",
  "Greenland": "America/Godthab",
  "Cuba": "America/Havana",
  "Jamaica": "America/Jamaica",
  "Haiti": "America/Port-au-Prince",
  "Dominican Republic": "America/Santo_Domingo"
};

// DOM element
const listEl = document.getElementById("countryList");

// Populate 100 countries in list
for (let country in countries) {
  const li = document.createElement("li");
  li.textContent = country;
  li.onclick = () => showTime(country, countries[country]);
  listEl.appendChild(li);
}

// Show selected country's time
function showTime(country, timezone) {
  document.getElementById("countryTitle").textContent = country;

  fetch(`https://worldtimeapi.org/api/timezone/${timezone}`)
    .then(res => res.json())
    .then(data => {
      const dt = new Date(data.datetime);
      document.getElementById("timeDisplay").textContent = dt.toLocaleTimeString();
      document.getElementById("dateDisplay").textContent = dt.toDateString();
    });
}

// Auto-update selected country's time every second
setInterval(() => {
  const name = document.getElementById("countryTitle").textContent;
  if (name !== "Select a country") {
    showTime(name, countries[name]);
  }
}, 1000);
