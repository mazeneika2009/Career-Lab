import type { CareerDef } from '../framework.js'

export const siteReliabilityEngineer: CareerDef = {
  slug: 'site-reliability-engineer',
  name: 'Site Reliability Engineer',
  category: 'IT & Cloud',
  order: 36,
  description:
    'Applies SRE practice — SLIs/SLOs, observability with Prometheus and Grafana, incident management and capacity planning.',
  difficulty: 'Advanced',
  pathSummary:
    'Linux & systems fundamentals → SLIs, SLOs and error budgets → Observability with Prometheus and Grafana → Incident management, automation & capacity planning.',
  mainSkills: [
    'SLIs, SLOs and Error Budget Management',
    'Prometheus Metrics Collection & PromQL',
    'Grafana Dashboard Design & Alerting',
    'Incident Response & Postmortem Culture',
    'Capacity Planning & Performance Engineering',
    'Linux Systems & Networking Fundamentals',
    'Kubernetes Operations & Reliability',
    'Toil Reduction & Automation'
  ],
  sourcePlatforms: [
    'Google SRE',
    'Kubernetes Documentation',
    'Prometheus Documentation',
    'Grafana Documentation',
    'Linux Documentation'
  ],
  companyName: 'ResilientOps Platform Co.',
  roleTitle: 'Site Reliability Engineer',

  chapters: [
    {
      slug: 'linux-foundations-sre-principles',
      stage: 'Beginner',
      title: 'Linux Foundations & SRE Principles',
      description: 'Building the systems-level foundation every SRE needs — Linux process management, networking, filesystems — paired with the core SRE philosophy of managing reliability through service-level objectives and error budgets.',
      topics: [
        {
          slug: 'linux-processes-services-and-journald',
          title: 'Linux Processes, Services & journald',
          minutes: 28,
          objectives: [
            'Manage system services with systemd, inspect service status and interpret failure modes',
            'Use journalctl to query, filter and follow system logs for real-time troubleshooting',
            'Identify runaway processes using top, htop and pidstat and take corrective action'
          ],
          sections: [
            { heading: 'systemd units and service lifecycle', body: 'Linux distributions that use systemd manage long-running processes as units defined in /etc/systemd/system/. Each unit file declares the executable to run, the user context, resource limits, restart policies and dependencies on other units. The systemctl command controls the lifecycle: start, stop, restart, enable (start on boot) and disable. Understanding restart policies (always, on-failure, on-abnormal) is critical for SRE because they determine how quickly a crashed service recovers without human intervention. A misconfigured RestartSec or a missing WantedBy can silently leave a production service offline.' },
            { heading: 'Structured logging with journald', body: 'journald is the systemd logging daemon that collects structured log data from all services, the kernel and early boot stages. journalctl provides powerful filtering: by unit name, priority level, time range and PID. For SRE work, journalctl -u nginx --since "1 hour ago" --priority err is far more efficient than grep across flat files. Log forwarding to centralized systems (ELK, Loki, CloudWatch) is configured via systemd-journal-remote or journald forwarding directives, ensuring that local troubleshooting and central observability coexist.' },
            { heading: 'Process monitoring and resource identification', body: 'When a production service degrades, identifying the resource bottleneck is the first step. top and htop show real-time CPU, memory and process counts. pidstat provides per-process I/O, context switch and memory statistics. vmstat reveals system-wide CPU wait, memory swap and disk I/O bottlenecks. For SRE, knowing the difference between a service that is CPU-bound versus I/O-bound determines whether to scale vertically, optimize queries or add caching. Automated metric collection replaces manual inspection in production, but the CLI tools remain essential for ad-hoc investigation during incidents.' }
          ],
          links: [
            { title: 'systemd.service — Service unit configuration', url: 'https://www.freedesktop.org/software/systemd/man/systemd.service.html', sourceName: 'Linux Documentation', resourceType: 'reference', relationship: 'systemd unit file reference covering directives for ExecStart, Restart, WantedBy and resource limits.' },
            { title: 'journalctl — Query the systemd journal', url: 'https://www.freedesktop.org/software/systemd/man/journalctl.html', sourceName: 'Linux Documentation', resourceType: 'reference', relationship: 'journalctl man page documenting filtering by unit, priority, time range and output formatting options.' },
            { title: 'Google SRE Book — Monitoring Distributed Systems', url: 'https://sre.google/sre-book/monitoring-distributed-systems/', sourceName: 'Google SRE', resourceType: 'guide', relationship: 'Google SRE guide on the four golden signals and why automated monitoring replaces manual log inspection in production.' }
          ],
          quiz: {
            prompt: 'A web service managed by systemd crashes repeatedly. The unit file has Restart=always and RestartSec=5. After three rapid crashes, the service stops restarting. What is the most likely cause?',
            options: [
              'systemd cannot restart a service more than three times total',
              'systemd entered a rate-limiting state due to rapid restart cycles and requires manual intervention or a timeout',
              'The RestartSec directive prevents any restart within five minutes of the last crash',
              'The service binary is corrupted and systemd refuses to execute it more than twice'
            ],
            answerIndex: 1,
            explanation: 'systemd rate-limits restarts when a service crashes in rapid succession. After a burst of restarts, systemd marks the unit as failed and stops automatic restarts until a timeout elapses or an administrator runs systemctl reset-failed. This prevents crash loops from consuming system resources indefinitely.'
          }
        },
        {
          slug: 'linux-networking-essentials',
          title: 'Linux Networking Essentials',
          minutes: 27,
          objectives: [
            'Diagnose network connectivity issues using ss, ip, curl and tcpdump',
            'Understand TCP connection states and their impact on service reliability',
            'Configure firewall rules with iptables and nftables to control traffic flow'
          ],
          sections: [
            { heading: 'Socket inspection with ss and ip', body: 'The ss command replaces netstat for inspecting open sockets, listening ports and connection states. ss -tlnp shows TCP sockets in LISTEN state with the process name — the first command an SRE runs when a service is unreachable. The ip command manages interfaces, routing tables and neighbor tables. ip addr show displays configured interfaces, while ip route show reveals the kernel routing table. Understanding these tools lets an SRE quickly determine whether a service is bound to the correct interface, whether the route exists and whether a firewall is silently dropping packets.' },
            { heading: 'TCP states and connection health', body: 'TCP connections progress through a defined state machine: SYN_SENT, ESTABLISHED, TIME_WAIT, CLOSE_WAIT and others. A high count of TIME_WAIT sockets indicates rapid connection cycling — common with HTTP/1.1 keep-alive misconfiguration. CLOSE_WAIT sockets indicate the remote end closed but the local process has not — a classic sign of a leaked file descriptor or a process stuck in a blocking operation. For SRE, monitoring TCP state distribution provides early warning of connection pool exhaustion and socket leaks before they cause user-visible errors.' },
            { heading: 'Packet capture and firewall inspection', body: 'tcpdump captures raw network packets on a specified interface with BPF filter expressions. During an incident, capturing traffic between a client and a server can reveal whether packets are being sent, received or silently dropped. iptables and nftables are the Linux kernel packet filtering frameworks. A common SRE scenario is finding that a newly added iptables rule accidentally drops health check traffic because the rule order places it before the accept rule. nftables offers a cleaner syntax and atomic rule replacement, reducing the risk of rule ordering mistakes during live edits.' }
          ],
          links: [
            { title: 'ss — socket statistics', url: 'https://www.man7.org/linux/man-pages/man8/ss.8.html', sourceName: 'Linux Documentation', resourceType: 'reference', relationship: 'ss man page documenting socket inspection, TCP state queries and connection filtering options.' },
            { title: 'tcpdump — dump traffic on a network', url: 'https://www.tcpdump.org/manpages/tcpdump.1.html', sourceName: 'Linux Documentation', resourceType: 'reference', relationship: 'tcpdump man page covering packet capture syntax, BPF filters and output formatting.' },
            { title: 'Prometheus — Instrumenting network metrics', url: 'https://prometheus.io/docs/guides/node-exporter/', sourceName: 'Prometheus Documentation', resourceType: 'guide', relationship: 'Prometheus guide on collecting host-level network metrics including TCP states via node_exporter.' }
          ],
          quiz: {
            prompt: 'An SRE notices 4,000 TCP connections in CLOSE_WAIT state on a production server. The application is becoming unresponsive. What does CLOSE_WAIT indicate?',
            options: [
              'The server is overwhelmed with new connection requests and cannot complete the three-way handshake',
              'The remote peer has closed the connection but the local application has not closed its end, suggesting a file descriptor leak',
              'The connections are being rate-limited by the kernel because the backlog queue is full',
              'The application has closed the connections normally and the kernel is waiting for the OS to reclaim resources'
            ],
            answerIndex: 1,
            explanation: 'CLOSE_WAIT means the remote end sent a FIN and the local TCP stack acknowledged it, but the local application has not called close(). This typically indicates a code path that accepts connections but fails to close them on error — a file descriptor leak that eventually exhausts the connection pool and causes the service to stop accepting new connections.'
          }
        },
        {
          slug: 'slo-sli-error-budget-philosophy',
          title: 'SLOs, SLIs & Error Budgets',
          minutes: 29,
          objectives: [
            'Define meaningful Service Level Indicators that reflect actual user experience',
            'Set Service Level Objectives that balance reliability investment against feature velocity',
            'Calculate and manage error budgets to make data-driven reliability decisions'
          ],
          sections: [
            { heading: 'What to measure — choosing the right SLIs', body: 'SLIs are quantitative measures of a service\'s behavior from the user\'s perspective. The four golden signals — latency, traffic, errors and saturation — provide a framework for choosing SLIs. Latency measures how long requests take, distinguishing successful from failed responses. Traffic measures demand on the service (requests per second, concurrent users). Errors measures the rate of failed requests (HTTP 5xx, timeouts, incorrect responses). Saturation measures how "full" the service is (CPU utilization, memory pressure, queue depth). A common mistake is choosing SLIs that reflect infrastructure health (CPU, disk I/O) rather than user experience (request latency at the 99th percentile).' },
            { heading: 'Setting SLOs that drive decisions', body: 'An SLO is a target value for an SLI over a specified time window. Setting an SLO requires answering: what level of reliability do users actually need, and what can the organization afford to invest in? A 99.9% uptime SLO allows roughly 8.7 hours of downtime per year. A 99.99% SLO allows only 52 minutes. The difference in engineering effort to achieve each is substantial. SLOs should be aspirational but achievable — an SLO the team always meets is too conservative and represents wasted reliability investment. An SLO the team never meets erodes trust and forces the team to be in perpetual violation. The right SLO means the team violates it occasionally, signaling that reliability investment is well-calibrated.' },
            { heading: 'Error budgets as a decision framework', body: 'The error budget is the remaining allowed unreliability within the SLO window. If the SLO is 99.9% over 30 days, the error budget is 0.1% of total requests — roughly 43 minutes of downtime or a sustained 0.1% error rate. When the error budget is healthy, the team can ship features aggressively, run experiments and accept higher risk. When the error budget is depleted or burning fast, the team prioritizes reliability work: fixing flaky tests, reducing flaky deployments, hardening failure modes and eliminating toil. The error budget transforms reliability from an emotional debate into a quantitative discussion: "We have 12 minutes of error budget remaining this month — should we deploy this risky feature?"' }
          ],
          links: [
            { title: 'Google SRE Book — Service Level Objectives', url: 'https://sre.google/sre-book/service-level-objectives/', sourceName: 'Google SRE', resourceType: 'guide', relationship: 'Google SRE chapter on defining SLIs, setting SLOs and using error budgets for decision-making.' },
            { title: 'Prometheus — Recording rules and SLI calculation', url: 'https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/', sourceName: 'Prometheus Documentation', resourceType: 'reference', relationship: 'Prometheus recording rules documentation for precomputing SLI expressions to reduce query-time load.' },
            { title: 'Kubernetes — Pod resource requests and limits', url: 'https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/', sourceName: 'Kubernetes Documentation', resourceType: 'reference', relationship: 'Kubernetes resource management documentation relevant to saturation SLIs and capacity planning.' }
          ],
          quiz: {
            prompt: 'A team sets an SLO of 99.99% availability for their checkout service. After two months, the error budget is perpetually exhausted and the team cannot ship any features. What is the most appropriate response?',
            options: [
              'Invest heavily in reliability improvements until the team can sustain 99.99% without exhausting the budget',
              'Lower the SLO to 99.9% which better reflects the service\'s actual reliability characteristics and current engineering capacity',
              'Remove the SLO entirely and focus on feature development since the target is clearly unrealistic',
              'Replace the SLO with an SLA that includes financial penalties to force the team to meet the target'
            ],
            answerIndex: 1,
            explanation: 'An SLO that the team perpetually violates is not serving its purpose. The correct response is to lower the SLO to reflect realistic reliability that the team can maintain while still delivering features. A 99.9% SLO provides 8.7 hours of error budget per year, giving the team room to operate. Setting an unachievable SLO creates a culture where the team is always in violation and the error budget becomes meaningless.'
          }
        }
      ]
    },
    {
      slug: 'prometheus-grafana-observability',
      stage: 'Foundation',
      title: 'Prometheus, Grafana & Full-Stack Observability',
      description: 'Instrumenting applications with Prometheus metrics, building Grafana dashboards that reveal system behavior at a glance and configuring alerting rules that catch problems before users notice.',
      topics: [
        {
          slug: 'prometheus-architecture-and-metrics',
          title: 'Prometheus Architecture & Metric Types',
          minutes: 28,
          objectives: [
            'Deploy and configure a Prometheus server with appropriate scrape intervals and retention policies',
            'Distinguish between counter, gauge, histogram and summary metric types and when to use each',
            'Write PromQL queries that compute meaningful SLIs from raw application and infrastructure metrics'
          ],
          sections: [
            { heading: 'Prometheus server deployment and configuration', body: 'Prometheus is a time-series database that scrapes metrics endpoints at configurable intervals. A minimal deployment consists of the Prometheus server, a configuration file (prometheus.yml) defining scrape targets and evaluation intervals, and an optional Alertmanager instance. Scrape targets are defined as static targets or discovered dynamically via Kubernetes service discovery, Consul or DNS. Retention policies control how long data is stored locally — typically 15-30 days — with long-term storage delegated to remote write endpoints like Thanos, Cortex or Mimir. The scrape interval should be short enough to detect issues quickly (15 seconds is common) but not so frequent that it overwhelms the storage backend.' },
            { heading: 'Metric types and their use cases', body: 'Counter: a monotonically increasing value that can only go up (total HTTP requests, total bytes transferred). Use counters with rate() or increase() to compute per-second or per-interval values. Gauge: a value that can go up or down (current CPU utilization, queue depth, number of active connections). Use gauges directly without rate(). Histogram: samples observed values and counts them in configurable buckets (request latency distribution). Histograms let you compute percentiles (p50, p95, p99) from the bucket counts. Summary: similar to histogram but computes quantiles on the client side. Histograms are preferred in most cases because they can be aggregated across instances while summaries cannot.' },
            { heading: 'PromQL for SRE workflows', body: 'PromQL (Prometheus Query Language) is the query engine that transforms raw metrics into actionable insights. For latency SLIs: histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m])) computes the 99th percentile request latency over 5 minutes. For error rate SLIs: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) yields the fraction of failed requests. For saturation: node_cpu_seconds_total provides CPU utilization for capacity planning. PromQL supports label matching, mathematical operations, time-series joins and aggregation. Recording rules precompute expensive PromQL expressions at regular intervals, keeping dashboard load times fast.' }
          ],
          links: [
            { title: 'Prometheus Getting Started', url: 'https://prometheus.io/docs/prometheus/latest/getting_started/', sourceName: 'Prometheus Documentation', resourceType: 'guide', relationship: 'Prometheus quickstart covering server setup, configuration file format and initial scraping.' },
            { title: 'Prometheus Metric Types', url: 'https://prometheus.io/docs/practices/instrumentation/#counter-vs-gauge-vs-histogram-vs-summary', sourceName: 'Prometheus Documentation', resourceType: 'reference', relationship: 'Prometheus documentation explaining counter, gauge, histogram and summary with selection guidance.' },
            { title: 'PromQL for beginners', url: 'https://prometheus.io/docs/prometheus/latest/querying/basics/', sourceName: 'Prometheus Documentation', resourceType: 'guide', relationship: 'PromQL basics covering selectors, ranges, functions and aggregation operators.' }
          ],
          quiz: {
            prompt: 'You need to alert when the p95 request latency of your API exceeds 500ms over a 5-minute window. The application exposes http_request_duration_seconds as a histogram. Which PromQL expression is correct?',
            options: [
              'histogram_quantile(0.95, http_request_duration_seconds_bucket)',
              'histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))',
              'avg(http_request_duration_seconds_bucket)',
              'rate(http_request_duration_seconds_sum[5m]) / rate(http_request_duration_seconds_count[5m])'
            ],
            answerIndex: 1,
            explanation: 'histogram_quantile operates on a histogram metric stream, which requires the rate() function to compute the per-second bucket rates over the 5-minute window. Without rate(), you would be feeding raw cumulative bucket counts into the quantile function, producing incorrect results. The expression computes the 95th percentile of the 5-minute latency distribution.'
          }
        },
        {
          slug: 'grafana-dashboard-design',
          title: 'Grafana Dashboard Design & Visualization',
          minutes: 27,
          objectives: [
            'Design role-specific Grafana dashboards that serve operators, developers and leadership',
            'Implement variables, annotations and template-driven panels for interactive exploration',
            'Build dashboard layouts that follow the golden signals — latency, traffic, errors and saturation'
          ],
          sections: [
            { heading: 'Dashboard design principles for SRE', body: 'A well-designed Grafana dashboard answers the question "is the service healthy?" within five seconds. The top row shows the four golden signals as single-stat panels with sparklines: p99 latency, request rate, error rate and CPU/memory saturation. Below that, time-series panels show trends for each signal. Deeper rows provide per-service, per-endpoint and per-pod breakdowns. Dashboard sprawl is the enemy — create purpose-specific dashboards (overview, per-service, capacity planning) and link between them. Use consistent color coding: green for healthy, yellow for warning, red for critical across all dashboards.' },
            { heading: 'Variables and template-driven exploration', body: 'Grafana variables make dashboards interactive. A $service variable populated by a Prometheus label_values query lets operators switch between services without leaving the dashboard. Cascading variables — $cluster > $namespace > $pod — let users drill from high-level to specific without reloading. Variables appear as dropdowns at the top of the dashboard. Use regex transformations to clean up label values (removing namespace prefixes from pod names). Interval variables control the time grouping in aggregate panels, ensuring the visualization remains meaningful whether viewing the last hour or the last week.' },
            { heading: 'Annotations and contextual markers', body: 'Annotations overlay contextual information on time-series panels — deployments, incidents, scaling events, configuration changes. When a dashboard shows a latency spike at 14:30 and an annotation marks "deployment v2.4.1 at 14:25", the correlation is immediate. Annotations can be added manually, via API or automatically from CI/CD pipelines and Kubernetes events. In Grafana, annotations appear as vertical lines with tooltips. For SRE, annotations are essential for post-incident review — they transform a flat graph into a narrative of what happened and why.' }
          ],
          links: [
            { title: 'Grafana Getting Started', url: 'https://grafana.com/docs/grafana/latest/getting-started/', sourceName: 'Grafana Documentation', resourceType: 'guide', relationship: 'Grafana introductory guide covering dashboard creation, data source configuration and visualization basics.' },
            { title: 'Grafana Dashboard Variables', url: 'https://grafana.com/docs/grafana/latest/variables/', sourceName: 'Grafana Documentation', resourceType: 'reference', relationship: 'Grafana variable documentation covering template variables, ad-hoc filters and cascading variable patterns.' },
            { title: 'Prometheus — Visualizing with Grafana', url: 'https://prometheus.io/docs/visualization/grafana/', sourceName: 'Prometheus Documentation', resourceType: 'guide', relationship: 'Prometheus guide on integrating Grafana as a visualization layer with Prometheus data source configuration.' }
          ],
          quiz: {
            prompt: 'An SRE team has 40 Grafana dashboards, most of which overlap in content and show the same CPU and memory panels for different services. Leadership cannot find the right dashboard during incidents. What is the best remediation?',
            options: [
              'Add a search bar to the Grafana home page so users can find dashboards by name',
              'Consolidate into 5-8 purpose-specific dashboards with variables that allow service-specific filtering',
              'Create a README document listing all 40 dashboards and when to use each one',
              'Export all dashboards to a PDF and distribute it to the team'
            ],
            answerIndex: 1,
            explanation: 'Dashboard sprawl creates confusion during incidents when time matters most. Consolidating into a small number of well-designed, variable-driven dashboards ensures that operators always start from a familiar view and can filter to the specific service in question. Variables replace the need for per-service dashboard duplication.'
          }
        },
        {
          slug: 'prometheus-alerting-and-alertmanager',
          title: 'Prometheus Alerting & Alertmanager',
          minutes: 30,
          objectives: [
            'Write Prometheus alerting rules that detect meaningful reliability problems with appropriate thresholds',
            'Configure Alertmanager routing, grouping and silencing for production-grade alert management',
            'Implement dead-man\'s switches and multi-window alerting to reduce false positive fatigue'
          ],
          sections: [
            { heading: 'Alert rule design for SRE', body: 'Good alerts have three properties: they are actionable (someone must do something), they are urgent (delay causes damage) and they are diagnostic (they point to the root cause, not just a symptom). A common anti-pattern is alerting on CPU > 80% — this is not actionable unless it correlates with user impact. Instead, alert on error budget burn rate: if the error budget is being consumed faster than it can regenerate, the team must act. Multi-window burn rate alerts compare short-term (5-minute) and long-term (1-hour) error rates against thresholds derived from the SLO, reducing false positives caused by transient spikes.' },
            { heading: 'Alertmanager routing and grouping', body: 'Alertmanager receives alerts from Prometheus and routes them to the correct destination. A routing tree matches on alert labels: team=platform goes to the SRE Slack channel, team=backend goes to the backend on-call, severity=critical pages the on-call engineer via PagerDuty. Grouping collects related alerts into a single notification — instead of 50 individual pod-crashed alerts, Alertmanager sends one grouped alert after a 5-minute wait window. Inhibition rules suppress lower-severity alerts when a higher-severity alert is firing (suppress pod-crashed when the node-is-down alert is active). Silences suppress specific alerts during maintenance windows.' },
            { heading: 'Dead-man switches and alert health', body: 'A dead-man switch is an alert that fires when it stops firing. Prometheus defines a Watchdog alert that continuously fires with a trivial condition. If Alertmanager does not receive this alert within a configured interval, it sends a notification indicating the monitoring pipeline itself is broken. This catches scenarios where Prometheus crashes, loses connectivity to Alertmanager or the alerting configuration is accidentally deleted. Without a dead-man switch, the team discovers the monitoring gap only when a real incident goes undetected — precisely when monitoring is most critical.' }
          ],
          links: [
            { title: 'Prometheus Alerting Rules', url: 'https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/', sourceName: 'Prometheus Documentation', resourceType: 'reference', relationship: 'Prometheus alerting rules documentation covering rule syntax, labels and evaluation intervals.' },
            { title: 'Alertmanager Configuration', url: 'https://prometheus.io/docs/alerting/latest/configuration/', sourceName: 'Prometheus Documentation', resourceType: 'reference', relationship: 'Alertmanager configuration reference covering routing, grouping, inhibition and silencing.' },
            { title: 'Google SRE — Alerting on SLOs', url: 'https://sre.google/workbook/alerting-on-slos/', sourceName: 'Google SRE', resourceType: 'guide', relationship: 'Google SRE workbook chapter on multi-window burn rate alerting and error budget alert design.' }
          ],
          quiz: {
            prompt: 'A team receives 200 alerts per day, most of which resolve within minutes without any action. Engineers begin ignoring alerts. What is the primary issue and the most effective fix?',
            options: [
              'The team needs more engineers to handle the alert volume',
              'The alerts are not meeting the actionable, urgent and diagnostic criteria — they should be re-evaluated to reduce noise',
              'The alerts should be muted during business hours when engineers are available to investigate manually',
              'The monitoring system should be replaced with a tool that generates fewer alerts'
            ],
            answerIndex: 1,
            explanation: 'Alert fatigue results from alerts that are not actionable, not urgent or not diagnostic. An alert that resolves without action was either too sensitive (threshold too low) or not meaningful (not correlated with user impact). Re-evaluating each alert against the actionable-urgent-diagnostic criteria and adjusting thresholds, converting to logging or removing them reduces noise and restores alert credibility.'
          }
        }
      ]
    },
    {
      slug: 'incident-response-postmortems',
      stage: 'Intermediate',
      title: 'Incident Response, Postmortems & Reliability Culture',
      description: 'Running effective incident response — from detection through mitigation to blameless postmortems that produce lasting improvements — and building the organizational culture that makes reliability sustainable.',
      topics: [
        {
          slug: 'incident-response-workflow',
          title: 'Incident Response Workflow',
          minutes: 30,
          objectives: [
            'Structure incident response around clear roles — incident commander, technical lead and communications lead',
            'Apply escalation criteria that distinguish between incidents requiring immediate response and those that can wait',
            'Execute a structured incident timeline from detection through mitigation to resolution'
          ],
          sections: [
            { heading: 'Incident classification and severity', body: 'Not every alert is an incident. An incident is an event that causes — or risks causing — user-facing impact. Severity levels define the urgency and scope of response. SEV1: complete service outage or data loss affecting a large user base — full team mobilization, executive communication, war room. SEV2: significant degradation affecting a subset of users or a critical path — on-call engineer plus backup, structured investigation. SEV3: minor degradation with workaround — next-business-day investigation. Misclassified incidents waste resources (false SEV1s) or let real damage grow (under-classified SEV2s). Classification should be reassessed as new information emerges during the incident.' },
            { heading: 'Roles during incident response', body: 'The incident commander (IC) owns the incident process, not the technical solution. The IC organizes the response, assigns tasks, tracks the timeline and ensures clear communication. The technical lead dives into the code and infrastructure to identify root cause and implement mitigations. The communications lead updates stakeholders, customers and internal teams. Separating these roles prevents the common failure mode where the most skilled engineer becomes both the debugger and the communicator — context switching between debugging and writing status updates slows both. In small teams, the IC may combine with comms while a second engineer takes the technical lead.' },
            { heading: 'Mitigation before root cause', body: 'During an active incident, the goal is mitigation — restoring service — not root cause analysis. Root cause analysis happens during the postmortem. Mitigation strategies include: rollback to a known-good state (fastest), feature flag toggle to disable the problematic feature, traffic rerouting to a healthy region or service, scaling up capacity to absorb the impact, or reverting a recent infrastructure change. The key insight from SRE is that you can investigate root cause after users are no longer affected. Demanding root cause before mitigation extends the outage and increases blast radius.' }
          ],
          links: [
            { title: 'Google SRE — Managing Incidents', url: 'https://sre.google/sre-book/managing-incidents/', sourceName: 'Google SRE', resourceType: 'guide', relationship: 'Google SRE chapter on incident response structure, roles, escalation and the lifecycle of an incident.' },
            { title: 'Kubernetes — Troubleshooting applications', url: 'https://kubernetes.io/docs/tasks/debug-application-cluster/debug-application/', sourceName: 'Kubernetes Documentation', resourceType: 'guide', relationship: 'Kubernetes troubleshooting guide for diagnosing pod failures, crashes and service connectivity issues.' },
            { title: 'Prometheus — Querying for incident investigation', url: 'https://prometheus.io/docs/prometheus/latest/querying/examples/', sourceName: 'Prometheus Documentation', resourceType: 'reference', relationship: 'Prometheus query examples useful for investigating incidents — rate calculations, top-k queries and aggregation.' }
          ],
          quiz: {
            prompt: 'During a SEV1 outage, the incident commander asks the technical lead to provide a root cause analysis within 15 minutes. The technical lead has not yet identified the mitigation. What should the incident commander prioritize?',
            options: [
              'Insist on the root cause analysis since stakeholders are demanding answers',
              'Redirect the technical lead to focus on mitigation first and defer root cause analysis to the postmortem',
              'Bring in additional engineers to work on both mitigation and root cause simultaneously',
              'Downgrade the incident to SEV2 to give the team more time for investigation'
            ],
            answerIndex: 1,
            explanation: 'The incident commander should redirect focus to mitigation. Root cause analysis during an active outage diverts attention from restoring service. Stakeholders need to know the service is recovering, not the technical details of why it failed. Root cause analysis happens after mitigation in the blameless postmortem.'
          }
        },
        {
          slug: 'blameless-postmortems',
          title: 'Blameless Postmortems',
          minutes: 28,
          objectives: [
            'Facilitate a postmortem that identifies systemic causes rather than individual blame',
            'Write action items that are specific, assigned and tracked to completion',
            'Build a postmortem culture that encourages transparency and continuous improvement'
          ],
          sections: [
            { heading: 'The blameless principle', body: 'A blameless postmortem does not mean no one is accountable. It means the investigation focuses on systemic and process failures rather than individual mistakes. When an engineer makes an error, the question is not "why did they make that mistake?" but "what system design allowed that mistake to happen, what safeguard was missing, and why did the error propagate to user impact?" People make errors because the system made the error easy to commit and hard to detect. Blame creates fear, fear creates secrecy and secrecy prevents learning. A blameless culture surfaces failures openly so the organization can learn from every incident.' },
            { heading: 'Postmortem document structure', body: 'A postmortem document follows a consistent structure: incident summary (what happened, when, duration, impact), timeline (key events with timestamps), root cause analysis (the causal chain from trigger to impact), what went well (actions that limited the blast radius), what went wrong (gaps that allowed the incident to occur or delayed mitigation), action items (specific, measurable improvements with owners and due dates) and lessons learned (insights that inform future decisions). The document should be written within 48 hours of the incident while memories are fresh. Every action item must have a single owner and a concrete due date — "improve monitoring" is not an action item; "add latency SLO alerting for checkout service by October 15" is.' },
            { heading: 'Building a postmortem culture', body: 'The value of a postmortem is proportional to how openly it is shared. A postmortem read only by the on-call team captures local learning. A postmortem shared across engineering generates organizational learning. Companies like Google publish postmortems internally and maintain a searchable postmortem database. The database lets teams search for similar past incidents when investigating a new one. Making postmortems a regular, expected part of engineering — not a punishment or a sign of failure — is the cultural shift that turns incidents from costly disruptions into investments in reliability.' }
          ],
          links: [
            { title: 'Google SRE — Postmortem Culture', url: 'https://sre.google/sre-book/postmortem-culture/', sourceName: 'Google SRE', resourceType: 'guide', relationship: 'Google SRE chapter on building a postmortem culture, blameless investigation and organizational learning.' },
            { title: 'Grafana — Incident timeline annotations', url: 'https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/add-annotations/', sourceName: 'Grafana Documentation', resourceType: 'reference', relationship: 'Grafana documentation on adding timeline annotations to dashboards for post-incident review context.' },
            { title: 'Prometheus — Retention and querying historical data', url: 'https://prometheus.io/docs/prometheus/latest/storage/', sourceName: 'Prometheus Documentation', resourceType: 'reference', relationship: 'Prometheus storage documentation relevant to retaining incident data for postmortem analysis.' }
          ],
          quiz: {
            prompt: 'An engineer deployed a configuration change that caused a 30-minute outage. In the postmortem, the manager suggests adding a mandatory peer review step for all configuration changes. What is the strongest critique of this action item?',
            options: [
              'Peer review will slow down deployments too much',
              'The action item focuses on the individual\'s action rather than the systemic gap — the question is why the CI/CD pipeline did not catch the bad configuration',
              'Configuration changes should never require peer review in an emergency',
              'The manager should not be involved in postmortem action items'
            ],
            answerIndex: 1,
            explanation: 'A blameless postmortem focuses on systemic causes. The peer review action targets the individual decision to deploy. A more effective action item would address the system: why did the CI/CD pipeline not validate the configuration? Why was there no canary deployment or automated rollback? These systemic changes prevent the class of failure, not just this specific instance.'
          }
        },
        {
          slug: 'toil-reduction-automation',
          title: 'Toil Reduction & SRE Automation',
          minutes: 27,
          objectives: [
            'Classify operational work as toil or engineering and quantify the toil burden on the team',
            'Identify high-impact automation opportunities that reduce toil and improve reliability',
            'Build runbooks and automated remediation systems for common failure modes'
          ],
          sections: [
            { heading: 'Defining and measuring toil', body: 'Toil is manual, repetitive, automatable, reactive and having no enduring value. A task is toil if it can be performed by a machine, requires no creative judgment and recurs regularly. Examples: restarting a crashed process, scaling a deployment in response to an alert, rotating SSL certificates, provisioning a new user account. Measuring toil means tracking the hours per week each team member spends on toil tasks. If a four-person SRE team spends 40% of their time on toil, that is equivalent to 1.6 full-time engineers doing nothing but manual operations. Toil above 50% indicates a team in survival mode — reactive work prevents investment in reliability improvements.' },
            { heading: 'Automation hierarchy and prioritization', body: 'Not all automation is equal. The hierarchy from lowest to highest investment: runbooks (written instructions), scripts (automated execution of a single procedure), self-healing systems (automated detection and remediation) and prevention (eliminating the failure mode entirely). Prioritize automation by frequency × impact × duration. A task that occurs daily, takes 30 minutes and affects production is a higher priority than a task that occurs monthly, takes 5 minutes and affects staging. The automation investment should be proportional to the toil cost — automating a 30-minute daily task saves roughly 125 hours per year. If the automation takes more than 20 hours to build and maintain, it still pays for itself within the first quarter.' },
            { heading: 'Runbooks and automated remediation', body: 'A runbook is a step-by-step procedure for handling a known operational scenario. Good runbooks include: the alert that triggered the procedure, the diagnostic steps to confirm the scenario, the remediation steps with expected outputs and the verification steps to confirm resolution. Runbooks are living documents — they must be tested, updated after incidents and linked directly from alert annotations. Automated remediation takes runbooks further: a script or controller that detects the condition and executes the remediation without human intervention. Kubernetes operators, Prometheus alerting scripts and ChatOps bots are common automated remediation patterns. Automated remediation requires testing in staging and a manual override to prevent automated actions from causing additional harm.' }
          ],
          links: [
            { title: 'Google SRE Book — Eliminating Toil', url: 'https://sre.google/sre-book/eliminating-toil/', sourceName: 'Google SRE', resourceType: 'guide', relationship: 'Google SRE chapter on defining toil, measuring it and systematically reducing it through automation.' },
            { title: 'Linux — Automation with cron and systemd timers', url: 'https://www.freedesktop.org/software/systemd/man/systemd.timer.html', sourceName: 'Linux Documentation', resourceType: 'reference', relationship: 'systemd timer documentation for scheduling automated tasks as a lighter alternative to cron.' },
            { title: 'Kubernetes — Operators and custom controllers', url: 'https://kubernetes.io/docs/concepts/extend-kubernetes/operator/', sourceName: 'Kubernetes Documentation', resourceType: 'reference', relationship: 'Kubernetes operator pattern for building automated remediation controllers for stateful and complex workloads.' }
          ],
          quiz: {
            prompt: 'An SRE team spends 6 hours per week manually restarting a service that crashes every few days. The root cause is an OOM kill in a memory leak. What is the correct response?',
            options: [
              'Schedule a cron job to restart the service every 6 hours before it crashes',
              'Increase the memory limit on the container to delay the OOM kill',
              'Fix the memory leak in the application code and implement automatic pod restart with backoff',
              'Add a Grafana dashboard to monitor when the service is about to crash'
            ],
            answerIndex: 2,
            explanation: 'The correct SRE approach addresses the root cause (the memory leak) and implements automatic remediation (pod restart with exponential backoff). A cron job masks the symptom and delays the real fix. Increasing memory limits is a band-aid that wastes resources. A dashboard helps you watch the problem but does not solve it.'
          }
        }
      ]
    },
    {
      slug: 'capacity-planning-kubernetes-reliability',
      stage: 'Advanced',
      title: 'Capacity Planning, Kubernetes Reliability & Advanced SRE',
      description: 'Forecasting resource needs before they become incidents, hardening Kubernetes clusters for production reliability and building self-healing systems that embody the SRE philosophy at scale.',
      topics: [
        {
          slug: 'capacity-planning-forecasting',
          title: 'Capacity Planning & Resource Forecasting',
          minutes: 29,
          objectives: [
            'Forecast resource requirements using historical utilization trends and growth projections',
            'Design load testing plans that validate capacity assumptions before production impact',
            'Build capacity models that account for peak events, growth and reliability overhead'
          ],
          sections: [
            { heading: 'From reactive scaling to proactive planning', body: 'Reactive scaling responds to current load — the auto-scaler adds pods when CPU exceeds 80%. Capacity planning anticipates future load — predicting that Black Friday traffic will be 8x normal and provisioning capacity two weeks before the event. The difference is the difference between being prepared and being lucky. Capacity planning starts with baseline utilization metrics (average and peak), growth rate (monthly user growth, traffic trends), seasonal patterns (holiday spikes, end-of-quarter usage) and reliability overhead (redundancy, buffer for failure). A capacity model answers: at current growth, when will we hit 80% utilization of each resource?' },
            { heading: 'Load testing as a capacity validation tool', body: 'Load testing answers the question "how much traffic can this system handle?" — but only when the test environment mirrors production. Staging environments with 1/10th the resources produce misleading results. Effective load testing simulates realistic traffic patterns: a mix of read and write operations, authenticated and unauthenticated users, API calls and static asset requests. Ramp-up testing gradually increases load to find the breaking point. Soak testing maintains moderate load for extended periods to detect memory leaks, connection exhaustion and degradation over time. Results feed directly into capacity models: if the system degrades at 5,000 requests/second and projected peak is 8,000, capacity must double.' },
            { heading: 'Resource dimensioning methodology', body: 'Right-sizing requires data, not guesses. CPU dimensioning: measure the p95 CPU utilization during peak traffic. Set the container request to the p95 value to guarantee consistent performance. Set the limit to 2x the request to allow burst capacity. Memory dimensioning: measure the p99 memory usage over 24 hours (to capture daily patterns). Set the container request to the p99 value to prevent OOM kills. Set the limit to 1.5x the request as a safety margin. Database dimensioning: measure query throughput, connection count and storage growth rate. Plan for 3x the peak query throughput to accommodate read replicas and write spikes. Storage dimensioning: measure growth rate and plan for 6 months ahead with 20% buffer.' }
          ],
          links: [
            { title: 'Google SRE — Planning Capacity', url: 'https://sre.google/sre-book/automation-at-google/', sourceName: 'Google SRE', resourceType: 'guide', relationship: 'Google SRE content on capacity planning principles and automation-driven forecasting.' },
            { title: 'Kubernetes — Resource metrics API', url: 'https://kubernetes.io/docs/tasks/administer-cluster/resource-metrics-pipeline/', sourceName: 'Kubernetes Documentation', resourceType: 'reference', relationship: 'Kubernetes resource metrics pipeline documentation for collecting real-time CPU and memory usage.' },
            { title: 'Prometheus — Predicting resource exhaustion', url: 'https://prometheus.io/docs/practices/predicting/', sourceName: 'Prometheus Documentation', resourceType: 'guide', relationship: 'Prometheus guide on using predict_linear to forecast resource exhaustion before it occurs.' }
          ],
          quiz: {
            prompt: 'Your API service handles 3,000 requests/second at peak. Your capacity model shows that at current growth (15% monthly), you will hit 80% CPU utilization in 4 months. The p95 latency is already 400ms at peak. What is the best capacity plan?',
            options: [
              'Double the CPU allocation on all pods to guarantee headroom for the next year',
              'Scale the Kubernetes deployment to double the current pod count immediately',
              'Implement request-level optimizations (caching, query optimization) to reduce per-request CPU cost, then scale based on the improved capacity model',
              'Set up an auto-scaling policy with CPU-based target tracking and let Kubernetes handle it automatically'
            ],
            answerIndex: 2,
            explanation: 'Scaling without optimizing is wasteful — you are scaling a system that is already inefficient. Reducing per-request CPU cost through caching and optimization extends current capacity, improves latency and reduces the scale needed. After optimization, use the improved capacity model to determine the right scaling plan. Auto-scaling handles transient spikes but does not address the fundamental capacity gap at sustained peak.'
          }
        },
        {
          slug: 'kubernetes-production-hardening',
          title: 'Kubernetes Production Hardening',
          minutes: 30,
          objectives: [
            'Configure pod disruption budgets, topology spread constraints and anti-affinity for zero-downtime operations',
            'Implement network policies, pod security standards and RBAC for defense-in-depth cluster security',
            'Design etcd backup, cluster upgrade and disaster recovery procedures for managed Kubernetes'
          ],
          sections: [
            { heading: 'Zero-downtime deployment controls', body: 'Kubernetes provides several mechanisms to maintain availability during operations. PodDisruptionBudgets (PDBs) define the minimum number of pods that must remain available during voluntary disruptions (node drains, cluster upgrades). A PDB specifying minAvailable: 2 ensures at least two pods are always running. TopologySpreadConstraints distribute pods evenly across nodes and availability zones, preventing a single node failure from taking out a disproportionate number of replicas. Pod anti-affinity rules prevent scheduling multiple replicas of the same service on the same node. Together, these controls ensure that node failures, maintenance operations and rolling updates do not cause user-visible outages.' },
            { heading: 'Cluster security defense-in-depth', body: 'Production Kubernetes clusters require layered security. NetworkPolicies restrict pod-to-pod communication — by default, all pods can communicate with all other pods. A default-deny NetworkPolicy blocks all ingress and egress, and explicit policies allow only required communication paths. Pod Security Standards (PSS) enforce constraints at the namespace level: baseline prohibits known privilege escalations, restricted prohibits all but the most minimal pod configurations. RBAC defines fine-grained permissions: a CI/CD service account can create Deployments in the production namespace but cannot read Secrets or modify NetworkPolicies. Audit logging records all API server requests for compliance and incident investigation.' },
            { heading: 'Cluster lifecycle and disaster recovery', body: 'Managed Kubernetes clusters (EKS, AKS, GKE) handle control plane maintenance but require operational procedures for upgrades, backups and disaster recovery. Cluster upgrades should be tested in staging first, applied to one node group at a time and monitored for 24 hours between groups. etcd stores all cluster state — managed providers back up etcd automatically but a backup verification procedure ensures restores work. Disaster recovery for Kubernetes means: container images in a multi-region registry, infrastructure as code to rebuild the cluster, GitOps repositories containing all manifests and a documented restore procedure that has been tested in a rehearsal. The recovery time objective (RTO) should be validated through regular disaster recovery drills.' }
          ],
          links: [
            { title: 'Kubernetes — Pod Disruption Budgets', url: 'https://kubernetes.io/docs/tasks/run-application/configure-pdb/', sourceName: 'Kubernetes Documentation', resourceType: 'reference', relationship: 'Kubernetes PDB documentation covering configuration, behavior during voluntary disruptions and best practices.' },
            { title: 'Kubernetes — Network Policies', url: 'https://kubernetes.io/docs/concepts/services-networking/network-policies/', sourceName: 'Kubernetes Documentation', resourceType: 'reference', relationship: 'Kubernetes NetworkPolicy documentation covering ingress/egress rules and default-deny patterns.' },
            { title: 'Kubernetes — Pod Security Standards', url: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/', sourceName: 'Kubernetes Documentation', resourceType: 'reference', relationship: 'Kubernetes Pod Security Standards covering baseline, restricted and privileged security profiles.' }
          ],
          quiz: {
            prompt: 'A Kubernetes cluster has no PodDisruptionBudgets configured. A node is drained for a scheduled OS patch. All pods on that node are evicted simultaneously before the deployment can reschedule them. User traffic drops for 3 minutes. What prevents this?',
            options: [
              'Increasing the number of replicas across all deployments',
              'Configuring a PodDisruptionBudget with minAvailable that prevents concurrent eviction below the threshold',
              'Setting a longer terminationGracePeriodSeconds on all pods',
              'Using node affinity to spread pods across more nodes'
            ],
            answerIndex: 1,
            explanation: 'A PodDisruptionBudget tells the cluster how many pods must remain available during voluntary disruptions. With minAvailable set appropriately, the node drain will evict pods one at a time, waiting for replacements to become ready before evicting the next. This prevents the simultaneous eviction that caused the traffic drop.'
          }
        },
        {
          slug: 'error-budget-policy-and-governance',
          title: 'Error Budget Policies & Reliability Governance',
          minutes: 28,
          objectives: [
            'Draft an error budget policy that defines the team\'s response at different budget levels',
            'Implement an SLO review process that adapts targets based on changing user needs and business priorities',
            'Design a reliability review cadence that holds teams accountable without creating bureaucratic overhead'
          ],
          sections: [
            { heading: 'Writing an error budget policy', body: 'An error budget policy is a pre-agreed document that defines what the team does at various error budget levels. Example: above 50% budget remaining — normal development velocity, feature launches permitted. Between 25% and 50% — new feature launches require additional reliability review, non-critical experiments paused. Below 25% — freeze non-essential changes, prioritize reliability work, all deployments require SRE approval. At zero — full feature freeze, incident response mode, executive briefing. The policy must be written before the budget is exhausted, not during a crisis. When the team pre-commits to these rules, the conversation shifts from "should we freeze features?" to "the policy says we freeze features at this budget level — let us execute." This removes emotional decision-making from high-pressure situations.' },
            { heading: 'SLO review and adjustment process', body: 'SLOs are not permanent. They should be reviewed quarterly with input from product, engineering and customer success. A service\'s reliability needs change: a new regulatory requirement may mandate higher availability, a declining user base may justify relaxing targets, or a re-architecture may enable tighter SLOs. The review process examines: current SLO performance (are we consistently meeting or consistently violating?), user feedback (are reliability complaints increasing?), business impact (what is the revenue impact of the current SLO level?) and engineering cost (what resources are required to maintain the current SLO?). An SLO that is always met by a wide margin may be too conservative — the team is over-investing in reliability and under-investing in features.' },
            { heading: 'Reliability review meetings', body: 'Reliability reviews are regular (monthly or quarterly) meetings where teams present their SLO performance, error budget status and reliability initiatives to engineering leadership. The format: each team presents a one-page scorecard showing current SLOs, actual performance, error budget remaining and top three reliability risks. Leadership reviews cross-team reliability trends and allocates reliability investment where it is most needed. The meeting is not a blame session — it is a portfolio review of the organization\'s reliability investment. Teams that are consistently meeting their SLOs with budget to spare may be asked to tighten targets. Teams that are consistently violating may receive additional engineering resources or reduced feature commitments.' }
          ],
          links: [
            { title: 'Google SRE — Error Budget Policy', url: 'https://sre.google/workbook/error-budget-policy/', sourceName: 'Google SRE', resourceType: 'guide', relationship: 'Google SRE workbook on defining, implementing and enforcing error budget policies across teams.' },
            { title: 'Grafana — Building SLO dashboards', url: 'https://grafana.com/docs/grafana/latest/dashboards/', sourceName: 'Grafana Documentation', resourceType: 'reference', relationship: 'Grafana dashboard documentation for creating SLO burn-down and error budget visualization panels.' },
            { title: 'Prometheus — Multi-window recording rules', url: 'https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/', sourceName: 'Prometheus Documentation', resourceType: 'reference', relationship: 'Prometheus recording rules for precomputing multi-window burn rate expressions used in SLO alerting.' }
          ],
          quiz: {
            prompt: 'A team\'s error budget policy states that below 25% remaining, all non-critical deployments require SRE approval. The product team wants to launch a feature that has passed QA but has not been tested under load. The error budget is at 18%. What should happen?',
            options: [
              'Launch the feature since it passed QA — the product team should not be blocked by an SRE process',
              'Defer the launch until the feature undergoes load testing and the error budget recovers above 25%',
              'Launch the feature behind a feature flag with instant rollback capability as a compromise',
              'Override the error budget policy for this launch since it is a business priority'
            ],
            answerIndex: 1,
            explanation: 'The error budget policy exists precisely for this situation. At 18% budget remaining, launching an untested feature risks exhausting the remaining budget and triggering a feature freeze. The correct action is to defer the launch until load testing validates the feature and the error budget recovers. Overriding the policy undermines the entire governance framework.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'SRE Observability, Incident Response & Reliability Platform',
    coverage: [
      'Linux Systems Fundamentals',
      'SLIs, SLOs & Error Budget Framework',
      'Prometheus Metrics & Alerting',
      'Grafana Dashboard Design',
      'Incident Response & Postmortem Process',
      'Capacity Planning & Kubernetes Reliability'
    ],
    brief:
      'You are the SRE lead at ResilientOps Platform Co. tasked with building the reliability platform for a microservices-based e-commerce application running on Kubernetes. The application currently has no structured monitoring, no defined SLOs and no incident response process. Design and implement the full SRE observability stack: define SLIs and SLOs for three critical services, deploy Prometheus and Grafana, build dashboards following the golden signals, configure alerting rules with multi-window burn rate alerts, create a runbook for the top three failure scenarios and draft an incident response playbook.',
    requirements: [
      'Define SLIs (latency, availability, error rate) and SLOs for the product catalog, checkout and payment services with documented rationale for each target',
      'Deploy Prometheus with Kubernetes service discovery, appropriate scrape configs and 30-day retention',
      'Build Grafana dashboards for each service showing the four golden signals with service-specific variables',
      'Configure Prometheus alerting rules for SLO burn rate using multi-window (5m short, 1h long) burn rate pairs',
      'Set up Alertmanager routing with severity-based grouping and escalation to Slack and PagerDuty channels',
      'Create a dead-man\'s switch alert to verify the monitoring pipeline itself is functional',
      'Write runbooks for three common failure scenarios: service crash loop, high-latency degradation and node NotReady',
      'Draft an incident response playbook defining roles, escalation criteria and communication templates',
      'Implement a Grafana dashboard showing error budget burn-down for each SLO over a 30-day window',
      'Document the entire system architecture and provide a deployment guide for reproducing the observability stack'
    ],
    expectedOutput:
      'A complete SRE platform package: Prometheus and Grafana deployment manifests, dashboard JSON exports, alerting rule files, Alertmanager configuration, runbooks for three failure scenarios, an incident response playbook and an architecture document with deployment instructions.',
    rubric: [
      { skill: 'SLO Framework Design', weight: 20, criteria: 'SLIs correctly measure user-facing behavior, SLOs are realistic with documented rationale, error budget calculations are mathematically correct' },
      { skill: 'Prometheus Configuration', weight: 20, criteria: 'Scrape configs use Kubernetes service discovery, recording rules precompute SLI expressions, alerting rules use multi-window burn rate with correct thresholds' },
      { skill: 'Grafana Dashboard Quality', weight: 15, criteria: 'Dashboards follow golden signals layout, variables enable service-specific filtering, panels use appropriate visualizations and time ranges' },
      { skill: 'Alertmanager & Alert Routing', weight: 15, criteria: 'Alertmanager routes by severity, groups related alerts, inhibition suppresses noise, dead-man switch verifies pipeline health' },
      { skill: 'Incident Response & Runbooks', weight: 15, criteria: 'Runbooks are actionable with concrete steps, incident playbook defines roles clearly, communication templates are ready to use' },
      { skill: 'Architecture Documentation', weight: 15, criteria: 'Deployment guide is reproducible, architecture decisions are explained, the system is designed for maintainability and growth' }
    ],
    passScore: 72
  },

  assignments: [
    {
      title: 'Prometheus & Grafana Observability Stack Deployment',
      stage: 'Foundation',
      objective: 'Deploy a Prometheus and Grafana stack on a Kubernetes cluster with service discovery, a Grafana dashboard showing the four golden signals and basic alerting rules.',
      requirements: [
        'Deploy Prometheus using the official kube-prometheus-stack Helm chart with persistent storage',
        'Configure Prometheus to scrape application metrics using Kubernetes pod annotations',
        'Create a Grafana dashboard with four panels: request rate, error rate, p99 latency and active connections',
        'Define a Grafana variable that filters panels by namespace or service label',
        'Write two Prometheus alerting rules: one for error rate exceeding 1% and one for p99 latency exceeding 500ms',
        'Configure a simple Alertmanager route that sends alerts to a webhook or Slack channel'
      ],
      skillsEvaluated: ['Prometheus', 'Grafana', 'Kubernetes', 'Helm', 'Alerting'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the Helm values file, alerting rules configuration, Grafana dashboard JSON export and screenshots showing the deployed stack with metrics flowing.',
        textLabel: 'Observability stack deployment report',
        minTextLength: 1000,
        linkLabels: ['Helm values file, dashboard JSON and alerting rules']
      }
    },
    {
      title: 'SLO Definition & Error Budget Alerting',
      stage: 'Intermediate',
      objective: 'Define SLIs and SLOs for a microservices application and implement multi-window burn rate alerting with Grafana error budget dashboards.',
      requirements: [
        'Define three SLIs for a given service: availability (success rate), latency (p99) and throughput',
        'Set SLO targets for each SLI and document the rationale based on user impact analysis',
        'Create Prometheus recording rules that precompute the SLI values over 5-minute and 1-hour windows',
        'Implement multi-window burn rate alerting rules with appropriate long-window and short-window thresholds',
        'Build a Grafana dashboard showing error budget consumption over a 30-day rolling window',
        'Write a brief error budget policy document defining team response at 50%, 25% and 0% budget remaining'
      ],
      skillsEvaluated: ['SRE Principles', 'SLIs/SLOs', 'PromQL', 'Grafana', 'Error Budget Management'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the SLO definition document, Prometheus recording rules, alerting rules, Grafana dashboard JSON and the error budget policy document.',
        textLabel: 'SLO and error budget implementation report',
        minTextLength: 1200,
        linkLabels: ['SLO document, Prometheus configs, dashboard JSON and budget policy']
      }
    },
    {
      title: 'Incident Response Playbook & Postmortem Template',
      stage: 'Advanced',
      objective: 'Create a comprehensive incident response playbook for a Kubernetes-based production environment, including role definitions, escalation procedures, communication templates and a blameless postmortem template.',
      requirements: [
        'Define incident severity levels (SEV1-SEV3) with clear classification criteria and expected response actions',
        'Document incident roles: incident commander, technical lead and communications lead with responsibilities for each',
        'Create escalation procedures that define who is notified at each severity level and the expected response time',
        'Write communication templates for internal stakeholders, external customers and engineering leadership',
        'Design a blameless postmortem template with sections for timeline, root cause, action items and lessons learned',
        'Develop runbooks for three common failure scenarios specific to a Kubernetes environment',
        'Include a dead-man switch configuration to verify monitoring pipeline health'
      ],
      skillsEvaluated: ['Incident Management', 'Postmortem Process', 'Documentation', 'Kubernetes Operations', 'Communication'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the complete incident response playbook as a structured document, including the postmortem template, runbooks, communication templates and dead-man switch configuration.',
        textLabel: 'Incident response playbook and postmortem template',
        minTextLength: 1500,
        linkLabels: ['Playbook document, postmortem template and runbook examples']
      }
    }
  ],

  simTasks: [
    {
      title: 'Production latency spike on the checkout service',
      context: 'The checkout service at ResilientOps Platform Co. has experienced a sudden latency increase from a p99 of 200ms to 3.5 seconds over the past 20 minutes. The Grafana dashboard shows CPU and memory are normal but the error rate has risen from 0.05% to 0.8%. The on-call engineer is paged with a multi-window burn rate alert. Checkout is a critical path service — every minute of degraded latency directly impacts revenue.',
      requirements: [
        'Acknowledge the incident, declare the severity and assemble the incident response team',
        'Use Prometheus queries to identify which specific endpoints are experiencing the latency spike',
        'Check for recent deployments, configuration changes or scaling events using Grafana annotations and Kubernetes events',
        'Determine whether the latency is caused by the application, the database, a downstream dependency or infrastructure',
        'Implement a mitigation — either rollback the last deployment, scale up the service or disable the problematic dependency',
        'After mitigation, write a brief incident summary with timeline and root cause hypothesis'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Latency restored to baseline, root cause identified and documented, mitigation applied, incident summary written with timeline.',
      skills: ['Incident Response', 'Prometheus Querying', 'Grafana Analysis', 'Kubernetes Troubleshooting', 'Root Cause Analysis']
    },
    {
      title: 'Error budget exhaustion on the product catalog API',
      context: 'The product catalog API at ResilientOps Platform Co. has a 99.9% SLO over a 30-day window. The current error budget remaining is 3% with 12 days left in the window. The burn rate is currently 5x — at this rate, the error budget will be fully exhausted within 3 days. The team has two feature launches scheduled for this sprint. The engineering director has asked whether the launches should proceed.',
      requirements: [
        'Calculate the exact remaining error budget in both percentage and absolute terms (number of failed requests allowed)',
        'Determine the maximum sustainable error rate for the remaining 12 days to preserve the SLO',
        'Analyze the current error budget burn using Prometheus queries to identify the primary error contributors',
        'Draft an error budget policy response that addresses the scheduled feature launches',
        'Recommend specific reliability improvements that would reduce the burn rate and extend the budget',
        'Present the findings and recommendations to the engineering director with a clear go/no-go recommendation for the launches'
      ],
      priority: 'high',
      dueDayOffset: 3,
      expectedOutput: 'Error budget analysis complete, burn rate quantified, reliability improvement recommendations prioritized, launch recommendation delivered with supporting data.',
      skills: ['Error Budget Management', 'SLO Analysis', 'PromQL', 'Risk Assessment', 'Technical Communication']
    },
    {
      title: 'Kubernetes node capacity crisis during peak traffic',
      context: 'ResilientOps Platform Co. is experiencing an unexpected traffic spike — 3x the normal peak volume due to a viral social media mention. The Kubernetes cluster has 8 nodes, all running at 85%+ CPU utilization. The Horizontal Pod Autoscaler has scaled the frontend and API services to their maximum replica counts, but new pods are stuck in Pending state due to insufficient node capacity. The cluster autoscaler is attempting to add nodes but the cloud provider quota limits allow only 10 nodes maximum. Two nodes are already at the quota limit.',
      requirements: [
        'Assess the current cluster state: node resource utilization, pending pods, HPA configurations and autoscaler status',
        'Identify which services are consuming the most resources and whether any are non-critical and can be temporarily reduced',
        'Implement immediate capacity relief: reduce non-critical pod replicas, adjust resource requests to pack more efficiently, or deploy to a secondary cluster if available',
        'Request a cloud provider quota increase through the appropriate channels',
        'Build a capacity model that accounts for viral traffic events and recommends pre-provisioned buffer capacity',
        'Document the incident response and capacity improvement recommendations for the next reliability review'
      ],
      priority: 'high',
      dueDayOffset: 3,
      expectedOutput: 'Cluster capacity stabilized, non-critical workloads reduced, quota increase requested, capacity model with viral traffic buffer documented.',
      skills: ['Kubernetes Capacity Planning', 'Cluster Autoscaling', 'Resource Optimization', 'Incident Response', 'Cloud Quota Management']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Priya Sharma',
      personaRole: 'Director of Product Engineering',
      situation: 'The Director wants to launch a major new feature in two weeks but the service has only 18% error budget remaining and the feature has not been load tested. The SRE team has flagged the risk.',
      openingMessage:
        'The board has approved the Q4 feature launch and the CEO is expecting it on the 15th. The product team says the feature is ready. Your team is telling me we should not launch because of error budget concerns. I need to understand the actual risk before I make a decision.',
      expectedPoints: [
        'Quantifies the remaining error budget in absolute terms and projects when it will be exhausted at the current burn rate',
        'Explains the consequences of exhausting the error budget: feature freeze, loss of launch flexibility and potential SLO violation',
        'Proposes a compromise: launch behind a feature flag with instant rollback capability and load testing before full rollout',
        'Recommends a short-term reliability investment to stabilize the budget before the launch date'
      ]
    },
    {
      kind: 'team',
      personaName: 'David Chen',
      personaRole: 'Backend Team Lead',
      situation: 'The backend team lead resists implementing SLOs and error budgets, arguing they add bureaucracy without clear value. His team already monitors dashboards and responds to alerts.',
      openingMessage:
        'We have been running this service for two years without SLOs and our uptime has been fine. The team already looks at dashboards and responds to PagerDuty alerts. Why do we need this additional process that just creates more work for the team?',
      expectedPoints: [
        'Acknowledges the team\'s existing operational competence as a strong foundation',
        'Explains that SLOs replace subjective reliability debates with quantitative decision-making',
        'Shows how error budgets provide a framework for deciding when to take risks versus when to focus on reliability',
        'Proposes starting with a single, low-risk service as a proof of concept before rolling out across all teams'
      ]
    },
    {
      kind: 'client',
      personaName: 'Tom Walker',
      personaRole: 'CTO, FinServe Capital',
      situation: 'The client operates a financial trading platform that requires 99.999% uptime and needs to implement an SRE practice from scratch. They have no monitoring, no incident response process and experienced three outages last quarter.',
      openingMessage:
        'We lost $4.5 million in trading revenue from three outages last quarter. We have no formal monitoring, no SLOs and no incident response playbook. Our regulators are asking questions. We need a complete SRE transformation within six months. Where do we start?',
      expectedPoints: [
        'Proposes a phased approach starting with observability (what is happening?) before SLOs (how well is it happening?) and then incident response (what do we do when it breaks?)',
        'Prioritizes the highest-revenue-impact service for initial SLO implementation',
        'Recommends a managed monitoring stack to accelerate time-to-value rather than building from scratch',
        'Addresses regulatory compliance by proposing audit-ready SLO documentation and incident reporting templates'
      ]
    },
    {
      kind: 'client',
      personaName: 'Aisha Patel',
      personaRole: 'VP of Platform Engineering, StreamLine Media',
      situation: 'The client has a Grafana-Prometheus monitoring stack but it generates 500+ alerts per day. The on-call team is experiencing severe alert fatigue and has started ignoring alerts.',
      openingMessage:
        'Our on-call engineers are exhausted. We receive over 500 alerts per day and most resolve within minutes. Last month, a critical alert was ignored because it looked like the hundreds of false positives. How do we fix this without losing visibility?',
      expectedPoints: [
        'Audits the existing alert rules to classify each as actionable, noisy or unnecessary',
        'Applies multi-window burn rate alerting to replace threshold-based alerts that fire on transient spikes',
        'Implements Alertmanager grouping and inhibition to consolidate related alerts and suppress lower-severity noise during major incidents',
        'Creates a dashboard for alert quality metrics — alerts per day, actionable ratio, mean time to acknowledge — to track improvement'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'A production PostgreSQL database serving the order history service is experiencing connection pool exhaustion. The application logs show "too many connections" errors and the Grafana dashboard shows the active connection count at the pool maximum of 200. Orders placed in the last 15 minutes are failing. A recent deployment added a new API endpoint that queries order history but does not close connections properly in its error handling path.',
      requiredActions: [
        { action: 'Identify and rollback the deployment that introduced the connection leak by examining recent deployment history and correlating with the start time of the connection increase', good: true, note: 'Rollback is the fastest mitigation — restoring the previous version eliminates the connection leak while root cause analysis continues.' },
        { action: 'Restart the application pods to release the leaked connections and restore service immediately', good: true, note: 'Restarting the pods clears the connection pool state and releases leaked connections, providing immediate relief.' },
        { action: 'Increase the PostgreSQL max_connections limit to 400 to provide more headroom while the leak is investigated', good: false, note: 'Increasing max_connections masks the leak and does not address the root cause. It also risks exhausting PostgreSQL server memory and impacting other services sharing the database.' },
        { action: 'Review the new API endpoint code to identify the missing connection close in the error handling path and prepare a targeted fix', good: true, note: 'Understanding the root cause enables a targeted fix and prevents the same class of bug from recurring in future deployments.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'The company is launching a new real-time bidding service that requires sub-10ms p99 latency for API responses. The current monitoring stack uses 15-second Prometheus scrape intervals and Grafana dashboards with 1-minute resolution. The SRE team must ensure that the observability stack itself does not become a bottleneck and that latency SLIs can be measured with sufficient granularity.',
      requiredActions: [
        { action: 'Deploy a dedicated Prometheus instance with a 5-second scrape interval for the bidding service to capture sub-second latency variations', good: true, note: 'A 15-second scrape interval may miss latency spikes lasting only a few seconds. Shorter intervals provide the granularity needed for sub-10ms SLOs.' },
        { action: 'Configure the bidding service to expose client-side latency histograms with fine-grained buckets (1ms, 5ms, 10ms, 50ms) rather than relying on server-side metrics', good: true, note: 'Client-side histograms capture the actual user-perceived latency including network overhead, providing more accurate SLI measurement than server-side metrics alone.' },
        { action: 'Use Grafana alerting with the shorter Prometheus data to create real-time latency dashboards visible during bidding auctions', good: true, note: 'Real-time visibility during auctions enables the team to detect and respond to latency degradation within seconds, not minutes.' },
        { action: 'Replace Prometheus with a commercial APM tool that claims sub-millisecond collection resolution', good: false, note: 'Replacing the existing monitoring stack for a single service is disproportionate. A dedicated Prometheus instance with a shorter scrape interval achieves the required granularity without the migration cost.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between a counter, gauge, histogram and summary in Prometheus. When would you choose a histogram over a summary, and what are the aggregation implications?',
      guidancePoints: [
        'Counter: monotonically increasing value used with rate() or increase() — total requests, total bytes transferred',
        'Gauge: value that can increase or decrease — current memory usage, queue depth, active connections',
        'Histogram: samples observations into configurable buckets, enabling server-side percentile computation via histogram_quantile',
        'Summary: computes quantiles on the client side — cannot be aggregated across instances',
        'Choose histogram when you need to aggregate percentiles across multiple instances or pods, choose summary for single-instance simplicity',
        'Histogram bucket boundaries should be chosen based on the SLO thresholds (e.g., 100ms, 500ms, 1s) to enable efficient SLO evaluation'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'Design a multi-window burn rate alert for a service with a 99.9% availability SLO over a 30-day window. Explain the window choices, the burn rate thresholds and why both windows are necessary.',
      guidancePoints: [
        'The error budget for 99.9% over 30 days is 0.1% — roughly 43 minutes of downtime or 0.1% of total requests',
        'Short window (5 minutes): detects fast-burning incidents that would exhaust the budget quickly if sustained',
        'Long window (1 hour): filters out transient spikes that do not threaten the SLO — prevents false positives from short blips',
        'Burn rate thresholds: 14.4x for 5-minute window (budget exhausted in 2 days) paired with 1x for 1-hour window (budget consumed at expected rate)',
        'Both windows must fire simultaneously to trigger the alert — the short window catches fast burns, the long window confirms sustained impact',
        'Record the burn rates using Prometheus recording rules to avoid expensive queries at alert evaluation time'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A Kubernetes service is experiencing intermittent 503 errors that occur roughly once every 10 minutes, lasting only 2-3 seconds each time. The application logs show no errors during these windows. Prometheus metrics show a brief spike in connection refused errors. How do you diagnose this?',
      guidancePoints: [
        'Check for pod lifecycle events — pods in Terminating state during rolling updates or node drains can cause brief 503s',
        'Review Kubernetes endpoint slices to see if the service is routing to pods that are not yet ready or are being terminated',
        'Examine the ingress controller logs for upstream connection errors during the 503 windows',
        'Check if the 503s correlate with any scheduled Kubernetes events: CronJobs, node autoscaling or DaemonSet rollouts',
        'Investigate whether the application\'s readiness probe is failing intermittently, causing the endpoint to be temporarily removed from the service',
        'Use tcpdump on the pod network to capture the connection refused packets and identify the source'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Your Prometheus server is consuming 200GB of disk and the retention policy is set to 15 days. The disk is filling up. PromQL queries are also becoming slow. How do you address both the storage and query performance issues?',
      guidancePoints: [
        'Identify the highest-cardinality metrics using Prometheus admin API or Prometheus Cardinality Explorer — high label cardinality is the primary cause of storage bloat',
        'Implement metric relabeling in the scrape config to drop high-cardinality labels that provide no operational value',
        'Add recording rules to precompute expensive PromQL expressions — this shifts compute cost from query time to write time',
        'Evaluate whether long-term storage can be offloaded to Thanos, Cortex or Mimir, allowing aggressive local retention',
        'Review scrape intervals — reducing from 15s to 30s for non-critical targets halves storage without meaningful observability loss',
        'Consider splitting metrics by team or service into separate Prometheus instances to isolate cardinality explosion'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'A team proposes replacing their existing Prometheus-Grafana stack with a vendor observability platform that promises "AI-powered anomaly detection" and "out-of-the-box SLO tracking." How do you evaluate this proposal as an SRE?',
      guidancePoints: [
        'Evaluate the cost difference: vendor platforms typically cost 5-10x more than open-source Prometheus-Grafana at scale',
        'Assess data ownership: vendor platforms may restrict data export, making migration back to open-source difficult (lock-in risk)',
        'Test the AI claims: run a proof-of-concept alongside the existing stack for one month and compare detection accuracy, false positive rate and time-to-detection',
        'Evaluate the SLO features: can the vendor platform replicate multi-window burn rate alerting with the same flexibility as custom Prometheus rules?',
        'Consider operational overhead: managed platforms reduce maintenance burden but reduce customization — for a team comfortable with Prometheus, the trade-off may not favor the vendor',
        'Recommend a hybrid approach: use the vendor platform for out-of-the-box features while retaining Prometheus for custom SLI calculations'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you balance the tension between shipping features quickly and maintaining reliability? Describe a framework you would use to make this decision consistently across teams.',
      guidancePoints: [
        'The error budget is the primary decision framework: healthy budget = ship aggressively, depleted budget = prioritize reliability',
        'Define pre-commitment rules in the error budget policy so the decision is made before pressure arises, not during a crisis',
        'Distinguish between risk levels: a new UI feature carries less reliability risk than a database migration or a networking change',
        'Implement feature flags and canary deployments to reduce the blast radius of feature launches — this allows faster shipping with lower risk',
        'Track deployment frequency and change failure rate as DORA metrics — these quantify the team\'s ability to ship quickly without breaking things',
        'Make reliability investment visible: show the team what reliability improvements they can pursue when the error budget is healthy'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'You need to explain to the VP of Engineering why the SRE team is recommending a $50,000 investment in a new monitoring platform when the current system "seems to work." How do you build the business case?',
      guidancePoints: [
        'Quantify the cost of current monitoring gaps: time spent on manual investigation during incidents, mean time to detection and mean time to resolution',
        'Present specific incidents where the current monitoring failed to detect or diagnose the problem quickly, translating lost time into revenue impact',
        'Show the ROI calculation: $50,000 investment versus the annual cost of outages and slow incident response at the current detection speed',
        'Compare the proposal to industry benchmarks: what monitoring investment is typical for services at our scale and revenue level',
        'Offer a phased approach: implement the new platform for the highest-revenue-impact service first and measure improvement before expanding'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'An on-call engineer has been paged 12 times in one week for the same non-critical alert. They are frustrated and considering leaving the team. How do you address this situation?',
      guidancePoints: [
        'Acknowledge the engineer\'s frustration — 12 pages for a non-critical alert in one week is a legitimate grievance',
        'Investigate the alert: is the threshold too sensitive, is the service genuinely degraded, or is the alert missing context about what severity it represents',
        'Implement an immediate fix: adjust the alert threshold, add a longer evaluation window or change the severity to reduce page frequency',
        'Assign a permanent fix: create a ticket to investigate the root cause of the recurring alert and track it to completion',
        'Follow up with the engineer: confirm the fix is working, discuss any remaining on-call concerns and show that their feedback is valued',
        'Use the incident as a catalyst to audit all alerts on the service and prevent similar situations for other on-call engineers'
      ]
    }

  ]

}
