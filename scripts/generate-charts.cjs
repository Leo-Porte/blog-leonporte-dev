const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'images', 'posts', 'novo-mercado-programacao');

// =====================================================
// Chart 1: Produtividade por IA - Resultados de Estudos
// =====================================================
function chartProdutividade() {
  const data = [
    { label: 'Juniors\n(Multi-Co RCT)', value: 37, color: '#22c55e' },
    { label: 'Média Geral\n(Multi-Co RCT)', value: 26, color: '#3b82f6' },
    { label: 'Google\nInternal RCT', value: 21, color: '#3b82f6' },
    { label: 'Sêniores\n(Multi-Co RCT)', value: 12, color: '#f59e0b' },
    { label: 'Sêniores\n(METR RCT)', value: -19, color: '#ef4444' },
  ];

  const W = 800, H = 450;
  const padL = 180, padR = 80, padT = 60, padB = 80;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const maxVal = 50, minVal = -30;
  const range = maxVal - minVal;
  const zeroY = padT + (maxVal / range) * chartH;

  let bars = '';
  const barW = 70;
  const gap = (chartW - data.length * barW) / (data.length + 1);

  data.forEach((d, i) => {
    const x = padL + gap * (i + 1) + barW * i;
    const barH = Math.abs(d.value / range) * chartH;
    const y = d.value >= 0 ? zeroY - barH : zeroY;

    bars += `<rect x="${x}" y="${y}" width="${barW}" height="${barH}" fill="${d.color}" rx="4"/>`;
    // Value label
    const valY = d.value >= 0 ? y - 8 : y + barH + 18;
    bars += `<text x="${x + barW / 2}" y="${valY}" text-anchor="middle" font-size="14" font-weight="bold" fill="${d.color}">${d.value > 0 ? '+' : ''}${d.value}%</text>`;
    // Axis label (multi-line)
    const lines = d.label.split('\n');
    lines.forEach((line, li) => {
      bars += `<text x="${x + barW / 2}" y="${H - padB + 20 + li * 16}" text-anchor="middle" font-size="11" fill="#6b7280">${line}</text>`;
    });
  });

  // Grid lines
  let grid = '';
  for (let v = -20; v <= 40; v += 10) {
    const y = padT + ((maxVal - v) / range) * chartH;
    grid += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#e5e7eb" stroke-dasharray="${v === 0 ? '0' : '4,4'}"/>`;
    grid += `<text x="${padL - 10}" y="${y + 4}" text-anchor="end" font-size="12" fill="#9ca3af">${v > 0 ? '+' : ''}${v}%</text>`;
  }

  // Zero line
  grid += `<line x1="${padL}" y1="${zeroY}" x2="${W - padR}" y2="${zeroY}" stroke="#374151" stroke-width="2"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" font-family="system-ui, -apple-system, sans-serif">
  <rect width="${W}" height="${H}" fill="#ffffff" rx="12"/>
  <text x="${W / 2}" y="35" text-anchor="middle" font-size="18" font-weight="bold" fill="#111827">Impacto da IA na Produtividade por Perfil</text>
  <text x="${W / 2}" y="52" text-anchor="middle" font-size="12" fill="#6b7280">Dados de estudos controlados randomizados (2024–2025)</text>
  ${grid}
  ${bars}
</svg>`;
}

// =====================================================
// Chart 2: Vulnerabilidades por Linguagem
// =====================================================
function chartSeguranca() {
  const data = [
    { label: 'Java', value: 72, color: '#ef4444' },
    { label: 'Python', value: 42, color: '#f59e0b' },
    { label: 'C#', value: 42, color: '#f59e0b' },
    { label: 'JavaScript', value: 42, color: '#f59e0b' },
  ];

  const W = 700, H = 380;
  const padL = 120, padR = 60, padT = 70, padB = 60;
  const chartW = W - padL - padR;
  const barH = 50;
  const gap = 20;

  let bars = '';
  data.forEach((d, i) => {
    const y = padT + i * (barH + gap);
    const w = (d.value / 100) * chartW;

    // Background bar
    bars += `<rect x="${padL}" y="${y}" width="${chartW}" height="${barH}" fill="#f3f4f6" rx="6"/>`;
    // Value bar
    bars += `<rect x="${padL}" y="${y}" width="${w}" height="${barH}" fill="${d.color}" rx="6" opacity="0.85"/>`;
    // Label
    bars += `<text x="${padL - 15}" y="${y + barH / 2 + 5}" text-anchor="end" font-size="15" font-weight="600" fill="#374151">${d.label}</text>`;
    // Value
    bars += `<text x="${padL + w + 10}" y="${y + barH / 2 + 5}" font-size="15" font-weight="bold" fill="${d.color}">${d.value}%</text>`;
  });

  // Danger zone line at 50%
  const x50 = padL + (50 / 100) * chartW;
  bars += `<line x1="${x50}" y1="${padT - 5}" x2="${x50}" y2="${padT + data.length * (barH + gap) - gap + 5}" stroke="#dc2626" stroke-dasharray="6,4" stroke-width="1.5"/>`;
  bars += `<text x="${x50}" y="${padT - 12}" text-anchor="middle" font-size="10" fill="#dc2626">50%</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" font-family="system-ui, -apple-system, sans-serif">
  <rect width="${W}" height="${H}" fill="#ffffff" rx="12"/>
  <text x="${W / 2}" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="#111827">Taxa de Falha de Segurança em Código Gerado por IA</text>
  <text x="${W / 2}" y="50" text-anchor="middle" font-size="12" fill="#6b7280">Veracode GenAI Code Security Report 2025 — >100 LLMs testados</text>
  ${bars}
  <text x="${W / 2}" y="${H - 15}" text-anchor="middle" font-size="11" fill="#9ca3af">% de tarefas com vulnerabilidades OWASP Top 10 / CWE</text>
</svg>`;
}

