import type { CareerDef } from '../framework.js'

export const socAnalyst: CareerDef = {
  slug: 'soc-analyst',
  name: 'SOC Analyst',
  category: 'Security',
  order: 25,
  description:
    'Works the security operations center: triaging alerts, investigating logs in SIEM tools and escalating real incidents.',
  difficulty: 'Intermediate',
  pathSummary:
    'Security & networking foundations → SIEM operations & alert triage → log investigation & threat hunting → incident escalation & SOC process improvement.',
  mainSkills: [
    'Alert Triage & Prioritization',
    'SIEM Platform Operations',
    'Log Analysis & Correlation',
    'MITRE ATT&CK Mapping',
    'Incident Escalation & Reporting',
    'Threat Intelligence Consumption',
    'SOC Workflow & Shift Operations'
  ],
  sourcePlatforms: [
    'MITRE ATT&CK',
    'CISA',
    'Splunk Documentation',
    'Microsoft Sentinel Documentation',
    'Elastic Documentation'
  ],
  companyName: 'IronClad Monitoring Services',
  roleTitle: 'SOC Analyst',

  chapters: [
    {
      slug: 'security-networking-foundations',
      stage: 'Beginner',
      title: 'Security & Networking Foundations',
      description: 'Core networking concepts, operating system security and the fundamental frameworks that underpin every SOC operation.',
      topics: [
        {
          slug: 'networking-for-soc',
          title: 'Networking Essentials for SOC Analysts',
          minutes: 30,
          objectives: [
            'Explain the TCP/IP model and identify which layers matter most for security monitoring',
            'Read and interpret packet captures to identify suspicious network activity',
            'Describe how firewalls, proxies and IDS/IPS generate logs that feed into SIEM tools'
          ],
          sections: [
            { heading: 'The TCP/IP stack from a monitoring perspective', body: 'Every network communication traverses the link, internet, transport and application layers. SOC analysts care about each layer differently: ARP anomalies at link level, IP spoofing at internet level, SYN floods at transport level and command-and-control traffic at application level. Understanding the stack helps you know where to look when an alert fires.' },
            { heading: 'How network devices produce security logs', body: 'Firewalls log allowed and denied connections with source/destination IPs and ports. Proxies record HTTP requests including URLs and user agents. IDS/IPS appliances generate alerts when traffic matches signature patterns or behavioral anomalies. Each device type becomes a data source in the SIEM, providing a different vantage point on the same network traffic.' },
            { heading: 'Packet analysis fundamentals', body: 'Reading a packet capture is like reading a conversation transcript. SOC analysts use Wireshark or tcpdump to filter millions of packets down to the ones that matter. Look for unusual destination ports, DNS queries to algorithmically generated domains, large data transfers to external IPs and HTTP user agents that do not match known software.' }
          ],
          links: [
            { title: 'Splunk — Getting Data In: Network Data', url: 'https://docs.splunk.com/splexref/latest/specs/Splunk eventdata', sourceName: 'Splunk Documentation', resourceType: 'guide', relationship: 'Splunk documentation on ingesting and parsing network log data for SOC operations.' },
            { title: 'Elastic — Network Packet Capture Data', url: 'https://www.elastic.co/guide/en/beats/packetbeat/current/packetbeat-overview.html', sourceName: 'Elastic Documentation', resourceType: 'guide', relationship: 'Elastic Packetbeat documentation for capturing and analyzing network traffic in Elastic SIEM.' },
            { title: 'CISA — Understanding Denial-of-Service Attacks', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa20-073a', sourceName: 'CISA', resourceType: 'guide', relationship: 'CISA advisory explaining network-level attack patterns SOC analysts must recognize.' }
          ],
          quiz: {
            prompt: 'A firewall log shows 500 outbound DNS queries from a single workstation to different domains within one minute. This pattern most likely indicates…',
            options: [
              'A misconfigured DNS client',
              'DNS tunneling or a domain generation algorithm used by malware',
              'A routine Windows Update check',
              'Normal employee web browsing'
            ],
            answerIndex: 1,
            explanation: 'Rapid-fire DNS queries to many different domains from one host is a classic indicator of DNS-based C2 communication or a domain generation algorithm. Legitimate DNS usage shows far fewer unique domains per minute.'
          }
        },
        {
          slug: 'os-security-basics',
          title: 'Operating System Security for Alert Validation',
          minutes: 25,
          objectives: [
            'Identify key Windows Event Log IDs that SOC analysts must know for alert triage',
            'Recognize critical Linux log files and the security events they record',
            'Distinguish normal system behavior from suspicious activity in OS logs'
          ],
          sections: [
            { heading: 'Windows security event IDs', body: 'Every SOC analyst must memorize the core Windows event IDs: 4624 (successful logon), 4625 (failed logon), 4688 (process creation), 4720 (account created), 4732 (member added to security group) and 1102 (audit log cleared). These six events capture the vast majority of attacker footprints on Windows endpoints and are the first places to look when a SIEM alert fires.' },
            { heading: 'Linux logs that matter', body: '/var/log/auth.log or /var/log/secure records authentication attempts, sudo usage and SSH sessions. /var/log/syslog captures system-wide events. auditd provides fine-grained system call logging. Cron logs reveal persistence mechanisms. When a SOC alert references a Linux host, these are the files to check first.' },
            { heading: 'Baseline behavior versus anomalies', body: 'A service account logging in interactively is unusual. A PowerShell process spawning from Word is suspicious. A user account accessing 500 files in five minutes is anomalous. SOC analysts must build mental baselines for what "normal" looks like in their environment so that deviations stand out during triage.' }
          ],
          links: [
            { title: 'Splunk — Windows Security Event Log Reference', url: 'https://docs.splunk.com/UPPERCASE/latest/audit/windows-events', sourceName: 'Splunk Documentation', resourceType: 'reference', relationship: 'Splunk mappings for Windows security event IDs to Splunk field extractions.' },
            { title: 'Elastic — Windows Integration Overview', url: 'https://www.elastic.co/guide/en/beats/winlogbeat/current/winlogbeat-overview.html', sourceName: 'Elastic Documentation', resourceType: 'reference', relationship: 'Elastic Winlogbeat documentation for collecting and parsing Windows event logs.' },
            { title: 'MITRE ATT&CK — OS Credential Dumping', url: 'https://attack.mitre.org/techniques/T1003/', sourceName: 'MITRE ATT&CK', resourceType: 'reference', relationship: 'ATT&CK technique page showing the OS-level indicators analysts must recognize during triage.' }
          ],
          quiz: {
            prompt: 'Windows Event ID 1102 appears in the Security log. What does this event indicate?',
            options: [
              'A user successfully logged in',
              'A new user account was created',
              'The audit log was cleared',
              'A process was terminated'
            ],
            answerIndex: 2,
            explanation: 'Event ID 1102 means the audit log was cleared. This is a high-priority alert because attackers frequently clear logs to cover their tracks. The analyst should immediately investigate who cleared the log and whether it was authorized maintenance.'
          }
        },
        {
          slug: 'security-frameworks-intro',
          title: 'Security Frameworks & the SOC\'s Role',
          minutes: 30,
          objectives: [
            'Describe the NIST CSF functions and explain how each maps to SOC activities',
            'Explain the role of the SOC within the broader organizational security program',
            'Map common SOC functions to MITRE ATT&CK defensive categories'
          ],
          sections: [
            { heading: 'NIST CSF through the SOC lens', body: 'The NIST Cybersecurity Framework organizes security into five functions: Identify, Protect, Detect, Respond and Recover. The SOC sits at the heart of Detect and Respond but also feeds intelligence back to Protect through detection gaps. Understanding how your daily triage work maps to these functions helps justify resource requests and communicate your value to leadership.' },
            { heading: 'Where the SOC fits in the organization', body: 'The SOC is the operational nerve center that bridges security engineering, incident response, threat intelligence and IT operations. Analysts consume alerts from detection tools, escalate confirmed incidents to the IR team, provide feedback to detection engineers on rule tuning and collaborate with threat intelligence on new indicators. Understanding these relationships prevents the SOC from operating in a silo.' },
            { heading: 'SOC maturity levels', body: 'A Level 1 SOC monitors alerts and escalates. A Level 2 SOC performs investigation and basic threat hunting. A Level 3 SOC proactively hunts threats, builds custom detection and integrates threat intelligence into operations. Knowing where your SOC sits on this maturity model helps set realistic expectations for what the team can achieve and where investment should go next.' }
          ],
          links: [
            { title: 'CISA — Cybersecurity Performance Goals', url: 'https://www.cisa.gov/cpg', sourceName: 'CISA', resourceType: 'guide', relationship: 'CISA performance goals that help SOC teams measure and communicate their security outcomes.' },
            { title: 'MITRE ATT&CK — Defensive Assessments', url: 'https://attack.mitre.org/assessments/', sourceName: 'MITRE ATT&CK', resourceType: 'reference', relationship: 'MITRE assessment frameworks for evaluating defensive coverage including SOC detection capabilities.' },
            { title: 'Elastic — SIEM Use Case Library', url: 'https://www.elastic.co/solutions/security', sourceName: 'Elastic Documentation', resourceType: 'guide', relationship: 'Elastic pre-built detection use cases mapped to SOC workflows and ATT&CK techniques.' }
          ],
          quiz: {
            prompt: 'Which NIST CSF function is most directly associated with a SOC analyst triaging SIEM alerts and escalating confirmed incidents?',
            options: [
              'Identify',
              'Protect',
              'Detect',
              'Recover'
            ],
            answerIndex: 2,
            explanation: 'Detect is the NIST CSF function most directly tied to SOC alert triage and investigation. The Respond function covers the escalation and handling of confirmed incidents, but the daily work of monitoring and triaging alerts falls squarely under Detect.'
          }
        }
      ]
    },
    {
      slug: 'siem-operations-alert-triage',
      stage: 'Foundation',
      title: 'SIEM Operations & Alert Triage',
      description: 'Mastering SIEM platform operations, writing queries, triaging alerts and operationalizing threat intelligence feeds.',
      topics: [
        {
          slug: 'siem-platform-operations',
          title: 'SIEM Platform Fundamentals',
          minutes: 30,
          objectives: [
            'Configure log ingestion pipelines to collect data from endpoints, network devices and cloud services',
            'Write detection queries in SPL, KQL or KQL to identify specific threat patterns',
            'Tune and maintain detection rules to reduce false positives while preserving true-positive detection'
          ],
          sections: [
            { heading: 'Log ingestion and normalization', body: 'A SIEM is only as good as the data it ingests. The five essential log categories for SOC operations are: endpoint logs (Windows Event Logs, macOS unified logs), network logs (firewall, proxy, DNS), authentication logs (AD, LDAP, SSO), cloud audit logs (Azure Activity, AWS CloudTrail) and application logs. Normalization converts different schemas into a common format so queries can span all sources.' },
            { heading: 'Querying for threats', body: 'SIEM query languages — SPL for Splunk, KQL for Microsoft Sentinel, EQL for Elastic — let you search across billions of events in seconds. A basic triage query might search for a specific username across all authentication logs in the last 24 hours. Advanced queries correlate events across multiple data sources: "show me all process creations (Event ID 4688) where the parent process was a web browser and the child process is PowerShell."' },
            { heading: 'Rule tuning and maintenance', body: 'Every detection rule produces false positives. Tuning means adjusting thresholds, adding exclusions for known-good activity and refining logic without breaking detection. Document every tuning change with a justification and test the updated rule against a dataset that includes both true positives and benign traffic. Revisit tuned rules quarterly as the environment changes.' }
          ],
          links: [
            { title: 'Splunk — SPL Search Tutorial', url: 'https://docs.splunk.com/splexref/latest/searchableeventtypes', sourceName: 'Splunk Documentation', resourceType: 'guide', relationship: 'Official Splunk tutorial for writing SPL queries used in SOC alert triage.' },
            { title: 'Microsoft Sentinel — KQL Reference', url: 'https://learn.microsoft.com/en-us/kusto/query/kql-quick-reference', sourceName: 'Microsoft Sentinel Documentation', resourceType: 'reference', relationship: 'KQL syntax reference for writing detection queries in Microsoft Sentinel.' },
            { title: 'Elastic — EQL Search Reference', url: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/eql-syntax.html', sourceName: 'Elastic Documentation', resourceType: 'reference', relationship: 'Elastic EQL syntax reference for event-based threat detection queries.' }
          ],
          quiz: {
            prompt: 'After a SIEM upgrade, a detection rule that previously identified brute-force attacks starts producing 50 false positives per day from a legitimate service account. What is the correct tuning approach?',
            options: [
              'Delete the rule entirely since it is no longer useful',
              'Add a threshold exclusion for the known service account while preserving detection for other accounts',
              'Ignore the false positives and let analysts triage them all',
              'Disable the rule until the next scheduled maintenance window'
            ],
            answerIndex: 1,
            explanation: 'Excluding a specific known-good account from the rule while keeping the detection logic intact for other sources reduces analyst fatigue without creating a blind spot. Every tuning change should be documented and reviewed periodically.'
          }
        },
        {
          slug: 'alert-triage-workflow',
          title: 'Alert Triage & Prioritization Workflow',
          minutes: 30,
          objectives: [
            'Execute a structured triage process that validates whether an alert is a true positive',
            'Prioritize alerts based on asset criticality, threat severity and business impact',
            'Document investigation findings with clear, actionable summaries for escalation'
          ],
          sections: [
            { heading: 'The triage decision tree', body: 'When an alert fires, the analyst follows a structured process: validate that the alert data is accurate (is the source IP really external?), determine whether the activity is malicious (was the PowerShell command a legitimate admin task?), assess the scope (is this a single host or 50?), and decide the action (close as benign, tune the rule, or escalate to incident response). Each step narrows the decision space.' },
            { heading: 'Prioritization factors', body: 'Not all alerts are equal. An alert on a domain controller containing production data is higher priority than the same alert on a development workstation. Prioritization considers: asset criticality (crown jewels versus test systems), data sensitivity (PII and financial data versus public data), attacker stage (lateral movement versus initial access attempt), and whether the alert matches a known threat actor profile.' },
            { heading: 'Writing triage notes that escalate well', body: 'Your triage notes become the first thing the IR team reads. Structure them as: what the alert said, what you investigated, what you found (with evidence), and your recommendation (false positive with reasoning, or escalation with severity). Clear triage notes prevent the IR team from re-investigating the same ground and accelerate the overall response.' }
          ],
          links: [
            { title: 'Splunk — Alert Triage Best Practices', url: 'https://docs.splunk.com/splexref/latest/alerts', sourceName: 'Splunk Documentation', resourceType: 'guide', relationship: 'Splunk documentation on configuring and triaging alerts in a SOC environment.' },
            { title: 'MITRE ATT&CK — Detection & Denial Operations', url: 'https://attack.mitre.org/tactics/ta0043/', sourceName: 'MITRE ATT&CK', resourceType: 'reference', relationship: 'ATT&CK reconnaissance and resource development tactics that inform triage context.' },
            { title: 'CISA — Cyber Threat Actors', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories', sourceName: 'CISA', resourceType: 'reference', relationship: 'CISA advisories listing active threat actors and their TTPs for triage context.' }
          ],
          quiz: {
            prompt: 'A SIEM alert indicates a user downloaded a known malicious executable but the file was immediately quarantined by the endpoint protection platform. How should you triage this alert?',
            options: [
              'Close it as a true positive and escalate to incident response immediately',
              'Close it as a true positive but low severity — the EPP already blocked it, check for any additional activity',
              'Close it as a false positive since the file was blocked',
              'Disable the detection rule since the EPP is handling it'
            ],
            answerIndex: 1,
            explanation: 'The detection was accurate (true positive), but the EPP prevented execution. The analyst should verify no related activity occurred (was there a second stage, or did the user try again?) and escalate at low severity rather than treating it as a non-event.'
          }
        },
        {
          slug: 'threat-intel-integration',
          title: 'Threat Intelligence Consumption in the SOC',
          minutes: 25,
          objectives: [
            'Evaluate threat intelligence feeds for timeliness, accuracy and relevance to the organization',
            'Operationalize threat indicators by adding them to SIEM watchlists and detection rules',
            'Map observed adversary behavior to MITRE ATT&CK techniques during investigations'
          ],
          sections: [
            { heading: 'What makes threat intelligence useful', body: 'Threat intelligence is not just a list of IP addresses. Actionable intelligence includes context: who the adversary is, what sector they target, what tools they use, what vulnerability they exploit and what they do after gaining access. Evaluating sources for timeliness, accuracy and relevance prevents acting on stale or misleading data that wastes analyst time.' },
            { heading: 'From feed to detection', body: 'Consuming intelligence means turning it into detection. A new IP used by a threat actor targeting your industry becomes a watchlist in the SIEM. A new TTP observed in campaigns becomes a detection rule. The SOC should have a weekly process to review new intelligence, assess whether it applies to the organization and implement detection within a defined SLA.' },
            { heading: 'ATT&CK as the mapping language', body: 'When an analyst reports "they used spearphishing to gain initial access, then PowerShell to execute a payload," ATT&CK provides precise technique IDs: T1566.001 for spearphishing attachment and T1059.001 for PowerShell. This shared language enables consistent reporting, gap analysis and cross-team communication.' }
          ],
          links: [
            { title: 'MITRE ATT&CK — Threat Intelligence Framework', url: 'https://attack.mitre.org/resources/using-attack/', sourceName: 'MITRE ATT&CK', resourceType: 'guide', relationship: 'MITRE guide on operationalizing ATT&CK for threat intelligence consumption and sharing.' },
            { title: 'Splunk — Threat Intelligence Framework', url: 'https://docs.splunk.com/splexref/latest/alerts', sourceName: 'Splunk Documentation', resourceType: 'reference', relationship: 'Splunk TI framework documentation for integrating threat feeds into SIEM operations.' },
            { title: 'Elastic — Threat Intelligence Enrichment', url: 'https://www.elastic.co/guide/en/security/current/ti-enrichment.html', sourceName: 'Elastic Documentation', resourceType: 'guide', relationship: 'Elastic documentation on enriching SIEM alerts with threat intelligence data.' }
          ],
          quiz: {
            prompt: 'A threat intelligence report provides a list of 50 IP addresses associated with a ransomware group. What is the first operational step for the SOC?',
            options: [
              'Block all 50 IPs on the perimeter firewall immediately',
              'Add the IPs to a SIEM watchlist and search historical logs for any prior connections',
              'Send the IP list to the incident response team',
              'Ignore them until the next weekly intelligence review'
            ],
            answerIndex: 1,
            explanation: 'Before blocking, the SOC should search historical logs to determine if any internal hosts already communicated with these IPs. This retroactive search may reveal an existing compromise that predates the intelligence publication.'
          }
        }
      ]
    },
    {
      slug: 'log-investigation-threat-hunting',
      stage: 'Intermediate',
      title: 'Log Investigation & Threat Hunting',
      description: 'Deep-dive log analysis, building investigation timelines and proactive threat hunting techniques used by advanced SOC teams.',
      topics: [
        {
          slug: 'cross-source-log-correlation',
          title: 'Cross-Source Log Correlation',
          minutes: 30,
          objectives: [
            'Correlate authentication, network and endpoint logs to reconstruct an attacker\'s path',
            'Identify evidence of lateral movement by linking events across multiple hosts',
            'Use time-based correlation to distinguish coincidental events from coordinated activity'
          ],
          sections: [
            { heading: 'Why single-source analysis fails', body: 'A firewall log shows a connection to a suspicious IP. An endpoint log shows a PowerShell execution at the same time. A Windows log shows a new scheduled task created one minute later. No single log tells the full story — but correlated together, they reveal an attacker who downloaded a payload, executed it and established persistence. Cross-source correlation is the core skill that separates a basic analyst from an effective one.' },
            { heading: 'Correlation techniques', body: 'The most powerful correlation technique is time-window joining: events from different log sources within a narrow time window (e.g., 60 seconds) that share a common field (same user, same IP, same hostname). Another technique is pivot-based correlation: start from one known indicator (an IP address) and search all log sources for any reference to that indicator. SIEM platforms like Splunk and Elastic provide join and union commands for cross-source queries.' },
            { heading: 'Building an investigation timeline', body: 'An investigation timeline stitches events from multiple sources into a chronological narrative. Start with the earliest suspicious event and walk forward: what account was compromised, what process was executed, what network connection was established, what persistence was created. This timeline becomes the backbone of your incident report and the evidence that justifies escalation decisions.' }
          ],
          links: [
            { title: 'Splunk — Stats and Transaction Commands', url: 'https://docs.splunk.com/splexref/latest/fields/searchcommands/stats', sourceName: 'Splunk Documentation', resourceType: 'reference', relationship: 'Splunk SPL commands for time-based log correlation across multiple data sources.' },
            { title: 'Microsoft Sentinel — Investigation Graph', url: 'https://learn.microsoft.com/en-us/azure/sentinel/investigate-cases', sourceName: 'Microsoft Sentinel Documentation', resourceType: 'guide', relationship: 'Microsoft Sentinel investigation graph for visualizing entity relationships across log sources.' },
            { title: 'MITRE ATT&CK — Lateral Movement Techniques', url: 'https://attack.mitre.org/tactics/TA0008/', sourceName: 'MITRE ATT&CK', resourceType: 'reference', relationship: 'ATT&CK lateral movement tactics showing the techniques SOC analysts must correlate across hosts.' }
          ],
          quiz: {
            prompt: 'You find a DNS query to a known C2 domain from Host A at 14:02. At 14:05, Host A connects to a new internal host (Host B) it has never contacted before. At 14:07, Host B begins making the same DNS queries to the C2 domain. This sequence most likely indicates…',
            options: [
              'Coincidental independent malware infections on both hosts',
              'Lateral movement from Host A to Host B followed by malware propagation',
              'A DNS replication issue between the two hosts',
              'A misconfigured proxy routing traffic through both hosts'
            ],
            answerIndex: 1,
            explanation: 'The chronological sequence — C2 activity on Host A, then a new internal connection to Host B, then identical C2 activity on Host B — is the hallmark of lateral movement. The attacker compromised Host A, pivoted to Host B and deployed the same malware there.'
          }
        },
        {
          slug: 'proactive-threat-hunting',
          title: 'Proactive Threat Hunting in the SOC',
          minutes: 30,
          objectives: [
            'Formulate a threat hunting hypothesis based on threat intelligence and environment context',
            'Execute hunts using SIEM queries, endpoint telemetry and network data',
            'Document hunt findings and convert successful detections into automated detection rules'
          ],
          sections: [
            { heading: 'Hypothesis-driven hunting', body: 'Threat hunting starts with a hypothesis: "Based on the latest CISA advisory, our industry is being targeted with credential harvesting through password spraying. We should check for accounts with many failed logons across different IPs followed by a single success." The hypothesis comes from threat intelligence, MITRE ATT&CK mappings or observations from recent incidents. A good hypothesis is specific, testable and relevant to the organization.' },
            { heading: 'Hunting tools and techniques', body: 'Hunters use SIEM queries to search across historical logs for patterns that automated rules have not caught. Common hunt patterns: unusual DNS query volumes per host, process execution from non-standard paths, logon activity outside business hours for accounts that are normally 9-to-5, and network connections to newly registered domains. Endpoint detection tools provide process trees and file modification history for deeper investigation.' },
            { heading: 'From hunt to rule', body: 'When a hunt confirms a threat pattern, the finding must be converted into an automated detection rule so the SOC never has to manually hunt for the same pattern again. Write the rule, test it against historical data to validate true-positive rates, tune it to reduce false positives and deploy it with an owner responsible for ongoing maintenance. This is how the SOC continuously improves.' }
          ],
          links: [
            { title: 'Splunk — Threat Hunting with Splunk', url: 'https://docs.splunk.com/splexref/latest/searchableeventtypes', sourceName: 'Splunk Documentation', resourceType: 'guide', relationship: 'Splunk guides for building threat hunting queries and dashboards in SOC environments.' },
            { title: 'Elastic — Threat Hunting Guide', url: 'https://www.elastic.co/guide/en/security/current/threat-hunting.html', sourceName: 'Elastic Documentation', resourceType: 'guide', relationship: 'Elastic Security documentation on building and executing threat hunts in Elastic SIEM.' },
            { title: 'MITRE ATT&CK — Detection Rule Examples', url: 'https://attack.mitre.org/detections/', sourceName: 'MITRE ATT&CK', resourceType: 'reference', relationship: 'Community-contributed detection rules showing how hunt findings translate to automated detections.' }
          ],
          quiz: {
            prompt: 'A threat hunt reveals that three user accounts authenticated to the VPN from an unusual geographic location between 2 AM and 4 AM on a Sunday. However, the users confirm they were on an authorized business trip. What is the correct outcome?',
            options: [
              'Close the hunt as a false positive and take no further action',
              'Document the finding, add the business trip as an expected baseline exception, and improve geo-anomaly detection with travel-aware exclusion logic',
              'Force password resets for all three accounts immediately',
              'Block the VPN IP range in that country permanently'
            ],
            answerIndex: 1,
            explanation: 'The hunt correctly identified anomalous behavior. The finding is legitimate (unusual geo-authentication) but the explanation is benign (authorized travel). The proper response is to document the exception and improve detection logic to account for known travel patterns, not to dismiss the hunt or overreact.'
          }
        },
        {
          slug: 'advanced-siem-queries',
          title: 'Advanced SIEM Querying & Automation',
          minutes: 25,
          objectives: [
            'Write complex multi-step SIEM queries that join data across multiple index sources',
            'Use lookup tables and enrichment to add context to alerts during triage',
            'Build automated alert workflows that reduce manual analyst effort'
          ],
          sections: [
            { heading: 'Multi-step queries', body: 'Advanced SIEM queries chain multiple search stages together: first narrow to a specific time window and data source, then extract relevant fields, then join with a second data source on a common field, then apply statistical analysis. In Splunk this looks like a pipeline of search, eval, stats and join commands. In KQL it uses summarize, join and extend. Each step narrows the result set toward the answer you need.' },
            { heading: 'Enrichment with lookups', body: 'A raw alert might say "connection to IP 203.0.113.50." Enrichment adds context: that IP belongs to a known TOR exit node, it is geolocated in a country where the company has no operations, and it appeared in a CISA advisory last week. Lookup tables — CSV files, threat intel APIs or CMDB data feeds — turn raw fields into actionable context within the SIEM query itself.' },
            { heading: 'Automation and SOAR integration', body: 'Repetitive triage steps can be automated: a script that automatically checks a new alert IP against a threat intel API, pulls the associated hostname from the CMDB and adds this context to the alert ticket. SOAR platforms orchestrate these steps into playbooks. The goal is not to replace the analyst but to eliminate the five minutes of manual context-gathering that every alert requires.' }
          ],
          links: [
            { title: 'Splunk — Lookup Tables and Enrichment', url: 'https://docs.splunk.com/splexref/latest/fields/searchcommands/lookup', sourceName: 'Splunk Documentation', resourceType: 'reference', relationship: 'Splunk documentation on creating and using lookup tables for alert enrichment.' },
            { title: 'Microsoft Sentinel — Watchlists and Enrichment', url: 'https://learn.microsoft.com/en-us/azure/sentinel/watchlists', sourceName: 'Microsoft Sentinel Documentation', resourceType: 'reference', relationship: 'Microsoft Sentinel watchlist documentation for enriching alerts with contextual data.' },
            { title: 'Elastic — Enrichment with Ingest Pipelines', url: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/ingest-enrich.html', sourceName: 'Elastic Documentation', resourceType: 'reference', relationship: 'Elastic ingest pipeline documentation for adding context to events during ingestion.' }
          ],
          quiz: {
            prompt: 'An alert shows a process connecting to IP 198.51.100.23. After enriching with a threat intelligence lookup, the IP is tagged as a known C2 server with 90-day age. The process is a legitimate browser. What is the most likely explanation?',
            options: [
              'The threat intelligence feed is outdated and should be ignored',
              'The browser is compromised and tunneling C2 traffic through a legitimate application, or the user visited a malicious URL',
              'The IP was recycled and is now a legitimate website',
              'All of the above are possible and require further investigation'
            ],
            answerIndex: 3,
            explanation: 'All three explanations are plausible. A stale TI tag, IP recycling and browser-based C2 are all real scenarios. The analyst must investigate further: check the actual URL visited, review the process integrity and check for other indicators on the host before deciding the outcome.'
          }
        }
      ]
    },
    {
      slug: 'incident-escalation-soc-process',
      stage: 'Advanced',
      title: 'Incident Escalation & SOC Process Improvement',
      description: 'Structured incident escalation, shift handoff procedures, SOC metrics and continuous process improvement for mature security operations.',
      topics: [
        {
          slug: 'incident-escalation-procedures',
          title: 'Incident Escalation & Handoff',
          minutes: 30,
          objectives: [
            'Execute a structured escalation procedure that hands off incidents to the IR team with complete context',
            'Apply severity classification criteria consistently across the SOC team',
            'Manage shift handoffs so that ongoing investigations are not lost or duplicated'
          ],
          sections: [
            { heading: 'The escalation decision', body: 'Escalating too early wastes IR team resources on false positives. Escalating too late allows an attacker to deepen their foothold. The decision framework asks: Is this confirmed malicious? Is the attacker still active? Is the scope limited to one host or spreading? Does the asset contain sensitive data? Each "yes" increases the urgency. Document your reasoning in the escalation ticket so the IR team can pick up immediately.' },
            { heading: 'Severity classification', body: 'Most SOCs use a severity scale (P1-Critical through P4-Low) with defined criteria. P1: active data exfiltration or ransomware on production systems. P2: confirmed compromise of a sensitive system with attacker still active. P3: confirmed compromise with attacker no longer present. P4: suspicious activity under investigation. Consistent classification ensures the most serious incidents get response resources first.' },
            { heading: 'Shift handoff protocol', body: 'A shift handoff transfers ongoing investigations, open alerts and emerging situations from one analyst to the next. The handoff document should list: every open alert with its current triage status, any active investigations with what has been done so far, any upcoming changes or expected events (planned penetration test, new deployment) and any intelligence updates. A poor handoff creates gaps that attackers exploit.' }
          ],
          links: [
            { title: 'Splunk — Incident Response Dashboard Templates', url: 'https://docs.splunk.com/splexref/latest/alerts', sourceName: 'Splunk Documentation', resourceType: 'guide', relationship: 'Splunk documentation on building SOC dashboards for tracking incidents through escalation.' },
            { title: 'CISA — Incident Response Playbooks', url: 'https://www.cisa.gov/resources-tools/services/incident-response-playbooks', sourceName: 'CISA', resourceType: 'reference', relationship: 'CISA-developed playbooks for specific incident types that SOC teams use during escalation.' },
            { title: 'MITRE ATT&CK — Impact Assessment', url: 'https://attack.mitre.org/tactics/ta0040/', sourceName: 'MITRE ATT&CK', resourceType: 'reference', relationship: 'ATT&CK impact tactics used during escalation to assess attacker objectives and business impact.' }
          ],
          quiz: {
            prompt: 'A SOC analyst on the night shift discovers evidence of a compromised admin account that was used to access a database containing customer PII. The attack appears to have stopped two hours ago. How should this be classified?',
            options: [
              'P4-Low — the attack has stopped so there is no immediate risk',
              'P2-High — confirmed compromise of a sensitive asset with potential data exposure',
              'P3-Medium — the attacker is no longer active so it can wait for the day shift',
              'No escalation needed — document it in the shift handoff'
            ],
            answerIndex: 1,
            explanation: 'Even though the attacker is no longer active, the compromise of an admin account with access to PII is a P2 incident. The data exposure must be assessed urgently because regulatory notification clocks may already be ticking.'
          }
        },
        {
          slug: 'soc-metrics-reporting',
          title: 'SOC Metrics & Performance Reporting',
          minutes: 30,
          objectives: [
            'Calculate and interpret key SOC metrics: MTTD, MTTR, false positive rate and alert volume',
            'Build a SOC metrics dashboard that communicates team performance to leadership',
            'Use metrics to identify bottlenecks and justify resource or tool investments'
          ],
          sections: [
            { heading: 'The metrics that matter', body: 'Mean Time to Detect (MTTD) measures how long from when an event occurred to when the SOC identified it. Mean Time to Respond (MTTR) measures from detection to containment. False positive rate tells you how much analyst time is wasted on noise. Alert volume per analyst indicates workload. Together, these metrics tell leadership whether the SOC is improving over time or drowning in alerts.' },
            { heading: 'Building a metrics dashboard', body: 'A SOC dashboard should show: alerts received vs. triaged per shift, MTTD and MTTR trends over 30/60/90 days, top alert categories by volume and by severity, false positive rate by detection rule, and incidents escalated vs. closed at Tier 1. Splunk and Elastic both offer built-in dashboard builders. Present the dashboard weekly to the SOC manager and monthly to the CISO.' },
            { heading: 'Using metrics for improvement', body: 'If 80% of alerts come from three rules, those rules need tuning. If MTTD is high, the detection rules are too slow or the ingestion pipeline has latency. If MTTR is high after escalation, the handoff process needs work. Metrics are not report cards — they are diagnostic tools that tell you where to invest time and resources for maximum impact.' }
          ],
          links: [
            { title: 'Splunk — SOC Metrics Dashboard Examples', url: 'https://docs.splunk.com/splexref/latest/alerts', sourceName: 'Splunk Documentation', resourceType: 'guide', relationship: 'Splunk examples and templates for building SOC performance dashboards.' },
            { title: 'Elastic — Security Operations Metrics', url: 'https://www.elastic.co/guide/en/security/current/dashboards.html', sourceName: 'Elastic Documentation', resourceType: 'guide', relationship: 'Elastic dashboard documentation for tracking SOC metrics and KPIs.' },
            { title: 'CISA — Cybersecurity Performance Goals', url: 'https://www.cisa.gov/cpg', sourceName: 'CISA', resourceType: 'guide', relationship: 'CISA performance goals that align with SOC metrics frameworks for benchmarking.' }
          ],
          quiz: {
            prompt: 'Your SOC dashboard shows that MTTD has increased from 4 hours to 18 hours over the past quarter while alert volume has doubled. What is the most likely root cause and the first improvement to make?',
            options: [
              'Hire more analysts to handle the increased alert volume',
              'The SIEM ingestion pipeline may have latency issues and detection rules may need tuning — investigate data flow first',
              'Switch to a different SIEM platform entirely',
              'Reduce the number of log sources being ingested'
            ],
            answerIndex: 1,
            explanation: 'A tripling of MTTD alongside doubled alert volume points to data pipeline latency (logs arriving late) or detection rules that are too slow to execute. Addressing ingestion and rule performance is the first step before hiring or switching tools.'
          }
        },
        {
          slug: 'soc-continuous-improvement',
          title: 'Continuous Improvement & Purple Teaming',
          minutes: 25,
          objectives: [
            'Conduct post-incident reviews that translate findings into detection and process improvements',
            'Plan and execute purple team exercises that validate SOC detection capabilities',
            'Maintain a detection engineering backlog prioritized by threat intelligence and incident findings'
          ],
          sections: [
            { heading: 'Post-incident as improvement fuel', body: 'Every incident is a free lesson. The post-incident review asks: how was the attacker detected, how long did detection take, what worked in the response, what failed and why. Each finding maps to an action item: a new detection rule, a tuned existing rule, an updated playbook or a process change. Track these items in a backlog with owners and deadlines, just like an engineering team tracks bugs.' },
            { heading: 'Purple team exercises', body: 'Purple teaming combines red team (offensive) and blue team (defensive) capabilities. The red team executes specific ATT&CK techniques while the blue team (SOC) attempts to detect and respond. The exercise validates whether detection rules actually fire, whether analysts correctly triage the alerts and whether escalation procedures work. Every technique that goes undetected becomes a prioritized detection engineering task.' },
            { heading: 'The detection engineering backlog', body: 'Maintain a prioritized list of detection gaps identified through incidents, purple team exercises, threat intelligence and gap analysis against ATT&CK. Each item should specify the ATT&CK technique, the data sources needed, the estimated effort to implement and the risk reduction it provides. Review and reprioritize the backlog monthly as the threat landscape evolves.' }
          ],
          links: [
            { title: 'MITRE ATT&CK — Purple Team Techniques', url: 'https://attack.mitre.org/resources/attack-for-red-teams/', sourceName: 'MITRE ATT&CK', resourceType: 'guide', relationship: 'MITRE resources for planning purple team exercises mapped to specific ATT&CK techniques.' },
            { title: 'Splunk — Security Content and Detection Rules', url: 'https://docs.splunk.com/splexref/latest/searchableeventtypes', sourceName: 'Splunk Documentation', resourceType: 'reference', relationship: 'Splunk pre-built detection content that can be adapted for purple team validation.' },
            { title: 'Elastic — Detection Rules Repository', url: 'https://www.elastic.co/guide/en/security/current/rules.html', sourceName: 'Elastic Documentation', resourceType: 'reference', relationship: 'Elastic detection rules library for validating and expanding SOC detection coverage.' }
          ],
          quiz: {
            prompt: 'After a purple team exercise, the red team confirms they moved laterally using PsExec but the SOC did not detect it. What is the correct follow-up?',
            options: [
              'The purple team exercise was a success because no damage was done',
              'Add a specific detection rule for PsExec lateral movement, test it, tune it and deploy it as a priority item',
              'Ask the red team to use a different technique next time that is easier to detect',
              'Document the finding and schedule it for next quarter\'s detection engineering sprint'
            ],
            answerIndex: 1,
            explanation: 'An undetected technique is a detection gap that must be closed. Write a detection rule for PsExec usage (process creation + named pipe + service creation events), test it, tune it for false positives and deploy it as a priority. Scheduling it for next quarter leaves the gap open for months.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'SOC Shift Alert Triage & Incident Escalation',
    coverage: [
      'SIEM Alert Triage & Validation',
      'Cross-Source Log Correlation',
      'MITRE ATT&CK Technique Mapping',
      'Incident Escalation & Documentation',
      'SOC Metrics and Reporting'
    ],
    brief:
      'You are the Tier 1 analyst on a busy shift when multiple correlated alerts begin firing. Triage each alert, determine which are true positives, build an investigation timeline from cross-source logs, map attacker behaviors to MITRE ATT&CK, escalate confirmed incidents with complete documentation and produce a shift summary report with key metrics.',
    requirements: [
      'Triage at least 10 alerts during the shift, validating each as true positive, false positive or requires further investigation',
      'Build a correlated timeline from endpoint, network and authentication logs for at least one confirmed incident',
      'Map each confirmed malicious behavior to the correct MITRE ATT&CK technique with supporting evidence',
      'Classify confirmed incidents by severity using defined criteria and escalate the appropriate ones',
      'Write a shift handoff document that accurately communicates ongoing investigations and their current status',
      'Produce a shift summary with alert volume, MTTD for the confirmed incidents and top alert categories'
    ],
    expectedOutput:
      'A complete shift package: alert triage log with disposition for each alert, investigation timeline for confirmed incidents, ATT&CK mappings, escalation tickets with severity classification, shift handoff document and shift summary with metrics.',
    rubric: [
      { skill: 'Alert Triage Accuracy', weight: 20, criteria: 'Correctly validates alerts, distinguishes true positives from noise with evidence-backed reasoning' },
      { skill: 'Log Correlation', weight: 20, criteria: 'Successfully correlates events across multiple log sources to reconstruct attacker activity' },
      { skill: 'ATT&CK Mapping', weight: 15, criteria: 'Each observed behavior mapped to the correct ATT&CK technique with supporting log evidence' },
      { skill: 'Escalation Quality', weight: 20, criteria: 'Incidents classified with correct severity and escalated with complete, actionable documentation' },
      { skill: 'Communication & Reporting', weight: 25, criteria: 'Shift handoff and summary are clear, accurate and provide enough context for the next analyst to continue without loss of information' }
    ],
    passScore: 72
  },

  assignments: [
    {
      title: 'SIEM Query Library for Common Alert Types',
      stage: 'Foundation',
      objective: 'Build a library of SIEM queries that triage the ten most common SOC alert types, each producing a structured output suitable for analyst review.',
      requirements: [
        'Identify the ten most common alert categories in a SOC environment (brute force, malware detection, phishing, etc.)',
        'Write a triage query for each alert type in SPL or KQL that produces relevant context fields',
        'Include severity classification logic within each query output',
        'Document each query with: what it detects, which log sources it requires and what "true positive" looks like',
        'Test each query against a sample dataset and record the results'
      ],
      skillsEvaluated: ['SIEM Querying', 'Alert Triage', 'Log Analysis', 'Documentation'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the query library with documentation, test results and a brief analysis of which queries produced the highest and lowest signal-to-noise ratios.',
        textLabel: 'SIEM query library and analysis report',
        minTextLength: 1000,
        linkLabels: ['Query files and test data']
      }
    },
    {
      title: 'Cross-Source Investigation Exercise',
      stage: 'Intermediate',
      objective: 'Analyze a set of correlated logs from multiple sources to reconstruct an attacker\'s activity timeline and produce an investigation report.',
      requirements: [
        'Receive a dataset containing Windows Event Logs, firewall logs, DNS logs and proxy logs spanning 48 hours',
        'Identify the initial compromise event from the earliest suspicious log entry',
        'Correlate events across all log sources to build a chronological activity timeline',
        'Map each significant event to a MITRE ATT&CK technique',
        'Produce an investigation report with the timeline, ATT&CK mapping, impact assessment and escalation recommendation'
      ],
      skillsEvaluated: ['Cross-Source Correlation', 'MITRE ATT&CK Mapping', 'Investigation Reporting', 'Escalation Decision-Making'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the investigation report including the full timeline, ATT&CK mapping table, impact assessment and escalation recommendation with supporting evidence.',
        textLabel: 'Investigation report with timeline and ATT&CK mapping',
        minTextLength: 1200,
        linkLabels: ['Timeline artifacts and query evidence']
      }
    },
    {
      title: 'SOC Metrics Dashboard and Improvement Plan',
      stage: 'Advanced',
      objective: 'Analyze 90 days of SOC operational data, build a metrics dashboard and propose a prioritized improvement plan based on the findings.',
      requirements: [
        'Analyze provided SOC data: alert volumes, triage times, escalation rates, false positive rates and incident types',
        'Calculate MTTD, MTTR, false positive rate and alert-per-analyst metrics for each month',
        'Identify the top three bottlenecks or weaknesses in the SOC\'s current performance',
        'Build a dashboard (Splunk, Elastic or any visualization tool) that presents the metrics clearly',
        'Propose a prioritized improvement plan addressing each bottleneck with specific, measurable actions'
      ],
      skillsEvaluated: ['SOC Metrics Analysis', 'Data Visualization', 'Process Improvement', 'Strategic Communication'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the metrics dashboard, analysis of each metric trend, bottleneck identification and the prioritized improvement plan with owners and timelines.',
        textLabel: 'SOC metrics analysis and improvement plan',
        minTextLength: 1500,
        linkLabels: ['Dashboard files and raw data analysis']
      }
    }
  ],

  simTasks: [
    {
      title: 'Overnight shift: ransomware alert cascade',
      context: 'It is 2 AM and you are the only analyst on shift. The SIEM begins firing P1 alerts: multiple endpoints show process termination events followed by mass file rename operations. Simultaneously, the network monitoring system flags large outbound data transfers to an unfamiliar IP. Three users call the help desk reporting they cannot open files.',
      requirements: [
        'Triage the cascade of alerts and determine which hosts are affected',
        'Correlate the file rename events, process terminations and network transfers to confirm ransomware activity',
        'Isolate the most severely affected hosts immediately to prevent further spread',
        'Identify the initial access vector by checking login and email logs for the earliest affected host',
        'Escalate to the IR team with a complete incident summary including affected hosts, timeline and IOCs'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Triage log with host-by-host assessment, containment actions taken with evidence, initial access vector hypothesis, IOC list and escalation ticket with complete incident summary.',
      skills: ['Alert Triage', 'Cross-Source Correlation', 'Incident Escalation', 'MITRE ATT&CK Mapping']
    },
    {
      title: 'Investigate a potential insider threat',
      context: 'DLP alerts show a user account downloading unusually large volumes of files from a shared drive over the past three days. The user recently submitted a resignation letter. HR has asked the SOC to investigate quietly without alerting the user. The data includes client contact lists and proprietary product specifications.',
      requirements: [
        'Review all DLP alerts and quantify the volume and type of data accessed by the user',
        'Check authentication logs for access patterns outside business hours or from unusual locations',
        'Review email logs for any large attachments or forwarding rules that may indicate exfiltration channels',
        'Assess whether the accessed data falls under any regulatory protection requirements',
        'Prepare a summary report for HR and legal that documents findings without revealing the investigation to the user'
      ],
      priority: 'high',
      dueDayOffset: 3,
      expectedOutput: 'DLP analysis report with data volume and types accessed, authentication pattern analysis, email review findings, regulatory impact assessment and a confidential summary for HR/legal.',
      skills: ['DLP Alert Analysis', 'Insider Threat Investigation', 'Regulatory Awareness', 'Confidential Communication']
    },
    {
      title: 'SOC process improvement proposal',
      context: 'The SOC manager has shared feedback that alert fatigue is a growing problem. The team is triaging 200+ alerts per shift but the false positive rate for the top 5 alert sources is over 70%. Analysts are spending most of their time on noise rather than genuine threats. The manager wants a concrete proposal to address this within 30 days.',
      requirements: [
        'Analyze the provided alert data to identify the top sources of false positives',
        'Determine the root cause for each high-false-positive alert (tuning needed, data quality issue, rule logic problem)',
        'Propose specific tuning changes for the top 5 noise-generating rules with expected false-positive reduction',
        'Suggest a workflow improvement for how alerts are routed and prioritized to reduce analyst fatigue',
        'Present a 30-day implementation plan with milestones and success metrics'
      ],
      priority: 'normal',
      dueDayOffset: 7,
      expectedOutput: 'False positive analysis report, specific tuning recommendations for each noisy rule, workflow improvement proposal and a 30-day implementation plan with measurable targets.',
      skills: ['SOC Metrics Analysis', 'Process Improvement', 'Detection Engineering', 'Project Planning']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Sam Okoro',
      personaRole: 'SOC Shift Lead',
      situation: 'The shift lead needs you to explain why you escalated a specific alert and wants to make sure your reasoning is sound before the incident response team picks it up.',
      openingMessage:
        'I see you escalated alert #4471 as a P2 incident. Walk me through your triage — why did you conclude this was a true positive rather than the same false positive pattern we have been seeing from that vendor\'s scanner?',
      expectedPoints: [
        'Explains the specific log evidence that differentiates this alert from the known false positive pattern',
        'References specific fields and values that confirm the activity is malicious',
        'Describes the scope assessment that justified P2 rather than P3 severity',
        'Shows awareness of the false positive baseline and explains why this instance does not match it'
      ]
    },
    {
      kind: 'team',
      personaName: 'Priya Mehta',
      personaRole: 'Detection Engineer',
      situation: 'The detection engineer wants your feedback on a new rule they plan to deploy, specifically whether it would have caught any recent incidents you investigated.',
      openingMessage:
        'I am finalizing a new detection rule for credential dumping using Mimikatz. Based on the incidents you have triaged this month, would this rule have caught anything that slipped through? What fields would you need in the output to triage efficiently?',
      expectedPoints: [
        'Provides specific examples of incidents where this detection would have fired or missed',
        'Identifies the log fields that are most useful for rapid triage (source host, user, parent process)',
        'Suggests output fields or context that would reduce triage time (asset criticality, user department)',
        'Flags any potential false positive scenarios based on real triage experience'
      ]
    },
    {
      kind: 'client',
      personaName: 'Laura Voss',
      personaRole: 'VP of Operations, Trident Logistics',
      situation: 'The client\'s operations team is concerned about the time it takes to detect and respond to security events and wants to understand what the SOC can realistically deliver.',
      openingMessage:
        'Our board wants to know: if we get breached, how quickly will your SOC detect it and how fast can we contain it? We need real numbers, not marketing promises.',
      expectedPoints: [
        'Provides realistic MTTD and MTTR ranges based on the client\'s log source coverage and SOC maturity level',
        'Explains factors that affect detection speed (log ingestion latency, alert volume, data source breadth)',
        'Describes the escalation process from detection to containment with realistic time estimates',
        'Identifies specific improvements the client can make (adding log sources, improving asset inventory) that would directly improve detection and response times'
      ]
    },
    {
      kind: 'client',
      personaName: 'Michael Torres',
      personaRole: 'CISO, Greenfield Health',
      situation: 'The client is implementing a new EHR system and wants to know what SOC monitoring coverage it will need and how the integration will work.',
      openingMessage:
        'We are deploying a new electronic health record system next month. What logs does your SOC need from this system to provide adequate monitoring, and how do we ensure HIPAA compliance in the process?',
      expectedPoints: [
        'Identifies the specific log sources the EHR system should provide (authentication events, access logs, admin activity, API calls)',
        'Explains how the SOC handles PHI in logs including data minimization and access controls',
        'Describes detection use cases specific to healthcare environments (unauthorized chart access, bulk data exports)',
        'Proposes a phased integration plan that maintains HIPAA compliance throughout deployment'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'After a network firewall upgrade, the SIEM stopped receiving syslog from the perimeter firewalls. No alerts have been generated for external-facing services in 14 hours. The change was performed by the network team without notifying the SOC.',
      requiredActions: [
        { action: 'Verify the SIEM data pipeline is still operational by checking internal log sources that were not affected by the change', good: true, note: 'Confirming that other data sources are still flowing isolates the issue to the firewall logs specifically.' },
        { action: 'Check the firewall syslog configuration to verify the destination IP and port still point to the SIEM collector after the upgrade', good: true, note: 'Firewall upgrades often reset or modify logging configurations, breaking the syslog forwarding.' },
        { action: 'Notify the network team about the logging gap and request immediate reconfiguration of syslog forwarding', good: true, note: 'The network team must restore the logging configuration, and the SOC should not attempt firewall changes without authorization.' },
        { action: 'Wait until the next scheduled maintenance window to address the logging gap since it was caused by an authorized change', good: false, note: 'A 14-hour blind spot on perimeter firewalls is an unacceptable risk that must be resolved immediately, not at the next maintenance window.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'The company has acquired a smaller firm and the SOC must begin monitoring their network within 60 days. The acquired company uses a different SIEM platform and has minimal security logging in place.',
      requiredActions: [
        { action: 'Conduct an asset inventory of the acquired company\'s infrastructure to understand what needs to be monitored', good: true, note: 'You cannot build detection coverage without knowing what assets exist in the new environment.' },
        { action: 'Assess the current logging state of the acquired environment and identify critical gaps against SOC monitoring requirements', good: true, note: 'Baseline the current state so you can prioritize what logging must be deployed first.' },
        { action: 'Develop a phased onboarding plan that prioritizes the most critical assets and data sources for the first 30 days', good: true, note: 'A phased approach delivers value quickly while allowing full integration to happen methodically.' },
        { action: 'Deploy all acquired company endpoints to the existing SIEM immediately to meet the 60-day deadline', good: false, note: 'Bulk-onboarding without understanding the data volume, asset criticality and network topology can overwhelm the SIEM and flood analysts with irrelevant alerts.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between signature-based and behavior-based detection. What are the strengths and weaknesses of each approach in a SOC environment?',
      guidancePoints: [
        'Signature-based detection matches known patterns (hashes, YARA rules, IPS signatures) and provides low-false-positive results for known threats',
        'Behavior-based detection identifies deviations from baseline activity (unusual process chains, anomalous login times) and catches novel attacks',
        'Signature-based misses zero-days and novel variants; behavior-based catches unknowns but generates more false positives requiring analyst judgment',
        'Modern SOCs layer both: signatures for known IOCs and behavior analytics for unknown TTPs, creating overlapping coverage'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'Walk through how you would investigate an alert showing a user account authenticating from two geographically distant locations within 10 minutes.',
      guidancePoints: [
        'First check whether the account could legitimately authenticate from both locations (VPN, mobile device, travel, shared account)',
        'Review the authentication method: was one event a password login and the other an SSO token, suggesting credential theft?',
        'Check for other indicators of compromise around the same time: new forwarding rules, file access anomalies, privilege escalation',
        'Assess account sensitivity and data access level to determine urgency of containment actions',
        'Decide on response: force re-authentication, block the suspicious IP, or close as benign with documentation'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'You are on a night shift alone and the SIEM begins generating 50 alerts per minute from a single detection rule. How do you handle this situation?',
      guidancePoints: [
        'Assess whether this is a genuine threat generating volume (e.g., worm propagation) or a noisy rule producing false positives',
        'Check the rule logic against the alert data: is the threshold misconfigured, or is the data actually showing widespread malicious activity?',
        'If confirmed as a false positive surge, tune the rule threshold or add an exclusion to stop the flood, documenting the change',
        'If confirmed as a real widespread event, escalate immediately to the on-call IR lead even if it means waking someone up',
        'After the situation stabilizes, document the rule change and schedule a post-event review for the next shift lead'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A SIEM alert fires showing PowerShell executing a Base64-encoded command on a domain controller. Walk through your investigation process.',
      guidancePoints: [
        'Triage the alert: decode the Base64 command to understand what it executes and whether it matches known malicious patterns',
        'Check the parent process: was PowerShell launched by a scheduled task, a user login, WMI or a service — each implies a different attack path',
        'Review the process tree for child processes spawned by the PowerShell execution (network connections, file writes, credential access)',
        'Correlate with authentication logs to determine which account was used and whether it has elevated privileges',
        'Check for lateral movement: did the same command or account appear on other hosts around the same time?'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'The SOC has been asked to reduce alert volume by 50% in 90 days. How would you approach this goal without degrading security coverage?',
      guidancePoints: [
        'Analyze alert data to identify the top sources of volume and their true-positive rates',
        'Tune high-volume low-signal rules by adjusting thresholds, adding exclusions for known-good activity and refining detection logic',
        'Consolidate overlapping rules that detect the same behavior from different angles',
        'Implement severity-based routing so low-severity alerts queue for batch review rather than immediate individual triage',
        'Measure the impact of each tuning change on both volume and detection coverage to ensure no blind spots are created'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you handle a situation where the incident response team disagrees with your escalation, dismissing an alert you classified as high severity?',
      guidancePoints: [
        'Present the specific evidence that supports your escalation decision calmly and factually',
        'Acknowledge the IR team\'s perspective and ask what evidence would change their assessment',
        'Offer to continue monitoring the activity and provide updated information as it develops',
        'If the disagreement persists, escalate to the SOC manager or IR lead for a joint review with both teams',
        'Document the disagreement and its resolution regardless of the outcome for future reference'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain to a non-technical department head why their team\'s activity generated 15 security alerts last week.',
      guidancePoints: [
        'Explain in plain language what the alerts were (e.g., unusual login times, accessing files outside normal patterns)',
        'Clarify whether the activity was confirmed as legitimate and what caused it to trigger alerts',
        'Describe what the SOC does with these alerts (triage, investigation, disposition) without using technical jargon',
        'Explain if any changes to the department\'s workflow would reduce future alerts without compromising their operations',
        'Reassure them that the SOC\'s job is to investigate every alert, not to accuse or restrict their work'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'You need to write a shift handoff report summarizing a complex investigation that spanned your entire 8-hour shift. How do you structure it?',
      guidancePoints: [
        'Lead with a one-paragraph executive summary: what was found, current status and what the next analyst must do first',
        'List every open investigation with its current state, evidence collected so far and specific next steps',
        'Include any ongoing monitoring or watchlists that the next analyst should maintain',
        'Note any pending decisions or escalations awaiting response from other teams',
        'Keep the format consistent and scannable so the incoming analyst can absorb the critical information in under five minutes'
      ]
    }

  ]

}
