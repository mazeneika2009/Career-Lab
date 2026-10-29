import type { CareerDef } from '../framework.js'

export const cybersecurityAnalyst: CareerDef = {
  slug: 'cybersecurity-analyst',
  name: 'Cybersecurity Analyst',
  category: 'Security',
  order: 24,
  description:
    'Detects and analyzes threats, hardens systems and runs incident response aligned to NIST and MITRE ATT&CK.',
  difficulty: 'Intermediate',
  pathSummary:
    'Security fundamentals & networking → threat detection with SIEM & logs → vulnerability assessment & hardening → incident response & forensic analysis.',
  mainSkills: [
    'Network Security Fundamentals',
    'SIEM & Log Analysis',
    'Threat Detection & Intelligence',
    'Vulnerability Assessment',
    'Incident Response',
    'MITRE ATT&CK Mapping',
    'Linux & Windows Security',
    'Security Hardening'
  ],
  sourcePlatforms: [
    'NIST',
    'CISA',
    'OWASP',
    'MITRE ATT&CK',
    'Microsoft Security'
  ],
  companyName: 'SentinelVault Defense',
  roleTitle: 'Cybersecurity Analyst',

  chapters: [
    {
      slug: 'security-fundamentals-networking',
      stage: 'Beginner',
      title: 'Security Fundamentals & Networking',
      description: 'Core networking concepts, security principles and the foundational frameworks every analyst must internalize.',
      topics: [
        {
          slug: 'networking-for-security',
          title: 'Networking Essentials for Security',
          minutes: 30,
          objectives: [
            'Explain the TCP/IP model and how data flows through each layer',
            'Identify common network devices and their security implications',
            'Read and interpret packet captures to spot suspicious traffic'
          ],
          sections: [
            { heading: 'The TCP/IP stack through a security lens', body: 'Every network conversation traverses the link, internet, transport and application layers. Attackers exploit weaknesses at each: ARP spoofing at link level, IP spoofing at internet level, SYN floods at transport level and application-layer injection at the top. Understanding the stack lets you place controls where they matter most.' },
            { heading: 'Network topology and chokepoints', body: 'Firewalls, IDS/IPS and proxies sit at network chokepoints where traffic is inspected and filtered. A flat network gives attackers free lateral movement; segmented networks with VLANs and access control lists force them through monitored gates. The more segmented your environment, the more containment options you have during an incident.' },
            { heading: 'Packet analysis with Wireshark', body: 'Reading a packet capture is like reading a conversation transcript. Look for unusual ports, malformed headers, high-volume connections from a single host and DNS queries to known-malicious domains. Filtering with display filters in Wireshark narrows millions of packets to the ones that matter for your investigation.' }
          ],
          links: [
            { title: 'NIST SP 800-41 Rev. 1 — Guidelines on Firewalls', url: 'https://csrc.nist.gov/publications/detail/sp/800-41/rev-1/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'Official guidance on firewall policy, architecture and configuration.' },
            { title: 'CISA — Understanding Network Infrastructure', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories', sourceName: 'CISA', resourceType: 'guide', relationship: 'CISA advisories explaining network-based attack vectors and mitigations.' },
            { title: 'Microsoft Security — Network Security Fundamentals', url: 'https://learn.microsoft.com/en-us/windows-server/identity/securing-privileged-access/securing-privileged-access-reference-material', sourceName: 'Microsoft Security', resourceType: 'reference', relationship: 'Microsoft reference for securing Windows network infrastructure.' }
          ],
          quiz: {
            prompt: 'An attacker sends forged ARP messages to redirect traffic through their machine before it reaches the gateway. This attack occurs at which layer of the TCP/IP model?',
            options: [
              'Application layer',
              'Transport layer',
              'Internet layer',
              'Link layer'
            ],
            answerIndex: 3,
            explanation: 'ARP spoofing operates at the link layer, poisoning the local network\'s ARP cache to redirect Ethernet frames through the attacker\'s machine.'
          }
        },
        {
          slug: 'security-principles-frameworks',
          title: 'Security Principles & Frameworks',
          minutes: 25,
          objectives: [
            'Describe the CIA triad and how it guides security decisions',
            'Compare NIST CSF functions and explain their role in a security program',
            'Map organizational controls to the NIST SP 800-53 catalog'
          ],
          sections: [
            { heading: 'The CIA triad in practice', body: 'Confidentiality prevents unauthorized disclosure, integrity ensures data has not been tampered with, and availability guarantees systems are operational when needed. Every security control maps to at least one of these pillars. A firewall enforces confidentiality by blocking unauthorized access; checksums enforce integrity; load balancers preserve availability.' },
            { heading: 'The NIST Cybersecurity Framework', body: 'NIST CSF organizes security activities into five functions: Identify, Protect, Detect, Respond and Recover. It provides a common language for security posture assessment and maturity tracking. Mapping your controls to CSF functions reveals gaps — for instance, many organizations have strong Protect capabilities but weak Detect coverage.' },
            { heading: 'NIST SP 800-53 controls', body: 'SP 800-53 catalogs over 1,000 security and privacy controls organized into families like Access Control, Incident Response and Risk Assessment. Selecting the right baseline based on your data sensitivity and system categorization ensures your controls match the actual risk you face, not a one-size-fits-all checklist.' }
          ],
          links: [
            { title: 'NIST Cybersecurity Framework', url: 'https://www.nist.gov/cyberframework', sourceName: 'NIST', resourceType: 'reference', relationship: 'Official NIST CSF page with framework overview, core functions and implementation resources.' },
            { title: 'NIST SP 800-53 Rev. 5', url: 'https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'The definitive catalog of security and privacy controls for federal systems.' },
            { title: 'CISA Cybersecurity Performance Goals', url: 'https://www.cisa.gov/cpg', sourceName: 'CISA', resourceType: 'guide', relationship: 'CISA-defined performance goals aligned to NIST CSF for measuring security outcomes.' }
          ],
          quiz: {
            prompt: 'A ransomware attack encrypts files and demands payment for the decryption key. Which pillar of the CIA triad is primarily violated?',
            options: [
              'Confidentiality',
              'Integrity',
              'Availability',
              'Authentication'
            ],
            answerIndex: 2,
            explanation: 'Ransomware encrypts data so authorized users cannot access it, directly violating availability. Confidentiality may also be violated if data is exfiltrated before encryption, but the primary impact is loss of availability.'
          }
        },
        {
          slug: 'operating-system-security',
          title: 'Linux & Windows Security Basics',
          minutes: 30,
          objectives: [
            'Harden a Linux system by configuring permissions, firewall rules and services',
            'Apply Windows security baselines using Group Policy and local settings',
            'Audit system configurations against known security benchmarks'
          ],
          sections: [
            { heading: 'Linux hardening essentials', body: 'Start with principle of least privilege: disable the root login, enforce SSH key authentication and use sudo with logging. Configure iptables or nftables to allow only necessary ports. Disable unused services with systemctl, set file permissions with chmod and monitor /var/log/auth.log for unauthorized access attempts.' },
            { heading: 'Windows security baselines', body: 'Microsoft publishes security baselines for each Windows version that harden settings for account policies, audit policies, user rights assignments and more. Apply them through Group Policy or the Security Compliance Toolkit. Enable Windows Defender, configure audit policies for logon events and account management, and enforce password complexity through Group Policy.' },
            { heading: 'Auditing with CIS Benchmarks', body: 'CIS Benchmarks provide vendor-validated hardening configurations for hundreds of platforms. Running an audit against these benchmarks with tools like CIS-CAT reveals deviations from best practice. Automated remediation scripts can close the gap, but manual review of each finding ensures you understand the business impact before changing settings.' }
          ],
          links: [
            { title: 'Microsoft Security Compliance Toolkit', url: 'https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/windows-security-baselines', sourceName: 'Microsoft Security', resourceType: 'reference', relationship: 'Official Microsoft security baseline packages for Windows configurations.' },
            { title: 'NIST SP 800-123 — Guide to General Server Security', url: 'https://csrc.nist.gov/publications/detail/sp/800-123/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST guidance on securing general-purpose servers including Linux and Windows.' },
            { title: 'CISA — Shields Up Guidance', url: 'https://www.cisa.gov/shields-up', sourceName: 'CISA', resourceType: 'guide', relationship: 'CISA operational guidance for hardening systems against current threat activity.' }
          ],
          quiz: {
            prompt: 'You discover a Linux server running a public-facing service on port 8080 that has no business reason to be exposed. What is the most appropriate first action?',
            options: [
              'Reboot the server to clear the process',
              'Disable the service or block the port in the firewall following the principle of least privilege',
              'Change the service password',
              'Document it in a report and wait for the next audit cycle'
            ],
            answerIndex: 1,
            explanation: 'The principle of least privilege dictates that any unnecessary network exposure should be removed immediately. Blocking the port or disabling the service eliminates the attack surface without impacting business operations.'
          }
        }
      ]
    },
    {
      slug: 'threat-detection-siem',
      stage: 'Foundation',
      title: 'Threat Detection & SIEM Operations',
      description: 'Using SIEM platforms, log analysis and threat intelligence to detect and triage security events in real time.',
      topics: [
        {
          slug: 'siem-fundamentals',
          title: 'SIEM Platform Operations',
          minutes: 30,
          objectives: [
            'Configure a SIEM to ingest logs from multiple data sources',
            'Write detection rules that correlate events across log sources',
            'Triage and prioritize alerts based on severity and context'
          ],
          sections: [
            { heading: 'What a SIEM does', body: 'A Security Information and Event Management system collects, normalizes and correlates log data from firewalls, endpoints, servers and applications in real time. It transforms raw events into searchable, correlated alerts that reveal patterns no single log source could show alone. A well-tuned SIEM is the nerve center of a security operations center.' },
            { heading: 'Log sources and normalization', body: 'Effective detection depends on ingest breadth: Windows Event Logs, syslog from Linux and network devices, endpoint detection logs from EDR agents, DNS query logs and cloud audit trails. Each source has its own schema — the SIEM normalizes them into a common format so a query can span a firewall log and a Windows logon event seamlessly.' },
            { heading: 'Writing detection rules', body: 'Detection rules encode hypotheses about malicious activity. A rule might correlate a failed logon followed by a successful logon within 60 seconds from a new IP as a credential-stuffing indicator. Rules should map to a MITRE ATT&CK technique, have a clear severity level, and include an investigation playbook for the triaging analyst.' }
          ],
          links: [
            { title: 'MITRE ATT&CK Detection Rule Examples', url: 'https://attack.mitre.org/detections/', sourceName: 'MITRE ATT&CK', resourceType: 'reference', relationship: 'Community-contributed detection rules mapped to ATT&CK techniques and procedures.' },
            { title: 'CISA — Detecting and Preventing Brute Force Attacks', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-320a', sourceName: 'CISA', resourceType: 'guide', relationship: 'CISA advisory with detection guidance for brute force and credential-guessing attacks.' },
            { title: 'Microsoft Sentinel Documentation', url: 'https://learn.microsoft.com/en-us/azure/sentinel/', sourceName: 'Microsoft Security', resourceType: 'documentation', relationship: 'Official Microsoft Sentinel SIEM documentation with analytics rule authoring guides.' }
          ],
          quiz: {
            prompt: 'A SIEM alert fires: 50 failed SSH logons from a single IP in 2 minutes followed by one successful logon. This pattern most likely indicates…',
            options: [
              'A misconfigured service account',
              'Credential stuffing or brute force attack',
              'A routine password rotation',
              'A network scanning tool'
            ],
            answerIndex: 1,
            explanation: 'Rapid successive failed logons from one source followed by success is the classic signature of credential stuffing or brute force. The ratio of failures to a single success strongly suggests an automated attack.'
          }
        },
        {
          slug: 'threat-intelligence',
          title: 'Threat Intelligence & MITRE ATT&CK',
          minutes: 30,
          objectives: [
            'Source, evaluate and operationalize threat intelligence feeds',
            'Map observed adversary behavior to MITRE ATT&CK tactics and techniques',
            'Use MITRE ATT&CK to prioritize detection gaps and improve coverage'
          ],
          sections: [
            { heading: 'What makes good threat intelligence', body: 'Threat intelligence is actionable information about adversaries, their tactics, tools and targets — not just a list of IP addresses. Good intelligence includes context: who uses this malware, what sector they target, what vulnerability they exploit and what they do after gaining access. Evaluating sources for timeliness, accuracy and relevance prevents acting on stale or misleading data.' },
            { heading: 'MITRE ATT&CK as the common language', body: 'ATT&CK defines 14 tactics (Initial Access, Execution, Persistence, etc.) with hundreds of techniques and sub-techniques. When an analyst reports "they used spearphishing with a malicious attachment to gain initial access," ATT&CK provides the precise technique ID T1566.001, enabling consistent reporting and gap analysis across the entire detection stack.' },
            { heading: 'Turning intelligence into detection', body: 'Feed intelligence into your SIEM as detection rules: a new TTP from a relevant threat actor becomes a correlation query. Use the ATT&CK Navigator to visualize your detection coverage and identify blind spots. If your organization has no detection for credential dumping (T1003), that is a prioritized gap the next detection engineering sprint should close.' }
          ],
          links: [
            { title: 'MITRE ATT&CK Framework', url: 'https://attack.mitre.org/', sourceName: 'MITRE ATT&CK', resourceType: 'reference', relationship: 'The definitive knowledge base of adversary tactics, techniques and procedures.' },
            { title: 'MITRE ATT&CK Navigator', url: 'https://mitre-attack.github.io/attack-navigator/', sourceName: 'MITRE ATT&CK', resourceType: 'tool', relationship: 'Interactive tool for visualizing and annotating ATT&CK coverage.' },
            { title: 'CISA Threat Advisories', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories', sourceName: 'CISA', resourceType: 'reference', relationship: 'Current threat advisories with indicators of compromise and recommended mitigations.' }
          ],
          quiz: {
            prompt: 'A threat actor gains initial access through a phishing email, then uses PowerShell to execute a downloaded payload. In ATT&CK, the phishing maps to which tactic?',
            options: [
              'Execution',
              'Credential Access',
              'Initial Access',
              'Lateral Movement'
            ],
            answerIndex: 2,
            explanation: 'Phishing (T1566) is an Initial Access technique. The subsequent PowerShell execution maps to the Execution tactic (T1059.001) — distinct from the access method.'
          }
        },
        {
          slug: 'log-analysis-forensics',
          title: 'Log Analysis & Event Investigation',
          minutes: 25,
          objectives: [
            'Parse and correlate logs from Windows Event Logs, Linux syslogs and firewall records',
            'Construct a timeline of attacker activity from disparate log sources',
            'Identify indicators of compromise hidden in normal-looking log entries'
          ],
          sections: [
            { heading: 'Reading logs that matter', body: 'Security logs are voluminous. Focus on authentication events (Windows Event ID 4624/4625, /var/log/auth.log), process creation (Event ID 4688, auditd), network connections (firewall syslog, NetFlow) and file system changes. These four categories capture most attacker footprints across any operating system.' },
            { heading: 'Building an event timeline', body: 'A timeline stitches events from multiple sources into a chronological narrative. Start with the earliest suspicious event, then walk forward: what account was used, what process was spawned, what network connection followed. Tools like Plaso and Timesketch automate timeline construction from raw logs across hosts.' },
            { heading: 'Hiding in plain sight', body: 'Attackers blend into normal traffic — PowerShell is legitimate software, normal users authenticate from many IPs, and scheduled tasks run constantly. Detecting abuse requires establishing baselines for normal behavior, then flagging deviations: a service account logging in interactively, a DNS query to an algorithmically generated domain, or a process spawning from an unusual parent.' }
          ],
          links: [
            { title: 'Microsoft — Windows Security Event Log Reference', url: 'https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/event-4625', sourceName: 'Microsoft Security', resourceType: 'reference', relationship: 'Comprehensive reference for Windows security event IDs and their meanings.' },
            { title: 'NIST SP 800-92 — Guide to Computer Security Log Management', url: 'https://csrc.nist.gov/publications/detail/sp/800-92/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST guidance on collecting, storing and analyzing security logs effectively.' },
            { title: 'MITRE ATT&CK — Indicator of Compromise', url: 'https://attack.mitre.org/resources/using-attack/', sourceName: 'MITRE ATT&CK', resourceType: 'guide', relationship: 'How to map observed indicators to ATT&CK techniques during an investigation.' }
          ],
          quiz: {
            prompt: 'You notice Windows Event ID 4688 (process creation) showing cmd.exe spawning net.exe, which then spawned nltest.exe. This sequence most likely represents…',
            options: [
              'A routine system maintenance script',
              'An attacker enumerating domain trust relationships after gaining code execution',
              'A Windows Update process',
              'A misconfigured service'
            ],
            answerIndex: 1,
            explanation: 'nltest.exe is a domain trust enumeration tool. The sequence cmd.exe → net.exe → nltest.exe is a classic post-exploitation pattern where an attacker maps the Active Directory environment.'
          }
        }
      ]
    },
    {
      slug: 'vulnerability-assessment-hardening',
      stage: 'Intermediate',
      title: 'Vulnerability Assessment & Hardening',
      description: 'Identifying weaknesses before attackers do, and applying systematic hardening guided by OWASP and NIST controls.',
      topics: [
        {
          slug: 'vulnerability-scanning',
          title: 'Vulnerability Scanning & Prioritization',
          minutes: 30,
          objectives: [
            'Run and interpret vulnerability scans across network and application targets',
            'Prioritize findings using CVSS scores and environmental context',
            'Translate scan results into remediation tickets with clear ownership'
          ],
          sections: [
            { heading: 'Choosing the right scanner', body: 'Network vulnerability scanners like Nessus and OpenVAS probe hosts for known CVEs using fingerprinting and plugin-based checks. Application scanners and DAST tools like OWASP ZAP test running web apps for injection, broken authentication and misconfiguration. SAST tools analyze source code statically. Each scanner type reveals a different slice of your attack surface.' },
            { heading: 'Beyond CVSS — contextual prioritization', body: 'CVSS base scores measure inherent severity, but a critical vulnerability on an internet-facing system with no compensating controls is a higher priority than the same score on an isolated dev server. Factor in asset criticality, exposure, exploit availability and threat intelligence to prioritize what gets patched first.' },
            { heading: 'From scan to ticket', body: 'Raw scan output is noise until it becomes an action. For each finding, create a ticket with: CVE ID, affected asset, severity, proof of concept, recommended fix and business justification for the patch timeline. Assign ownership, set a SLA by severity and track remediation through closure.' }
          ],
          links: [
            { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', sourceName: 'OWASP', resourceType: 'reference', relationship: 'The definitive list of the most critical web application security risks.' },
            { title: 'CISA Known Exploited Vulnerabilities Catalog', url: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog', sourceName: 'CISA', resourceType: 'reference', relationship: 'Actively exploited CVEs with required remediation timelines for federal agencies.' },
            { title: 'NIST National Vulnerability Database', url: 'https://nvd.nist.gov/', sourceName: 'NIST', resourceType: 'reference', relationship: 'The authoritative source for CVE details, CVSS scores and vulnerability references.' }
          ],
          quiz: {
            prompt: 'A vulnerability has a CVSS base score of 9.8 but the affected service runs on an isolated test network. The true remediation priority is…',
            options: [
              'Patch immediately regardless of context',
              'Lower than the base score suggests because the exposure is limited',
              'Delete the service entirely',
              'Ignore it because it is only on a test network'
            ],
            answerIndex: 1,
            explanation: 'Environmental context — asset criticality and exposure — adjusts prioritization. A critical CVE on an isolated test system is still a vulnerability, but patches can be scheduled after internet-facing assets with the same score.'
          }
        },
        {
          slug: 'owasp-web-hardening',
          title: 'Web Application Hardening with OWASP',
          minutes: 30,
          objectives: [
            'Identify and mitigate the OWASP Top 10 web application vulnerabilities',
            'Configure secure HTTP headers and TLS settings',
            'Implement input validation, output encoding and access controls'
          ],
          sections: [
            { heading: 'The OWASP Top 10 in context', body: 'The OWASP Top 10 categories — Broken Access Control, Cryptographic Failures, Injection, Insecure Design, Security Misconfiguration, Vulnerable Components, Identification and Authentication Failures, Software and Data Integrity Failures, Security Logging Failures and Server-Side Request Forgery — represent the most common and impactful web vulnerabilities. Understanding each with real examples prevents the same patterns from recurring in your applications.' },
            { heading: 'Secure HTTP headers and TLS', body: 'HTTP security headers — Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options, X-Frame-Options — harden browsers against injection and clickjacking. TLS 1.3 with strong cipher suites protects data in transit. Disable legacy protocols like SSLv3 and TLS 1.0, and use HSTS with a long max-age to force HTTPS everywhere.' },
            { heading: 'Defense-in-depth patterns', body: 'Input validation rejects bad data at the boundary; output encoding prevents injection when rendering data; parameterized queries eliminate SQL injection structurally; RBAC and ABAC enforce access at the application layer. No single control is sufficient — the combination creates overlapping layers that resist different attack vectors simultaneously.' }
          ],
          links: [
            { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', sourceName: 'OWASP', resourceType: 'reference', relationship: 'The flagship OWASP project listing the most critical web security risks.' },
            { title: 'OWASP Application Security Verification Standard', url: 'https://owasp.org/www-project-application-security-verification-standard/', sourceName: 'OWASP', resourceType: 'reference', relationship: 'Detailed verification requirements for web application security testing.' },
            { title: 'Microsoft Security — Web Application Hardening', url: 'https://learn.microsoft.com/en-us/aspnet/core/security/', sourceName: 'Microsoft Security', resourceType: 'guide', relationship: 'Microsoft guidance on securing ASP.NET web applications including authentication and authorization.' }
          ],
          quiz: {
            prompt: 'A login form accepts user input that is concatenated directly into a SQL query. Which OWASP Top 10 category does this vulnerability fall under?',
            options: [
              'Broken Access Control',
              'Cryptographic Failures',
              'Injection',
              'Security Misconfiguration'
            ],
            answerIndex: 2,
            explanation: 'Direct concatenation of user input into SQL enables SQL injection, which falls under the Injection category in the OWASP Top 10. Parameterized queries are the primary mitigation.'
          }
        },
        {
          slug: 'system-hardening',
          title: 'System & Network Hardening',
          minutes: 25,
          objectives: [
            'Apply CIS Benchmark hardening to servers and network devices',
            'Configure firewalls and access control lists using least-privilege principles',
            'Validate hardened configurations with automated compliance checks'
          ],
          sections: [
            { heading: 'Hardening methodology', body: 'Start with a baseline from CIS or the vendor\'s security guide, then remove unnecessary services, disable default accounts, enforce strong authentication, and restrict network access to the minimum required ports. Document every change for audit trail and reproducibility.' },
            { heading: 'Firewall and ACL design', body: 'Firewall rules follow a default-deny model: block everything, then explicitly allow only required traffic. Stateful inspection tracks connection context so only legitimate responses are accepted. ACLs on routers and switches supplement firewalls by segmenting networks and restricting inter-VLAN traffic based on business need.' },
            { heading: 'Automated compliance validation', body: 'Manual checks are error-prone and slow. Use OpenSCAP, InSpec or Ansible compliance playbooks to scan systems against CIS Benchmarks and STIGs automatically. Continuous compliance monitoring catches configuration drift before it becomes a vulnerability, especially in cloud environments where infrastructure changes frequently.' }
          ],
          links: [
            { title: 'NIST SP 800-123 — Guide to General Server Security', url: 'https://csrc.nist.gov/publications/detail/sp/800-123/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST guidance on server hardening covering physical, OS and application layers.' },
            { title: 'Microsoft Security Baselines', url: 'https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/windows-security-baselines', sourceName: 'Microsoft Security', resourceType: 'reference', relationship: 'Microsoft-published security baseline configurations for Windows and Azure.' },
            { title: 'CISA — Cross-Sector Cyber Performance Goals', url: 'https://www.cisa.gov/cpg', sourceName: 'CISA', resourceType: 'guide', relationship: 'CISA performance goals that map to hardening and configuration requirements.' }
          ],
          quiz: {
            prompt: 'A firewall is configured with an explicit ALLOW rule for port 22 from any IP address followed by a default DENY. What is the problem?',
            options: [
              'The default DENY rule makes the configuration too restrictive',
              'The ALLOW rule opens SSH to the entire internet, defeating the purpose of the default-deny posture',
              'Port 22 should be allowed from any IP in production environments',
              'The rules should be placed in reverse order'
            ],
            answerIndex: 1,
            explanation: 'A default-deny rule is only as strong as the exceptions above it. Allowing SSH from any IP exposes the service to brute force and vulnerability exploitation from the entire internet. SSH access should be restricted to known management IPs or a VPN.'
          }
        }
      ]
    },
    {
      slug: 'incident-response-forensics',
      stage: 'Advanced',
      title: 'Incident Response & Forensic Analysis',
      description: 'Leading structured incident response aligned to NIST SP 800-61 and performing forensic triage to contain and recover from breaches.',
      topics: [
        {
          slug: 'incident-response-process',
          title: 'NIST Incident Response Lifecycle',
          minutes: 30,
          objectives: [
            'Execute all four phases of the NIST SP 800-61 incident response lifecycle',
            'Classify incidents by severity and scope to determine response urgency',
            'Coordinate communication during an incident with internal and external stakeholders'
          ],
          sections: [
            { heading: 'Preparation before the storm', body: 'Preparation means having a documented IR plan, defined roles and escalation paths, pre-staged forensic tooling, communication templates and practiced tabletop exercises. When an incident arrives at 3 AM, the team should not be discovering the process — they should be executing a drill they have rehearsed.' },
            { heading: 'Detection, analysis and scoping', body: 'Detection comes from SIEM alerts, EDR notifications, user reports or threat intelligence. The analyst\'s first task is triage: validate whether the alert is a true positive, determine which systems are affected, and assess whether the attacker is still active. Scoping determines how many resources mobilize and whether you escalate to a major incident.' },
            { heading: 'Containment, eradication and recovery', body: 'Short-term containment stops the bleeding: isolate compromised hosts, block malicious IPs and disable compromised accounts. Eradication removes the attacker\'s foothold — malware, backdoors, persistence mechanisms. Recovery restores systems from clean backups and verifies integrity before reconnecting. Every action is documented for the post-incident report.' }
          ],
          links: [
            { title: 'NIST SP 800-61 Rev. 2 — Computer Security Incident Handling Guide', url: 'https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'The foundational NIST guide for building and executing an incident response program.' },
            { title: 'CISA Incident Response Playbooks', url: 'https://www.cisa.gov/resources-tools/services/incident-response-playbooks', sourceName: 'CISA', resourceType: 'reference', relationship: 'CISA-developed playbooks for specific incident types aligned to NIST IR guidance.' },
            { title: 'Microsoft Security — Incident Response', url: 'https://learn.microsoft.com/en-us/microsoft-365/security/defender/investigate-incidents', sourceName: 'Microsoft Security', resourceType: 'documentation', relationship: 'Microsoft Defender incident investigation and response workflows.' }
          ],
          quiz: {
            prompt: 'During an active ransomware outbreak, which containment action should an analyst take first?',
            options: [
              'Pay the ransom immediately to restore data',
              'Isolate affected systems from the network to prevent lateral spread',
              'Wipe and reimage all servers immediately',
              'Wait for the attacker to contact you'
            ],
            answerIndex: 1,
            explanation: 'Network isolation is the critical first containment step. It stops the ransomware from encrypting additional systems while you assess the scope, preserve evidence and plan eradication.'
          }
        },
        {
          slug: 'digital-forensics-triage',
          title: 'Digital Forensics & Triage',
          minutes: 30,
          objectives: [
            'Preserve volatile and non-volatile evidence following a proper chain of custody',
            'Perform memory and disk triage to extract indicators of compromise',
            'Document forensic findings for legal and regulatory purposes'
          ],
          sections: [
            { heading: 'Evidence collection order', body: 'Volatility determines collection order: RAM first, then disk, then network state. Use write-blockers for disk imaging, and capture full memory dumps with tools like WinPmem or LiME before shutting down a suspect machine. Every piece of evidence must be hashed, labeled and logged with who collected it, when and from where to maintain chain of custody.' },
            { heading: 'Memory forensics for live systems', body: 'Running memory contains credentials, network connections, injected code and encryption keys that disappear on shutdown. Tools like Volatility and Rekall parse memory dumps to extract process lists, open handles, network sockets and even reconstructed command histories. This is where you find evidence of fileless malware and in-memory-only attacks.' },
            { heading: 'Disk and file system analysis', body: 'Examine file system metadata — timestamps, deleted files, alternate data streams and $MFT entries on NTFS — to reconstruct attacker activity. Tools like Autopsy and FTK Imager let you search for specific artifacts: scheduled tasks for persistence, registry run keys, browser history for C2 URLs and temporary files for exfiltrated data.' }
          ],
          links: [
            { title: 'NIST SP 800-86 — Guide to Integrating Forensic Techniques', url: 'https://csrc.nist.gov/publications/detail/sp/800-86/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST guidance on integrating forensic techniques into incident response and operations.' },
            { title: 'MITRE ATT&CK — Evidence of Impact', url: 'https://attack.mitre.org/tactics/ta0040/', sourceName: 'MITRE ATT&CK', resourceType: 'reference', relationship: 'ATT&CK impact tactics that forensic analysis targets to understand attacker objectives.' },
            { title: 'CISA — Collecting and Preserving Digital Evidence', url: 'https://www.cisa.gov/sites/default/files/publications/collecting-preserving-digital-evidence_brief508.pdf', sourceName: 'CISA', resourceType: 'guide', relationship: 'CISA guidance on evidence handling, chain of custody and forensic best practices.' }
          ],
          quiz: {
            prompt: 'You arrive at a compromised workstation. The machine is still powered on. What do you collect first?',
            options: [
              'The hard drive using a write-blocker',
              'Volatile memory (RAM) before the machine is shut down or rebooted',
              'The event logs using Event Viewer',
              'Network traffic from the switch port'
            ],
            answerIndex: 1,
            explanation: 'Volatile memory is the most ephemeral evidence. RAM contains running processes, open connections and in-memory artifacts that are lost the moment the machine loses power. Collect it before any other evidence.'
          }
        },
        {
          slug: 'post-incident-recovery',
          title: 'Post-Incident Analysis & Hardening',
          minutes: 25,
          objectives: [
            'Conduct a blameless post-mortem that identifies root causes and systemic failures',
            'Translate incident findings into concrete hardening and detection improvements',
            'Update the incident response plan based on lessons learned'
          ],
          sections: [
            { heading: 'The blameless post-mortem', body: 'A post-mortem asks what happened, why it was not caught sooner, how the response went and what needs to change — without assigning individual blame. Blameless culture means people report issues openly instead of hiding mistakes. The output is a prioritized set of action items with owners, deadlines and measurable outcomes.' },
            { heading: 'Closing detection gaps', body: 'Every incident reveals blind spots in detection. If the attacker moved laterally for 48 hours before being detected, you need better network anomaly detection. If a compromised account used legitimate tools, you need behavior-based detection not just signature-based. Update SIEM rules, add new data sources and test the new detections with purple-team exercises.' },
            { heading: 'Hardening the environment', body: 'The incident response plan itself must evolve: update contact lists, refine escalation thresholds, add playbook steps for new attack patterns and schedule the next tabletop. The goal is that the same attack — or a close variant — would be detected faster, contained more precisely and recovered from more cleanly the next time.' }
          ],
          links: [
            { title: 'NIST SP 800-61 Rev. 2 — Post-Incident Activity', url: 'https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST guidance on lessons learned and post-incident improvement activities.' },
            { title: 'MITRE ATT&CK — Defensive Improvements', url: 'https://attack.mitre.org/resources/attack-for-red-teams/', sourceName: 'MITRE ATT&CK', resourceType: 'guide', relationship: 'Using ATT&CK to map gaps and drive defensive improvements after incidents.' },
            { title: 'Microsoft Security — Post-Incident Review', url: 'https://learn.microsoft.com/en-us/security/operations/incident-response', sourceName: 'Microsoft Security', resourceType: 'documentation', relationship: 'Microsoft guidance on conducting post-incident reviews and continuous improvement.' }
          ],
          quiz: {
            prompt: 'After an incident, the post-mortem reveals the attacker exploited a known vulnerability that had a patch available for three months. The most important systemic fix is…',
            options: [
              'Blaming the sysadmin who missed the patch',
              'Implementing a vulnerability management program with SLAs for patching by severity',
              'Switching to a different antivirus product',
              'Writing a press release about the incident'
            ],
            answerIndex: 1,
            explanation: 'A missing patch for three months is a process failure, not an individual failure. A vulnerability management program with defined SLAs ensures patches are applied systematically, not accidentally.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'SOC Incident Investigation & Response',
    coverage: [
      'SIEM Alert Triage & Log Analysis',
      'MITRE ATT&CK Technique Mapping',
      'Vulnerability Assessment & Prioritization',
      'Incident Response Execution',
      'Forensic Triage & Post-Incident Reporting'
    ],
    brief:
      'You are the analyst on shift when the SIEM triggers multiple correlated alerts indicating potential lateral movement inside the corporate network. Investigate the alert chain, determine the scope of compromise, execute containment, perform forensic triage on the affected hosts, and produce a post-incident report with remediation recommendations.',
    requirements: [
      'Triage the SIEM alerts and validate whether the activity is malicious',
      'Map each observed behavior to a specific MITRE ATT&CK technique with evidence',
      'Build a chronological timeline of attacker activity across affected hosts',
      'Execute containment actions: isolate compromised hosts and disable accounts',
      'Perform memory and disk triage on one compromised system following chain-of-custody procedures',
      'Identify the root cause (vulnerability or misconfiguration) that enabled initial access',
      'Write a post-incident report with root cause analysis, timeline and prioritized recommendations'
    ],
    expectedOutput:
      'A complete incident investigation package: alert analysis, ATT&CK mapping, event timeline, containment evidence, forensic triage findings and a post-incident report with actionable hardening recommendations.',
    rubric: [
      { skill: 'Alert Triage & Log Analysis', weight: 20, criteria: 'Correctly validates alerts, correlates across log sources and separates true positives from noise' },
      { skill: 'ATT&CK Mapping', weight: 15, criteria: 'Each observed behavior mapped to the correct technique with supporting evidence' },
      { skill: 'Investigation Quality', weight: 20, criteria: 'Thorough timeline construction, accurate scope determination and logical investigative progression' },
      { skill: 'Forensic Triage', weight: 20, criteria: 'Evidence collected in proper volatility order with documented chain of custody and relevant IOC extraction' },
      { skill: 'Communication & Reporting', weight: 25, criteria: 'Post-incident report is clear, well-structured, actionable and suitable for both technical and executive readers' }
    ],
    passScore: 72
  },

  assignments: [
    {
      title: 'SIEM Detection Rule Engineering',
      stage: 'Foundation',
      objective: 'Write and test SIEM detection rules that map to specific MITRE ATT&CK techniques, validating them against a dataset of known attacks.',
      requirements: [
        'Select three ATT&CK techniques relevant to a common threat profile',
        'Write detection rules in a SIEM query language (KQL, SPL or equivalent)',
        'Validate each rule against a labeled dataset containing both true positives and benign traffic',
        'Calculate false-positive and true-positive rates for each rule',
        'Document each rule with ATT&CK mapping, severity, and investigation playbook'
      ],
      skillsEvaluated: ['SIEM Querying', 'MITRE ATT&CK Mapping', 'Detection Engineering', 'Log Analysis'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the detection rules with validation results, a false-positive analysis and a written summary of what each rule detects and when it fires.',
        textLabel: 'Detection rule engineering report',
        minTextLength: 1000,
        linkLabels: ['Detection rules and validation dataset']
      }
    },
    {
      title: 'Vulnerability Assessment Report',
      stage: 'Intermediate',
      objective: 'Conduct a full vulnerability assessment of a sample network, prioritize findings and produce an executive-ready remediation plan.',
      requirements: [
        'Run network and application vulnerability scans against the target environment',
        'Categorize findings by CVSS score and environmental risk factors',
        'Identify the top five highest-priority vulnerabilities with evidence and exploitation risk',
        'Produce a remediation plan with SLAs, ownership and implementation guidance',
        'Write an executive summary suitable for a CISO audience'
      ],
      skillsEvaluated: ['Vulnerability Scanning', 'Risk Prioritization', 'OWASP Top 10', 'Security Communication'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the full vulnerability report including scan summaries, prioritized findings, remediation plan and executive summary.',
        textLabel: 'Vulnerability assessment and remediation report',
        minTextLength: 1200,
        linkLabels: ['Scan results data']
      }
    },
    {
      title: 'Incident Response Tabletop Exercise Design',
      stage: 'Advanced',
      objective: 'Design and run a realistic tabletop exercise for a ransomware scenario, evaluating the team\'s detection, containment and communication procedures.',
      requirements: [
        'Create a detailed scenario narrative with escalating injects over a 4-hour exercise',
        'Define clear participant roles: SOC analyst, IR lead, legal, communications and executive',
        'Write evaluation criteria for each phase: detection speed, containment accuracy and communication quality',
        'Facilitate the exercise and record observations at each inject',
        'Deliver a post-exercise report with findings, gaps identified and a prioritized improvement plan'
      ],
      skillsEvaluated: ['Incident Response', 'Exercise Design', 'Communication', 'Process Improvement'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the tabletop scenario package, evaluation criteria, facilitator notes and the post-exercise improvement report.',
        textLabel: 'Tabletop exercise package and improvement report',
        minTextLength: 1500,
        linkLabels: ['Scenario and exercise materials']
      }
    }
  ],

  simTasks: [
    {
      title: 'Ransomware outbreak on the production network',
      context: 'Multiple users report they cannot open files. The help desk confirms that files across three departments now have a .locked extension and a ransom note is displayed on desktops. The SIEM shows unusual SMB traffic from a single workstation that started two hours ago.',
      requirements: [
        'Isolate the originating workstation and affected file shares immediately',
        'Determine whether the ransomware has spread beyond the three reported departments',
        'Identify the initial access vector using login logs and endpoint telemetry',
        'Identify and block any command-and-control domains or IPs from the malware analysis',
        'Initiate recovery from backups after confirming backups are not compromised'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Containment actions with evidence, initial access vector analysis, IOC list and a recovery plan with verified backup integrity.',
      skills: ['Incident Response', 'SIEM Analysis', 'Forensic Triage', 'MITRE ATT&CK Mapping']
    },
    {
      title: 'Investigate a suspected phishing campaign',
      context: 'Several employees forwarded an email claiming to be a company-wide password reset request. The email contains a link to a domain that is not owned by the company. Three employees clicked the link and entered credentials before it was flagged.',
      requirements: [
        'Analyze the phishing email headers and determine the sending infrastructure',
        'Check whether the credential-harvesting site is still active and capture an evidence screenshot',
        'Identify all employees who clicked the link using email gateway and proxy logs',
        'Force a password reset for all affected accounts and revoke active sessions',
        'Create a detection rule to catch similar phishing emails in the future'
      ],
      priority: 'high',
      dueDayOffset: 2,
      expectedOutput: 'Phishing analysis report with IOCs, list of affected users, containment actions taken and a new detection rule for the SIEM.',
      skills: ['Phishing Analysis', 'Email Header Investigation', 'Credential Security', 'SIEM Rule Writing']
    },
    {
      title: 'Quarterly compliance audit preparation',
      context: 'The compliance team has scheduled a NIST SP 800-53 control assessment for next week. Several server configurations have drifted from the baseline since the last audit, and two new cloud services were deployed without security review.',
      requirements: [
        'Run an automated compliance scan against the NIST SP 800-53 baseline for all in-scope systems',
        'Identify and document all configuration drift since the last scan',
        'Perform a security review of the two new cloud services against the architecture review checklist',
        'Create a remediation plan to close compliance gaps before the audit date',
        'Prepare an evidence package for the auditors'
      ],
      priority: 'normal',
      dueDayOffset: 7,
      expectedOutput: 'Compliance scan report, drift analysis, cloud security review findings and a remediation plan with evidence package.',
      skills: ['NIST SP 800-53', 'Compliance Auditing', 'Cloud Security Review', 'Documentation']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Alex Rivera',
      personaRole: 'SOC Manager',
      situation: 'Your manager wants to understand whether the team\'s detection rules are covering the right ATT&CK techniques given the latest threat intelligence.',
      openingMessage:
        'Our board is asking whether we are prepared for the ransomware groups that hit our industry peers last month. I need you to map our current detection coverage against the techniques those groups actually used and tell me where we are exposed.',
      expectedPoints: [
        'Identifies the specific ATT&CK techniques used by the referenced threat actors',
        'Maps current SIEM detection rules against those techniques to show coverage gaps',
        'Quantifies exposure with specific examples of undetected behaviors',
        'Proposes a prioritized detection engineering roadmap to close the gaps'
      ]
    },
    {
      kind: 'team',
      personaName: 'Jordan Lee',
      personaRole: 'DevOps Engineer',
      situation: 'The infrastructure team wants to deploy a new cloud service quickly but has not included security review in the timeline.',
      openingMessage:
        'We need this new API service live by Friday for the product launch. The security review takes two weeks and we do not have time. Can you just do a quick check and sign off?',
      expectedPoints: [
        'Explains the risk of deploying without security review using real examples',
        'Proposes a rapid risk assessment that fits the timeline while maintaining security standards',
        'Identifies minimum security requirements that must be met before deployment',
        'Documents the risk acceptance if management decides to proceed without review'
      ]
    },
    {
      kind: 'client',
      personaName: 'Diana Chen',
      personaRole: 'CISO, Meridian Financial',
      situation: 'The client is concerned about their vulnerability management program after a competitor was breached through an unpatched VPN appliance.',
      openingMessage:
        'We saw what happened to NorthStar Financial — they were breached through a VPN appliance that had a patch available for six weeks. How do we make sure that does not happen to us, and can you audit our current patching program?',
      expectedPoints: [
        'Explains the importance of asset inventory as the foundation of patching programs',
        'Describes a vulnerability management lifecycle with SLAs tied to severity and exposure',
        'Proposes an audit methodology covering scan completeness, patch SLAs and exception handling',
        'Addresses the specific VPN risk with compensating controls while patches are applied'
      ]
    },
    {
      kind: 'client',
      personaName: 'Robert Kim',
      personaRole: 'VP of Engineering, CloudSync',
      situation: 'The client wants to know if their cloud environment meets NIST CSF requirements before an upcoming board review.',
      openingMessage:
        'Our board wants a one-page summary of our cloud security posture against NIST CSF before next Tuesday. We have never formally mapped our controls. Can you help us understand where we stand?',
      expectedPoints: [
        'Walks through each NIST CSF function and asks specific questions about the client\'s current controls',
        'Identifies the most critical gaps that represent real risk, not just checkbox compliance',
        'Provides a prioritized remediation roadmap the board can act on',
        'Formats the output as a concise, non-technical summary suitable for a board audience'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'A production SIEM rule that normally fires 2-3 times per week suddenly stopped firing entirely after a platform upgrade. No alerts have been generated in 72 hours for a detection that previously caught real threats.',
      requiredActions: [
        { action: 'Verify the SIEM data ingestion pipeline is still receiving logs from the relevant sources', good: true, note: 'A silent ingestion failure is the most common cause of detection gaps after upgrades.' },
        { action: 'Test the detection rule manually against known-benign and known-malicious log samples', good: true, note: 'Manual validation isolates whether the rule logic is broken versus the data pipeline.' },
        { action: 'Check whether the platform upgrade changed query syntax or field mappings', good: true, note: 'Upgrades often change field names or schema, silently breaking existing rules.' },
        { action: 'Assume the absence of alerts means the threats stopped and move on to other work', good: false, note: 'Absence of evidence is not evidence of absence — a broken detection rule means you are flying blind.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'During a routine audit, the compliance team discovers that the organization\'s incident response plan does not account for the new cloud workloads deployed three months ago. The plan only references on-premises infrastructure.',
      requiredActions: [
        { action: 'Inventory all cloud workloads and map them to the existing IR plan scope', good: true, note: 'You cannot protect what you do not know about — asset inventory is always the first step.' },
        { action: 'Update the IR plan to include cloud-specific containment procedures (e.g., snapshot isolation, IAM role revocation)', good: true, note: 'Cloud environments require different containment tactics than on-premises networks.' },
        { action: 'Schedule a tabletop exercise focused on a cloud-specific scenario to validate the updated plan', good: true, note: 'An untested plan is a hypothesis, not a capability.' },
        { action: 'Mark the cloud workloads as out-of-scope for the IR plan until a full migration is complete', good: false, note: 'Excluding active systems from incident response coverage creates a known blind spot.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between signature-based and behavior-based threat detection, and when each approach is appropriate.',
      guidancePoints: [
        'Signature-based detection matches known patterns (hashes, YARA rules, IPS signatures) and is fast and precise for known threats',
        'Behavior-based detection identifies deviations from a baseline (unusual process chains, anomalous login patterns) and catches novel attacks',
        'Signature-based has zero false positives for known threats but misses unknowns; behavior-based catches zero-days but generates more false positives',
        'Modern SOC operations layer both: signatures for known IOCs, behavior for unknown TTPs'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'Walk through the MITRE ATT&CK kill chain. What techniques would you expect to see at each stage of a typical enterprise compromise?',
      guidancePoints: [
        'Initial Access: phishing, exploitation of public-facing application, compromised credentials',
        'Execution: command and scripting interpreters, PowerShell, scheduled tasks',
        'Persistence: registry run keys, new accounts, scheduled tasks, DLL side-loading',
        'Privilege Escalation: token manipulation, exploitation of a privilege escalation vulnerability',
        'Lateral Movement: remote services, SMB/Windows Admin Shares, valid accounts',
        'Exfiltration: C2 channels, exfiltration over web protocols, alternate protocols'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A security alert fires indicating a user account logged in from two different countries within a 30-minute window. How do you investigate this?',
      guidancePoints: [
        'First determine whether the two logins are from the same user (VPN split-tunneling, mobile device, timezone anomaly)',
        'Check whether the account has been previously used from either location to establish a baseline',
        'Look for other indicators: new email forwarding rules, unusual file access, privilege escalation attempts',
        'Assess whether the account has elevated privileges and contains sensitive data before escalating',
        'Decide containment: force re-authentication, block the suspicious IP, or do nothing if benign explanation confirmed'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'During an active incident, you discover that the attacker has been inside the network for at least two weeks before detection. How does this affect your response strategy?',
      guidancePoints: [
        'A two-week dwell time means the attacker likely has persistence mechanisms beyond the initial foothold',
        'Scope expands: check for compromised accounts, backdoors, data exfiltration and lateral movement beyond initial findings',
        'Eradication must be comprehensive — a surface-level cleanup leaves the attacker a path back in',
        'Involve forensics to determine what data was accessed or exfiltrated for regulatory and legal obligations',
        'The long dwell time indicates detection gaps that must be addressed as part of post-incident recovery'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'The CEO asks whether the company should pay a ransom after a ransomware attack. How do you counsel the executive team?',
      guidancePoints: [
        'Present the facts: FBI and CISA advise against paying ransoms because payment does not guarantee data recovery and incentivizes future attacks',
        'Explain the legal risks: OFAC sanctions may prohibit payment to certain threat actors',
        'Quantify the business impact of downtime versus the uncertain outcome of paying',
        'Ensure backups are verified and recovery options are understood before making the decision',
        'Recommend involving legal counsel, cyber insurance and law enforcement regardless of the decision'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you balance security requirements with business pressure to ship quickly, especially when the business sees security as a blocker?',
      guidancePoints: [
        'Frame security as enabling the business: breaches cost more than delays',
        'Offer tiered options: a rapid risk assessment with minimum controls for fast launch, full review within the standard timeline',
        'Automate security checks to reduce friction (CI/CD security scanning, automated compliance checks)',
        'Build relationships by demonstrating understanding of business goals, not just listing risks',
        'Document risk acceptance decisions so accountability is shared, not solely the security team\'s'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain to a non-technical board member why the company needs to invest in a Security Operations Center.',
      guidancePoints: [
        'Use an analogy: a SOC is like a 24/7 security camera monitoring room, but for digital assets',
        'Connect to business risk: breaches cost millions in remediation, legal fees and reputation damage',
        'Describe what a SOC does in plain terms: watches for threats, investigates suspicious activity, stops attacks before they cause damage',
        'Reference industry benchmarks: median time to detect a breach without a SOC versus with one',
        'Tie the investment to regulatory requirements and cyber insurance eligibility'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'You discover that a critical vulnerability on a public-facing server was exploited, but the exploit was unsuccessful because a compensating control blocked it. How do you report this to management?',
      guidancePoints: [
        'Lead with the outcome: the compensating control worked and no breach occurred',
        'Explain what the vulnerability was, why it was critical and what the exploit attempted',
        'Be transparent about the window of exposure and why the original patch was not applied',
        'Provide a clear remediation plan with timeline to close the root cause permanently',
        'Recommend an improvement to the patching process to prevent similar gaps'
      ]
    }

  ]

}
