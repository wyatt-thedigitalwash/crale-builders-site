// Client testimonials from Crale's current website, split into a short pull line and supporting sentences.
// Both parts are the client's own words, lightly trimmed. Dashes in the originals are written as
// commas or periods (no em dashes in site copy).
// Confirm with Crale that each client is still happy to be named before launch.

export type Testimonial = {
  /** Short line from the quote, set as a headline. */
  pull: string;
  /** Supporting sentences from the same quote, not repeating the pull line. */
  quote: string;
  name: string;
  place: string;
};

export const TESTIMONIALS = {
  coil: {
    pull: 'Everything was quality, no shortcuts.',
    quote:
      'They were extremely patient during the planning process, working around many issues. The crews were polite and they answered questions freely and openly.',
    name: 'Linda Coil',
    place: 'Belle Center',
  },
  goettemoeller: {
    pull: 'They finished on time and at budget.',
    quote:
      'They were very flexible and willing to work with us, and the communication was excellent through the whole project.',
    name: 'Diane Goettemoeller',
    place: 'Botkins',
  },
  hubble: {
    pull: 'They were very particular and precise.',
    quote: 'The quality of work and craftsmanship is excellent. We were thrilled with the finishing work.',
    name: 'Diane Hubble',
    place: 'Sidney',
  },
} satisfies Record<string, Testimonial>;
