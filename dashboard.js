// Dashboard interactions: chart, clock, notes (localStorage), simple add/export demos
document.addEventListener('DOMContentLoaded', () => {
  // Chart (Chart.js)
  const ctx = document.getElementById('chartPerf');
  if(ctx && window.Chart){
    new Chart(ctx.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets: [{
          label: 'Active users',
          data: [120,180,140,210,250,200,270],
          borderColor: '#00e6cc',
          backgroundColor: 'rgba(0,230,204,0.12)',
          fill:true,
          tension:0.35,
          pointRadius:3
        }]
      },
      options:{
        plugins:{legend:{display:false}},
        scales:{
          x:{grid:{display:false},ticks:{color:'#9aa6b2'}},
          y:{grid:{color:'rgba(255,255,255,0.03)'},ticks:{color:'#9aa6b2'}}
        }
      }
    });
  }

  // Live clock
  const clockEl = document.getElementById('liveClock');
  function refreshClock(){
    if(!clockEl) return;
    const d = new Date();
    clockEl.textContent = d.toLocaleTimeString();
  }
  setInterval(refreshClock, 1000);
  refreshClock();

  // Notes save/load
  const noteBox = document.getElementById('noteBox');
  const saveNote = document.getElementById('saveNote');
  const clearNote = document.getElementById('clearNote');
  if(noteBox){
    noteBox.value = localStorage.getItem('phantom_note') || '';
  }
  if(saveNote){
    saveNote.addEventListener('click', ()=> {
      localStorage.setItem('phantom_note', noteBox.value || '');
      alert('Note saved locally (demo)');
    });
  }
  if(clearNote){
    clearNote.addEventListener('click', ()=> {
      noteBox.value = '';
      localStorage.removeItem('phantom_note');
    });
  }

  // Export demo: gather metrics and notes
  const exportBtn = document.getElementById('exportData');
  if(exportBtn){
    exportBtn.addEventListener('click', ()=>{
      const payload = {
        visitors: document.getElementById('visitors')?.textContent || null,
        revenue: document.getElementById('revenue')?.textContent || null,
        note: localStorage.getItem('phantom_note') || ''
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'phantom-export.json';
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    });
  }

  // Add widget (demo)
  const addWidget = document.getElementById('addWidget');
  if(addWidget){
    addWidget.addEventListener('click', ()=> {
      alert('Widget library / custom widgets coming soon — demo only.');
    });
  }

  // Sidebar interactions
  document.querySelectorAll('.side-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.side-item').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      // demo: could switch views here
    });
  });
});
