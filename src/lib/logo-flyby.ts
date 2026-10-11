// The logo mark: a gravity-assist flyby. A trajectory dives in, swings around
// a planet and heads off somewhere new, its path drawing an L. The incoming
// leg is flown (solid), the outgoing one only planned (dotted), like a
// manoeuvre node in KSP.
// Shared by the header logo (src/components/Logo.astro) and the favicon and
// touch icons (scripts/generate-icons.mjs). Everything sits on a 32 unit grid.

export const PLANET = { cx: 13.96, cy: 21.98, r: 4.8 };
// The radius of the arc the trajectory follows around the planet.
const ORBIT_RADIUS = 7;
// Where the incoming leg starts, leaning a little to the right, and where the
// outgoing leg ends, level with the bottom of the arc so it leaves flat.
const START = [10.02, 2.12] as const;
const END = [24.96, PLANET.cy + ORBIT_RADIUS] as const;

export const FLYBY_STROKE_WIDTH = 1.8;
export const FLYBY_DASH = '0.01 2.7';

function flybyPaths() {
  const angleTo = ([x, y]: readonly [number, number]) =>
    Math.atan2(y - PLANET.cy, x - PLANET.cx);
  const spread = ([x, y]: readonly [number, number]) =>
    Math.acos(ORBIT_RADIUS / Math.hypot(x - PLANET.cx, y - PLANET.cy));
  const onOrbit = (angle: number) =>
    `${f(PLANET.cx + ORBIT_RADIUS * Math.cos(angle))} ${f(PLANET.cy + ORBIT_RADIUS * Math.sin(angle))}`;

  // Each leg is the tangent from its end to the arc around the planet, which
  // the trajectory follows anticlockwise on screen; the periapsis is halfway.
  const enter = angleTo(START) - spread(START);
  const leave = angleTo(END) + spread(END);
  const sweep =
    (((enter - leave) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const periapsis = onOrbit(enter - sweep / 2);
  const arc = `A${ORBIT_RADIUS} ${ORBIT_RADIUS} 0 0 0`;

  const incoming = `M${START.join(' ')}L${onOrbit(enter)}${arc} ${periapsis}`;
  const outward = `${arc} ${onOrbit(leave)}L${END.join(' ')}`;

  return {
    incoming,
    outgoing: `M${periapsis}${outward}`,
    // The whole trip, for the craft flying it on the home page.
    trip: `${incoming}${outward}`,
  };
}

function f(n: number) {
  return Number(n.toFixed(2));
}

export const FLYBY = flybyPaths();
