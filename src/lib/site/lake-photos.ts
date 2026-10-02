// Indian Lake photos shared by the homepage and the Indian Lake page.
// Alt text comes from a visual review of each photo (see scripts/seed-data.ts).
import type { SitePhoto } from './photos';
import aFrame from '@/../public/images/indian-lake/a-frame.jpg';
import balconiesBoatLift from '@/../public/images/indian-lake/balconies-boat-lift.jpg';
import bayWindowsDock from '@/../public/images/indian-lake/bay-windows-dock.jpg';
import boardBattenGreatRoom from '@/../public/images/indian-lake/board-batten-great-room.jpg';
import boardBattenLakeSide from '@/../public/images/indian-lake/board-batten-lake-side.jpg';
import boardBattenStreetSide from '@/../public/images/indian-lake/board-batten-street-side.jpg';
import capeCod from '@/../public/images/indian-lake/cape-cod.jpg';
import cottage from '@/../public/images/indian-lake/cottage.jpg';
import coveredPorchArched from '@/../public/images/indian-lake/covered-porch-arched.jpg';
import dockChairs from '@/../public/images/indian-lake/dock-chairs.jpg';
import fallBoatDock from '@/../public/images/indian-lake/fall-boat-dock.jpg';
import fallDecks from '@/../public/images/indian-lake/fall-decks.jpg';
import gableBoatLift from '@/../public/images/indian-lake/gable-boat-lift.jpg';
import grayWaterfrontDeck from '@/../public/images/indian-lake/gray-waterfront-deck.jpg';
import redRoofGlassGable from '@/../public/images/indian-lake/red-roof-glass-gable.jpg';
import ripRapPatio from '@/../public/images/indian-lake/rip-rap-patio.jpg';
import sunroomRanch from '@/../public/images/indian-lake/sunroom-ranch.jpg';
import taupeUpperDeck from '@/../public/images/indian-lake/taupe-upper-deck.jpg';
import towerRipRap from '@/../public/images/indian-lake/tower-rip-rap.jpg';

export type LakePhoto = SitePhoto;

export const LAKE_PHOTOS = {
  fallDecks: { image: fallDecks, alt: 'Two-story lake home with a stone lower level and wide decks in fall color' },
  // Same house from both sides: the featured home on the Indian Lake page.
  boardBattenLakeSide: {
    image: boardBattenLakeSide,
    alt: 'Lake side of a tan board-and-batten home with a vaulted covered patio and a glass gable wall',
  },
  boardBattenStreetSide: {
    image: boardBattenStreetSide,
    alt: 'Street side of the same tan board-and-batten home with a stone wainscot and a dark garage door',
  },
  boardBattenGreatRoom: {
    image: boardBattenGreatRoom,
    alt: 'Great room in the same lake home with a dark beamed vaulted ceiling, open to a white kitchen with a dark island',
  },
  taupeUpperDeck: { image: taupeUpperDeck, alt: 'Taupe two-story lake home with a covered upper deck and patio at the seawall' },
  balconiesBoatLift: { image: balconiesBoatLift, alt: 'Gray three-story lake home with stacked white balconies beside a covered boat lift' },
  dockChairs: { image: dockChairs, alt: 'Gray lake home with bright Adirondack chairs on a floating dock' },
  ripRapPatio: { image: ripRapPatio, alt: 'Lake home with a covered patio behind a rip-rap shoreline and wooden dock' },
  aFrame: { image: aFrame, alt: 'White A-frame lake home with a tall glass gable wall and patio at the water' },
  capeCod: { image: capeCod, alt: 'Cape Cod-style lake home with dormers, a stone chimney, and a screened porch along the seawall' },
  gableBoatLift: { image: gableBoatLift, alt: 'Lake home with a glass gable, covered boat lift, and concrete seawall' },
  cottage: { image: cottage, alt: 'Navy blue lake cottage with a wall of windows facing the water under a large tree' },
  grayWaterfrontDeck: { image: grayWaterfrontDeck, alt: 'Dark gray waterfront home with a lower-level deck and bright green accent wall above a seawall' },
  sunroomRanch: { image: sunroomRanch, alt: 'Waterfront ranch home with a glass sunroom and lakeside patio' },
  fallBoatDock: { image: fallBoatDock, alt: 'Two-story lake home with tall windows, a covered porch, and a wooden boat dock in fall' },
  towerRipRap: { image: towerRipRap, alt: 'Blue-gray lake home with a round tower, balcony, and stone rip-rap shoreline' },
  redRoofGlassGable: { image: redRoofGlassGable, alt: 'White lake home with a red metal roof, glass gable, brick chimney, and red deck' },
  coveredPorchArched: { image: coveredPorchArched, alt: 'Gray two-story lake home with a covered porch and arched window along the seawall' },
  bayWindowsDock: { image: bayWindowsDock, alt: 'Light blue two-story lake home with bay windows and a covered boat dock' },
} satisfies Record<string, LakePhoto>;
