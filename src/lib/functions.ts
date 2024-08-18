interface Boundries {
  x: [number, number];
  y: [number, number];
}

type Boundries3D = Boundries & { z: [number, number] };
export interface Results {
  x: number[];
  y: number[];
  z: number[];
}
export function __bowl(
  { x: [x_low, x_high], y: [y_low, y_high] }: Boundries,
  count: number,
): Results {
  const bowl: Results = { x: [], y: [], z: [] };

  // Calculate the step sizes for each axis
  const stepX = (x_high - x_low) / (count - 1);
  const stepY = (y_high - y_low) / (count - 1);
  //  const stepZ = (z_high - z_low) / (z_count - 1);

  // Loop through the grid of points
  for (let i = 0; i < count; i++) {
    const x = x_low + i * stepX;
    for (let j = 0; j < count; j++) {
      const y = y_low + j * stepY;
      for (let k = 0; k < count; k++) {
        // const z = z_low + k * stepZ;

        // Formula for a bowl shape: z = x^2 + y^2
        const z = Math.pow(x, 2) + Math.pow(y, 2);

        // Add the point to the bowl array
        bowl.x.push(x);
        bowl.y.push(y);
        bowl.z.push(z);
      }
    }
  }

  return bowl;
}

export function bowl(
  { x: [x_low, x_high], y: [y_low, y_high] }: Boundries,
  count: number,
  steepness: number = 0.5,
): Results {
  const x: number[] = [];
  const y: number[] = [];
  const z: number[] = [];

  const step_x = (x_high - x_low) / (count - 1);
  const step_y = (y_high - y_low) / (count - 1);

  const center_x = (x_high + x_low) / 2;
  const center_y = (y_high + y_low) / 2;
  const max_distance =
    Math.max(Math.abs(x_high - x_low), Math.abs(y_high - y_low)) / 2;

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      const curr_x = x_low + i * step_x;
      const curr_y = y_low + j * step_y;

      x.push(curr_x);
      y.push(curr_y);

      // Calculate distance from center
      const distance_x = curr_x - center_x;
      const distance_y = curr_y - center_y;
      const distance = Math.sqrt(
        distance_x * distance_x + distance_y * distance_y,
      );

      // Generate z-value for a bowl shape
      // Using a quadratic function that creates a bowl with its base at z=0
      const normalized_distance = distance / max_distance;
      const curr_z = steepness * Math.pow(normalized_distance, 2);
      z.push(curr_z);
    }
  }

  return { x, y, z };
}

export function _bowl(
  { x: [x_low, x_high], y: [y_low, y_high] }: Boundries,
  count: number,
): Results {
  const x: number[] = [];
  const y: number[] = [];
  const z: number[] = [];

  const step_x = (x_high - x_low) / (count - 1);
  const step_y = (y_high - y_low) / (count - 1);

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      const curr_x = x_low + i * step_x;
      const curr_y = y_low + j * step_y;

      x.push(curr_x);
      y.push(curr_y);

      // Generate z-value for a bowl shape
      // Using a simple quadratic function: z = x^2 + y^2
      const curr_z = Math.pow(curr_x, 2) + Math.pow(curr_y, 2);
      z.push(curr_z);
    }
  }

  return { x, y, z };
}
export function terrain(
  { x: [x_low, x_high], y: [y_low, y_high], z: [z_low, z_high] }: Boundries3D,
  count: number,
  numberOfPeaks = 5,
): Results {
  const result: Results = { x: [], y: [], z: [] };

  // Calculate the step sizes for the x and y axes
  const stepX = (x_high - x_low) / (count - 1);
  const stepY = (y_high - y_low) / (count - 1);

  // Initialize a 2D array for z-values (heights)
  /**
  let zValues = Array(count)
    .fill()
    .map(() => Array(count).fill(0));
  */

  // Generate random peaks
  const peaks = [];
  for (let p = 0; p < numberOfPeaks; p++) {
    const peakX = x_low + Math.random() * (x_high - x_low);
    const peakY = y_low + Math.random() * (y_high - y_low);
    const peakHeight = z_low + Math.random() * z_high; // Random height between 10 and 100
    const peakSpread = 0.05 + Math.random() * 2; // Random spread for the peak

    peaks.push({ x: peakX, y: peakY, height: peakHeight, spread: peakSpread });
  }

  // Loop through the grid and calculate z-values based on the peaks
  for (let i = 0; i < count; i++) {
    const x = x_low + i * stepX;
    for (let j = 0; j < count; j++) {
      const y = y_low + j * stepY;

      // Calculate z-value based on the contributions from all peaks
      let z = 0;
      peaks.forEach((peak) => {
        const dx = x - peak.x;
        const dy = y - peak.y;
        const distanceSquared = dx * dx + dy * dy;

        // Gaussian-like contribution to z-value
        z +=
          peak.height *
          Math.exp(-distanceSquared / (2 * peak.spread * peak.spread));
      });

      // Add x, y, and z to the result arrays
      result.x.push(x);
      result.y.push(y);
      result.z.push(z);
    }
  }

  return result;
}

export const random = (
  { x: [x_low, x_high], y: [y_low, y_high], z: [z_low, z_high] }: Boundries3D,
  count: number,
): Results => ({
  x: Array.from({ length: count * 10 }, () => x_low + Math.random() * x_high),
  y: Array.from({ length: count * 10 }, () => y_low + Math.random() * y_high),
  z: Array.from({ length: count * 10 }, () => z_low + Math.random() * z_high),
});
