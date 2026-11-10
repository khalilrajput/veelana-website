import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const routes = [
  {
    path: 'products',
    title: 'Shop Veelana Herbal Hair Oil (100ml & 200ml) | Cash on Delivery Pakistan',
    description: 'Order Veelana 100% pure cold-pressed botanical hair oil. Available in 100ml Trial Bottle (Rs. 999) and 200ml Value Pack (Rs. 1,899). Fast nationwide delivery across Pakistan.',
    canonical: 'https://www.veelana.online/products'
  },
  {
    path: 'ingredients',
    title: '25+ Cold-Pressed Herbs & Botanical Ingredients | Veelana Herbal Hair Care',
    description: 'Explore the 25+ natural herbs formulated inside Veelana: Amla, Bhringraj, Brahmi, Rosemary, Neem, Kalonji, Fenugreek, and pure cold-pressed base oils.',
    canonical: 'https://www.veelana.online/ingredients'
  },
  {
    path: 'how-to-use',
    title: 'How to Use Veelana Hair Oil | Scalp Ritual for Maximum Hair Growth',
    description: 'Step-by-step application guide for Veelana herbal hair care oil. Recommended nightly massage rituals, frequency, and leave-on directions for best results.',
    canonical: 'https://www.veelana.online/how-to-use'
  },
  {
    path: 'reviews',
    title: 'Customer Reviews & Real Results (1,280+ Verified) | Veelana Hair Care',
    description: 'Read verified customer feedback, baby hair regrowth stories, and hair fall reduction reviews from Veelana users across Karachi, Lahore, Islamabad, and nationwide.',
    canonical: 'https://www.veelana.online/reviews'
  },
  {
    path: 'why-veelana',
    title: 'Why Choose Veelana vs Chemical Hair Oils | 100% Cold-Pressed Organic Purity',
    description: 'Compare Veelana to commercial hair oils. 0% mineral oil, 0% liquid paraffin, 0% silicones, 100% active plant herbs with 72-hour slow extraction.',
    canonical: 'https://www.veelana.online/why-veelana'
  },
  {
    path: 'track-order',
    title: 'Track Your Order | Real-Time Courier Tracking | Veelana Pakistan',
    description: 'Track your Veelana hair oil parcel in real time using your Order ID or phone number. Supports TCS, Trax, Leopard, Call Courier, and PostEx.',
    canonical: 'https://www.veelana.online/track-order'
  },
  {
    path: 'about',
    title: 'About Veelana | Our Story & Botanical Heritage | Handcrafted in Punjab Pakistan',
    description: "Learn about Veelana's mission: preserving traditional 72-hour cold-pressed herbal extraction methods from Punjab, Pakistan. 100% organic, vegan, mineral-oil-free hair care.",
    canonical: 'https://www.veelana.online/about'
  },
  {
    path: 'contact',
    title: 'Contact Veelana Customer Support | WhatsApp & Phone +92 306 1041609',
    description: 'Get in touch with Veelana Herbal Hair Care team. Fast WhatsApp support, order inquiries, dosage guidance, and dispatch updates.',
    canonical: 'https://www.veelana.online/contact'
  },
  {
    path: 'faq',
    title: 'Frequently Asked Questions | Delivery, Results & Safety | Veelana',
    description: 'Answers to common questions: When will I see hair growth? Is Veelana safe for colored hair? How fast is delivery across Pakistan?',
    canonical: 'https://www.veelana.online/faq'
  },
  {
    path: 'science',
    title: 'Scalp Science & Follicle Biology | How Veelana Activates Hair Growth',
    description: 'The dermatological science behind 25+ botanical cold-pressed lipids, DHT blocker phyto-compounds, and cellular microcirculation in scalp dermal papilla.',
    canonical: 'https://www.veelana.online/science'
  },
  {
    path: 'blog',
    title: 'The Veelana Botanical Journal | Scalp Science & Herbal Wisdom',
    description: 'Expert articles and comprehensive guides on 25+ cold-pressed herbs, avoiding synthetic mineral oils, nightly hair rituals, and reversing hair fall.',
    canonical: 'https://www.veelana.online/blog'
  },
  {
    path: 'blog/science-of-25-cold-pressed-herbs',
    title: 'The Science of 25+ Cold-Pressed Herbs: How Botanical Lipids Penetrate Hair Cuticles | Veelana Botanical Library',
    description: 'Discover why slow cold-pressed extraction preserves vital Vitamin C, Ricinoleic acid, and antioxidants compared to high-heat commercial processing.',
    canonical: 'https://www.veelana.online/blog/science-of-25-cold-pressed-herbs'
  },
  {
    path: 'blog/why-mineral-oils-parabens-damage-scalp',
    title: 'Why Synthetic Mineral Oils & Parabens Destroy Hair Follicle Density | Veelana Botanical Library',
    description: 'Learn how synthetic fillers block micro-blood circulation and cause silent chronic inflammation on your scalp.',
    canonical: 'https://www.veelana.online/blog/why-mineral-oils-parabens-damage-scalp'
  },
  {
    path: 'blog/ultimate-nightly-hair-oiling-routine',
    title: 'The Ultimate Nightly Hair Oiling Routine: Step-by-Step Scalp Massage Guide | Veelana Botanical Library',
    description: 'Learn how to boost absorption by 300% through the Inversion Method, gentle acupressure, and warm towel wrapping.',
    canonical: 'https://www.veelana.online/blog/ultimate-nightly-hair-oiling-routine'
  },
  {
    path: 'blog/botanical-heritage-story',
    title: 'Our Botanical Heritage: Handcrafted in Punjab Pakistan | Veelana Botanical Library',
    description: "How a 3-generation family recipe of 25 slow-infused herbs became Pakistan's most trusted natural hair elixir.",
    canonical: 'https://www.veelana.online/blog/botanical-heritage-story'
  },
  {
    path: 'shipping-returns',
    title: 'Shipping & 7-Day Exchange Policy | Veelana Hair Care Pakistan',
    description: 'Fast nationwide Cash on Delivery shipping across Pakistan. 2-4 business days delivery, safe packaging, and hassle-free 7-day exchange support.',
    canonical: 'https://www.veelana.online/shipping-returns'
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy | Veelana Herbal Hair Care',
    description: "Veelana's privacy commitments: how we safeguard your customer data, delivery addresses, phone numbers, and ensure zero 3rd-party sharing.",
    canonical: 'https://www.veelana.online/privacy-policy'
  },
  {
    path: 'terms',
    title: 'Terms & Conditions of Service | Veelana Herbal Hair Care',
    description: 'Terms of service, purchasing agreements, payment options, and delivery guarantees for Veelana Herbal Hair Care Pakistan.',
    canonical: 'https://www.veelana.online/terms'
  }
];