// =====================================================
// Chart 3: Adoção e Sentimento ao longo do tempo
// =====================================================
function chartAdocao() {
  const W = 750, H = 420;
  const padL = 60, padR = 180, padT = 70, padB = 60;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const years = ['2023', '2024', '2025'];
  const series = [
    { name: 'Usando/planejando IA', data: [null, 76, 84], color: '#3b82f6' },
    { name: 'Sentimento positivo', data: [72, 72, 60], color: '#22c55e' },
    { name: 'Uso diário', data: [null, null, 51], color: '#8b5cf6' },
    { name: 'Não confia nos resultados', data: [null, null, 46], color: '#ef4444' },
  ];

  const xStep = chartW / (years.length - 1);

  // Grid
  let grid = '';
  for (let v = 0; v <= 100; v += 20) {
    const y = padT + ((100 - v) / 100) * chartH;
    grid += `<line x1="${padL}" y1="${y}" x2="${padL + chartW}" y2="${y}" stroke="#e5e7eb" stroke-dasharray="4,4"/>`;
    grid += `<text x="${padL - 10}" y="${y + 4}" text-anchor="end" font-size="11" fill="#9ca3af">${v}%</text>`;
  }

  // X axis labels
  let xLabels = '';
  years.forEach((yr, i) => {
    const x = padL + i * xStep;
    xLabels += `<text x="${x}" y="${padT + chartH + 25}" text-anchor="middle" font-size="13" font-weight="600" fill="#374151">${yr}</text>`;
  });

  // Lines and dots
  let lines = '';
  series.forEach((s) => {
    const points = [];
    s.data.forEach((v, i) => {
      if (v !== null) {
        const x = padL + i * xStep;
        const y = padT + ((100 - v) / 100) * chartH;
        points.push({ x, y, v });
      }
    });

    if (points.length > 1) {
      const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
      lines += `<path d="${pathD}" fill="none" stroke="${s.color}" stroke-width="3" stroke-linecap="round"/>`;
    }

    points.forEach((p) => {
      lines += `<circle cx="${p.x}" cy="${p.y}" r="5" fill="${s.color}" stroke="white" stroke-width="2"/>`;
      lines += `<text x="${p.x}" y="${p.y - 12}" text-anchor="middle" font-size="12" font-weight="bold" fill="${s.color}">${p.v}%</text>`;
    });
  });

  // Legend
  let legend = '';
  series.forEach((s, i) => {
    const ly = padT + 10 + i * 24;
    const lx = padL + chartW + 20;
    legend += `<rect x="${lx}" y="${ly - 8}" width="14" height="14" rx="3" fill="${s.color}"/>`;
    legend += `<text x="${lx + 20}" y="${ly + 4}" font-size="11" fill="#374151">${s.name}</text>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" font-family="system-ui, -apple-system, sans-serif">
  <rect width="${W}" height="${H}" fill="#ffffff" rx="12"/>
  <text x="${(padL + padL + chartW) / 2}" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="#111827">Adoção e Sentimento sobre IA entre Devs</text>
  <text x="${(padL + padL + chartW) / 2}" y="50" text-anchor="middle" font-size="12" fill="#6b7280">Stack Overflow Developer Survey (n=49.000+)</text>
  ${grid}
  ${xLabels}
  ${lines}
  ${legend}
</svg>`;
}

// =====================================================
// Write all charts
// =====================================================
fs.writeFileSync(path.join(outDir, 'chart-produtividade.svg'), chartProdutividade());
fs.writeFileSync(path.join(outDir, 'chart-seguranca.svg'), chartSeguranca());
fs.writeFileSync(path.join(outDir, 'chart-adocao.svg'), chartAdocao());

console.log('Charts generated:');
fs.readdirSync(outDir).filter(f => f.endsWith('.svg')).forEach(f => {
  console.log(`  - ${f} (${(fs.statSync(path.join(outDir, f)).size / 1024).toFixed(1)}KB)`);
});
