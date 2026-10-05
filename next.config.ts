import type { NextConfig } from "next";


// Paths with spaces are written URL-encoded (%20), the way browsers request them.
// 301 redirects from the old cralebuilders.com (26 pages plus linked PDFs), so bookmarks, search
// results, and inbound links land on the matching new page. See research/CRALE-RESEARCH.md section 2.
const OLD_URLS: [string, string][] = [
  ['/index.html', '/'],
  ['/about.html', '/about'],
  ['/contact.html', '/contact'],
  ['/residential.html', '/custom-homes'],
  ['/commercial.html', '/commercial'],
  ['/projects.html', '/our-work'],
  ['/projects-residential.html', '/our-work'],
  ['/projects-indian-lake.html', '/indian-lake'],
  ['/projects-commercial.html', '/commercial'],
  ['/products-partners.html', '/partners'],
  ['/property-management.html', '/rentals'],
  // Old rental pages. Duplex pages covered two units; they go to the first unit's page.
  ['/Rentals/413-Clover-Hill.html', '/rentals/413-clover-hill-tipp-city'],
  ['/Rentals/2004-Abby-Glen.html', '/rentals/2004-abby-glen-tipp-city'],
  ['/Rentals/567-575-Cider-Mill.html', '/rentals/567-cider-mill-tipp-city'],
  ['/Rentals/581-585-Cider-Mill.html', '/rentals/581-cider-mill-tipp-city'],
  ['/Rentals/584-Cider-Mill.html', '/rentals/584-cider-mill-tipp-city'],
  ['/Rentals/1611-1621-Cumberland.html', '/rentals/1611-cumberland-sidney'],
  ['/Rentals/1691-1701-Cumberland.html', '/rentals/1691-cumberland-sidney'],
  ['/Rentals/1743-1755-Cumberland.html', '/rentals/1743-cumberland-sidney'],
  ['/Rentals/901-Winter-Ridge.html', '/rentals/901-winter-ridge-sidney'],
  ['/Rentals/919-921-Winter-Ridge.html', '/rentals/919-winter-ridge-sidney'],
  ['/Rentals/951-Winter-Ridge.html', '/rentals/951-winter-ridge-sidney'],
  ['/Rentals/956-958-Winter-Ridge.html', '/rentals/956-winter-ridge-sidney'],
  ['/Rentals/962-964-Winter-Ridge.html', '/rentals/962-winter-ridge-sidney'],
  ['/Rentals/967-969-Winter-Ridge.html', '/rentals/967-winter-ridge-sidney'],
  ['/Rentals/973-975-Winter-Ridge.html', '/rentals/973-winter-ridge-sidney'],
  // Rental paperwork, now in /documents.
  ['/images/rentals/APPLICATION.pdf', '/documents/crale-rental-application.pdf'],
  ['/images/rentals/Lease.pdf', '/documents/crale-rental-lease.pdf'],
  ['/images/rentals/LEAD%20BASE%20FORM.pdf', '/documents/lead-based-paint-disclosure-form.pdf'],
  ['/images/rentals/LeadPaintDisclosure.pdf', '/documents/protect-your-family-from-lead-epa.pdf'],
  ['/images/rentals/Carbon%20Monoxide%20Information.pdf', '/documents/carbon-monoxide-safety.pdf'],
];

// Anything else from the old structure: first match wins, so these sit after the specific URLs.
// Next.js matches sources case-insensitively, so "/Rentals/..." would also catch the new "/rentals"
// pages. The old rental pages all ended in .html and the new ones never do, so the pattern requires it.
const OLD_PATTERNS: [string, string][] = [
  ['/Rentals/:page(.*\\.html)', '/rentals'],
  ['/images/rentals/:path*', '/rentals'], // floor plan PDFs and old rental photos
  ['/images/Gallery/:path*', '/our-work'],
  ['/images/rotating%20photos/:path*', '/'],
  ['/images/CraleBrochure.pdf', '/about'],
];

/** Each old URL with and without a trailing slash. */
const withSlashes = ([source, destination]: [string, string]) =>
  source.includes(':') ? [{ source, destination }] : [{ source, destination }, { source: `${source}/`, destination }];

const nextConfig: NextConfig = {
  cacheComponents: true,
  // PGlite (local development database) ships WASM that must not be bundled.
  serverExternalPackages: ['@electric-sql/pglite'],
  images: {
    // The old-site photos are already compressed and mostly 1000px wide. Re-encoding them at the default 75
    // added visible artifacts, so every optimized image is served at 90 instead.
    qualities: [90],
    // Rental and gallery photos uploaded through the portal live in Vercel Blob.
    remotePatterns: [
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com', pathname: '/**' },
    ],
  },
  async redirects() {
    return [...OLD_URLS, ...OLD_PATTERNS].flatMap(withSlashes).map((rule) => ({ ...rule, permanent: true }));
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      // Static files from public/. Next.js already caches its own hashed /_next/static files for a year.
      // Photos and logo files never change in place, so they cache for a year.
      ...['/images/:path*', '/brand/:path*'].map((source) => ({
        source,
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      })),
      // Icons, the share image, the manifest, and the rental PDFs keep their names when updated,
      // so they cache for a day instead.
      ...[
        '/favicon.ico',
        '/apple-touch-icon.png',
        '/android-chrome-:size.png',
        '/og-image.png',
        '/site.webmanifest',
        '/documents/:path*',
      ].map((source) => ({
        source,
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      })),
    ];
  },
};

export default nextConfig;
