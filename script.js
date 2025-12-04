const signals = {
  air: document.getElementById('signal-air'),
  occupancy: document.getElementById('signal-occupancy'),
  noise: document.getElementById('signal-noise')
};

const metrics = {
  energy: document.getElementById('metric-energy'),
  comfort: document.getElementById('metric-comfort'),
  uptime: document.getElementById('metric-uptime')
};

const pillButtons = Array.from(document.querySelectorAll('.pill'));
const streamEvents = document.getElementById('stream-events');

const dataset = {
  '24h': {
    signals: { air: '45 μg/m³', occupancy: '128', noise: '38 dB' },
    metrics: { energy: '0.91 MWh', comfort: '92%', uptime: '99.4%' },
    events: [
      { title: 'Filter boost', meta: 'AQI spike mitigated', status: 'Executed', color: 'blue' },
      { title: 'Demand response', meta: '-12% load in 6 minutes', status: 'Confirmed', color: 'green' },
      { title: 'Edge anomaly', meta: 'Sensor drift corrected', status: 'Resolved', color: 'orange' }
    ]
  },
  '7d': {
    signals: { air: '38 μg/m³', occupancy: '93', noise: '34 dB' },
    metrics: { energy: '6.31 MWh', comfort: '94%', uptime: '99.6%' },
    events: [
      { title: 'Lighting retrofit', meta: 'New profiles in B2', status: 'Complete', color: 'green' },
      { title: 'HVAC tune', meta: 'Static pressure optimized', status: 'Complete', color: 'blue' },
      { title: 'Badge sync', meta: '5 new zones learned', status: 'Synced', color: 'orange' }
    ]
  },
  '30d': {
    signals: { air: '29 μg/m³', occupancy: '77', noise: '31 dB' },
    metrics: { energy: '25.2 MWh', comfort: '96%', uptime: '99.8%' },
    events: [
      { title: 'Predictive schedule', meta: 'Occupancy model retrained', status: 'Deployed', color: 'blue' },
      { title: 'Firmware roll-out', meta: '71 gateways updated', status: 'Live', color: 'orange' },
      { title: 'Comfort audit', meta: 'Variance reduced 14%', status: 'Verified', color: 'green' }
    ]
  }
};

function renderRange(range) {
  const entry = dataset[range];
  signals.air.textContent = entry.signals.air;
  signals.occupancy.textContent = entry.signals.occupancy;
  signals.noise.textContent = entry.signals.noise;

  metrics.energy.textContent = entry.metrics.energy;
  metrics.comfort.textContent = entry.metrics.comfort;
  metrics.uptime.textContent = entry.metrics.uptime;

  streamEvents.innerHTML = '';
  entry.events.forEach(event => {
    const el = document.createElement('div');
    el.className = 'event';
    el.innerHTML = `
      <p class="title">${event.title}</p>
      <p class="meta">${event.meta}</p>
      <p class="status"><span class="dot dot--${event.color}"></span>${event.status}</p>
    `;
    streamEvents.appendChild(el);
  });
}

pillButtons.forEach(button => {
  button.addEventListener('click', () => {
    pillButtons.forEach(b => b.classList.remove('pill--active'));
    button.classList.add('pill--active');
    renderRange(button.dataset.range);
  });
});

renderRange('24h');
