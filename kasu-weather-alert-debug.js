/**
 * DEBUG VERSION: Always shows a test Severe Weather Alert banner.
 * Use this version to verify styling and behavior without needing a real alert.
 */

(function () {
  const alertText = "Test Weather Alert: This is a simulated warning for display purposes only.";
  const alertLink = "https://www.weather.gov/";

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
})();