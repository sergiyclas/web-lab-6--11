function hexToRgb(hex) {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');

    // Parse r, g, b values
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return { r, g, b };
}


export default function generateGradientFromMedian(hexColor) {
    const medianColor = hexToRgb(hexColor);

    const adjustColor = (color, amount) => Math.min(Math.max(color + amount, 0), 255);

    const lightShade = `rgba(${adjustColor(medianColor.r, 50)}, ${adjustColor(medianColor.g, 50)}, ${adjustColor(medianColor.b, 50)}, 1)`;
    const darkShade = `rgba(${adjustColor(medianColor.r, -50)}, ${adjustColor(medianColor.g, -50)}, ${adjustColor(medianColor.b, -50)}, 1)`;
    const medianShade = `rgba(${medianColor.r}, ${medianColor.g}, ${medianColor.b}, 1)`;

    return `linear-gradient(180deg, ${lightShade} 15%, ${medianShade} 50%, ${darkShade} 95%)`;
}
