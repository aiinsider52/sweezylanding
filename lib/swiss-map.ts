// The same equirectangular extent is used by data/switzerland-map.ts.
export const SWISS_MAP = { width: 1000, height: 580, west: 5.956, east: 10.492, north: 47.808, south: 45.818, left: 60, top: 50, landWidth: 880, landHeight: 480 } as const;
export type MapCoordinates = { latitude: number; longitude: number };

export function projectSwissCoordinates({ latitude, longitude }: MapCoordinates) {
  return {
    x: SWISS_MAP.left + ((longitude - SWISS_MAP.west) / (SWISS_MAP.east - SWISS_MAP.west)) * SWISS_MAP.landWidth,
    y: SWISS_MAP.top + ((SWISS_MAP.north - latitude) / (SWISS_MAP.north - SWISS_MAP.south)) * SWISS_MAP.landHeight,
  };
}

export function swissMapViewBox(point: { x: number; y: number }, zoom: number) {
  const scale = Math.max(1, Math.min(zoom, 3));
  const width = SWISS_MAP.width / scale;
  const height = SWISS_MAP.height / scale;
  const x = Math.max(0, Math.min(point.x - width / 2, SWISS_MAP.width - width));
  const y = Math.max(0, Math.min(point.y - height / 2, SWISS_MAP.height - height));
  return `${x} ${y} ${width} ${height}`;
}

// Separate numbered badges while retaining a dot at each real coordinate.
export function layoutSwissMapMarkers(active: { x: number; y: number }, points: { x: number; y: number }[], zoom: number) {
  const occupied = [active];
  const gap = 80 / zoom;
  const [left, top, width, height] = swissMapViewBox(active, zoom).split(" ").map(Number);
  return points.map((point) => {
    let badge = point;
    const fits = (candidate: { x: number; y: number }) => candidate.x >= left + 30 / zoom && candidate.x <= left + width - 30 / zoom && candidate.y >= top + 30 / zoom && candidate.y <= top + height - 30 / zoom && occupied.every((other) => Math.hypot(candidate.x - other.x, candidate.y - other.y) >= gap);
    if (!fits(badge)) {
      search: for (const radius of [gap, gap * 1.5, gap * 2, gap * 3]) {
        for (let angle = -Math.PI / 2; angle < Math.PI * 1.5; angle += Math.PI / 4) {
          const candidate = { x: point.x + Math.cos(angle) * radius, y: point.y + Math.sin(angle) * radius };
          if (fits(candidate)) { badge = candidate; break search; }
        }
      }
    }
    occupied.push(badge);
    return { point, badge };
  });
}

function distance(a: MapCoordinates, b: MapCoordinates) {
  const radians = Math.PI / 180;
  const latitude = (b.latitude - a.latitude) * radians;
  const longitude = (b.longitude - a.longitude) * radians;
  const h = Math.sin(latitude / 2) ** 2 + Math.cos(a.latitude * radians) * Math.cos(b.latitude * radians) * Math.sin(longitude / 2) ** 2;
  return 2 * Math.asin(Math.sqrt(Math.min(1, h)));
}

// Geographic proximity only, without estimates of driving or walking time.
export function nearbyMapPlaces<T extends { coordinates: MapCoordinates }>(origin: MapCoordinates, places: T[], limit = 3) {
  return [...places].sort((a, b) => distance(origin, a.coordinates) - distance(origin, b.coordinates)).slice(0, limit);
}
