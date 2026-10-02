// Alt text and categories for photos imported from the old cralebuilders.com,
// written from a visual review of each image. Keys are file names without extension.

export const INDIAN_LAKE_ALT: Record<string, string> = {
  '001': 'Two-story lake home with a stone-front garage, covered porch and mature shade tree',
  '004': 'Craftsman-style lake home with stone accents, a gabled entry and brown carriage garage door',
  '005': 'Dark gray waterfront home with a lower-level deck and bright green accent wall above a seawall',
  '007': 'Gray three-story lake home with stacked white balconies beside a covered boat lift',
  '008': 'Cream two-story lake home with an arched window and red deck along the seawall',
  '009': 'Cottage-style lake home with a screened porch overlooking lakeside picnic tables',
  '010': 'Gray ranch home with stone wainscot, a white garage door and dark roof',
  '011': 'Waterfront ranch home with a glass sunroom and lakeside patio',
  '012': 'Sage green two-story home with a stone base, wood carriage garage door and dormer',
  '013': 'Navy blue lake cottage with a wall of windows facing the water under a large tree',
  '014': 'Light gray lake home with an arched gable window and covered boat dock',
  '015': 'Two-story lake home with tall windows, a covered porch and wooden boat dock in fall',
  '016': 'White A-frame lake home with a tall glass gable wall and patio at the water',
  '017': 'Blue-gray lake home with a round tower, balcony and stone rip-rap shoreline',
  '018': 'Taupe two-story lake home with a covered upper deck and patio at the seawall',
  '019': 'Cape Cod-style lake home with dormers, a stone chimney and screened porch along the seawall',
  '020': 'Tan board-and-batten lake home with a vaulted glass gable and covered patio',
  '021': 'Tan board-and-batten lake home with stone wainscot and a dark garage door',
  '022': 'Gray ranch lake home with a double garage, arched window and landscaped yard',
  '023': 'White lake home with a red metal roof, glass gable, brick chimney and red deck',
  '024': 'Gray two-story lake home with a covered porch and arched window along the seawall',
  '025': 'Yellow two-story lake home with a balcony and stone patio along the seawall',
  '026': 'Lake home with a glass gable, covered boat lift and concrete seawall',
  '027': 'Light blue two-story lake home with bay windows and a covered boat dock',
  '028': 'Brown craftsman lake home with a gabled porch and stone columns',
  '029': 'Lake home with a covered patio behind a rip-rap shoreline and wooden dock',
  '030': 'Two-story lake home with a stone lower level and wide decks in fall color',
  '031': 'Gray lake home with bright Adirondack chairs on a floating dock',
};

export const RESIDENTIAL_EXTERIOR_ALT: Record<string, string> = {
  '001': 'Blue two-story farmhouse with a wraparound porch, dormers and stone chimney',
  '002': 'Brick and siding ranch home with a two-car garage',
  '003': 'White farmhouse with a full front porch, three dormers and flower beds',
  '004-rev': 'Stone ranch home with a gabled entry and circular driveway',
  '008': 'Two-story home with stone accents, multiple gables and a young tree-lined lawn',
  '009': 'Cream ranch home with a stone base and hip roof',
  '010': 'Stone ranch home with a covered front porch and attached garage',
  '011': 'Red brick and siding two-story home with a tall gable window',
  '017': 'Brick and stone ranch home with an arched entry and landscaped beds',
  '018': 'White modern farmhouse with board-and-batten gables and a black-trimmed porch',
  '019': 'Brick French country-style home with a turret entry',
  '021': 'Stone and siding ranch home with a timber-framed gable entry',
  '022': 'Rear of a ranch home with a wall of gable windows and covered patio',
  '023': 'Outdoor sport court in front of a large country home',
};

// Interior photos that are remodels, not new builds. They go in the Remodeling category, which feeds
// the Remodeling page, instead of Interiors. These are the photos the Remodeling page was built around.
export const REMODELING_KEYS = new Set(['012', '014', '015', '025', '026', '028', '029', '031', '033', '034', '042']);

export const INTERIOR_ALT: Record<string, string> = {
  '012': 'Knotty pine staircase and entry beside a stone fireplace',
  '013': 'Kitchen with dark cabinetry, pendant lights, granite island and stainless appliances',
  '014': 'Living room with a stone fireplace, wood mantel and hardwood floors',
  '015': 'Blue mosaic tile bathroom with a walk-in shower and soaking tub',
  '024': 'Great room with exposed timber posts and beams open to the kitchen',
  '025': 'Kitchen with a blue tile backsplash, pendant lights and loft railing above',
  '026': 'Vaulted shiplap ceiling with a wood beam and ceiling fan',
  '028': 'White kitchen with a peninsula, barstools and gray plank floors',
  '029': 'Coffered wood ceiling above a custom bar with turned columns',
  '030': 'Cream kitchen cabinets with a dark stained island, double wall ovens and slate floor',
  '031': 'Open living room with a stone fireplace, viewed from the loft above',
  '033': 'Soaking tub set in a stacked stone and wood surround',
  '034': 'Frameless glass shower with marble-look tile beside a soaking tub',
  '035': 'Living room with a stone fireplace framed by built-in shelves',
  '037': 'Open great room and kitchen with a dark beam ceiling',
  '038': 'Tiled walk-in shower with a glass door and accent band',
  '039': 'Vaulted great room with dark beams and an arched window wall',
  '041': 'Vaulted living room with dark beams, stone fireplace and hardwood floors',
  '042': 'Walk-in shower with wood-look tile walls and pebble floor',
  '043': 'Two-story living room with white columns open to the kitchen',
};

export const COMMERCIAL_ALT: Record<string, string> = {
  '001': 'Single-story brick and stucco office building with parking lot',
  '002': 'Brick office building with a flagpole and landscaped entry steps',
  '007': 'Salon interior with styling stations and decorative lighting',
  '008': 'Village Salon and Spa building with its round green sign',
  '009': 'Long salon interior with styling chairs and an exposed ceiling',
  '010': 'Small commercial building with a covered patio and picnic tables',
  '011': 'Warehouse interior with steel racking and overhead doors',
  '012': 'Indoor gym with a basketball court and American and Ohio flags',
  '013': 'Training room with tables, chairs and epoxy flooring',
};

/** Shown on the homepage to start. Staff can change these in the portal. */
export const FEATURED = new Set([
  'indian-lake/031',
  'indian-lake/020',
  'indian-lake/007',
  'indian-lake/030',
  'indian-lake/016',
  'residential/001',
  'residential/018',
]);
