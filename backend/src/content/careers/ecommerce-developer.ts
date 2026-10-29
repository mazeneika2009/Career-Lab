import type { CareerDef } from '../framework.js'

export const ecommerceDeveloper: CareerDef = {
  slug: 'ecommerce-developer',
  name: 'E-Commerce Developer',
  category: 'Development',
  order: 8,
  description:
    'Implements online stores end to end — products, carts, checkout, payments with Stripe, Shopify and WooCommerce.',
  difficulty: 'Intermediate',
  pathSummary:
    'HTML/CSS/JS fundamentals → product catalog & data modeling → cart & session management → Stripe payment integration → Shopify/WooCommerce platforms → security, testing & deployment.',
  mainSkills: ['HTML', 'CSS', 'JavaScript', 'Shopify', 'WooCommerce', 'Stripe', 'REST APIs', 'Database Design'],
  sourcePlatforms: ['Shopify Developer Documentation', 'WooCommerce Documentation', 'Stripe Documentation', 'MDN Web Docs', 'OWASP', 'MySQL Documentation'],
  companyName: 'CartForge Labs',
  roleTitle: 'E-Commerce Developer',

  chapters: [
    {
      slug: 'web-fundamentals-for-ecommerce',
      stage: 'Beginner',
      title: 'Web Fundamentals for E-Commerce',
      description: 'The HTML, CSS and JavaScript building blocks every online store relies on.',
      topics: [
        {
          slug: 'semantic-html-product-pages',
          title: 'Semantic HTML for Product Pages',
          minutes: 28,
          objectives: ['Structure product detail pages with semantic landmarks', 'Use HTML forms for search, filters and checkout fields', 'Apply schema.org microdata for rich product snippets'],
          sections: [
            { heading: 'Semantic structure for commerce', body: 'Product pages follow a predictable pattern: header with navigation, main content with product info, and footer. Using article, section, figure and aside elements communicates page structure to assistive tech and search engines. Every product card should nest inside an article with a clear heading hierarchy.' },
            { heading: 'Forms that convert', body: 'Search bars, filter panels, address fields and payment inputs all rely on form elements. Label every input, choose correct input types (email, tel, postal-code) for mobile keyboards, and group related fields with fieldset and legend. Proper form semantics directly improve conversion rates.' },
            { heading: 'Rich snippets with microdata', body: 'Schema.org Product markup tells Google your price, availability, rating and review count. Wrapping product data in itemtype and itemprop attributes earns rich snippets in search results, driving more qualified traffic. Always validate your markup against the schema.org specification.' }
          ],
          links: [
            { title: 'HTML documentation', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'Authoritative HTML element reference.' },
            { title: 'Schema.org Product markup', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/microdata', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Implementing product microdata for rich results.' },
            { title: 'Shopify Liquid templates', url: 'https://shopify.dev/docs/themes/liquid-reference', sourceName: 'Shopify Developer Documentation', resourceType: 'reference', relationship: 'Shopify template language for product pages.' }
          ],
          quiz: { prompt: 'Which element best wraps a standalone product description block?', options: ['<div class="product">', '<article>', '<span>', '<table>'], answerIndex: 1, explanation: '<article> signals a self-contained, independently meaningful piece of content — ideal for product descriptions.' }
        },
        {
          slug: 'responsive-product-layouts',
          title: 'Responsive Product Layouts',
          minutes: 27,
          objectives: ['Build fluid product grids that adapt to any screen', 'Implement image galleries with touch-friendly controls', 'Apply media queries for mobile checkout flows'],
          sections: [
            { heading: 'Fluid product grids', body: 'CSS Grid with auto-fill and minmax creates product grids that reflow from 1-column mobile to 4-column desktop with zero media queries. Gap replaces margin hacks and ensures consistent spacing. Each card maintains its aspect ratio using aspect-ratio or padding-bottom technique.' },
            { heading: 'Image galleries', body: 'Product images drive purchasing decisions. Use responsive images with srcset and sizes for bandwidth efficiency. Build swipeable galleries for mobile using CSS scroll-snap, and ensure thumbnails are large enough for touch targets (minimum 44x44px). Always include descriptive alt text.' },
            { heading: 'Mobile checkout optimization', body: 'Over 60% of e-commerce traffic is mobile. Checkout forms need appropriate input types for virtual keyboards, sufficient font sizes to prevent iOS zoom, and a single-column layout that eliminates horizontal scrolling. Sticky CTAs keep the purchase button always visible.' }
          ],
          links: [
            { title: 'Responsive images', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Implementing srcset and sizes for product images.' },
            { title: 'CSS Grid layout', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'Grid properties for responsive product catalogs.' },
            { title: 'WooCommerce block-based layout', url: 'https://woocommerce.com/document/woocommerce-blocks/', sourceName: 'WooCommerce Documentation', resourceType: 'documentation', relationship: 'WooCommerce block-based layout system.' }
          ],
          quiz: { prompt: 'Which CSS property creates a product grid that automatically adjusts columns based on available width?', options: ['display: flex with flex-wrap', 'grid-template-columns: repeat(4, 1fr)', 'grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))', 'float: left'], answerIndex: 2, explanation: 'repeat(auto-fill, minmax(...)) tells the browser to create as many columns as fit, each at least the minimum width, reflowing automatically.' }
        },
        {
          slug: 'javascript-interactivity',
          title: 'JavaScript Interactivity for Stores',
          minutes: 30,
          objectives: ['Implement dynamic product filters and search', 'Build quantity selectors and add-to-cart interactions', 'Handle image zoom and variant selection without page reloads'],
          sections: [
            { heading: 'Dynamic filtering', body: 'Product filtering should feel instant. Event delegation on the filter container handles checkbox changes from any number of filter options. Filter the product list in memory and toggle visibility with classList. Debounce search input to avoid layout thrash during rapid typing.' },
            { heading: 'Cart interactions', body: 'Quantity selectors, add-to-cart buttons and wishlist toggles need immediate visual feedback. Update the cart badge optimistically, animate the button state, and persist the cart in localStorage so items survive page reloads. For server-synced carts, send requests in the background.' },
            { heading: 'Product variant selection', body: 'Size, color and material selectors swap images, prices and availability without a full page reload. Store variant data as JSON in data attributes or a lightweight state object. Update the DOM selectively — re-rendering the entire gallery on every click wastes resources.' }
          ],
          links: [
            { title: 'JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Core JavaScript patterns used in store interactivity.' },
            { title: 'Event delegation', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Efficient event handling for dynamic product lists.' },
            { title: 'Shopify Storefront API', url: 'https://shopify.dev/docs/api/storefront', sourceName: 'Shopify Developer Documentation', resourceType: 'documentation', relationship: 'Headless commerce API for dynamic store experiences.' }
          ],
          quiz: { prompt: 'When filtering a 200-product list, the most performant approach is...', options: ['Reload the page with query parameters for each filter', 'Toggle visibility of matching items using classList in a single reflow', 'Remove and re-add all matching DOM nodes', 'Fetch filtered results from the server on every keystroke'], answerIndex: 1, explanation: 'Toggling a CSS class triggers one reflow batch and avoids DOM creation/destruction overhead.' }
        }
      ]
    },
    {
      slug: 'product-data-and-inventory',
      stage: 'Foundation',
      title: 'Product Data & Inventory',
      description: 'Modeling products, categories, inventory tracking and catalog management.',
      topics: [
        {
          slug: 'product-data-modeling',
          title: 'Product Data Modeling',
          minutes: 30,
          objectives: ['Design relational schemas for products, variants and categories', 'Normalize product attributes for flexible catalogs', 'Model pricing with currencies and discounts'],
          sections: [
            { heading: 'Core entities', body: 'A product catalog needs at minimum: products, variants (size/color combos), categories (hierarchical), and images. Products hold shared data (name, description); variants hold purchasable specifics (SKU, price, stock). This separation prevents data duplication when one shirt has ten color-size combinations.' },
            { heading: 'Flexible attributes', body: 'Not every product has the same properties. A shoe has size and sole type; a book has ISBN and page count. Model this with an EAV (Entity-Attribute-Value) pattern or a JSON column for arbitrary attributes. The tradeoff is query flexibility versus schema simplicity — pick based on how often you filter by custom attributes.' },
            { heading: 'Pricing complexity', body: 'Prices involve currency codes (ISO 4217), tax calculations, bulk discounts and sale prices. Store base prices as integers in the smallest currency unit (cents) to avoid floating-point errors. Calculate discounts at display time, never overwrite the base price.' }
          ],
          links: [
            { title: 'MySQL data types', url: 'https://dev.mysql.com/doc/refman/8.0/en/data-types.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Choosing appropriate column types for product data.' },
            { title: 'Shopify product data model', url: 'https://shopify.dev/docs/api/admin-rest/2023-10/resources/product', sourceName: 'Shopify Developer Documentation', resourceType: 'documentation', relationship: 'Reference architecture from a production commerce platform.' },
            { title: 'WooCommerce variable products', url: 'https://woocommerce.com/document/variable-product/', sourceName: 'WooCommerce Documentation', resourceType: 'documentation', relationship: 'How WooCommerce models products and variations.' }
          ],
          quiz: { prompt: 'A product has 3 sizes and 4 colors. How many variants should the database store?', options: ['1 row with a JSON blob', '3 rows (one per size)', '12 rows (one per size-color combination)', '7 rows (3 sizes + 4 colors)'], answerIndex: 2, explanation: 'Each purchasable combination needs its own row with its own SKU, price and stock level.' }
        },
        {
          slug: 'inventory-tracking',
          title: 'Inventory Tracking & Stock Management',
          minutes: 28,
          objectives: ['Implement stock tracking with reservation logic', 'Handle oversell prevention with database constraints', 'Build inventory alerts and low-stock notifications'],
          sections: [
            { heading: 'Stock as a reservation problem', body: 'Inventory is not just a count — it is a promise. When a customer adds an item to their cart, reserve stock temporarily so others cannot buy the same unit. Use database transactions with SELECT FOR UPDATE to lock stock rows during checkout, preventing two customers from purchasing the last item simultaneously.' },
            { heading: 'Preventing oversells', body: 'A CHECK constraint (stock >= 0) is the last line of defense, but application-level checks catch oversells before they reach the database. Combine optimistic locking (version columns) with transactional stock decrement. If the version has changed, retry or fail gracefully.' },
            { heading: 'Alerts and automation', body: 'Set configurable low-stock thresholds per product. When stock drops below the threshold, trigger notifications to the purchasing team. Integrate with supplier APIs for automatic reordering on high-volume items. Every alert needs a clear action path — an alert without a workflow is noise.' }
          ],
          links: [
            { title: 'MySQL transactions', url: 'https://dev.mysql.com/doc/refman/8.0/en/transaction-handling.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Transactional stock management with InnoDB.' },
            { title: 'SELECT FOR UPDATE', url: 'https://dev.mysql.com/doc/refman/8.0/en/select.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Row locking for inventory reservations.' },
            { title: 'Shopify inventory API', url: 'https://shopify.dev/docs/api/admin-rest/2023-10/resources/inventorylevel', sourceName: 'Shopify Developer Documentation', resourceType: 'documentation', relationship: 'Production inventory management patterns.' }
          ],
          quiz: { prompt: 'Two customers click Buy on the last unit simultaneously. What prevents overselling?', options: ['JavaScript alerts on the client', 'SELECT FOR UPDATE locking the stock row during each transaction', 'A setTimeout delay', 'Checking stock twice in the same request'], answerIndex: 1, explanation: 'Row-level locking with SELECT FOR UPDATE serializes concurrent transactions, so the second one sees the updated stock and fails or waits.' }
        },
        {
          slug: 'category-catalog-management',
          title: 'Categories, Search & Catalog Management',
          minutes: 27,
          objectives: ['Design hierarchical category structures', 'Implement product search with filtering and sorting', 'Build admin interfaces for catalog management'],
          sections: [
            { heading: 'Category hierarchies', body: 'Categories are typically a tree: Electronics > Laptops > Gaming. Store parent-child relationships with a parent_id foreign key (adjacency list) for simplicity, or use nested sets or closure tables for efficient ancestor queries. Most e-commerce platforms need only two or three levels deep.' },
            { heading: 'Search and filtering', body: 'Full-text search on product names and descriptions uses MySQL FULLTEXT indexes for basic needs. For faceted filtering (price range, brand, rating), combine WHERE clauses with GROUP BY to compute facet counts. Sorting by relevance, price or popularity requires different index strategies.' },
            { heading: 'Admin catalog workflow', body: 'Store managers need batch operations: import CSVs, bulk-update prices, toggle visibility. Build admin views that show product status at a glance (active, draft, out of stock). Every admin action should have a confirmation step and an undo path — accidental bulk deletes are catastrophic.' }
          ],
          links: [
            { title: 'MySQL full-text search', url: 'https://dev.mysql.com/doc/refman/8.0/en/fulltext-search.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Built-in product search capabilities.' },
            { title: 'WooCommerce product categories', url: 'https://woocommerce.com/document/product-categories/', sourceName: 'WooCommerce Documentation', resourceType: 'documentation', relationship: 'How WooCommerce manages category hierarchies.' },
            { title: 'Shopify collections', url: 'https://shopify.dev/docs/api/admin-rest/2023-10/resources/collection', sourceName: 'Shopify Developer Documentation', resourceType: 'documentation', relationship: 'Shopify dynamic and manual collection patterns.' }
          ],
          quiz: { prompt: 'For a catalog with 50,000 products, which approach best supports fast faceted filtering?', options: ['Load all products and filter in JavaScript', 'Precomputed facet counts with indexed SQL queries', 'Rebuild the category tree on every page load', 'Store everything in a single text file'], answerIndex: 1, explanation: 'Indexed SQL facet queries scale with the database engine; client-side filtering breaks down at catalog scale.' }
        }
      ]
    },
    {
      slug: 'carts-checkout-and-payments',
      stage: 'Intermediate',
      title: 'Carts, Checkout & Payments',
      description: 'Building the purchase flow from cart to order confirmation with secure payment processing.',
      topics: [
        {
          slug: 'shopping-cart-implementation',
          title: 'Shopping Cart Implementation',
          minutes: 30,
          objectives: ['Design persistent cart state across sessions', 'Handle cart merging for guest-to-authenticated transitions', 'Implement real-time price recalculation and tax estimation'],
          sections: [
            { heading: 'Cart persistence strategy', body: 'Guest carts live in localStorage or a database row keyed by a session token. Authenticated carts belong to the user. When a guest logs in, merge both carts — summing quantities for duplicates, keeping the higher price if there is a conflict. Cart data must include product references, selected variants and quantity at time of addition.' },
            { heading: 'Real-time recalculation', body: 'Every cart change triggers a recalculation: subtotal, shipping estimate, applicable discounts, tax and total. Perform this server-side to prevent client manipulation of prices. Display a mini-breakdown so the customer understands each line before reaching checkout. Cache the last calculation to avoid recomputation on every hover.' },
            { heading: 'Cart edge cases', body: 'Products go out of stock, prices change, variants get discontinued. On every cart page load, validate every line item: flag unavailable items, update prices with a clear "price updated" notice, and prevent checkout until issues are resolved. Silent price changes destroy trust.' }
          ],
          links: [
            { title: 'Shopify Cart API', url: 'https://shopify.dev/docs/api/storefront/2023-10/objects/Cart', sourceName: 'Shopify Developer Documentation', resourceType: 'documentation', relationship: 'Production cart API design reference.' },
            { title: 'WooCommerce cart handling', url: 'https://woocommerce.com/document/cart-and-checkout-blocks/', sourceName: 'WooCommerce Documentation', resourceType: 'documentation', relationship: 'WooCommerce block-based cart architecture.' },
            { title: 'HTTP Cookies', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Cookie and session mechanisms that underpin cart persistence.' }
          ],
          quiz: { prompt: 'A guest adds items and then logs in. Their account already has items in the cart. What is the correct merge strategy?', options: ['Replace the guest cart entirely', 'Discard the account cart and keep only guest items', 'Merge by summing quantities for duplicates and keeping the highest price', 'Throw an error and force them to choose'], answerIndex: 2, explanation: 'Merging respects both sessions; summing quantities and keeping the higher price prevents unexpected charges.' }
        },
        {
          slug: 'checkout-flow',
          title: 'Checkout Flow & Order Processing',
          minutes: 30,
          objectives: ['Build a multi-step checkout with progress indication', 'Validate addresses against postal standards', 'Create order records with proper status transitions'],
          sections: [
            { heading: 'Step-by-step checkout', body: 'A checkout with clear steps (shipping address, shipping method, payment, review, confirm) reduces abandonment. Show progress with a visible stepper. Allow back-navigation without losing entered data. Persist each step so abandoned checkouts can be resumed within 24 hours.' },
            { heading: 'Address validation', body: 'Invalid addresses cause failed deliveries and chargebacks. Use address standardization APIs (USPS, Google Places) to validate and autocomplete addresses on entry. At minimum, flag unlikely combinations: PO boxes for express shipping, or mismatched country and postal code formats.' },
            { heading: 'Order creation', body: 'Placing an order is an atomic transaction: reserve inventory, create the order record, generate line items, calculate final totals with tax and shipping, and record the payment intent. If any step fails, roll back everything. Order status progresses through: pending, paid, processing, shipped, delivered (or refunded).' }
          ],
          links: [
            { title: 'Stripe Checkout Sessions', url: 'https://stripe.com/docs/payments/checkout', sourceName: 'Stripe Documentation', resourceType: 'documentation', relationship: 'Hosted checkout page implementation.' },
            { title: 'WooCommerce checkout flow', url: 'https://woocommerce.com/document/checkout-flow/', sourceName: 'WooCommerce Documentation', resourceType: 'documentation', relationship: 'WooCommerce checkout architecture and hooks.' },
            { title: 'Shopify checkout customization', url: 'https://shopify.dev/docs/themes/architecture/templates/checkout', sourceName: 'Shopify Developer Documentation', resourceType: 'documentation', relationship: 'Customizing the Shopify checkout experience.' }
          ],
          quiz: { prompt: 'Inventory reservation should happen...', options: ['Before the customer enters payment details', 'After payment succeeds', 'During the checkout page load', 'Only after order confirmation email'], answerIndex: 0, explanation: 'Reserving early prevents oversells during the payment process, with a timeout to release unused reservations.' }
        },
        {
          slug: 'stripe-payment-integration',
          title: 'Stripe Payment Integration',
          minutes: 29,
          objectives: ['Set up Stripe Checkout or Elements for secure payment capture', 'Handle webhooks for async payment events', 'Implement refunds, disputes and payment method management'],
          sections: [
            { heading: 'Secure payment flow', body: 'Never handle raw card numbers — use Stripe.js or Checkout to tokenize payment details on the client. Create a PaymentIntent server-side with the amount and currency, pass the client_secret to the frontend, and confirm the payment in the browser. PCI compliance is delegated to Stripe when you use their hosted components.' },
            { heading: 'Webhook processing', body: 'Payments complete asynchronously. Stripe sends webhooks for payment_intent.succeeded, charge.refunded, checkout.session.completed and more. Verify webhook signatures to prevent spoofing. Process each event idempotently — retries will arrive. Update your order database in response to each confirmed event.' },
            { heading: 'Refunds and disputes', body: 'Refunds are partial or full reversals initiated through the Stripe API or dashboard. For disputes (chargebacks), you need to submit evidence within the deadline. Build an internal refund workflow: who can authorize it, how it notifies the customer, and how it reconciles with accounting. Every refund should trace back to an order and a reason.' }
          ],
          links: [
            { title: 'Stripe PaymentIntents', url: 'https://stripe.com/docs/payments/payment-intents', sourceName: 'Stripe Documentation', resourceType: 'documentation', relationship: 'The core payment flow for accepting payments.' },
            { title: 'Stripe webhooks', url: 'https://stripe.com/docs/webhooks', sourceName: 'Stripe Documentation', resourceType: 'documentation', relationship: 'Handling asynchronous payment events.' },
            { title: 'Stripe refunds', url: 'https://stripe.com/docs/refunds', sourceName: 'Stripe Documentation', resourceType: 'documentation', relationship: 'Issuing and managing refunds programmatically.' }
          ],
          quiz: { prompt: 'Why must you never submit raw card numbers to your own server?', options: ['It is slower', 'It triggers PCI DSS scope and compliance burden', 'Stripe does not allow it', 'Browsers block it'], answerIndex: 1, explanation: 'Handling card data directly brings your server into PCI DSS scope, requiring expensive audits. Stripe.js tokenizes on the client so your server never sees card numbers.' }
        }
      ]
    },
    {
      slug: 'platforms-security-and-production',
      stage: 'Advanced',
      title: 'Platforms, Security & Production',
      description: 'Working within Shopify and WooCommerce ecosystems, hardening security and shipping to production.',
      topics: [
        {
          slug: 'shopify-platform-development',
          title: 'Shopify Platform Development',
          minutes: 30,
          objectives: ['Build custom Shopify themes with Liquid templating', 'Develop Shopify apps using the Admin and Storefront APIs', 'Use Shopify CLI and Hydrogen for headless commerce'],
          sections: [
            { heading: 'Liquid templating', body: 'Shopify themes are built with Liquid, a server-side template language. Objects like product, collection and cart expose store data. Tags control flow (for, if, unless) and filters transform output (money, date, image_tag). Master objects, tags and filters before customizing any theme.' },
            { heading: 'Shopify app architecture', body: 'Apps extend Shopify using the Admin API (for store management) and Storefront API (for customer-facing data). OAuth scopes define permissions; webhooks notify your server of events. Build apps with embedded iframes or standalone backends depending on the integration depth required.' },
            { heading: 'Hydrogen and headless', body: 'Hydrogen is Shopify\'s React-based framework for building custom storefronts. It provides hooks for cart, checkout and product data via the Storefront API. Use Hydrogen when merchants need a fully custom experience that goes beyond what theme customization can achieve.' }
          ],
          links: [
            { title: 'Shopify Liquid reference', url: 'https://shopify.dev/docs/themes/liquid-reference', sourceName: 'Shopify Developer Documentation', resourceType: 'reference', relationship: 'Complete Liquid syntax and objects reference.' },
            { title: 'Shopify Admin API', url: 'https://shopify.dev/docs/api/admin-rest/2023-10', sourceName: 'Shopify Developer Documentation', resourceType: 'documentation', relationship: 'REST API for store management operations.' },
            { title: 'Shopify Hydrogen', url: 'https://shopify.dev/docs/storefronts/headless/hydrogen', sourceName: 'Shopify Developer Documentation', resourceType: 'documentation', relationship: 'React framework for custom storefronts.' }
          ],
          quiz: { prompt: 'When should you choose Hydrogen over a traditional Shopify theme?', options: ['For every store regardless of needs', 'When the merchant needs a fully custom storefront beyond theme constraints', 'Only for stores selling digital products', 'When you want to avoid using the Storefront API'], answerIndex: 1, explanation: 'Hydrogen is for custom storefront experiences; traditional themes suffice for most standard commerce layouts.' }
        },
        {
          slug: 'woocommerce-customization',
          title: 'WooCommerce Plugin Development',
          minutes: 28,
          objectives: ['Extend WooCommerce with custom plugins and hooks', 'Customize product types, payment gateways and shipping methods', 'Integrate WooCommerce REST API for external services'],
          sections: [
            { heading: 'WordPress hooks system', body: 'WooCommerce is built on WordPress action and filter hooks. Actions fire at specific points (woocommerce_add_to_cart, woocommerce_order_status_changed) letting you run custom code. Filters modify data in transit (woocommerce_get_price_html). Understanding hooks is non-negotiable for any WooCommerce customization.' },
            { heading: 'Custom product types', body: 'Standard WooCommerce products cover simple, variable, grouped and virtual items. For domain-specific needs (bookable appointments, subscriptions, bundles), build custom product types by extending WC_Product. Register custom meta fields for data that does not fit standard attributes.' },
            { heading: 'WooCommerce REST API', body: 'The REST API exposes products, orders, customers and coupons as JSON endpoints. Use it to sync inventory with external systems, build mobile apps, or integrate with ERP platforms. Authenticate with consumer keys and secrets, and respect rate limits on high-traffic stores.' }
          ],
          links: [
            { title: 'WooCommerce hooks reference', url: 'https://woocommerce.com/document/hooks/', sourceName: 'WooCommerce Documentation', resourceType: 'reference', relationship: 'Complete list of WooCommerce action and filter hooks.' },
            { title: 'WooCommerce REST API', url: 'https://woocommerce.github.io/woocommerce-rest-api-docs/', sourceName: 'WooCommerce Documentation', resourceType: 'documentation', relationship: 'API endpoints for external integrations.' },
            { title: 'WooCommerce plugin development', url: 'https://woocommerce.com/document/developing-a-woocommerce-extension/', sourceName: 'WooCommerce Documentation', resourceType: 'guide', relationship: 'Guide to building WooCommerce extensions.' }
          ],
          quiz: { prompt: 'To modify how a product price is displayed in the catalog, which hook should you use?', options: ['woocommerce_before_shop_loop_item', 'woocommerce_get_price_html', 'woocommerce_single_product_summary', 'init'], answerIndex: 1, explanation: 'The woocommerce_get_price_html filter lets you modify the HTML output of product prices at the point it is rendered.' }
        },
        {
          slug: 'ecommerce-security',
          title: 'E-Commerce Security Hardening',
          minutes: 29,
          objectives: ['Protect against OWASP Top 10 vulnerabilities', 'Implement PCI DSS compliance best practices', 'Secure authentication, sessions and API endpoints'],
          sections: [
            { heading: 'OWASP Top 10 for e-commerce', body: 'E-commerce sites are high-value targets. Cross-site scripting (XSS) can steal session tokens; SQL injection can dump customer databases; broken access control lets users view others orders. Sanitize all inputs, parameterize database queries, and enforce authorization checks on every endpoint. Never trust client-side validation alone.' },
            { heading: 'PCI DSS awareness', body: 'If you process, store or transmit card data, PCI DSS applies. The simplest path: never touch card data yourself — use Stripe Checkout or Shopify Payments to delegate PCI scope. If you must handle card data (rare), segregate the card-handling system and comply with all 12 PCI requirements.' },
            { heading: 'Session and auth security', body: 'Use HttpOnly, Secure, SameSite cookies for session tokens. Implement CSRF protection with tokens on state-changing requests. Rate-limit login attempts. Hash passwords with bcrypt or argon2 — never MD5 or SHA1. Enforce HTTPS everywhere. These are baseline defenses, not nice-to-haves.' }
          ],
          links: [
            { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', sourceName: 'OWASP', resourceType: 'reference', relationship: 'The ten most critical web application security risks.' },
            { title: 'OWASP e-commerce security', url: 'https://owasp.org/www-project-application-security-verification-standard/', sourceName: 'OWASP', resourceType: 'guide', relationship: 'Application security verification standards.' },
            { title: 'Stripe security best practices', url: 'https://stripe.com/docs/security/guide', sourceName: 'Stripe Documentation', resourceType: 'guide', relationship: 'Security practices for Stripe integration.' }
          ],
          quiz: { prompt: 'The single most effective way to reduce PCI compliance burden for an e-commerce site is...', options: ['Encrypt the entire database', 'Never handle raw card data — delegate to Stripe Checkout or Shopify Payments', 'Add a web application firewall', 'Use HTTPS only on the checkout page'], answerIndex: 1, explanation: 'If your server never touches card numbers, your PCI scope shrinks dramatically. Tokenization via hosted payment flows is the industry standard.' }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Complete E-Commerce Feature Build',
    coverage: ['Product data modeling', 'Cart and checkout flow', 'Stripe payment integration', 'Security best practices', 'Platform integration'],
    brief:
      'Design and implement the complete purchase flow for a new product category on an existing e-commerce platform. Build the product listing page, detail page with variant selection, shopping cart, multi-step checkout, and Stripe payment integration. Include inventory tracking, order confirmation and proper error handling throughout.',
    requirements: [
      'Product data schema with variants, pricing and inventory',
      'Responsive product listing with filtering and sorting',
      'Shopping cart with quantity management and price recalculation',
      'Multi-step checkout with address validation and shipping selection',
      'Stripe PaymentIntent flow with webhook confirmation',
      'Security measures: input sanitization, CSRF protection, HTTPS enforcement'
    ],
    expectedOutput:
      'A technical design document with schema diagrams, API flow charts, and implementation pseudocode covering every checkout stage from product browse to order confirmation.',
    rubric: [
      { skill: 'Data modeling', weight: 20, criteria: 'Normalized product/variant schema with proper types and constraints' },
      { skill: 'Cart & checkout', weight: 25, criteria: 'Complete flow with edge case handling (stock changes, price updates, abandoned carts)' },
      { skill: 'Payment integration', weight: 25, criteria: 'Correct PaymentIntent lifecycle, webhook verification, and idempotent processing' },
      { skill: 'Security', weight: 15, criteria: 'OWASP awareness, PCI delegation, session management, input validation' },
      { skill: 'Code quality', weight: 15, criteria: 'Clear structure, meaningful naming, error handling, and documentation' }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'Product Catalog Schema and Admin Interface',
      stage: 'Foundation',
      objective: 'Design a normalized product database schema and document the admin workflow for catalog management.',
      requirements: ['ER diagram with products, variants, categories and images', 'Pricing model supporting currencies and discounts', 'CSV import workflow specification', 'Search and faceted filtering query plan'],
      skillsEvaluated: ['Database Design', 'SQL', 'Data Modeling', 'Catalog Management'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: { instructions: 'Submit your ER diagram, schema DDL, and catalog management workflow description with sample queries.', textLabel: 'Catalog schema and workflow', minTextLength: 900 }
    },
    {
      title: 'Stripe Checkout Integration',
      stage: 'Intermediate',
      objective: 'Implement a complete Stripe payment flow with PaymentIntents, webhooks and refund handling.',
      requirements: ['PaymentIntent creation and client-side confirmation', 'Webhook endpoint with signature verification', 'Idempotent event processing', 'Refund API integration with order reconciliation', 'Error handling for all payment states'],
      skillsEvaluated: ['Stripe API', 'Webhooks', 'Node.js', 'Security'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: { instructions: 'Describe the payment flow architecture, webhook handling strategy and refund workflow; include key code excerpts.', textLabel: 'Payment integration notes', minTextLength: 1100 }
    },
    {
      title: 'Security Audit and Remediation Plan',
      stage: 'Advanced',
      objective: 'Audit a simulated e-commerce application for OWASP Top 10 vulnerabilities and produce a prioritized remediation plan.',
      requirements: ['Identify XSS, SQL injection and broken access control risks', 'Evaluate session management and CSRF protections', 'Assess PCI compliance posture', 'Prioritize fixes by severity and effort', 'Define verification testing for each fix'],
      skillsEvaluated: ['Application Security', 'OWASP', 'PCI DSS Awareness', 'Risk Assessment'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: { instructions: 'Submit the security audit report with a prioritized vulnerability table, remediation steps and test plan.', textLabel: 'Security audit report', minTextLength: 1000, linkLabels: ['OWASP resources referenced'] }
    }
  ],

  simTasks: [
    {
      title: 'Cart race condition under high traffic',
      context: 'During a flash sale, customers report purchasing items that were shown as in-stock but arrived as backordered. Inventory reservations are not being enforced correctly.',
      requirements: ['Identify the race condition in stock reservation', 'Propose a fix using database transactions and locking', 'Specify timeout and cleanup for abandoned reservations', 'List regression tests for concurrent purchase scenarios'],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Bug-fix analysis with cause, solution, and test checklist for concurrent inventory management.',
      skills: ['Database Transactions', 'Concurrency', 'Debugging']
    },
    {
      title: 'Shopify custom product page',
      context: 'A merchant needs a custom product page with a 3D product configurator, real-time price updates based on selected options, and add-to-cart via the Storefront API.',
      requirements: ['Liquid template structure with JavaScript enhancement', 'Storefront API Cart mutation integration', 'Price recalculation on variant change', 'Accessibility for the custom configurator controls'],
      priority: 'high',
      dueDayOffset: 4,
      expectedOutput: 'Implementation plan covering template, API integration and accessibility.',
      skills: ['Shopify Liquid', 'Storefront API', 'JavaScript']
    },
    {
      title: 'Payment webhook reliability',
      context: 'Stripe webhook delivery logs show 15% of payment_intent.succeeded events failing with 500 errors. Orders are not being confirmed automatically.',
      requirements: ['Diagnose the webhook processing failure', 'Propose idempotent retry handling', 'Define a reconciliation process for missed webhooks', 'Suggest monitoring and alerting improvements'],
      priority: 'normal',
      dueDayOffset: 6,
      expectedOutput: 'Reliability improvement plan with architecture changes and monitoring strategy.',
      skills: ['Webhooks', 'Stripe', 'System Reliability']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Priya Kapoor',
      personaRole: 'Backend Engineer',
      situation: 'API contract mismatch discovered during checkout integration.',
      openingMessage:
        'The Stripe webhook endpoint is failing because your signature verification code expects a raw body but our middleware is parsing JSON first. The raw body is gone by the time the handler runs. Should I change the middleware or can you verify from the parsed payload?',
      expectedPoints: ['Explains why Stripe requires the raw body for signature verification', 'Proposes a solution (middleware bypass for /webhooks or separate raw-body route)', 'Flags that webhook retries will also fail until fixed', 'Agrees on a quick verification step before deploying the fix']
    },
    {
      kind: 'team',
      personaName: 'Marcus Chen',
      personaRole: 'QA Engineer',
      situation: 'Edge cases discovered in cart merge logic during testing.',
      openingMessage:
        'I found three issues with guest-to-authenticated cart merging: items that went out of stock between sessions are silently added, duplicate items with different variant selections create confusing rows, and the merge does not preserve gift-wrap selections. Can you walk me through the expected behavior?',
      expectedPoints: ['Acknowledges each edge case and describes correct behavior', 'Proposes stock validation during merge with user notification', 'Specifies deduplication strategy for conflicting variants', 'Documents gift-wrap persistence requirements']
    },
    {
      kind: 'client',
      personaName: 'Elena Vasquez',
      personaRole: 'Store Owner, Bloom & Branch',
      situation: 'Client reports abandoned checkout spike after recent update.',
      openingMessage:
        'Our checkout abandonment rate jumped from 35% to 62% after last week\'s update. Customers are emailing saying the payment step just spins and never completes. We are losing serious revenue every day. What happened and when will it be fixed?',
      expectedPoints: ['Asks for specific details to reproduce (device, browser, payment method)', 'Explains investigation steps in plain language without jargon', 'Sets realistic timeline for diagnosis before promising a fix', 'Offers interim workaround if possible (e.g., alternative payment method)']
    },
    {
      kind: 'client',
      personaName: 'James Okafor',
      personaRole: 'Operations Director, Urban Thread',
      situation: 'Client wants to launch a subscription product alongside standard products.',
      openingMessage:
        'We want to add a monthly subscription box to our existing store. It should handle recurring billing, allow customers to skip or pause months, and integrate with our current inventory. How feasible is this and what do you need from us?',
      expectedPoints: ['Clarifies subscription billing model (fixed, tiered, usage-based)', 'Explains integration with existing WooCommerce/Stripe setup', 'Identifies inventory and fulfillment implications', 'Proposes phased rollout approach with MVP scope']
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'Saturday morning: the live store is processing payments but orders table is empty. Stripe shows successful charges but nothing is being written to your database. Weekend traffic is at its peak.',
      requiredActions: [
        { action: 'Check webhook delivery logs and server error monitoring for the order creation endpoint', good: true, note: 'Diagnose before fixing — understand the scope and root cause.' },
        { action: 'Manually reconcile recent Stripe charges with orders using the Stripe dashboard', good: true, note: 'Protect revenue immediately while investigating.' },
        { action: 'Restart the webhook processor and verify new orders flow through', good: true, note: 'Restore service as the priority.' },
        { action: 'Send customer confirmation emails retroactively once orders are confirmed', good: true, note: 'Close the communication loop with affected customers.' },
        { action: 'Roll back the last deploy without investigating what changed', good: false, note: 'Rollback without diagnosis may not address the actual cause and could introduce new issues.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'Mid-sprint, the business team requests adding Apple Pay and Google Pay to the checkout. They say competitors already have it and conversion is suffering.',
      requiredActions: [
        { action: 'Assess whether Stripe already supports Apple Pay / Google Pay and what configuration is needed', good: true, note: 'Check existing capability before estimating effort.' },
        { action: 'Estimate the scope and communicate impact on current sprint commitments', good: true, note: 'Transparent trade-off communication prevents silent overload.' },
        { action: 'Identify testing requirements (device compatibility, payment flow verification)', good: true, note: 'Payment features require thorough cross-device testing.' },
        { action: 'Implement immediately without testing on real devices because the deadline is tight', good: false, note: 'Untested payment methods can cause failed transactions and lost revenue.' }
      ]
    }
  ],

  interviewQuestions: [
    { dimension: 'technical_knowledge', prompt: 'Explain the difference between a PaymentIntent and a Checkout Session in Stripe. When would you choose one over the other?', guidancePoints: ['PaymentIntent is the low-level primitive for custom UIs', 'Checkout Session is a hosted, turnkey page', 'Tradeoff: customization vs development speed and PCI scope', 'When embedded iframes vs redirect is appropriate'] },
    { dimension: 'technical_knowledge', prompt: 'How would you prevent double-charging a customer who clicks the Pay button twice?', guidancePoints: ['Client-side button disable during request', 'Server-side idempotency keys on PaymentIntent creation', 'Database unique constraints on order references', 'Webhook idempotency for event processing'] },
    { dimension: 'problem_solving', prompt: 'A customer claims they were charged but never received their order. Walk through your investigation.', guidancePoints: ['Check Stripe payment records for the charge', 'Verify order table for matching records', 'Check webhook logs for missed or failed events', 'Reconcile and communicate transparently with the customer'] },
    { dimension: 'problem_solving', prompt: 'Your WooCommerce store loads slowly with 10,000 products. How do you diagnose and improve performance?', guidancePoints: ['Profile database queries for N+1 and missing indexes', 'Evaluate page builder and plugin overhead', 'Implement object caching (Redis) and page caching', 'Consider pagination and lazy loading strategies'] },
    { dimension: 'professional_reasoning', prompt: 'The store owner wants to store credit card numbers "for faster checkout." How do you respond?', guidancePoints: ['Explain PCI DSS implications clearly', 'Offer tokenization via Stripe saved payment methods', 'Discuss security liability and compliance costs', 'Redirect toward customer-safe alternatives'] },
    { dimension: 'professional_reasoning', prompt: 'When would you recommend Shopify over a custom-built e-commerce solution?', guidancePoints: ['Speed to market and hosting managed by Shopify', 'Budget constraints favoring SaaS over custom development', 'When custom logic exceeds platform limitations', 'Team skill set and long-term maintenance capacity'] },
    { dimension: 'communication', prompt: 'Explain PCI DSS compliance to a store owner who is not technical.', guidancePoints: ['Use analogy (restaurant hygiene certificate) for context', 'Focus on what it means for their business, not technical details', 'Explain the cost of non-compliance', 'Clarify that using Stripe simplifies their requirements'] },
    { dimension: 'communication', prompt: 'Your team disagrees about building a custom checkout vs using Shopify Checkout. Present your recommendation.', guidancePoints: ['Acknowledge trade-offs of both approaches', 'Present evidence: conversion data, maintenance cost, time-to-market', 'Recommend based on business context, not personal preference', 'Propose a decision framework the team can align on'] }

  ]

}
