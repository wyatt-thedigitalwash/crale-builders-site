// Commercial and industrial photos for the Commercial page.
// Alt text comes from a visual review of each photo (see scripts/seed-data.ts).
import type { SitePhoto } from './photos';
import brickOfficeFlagpole from '@/../public/images/commercial/brick-office-flagpole.jpg';
import brickStuccoOffice from '@/../public/images/commercial/brick-stucco-office.jpg';
import gymBasketballCourt from '@/../public/images/commercial/gym-basketball-court.jpg';
import patioStorefront from '@/../public/images/commercial/patio-storefront.jpg';
import salonInteriorLong from '@/../public/images/commercial/salon-interior-long.jpg';
import salonInteriorStations from '@/../public/images/commercial/salon-interior-stations.jpg';
import trainingRoom from '@/../public/images/commercial/training-room.jpg';
import villageSalonBuilding from '@/../public/images/commercial/village-salon-building.jpg';
import warehouseRacking from '@/../public/images/commercial/warehouse-racking.jpg';

export const COMMERCIAL_PHOTOS = {
  brickOfficeFlagpole: { image: brickOfficeFlagpole, alt: 'Brick office building with a flagpole and landscaped entry steps' },
  brickStuccoOffice: { image: brickStuccoOffice, alt: 'Single-story brick and stucco office building with a parking lot' },
  villageSalonBuilding: { image: villageSalonBuilding, alt: 'Village Salon and Spa building with its round green sign' },
  patioStorefront: { image: patioStorefront, alt: 'Small commercial building with a covered patio and picnic tables' },
  salonInteriorStations: { image: salonInteriorStations, alt: 'Salon interior with styling stations and decorative lighting' },
  salonInteriorLong: { image: salonInteriorLong, alt: 'Long salon interior with styling chairs and an exposed ceiling' },
  warehouseRacking: { image: warehouseRacking, alt: 'Warehouse interior with steel racking and overhead doors' },
  gymBasketballCourt: { image: gymBasketballCourt, alt: 'Indoor gym with a basketball court and American and Ohio flags' },
  trainingRoom: { image: trainingRoom, alt: 'Training room with tables, chairs, and epoxy flooring' },
} satisfies Record<string, SitePhoto>;
