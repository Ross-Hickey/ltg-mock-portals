const RAMPS={"CN-BRM":["CN","Brampton Intermodal Terminal","18:00"],"CN-MTL":["CN","Montreal Taschereau","18:00"],"CN-CGY":["CN","Calgary Logistics Park","16:00"],"CN-VAN":["CN","Vancouver Intermodal Terminal","16:00"],"CN-MON":["CN","Moncton Intermodal","17:00"],"CP-VAU":["CP","Vaughan Intermodal Terminal","18:00"],"CP-MTL":["CP","Lachine Intermodal","18:00"],"CP-CGY":["CP","Calgary Intermodal","16:00"],"CP-VAN":["CP","Vancouver Intermodal Facility","16:00"]};
const REGION={BRM:"E",MTL:"E",MON:"E",VAU:"E",CGY:"W",VAN:"W"};
function transitDays(o,d){const a=o.split('-')[1],b=d.split('-')[1];if(REGION[a]===REGION[b])return 1;if((a==='MON'||b==='MON'))return 2;if(a==='CGY'||b==='CGY')return 4;return 5;}
function hash(s){let h=7;for(const c of s)h=(h*31+c.charCodeAt(0))%999983;return h;}
function fmt(d){return d.toISOString().slice(0,10);}
function addDays(dateStr,n){const d=new Date(dateStr+"T12:00:00Z");d.setUTCDate(d.getUTCDate()+n);return fmt(d);}
function requireLogin(){if(!sessionStorage.getItem('rb_user'))location.href='/rail/login.html';}
function nav(){return `<div class="row" style="margin-bottom:18px"><a class="btn secondary" href="/rail/home.html">Home</a><a class="btn secondary" href="/rail/quote.html">Get quote</a><a class="btn secondary" href="/rail/book.html">New ramp-to-ramp booking</a><a class="btn secondary" href="/rail/reserve.html">Reserve equipment</a><a class="btn secondary" href="/rail/track.html">Track shipment</a><a class="btn secondary" href="#" onclick="sessionStorage.clear();location.href='/rail/login.html'">Sign out</a></div>`;}
function rampOptions(railway){return Object.entries(RAMPS).filter(([k,v])=>!railway||v[0]===railway).map(([k,v])=>`<option value="${k}">${k} — ${v[1]}</option>`).join('');}
const SEEDED_TRACK={"CN241390":{railway:"CN",origin:"CN-MON",dest:"CN-BRM",events:[["2026-10-13 18:40","Arrived origin ramp","Moncton NB"],["2026-10-14 02:15","Departed","Moncton NB"],["2026-10-15 09:30","In transit","Montreal QC"],["2026-10-16 06:05","Arrived destination ramp","Brampton ON"],["2026-10-16 08:00","Available for pickup","Brampton ON"]],eta:"2026-10-16 08:00"},"CPPU234397":{railway:"CP",origin:"CP-VAU",dest:"CP-VAN",events:[["2026-10-18 21:10","Arrived origin ramp","Vaughan ON"]],eta:"2026-10-24 06:00"}};

const LANE_RATES={"CN-CGY|CN-MTL|53' reefer":2050,"CP-VAN|CP-VAU|53' dry":1690,"CN-VAN|CN-BRM|53' dry":1720,"CP-VAU|CP-VAN|53' dry":1950};
function railRate(o,d,eq){const k=o+'|'+d+'|'+eq;if(LANE_RATES[k])return LANE_RATES[k];const base=transitDays(o,d)*380+300;return eq==="53' reefer"?base+400:(eq==="53' heated"?base+150:base);}
function quoteNumber(o,d,dep,eq){return 'Q-'+(RAMPS[o]?RAMPS[o][0]:'RB')+'-'+String(hash(o+d+dep+eq)).padStart(6,'0');}
function money(n){return 'CAD '+Number(n).toLocaleString('en-CA',{minimumFractionDigits:2,maximumFractionDigits:2});}
