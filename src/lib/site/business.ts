// Business details shown across the site. One place to update phone, address, and service area.

export const BUSINESS = {
  legalName: 'Crale Builders, Inc.',
  name: 'Crale Builders',
  phone: { display: '937.498.8000', href: 'tel:+19374988000' },
  fax: '937.498.8001',
  email: 'info@cralebuilders.com',
  address: {
    street: '3486 State Route 29 N',
    city: 'Sidney',
    state: 'Ohio',
    zip: '45365',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=3486+State+Route+29+N+Sidney+OH+45365',
  founded: 1995,
  indianLakeSince: 1999,
  counties: ['Shelby', 'Logan', 'Miami', 'Auglaize', 'Champaign'],
  lakeCommunities: ['Lakeview', 'Russells Point', 'Orchard Island', 'Belle Center'],
  chambers: [
    { name: 'Sidney-Shelby County Chamber of Commerce', href: 'https://www.sidneyshelbychamber.com/' },
    { name: 'Indian Lake Area Chamber of Commerce', href: 'https://www.visitindianlakeohio.com/' },
  ],
} as const;

/** "A, B, C, and D" */
export function listWithAnd(items: readonly string[]): string {
  if (items.length <= 2) return items.join(' and ');
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}
