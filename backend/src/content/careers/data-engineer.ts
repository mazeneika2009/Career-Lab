import type { CareerDef } from '../framework.js'

export const dataEngineer: CareerDef = {
  slug: 'data-engineer',
  name: 'Data Engineer',
  category: 'AI & Data',
  order: 21,
  description:
    'Builds reliable data pipelines with Spark, Airflow and Kafka, modeling warehouses that analysts can trust.',
  difficulty: 'Advanced',
  pathSummary:
    'Python & SQL fundamentals for data work → relational database design & warehouse modeling → distributed processing with Apache Spark → pipeline orchestration with Airflow & streaming with Kafka.',
  mainSkills: [
    'Python for Data Engineering',
    'SQL & Relational Database Design',
    'Apache Spark (PySpark)',
    'Apache Airflow',
    'Apache Kafka',
    'Data Modeling & Warehousing',
    'ETL Pipeline Design',
    'Data Quality & Monitoring'
  ],
  sourcePlatforms: [
    'Apache Spark',
    'Apache Airflow',
    'Apache Kafka',
    'Python Documentation',
    'PostgreSQL Documentation',
    'MySQL Documentation'
  ],
  companyName: 'FlowForge Data Co.',
  roleTitle: 'Data Engineer',

  chapters: [
    {
      slug: 'python-sql-foundations',
      stage: 'Beginner',
      title: 'Python & SQL Foundations for Data',
      description: 'Core Python and SQL skills that form the bedrock of every data engineering task.',
      topics: [
        {
          slug: 'python-for-data-engineering',
          title: 'Python for Data Engineering',
          minutes: 30,
          objectives: [
            'Write efficient Python scripts for data extraction and transformation',
            'Use generators and context managers to handle large data streams',
            'Structure reusable modules and packages for pipeline components'
          ],
          sections: [
            { heading: 'Python as the pipeline glue', body: 'Data engineers use Python to connect diverse systems: reading from APIs and databases, transforming records, and writing to storage or message queues. Writing clean, typed Python with clear function boundaries keeps pipeline logic maintainable as the number of sources grows. Generators and context managers are essential when working with large datasets that cannot fit in memory.' },
            { heading: 'Handling large data in Python', body: 'Generators yield records one at a time instead of loading entire files, keeping memory usage constant regardless of dataset size. Context managers ensure files, database connections and network sockets are always released, even when errors occur. Combining both patterns — for example reading CSV rows as a generator inside a context-managed file handle — is the standard way to process data that exceeds available RAM.' },
            { heading: 'Structuring pipeline code', body: 'As pipelines grow from one-off scripts into production systems, code organization matters. Group related transforms into modules, define clear interfaces between extraction, transformation and loading stages, and use configuration files rather than hardcoded paths. This modular structure makes pipelines testable, debuggable and reusable across projects.' }
          ],
          links: [
            { title: 'The Python Tutorial', url: 'https://docs.python.org/3/tutorial/', sourceName: 'Python Documentation', resourceType: 'tutorial', relationship: 'Official introduction to Python syntax, data structures and core concepts.' },
            { title: 'Generators in Python', url: 'https://docs.python.org/3/howto/functional.html#generators', sourceName: 'Python Documentation', resourceType: 'guide', relationship: 'How to write generators and iterators for memory-efficient data processing.' },
            { title: 'Context Managers', url: 'https://docs.python.org/3/library/contextlib.html', sourceName: 'Python Documentation', resourceType: 'reference', relationship: 'Standard library tools for resource management with the with statement.' }
          ],
          quiz: {
            prompt: 'A pipeline script loads a 50 GB CSV into a list in memory and crashes. The most Pythonic fix is…',
            options: [
              'Buy more RAM',
              'Replace the list with a generator that yields rows lazily',
              'Compress the CSV before reading it',
              'Switch to a compiled language'
            ],
            answerIndex: 1,
            explanation: 'Generators yield rows one at a time, keeping memory usage constant regardless of file size. Combined with context managers for file handles, this is the standard Python pattern for processing large datasets.'
          }
        },
        {
          slug: 'sql-fundamentals-data-eng',
          title: 'SQL Fundamentals for Data Engineering',
          minutes: 30,
          objectives: [
            'Write complex queries with joins, window functions and subqueries',
            'Use aggregation and grouping to summarize large datasets',
            'Understand execution order and write query plans that perform well'
          ],
          sections: [
            { heading: 'SQL as the data lingua franca', body: 'Every data platform speaks SQL: PostgreSQL, MySQL, BigQuery, Snowflake, Spark SQL. Beyond reading data, data engineers use SQL to create tables, define transformations, build materialized views and manage access. Writing correct SQL is table stakes; writing performant SQL is what separates juniors from seniors.' },
            { heading: 'Window functions and advanced queries', body: 'Window functions compute values across a set of rows related to the current row — running totals, rank, lead/lag and moving averages — without collapsing groups. Combined with CTEs (Common Table Expressions) for readability and subqueries for complex logic, they enable analyses that would require cumbersome procedural code otherwise.' },
            { heading: 'Performance and execution order', body: 'The database executes SQL in a specific order: FROM/JOIN, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT. Understanding this order helps you reason about which rows are available at each stage and why certain query patterns are faster. Indexes, partitioning and avoiding SELECT * are practical habits that keep warehouse queries fast as data volume grows.' }
          ],
          links: [
            { title: 'PostgreSQL Tutorial', url: 'https://www.postgresql.org/docs/current/tutorial.html', sourceName: 'PostgreSQL Documentation', resourceType: 'tutorial', relationship: 'Official PostgreSQL tutorial covering SQL basics through advanced features.' },
            { title: 'PostgreSQL Window Functions', url: 'https://www.postgresql.org/docs/current/tutorial-window.html', sourceName: 'PostgreSQL Documentation', resourceType: 'guide', relationship: 'Comprehensive guide to window functions with examples.' },
            { title: 'MySQL 8.0 Reference Manual', url: 'https://dev.mysql.com/doc/refman/8.0/en/', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Full MySQL reference including SQL syntax, indexing and optimization.' }
          ],
          quiz: {
            prompt: 'You need a running total of daily sales partitioned by store. Which SQL feature is most appropriate?',
            options: [
              'GROUP BY with SUM',
              'A window function with PARTITION BY and ORDER BY',
              'A subquery in the WHERE clause',
              'A temporary table with a cursor'
            ],
            answerIndex: 1,
            explanation: 'Window functions compute aggregate values over a defined window of rows without collapsing them, making them ideal for running totals partitioned by category.'
          }
        },
        {
          slug: 'database-design-warehousing',
          title: 'Database Design & Warehouse Modeling',
          minutes: 25,
          objectives: [
            'Design normalized relational schemas with proper keys and constraints',
            'Model star and snowflake schemas for analytical workloads',
            'Choose between normalization and denormalization based on workload'
          ],
          sections: [
            { heading: 'Relational normalization', body: 'Normalization decomposes data into well-structured tables to reduce redundancy and dependency. First normal form ensures atomic values, second and third normal forms eliminate partial and transitive dependencies. For transactional systems (OLTP), normalization protects write consistency and storage efficiency.' },
            { heading: 'Star and snowflake schemas', body: 'Analytical warehouses favor denormalized designs for read performance. A star schema places a fact table at the center with dimension tables radiating outward — fact_orders linked to dim_date, dim_product, dim_customer. Snowflake schemas normalize the dimensions further. The choice balances query simplicity against storage and join efficiency.' },
            { heading: 'When to denormalize', body: 'Denormalization pre-computes joins and aggregations into wider tables, trading write complexity and storage for dramatically faster reads. Data engineers denormalize when queries repeatedly join the same tables, when latency requirements are tight, or when downstream consumers (analysts, BI tools) need simplified schemas. The skill is knowing which layer of the warehouse to denormalize and which to keep normalized.' }
          ],
          links: [
            { title: 'PostgreSQL Documentation', url: 'https://www.postgresql.org/docs/current/index.html', sourceName: 'PostgreSQL Documentation', resourceType: 'reference', relationship: 'Comprehensive PostgreSQL documentation covering schema design, indexing and constraints.' },
            { title: 'MySQL Data Types', url: 'https://dev.mysql.com/doc/refman/8.0/en/data-types.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Reference for choosing appropriate MySQL column types and storage.' },
            { title: 'PostgreSQL Performance Tips', url: 'https://www.postgresql.org/docs/current/performance-tips.html', sourceName: 'PostgreSQL Documentation', resourceType: 'guide', relationship: 'Practical indexing and query optimization advice for PostgreSQL.' }
          ],
          quiz: {
            prompt: 'A star schema has a fact_sales table joined to dim_date, dim_product and dim_customer. Why is this preferred over a single normalized table for dashboards?',
            options: [
              'It uses less disk space',
              'It reduces the number of joins at query time, making analytical queries faster',
              'It enforces stricter data integrity',
              'It eliminates the need for indexes'
            ],
            answerIndex: 1,
            explanation: 'Star schemas pre-join dimensions into wide, flat structures so dashboard queries scan fewer tables and simpler join paths, dramatically improving read performance for analytical workloads.'
          }
        }
      ]
    },
    {
      slug: 'apache-spark-distributed',
      stage: 'Foundation',
      title: 'Distributed Processing with Apache Spark',
      description: 'Processing massive datasets in parallel with Spark, from RDDs to DataFrames and structured streaming.',
      topics: [
        {
          slug: 'spark-architecture-rdd',
          title: 'Spark Architecture & RDDs',
          minutes: 30,
          objectives: [
            'Explain Spark\'s driver-executor architecture and the DAG execution model',
            'Create and transform RDDs with lazy evaluation and caching',
            'Diagnose common performance bottlenecks like shuffles and data skew'
          ],
          sections: [
            { heading: 'Spark\'s execution model', body: 'Spark applications run as a driver process that coordinates executor processes across a cluster. Transformations build a Directed Acyclic Graph (DAG) that Spark optimizes before execution. Actions trigger actual computation. This separation of logical plan from physical execution is what enables Spark\'s automatic optimization and fault tolerance.' },
            { heading: 'Resilient Distributed Datasets', body: 'RDDs are Spark\'s fundamental abstraction: immutable, partitioned collections of objects distributed across the cluster. Transformations like map, filter and flatMap are lazy — they build the DAG without executing. Actions like count, collect and save trigger execution. RDDs provide fine-grained control but are low-level; DataFrames and Datasets are usually preferred.' },
            { heading: 'Caching and persistence', body: 'When a computation is reused across multiple actions, caching (or persisting) the result avoids redundant recomputation. Spark can cache data in memory, on disk, or in a serialized format. Choosing the right storage level and knowing when to unpersist are essential for iterative algorithms and interactive exploration that reuses intermediate results.' }
          ],
          links: [
            { title: 'Spark Quick Start', url: 'https://spark.apache.org/docs/latest/quick-start.html', sourceName: 'Apache Spark', resourceType: 'tutorial', relationship: 'Official getting-started guide for installing and running your first Spark application.' },
            { title: 'RDD Programming Guide', url: 'https://spark.apache.org/docs/latest/rdd-programming-guide.html', sourceName: 'Apache Spark', resourceType: 'guide', relationship: 'Comprehensive guide to RDD concepts, transformations and actions.' },
            { title: 'Spark Architecture Overview', url: 'https://spark.apache.org/docs/latest/cluster-overview.html', sourceName: 'Apache Spark', resourceType: 'guide', relationship: 'Driver, executor, cluster manager and job execution model explained.' }
          ],
          quiz: {
            prompt: 'In Spark, calling an RDD transformation returns a new RDD without executing immediately. This behavior is called…',
            options: [
              'Eager evaluation',
              'Lazy evaluation',
              'Immediate execution',
              'Greedy optimization'
            ],
            answerIndex: 1,
            explanation: 'Transformations in Spark are lazy — they build a logical execution plan (DAG) but defer actual computation until an action is called, allowing Spark to optimize the entire chain of operations.'
          }
        },
        {
          slug: 'spark-dataframes-sql',
          title: 'Spark DataFrames & Spark SQL',
          minutes: 30,
          objectives: [
            'Build and manipulate DataFrames with the DataFrame API and SQL',
            'Apply partitioning, bucketing and broadcast joins for performance',
            'Write and optimize Spark SQL queries for warehousing workloads'
          ],
          sections: [
            { heading: 'DataFrames as the primary interface', body: 'Spark DataFrames are distributed tables with a schema, built on top of RDDs but optimized by the Catalyst query planner. They support both a programmatic API (select, filter, groupBy, join) and raw SQL. Catalyst optimizes both paths through predicate pushdown, column pruning and adaptive query execution, making DataFrames dramatically faster than equivalent RDD code.' },
            { heading: 'Partitioning and join strategies', body: 'How data is partitioned across the cluster determines join performance. Co-partitioned data avoids shuffles entirely. Broadcast joins send a small table to all executors, eliminating shuffle for joins with dimension tables. Bucketing pre-sorts and hashes data by join key on write. Choosing the right strategy based on table sizes is the most impactful Spark optimization.' },
            { heading: 'Writing to the warehouse', body: 'Spark reads and writes Parquet, ORC, Delta Lake and JDBC databases. Partitioning output files by date or category optimizes downstream reads. Writing with compression (snappy, zstd) reduces storage and I/O. Combined with partition pruning at read time, these patterns form the backbone of modern data lakehouse architectures.' }
          ],
          links: [
            { title: 'Spark SQL Programming Guide', url: 'https://spark.apache.org/docs/latest/sql-programming-guide.html', sourceName: 'Apache Spark', resourceType: 'guide', relationship: 'Comprehensive guide to DataFrames, Spark SQL and Catalyst optimization.' },
            { title: 'Spark SQL Built-in Functions', url: 'https://spark.apache.org/docs/latest/api/sql/index.html', sourceName: 'Apache Spark', resourceType: 'reference', relationship: 'Complete reference for SQL and DataFrame functions in Spark.' },
            { title: 'Performance Tuning Guide', url: 'https://spark.apache.org/docs/latest/sql-performance-tuning.html', sourceName: 'Apache Spark', resourceType: 'guide', relationship: 'Adaptive query execution, broadcast joins and shuffle optimization.' }
          ],
          quiz: {
            prompt: 'A fact table of 500 million rows is joined with a dimension table of 10,000 rows. Which Spark join strategy avoids a full shuffle?',
            options: [
              'Sort-merge join',
              'Broadcast join',
              'Shuffle hash join',
              'Nested loop join'
            ],
            answerIndex: 1,
            explanation: 'Broadcast joins send the small dimension table to every executor\'s memory, allowing the join to happen locally on each partition of the large table without any data movement across the cluster.'
          }
        },
        {
          slug: 'spark-streaming',
          title: 'Structured Streaming in Spark',
          minutes: 25,
          objectives: [
            'Design streaming pipelines with Spark Structured Streaming',
            'Configure output modes, triggers and watermarks for event-time processing',
            'Handle late data and ensure exactly-once delivery guarantees'
          ],
          sections: [
            { heading: 'Micro-batch and continuous processing', body: 'Spark Structured Streaming treats a live data stream as an unbounded table that is continuously appended. Micro-batch mode processes data in small batches for throughput; continuous mode offers lower latency for simple pipelines. The DataFrame API you know from batch applies identically to streaming, making it easy to build unified batch-and-stream codebases.' },
            { heading: 'Output modes and triggers', body: 'Append mode writes only new rows, complete mode overwrites the entire result table, and update mode writes only rows that changed. Triggers control when output is written — every batch, on a schedule, or once. Choosing the right combination depends on whether the downstream sink supports updates and whether the aggregation needs to maintain running state.' },
            { heading: 'Watermarks and late data', body: 'In event-time processing, records may arrive out of order. Watermarks tell Spark how far behind the latest event time to expect late data. Once the watermark passes a threshold, late records beyond it are dropped or handled separately. This bound on state size and latency is essential for unbounded streaming aggregations.' }
          ],
          links: [
            { title: 'Structured Streaming Guide', url: 'https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html', sourceName: 'Apache Spark', resourceType: 'guide', relationship: 'Official guide to Spark Structured Streaming concepts and APIs.' },
            { title: 'Structured Streaming Concepts', url: 'https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html#overview', sourceName: 'Apache Spark', resourceType: 'tutorial', relationship: 'Introduction to output modes, triggers and event-time processing.' },
            { title: 'Spark Streaming Connectors', url: 'https://spark.apache.org/docs/latest/sql-data-sources-kafka-integration.html', sourceName: 'Apache Spark', resourceType: 'reference', relationship: 'Kafka integration for Spark Structured Streaming sources and sinks.' }
          ],
          quiz: {
            prompt: 'In Spark Structured Streaming, a watermark is used to…',
            options: [
              'Speed up batch processing intervals',
              'Bound the state for event-time aggregation by defining how late data can arrive',
              'Encrypt streaming data in transit',
              'Automatically scale the number of executors'
            ],
            answerIndex: 1,
            explanation: 'Watermarks track the progress of event time and define a threshold for how late records can be before they are dropped, ensuring that state in streaming aggregations remains bounded.'
          }
        }
      ]
    },
    {
      slug: 'airflow-orchestration',
      stage: 'Intermediate',
      title: 'Pipeline Orchestration with Apache Airflow',
      description: 'Defining, scheduling and monitoring production data pipelines as code with Airflow DAGs.',
      topics: [
        {
          slug: 'airflow-core-concepts',
          title: 'Airflow Architecture & Core Concepts',
          minutes: 30,
          objectives: [
            'Explain the Airflow architecture: scheduler, workers, metadata database and webserver',
            'Define a DAG with operators, tasks and dependency relationships',
            'Configure retries, timeouts and alerting for production resilience'
          ],
          sections: [
            { heading: 'The Airflow ecosystem', body: 'Airflow orchestrates complex workflows as directed acyclic graphs (DAGs) of tasks. The scheduler executes DAGs on a defined interval, workers run individual tasks, the metadata database tracks state and history, and the webserver provides a visual interface. Understanding this architecture is essential for debugging failures and scaling the platform.' },
            { heading: 'Operators and task composition', body: 'Operators are the building blocks: BashOperator runs shell commands, PythonOperator calls Python functions, and specialized operators (PostgresOperator, SparkSubmitOperator) integrate with external systems. Tasks are composed into DAGs by setting upstream and downstream dependencies. Jinja templating injects dynamic values like dates and parameters into operator arguments.' },
            { heading: 'Production hardening', body: 'Production DAGs need retries with exponential backoff, task timeouts to prevent hung processes, email or Slack alerts on failure, and SLA monitors for delayed tasks. Idempotency — ensuring a task produces the same result whether run once or multiple times — is critical because retries and backfills are routine in Airflow.' }
          ],
          links: [
            { title: 'Airflow Concepts', url: 'https://airflow.apache.org/docs/apache-airflow/stable/concepts/index.html', sourceName: 'Apache Airflow', resourceType: 'guide', relationship: 'Official documentation for DAGs, operators, triggers and core Airflow concepts.' },
            { title: 'Airflow Tutorial', url: 'https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html', sourceName: 'Apache Airflow', resourceType: 'tutorial', relationship: 'Step-by-step tutorial for creating your first DAG and running it.' },
            { title: 'Airflow CLI Reference', url: 'https://airflow.apache.org/docs/apache-airflow/stable/cli-and-env-variables-ref.html', sourceName: 'Apache Airflow', resourceType: 'reference', relationship: 'Command-line interface for managing DAGs, pools, connections and variables.' }
          ],
          quiz: {
            prompt: 'A task in Airflow runs, fails, retries twice and fails again. By default, the DAG run status becomes…',
            options: [
              'Running',
              'Queued',
              'Failed',
              'Upstream failed'
            ],
            answerIndex: 2,
            explanation: 'When all retries are exhausted and the task still fails, the DAG run status transitions to Failed. Proper retry configuration and alerting ensure operations can respond before downstream tasks are affected.'
          }
        },
        {
          slug: 'airflow-data-pipeline-patterns',
          title: 'Data Pipeline Patterns in Airflow',
          minutes: 30,
          objectives: [
            'Build Extract-Load and Extract-Transform-Load pipelines with Airflow',
            'Use sensors and triggers for event-driven pipeline execution',
            'Design backfill and catch-up strategies for historical data loads'
          ],
          sections: [
            { heading: 'EL and ETL pipeline patterns', body: 'An EL pipeline extracts data from sources and loads it raw into a staging area, deferring transformation to a separate step. An ETL pipeline transforms data before loading into the target warehouse. Airflow orchestrates both patterns by chaining extraction operators, transformation tasks and loading operators with explicit dependencies and data quality checks between stages.' },
            { heading: 'Sensors and event-driven triggers', body: 'Sensors wait for an external condition — a file arriving in S3, a partition appearing in Hive, a parent DAG completing — before proceeding. Triggers (introduced in Airflow 2.x) allow tasks to be deferrable, freeing up worker slots while waiting. Together they enable event-driven pipelines that react to data availability rather than polling on fixed intervals.' },
            { heading: 'Backfills and data catch-up', body: 'When a DAG is first deployed or a bug is fixed, historical data must be reprocessed. Airflow\'s backfill command re-runs a DAG over a date range. Idempotent tasks ensure reprocessing produces identical results. Backfill strategies — parallel versus sequential, incremental versus full — depend on resource constraints and data dependencies.' }
          ],
          links: [
            { title: 'Airflow Operators', url: 'https://airflow.apache.org/docs/apache-airflow/stable/operators-and-hooks-ref.html', sourceName: 'Apache Airflow', resourceType: 'reference', relationship: 'Complete catalog of Airflow operators, hooks and integrations.' },
            { title: 'Airflow Connections', url: 'https://airflow.apache.org/docs/apache-airflow/stable/howto/connection.html', sourceName: 'Apache Airflow', resourceType: 'guide', relationship: 'Managing database and service connections used by operators.' },
            { title: 'Airflow Variables', url: 'https://airflow.apache.org/docs/apache-airflow/stable/concepts/variables.html', sourceName: 'Apache Airflow', resourceType: 'guide', relationship: 'Using Airflow Variables for dynamic DAG configuration and environment settings.' }
          ],
          quiz: {
            prompt: 'A pipeline must wait for a CSV file to appear in S3 before starting the extraction. Which Airflow primitive is most appropriate?',
            options: [
              'PythonOperator',
              'S3KeySensor',
              'BashOperator',
              'ShortCircuitOperator'
            ],
            answerIndex: 1,
            explanation: 'S3KeySensor polls S3 for the existence of a key before succeeding, which is exactly the pattern needed: pause until an external condition is met, then proceed with downstream tasks.'
          }
        },
        {
          slug: 'airflow-testing-monitoring',
          title: 'Testing & Monitoring Airflow Pipelines',
          minutes: 25,
          objectives: [
            'Unit test DAGs for import errors, structure and task dependencies',
            'Monitor pipeline health with Airflow metrics, logs and alerts',
            'Debug common production issues like task hangs and resource contention'
          ],
          sections: [
            { heading: 'Testing DAGs', body: 'DAGs can be tested by importing the module and verifying task count, dependency structure and operator configurations without actually executing tasks. pytest fixtures load the DAG object and assert expected properties. Integration tests run subsets of the pipeline against test environments. Testing prevents broken DAGs from reaching production and catching dependency cycles before deployment.' },
            { heading: 'Monitoring and observability', body: 'Airflow tracks task duration, success rates and retry counts in its metadata database, exposed through the webserver UI and Prometheus metrics. Configuring callbacks for on_success, on_failure and on_retry provides event-driven alerting. Centralized logging — shipping Airflow logs to a service like ELK or CloudWatch — is essential for debugging distributed task execution.' },
            { heading: 'Debugging production failures', body: 'Common failure modes include connection timeouts to external systems, resource exhaustion from too many parallel tasks, and data quality issues downstream of a silently corrupt extraction. Systematic debugging starts with checking task logs, verifying connections and pool slots, then tracing upstream dependencies. Having clear, well-structured logs with correlation IDs dramatically reduces mean time to resolution.' }
          ],
          links: [
            { title: 'Airflow Testing', url: 'https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html', sourceName: 'Apache Airflow', resourceType: 'guide', relationship: 'Best practices for testing DAGs, unit testing and integration testing.' },
            { title: 'Airflow Metrics', url: 'https://airflow.apache.org/docs/apache-airflow/stable/logging-monitoring/metrics.html', sourceName: 'Apache Airflow', resourceType: 'reference', relationship: 'Prometheus and StatsD metrics for monitoring pipeline health.' },
            { title: 'Airflow Pool Slots', url: 'https://airflow.apache.org/docs/apache-airflow/stable/concepts/pools.html', sourceName: 'Apache Airflow', resourceType: 'guide', relationship: 'Managing concurrency with pools and slots to prevent resource contention.' }
          ],
          quiz: {
            prompt: 'A DAG imports successfully but tasks consistently fail with connection timeout errors to PostgreSQL. The first thing to check is…',
            options: [
              'The DAG schedule interval',
              'The Airflow connection configuration and whether the database is reachable from the worker network',
              'The Python version on the scheduler',
              'The webserver port'
            ],
            answerIndex: 1,
            explanation: 'Connection errors are almost always a network or configuration issue. Verifying the Airflow connection object, checking that the database host is reachable from workers and inspecting firewall rules should be the first diagnostic step.'
          }
        }
      ]
    },
    {
      slug: 'kafka-streaming-realtime',
      stage: 'Advanced',
      title: 'Real-Time Streaming with Apache Kafka',
      description: 'Building event-driven architectures and real-time data pipelines with Kafka producers, consumers and stream processing.',
      topics: [
        {
          slug: 'kafka-architecture-fundamentals',
          title: 'Kafka Architecture & Core Concepts',
          minutes: 30,
          objectives: [
            'Explain Kafka\'s broker, topic, partition and consumer group model',
            'Configure producers with appropriate acknowledgment and batching settings',
            'Design topic partitioning strategies for throughput and ordering guarantees'
          ],
          sections: [
            { heading: 'Kafka as a distributed log', body: 'Kafka is a distributed commit log: producers append records to topics, which are split into partitions distributed across brokers. Consumers read at their own pace, maintaining offsets to track progress. This decoupled, append-only architecture delivers high throughput, durability and replayability — records persist on disk and can be re-consumed from any offset.' },
            { heading: 'Producers and acknowledgment modes', body: 'Producers send records to topic partitions. The acks setting controls durability guarantees: acks=0 sends and forgets (fastest, riskiest), acks=1 acknowledges the leader only, acks=all waits for all in-sync replicas. Batching and compression reduce network round-trips. Choosing the right combination depends on whether throughput or durability is the priority.' },
            { heading: 'Partitioning and ordering', body: 'Within a partition, records are strictly ordered. Between partitions, ordering is not guaranteed. A partitioning strategy — by customer ID, timestamp hash or round-robin — determines which partition receives each record. For ordered processing of a specific entity, all records for that entity must go to the same partition via a key. The number of partitions affects parallelism: more partitions allow more concurrent consumers.' }
          ],
          links: [
            { title: 'Kafka Quickstart', url: 'https://kafka.apache.org/quickstart', sourceName: 'Apache Kafka', resourceType: 'tutorial', relationship: 'Official quickstart for setting up and running a single-node Kafka cluster.' },
            { title: 'Kafka Documentation', url: 'https://kafka.apache.org/documentation/', sourceName: 'Apache Kafka', resourceType: 'reference', relationship: 'Comprehensive Kafka reference covering brokers, topics, producers and consumers.' },
            { title: 'Kafka Producer Configs', url: 'https://kafka.apache.org/documentation/#producerconfigs', sourceName: 'Apache Kafka', resourceType: 'reference', relationship: 'Detailed producer configuration reference including acks, batching and compression.' }
          ],
          quiz: {
            prompt: 'Records must be processed in the exact order they were produced for a specific user. How do you guarantee this in Kafka?',
            options: [
              'Use more partitions for higher throughput',
              'Set the producer key to the user ID so all records for that user land on the same partition',
              'Enable acks=all on the producer',
              'Use a consumer group with a single consumer'
            ],
            answerIndex: 1,
            explanation: 'Kafka guarantees ordering within a partition. By keying records on user ID, all records for that user go to the same partition and are consumed in order by a single consumer in the group.'
          }
        },
        {
          slug: 'kafka-consumer-groups',
          title: 'Consumer Groups & Data Processing',
          minutes: 30,
          objectives: [
            'Implement consumer groups for parallel processing of Kafka partitions',
            'Handle rebalancing, offset management and exactly-once semantics',
            'Design dead-letter queues and error handling strategies for failed messages'
          ],
          sections: [
            { heading: 'Consumer groups and parallelism', body: 'A consumer group is a set of consumers that jointly consume a topic. Kafka assigns each partition to exactly one consumer in the group, enabling parallel processing without duplicating work. If a consumer crashes, its partitions are automatically rebalanced to surviving members. The number of consumers should match the number of partitions for optimal throughput.' },
            { heading: 'Offset management and delivery semantics', body: 'Each consumer tracks its offset — the next record to read. Committing offsets too early risks data loss; committing too late causes duplicate processing on rebalance. At-least-once semantics (commit after processing) is the default and safest choice. Exactly-once semantics requires idempotent processing or transactional commits across the consumer and an external system.' },
            { heading: 'Error handling and dead-letter queues', body: 'Records that fail processing — due to schema violations, malformed data or transient errors — must not block the entire consumer. Common patterns include retry with backoff, routing failed messages to a dead-letter queue (DLQ) for later inspection, and circuit breakers that pause consumption when an upstream system is degraded. The DLQ pattern ensures poison messages do not halt the pipeline.' }
          ],
          links: [
            { title: 'Kafka Consumer Configs', url: 'https://kafka.apache.org/documentation/#consumerconfigs', sourceName: 'Apache Kafka', resourceType: 'reference', relationship: 'Consumer configuration reference including group.id, auto offset reset and session timeouts.' },
            { title: 'Kafka Consumer Group Protocol', url: 'https://kafka.apache.org/documentation/#consumerconfigs', sourceName: 'Apache Kafka', resourceType: 'guide', relationship: 'How consumer groups, partition assignment and rebalancing work.' },
            { title: 'Kafka Connect', url: 'https://kafka.apache.org/documentation/#connect', sourceName: 'Apache Kafka', resourceType: 'reference', relationship: 'Kafka Connect framework for building reliable source and sink connectors.' }
          ],
          quiz: {
            prompt: 'A consumer crashes mid-processing, is restarted and re-processes the same messages. This is an example of…',
            options: [
              'Exactly-once processing',
              'At-least-once processing with duplicate handling needed',
              'At-most-once processing',
              'Message loss'
            ],
            answerIndex: 1,
            explanation: 'When a consumer crashes after processing a record but before committing its offset, the record will be re-delivered on restart. This is at-least-once behavior, which requires idempotent processing to avoid duplicates.'
          }
        },
        {
          slug: 'kafka-stream-processing',
          title: 'Stream Processing & Real-Time Analytics',
          minutes: 25,
          objectives: [
            'Build stateful stream processing applications with Kafka Streams',
            'Implement windowed aggregations and joins across multiple streams',
            'Design end-to-end real-time analytics pipelines from ingestion to dashboard'
          ],
          sections: [
            { heading: 'Kafka Streams as a library', body: 'Kafka Streams is a client library for building stream processing applications. Unlike Spark Streaming or Flink, it runs as an embedded library in your application, requiring no separate cluster. It provides DSL operations — filter, map, groupByKey, window — that process records from input topics and write results to output topics, all with built-in fault tolerance and exactly-once guarantees.' },
            { heading: 'Windowed operations and joins', body: 'Stream processing often requires aggregating events within time windows — tumbling, hopping or session windows. Kafka Streams supports all three. Joining two streams (for example, matching ad impressions with clicks) is done with windowed joins that pair records from different topics that arrive within a defined time range. These operations are stateful and backed by a local changelog topic for recovery.' },
            { heading: 'End-to-end real-time architecture', body: 'A complete real-time pipeline ingests events via Kafka producers, processes them with Kafka Streams or Flink, sinks results to a serving layer (Redis, Elasticsearch, or a materialized view in a database), and exposes them to dashboards. The key design decisions are latency requirements, state management, and how to handle late or out-of-order events without compromising result accuracy.' }
          ],
          links: [
            { title: 'Kafka Streams Developer Guide', url: 'https://kafka.apache.org/documentation/streams/developer-guide.html', sourceName: 'Apache Kafka', resourceType: 'guide', relationship: 'Official developer guide for building stream processing applications with Kafka Streams.' },
            { title: 'Kafka Streams DSL', url: 'https://kafka.apache.org/documentation/streams/developer-guide/dsl-api.html', sourceName: 'Apache Kafka', resourceType: 'reference', relationship: 'Full DSL API reference for Kafka Streams transformations and aggregations.' },
            { title: 'Kafka Streams Architecture', url: 'https://kafka.apache.org/documentation/streams/architecture.html', sourceName: 'Apache Kafka', resourceType: 'guide', relationship: 'How Kafka Streams handles state stores, fault tolerance and scaling.' }
          ],
          quiz: {
            prompt: 'You need to aggregate click events by user within 5-minute tumbling windows. Which Kafka Streams operation is most appropriate?',
            options: [
              'groupByKey().count()',
              'groupByKey().windowedBy(TimeWindows.ofSizeWithNoGrace(Duration.ofMinutes(5))).count()',
              'filter().map()',
              'join() with a second stream'
            ],
            answerIndex: 1,
            explanation: 'windowedBy() defines a 5-minute tumbling window on the grouped stream, and count() aggregates events within each window, producing a per-user, per-window count.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'End-to-End Data Pipeline Project',
    coverage: [
      'Python scripting and SQL querying',
      'Apache Spark batch processing',
      'Apache Airflow DAG design',
      'Apache Kafka event streaming',
      'Data warehouse modeling'
    ],
    brief:
      'Design and build a complete data pipeline that ingests streaming events via Kafka, processes and aggregates them with Spark, orchestrates the workflow with Airflow, and loads the results into a star-schema warehouse in PostgreSQL. The pipeline must be production-ready with error handling, idempotency and monitoring.',
    requirements: [
      'Define a star schema with a fact table and at least two dimension tables in PostgreSQL',
      'Create a Kafka producer that generates realistic event data and publishes to a topic',
      'Build a Spark Structured Streaming job that consumes from Kafka, transforms and aggregates the data',
      'Orchestrate the full pipeline as an Airflow DAG with proper dependency ordering and retry logic',
      'Implement a dead-letter queue for malformed events that fail schema validation',
      'Add data quality checks between pipeline stages (row counts, null checks, schema validation)',
      'Document the pipeline architecture, data flow and operational runbook'
    ],
    expectedOutput:
      'A fully functional pipeline with source code for the Kafka producer, Spark streaming job, Airflow DAG, PostgreSQL schema DDL, and a README describing the architecture, how to run each component and how to monitor it in production.',
    rubric: [
      { skill: 'Pipeline Architecture', weight: 20, criteria: 'Clear separation of concerns, well-defined interfaces between components, scalable design' },
      { skill: 'Spark Processing', weight: 20, criteria: 'Correct use of Structured Streaming, appropriate partitioning and join strategies, efficient state management' },
      { skill: 'Airflow Orchestration', weight: 20, criteria: 'Well-structured DAG with retries, timeouts, idempotent tasks and clear dependency ordering' },
      { skill: 'Kafka Integration', weight: 15, criteria: 'Correct producer configuration, meaningful partitioning strategy, proper consumer group handling' },
      { skill: 'Data Modeling', weight: 10, criteria: 'Star schema is correctly normalized, keys and constraints are defined, supports analytical queries' },
      { skill: 'Error Handling & Documentation', weight: 15, criteria: 'Dead-letter queues, data quality checks, operational runbook and clear documentation' }
    ],
    passScore: 74
  },

  assignments: [
    {
      title: 'SQL Warehouse Modeling Assignment',
      stage: 'Beginner',
      objective: 'Design and implement a star schema in PostgreSQL for an e-commerce analytics workload, then write analytical queries that demonstrate the schema\'s value.',
      requirements: [
        'Design a star schema with a fact_orders table and dimension tables for date, product and customer',
        'Implement the schema with appropriate data types, primary keys and foreign keys',
        'Load sample data into all tables using INSERT or COPY',
        'Write five analytical queries using window functions, aggregations and joins',
        'Explain the performance trade-offs of your schema design decisions'
      ],
      skillsEvaluated: ['SQL', 'Database Design', 'PostgreSQL', 'Data Modeling'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit your PostgreSQL DDL script, data loading script, the five analytical queries with results, and a short write-up explaining your schema design choices.',
        textLabel: 'Schema design rationale',
        minTextLength: 800,
        linkLabels: ['DDL script', 'Query results']
      }
    },
    {
      title: 'Spark Batch Processing Assignment',
      stage: 'Intermediate',
      objective: 'Build a PySpark application that reads a large dataset, applies complex transformations and writes optimized output to Parquet, demonstrating performance best practices.',
      requirements: [
        'Read a dataset (10M+ rows) from CSV into a Spark DataFrame',
        'Apply at least five transformations including joins, window functions and aggregations',
        'Partition and bucket the output for downstream query performance',
        'Cache an intermediate DataFrame and explain why it benefits the computation',
        'Compare execution plans and timings for a naive approach versus an optimized one'
      ],
      skillsEvaluated: ['PySpark', 'Spark SQL', 'Performance Tuning', 'Parquet'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the PySpark script, a Jupyter notebook or report comparing naive vs optimized performance, and an explanation of your partitioning strategy.',
        textLabel: 'Performance analysis report',
        minTextLength: 1000,
        linkLabels: ['Spark application code', 'Performance comparison']
      }
    },
    {
      title: 'Kafka Streaming Pipeline Assignment',
      stage: 'Advanced',
      objective: 'Design a real-time event processing pipeline with Kafka producers and consumers that handles high throughput, includes error handling and delivers processed results to a database.',
      requirements: [
        'Build a Kafka producer that generates and publishes at least 100,000 events with realistic schemas',
        'Configure appropriate partitioning strategy and acknowledgment level for the use case',
        'Implement a consumer group that processes events in parallel with at-least-once semantics',
        'Add a dead-letter queue that captures malformed events for later inspection',
        'Write a stream processing step that aggregates events by a key within time windows',
        'Sink aggregated results to PostgreSQL with idempotent upserts'
      ],
      skillsEvaluated: ['Apache Kafka', 'Stream Processing', 'Python', 'PostgreSQL'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the producer and consumer source code, a report describing the partitioning and delivery semantics, and metrics showing throughput and latency under load.',
        textLabel: 'Pipeline architecture and performance report',
        minTextLength: 1200,
        linkLabels: ['Producer code', 'Consumer code', 'Throughput metrics']
      }
    }
  ],

  simTasks: [
    {
      title: 'Diagnose a failing Airflow DAG in production',
      context: 'The nightly data pipeline DAG has been failing for the past three nights. Each failure occurs at a different task, and the on-call analyst has asked the data engineering team to investigate. The business needs the warehouse refreshed by 6am for morning reports.',
      requirements: [
        'Examine Airflow task logs and the metadata database to identify failure patterns',
        'Determine whether failures are caused by infrastructure, upstream data issues or code bugs',
        'Propose immediate fixes to get tonight\'s run to succeed',
        'Design a monitoring and alerting improvement to prevent repeated undetected failures'
      ],
      priority: 'critical',
      dueDayOffset: 2,
      expectedOutput: 'A root-cause analysis identifying the failure source, an immediate remediation plan for tonight, and a monitoring improvement proposal.',
      skills: ['Airflow', 'Debugging', 'Root Cause Analysis', 'Operational Communication']
    },
    {
      title: 'Evaluate a schema migration for a growing data warehouse',
      context: 'The analytics team reports that the most important dashboard query has gone from 2 seconds to 45 seconds over the past quarter. The warehouse has grown from 500 GB to 3 TB. You need to propose a schema and infrastructure plan that restores query performance.',
      requirements: [
        'Analyze the current schema and identify which tables and joins are causing the slowdown',
        'Propose a denormalization or materialized view strategy for the critical dashboard',
        'Evaluate partitioning and indexing changes for the largest fact tables',
        'Estimate the storage and compute cost trade-offs of each proposal',
        'Present a phased migration plan that avoids downtime for the dashboard'
      ],
      priority: 'high',
      dueDayOffset: 5,
      expectedOutput: 'A migration proposal with schema changes, performance estimates, cost analysis and a phased rollout plan.',
      skills: ['SQL', 'Database Performance', 'Data Modeling', 'Stakeholder Communication']
    },
    {
      title: 'Design a Kafka topic strategy for a new event source',
      context: 'The product team wants to add a new microservice that emits user interaction events at approximately 50,000 events per second. You need to design the Kafka topic structure, partitioning and retention policy before the service launches in two weeks.',
      requirements: [
        'Define topic naming conventions and structure for the new event type',
        'Choose a partitioning strategy that balances throughput with ordering requirements',
        'Set retention, replication and acknowledgment policies appropriate for the data criticality',
        'Describe how consumer groups will read from the topics for different downstream use cases',
        'Document operational runbooks for common scenarios: scaling partitions, handling a consumer lag spike, and recovering from a broker failure'
      ],
      priority: 'normal',
      dueDayOffset: 7,
      expectedOutput: 'A Kafka topic design document with partitioning, retention and consumer strategies, plus operational runbooks.',
      skills: ['Apache Kafka', 'System Design', 'Capacity Planning', 'Technical Documentation']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Priya Nair',
      personaRole: 'Data Analyst',
      situation: 'The analyst reports that the warehouse data is inconsistent with the source system and she cannot trust the numbers for her quarterly report.',
      openingMessage:
        'I ran my quarterly revenue query and the totals don\'t match what the finance system shows. The discrepancy is about 4%. I need to present this report to leadership on Friday — can you help me understand what\'s going on with the data?',
      expectedPoints: [
        'Investigates the specific discrepancy by tracing data lineage from source to warehouse',
        'Identifies whether the issue is in extraction, transformation or aggregation logic',
        'Provides an estimated timeline for the fix and interim workarounds',
        'Documents the root cause to prevent recurrence and communicates clearly with finance'
      ]
    },
    {
      kind: 'team',
      personaName: 'James Liu',
      personaRole: 'DevOps Engineer',
      situation: 'The DevOps engineer needs to understand the Spark cluster resource requirements for an upcoming large-scale batch processing job.',
      openingMessage:
        'We need to provision the Spark cluster for the end-of-month data refresh. Last time we either over-provisioned by 3x or under-provisioned and the job took 14 hours. Can you help me spec the right resources this time?',
      expectedPoints: [
        'Estimates data volume and transformation complexity to size executors and memory',
        'Recommends instance types based on compute versus memory versus I/O profile',
        'Proposes autoscaling configuration to handle peak and scale down after completion',
        'Suggests monitoring thresholds to detect resource bottlenecks during execution'
      ]
    },
    {
      kind: 'client',
      personaName: 'Sophie Laurent',
      personaRole: 'VP of Analytics, BrightPath Media',
      situation: 'The client\'s data team has been manually exporting CSVs to build reports and wants to understand what an automated pipeline would look like.',
      openingMessage:
        'Our analysts spend three hours every morning downloading CSVs from different systems and merging them in Excel. We\'ve heard about automated data pipelines but we\'re not sure what\'s involved or whether it\'s worth the investment for our scale.',
      expectedPoints: [
            'Asks clarifying questions about data volume, number of sources and report complexity',
            'Explains what a pipeline would look like at their scale in non-technical language',
            'Provides a realistic scope and timeline estimate for an initial implementation',
            'Discusses the trade-offs: upfront investment versus recurring manual cost and error risk'
          ]
    },
    {
      kind: 'client',
      personaName: 'Raj Mehta',
      personaRole: 'CTO, FreshMart',
      situation: 'The client\'s CTO wants to understand why a real-time data pipeline is needed versus the batch pipeline that already works.',
      openingMessage:
        'We have a batch pipeline running every hour that loads data into our warehouse. The board is asking whether we need to invest in real-time streaming. Convince me it\'s worth it — or tell me it isn\'t.',
      expectedPoints: [
        'Assesses the actual business value of real-time versus hourly latency for their use case',
        'Explains the infrastructure and operational complexity trade-offs honestly',
        'Proposes a phased approach if real-time is warranted, starting with the highest-value use case',
        'Sets realistic expectations about cost, team skill requirements and timeline'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'The Kafka cluster experienced a broker failure overnight, causing 2 million events to be lost because the replication factor was set to 1 and acks was set to 1.',
      requiredActions: [
        { action: 'Assess the scope of data loss by comparing expected versus received event counts', good: true, note: 'Quantifying the impact is the first step before any remediation.' },
        { action: 'Increase the replication factor to 3 and change acks to all for critical topics', good: true, note: 'Addressing the root configuration issue prevents recurrence.' },
        { action: 'Implement a producer-side fallback that writes failed publishes to a local buffer for replay', good: true, note: 'Defense in depth: even with replication, producers should handle broker unavailability.' },
        { action: 'Pretend the data loss didn\'t happen since the downstream systems are not affected yet', good: false, note: 'Ignoring data loss erodes trust; acknowledge and address it transparently.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'Mid-sprint, the analytics team requests that the nightly Airflow DAG also generate a real-time dashboard feed, which was not in the original scope.',
      requiredActions: [
        { action: 'Assess whether the existing pipeline architecture supports near-real-time output or requires a new streaming component', good: true, note: 'Understanding the architectural impact prevents building on shaky foundations.' },
        { action: 'Estimate the engineering effort and communicate the timeline impact to the product manager', good: true, note: 'Transparency about scope changes allows informed prioritization decisions.' },
        { action: 'Propose a phased approach: first add an export to a serving layer, then build streaming if latency demands it', good: true, note: 'A phased approach delivers incremental value without derailing the current sprint.' },
        { action: 'Start building the streaming component immediately to demonstrate progress', good: false, note: 'Starting without scope agreement or architecture review risks rework and misaligned expectations.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between batch processing and stream processing. When would you choose one over the other?',
      guidancePoints: [
        'Batch processes finite data sets on a schedule; stream processes unbounded data continuously',
        'Batch is simpler to implement and debug; stream provides lower latency',
        'Batch suits historical analytics and large transformations; stream suits real-time monitoring and alerting',
        'Many architectures combine both: streaming for hot-path insights, batch for comprehensive daily analytics'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'What is data skew and how do you handle it in a Spark job?',
      guidancePoints: [
        'Data skew occurs when one partition has significantly more data than others, causing stragglers',
        'Identify skew by examining partition sizes and task durations in the Spark UI',
        'Mitigate with salting (adding random prefixes), broadcast joins for small tables, or repartitioning',
        'Adaptive query execution in Spark 3.x can automatically handle some skew patterns'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Your Airflow DAG has been running fine for months but suddenly tasks are timing out. Walk through your investigation.',
      guidancePoints: [
        'Check if the upstream data volume has increased beyond what the task can process in the timeout window',
        'Examine whether task resource usage (memory, CPU) has changed due to data growth or code changes',
        'Look for infrastructure issues: worker node load, network latency to external systems, connection pool exhaustion',
        'Consider whether a new dependency or code path introduced a performance regression'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'You need to migrate a 5 TB table from MySQL to PostgreSQL with minimal downtime. How do you approach this?',
      guidancePoints: [
        'Assess the acceptable downtime window and whether a logical or physical migration is appropriate',
        'Use logical replication or CDC (Change Data Capture) to keep MySQL and PostgreSQL in sync during migration',
        'Validate row counts and checksums to verify data integrity after the cutover',
        'Plan a rollback strategy in case the migration encounters unexpected issues'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'A product manager asks you to build a real-time pipeline, but your analysis shows that a batch pipeline running every 30 minutes meets the business requirement at one-tenth the cost. How do you handle this?',
      guidancePoints: [
        'Present the analysis with cost, complexity and maintenance comparisons clearly',
        'Explain what real-time actually adds in terms of infrastructure and operational burden',
        'Propose building the batch solution first with an architecture that can be extended to streaming later',
        'Align on the business metric being optimized — latency versus cost versus reliability'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you decide when to denormalize a data model versus keeping it normalized?',
      guidancePoints: [
        'Consider the primary workload: OLTP benefits from normalization, OLAP from denormalization',
        'Evaluate query frequency and latency requirements for the target consumers',
        'Assess write complexity: denormalized models require more complex update logic',
        'A layered architecture (raw, cleansed, aggregated) lets you maintain both normalized and denormalized views'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain to a non-technical stakeholder why their data dashboard sometimes shows stale numbers.',
      guidancePoints: [
        'Use an analogy they understand: like a news broadcast that airs on a schedule rather than live',
        'Explain the pipeline schedule: when data is extracted, processed and loaded',
        'Be specific about what is causing the delay and when the data will be current',
        'Propose a solution or workaround that fits their actual latency need'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'You discover a data quality issue that affected reporting for the past two weeks. How do you communicate this to leadership?',
      guidancePoints: [
        'Lead with the impact: which reports were affected and by how much',
        'Explain the root cause in plain language without excessive technical detail',
        'Present the fix that has been applied and the monitoring added to prevent recurrence',
        'Provide a plan for reprocessing affected data if accuracy is critical for downstream decisions'
      ]
    }

  ]

}
