let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function showProducts(list) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  list.forEach(p => {
    // FIX: Check if productExtras has the correct images for this product
    const extra = productExtras[p.id];
    const correctImage = extra ? extra.images[0] : p.img;

    container.innerHTML += `
      <div class="card">
        <img src="${correctImage}" alt="${p.name}" onclick="showDetails(${p.id})">
        <h3 onclick="showDetails(${p.id})">${p.name}</h3>
        <p class="price">₹${p.price}</p>
        <button onclick="showDetails(${p.id})">View / Add to Cart</button>
      </div>`;
  });
}

// ============================================
// FAKE DATA: extra images, descriptions, reviews
// ============================================
const productExtras = {
  1: { // Wireless Headphones
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Premium wireless headphones with 40-hour battery life, active noise cancellation, and soft over-ear cushions. Perfect for work, travel, and gaming.",
    rating: 4.5,
    reviews: [
      { name: "Ravi K.", stars: 5, text: "Amazing sound quality! Battery lasts forever." },
      { name: "Priya S.", stars: 4, text: "Comfortable but a bit heavy after long use." },
      { name: "Arjun M.", stars: 5, text: "Best purchase this year. Noise cancellation is superb." },
    ],
  },
  2: { // Smart Watch
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Track your health, workouts, and notifications with this sleek smartwatch. Heart-rate monitor, sleep tracking, and 7-day battery.",
    rating: 4.2,
    reviews: [
      { name: "Neha P.", stars: 4, text: "Great fitness tracking features." },
      { name: "Karan V.", stars: 5, text: "Battery really lasts a week. Love it!" },
      { name: "Ananya R.", stars: 4, text: "Good value for money." },
    ],
  },
  3: { // Backpack
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1577733966973-d680bffd2e20?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Water-resistant backpack with padded laptop sleeve, USB charging port, and multiple compartments. Ideal for travel and daily commute.",
    rating: 4.7,
    reviews: [
      { name: "Vikram S.", stars: 5, text: "Super spacious, fits my 15-inch laptop easily." },
      { name: "Meera K.", stars: 5, text: "Stylish and durable. Highly recommend!" },
      { name: "Rohit D.", stars: 4, text: "USB port is a nice touch." },
    ],
  },
  4: { // Coffee Mug
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Ceramic coffee mug with vintage print. Microwave and dishwasher safe. 350ml capacity. Perfect for your morning brew.",
    rating: 4.4,
    reviews: [
      { name: "Sneha T.", stars: 5, text: "Beautiful design, feels premium." },
      { name: "Aditya B.", stars: 4, text: "Great mug, print slightly faded after washes." },
      { name: "Divya N.", stars: 5, text: "My favorite mug now!" },
    ],
  },
  5: { // Running Shoes
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Lightweight running shoes with breathable mesh, cushioned sole, and anti-slip grip. Built for daily runs and gym workouts.",
    rating: 4.3,
    reviews: [
      { name: "Rahul G.", stars: 5, text: "Super comfy for long runs." },
      { name: "Pooja M.", stars: 4, text: "True to size. Good grip." },
      { name: "Sameer K.", stars: 4, text: "Nice design, decent cushioning." },
    ],
  },
  6: { // Desk Lamp
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Adjustable LED desk lamp with 3 brightness levels and USB charging port. Eye-caring light for study and work.",
    rating: 4.6,
    reviews: [
      { name: "Ishita R.", stars: 5, text: "Perfect for late-night study sessions." },
      { name: "Manish V.", stars: 5, text: "Adjustable and bright. Great value." },
      { name: "Kritika S.", stars: 4, text: "Works well, slightly small base." },
    ],
  },
  7: { // Bluetooth Speaker
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507878866276-a947ef722fee?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Portable Bluetooth speaker with rich bass, 12-hour battery, and IPX7 waterproof rating. Perfect for outdoor parties and travel.",
    rating: 4.5,
    reviews: [
      { name: "Rohit K.", stars: 5, text: "Loud and clear! Bass is amazing." },
      { name: "Anjali M.", stars: 4, text: "Battery lasts long, good for outdoor use." },
      { name: "Sahil P.", stars: 5, text: "Best speaker at this price." },
    ],
  },
  8: { // Gaming Mouse
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1613141411244-0e4ac259d217?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1628832307345-7404b47f175f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Ergonomic gaming mouse with 7 programmable buttons, RGB lighting, and 16,000 DPI optical sensor. Smooth glide and precision clicks.",
    rating: 4.6,
    reviews: [
      { name: "Vivek R.", stars: 5, text: "Perfect for FPS games. Clicks feel great." },
      { name: "Nisha S.", stars: 4, text: "RGB looks cool, comfortable grip." },
      { name: "Aman K.", stars: 5, text: "Worth every rupee!" },
    ],
  },
  9: { // Mechanical Keyboard
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1603481546238-487240415921?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Compact mechanical keyboard with blue switches, RGB backlight, and detachable USB-C cable. Tactile typing for work and gaming.",
    rating: 4.7,
    reviews: [
      { name: "Kiran D.", stars: 5, text: "Clicky and satisfying to type on." },
      { name: "Deepa V.", stars: 5, text: "Perfect for coding. Love the feel." },
      { name: "Rahul T.", stars: 4, text: "A bit loud but great quality." },
    ],
  },
  10: { // Power Bank
    images: [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1619489646924-b4fce76b4b1f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1594312915251-48db9280c8f1?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1585338447937-7082f8fc763a?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "20,000 mAh power bank with dual USB output, USB-C fast charging, and LED battery indicator. Charges your phone up to 4 times.",
    rating: 4.4,
    reviews: [
      { name: "Sneha B.", stars: 5, text: "Charges my phone 4 full times!" },
      { name: "Arun G.", stars: 4, text: "Heavy but powerful. Great for trips." },
      { name: "Pooja N.", stars: 5, text: "Fast charging works as described." },
    ],
  },
  11: { // Sunglasses
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584036561566-b93d12d2f1a3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "UV400 polarized sunglasses with lightweight frame and scratch-resistant lenses. Ideal for driving, beach, and daily wear.",
    rating: 4.2,
    reviews: [
      { name: "Riya S.", stars: 5, text: "Stylish and comfortable. Great UV protection." },
      { name: "Kunal M.", stars: 4, text: "Good quality for the price." },
      { name: "Tara P.", stars: 4, text: "Looks premium. Love the design." },
    ],
  },
  12: { // Leather Wallet
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1601592996763-f05c9c80a7f1?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1613482184729-6a02b6d6b4a5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Genuine leather bi-fold wallet with RFID blocking, 8 card slots, and 2 currency compartments. Slim yet spacious.",
    rating: 4.5,
    reviews: [
      { name: "Rakesh V.", stars: 5, text: "Premium leather. Feels great in hand." },
      { name: "Meena K.", stars: 4, text: "Fits all my cards. Slim profile." },
      { name: "Ajay R.", stars: 5, text: "Perfect gift. Beautiful craftsmanship." },
    ],
  },
  13: { // Denim Jacket
    images: [
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1527016021513-b09758b777bd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Classic denim jacket with button closure, chest pockets, and relaxed fit. Perfect for layering in any season.",
    rating: 4.6,
    reviews: [
      { name: "Nikhil P.", stars: 5, text: "Great fit and quality denim." },
      { name: "Ananya D.", stars: 5, text: "Looks stylish. Goes with everything." },
      { name: "Ravi S.", stars: 4, text: "Good quality, runs slightly large." },
    ],
  },
  14: { // Baseball Cap
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1620327467532-6ebaca6273ed?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Adjustable cotton baseball cap with embroidered logo and curved brim. Breathable and perfect for daily wear.",
    rating: 4.3,
    reviews: [
      { name: "Vikram A.", stars: 4, text: "Comfortable. Adjustable strap works well." },
      { name: "Priya M.", stars: 5, text: "Nice fit. Very breathable." },
      { name: "Suresh K.", stars: 4, text: "Good quality fabric." },
    ],
  },
  15: { // Ceramic Vase
    images: [
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1595150358733-9c5d9c6c7c37?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Handcrafted ceramic vase with matte finish. Perfect for fresh flowers or as a standalone decorative piece.",
    rating: 4.7,
    reviews: [
      { name: "Divya R.", stars: 5, text: "Beautiful vase! Looks expensive." },
      { name: "Kavya N.", stars: 5, text: "Perfect for my living room." },
      { name: "Anil B.", stars: 4, text: "Nice quality. Slightly small." },
    ],
  },
  16: { // Wall Clock
    images: [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507643179773-3e975d7ac515?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Silent quartz wall clock with modern minimalist design. 10-inch diameter, perfect for living room, kitchen, or office.",
    rating: 4.5,
    reviews: [
      { name: "Sunita M.", stars: 5, text: "Totally silent! Beautiful design." },
      { name: "Mohan K.", stars: 4, text: "Easy to read from across the room." },
      { name: "Lata P.", stars: 5, text: "Great quality. Very happy." },
    ],
  },
  17: { // Throw Pillow
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1629949009765-40fc74c9ec21?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1592789705501-31c2e5e2c3a5?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Soft velvet throw pillow with premium filling. 16x16 inches. Adds a cozy touch to sofas and beds.",
    rating: 4.4,
    reviews: [
      { name: "Rekha S.", stars: 5, text: "Super soft and cozy. Love the color." },
      { name: "Vishal D.", stars: 4, text: "Good filling. Doesn't flatten." },
      { name: "Anjali T.", stars: 5, text: "Beautiful on my sofa!" },
    ],
  },
  18: { // Scented Candle
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Hand-poured soy wax scented candle with lavender and vanilla notes. 40-hour burn time. Comes in a reusable glass jar.",
    rating: 4.6,
    reviews: [
      { name: "Ishita V.", stars: 5, text: "Smells heavenly! Long burn time." },
      { name: "Naveen R.", stars: 5, text: "Perfect for relaxation." },
      { name: "Shruti K.", stars: 4, text: "Nice scent, subtle and calming." },
    ],
  },
};
function starsFromRating(r) {
  const full = Math.floor(r);
  const half = r - full >= 0.5;
  return "⭐".repeat(full) + (half ? "☆" : "") + "☆".repeat(5 - full - (half ? 1 : 0));
}

function showDetails(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  const extra = productExtras[id] || {
    images: [p.img, p.img, p.img, p.img, p.img],
    desc: "High-quality product with great features.",
    rating: 4.0,
    reviews: [{ name: "Anonymous", stars: 4, text: "Good product." }],
  };

  // Main image
  document.getElementById("modal-img").src = extra.images[0];

  // Thumbnails
  const thumbsBox = document.getElementById("modal-thumbs");
  thumbsBox.innerHTML = "";
  extra.images.forEach((url, i) => {
    const t = document.createElement("img");
    t.src = url;
    if (i === 0) t.classList.add("active");
    t.onclick = () => {
      document.getElementById("modal-img").src = url;
      document.querySelectorAll("#modal-thumbs img").forEach(x => x.classList.remove("active"));
      t.classList.add("active");
    };
    thumbsBox.appendChild(t);
  });

  // Text details
  document.getElementById("modal-name").textContent = p.name;
  document.getElementById("modal-category").textContent = "Category: " + p.category;
  document.getElementById("modal-price").textContent = "₹" + p.price;
  document.getElementById("modal-desc").textContent = extra.desc;

  // Rating
  document.getElementById("modal-stars").textContent = starsFromRating(extra.rating);
  document.getElementById("modal-rating-text").textContent =
    extra.rating + " (" + extra.reviews.length + " reviews)";

  // Reviews
  const revBox = document.getElementById("modal-reviews");
  revBox.innerHTML = extra.reviews.map(r => `
    <div class="review-card">
      <div class="review-head">
        <span class="reviewer">${r.name}</span>
        <span class="review-stars">${"⭐".repeat(r.stars)}</span>
      </div>
      <div class="review-text">${r.text}</div>
    </div>
  `).join("");

  // Similar products (same category, up to 4, excluding this one)
  const similar = products.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  document.getElementById("modal-similar").innerHTML = similar.map(s => {
    // FIX: Use the correct image for similar products too
    const simExtra = productExtras[s.id];
    const simImage = simExtra ? simExtra.images[0] : s.img;

    return `
      <div class="similar-card" onclick="showDetails(${s.id})">
        <img src="${simImage}" alt="${s.name}">
        <div class="sim-name">${s.name}</div>
        <div class="sim-price">₹${s.price}</div>
      </div>
    `;
  }).join("");

  // Add to cart button (opens from inside the detail)
  document.getElementById("modal-add").onclick = () => {
    addToCart(p.id);
    document.getElementById("modal").classList.add("hidden");
  };

  // Show modal
  document.getElementById("modal").classList.remove("hidden");
}

document.getElementById("modal-close").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});
document.getElementById("modal").classList.add("hidden");

function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

function changeQty(id, change) {
  const item = cart.find(i => i.id === id);
  item.qty += change;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  updateCart();
}

function updateCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";
  let total = 0, count = 0;

  cart.forEach(i => {
    total += i.price * i.qty;
    count += i.qty;
    container.innerHTML += `
      <div class="cart-row">
        <span>${i.name}<br>₹${i.price}</span>
        <span>
          <button onclick="changeQty(${i.id}, -1)">-</button>
          ${i.qty}
          <button onclick="changeQty(${i.id}, 1)">+</button>
        </span>
      </div>`;
  });

  document.getElementById("cart-total").textContent = total;
  document.getElementById("cart-count").textContent = count;
  localStorage.setItem("cart", JSON.stringify(cart));
}

document.getElementById("cart-btn").addEventListener("click", () => {
  document.getElementById("cart-panel").classList.remove("hidden");
});
document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart-panel").classList.add("hidden");
});
document.getElementById("cart-panel").classList.add("hidden");

