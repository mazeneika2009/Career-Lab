import type { CareerDef } from '../framework.js'

export const biDeveloper: CareerDef = {
  slug: 'bi-developer',
  name: 'BI Developer',
  category: 'Business',
  order: 22,
  description:
    'Models data warehouses and delivers Power BI and Tableau reporting that operational teams use every week.',
  difficulty: 'Intermediate',
  pathSummary:
    'SQL querying & relational fundamentals → ETL pipelines & data warehouse modeling → Power BI report design & DAX measures → Tableau dashboards & storytelling → deployment, governance & stakeholder delivery.',
  mainSkills: [
    'SQL (T-SQL)',
    'Data Warehouse Modeling',
    'Power BI & DAX',
    'Tableau',
    'ETL & Data Pipelines',
    'Star Schema Design',
    'Data Governance',
    'Business Stakeholder Communication'
  ],
  sourcePlatforms: [
    'Microsoft Learn',
    'Power BI Documentation',
    'Tableau Documentation',
    'SQL Documentation'
  ],
  companyName: 'LumenMetrics',
  roleTitle: 'BI Developer',

  chapters: [
    {
      slug: 'sql-and-relational-foundations',
      stage: 'Beginner',
      title: 'SQL & Relational Foundations',
      description: 'The SQL querying and relational database concepts that every BI developer must master before building anything.',
      topics: [
        {
          slug: 'sql-query-fundamentals',
          title: 'SQL Query Fundamentals',
          minutes: 30,
          objectives: [
            'Write SELECT statements with filtering, sorting and aggregation',
            'Use GROUP BY and HAVING to summarize data at the row level',
            'Apply aggregate functions to derive meaningful business metrics'
          ],
          sections: [
            { heading: 'SELECT, WHERE and ORDER BY', body: 'Every BI report starts with a query. SELECT picks columns, WHERE filters rows to a relevant subset, and ORDER BY determines presentation order. Using aliases, computed columns and conditional logic (CASE) inside SELECT lets you shape raw data into business-ready fields before it ever reaches a reporting tool.' },
            { heading: 'Aggregation and GROUP BY', body: 'Business questions almost always require aggregation — total revenue, average order value, count of active customers. GROUP BY partitions rows by one or more columns so aggregate functions (SUM, AVG, COUNT, MIN, MAX) operate per group. HAVING filters after aggregation, unlike WHERE which filters before.' },
            { heading: 'JOINs and combining data', body: 'Real data lives in normalized tables. INNER JOIN returns matching rows, LEFT JOIN preserves all rows from the left table, and FULL OUTER JOIN keeps everything. Understanding join semantics prevents double-counting and missing data — the two most common BI reporting errors.' }
          ],
          links: [
            { title: 'SELECT statement syntax', url: 'https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql', sourceName: 'SQL Documentation', resourceType: 'reference', relationship: 'Official T-SQL SELECT reference with syntax and examples.' },
            { title: 'GROUP BY and HAVING clauses', url: 'https://learn.microsoft.com/en-us/sql/t-sql/queries/select-group-by-transact-sql', sourceName: 'SQL Documentation', resourceType: 'reference', relationship: 'Grouping and filtering aggregated results.' },
            { title: 'JOIN concepts', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/using-joins', sourceName: 'SQL Documentation', resourceType: 'guide', relationship: 'Visual guide to inner, outer and cross joins.' }
          ],
          quiz: {
            prompt: 'You need to find customers whose total lifetime orders exceed $5,000. Which clause filters the aggregated result?',
            options: [
              'WHERE SUM(order_total) > 5000',
              'HAVING SUM(order_total) > 5000',
              'FILTER WHERE SUM(order_total) > 5000',
              'GROUP HAVING SUM(order_total) > 5000'
            ],
            answerIndex: 1,
            explanation: 'HAVING filters after GROUP BY aggregation. WHERE filters individual rows before grouping — it cannot reference aggregate functions.'
          }
        },
        {
          slug: 'advanced-sql-for-reporting',
          title: 'Advanced SQL for Reporting',
          minutes: 30,
          objectives: [
            'Write window functions for running totals, rankings and period-over-period comparisons',
            'Use CTEs and subqueries to break complex logic into readable steps',
            'Apply date functions and formatting for time-based reporting'
          ],
          sections: [
            { heading: 'Window functions', body: 'Window functions compute across a set of rows related to the current row without collapsing them with GROUP BY. ROW_NUMBER, RANK, SUM() OVER (PARTITION BY ... ORDER BY ...) enable running totals, year-over-year comparisons and percentile calculations — the bread and butter of financial and operational BI reports.' },
            { heading: 'CTEs and modular queries', body: 'Common Table Expressions (WITH clause) break a long query into named, logical steps. They improve readability, enable recursion for hierarchical data (org charts, product categories), and let you reference intermediate results without subquery nesting. Most modern warehouses support CTEs natively.' },
            { heading: 'Date functions and intervals', body: 'Time intelligence is central to BI. DATEADD, DATEDIFF, DATE_TRUNC, and EOMONTH handle fiscal periods, rolling windows and date-part extraction. Consistent date formatting and timezone awareness prevent subtle reporting errors — especially across global teams.' }
          ],
          links: [
            { title: 'Window functions reference', url: 'https://learn.microsoft.com/en-us/sql/t-sql/functions/row-number-transact-sql', sourceName: 'SQL Documentation', resourceType: 'reference', relationship: 'ROW_NUMBER and related window function documentation.' },
            { title: 'Common Table Expressions (CTEs)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/queries/with-common-table-expression-transact-sql', sourceName: 'SQL Documentation', resourceType: 'reference', relationship: 'CTE syntax and recursive CTE usage.' },
            { title: 'Date and time functions', url: 'https://learn.microsoft.com/en-us/sql/t-sql/functions/date-and-time-data-types-and-functions', sourceName: 'SQL Documentation', resourceType: 'reference', relationship: 'Complete catalog of date/time functions in T-SQL.' }
          ],
          quiz: {
            prompt: 'You need a running total of daily sales ordered by transaction date. Which SQL construct achieves this?',
            options: [
              'GROUP BY with SUM',
              'SUM() OVER (ORDER BY transaction_date ROWS UNBOUNDED PRECEDING)',
              'A correlated subquery with COUNT',
              'UNION ALL of daily subtotals'
            ],
            answerIndex: 1,
            explanation: 'A window function with ORDER BY and ROWS UNBOUNDED PRECEDING accumulates the sum across all preceding rows in the specified order, producing a running total.'
          }
        },
        {
          slug: 'sql-performance-and-best-practices',
          title: 'SQL Performance & Best Practices',
          minutes: 25,
          objectives: [
            'Read and interpret query execution plans to identify bottlenecks',
            'Design indexes that accelerate common report queries',
            'Write maintainable, version-controlled SQL for BI projects'
          ],
          sections: [
            { heading: 'Execution plans explained', body: 'An execution plan shows how the database engine resolves a query — which tables are scanned, how joins are performed, and where the cost concentrates. Table scans on large fact tables signal missing indexes, while key lookups indicate the index does not cover the query. Learning to read plans turns slow-query debugging from guessing into diagnosis.' },
            { heading: 'Indexing for BI workloads', body: 'BI queries tend to filter on date ranges and category attributes, then aggregate measures. Clustered indexes on date columns and non-clustered indexes on frequently filtered dimensions dramatically reduce I/O. However, over-indexing slows ETL loads — strike a balance based on the read/write ratio of your warehouse.' },
            { heading: 'SQL maintainability', body: 'Use consistent formatting, meaningful aliases and CTEs to keep queries readable. Add comments explaining business logic, not syntax. Store queries in version control alongside the reports that consume them. Parameterize date ranges and filters so the same query serves multiple dashboards without duplication.' }
          ],
          links: [
            { title: 'Execution plan overview', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/performance/execution-plans', sourceName: 'SQL Documentation', resourceType: 'guide', relationship: 'How to read and analyze query execution plans.' },
            { title: 'Index design best practices', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/indexes/index-design-guidelines', sourceName: 'SQL Documentation', resourceType: 'guide', relationship: 'Guidelines for choosing and designing indexes.' },
            { title: 'SQL Server query store', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/performance/monitoring-performance-by-using-the-query-store', sourceName: 'SQL Documentation', resourceType: 'guide', relationship: 'Tracking query performance over time.' }
          ],
          quiz: {
            prompt: 'A report query shows a "Table Scan" on a 50 million row fact table in the execution plan. What is the most likely fix?',
            options: [
              'Increase the server RAM',
              'Add an index covering the columns used in WHERE and JOIN',
              'Rewrite the query as a stored procedure',
              'Move the data to a faster disk'
            ],
            answerIndex: 1,
            explanation: 'A table scan reads every row. An index on the filtered/joined columns lets the engine seek directly to relevant rows, dramatically reducing I/O.'
          }
        }
      ]
    },
    {
      slug: 'etl-and-data-warehousing',
      stage: 'Foundation',
      title: 'ETL Pipelines & Data Warehouse Modeling',
      description: 'Extracting, transforming and loading data, and designing warehouse schemas that make reporting fast and accurate.',
      topics: [
        {
          slug: 'etl-pipeline-design',
          title: 'ETL Pipeline Design & Orchestration',
          minutes: 30,
          objectives: [
            'Design extract, transform and load stages for a data warehouse pipeline',
            'Handle incremental loading with change data capture patterns',
            'Choose appropriate scheduling and orchestration strategies'
          ],
          sections: [
            { heading: 'Extract phase', body: 'Extraction pulls data from source systems — transactional databases, APIs, CSV exports or flat files. Full extraction is simple but slow; incremental extraction reads only changed rows using timestamps, sequence numbers or database triggers. Change Data Capture (CDC) captures inserts, updates and deletes in near-real-time without querying the source repeatedly.' },
            { heading: 'Transform phase', body: 'Transformations clean, standardize and enrich raw data: type casting, null handling, deduplication, surrogate key generation and business-rule application. Transforms happen in staging tables before loading into the warehouse. Document every transformation rule — analysts depend on understanding what the numbers mean.' },
            { heading: 'Load phase and orchestration', body: 'Loading inserts transformed data into dimension and fact tables. Truncate-and-replace works for small tables; merge/upsert for incremental loads. Orchestrate pipelines with tools like Azure Data Factory, SSIS or dbt, and monitor for failures. Idempotent pipelines — rerunnable without side effects — are essential for reliability.' }
          ],
          links: [
            { title: 'Azure Data Factory overview', url: 'https://learn.microsoft.com/en-us/azure/data-factory/introduction', sourceName: 'Microsoft Learn', resourceType: 'documentation', relationship: 'Microsoft cloud ETL service documentation.' },
            { title: 'Change Data Capture in SQL Server', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/track-changes/about-change-data-capture-sql-server', sourceName: 'SQL Documentation', resourceType: 'guide', relationship: 'CDC configuration and usage guide.' },
            { title: 'ETL best practices', url: 'https://learn.microsoft.com/en-us/sql/integration-services/integration-services-ssis-best-practices', sourceName: 'SQL Documentation', resourceType: 'guide', relationship: 'SSIS and general ETL design patterns.' }
          ],
          quiz: {
            prompt: 'An ETL pipeline must process 2 million changed rows daily but the source database cannot tolerate long read locks. Which extraction strategy is best?',
            options: [
              'Full table scan every hour',
              'Change Data Capture with a low-watermark read',
              'Truncate and reload from backup',
              'Manual CSV export'
            ],
            answerIndex: 1,
            explanation: 'CDC reads the transaction log for changes with minimal source impact, making it ideal for high-volume, lock-sensitive extraction.'
          }
        },
        {
          slug: 'dimensional-modeling',
          title: 'Dimensional Modeling & Star Schema',
          minutes: 30,
          objectives: [
            'Distinguish between fact tables and dimension tables',
            'Design a star schema with surrogate keys, slowly changing dimensions and degenerate dimensions',
            'Apply dimensional modeling principles to a real business domain'
          ],
          sections: [
            { heading: 'Facts and dimensions', body: 'Fact tables store measurable business events — sales transactions, website clicks, support tickets — with numeric measures and foreign keys to dimensions. Dimension tables describe the context: who, what, where, when. This separation makes queries intuitive (filter by dimension, aggregate fact measures) and is the foundation of every major BI tool.' },
            { heading: 'Star vs snowflake schema', body: 'A star schema denormalizes dimensions into single wide tables — one join from fact to each dimension. Snowflake schemas normalize dimensions into sub-dimensions, saving storage but complicating queries. For BI reporting, star schemas win: fewer joins mean faster queries and simpler DAX/Tableau calculations.' },
            { heading: 'Slowly changing dimensions', body: 'Dimension attributes change over time — customers move, products get re-categorized. SCD Type 1 overwrites old values; Type 2 adds a new row with effective dates to preserve history; Type 3 adds a column for the previous value. Choosing the right type depends on whether historical accuracy or simplicity matters more.' }
          ],
          links: [
            { title: 'Data warehouse design overview', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/fundamentals/schemas', sourceName: 'SQL Documentation', resourceType: 'guide', relationship: 'Database schema concepts including fact and dimension design.' },
            { title: 'Star schema modeling', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/fact-tables', sourceName: 'SQL Documentation', resourceType: 'reference', relationship: 'Fact table structure, grain and aggregation guidance.' },
            { title: 'Dimension tables guide', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/dimension-tables', sourceName: 'SQL Documentation', resourceType: 'reference', relationship: 'Dimension table design patterns and surrogate keys.' }
          ],
          quiz: {
            prompt: 'A sales fact table contains product_id, store_id, date_key and total_amount. The product team needs to track when a product changes category. Which SCD type preserves category history?',
            options: [
              'SCD Type 1 — overwrite the category',
              'SCD Type 2 — add a new row with effective start and end dates',
              'SCD Type 3 — add a previous_category column',
              'None — categories never change'
            ],
            answerIndex: 1,
            explanation: 'SCD Type 2 creates a new dimension row with date boundaries, allowing historical fact rows to join to the correct category version.'
          }
        },
        {
          slug: 'data-quality-and-validation',
          title: 'Data Quality, Validation & Testing',
          minutes: 25,
          objectives: [
            'Implement data quality checks at each pipeline stage',
            'Write SQL-based data tests for completeness, accuracy and consistency',
            'Build alerting and reconciliation processes for production warehouses'
          ],
          sections: [
            { heading: 'Quality dimensions', body: 'BI teams depend on data that is complete (no unexpected nulls), accurate (values match source of truth), consistent (same definition across reports), timely (loaded by SLA) and unique (no duplicate fact rows). Measuring these dimensions with automated checks turns "we think the data is right" into "we verified the data is right."' },
            { heading: 'Testing patterns', body: 'A good starting point is to assert row counts match expectations between source and warehouse, check that foreign keys resolve to valid dimension rows, verify that fact measures fall within expected ranges, and ensure dimension attributes are not null where required. These checks run as part of the pipeline and fail fast on anomalies.' },
            { heading: 'Reconciliation and alerting', body: 'Reconciliation compares warehouse totals against source system totals daily. If daily revenue in the warehouse differs from the transaction system by more than a threshold, alert the team. Automated alerts — not manual spreadsheet checks — catch issues before downstream consumers see bad numbers. Document reconciliation logic so any team member can investigate.' }
          ],
          links: [
            { title: 'Data quality best practices', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/data-quality/data-quality-best-practices', sourceName: 'SQL Documentation', resourceType: 'guide', relationship: 'Data quality management patterns and frameworks.' },
            { title: 'Data validation in SSIS', url: 'https://learn.microsoft.com/en-us/sql/integration-services/data-flow/validation-in-data-flows', sourceName: 'SQL Documentation', resourceType: 'reference', relationship: 'Built-in data flow validation mechanisms.' },
            { title: 'Alerting with SQL Server', url: 'https://learn.microsoft.com/en-us/sql/ssms/agent/alerts', sourceName: 'SQL Documentation', resourceType: 'reference', relationship: 'Configuring SQL Server Agent alerts for data monitoring.' }
          ],
          quiz: {
            prompt: 'A daily pipeline loads 50,000 orders but the source system reported 52,300 orders for the same day. What is the first check to perform?',
            options: [
              'Check if the warehouse has enough storage',
              'Compare the source query filters against the ETL extraction logic',
              'Restart the pipeline to reload',
              'Delete and reload the entire table'
            ],
            answerIndex: 1,
            explanation: 'A count mismatch usually means the extraction query filters out rows differently than expected. Verify the WHERE clauses and incremental logic before assuming a pipeline bug.'
          }
        }
      ]
    },
    {
      slug: 'power-bi-reporting',
      stage: 'Intermediate',
      title: 'Power BI Report Design & DAX',
      description: 'Building interactive Power BI reports with DAX measures, data modeling and professional formatting for business stakeholders.',
      topics: [
        {
          slug: 'power-bi-data-model',
          title: 'Power BI Data Modeling & Import',
          minutes: 30,
          objectives: [
            'Connect Power BI to SQL data sources and configure import or DirectQuery modes',
            'Build a Power BI data model with relationships, hierarchies and calculated columns',
            'Apply Power Query transformations to shape data before loading'
          ],
          sections: [
            { heading: 'Connecting to data sources', body: 'Power BI connects to SQL Server, Azure Synapse, flat files and web APIs through Power Query. Import mode loads data into the VertiPaq in-memory engine for fast queries; DirectQuery sends queries live to the source for large datasets that cannot fit in memory. Choosing between them is the first architectural decision for any report.' },
            { heading: 'Relationships and model design', body: 'Power BI uses a star schema internally: one-to-many relationships from dimensions to facts with a single active relationship per pair. Cross-filter direction, cardinality settings and relationship activation control how filters propagate. A well-designed model means measures work correctly without complex DAX workarounds.' },
            { heading: 'Power Query transformations', body: 'The Power Query editor applies steps sequentially: rename columns, change types, merge and append queries, unpivot columns, filter rows and split columns. Each step is M code generated from the GUI — you can edit it directly for logic the GUI cannot express. Keep transformations in Power Query rather than DAX when possible for better performance.' }
          ],
          links: [
            { title: 'Power BI data sources', url: 'https://learn.microsoft.com/en-us/power-bi/connect-data/', sourceName: 'Microsoft Learn', resourceType: 'documentation', relationship: 'Complete list of supported data connectors.' },
            { title: 'Model relationships guide', url: 'https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-relationships', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'How to create and configure model relationships.' },
            { title: 'Power Query M reference', url: 'https://learn.microsoft.com/en-us/powerquery-m/m-query', sourceName: 'Power BI Documentation', resourceType: 'reference', relationship: 'M language documentation for advanced transformations.' }
          ],
          quiz: {
            prompt: 'A Power BI report filters a fact table by a date range, but related dimension tables are not filtered. What is the likely cause?',
            options: [
              'The fact table is too large',
              'The relationship cardinality is set incorrectly or the filter direction is single-way',
              'DirectQuery is enabled',
              'DAX measures are not defined'
            ],
            answerIndex: 1,
            explanation: 'If the relationship cardinality is incorrectly set (e.g., one-to-one instead of one-to-many) or filter direction is single, dimension tables do not receive the filter context from the fact table.'
          }
        },
        {
          slug: 'dax-measures-and-time-intelligence',
          title: 'DAX Measures & Time Intelligence',
          minutes: 30,
          objectives: [
            'Write DAX measures for totals, averages, ratios and percentage calculations',
            'Apply time intelligence functions for year-over-year, month-to-date and rolling averages',
            'Understand filter context and row context in DAX evaluation'
          ],
          sections: [
            { heading: 'Filter context and row context', body: 'DAX evaluates measures inside a filter context — the set of filters applied by slicers, visual interactions and page-level filters. Row context exists inside calculated columns and iterators (SUMX, AVERAGEX) and represents the current row. Confusing these two contexts is the most common DAX mistake and causes measures that look right in one visual but break in another.' },
            { heading: 'Core DAX patterns', body: 'CALCULATE modifies filter context — it is the most powerful DX function. Totals use SUM; ratios use DIVIDE for safe division. Iterator functions (SUMX, AVERAGEX) evaluate row by row for complex calculations. Variables (VAR/RETURN) store intermediate results and make complex measures readable and debuggable.' },
            { heading: 'Time intelligence functions', body: 'DAX has built-in time intelligence: TOTALYTD, SAMEPERIODLASTYEAR, DATEADD, RUNNINGTOTAL. These require a properly marked date table with contiguous dates. Year-over-year growth, month-to-date totals and 12-month rolling averages are standard business metrics that rely on these functions. Always mark your date table as a date table in the model.' }
          ],
          links: [
            { title: 'DAX overview', url: 'https://learn.microsoft.com/en-us/dax/', sourceName: 'Microsoft Learn', resourceType: 'documentation', relationship: 'Official DAX function reference and concepts.' },
            { title: 'Time intelligence in DAX', url: 'https://learn.microsoft.com/en-us/dax/time-intelligence-functions-dax', sourceName: 'Power BI Documentation', resourceType: 'reference', relationship: 'Complete time intelligence function catalog.' },
            { title: 'CALCULATE function', url: 'https://learn.microsoft.com/en-us/dax/calculate-function-dax', sourceName: 'Microsoft Learn', resourceType: 'reference', relationship: 'CALCULATE semantics, filter modification and examples.' }
          ],
          quiz: {
            prompt: 'A DAX measure uses SUM(Sales[Revenue]) and is placed in a card visual filtered to Q1 2024. What does the measure evaluate?',
            options: [
              'Total revenue for all time',
              'Total revenue for Q1 2024 — the filter context from the slicer is applied',
              'Average revenue per transaction in Q1',
              'The revenue of the last transaction'
            ],
            answerIndex: 1,
            explanation: 'Measures evaluate within the current filter context. The Q1 2024 slicer filters the data before SUM aggregates it.'
          }
        },
        {
          slug: 'power-bi-visuals-and-publishing',
          title: 'Report Design, Visuals & Publishing',
          minutes: 30,
          objectives: [
            'Select and configure appropriate visuals for different business questions',
            'Apply formatting, themes and accessibility best practices',
            'Publish reports to the Power BI service and configure row-level security'
          ],
          sections: [
            { heading: 'Choosing the right visual', body: 'Bar charts compare categories; line charts show trends; maps display geographic data; tables present detail rows. Use cards for single KPIs, slicers for interactive filtering, and drill-through pages for detailed analysis. Every visual should answer a specific question — if you cannot articulate the question, the visual should not exist.' },
            { heading: 'Formatting and accessibility', body: 'Consistent themes, color-blind-safe palettes, meaningful titles and alt text make reports professional and accessible. Use conditional formatting sparingly for emphasis. Tooltips should add context, not repeat the visual. A well-formatted report communicates faster than a data dump — invest in presentation.' },
            { heading: 'Publishing and security', body: 'Publish to the Power BI service for sharing, scheduling refresh and configuring access. Row-level security (RLS) restricts data per user without separate reports. Workspaces organize reports by team or project. Configure gateway connections for on-premises data sources and set up automated refresh to keep reports current.' }
          ],
          links: [
            { title: 'Power BI visuals catalog', url: 'https://learn.microsoft.com/en-us/power-bi/visuals/', sourceName: 'Microsoft Learn', resourceType: 'documentation', relationship: 'Documentation for every built-in Power BI visual.' },
            { title: 'Report design best practices', url: 'https://learn.microsoft.com/en-us/power-bi/create-reasts/desktop-report-guidelines', sourceName: 'Power BI Documentation', resourceType: 'guide', relationship: 'Microsoft guidelines for effective report design.' },
            { title: 'Row-level security', url: 'https://learn.microsoft.com/en-us/power-bi/enterprise/service-admin-rls', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Configuring and managing row-level security in Power BI.' }
          ],
          quiz: {
            prompt: 'A marketing manager needs to see only their region\'s data in a shared Power BI report. Which feature achieves this without creating separate reports?',
            options: [
              'Filters on each visual',
              'Row-level security with DAX role definitions',
              'Bookmark pages per region',
              'A custom visual for region filtering'
            ],
            answerIndex: 1,
            explanation: 'Row-level security restricts data at the model level using DAX filter expressions, so each user sees only the data permitted by their role.'
          }
        }
      ]
    },
    {
      slug: 'tableau-and-delivery',
      stage: 'Advanced',
      title: 'Tableau Dashboards & BI Delivery',
      description: 'Building Tableau dashboards, optimizing performance, and delivering BI solutions that operational teams rely on weekly.',
      topics: [
        {
          slug: 'tableau-connection-and-worksheets',
          title: 'Tableau Data Connections & Worksheets',
          minutes: 30,
          objectives: [
            'Connect Tableau to SQL databases and prepare data with joins, blends and extracts',
            'Build calculated fields and table calculations for business metrics',
            'Use worksheets as building blocks for complex dashboard layouts'
          ],
          sections: [
            { heading: 'Connecting Tableau to data', body: 'Tableau connects to virtually any data source through its connector framework. Live connections query the source directly; extracts create Tableau Hyper snapshots optimized for fast analytics. Blending combines data from different sources using a shared dimension. For large warehouses, extracts with incremental refresh give the best balance of speed and freshness.' },
            { heading: 'Calculated fields and table calculations', body: 'Calculated fields create new measures and dimensions from existing data — profit ratio, days since last order, custom groupings. Table calculations compute across the result set without hitting the source — running totals, percent of total, moving averages. The difference matters: calculated fields push computation to the source; table calculations run locally in Tableau.' },
            { heading: 'Worksheet design patterns', body: 'Each worksheet in Tableau holds one visual. Sheets are composed into dashboards with layout containers, floating elements and interactive actions. Build simple sheets first, then combine them — a sheet that is confusing in isolation will be worse in a dashboard. Name sheets descriptively so building the dashboard is a layout task, not a debugging task.' }
          ],
          links: [
            { title: 'Tableau data connections', url: 'https://help.tableau.com/current/pro/desktop/en-us/datasource.htm', sourceName: 'Tableau Documentation', resourceType: 'documentation', relationship: 'Official guide to connecting Tableau to data sources.' },
            { title: 'Calculated fields guide', url: 'https://help.tableau.com/current/pro/desktop/en-us/calculations.htm', sourceName: 'Tableau Documentation', resourceType: 'guide', relationship: 'Creating and using calculated fields in Tableau.' },
            { title: 'Table calculations', url: 'https://help.tableau.com/current/pro/desktop/en-us/table_calculations.htm', sourceName: 'Tableau Documentation', resourceType: 'guide', relationship: 'Running totals, percent of total, and custom table calculations.' }
          ],
          quiz: {
            prompt: 'A Tableau dashboard loads slowly with a live connection to a 100 million row table. What is the first optimization to try?',
            options: [
              'Add more color to the worksheet',
              'Create an extract with incremental refresh instead of a live connection',
              'Use a different chart type',
              'Increase the Tableau Server memory'
            ],
            answerIndex: 1,
            explanation: 'Extracts snapshot the data into Tableau\'s optimized Hyper engine, dramatically improving query speed while supporting incremental refresh for freshness.'
          }
        },
        {
          slug: 'tableau-dashboards-and-interactivity',
          title: 'Dashboard Design & Interactivity',
          minutes: 28,
          objectives: [
            'Design dashboards with clear visual hierarchy and purpose',
            'Implement filter actions, parameter actions and dashboard actions',
            'Apply design principles that support fast decision-making'
          ],
          sections: [
            { heading: 'Visual hierarchy and layout', body: 'Place the most important KPI or chart at the top left — where eyes start. Use layout containers for responsive sizing. Group related visuals together and separate unrelated ones with whitespace. Every dashboard should have a clear narrative flow: overview first, details on drill-through. If a stakeholder must search for the answer, the layout has failed.' },
            { heading: 'Interactive actions', body: 'Filter actions let one chart drive another — click a bar to filter a detail table. Parameter actions enable dynamic calculations and scenario modeling. URL actions link to external systems. Use actions to create guided analytics paths where users explore data at their own pace without getting lost.' },
            { heading: 'Performance tuning', body: 'Reduce the number of marks (data points) per visual — aggregate before displaying. Limit quick filters on the dashboard and use context filters to narrow data early. Avoid excessive LOD expressions in dashboard-level calculations. Profile performance with the Performance Recorder to identify slow sheets before users do.' }
          ],
          links: [
            { title: 'Dashboard design guide', url: 'https://help.tableau.com/current/pro/desktop/en-us/dashboards.htm', sourceName: 'Tableau Documentation', resourceType: 'guide', relationship: 'Building and designing dashboards in Tableau.' },
            { title: 'Dashboard actions', url: 'https://help.tableau.com/current/pro/desktop/en-us/actions.htm', sourceName: 'Tableau Documentation', resourceType: 'reference', relationship: 'Filter, highlight, URL and parameter actions reference.' },
            { title: 'Performance best practices', url: 'https://help.tableau.com/current/pro/desktop/en-us/perf_optimize.htm', sourceName: 'Tableau Documentation', resourceType: 'guide', relationship: 'Tableau performance optimization guidelines.' }
          ],
          quiz: {
            prompt: 'A dashboard has 15 quick filters on a single page and loads in 12 seconds. Which change would most improve the user experience?',
            options: [
              'Add more filters to increase flexibility',
              'Reduce the number of filters and use dashboard filter actions instead',
              'Switch to a live database connection',
              'Use a 3D chart to show more data'
            ],
            answerIndex: 1,
            explanation: 'Every quick filter adds query overhead. Dashboard actions let users filter interactively on demand, reducing the initial load time and cognitive overhead.'
          }
        },
        {
          slug: 'bi-governance-and-stakeholder-delivery',
          title: 'BI Governance, Deployment & Stakeholder Delivery',
          minutes: 28,
          objectives: [
            'Establish BI governance policies for data definitions and report ownership',
            'Plan and execute a report deployment from development to production',
            'Communicate BI insights to non-technical stakeholders effectively'
          ],
          sections: [
            { heading: 'Governance framework', body: 'BI governance defines who can publish reports, how data is certified, and what metrics are official. A data catalog documents every metric definition. Certified datasets prevent analysts from building reports on unvetted data. Governance is not bureaucracy — it prevents the common problem where two dashboards show different numbers for the same metric.' },
            { heading: 'Deployment lifecycle', body: 'Move reports through development, test and production workspaces. Use version control for DAX/M queries, deployment pipelines for workspace promotion, and change logs for stakeholder communication. Test with production-like data volumes before go-live. Schedule refreshes and monitor for failures with automated alerts.' },
            { heading: 'Stakeholder communication', body: 'Operational teams use BI reports weekly — they need to trust the numbers and know who to contact when something looks wrong. Provide a data dictionary, highlight metric definitions, and add a "last refreshed" timestamp. Hold regular office hours where stakeholders can ask questions. A report nobody trusts is worse than no report at all.' }
          ],
          links: [
            { title: 'Power BI deployment pipelines', url: 'https://learn.microsoft.com/en-us/power-bi/create-reasts/service-cicd-pipelines-introduction', sourceName: 'Microsoft Learn', resourceType: 'documentation', relationship: 'CI/CD deployment pipeline for Power BI workspaces.' },
            { title: 'Tableau Server administration', url: 'https://help.tableau.com/current/online/en-us/server.htm', sourceName: 'Tableau Documentation', resourceType: 'documentation', relationship: 'Administering Tableau Server for report deployment and governance.' },
            { title: 'Data governance overview', url: 'https://learn.microsoft.com/en-us/power-bi/admin/service-admin-introduction', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Power BI admin portal and tenant settings for governance.' }
          ],
          quiz: {
            prompt: 'Two teams publish separate Power BI reports showing different revenue totals for the same month. What governance practice would prevent this?',
            options: [
              'Set a maximum of one report per workspace',
              'Establish a certified dataset with a single source of truth and require reports to use it',
              'Disable publishing for non-admins',
              'Schedule both reports to refresh at different times'
            ],
            answerIndex: 1,
            explanation: 'A certified dataset with an approved metric definition ensures all reports derive numbers from the same source, eliminating conflicting values.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Sales Analytics Warehouse & Dashboard',
    coverage: [
      'SQL Querying',
      'Star Schema Design',
      'ETL Pipeline Planning',
      'Power BI Data Modeling',
      'DAX Measures',
      'Tableau Dashboard Design'
    ],
    brief:
      'Design a complete BI solution for a retail company: a star schema data warehouse, ETL pipeline specification, a Power BI report with DAX measures, and a Tableau dashboard plan — all aligned to answer the same set of business questions.',
    requirements: [
      'Star schema with at least 2 fact tables and 4 dimension tables, including surrogate keys and SCD strategy',
      'SQL DDL scripts for warehouse tables with appropriate indexes and constraints',
      'ETL pipeline specification: extraction strategy, transformation steps, load approach and error handling',
      'Power BI data model with at least 5 DAX measures including time intelligence',
      'Tableau dashboard wireframe with 4-6 visuals, filter strategy and interactivity plan',
      'Data quality validation checklist for production deployment'
    ],
    expectedOutput:
      'A BI solution specification another developer and analyst could implement and maintain independently.',
    rubric: [
      { skill: 'Data Modeling', weight: 25, criteria: 'Correct star schema design with proper grain, surrogate keys and SCD handling' },
      { skill: 'SQL Proficiency', weight: 20, criteria: 'Accurate DDL with appropriate data types, indexes, constraints and partitioning strategy' },
      { skill: 'ETL Design', weight: 20, criteria: 'Practical pipeline with incremental loading, error handling and monitoring' },
      { skill: 'Power BI & DAX', weight: 20, criteria: 'Well-modeled dataset with correct DAX measures and appropriate time intelligence' },
      { skill: 'Visualization & Delivery', weight: 15, criteria: 'Clear dashboard design with logical layout, appropriate chart selection and stakeholder communication' }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'SQL Reporting Query Pack',
      stage: 'Beginner',
      objective: 'Write a set of SQL queries that answer common business questions: top products by revenue, monthly trends, customer segmentation and cohort analysis.',
      requirements: [
        'Top-10 products by revenue with percentage of total',
        'Monthly revenue trend with year-over-year growth using window functions',
        'Customer segmentation by order frequency and recency',
        'Cohort analysis: monthly retention rates for customers acquired in the last 12 months',
        'All queries include comments explaining business logic'
      ],
      skillsEvaluated: ['SQL Querying', 'Window Functions', 'Aggregation', 'Business Analysis'],
      dueDays: 10,
      difficulty: 'Foundational',
      submissionSpec: { instructions: 'Submit a .sql file with each query clearly labeled and a README explaining assumptions.', textLabel: 'SQL query file', minTextLength: 600 }
    },
    {
      title: 'Power BI Sales Report',
      stage: 'Intermediate',
      objective: 'Build a Power BI report connecting to a sample sales dataset with at least 5 DAX measures, a working star schema model and interactive visuals.',
      requirements: [
        'Star schema model with proper relationships and cardinality settings',
        'At least 5 DAX measures: total revenue, profit margin, YoY growth, rolling average and rank',
        'A date table marked as a date table for time intelligence',
        'Interactive slicers for date range, product category and region',
        'At least one drill-through page for detailed transaction analysis'
      ],
      skillsEvaluated: ['Power BI', 'DAX', 'Data Modeling', 'Report Design'],
      dueDays: 18,
      difficulty: 'Intermediate',
      submissionSpec: { instructions: 'Submit the .pbix file or screenshots with a written walkthrough of your DAX measures and design decisions.', textLabel: 'Power BI report and design walkthrough', minTextLength: 900, linkLabels: ['Power BI file or screenshot gallery'] }
    },
    {
      title: 'Tableau Dashboard with Governance Plan',
      stage: 'Advanced',
      objective: 'Design a Tableau dashboard for a supply chain team and write a governance plan for maintaining it in production.',
      requirements: [
        'Dashboard with at least 5 worksheets covering KPIs, trends and detail views',
        'Calculated fields for custom logistics metrics (on-time rate, cost per unit, etc.)',
        'Filter actions and parameter actions for guided analysis',
        'A governance document covering ownership, refresh schedule, access control and change management',
        'A data dictionary defining every metric and dimension shown in the dashboard'
      ],
      skillsEvaluated: ['Tableau', 'Dashboard Design', 'BI Governance', 'Documentation'],
      dueDays: 22,
      difficulty: 'Advanced',
      submissionSpec: { instructions: 'Submit the Tableau workbook (or equivalent screenshots), governance document and data dictionary.', textLabel: 'Tableau workbook and governance plan', minTextLength: 1100, linkLabels: ['Tableau workbook or dashboard screenshots'] }
    }
  ],

  simTasks: [
    {
      title: 'P0: Revenue dashboard shows negative margins',
      context: 'The weekly revenue dashboard used by the CFO now shows a -15% margin for last month. Finance flagged it at Monday morning\'s review. The ETL ran successfully and no schema changes were deployed.',
      requirements: [
        'Investigate likely root causes (data type changes, null handling, currency conversion, new product categories)',
        'Propose a quick validation query against the source system to verify the numbers',
        'Outline steps to identify whether the issue is in extraction, transformation or DAX calculation',
        'Suggest a temporary stakeholder communication while the issue is resolved'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Incident note: investigation plan, validation queries, communication template and fix approach.',
      skills: ['SQL Debugging', 'DAX Debugging', 'Data Validation', 'Stakeholder Communication']
    },
    {
      title: 'New warehouse schema for marketing attribution',
      context: 'The marketing team wants a new fact table tracking campaign touchpoints across channels (email, paid, organic) with first-touch and multi-touch attribution models. The existing warehouse has a campaigns dimension but no touchpoint tracking.',
      requirements: [
        'Design the new fact table schema with appropriate grain and foreign keys',
        'Define the multi-touch attribution logic (linear, time-decay, or position-based)',
        'Plan the ETL pipeline to extract touchpoint data from Google Analytics and email platform APIs',
        'Specify how the new fact table integrates with existing sales facts for cross-analysis'
      ],
      priority: 'normal',
      dueDayOffset: 5,
      expectedOutput: 'Schema design document with DDL, attribution logic specification and ETL pipeline plan.',
      skills: ['Data Modeling', 'ETL Design', 'Schema Design', 'Business Requirements']
    },
    {
      title: 'Performance optimization for a slow Tableau dashboard',
      context: 'The operations team\'s Tableau dashboard takes 90 seconds to load. It connects via DirectQuery to a SQL warehouse. The query involves a 500M row fact table and 8 dimensions with multiple LOD expressions.',
      requirements: [
        'Profile the dashboard to identify the slowest worksheets and queries',
        'Recommend extract vs DirectQuery strategy with justification',
        'Propose specific LOD expression rewrites to reduce computation',
        'Suggest warehouse-side optimizations (indexes, materialized views, summary tables)'
      ],
      priority: 'high',
      dueDayOffset: 3,
      expectedOutput: 'Performance audit report with specific recommendations and expected impact estimates.',
      skills: ['Tableau Performance', 'SQL Optimization', 'LOD Expressions', 'Dashboard Tuning']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Priya Desai',
      personaRole: 'Data Engineer',
      situation: 'Disagreement on warehouse schema approach.',
      openingMessage:
        'I want to normalize the warehouse into a snowflake schema to save storage and keep dimensions consistent with the source. You prefer a denormalized star schema for report performance. Can we discuss before the architecture review?',
      expectedPoints: [
        'Acknowledges storage efficiency concern but prioritizes query performance for BI tools',
        'Names concrete trade-offs: query simplicity vs storage cost, Power BI/Tableau join behavior',
        'Asks clarifying questions about data volume, refresh requirements and team SQL skills',
        'Proposes a hybrid approach or a proof-of-concept benchmark to settle the decision'
      ]
    },
    {
      kind: 'team',
      personaName: 'Marcus Chen',
      personaRole: 'Frontend Developer',
      situation: 'Embedding Power BI report in a customer portal.',
      openingMessage:
        'The product team wants to embed our Power BI report in the customer-facing portal. I need to know about row-level security, API limitations and how to handle authentication. Can you walk me through the integration?',
      expectedPoints: [
        'Explains RLS configuration and service principal authentication for embedding',
        'Describes the Power BI REST API and embedding SDK limitations',
        'Addresses performance considerations: cached vs live queries, refresh cadence',
        'Provides a phased integration plan with a development environment for testing'
      ]
    },
    {
      kind: 'client',
      personaName: 'Karen Whitfield',
      personaRole: 'VP of Operations, GreenSupply',
      situation: 'Client wants a real-time dashboard but budget only supports daily refresh.',
      openingMessage:
        'We need our inventory dashboard to update in real-time — our warehouse managers cannot wait until the next morning. Your proposal says daily refresh. Can we make it real-time within the same budget?',
      expectedPoints: [
        'Explains the cost and infrastructure difference between real-time and daily refresh',
        'Identifies which metrics truly need real-time and which can tolerate daily updates',
        'Proposes a hybrid approach: critical alerts real-time, historical dashboards daily',
        'Offers a phased plan: daily first, then upgrade the most critical views to near-real-time'
      ]
    },
    {
      kind: 'client',
      personaName: 'Ahmad Nassiri',
      personaRole: 'CFO, BrightMetrics',
      situation: 'Two conflicting revenue numbers in different reports.',
      openingMessage:
        'The board meeting is Thursday and I have two different revenue numbers — the finance report says $4.2M and the operations dashboard says $3.9M for the same month. Which one is correct and how do we prevent this from happening again?',
      expectedPoints: [
        'Acknowledges the urgency and takes the discrepancy seriously',
        'Investigates the root cause: different source tables, filters, or calculation logic',
        'Provides the corrected number with a clear explanation of the discrepancy',
        'Proposes a governance measure: certified metrics, a single source of truth, and a validation process'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Incident',
      situation: 'Wednesday 10:00: The executive sales dashboard shows $0 revenue for today. The ETL job completed at 06:00 without errors. Yesterday\'s numbers are correct.',
      requiredActions: [
        { action: 'Check the ETL logs to confirm the correct number of rows were extracted and loaded', good: true, note: 'ETL success does not mean data correctness — verify row counts and key values against the source.' },
        { action: 'Query the fact table directly to verify whether today\'s transactions exist in the warehouse', good: true, note: 'Directly inspecting the warehouse table isolates whether the issue is extraction, transformation or report layer.' },
        { action: 'Check if the report uses a date filter that excludes today\'s data', good: true, note: 'Report-level filters are a common cause of "missing" data that is actually present in the warehouse.' },
        { action: 'Dismiss the issue and tell the stakeholder to check again tomorrow', good: false, note: 'Ignoring stakeholder reports damages trust and allows data issues to compound.' }
      ]
    },
    {
      category: 'Ethical dilemma',
      situation: 'A sales director asks you to modify the dashboard to exclude a region from the quarterly revenue total because "those deals are being reclassified" — but there is no reclassification ticket and the region is underperforming.',
      requiredActions: [
        { action: 'Refuse the modification and explain that removing data without a documented business justification compromises report integrity', good: true, note: 'Manipulating reports to serve political agendas violates BI ethics and stakeholder trust.' },
        { action: 'Implement the change to avoid conflict with the sales director', good: false, note: 'Altering reported data under pressure without justification undermines your role as a neutral data provider.' },
        { action: 'Ask the director to submit a formal request with business justification and route it through the governance process', good: true, note: 'A governance process ensures changes are documented, justified and reversible.' },
        { action: 'Escalate to your manager if the director insists without justification', good: true, note: 'Escalation protects both the integrity of the reports and your professional standing.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between a star schema and a snowflake schema. When would you choose each?',
      guidancePoints: [
        'Star schema denormalizes dimensions for faster joins and simpler DAX',
        'Snowflake normalizes dimensions to reduce storage and enforce consistency',
        'BI tools favor star schemas for performance and simplicity',
        'Snowflake suits environments where storage cost is a primary constraint'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'What is the difference between CALCULATE and FILTER in DAX? When would you use each?',
      guidancePoints: [
        'CALCULATE modifies filter context with explicit filter arguments',
        'FILTER iterates over a table and returns rows meeting a condition',
        'CALCULATE with filter arguments is often faster because it leverages the storage engine',
        'FILTER is useful for complex row-level conditions that CALCULATE cannot express concisely'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A Power BI report takes 45 seconds to load and the stakeholder needs it under 5 seconds. Walk through your optimization approach.',
      guidancePoints: [
        'Profile the report with Performance Analyzer to identify slow visuals and DAX measures',
        'Check for large cardinality columns that bloat the VertiPaq model',
        'Evaluate whether DirectQuery can be replaced with an optimized extract',
        'Optimize DAX: replace complex iterators with simpler patterns, use variables'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'The warehouse shows 100,000 orders but the source system shows 103,200. How do you investigate and resolve the discrepancy?',
      guidancePoints: [
        'Compare extraction queries with source system query filters',
        'Check for data type mismatches that silently drop rows during conversion',
        'Verify incremental loading logic: watermark boundaries, deduplication and CDC gaps',
        'Reconcile specific missing rows and trace them through each pipeline stage'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'A stakeholder requests a new metric on the dashboard that you know will be unreliable due to incomplete source data. How do you handle this?',
      guidancePoints: [
        'Communicate the data quality limitation clearly with specific examples',
        'Propose alternatives: delayed metric, estimated value with disclaimer, or source improvement',
        'Document the caveat on the dashboard if the metric is published',
        'Work with data engineering to improve source data completeness for future delivery'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'You discover that the DAX measure the team has been using for revenue is double-counting due to a join issue. It has been in production for three months. What do you do?',
      guidancePoints: [
        'Assess the scope of the impact: which reports and decisions were affected',
        'Fix the measure immediately and validate against source totals',
        'Communicate the correction to all affected stakeholders with an explanation',
        'Implement a reconciliation check to catch similar issues proactively'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain the difference between row-level security and object-level security to a non-technical business manager.',
      guidancePoints: [
        'RLS restricts which rows a user sees (e.g., only their region)',
        'OLS restricts which columns or measures a user sees (e.g., salary data)',
        'Both control access without creating separate reports',
        'Use a relatable analogy: RLS is like a filtered view; OLS is like hiding columns'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Write a weekly data quality report email for the operations team explaining two anomalies found in this week\'s data load.',
      guidancePoints: [
        'Lead with a clear summary: what was found and its business impact',
        'Describe each anomaly with specific data examples and root cause',
        'Include the fix or mitigation already applied',
        'Provide a timeline for permanent resolution and prevention steps'
      ]
    }

  ]

}
