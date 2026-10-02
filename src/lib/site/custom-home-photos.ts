// Custom home photos for the Custom Homes page.
// Alt text comes from a visual review of each photo (see scripts/seed-data.ts).
// These are different homes, not one project, so nothing here should be captioned as a single house.
import type { SitePhoto } from './photos';
import brickFrenchCountry from '@/../public/images/custom-homes/brick-french-country-turret.jpg';
import brickRanchGarage from '@/../public/images/custom-homes/brick-ranch-garage.jpg';
import brickStoneRanch from '@/../public/images/custom-homes/brick-stone-ranch-arched-entry.jpg';
import brickTwoStory from '@/../public/images/custom-homes/brick-two-story-gable-window.jpg';
import creamRanch from '@/../public/images/custom-homes/cream-ranch-hip-roof.jpg';
import gableWindowsRear from '@/../public/images/custom-homes/gable-windows-rear-patio.jpg';
import greatRoomVaulted from '@/../public/images/custom-homes/great-room-vaulted-arched-windows.jpg';
import greatRoomTimber from '@/../public/images/custom-homes/great-room-timber-beams.jpg';
import kitchenCream from '@/../public/images/custom-homes/kitchen-cream-cabinets.jpg';
import kitchenDark from '@/../public/images/custom-homes/kitchen-dark-cabinets.jpg';
import livingRoomColumns from '@/../public/images/custom-homes/living-room-two-story-columns.jpg';
import livingRoomVaulted from '@/../public/images/custom-homes/living-room-vaulted-stone-fireplace.jpg';
import livingRoomFireplace from '@/../public/images/custom-homes/living-room-stone-fireplace.jpg';
import stoneGablesTwoStory from '@/../public/images/custom-homes/stone-gables-two-story.jpg';
import stoneRanchCircleDrive from '@/../public/images/custom-homes/stone-ranch-circle-drive.jpg';
import stoneRanchPorch from '@/../public/images/custom-homes/stone-ranch-porch.jpg';
import timberGableRanch from '@/../public/images/custom-homes/timber-gable-ranch.jpg';
import whiteFarmhousePorch from '@/../public/images/custom-homes/white-farmhouse-porch.jpg';
import whiteModernFarmhouse from '@/../public/images/custom-homes/white-modern-farmhouse.jpg';

export const CUSTOM_HOME_PHOTOS = {
  timberGableRanch: { image: timberGableRanch, alt: 'Stone and siding ranch home with a timber-framed gable entry' },
  whiteFarmhousePorch: { image: whiteFarmhousePorch, alt: 'White farmhouse with a full front porch, three dormers, and flower beds' },
  brickRanchGarage: { image: brickRanchGarage, alt: 'Brick and siding ranch home with a two-car garage' },
  stoneRanchCircleDrive: { image: stoneRanchCircleDrive, alt: 'Stone ranch home with a gabled entry and circular driveway' },
  stoneGablesTwoStory: { image: stoneGablesTwoStory, alt: 'Two-story home with stone accents, multiple gables, and a young tree-lined lawn' },
  creamRanch: { image: creamRanch, alt: 'Cream ranch home with a stone base and hip roof' },
  stoneRanchPorch: { image: stoneRanchPorch, alt: 'Stone ranch home with a covered front porch and attached garage' },
  brickTwoStory: { image: brickTwoStory, alt: 'Red brick and siding two-story home with a tall gable window' },
  brickStoneRanch: { image: brickStoneRanch, alt: 'Brick and stone ranch home with an arched entry and landscaped beds' },
  whiteModernFarmhouse: { image: whiteModernFarmhouse, alt: 'White modern farmhouse with board-and-batten gables and a black-trimmed porch' },
  brickFrenchCountry: { image: brickFrenchCountry, alt: 'Brick French country-style home with a turret entry' },
  gableWindowsRear: { image: gableWindowsRear, alt: 'Rear of a ranch home with a wall of gable windows and a covered patio' },
  kitchenDark: { image: kitchenDark, alt: 'Kitchen with dark cabinetry, pendant lights, a granite island, and stainless appliances' },
  greatRoomTimber: { image: greatRoomTimber, alt: 'Great room with exposed timber posts and beams, open to the kitchen' },
  kitchenCream: { image: kitchenCream, alt: 'Cream kitchen cabinets with a dark stained island and double wall ovens' },
  livingRoomFireplace: { image: livingRoomFireplace, alt: 'Living room with a stone fireplace framed by built-in shelves' },
  livingRoomColumns: { image: livingRoomColumns, alt: 'Two-story living room with white columns, open to the kitchen' },
  greatRoomVaulted: { image: greatRoomVaulted, alt: 'Vaulted great room with dark beams and an arched window wall looking out to a field' },
  livingRoomVaulted: { image: livingRoomVaulted, alt: 'Vaulted living room with dark beams, a stone fireplace, and hardwood floors' },
} satisfies Record<string, SitePhoto>;
