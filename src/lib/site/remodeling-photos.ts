// Remodeling photos for the Remodeling page.
// Alt text comes from a visual review of each photo (see scripts/seed-data.ts).
// Crale's old gallery does not record which rooms were remodels and which were new builds, so
// captions name the room and never claim a project was a remodel. Tag them in the portal to fix this.
import type { SitePhoto } from './photos';
import bathBlueMosaic from '@/../public/images/remodeling/bath-blue-mosaic.jpg';
import cofferedCeilingBar from '@/../public/images/remodeling/coffered-ceiling-bar.jpg';
import kitchenBlueBacksplash from '@/../public/images/remodeling/kitchen-blue-backsplash.jpg';
import knottyPineStaircase from '@/../public/images/remodeling/knotty-pine-staircase.jpg';
import livingRoomFireplaceMantel from '@/../public/images/remodeling/living-room-fireplace-mantel.jpg';
import livingRoomLoftView from '@/../public/images/remodeling/living-room-loft-view.jpg';
import showerFramelessGlass from '@/../public/images/remodeling/shower-frameless-glass.jpg';
import showerWoodLookTile from '@/../public/images/remodeling/shower-wood-look-tile.jpg';
import soakingTubStone from '@/../public/images/remodeling/soaking-tub-stone-surround.jpg';
import vaultedShiplapCeiling from '@/../public/images/remodeling/vaulted-shiplap-ceiling.jpg';
import whiteKitchenPeninsula from '@/../public/images/remodeling/white-kitchen-peninsula.jpg';

export const REMODELING_PHOTOS = {
  livingRoomLoftView: { image: livingRoomLoftView, alt: 'Open living room with a stone fireplace, viewed from the loft above' },
  whiteKitchenPeninsula: { image: whiteKitchenPeninsula, alt: 'White kitchen with a peninsula, barstools, and gray plank floors' },
  kitchenBlueBacksplash: { image: kitchenBlueBacksplash, alt: 'Kitchen with a blue tile backsplash, pendant lights, and a loft railing above' },
  showerFramelessGlass: { image: showerFramelessGlass, alt: 'Frameless glass shower with marble-look tile beside a soaking tub' },
  vaultedShiplapCeiling: { image: vaultedShiplapCeiling, alt: 'Vaulted shiplap ceiling with a wood beam and a ceiling fan' },
  livingRoomFireplaceMantel: { image: livingRoomFireplaceMantel, alt: 'Living room with a stone fireplace, wood mantel, and hardwood floors' },
  cofferedCeilingBar: { image: cofferedCeilingBar, alt: 'Coffered wood ceiling above a custom bar with turned columns' },
  knottyPineStaircase: { image: knottyPineStaircase, alt: 'Knotty pine staircase and entry beside a stone fireplace' },
  bathBlueMosaic: { image: bathBlueMosaic, alt: 'Blue mosaic tile bathroom with a walk-in shower and a soaking tub' },
  soakingTubStone: { image: soakingTubStone, alt: 'Soaking tub set in a stacked stone and wood surround' },
  showerWoodLookTile: { image: showerWoodLookTile, alt: 'Walk-in shower with wood-look tile walls and a pebble floor' },
} satisfies Record<string, SitePhoto>;
