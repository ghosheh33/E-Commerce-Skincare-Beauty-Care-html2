import { Product, Order, Review, UserProfile } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Midnight Recovery Serum',
    subtitle: 'Vitamin C & Botanicals',
    sku: 'RS-001',
    category: 'Serums',
    price: 85.00,
    rating: 4.9,
    reviewsCount: 128,
    stock: 142,
    size: '30ml / 1 fl. oz',
    keyBotanicals: 'Squalane & Evening Primrose',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597359-598d1a1c97a8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'A potent, restorative overnight treatment formulated to replenish moisture, refine texture, and awaken tired skin. Infused with squalane and evening primrose, it delivers clinical efficacy with a lightweight, luxurious feel.',
    skinTypes: ['Dry', 'Combination', 'Sensitive'],
    benefits: [
      'Deeply hydrates and locks in moisture overnight.',
      'Refines skin texture and minimizes the appearance of pores.',
      'Supports the skin\'s natural nighttime repair processes.'
    ],
    ingredients: [
      'Caprylic/Capric Triglyceride',
      'Squalane (Plant-Derived)',
      'Rosa Canina (Rosehip) Seed Oil',
      'Oenothera Biennis (Evening Primrose) Oil',
      'Tetrahexyldecyl Ascorbate (Vitamin C)',
      'Lavandula Angustifolia (Lavender) Essential Oil',
      'Tocopherol (Vitamin E)'
    ],
    isFeatured: true
  },
  {
    id: 'prod-2',
    name: 'Purifying Cleanser',
    subtitle: 'Gentle daily wash',
    sku: 'CL-003',
    category: 'Cleansers',
    price: 42.00,
    rating: 4.8,
    reviewsCount: 128,
    stock: 356,
    size: '150ml / 5.1 fl. oz',
    keyBotanicals: 'Aloe + Matcha & Green Tea',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'A soothing, low-foaming gel cleanser that gently removes impurities and makeup while maintaining the skin\'s natural protective moisture barrier without stripping.',
    skinTypes: ['Dry', 'Oily', 'Combination', 'Sensitive'],
    benefits: [
      'Removes impurities and excess sebum gently.',
      'Calms redness and cools sensitive irritation.',
      'Maintains optimum pH and dermal moisture balance.'
    ],
    ingredients: [
      'Aloe Barbadensis Leaf Juice',
      'Camellia Sinensis (Matcha) Leaf Extract',
      'Glycerin',
      'Coco-Glucoside',
      'Hamamelis Virginiana (Witch Hazel) Water',
      'Chamomilla Recutita (Matricaria) Extract'
    ],
    isFeatured: true
  },
  {
    id: 'prod-3',
    name: 'Deep Moisture Cream',
    subtitle: 'Overnight repair',
    sku: 'MC-002',
    category: 'Moisturizers',
    price: 68.00,
    rating: 4.9,
    reviewsCount: 92,
    stock: 12,
    isLowStock: true,
    size: '50ml / 1.7 fl. oz',
    keyBotanicals: 'Ceramides & Shea Butter',
    images: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228722-d0b7194685ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597359-598d1a1c97a8?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'A rich, velvet restorative cream that fortifies weakened lipid barriers, seals in deep hydration, and shields against environmental moisture loss.',
    skinTypes: ['Dry', 'Sensitive'],
    benefits: [
      'Intensively replenishes lipid-deficient and dry barriers.',
      'Soothes taut, flaky, or stressed complexion overnight.',
      'Leaves a velvety, non-greasy glow with zero stickiness.'
    ],
    ingredients: [
      'Aqua / Water / Eau',
      'Butyrospermum Parkii (Shea) Butter',
      'Ceramide NP, Ceramide AP, Ceramide EOP',
      'Phytosphingosine',
      'Cholesterol',
      'Sodium Hyaluronate',
      'Niacinamide'
    ],
    isFeatured: true
  },
  {
    id: 'prod-4',
    name: 'Radiance Nectar Serum',
    subtitle: 'Vitamin C + Sea Kelp',
    sku: 'RS-002',
    category: 'Serums',
    price: 68.00,
    rating: 5.0,
    reviewsCount: 76,
    stock: 84,
    size: '30ml / 1 fl. oz',
    keyBotanicals: 'Hyaluronic Acid + Sea Kelp Ferment',
    images: [
      'https://images.unsplash.com/photo-1608248597359-598d1a1c97a8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An illuminating elixir powered by fermented marine bio-actives and multi-molecular hyaluronic acid to infuse dull skin with fresh vitality.',
    skinTypes: ['Dry', 'Combination', 'Oily'],
    benefits: [
      'Visible glow and luminous radiance within days.',
      'Plumps fine lines with multi-depth moisture.',
      'Shields against oxidative environmental stress.'
    ],
    ingredients: [
      'Bio-Fermented Kelp Filtrate',
      'Hyaluronic Acid (Triple Molecular Weight)',
      'Kakadu Plum (Vitamin C)',
      'Centella Asiatica Extract'
    ]
  },
  {
    id: 'prod-5',
    name: 'Cloud Barrier Cream',
    subtitle: 'Ceramide Repair Cream',
    sku: 'MC-003',
    category: 'Moisturizers',
    price: 54.00,
    rating: 4.8,
    reviewsCount: 114,
    stock: 96,
    size: '50ml / 1.7 fl. oz',
    keyBotanicals: 'Ceramides & Marshmallow Root',
    images: [
      'https://images.unsplash.com/photo-1556228722-d0b7194685ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Weightless whipped moisture that wraps stressed skin in an airy cocoon of biomimetic ceramides and calming marshmallow root.',
    skinTypes: ['Sensitive', 'Combination', 'Dry'],
    benefits: [
      'Instant calming relief for reactive skin.',
      'Non-comedogenic cloud texture absorbs effortlessly.',
      'Sustained 48-hour moisture retention.'
    ],
    ingredients: [
      'Marshmallow Root Extract',
      'Ceramide Complex',
      'Jojoba Esters',
      'Allantoin'
    ]
  },
  {
    id: 'prod-6',
    name: 'Purifying Clay Mask',
    subtitle: 'French Green Clay & Sage',
    sku: 'MS-001',
    category: 'Masks & Treatments',
    price: 46.00,
    rating: 4.7,
    reviewsCount: 65,
    stock: 58,
    size: '100g / 3.4 oz',
    keyBotanicals: 'French Green Clay & Clary Sage',
    images: [
      'https://images.unsplash.com/photo-1567928815104-b798b31a89c8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A mineral-rich purifying mask that draws out deep congestion while nourishing with soothing botanical oils, never drying out tight on skin.',
    skinTypes: ['Oily', 'Combination'],
    benefits: [
      'Clarifies congested pores and smooths texture.',
      'Balances sebum without cracking or overdrying.',
      'Infuses minerals for a balanced, clear tone.'
    ],
    ingredients: [
      'Montmorillonite (French Green Clay)',
      'Salvia Sclarea (Clary Sage) Water',
      'Spirulina Maxima Powder',
      'Kaolin Clay'
    ]
  },
  {
    id: 'prod-7',
    name: 'Botanical Balancing Toner',
    subtitle: 'Rosewater & Witch Hazel',
    sku: 'TN-001',
    category: 'Toners',
    price: 38.00,
    rating: 4.9,
    reviewsCount: 88,
    stock: 120,
    size: '200ml / 6.8 fl. oz',
    keyBotanicals: 'Damask Rose & Witch Hazel',
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An alcohol-free calming tonic that re-balances pH after cleansing, softening keratin layers to enhance subsequent serum absorption.',
    skinTypes: ['Dry', 'Sensitive', 'Combination', 'Oily'],
    benefits: [
      'Restores optimal cutaneous acid mantle.',
      'Instantly hydrates and refines pore visibility.',
      'Scented naturally with pure steam-distilled rose.'
    ],
    ingredients: [
      'Rosa Damascena Flower Water',
      'Hamamelis Virginiana Water',
      'Glycerin',
      'Sodium PCA'
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: '#LS-90210',
    date: 'October 12, 2024',
    customerName: 'Eleanor Vance',
    customerEmail: 'eleanor.v@example.com',
    items: [
      {
        productId: 'prod-1',
        name: 'Radiance Reset Serum',
        price: 85.00,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
        size: '30ml / Glass'
      }
    ],
    subtotal: 85.00,
    tax: 6.80,
    shipping: 0.00,
    total: 91.80,
    status: 'Shipped',
    shippingAddress: {
      street: '123 Serenity Lane, Apt 4B',
      city: 'Portland',
      state: 'OR',
      postalCode: '97205',
      country: 'United States'
    }
  },
  {
    id: '#LS-89442',
    date: 'September 05, 2024',
    customerName: 'Eleanor Vance',
    customerEmail: 'eleanor.v@example.com',
    items: [
      {
        productId: 'prod-3',
        name: 'Night Repair Crème',
        price: 70.00,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80',
        size: '50ml / Ceramic'
      }
    ],
    subtotal: 140.00,
    tax: 11.20,
    shipping: 0.00,
    total: 151.20,
    status: 'Delivered',
    shippingAddress: {
      street: '123 Serenity Lane, Apt 4B',
      city: 'Portland',
      state: 'OR',
      postalCode: '97205',
      country: 'United States'
    }
  },
  {
    id: '#ORD-9821',
    date: 'Oct 24, 2023',
    customerName: 'Eleanor Vance',
    customerEmail: 'eleanor.v@example.com',
    items: [
      {
        productId: 'prod-1',
        name: 'Midnight Recovery Serum',
        price: 85.00,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
        size: '30ml'
      },
      {
        productId: 'prod-2',
        name: 'Purifying Cleanser',
        price: 42.00,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
        size: '150ml'
      }
    ],
    subtotal: 127.00,
    tax: 10.16,
    shipping: 0.00,
    total: 137.16,
    status: 'Processing',
    shippingAddress: {
      street: '123 Serenity Lane, Apt 4B',
      city: 'Portland',
      state: 'OR',
      postalCode: '97205',
      country: 'United States'
    }
  },
  {
    id: '#ORD-9820',
    date: 'Oct 23, 2023',
    customerName: 'Marcus Sterling',
    customerEmail: 'marcus.s@example.com',
    items: [
      {
        productId: 'prod-1',
        name: 'Midnight Recovery Serum',
        price: 85.00,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
        size: '30ml'
      }
    ],
    subtotal: 85.00,
    tax: 4.50,
    shipping: 0.00,
    total: 89.50,
    status: 'Completed',
    shippingAddress: {
      street: '742 Evergreen Terrace',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'United States'
    }
  },
  {
    id: '#ORD-9819',
    date: 'Oct 22, 2023',
    customerName: 'Sylvia Plath',
    customerEmail: 'sylvia.p@example.com',
    items: [
      {
        productId: 'prod-3',
        name: 'Deep Moisture Cream',
        price: 68.00,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80',
        size: '50ml'
      }
    ],
    subtotal: 136.00,
    tax: 10.88,
    shipping: 0.00,
    total: 146.88,
    status: 'Cancelled',
    shippingAddress: {
      street: '88 Meadow Way',
      city: 'Boston',
      state: 'MA',
      postalCode: '02108',
      country: 'United States'
    }
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    productName: 'Radiance Serum',
    productImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
    author: 'Elena M.',
    rating: 5,
    comment: 'The Radiance Serum has completely transformed my morning routine. My skin feels plumper and has a natural glow that I haven\'t seen in years. Truly a luxurious experience every day.',
    date: 'Oct 25, 2023',
    status: 'Pending Approval',
    isVerifiedBuyer: true
  },
  {
    id: 'rev-2',
    productId: 'prod-6',
    productName: 'Purifying Clay Mask',
    productImage: 'https://images.unsplash.com/photo-1567928815104-b798b31a89c8?auto=format&fit=crop&w=400&q=80',
    author: 'David R.',
    rating: 3,
    comment: 'It\'s decent, but I felt a slight tingling sensation that lasted longer than expected. Might be too strong for sensitive skin.',
    date: 'Oct 24, 2023',
    status: 'Pending Approval',
    isVerifiedBuyer: true
  },
  {
    id: 'rev-3',
    productId: 'prod-7',
    productName: 'Botanical Toner',
    productImage: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80',
    author: 'Elena M.',
    rating: 5,
    comment: 'Very refreshing scent and feels light. Packaging is beautiful, though the pump was a little stiff at first.',
    date: 'Oct 21, 2023',
    status: 'Pending Approval',
    isVerifiedBuyer: true
  },
  {
    id: 'rev-4',
    productId: 'prod-1',
    productName: 'Midnight Recovery Serum',
    productImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
    author: 'Eleanor V.',
    rating: 5,
    comment: 'This serum completely transformed my morning skin. It absorbs beautifully and leaves my face feeling incredibly plump and rested, even when I haven\'t slept well.',
    date: '1 week ago',
    status: 'Published',
    isVerifiedBuyer: true
  },
  {
    id: 'rev-5',
    productId: 'prod-1',
    productName: 'Midnight Recovery Serum',
    productImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
    author: 'Sarah M.',
    rating: 5,
    comment: 'A staple in my nighttime routine. The scent alone is calming, but the results are undeniable. The redness I usually wake up with is completely gone.',
    date: '1 month ago',
    status: 'Published',
    isVerifiedBuyer: true
  },
  {
    id: 'rev-6',
    productId: 'prod-3',
    productName: 'Deep Moisture Cream',
    productImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80',
    author: 'Jessica K.',
    rating: 4,
    comment: 'Really elegant formulation. It is slightly heavy for the summer months, but absolutely perfect for winter when my skin needs that extra protective layer.',
    date: '2 months ago',
    status: 'Published',
    isVerifiedBuyer: true
  }
];

export const INITIAL_USER: UserProfile = {
  name: 'Elena Rostova',
  firstName: 'Elena',
  lastName: 'Rostova',
  email: 'elena.r@example.com',
  phone: '+1 (555) 000-0000',
  membershipTier: 'Gold Member',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  skinProfile: {
    type: 'Combination',
    concerns: ['Hydration', 'Redness'],
    focus: 'Hydration'
  },
  address: {
    street: '123 Serenity Lane, Apt 4B',
    city: 'Portland',
    state: 'OR',
    postalCode: '97205',
    country: 'United States'
  }
};
