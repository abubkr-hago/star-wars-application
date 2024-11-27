export function stringToColor(text: string = '') {
  // Get a consistent hash value from the string
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to RGB color
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;

  // Ensure color is not too dark or too light
  const minBrightness = 50; // Minimum RGB value
  const maxBrightness = 200; // Maximum RGB value

  const normalizeColor = (color: number) => {
    return Math.min(maxBrightness, Math.max(minBrightness, Math.abs(color)));
  };

  // Convert to hex format
  const toHex = (c: number) => {
    const hex = normalizeColor(c).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function extractPlanetIdFromURL(urlString: string): number {
  const url = new URL(urlString);
  let pathName = url.pathname;
  if (pathName.endsWith('/')) pathName = pathName.slice(0, -1);
  const index = pathName.lastIndexOf('/') + 1;
  return parseInt(pathName.substring(index));
}
