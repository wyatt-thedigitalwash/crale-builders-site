// Products and suppliers Crale listed on their old site, with names corrected and links checked
// during the rebuild research (see research/partners.json). Ask Crale to confirm the list before launch:
// suppliers change, and a partner listed here reads as an endorsement.

export type Partner = { name: string; url: string | null };
export type PartnerGroup = { category: string; partners: Partner[] };

export const PARTNER_GROUPS: PartnerGroup[] = [
  {
    category: "Appliances",
    partners: [
      { name: "Hansbarger Home Solutions", url: "https://www.hansbargerhomesolutions.com" },
    ],
  },
  {
    category: "Bathroom/Accessories",
    partners: [
      { name: "Moen", url: "https://www.moen.com/" },
    ],
  },
  {
    category: "Cabinetry and Tops",
    partners: [
      { name: "Bontrager Custom Cabinetry", url: null },
      { name: "Konkus Marble and Granite", url: "https://www.konkusmarbleandgranite.com/" },
      { name: "Marble Arch Products", url: "http://www.marblearchproducts.com/" },
    ],
  },
  {
    category: "Central Vacuum",
    partners: [
      { name: "Central Vacs-N-More", url: "https://www.centralvacs-n-moreinc.com" },
    ],
  },
  {
    category: "Columns, Railing, Fence",
    partners: [
      { name: "HB&G Columns", url: "https://www.hbgcolumns.com/" },
      { name: "Superior Aluminum Products", url: "https://www.superioraluminum.com" },
    ],
  },
  {
    category: "Decking",
    partners: [
      { name: "TimberTech", url: "https://www.timbertech.com/" },
      { name: "Trex Decking", url: "https://www.trex.com/" },
    ],
  },
  {
    category: "Fireplaces",
    partners: [
      { name: "Dayton Fireplace", url: "https://www.daytonfireplace.com" },
      { name: "Heat & Glo", url: "https://www.heatnglo.com" },
      { name: "Quadra-Fire", url: "https://www.quadrafire.com/" },
    ],
  },
  {
    category: "Flooring",
    partners: [
      { name: "Bud Polley's Floor Center", url: "http://www.budpolley.com/" },
      { name: "Florida Tile", url: "https://www.floridatile.com/" },
      { name: "Fultz Flooring - Warehouse Carpets", url: "https://www.fultzflooring.com/" },
      { name: "Moore Tech Corp", url: null },
    ],
  },
  {
    category: "Foundation and Concrete",
    partners: [
      { name: "JR Edwards Concrete Co.", url: null },
      { name: "R.F. Woehrmyer Concrete Construction, Inc.", url: "https://www.rfwoehrmyerconcrete.com" },
    ],
  },
  {
    category: "Garage Doors and Operators",
    partners: [
      { name: "C.H.I. Overhead Door", url: "https://www.chiohd.com" },
      { name: "Clopay", url: "https://www.clopaydoor.com/" },
      { name: "HAAS Door", url: "https://www.haasdoor.com/" },
      { name: "LiftMaster", url: "https://www.liftmaster.com" },
      { name: "Linear Gate Openers", url: "https://lineargateopeners.com/" },
      { name: "Moeller Door & Window", url: "https://www.moellerdoorandwindow.com/" },
    ],
  },
  {
    category: "Hardware",
    partners: [
      { name: "Schlage", url: "https://www.schlage.com" },
    ],
  },
  {
    category: "Insulation",
    partners: [
      { name: "Current Insulation", url: "http://www.currentinsulation.com/" },
      { name: "Momper Insulation", url: "https://www.momper.com/" },
      { name: "Nu-Wool Insulation", url: "https://nuwool.com/" },
      { name: "Pothast Loxley Insulation, Inc.", url: null },
    ],
  },
  {
    category: "Interior Trim",
    partners: [
      { name: "Fairwind Finishing", url: null },
      { name: "GlobalPointe", url: "https://www.global-pointe.com/" },
      { name: "Keim Lumber", url: "https://www.keimlumber.com/" },
      { name: "Steves Doors", url: "http://www.stevesdoors.com/" },
    ],
  },
  {
    category: "Light Fixtures",
    partners: [
      { name: "Lyons Lighting Showroom", url: "https://lyonslightingshowroom.com" },
    ],
  },
  {
    category: "Low Voltage",
    partners: [
      { name: "Low Voltage Solutions, Inc.", url: "https://www.installedbylvs.com" },
    ],
  },
  {
    category: "Masonry",
    partners: [
      { name: "Dutch Quality Stone", url: "http://dutchqualitystone.com" },
      { name: "Heritage Stone", url: "http://www.heritagestoneonline.com/" },
      { name: "Minster Supply", url: "https://sthenrytileco.com" },
      { name: "Ohio Lumber Brick & Block", url: "http://ohiolumber.com/" },
      { name: "Provia Stone Veneer", url: "https://www.provia.com/" },
      { name: "Snyder Concrete Products", url: "http://www.snyderonline.com" },
      { name: "Stonecraft Industries", url: "http://www.stonecraft.com" },
    ],
  },
  {
    category: "Mechanicals",
    partners: [
      { name: "Area Energy & Electric", url: "https://areaelectric.com/" },
      { name: "C & J Plumbing, LLC", url: null },
      { name: "Lochards, Inc.", url: "http://www.lochard-inc.com" },
      { name: "Steve & Ted's Services", url: "https://www.steveandtedsservices.com" },
    ],
  },
  {
    category: "Painting",
    partners: [
      { name: "Sherwin-Williams", url: "https://www.sherwin-williams.com/" },
    ],
  },
  {
    category: "Plumbing Fixtures",
    partners: [
      { name: "Aker by MAAX", url: "https://akerbymaax.com/en" },
      { name: "Clarion", url: "http://www.clarionbathware.com/" },
      { name: "E.L. Mustee and Sons", url: "https://mustee.com" },
      { name: "Moen", url: "https://www.moen.com/" },
    ],
  },
  {
    category: "Roofing",
    partners: [
      { name: "CertainTeed", url: "https://www.certainteed.com" },
      { name: "GAF", url: "https://www.gaf.com/en-us" },
      { name: "Lomanco", url: "http://www.lomanco.com" },
      { name: "Owens Corning Roofing", url: "https://www.owenscorning.com/en-us" },
      { name: "TAMKO", url: "https://www.tamko.com" },
    ],
  },
  {
    category: "Shelving",
    partners: [
      { name: "Rubbermaid", url: "https://www.rubbermaid.com/" },
    ],
  },
  {
    category: "Shower Doors",
    partners: [
      { name: "Basco", url: "https://bascoshowerdoor.com" },
      { name: "Moeller Door & Window", url: "https://www.moellerdoorandwindow.com/" },
    ],
  },
  {
    category: "Siding",
    partners: [
      { name: "CertainTeed", url: "https://www.certainteed.com" },
      { name: "Foundry Siding", url: "https://foundrysiding.com/" },
      { name: "James Hardie", url: "https://www.jameshardie.com" },
      { name: "LP Building Products", url: "https://lpcorp.com" },
      { name: "Mastic", url: "https://www.plygem.com/siding/brands/mastic" },
      { name: "MiraTEC Trim", url: "https://miratecextira.com" },
    ],
  },
  {
    category: "Spouting and Gutters",
    partners: [
      { name: "Sidney Spouting Service", url: "https://www.sidneyspoutingserviceversailles.com" },
    ],
  },
  {
    category: "Truss and Floor Systems",
    partners: [
      { name: "Forest Products", url: "https://forestproductsgroup.com" },
      { name: "Rindler Truss", url: "https://rindlertruss.com" },
    ],
  },
  {
    category: "Windows and Doors",
    partners: [
      { name: "Alliance Windows", url: "http://alliancewindows.com/" },
      { name: "Andersen Windows and Doors", url: "https://www.andersenwindows.com" },
      { name: "Great Lakes Window", url: "http://www.greatlakewindows.com/" },
      { name: "Masonite Doors", url: "https://www.masonite.com" },
      { name: "Moeller Door & Window", url: "https://www.moellerdoorandwindow.com/" },
      { name: "Pella Windows and Doors", url: "https://www.pella.com" },
      { name: "Simonton Windows", url: "https://www.simonton.com" },
      { name: "Therma-Tru Doors", url: "https://www.thermatru.com" },
    ],
  },
];

