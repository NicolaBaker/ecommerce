// Tout les produit
// source qui ma aidee : https://stackoverflow.com/questions/72121228/how-to-update-location-state-in-react-router-v6
const products = [
  {
    id: "Essentiel",
    name: "T-Shirt Essentiel",
    description: "T-shirt en coton doux pour tous les jours",
    image: "https://m.media-amazon.com/images/I/911n4nIhnpL._UY1000_.jpg",
    imageG: "https://www.voetbalshop.be/media/catalog/product/cache/d81c8dc66c69ceb69419c2e7e72e896d/2/6/265399_under-armour-heavyweight-t-shirt-logo-zwart-wit.jpg",
    price: 30,
    colors: ["Noir", "Bleu"],
    details: "Confortable et simple, parfait pour tous les jours.",
    genre: "Homme",
    taille: ["P", "M", "G", "TG", "TTG"],
    sale: true,
    stock: {
      P: 5,
      M: 10,
      G: 7,
      TG: 4,
      TTG: 4
    }
  },
  {
    id: "Oversize",
    name: "T-Shirt Oversize",
    description: "T-shirt ample en coton bio",
    image: "https://shop.rmg.co.uk/cdn/shop/files/organic-PM-T-Shirt.2.jpg?v=1707228637&width=480",
    price: 35,
    colors: ["Noir"],
    details: "Style relax avec tissu respirant et écoresponsable.",
    genre: "Femme",
    taille: ["P", "M", "G", "TG"],
    sale: true,
    stock: {
      P: 3,
      M: 9,
      G: 6,
      TG: 2,
    }
  },
  {
    id: "ÉditionLimitée",
    name: "T-Shirt Édition Limitée",
    description: "Design unique fait au Canada",
    image: "https://goudronblanc.com/wp-content/uploads/2024/07/t-shirt-jaune-chrome-goudronblanc-1000x1000.jpg",
    price: 50,
    colors: ["Jaune"],
    details: "Tissu haut de gamme avec une coupe moderne.",
    genre: "Homme",
    taille: ["P", "M", "G", "TG", "TTG"],
    sale: false,
    stock: {P: 19,M: 25,G: 13,TG: 22,
      TTG: 89
    }
  },
  {
    id: "RelaxFit",
    name: "T-Shirt Relax Fit",
    description: "T-shirt coupe large et confortable",
    image: "https://images.teemill.com/pj7pjkz9vl1ggjaixlwfxhkgmibpwudc7k6vs7x6sywaokmh.png.png?w=1080&h=auto",
    price: 28,
    colors: ["Bleu"],
    details: "Parfait pour relaxer ou sortir l'été.",
    genre: "Femme",
    taille: ["P", "M", "G", "TG", "TTG"],
    sale: true,
    stock: {P: 34,
      M: 74,
      G: 55,TG: 22,
      TTG: 20
    }
  },
  {
    id: "Classique",
    name: "T-Shirt Classique Noir",
    description: "T-shirt simple noir en coton",
    image: "https://janedeboy-cdn.com/arts/1500/128491_01.jpg",
    price: 25,
    colors: ["Noir"],
    details: "Confortable, va avec tout.",
    genre: "Homme",
    taille: ["P", "M", "G", "TG", "TTG"],
    sale: true,
    stock: { P: 49, M: 19, G: 79, TG: 39, TTG: 19 }
  },
  {
    id: "Blanc Uni",
    name: "T-Shirt Blanc Uni",
    description: "T-shirt blanc basique",
    image: "https://silverstick.co.uk/cdn/shop/products/Silverstick-Mens-Organic-Cotton-T-Shirt-White-Front_04527058-74b4-4865-9dd5-903b15075bbe_1024x1024.jpg?v=1582734585",
    price: 22,
    colors: ["Blanc"],
    details: "Tissu léger parfait pour l'été.",
    genre: "Femme",
    taille: ["P", "M", "G", "TG"],
    sale: false,
    stock: { P: 22, M: 28, G: 25, TG: 21 }
  },
  {
    id: "Vert Pâle",
    name: "T-Shirt Vert Pâle",
    description: "T-shirt vert pastel",
    image: "https://images.comelin.com/110/60218/w2000/T-SHIRT-MELANGE-Vert-Pale-MEDIUM-Manches-courtes-R-M2-Boutiques.webp",
    price: 30,
    colors: ["Vert"],
    details: "Couleur douce avec coupe moderne.",
    genre: "Femme",
    taille: ["P", "M", "G"],
    sale: true,
    stock: { P: 21, M: 26, G: 22 }
  },
  {
    id: "Logo Petit",
    name: "T-Shirt Logo Petit",
    description: "T-shirt avec petit logo brodé",
    image: "https://cdn.clothbase.com/uploads/0fc6f1c1-9516-4cd5-9f72-ee86cb0a5405/24-01-2024-GH2_TSAW2366EL_1_1.jpg",
    price: 35,
    colors: ["Beige"],
    details: "Style simple avec petit détail cool.",
    genre: "Unisexe",
    taille: ["P", "M", "G", "TG", "TTG"],
    sale: false,
    stock: { P: 3, M: 7, G: 6, TG: 2, TTG: 12 }
  },
  {
    id: "Rouge Feu",
    name: "T-Shirt Rouge Feu",
    description: "T-shirt rouge vif",
    image: "https://thrifttale.com/cdn/shop/files/B_C-Kimberly-T-Shirt-68289925.jpg?v=1698508076&width=2107",
    price: 28,
    colors: ["Rouge"],
    details: "Tissu épais, couleur qui ressort.",
    genre: "Homme",
    taille: ["M", "G", "TG", "TTG"],
    sale: false,
    stock: { M: 25, G: 24, TG: 21, 
      TTG: 20 }
  },
  {
    id: "Bleu Marine",
    name: "T-Shirt Bleu Marine",
    description: "T-shirt foncé classique",
    image: "https://imgs.michaels.com/MAM/assets/1/5E3C12034D34434F8A9BAAFDDF0F8E1B/img/AB42CF42673041A6886C31560E298401/10532986_11.jpg",
    price: 27,
    colors: ["Bleu"],
    details: "Polyvalent pour l'école ou le travail.",
    genre: "Homme",
    taille: ["P", "M", "G"],
    sale: false,
    stock: { P: 22, M: 82, G: 23 }
  },
  {
    id: "Rose Doux",
    name: "T-Shirt Rose Doux",
    description: "T-shirt rose clair",
    image: "https://killcrew.co/cdn/shop/files/pink_b84bdb1e-b03b-4414-8cbf-d6e04967fc79_2048x.jpg?v=1700090669",
    price: 29,
    colors: ["Rose"],
    details: "Coupe féminine avec tissu souple.",
    genre: "Femme",
    taille: ["P", "M", "G", "TG"],
    sale: false,
    stock: { P: 22, M: 72, G: 52, TG: 22 }
  },
  {
    id: "Beige Naturel",
    name: "T-Shirt Beige Naturel",
    description: "T-shirt beige en coton bio",
    image: "https://d2hnh3d6vfy9oz.cloudfront.net/_6ZY_KXwFmJcZEarmB-Ub9ITTnpeYxlHzeX8V5Fb5io/w:1500/czM6Ly93ZWRyZXNz/ZmFpci1wcm9kdWN0/aW9uL2RvbXplNndx/Y3lqOHhlOHhicWZ2/OXhpdTk0b2s",
    price: 32,
    colors: ["Beige"],
    details: "Fait au Canada, tissu écoresponsable.",
    taille: ["M", "G", "TG"],
    genre: "Homme",
    sale: false,
    stock: { M: 22, G: 22, TG: 21 }
  },
  {
    id: "Tie Dye",
    name: "T-Shirt Tie Dye",
    description: "T-shirt coloré à motifs",
    image: "https://m.media-amazon.com/images/I/41ahH1X2+TL._AC_SL1020_.jpg",
    imageG: "https://www.theadairgroup.com/images/Assorted_T_Shirts_large.jpg",
    price: 34,
    colors: ["Orange","Bleu","Jaune","Rouge","Gris"],
    details: "Parfait pour un look d'été chill.",
    genre: "Unisexe",
    taille: ["P", "M", "G", "TG"],
    sale: true,
    stock: { P: 51, M: 95, G: 83, TG: 92 }
  },
  {
    id: "Long",
    name: "T-Shirt Long",
    description: "T-shirt plus long à l’arrière",
    image: "https://joesusa.com/cdn/shop/files/royal-front_994969c8-ed8a-463f-a411-08987def163e.jpg?v=1743703149",
    price: 33,
    colors: ["Bleu"],
    details: "Parfait avec des leggings ou jeans.",
    genre: "Femme",
    taille: ["M", "G", "TG"],
    sale: false,
    stock: { M: 36, G: 33, TG: 23 }
  },{
    id: "Logo",
    name: "Chandail Logo",
    description: "T-shirt unisexe avec notre logo imprimé",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmBOxtot15Q3aSHCGonzrli3EYqFCPiKWttQ&s",
    price: 40,
    colors: ["Bleu"],
    details: "T-shirt stylé avec impression du logo de la marque.",
    genre: "Unisexe",
    taille: ["P", "M", "G", "TG", "TTG"],
    sale: true,
    stock: {P: 78,M: 8,G: 74,
      TG: 3,
      TTG: 8
    }
  }
  
];

export default products;
