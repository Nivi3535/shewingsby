// lib/scallop.ts
export function generateScallopPath(bumps = 12, waviness = 0.08) {
  const points = 200;
  const base = 0.5;
  let d = "";
  for (let i = 0; i <= points; i++) {
    const theta = (i / points) * Math.PI * 2;
    const radius =
      base - waviness + waviness * (0.5 + 0.5 * Math.cos(bumps * theta));
    const x = 0.5 + radius * Math.cos(theta);
    const y = 0.5 + radius * Math.sin(theta);
    d += (i === 0 ? "M" : "L") + x.toFixed(4) + "," + y.toFixed(4) + " ";
  }
  return d + "Z";
}

export const scallopPath = generateScallopPath(12, 0.08); // matches the reference image closely
