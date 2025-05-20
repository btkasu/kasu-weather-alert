/**
 * Severe Weather Alert Banner - Custom for KASU Public Radio Website
 * Monitors specific counties in AR and MO via National Weather Service API
 * Displays dismissible alert banner with link to full alert text
 */

(async function () {
  const counties = [
    "ARC021", "ARC055", "ARC031", "ARC093", "ARC111", "ARC037", "ARC035", "ARC063", "ARC121", "ARC067", "ARC075",
    "MOC069"
  ]; // NWS zone codes for: Clay, Greene, Craighead, Mississippi, Poinsett, Cross, Crittenden, Independence, Randolph, Jackson, Lawrence (AR), Dunklin (MO)

  const apiUrl = "https://api.weather.gov/alerts/active?status=actual&message_type=alert";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const alerts = data.features.filter(alert => {
      return alert.properties.areaDesc && counties.some(code =>
        alert.properties.geocode["FIPS6"]?.includes(code.substring(2)) ||
        alert.properties.geocode["UGC"]?.includes(code)
      );
    });

    if (alerts.length > 0) {
      const alert = alerts[0].properties;
      const alertText = alert.headline || "Severe Weather Alert";
      const alertLink = alert.uri;

      const banner = document.createElement("div");
      banner.id = "kasu-weather-alert";
      banner.innerHTML = `
        <div class="alert-content">
          <strong>${alertText}</strong>
          <a href="${alertLink}" target="_blank" rel="noopener noreferrer">View Alert</a>
          <button id="close-alert">&times;</button>
        </div>
      `;

      const style = document.createElement("style");
      style.textContent = `
        #kasu-weather-alert {
          background-color: #bf3840;
          color: #373535;
          padding: 1em;
          font-family: Arial, sans-serif;
          font-size: 1rem;
          font-weight: bold;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }
        #kasu-weather-alert .alert-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        #kasu-weather-alert a {
          color: #373535;
          text-decoration: underline;
          margin-left: 1em;
        }
        #kasu-weather-alert button {
          background: none;
          border: none;
          color: #373535;
          font-size: 1.5rem;
          cursor: pointer;
        }
      `;

      document.head.appendChild(style);
      document.body.prepend(banner);

      document.getElementById("close-alert").addEventListener("click", () => {
        banner.remove();
      });
    }
  } catch (error) {
    console.error("Failed to load weather alerts:", error);
  }
})();