// The logo mark: a gravity-assist flyby. A trajectory swoops down, swings
// around a planet and heads off somewhere new, its path drawing a V. The
// incoming leg is flown (solid), the outgoing one only planned (dotted), like
// a manoeuvre node in KSP.
// Shared by the header logo (src/components/Logo.astro) and the favicon and
// PWA icons (scripts/generate-icons.mjs). Everything sits on a 32 unit grid.

const CENTRE_X = 16;
// The planet, and the radius of the arc the trajectory follows around it.
const PLANET_Y = 19;
const ORBIT_RADIUS = 5;
export const PLANET_RADIUS = 2.8;
// Where the incoming leg starts; the outgoing leg ends mirrored on the right.
const START_X = 5;
const START_Y = 5.5;

export const FLYBY_STROKE_WIDTH = 1.8;
export const FLYBY_DASH = '0.01 2.7';
export const PLANET = { cx: CENTRE_X, cy: PLANET_Y, r: PLANET_RADIUS };

function flybyPaths() {
  // Each leg is the tangent from its end to the arc around the planet.
  const dx = START_X - CENTRE_X;
  const dy = START_Y - PLANET_Y;
  const toStart = Math.atan2(dy, dx);
  const tangent = toStart - Math.acos(ORBIT_RADIUS / Math.hypot(dx, dy));
  const tx = CENTRE_X + ORBIT_RADIUS * Math.cos(tangent);
  const ty = PLANET_Y + ORBIT_RADIUS * Math.sin(tangent);
  const bottom = `${CENTRE_X} ${PLANET_Y + ORBIT_RADIUS}`;
  const arc = `A${ORBIT_RADIUS} ${ORBIT_RADIUS} 0 0 0`;
  const f = (n: number) => Number(n.toFixed(2));

  const incoming = `M${START_X} ${START_Y}L${f(tx)} ${f(ty)}${arc} ${bottom}`;
  const outward = `${arc} ${f(2 * CENTRE_X - tx)} ${f(ty)}L${2 * CENTRE_X - START_X} ${START_Y}`;

  return {
    incoming,
    outgoing: `M${bottom}${outward}`,
    // The whole trip, for the craft flying it on the home page.
    trip: `${incoming}${outward}`,
  };
}

export const FLYBY = flybyPaths();
