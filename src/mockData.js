// Mock Data for Lumina Skin (Vanilla JS)

export const INITIAL_PRODUCTS = [
  {
    id: 'lumina-01',
    name: 'Midnight Recovery Botanical Elixir',
    subtitle: 'Cellular Renewal & Lipid Fortification',
    sku: 'LUM-SER-001',
    category: 'Serums',
    price: 88.0,
    rating: 4.9,
    reviewsCount: 142,
    stock: 24,
    isLowStock: false,
    size: '30ml / 1.0 fl. oz.',
    keyBotanicals: 'Blue Tansy, Evening Primrose, Squalane & Rosehip',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597359-0097f48a0494?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'An overnight lipid-replenishing concentrate that works with the skin\'s natural nocturnal rhythm to visibly restore radiance, diminish micro-stressors, and deeply nourish depleted skin barriers.',
    skinTypes: ['Dry', 'Sensitive', 'Normal', 'Combination'],
    benefits: ['Deep overnight cellular repair', 'Strengthens moisture barrier', 'Soothes visible redness and irritation', 'Non-comedogenic satin finish'],
    ingredients: ['Caprylic/Capric Triglyceride', 'Squalane (Olive Derived)', 'Oenothera Biennis (Evening Primrose) Oil', 'Tanacetum Annuum (Blue Tansy) Flower Oil', 'Tocopherol (Vitamin E)'],
    isFeatured: true,
  },
  {
    id: 'lumina-02',
    name: 'Glacial Hydration Cloud Crème',
    subtitle: 'Micro-Algae & Peptides Infusion',
    sku: 'LUM-MST-002',
    category: 'Moisturizers',
    price: 74.0,
    rating: 4.8,
    reviewsCount: 98,
    stock: 8,
    isLowStock: true,
    size: '50ml / 1.7 fl. oz.',
    keyBotanicals: 'Alpine Micro-Algae, Snow Mushroom, Edelweiss',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'A weightless, whipped cloud formulation delivering continuous 72-hour deep cellular hydration while shielding against environmental stressors.',
    skinTypes: ['Combination', 'Dry', 'Oily', 'Sensitive'],
    benefits: ['72-hour moisture reservoir', 'Plumps fine lines with snow mushroom', 'Absorbs instantly without shine'],
    ingredients: ['Water/Aqua', 'Glycerin', 'Tremella Fuciformis (Mushroom) Extract', 'Leontopodium Alpinum (Edelweiss) Extract', 'Palmitoyl Tripeptide-5'],
    isFeatured: true,
  },
  {
    id: 'lumina-03',
    name: 'Purifying Botanical Gentle Cleanser',
    subtitle: 'Nourishing Amino Acid Gel Complex',
    sku: 'LUM-CLN-003',
    category: 'Cleansers',
    price: 46.0,
    rating: 4.9,
    reviewsCount: 215,
    stock: 45,
    isLowStock: false,
    size: '150ml / 5.1 fl. oz.',
    keyBotanicals: 'Green Tea, Centella Asiatica, Calendula Extract',
    images: [
      'https://images.unsplash.com/photo-1556228722-d0b5b1589138?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'A pH-balanced 5.5 soothing gel cleanser that gently dissolves impurities, SPF, and light makeup without disrupting the skin\'s acid mantle.',
    skinTypes: ['Sensitive', 'Normal', 'Oily', 'Combination'],
    benefits: ['Maintains physiological pH 5.5', 'Non-stripping amino lather', 'Reduces post-cleanse tightness'],
    ingredients: ['Aqua', 'Sodium Cocoyl Apple Amino Acids', 'Centella Asiatica Leaf Water', 'Camellia Sinensis (Green Tea) Leaf Extract'],
    isFeatured: true,
  },
  {
    id: 'lumina-04',
    name: 'Rose & Willow Clarifying Toner',
    subtitle: 'AHA + Botanical Willow Bark Tonic',
    sku: 'LUM-TON-004',
    category: 'Toners',
    price: 52.0,
    rating: 4.7,
    reviewsCount: 86,
    stock: 19,
    isLowStock: false,
    size: '120ml / 4.0 fl. oz.',
    keyBotanicals: 'Damask Rose Water, White Willow Bark, Niacinamide',
    images: [
      'https://images.unsplash.com/photo-1608248597359-0097f48a0494?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'An exfoliating botanical mist that refines texture, purifies pores, and prepares the skin to receive deep active nutrients.',
    skinTypes: ['Oily', 'Combination', 'Normal'],
    benefits: ['Micro-exfoliates pores gently', 'Balances excess sebum', 'Enhances serum penetration'],
    ingredients: ['Rosa Damascena Flower Water', 'Salix Alba (Willow) Bark Extract', 'Niacinamide (Vitamin B3)'],
    isFeatured: false,
  },
  {
    id: 'lumina-05',
    name: 'Cellular Vitality Gold Face Mask',
    subtitle: 'Rare Botanicals & Colloidal Gold',
    sku: 'LUM-MSK-005',
    category: 'Masks & Treatments',
    price: 95.0,
    rating: 5.0,
    reviewsCount: 64,
    stock: 12,
    isLowStock: true,
    size: '75ml / 2.5 fl. oz.',
    keyBotanicals: 'Colloidal Gold, Sea Buckthorn, Reishi Mushroom',
    images: [
      'https://images.unsplash.com/photo-1567928815104-b7980ee5032e?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'An intensive Sunday treatment designed to energize fatigued skin, impart instant luminosity, and firm relaxed contours.',
    skinTypes: ['Dry', 'Mature', 'Dull'],
    benefits: ['Instant golden glow', 'Boosts cellular ATP synthesis', 'Deep antioxidant protection'],
    ingredients: ['Hippophae Rhamnoides (Sea Buckthorn) Fruit Oil', 'Ganoderma Lucidum (Reishi) Extract', 'Colloidal Gold'],
    isFeatured: true,
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-8942',
    date: 'May 14, 2026',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.r@example.com',
    status: 'Delivered',
    total: 162.0,
    subtotal: 162.0,
    shippingCost: 0,
    discount: 0,
    shippingAddress: {
      street: '742 Evergreen Terrace',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'United States'
    },
    items: [
      {
        id: 'lumina-01',
        name: 'Midnight Recovery Botanical Elixir',
        price: 88.0,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
        size: '30ml'
      },
      {
        id: 'lumina-02',
        name: 'Glacial Hydration Cloud Crème',
        price: 74.0,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
        size: '50ml'
      }
    ]
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-01',
    productId: 'lumina-01',
    productName: 'Midnight Recovery Botanical Elixir',
    productImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    author: 'Elena Rostova',
    rating: 5,
    date: '2 days ago',
    comment: 'The Blue Tansy aroma creates an instant meditation ritual before sleep. I woke up with zero redness and plump, glowing skin.',
    status: 'Published',
    isVerifiedBuyer: true
  },
  {
    id: 'rev-02',
    productId: 'lumina-02',
    productName: 'Glacial Hydration Cloud Crème',
    productImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    author: 'Sophia Chen',
    rating: 5,
    date: '1 week ago',
    comment: 'Light as a cloud yet hydrates as deeply as a heavy balm. Perfect under SPF during summer.',
    status: 'Pending Approval',
    isVerifiedBuyer: true
  }
];

export const INITIAL_USER = {
  name: 'Elena Rostova',
  firstName: 'Elena',
  lastName: 'Rostova',
  email: 'elena.r@example.com',
  phone: '+1 (555) 234-8921',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  membershipTier: 'Botanical Gold Sanctuary',
  address: {
    street: '742 Evergreen Terrace',
    city: 'Seattle',
    state: 'WA',
    postalCode: '98101',
    country: 'United States'
  },
  skinProfile: {
    type: 'Dry & Sensitive',
    focus: 'Barrier Repair & Radiance',
    concerns: ['Dehydration', 'Environmental Sensitivity', 'Fine Redness']
  }
};
