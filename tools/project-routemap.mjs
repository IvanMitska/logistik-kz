import fs from 'node:fs';
const g = JSON.parse(fs.readFileSync('/tmp/world.geojson','utf8'));

const WANT = ['China','Kazakhstan','Russia','Mongolia','Kyrgyzstan','Uzbekistan','Tajikistan','Turkmenistan','Azerbaijan','Armenia','Georgia','Belarus','Ukraine','Afghanistan','Pakistan','India','Iran','Turkey','Nepal','Bhutan','Myanmar','Laos','Vietnam','Thailand','North Korea','South Korea','Japan'];

// region bbox + projection
const lonMin=28, lonMax=126, latMin=22, latMax=62, midLat=44;
const kx=Math.cos(midLat*Math.PI/180);
const rawW=(lonMax-lonMin)*kx, rawH=(latMax-latMin);
const W=2000, k=W/rawW, H=Math.round(rawH*k);
const px=(lon)=> (lon-lonMin)*kx*k;
const py=(lat)=> (latMax-lat)*k;

const inRange=(lon,lat)=> lon>=10 && lon<=155 && lat>=5 && lat<=78;

function ringToPath(ring){
  // skip rings mostly outside region (kills antimeridian / far-east artifacts)
  let inside=0; for(const [lon,lat] of ring) if(inRange(lon,lat)) inside++;
  if(inside < ring.length*0.5) return '';
  let d='';
  for(let i=0;i<ring.length;i++){
    const [lon,lat]=ring[i];
    const x=px(lon).toFixed(1), y=py(lat).toFixed(1);
    d += (i?'L':'M')+x+' '+y+' ';
  }
  return d+'Z ';
}

const countries=[];
for(const f of g.features){
  const name=f.properties.NAME;
  if(!WANT.includes(name)) continue;
  const geom=f.geometry;
  const polys = geom.type==='Polygon' ? [geom.coordinates] : geom.coordinates;
  let d='';
  for(const poly of polys) for(const ring of poly) d+=ringToPath(ring);
  if(d) countries.push({name, d:d.trim(), main: ['China','Kazakhstan','Russia'].includes(name)});
}

const CITIES=[
  {city:'Иу', lon:120.07, lat:29.31},
  {city:'Хоргос', lon:80.43, lat:44.21},
  {city:'Алматы', lon:76.95, lat:43.24},
  {city:'Астана', lon:71.43, lat:51.13},
  {city:'Москва', lon:37.62, lat:55.75},
].map(c=>({city:c.city, x:+px(c.lon).toFixed(1), y:+py(c.lat).toFixed(1)}));

// smooth route path (Catmull-Rom)
const P=CITIES.map(c=>[c.x,c.y]);
let route=`M ${P[0][0]} ${P[0][1]} `;
for(let i=0;i<P.length-1;i++){
  const p0=P[i-1]||P[i],p1=P[i],p2=P[i+1],p3=P[i+2]||p2;
  const c1x=(p1[0]+(p2[0]-p0[0])/6).toFixed(1),c1y=(p1[1]+(p2[1]-p0[1])/6).toFixed(1);
  const c2x=(p2[0]-(p3[0]-p1[0])/6).toFixed(1),c2y=(p2[1]-(p3[1]-p1[1])/6).toFixed(1);
  route+=`C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]} `;
}

const out=`// AUTO-GENERATED (tools/project.mjs) — Natural Earth 110m, public domain.
export const VIEW = { w: ${W}, h: ${H} };
export const COUNTRIES: { name: string; d: string; main: boolean }[] = ${JSON.stringify(countries)};
export const CITIES: { city: string; x: number; y: number }[] = ${JSON.stringify(CITIES)};
export const ROUTE_D = ${JSON.stringify(route.trim())};
`;
fs.writeFileSync('src/data/routeMap.ts', out);
const sz=(fs.statSync('src/data/routeMap.ts').size/1024).toFixed(0);
console.log('countries:', countries.map(c=>c.name).join(', '));
console.log('VIEW', W, H, '| file', sz+'KB');
console.log('CITIES', JSON.stringify(CITIES));
