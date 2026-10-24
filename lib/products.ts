import type { Product, Chapter } from './types';

/**
 * Mock product catalogue.
 *
 * For now, this file IS the database. When the site moves to a real backend,
 * these records go into Supabase via the schema in /prisma/schema.prisma
 * and replace this file's exports with server-side queries — the component
 * layer does not need to change.
 *
 * Image URLs are Unsplash placeholders pulled from streetwear editorial shoots.
 * Every product image references a distinct photo — no stock shot is reused
 * across the catalogue. These get swapped for real product photography
 * once there is some.
 */

// Unsplash query-driven URLs — picked to read as streetwear editorial,
// not actual product fidelity. The `?w=1400&q=80` params keep payloads tight.
const img = (id: string, alt: string) => ({
  url: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`,
  alt,
});

export const products: Product[] = [
  {
    id: 'p_001',
    slug: 'heavyweight-hoodie-onyx',
    name: 'Heavyweight Hoodie',
    tagline: 'Onyx — 500 GSM French Terry',
    priceCents: 24800,
    compareAtCents: undefined,
    category: 'hoodies',
    description:
      'A heavyweight hooded silhouette in onyx French terry. Built oversized, brushed inside, garment-dyed for depth.',
    longDescription:
      'Cut from a 500 GSM cotton French terry milled in Portugal, the Heavyweight Hoodie is the cornerstone of the catalogue. A classic pullover hood on a relaxed drop-shoulder construction — double-lined so it stands when worn down.\n\nGarment-dyed after sewing so the seams pull color the same way the body does — every piece is one of one. Brushed interior, ribbed cuffs and waistband, and a single tonal woven label at the side seam.',
    images: [
      img('photo-1523398002811-999ca8dec234', 'Onyx heavyweight hoodie front view on model'),
      img('photo-1588117260148-b47818741c74', 'Onyx heavyweight hoodie back detail'),
      img('photo-1538329972958-465d6d2144ed', 'Onyx heavyweight hoodie sleeve and cuff close-up'),
      img('photo-1559697242-a465f2578a95', 'Onyx heavyweight hoodie editorial side profile'),
    ],
    variants: [
      { id: 'v_001_s', size: 'S', color: 'Onyx', colorHex: '#1A1A1A', stock: 8, sku: 'TL-HWH-ONX-S' },
      { id: 'v_001_m', size: 'M', color: 'Onyx', colorHex: '#1A1A1A', stock: 12, sku: 'TL-HWH-ONX-M' },
      { id: 'v_001_l', size: 'L', color: 'Onyx', colorHex: '#1A1A1A', stock: 2, sku: 'TL-HWH-ONX-L' },
      { id: 'v_001_xl', size: 'XL', color: 'Onyx', colorHex: '#1A1A1A', stock: 0, sku: 'TL-HWH-ONX-XL' },
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
        photoUrl: 'https://images.unsplash.com/photo-1688111421205-a0a85415b224?auto=format&fit=crop&w=600&q=80',
        verifiedBuyer: true,
      },
      {
        id: 'r_001_b',
        author: 'Devon K.',
        rating: 5,
        title: 'Replaces three other hoodies',
        body: 'Pullover hood done right. Looks intentional under outerwear in a way most hoodies never do.',
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
    relatedSlugs: ['reflective-hoodie-graphite', 'heavyweight-tee-bone', 'zip-up-oxblood'],
  },
  {
    id: 'p_002',
    slug: 'reflective-hoodie-graphite',
    name: 'Reflective Hoodie',
    tagline: 'Graphite — 3M reflective embroidery',
    priceCents: 28800,
    category: 'hoodies',
    description:
      'Standard pullover in graphite with tonal 3M reflective chest embroidery. Reads matte by day, signals sharp under headlights.',
    longDescription:
      'A traditional pullover hood silhouette with one quiet trick: the chest crest is embroidered in 3M reflective thread, tonal to graphite under daylight and ignited under direct light.\n\nMid-weight 420 GSM brushed-back fleece, ribbed cuffs and hem, kangaroo pocket with reinforced bartack stitching. The hood is double-lined so it stands when worn down — a small detail every streetwear buyer notices.',
    images: [
      img('photo-1635650804263-1a1941e14df5', 'Graphite reflective hoodie front view'),
      img('photo-1635650804483-2a77a8c9e728', 'Graphite reflective hoodie 3M embroidery close-up'),
      img('photo-1660486044177-45cd45bb5e99', 'Graphite reflective hoodie hood detail'),
    ],
    variants: [
      { id: 'v_002_s', size: 'S', color: 'Graphite', colorHex: '#3A3A3A', stock: 5, sku: 'TL-RFH-GRP-S' },
      { id: 'v_002_m', size: 'M', color: 'Graphite', colorHex: '#3A3A3A', stock: 15, sku: 'TL-RFH-GRP-M' },
      { id: 'v_002_l', size: 'L', color: 'Graphite', colorHex: '#3A3A3A', stock: 9, sku: 'TL-RFH-GRP-L' },
      { id: 'v_002_xl', size: 'XL', color: 'Graphite', colorHex: '#3A3A3A', stock: 4, sku: 'TL-RFH-GRP-XL' },
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
    relatedSlugs: ['heavyweight-hoodie-onyx', 'zip-up-oxblood', 'heavyweight-tee-bone'],
  },
  {
    id: 'p_003',
    slug: 'zip-up-oxblood',
    name: 'Full-Zip Hoodie',
    tagline: 'Oxblood — YKK Excella zipper',
    priceCents: 31800,
    category: 'hoodies',
    description:
      'Cropped full-zip in deep oxblood. YKK Excella hardware, raw-edge hem, ribbed contrast cuffs.',
    longDescription:
      'The Full-Zip is built around its hardware — a YKK Excella metal zipper with custom oxblood-coated teeth, the kind specified on outerwear three price tiers up.\n\nCropped through the body for the modern proportion, raw-cut cotton hem treated to curl naturally with each wash. Pair under a leather bomber for the intended look.',
    images: [
      img('photo-1532332248682-206cc786359f', 'Oxblood full-zip hoodie front'),
      img('photo-1635650805023-f2529440b5aa', 'Oxblood full-zip hoodie zipper detail'),
      img('photo-1602078019624-f4355d0687fd', 'Oxblood full-zip hoodie editorial'),
      img('photo-1635650804060-bb009bcb2ea5', 'Oxblood full-zip hoodie back'),
    ],
    variants: [
      { id: 'v_003_s', size: 'S', color: 'Oxblood', colorHex: '#6E1A24', stock: 0, sku: 'TL-ZIP-OXB-S' },
      { id: 'v_003_m', size: 'M', color: 'Oxblood', colorHex: '#6E1A24', stock: 1, sku: 'TL-ZIP-OXB-M' },
      { id: 'v_003_l', size: 'L', color: 'Oxblood', colorHex: '#6E1A24', stock: 6, sku: 'TL-ZIP-OXB-L' },
      { id: 'v_003_xl', size: 'XL', color: 'Oxblood', colorHex: '#6E1A24', stock: 3, sku: 'TL-ZIP-OXB-XL' },
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
        photoUrl: 'https://images.unsplash.com/photo-1614214191247-5b2d3a734f1b?auto=format&fit=crop&w=600&q=80',
        verifiedBuyer: true,
      },
    ],
    isLatestDrop: true,
    isNew: false,
    relatedSlugs: ['heavyweight-hoodie-onyx', 'bomber-jacket-stone', 'heavyweight-tee-bone'],
  },
  {
    id: 'p_004',
    slug: 'heavyweight-tee-bone',
    name: 'Heavyweight Tee',
    tagline: 'Bone — 280 GSM ringspun cotton',
    priceCents: 9800,
    category: 'tees',
    description:
      'A 280 GSM heavyweight tee with structured drape. Ribbed crewneck, dropped shoulder, raw side seam.',
    longDescription:
      'The benchmark tee — 280 GSM ringspun combed cotton, knit on a tubular loom so there are no side seams running down the body.\n\nDropped shoulder for the modern silhouette, double-needle stitching at every stress point, garment-washed for off-the-rack softness. Buy three.',
    images: [
      img('photo-1503341504253-dff4815485f1', 'Heavyweight tee worn on model — streetwear editorial'),
      img('photo-1624353656309-8be1a6c457be', 'Bone heavyweight tee fabric close-up'),
      img('photo-1559697242-7c922c6198c6', 'Bone heavyweight tee on model'),
    ],
    variants: [
      { id: 'v_004_xs', size: 'XS', color: 'Bone', colorHex: '#F5F2EC', stock: 4, sku: 'TL-HWT-BNE-XS' },
      { id: 'v_004_s', size: 'S', color: 'Bone', colorHex: '#F5F2EC', stock: 22, sku: 'TL-HWT-BNE-S' },
      { id: 'v_004_m', size: 'M', color: 'Bone', colorHex: '#F5F2EC', stock: 18, sku: 'TL-HWT-BNE-M' },
      { id: 'v_004_l', size: 'L', color: 'Bone', colorHex: '#F5F2EC', stock: 14, sku: 'TL-HWT-BNE-L' },
      { id: 'v_004_xl', size: 'XL', color: 'Bone', colorHex: '#F5F2EC', stock: 8, sku: 'TL-HWT-BNE-XL' },
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
    relatedSlugs: ['heavyweight-hoodie-onyx', 'heavyweight-tee-onyx', 'cargo-pant-stone'],
  },
  {
    id: 'p_005',
    slug: 'heavyweight-tee-onyx',
    name: 'Heavyweight Tee',
    tagline: 'Onyx — 280 GSM ringspun cotton',
    priceCents: 9800,
    category: 'tees',
    description: 'Same heavyweight construction in onyx black. Garment-dyed, never resin-coated.',
    longDescription:
      'Identical construction to the Bone heavyweight — 280 GSM tubular knit, dropped shoulder, double-needle stitching — in a deep, garment-dyed onyx that softens with each wash without losing depth.',
    images: [
      img('photo-1535487958887-032fb5767ade', 'Onyx heavyweight tee front'),
      img('photo-1697507803481-5724f26a7b50', 'Onyx heavyweight tee detail'),
      img('photo-1670092473608-47d146ea71b4', 'Onyx heavyweight tee on model'),
    ],
    variants: [
      { id: 'v_005_s', size: 'S', color: 'Onyx', colorHex: '#1A1A1A', stock: 17, sku: 'TL-HWT-ONX-S' },
      { id: 'v_005_m', size: 'M', color: 'Onyx', colorHex: '#1A1A1A', stock: 21, sku: 'TL-HWT-ONX-M' },
      { id: 'v_005_l', size: 'L', color: 'Onyx', colorHex: '#1A1A1A', stock: 11, sku: 'TL-HWT-ONX-L' },
      { id: 'v_005_xl', size: 'XL', color: 'Onyx', colorHex: '#1A1A1A', stock: 6, sku: 'TL-HWT-ONX-XL' },
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
    relatedSlugs: ['heavyweight-tee-bone', 'heavyweight-hoodie-onyx', 'cargo-pant-stone'],
  },
  {
    id: 'p_006',
    slug: 'bomber-jacket-stone',
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
      img('photo-1586231912972-d0970f9ce787', 'Stone souvenir bomber front view'),
      img('photo-1647218947427-d783309440d2', 'Stone souvenir bomber sleeve and zipper detail'),
      img('photo-1542062700-9b61ccbc1696', 'Stone souvenir bomber back'),
      img('photo-1689044611227-3267fabaf76a', 'Stone souvenir bomber editorial side'),
    ],
    variants: [
      { id: 'v_006_s', size: 'S', color: 'Stone', colorHex: '#A8A39B', stock: 3, sku: 'TL-BMB-STN-S' },
      { id: 'v_006_m', size: 'M', color: 'Stone', colorHex: '#A8A39B', stock: 7, sku: 'TL-BMB-STN-M' },
      { id: 'v_006_l', size: 'L', color: 'Stone', colorHex: '#A8A39B', stock: 5, sku: 'TL-BMB-STN-L' },
      { id: 'v_006_xl', size: 'XL', color: 'Stone', colorHex: '#A8A39B', stock: 2, sku: 'TL-BMB-STN-XL' },
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
        photoUrl: 'https://images.unsplash.com/photo-1565978771542-0db9ab9ad3de?auto=format&fit=crop&w=600&q=80',
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
    relatedSlugs: ['zip-up-oxblood', 'heavyweight-hoodie-onyx', 'cargo-pant-stone'],
  },
  {
    id: 'p_007',
    slug: 'cargo-pant-stone',
    name: 'Wide-Leg Cargo',
    tagline: 'Stone — 12 oz brushed twill',
    priceCents: 22800,
    category: 'bottoms',
    description:
      'Wide-leg cargo in 12 oz brushed twill. Sits high, breaks heavy, oversized utility pockets.',
    longDescription:
      'Pattern-drafted at a 24" leg opening — proper wide-leg, not skinny-with-extra-room. 12 oz brushed cotton twill, oversized utility pockets at the thighs, button-tab adjusters at the waist.\n\nSits high on the natural waist. Designed to break across the foot like a tailored trouser, not pool at the ankle.',
    images: [
      img('photo-1668720618149-f1c00c1841e9', 'Stone wide-leg cargo pants front view'),
      img('photo-1547069553-12f23c839aaa', 'Stone wide-leg cargo utility pocket detail'),
      img('photo-1721637635502-b0abaaa75edb', 'Stone wide-leg cargo styled with hoodie'),
    ],
    variants: [
      { id: 'v_007_s', size: 'S', color: 'Stone', colorHex: '#A8A39B', stock: 6, sku: 'TL-CRG-STN-S' },
      { id: 'v_007_m', size: 'M', color: 'Stone', colorHex: '#A8A39B', stock: 11, sku: 'TL-CRG-STN-M' },
      { id: 'v_007_l', size: 'L', color: 'Stone', colorHex: '#A8A39B', stock: 9, sku: 'TL-CRG-STN-L' },
      { id: 'v_007_xl', size: 'XL', color: 'Stone', colorHex: '#A8A39B', stock: 0, sku: 'TL-CRG-STN-XL' },
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
    relatedSlugs: ['heavyweight-tee-bone', 'heavyweight-hoodie-onyx', 'bomber-jacket-stone'],
  },
  {
    id: 'p_008',
    slug: 'watch-cap-onyx',
    name: 'Ribbed Watch Cap',
    tagline: 'Onyx — merino lambswool',
    priceCents: 6800,
    category: 'accessories',
    description:
      'A ribbed watch cap in merino lambswool. No pom, no logo, no synthetic blend. Roll it once.',
    longDescription:
      '100% merino lambswool, knit and finished in Scotland. 4x2 ribbed, single-fold construction. The only marker is a tonal woven label inside the band — this is a hat, not a billboard.',
    images: [
      img('photo-1721637686340-de9f8cebda5a', 'Onyx watch cap front view'),
      img('photo-1594035795072-3fcd236b7d83', 'Onyx watch cap detail of weave'),
    ],
    variants: [
      { id: 'v_008_os', size: 'M', color: 'Onyx', colorHex: '#1A1A1A', stock: 30, sku: 'TL-WCP-ONX-OS' },
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
    relatedSlugs: ['heavyweight-hoodie-onyx', 'heavyweight-tee-onyx'],
  },
  {
    id: 'p_009',
    slug: 'boxy-crewneck-ash',
    name: 'Boxy Crewneck',
    tagline: 'Ash — 480 GSM loopback terry',
    priceCents: 19800,
    category: 'hoodies',
    description:
      'A boxy crewneck in ash loopback terry. Heavyweight body, ribbed throughout, zero branding.',
    longDescription:
      'Cut from a 480 GSM cotton loopback terry milled in Portugal, the Boxy Crewneck trades the hood for a clean 2x2 ribbed collar — the quiet centrepiece of Drop 04.\n\nGarment-dyed to a soft ash that reads warm under daylight, with a true boxy block: dropped shoulder, square hem, and ribbed cuffs and waistband that hold their shape wash after wash.',
    images: [
      img('photo-1619300026534-8e8a76941138', 'Ash boxy crewneck front view on model'),
      img('photo-1576775068668-c147f14c36f7', 'Ash boxy crewneck ribbed collar close-up'),
      img('photo-1604520164966-8ca929961ebe', 'Ash boxy crewneck editorial side profile'),
    ],
    variants: [
      { id: 'v_009_s', size: 'S', color: 'Ash', colorHex: '#B7B2A8', stock: 10, sku: 'TL-BXC-ASH-S' },
      { id: 'v_009_m', size: 'M', color: 'Ash', colorHex: '#B7B2A8', stock: 14, sku: 'TL-BXC-ASH-M' },
      { id: 'v_009_l', size: 'L', color: 'Ash', colorHex: '#B7B2A8', stock: 7, sku: 'TL-BXC-ASH-L' },
      { id: 'v_009_xl', size: 'XL', color: 'Ash', colorHex: '#B7B2A8', stock: 3, sku: 'TL-BXC-ASH-XL' },
    ],
    specs: {
      gsm: 480,
      fabric: '100% organic cotton loopback terry, garment-dyed',
      fit: 'Boxy — drop shoulder, square hem',
      madeIn: 'Portugal',
      modelInfo: 'Model is 6\'0" (183 cm) wearing size M',
      careInstructions: 'Wash cold inside out with like colours. Tumble dry low.',
    },
    reviews: [
      {
        id: 'r_009_a',
        author: 'Priya N.',
        rating: 5,
        title: 'The block is right',
        body: 'Properly boxy without looking like a sack. The ash colour is more interesting in person.',
        createdAt: '2026-03-18',
        verifiedBuyer: true,
      },
      {
        id: 'r_009_b',
        author: 'Cole W.',
        rating: 4,
        title: 'Heavy crewneck done well',
        body: '480 GSM and it still moves. Collar rib is thick and holds shape.',
        createdAt: '2026-03-05',
        verifiedBuyer: true,
      },
    ],
    isLatestDrop: true,
    isNew: true,
    relatedSlugs: ['heavyweight-hoodie-onyx', 'heavyweight-tee-bone', 'pleated-trouser-olive'],
  },
  {
    id: 'p_010',
    slug: 'pleated-trouser-olive',
    name: 'Pleated Trouser',
    tagline: 'Olive — 11 oz cotton drill',
    priceCents: 21800,
    category: 'bottoms',
    description:
      'A single-pleat trouser in olive cotton drill. Sits high, tapers clean, breaks once.',
    longDescription:
      'A single forward pleat at each hip gives the Pleated Trouser room through the thigh without bulk — drafted to sit high on the natural waist and taper to a clean 16" hem.\n\nCut from an 11 oz cotton drill with a dry, structured hand that holds a crease. Slant pockets, single welt pocket at the back, horn-button closure. Designed to break exactly once over the shoe.',
    images: [
      img('photo-1612029938221-a01e8c947edb', 'Olive pleated trouser front view on model'),
      img('photo-1617885578851-d77b28ab005e', 'Olive pleated trouser pleat and waistband detail'),
      img('photo-1602531597402-405d5cace652', 'Olive pleated trouser editorial full length'),
    ],
    variants: [
      { id: 'v_010_s', size: 'S', color: 'Olive', colorHex: '#5A5A41', stock: 8, sku: 'TL-PLT-OLV-S' },
      { id: 'v_010_m', size: 'M', color: 'Olive', colorHex: '#5A5A41', stock: 12, sku: 'TL-PLT-OLV-M' },
      { id: 'v_010_l', size: 'L', color: 'Olive', colorHex: '#5A5A41', stock: 6, sku: 'TL-PLT-OLV-L' },
      { id: 'v_010_xl', size: 'XL', color: 'Olive', colorHex: '#5A5A41', stock: 2, sku: 'TL-PLT-OLV-XL' },
    ],
    specs: {
      gsm: 0,
      fabric: '11 oz cotton drill, horn-button closure',
      fit: 'High-rise — single pleat, tapered 16" hem',
      madeIn: 'Portugal',
      modelInfo: 'Model is 6\'1" (185 cm) wearing size M',
      careInstructions: 'Wash cold. Hang dry. Press with steam.',
    },
    reviews: [
      {
        id: 'r_010_a',
        author: 'Mateus L.',
        rating: 5,
        title: 'Pleat sits flat',
        body: 'A lot of pleated pants pop open at the hip. This one stays closed and clean.',
        createdAt: '2026-03-16',
        verifiedBuyer: true,
      },
    ],
    isLatestDrop: true,
    isNew: true,
    relatedSlugs: ['boxy-crewneck-ash', 'heavyweight-hoodie-onyx', 'heavyweight-tee-bone'],
  },
  {
    id: 'p_011',
    slug: 'camp-cap-onyx',
    name: 'Camp Cap',
    tagline: 'Onyx — washed cotton, 6-panel',
    priceCents: 7200,
    category: 'accessories',
    description:
      'A low-profile 6-panel camp cap in washed onyx cotton. Unstructured crown, no logo.',
    longDescription:
      'A washed-cotton 6-panel with a soft, unstructured crown that packs flat and breaks in fast. Curved brim, embroidered eyelets, and an antique-brass slide closure.\n\nThe only marking is a tonal woven loop tab at the back seam — quiet by design, made to round out Drop 04.',
    images: [
      img('photo-1523477800337-966dbabe060b', 'Onyx camp cap front view'),
      img('photo-1564557287817-3785e38ec1f5', 'Onyx camp cap brim and eyelet detail'),
    ],
    variants: [
      { id: 'v_011_os', size: 'M', color: 'Onyx', colorHex: '#1A1A1A', stock: 24, sku: 'TL-CMP-ONX-OS' },
    ],
    specs: {
      gsm: 0,
      fabric: '100% washed cotton twill, antique-brass slide closure',
      fit: 'One size — unstructured 6-panel, adjustable',
      madeIn: 'Portugal',
      modelInfo: 'Model is 6\'0" (183 cm)',
      careInstructions: 'Spot clean. Air dry. Do not machine wash.',
    },
    reviews: [
      {
        id: 'r_011_a',
        author: 'Dani F.',
        rating: 5,
        title: 'Sits low and soft',
        body: 'Unstructured crown means it actually looks good day one. No logo is the whole point.',
        createdAt: '2026-03-14',
        verifiedBuyer: true,
      },
    ],
    isLatestDrop: true,
    isNew: true,
    relatedSlugs: ['boxy-crewneck-ash', 'heavyweight-hoodie-onyx'],
  },
];

// ---------------------------------------------------------------------------
// Chapters — the label's seasonal drops, oldest to newest.
// ---------------------------------------------------------------------------
export const chapters: Chapter[] = [
  {
    id: 'ch_01',
    index: 1,
    name: 'First Cut',
    dateRange: 'Fall 2024',
    description:
      'The first chapter. Two tees, a hoodie, and a belief that heavyweight fabric speaks louder than branding.',
  },
  {
    id: 'ch_02',
    index: 2,
    name: 'Sidewalk Static',
    dateRange: 'Winter 2024–25',
    description:
      'A collaboration capsule merging the studio\'s fabric programme with the Sidewalk Static collective\'s graphic language.',
  },
  {
    id: 'ch_03',
    index: 3,
    name: 'Racing Line',
    dateRange: 'Summer 2025',
    description:
      'Racing stripes, checkered flags, and the heaviest zip-up we\'ve cut. Every piece sold out in 72 hours.',
  },
];

// ---------------------------------------------------------------------------
// Archived products — past-chapter items, all stock at 0.
// ---------------------------------------------------------------------------
export const archivedProducts: Product[] = [
  {
    id: 'p_a01',
    slug: 'origin-tee-bone',
    name: 'Origin Tee',
    tagline: 'Bone — 280 GSM, Chapter 01',
    priceCents: 8800,
    category: 'tees',
    description: 'The first tee the studio ever cut. Oversized body, no labels, just weight.',
    longDescription: '',
    images: [img('photo-1508216310976-c518daae0cdc', 'Origin Tee bone front')],
    variants: [
      { id: 'v_a01_m', size: 'M', color: 'Bone', colorHex: '#F5F2EC', stock: 0, sku: 'TL-ORG-BNE-M' },
    ],
    specs: { gsm: 280, fabric: '100% ringspun cotton', fit: 'Oversized', madeIn: 'Portugal', modelInfo: '', careInstructions: 'Wash cold.' },
    reviews: [],
    isLatestDrop: false,
    isNew: false,
    relatedSlugs: [],
    chapter: 'ch_01',
    isArchived: true,
  },
  {
    id: 'p_a02',
    slug: 'nightshift-tee-onyx',
    name: 'Nightshift Tee',
    tagline: 'Onyx — 280 GSM, Chapter 01',
    priceCents: 8800,
    category: 'tees',
    description: 'Back-print graphic tee. Garment-dyed onyx, faded by design.',
    longDescription: '',
    images: [img('photo-1609873814058-a8928924184a', 'Nightshift Tee onyx front')],
    variants: [
      { id: 'v_a02_m', size: 'M', color: 'Onyx', colorHex: '#1A1A1A', stock: 0, sku: 'TL-NSH-ONX-M' },
    ],
    specs: { gsm: 280, fabric: '100% ringspun cotton, garment-dyed', fit: 'Oversized', madeIn: 'Portugal', modelInfo: '', careInstructions: 'Wash cold inside out.' },
    reviews: [],
    isLatestDrop: false,
    isNew: false,
    relatedSlugs: [],
    chapter: 'ch_01',
    isArchived: true,
  },
  {
    id: 'p_a03',
    slug: 'grand-prix-tee-red',
    name: 'Grand Prix Tee',
    tagline: 'Race Red — 280 GSM, Chapter 02',
    priceCents: 9800,
    category: 'tees',
    description: 'Sidewalk Static collab. Racing-stripe chest hit on a garment-dyed red body.',
    longDescription: '',
    images: [img('photo-1578768079052-aa76e52ff62e', 'Grand Prix Tee red front')],
    variants: [
      { id: 'v_a03_m', size: 'M', color: 'Race Red', colorHex: '#C1292E', stock: 0, sku: 'TL-GPX-RED-M' },
    ],
    specs: { gsm: 280, fabric: '100% ringspun cotton, garment-dyed', fit: 'Boxy', madeIn: 'Portugal', modelInfo: '', careInstructions: 'Wash cold inside out.' },
    reviews: [],
    isLatestDrop: false,
    isNew: false,
    relatedSlugs: [],
    chapter: 'ch_02',
    isArchived: true,
  },
  {
    id: 'p_a04',
    slug: 'speedway-tee-bone',
    name: 'Speedway Tee',
    tagline: 'Bone — 280 GSM, Chapter 02',
    priceCents: 9800,
    category: 'tees',
    description: 'Sidewalk Static collab. Vintage motorsport typography on heavyweight bone cotton.',
    longDescription: '',
    images: [img('photo-1615397587950-3cbb55f95b77', 'Speedway Tee bone front')],
    variants: [
      { id: 'v_a04_m', size: 'M', color: 'Bone', colorHex: '#F5F2EC', stock: 0, sku: 'TL-SPD-BNE-M' },
    ],
    specs: { gsm: 280, fabric: '100% ringspun cotton', fit: 'Boxy', madeIn: 'Portugal', modelInfo: '', careInstructions: 'Wash cold.' },
    reviews: [],
    isLatestDrop: false,
    isNew: false,
    relatedSlugs: [],
    chapter: 'ch_02',
    isArchived: true,
  },
  {
    id: 'p_a05',
    slug: 'circuit-zip-up',
    name: 'Circuit Zip-Up',
    tagline: 'Onyx — 500 GSM, Chapter 03',
    priceCents: 32800,
    category: 'hoodies',
    description: 'Full-zip heavyweight in onyx with embroidered crest. The heaviest zip-up we\'ve made.',
    longDescription: '',
    images: [img('photo-1542406775-ade58c52d2e4', 'Circuit Zip-Up front')],
    variants: [
      { id: 'v_a05_m', size: 'M', color: 'Onyx', colorHex: '#1A1A1A', stock: 0, sku: 'TL-CRC-ONX-M' },
    ],
    specs: { gsm: 500, fabric: '100% cotton French terry, YKK Excella zipper', fit: 'Oversized', madeIn: 'Portugal', modelInfo: '', careInstructions: 'Wash cold zipped, inside out.' },
    reviews: [],
    isLatestDrop: false,
    isNew: false,
    relatedSlugs: [],
    chapter: 'ch_03',
    isArchived: true,
  },
  {
    id: 'p_a06',
    slug: 'tempest-hoodie',
    name: 'Tempest Hoodie',
    tagline: 'Storm — 500 GSM, Chapter 03',
    priceCents: 26800,
    category: 'hoodies',
    description: 'Pullover heavyweight in storm grey. All-over tonal embroidery across the back panel.',
    longDescription: '',
    images: [img('photo-1611817757591-c3f345024273', 'Tempest Hoodie front')],
    variants: [
      { id: 'v_a06_m', size: 'M', color: 'Storm', colorHex: '#4A4A4A', stock: 0, sku: 'TL-TMP-STM-M' },
    ],
    specs: { gsm: 500, fabric: '100% cotton French terry, tonal embroidery', fit: 'Oversized', madeIn: 'Portugal', modelInfo: '', careInstructions: 'Wash cold inside out.' },
    reviews: [],
    isLatestDrop: false,
    isNew: false,
    relatedSlugs: [],
    chapter: 'ch_03',
    isArchived: true,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getProductBySlug(slug: string): Product | undefined {
  return [...products, ...archivedProducts].find((p) => p.slug === slug);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is Product => p !== undefined);
}

export function getLatestDrop(): Product[] {
  return products.filter((p) => p.isLatestDrop);
}

/** Active (non-archived) products — what the /shop page shows. */
export function getActiveProducts(): Product[] {
  return products.filter((p) => !p.isArchived);
}

/** All chapters in order. */
export function getChapters(): Chapter[] {
  return chapters;
}

/** Archived products belonging to a specific chapter. */
export function getProductsByChapter(chapterId: string): Product[] {
  return archivedProducts.filter((p) => p.chapter === chapterId);
}