// The page shows a handful of broad groups instead of every category above. A supplier listed under
// two categories in the same group (Moeller, CertainTeed, Moen) appears once. The order is set so the
// page's flowing columns come out roughly even: Structure and Systems, Exterior, then Kitchen and Interior.
const BROAD_GROUPS: { title: string; categories: string[] }[] = [
  {
    title: 'Structure',
    categories: ['Foundation and Concrete', 'Truss and Floor Systems', 'Masonry', 'Insulation'],
  },
  { title: 'Systems', categories: ['Mechanicals', 'Low Voltage', 'Central Vacuum'] },
  {
    title: 'Exterior',
    categories: [
      'Roofing',
      'Siding',
      'Spouting and Gutters',
      'Windows and Doors',
      'Garage Doors and Operators',
      'Decking',
      'Columns, Railing, Fence',
    ],
  },
  {
    title: 'Kitchen and bath',
    categories: ['Cabinetry and Tops', 'Appliances', 'Plumbing Fixtures', 'Bathroom/Accessories', 'Shower Doors'],
  },
  {
    title: 'Interior finishes',
    categories: ['Flooring', 'Interior Trim', 'Painting', 'Hardware', 'Light Fixtures', 'Fireplaces', 'Shelving'],
  },
];

export const PARTNER_SECTIONS: { title: string; partners: Partner[] }[] = BROAD_GROUPS.map(({ title, categories }) => {
  const byName = new Map<string, Partner>();
  for (const group of PARTNER_GROUPS) {
    if (!categories.includes(group.category)) continue;
    for (const partner of group.partners) if (!byName.has(partner.name)) byName.set(partner.name, partner);
  }
  return { title, partners: [...byName.values()].sort((a, b) => a.name.localeCompare(b.name)) };
});