function generateRoutes() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  routes.forEach(route => {
    let customHtml = baseHtml;

    // Replace canonical URL
    customHtml = customHtml.replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${route.canonical}" />`
    );

    // Replace title
    customHtml = customHtml.replace(
      /<title>[^<]*<\/title>/,
      `<title>${route.title}</title>`
    );
    customHtml = customHtml.replace(
      /<meta name="title" content="[^"]*"\s*\/?>/,
      `<meta name="title" content="${route.title}" />`
    );

    // Replace description
    customHtml = customHtml.replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${route.description}" />`
    );

    // Replace OpenGraph
    customHtml = customHtml.replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${route.title}" />`
    );
    customHtml = customHtml.replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${route.description}" />`
    );
    customHtml = customHtml.replace(
      /<meta property="og:url" content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${route.canonical}" />`
    );

    // Replace Twitter
    customHtml = customHtml.replace(
      /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${route.title}" />`
    );
    customHtml = customHtml.replace(
      /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${route.description}" />`
    );
    customHtml = customHtml.replace(
      /<meta name="twitter:url" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:url" content="${route.canonical}" />`
    );

    // Target folder: dist/<route>
    const targetDir = path.join(distDir, route.path);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Write dist/<route>/index.html
    const targetIndexPath = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetIndexPath, customHtml, 'utf8');

    // Also write dist/<route>.html as a clean fallback for any server/CDN
    const targetHtmlPath = path.join(distDir, `${route.path}.html`);
    // Ensure parent folder exists for nested routes like blog/...
    const htmlParentDir = path.dirname(targetHtmlPath);
    if (!fs.existsSync(htmlParentDir)) {
      fs.mkdirSync(htmlParentDir, { recursive: true });
    }
    fs.writeFileSync(targetHtmlPath, customHtml, 'utf8');

    console.log(`Generated: ${route.path}/index.html & ${route.path}.html`);
  });

  console.log(`Successfully generated static HTML pages for all ${routes.length} routes!`);
}

generateRoutes();
