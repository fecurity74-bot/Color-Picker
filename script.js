const colorInput = document.getElementById('colorInput');
const paletteType = document.getElementById('paletteType');
const generateBtn = document.getElementById('generateBtn');
const palette = document.getElementById('palette');

// Простая функция генерации цветов
function generateColors(hex, type) {
  const main = parseInt(hex.slice(1),16);
  const r = (main >> 16) & 0xFF;
  const g = (main >> 8) & 0xFF;
  const b = main & 0xFF;

  let colors = [hex];

  if(type === 'complementary'){
    colors.push(`#${((255-r)<<16 | (255-g)<<8 | (255-b)).toString(16).padStart(6,'0')}`);
  } else if(type === 'analogous'){
    colors.push(`#${((r+30)%256<<16 | g<<8 | b).toString(16).padStart(6,'0')}`);
    colors.push(`#${((r-30+256)%256<<16 | g<<8 | b).toString(16).padStart(6,'0')}`);
  } else if(type === 'triadic'){
    colors.push(`#${(r<<16 | (g+120)%256<<8 | (b+240)%256).toString(16).padStart(6,'0')}`);
    colors.push(`#${(r<<16 | (g+240)%256<<8 | (b+120)%256).toString(16).padStart(6,'0')}`);
  } else if(type === 'monochromatic'){
    colors.push(`#${(Math.min(r+40,255)<<16 | g<<8 | b).toString(16).padStart(6,'0')}`);
    colors.push(`#${(Math.max(r-40,0)<<16 | g<<8 | b).toString(16).padStart(6,'0')}`);
  }

  return colors;
}

// Рендер блоков
function renderPalette(colors){
  palette.innerHTML = '';
  colors.forEach(c => {
    const div = document.createElement('div');
    div.className = 'color-box';
    div.style.backgroundColor = c;
    div.textContent = c;
    div.onclick = () => navigator.clipboard.writeText(c);
    palette.appendChild(div);
  });
}

// Кнопка генерации
generateBtn.onclick = () => {
  const colors = generateColors(colorInput.value, paletteType.value);
  renderPalette(colors);
}

// Начальная палитра
renderPalette(generateColors(colorInput.value, paletteType.value));
