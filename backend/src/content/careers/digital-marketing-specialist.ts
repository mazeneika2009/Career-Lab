import type { CareerDef } from '../framework.js'

export const digitalMarketingSpecialist: CareerDef = {
  slug: 'digital-marketing-specialist',
  name: 'Digital Marketing Specialist',
  category: 'Business',
  order: 49,
  description:
    'Runs measurable campaigns — SEO, SEM, social, email and analytics across Google Ads, Analytics and Meta Blueprint.',
  difficulty: 'Beginner-friendly',
  pathSummary:
    'Marketing foundations & SEO basics → paid search with Google Ads → social advertising on Meta → analytics, email campaigns & integrated reporting.',
  mainSkills: [
    'Search Engine Optimization (SEO)',
    'Google Ads Campaign Management',
    'Meta Social Advertising',
    'Google Analytics Tracking & Reporting',
    'Email Marketing & Automation',
    'Content Strategy & Copywriting',
    'Conversion Rate Optimization',
    'Marketing Analytics & Attribution'
  ],
  sourcePlatforms: [
    'Google Skillshop',
    'Google Search Central',
    'Google Analytics',
    'Meta Blueprint',
    'HubSpot'
  ],
  companyName: 'Northwave Digital',
  roleTitle: 'Digital Marketing Specialist',

  chapters: [
    {
      slug: 'seo-foundations',
      stage: 'Beginner',
      title: 'SEO Foundations & Content Strategy',
      description: 'How search engines index, rank and reward pages — and the on-page and technical fundamentals that drive organic visibility.',
      topics: [
        {
          slug: 'how-search-engines-work',
          title: 'How Search Engines Work',
          minutes: 25,
          objectives: [
            'Explain crawling, indexing and ranking at a conceptual level',
            'Identify the key signals search engines use to rank pages',
            'Navigate Google Search Central to verify indexing status'
          ],
          sections: [
            { heading: 'Crawling and indexing', body: 'Search engines discover pages by following links from known URLs. Crawlers fetch HTML, discover additional links and add pages to a massive index. If a page is not crawled or is blocked by robots.txt or noindex directives, it will not appear in search results no matter how good the content is.' },
            { heading: 'Ranking signals', body: 'Relevance, authority and user experience are the three pillars of ranking. Relevance is determined by how well the page content matches a query through keywords and semantic understanding. Authority comes from backlinks from other reputable sites. User experience factors include page speed, mobile-friendliness and Core Web Vitals.' },
            { heading: 'Using Google Search Central', body: 'Google Search Central provides documentation, tools and best practices for improving a site\'s organic presence. The site covers everything from submitting sitemaps to understanding manual actions. Checking Search Console for crawl errors and indexing coverage is the first technical SEO step for any website.' }
          ],
          links: [
            { title: 'How Google Search works', url: 'https://developers.google.com/search/docs/fundamentals/how-search-works', sourceName: 'Google Search Central', resourceType: 'guide', relationship: 'Official overview of crawling, indexing and ranking by Google.' },
            { title: 'Search Console documentation', url: 'https://developers.google.com/search/docs', sourceName: 'Google Search Central', resourceType: 'documentation', relationship: 'Reference docs for Google Search Console tools and features.' },
            { title: 'SEO Starter Guide', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide', sourceName: 'Google Search Central', resourceType: 'guide', relationship: 'Google\'s own beginner guide to search engine optimization.' }
          ],
          quiz: {
            prompt: 'A page is well-written and has strong backlinks, but it cannot be found in Google Search results. What is the most likely cause?',
            options: [
              'The page is too long',
              'The page is blocked from indexing or was never crawled',
              'The page has too many keywords',
              'The page loads too slowly'
            ],
            answerIndex: 1,
            explanation: 'If a page is not indexed it will not appear in results regardless of quality. A noindex tag, robots.txt block or crawl error prevents search engines from including the page in their index.'
          }
        },
        {
          slug: 'on-page-seo',
          title: 'On-Page SEO Essentials',
          minutes: 28,
          objectives: [
            'Write optimized title tags, meta descriptions and heading hierarchies',
            'Structure URLs and internal links for both users and crawlers',
            'Optimize images with alt text, compression and descriptive filenames'
          ],
          sections: [
            { heading: 'Title tags and meta descriptions', body: 'The title tag is the single most influential on-page element — it appears in search results and browser tabs. Include the target keyword naturally near the beginning and keep it under 60 characters. Meta descriptions do not directly affect ranking but influence click-through rate by summarizing the page\'s value proposition.' },
            { heading: 'Heading hierarchy and URL structure', body: 'Use a single H1 per page with the primary keyword, then H2s and H3s to organize subtopics logically. URLs should be short, descriptive and include the primary keyword — avoid parameter-heavy strings. Internal linking distributes authority across your site and helps users and crawlers discover related content.' },
            { heading: 'Image optimization', body: 'Alt text describes images for search engines and screen readers, improving both SEO and accessibility. Compress images to reduce file size without visible quality loss, use modern formats like WebP, and name files descriptively (blue-running-shoes.webp rather than IMG_4832.jpg). Lazy loading prevents off-screen images from blocking initial page render.' }
          ],
          links: [
            { title: 'Google Search Central SEO docs', url: 'https://developers.google.com/search/docs', sourceName: 'Google Search Central', resourceType: 'documentation', relationship: 'Official SEO reference covering on-page best practices from Google.' },
            { title: 'Google Skillshop SEO fundamentals', url: 'https://skillshop.withgoogle.com/', sourceName: 'Google Skillshop', resourceType: 'course', relationship: 'Free Google Skillshop courses on search engine marketing and optimization.' },
            { title: 'HubSpot SEO training', url: 'https://academy.hubspot.com/courses/seo-training', sourceName: 'HubSpot', resourceType: 'course', relationship: 'HubSpot Academy\'s free SEO certification covering on-page and off-page tactics.' }
          ],
          quiz: {
            prompt: 'Which on-page element appears directly in Google search result snippets and most strongly influences click-through rate?',
            options: [
              'Alt text on images',
              'The title tag and meta description',
              'Internal anchor text',
              'Schema markup'
            ],
            answerIndex: 1,
            explanation: 'The title tag and meta description are the text users see in search results. A compelling, keyword-rich title and description pair is the most direct lever for improving organic click-through rate.'
          }
        },
        {
          slug: 'keyword-research',
          title: 'Keyword Research & Topic Planning',
          minutes: 30,
          objectives: [
            'Use free tools to discover search volume and competition for keywords',
            'Group keywords into topic clusters aligned to business goals',
            'Prioritize content creation based on intent and potential impact'
          ],
          sections: [
            { heading: 'Finding the right keywords', body: 'Keyword research starts with seed terms related to your product, audience questions and competitor pages. Google\'s autocomplete suggestions, "People also ask" boxes and related searches reveal real queries users make. Free tools like Google Keyword Planner and the Keyword Surfer extension provide volume and trend data without a paid subscription.' },
            { heading: 'Search intent classification', body: 'Every keyword has an intent — informational (learn), navigational (find a site), commercial (compare) or transactional (buy). Matching your content format to intent is critical: a comparison blog post will not rank for a transactional query. Classifying intent before writing saves hours of wasted content creation.' },
            { heading: 'Building topic clusters', body: 'A topic cluster is a pillar page covering a broad topic linked to multiple supporting pages targeting specific long-tail keywords. This structure signals topical authority to search engines and creates internal linking pathways that distribute page authority across the cluster. Plan clusters around business goals, not just volume.' }
          ],
          links: [
            { title: 'Google Keyword Planner', url: 'https://ads.google.com/home/tools/keyword-planner/', sourceName: 'Google Skillshop', resourceType: 'tool', relationship: 'Google\'s free keyword research tool for discovering volume and competition.' },
            { title: 'HubSpot topic cluster guide', url: 'https://blog.hubspot.com/marketing/topic-cluster-model', sourceName: 'HubSpot', resourceType: 'guide', relationship: 'HubSpot\'s guide to building topic clusters for SEO.' },
            { title: 'Google Search Central keyword docs', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide', sourceName: 'Google Search Central', resourceType: 'guide', relationship: 'Google\'s guidance on keyword usage and content relevance.' }
          ],
          quiz: {
            prompt: 'A user searches "best CRM software for small business." What is the search intent?',
            options: [
              'Informational',
              'Navigational',
              'Commercial investigation',
              'Transactional'
            ],
            answerIndex: 2,
            explanation: 'The word "best" signals the user is comparing options before deciding — a commercial investigation intent. They are not yet ready to buy (transactional) and are beyond just learning (informational).'
          }
        }
      ]
    },
    {
      slug: 'paid-advertising',
      stage: 'Foundation',
      title: 'Paid Search & Social Advertising',
      description: 'Building, launching and optimizing paid campaigns on Google Ads and Meta Ads Manager to drive measurable conversions.',
      topics: [
        {
          slug: 'google-ads-campaigns',
          title: 'Google Ads Search Campaigns',
          minutes: 30,
          objectives: [
            'Set up a Google Ads search campaign with proper structure',
            'Choose keyword match types and write effective ad copy',
            'Configure bidding strategies aligned to conversion goals'
          ],
          sections: [
            { heading: 'Campaign structure', body: 'A well-structured Google Ads account mirrors your business: account level holds settings, campaigns hold budgets and targeting, and ad groups hold related keywords and ads. Separating brand and non-brand campaigns, and organizing by product or service line, keeps budgets controllable and reporting clean.' },
            { heading: 'Keyword match types and ad copy', body: 'Broad match captures the widest net of queries, phrase match requires the phrase in order, and exact match restricts to the precise term or close variants. Ad copy should mirror the keyword\'s intent, include a clear value proposition and end with a specific call to action. Responsive search ads test multiple headline and description combinations automatically.' },
            { heading: 'Bidding and budget', body: 'Manual CPC gives full control, while Smart Bidding strategies like Maximize Conversions or Target CPA automate bids using machine learning. Start with manual to gather data, then switch to Smart Bidding once you have at least 30 conversions per month. Allocate budget toward campaigns with the strongest cost-per-acquisition and scale.' }
          ],
          links: [
            { title: 'Google Ads help center', url: 'https://support.google.com/google-ads/', sourceName: 'Google Skillshop', resourceType: 'documentation', relationship: 'Official Google Ads support documentation and how-to guides.' },
            { title: 'Google Skillshop Ads certification', url: 'https://skillshop.withgoogle.com/', sourceName: 'Google Skillshop', resourceType: 'course', relationship: 'Free certifications for Google Ads search, display, video and shopping.' },
            { title: 'Google Search Central for Ads', url: 'https://developers.google.com/search/docs', sourceName: 'Google Search Central', resourceType: 'reference', relationship: 'Search best practices that directly impact Quality Score in Ads.' }
          ],
          quiz: {
            prompt: 'You want to capture only the exact query "running shoes for flat feet." Which keyword match type is most appropriate?',
            options: [
              'Broad match: running shoes for flat feet',
              'Phrase match: "running shoes for flat feet"',
              'Exact match: [running shoes for flat feet]',
              'Negative match: -running shoes'
            ],
            answerIndex: 2,
            explanation: 'Exact match restricts your ad to the precise query or close variants, ensuring spend goes only to the most relevant searches and avoiding broad, low-intent traffic.'
          }
        },
        {
          slug: 'meta-ads-manager',
          title: 'Meta Ads Manager for Social Campaigns',
          minutes: 28,
          objectives: [
            'Create a Facebook and Instagram ad campaign in Ads Manager',
            'Define audience targeting using demographics, interests and custom audiences',
            'Choose ad formats optimized for the campaign objective'
          ],
          sections: [
            { heading: 'Campaign objectives and structure', body: 'Meta Ads Manager organizes campaigns by objective — Awareness, Traffic, Engagement, Leads, Sales and App promotion. The objective determines which optimization and bidding options are available. Within each campaign, ad sets define the audience, budget and placement, while ads hold the creative — images, videos and copy.' },
            { heading: 'Audience targeting', body: 'Core audiences are defined by demographics, interests and behaviors. Custom audiences retarget people who have visited your site, used your app or engaged with your content. Lookalike audiences find new people who resemble your best customers. Layering these audiences creates precise targeting while broad enough to scale.' },
            { heading: 'Ad formats and creative best practices', body: 'Image ads are the simplest format; video ads drive higher engagement and are prioritized in feeds. Carousel ads showcase multiple products or a story sequence. Collection ads create an immersive mobile storefront. Vertical video (9:16) is critical for Reels and Stories placements. Every ad needs a clear visual hook in the first three seconds.' }
          ],
          links: [
            { title: 'Meta Blueprint courses', url: 'https://www.facebook.com/business/learn', sourceName: 'Meta Blueprint', resourceType: 'course', relationship: 'Free courses on Facebook and Instagram advertising from Meta.' },
            { title: 'Meta Ads Manager guide', url: 'https://www.facebook.com/business/help/341410018264108', sourceName: 'Meta Blueprint', resourceType: 'guide', relationship: 'Official walkthrough of creating and managing campaigns in Ads Manager.' },
            { title: 'HubSpot social media marketing', url: 'https://academy.hubspot.com/courses/inbound-social-media', sourceName: 'HubSpot', resourceType: 'course', relationship: 'HubSpot Academy\'s social media marketing certification covering ad strategy.' }
          ],
          quiz: {
            prompt: 'You want to reach people who have previously visited your website and show them a product they viewed. Which audience type should you create?',
            options: [
              'A lookalike audience',
              'A core audience based on interests',
              'A custom audience from website traffic',
              'A saved audience from page followers'
            ],
            answerIndex: 2,
            explanation: 'Custom audiences built from website visitors (via the Meta Pixel) allow you to retarget people who already showed interest, making them the highest-intent audience for dynamic product ads.'
          }
        },
        {
          slug: 'landing-page-optimization',
          title: 'Landing Pages & Conversion Rate Optimization',
          minutes: 25,
          objectives: [
            'Design landing pages aligned to ad message and user intent',
            'Use A/B testing to improve conversion rates systematically',
            'Track conversions accurately with UTM parameters and pixels'
          ],
          sections: [
            { heading: 'Message match and page design', body: 'A landing page must deliver on the promise of the ad that sent the visitor there. The headline, imagery and CTA should mirror the ad copy — a mismatch causes immediate bounces. Keep the page focused on a single conversion goal, remove navigation distractions, and load in under three seconds on mobile.' },
            { heading: 'A/B testing methodology', body: 'Change one element at a time — headline, CTA button, hero image or form length — and run the test until you reach statistical significance. Tools like Google Optimize (or built-in platform testing) split traffic between variants. Document every test, its hypothesis and result, to build institutional knowledge over time.' },
            { heading: 'Conversion tracking setup', body: 'UTM parameters append campaign metadata to URLs so Google Analytics attributes traffic correctly. The Meta Pixel and Google Ads tag fire conversion events when users complete desired actions. Verify tracking by completing a test conversion and confirming the data appears in the platform before launching spend.' }
          ],
          links: [
            { title: 'Google Analytics conversion tracking', url: 'https://analytics.google.com/analytics/academy/', sourceName: 'Google Analytics', resourceType: 'course', relationship: 'Google Analytics Academy course on setting up goals and conversion tracking.' },
            { title: 'HubSpot landing page guide', url: 'https://academy.hubspot.com/courses/inbound-landing-pages', sourceName: 'HubSpot', resourceType: 'course', relationship: 'HubSpot Academy course on building and optimizing landing pages.' },
            { title: 'Meta Pixel implementation', url: 'https://www.facebook.com/business/help/952192354843755', sourceName: 'Meta Blueprint', resourceType: 'guide', relationship: 'Official guide to installing and verifying the Meta Pixel for conversion tracking.' }
          ],
          quiz: {
            prompt: 'Your ad promises "50% off summer shoes" but the landing page leads with "New arrivals" and no mention of the discount. What is the most likely result?',
            options: [
              'Higher conversions due to the surprise variety',
              'A high bounce rate from message mismatch',
              'Improved SEO from richer content',
              'Better brand recognition'
            ],
            answerIndex: 1,
            explanation: 'When the landing page does not match the ad promise, visitors feel misled and leave immediately. Message match is the single most important landing page principle for paid campaign performance.'
          }
        }
      ]
    },
    {
      slug: 'analytics-reporting',
      stage: 'Intermediate',
      title: 'Google Analytics & Marketing Measurement',
      description: 'Configuring GA4 properties, building reports that answer business questions and attributing campaign value across channels.',
      topics: [
        {
          slug: 'ga4-setup',
          title: 'Google Analytics 4 Property Setup',
          minutes: 30,
          objectives: [
            'Install the GA4 data stream and verify data collection',
            'Configure events, conversions and custom dimensions',
            'Navigate the Explorations interface for ad-hoc analysis'
          ],
          sections: [
            { heading: 'Data streams and data collection', body: 'GA4 uses data streams instead of views. Create separate streams for web, iOS and Android, then install the GA4 tag via Google Tag Manager or directly in the page source. Real-time reports confirm the tag is firing. Enable Google Signals for cross-device reporting if your audience opts in.' },
            { heading: 'Events and conversions', body: 'GA4 is event-based — every interaction is an event. Automatically collected events like page_view and session_start fire without configuration. Mark key events like purchase, sign_up or generate_lead as conversions to make them the focal point of reports and bidding. Custom events capture business-specific actions not covered by defaults.' },
            { heading: 'Explorations for ad-hoc analysis', body: 'The Explorations interface provides free-form, funnel, path and cohort analysis beyond the standard reports. Build a funnel exploration to see where users drop off during checkout, or a path exploration to understand the most common navigation sequences. These insights drive both UX improvements and campaign targeting decisions.' }
          ],
          links: [
            { title: 'Google Analytics documentation', url: 'https://support.google.com/analytics/answer/9304153', sourceName: 'Google Analytics', resourceType: 'documentation', relationship: 'Official Google Analytics 4 help and reference documentation.' },
            { title: 'Google Analytics Academy', url: 'https://analytics.google.com/analytics/academy/', sourceName: 'Google Analytics', resourceType: 'course', relationship: 'Free courses covering GA4 setup, reporting and analysis.' },
            { title: 'Google Tag Manager basics', url: 'https://tagmanager.google.com/', sourceName: 'Google Analytics', resourceType: 'tool', relationship: 'Google Tag Manager for deploying and managing analytics tags without code changes.' }
          ],
          quiz: {
            prompt: 'In GA4, which of these must you manually mark as a conversion for it to appear in conversion reports?',
            options: [
              'page_view',
              'session_start',
              'generate_lead',
              'first_visit'
            ],
            answerIndex: 2,
            explanation: 'generate_lead is a key event that GA4 collects but does not automatically count as a conversion. You must toggle it as a conversion in the admin settings for it to appear in conversion-focused reports and dashboards.'
          }
        },
        {
          slug: 'utm-attribution',
          title: 'UTM Parameters & Attribution Models',
          minutes: 28,
          objectives: [
            'Build UTM-tagged URLs that correctly attribute campaign traffic',
            'Compare last-click, first-click and data-driven attribution models',
            'Use multi-touch attribution to allocate budget across channels'
          ],
          sections: [
            { heading: 'UTM tagging conventions', body: 'UTM parameters — utm_source, utm_medium, utm_campaign, utm_term and utm_content — append metadata to URLs so Analytics can attribute sessions to specific campaigns. Consistent naming conventions (lowercase, underscores not spaces, no special characters) prevent data fragmentation where the same campaign appears as multiple entries.' },
            { heading: 'Understanding attribution models', body: 'Last-click attribution gives all credit to the final touchpoint before conversion, undervaluing upper-funnel channels like display and social. First-click gives all credit to the first interaction. Data-driven attribution uses machine learning to assign fractional credit based on each touchpoint\'s actual influence on the conversion probability.' },
            { heading: 'Multi-channel budget allocation', body: 'Reporting in GA4\'s Advertising section reveals assisted conversions — channels that appear early or middle in the journey but do not get last-click credit. If email and social consistently assist but are undervalued by last-click, shifting budget toward them based on multi-touch data often improves overall ROAS.' }
          ],
          links: [
            { title: 'UTM Builder and best practices', url: 'https://ga-dev-tools.web.app/campaign-url-builder/', sourceName: 'Google Analytics', resourceType: 'tool', relationship: 'Google\'s free UTM campaign URL builder tool.' },
            { title: 'Google Analytics attribution docs', url: 'https://support.google.com/analytics/answer/11213790', sourceName: 'Google Analytics', resourceType: 'documentation', relationship: 'Official documentation on GA4 attribution models and comparison.' },
            { title: 'HubSpot UTM tracking guide', url: 'https://blog.hubspot.com/marketing/utm-tracking-what-you-need-to-know', sourceName: 'HubSpot', resourceType: 'guide', relationship: 'HubSpot\'s practical guide to UTM parameters and campaign tracking.' }
          ],
          quiz: {
            prompt: 'A user clicks a Google Ads ad, later returns via an email link and then converts. Under last-click attribution, which channel gets credit?',
            options: [
              'Google Ads',
              'Email',
              'Organic search',
              'Direct'
            ],
            answerIndex: 1,
            explanation: 'Last-click attribution assigns 100% of the credit to the final touchpoint before conversion. In this case, the email click was the last interaction, so email receives full credit even though Google Ads initiated the journey.'
          }
        },
        {
          slug: 'reporting-dashboards',
          title: 'Building Marketing Reports & Dashboards',
          minutes: 30,
          objectives: [
            'Create automated reports in GA4 and Looker Studio',
            'Design dashboards that align metrics to campaign objectives',
            'Present campaign performance to non-technical stakeholders'
          ],
          sections: [
            { heading: 'Automated reporting in GA4', body: 'GA4\'s Report Library lets you create custom reports with specific dimensions, metrics and filters. Schedule email deliveries so stakeholders receive weekly performance snapshots without logging in. Shared reports and Explorations keep the entire team aligned on the same numbers.' },
            { heading: 'Looker Studio dashboards', body: 'Looker Studio connects to GA4, Google Ads, Sheets and dozens of other data sources to build live, interactive dashboards. Use scorecards for headline KPIs, time series for trends and tables for drill-down. Calculated fields let you build custom metrics like cost-per-lead or ROAS without exporting data.' },
            { heading: 'Reporting for stakeholders', body: 'Executives want to know what happened, why it happened and what to do next — not which GA4 screen to click. Lead with a summary of performance against goals, highlight the two or three drivers behind the numbers, and end with a clear next action. Use plain language and label every chart so the dashboard is self-explanatory.' }
          ],
          links: [
            { title: 'Looker Studio documentation', url: 'https://lookerstudio.google.com/', sourceName: 'Google Analytics', resourceType: 'tool', relationship: 'Google Looker Studio for building free, shareable marketing dashboards.' },
            { title: 'GA4 custom reports guide', url: 'https://support.google.com/analytics/answer/9143382', sourceName: 'Google Analytics', resourceType: 'guide', relationship: 'Official guide to creating and customizing reports in GA4.' },
            { title: 'HubSpot reporting certification', url: 'https://academy.hubspot.com/courses/reporting', sourceName: 'HubSpot', resourceType: 'course', relationship: 'HubSpot Academy certification on building data-driven marketing reports.' }
          ],
          quiz: {
            prompt: 'Your Looker Studio dashboard shows sessions and bounce rate rising together over three weeks. What is the most actionable interpretation?',
            options: [
              'The campaign is working perfectly because traffic increased',
              'Traffic quality may have declined — investigate source, landing pages and intent alignment',
              'Bounce rate does not matter when sessions are up',
              'You should immediately pause all campaigns'
            ],
            answerIndex: 1,
            explanation: 'Rising sessions with rising bounce rate often signals lower-quality traffic — clicks from less relevant audiences or misaligned ad-to-landing-page messaging. Investigating the source mix and landing page performance is the next step before making budget changes.'
          }
        }
      ]
    },
    {
      slug: 'email-social-advanced',
      stage: 'Advanced',
      title: 'Email Marketing, Automation & Integrated Strategy',
      description: 'Designing automated email journeys, building cross-channel campaign plans and optimizing full-funnel performance with advanced analytics.',
      topics: [
        {
          slug: 'email-marketing-automation',
          title: 'Email Campaign Design & Automation',
          minutes: 30,
          objectives: [
            'Build automated email sequences triggered by user actions',
            'Write subject lines and copy that maximize open and click rates',
            'Segment audiences to deliver personalized, relevant content'
          ],
          sections: [
            { heading: 'Email sequence design', body: 'Automated sequences — welcome series, onboarding drips, abandoned cart and re-engagement flows — run continuously without manual effort. Each email in a sequence builds on the previous touchpoint, progressively deepening the relationship or nudging a specific action. Map the journey before writing copy so every message has a clear purpose.' },
            { heading: 'Subject lines and copy', body: 'The subject line determines whether the email gets opened. Short, specific, curiosity-driven lines outperform vague or clickbait approaches. Preview text extends the subject line and should complement it, not repeat it. Body copy should be scannable: short paragraphs, bolded key points and a single, unmissable call-to-action.' },
            { heading: 'Segmentation and personalization', body: 'Sending the same email to every subscriber guarantees low engagement. Segment by lifecycle stage, purchase history, engagement level or referral source. Personalization goes beyond first name — dynamically insert product recommendations, location-specific offers or content based on past behavior to make each email feel individually relevant.' }
          ],
          links: [
            { title: 'HubSpot email marketing course', url: 'https://academy.hubspot.com/courses/email-marketing', sourceName: 'HubSpot', resourceType: 'course', relationship: 'HubSpot Academy\'s comprehensive email marketing certification.' },
            { title: 'HubSpot email templates', url: 'https://www.hubspot.com/products/marketing/email', sourceName: 'HubSpot', resourceType: 'tool', relationship: 'HubSpot\'s drag-and-drop email builder and template library.' },
            { title: 'Google Analytics email tracking', url: 'https://analytics.google.com/analytics/academy/', sourceName: 'Google Analytics', resourceType: 'guide', relationship: 'Using GA4 to measure email campaign traffic and conversions.' }
          ],
          quiz: {
            prompt: 'Your welcome email sequence has a 45% open rate on the first email but only 8% on the third. What is the most effective fix?',
            options: [
              'Send the third email more frequently',
              'Send the same third email to all non-openers',
              'Review the subject line and content relevance of the third email and A/B test improvements',
              'Remove the third email and skip to the fourth'
            ],
            answerIndex: 2,
            explanation: 'A sharp drop-off at a specific email indicates a problem with that message — likely the subject line, timing or content mismatch. A/B testing subject lines and ensuring content delivers on the promise of the sequence is the most targeted fix.'
          }
        },
        {
          slug: 'cross-channel-strategy',
          title: 'Cross-Channel Campaign Planning',
          minutes: 28,
          objectives: [
            'Design integrated campaigns that coordinate SEO, paid, social and email',
            'Align messaging and timing across channels for maximum reach',
            'Set channel-specific KPIs that roll up to a unified business objective'
          ],
          sections: [
            { heading: 'Integrated campaign architecture', body: 'A cross-channel campaign begins with a single business objective and fans out into channel-specific tactics that reinforce each other. Organic content builds awareness and backlinks, paid ads amplify high-performing content to targeted audiences, email nurtures engaged leads and social sustains conversation. Each channel does what it does best while pointing to the same conversion.' },
            { heading: 'Message and timing coordination', body: 'Consistent messaging across channels prevents audience confusion and reinforces the campaign theme. Time launches so channels activate together — a blog post publishes, paid ads promote it within hours, social teases it the day before and email drives traffic the following week. A shared content calendar keeps teams aligned.' },
            { heading: 'Unified measurement', body: 'Each channel has its own native metrics — organic impressions, ad CTR, email open rate, social engagement — but the business cares about a unified outcome: leads, revenue or sign-ups. Use GA4 as the single source of truth and Looker Studio to combine channel data into one view. Attribute conversions using data-driven attribution so no channel is unfairly over- or under-valued.' }
          ],
          links: [
            { title: 'HubSpot inbound marketing methodology', url: 'https://academy.hubspot.com/courses/inbound', sourceName: 'HubSpot', resourceType: 'course', relationship: 'HubSpot\'s inbound marketing certification covering cross-channel strategy.' },
            { title: 'Google Ads cross-channel insights', url: 'https://analytics.google.com/analytics/academy/', sourceName: 'Google Analytics', resourceType: 'guide', relationship: 'Using GA4 to measure impact across paid and organic channels together.' },
            { title: 'Meta Blueprint cross-platform strategy', url: 'https://www.facebook.com/business/learn', sourceName: 'Meta Blueprint', resourceType: 'course', relationship: 'Meta courses on integrating social campaigns with broader marketing efforts.' }
          ],
          quiz: {
            prompt: 'You are planning a product launch across four channels. Which approach best ensures the campaign is integrated rather than four isolated efforts?',
            options: [
              'Run all four channels on the same day with identical ad copy',
              'Define a single objective, create a shared calendar, use consistent messaging and measure through GA4',
              'Let each channel team operate independently and compare results afterward',
              'Focus budget on the single channel with the lowest cost-per-click'
            ],
            answerIndex: 1,
            explanation: 'A true integrated campaign starts with shared objectives, coordinated timing, consistent messaging and unified measurement. This ensures channels amplify each other rather than competing for the same audience in isolation.'
          }
        },
        {
          slug: 'advanced-analytics-optimization',
          title: 'Advanced Analytics & Campaign Optimization',
          minutes: 30,
          objectives: [
            'Analyze funnel drop-offs and cohort retention to diagnose campaign weaknesses',
            'Run structured A/B and multivariate tests across landing pages and ads',
            'Build a continuous optimization loop using data, hypotheses and systematic iteration'
          ],
          sections: [
            { heading: 'Funnel and cohort analysis', body: 'A funnel report in GA4 shows exactly where users abandon a conversion path — from landing page to product view to checkout to purchase. Cohort analysis tracks how groups of users behave over time, revealing whether new customers from a campaign retain or churn. These analyses pinpoint whether the problem is acquisition quality, on-site experience or post-conversion nurture.' },
            { heading: 'Testing methodology', body: 'A/B tests compare two variants; multivariate tests compare multiple combinations simultaneously. Define a hypothesis before launching the test, calculate the required sample size for statistical significance and resist the urge to check results early. Document every test, its result and the decision made, building an optimization knowledge base over time.' },
            { heading: 'The optimization loop', body: 'Marketing optimization is cyclical: analyze current performance, form a hypothesis, implement a test, measure the result and apply the winner. The loop never ends because audiences, competitors and algorithms change continuously. Teams that formalize this loop — weekly performance reviews, monthly hypothesis generation and quarterly strategic audits — consistently outperform teams that optimize ad hoc.' }
          ],
          links: [
            { title: 'Google Analytics funnel exploration', url: 'https://support.google.com/analytics/answer/12481744', sourceName: 'Google Analytics', resourceType: 'guide', relationship: 'Official guide to building funnel exploration reports in GA4.' },
            { title: 'Google Skillshop optimization', url: 'https://skillshop.withgoogle.com/', sourceName: 'Google Skillshop', resourceType: 'course', relationship: 'Google Skillshop courses on optimizing Google Ads campaign performance.' },
            { title: 'HubSpot A/B testing guide', url: 'https://blog.hubspot.com/marketing/a-b-testing-tips', sourceName: 'HubSpot', resourceType: 'guide', relationship: 'HubSpot\'s practical guide to running effective A/B tests in marketing.' }
          ],
          quiz: {
            prompt: 'Your funnel report shows 10,000 visitors, 2,000 product views, 400 add-to-carts and 50 purchases. Where is the biggest drop-off and what should you investigate first?',
            options: [
              'Visitors to product views — investigate landing page relevance and site speed',
              'Add-to-cart to purchase — investigate checkout friction and payment issues',
              'Both drop-offs are equally concerning and should be tested simultaneously',
              'The numbers look normal for any e-commerce site'
            ],
            answerIndex: 0,
            explanation: 'The largest percentage drop-off is from visitors to product views (80% lost). This suggests the landing page may not be relevant to the traffic source or is too slow to engage. Fixing this top-of-funnel leak has the greatest potential impact on downstream conversions.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'End-to-End Digital Marketing Campaign',
    coverage: [
      'SEO Keyword Research & On-Page Optimization',
      'Google Ads Search Campaign Setup',
      'Meta Social Advertising Campaign',
      'Google Analytics 4 Configuration & Reporting',
      'Email Automation & Cross-Channel Measurement'
    ],
    brief:
      'Plan and launch a full-funnel digital marketing campaign for a fictional DTC skincare brand entering the UK market. You will research keywords and optimize a landing page, launch a Google Ads search campaign and a Meta awareness campaign, configure GA4 to track conversions, build an automated welcome email sequence and produce a cross-channel performance dashboard.',
    requirements: [
      'Complete keyword research for 10+ target terms and optimize a landing page with on-page SEO',
      'Build a Google Ads search campaign with at least two ad groups, appropriate match types and UTM-tagged URLs',
      'Create a Meta Ads campaign targeting a custom audience with at least two ad variants',
      'Configure GA4 with conversion events and verify tracking with a test conversion',
      'Design a 3-email automated welcome sequence with segmentation logic',
      'Build a Looker Studio dashboard combining data from GA4, Google Ads and email platform',
      'Write a campaign brief summarizing strategy, target audience, KPIs and expected outcomes'
    ],
    expectedOutput:
      'A fully planned and configured cross-channel campaign with a keyword-optimized landing page, two live ad campaigns with UTM tracking, GA4 conversion setup, an automated email sequence and a unified performance dashboard.',
    rubric: [
      { skill: 'SEO & Content', weight: 20, criteria: 'Well-researched keywords, proper on-page optimization and a landing page aligned to user intent' },
      { skill: 'Paid Campaign Setup', weight: 25, criteria: 'Correctly structured Google Ads and Meta campaigns with appropriate targeting, bidding and creative' },
      { skill: 'Analytics & Tracking', weight: 20, criteria: 'GA4 configured with verified conversions, UTM parameters consistent and tracking accurate' },
      { skill: 'Email & Automation', weight: 15, criteria: 'Well-structured email sequence with clear segmentation, compelling copy and logical triggers' },
      { skill: 'Reporting & Strategy', weight: 20, criteria: 'Unified dashboard, clear KPIs, actionable insights and a coherent cross-channel strategy narrative' }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'SEO Audit & On-Page Optimization',
      stage: 'Beginner',
      objective: 'Conduct a keyword research analysis and on-page SEO audit for a provided website, then implement optimizations and document the changes.',
      requirements: [
        'Research at least 10 target keywords using Google Keyword Planner or free alternatives',
        'Audit an existing page\'s title tags, meta descriptions, headings and image alt text',
        'Rewrite and optimize the page content to target the primary keyword cluster',
        'Document before and after metrics including page speed and keyword placement',
        'Write a summary explaining your keyword strategy and on-page changes'
      ],
      skillsEvaluated: ['Keyword Research', 'On-Page SEO', 'Content Optimization', 'Technical Awareness'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit your keyword research spreadsheet, a before-and-after comparison of the optimized page and a written summary of your SEO strategy and changes.',
        textLabel: 'SEO audit summary',
        minTextLength: 800,
        linkLabels: ['Keyword research spreadsheet', 'Optimized page URL']
      }
    },
    {
      title: 'Google Ads Campaign Build & Launch',
      stage: 'Intermediate',
      objective: 'Set up, launch and optimize a Google Ads search campaign for a provided business scenario with proper structure, tracking and initial performance data.',
      requirements: [
        'Build a campaign with at least two ad groups targeting different keyword themes',
        'Write responsive search ads with at least 15 headlines and 4 descriptions',
        'Configure conversion tracking and UTM parameters on all destination URLs',
        'Set an initial budget and bidding strategy appropriate to the campaign goal',
        'Document your campaign structure, keyword choices and launch checklist'
      ],
      skillsEvaluated: ['Google Ads', 'Campaign Structure', 'Ad Copy', 'Conversion Tracking'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit your Google Ads account export or screenshots, your ad copy document, a UTM tracking spreadsheet and a written campaign launch brief.',
        textLabel: 'Campaign launch brief',
        minTextLength: 1000,
        linkLabels: ['Ads account export', 'Ad copy document']
      }
    },
    {
      title: 'Cross-Channel Performance Dashboard',
      stage: 'Advanced',
      objective: 'Build an integrated marketing dashboard in Looker Studio that combines data from at least three channels and tells a coherent performance story.',
      requirements: [
        'Connect at least three data sources (e.g., GA4, Google Ads, email platform)',
        'Build scorecards for headline KPIs aligned to business objectives',
        'Include time-series charts showing trends over at least 8 weeks',
        'Add calculated fields for custom metrics like ROAS or cost-per-lead',
        'Write a narrative that interprets the dashboard data and recommends next actions'
      ],
      skillsEvaluated: ['Looker Studio', 'Multi-Channel Analytics', 'Data Visualization', 'Strategic Communication'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit your Looker Studio dashboard link, a PDF export of key views and a written performance narrative with strategic recommendations.',
        textLabel: 'Performance narrative',
        minTextLength: 1200,
        linkLabels: ['Looker Studio dashboard', 'PDF dashboard export']
      }
    }
  ],

  simTasks: [
    {
      title: 'Diagnose a sudden drop in conversion rate',
      context: 'Your Google Ads campaign conversion rate dropped from 4.2% to 1.1% over three days. Spend is unchanged but cost-per-acquisition has nearly quadrupled. The product team confirmed the checkout is working and the offer has not changed.',
      requirements: [
        'Check GA4 for changes in traffic source mix, device breakdown and landing page bounce rate',
        'Review Google Ads search terms report for irrelevant queries triggering ads',
        'Investigate whether a new competitor ad or SERP feature is cannibalizing clicks',
        'Propose a diagnostic report and three corrective actions with expected impact'
      ],
      priority: 'high',
      dueDayOffset: 3,
      expectedOutput: 'A root-cause analysis report identifying the most likely cause of the conversion drop and a prioritized action plan to recover performance.',
      skills: ['Google Ads', 'GA4 Analysis', 'Conversion Rate Optimization', 'Investigation']
    },
    {
      title: 'Plan a product launch campaign across channels',
      context: 'Northwave Digital\'s client is launching a new subscription meal kit service in six weeks. They have a $15,000 monthly budget and need a cross-channel plan covering organic, paid, email and social.',
      requirements: [
        'Define the target audience segments and the primary business objective',
        'Build a channel-by-channel plan with budget allocation and KPIs',
        'Design an email welcome sequence to convert subscribers into trial users',
        'Create a content calendar covering the pre-launch and launch phases',
        'Identify measurement dependencies and tracking requirements per channel'
      ],
      priority: 'high',
      dueDayOffset: 7,
      expectedOutput: 'A comprehensive cross-channel campaign plan document with audience strategy, channel tactics, email sequence design, content calendar and measurement framework.',
      skills: ['Campaign Planning', 'Cross-Channel Strategy', 'Email Marketing', 'Budget Management']
    },
    {
      title: 'Present campaign results to a non-technical stakeholder',
      context: 'The VP of Marketing at a client company asks you to explain in plain language why the paid social campaign they approved is delivering clicks but not conversions, and what to do next. They are not comfortable with marketing jargon.',
      requirements: [
        'Translate the campaign data into a clear, jargon-free narrative',
        'Use one or two simple visuals to illustrate the key finding',
        'Explain the difference between traffic quality and traffic volume',
        'Recommend a concrete next step with an expected outcome and timeline'
      ],
      priority: 'normal',
      dueDayOffset: 5,
      expectedOutput: 'A plain-language presentation or memo explaining the campaign performance, the root cause of the disconnect and a recommended next action.',
      skills: ['Stakeholder Communication', 'Data Storytelling', 'Campaign Analysis', 'Simplification']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Rachel Kim',
      personaRole: 'Content Marketing Manager',
      situation: 'You need to coordinate on how SEO content and paid search campaigns should support each other for a shared product launch.',
      openingMessage:
        'We are both working on the product launch but I am not sure how my blog content plan connects to your paid search strategy. Can we figure out how to align so we are not duplicating effort?',
      expectedPoints: [
        'Identifies which keywords are best targeted organically versus through paid ads',
        'Proposes a shared keyword map that assigns each target term to the most efficient channel',
        'Coordinates content publishing and campaign launch timing for maximum combined impact',
        'Agrees on shared KPIs and a reporting cadence so both teams track the same outcomes'
      ]
    },
    {
      kind: 'team',
      personaName: 'Marcus Obi',
      personaRole: 'Marketing Analyst',
      situation: 'You need to align on how to attribute conversions across organic, paid and email channels when the client\'s GA4 data shows conflicting model results.',
      openingMessage:
        'The client is asking why their Google Ads ROAS looks great in the Ads interface but drops by 40% in GA4 attribution. I need your help reconciling the numbers.',
      expectedPoints: [
        'Explains the difference between Ads-reported and GA4-attributed conversion models',
        'Identifies whether cross-channel cannibalization is inflating one channel\'s credit',
        'Proposes a unified attribution approach the client can understand and trust',
        'Suggests a dashboard view that shows each channel\'s contribution honestly'
      ]
    },
    {
      kind: 'client',
      personaName: 'Elena Vasquez',
      personaRole: 'Head of Marketing, Bloomwell Cosmetics',
      situation: 'The client\'s email open rates are falling quarter-over-quarter and they want to know whether email is still worth the investment.',
      openingMessage:
        'Our email open rates have dropped from 28% to 16% in two quarters. I am starting to wonder if we should just shift that budget to social ads. What do you think?',
      expectedPoints: [
        'Acknowledges the trend and validates the client\'s concern with data context',
        'Explains factors beyond content quality that affect open rates, including Apple Mail Privacy',
        'Recommends engagement metrics beyond open rate (clicks, conversions, revenue) to evaluate channel health',
        'Proposes a concrete improvement plan before recommending budget reallocation'
      ]
    },
    {
      kind: 'client',
      personaName: 'David Chen',
      personaRole: 'Founder, TechStart SaaS',
      situation: 'The client wants to launch Google Ads and Meta Ads simultaneously but has a limited budget and no prior paid advertising experience.',
      openingMessage:
        'I have $2,000 a month to spend on ads and I want to run Google and Facebook at the same time. Is that realistic, or should I pick one?',
      expectedPoints: [
        'Assesses the budget realistically against typical cost-per-click in their industry',
        'Recommends a phased approach: test one channel, learn, then expand',
        'Explains the trade-offs between reaching users actively searching (Google) versus building awareness (Meta)',
        'Sets clear expectations for what $2,000/month can realistically achieve and the metrics to watch'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'The Meta Pixel on a client\'s website stops firing correctly after a website update, causing all Facebook campaign conversion data to drop to zero overnight. The client\'s marketing team panics and wants to pause all spend immediately.',
      requiredActions: [
        { action: 'Verify the Pixel is actually broken using Meta Events Manager and the Pixel Helper extension', good: true, note: 'Confirm the problem before making reactive budget decisions.' },
        { action: 'Notify the client that conversion data is temporarily incomplete and recommend keeping campaigns running', good: true, note: 'Pausing spend during a tracking outage loses learning data and momentum unnecessarily.' },
        { action: 'Work with the web developer to reinstall the Pixel and test conversion events', good: true, note: 'Restoring accurate tracking is the first technical priority.' },
        { action: 'Pause all campaigns immediately to stop spending without conversion data', good: false, note: 'Stopping campaigns during a tracking outage wastes the learning phase and wastes already-invested spend.' }
      ]
    },
    {
      category: 'Process improvement',
      situation: 'The marketing team currently runs all campaigns without UTM parameters, making it impossible to attribute traffic accurately in GA4. Each team member uses their own naming conventions, creating inconsistent data across campaigns.',
      requiredActions: [
        { action: 'Propose a standardized UTM naming convention document with examples and a template', good: true, note: 'A shared standard eliminates inconsistency and makes cross-campaign comparison possible.' },
        { action: 'Build a UTM builder template in Google Sheets that enforces the naming convention', good: true, note: 'A practical tool removes friction and reduces human error in URL creation.' },
        { action: 'Train the team on the new convention and update existing campaign URLs retroactively', good: true, note: 'Adoption and backward consistency both matter for long-term data quality.' },
        { action: 'Continue using inconsistent UTMs because the data still appears in GA4', good: false, note: 'Inconsistent UTM naming fragments data into duplicate entries, making accurate attribution impossible.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between broad match, phrase match and exact match keywords in Google Ads. When would you use each?',
      guidancePoints: [
        'Broad match captures the widest range of related queries but can attract irrelevant traffic',
        'Phrase match requires the keyword phrase to appear in the query in order, with flexibility for surrounding words',
        'Exact match restricts to the precise query or close variants, offering the most control',
        'Use broad for discovery, phrase for balanced reach and exact for high-intent, proven converting terms'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'What is the Meta Pixel and why is it critical for running effective Facebook and Instagram ad campaigns?',
      guidancePoints: [
        'The Meta Pixel is a JavaScript snippet that tracks website events and sends them back to Meta',
        'It enables retargeting, custom audience building and conversion tracking',
        'Without the Pixel, you cannot optimize campaigns for conversions or measure ROAS accurately',
        'Pixel data also powers Lookalike audiences, finding new users who resemble your converters'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A client\'s Google Ads campaign has a high click-through rate but almost no conversions. Walk through how you would diagnose and fix the problem.',
      guidancePoints: [
        'High CTR with low conversions suggests the ad is attracting clicks but the landing page is not converting',
        'Check landing page relevance, load speed and whether the page delivers on the ad promise',
        'Review the search terms report for irrelevant queries wasting budget',
        'Consider whether the conversion tracking is correctly implemented before concluding it is a landing page issue'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'You are running both Google Ads and Meta Ads for the same product. How do you determine which channel deserves more budget?',
      guidancePoints: [
        'Compare cost-per-acquisition and ROAS across channels using GA4 data-driven attribution',
        'Consider the funnel stage each channel serves — Google captures intent, Meta builds awareness',
        'Look at assisted conversions to understand each channel\'s role in the full journey',
        'Run a controlled budget test by shifting spend between channels and measuring the impact on total conversions'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'A client insists on using vanity metrics like total impressions as the primary success metric for a lead generation campaign. How do you handle this?',
      guidancePoints: [
        'Acknowledge that impressions have value for awareness but are not sufficient for a lead gen objective',
        'Educate the client on lead-focused metrics like cost-per-lead, lead quality and conversion rate',
        'Propose a reporting structure that includes both awareness and lead metrics with clear rationale',
        'Tie the recommended metrics back to the business goal they stated at the start of the engagement'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'You discover that a client\'s competitor is bidding on their brand keywords, driving up their CPC. What strategy do you recommend?',
      guidancePoints: [
        'Run brand defense campaigns to protect branded search traffic at a typically low cost',
        'Ensure organic listings for brand terms are strong with sitelinks and structured data',
        'Evaluate whether the competitor\'s ads are actually siphoning conversions or just inflating awareness',
        'Consider bidding on the competitor\'s brand keywords as a counter-strategy if appropriate'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain the concept of cost-per-acquisition to a client who has never run digital advertising before.',
      guidancePoints: [
        'CPA is the total ad spend divided by the number of conversions (leads, sales or sign-ups)',
        'It answers the question: how much does it cost to acquire one customer through ads',
        'Lower CPA means the campaign is more efficient; compare it to the customer\'s lifetime value',
        'Use a simple concrete example like spending $500 to get 25 sign-ups equals $20 CPA'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Your client asks you to explain in one sentence why their organic traffic dropped 15% last month. What do you say?',
      guidancePoints: [
        'Identify the most likely driver: algorithm update, competitor gains, seasonal shift or technical issue',
        'State the cause and the affected pages or keywords concisely',
        'Connect the traffic drop to the business impact the client cares about',
        'Offer a specific next step to investigate and recover rather than leaving the question open'
      ]
    }

  ]

}
