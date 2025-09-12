document.addEventListener('DOMContentLoaded', () => {
  // Chart.js for performance widget
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

  // Live clock widget
  function updateClock() {
    const el = document.getElementById('dashboard-clock');
    if(!el) return;
    const now = new Date();
    el.textContent = now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'});
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Calendar (demo)
  const cal = document.getElementById('calendar-widget');
  if(cal){
    const today = new Date();
    cal.innerHTML = `<div style="text-align:center;font-size:2em;font-weight:700;">${today.getDate()}</div>
    <div style="text-align:center;font-size:1.1em;color:#00e6cc;">${today.toLocaleString('default', { month: 'long' })}</div>
    <div style="text-align:center;font-size:1em;color:#a0a0a0;">${today.getFullYear()}</div>`;
  }

  // Notes: Save to localStorage
  const note = document.getElementById('dashboard-note');
  if(note){
    note.value = localStorage.getItem('dashboard-note') || '';
    note.addEventListener('input', () => {
      localStorage.setItem('dashboard-note', note.value);
    });
  }

  // Sidebar nav active state
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
    item.onclick = function(){
      document.querySelectorAll('.sidebar-nav .nav-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    }
  });

  // New Widget/Add/Export buttons (demo)
  document.getElementById('new-widget-btn').onclick = () => {
    alert("Widget library coming soon!");
  };
  document.getElementById('export-btn').onclick = () => {
    alert("Exporting data... (demo)");
  };
});
