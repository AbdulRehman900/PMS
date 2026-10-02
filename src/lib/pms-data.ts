export type Status = "overdue" | "due" | "ok" | "done";

export const vessels = [
  { id: "v1", name: "MV Ocean Star", imo: "9123456", type: "Bulk Carrier", flag: "Panama", fleet: "Fleet A", status: "At sea" },
  { id: "v2", name: "MV Coral Bay", imo: "9234567", type: "Container", flag: "Liberia", fleet: "Fleet A", status: "In port" },
  { id: "v3", name: "MT Northern Dawn", imo: "9345678", type: "Tanker", flag: "Marshall Is.", fleet: "Fleet B", status: "At sea" },
];

export type Node = { id: string; name: string; code: string; kind: string; hours?: number; children?: Node[] };

export const equipmentTree: Node[] = [
  {
    id: "d1", name: "Engine Department", code: "ENG", kind: "Department", children: [
      {
        id: "s1", name: "Main Propulsion System", code: "ENG.601", kind: "System", children: [
          {
            id: "e1", name: "Main Engine", code: "ENG.601.001", kind: "Equipment", hours: 48210, children: [
              { id: "c1", name: "Lubrication System", code: "ENG.601.001.01", kind: "Component", children: [
                { id: "c11", name: "Lube Oil Pump No.1", code: "ENG.601.001.01.1", kind: "Component", hours: 12040 },
                { id: "c12", name: "Lube Oil Pump No.2", code: "ENG.601.001.01.2", kind: "Component", hours: 11876 },
              ] },
              { id: "c2", name: "Cooling System", code: "ENG.601.001.02", kind: "Component" },
              { id: "c3", name: "Fuel System", code: "ENG.601.001.03", kind: "Component" },
            ],
          },
          { id: "e2", name: "Turbocharger", code: "ENG.601.002", kind: "Equipment", hours: 21550 },
        ],
      },
      { id: "s2", name: "Power Generation", code: "ENG.651", kind: "System", children: [
        { id: "e3", name: "Diesel Generator No.1", code: "ENG.651.001", kind: "Equipment", hours: 31220 },
        { id: "e4", name: "Diesel Generator No.2", code: "ENG.651.002", kind: "Equipment", hours: 29870 },
      ] },
    ],
  },
  { id: "d2", name: "Deck Department", code: "DCK", kind: "Department", children: [
    { id: "s3", name: "Mooring & Anchoring", code: "DCK.401", kind: "System", children: [
      { id: "e5", name: "Windlass", code: "DCK.401.001", kind: "Equipment" },
      { id: "e6", name: "Mooring Winch Fwd", code: "DCK.401.002", kind: "Equipment" },
    ] },
  ] },
  { id: "d3", name: "Safety", code: "SAF", kind: "Department", children: [
    { id: "s4", name: "Life-Saving Appliances", code: "SAF.901", kind: "System", children: [
      { id: "e7", name: "Lifeboat Davit Port", code: "SAF.901.001", kind: "Equipment" },
    ] },
  ] },
];

export const workOrders = [
  { id: "WO-24-0182", title: "Main Engine — 4000h cylinder unit overhaul", equipment: "Main Engine", interval: "4000 h", due: "Overdue 36 h", status: "overdue" as Status, assignee: "2nd Engineer", critical: true },
  { id: "WO-24-0190", title: "DG No.1 — lube oil filter change", equipment: "Diesel Generator No.1", interval: "500 h", due: "In 42 h", status: "due" as Status, assignee: "3rd Engineer", critical: false },
  { id: "WO-24-0193", title: "Lifeboat davit — monthly inspection", equipment: "Lifeboat Davit Port", interval: "1 month", due: "In 3 days", status: "due" as Status, assignee: "Chief Officer", critical: true },
  { id: "WO-24-0195", title: "Windlass brake lining check", equipment: "Windlass", interval: "3 months", due: "In 18 days", status: "ok" as Status, assignee: "Bosun", critical: false },
  { id: "WO-24-0170", title: "Turbocharger air filter cleaning", equipment: "Turbocharger", interval: "250 h", due: "Completed 2 Oct", status: "done" as Status, assignee: "Motorman", critical: false },
  { id: "WO-24-0198", title: "Lube Oil Pump No.2 — bearing inspection", equipment: "Lube Oil Pump No.2", interval: "8000 h", due: "In 124 h", status: "ok" as Status, assignee: "2nd Engineer", critical: false },
];

export const defects = [
  { id: "DEF-031", title: "Oil leak at ME unit #3 cylinder cover", equipment: "Main Engine", severity: "High", reported: "29 Sep", status: "Open" },
  { id: "DEF-029", title: "DG No.2 abnormal vibration at 75% load", equipment: "Diesel Generator No.2", severity: "Medium", reported: "24 Sep", status: "Under repair" },
  { id: "DEF-027", title: "Mooring winch fwd — brake band worn", equipment: "Mooring Winch Fwd", severity: "Low", reported: "15 Sep", status: "Awaiting spares" },
];

export const spares = [
  { part: "Cylinder cover O-ring set", no: "MAN-90310-12", onHand: 2, min: 4, location: "Store A-12" },
  { part: "Lube oil filter element", no: "MAH-HC63", onHand: 14, min: 6, location: "Store B-03" },
  { part: "Fuel injector nozzle", no: "MAN-40211", onHand: 6, min: 6, location: "Store A-07" },
  { part: "Brake band lining", no: "WIN-7781", onHand: 0, min: 2, location: "Deck store" },
  { part: "Turbo air filter mat", no: "ABB-TPL-55", onHand: 9, min: 4, location: "Store B-11" },
];
