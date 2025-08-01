// Universal loader: works in both browser and Node.js
export default async function getConstellationNames() {
  if (typeof window !== 'undefined' && window.fetch) {
    // Browser: relative path works
    const response = await fetch('./constellationData.json');
    return await response.json();
  } else {
    // Node.js: use fs/promises for local file
    const { readFile } = await import('fs/promises');
    const path = new URL('./constellationData.json', import.meta.url);
    const data = await readFile(path, 'utf-8');
    return JSON.parse(data);
  }
}
