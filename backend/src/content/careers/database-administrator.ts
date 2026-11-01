import type { CareerDef } from '../framework.js'

export const databaseAdministrator: CareerDef = {
  slug: 'database-administrator',
  name: 'Database Administrator',
  category: 'IT & Cloud',
  order: 23,
  description:
    'Keeps database estates healthy — design, indexes, transactions, backup/recovery, security and high availability.',
  difficulty: 'Advanced',
  pathSummary:
    'Relational model & SQL fundamentals → indexing & query performance → transactions & concurrency → backup, recovery & high availability → security hardening → production operations & automation.',
  mainSkills: ['SQL', 'Database Design', 'Query Optimization', 'Backup & Recovery', 'High Availability', 'Database Security', 'Performance Tuning', 'Automation Scripting'],
  sourcePlatforms: ['MySQL Documentation', 'PostgreSQL Documentation', 'Microsoft SQL Server Documentation', 'Oracle Documentation'],
  companyName: 'DataVault Systems',
  roleTitle: 'Database Administrator',

  chapters: [
    {
      slug: 'relational-foundations',
      stage: 'Beginner',
      title: 'Relational Model & SQL Foundations',
      description: 'Core concepts every DBA must internalize — tables, keys, normalization and the SQL language.',
      topics: [
        {
          slug: 'relational-model-basics',
          title: 'The Relational Model',
          minutes: 28,
          objectives: ['Explain entities, attributes and relationships', 'Apply normalization up to 3NF', 'Identify primary, foreign and candidate keys'],
          sections: [
            { heading: 'Tables and relationships', body: 'Data lives in relations (tables) composed of tuples (rows) and attributes (columns). Relationships between entities are expressed through foreign keys referencing primary keys, enabling joins that reconstruct logical data without duplication.' },
            { heading: 'Normalization goals', body: 'First normal form eliminates repeating groups; second normal form removes partial dependencies; third normal form removes transitive dependencies. Normalization reduces update anomalies and wasted storage at the cost of more joins — a trade-off DBAs manage deliberately.' },
            { heading: 'When to denormalize', body: 'Read-heavy analytical workloads or latency-critical paths sometimes justify computed columns, materialized views or redundant data. Document the denormalization so future maintainers understand the intentional trade-off.' }
          ],
          links: [
            { title: 'MySQL data types reference', url: 'https://dev.mysql.com/doc/refman/8.0/en/data-types.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Column types and storage characteristics.' },
            { title: 'PostgreSQL CREATE TABLE', url: 'https://www.postgresql.org/docs/current/sql-createtable.html', sourceName: 'PostgreSQL Documentation', resourceType: 'reference', relationship: 'Table creation syntax and constraints.' },
            { title: 'SQL Server normalization guide', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/database-design/database-normalization-basics', sourceName: 'Microsoft SQL Server Documentation', resourceType: 'guide', relationship: 'Normalization fundamentals from Microsoft.' }
          ],
          quiz: {
            prompt: 'Which normal form removes transitive dependencies?',
            options: ['First', 'Second', 'Third', 'Fourth'],
            answerIndex: 2,
            explanation: '3NF requires that non-key attributes depend only on the primary key, not on other non-key attributes.'
          }
        },
        {
          slug: 'sql-crud-and-joins',
          title: 'SQL CRUD & Joins',
          minutes: 30,
          objectives: ['Write SELECT, INSERT, UPDATE and DELETE statements', 'Use INNER, LEFT, RIGHT and FULL joins correctly', 'Apply GROUP BY, HAVING and aggregate functions'],
          sections: [
            { heading: 'DML operations', body: 'SELECT retrieves data, INSERT adds rows, UPDATE modifies existing rows, DELETE removes them. Every write operation should be deliberate — a missing WHERE clause in UPDATE or DELETE can modify or destroy an entire table in production.' },
            { heading: 'Join mechanics', body: 'INNER JOIN returns only matching rows from both sides. LEFT JOIN keeps all left rows even without matches. RIGHT JOIN mirrors LEFT. FULL OUTER JOIN keeps all rows from both. Understanding which rows survive each join type is fundamental to writing correct reports and fixing data quality issues.' },
            { heading: 'Aggregation and grouping', body: 'GROUP BY partitions rows so aggregate functions (COUNT, SUM, AVG, MAX, MIN) compute per-group. HAVING filters groups after aggregation — unlike WHERE which filters rows before grouping. This distinction is a common source of bugs in analytical queries.' }
          ],
          links: [
            { title: 'MySQL SELECT syntax', url: 'https://dev.mysql.com/doc/refman/8.0/en/select.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Complete SELECT statement reference.' },
            { title: 'PostgreSQL SELECT tutorial', url: 'https://www.postgresql.org/docs/current/tutorial-select.html', sourceName: 'PostgreSQL Documentation', resourceType: 'tutorial', relationship: 'Hands-on SELECT walkthrough.' },
            { title: 'SQL Server JOIN types', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/performance/joins', sourceName: 'Microsoft SQL Server Documentation', resourceType: 'guide', relationship: 'Join algorithms and performance implications.' }
          ],
          quiz: {
            prompt: 'What is the key difference between WHERE and HAVING?',
            options: ['WHERE filters rows before grouping; HAVING filters groups after aggregation', 'They are identical', 'HAVING works only with JOINs', 'WHERE is deprecated in modern SQL'],
            answerIndex: 0,
            explanation: 'WHERE operates on individual rows pre-aggregation; HAVING operates on grouped results post-aggregation.'
          }
        },
        {
          slug: 'ddl-and-schema-management',
          title: 'DDL & Schema Management',
          minutes: 27,
          objectives: ['Create and alter tables, indexes and constraints', 'Manage schemas across environments with versioned migrations', 'Understand online DDL limitations'],
          sections: [
            { heading: 'Data Definition Language', body: 'CREATE TABLE, ALTER TABLE, DROP TABLE and TRUNCATE define and reshape schema. Constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, NOT NULL) encode business rules at the database level so invalid data cannot enter regardless of application bugs.' },
            { heading: 'Versioned migrations', body: 'Every schema change should be a numbered, reviewable migration file (Flyway, Liquibase or Alembic). Forward-only migrations with rollback scripts let teams deploy schema changes safely alongside code. Never alter production schema by hand.' },
            { heading: 'Online DDL considerations', body: 'Large ALTER TABLE operations can lock tables and block traffic. MySQL instant DDL, PostgreSQL CREATE INDEX CONCURRENTLY, and Oracle Online DDL reduce lock duration. Understand your engine\'s limits before running DDL on busy tables.' }
          ],
          links: [
            { title: 'MySQL ALTER TABLE reference', url: 'https://dev.mysql.com/doc/refman/8.0/en/alter-table.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Schema modification syntax and options.' },
            { title: 'PostgreSQL ALTER TABLE', url: 'https://www.postgresql.org/docs/current/sql-altertable.html', sourceName: 'PostgreSQL Documentation', resourceType: 'reference', relationship: 'PostgreSQL-specific alteration capabilities.' },
            { title: 'Oracle Online DDL', url: 'https://docs.oracle.com/en/database/oracle/oracle-database/19/tgsql/overview-of-optimizing-sql-statements.html', sourceName: 'Oracle Documentation', resourceType: 'guide', relationship: 'Online DDL and performance optimization.' }
          ],
          quiz: {
            prompt: 'Which is the safest way to add an index to a busy production table?',
            options: ['ALTER TABLE t ADD INDEX (col) with table locked', 'CREATE INDEX CONCURRENTLY or online DDL equivalent', 'Export table, add index, reimport', 'Ignore it — indexes do not matter at scale'],
            answerIndex: 1,
            explanation: 'Concurrent or online index creation avoids long locks that would block production reads and writes.'
          }
        }
      ]
    },
    {
      slug: 'indexing-performance',
      stage: 'Foundation',
      title: 'Indexing & Query Performance',
      description: 'Making queries fast — index strategies, query plans and the tools that reveal performance bottlenecks.',
      topics: [
        {
          slug: 'index-types-and-strategy',
          title: 'Index Types & Strategy',
          minutes: 29,
          objectives: ['Choose between B-tree, hash and composite indexes', 'Apply covering indexes and partial indexes', 'Evaluate index trade-offs on write-heavy workloads'],
          sections: [
            { heading: 'B-tree and hash indexes', body: 'B-tree indexes support range queries, inequality and equality efficiently and are the default in most engines. Hash indexes offer O(1) equality lookup but cannot handle ranges. Composite B-tree indexes follow leftmost-prefix rules — the column order in a multi-column index determines which query patterns benefit.' },
            { heading: 'Covering and partial indexes', body: 'A covering index includes all columns a query needs, eliminating table lookups entirely. Partial indexes (PostgreSQL) or filtered indexes (SQL Server) index only rows matching a condition, dramatically reducing size and write cost for selective queries.' },
            { heading: 'Write cost of indexes', body: 'Every index slows INSERT, UPDATE and DELETE because the engine must maintain the index structure. A table with 15 indexes may be fast on reads but dangerously slow on writes. Audit indexes periodically against actual query patterns using pg_stat_user_indexes or MySQL performance_schema.' }
          ],
          links: [
            { title: 'MySQL index optimization', url: 'https://dev.mysql.com/doc/refman/8.0/en/optimization-indexes.html', sourceName: 'MySQL Documentation', resourceType: 'guide', relationship: 'Index usage and optimization strategies.' },
            { title: 'PostgreSQL indexes', url: 'https://www.postgresql.org/docs/current/indexes.html', sourceName: 'PostgreSQL Documentation', resourceType: 'documentation', relationship: 'Index types and usage in PostgreSQL.' },
            { title: 'Oracle indexing concepts', url: 'https://docs.oracle.com/en/database/oracle/oracle-database/19/tgsql/indexes.html', sourceName: 'Oracle Documentation', resourceType: 'guide', relationship: 'Oracle index types and when to use each.' }
          ],
          quiz: {
            prompt: 'A composite index on (department_id, hire_date) will help which query?',
            options: ['SELECT * FROM emp WHERE hire_date > \'2024-01-01\'', 'SELECT * FROM emp WHERE department_id = 5 AND hire_date > \'2024-01-01\'', 'SELECT * FROM emp ORDER BY last_name', 'SELECT * FROM emp WHERE salary > 50000'],
            answerIndex: 1,
            explanation: 'B-tree composite indexes follow leftmost-prefix rules — the query must filter on the leading column (department_id) to use the index.'
          }
        },
        {
          slug: 'reading-query-plans',
          title: 'Reading Query Plans',
          minutes: 30,
          objectives: ['Interpret EXPLAIN output from multiple engines', 'Identify full table scans and expensive join algorithms', 'Use query plan analysis to justify index or rewrite decisions'],
          sections: [
            { heading: 'EXPLAIN across engines', body: 'MySQL EXPLAIN, PostgreSQL EXPLAIN ANALYZE and SQL Server Execution Plans all reveal how the optimizer processes a query. Look for scan type (sequential vs index), join method (nested loop vs hash join vs merge join) and estimated vs actual row counts.' },
            { heading: 'Cost signals in plans', body: 'Sequential scans on large tables, temporary sort operations, filesort equivalents and nested loops over unindexed sets are red flags. High estimated row counts with low actual counts signal stale statistics — run ANALYZE to refresh.' },
            { heading: 'Plan-guided rewrites', body: 'When EXPLAIN reveals a bad plan, rewrites beat blind index creation: rewrite subqueries as joins, push predicates into CTEs, restructure OR predicates into UNION ALL, or materialize intermediate results. Plans turn SQL from guesswork into engineering.' }
          ],
          links: [
            { title: 'MySQL EXPLAIN output', url: 'https://dev.mysql.com/doc/refman/8.0/en/explain-output.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Column-by-column EXPLAIN interpretation.' },
            { title: 'PostgreSQL EXPLAIN', url: 'https://www.postgresql.org/docs/current/using-explain.html', sourceName: 'PostgreSQL Documentation', resourceType: 'guide', relationship: 'Reading and interpreting PostgreSQL query plans.' },
            { title: 'SQL Server execution plans', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/performance/execution-plans', sourceName: 'Microsoft SQL Server Documentation', resourceType: 'guide', relationship: 'Graphical and text execution plan analysis.' }
          ],
          quiz: {
            prompt: 'EXPLAIN shows a sequential scan on a 50M-row table for a query with WHERE indexed_col = 42. What is most likely wrong?',
            options: ['The index does not exist or is not usable for this query', 'The table is too large for any index', 'Sequential scans are always faster', 'Nothing — this is normal'],
            answerIndex: 0,
            explanation: 'The optimizer chose a sequential scan because no usable index exists, or statistics are stale, or the index column type does not match the predicate.'
          }
        },
        {
          slug: 'performance-tuning-workflow',
          title: 'Performance Tuning Workflow',
          minutes: 28,
          objectives: ['Establish a repeatable tuning methodology', 'Use engine-specific performance tools to locate bottlenecks', 'Apply caching and connection pool tuning'],
          sections: [
            { heading: 'Baseline first', body: 'Measure before optimizing. Capture baseline metrics — query latency p50/p95/p99, connection pool utilization, buffer pool hit ratio, lock wait time. Without a baseline, every "optimization" is an anecdote, not engineering.' },
            { heading: 'Engine-specific tools', body: 'MySQL performance_schema and sys schema expose per-query metrics. PostgreSQL pg_stat_statements tracks query frequency and timing. Oracle AWR reports summarize system-level trends. Learn your engine\'s observability stack — it is your primary diagnostic toolkit.' },
            { heading: 'Connection pools and caching', body: 'Connection pooling (PgBouncer, ProxySQL, HikariCP) amortizes connection overhead. Application-level caching (Redis, Memcached) shields hot reads. Cache invalidation remains hard — design explicit TTL and invalidation strategies before caching anything.' }
          ],
          links: [
            { title: 'MySQL performance_schema', url: 'https://dev.mysql.com/doc/refman/8.0/en/performance-schema.html', sourceName: 'MySQL Documentation', resourceType: 'documentation', relationship: 'Runtime performance instrumentation.' },
            { title: 'PostgreSQL pg_stat_statements', url: 'https://www.postgresql.org/docs/current/pgstatstatements.html', sourceName: 'PostgreSQL Documentation', resourceType: 'documentation', relationship: 'Tracking query execution statistics.' },
            { title: 'Oracle performance tuning', url: 'https://docs.oracle.com/en/database/oracle/oracle-database/19/tgsql/introduction-to-sql-tuning.html', sourceName: 'Oracle Documentation', resourceType: 'guide', relationship: 'Oracle SQL tuning methodology.' }
          ],
          quiz: {
            prompt: 'Which metric best indicates buffer pool efficiency?',
            options: ['Number of open connections', 'Buffer pool hit ratio (cache hits / total reads)', 'CPU utilization percentage', 'Disk temperature'],
            answerIndex: 1,
            explanation: 'A high hit ratio means most reads are served from memory; a low ratio means the engine is hitting disk, which is orders of magnitude slower.'
          }
        }
      ]
    },
    {
      slug: 'transactions-and-recovery',
      stage: 'Intermediate',
      title: 'Transactions, Concurrency & Recovery',
      description: 'Keeping data consistent under concurrent access — ACID guarantees, locking strategies and backup/recovery fundamentals.',
      topics: [
        {
          slug: 'acid-and-isolation',
          title: 'ACID Guarantees & Isolation Levels',
          minutes: 30,
          objectives: ['Explain Atomicity, Consistency, Isolation and Durability', 'Compare READ COMMITTED, REPEATABLE READ and SERIALIZABLE', 'Select isolation level based on workload conflict patterns'],
          sections: [
            { heading: 'ACID defined', body: 'Atomicity ensures all-or-nothing execution. Consistency guarantees constraints hold after every transaction. Isolation prevents concurrent transactions from interfering. Durability ensures committed data survives crashes. These four properties are the foundation of data correctness.' },
            { heading: 'Isolation level trade-offs', body: 'READ COMMITTED avoids dirty reads but permits non-repeatable reads and phantom reads. REPEATABLE READ adds snapshot consistency within a transaction. SERIALIZABLE prevents all anomalies but kills throughput on conflicting workloads. Most OLTP systems use READ COMMITTED or REPEATABLE READ.' },
            { heading: 'MVCC and engine implementation', body: 'PostgreSQL uses Multi-Version Concurrency Control — readers never block writers and writers never block readers. MySQL InnoDB uses undo logs for MVCC. Understanding your engine\'s concurrency model is essential for diagnosing lock contention and deadlocks.' }
          ],
          links: [
            { title: 'MySQL transaction isolation', url: 'https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-isolation-levels.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'InnoDB isolation levels explained.' },
            { title: 'PostgreSQL transaction isolation', url: 'https://www.postgresql.org/docs/current/transaction-iso.html', sourceName: 'PostgreSQL Documentation', resourceType: 'documentation', relationship: 'PostgreSQL isolation semantics and MVCC.' },
            { title: 'SQL Server isolation levels', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/transaction-isolation-levels', sourceName: 'Microsoft SQL Server Documentation', resourceType: 'guide', relationship: 'Isolation levels and snapshot isolation in SQL Server.' }
          ],
          quiz: {
            prompt: 'Which isolation level fully prevents dirty reads, non-repeatable reads and phantom reads?',
            options: ['READ UNCOMMITTED', 'READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE'],
            answerIndex: 3,
            explanation: 'SERIALIZABLE serializes transactions as if executed sequentially, preventing all concurrency anomalies at the cost of throughput.'
          }
        },
        {
          slug: 'locking-and-deadlocks',
          title: 'Locking & Deadlock Resolution',
          minutes: 29,
          objectives: ['Distinguish shared, exclusive and gap locks', 'Identify deadlock patterns from engine diagnostics', 'Apply deadlock prevention strategies'],
          sections: [
            { heading: 'Lock types', body: 'Shared locks allow concurrent reads; exclusive locks block both reads and writes. Gap locks and next-key locks (InnoDB) prevent phantom inserts in ranges. Row-level locks minimize contention but still require careful transaction design to avoid cascading waits.' },
            { heading: 'Deadlock mechanics', body: 'A deadlock occurs when two transactions each hold a lock the other needs. Engines detect deadlocks via wait-for graph analysis and abort one victim transaction. Short, consistent lock ordering across the application eliminates most deadlocks at the source.' },
            { heading: 'Diagnostics and remediation', body: 'MySQL SHOW ENGINE INNODB STATUS, PostgreSQL pg_locks, and SQL Server sys.dm_tran_locks reveal lock conflicts. Deadlock logs show victim and winner transactions with SQL text. Long-running transactions holding locks are often the root cause — kill idle transactions aggressively.' }
          ],
          links: [
            { title: 'InnoDB lock modes', url: 'https://dev.mysql.com/doc/refman/8.0/en/innodb-lock-modes.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Lock types and compatibility matrix.' },
            { title: 'PostgreSQL explicit locking', url: 'https://www.postgresql.org/docs/current/explicit-locking.html', sourceName: 'PostgreSQL Documentation', resourceType: 'documentation', relationship: 'Lock levels and when to use advisory locks.' },
            { title: 'SQL Server deadlock detection', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/performance/resolve-a-deadlock', sourceName: 'Microsoft SQL Server Documentation', resourceType: 'guide', relationship: 'Detecting and resolving deadlocks in SQL Server.' }
          ],
          quiz: {
            prompt: 'A deadlock is detected. The DB engine will…',
            options: ['Kill both transactions', 'Kill one transaction (the victim) and let the other proceed', 'Wait indefinitely for one to finish', 'Crash the server'],
            answerIndex: 1,
            explanation: 'The engine selects a victim based on cost and rolls it back so the other transaction can proceed.'
          }
        },
        {
          slug: 'backup-and-recovery',
          title: 'Backup Strategies & Recovery',
          minutes: 30,
          objectives: ['Design full, incremental and differential backup schedules', 'Test restore procedures and measure RPO/RTO', 'Implement point-in-time recovery with binary/WAL logs'],
          sections: [
            { heading: 'Backup types', body: 'Full backups capture the entire database at a point in time. Differential backups capture changes since the last full backup. Incremental backups capture changes since the last backup of any type. Combine all three based on RPO (how much data loss is tolerable) and RTO (how quickly you must restore).' },
            { heading: 'Restore is the backup', body: 'A backup you have never restored is not a backup — it is a hope. Regularly practice restores to a separate environment and measure actual RTO. Document the restore procedure so any team member can execute it under pressure.' },
            { heading: 'Point-in-time recovery', body: 'MySQL binary logs, PostgreSQL WAL archives and Oracle redo logs enable replaying changes to any specific moment within the retention window. Combine with full/incremental base backups for granular recovery — essential for recovering from accidental data corruption.' }
          ],
          links: [
            { title: 'MySQL backup and recovery', url: 'https://dev.mysql.com/doc/refman/8.0/en/backup-and-recovery.html', sourceName: 'MySQL Documentation', resourceType: 'guide', relationship: 'Backup methods and point-in-time recovery.' },
            { title: 'PostgreSQL backup', url: 'https://www.postgresql.org/docs/current/continuous-archiving.html', sourceName: 'PostgreSQL Documentation', resourceType: 'documentation', relationship: 'WAL archiving and point-in-time recovery.' },
            { title: 'Oracle backup and recovery', url: 'https://docs.oracle.com/en/database/oracle/oracle-database/19/bradv/oracle-database-backup-and-recovery.html', sourceName: 'Oracle Documentation', resourceType: 'guide', relationship: 'RMAN backup and recovery concepts.' }
          ],
          quiz: {
            prompt: 'Which combination provides the best RPO for a transactional database?',
            options: ['Full backup weekly, no WAL retention', 'Full backup daily plus continuous WAL/binary log archiving', 'Hourly snapshots without logs', 'No backup — replication is sufficient'],
            answerIndex: 1,
            explanation: 'Continuous WAL/binary log archiving enables point-in-time recovery, minimizing data loss to seconds rather than hours.'
          }
        }
      ]
    },
    {
      slug: 'security-and-operations',
      stage: 'Advanced',
      title: 'Security, High Availability & Operations',
      description: 'Hardening databases against threats and designing resilient, always-on architectures.',
      topics: [
        {
          slug: 'database-security',
          title: 'Database Security Hardening',
          minutes: 30,
          objectives: ['Implement least-privilege access control per role', 'Encrypt data at rest and in transit', 'Audit and monitor database activity for anomalies'],
          sections: [
            { heading: 'Least-privilege roles', body: 'Create application-specific database users with only the permissions their queries require. Never connect applications as root or DBA. Use role-based access control with schema-level grants so a breach of one application does not compromise the entire estate.' },
            { heading: 'Encryption layers', body: 'Encrypt data in transit with TLS. Encrypt data at rest using TDE (Transparent Data Encryption) or engine-level encryption functions. Protect encryption keys with a key management service — keys stored alongside encrypted data provide zero additional security.' },
            { heading: 'Audit and monitoring', body: 'Enable query logging (audit log, pgaudit, Oracle Audit Vault) to track who ran what and when. Feed logs to a SIEM for anomaly detection — unusual bulk exports, off-hours DDL or privilege escalation attempts deserve immediate investigation.' }
          ],
          links: [
            { title: 'MySQL security', url: 'https://dev.mysql.com/doc/refman/8.0/en/security.html', sourceName: 'MySQL Documentation', resourceType: 'guide', relationship: 'Security features and best practices.' },
            { title: 'PostgreSQL client authentication', url: 'https://www.postgresql.org/docs/current/client-authentication.html', sourceName: 'PostgreSQL Documentation', resourceType: 'documentation', relationship: 'Authentication methods and pg_hba.conf configuration.' },
            { title: 'Oracle Database security', url: 'https://docs.oracle.com/en/database/oracle/oracle-database/19/segu/oracle-database-security-guide.html', sourceName: 'Oracle Documentation', resourceType: 'guide', relationship: 'Comprehensive security hardening guide.' }
          ],
          quiz: {
            prompt: 'An application should connect to the database as…',
            options: ['The root / sys account', 'A dedicated user with only SELECT, INSERT, UPDATE on required schemas', 'A shared DBA account for convenience', 'No credentials — trust the network'],
            answerIndex: 1,
            explanation: 'Least privilege limits blast radius if the application is compromised.'
          }
        },
        {
          slug: 'high-availability-architecture',
          title: 'High Availability Architecture',
          minutes: 29,
          objectives: ['Design replication topologies for failover', 'Implement automatic failover and read scaling', 'Understand eventual consistency in replicated systems'],
          sections: [
            { heading: 'Replication fundamentals', body: 'Synchronous replication guarantees zero data loss but adds write latency. Asynchronous replication improves write performance at the cost of possible data loss on failover. Semi-synchronous replication (MySQL) or synchronous standby (PostgreSQL streaming) balances durability and performance.' },
            { heading: 'Failover and load balancing', body: 'Automatic failover with tools like Patroni (PostgreSQL), InnoDB Cluster (MySQL) or Always On Availability Groups (SQL Server) detects primary failure and promotes a standby. Route read traffic to replicas with a proxy (ProxySQL, PgBouncer, HAProxy) for horizontal read scaling.' },
            { heading: 'Consistency trade-offs', body: 'Replication lag means replicas may serve stale reads. Monitor replication lag (seconds behind primary) and route latency-sensitive reads to the primary. Multi-region setups face network partition challenges — CAP theorem constrains every distributed design.' }
          ],
          links: [
            { title: 'MySQL replication', url: 'https://dev.mysql.com/doc/refman/8.0/en/replication.html', sourceName: 'MySQL Documentation', resourceType: 'guide', relationship: 'Replication setup and configuration.' },
            { title: 'PostgreSQL replication', url: 'https://www.postgresql.org/docs/current/warm-standby.html', sourceName: 'PostgreSQL Documentation', resourceType: 'documentation', relationship: 'Streaming replication and standby servers.' },
            { title: 'SQL Server Always On', url: 'https://learn.microsoft.com/en-us/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups', sourceName: 'Microsoft SQL Server Documentation', resourceType: 'guide', relationship: 'Availability groups architecture and failover.' }
          ],
          quiz: {
            prompt: 'In asynchronous replication, the primary crashes before the replica receives the latest transaction. What happens?',
            options: ['The replica has the data — nothing is lost', 'The committed transaction is lost until the primary recovers', 'The entire database is corrupted', 'Replication automatically prevents this scenario'],
            answerIndex: 1,
            explanation: 'Asynchronous replication does not confirm writes on the replica, so the last transactions can be lost on primary failure.'
          }
        },
        {
          slug: 'automation-and-monitoring',
          title: 'DBA Automation & Monitoring',
          minutes: 28,
          objectives: ['Set up meaningful database alerts and dashboards', 'Automate routine maintenance with scheduled jobs', 'Use infrastructure-as-code for database provisioning'],
          sections: [
            { heading: 'Monitoring essentials', body: 'Track connection count, query latency percentiles, buffer pool hit ratio, replication lag, lock wait time, and disk usage. Alert on thresholds — connection count near max, disk below 20% free, replication lag above 30 seconds. Dashboards (Grafana, CloudWatch) turn metrics into operational awareness.' },
            { heading: 'Automated maintenance', body: 'Schedule statistics gathering (ANALYZE, UPDATE STATISTICS), index rebuilds for fragmentation, log rotation and backup verification. Tools like pg_cron (PostgreSQL), MySQL Event Scheduler or SQL Server Agent execute these reliably so humans do not forget.' },
            { heading: 'Infrastructure as code', body: 'Manage database provisioning and configuration through Terraform, CloudFormation or Ansible. Version-controlled infrastructure ensures reproducible environments, enables peer review of changes and eliminates snowflake configurations that no one fully understands.' }
          ],
          links: [
            { title: 'MySQL performance schema monitoring', url: 'https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-reference.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Key performance schema queries.' },
            { title: 'PostgreSQL monitoring', url: 'https://www.postgresql.org/docs/current/monitoring.html', sourceName: 'PostgreSQL Documentation', resourceType: 'documentation', relationship: 'Standard views and statistics for monitoring.' },
            { title: 'Oracle database administration', url: 'https://docs.oracle.com/en/database/oracle/oracle-database/19/admin/database-administration.html', sourceName: 'Oracle Documentation', resourceType: 'guide', relationship: 'Administrative tasks and automation patterns.' }
          ],
          quiz: {
            prompt: 'Which alert should be highest priority for a DBA on-call?',
            options: ['CPU at 60%', 'Disk space below 15% free on the data volume', 'A query took 2 seconds', '3 open connections'],
            answerIndex: 1,
            explanation: 'Disk exhaustion causes immediate write failures and potential data corruption — it is the most operationally urgent alert.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Database Reliability & Security Audit',
    coverage: ['Schema Design', 'Indexing Strategy', 'Backup & Recovery', 'Security Hardening', 'High Availability'],
    brief:
      'Given a poorly designed e-commerce database (missing indexes, no backup policy, shared DBA credentials, no replication), produce a comprehensive audit report that includes corrected schema DDL, an indexing plan with justification, a backup/recovery strategy with RPO/RTO targets, a security hardening checklist, and a high-availability design.',
    requirements: [
      'Corrected DDL with normalized schema, constraints and comments',
      'Index plan covering each index with EXPLAIN-based justification',
      'Backup schedule with full/incremental/WAL archiving and restore procedure',
      'Security checklist: roles, least privilege, encryption, audit logging',
      'HA architecture diagram description with replication strategy and failover plan'
    ],
    expectedOutput:
      'A professional database audit report that another DBA could execute without additional clarification.',
    rubric: [
      { skill: 'Schema Design', weight: 20, criteria: 'Normalized tables, proper constraints, data types chosen deliberately' },
      { skill: 'Indexing', weight: 20, criteria: 'Index plan justified by query patterns and EXPLAIN output, not speculative' },
      { skill: 'Backup & Recovery', weight: 25, criteria: 'RPO/RTO targets defined, backup types combined correctly, restore tested conceptually' },
      { skill: 'Security', weight: 20, criteria: 'Least privilege enforced, encryption configured, audit logging enabled' },
      { skill: 'High Availability', weight: 15, criteria: 'Replication topology realistic, failover strategy defined, consistency trade-offs acknowledged' }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'Schema Design Challenge',
      stage: 'Foundation',
      objective: 'Design a normalized relational schema for a hospital appointment system with patients, doctors, appointments and medical records.',
      requirements: ['ER diagram description with entities and relationships', 'DDL for all tables with primary/foreign keys and constraints', 'At least 5 example queries covering CRUD and joins', 'Index recommendations with justification', 'Normalization justification for each design decision'],
      skillsEvaluated: ['SQL', 'Database Design', 'Query Optimization'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: { instructions: 'Submit the complete schema design document.', textLabel: 'Schema design doc', minTextLength: 1200 }
    },
    {
      title: 'Backup & Recovery Plan',
      stage: 'Intermediate',
      objective: 'Write a production backup and recovery plan for a high-traffic SaaS application running MySQL or PostgreSQL.',
      requirements: ['Full/incremental backup schedule with retention policy', 'WAL/binary log archiving configuration for point-in-time recovery', 'Restore procedure step-by-step with time estimates', 'RPO and RTO targets with justification', 'Disaster recovery drill schedule and checklist'],
      skillsEvaluated: ['Backup & Recovery', 'High Availability', 'Automation Scripting'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: { instructions: 'Submit the backup and recovery plan.', textLabel: 'Recovery plan', minTextLength: 1400, linkLabels: ['Vendor backup documentation referenced'] }
    },
    {
      title: 'Security Hardening Audit',
      stage: 'Advanced',
      objective: 'Perform a security audit on a sample database configuration and produce a hardening report with concrete remediation steps.',
      requirements: ['Identify at least 6 security issues from provided configuration', 'Provide remediation steps with exact SQL commands', 'Design a least-privilege role hierarchy', 'Configure audit logging for sensitive tables', 'Encrypt data at rest and in transit with implementation notes'],
      skillsEvaluated: ['Database Security', 'SQL', 'High Availability'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: { instructions: 'Submit the security audit report.', textLabel: 'Security audit report', minTextLength: 1500 }
    }
  ],

  simTasks: [
    {
      title: 'P0: Production database disk full',
      context: 'Alerts fire at 02:00 — the primary MySQL disk is 97% full. Write operations are failing. Applications are throwing errors and the on-call engineer has woken you up.',
      requirements: ['Immediate mitigation steps to restore write capacity', 'Identify the largest tables and check for runaway indexes or logs', 'Long-term prevention plan (monitoring thresholds, archival strategy)'],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Incident resolution note: immediate actions taken, root cause analysis, prevention measures.',
      skills: ['Database Security', 'Performance Tuning', 'Automation Scripting']
    },
    {
      title: 'Replication lag causing stale reads',
      context: 'The product team reports that newly created records do not appear in search results for 5+ minutes. Read queries hit a replica that is lagging behind the primary.',
      requirements: ['Diagnose replication lag source (write volume, network, long queries)', 'Propose immediate mitigation (route critical reads to primary)', 'Design long-term fix (add replicas, optimize heavy queries, consider semi-sync)'],
      priority: 'high',
      dueDayOffset: 4,
      expectedOutput: 'Technical memo: diagnosis, immediate fix, architectural recommendation.',
      skills: ['High Availability', 'Query Optimization', 'Performance Tuning']
    },
    {
      title: 'Schema migration for a 500M-row table',
      context: 'Product needs a new NOT NULL column with a default value on the orders table. Direct ALTER TABLE will lock the table for estimated 45 minutes.',
      requirements: ['Zero-downtime migration strategy using online DDL or dual-write', 'Rollback procedure if migration fails', 'Verification steps to confirm data consistency after migration'],
      priority: 'normal',
      dueDayOffset: 6,
      expectedOutput: 'Migration plan with execution script outline and rollback steps.',
      skills: ['SQL', 'Database Design', 'Automation Scripting']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Rafael Mendes',
      personaRole: 'Backend Lead',
      situation: 'Application team wants a new microservice to directly query production.',
      openingMessage:
        'The new analytics microservice needs real-time data. Can we point it directly at the production database? It just needs read access.',
      expectedPoints: ['Explains risks of direct production access', 'Proposes alternatives (read replica, materialized view, CDC stream)', 'Offers timeline for setting up a safe data path', 'Documents the agreed approach']
    },
    {
      kind: 'team',
      personaName: 'Priya Nair',
      personaRole: 'DevOps Engineer',
      situation: 'Disagreement on backup retention policy.',
      openingMessage:
        'Legal says we need 7 years of retention, but storage costs are already $12K/month. Engineering wants 30 days. Where do we land?',
      expectedPoints: ['Acknowledges both constraints honestly', 'Proposes tiered retention (hot/warm/cold storage)', 'Cites RPO requirements from compliance', 'Provides cost estimate for proposed solution']
    },
    {
      kind: 'client',
      personaName: 'Laura Chen',
      personaRole: 'CTO, FinServe Inc',
      situation: 'Client demands a guaranteed zero-data-loss SLA.',
      openingMessage:
        'We process financial transactions. Our board requires zero data loss — period. Can you guarantee that?',
      expectedPoints: ['Explains synchronous replication trade-offs honestly', 'Defines realistic RPO/RTO with infrastructure requirements', 'Never over-promises on guarantees', 'Provides written SLA draft with caveats']
    },
    {
      kind: 'client',
      personaName: 'David Okonkwo',
      personaRole: 'VP Engineering, ShopGrid',
      situation: 'Client wants to skip backup testing to save time.',
      openingMessage:
        'We have backups configured. Do we really need quarterly restore tests? It takes engineering time away from features.',
      expectedPoints: ['Explains cost of untested backups with real-world examples', 'Proposes lightweight automated restore tests', 'Provides risk quantification', 'Commits to minimal-disruption testing schedule']
    }
  ],

  workplaceScenarios: [
    {
      category: 'Incident',
      situation: 'Friday 17:30: a deployment ran a DDL migration that locked a 200M-row table. All write traffic is failing. The team is preparing for a Monday demo.',
      requiredActions: [
        { action: 'Check engine-specific lock status to confirm the exact lock holder', good: true, note: 'Diagnose before acting — killing the wrong process makes things worse.' },
        { action: 'Kill the long-running DDL if safe, or wait for it to complete depending on progress', good: true, note: 'Assess completion percentage before deciding to abort.' },
        { action: 'Notify stakeholders immediately with a clear timeline estimate', good: true, note: 'Honest communication under pressure builds trust.' },
        { action: 'Run the same untested DDL on production again hoping for a different result', good: false, note: 'Repeating the same action without fixing the root cause is reckless.' }
      ]
    },
    {
      category: 'Disagreement',
      situation: 'The CTO wants to migrate from PostgreSQL to MongoDB "because NoSQL is faster". Your benchmarks show PostgreSQL is faster for your workload.',
      requiredActions: [
        { action: 'Present benchmark data with methodology documented transparently', good: true, note: 'Data-driven arguments are more persuasive than opinions.' },
        { action: 'Acknowledge MongoDB strengths where they genuinely apply', good: true, note: 'Intellectual honesty strengthens your credibility.' },
        { action: 'Propose a proof-of-concept comparison on the actual workload', good: true, note: 'Real workload tests trump synthetic benchmarks.' },
        { action: 'Refuse to discuss alternatives and insist PostgreSQL is the only option', good: false, note: 'Dogmatism damages trust and forecloses legitimate optimization.' }
      ]
    }
  ],

  interviewQuestions: [
    { dimension: 'technical_knowledge', prompt: 'Explain the difference between a clustered and non-clustered index. When would you use each?', guidancePoints: ['Clustered index determines physical row order', 'Non-clustered index points to row location via pointer', 'One clustered index per table, multiple non-clusters', 'Choose based on primary access pattern'] },
    { dimension: 'technical_knowledge', prompt: 'How does MVCC work in PostgreSQL, and why does it matter for long-running transactions?', guidancePoints: ['Snapshot-based read isolation', 'Old row versions retained in tuple storage', 'Long transactions prevent vacuum from reclaiming space', 'Impact on table bloat and performance'] },
    { dimension: 'problem_solving', prompt: 'A query that ran in 50ms yesterday now takes 30 seconds. Walk through your investigation.', guidancePoints: ['Check EXPLAIN plan changes', 'Review recent DDL or data volume changes', 'Check for lock contention or resource exhaustion', 'Measure with pg_stat_statements or slow query log'] },
    { dimension: 'problem_solving', prompt: 'Design a backup strategy for a 2TB database with a 15-minute RPO requirement.', guidancePoints: ['Continuous WAL/binary log archiving', 'Full backup weekly plus hourly incrementals', 'Restore procedure tested quarterly', 'Off-site backup storage for disaster recovery'] },
    { dimension: 'professional_reasoning', prompt: 'A developer insists on using stored procedures for all business logic. What is your position?', guidancePoints: ['Acknowledge performance benefits for data-intensive ops', 'Discuss maintainability concerns (version control, testing)', 'Propose pragmatic middle ground', 'Focus on team capability and deployment workflow'] },
    { dimension: 'professional_reasoning', prompt: 'When would you recommend against automatic failover despite having the infrastructure?', guidancePoints: ['Split-brain risk in network partitions', 'Data consistency requirements exceeding async replication guarantees', 'Cost-benefit of human-initiated vs automatic failover', 'Monitoring and alerting readiness prerequisites'] },
    { dimension: 'communication', prompt: 'Explain to a non-technical product manager why a database migration will take two weeks instead of two days.', guidancePoints: ['Use concrete risk examples (data loss, downtime)', 'Break work into visible phases with milestones', 'Avoid jargon — explain consequences, not implementation', 'Offer interim alternatives to reduce perceived delay'] },
    { dimension: 'communication', prompt: 'You discover a team member has been storing production credentials in a shared Slack channel. How do you handle it?', guidancePoints: ['Immediate credential rotation before anything else', 'Private conversation to understand context', 'Blameless process improvement (secret management tool)', 'Team-wide security awareness follow-up'] }

  ]

}
