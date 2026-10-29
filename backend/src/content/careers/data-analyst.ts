import type { CareerDef } from '../framework.js'

export const dataAnalyst: CareerDef = {
  slug: 'data-analyst',
  name: 'Data Analyst',
  category: 'Business',
  order: 20,
  description:
    'Answers business questions with Excel, SQL, pandas, Power BI and Tableau through dashboards, KPIs and reporting.',
  difficulty: 'Beginner-friendly',
  pathSummary:
    'Excel, SQL & data foundations → data cleaning with pandas → visualization with Power BI & Tableau → analytics dashboards, KPIs & business reporting.',
  mainSkills: [
    'Excel for Data Analysis',
    'SQL Querying',
    'pandas Data Wrangling',
    'Data Visualization',
    'Power BI Dashboards',
    'Tableau Dashboards',
    'KPIs & Reporting',
    'Business Storytelling'
  ],
  sourcePlatforms: [
    'Microsoft Learn',
    'Microsoft Excel Documentation',
    'Power BI Documentation',
    'Tableau Documentation',
    'pandas',
    'SQL Documentation'
  ],
  companyName: 'Meridian Insights',
  roleTitle: 'Data Analyst',

  chapters: [
    {
      slug: 'excel-sql-foundations',
      stage: 'Beginner',
      title: 'Excel & SQL Foundations',
      description: 'The spreadsheet and query fundamentals every data analyst must master before touching dashboards.',
      topics: [
        {
          slug: 'excel-essentials',
          title: 'Excel Fundamentals for Analysts',
          minutes: 30,
          objectives: [
            'Use formulas, references and functions to build reliable spreadsheets',
            'Apply PivotTables and Power Query to summarize and clean data',
            'Build structured, auditable workbooks that others can read'
          ],
          sections: [
            { heading: 'Excel as the universal analysis tool', body: 'Excel is where business questions first become answerable. Absolute versus relative references, named ranges and well-organized worksheets keep calculations reliable as models grow. Every data analyst begins here because stakeholders already live in spreadsheets.' },
            { heading: 'Functions and formulas that matter', body: 'VLOOKUP/XLOOKUP, IF/SWITCH logic, SUMIFS/COUNTIFS aggregations and text functions like TEXT and CONCAT transform raw exports into meaningful summaries. Paired with conditional formatting you can spotlight outliers and trends without writing a single line of code.' },
            { heading: 'PivotTables and Power Query', body: 'PivotTables turn thousands of rows into a summary in seconds — group by dimension, filter, and slice by slicers. Power Query extends Excel into a lightweight ETL tool for connecting, transforming and combining data sources before analysis. Mastering both is the fastest path to reporting independence.' }
          ],
          links: [
            { title: 'Excel training and support', url: 'https://support.microsoft.com/en-us/excel', sourceName: 'Microsoft Excel Documentation', resourceType: 'tutorial', relationship: 'Official tutorials, functions reference and how-to guides for Microsoft Excel.' },
            { title: 'PivotTable how-to', url: 'https://support.microsoft.com/en-us/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576', sourceName: 'Microsoft Excel Documentation', resourceType: 'guide', relationship: 'Official walkthrough for creating and managing PivotTables.' },
            { title: 'Microsoft Learn Excel training', url: 'https://learn.microsoft.com/en-us/training/browse/?products=office&terms=excel', sourceName: 'Microsoft Learn', resourceType: 'course', relationship: 'Curated learning paths and courses for Excel skills on Microsoft Learn.' }
          ],
          quiz: {
            prompt: 'You need Excel to look up a customer\'s name by their ID stored in another table. Which function is the best fit?',
            options: [
              'SUMIF',
              'XLOOKUP',
              'COUNTIF',
              'CONCAT'
            ],
            answerIndex: 1,
            explanation: 'XLOOKUP searches for a value in one range and returns a matching value from another column — exactly the lookup-by-key job a customer ID lookup requires.'
          }
        },
        {
          slug: 'sql-fundamentals',
          title: 'SQL Query Fundamentals',
          minutes: 30,
          objectives: [
            'Write SELECT queries with filtering, sorting and aliasing',
            'Aggregate data with GROUP BY and HAVING',
            'Join tables to answer multi-source questions'
          ],
          sections: [
            { heading: 'Why SQL is non-negotiable', body: 'Business data lives in databases, and SQL is the universal language for retrieving it. A data analyst who queries directly can answer questions on demand instead of waiting on engineering. The SELECT-FROM-WHERE scaffold, with filtering and sorting, is the starting vocabulary every query builds on.' },
            { heading: 'Aggregation and grouping', body: 'GROUP BY collapses rows into summary groups, and aggregate functions like COUNT, SUM, AVG, MIN and MAX summarize within each group. HAVING filters the aggregated results — used for thresholds like "regions with revenue over $1M" — while WHERE filters rows before grouping.' },
            { heading: 'Joining data across tables', body: 'Relational data is scattered across many tables. INNER JOIN keeps matched rows, LEFT JOIN keeps all left-side rows plus matching right-side ones, and the choice depends on the question. Joining on the right key columns, watching for duplicates and nulls, is where real-world querying gets interesting.' }
          ],
          links: [
            { title: 'SQL Server documentation', url: 'https://learn.microsoft.com/en-us/sql/', sourceName: 'SQL Documentation', resourceType: 'documentation', relationship: 'Official Microsoft SQL Server documentation covering query syntax and concepts.' },
            { title: 'SQL Tutorial on W3Schools', url: 'https://www.w3schools.com/sql/', sourceName: 'SQL Documentation', resourceType: 'tutorial', relationship: 'Hands-on SQL tutorial covering SELECT, JOIN, GROUP BY and more.' },
            { title: 'Transact-SQL reference', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-reference', sourceName: 'SQL Documentation', resourceType: 'reference', relationship: 'Comprehensive T-SQL language reference for writing precise queries.' }
          ],
          quiz: {
            prompt: 'You want to see only products with total sales above $10,000, aggregated by product. Which clause enforces that filter?',
            options: [
              'WHERE total_sales > 10000',
              'HAVING SUM(sales) > 10000',
              'ORDER BY total_sales > 10000',
              'JOIN total_sales > 10000'
            ],
            answerIndex: 1,
            explanation: 'Filters on aggregated values must use HAVING. WHERE runs before grouping and cannot reference aggregate results like SUM(sales).'
          }
        },
        {
          slug: 'data-ethics-basics',
          title: 'Data Quality & Analytical Thinking',
          minutes: 25,
          objectives: [
            'Recognize common data-quality problems and their causes',
            'Verify results and question assumptions before reporting',
            'Translate a vague business question into a concrete analytical task'
          ],
          sections: [
            { heading: 'Critical data hygiene', body: 'Dirty data — duplicates, mismatched types, missing values, inconsistent categories — quietly corrupts every downstream number. Habits like always inspecting for nulls, checking cardinality of key fields, and validating totals before reporting distinguish a careful analyst from a careless one.' },
            { heading: 'Verification and skepticism', body: 'Trust, but verify. Cross-check a surprising result with a second method, confirm the row count matches expectations, and sanity-test against domain knowledge. A result that contradicts known reality is almost always a bug in the query before it is a real discovery.' },
            { heading: 'From business question to analysis', body: 'Stakeholders rarely state precise questions. "Why are sales down?" becomes a concrete plan: define the time window, decompose by region and channel, compare to baselines, and isolate likely drivers. Great analysts spend effort clarifying the question before crunching numbers.' }
          ],
          links: [
            { title: 'Excel data validation help', url: 'https://support.microsoft.com/en-us/office/apply-data-validation-to-cells-29fecbcc-b1b9-42c1-9d9e-de3823d8e866', sourceName: 'Microsoft Excel Documentation', resourceType: 'guide', relationship: 'Using Excel data validation rules to prevent bad data from entering spreadsheets.' },
            { title: 'Microsoft Learn data analyst paths', url: 'https://learn.microsoft.com/en-us/training/browse/?terms=data%20analyst', sourceName: 'Microsoft Learn', resourceType: 'course', relationship: 'Official learning paths covering data analysis foundations and tools.' },
            { title: 'Power Query and data cleaning', url: 'https://support.microsoft.com/en-us/office/about-power-query-in-excel-c3042cd0-6f5f-4a0f-9e9b-7f1c1b1f9b61', sourceName: 'Microsoft Excel Documentation', resourceType: 'guide', relationship: 'Using Power Query to connect, transform and clean data for analysis.' }
          ],
          quiz: {
            prompt: 'A query returns an unusually high average for a column. What should you do first?',
            options: [
              'Report it immediately as a finding',
              'Inspect the underlying data for outliers, nulls, or a query error',
              'Ignore it since averages are always reliable',
              'Change the filter until the number looks normal'
            ],
            answerIndex: 1,
            explanation: 'An unexpected result demands verification: check the data for outliers, missing values or join errors before trusting — let alone reporting — the number.'
          }
        }
      ]
    },
    {
      slug: 'cleaning-analysis-pandas',
      stage: 'Foundation',
      title: 'Data Cleaning & Analysis with pandas',
      description: 'Loading, cleaning and aggregating datasets programmatically with pandas, the analyst\'s Python workhorse.',
      topics: [
        {
          slug: 'python-pandas-setup',
          title: 'Python & pandas Setup',
          minutes: 30,
          objectives: [
            'Set up a Python environment with Jupyter and pandas',
            'Load tabular data from files and inspect its structure',
            'Use basic pandas operations to navigate a DataFrame'
          ],
          sections: [
            { heading: 'Python as the analyst\'s companion', body: 'Analysts increasingly reach for Python for tasks Excel handles poorly: automating repetitive reports, handling larger datasets and integrating with APIs. Jupyter notebooks pair code with narrative, making analysis reproducible and auditable by teammates.' },
            { heading: 'First steps with pandas', body: 'A pandas DataFrame is a labeled, two-dimensional structure that feels like a supercharged spreadsheet. Reading a CSV is one call; .head(), .info() and .describe() immediately reveal shape, dtypes and missing values. pandas converts raw files into a programmable analysis surface.' },
            { heading: 'Selecting and filtering', body: 'Column selection by name, row filtering with boolean conditions, and index-based selection via .loc[] and .iloc[] let you slice exactly the view a question needs. These selection idioms are the daily mechanics of pandas-powered investigation.' }
          ],
          links: [
            { title: '10 minutes to pandas', url: 'https://pandas.pydata.org/docs/user_guide/10min.html', sourceName: 'pandas', resourceType: 'tutorial', relationship: 'Rapid introduction to DataFrame construction, selection and aggregation in pandas.' },
            { title: 'pandas user guide', url: 'https://pandas.pydata.org/docs/user_guide/index.html', sourceName: 'pandas', resourceType: 'reference', relationship: 'Comprehensive documentation for pandas data manipulation.' },
            { title: 'pandas installation guide', url: 'https://pandas.pydata.org/getting_started.html', sourceName: 'pandas', resourceType: 'guide', relationship: 'Official installation and getting-started instructions for pandas.' }
          ],
          quiz: {
            prompt: 'After loading a CSV into a DataFrame, which call gives an instant view of column names, data types and non-null counts?',
            options: [
              'df.head()',
              'df.info()',
              'df.max()',
              'df.sort_values()'
            ],
            answerIndex: 1,
            explanation: 'df.info() prints a concise summary of each column\'s dtype and non-null count, exactly the structure overview you need right after loading data.'
          }
        },
        {
          slug: 'data-cleaning-pandas',
          title: 'Cleaning Messy Data with pandas',
          minutes: 30,
          objectives: [
            'Handle missing values with drop and fill strategies',
            'Remove and investigate duplicate rows',
            'Standardize types, categories and text formats'
          ],
          sections: [
            { heading: 'Dealing with missing values', body: 'Missing data is reality. .isna() and .sum() locate gaps; dropping rows or columns, filling with constants or group statistics, and forward-filling are the main strategies. The right choice depends on why data is missing — dropping at random is different from dropping because a column is systematically sparse.' },
            { heading: 'Duplicates, types and categories', body: '.duplicated() and .drop_duplicates() find and remove repeated rows that inflate counts. Converting strings to proper dtypes, parsing dates with to_datetime(), and standardizing category texts with .map() or .replace() make calculations correct and aggregations meaningful.' },
            { heading: 'Validating a clean dataset', body: 'Cleaning is only complete when verified: re-check null counts are zero, confirm row counts match expectations, and spot-check values against the original. A documented cleaning pipeline is reproducible and lets a teammate or auditor re-run your steps.' }
          ],
          links: [
            { title: 'pandas handling missing data', url: 'https://pandas.pydata.org/docs/user_guide/missing_data.html', sourceName: 'pandas', resourceType: 'guide', relationship: 'How to identify and handle missing values in DataFrames.' },
            { title: 'pandas cleaning recipes', url: 'https://pandas.pydata.org/docs/user_guide/merging.html', sourceName: 'pandas', resourceType: 'tutorial', relationship: 'Merging, concatenating and reshaping operations used in cleaning workflows.' },
            { title: 'pandas date/time tools', url: 'https://pandas.pydata.org/docs/user_guide/timeseries.html', sourceName: 'pandas', resourceType: 'guide', relationship: 'Working with dates and times, a common source of messy data.' }
          ],
          quiz: {
            prompt: 'Your sales table has duplicate order rows inflating the revenue total. Which pandas method resolves it?',
            options: [
              'df.fillna()',
              'df.drop_duplicates()',
              'df.pivot()',
              'df.astype()'
            ],
            answerIndex: 1,
            explanation: 'drop_duplicates() removes repeated rows, fixing inflated aggregates caused by duplicated records in the source data.'
          }
        },
        {
          slug: 'aggregation-analysis',
          title: 'Aggregation & Exploratory Analysis',
          minutes: 30,
          objectives: [
            'Summarize data with groupby and aggregate operations',
            'Use pivot tables and merges to reshape data',
            'Profile distributions and relationships to guide reporting'
          ],
          sections: [
            { heading: 'groupby for business questions', body: 'groupby() is the pandas answer to PivotTables: split data into groups and apply aggregations like sum, mean, count and custom functions. "Revenue by month", "orders by region", "avg ticket by customer segment" are all one or two chained lines with groupby.' },
            { heading: 'Pivots and merges', body: 'pivot_table() reshapes long data into a matrix of rows, columns and values — ideal for building comparison grids for reports. merge() and join() combine related tables, emulating SQL joins, so you can enrich analysis with customer, product or geography details kept in separate files.' },
            { heading: 'Profiling for reporting', body: 'Before building a final dashboard, profile your data: summary statistics, value distributions and basic correlations. This exploratory pass surfaces anomalies and shapes the story a dashboard will tell, so you report a real insight rather than a generic chart.' }
          ],
          links: [
            { title: 'pandas GroupBy operations', url: 'https://pandas.pydata.org/docs/user_guide/groupby.html', sourceName: 'pandas', resourceType: 'guide', relationship: 'Split-apply-combine mechanics behind groupby aggregation.' },
            { title: 'pandas pivot tables', url: 'https://pandas.pydata.org/docs/user_guide/reshaping.html', sourceName: 'pandas', resourceType: 'guide', relationship: 'Reshaping, pivoting and transposing data for analysis.' },
            { title: 'pandas merging and joining', url: 'https://pandas.pydata.org/docs/user_guide/merging.html', sourceName: 'pandas', resourceType: 'guide', relationship: 'Combining DataFrames with merge, join and concat operations.' }
          ],
          quiz: {
            prompt: 'Which pandas operation computes total revenue per product category in a single chain?',
            options: [
              'df.groupby("category")["revenue"].sum()',
              'df["revenue"].sum()',
              'df.drop_duplicates()["category"]',
              'df.sort_values("category")'
            ],
            answerIndex: 0,
            explanation: 'groupby("category") splits by category and ["revenue"].sum() sums revenue within each group — the exact split-apply-combine you need for per-category totals.'
          }
        }
      ]
    },
    {
      slug: 'visualization-powerbi-tableau',
      stage: 'Intermediate',
      title: 'Dashboards with Power BI & Tableau',
      description: 'Turning cleaned data into interactive dashboards, KPIs and guiding visuals used by business decision-makers.',
      topics: [
        {
          slug: 'visualization-principles',
          title: 'Visualization Principles & Chart Selection',
          minutes: 30,
          objectives: [
            'Choose the right chart type for the message and audience',
            'Eliminate clutter and apply consistent, accessible styling',
            'Design visuals that support a decision rather than decorate a page'
          ],
          sections: [
            { heading: 'Chart type by message', body: 'Bars compare categories, lines show trends over time, scatter plots reveal relationships, and histograms expose distributions. Choosing the chart that maps cleanly to the question is half the job — the wrong chart hides the finding no matter how pretty it looks.' },
            { heading: 'Design for clarity', body: 'Label axes and titles, highlight the key message, limit color to what carries meaning and respect accessibility contrast. Remove gridlines and noise that compete with the data. The highest compliment to a visualization is that its message is obvious in five seconds.' },
            { heading: 'From chart to decision', body: 'A dashboard is a decision tool, not a picture gallery. Every visual should answer a question a stakeholder actually asks. Frame visuals around a single insight, add context with targets or benchmarks, and guide the eye to the action the number implies.' }
          ],
          links: [
            { title: 'Power BI documentation', url: 'https://learn.microsoft.com/en-us/power-bi/', sourceName: 'Power BI Documentation', resourceType: 'documentation', relationship: 'Official Power BI documentation covering modeling, visuals and dashboards.' },
            { title: 'Power BI visuals overview', url: 'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-types-for-reports-and-dashboards', sourceName: 'Power BI Documentation', resourceType: 'guide', relationship: 'The chart types available in Power BI and when to use each.' },
            { title: 'Microsoft Learn Power BI training', url: 'https://learn.microsoft.com/en-us/training/powerplatform/power-bi/', sourceName: 'Microsoft Learn', resourceType: 'course', relationship: 'Structured learning paths for building Power BI reports and dashboards.' }
          ],
          quiz: {
            prompt: 'To show how monthly revenue has changed over the past two years, the clearest chart is…',
            options: [
              'A pie chart',
              'A line chart',
              'A scatter plot',
              'A histogram'
            ],
            answerIndex: 1,
            explanation: 'Line charts are purpose-built for showing change over a continuous dimension like time, making trends instantly visible.'
          }
        },
        {
          slug: 'powerbi-dashboards',
          title: 'Building Dashboards in Power BI',
          minutes: 30,
          objectives: [
            'Import and model data within Power BI',
            'Create measures and calculations with DAX',
            'Assemble an interactive report with slicers and filters'
          ],
          sections: [
            { heading: 'Data modeling in Power BI', body: 'Power BI Desktop connects to databases, Excel files and web sources, and models relationships between tables — the star schema of facts and dimensions is the backbone. Setting correct relationships and column types up front makes downstream measures reliable and fast.' },
            { heading: 'Measures with DAX', body: 'DAX lets analysts define business calculations — totals, year-over-year growth, running averages, ratios — that respond dynamically to slicers and filters. Measures live in the model, so the same KPI is computed consistently everywhere it appears.' },
            { heading: 'Interactive report design', body: 'A report combines visuals on a canvas with slicers, filters, drill-downs and cross-filtering so stakeholders explore the data themselves. Structure tab/page layouts by business area, add clear titles and tooltips, and publish to the service for sharing and scheduling refreshes.' }
          ],
          links: [
            { title: 'Create a report in Power BI', url: 'https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-report-view', sourceName: 'Power BI Documentation', resourceType: 'tutorial', relationship: 'Official walkthrough for building your first Power BI report.' },
            { title: 'DAX in Power BI', url: 'https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-quickstart-learn-dax-basics', sourceName: 'Power BI Documentation', resourceType: 'tutorial', relationship: 'Learn the basics of Data Analysis Expressions for measures.' },
            { title: 'Power BI data modeling', url: 'https://learn.microsoft.com/en-us/training/modules/build-first-dashboard-power-bi/', sourceName: 'Microsoft Learn', resourceType: 'course', relationship: 'Guided module on building dashboards end-to-end in Power BI.' }
          ],
          quiz: {
            prompt: 'You need a "year-over-year revenue growth" number that recalculates when a user changes the selected region. The right tool is…',
            options: [
              'A static text box',
              'A DAX measure',
              'A fixed column in the source data',
              'An image of a chart'
            ],
            answerIndex: 1,
            explanation: 'DAX measures compute dynamically in response to filters and slicers, so a YoY growth measure recalculates for whatever region or period the user selects.'
          }
        },
        {
          slug: 'tableau-dashboards',
          title: 'Building Dashboards in Tableau',
          minutes: 30,
          objectives: [
            'Connect to data sources and prepare worksheets',
            'Create views with marks, rows, columns and shelves',
            'Assemble sheets into an interactive Tableau dashboard'
          ],
          sections: [
            { heading: 'Tableau basics', body: 'Tableau Desktop connects to live and in-memory data and builds views by dragging fields onto rows, columns, color, size and filter shelves. Its visual-first workflow lets analysts iterate quickly from raw data to a compelling view without writing code.' },
            { heading: 'Calculations and interactivity', body: 'Tableau supports calculated fields, sets, parameters and quick table calculations for growth, ranking and running totals. Filters, highlighting actions and dashboard parameters make a static worksheet interactive so users can drill into the dimensions that matter.' },
            { heading: 'Assembling the dashboard', body: 'A dashboard arranges worksheets, filters and text into a unified story for a specific audience. Consistent sizing, clear titles and carefully wired interactions let stakeholders answer follow-up questions without a new request to the analyst.' }
          ],
          links: [
            { title: 'Tableau help and documentation', url: 'https://help.tableau.com/current/pro/desktop/en-us/default.htm', sourceName: 'Tableau Documentation', resourceType: 'documentation', relationship: 'Official Tableau Desktop user guide and reference documentation.' },
            { title: 'Tableau getting started', url: 'https://help.tableau.com/current/pro/desktop/en-us/gettingstarted_overview.htm', sourceName: 'Tableau Documentation', resourceType: 'tutorial', relationship: 'Step-by-step introduction to building your first Tableau views.' },
            { title: 'Tableau calculated fields', url: 'https://help.tableau.com/current/pro/desktop/en-us/calculations_calculatedfields.htm', sourceName: 'Tableau Documentation', resourceType: 'guide', relationship: 'How to create and use calculated fields and table calculations.' }
          ],
          quiz: {
            prompt: 'You want a chart showing sales and profit for each region in Tableau, driven by dragging fields onto shelves. The "region" field belongs on the…',
            options: [
              'Filters shelf only',
              'Rows or Columns shelf (or both)',
              'Pages shelf',
              'Tooltip shelf only'
            ],
            answerIndex: 1,
            explanation: 'Dragging a dimension like region onto Rows or Columns partitions the view by that field, producing a separate mark per region.'
          }
        }
      ]
    },
    {
      slug: 'kpis-reporting-communication',
      stage: 'Advanced',
      title: 'KPIs, Reporting & Business Communication',
      description: 'Defining meaningful metrics, delivering decision-ready reporting, and communicating insights stakeholders act on.',
      topics: [
        {
          slug: 'kpi-design',
          title: 'KPI Design & Metrics',
          minutes: 30,
          objectives: [
            'Select KPIs that align with business objectives, not vanity metrics',
            'Define metrics with clear formulas, dimensions and data sources',
            'Benchmark KPIs against targets and trends'
          ],
          sections: [
            { heading: 'Choosing the right KPIs', body: 'A good KPI is tied to a goal a decision-maker can act on — revenue per customer, conversion rate, churn, SLA compliance — rather than raw vanity counts like total visitors. The metric must be measurable with available data and move when the business changes.' },
            { heading: 'Defining and standardizing metrics', body: 'A KPI without a precise definition is a source of conflict: "revenue" could mean gross, net, recurring, or regional. Document each metric\'s formula, filters, time window and source, so every report uses the same number consistently across the company.' },
            { heading: 'Context via targets and trend', body: 'A single number is meaningless without context. Pair each KPI with a target, a period-over-period comparison and a trend line, so stakeholders see not just where they are but whether they are improving and by how much against plan.' }
          ],
          links: [
            { title: 'Power BI awareness and KPIs', url: 'https://learn.microsoft.com/en-us/power-bi/consumer/end-user-kpi', sourceName: 'Power BI Documentation', resourceType: 'guide', relationship: 'Documentation on KPI visualizations, targets and thresholds in Power BI.' },
            { title: 'Power BI KPI visual', url: 'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-kpi', sourceName: 'Power BI Documentation', resourceType: 'reference', relationship: 'How to add and configure KPI cards that compare value, goal and trend.' },
            { title: 'Microsoft Learn analytics for decisions', url: 'https://learn.microsoft.com/en-us/training/browse/?terms=reporting%20analytics', sourceName: 'Microsoft Learn', resourceType: 'course', relationship: 'Learning paths for designing analytics reports that drive decisions.' }
          ],
          quiz: {
            prompt: 'Which of these is the strongest KPI for measuring customer retention performance?',
            options: [
              'Total page views on the website',
              'Customer churn rate with a target and trend',
              'Number of employees in the company',
              'Total number of marketing emails sent'
            ],
            answerIndex: 1,
            explanation: 'Churn rate directly measures retention, and pairing it with a target and trend gives decision-makers the context to judge performance.'
          }
        },
        {
          slug: 'reporting-workflows',
          title: 'Automated Reporting Workflows',
          minutes: 30,
          objectives: [
            'Build a repeatable, versioned reporting pipeline',
            'Automate data refreshes and scheduled report distribution',
            'Handle pipeline failures and data-quality alerts'
          ],
          sections: [
            { heading: 'Repeatable report pipelines', body: 'A dashboard is only useful if it stays current. A repeatable pipeline — clean data, transform, load, refresh on schedule — keeps reports trustworthy without manual rework each Monday. Document the steps so a teammate can run and audit the process.' },
            { heading: 'Scheduling and distribution', body: 'Power BI service and Tableau Server/Cloud support scheduled refreshes and automatic report subscription by email. Automating distribution frees the analyst from manually exporting and mailing reports, letting them focus on interpreting results instead.' },
            { heading: 'Monitoring for failures', body: 'Automation fails silently unless watched. Set up alerts for refresh failures, unexpected null rates, or a metric that jumps outside its normal band. A data-quality alert is often more valuable than the dashboard itself, because it catches problems before stakeholders do.' }
          ],
          links: [
            { title: 'Schedule data refresh in Power BI', url: 'https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-scheduled-refresh', sourceName: 'Power BI Documentation', resourceType: 'guide', relationship: 'How to set up scheduled data refreshes for published Power BI reports.' },
            { title: 'Power BI data refresh concepts', url: 'https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-data', sourceName: 'Power BI Documentation', resourceType: 'guide', relationship: 'Understanding manual, scheduled and automatic refresh behavior.' },
            { title: 'Power BI service subscriptions', url: 'https://learn.microsoft.com/en-us/power-bi/consumer/end-user-subscribe', sourceName: 'Power BI Documentation', resourceType: 'guide', relationship: 'Sending report snapshots to email recipients on a schedule.' }
          ],
          quiz: {
            prompt: 'Your automated dashboard refresh failed overnight and the report shows yesterday\'s data. The first priority is…',
            options: [
              'Do nothing and let it sort itself out',
              'Trigger a refresh, confirm data is current, and notify stakeholders if numbers look different than expected',
              'Delete the dashboard',
              'Manually type in new numbers from memory'
            ],
            answerIndex: 1,
            explanation: 'Promptly restoring correct data and transparently flagging the refresh issue preserves trust, while silently shipping stale data misleads decisions.'
          }
        },
        {
          slug: 'business-storytelling',
          title: 'Storytelling with Data & Stakeholders',
          minutes: 30,
          objectives: [
            'Present findings to non-technical stakeholders in plain language',
            'Structure analysis as a narrative that leads to a recommendation',
            'Handle questions and pushback with evidence and openness'
          ],
          sections: [
            { heading: 'Plain-language communication', body: 'Executives rarely think in SQL or DAX. Lead with the business impact, define reasonable confidence without jargon, and support claims with clean, labeled visuals. The goal is a decision, not a demonstration of technique.' },
            { heading: 'Narrative structure', body: 'Frame with the business question, present the evidence through concise visuals and metrics, and end with an explicit recommendation and expected impact. A well-structured narrative turns a pile of numbers into a compelling, actionable story.' },
            { heading: 'Handling pushback', body: 'Stakeholders challenge findings, ask for different cuts, or disagree with a recommendation. Respond by re-checking the analysis, presenting limitations honestly, and exploring what alternative assumptions would imply. Iterating on feedback is a normal, valuable part of analytical work.' }
          ],
          links: [
            { title: 'Power BI storytelling with reports', url: 'https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-storytelling-wallpaper-like-visuals', sourceName: 'Power BI Documentation', resourceType: 'guide', relationship: 'Using report structure, annotations and layout to tell a data story.' },
            { title: 'Microsoft Learn communication courses', url: 'https://learn.microsoft.com/en-us/training/browse/?terms=communication%20skills', sourceName: 'Microsoft Learn', resourceType: 'course', relationship: 'Courses on presenting data and communicating analysis effectively.' },
            { title: 'Tableau best practices for dashboards', url: 'https://help.tableau.com/current/pro/desktop/en-us/dashboards_best_practices.htm', sourceName: 'Tableau Documentation', resourceType: 'guide', relationship: 'Design guidance for building clear, decision-oriented dashboards.' }
          ],
          quiz: {
            prompt: 'A VP asks why this quarter\'s sales are down and wants a plain-language answer. The best opening is…',
            options: [
              'A dense wall of SQL code explaining the query',
              'A clear statement of the finding with a supporting chart, then the drivers and a recommendation',
              'A list of all the technical tools you used',
              'An apology that the data is complex'
            ],
            answerIndex: 1,
            explanation: 'Leading with the finding, a clean visual, the drivers and a recommendation directly serves the VP\'s decision needs — the core of effective data storytelling.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'End-to-End Sales Analytics Project',
    coverage: [
      'Excel Data Analysis',
      'SQL Querying',
      'Data Cleaning with pandas',
      'Power BI Dashboarding',
      'KPI Design & Reporting'
    ],
    brief:
      'Analyze a retail sales dataset end-to-end: extract data with SQL, clean it with pandas and Excel, define the key business KPIs, build an interactive dashboard in Power BI, and present a decision-ready report on what is driving or hurting sales.',
    requirements: [
      'Query the source data with SQL to define the analytical dataset',
      'Clean and validate the data in pandas and Excel, documenting every decision',
      'Define at least three core KPIs with clear formulas and targets',
      'Build an interactive Power BI dashboard with multiple pages and slicers',
      'Include at least one Tableau worksheet demonstrating cross-tool skill',
      'Write a report that explains the findings and recommends concrete actions',
      'Handle at least one data-quality issue and explain how you caught it'
    ],
    expectedOutput:
      'An interactive Power BI dashboard plus a written report presenting the key KPIs, the factors driving and hurting sales with supporting visuals, and a concrete recommendation the business can act on.',
    rubric: [
      { skill: 'Data Extraction & Cleaning', weight: 25, criteria: 'Correct SQL extraction and thorough, well-documented cleaning in pandas/Excel' },
      { skill: 'KPI Definition', weight: 20, criteria: 'Meaningful, well-defined KPIs with formulas, targets and context' },
      { skill: 'Dashboard Design', weight: 25, criteria: 'Clear, interactive Power BI dashboard with appropriate visuals and navigation' },
      { skill: 'Analysis Quality', weight: 15, criteria: 'Insights are grounded in data, correct and decision-relevant' },
      { skill: 'Communication', weight: 15, criteria: 'Report translates analysis into a clear, well-reasoned business recommendation' }
    ],
    passScore: 72
  },

  assignments: [
    {
      title: 'Executive Excel Summary Report',
      stage: 'Beginner',
      objective: 'Load a real dataset and produce a polished Excel workbook that summarizes key metrics with PivotTables, formulas and formatting.',
      requirements: [
        'Load a dataset with at least one numerical and one categorical variable',
        'Build at least two PivotTables answering specific business questions',
        'Use formulas like XLOOKUP, SUMIFS and IF to derive derived metrics',
        'Add visual formatting (conditional formatting, clear headers, titles)',
        'Include a summary sheet that states three findings in plain language'
      ],
      skillsEvaluated: ['Excel', 'PivotTables', 'Data Analysis', 'Reporting'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit your Excel workbook and a short written summary explaining each finding and the analysis that supports it.',
        textLabel: 'Summary report',
        minTextLength: 600,
        linkLabels: ['Workbook file']
      }
    },
    {
      title: 'SQL Business Questions & pandas Analysis',
      stage: 'Intermediate',
      objective: 'Answer a set of business questions by querying a provided database with SQL and then cross-validating and deepening the analysis in pandas.',
      requirements: [
        'Write SQL queries with joins, aggregation and filtering to answer at least five business questions',
        'Export the query results and continue the analysis in pandas',
        'Clean the data and compute additional metrics the SQL did not cover',
        'Flag any data-quality issues found and describe the fix',
        'Present your findings as a concise markdown report'
      ],
      skillsEvaluated: ['SQL', 'pandas', 'Data Cleaning', 'Data Analysis'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit your SQL queries, pandas notebook and a written report connecting each business question to its answer and analysis.',
        textLabel: 'Analysis report',
        minTextLength: 1200,
        linkLabels: ['SQL queries', 'pandas notebook']
      }
    },
    {
      title: 'Sales Dashboard Project',
      stage: 'Advanced',
      objective: 'Design and build an interactive sales dashboard in Power BI that ties KPIs to a target and leads stakeholders to a decision.',
      requirements: [
        'Define 3-5 KPIs with a clear business rationale and target',
        'Model the data with proper relationships in Power BI',
        'Build multiple report pages with slicers and cross-filtering',
        'Create DAX measures for dynamic calculations like YoY growth',
        'Write a short narrative describing the insight each page delivers'
      ],
      skillsEvaluated: ['Power BI', 'DAX', 'KPI Design', 'Dashboard Design'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit your Power BI report file plus a written brief explaining the KPI choices, page design and the main insight each page supports.',
        textLabel: 'Dashboard brief',
        minTextLength: 1000,
        linkLabels: ['Power BI report']
      }
    }
  ],

  simTasks: [
    {
      title: 'Investigate a discrepancy in the monthly report',
      context: 'The monthly revenue report shows $2.1M, but the finance team\'s figure for the same period is $2.5M. Both teams believe they are correct, and the discrepancy is blocking a board presentation tomorrow.',
      requirements: [
        'Compare the source data, filters and date ranges used by each side',
        'Check for duplicate records, missing categories or differing revenue definitions',
        'Identify the root cause and reproduce the correct number',
        'Propose a standardized definition and validation check to prevent recurrence'
      ],
      priority: 'critical',
      dueDayOffset: 2,
      expectedOutput: 'A root-cause explanation of the discrepancy, the correct figure, and a proposal for a standardized metric definition.',
      skills: ['Data Validation', 'SQL', 'Excel', 'Investigation', 'Communication']
    },
    {
      title: 'Design a KPI set for a new product line',
      context: 'Your company is launching a new subscription product and leadership asks you, as the analyst, to define what "success" looks like in its first year. Nothing is measured yet.',
      requirements: [
        'Propose a small, decision-useful set of KPIs beyond raw revenue',
        'Define each KPI with formula, data source and target',
        'Explain how the KPIs align to the product\'s business goals',
        'Identify which data needs to be captured to track them'
      ],
      priority: 'high',
      dueDayOffset: 5,
      expectedOutput: 'A KPI definition document with rationale, formulas and a data collection plan.',
      skills: ['KPI Design', 'Business Communication', 'Data Planning']
    },
    {
      title: 'Turn a messy request into a scoped analysis',
      context: 'A product manager asks you to "visualize user behavior" with no specific question, no timeframe and no deadline. Every dashboard you build gets ignored because it does not answer anything anyone asked.',
      requirements: [
        'Clarify the actual decision the PM needs to make',
        'Translate that decision into specific analytical questions',
        'Propose a focused dashboard scope instead of a generic one',
        'Set expectations on timeline and deliverables'
      ],
      priority: 'normal',
      dueDayOffset: 7,
      expectedOutput: 'A scoped dashboard plan with clarified objectives, specific questions and a proposed delivery timeline.',
      skills: ['Problem Framing', 'Scope Management', 'Communication', 'Dashboard Planning']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Lena Fischer',
      personaRole: 'Data Engineer',
      situation: 'Coordinating on a data pipeline fix after you spotted missing values and duplicated order records in the source feed.',
      openingMessage:
        'I saw your analysis flagged duplicate orders and a bunch of missing customer IDs in our ingestion pipeline. Can you walk me through exactly what you found so I can fix the root cause?',
      expectedPoints: [
        'Describes the specific data-quality issues with examples and location',
        'Distinguishes genuine missing data from encoding problems',
        'Proposes a concrete fix for the ingestion pipeline',
        'Agrees on validation checks to catch regressions going forward'
      ]
    },
    {
      kind: 'team',
      personaName: 'Diego Alvarez',
      personaRole: 'BI Developer',
      situation: 'You both maintain overlapping dashboards and want to unify the KPI definitions so executive reporting is consistent.',
      openingMessage:
        'Our reports show slightly different revenue numbers depending on which dashboard you open, and leadership is noticing. I\'d like to align our definitions — can we agree on a single source of truth?',
      expectedPoints: [
        'Confirms the canonical data sources and metric formulas to unify on',
        'Identifies where the two dashboards diverge and why',
        'Proposes a central metric definitions document or data model',
        'Schedules a plan to update both dashboards and communicate the change'
      ]
    },
    {
      kind: 'client',
      personaName: 'Olivia Grant',
      personaRole: 'Marketing Director, Northwind Retail',
      situation: 'Client wants to understand why a recent campaign appears to have reduced sales and asks for a plain-language explanation before a review with their CEO.',
      openingMessage:
        'Our marketing team ran a big campaign last month and the numbers show sales went down. I have to explain this to the CEO. Can you help me understand what really happened?',
      expectedPoints: [
        'Analyzes the campaign impact against a proper baseline, not raw totals',
        'Separates campaign effects from seasonal or external factors',
        'Explains the findings in plain, non-technical language',
        'Recommends a clear, actionable next step backed by the evidence'
      ]
    },
    {
      kind: 'client',
      personaName: 'Hiroshi Nakamura',
      personaRole: 'Chief Financial Officer, Apex Logistics',
      situation: 'Client is deciding whether to trust the new dashboard and its KPIs for quarterly planning, and wants clarity on data reliability.',
      openingMessage:
        'I\'m being asked to base our quarterly planning on your new dashboard. How confident are you in these numbers, and what happens if the underlying data is wrong?',
      expectedPoints: [
        'Explains the data sources and refresh cadence transparently',
        'Describes the validation and alerting in place for data quality',
        'States realistic confidence and limitations of the reporting',
        'Recommends guardrails, such as a data-quality review before major planning'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'A key executive dashboard is showing stale revenue data because the overnight data refresh failed silently, and stakeholders are about to use it in a planning call.',
      requiredActions: [
        { action: 'Check the refresh logs to diagnose why the pipeline failed', good: true, note: 'Diagnose the root cause before blaming any component.' },
        { action: 'Notify affected stakeholders that current data is temporarily unavailable', good: true, note: 'Transparency about data currency builds trust even when delivery is delayed.' },
        { action: 'Trigger a manual refresh once the issue is understood and confirm numbers', good: true, note: 'Restore correct data as the first priority after diagnosis.' },
        { action: 'Silently publish the stale numbers and hope nobody checks', good: false, note: 'Presenting outdated data without disclosure misleads the planning decision.' }
      ]
    },
    {
      category: 'Interpersonal conflict',
      situation: 'A senior stakeholder demands you change a dashboard\'s numbers to look more favorable, even though the underlying data is correct and unchanged.',
      requiredActions: [
        { action: 'Politely refuse to alter the data and explain why integrity matters', good: true, note: 'Refusing to falsify reporting protects your credibility and the company.' },
        { action: 'Offer alternative, legitimate ways to present the same facts fairly', good: true, note: 'There are honest ways to frame context; they satisfy the need without distorting data.' },
        { action: 'Escalate to a manager if the pressure persists', good: true, note: 'Raising inappropriate pressure protects both you and the organization.' },
        { action: 'Change the numbers to keep the stakeholder happy', good: false, note: 'Falsifying reporting is unethical and could mislead significant decisions.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between an INNER JOIN and a LEFT JOIN in SQL, with a concrete example.',
      guidancePoints: [
        'INNER JOIN returns only rows with matches in both tables',
        'LEFT JOIN returns all rows from the left table plus matches from the right, filling nulls where there is no match',
        'A concrete example, e.g. customers and orders, clarifies when each is needed',
        'Choosing the wrong join changes which rows appear and can silently alter totals'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'When would you use a PivotTable in Excel versus a pandas groupby for aggregation?',
      guidancePoints: [
        'Excel PivotTables are interactive and accessible to non-technical stakeholders',
        'pandas groupby is reproducible, scriptable and scales to larger datasets',
        'The tool depends on the audience, dataset size and need for reproducibility',
        'Both solve the same conceptual problem: split data into groups and aggregate'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Your main dashboard shows revenue dropped 20% this month. Walk through how you would investigate whether this is real.',
      guidancePoints: [
        'Verify the data: check refresh status, pipeline quality and missing values',
        'Confirm the metric definition and compare with an independent source',
        'Look at the trend, seasonality and any calendar effects like holidays',
        'Decompose by region, product and channel to isolate the drivers'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A stakeholder wants a report in 24 hours but the underlying data is incomplete and messy. How do you proceed?',
      guidancePoints: [
        'Clarify the exact decision the stakeholder needs to make',
        'Scope a focused analysis that fits the deadline rather than attempting everything',
        'Flag data-quality limitations honestly and state confidence',
        'Set expectations and offer an interim result with a plan to refine'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you decide which KPIs to include in a dashboard so it stays useful rather than cluttered?',
      guidancePoints: [
        'Tie each KPI to a decision the audience actually makes',
        'Prefer a small set of well-defined KPIs over a large wall of metrics',
        'Pair KPIs with targets and trend for context',
        'Iterate with stakeholders on which metrics they genuinely act on'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'Tell me about a time a stakeholder rejected your analysis. How did you handle it?',
      guidancePoints: [
        'Describes responding to feedback constructively rather than defensively',
        'Re-checks assumptions and the data to ensure the analysis is sound',
        'Explores alternative framings the stakeholder might prefer',
        'Arrives at an outcome everyone can agree is grounded in the evidence'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain what a KPI is and why targets matter to a new colleague who has never worked with business reporting.',
      guidancePoints: [
        'A KPI is a measurable value that tracks progress toward a business goal',
        'Targets give the number context so performance is judged against an expectation',
        'Use a simple, concrete example like conversion rate or customer churn',
        'Avoid jargon and tie the explanation to a recognizable business outcome'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'The CEO asks you to summarize the main insight from your latest sales analysis in one minute. What do you say?',
      guidancePoints: [
        'Leads with a single clear finding, not a list of charts',
        'Supports the finding with one or two key numbers',
        'States the likely cause and an actionable recommendation',
        'Offers to zoom into details if the CEO wants more depth'
      ]
    }

  ]

}
