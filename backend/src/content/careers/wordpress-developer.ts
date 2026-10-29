import type { CareerDef } from '../framework.js'

export const wordpressDeveloper: CareerDef = {
  slug: 'wordpress-developer',
  name: 'WordPress Developer',
  category: 'Development',
  order: 7,
  description:
    'Develops themes and plugins on WordPress with PHP, MySQL and modern frontend skills, keeping sites fast and secure.',
  difficulty: 'Beginner-friendly',
  pathSummary:
    'WordPress admin & content modeling → PHP fundamentals & the Loop → theme development with templates & hooks → plugin architecture & custom post types → REST API & headless patterns → performance, security & deployment.',
  mainSkills: ['WordPress', 'PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'REST API', 'Git & GitHub'],
  sourcePlatforms: ['WordPress Developer Resources', 'WordPress Documentation', 'PHP Documentation', 'MySQL Documentation', 'MDN Web Docs'],
  companyName: 'Canopy Digital',
  roleTitle: 'WordPress Developer',

  chapters: [
    {
      slug: 'wordpress-platform-core',
      stage: 'Beginner',
      title: 'WordPress Platform Core',
      description: 'Understanding the WordPress ecosystem, content modeling and the admin experience.',
      topics: [
        {
          slug: 'wordpress-overview-ecosystem',
          title: 'WordPress Overview & Ecosystem',
          minutes: 25,
          objectives: ['Explain the WordPress architecture and request lifecycle', 'Distinguish between WordPress.com and WordPress.org', 'Navigate the admin dashboard and understand its capabilities'],
          sections: [
            { heading: 'What WordPress actually is', body: 'WordPress is an open-source content management system built on PHP and MySQL. It handles user authentication, content storage, theme rendering and plugin extensibility through a well-defined hook system. Understanding this stack — PHP on the server, MySQL in the database, HTML/CSS/JS in the browser — sets the foundation for every development decision.' },
            { heading: 'The request lifecycle', body: 'When a visitor hits a WordPress URL, the system bootstraps wp-config.php for settings, loads wp-settings.php to register hooks and autoload core, then matches the URL to a query var, fetches content from MySQL, and passes it through the active theme\'s template hierarchy. This flow repeats on every page load and every hook fires at a predictable point, which is why understanding the lifecycle matters for performance and debugging.' },
            { heading: 'WordPress.com vs WordPress.org', body: 'WordPress.org provides the self-hosted software you install on your own server with full control over themes, plugins and code. WordPress.com is a hosted service built on that software but with managed hosting, curated plugins and restricted theme/plugin installation. Developers almost always work with the self-hosted version because client projects require full extensibility.' }
          ],
          links: [
            { title: 'Getting started with WordPress', url: 'https://learn.wordpress.org/', sourceName: 'WordPress Developer Resources', resourceType: 'course', relationship: 'Official learning pathways for WordPress newcomers.' },
            { title: 'WordPress.org documentation', url: 'https://developer.wordpress.org/', sourceName: 'WordPress Documentation', resourceType: 'documentation', relationship: 'Authoritative developer documentation for hooks, functions and APIs.' },
            { title: 'PHP: What is PHP?', url: 'https://www.php.net/manual/en/intro-whatis.php', sourceName: 'PHP Documentation', resourceType: 'reference', relationship: 'Understanding the server-side language underpinning WordPress.' }
          ],
          quiz: { prompt: 'WordPress stores content and settings in…', options: ['Flat files on disk', 'A MySQL database', 'A JSON configuration file', 'The filesystem via XML-RPC'], answerIndex: 1, explanation: 'WordPress uses MySQL (or MariaDB) as its primary data store for posts, options, user data and metadata via the wp_posts and wp_postmeta tables.' }
        },
        {
          slug: 'content-modeling-architecture',
          title: 'Content Modeling & Architecture',
          minutes: 28,
          objectives: ['Model content using posts, pages, categories and custom taxonomies', 'Understand the wp_posts and wp_postmeta schema', 'Choose the right content type for a given requirement'],
          sections: [
            { heading: 'Posts, pages and post types', body: 'WordPress ships with built-in post types — Posts for blog entries, Pages for static content, Attachments for media and Revisions. Every piece of content lives in the wp_posts table identified by a post_type column. Custom post types registered via register_post_type extend this model for portfolios, products, events or any structured content a project needs.' },
            { heading: 'Taxonomies and metadata', body: 'Categories and Tags organize posts hierarchically or freely. Custom taxonomies via register_taxonomy group any post type — product categories, event genres, document tags. Metadata stored in wp_postmeta as key-value pairs attaches arbitrary fields: dates, prices, repeating groups. Understanding when to use taxonomy vs meta vs custom table shapes your data architecture.' },
            { heading: 'Content modeling decisions', body: 'A real estate site might model Properties as a custom post type with Taxonomies for Location and Type, and meta fields for Price, Bedrooms and Square Footage. A news site keeps Posts but adds a custom taxonomy for Sections. Good modeling means queries stay fast, the admin stays intuitive, and the theme has clean data to render — resist the temptation to shove everything into a single post type with twenty meta fields.' }
          ],
          links: [
            { title: 'Custom Post Types', url: 'https://developer.wordpress.org/plugins/post-types/', sourceName: 'WordPress Documentation', resourceType: 'documentation', relationship: 'Registering and managing custom post types.' },
            { title: 'Custom Taxonomies', url: 'https://developer.wordpress.org/plugins/taxonomies/', sourceName: 'WordPress Documentation', resourceType: 'documentation', relationship: 'Organizing content with custom taxonomy registration.' },
            { title: 'Database schema overview', url: 'https://developer.wordpress.org/advanced-administration/wordpress-db/', sourceName: 'WordPress Documentation', resourceType: 'reference', relationship: 'Understanding the wp_posts and wp_postmeta table structure.' }
          ],
          quiz: { prompt: 'A client needs to organize events by city and genre. Best content model?', options: ['Custom post type with two custom taxonomies for City and Genre', 'Three separate post types for City, Genre and Event', 'Only categories and tags on standard Posts', 'A custom database table ignoring WordPress conventions'], answerIndex: 0, explanation: 'A single Event post type with City and Genre taxonomies keeps queries clean, admin filters useful and theme rendering straightforward.' }
        },
        {
          slug: 'wordpress-admin-development',
          title: 'WordPress Admin & Developer Tools',
          minutes: 27,
          objectives: ['Use wp-admin and wp-cli for daily development tasks', 'Debug with WP_DEBUG, query monitor and error logs', 'Set up a local development environment with MySQL and PHP'],
          sections: [
            { heading: 'The admin experience', body: 'The WordPress admin provides the content editing UI, user management, media library, plugin and theme management, and settings screens. As a developer you will extend this with custom admin menus via add_menu_page, settings pages via register_setting, and custom columns on list tables via manage_posts_columns. Understanding the admin hooks — admin_menu, admin_init, save_post — is essential for plugin development.' },
            { heading: 'WP-CLI power tools', body: 'WP-CLI is the command-line interface for WordPress. It lets you manage sites without a browser: wp db query runs raw SQL, wp post list queries content, wp plugin activate installs and activates, and wp core update upgrades WordPress itself. It is indispensable for migrations, debugging and automation in CI pipelines.' },
            { heading: 'Debugging environment', body: 'Enable WP_DEBUG, WP_DEBUG_LOG and WP_DEBUG_DISPLAY in wp-config.php to surface PHP errors. Query Monitor plugin shows database queries, hooks, HTTP requests and template information in the admin bar. Install Xdebug for step-through debugging and use phpMyAdmin or TablePlus to inspect MySQL directly. A proper debugging setup prevents hours of guesswork.' }
          ],
          links: [
            { title: 'Debugging in WordPress', url: 'https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/', sourceName: 'WordPress Documentation', resourceType: 'guide', relationship: 'Configuring WP_DEBUG and related constants.' },
            { title: 'WP-CLI commands', url: 'https://wp-cli.org/', sourceName: 'WordPress Developer Resources', resourceType: 'documentation', relationship: 'Complete reference for WP-CLI command syntax.' },
            { title: 'MySQL commands reference', url: 'https://dev.mysql.com/doc/refman/8.0/en/mysql-commands.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Essential SQL for inspecting WordPress database tables.' }
          ],
          quiz: { prompt: 'Which wp-config.php constant enables WordPress error logging?', options: ['WP_LOG', 'WP_DEBUG_LOG', 'WP_ERROR_DISPLAY', 'DEBUG_LOGGING'], answerIndex: 1, explanation: 'WP_DEBUG_LOG set to true writes PHP errors to wp-content/debug.log, essential for debugging without exposing errors to visitors.' }
        }
      ]
    },
    {
      slug: 'php-and-wordpress-development',
      stage: 'Foundation',
      title: 'PHP & WordPress Development',
      description: 'Server-side fundamentals: PHP syntax, the WordPress coding standards, hooks and the Loop.',
      topics: [
        {
          slug: 'php-fundamentals-wordpress',
          title: 'PHP Fundamentals for WordPress',
          minutes: 30,
          objectives: ['Write PHP with proper syntax, variables and control structures', 'Understand arrays, functions and string handling', 'Apply WordPress coding standards to PHP code'],
          sections: [
            { heading: 'PHP language basics', body: 'PHP is a server-side language that embeds in HTML. Variables start with $, strings use single or double quotes (double quotes interpolate), arrays use array() or short [] syntax with associative keys. Control structures — if/elseif/else, foreach, while, switch — mirror other C-style languages. Functions accept parameters, return values with the return keyword and follow WordPress naming conventions: lowercase with underscores.' },
            { heading: 'WordPress coding standards', body: 'WordPress enforces coding standards via PHP_CodeSniffer: tabs for indentation (not spaces), Yoda conditions in comparisons (if ( true === $var )), inline PHP doc blocks on functions and classes, and snake_case for function and variable names. These standards exist so 50,000+ plugins from different authors read consistently. Adopt them from day one — fighting them in code review wastes everyone\'s time.' },
            { heading: 'String and array patterns', body: 'WordPress heavily uses associative arrays for options, post data and hook arguments. Learn array_key_exists, isset, wp_parse_args for merging defaults with user input, and esc_attr / esc_html for safe output. Sanitize on input (sanitize_text_field, sanitize_email) and escape on output — this input/output boundary discipline prevents XSS across the entire WordPress ecosystem.' }
          ],
          links: [
            { title: 'PHP manual', url: 'https://www.php.net/manual/en/', sourceName: 'PHP Documentation', resourceType: 'reference', relationship: 'Authoritative PHP language reference.' },
            { title: 'WordPress Coding Standards', url: 'https://developer.wordpress.org/coding-standards/wordpress-coding-standards/', sourceName: 'WordPress Developer Resources', resourceType: 'documentation', relationship: 'The official PHP coding standards for WordPress.' },
            { title: 'WordPress coding standards for PHP', url: 'https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/', sourceName: 'WordPress Documentation', resourceType: 'documentation', relationship: 'Specific PHP rules enforced by PHPCS in WordPress projects.' }
          ],
          quiz: { prompt: 'In WordPress PHP, which comparison style is preferred?', options: ['if ($var == true)', 'if (true === $var)', 'if ($var === TRUE)', 'if ($var != false)'], answerIndex: 1, explanation: 'Yoda conditions (constant on the left) prevent accidental assignment and are enforced by WordPress Coding Standards PHPCS rules.' }
        },
        {
          slug: 'wordpress-hooks-actions-filters',
          title: 'Actions, Filters & the Hook System',
          minutes: 28,
          objectives: ['Register and fire custom actions and filters', 'Use remove_action and remove_filter correctly', 'Debug hook execution order and priority'],
          sections: [
            { heading: 'Actions fire at specific points', body: 'Actions are hooks that fire at defined moments: init runs after WordPress loads, wp_enqueue_scripts fires when scripts load, save_post fires when content saves. You register a callback with add_action(\'hook_name\', \'callback_function\', priority, args). Actions do something — enqueue a script, send an email, log a row. They do not return values to callers.' },
            { heading: 'Filters transform data', body: 'Filters receive a value, modify it and return the modified value. the_content filter receives post content and returns it — plugins add shortcodes, embed videos and format text through this. the_title, the_excerpt and body_class work the same way. A filter that forgets to return its input silently strips data from the page, which is one of the most common WordPress bugs.' },
            { heading: 'Priority and arguments', body: 'The third argument to add_action/add_filter is priority — lower numbers run first (default 10). The fourth is accepted arguments count. To modify behavior set by another plugin, run at a later priority and use the same arguments. Debugging hooks: Query Monitor shows every hook fired, its callbacks, priority and execution time. Remove hooks with remove_action/remove_filter when unhooking parent theme or plugin behavior in a child theme.' }
          ],
          links: [
            { title: 'Plugin API: Actions', url: 'https://developer.wordpress.org/plugins/hooks/actions/', sourceName: 'WordPress Documentation', resourceType: 'documentation', relationship: 'Official actions documentation and common hook reference.' },
            { title: 'Plugin API: Filters', url: 'https://developer.wordpress.org/plugins/hooks/filters/', sourceName: 'WordPress Documentation', resourceType: 'documentation', relationship: 'Official filters documentation with examples.' },
            { title: 'Commonly used hooks', url: 'https://developer.wordpress.org/reference/hooks/', sourceName: 'WordPress Documentation', resourceType: 'reference', relationship: 'Index of all WordPress hooks with arguments and usage.' }
          ],
          quiz: { prompt: 'A filter callback must always…', options: ['Echo its result directly', 'Return the (possibly modified) value it received', 'Call wp_die()', 'Register a new action'], answerIndex: 1, explanation: 'Filters must return the value — a filter that echoes or returns nothing silently strips data from the output.' }
        },
        {
          slug: 'the-loop-and-template-hierarchy',
          title: 'The Loop & Template Hierarchy',
          minutes: 29,
          objectives: ['Read and understand the WordPress template hierarchy', 'Implement The Loop to display post data correctly', 'Override templates properly in child themes'],
          sections: [
            { heading: 'The WordPress Loop', body: 'The Loop is the central pattern: if ( have_posts() ) { while ( have_posts() ) { the_post(); /* template code */ } }. Inside the loop, the_post() sets up global $post so functions like the_title(), the_content() and the_permalink() return current post data. Each template file runs its own loop — archives paginate, single pages show one post, search results iterate matches.' },
            { heading: 'Template hierarchy resolution', body: 'WordPress resolves templates by specificity: for a single post WordPress looks for single-{post_type}-{slug}.php, then single-{post_type}.php, then single.php, then index.php. For archives: archive-{post_type}.php → archive.php → index.php. Understanding this hierarchy lets you override exactly the templates you need without copying the entire theme. get_template_part() loads partials and reusable fragments cleanly.' },
            { heading: 'Child themes and overrides', body: 'A child theme inherits a parent theme and lets you override specific template files without modifying the parent — upgrades then do not destroy your work. Register the child with a style.css header and functions.php that enqueues the parent stylesheet via wp_enqueue_style. Place overridden templates in the child theme root and they take precedence over parent templates.' }
          ],
          links: [
            { title: 'The Loop', url: 'https://developer.wordpress.org/themes/basics/the-loop/', sourceName: 'WordPress Documentation', resourceType: 'documentation', relationship: 'Official Loop documentation with examples.' },
            { title: 'Template Hierarchy', url: 'https://developer.wordpress.org/themes/basics/template-hierarchy/', sourceName: 'WordPress Documentation', resourceType: 'documentation', relationship: 'Visual guide to how WordPress resolves template files.' },
            { title: 'Child Themes', url: 'https://developer.wordpress.org/themes/advanced-topics/child-themes/', sourceName: 'WordPress Documentation', resourceType: 'documentation', relationship: 'Creating and structuring child themes safely.' }
          ],
          quiz: { prompt: 'For a single post of type "portfolio" with slug "my-project", WordPress first looks for…', options: ['single.php', 'single-portfolio-my-project.php', 'portfolio.php', 'page.php'], answerIndex: 1, explanation: 'WordPress checks for the most specific template first — single-{post_type}-{slug}.php — then falls back through progressively generic templates.' }
        }
      ]
    },
    {
      slug: 'theme-and-plugin-engineering',
      stage: 'Intermediate',
      title: 'Theme & Plugin Engineering',
      description: 'Building custom themes, structured plugins and extending WordPress with modern tooling.',
      topics: [
        {
          slug: 'theme-development-modern',
          title: 'Modern Theme Development',
          minutes: 30,
          objectives: ['Structure a custom theme with proper file organization', 'Use theme supports, custom headers and menus correctly', 'Integrate block editor support with theme.json'],
          sections: [
            { heading: 'Theme file structure', body: 'A well-organized theme separates concerns: style.css and functions.php at root, template-parts/ for reusable loop fragments, inc/ for PHP includes (customizer, template-tags, widgets), assets/ for compiled CSS/JS, and template files for the hierarchy. functions.php acts as the theme\'s bootstrap — register supports, menus, sidebars and enqueue assets. Keep template files thin and push logic into inc/ includes.' },
            { heading: 'Theme features and supports', body: 'add_theme_support() registers capabilities: post-thumbnails enables featured images, custom-logo provides the Customizer logo upload, html5 enables semantic markup, responsive-embeds adds responsive video wrappers. register_nav_menus() creates menu locations and wp_nav_menu() renders them. register_sidebar() creates widget-ready areas. These are the building blocks of theme functionality without reinventing WordPress features.' },
            { heading: 'Block editor and theme.json', body: 'WordPress 5.8+ introduced theme.json — a JSON file that defines color palettes, font sizes, spacing scales and block-level style defaults. It replaces scattered add_theme_support calls with a single declarative config. The block editor reads theme.json to show the correct palette in the inserter, apply default spacing and set layout widths. theme.json is the bridge between classic themes and full site editing.' }
          ],
          links: [
            { title: 'Theme Developer Handbook', url: 'https://developer.wordpress.org/themes/', sourceName: 'WordPress Documentation', resourceType: 'documentation', relationship: 'Complete guide to theme development and file structure.' },
            { title: 'theme.json reference', url: 'https://developer.wordpress.org/themes/global-settings-and-styles/', sourceName: 'WordPress Documentation', resourceType: 'documentation', relationship: 'Reference for theme.json configuration options.' },
            { title: 'Block Theme Handbook', url: 'https://developer.wordpress.org/themes/block-themes/', sourceName: 'WordPress Documentation', resourceType: 'documentation', relationship: 'Building block themes with full site editing support.' }
          ],
          quiz: { prompt: 'Where should a theme declare support for featured images?', options: ['In style.css header', 'Via add_theme_support(\'post-thumbnails\') in functions.php', 'In the database options table', 'By adding a field to wp_posts'], answerIndex: 1, explanation: 'add_theme_support(\'post-thumbnails\') in functions.php is the standard way to enable featured image functionality in a WordPress theme.' }
        },
        {
          slug: 'plugin-development-architecture',
          title: 'Plugin Architecture & Development',
          minutes: 30,
          objectives: ['Design a plugin with proper file organization and activation hooks', 'Register custom post types and admin pages from a plugin', 'Use nonces, capabilities and sanitization for security'],
          sections: [
            { heading: 'Plugin structure', body: 'A plugin is a PHP directory with a main file containing the plugin header comment — Plugin Name, Description, Version, Author. Use a loader class or require includes from the main file. Organize: admin/ for admin-only code, public/ for frontend code, includes/ for shared classes. Register everything through hooks — never run code directly at include time because WordPress loads plugin files at unpredictable points during the bootstrap.' },
            { heading: 'Admin UI and settings', body: 'add_menu_page/add_submenu_page create admin screens. register_setting, add_settings_section and add_settings_field build the Settings API pattern — WordPress handles sanitization, nonce verification and option saving when you use this API. For custom columns on list tables, hook manage_{post_type}_posts_columns and manage_{post_type}_posts_custom_column. These hooks keep your admin extensions consistent with WordPress conventions.' },
            { heading: 'Security foundations', body: 'Every form submission and AJAX request needs nonce verification via wp_verify_nonce or check_admin_referer. Capability checks use current_user_can() before performing actions. Input sanitization uses sanitize_text_field, sanitize_email, absint for integers. Output escaping uses esc_attr, esc_html, esc_url and wp_kses for rich content. This nonce-capability-sanitize-escape pattern is non-negotiable WordPress security.' }
          ],
          links: [
            { title: 'Plugin Developer Handbook', url: 'https://developer.wordpress.org/plugins/', sourceName: 'WordPress Documentation', resourceType: 'documentation', relationship: 'Official plugin development guide covering hooks, APIs and security.' },
            { title: 'Settings API', url: 'https://developer.wordpress.org/plugins/settings/', sourceName: 'WordPress Documentation', resourceType: 'documentation', relationship: 'Building settings pages the WordPress way.' },
            { title: 'Data Validation', url: 'https://developer.wordpress.org/plugins/security/data-validation/', sourceName: 'WordPress Documentation', resourceType: 'guide', relationship: 'Input sanitization and output escaping reference.' }
          ],
          quiz: { prompt: 'Why must plugin code never execute directly at file include time?', options: ['PHP does not allow top-level statements', 'WordPress loads plugin files during bootstrap at unpredictable points, so hooks should register the code instead', 'It causes a fatal error always', 'Only themes can run code at include time'], answerIndex: 1, explanation: 'WordPress requires plugin functionality to be registered via hooks because plugin files load at various points during the bootstrap sequence — direct execution causes ordering bugs.' }
        },
        {
          slug: 'custom-fields-options-api',
          title: 'Custom Fields, Options & REST API',
          minutes: 29,
          objectives: ['Register and use custom fields with register_meta', 'Store and retrieve site-wide options correctly', 'Expose and consume the WordPress REST API'],
          sections: [
            { heading: 'Custom field registration', body: 'Custom fields attached to posts via register_meta and register_post_meta expose fields to the REST API and enable metadata querying. For site-wide settings, use the Options API: add_option, get_option, update_option. Store serialized arrays for complex settings. For per-post metadata, get_post_meta and update_post_meta interact with wp_postmeta. The Settings API handles admin forms while the Options API handles programmatic access.' },
            { heading: 'REST API fundamentals', body: 'WordPress REST API (wp-json) exposes posts, pages, users, categories and custom types as JSON endpoints. Register REST fields with register_rest_field to add custom data to responses. Create custom endpoints with register_rest_route under a custom namespace. Authentication uses application passwords (built into WordPress 5.6+) or JWT tokens. The REST API is the bridge between WordPress content and JavaScript frontends, mobile apps and external services.' },
            { heading: 'Headless WordPress patterns', body: 'Headless WordPress serves the backend CMS while a separate frontend (React, Next.js, Vue) consumes the REST API or GraphQL (via WPGraphQL plugin). Decoupling the frontend gives you full framework choice while keeping WordPress as the content source. Key considerations: disable the default theme output, handle authentication between domains with CORS, and manage content preview which requires the REST API\'s response context parameter.' }
          ],
          links: [
            { title: 'REST API Handbook', url: 'https://developer.wordpress.org/rest-api/', sourceName: 'WordPress Documentation', resourceType: 'documentation', relationship: 'Official REST API reference and getting started guide.' },
            { title: 'Options API', url: 'https://developer.wordpress.org/plugins/settings/settings-api/', sourceName: 'WordPress Documentation', resourceType: 'documentation', relationship: 'Storing and retrieving site options correctly.' },
            { title: 'MySQL SELECT syntax', url: 'https://dev.mysql.com/doc/refman/8.0/en/select.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Understanding the queries WordPress runs under get_option and meta queries.' }
          ],
          quiz: { prompt: 'To add a custom field "rating" to the REST API response for posts, you would use…', options: ['add_post_meta in the theme template', 'register_rest_field in the plugin\'s rest_api_init callback', 'A custom SQL query on page load', 'wp-config.php constants'], answerIndex: 1, explanation: 'register_rest_field lets plugins and themes extend REST API responses with custom fields, keeping the extension in PHP where it belongs.' }
        }
      ]
    },
    {
      slug: 'advanced-wordpress-performance',
      stage: 'Advanced',
      title: 'Advanced WordPress Development',
      description: 'Performance optimization, security hardening, testing and production deployment.',
      topics: [
        {
          slug: 'wordpress-performance-optimization',
          title: 'Performance Optimization',
          minutes: 30,
          objectives: ['Profile and optimize slow database queries', 'Implement object caching and page caching strategies', 'Optimize assets and measure with Core Web Vitals'],
          sections: [
            { heading: 'Database performance', body: 'WordPress\'s flexible meta queries are slow at scale — a query joining wp_posts and wp_postmeta with LIKE on meta_value can scan millions of rows. Monitor slow queries with Query Monitor or MySQL slow query log. Add custom indexes, use transients for cached results, and favor stored options over meta queries for frequently accessed data. Consider dropping wp_postmeta in favor of custom tables for high-volume structured data.' },
            { heading: 'Caching layers', body: 'WordPress has no built-in page cache — every request rebuilds the page from PHP and MySQL. Object caching (WP_Object_Cache via Redis or Memcached) persists query results across requests. Page caching (WP Super Cache, W3 Total Cache or server-level Nginx/Varnish) serves pre-built HTML. Transients cache individual values. The right combination: Redis for object cache, full-page cache for anonymous traffic, and no caching for logged-in admin sessions.' },
            { heading: 'Frontend asset optimization', body: 'Enqueue scripts and styles properly via wp_enqueue_script and wp_enqueue_style in functions.php — never hardcode links in headers. Version your assets for cache busting. Defer non-critical JavaScript, preload critical fonts, and use wp_add_inline_script for small scripts. Target Core Web Vitals: LCP under 2.5s, CLS under 0.1 and INP under 200ms. Use Lighthouse in CI to catch regressions before production.' }
          ],
          links: [
            { title: 'Performance optimization guide', url: 'https://developer.wordpress.org/advanced-administration/performance/', sourceName: 'WordPress Documentation', resourceType: 'guide', relationship: 'Official performance recommendations and caching strategies.' },
            { title: 'Object Cache API', url: 'https://developer.wordpress.org/plugins/hooks/intermediate-api/', sourceName: 'WordPress Documentation', resourceType: 'documentation', relationship: 'Using Redis and Memcached for WordPress object caching.' },
            { title: 'MySQL optimization', url: 'https://dev.mysql.com/doc/refman/8.0/en/optimization.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Database-level performance tuning for WordPress-scale queries.' }
          ],
          quiz: { prompt: 'WordPress has no built-in page cache. The most impactful first step for an anonymous-traffic site is…', options: ['Adding more PHP workers', 'Enabling full-page caching at the server level or via a plugin', 'Installing Redis only', 'Switching to a faster MySQL version'], answerIndex: 1, explanation: 'Full-page cache eliminates PHP and MySQL processing entirely for anonymous requests — the single biggest performance win on WordPress.' }
        },
        {
          slug: 'wordpress-security-hardening',
          title: 'Security Hardening',
          minutes: 28,
          objectives: ['Harden WordPress installations against common attack vectors', 'Implement proper authentication and capability management', 'Audit plugins and themes for security vulnerabilities'],
          sections: [
            { heading: 'Hardening fundamentals', body: 'Change the database prefix from wp_, disable file editing in wp-config.php with DISALLOW_FILE_EDIT, limit login attempts, enforce strong passwords and two-factor authentication, and keep WordPress core, themes and plugins updated. Restrict wp-admin access by IP or HTTP authentication. Remove the WordPress version meta tag. Disable XML-RPC if not needed — it is a common brute-force vector. These steps eliminate the easiest attack surfaces.' },
            { heading: 'Authentication and capabilities', body: 'WordPress capability system (user roles and capabilities) controls what each user can do. Always check current_user_can(\'edit_posts\') before actions, never just check user role names. Application passwords for REST API authentication are safer than storing user passwords. For JWT or OAuth, use established plugins with peer-reviewed implementations. Store credentials in wp-config.php above theABSPATH line — never in version control.' },
            { heading: 'Plugin and theme auditing', body: 'Plugins are the largest attack surface. Audit before installing: check last update date, active installations, support responsiveness and known vulnerabilities in WPScan database. Run automated scans with WPScan CLI. In your own plugins, never use $_GET/$_POST directly — always sanitize. Use prepare() for all SQL queries to prevent injection. Escape all output. These habits make your code resilient against the OWASP Top 10.' }
          ],
          links: [
            { title: 'Security best practices', url: 'https://developer.wordpress.org/advanced-administration/security/', sourceName: 'WordPress Documentation', resourceType: 'guide', relationship: 'Official WordPress security hardening checklist.' },
            { title: 'Data Validation and Sanitization', url: 'https://developer.wordpress.org/plugins/security/data-validation/', sourceName: 'WordPress Documentation', resourceType: 'guide', relationship: 'Input sanitization and output escaping reference.' },
            { title: 'MySQL prepared statements', url: 'https://dev.mysql.com/doc/refman/8.0/en/sql-prepared-statements.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Using $wpdb->prepare to prevent SQL injection.' }
          ],
          quiz: { prompt: 'To safely insert user input into a SQL query in WordPress, you should use…', options: ['Direct string concatenation with $wpdb->query()', '$wpdb->prepare() with placeholder syntax', 'esc_sql() as the only protection', 'mysql_real_escape_string() directly'], answerIndex: 1, explanation: 'wpdb->prepare() creates parameterized queries that prevent SQL injection — it is the WordPress-standard safe query method.' }
        },
        {
          slug: 'testing-deployment-workflow',
          title: 'Testing, CI/CD & Production Deployment',
          minutes: 30,
          objectives: ['Write automated tests for WordPress plugins and themes', 'Set up continuous integration for WordPress projects', 'Deploy WordPress sites safely with version control workflows'],
          sections: [
            { heading: 'Automated testing', body: 'PHPUnit is the standard for WordPress plugin and theme testing — WP_UnitTestCase provides a WordPress environment with database setup and teardown. Test custom functions, hook callbacks and REST API endpoints. For frontend, use Playwright or Cypress to test page rendering and JavaScript interactions. Test database queries against a real MySQL instance in CI, not SQLite, since WordPress relies on MySQL-specific behavior.' },
            { heading: 'CI/CD pipeline', body: 'A WordPress CI pipeline runs PHPCS for coding standards, PHPUnit for unit and integration tests, and optionally WPScan for vulnerability checks. Use GitHub Actions or GitLab CI with a MySQL service container. Run migrations in a staging environment before production. Automate plugin updates in staging with visual regression testing. The pipeline should block merges when tests fail and automate deployment on merge to main.' },
            { heading: 'Deployment strategy', body: 'Deploy WordPress with Git — core in vendor via Composer (roots/bedrock), themes and plugins as dependencies. Environment variables in wp-config.php replace hardcoded credentials. Use wp db export and wp db import for database migrations. Staging mirrors production with sanitized copies of production data. Rollback by reverting the Git branch and re-running the deploy. Blue-green deployments avoid downtime for high-traffic sites.' }
          ],
          links: [
            { title: 'WordPress PHPUnit testing', url: 'https://developer.wordpress.org/plugins/automated-testing/', sourceName: 'WordPress Documentation', resourceType: 'documentation', relationship: 'Setting up PHPUnit with WordPress test suite.' },
            { title: 'MySQL data manipulation', url: 'https://dev.mysql.com/doc/refman/8.0/en/insert.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Understanding INSERT/UPDATE/DELETE for migration scripts.' },
            { title: 'MDN HTTP status codes', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'Understanding HTTP responses during deployment and debugging.' }
          ],
          quiz: { prompt: 'In a WordPress CI pipeline, why should tests run against MySQL rather than SQLite?', options: ['SQLite is faster', 'WordPress relies on MySQL-specific functions and query behavior that SQLite does not replicate', 'SQLite cannot store strings', 'PHPUnit only supports MySQL'], answerIndex: 1, explanation: 'WordPress uses MySQL-specific features like FULLTEXT indexes and certain functions — testing against SQLite can hide real bugs that appear in production.' }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'WordPress Plugin & Theme Integration Build',
    coverage: ['PHP & WordPress Hooks', 'Custom Post Types & Fields', 'Plugin Security', 'Performance', 'REST API'],
    brief:
      'Build a WordPress plugin that registers a "Testimonials" custom post type with Title, Quote, Client Name and Avatar fields. Include an admin settings page for the plugin, a frontend shortcode that queries and displays testimonials in a responsive grid, and a REST API endpoint for external consumption. Apply proper nonce verification, capability checks and output escaping throughout.',
    requirements: [
      'Custom post type registration with labels and supports',
      'At least two custom fields exposed to the REST API',
      'Admin settings page using the Settings API',
      'Frontend shortcode with responsive CSS grid output',
      'REST API endpoint returning testimonials as JSON',
      'Nonce verification on all form submissions',
      'Capability checks before any write operation',
      'Proper output escaping on all rendered content'
    ],
    expectedOutput:
      'A complete plugin with documented PHP code, a brief architectural decision note explaining your hook choices and a security checklist showing where each protection is applied.',
    rubric: [
      { skill: 'WordPress Architecture', weight: 25, criteria: 'Correct hook usage, clean file structure, no direct code execution at include' },
      { skill: 'PHP & Security', weight: 25, criteria: 'Nonces verified, capabilities checked, input sanitized, output escaped' },
      { skill: 'REST API Design', weight: 20, criteria: 'Clean endpoints, proper authentication, JSON schema documented' },
      { skill: 'Frontend Implementation', weight: 15, criteria: 'Responsive shortcode output, accessible markup, proper asset enqueuing' },
      { skill: 'Code Quality', weight: 15, criteria: 'WordPress coding standards, clear naming, documented functions' }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'Custom Theme with Template Hierarchy',
      stage: 'Beginner',
      objective: 'Build a custom WordPress theme from scratch implementing the full template hierarchy with child-theme support.',
      requirements: ['Template hierarchy files for all archive and singular views', 'functions.php with proper enqueue, menus and theme supports', 'theme.json with color palette and typography scale', 'Responsive layout using CSS grid', 'Child theme structure documented'],
      skillsEvaluated: ['WordPress Themes', 'PHP', 'HTML', 'CSS', 'Template Hierarchy'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: { instructions: 'Submit the theme directory structure, key template excerpts with annotated decisions and a screenshot of the rendered site.', textLabel: 'Theme development notes', minTextLength: 900 }
    },
    {
      title: 'Plugin with Settings API and Security',
      stage: 'Intermediate',
      objective: 'Develop a WordPress plugin that adds a custom post type with a settings page and proper security measures.',
      requirements: ['Custom post type with register_post_meta fields', 'Settings page using Settings API with sections', 'Nonce and capability checks on all operations', 'Input sanitization and output escaping', 'Unit tests with WP_UnitTestCase'],
      skillsEvaluated: ['WordPress Plugins', 'PHP', 'Security', 'PHPUnit'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: { instructions: 'Submit the plugin with test coverage report, security audit checklist and architectural decisions document.', textLabel: 'Plugin architecture and security notes', minTextLength: 1100 }
    },
    {
      title: 'Performance Audit & Caching Strategy',
      stage: 'Advanced',
      objective: 'Audit a slow WordPress site and produce a comprehensive performance remediation plan with caching layers and database optimization.',
      requirements: ['Identify slow queries using EXPLAIN analysis', 'Design an object caching strategy with Redis', 'Plan page caching configuration', 'Optimize asset loading with wp_enqueue', 'Define before/after Core Web Vitals targets'],
      skillsEvaluated: ['WordPress Performance', 'MySQL', 'Caching', 'Web Performance'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: { instructions: 'Submit the full audit report with prioritized fix table, caching architecture diagram and measurement plan.', textLabel: 'Performance audit report', minTextLength: 1000, linkLabels: ['Supporting MySQL or WordPress documentation referenced'] }
    }
  ],

  simTasks: [
    {
      title: 'Plugin vulnerability patch',
      context: 'A client\'s site was flagged in a security scan — their testimonial plugin concatenates user input directly into SQL queries without prepare(). The site handles contact form submissions containing names and email addresses.',
      requirements: ['Explain the SQL injection risk in plain language', 'Rewrite the vulnerable query using $wpdb->prepare()', 'List all locations in the plugin where similar patterns exist', 'Add input sanitization for the affected fields'],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Security patch with before/after code, vulnerability report and remediation checklist.',
      skills: ['PHP', 'WordPress Security', 'MySQL']
    },
    {
      title: 'Custom post type with REST API',
      context: 'The marketing team needs a "Case Studies" section on the site with content managed in WordPress and consumed by a React frontend via REST API. Each case study needs title, industry, challenge, solution, results and featured image.',
      requirements: ['Register the custom post type with proper supports', 'Expose all fields via the REST API with register_rest_field', 'Add a custom endpoint filtered by industry taxonomy', 'Document the API response schema', 'Handle image URLs correctly in the response'],
      priority: 'high',
      dueDayOffset: 5,
      expectedOutput: 'Plugin code with REST API documentation and example API responses.',
      skills: ['WordPress Plugins', 'REST API', 'PHP', 'Custom Post Types']
    },
    {
      title: 'Theme performance optimization',
      context: 'A WordPress magazine site scores 35 on Lighthouse. The theme loads 12 CSS files and 9 JavaScript files, queries 47 posts on the homepage with individual meta queries, and has no caching configured.',
      requirements: ['Consolidate CSS and JS into enqueued bundles', 'Rewrite the homepage query to avoid N+1 meta queries', 'Configure page caching strategy', 'Add defer/async to non-critical scripts', 'Define before/after Lighthouse targets'],
      priority: 'normal',
      dueDayOffset: 7,
      expectedOutput: 'Optimization plan with specific code changes and before/after performance comparison.',
      skills: ['WordPress Performance', 'PHP', 'MySQL', 'Web Performance']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Dev Patel',
      personaRole: 'Frontend Developer',
      situation: 'Integrating a React frontend with WordPress REST API — authentication issues discovered during development.',
      openingMessage:
        'I\'m getting 401 errors when the React app tries to POST to /wp-json/wp/v2/case-studies. Application passwords are set up but the Authorization header seems to be stripped by the hosting provider\'s security rules. Need this working for demo Thursday. Thoughts?',
      expectedPoints: ['Diagnoses the header stripping issue vs authentication misconfiguration', 'Suggests CORS and security header configuration on the host', 'Proposes an alternative authentication approach if headers cannot be restored', 'Agrees on a fallback plan for the Thursday demo']
    },
    {
      kind: 'team',
      personaName: 'Lena Kovacs',
      personaRole: 'QA Engineer',
      situation: 'Plugin testing reveals a bug where custom post type archives return 404.',
      openingMessage:
        'The testimonials archive page works fine locally but returns a 404 on staging. Permalinks were flushed, the post type is registered with public => true, and the data exists in the database. Any ideas before I file this as a blocker?',
      expectedPoints: ['Asks whether flush_rewrite_rules was called on activation', 'Checks for register_post_type arguments that affect archives (has_archive)', 'Considers hosting-specific permalink or .htaccess issues', 'Proposes a quick diagnostic using wp-cli rewrite list']
    },
    {
      kind: 'client',
      personaName: 'Sofia Reyes',
      personaRole: 'Marketing Director, BrightPath Education',
      situation: 'Client requests a feature change to a WordPress site mid-project.',
      openingMessage:
        'We just decided we need a course catalog with filtering by subject, level and instructor. Originally the site was just pages with blog posts. This should be straightforward in WordPress right? Can we add it this sprint?',
      expectedPoints: ['Clarifies the content model (custom post type + taxonomies)', 'Estimates impact on sprint scope honestly', 'Proposes a phasing approach — catalog this sprint, advanced filtering next', 'Documents the new requirements for sign-off']
    },
    {
      kind: 'client',
      personaName: 'Marcus Whitfield',
      personaRole: 'CTO, GreenLeaf Organics',
      situation: 'Escalation about WordPress site speed after a product launch.',
      openingMessage:
        'Our WooCommerce site crashed during the Black Friday promotion. Page loads went from 3 seconds to 30 seconds and the database CPU hit 100%. We need a plan to make sure this does not happen for the January sale. What went wrong and what do you need from us?',
      expectedPoints: ['Asks for hosting specs, current caching setup and plugin list', 'Explains likely causes (uncached queries, cart session bloat, plugin conflicts) in business terms', 'Proposes a phased remediation plan with priorities', 'Sets realistic expectations for the January timeline']
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'Monday morning: a client reports that their WordPress site\'s WooCommerce checkout is throwing "ERR_TOO_MANY_REDIRECTS" for all customers since Saturday evening. A developer pushed a plugin update before leaving for the weekend.',
      requiredActions: [
        { action: 'Check the redirect chain with curl or browser dev tools to identify the loop source', good: true, note: 'Diagnosis precedes any fix — identify whether it is plugin, .htaccess or caching.' },
        { action: 'Deactivate the recently updated plugin via WP-CLI since the admin is also inaccessible', good: true, note: 'WP-CLI bypasses the browser when the site is broken — the right tool for emergencies.' },
        { action: 'Push a hotfix to production without testing because the site is already down', good: false, note: 'Urgency does not excuse skipping testing — test in staging first, even quickly.' },
        { action: 'Document the incident, notify the client with a timeline and schedule a post-mortem', good: true, note: 'Communication and process prevent repeat incidents.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'Two weeks into a WordPress theme rebuild, the client asks to switch from a classic theme to a full block theme with Site Editing, saying they saw it on a competitor\'s site and want the same flexibility.',
      requiredActions: [
        { action: 'Assess the technical impact: different template system, theme.json requirements, block patterns vs PHP templates', good: true, note: 'Scope changes require honest technical assessment before committing.' },
        { action: 'Agree immediately to avoid upsetting the client and figure it out later', good: false, note: 'Saying yes without understanding the cost creates bigger problems later.' },
        { action: 'Present a revised timeline with the additional work quantified and trade-offs explained', good: true, note: 'Professionals make constraints visible so clients can make informed decisions.' },
        { action: 'Propose a phased approach: complete the classic theme now, migrate to block theme in a second phase', good: true, note: 'Phasing preserves the original timeline while accommodating the new request.' }
      ]
    }
  ],

  interviewQuestions: [
    { dimension: 'technical_knowledge', prompt: 'Explain the difference between an action and a filter in WordPress. Give a real example of each.', guidancePoints: ['Actions fire for side effects, filters transform and return values', 'Real example: wp_enqueue_scripts action for enqueuing, the_content filter for modifying output', 'Importance of returning values in filters'] },
    { dimension: 'technical_knowledge', prompt: 'How does the WordPress template hierarchy resolve which PHP file renders a page? Walk through an example.', guidancePoints: ['Specificity-first resolution: single-{type}-{slug}.php → single-{type}.php → single.php → index.php', 'get_template_part() for reusable fragments', 'Child theme template overrides'] },
    { dimension: 'technical_knowledge', prompt: 'A WordPress site has 500,000 posts and queries using meta_value with LIKE are taking 8 seconds. How do you fix it?', guidancePoints: ['Analyze with EXPLAIN to confirm full table scans on wp_postmeta', 'Options: custom table for structured data, indexed columns, transients for cached results', 'Avoiding meta queries for frequently filtered data'] },
    { dimension: 'problem_solving', prompt: 'A WordPress plugin update breaks the site — white screen of death. Walk me through your recovery process.', guidancePoints: ['Enable WP_DEBUG to surface the actual PHP error', 'Use WP-CLI to deactivate plugins when admin is inaccessible', 'Check error logs, roll back the specific plugin, test in staging', 'Document and communicate the resolution'] },
    { dimension: 'problem_solving', prompt: 'You need to migrate 10,000 posts with custom fields from a legacy CMS to WordPress. How do you approach this?', guidancePoints: ['Map the source data model to WordPress post types and meta', 'Write a WP-CLI import script with progress tracking and error handling', 'Handle media imports, redirects and slug conflicts', 'Test with a subset before running the full migration'] },
    { dimension: 'professional_reasoning', prompt: 'A client wants to use a popular page builder plugin. You know it adds significant performance overhead and locks them into a proprietary system. How do you handle this?', guidancePoints: ['Present evidence: page weight, load time impact, vendor lock-in risks', 'Offer alternatives: block editor with custom blocks, lightweight page builder', 'Respect the client\'s final decision while documenting your recommendation'] },
    { dimension: 'communication', prompt: 'Explain to a non-technical client why their WordPress site needs regular updates and what happens if they skip them.', guidancePoints: ['Security patches close known vulnerabilities publicly documented', 'Compatibility updates prevent plugin/theme breakage', 'Use analogy of car maintenance — skipping oil changes leads to bigger problems', 'Propose a maintenance plan with staging and rollback'] },
    { dimension: 'communication', prompt: 'Your pull request adding a custom REST API endpoint receives a review requesting nonce verification on a public GET endpoint. Explain your position.', guidancePoints: ['GET endpoints for public data typically do not need nonces', 'POST/PUT/DELETE endpoints must have nonce verification', 'If the endpoint exposes private data, authentication (not nonce) is appropriate', 'Compromise: add authentication if the endpoint reveals non-public information'] }

  ]

}
