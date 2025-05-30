// This file contains the transformed product data for seeding the database

export const transformedData = {
  collections: [
    {
      name: "Mens Tops",
      slug: "mens-tops",
      description: "Men's shirt and top collection",
    },
    {
      name: "Mens Bottoms",
      slug: "mens-bottoms",
      description: "Men's pants, shorts and bottom wear",
    },
    {
      name: "Outerwear",
      slug: "outerwear",
      description: "Jackets, pullovers and outerwear",
    },
    {
      name: "Hats & Accessories",
      slug: "hats-accessories",
      description: "Hats and accessories collection",
    },
    {
      name: "Underwear",
      slug: "underwear",
      description: "Underwear and intimate apparel",
    },
    {
      name: "Womens Tops",
      slug: "womens-tops",
      description: "Women's shirt and top collection",
    },
    {
      name: "Womens Bottoms",
      slug: "womens-bottoms",
      description: "Women's pants, shorts and bottom wear",
    },
  ],
  fabrics: [
    {
      name: "Lux Blend",
      description: "Cool touch, high-cotton LUX Blend fabric",
    },
    {
      name: "BYLT Blend",
      description: "Signature BYLT Blend fabric for comfort and durability",
    },
    {
      name: "Performance",
      description: "Lightweight, breathable and ultra-stretch performance fabric",
    },
    {
      name: "Elite+",
      description: "Ultra-stretch Elite+ fabric for ultimate comfort",
    },
    {
      name: "All Day",
      description: "All day comfort fabric with enhanced breathability",
    },
    {
      name: "Executive",
      description: "Premium executive fabric for sophisticated style",
    },
    {
      name: "Tech",
      description: "Technical fabric with sweat resistance and comfort layers",
    },
    {
      name: "Premium",
      description: "Premium fabric blend for enhanced performance",
    },
  ],
  colors: [
    {
      name: "Subtle",
      hexCode: "#F5F5F5",
    },
    {
      name: "White",
      hexCode: "#FFFFFF",
    },
    {
      name: "Black",
      hexCode: "#000000",
    },
    {
      name: "Heather Grey",
      hexCode: "#808080",
    },
    {
      name: "Forest",
      hexCode: "#228B22",
    },
    {
      name: "Stone",
      hexCode: "#A8A8A8",
    },
    {
      name: "Navy",
      hexCode: "#000080",
    },
    {
      name: "Maroon",
      hexCode: "#800000",
    },
    {
      name: "Light Heather Grey",
      hexCode: "#D3D3D3",
    },
    {
      name: "Dark Heather Grey",
      hexCode: "#696969",
    },
    {
      name: "Sand",
      hexCode: "#F4A460",
    },
    {
      name: "Olive",
      hexCode: "#808000",
    },
    {
      name: "Charcoal",
      hexCode: "#36454F",
    },
    {
      name: "Atlantic",
      hexCode: "#4682B4",
    },
    {
      name: "Moss",
      hexCode: "#8FBC8F",
    },
    {
      name: "Mist",
      hexCode: "#E6E6FA",
    },
    {
      name: "Pebble",
      hexCode: "#C0C0C0",
    },
    {
      name: "Valencia",
      hexCode: "#FF6347",
    },
    {
      name: "Storm",
      hexCode: "#708090",
    },
    {
      name: "Gunmetal",
      hexCode: "#2C3539",
    },
    {
      name: "Dark Olive",
      hexCode: "#556B2F",
    },
    {
      name: "Midnight",
      hexCode: "#191970",
    },
    {
      name: "Sky Blue",
      hexCode: "#87CEEB",
    },
    {
      name: "Iris",
      hexCode: "#5D4E75",
    },
    {
      name: "Storm Camo",
      hexCode: "#4F5D75",
    },
    {
      name: "Asphalt Camo",
      hexCode: "#36454F",
    },
    {
      name: "Forest Camo",
      hexCode: "#355E3B",
    },
    {
      name: "Iron",
      hexCode: "#464451",
    },
  ],
  sizes: [
    {
      name: "XS",
      sortOrder: 0,
    },
    {
      name: "S",
      sortOrder: 1,
    },
    {
      name: "M",
      sortOrder: 2,
    },
    {
      name: "L",
      sortOrder: 3,
    },
    {
      name: "XL",
      sortOrder: 4,
    },
    {
      name: "XXL",
      sortOrder: 5,
    },
    {
      name: "XXXL",
      sortOrder: 6,
    },
    {
      name: "OS",
      sortOrder: 7,
    },
  ],
  products: [
    {
      name: "Drop-Cut Lux",
      slug: "drop-cut-lux",
      description: "Cool touch, high-cotton LUX Blend fabric.",
      basePrice: "28.99",
      gender: "men",
      isPopular: true,
      isActive: true,
      collections: ["mens-tops"],
      fabrics: [
        {
          fabricName: "Lux Blend",
          percentage: "100.00",
        },
      ],
      attributes: [
        {
          attributeName: "style",
          attributeValue: "drop-cuts",
        },
        {
          attributeName: "cut",
          attributeValue: "drop-cuts",
        },
        {
          attributeName: "neck",
          attributeValue: "crews",
        },
        {
          attributeName: "sleeve",
          attributeValue: "short sleeves",
        },
      ],
      images: [
        {
          url: "/products/drop-cut-lux/1.jpg",
          altText: "Drop-Cut Lux front view",
          isPrimary: true,
          sortOrder: 1,
        },
        {
          url: "/products/drop-cut-lux/2.jpg",
          altText: "Drop-Cut Lux side view",
          isPrimary: false,
          sortOrder: 2,
        },
        {
          url: "/products/drop-cut-lux/3.jpg",
          altText: "Drop-Cut Lux back view",
          isPrimary: false,
          sortOrder: 3,
        },
        {
          url: "/products/drop-cut-lux/4.jpg",
          altText: "Drop-Cut Lux detail view",
          isPrimary: false,
          sortOrder: 4,
        },
        {
          url: "/products/drop-cut-lux/5.jpg",
          altText: "Drop-Cut Lux lifestyle view",
          isPrimary: false,
          sortOrder: 5,
        },
      ],
      variants: [
        {
          colorName: "Subtle",
          sizeName: "S",
          sku: "DCL-SUBTLE-S",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "Subtle",
          sizeName: "M",
          sku: "DCL-SUBTLE-M",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "Subtle",
          sizeName: "L",
          sku: "DCL-SUBTLE-L",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "Subtle",
          sizeName: "XL",
          sku: "DCL-SUBTLE-XL",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "Subtle",
          sizeName: "XXL",
          sku: "DCL-SUBTLE-XXL",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "Subtle",
          sizeName: "XXXL",
          sku: "DCL-SUBTLE-XXXL",
          stockQuantity: 0,
          isAvailable: false,
        },
        {
          colorName: "White",
          sizeName: "S",
          sku: "DCL-WHITE-S",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "White",
          sizeName: "M",
          sku: "DCL-WHITE-M",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "White",
          sizeName: "L",
          sku: "DCL-WHITE-L",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "White",
          sizeName: "XL",
          sku: "DCL-WHITE-XL",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "White",
          sizeName: "XXL",
          sku: "DCL-WHITE-XXL",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "White",
          sizeName: "XXXL",
          sku: "DCL-WHITE-XXXL",
          stockQuantity: 0,
          isAvailable: false,
        },
        {
          colorName: "Black",
          sizeName: "S",
          sku: "DCL-BLACK-S",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "Black",
          sizeName: "M",
          sku: "DCL-BLACK-M",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "Black",
          sizeName: "L",
          sku: "DCL-BLACK-L",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "Black",
          sizeName: "XL",
          sku: "DCL-BLACK-XL",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "Black",
          sizeName: "XXL",
          sku: "DCL-BLACK-XXL",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "Black",
          sizeName: "XXXL",
          sku: "DCL-BLACK-XXXL",
          stockQuantity: 0,
          isAvailable: false,
        },
      ],
    },
    {
      name: "Drop-Cut Shirt",
      slug: "drop-cut-shirt",
      description:
        "Meet the new and improved BYLT Blend fabric in your favorite signature drop-cut short sleeve shirt. We have worked hard to take your favorite style to the next level of comfort, fit, & functionality.",
      basePrice: "28.99",
      gender: "men",
      isPopular: true,
      isActive: true,
      collections: ["mens-tops"],
      fabrics: [
        {
          fabricName: "BYLT Blend",
          percentage: "100.00",
        },
      ],
      attributes: [
        {
          attributeName: "style",
          attributeValue: "drop-cuts",
        },
        {
          attributeName: "cut",
          attributeValue: "drop-cuts",
        },
        {
          attributeName: "neck",
          attributeValue: "crews",
        },
        {
          attributeName: "sleeve",
          attributeValue: "short sleeves",
        },
      ],
      images: [
        {
          url: "/products/drop-cut-shirt/1.jpg",
          altText: "Drop-Cut Shirt front view",
          isPrimary: true,
          sortOrder: 1,
        },
        {
          url: "/products/drop-cut-shirt/2.jpg",
          altText: "Drop-Cut Shirt side view",
          isPrimary: false,
          sortOrder: 2,
        },
        {
          url: "/products/drop-cut-shirt/3.jpg",
          altText: "Drop-Cut Shirt back view",
          isPrimary: false,
          sortOrder: 3,
        },
        {
          url: "/products/drop-cut-shirt/4.jpg",
          altText: "Drop-Cut Shirt detail view",
          isPrimary: false,
          sortOrder: 4,
        },
      ],
      variants: [
        {
          colorName: "Black",
          sizeName: "S",
          sku: "DCS-BLACK-S",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "Black",
          sizeName: "M",
          sku: "DCS-BLACK-M",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "Black",
          sizeName: "L",
          sku: "DCS-BLACK-L",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "Black",
          sizeName: "XL",
          sku: "DCS-BLACK-XL",
          stockQuantity: 0,
          isAvailable: false,
        },
        {
          colorName: "Black",
          sizeName: "XXL",
          sku: "DCS-BLACK-XXL",
          stockQuantity: 0,
          isAvailable: false,
        },
        {
          colorName: "Black",
          sizeName: "XXXL",
          sku: "DCS-BLACK-XXXL",
          stockQuantity: 25,
          isAvailable: true,
        },
      ],
    },
    {
      name: "Training Shorts",
      slug: "training-shorts",
      description:
        "Made from our NEW lightweight, breathable and ultra-stretch Performance Blend fabric, the new Training Short is built to withstand your most active days. Feel the difference that's sure to never slow you down during those high intensity training sessions.",
      basePrice: "74.99",
      gender: "men",
      isPopular: false,
      isActive: true,
      collections: ["mens-bottoms"],
      fabrics: [
        {
          fabricName: "Performance",
          percentage: "100.00",
        },
      ],
      attributes: [
        {
          attributeName: "style",
          attributeValue: "shorts",
        },
      ],
      images: [
        {
          url: "/products/training-shorts/1.jpg",
          altText: "Training Shorts front view",
          isPrimary: true,
          sortOrder: 1,
        },
        {
          url: "/products/training-shorts/2.jpg",
          altText: "Training Shorts side view",
          isPrimary: false,
          sortOrder: 2,
        },
        {
          url: "/products/training-shorts/3.jpg",
          altText: "Training Shorts back view",
          isPrimary: false,
          sortOrder: 3,
        },
        {
          url: "/products/training-shorts/4.jpg",
          altText: "Training Shorts detail view",
          isPrimary: false,
          sortOrder: 4,
        },
      ],
      variants: [
        {
          colorName: "Black",
          sizeName: "S",
          sku: "TS-BLACK-S",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "Black",
          sizeName: "M",
          sku: "TS-BLACK-M",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "Black",
          sizeName: "L",
          sku: "TS-BLACK-L",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "Black",
          sizeName: "XL",
          sku: "TS-BLACK-XL",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "Black",
          sizeName: "XXL",
          sku: "TS-BLACK-XXL",
          stockQuantity: 25,
          isAvailable: true,
        },
      ],
    },
    {
      name: "Everyday Hat",
      slug: "everyday-hat",
      description:
        "The 100% Cotton Everyday Cap features an adjustable antique brass buckle closure to ensure the perfect fit.",
      basePrice: "28.99",
      gender: "men",
      isPopular: false,
      isActive: true,
      collections: ["hats-accessories"],
      attributes: [
        {
          attributeName: "style",
          attributeValue: "hats",
        },
      ],
      images: [
        {
          url: "/products/everyday-hat/1.jpg",
          altText: "Everyday Hat front view",
          isPrimary: true,
          sortOrder: 1,
        },
        {
          url: "/products/everyday-hat/2.jpg",
          altText: "Everyday Hat side view",
          isPrimary: false,
          sortOrder: 2,
        },
        {
          url: "/products/everyday-hat/3.jpg",
          altText: "Everyday Hat back view",
          isPrimary: false,
          sortOrder: 3,
        },
      ],
      variants: [
        {
          colorName: "White",
          sizeName: "OS",
          sku: "EH-WHITE-OS",
          stockQuantity: 25,
          isAvailable: true,
        },
        {
          colorName: "Black",
          sizeName: "OS",
          sku: "EH-BLACK-OS",
          stockQuantity: 25,
          isAvailable: true,
        },
      ],
    },
    {
      name: "Women's Elite+ Joggers",
      slug: "womens-elite-joggers",
      description:
        "Reimagined in every way, our Women's Elite+ Joggers have been completely upgraded for even greater comfort, added durability, and all around flexibility. With the new Elite+ Fabric perfect for any season, you'll never want to take these joggers off!",
      basePrice: "74.99",
      gender: "women",
      isPopular: true,
      isActive: true,
      collections: ["womens-bottoms"],
      fabrics: [
        {
          fabricName: "Elite+",
          percentage: "100.00",
        },
      ],
      attributes: [
        {
          attributeName: "style",
          attributeValue: "joggers",
        },
      ],
      images: [
        {
          url: "/products/womens-elite-joggers/1.jpg",
          altText: "Women's Elite+ Joggers front view",
          isPrimary: true,
          sortOrder: 1,
        },
        {
          url: "/products/womens-elite-joggers/2.jpg",
          altText: "Women's Elite+ Joggers side view",
          isPrimary: false,
          sortOrder: 2,
        },
        {
          url: "/products/womens-elite-joggers/3.jpg",
          altText: "Women's Elite+ Joggers back view",
          isPrimary: false,
          sortOrder: 3,
        },
        {
          url: "/products/womens-elite-joggers/4.jpg",
          altText: "Women's Elite+ Joggers detail view",
          isPrimary: false,
          sortOrder: 4,
        },
      ],
      variants: [
        {
          colorName: "Black",
          sizeName: "XS",
          sku: "WEJ-BLACK-XS",
          stockQuantity: 15,
          isAvailable: true,
        },
        {
          colorName: "Black",
          sizeName: "S",
          sku: "WEJ-BLACK-S",
          stockQuantity: 15,
          isAvailable: true,
        },
        {
          colorName: "Black",
          sizeName: "M",
          sku: "WEJ-BLACK-M",
          stockQuantity: 0,
          isAvailable: false,
        },
        {
          colorName: "Black",
          sizeName: "L",
          sku: "WEJ-BLACK-L",
          stockQuantity: 0,
          isAvailable: false,
        },
      ],
    },
  ],
};
