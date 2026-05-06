import type { Product } from './types';

/**
 * Mock product catalogue.
 *
 * In the demo, this file IS the database. When the client greenlights the build,
 * we move these records into Supabase via the schema in /prisma/schema.prisma
 * and replace this file's exports with server-side queries — the component
 * layer does not need to change.
 *
 * Image URLs are Unsplash placeholders chosen to match a streetwear lookbook.
 * Jeremy will swap these for real product photography before the pitch.
 */

// Unsplash query-driven URLs — picked to suggest premium streetwear,
// not actual product fidelity. The `?w=1200&q=80` params keep payloads tight.
const img = (id: string, alt: string) => ({
  url: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`,
  alt,
});

export const products: Product[] = [
  {
    id: 'p_001',
    slug: 'vitoria-mockneck-hoodie-onyx',
    name: 'Mockneck Hoodie',
    tagline: 'Onyx — 500 GSM French Terry',
    priceCents: 24800,
    compareAtCents: undefined,
    category: 'hoodies',
    description:
      'A heavyweight mockneck silhouette in onyx French terry. Built oversized, brushed inside, garment-dyed for depth.',
    longDescription:
      'Cut from a 500 GSM cotton French terry milled in Portugal, the Mockneck Hoodie is the cornerstone of the Vitória catalogue. The mockneck collar replaces the standard hood for a cleaner editorial silhouette while keeping the relaxed drop-shoulder construction.\n\nGarment-dyed after sewing so the seams pull color the same way the body does — every piece is one of one. Brushed interior, ribbed cuffs and waistband, and a single tonal woven label at the side seam.',
    images: [
      img('photo-1556821840-3a63f95609a7', 'Onyx mockneck hoodie front view on model'),
      img('photo-1620799140408-edc6dcb6d633', 'Onyx mockneck hoodie back detail'),
      img('photo-1591047139829-d91aecb6caea', 'Onyx mockneck hoodie sleeve and cuff close-up'),
      img('photo-1620799139507-2a76f79a2f4d', 'Onyx mockneck hoodie editorial side profile'),
    ],
    variants: [
      { id: 'v_001_s', size: 'S', color: 'Onyx', colorHex: '#1A1A1A', stock: 8, sku: 'VIT-MNH-ONX-S' },
      { id: 'v_001_m', size: 'M', color: 'Onyx', colorHex: '#1A1A1A', stock: 12, sku: 'VIT-MNH-ONX-M' },
      { id: 'v_001_l', size: 'L', color: 'Onyx', colorHex: '#1A1A1A', stock: 2, sku: 'VIT-MNH-ONX-L' },
      { id: 'v_001_xl', size: 'XL', color: 'Onyx', colorHex: '#1A1A1A', stock: 0, sku: 'VIT-MNH-ONX-XL' },
    ],
    specs: {
      gsm: 500,
      fabric: '100% organic cotton French terry, garment-dyed',
      fit: 'Oversized — drop shoulder, relaxed body',
      madeIn: 'Portugal',
      modelInfo: 'Model is 6\'1" (185 cm) wearing size M',
      careInstructions: 'Wash cold inside out with like colours. Tumble dry low. Do not bleach.',
    },
    reviews: [
      {
        id: 'r_001_a',
        author: 'Marcus T.',
        rating: 5,
        title: 'Heaviest hoodie I own',
        body: 'The 500 GSM is the real deal — feels structural. Sizing runs true to the oversized intent, I\'m 5\'10" and the M sits exactly how it does in the photos.',
        createdAt: '2026-03-12',
        photoUrl: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&w=600&q=80',
        verifiedBuyer: true,
      },
      {
        id: 'r_001_b',
        author: 'Devon K.',
        rating: 5,
        title: 'Replaces three other hoodies',
        body: 'Mockneck collar is the move. Looks intentional under outerwear in a way a hood never does.',
        createdAt: '2026-02-28',
        verifiedBuyer: true,
      },
      {
        id: 'r_001_c',
        author: 'Adi P.',
        rating: 4,
        title: 'Sized down and glad I did',
        body: 'I usually take L but the M still sits big. Quality is undeniable.',
        createdAt: '2026-02-10',
        verifiedBuyer: true,
      },
    ],
    isLatestDrop: true,
    isNew: true,
    relatedSlugs: ['vitoria-reflective-hoodie-graphite', 'vitoria-heavyweight-tee-bone', 'vitoria-zip-up-oxblood'],
  },
  {
    id: 'p_002',
    slug: 'vitoria-reflective-hoodie-graphite',
    name: 'Reflective Hoodie',
    tagline: 'Graphite — 3M reflective embroidery',
    priceCents: 28800,
    category: 'hoodies',
    description:
      'Standard pullover in graphite with tonal 3M reflective chest embroidery. Reads matte by day, signals sharp under headlights.',
    longDescription:
      'A traditional pullover hood silhouette with one quiet trick: the chest crest is embroidered in 3M reflective thread, tonal to graphite under daylight and ignited under direct light.\n\nMid-weight 420 GSM brushed-back fleece, ribbed cuffs and hem, kangaroo pocket with reinforced bartack stitching. The hood is double-lined so it stands when worn down — a small detail every streetwear buyer notices.',
    images: [
      img('photo-1556821840-3a63f95609a7', 'Graphite reflective hoodie front view'),
      img('photo-1614975059251-992f11792b9f', 'Graphite reflective hoodie 3M embroidery close-up'),
      img('photo-1591047139756-eb107adb8b2a', 'Graphite reflective hoodie hood detail'),
    ],
    variants: [
      { id: 'v_002_s', size: 'S', color: 'Graphite', colorHex: '#3A3A3A', stock: 5, sku: 'VIT-RFH-GRP-S' },
      { id: 'v_002_m', size: 'M', color: 'Graphite', colorHex: '#3A3A3A', stock: 15, sku: 'VIT-RFH-GRP-M' },
      { id: 'v_002_l', size: 'L', color: 'Graphite', colorHex: '#3A3A3A', stock: 9, sku: 'VIT-RFH-GRP-L' },
      { id: 'v_002_xl', size: 'XL', color: 'Graphite', colorHex: '#3A3A3A', stock: 4, sku: 'VIT-RFH-GRP-XL' },
    ],
    specs: {
      gsm: 420,
      fabric: '80% cotton 20% polyester brushed-back fleece, 3M reflective embroidery',
      fit: 'Boxy — true to size, body sits at hip',
      madeIn: 'Portugal',
      modelInfo: 'Model is 5\'11" (180 cm) wearing size M',
      careInstructions: 'Wash cold inside out. Lay flat to dry to preserve reflective embroidery.',
    },
    reviews: [
      {
        id: 'r_002_a',
        author: 'Theo R.',
        rating: 5,
        title: 'Reflective detail is perfect',
        body: 'Restrained during the day, hits at night. Exactly the brief.',
        createdAt: '2026-03-01',
        verifiedBuyer: true,
      },
      {
        id: 'r_002_b',
        author: 'Sasha V.',
        rating: 5,
        title: 'Best mid-weight hoodie',
        body: '420 GSM is the sweet spot — heavy enough to feel premium, light enough to layer under a shell.',
        createdAt: '2026-02-19',
        verifiedBuyer: true,
      },
    ],
    isLatestDrop: true,
    isNew: true,
    relatedSlugs: ['vitoria-mockneck-hoodie-onyx', 'vitoria-zip-up-oxblood', 'vitoria-heavyweight-tee-bone'],
  },
  {
    id: 'p_003',
    slug: 'vitoria-zip-up-oxblood',
    name: 'Full-Zip Hoodie',
    tagline: 'Oxblood — YKK Excella zipper',
    priceCents: 31800,
    category: 'hoodies',
    description:
      'Cropped full-zip in deep oxblood. YKK Excella hardware, raw-edge hem, ribbed contrast cuffs.',
    longDescription:
      'The Full-Zip is built around its hardware — a YKK Excella metal zipper with custom oxblood-coated teeth, the kind specified on outerwear three price tiers up.\n\nCropped through the body for the modern proportion, raw-cut cotton hem treated to curl naturally with each wash. Pair under a leather bomber for the intended look.',
    images: [
      img('photo-1620799140408-edc6dcb6d633', 'Oxblood full-zip hoodie front'),
      img('photo-1551489186-cf8726f514f8', 'Oxblood full-zip hoodie zipper detail'),
      img('photo-1620799139507-2a76f79a2f4d', 'Oxblood full-zip hoodie editorial'),
      img('photo-1556821840-3a63f95609a7', 'Oxblood full-zip hoodie back'),
    ],
    variants: [
      { id: 'v_003_s', size: 'S', color: 'Oxblood', colorHex: '#6E1A24', stock: 0, sku: 'VIT-ZIP-OXB-S' },
      { id: 'v_003_m', size: 'M', color: 'Oxblood', colorHex: '#6E1A24', stock: 1, sku: 'VIT-ZIP-OXB-M' },
      { id: 'v_003_l', size: 'L', color: 'Oxblood', colorHex: '#6E1A24', stock: 6, sku: 'VIT-ZIP-OXB-L' },
      { id: 'v_003_xl', size: 'XL', color: 'Oxblood', colorHex: '#6E1A24', stock: 3, sku: 'VIT-ZIP-OXB-XL' },
    ],
    specs: {
      gsm: 460,
      fabric: '100% cotton loopback terry, YKK Excella metal zipper',
      fit: 'Cropped — true to size, body sits at high hip',
      madeIn: 'Portugal',
      modelInfo: 'Model is 6\'0" (183 cm) wearing size M',
      careInstructions: 'Wash cold zipped, inside out. Hang dry.',
    },
    reviews: [
      {
        id: 'r_003_a',
        author: 'Lauren M.',
        rating: 5,
        title: 'Hardware sells it',
        body: 'YKK Excella on a hoodie is unusual — it makes the whole piece feel intentional.',
        createdAt: '2026-03-08',
        verifiedBuyer: true,
      },
      {
        id: 'r_003_b',
        author: 'Kai N.',
        rating: 5,
        title: 'Cropped fit is right',
        body: 'Sits where it should. Looks correct under a bomber. Nothing else feels like this.',
        createdAt: '2026-02-22',
        photoUrl: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&w=600&q=80',
        verifiedBuyer: true,
      },
    ],
    isLatestDrop: true,
    isNew: false,
    relatedSlugs: ['vitoria-mockneck-hoodie-onyx', 'vitoria-bomber-jacket-stone', 'vitoria-heavyweight-tee-bone'],
  },
  {
    id: 'p_004',
    slug: 'vitoria-heavyweight-tee-bone',
    name: 'Heavyweight Tee',
    tagline: 'Bone — 280 GSM ringspun cotton',
    priceCents: 9800,
    category: 'tees',
    description:
      'A 280 GSM heavyweight tee with structured drape. Ribbed crewneck, dropped shoulder, raw side seam.',
    longDescription:
      'The benchmark tee — 280 GSM ringspun combed cotton, knit on a tubular loom so there are no side seams running down the body.\n\nDropped shoulder for the modern silhouette, double-needle stitching at every stress point, garment-washed for off-the-rack softness. Buy three.',
    images: [
      img('photo-1521572163474-6864f9cf17ab', 'Bone heavyweight tee front'),
      img('photo-1583743814966-8936f5b7be1a', 'Bone heavyweight tee fabric close-up'),
      img('photo-1581655353564-df123a1eb820', 'Bone heavyweight tee on model'),
    ],
    variants: [
      { id: 'v_004_xs', size: 'XS', color: 'Bone', colorHex: '#F5F2EC', stock: 4, sku: 'VIT-HWT-BNE-XS' },
      { id: 'v_004_s', size: 'S', color: 'Bone', colorHex: '#F5F2EC', stock: 22, sku: 'VIT-HWT-BNE-S' },
      { id: 'v_004_m', size: 'M', color: 'Bone', colorHex: '#F5F2EC', stock: 18, sku: 'VIT-HWT-BNE-M' },
      { id: 'v_004_l', size: 'L', color: 'Bone', colorHex: '#F5F2EC', stock: 14, sku: 'VIT-HWT-BNE-L' },
      { id: 'v_004_xl', size: 'XL', color: 'Bone', colorHex: '#F5F2EC', stock: 8, sku: 'VIT-HWT-BNE-XL' },
    ],
    specs: {
      gsm: 280,
      fabric: '100% ringspun combed cotton, tubular knit',
      fit: 'Boxy — true to size, dropped shoulder',
      madeIn: 'Portugal',
      modelInfo: 'Model is 6\'1" (185 cm) wearing size M',
      careInstructions: 'Wash cold. Tumble dry low. Iron inverted if needed.',
    },
    reviews: [
      {
        id: 'r_004_a',
        author: 'Jordan B.',
        rating: 5,
        title: 'The bar for tees',
        body: '280 GSM with no side seams. I bought one, returned to buy three more.',
        createdAt: '2026-03-15',
        verifiedBuyer: true,
      },
      {
        id: 'r_004_b',
        author: 'Hana O.',
        rating: 5,
        title: 'Drapes correctly',
        body: 'Most heavyweight tees feel boxy in a bad way. This one falls right.',
        createdAt: '2026-03-04',
        verifiedBuyer: true,
      },
      {
        id: 'r_004_c',
        author: 'Reza M.',
        rating: 4,
        title: 'Bone is more cream than white',
        body: 'Just a heads up — the bone reads warm. Personally I love it.',
        createdAt: '2026-02-21',
        verifiedBuyer: true,
      },
    ],
    isLatestDrop: true,
    isNew: false,
    relatedSlugs: ['vitoria-mockneck-hoodie-onyx', 'vitoria-heavyweight-tee-onyx', 'vitoria-cargo-pant-stone'],
  },
  {
    id: 'p_005',
    slug: 'vitoria-heavyweight-tee-onyx',
    name: 'Heavyweight Tee',
    tagline: 'Onyx — 280 GSM ringspun cotton',
    priceCents: 9800,
    category: 'tees',
    description: 'Same heavyweight construction in onyx black. Garment-dyed, never resin-coated.',
    longDescription:
      'Identical construction to the Bone heavyweight — 280 GSM tubular knit, dropped shoulder, double-needle stitching — in a deep, garment-dyed onyx that softens with each wash without losing depth.',
    images: [
      img('photo-1583744946564-b52ac1c389c8', 'Onyx heavyweight tee front'),
      img('photo-1583744946564-b52ac1c389c8', 'Onyx heavyweight tee detail'),
      img('photo-1581655353564-df123a1eb820', 'Onyx heavyweight tee on model'),
    ],
    variants: [
      { id: 'v_005_s', size: 'S', color: 'Onyx', colorHex: '#1A1A1A', stock: 17, sku: 'VIT-HWT-ONX-S' },
      { id: 'v_005_m', size: 'M', color: 'Onyx', colorHex: '#1A1A1A', stock: 21, sku: 'VIT-HWT-ONX-M' },
      { id: 'v_005_l', size: 'L', color: 'Onyx', colorHex: '#1A1A1A', stock: 11, sku: 'VIT-HWT-ONX-L' },
      { id: 'v_005_xl', size: 'XL', color: 'Onyx', colorHex: '#1A1A1A', stock: 6, sku: 'VIT-HWT-ONX-XL' },
    ],
    specs: {
      gsm: 280,
      fabric: '100% ringspun combed cotton, tubular knit, garment-dyed',
      fit: 'Boxy — true to size, dropped shoulder',
      madeIn: 'Portugal',
      modelInfo: 'Model is 6\'1" (185 cm) wearing size M',
      careInstructions: 'Wash cold inside out. Tumble dry low.',
    },
    reviews: [
      {
        id: 'r_005_a',
        author: 'Imran K.',
        rating: 5,
        title: 'Black that stays black',
        body: 'Garment-dyed not pigment-washed — the difference is real after 20 washes.',
        createdAt: '2026-03-09',
        verifiedBuyer: true,
      },
    ],
    isLatestDrop: false,
    isNew: false,
    relatedSlugs: ['vitoria-heavyweight-tee-bone', 'vitoria-mockneck-hoodie-onyx', 'vitoria-cargo-pant-stone'],
  },
  {
    id: 'p_006',
    slug: 'vitoria-bomber-jacket-stone',
    name: 'Souvenir Bomber',
    tagline: 'Stone — Reverse weave satin',
    priceCents: 48800,
    compareAtCents: 56800,
    category: 'outerwear',
    description:
      'A reverse-weave satin bomber in stone. MA-1 silhouette stripped of patches, pared to the proportion.',
    longDescription:
      'A souvenir bomber that drops the souvenirs. Reverse-weave satin shell, fully lined in matte cupro, ribbed knit collar, cuffs, and hem. The MA-1 silhouette built for layering — sized to wear over a heavyweight hoodie without distorting through the body.\n\nTwo welt pockets at the waist, one zip pocket at the upper sleeve. Done.',
    images: [
      img('photo-1591047139829-d91aecb6caea', 'Stone souvenir bomber front view'),
      img('photo-1551489186-cf8726f514f8', 'Stone souvenir bomber sleeve and zipper detail'),
      img('photo-1620799140408-edc6dcb6d633', 'Stone souvenir bomber back'),
      img('photo-1614975059251-992f11792b9f', 'Stone souvenir bomber editorial side'),
    ],
    variants: [
      { id: 'v_006_s', size: 'S', color: 'Stone', colorHex: '#A8A39B', stock: 3, sku: 'VIT-BMB-STN-S' },
      { id: 'v_006_m', size: 'M', color: 'Stone', colorHex: '#A8A39B', stock: 7, sku: 'VIT-BMB-STN-M' },
      { id: 'v_006_l', size: 'L', color: 'Stone', colorHex: '#A8A39B', stock: 5, sku: 'VIT-BMB-STN-L' },
      { id: 'v_006_xl', size: 'XL', color: 'Stone', colorHex: '#A8A39B', stock: 2, sku: 'VIT-BMB-STN-XL' },
    ],
    specs: {
      gsm: 0,
      fabric: 'Reverse-weave satin shell, matte cupro lining, ribbed knit trims',
      fit: 'Oversized — sized to layer over heavyweight knits',
      madeIn: 'Japan',
      modelInfo: 'Model is 6\'0" (183 cm) wearing size M',
      careInstructions: 'Dry clean only.',
    },
    reviews: [
      {
        id: 'r_006_a',
        author: 'Felix W.',
        rating: 5,
        title: 'Best bomber I\'ve owned',
        body: 'Reverse-weave satin has weight. Lining is satin-cupro, not poly. You feel it.',
        createdAt: '2026-03-11',
        photoUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80',
        verifiedBuyer: true,
      },
      {
        id: 'r_006_b',
        author: 'Nico V.',
        rating: 5,
        title: 'Layers correctly',
        body: 'Sized to actually fit a hoodie underneath. So many bombers fail this test.',
        createdAt: '2026-02-25',
        verifiedBuyer: true,
      },
    ],
    isLatestDrop: true,
    isNew: true,
    relatedSlugs: ['vitoria-zip-up-oxblood', 'vitoria-mockneck-hoodie-onyx', 'vitoria-cargo-pant-stone'],
  },
  {
    id: 'p_007',
    slug: 'vitoria-cargo-pant-stone',
    name: 'Wide-Leg Cargo',
    tagline: 'Stone — 12 oz brushed twill',
    priceCents: 22800,
    category: 'bottoms',
    description:
      'Wide-leg cargo in 12 oz brushed twill. Sits high, breaks heavy, oversized utility pockets.',
    longDescription:
      'Pattern-drafted at a 24" leg opening — proper wide-leg, not skinny-with-extra-room. 12 oz brushed cotton twill, oversized utility pockets at the thighs, button-tab adjusters at the waist.\n\nSits high on the natural waist. Designed to break across the foot like a tailored trouser, not pool at the ankle.',
    images: [
      img('photo-1624378439575-d8705ad7ae80', 'Stone wide-leg cargo pants front view'),
      img('photo-1624378440479-2925d4c0ddd9', 'Stone wide-leg cargo utility pocket detail'),
      img('photo-1624378439575-d8705ad7ae80', 'Stone wide-leg cargo styled with hoodie'),
    ],
    variants: [
      { id: 'v_007_s', size: 'S', color: 'Stone', colorHex: '#A8A39B', stock: 6, sku: 'VIT-CRG-STN-S' },
      { id: 'v_007_m', size: 'M', color: 'Stone', colorHex: '#A8A39B', stock: 11, sku: 'VIT-CRG-STN-M' },
      { id: 'v_007_l', size: 'L', color: 'Stone', colorHex: '#A8A39B', stock: 9, sku: 'VIT-CRG-STN-L' },
      { id: 'v_007_xl', size: 'XL', color: 'Stone', colorHex: '#A8A39B', stock: 0, sku: 'VIT-CRG-STN-XL' },
    ],
    specs: {
      gsm: 0,
      fabric: '12 oz brushed cotton twill, horn buttons',
      fit: 'Wide-leg, high-rise — 24" leg opening',
      madeIn: 'Portugal',
      modelInfo: 'Model is 6\'1" (185 cm) wearing size M',
      careInstructions: 'Wash cold inside out. Hang dry.',
    },
    reviews: [
      {
        id: 'r_007_a',
        author: 'Yusuf D.',
        rating: 5,
        title: 'Actual wide leg',
        body: '24" leg opening — finally. Most "wide leg" pants are 18" and feel narrow.',
        createdAt: '2026-03-06',
        verifiedBuyer: true,
      },
    ],
    isLatestDrop: false,
    isNew: false,
    relatedSlugs: ['vitoria-heavyweight-tee-bone', 'vitoria-mockneck-hoodie-onyx', 'vitoria-bomber-jacket-stone'],
  },
  {
    id: 'p_008',
    slug: 'vitoria-watch-cap-onyx',
    name: 'Ribbed Watch Cap',
    tagline: 'Onyx — merino lambswool',
    priceCents: 6800,
    category: 'accessories',
    description:
      'A ribbed watch cap in merino lambswool. No pom, no logo, no synthetic blend. Roll it once.',
    longDescription:
      '100% merino lambswool, knit and finished in Scotland. 4x2 ribbed, single-fold construction. The only marker is a tonal woven label inside the band — this is a hat, not a billboard.',
    images: [
      img('photo-1576871337622-98d48d1cf531', 'Onyx watch cap front view'),
      img('photo-1576871337622-98d48d1cf531', 'Onyx watch cap detail of weave'),
    ],
    variants: [
      { id: 'v_008_os', size: 'M', color: 'Onyx', colorHex: '#1A1A1A', stock: 30, sku: 'VIT-WCP-ONX-OS' },
    ],
    specs: {
      gsm: 0,
      fabric: '100% merino lambswool, 4x2 rib',
      fit: 'One size — single fold',
      madeIn: 'Scotland',
      modelInfo: 'Model is 6\'1" (185 cm)',
      careInstructions: 'Hand wash cold with wool detergent. Lay flat to dry.',
    },
    reviews: [
      {
        id: 'r_008_a',
        author: 'Ana R.',
        rating: 5,
        title: 'Real wool',
        body: 'You can feel the difference. Not itchy — actual merino.',
        createdAt: '2026-03-13',
        verifiedBuyer: true,
      },
    ],
    isLatestDrop: false,
    isNew: false,
    relatedSlugs: ['vitoria-mockneck-hoodie-onyx', 'vitoria-heavyweight-tee-onyx'],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is Product => p !== undefined);
}

export function getLatestDrop(): Product[] {
  return products.filter((p) => p.isLatestDrop);
}
