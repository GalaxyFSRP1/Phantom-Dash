
document.addEventListener('DOMContentLoaded', () => {
  // DEMO: Chart.js for performance widget
  if(window.Chart){
    const ctx = document.getElementById('performanceChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
          label: "Active Users",
          data: [120, 180, 140, 210, 250, 200, 270],
          fill: true,
          borderColor: "#00e6cc",
          backgroundColor: "rgba(0,230,204,0.12)",
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: "#fff",
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#a0a0a0" } },
          y: { grid: { color: "rgba(0,230,204,0.09)" }, ticks: { color: "#a0a0a0" } }
        }
      }
    });
  }

  // New Widget Button Example (show alert, extend for real logic)
  document.getElementById('new-widget-btn').onclick = () => {
    alert("Widget library coming soon!");
  };

  // Export Button Example
  document.getElementById('export-btn').onclick = () => {
    alert("Exporting data... (demo)");
  };

  // Sidebar nav active state
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
    item.onclick = function(){
      document.querySelectorAll('.sidebar-nav .nav-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    }
  });
});