function filterCategory(cat) {
  if (cat === "All") {
    showProducts(products);
  } else {
    showProducts(products.filter(p => p.category === cat));
  }
}

document.getElementById("search").addEventListener("input", e => {
  const text = e.target.value.toLowerCase();
  showProducts(products.filter(p => p.name.toLowerCase().includes(text)));
});

// ============================================
// LOGIN / SIGNUP
// ============================================

let token = localStorage.getItem("token");
let authMode = "login";

const savedUser = JSON.parse(localStorage.getItem("user") || "null");
if (savedUser && token) {
  document.getElementById("auth-btn").textContent = "Hi, " + savedUser.name;
}

document.getElementById("auth-btn").addEventListener("click", () => {
  if (token) {
    // Already logged in → offer logout
    if (confirm("Log out of " + savedUser.name + "?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      location.reload();
    }
    return;
  }
  document.getElementById("auth-modal").classList.remove("hidden");
});

document.getElementById("auth-close").addEventListener("click", () => {
  document.getElementById("auth-modal").classList.add("hidden");
  document.getElementById("auth-error").textContent = "";
});

document.getElementById("auth-toggle").addEventListener("click", (e) => {
  e.preventDefault();
  authMode = authMode === "login" ? "signup" : "login";

  const title = document.getElementById("auth-title");
  const submitBtn = document.getElementById("auth-submit");
  const toggleLink = document.getElementById("auth-toggle");
  const nameInput = document.getElementById("auth-name");

  if (authMode === "signup") {
    title.textContent = "Create Account";
    submitBtn.textContent = "Sign Up";
    toggleLink.textContent = "Already have an account? Login";
    nameInput.style.display = "block";
  } else {
    title.textContent = "Login";
    submitBtn.textContent = "Login";
    toggleLink.textContent = "New here? Create an account";
    nameInput.style.display = "none";
  }

  document.getElementById("auth-error").textContent = "";
});

document.getElementById("auth-name").style.display = "none";

document.getElementById("auth-submit").addEventListener("click", async () => {
  const name = document.getElementById("auth-name").value.trim();
  const email = document.getElementById("auth-email").value.trim();
  const password = document.getElementById("auth-password").value;
  const errorEl = document.getElementById("auth-error");
  errorEl.textContent = "";

  const url = authMode === "login" ? "/api/login" : "/api/signup";
  const body = authMode === "login"
    ? { email, password }
    : { name, email, password };

  try {
    const res = await fetch("http://localhost:3000" + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (!res.ok) {
      errorEl.textContent = data.error || "Something went wrong";
      return;
    }

    token = data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(data.user));

    document.getElementById("auth-btn").textContent = "Hi, " + data.user.name;
    document.getElementById("auth-modal").classList.add("hidden");
    document.getElementById("auth-name").value = "";
    document.getElementById("auth-email").value = "";
    document.getElementById("auth-password").value = "";
  } catch (err) {
    errorEl.textContent = "Cannot reach server. Is it running?";
  }
});

// ============================================
// CHECKOUT (requires login)
// ============================================

document.getElementById("checkout-btn").addEventListener("click", async () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  if (!token) {
    alert("Please log in first to place an order.");
    document.getElementById("auth-modal").classList.remove("hidden");
    return;
  }

  const address = prompt("Enter your delivery address:");
  if (!address) return;

  try {
    const res = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({
        address: address,
        items: cart.map((i) => ({ id: i.id, qty: i.qty })),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Error: " + (data.error || "Unknown error"));
      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        token = null;
        document.getElementById("auth-btn").textContent = "Login";
      }
      return;
    }

    alert("Order #" + data.id + " placed! Total: ₹" + data.total);
    cart = [];
    updateCart();
    document.getElementById("cart-panel").classList.add("hidden");
  } catch (err) {
    alert("Could not reach the server. Is it running?");
  }
});

fetch("http://localhost:3000/api/products")
  .then(res => res.json())
  .then(data => {
    products = data;
    showProducts(products);
  })
  .catch(() => {
    document.getElementById("product-list").innerHTML = "<p>Could not load products. Is the server running?</p>";
  });

updateCart();

// New category dropdown handler
document.getElementById("category-select").addEventListener("change", (e) => {
  filterCategory(e.target.value);
});