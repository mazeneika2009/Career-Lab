import type { CareerDef } from '../framework.js'

export const penetrationTester: CareerDef = {
  slug: 'penetration-tester',
  name: 'Penetration Tester',
  category: 'Security',
  order: 26,
  description:
    'Evaluates web application security defensively against OWASP Top 10 with authorized, ethical methodology.',
  difficulty: 'Advanced',
  pathSummary:
    'Security foundations & legal frameworks → web application testing with OWASP & PortSwigger → network infrastructure scanning & exploitation → post-exploitation, reporting & professional ethics.',
  mainSkills: [
    'Penetration Testing Methodology',
    'OWASP Top 10 Identification & Exploitation',
    'Web Application Security Testing',
    'Network Scanning & Enumeration',
    'Exploitation & Post-Exploitation',
    'Security Reporting & Documentation',
    'Ethical Hacking & Legal Compliance',
    'MITRE ATT&CK Mapping'
  ],
  sourcePlatforms: [
    'OWASP',
    'PortSwigger Web Security Academy',
    'NIST',
    'MITRE ATT&CK',
    'CISA'
  ],
  companyName: 'Ironclad Security Consulting',
  roleTitle: 'Penetration Tester',

  chapters: [
    {
      slug: 'methodology-and-foundations',
      stage: 'Beginner',
      title: 'Penetration Testing Methodology & Foundations',
      description: 'The ethical, legal and procedural foundations of professional penetration testing, including industry frameworks and standardized methodologies.',
      topics: [
        {
          slug: 'ethical-hacking-legal-framework',
          title: 'Ethical Hacking & Legal Framework',
          minutes: 25,
          objectives: [
            'Distinguish between authorized penetration testing and unauthorized hacking under applicable laws',
            'Explain the importance of written Rules of Engagement and scope agreements',
            'Identify key legal frameworks governing penetration testing activities'
          ],
          sections: [
            { heading: 'Authorized testing versus criminal hacking', body: 'The single defining difference between a penetration tester and a criminal hacker is written authorization. A signed Rules of Engagement document specifies target systems, testing windows, permitted techniques and escalation procedures. Without this document, the same technical actions constitute unauthorized access under laws like the CFAA. Every engagement must begin with clear legal boundaries.' },
            { heading: 'Rules of Engagement and scope', body: 'A comprehensive scope document defines which IP ranges, domains and applications are in scope, which techniques are permitted (social engineering, denial of service, physical access), and how discovered critical vulnerabilities are communicated during the test. Testing windows, emergency contacts and out-of-bounds systems must be explicitly listed to prevent collateral damage to production services.' },
            { heading: 'Professional certifications and ethics', body: 'Industry certifications like OSCP, CEH and GPEN validate both technical skill and ethical conduct. These certifications require adherence to codes of ethics that prioritize client confidentiality, responsible disclosure and minimizing harm. Professional penetration testers document every action, preserve evidence and never exceed authorized scope regardless of what they discover.' }
          ],
          links: [
            { title: 'NIST SP 800-115 — Technical Guide to Information Security Testing and Assessment', url: 'https://csrc.nist.gov/publications/detail/sp/800-115/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'The foundational NIST guide covering penetration testing planning, execution and reporting procedures.' },
            { title: 'CISA — Vulnerability Scanning and Testing Guidance', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories', sourceName: 'CISA', resourceType: 'guide', relationship: 'CISA advisories and guidance on authorized security testing practices.' },
            { title: 'OWASP Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/', sourceName: 'OWASP', resourceType: 'reference', relationship: 'The OWASP Web Security Testing Guide covering methodology, techniques and documentation standards.' }
          ],
          quiz: {
            prompt: 'A penetration tester discovers a critical remote code execution vulnerability on a system that is technically within the IP range but was excluded in the Rules of Engagement. What is the correct action?',
            options: [
              'Exploit it because it is within the IP range provided',
              'Stop testing and notify the client immediately about the out-of-scope finding',
              'Document it and include it in the final report without testing it',
              'Exploit it to demonstrate severity, then report it'
            ],
            answerIndex: 1,
            explanation: 'The Rules of Engagement define the legal boundaries of the test. Testing systems explicitly excluded from scope, regardless of what is found, violates the authorization agreement and could constitute unauthorized access.'
          }
        },
        {
          slug: 'reconnaissance-and-osint',
          title: 'Reconnaissance & OSINT',
          minutes: 30,
          objectives: [
            'Perform passive and active reconnaissance to map a target\'s attack surface',
            'Gather open-source intelligence using publicly available data sources',
            'Organize reconnaissance findings into an actionable target profile'
          ],
          sections: [
            { heading: 'Passive versus active reconnaissance', body: 'Passive reconnaissance gathers information without directly contacting the target: WHOIS records, DNS history, job postings revealing tech stacks, GitHub repositories with leaked credentials and social media profiling. Active reconnaissance makes direct contact: port scanning, service fingerprinting and directory brute-forcing. Passive recon carries zero risk of detection; active recon triggers IDS alerts and WAF logs.' },
            { heading: 'OSINT tools and techniques', body: 'OSINT Framework provides a structured approach to open-source intelligence gathering. Tools like Shodan reveal internet-facing services and their versions, Censys indexes certificate data, and theHarvester aggregates email addresses and subdomains. Google dorking with advanced search operators uncovers exposed files, login pages and misconfigured services indexed by search engines.' },
            { heading: 'Building the target profile', body: 'A complete target profile maps the organization\'s technology stack, network ranges, employee names and roles, email naming conventions, cloud infrastructure providers and third-party integrations. This profile drives the rest of the engagement: the technology stack informs which vulnerabilities to test, employee data enables targeted social engineering, and network ranges define the scanning scope.' }
          ],
          links: [
            { title: 'MITRE ATT&CK — Reconnaissance', url: 'https://attack.mitre.org/tactics/ta0043/', sourceName: 'MITRE ATT&CK', resourceType: 'reference', relationship: 'ATT&CK reconnaissance tactics including active scanning, phishable information and search open websites.' },
            { title: 'OWASP Web Security Testing Guide — Information Gathering', url: 'https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/', sourceName: 'OWASP', resourceType: 'reference', relationship: 'OWASP testing guide sections on configuration and deployment reconnaissance.' },
            { title: 'PortSwigger — Reconnaissance', url: 'https://portswigger.net/web-security/recon', sourceName: 'PortSwigger Web Security Academy', resourceType: 'guide', relationship: 'PortSwigger Academy guide to reconnaissance techniques for web application testing.' }
          ],
          quiz: {
            prompt: 'During passive reconnaissance, you find an employee\'s personal blog post describing the company\'s internal deployment process, including the CI/CD tool used. What type of intelligence is this?',
            options: [
              'Technical infrastructure intelligence that reveals the attack surface',
              'Social engineering intelligence only',
              'Network topology intelligence',
              'Irrelevant personal information'
            ],
            answerIndex: 0,
            explanation: 'Information about internal tools and processes, even from personal blogs, reveals the technology stack and deployment pipeline. This directly informs which attack vectors and vulnerabilities to prioritize during active testing.'
          }
        },
        {
          slug: 'scanning-enumeration',
          title: 'Scanning & Enumeration',
          minutes: 30,
          objectives: [
            'Perform network scanning to identify live hosts, open ports and running services',
            'Enumerate services to determine versions, configurations and potential weaknesses',
            'Interpret scan results to prioritize targets for exploitation'
          ],
          sections: [
            { heading: 'Network scanning methodology', body: 'Scanning progresses from broad to specific: host discovery with ICMP and ARP sweeps identifies live systems, port scanning with SYN or connect scans reveals open services, and service version detection with banner grabbing and probe responses identifies software versions. Nmap is the industry standard, with scripts (NSE) extending capabilities to vulnerability detection and brute forcing.' },
            { heading: 'Service enumeration techniques', body: 'Once open ports are identified, enumeration extracts detailed information. SMB enumeration reveals shares and user lists, SNMP enumeration exposes network configuration and device details, DNS enumeration finds subdomains and zone transfers, and HTTP enumeration discovers directories, virtual hosts and server configuration files. Each protocol has specific enumeration tools and techniques.' },
            { heading: 'Prioritizing targets from scan results', body: 'Not all open services are equal targets. Prioritize by: services running outdated software with known CVEs, services with default credentials, services暴露ing sensitive information and internet-facing services with direct business impact. Map findings to MITRE ATT&CK initial access techniques to understand which services represent the most likely entry points.' }
          ],
          links: [
            { title: 'NIST SP 800-115 — Scanning and Enumeration', url: 'https://csrc.nist.gov/publications/detail/sp/800-115/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST guidance on network scanning techniques, tools and interpretation of results.' },
            { title: 'MITRE ATT&CK — Active Scanning', url: 'https://attack.mitre.org/techniques/T1595/', sourceName: 'MITRE ATT&CK', resourceType: 'reference', relationship: 'ATT&CK techniques for active scanning including port scanning, vulnerability scanning and wordlist scanning.' },
            { title: 'PortSwigger — Web Fingerprinting', url: 'https://portswigger.net/web-security/fingerprinting', sourceName: 'PortSwigger Web Security Academy', resourceType: 'guide', relationship: 'PortSwigger Academy guide to web application fingerprinting and technology detection.' }
          ],
          quiz: {
            prompt: 'An Nmap scan reveals port 445 open on a Windows server. Which enumeration technique should you attempt first to gather the most useful information?',
            options: [
              'HTTP banner grabbing',
              'SMB enumeration to identify shares, users and domain information',
              'SNMP community string brute forcing',
              'DNS zone transfer'
            ],
            answerIndex: 1,
            explanation: 'Port 445 indicates SMB (Server Message Block). SMB enumeration with tools like smbclient or enum4linux reveals shared folders, user accounts, domain information and sometimes password policies — high-value intelligence for the next phase of the engagement.'
          }
        }
      ]
    },
    {
      slug: 'web-application-testing',
      stage: 'Foundation',
      title: 'Web Application Security Testing',
      description: 'Hands-on testing of web applications against OWASP Top 10 vulnerabilities using PortSwigger Web Security Academy labs and real-world techniques.',
      topics: [
        {
          slug: 'injection-attacks',
          title: 'Injection Attacks — SQL, XSS & Command Injection',
          minutes: 30,
          objectives: [
            'Identify and exploit SQL injection vulnerabilities in web application input fields',
            'Detect and test for cross-site scripting (XSS) including reflected, stored and DOM-based variants',
            'Recognize command injection vulnerabilities and assess their impact'
          ],
          sections: [
            { heading: 'SQL injection fundamentals', body: 'SQL injection occurs when user input is concatenated directly into database queries without parameterization. An attacker can manipulate the query structure to extract data, bypass authentication or modify records. Detection involves injecting single quotes, UNION operators and time-based blind payloads to observe error messages, behavioral changes and response timing differences.' },
            { heading: 'Cross-site scripting attack vectors', body: 'Reflected XSS embeds malicious scripts in URL parameters that execute when the victim clicks the link. Stored XSS persists in the application database and executes for every user who views the affected page. DOM-based XSS manipulates client-side JavaScript to process untrusted data unsafely. Each variant requires different detection and exploitation approaches, from simple alert() confirmation to cookie exfiltration.' },
            { heading: 'Command injection patterns', body: 'Command injection occurs when application input reaches system shell commands without sanitization. Testers identify this by injecting operators like semicolons, pipe characters and backticks to chain additional commands. The impact is typically full server compromise since the injected command runs with the application\'s OS-level permissions. OS command injection is often the highest-severity finding in a web application assessment.' }
          ],
          links: [
            { title: 'PortSwigger — SQL Injection Labs', url: 'https://portswigger.net/web-security/sql-injection', sourceName: 'PortSwigger Web Security Academy', resourceType: 'guide', relationship: 'Interactive labs covering SQL injection detection, exploitation and bypassing filters.' },
            { title: 'PortSwigger — Cross-Site Scripting Labs', url: 'https://portswigger.net/web-security/cross-site-scripting', sourceName: 'PortSwigger Web Security Academy', resourceType: 'guide', relationship: 'Interactive labs for reflected, stored and DOM-based XSS testing.' },
            { title: 'OWASP — Injection Prevention Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Injection_Prevention_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'reference', relationship: 'OWASP guidance on preventing injection attacks through parameterized queries and input validation.' }
          ],
          quiz: {
            prompt: 'A search field returns different page content when you submit \' OR 1=1-- versus a normal search term, but no SQL error message is displayed. What type of SQL injection is this?',
            options: [
              'Error-based SQL injection',
              'Blind SQL injection where data is inferred from application behavior',
              ' UNION-based SQL injection',
              'Second-order SQL injection'
            ],
            answerIndex: 1,
            explanation: 'When the application does not display SQL errors but its behavior changes based on injected conditions, this is blind SQL injection. The tester must infer data from response differences, timing delays or boolean conditions rather than reading direct error output.'
          }
        },
        {
          slug: 'broken-access-control',
          title: 'Broken Access Control & Authentication Flaws',
          minutes: 30,
          objectives: [
            'Test for IDOR vulnerabilities by manipulating object references in API requests',
            'Identify broken access control patterns including privilege escalation and forced browsing',
            'Evaluate authentication mechanisms for weaknesses such as credential stuffing vectors and session management flaws'
          ],
          sections: [
            { heading: 'Insecure direct object references', body: 'IDOR vulnerabilities occur when applications use user-supplied identifiers to access objects without verifying authorization. By changing a URL parameter from /api/user/1234 to /api/user/1235, an attacker may access another user\'s data. Testers systematically increment IDs, swap UUIDs between accounts and test whether access controls enforce ownership at the server level rather than relying on client-side restrictions.' },
            { heading: 'Privilege escalation and forced browsing', body: 'Horizontal privilege escalation lets a user access resources belonging to another user at the same privilege level. Vertical privilege escalation grants access to functions reserved for administrators. Forced browsing accesses unlinked pages directly by URL, bypassing navigation-based access controls. Testers map all application roles, document which functions each role can access and test every endpoint with every role.' },
            { heading: 'Session management weaknesses', body: 'Weak session management enables session fixation, token prediction, cookie manipulation and inadequate session expiration. Testers examine session token entropy, whether tokens change after authentication, cookie security flags (Secure, HttpOnly, SameSite) and whether sessions survive password changes. OWASP ASVS provides the verification standard for session management controls.' }
          ],
          links: [
            { title: 'PortSwigger — Broken Access Control Labs', url: 'https://portswigger.net/web-security/access-control', sourceName: 'PortSwigger Web Security Academy', resourceType: 'guide', relationship: 'Interactive labs covering IDOR, privilege escalation and access control bypass techniques.' },
            { title: 'OWASP Top 10 — Broken Access Control', url: 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/', sourceName: 'OWASP', resourceType: 'reference', relationship: 'OWASP Top 10 entry detailing broken access control patterns and mitigation strategies.' },
            { title: 'NIST SP 800-63B — Digital Identity Guidelines', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST guidelines for authentication and session management requirements.' }
          ],
          quiz: {
            prompt: 'You are testing an application and notice that the admin dashboard is accessible at /admin even though there is no visible link to it from the user interface. What vulnerability class does this represent?',
            options: [
              'SQL injection',
              'Forced browsing / broken access control',
              'Cross-site scripting',
              'Server-side request forgery'
            ],
            answerIndex: 1,
            explanation: 'Forced browsing accesses pages that are not linked but are still accessible by directly navigating to the URL. If the /admin page does not verify the user\'s role server-side, any user can access administrative functions by typing the URL directly.'
          }
        },
        {
          slug: 'security-misconfiguration',
          title: 'Security Misconfiguration & Server-Side Request Forgery',
          minutes: 25,
          objectives: [
            'Identify security misconfigurations in web servers, frameworks and cloud services',
            'Detect and exploit SSRF vulnerabilities to access internal resources',
            'Test for common misconfigurations including directory listing, default credentials and verbose error messages'
          ],
          sections: [
            { heading: 'Web server and framework misconfigurations', body: 'Default installations ship with sample files, default credentials, verbose error pages and unnecessary HTTP methods enabled. Directory listing reveals application structure, debug modes expose stack traces with sensitive paths, and exposed admin interfaces provide direct attack surface. Testers systematically probe for server version disclosure, unnecessary ports on the same host and misconfigured security headers.' },
            { heading: 'Server-side request forgery', body: 'SSRF occurs when an application fetches a remote resource based on user-supplied URLs without validating the destination. An attacker can make the server request internal services like metadata endpoints (169.254.169.254), internal APIs or local files. SSRF is particularly dangerous in cloud environments where metadata services reveal instance credentials. Testers identify SSRF by supplying internal IP ranges and observing response differences.' },
            { heading: 'Cloud and container misconfigurations', body: 'Cloud environments introduce unique misconfiguration risks: publicly accessible S3 buckets, overly permissive IAM roles, exposed Kubernetes dashboards and unencrypted storage volumes. Container misconfigurations include running as root, mounting the Docker socket and shipping images with known CVEs. Testers need cloud-specific tooling and knowledge to identify these issues that traditional scanners miss.' }
          ],
          links: [
            { title: 'PortSwigger — Server-Side Request Forgery Labs', url: 'https://portswigger.net/web-security/ssrf', sourceName: 'PortSwigger Web Security Academy', resourceType: 'guide', relationship: 'Interactive labs covering SSRF detection, exploitation and bypass techniques.' },
            { title: 'OWASP — Server-Side Request Forgery Prevention', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'reference', relationship: 'OWASP cheat sheet for preventing SSRF through URL validation and network segmentation.' },
            { title: 'MITRE ATT&CK — Exploit Public-Facing Application', url: 'https://attack.mitre.org/techniques/T1190/', sourceName: 'MITRE ATT&CK', resourceType: 'reference', relationship: 'ATT&CK technique for exploiting vulnerabilities in internet-facing applications including misconfigurations.' }
          ],
          quiz: {
            prompt: 'A web application has a feature that fetches a user-provided URL to generate a preview thumbnail. You supply http://169.254.169.254/latest/meta-data/iam/security-credentials/ and receive AWS role credentials in the response. What vulnerability did you exploit?',
            options: [
              'Cross-site scripting',
              'Server-side request forgery targeting the cloud metadata service',
              'SQL injection',
              'Insecure direct object reference'
            ],
            answerIndex: 1,
            explanation: 'SSRF allowed you to make the server request the AWS instance metadata service, which is accessible only from within the instance. The metadata endpoint returned IAM credentials, giving you the ability to make AWS API calls with the instance\'s permissions.'
          }
        }
      ]
    },
    {
      slug: 'network-and-infrastructure-testing',
      stage: 'Intermediate',
      title: 'Network & Infrastructure Penetration Testing',
      description: 'Techniques for testing network infrastructure including service exploitation, network pivoting and Active Directory attack paths.',
      topics: [
        {
          slug: 'network-exploitation',
          title: 'Network Service Exploitation',
          minutes: 30,
          objectives: [
            'Exploit common network service vulnerabilities using Metasploit and manual techniques',
            'Identify and leverage misconfigured services for initial access',
            'Assess the risk of known CVEs on discovered network services'
          ],
          sections: [
            { heading: 'Exploitation methodology', body: 'After scanning and enumeration identify vulnerable services, exploitation attempts follow a structured approach: verify the vulnerability is genuine (not a false positive), select the appropriate exploit module or write a custom proof of concept, execute the exploit in a controlled manner and document the exact steps taken. Every exploitation attempt must be logged with timestamps for the final report.' },
            { heading: 'Common network service vulnerabilities', body: 'SMB services may allow null session connections or relay attacks. RDP services with Network Level Authentication disabled are vulnerable to authentication bypass. FTP services with anonymous access expose internal files. SSH services with weak key exchange algorithms are susceptible to downgraded attacks. Each service has a specific testing methodology that reveals its security posture.' },
            { heading: 'Metasploit and manual exploitation', body: 'Metasploit provides a framework of exploit modules, payloads and post-exploitation routines that streamline the exploitation phase. However, manual exploitation demonstrates deeper understanding and avoids signature detection. Testers should be proficient in both: using Metasploit for efficiency on standard exploits, and crafting manual payloads when stealth or custom exploitation is required.' }
          ],
          links: [
            { title: 'MITRE ATT&CK — Exploitation for Client Execution', url: 'https://attack.mitre.org/techniques/T1203/', sourceName: 'MITRE ATT&CK', resourceType: 'reference', relationship: 'ATT&CK techniques for exploiting software vulnerabilities to execute code on target systems.' },
            { title: 'NIST SP 800-115 — Exploitation Phase', url: 'https://csrc.nist.gov/publications/detail/sp/800-115/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST guidance on the exploitation phase of penetration testing including tools, techniques and documentation.' },
            { title: 'CISA — Known Exploited Vulnerabilities Catalog', url: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog', sourceName: 'CISA', resourceType: 'reference', relationship: 'Catalog of actively exploited CVEs that penetration testers should prioritize in assessments.' }
          ],
          quiz: {
            prompt: 'During a network penetration test, you discover an SMB service with null sessions enabled that allows you to enumerate all domain users. What is the most significant risk this misconfiguration poses?',
            options: [
              'It allows denial-of-service attacks against the SMB service',
              'It provides an attacker with a complete user enumeration capability that enables targeted credential attacks',
              'It exposes the server\'s operating system version',
              'It allows anonymous file downloads from the share'
            ],
            answerIndex: 1,
            explanation: 'Null session access to SMB allows complete user enumeration, revealing all domain accounts. This information directly enables targeted password spraying, credential stuffing and brute force attacks against every enumerated account.'
          }
        },
        {
          slug: 'active-directory-attacks',
          title: 'Active Directory Attack Paths',
          minutes: 30,
          objectives: [
            'Map Active Directory trust relationships and identify privilege escalation paths',
            'Execute Kerberoasting and AS-REP roasting attacks to extract service account credentials',
            'Identify misconfigurations that allow domain compromise through delegation abuse'
          ],
          sections: [
            { heading: 'Active Directory enumeration', body: 'Active Directory is the identity backbone of most enterprise networks, making it a primary target. Enumeration with tools like BloodHound maps the complete AD environment: user and group memberships, computer objects, Group Policy Objects, trust relationships and ACLs. This data reveals attack paths from any compromised account to Domain Admin privileges that would otherwise be invisible.' },
            { heading: 'Kerberos attacks', body: 'Kerberoasting extracts service account password hashes by requesting TGS tickets for accounts with Service Principal Names. AS-REP roasting targets accounts that do not require Kerberos pre-authentication. Both attacks offline the hashes for brute force cracking. Golden and Silver ticket attacks forge Kerberos tickets to maintain persistence and impersonate any user. These Kerberos-specific attacks bypass traditional authentication monitoring.' },
            { heading: 'Delegation and trust abuse', body: 'Unconstrained delegation stores TGTs on the server, allowing credential theft if the server is compromised. Constrained delegation limits which services an account can impersonate but can be abused through S4U attacks. Domain trust relationships between forests can be exploited to escalate privileges across organizational boundaries. Testers must understand the full delegation model to identify these subtle but high-impact misconfigurations.' }
          ],
          links: [
            { title: 'MITRE ATT&CK — Kerberoasting', url: 'https://attack.mitre.org/techniques/T1558/003/', sourceName: 'MITRE ATT&CK', resourceType: 'reference', relationship: 'ATT&CK technique for Kerberoasting to extract service account credentials from Kerberos TGS tickets.' },
            { title: 'PortSwigger — Authentication Labs', url: 'https://portswigger.net/web-security/authentication', sourceName: 'PortSwigger Web Security Academy', resourceType: 'guide', relationship: 'PortSwigger labs covering authentication vulnerabilities relevant to web-based Active Directory integration.' },
            { title: 'OWASP — Authentication Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'reference', relationship: 'OWASP guidance on secure authentication implementation including service account management.' }
          ],
          quiz: {
            prompt: 'You compromise a standard domain user account and run BloodHound. The analysis reveals a shortest path to Domain Admin through a group policy that grants local admin on the Domain Controller\'s management workstation. What does this represent?',
            options: [
              'A Kerberos vulnerability requiring immediate patching',
              'A privilege escalation path where compromising the management workstation grants Domain Admin access',
              'A lateral movement vulnerability in the network',
              'A denial-of-service attack vector'
            ],
            answerIndex: 1,
            explanation: 'BloodHound identified a logical attack path: the compromised user has local admin on a workstation that can be used to extract Domain Admin credentials. This is a privilege escalation chain, not a traditional vulnerability — it exploits group policy misconfiguration.'
          }
        },
        {
          slug: 'pivoting-and-lateral-movement',
          title: 'Pivoting & Lateral Movement',
          minutes: 25,
          objectives: [
            'Establish network pivots to reach internal segments through a compromised host',
            'Use lateral movement techniques to escalate access across multiple systems',
            'Maintain operational security while moving through the network undetected'
          ],
          sections: [
            { heading: 'Network pivoting techniques', body: 'Pivoting extends testing from a compromised host to network segments that are not directly accessible. SSH port forwarding, SOCKS proxies and tools like Chisel or Proxychains create tunnels through the initial foothold. Each pivot introduces latency and may generate detectable traffic patterns. Plan pivoting routes carefully to minimize noise while reaching all in-scope internal targets.' },
            { heading: 'Lateral movement methods', body: 'Lateral movement leverages legitimate protocols and credentials to move between systems: PsExec for remote command execution, WMI for management-based access, WinRM for PowerShell remoting and SMB for file-based execution. Credential harvesting with Mimikatz or dumping LSASS provides the material for lateral movement. The most effective lateral movement uses native tools and valid credentials, blending with normal administrative traffic.' },
            { heading: 'Operational security during movement', body: 'Operational security during pivoting means mimicking normal administrative behavior: use standard tools, operate during business hours, limit the number of systems accessed simultaneously and avoid triggering security alerts with noisy scanning. Monitor your own network footprint using packet captures to understand what your activity looks like from the defender\'s perspective. Document everything — your activity must be reconstructable for the final report.' }
          ],
          links: [
            { title: 'MITRE ATT&CK — Lateral Movement', url: 'https://attack.mitre.org/tactics/ta0008/', sourceName: 'MITRE ATT&CK', resourceType: 'reference', relationship: 'ATT&CK lateral movement tactics including remote services exploitation and internal spearphishing.' },
            { title: 'MITRE ATT&CK — Remote Services', url: 'https://attack.mitre.org/techniques/T1021/', sourceName: 'MITRE ATT&CK', resourceType: 'reference', relationship: 'ATT&CK techniques for abusing remote services including SMB, RDP and SSH for lateral movement.' },
            { title: 'NIST SP 800-115 — Network Attacks', url: 'https://csrc.nist.gov/publications/detail/sp/800-115/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST guidance on network-based attack techniques and pivot strategies during penetration testing.' }
          ],
          quiz: {
            prompt: 'After compromising a web server in the DMZ, you need to reach the internal database server on a separate VLAN. Which technique creates a tunnel through the web server to access the internal network?',
            options: [
              'Installing a keylogger on the web server',
              'Setting up a SOCKS proxy or SSH tunnel through the compromised host',
              'Sending a phishing email to the database administrator',
              'Running a port scanner from your attacking machine directly'
            ],
            answerIndex: 1,
            explanation: 'SOCKS proxies and SSH tunnels route traffic through a compromised host, allowing you to reach internal network segments that are not directly routable from your testing position. This is the standard pivoting technique for network penetration testing.'
          }
        }
      ]
    },
    {
      slug: 'post-exploitation-and-reporting',
      stage: 'Advanced',
      title: 'Post-Exploitation, Reporting & Professional Practice',
      description: 'Advanced exploitation techniques, evidence gathering, professional reporting and the ethical responsibilities of a penetration tester.',
      topics: [
        {
          slug: 'post-exploitation-techniques',
          title: 'Post-Exploitation & Evidence Gathering',
          minutes: 30,
          objectives: [
            'Demonstrate impact by extracting sensitive data and establishing persistence from a compromised host',
            'Collect forensic evidence to support the findings documented in the penetration test report',
            'Evaluate the business impact of discovered vulnerabilities through proof-of-concept demonstrations'
          ],
          sections: [
            { heading: 'Establishing proof of impact', body: 'A penetration test finding without demonstrated impact is a theoretical risk. Post-exploitation demonstrates real-world consequences: extracting password hashes proves credential theft is possible, accessing sensitive files proves data exfiltration risk, and establishing a reverse shell proves remote code execution. Every proof-of-concept must be carefully documented and executed within scope to avoid unintended damage.' },
            { heading: 'Data exfiltration simulation', body: 'To demonstrate data breach risk, testers simulate exfiltration by identifying and documenting sensitive data locations without actually removing the data. Mapping database schemas, identifying PII columns, locating backup files and cataloging accessible file shares demonstrates what an attacker could steal. This approach proves impact while maintaining the confidentiality of client data.' },
            { heading: 'Persistence mechanisms', body: 'Demonstrating persistence shows that a compromise is not a one-time event. Testers document how an attacker could maintain access through scheduled tasks, registry modifications, SSH keys or web shells. Each persistence mechanism must be documented and subsequently removed during the cleanup phase to restore the environment to its pre-test state.' }
          ],
          links: [
            { title: 'MITRE ATT&CK — Credential Access', url: 'https://attack.mitre.org/tactics/ta0006/', sourceName: 'MITRE ATT&CK', resourceType: 'reference', relationship: 'ATT&CK techniques for credential access including OS credential dumping and password spraying.' },
            { title: 'MITRE ATT&CK — Exfiltration', url: 'https://attack.mitre.org/tactics/ta0010/', sourceName: 'MITRE ATT&CK', resourceType: 'reference', relationship: 'ATT&CK exfiltration tactics that penetration testers simulate to demonstrate data breach impact.' },
            { title: 'NIST SP 800-115 — Post-Exploitation', url: 'https://csrc.nist.gov/publications/detail/sp/800-115/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST guidance on post-exploitation activities, evidence gathering and impact demonstration.' }
          ],
          quiz: {
            prompt: 'After gaining access to a production database server during an authorized test, you discover it contains plaintext customer credit card numbers. What is the most appropriate way to demonstrate impact without causing harm?',
            options: [
              'Exfiltrate the actual credit card data to prove the risk',
              'Document the table schema, column names and record count without extracting actual card data',
              'Delete the data to force the client to implement encryption',
              'Contact the payment processor directly to report the finding'
            ],
            answerIndex: 1,
            explanation: 'Demonstrating impact requires documenting what is accessible (schema, column names, volume) without extracting actual sensitive data. This proves the breach risk while maintaining client data confidentiality and avoiding potential legal liability.'
          }
        },
        {
          slug: 'penetration-test-reporting',
          title: 'Professional Penetration Test Reporting',
          minutes: 30,
          objectives: [
            'Write executive summaries that communicate business risk to non-technical stakeholders',
            'Document technical findings with clear reproduction steps and severity ratings',
            'Structure a penetration test report that meets industry standards and client expectations'
          ],
          sections: [
            { heading: 'Report structure and audience', body: 'A professional penetration test report serves two audiences: executives who need business risk context and technical teams who need remediation details. The report opens with an executive summary in plain language, followed by a risk matrix mapping findings to business impact. Technical sections provide detailed reproduction steps, evidence screenshots and CVSS-rated severity scores. Every finding must include a specific, actionable remediation recommendation.' },
            { heading: 'Writing effective executive summaries', body: 'The executive summary translates technical findings into business language. Instead of "SQL injection on login form," write "an unauthenticated attacker can extract the entire customer database through the login form." Quantify risk where possible: how many records are exposed, what is the regulatory exposure, what would the equivalent breach cost based on industry benchmarks. Executives make budget decisions based on this section.' },
            { heading: 'Technical finding documentation', body: 'Each technical finding needs: a descriptive title, the affected component, a risk rating with CVSS score, step-by-step reproduction instructions, evidence (screenshots, request/response pairs), the business impact analysis and a specific remediation recommendation. The reproduction steps must be detailed enough that a different tester can reproduce the finding by following them exactly. Ambiguity in reproduction steps undermines report credibility.' }
          ],
          links: [
            { title: 'NIST SP 800-115 — Reporting', url: 'https://csrc.nist.gov/publications/detail/sp/800-115/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST guidance on penetration test reporting requirements and documentation standards.' },
            { title: 'OWASP — ReportingTemplate', url: 'https://owasp.org/www-project-web-security-testing-guide/latest/9-Appendix/C.-Documentation/', sourceName: 'OWASP', resourceType: 'reference', relationship: 'OWASP reporting templates and documentation standards for web application security testing.' },
            { title: 'MITRE ATT&CK — Using ATT&CK for Red Teams', url: 'https://attack.mitre.org/resources/attack-for-red-teams/', sourceName: 'MITRE ATT&CK', resourceType: 'guide', relationship: 'Guidance on mapping penetration test findings to ATT&CK for structured reporting.' }
          ],
          quiz: {
            prompt: 'An executive reads your penetration test report and asks "How bad is this really?" about a finding rated CVSS 9.8. What is the best response?',
            options: [
              '"It is a critical vulnerability that needs to be fixed immediately"',
              '"This vulnerability allows an unauthenticated attacker to take full control of the server and access all customer data — it should be remediated within 48 hours"',
              '"The CVSS score indicates high severity per industry standards"',
              '"You should patch it when convenient"'
            ],
            answerIndex: 1,
            explanation: 'Effective communication translates technical severity into business impact. The executive needs to understand what an attacker can actually do and what the business consequences are, not just a numeric score.'
          }
        },
        {
          slug: 'advanced-exploitation-and-evasion',
          title: 'Advanced Exploitation & Evasion',
          minutes: 30,
          objectives: [
            'Develop custom exploits and payloads for situations where standard tools are insufficient',
            'Identify and bypass common security controls including WAFs, EDR and antivirus',
            'Understand the detection landscape to conduct tests that reveal genuine defensive gaps'
          ],
          sections: [
            { heading: 'Custom exploit development', body: 'Standard exploit modules fail against patched or non-standard targets. Custom development requires understanding the underlying vulnerability at the protocol or memory level. Buffer overflows require shellcode crafting and return address manipulation. Logic flaws require understanding the application\'s business logic deeply enough to identify conditions where intended security controls can be circumvented.' },
            { heading: 'Security control evasion', body: 'Modern environments deploy multiple defensive layers: WAFs inspect HTTP traffic for attack patterns, EDR monitors endpoint behavior and antivirus scans files for signatures. Evasion techniques include payload obfuscation to bypass signature detection, traffic fragmentation to evade WAF rules, process injection to avoid EDR hooks and encrypted channels to hide command-and-control traffic. Understanding what triggers each defensive layer is essential for realistic testing.' },
            { heading: 'Living-off-the-land techniques', body: 'The most evasive approach uses legitimate system tools for malicious purposes: PowerShell for command execution, WMIC for remote management, certutil for file downloads and mshta for script execution. These tools are already installed and trusted by security controls, making their abuse difficult to distinguish from normal administration. Testing with LOLBins reveals whether behavioral detection can identify misuse of legitimate tools.' }
          ],
          links: [
            { title: 'MITRE ATT&CK — Defense Evasion', url: 'https://attack.mitre.org/tactics/ta0005/', sourceName: 'MITRE ATT&CK', resourceType: 'reference', relationship: 'ATT&CK defense evasion tactics including obfuscation, process injection and living-off-the-land techniques.' },
            { title: 'PortSwigger — Advanced Topics', url: 'https://portswigger.net/web-security/cross-site-scripting/contexts', sourceName: 'PortSwigger Web Security Academy', resourceType: 'guide', relationship: 'PortSwigger advanced XSS topics including context-dependent payloads and filter bypass techniques.' },
            { title: 'NIST SP 800-115 — Attack Techniques', url: 'https://csrc.nist.gov/publications/detail/sp/800-115/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST documentation of advanced attack techniques and evasion methodologies for penetration testers.' }
          ],
          quiz: {
            prompt: 'Your SQL injection payload is being blocked by a WAF that detects common attack keywords. Which evasion approach is most likely to succeed?',
            options: [
              'Using the same payload with more capital letters',
              'Encoding the payload using URL encoding, double encoding or Unicode to bypass keyword detection while preserving execution semantics',
              'Switching to a different vulnerability entirely',
              'Running the payload from a different IP address'
            ],
            answerIndex: 1,
            explanation: 'WAFs often rely on pattern matching against known attack strings. Encoding the payload changes its representation while the backend application decodes it to the same executable form, bypassing the keyword detection without altering the attack\'s effect.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Full Web Application Penetration Test',
    coverage: [
      'Reconnaissance & Attack Surface Mapping',
      'OWASP Top 10 Vulnerability Identification',
      'Exploitation & Proof of Concept',
      'Post-Exploitation & Impact Demonstration',
      'Professional Reporting & Remediation Guidance'
    ],
    brief:
      'You have been engaged by Meridian Health Systems to perform a penetration test on their public-facing patient portal. The scope includes the web application, its API and the underlying infrastructure. You have a two-week testing window. Perform a comprehensive assessment, demonstrate the real-world impact of every finding and deliver a professional report suitable for both the development team and the board of directors.',
    requirements: [
      'Perform reconnaissance and enumerate the complete attack surface of the target application',
      'Identify and exploit vulnerabilities from each relevant OWASP Top 10 category',
      'Demonstrate business impact for each critical and high-severity finding with proof-of-concept',
      'Escalate access through post-exploitation techniques to show the full attack chain',
      'Map every finding to the MITRE ATT&CK framework with specific technique IDs',
      'Write a professional report with executive summary, technical findings and remediation roadmap',
      'Clean up all artifacts and restore the environment to its pre-test state'
    ],
    expectedOutput:
      'A complete penetration test deliverable: executive summary, risk matrix, detailed technical findings with reproduction steps and evidence, ATT&CK mapping, remediation recommendations prioritized by business risk and an appendix with raw scan data.',
    rubric: [
      { skill: 'Reconnaissance & Attack Surface', weight: 15, criteria: 'Thorough enumeration of all application components, API endpoints and infrastructure with clear documentation of methodology' },
      { skill: 'Vulnerability Identification', weight: 25, criteria: 'Discovery of vulnerabilities across multiple OWASP categories with accurate severity assessment and no false positives' },
      { skill: 'Exploitation Quality', weight: 25, criteria: 'Clean, reproducible proof-of-concept for each finding with clear demonstration of real-world business impact' },
      { skill: 'Post-Exploitation & Chaining', weight: 15, criteria: 'Demonstrates ability to combine lower-severity findings into high-impact attack chains through post-exploitation' },
      { skill: 'Professional Reporting', weight: 20, criteria: 'Report is well-structured, audience-appropriate, includes actionable remediation and meets industry standards' }
    ],
    passScore: 75
  },

  assignments: [
    {
      title: 'OWASP Top 10 Vulnerability Analysis',
      stage: 'Foundation',
      objective: 'Analyze a vulnerable web application against each OWASP Top 10 category, documenting exploitation steps and remediation for each finding.',
      requirements: [
        'Test the target application against all 10 OWASP Top 10 categories',
        'Document each confirmed vulnerability with reproduction steps and evidence',
        'Assign accurate CVSS scores to each finding with justification',
        'Provide a specific remediation recommendation for each vulnerability',
        'Write a summary analysis of which OWASP categories pose the greatest risk to this application'
      ],
      skillsEvaluated: ['OWASP Top 10', 'Web Application Testing', 'Vulnerability Analysis', 'Security Reporting'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the complete OWASP Top 10 analysis including exploitation documentation, CVSS scoring, remediation recommendations and the risk summary.',
        textLabel: 'OWASP Top 10 vulnerability analysis report',
        minTextLength: 1200,
        linkLabels: ['Evidence screenshots and request/response pairs']
      }
    },
    {
      title: 'Network Penetration Test Report',
      stage: 'Intermediate',
      objective: 'Conduct a network penetration test against a multi-segment environment and produce a client-ready report that maps findings to MITRE ATT&CK techniques.',
      requirements: [
        'Perform full reconnaissance, scanning and enumeration of the target network',
        'Identify and exploit at least five distinct vulnerabilities across different services',
        'Demonstrate lateral movement between network segments through pivoting',
        'Map every finding to specific MITRE ATT&CK techniques with supporting evidence',
        'Produce a penetration test report following NIST SP 800-115 reporting standards'
      ],
      skillsEvaluated: ['Network Scanning', 'Exploitation', 'MITRE ATT&CK Mapping', 'Penetration Test Reporting'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the complete penetration test report including executive summary, technical findings with ATT&CK mapping, remediation plan and raw scan evidence.',
        textLabel: 'Network penetration test report',
        minTextLength: 1500,
        linkLabels: ['Nmap scan output and exploitation evidence']
      }
    },
    {
      title: 'Custom Exploit Development and Evasion Lab',
      stage: 'Advanced',
      objective: 'Write a custom exploit for a known CVE that bypasses the target\'s WAF and EDR controls, then document the full attack chain from initial access to post-exploitation.',
      requirements: [
        'Select a CVE with a known public vulnerability but develop a custom exploit rather than using existing modules',
        'Implement WAF evasion techniques including payload encoding and traffic manipulation',
        'Demonstrate evasion of at least one security control (AV, EDR or WAF) during exploitation',
        'Document the full attack chain from initial exploitation through post-exploitation impact',
        'Provide defensive recommendations for each evasion technique demonstrated'
      ],
      skillsEvaluated: ['Exploit Development', 'Security Control Evasion', 'Post-Exploitation', 'Defensive Recommendations'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the custom exploit code, evasion methodology documentation, full attack chain walkthrough and defensive recommendations for each technique used.',
        textLabel: 'Custom exploit development and evasion report',
        minTextLength: 1800,
        linkLabels: ['Exploit source code and execution evidence']
      }
    }
  ],

  simTasks: [
    {
      title: 'Critical SSRF vulnerability in patient portal API',
      context: 'During a penetration test of Meridian Health Systems\' patient portal, you discover that the image proxy endpoint at /api/proxy/image?url= parameter accepts arbitrary URLs without validation. You can reach the internal cloud metadata service and retrieve IAM credentials. The portal is internet-facing and handles protected health information.',
      requirements: [
        'Demonstrate the SSRF vulnerability by retrieving cloud instance metadata',
        'Assess the scope of access granted by the discovered IAM credentials',
        'Identify what patient data could be accessed through the application database using the metadata credentials',
        'Determine whether the SSRF can be chained with other vulnerabilities for deeper access',
        'Document the complete attack chain with evidence for the penetration test report'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'SSRF proof-of-concept with metadata retrieval evidence, IAM credential scope analysis, data access assessment and a complete attack chain document.',
      skills: ['SSRF Exploitation', 'Cloud Security', 'Attack Chaining', 'Penetration Test Documentation']
    },
    {
      title: 'Active Directory privilege escalation discovery',
      context: 'You have compromised a standard domain user account on the Meridian Health network. BloodHound analysis reveals that the helpdesk group has DCSync rights over a non-production domain controller that has a two-way trust with the production domain. The production domain contains all patient record databases.',
      requirements: [
        'Document the complete privilege escalation path from standard user to Domain Admin in the production domain',
        'Explain why the trust configuration creates this attack path',
        'Demonstrate the DCSync attack against the non-production domain controller',
        'Assess the blast radius if an attacker achieved this level of access',
        'Recommend specific remediation actions to close the privilege escalation path'
      ],
      priority: 'high',
      dueDayOffset: 3,
      expectedOutput: 'BloodHound path analysis, DCSync proof-of-concept, blast radius assessment and remediation recommendations with specific configuration changes.',
      skills: ['Active Directory Attacks', 'BloodHound Analysis', 'Trust Abuse', 'Privilege Escalation']
    },
    {
      title: 'WAF bypass and advanced XSS exploitation',
      context: 'The Meridian patient portal uses a commercial WAF that blocks common XSS payloads. You have identified a reflected XSS vulnerability in the search functionality but need to bypass the WAF to demonstrate the real-world risk of session hijacking for the report.',
      requirements: [
        'Identify the WAF\'s detection patterns by testing various payload encodings and obfuscation techniques',
        'Develop a custom XSS payload that bypasses the WAF while still demonstrating cookie theft',
        'Demonstrate session hijacking by stealing an authenticated user\'s session cookie',
        'Assess the full impact of the XSS in context of the healthcare application',
        'Document the WAF bypass methodology and recommend WAF rule improvements'
      ],
      priority: 'normal',
      dueDayOffset: 5,
      expectedOutput: 'WAF bypass methodology, working XSS payload with cookie theft demonstration, impact assessment in healthcare context and WAF rule improvement recommendations.',
      skills: ['XSS Exploitation', 'WAF Bypass', 'Session Hijacking', 'Web Application Security']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Sarah Chen',
      personaRole: 'Security Engineering Lead',
      situation: 'The development team wants to push back on remediation timelines for several critical findings from your penetration test because they conflict with a product launch deadline.',
      openingMessage:
        'We have reviewed your findings and agree they are real, but we are two weeks from launching the new patient portal and your critical findings require significant code changes. The launch date is firm. Can we defer these fixes to a patch release after launch?',
      expectedPoints: [
        'Assesses the actual exploitability and risk of each critical finding in the context of a public launch',
        'Proposes compensating controls that reduce risk while allowing the launch to proceed',
        'Provides a prioritized remediation schedule that addresses highest-risk items before launch',
        'Documents the risk acceptance formally so the decision is shared with leadership'
      ]
    },
    {
      kind: 'team',
      personaName: 'Marcus Webb',
      personaRole: 'Penetration Testing Manager',
      situation: 'Your manager asks you to present the penetration test findings to the development team in a way that leads to collaboration rather than blame.',
      openingMessage:
        'The developers are defensive about the security findings. I need you to present the results to the team in a way that gets them engaged in fixing issues rather than arguing about the findings. Can you walk me through how you plan to approach this meeting?',
      expectedPoints: [
        'Frames the presentation as a shared goal of improving application security rather than listing failures',
        'Provides specific, actionable remediation guidance rather than just identifying problems',
          'Demonstrates technical expertise by showing exactly how each vulnerability works and how to prevent it',
        'Creates a collaborative remediation plan where developers have input on timelines and approaches'
      ]
    },
    {
      kind: 'client',
      personaName: 'Dr. Patricia Okonkwo',
      personaRole: 'CTO, Meridian Health Systems',
      situation: 'The CTO wants to understand the business implications of the penetration test findings before deciding on remediation investment.',
      openingMessage:
        'Our board is asking what these penetration test findings mean for our HIPAA compliance posture and our cyber insurance coverage. Can you explain the regulatory and financial implications of the critical vulnerabilities you found?',
      expectedPoints: [
        'Connects specific technical findings to HIPAA Security Rule requirements and potential violations',
        'Explains the financial exposure including potential fines, legal costs and insurance implications',
        'Provides a risk-quantified remediation roadmap that shows ROI of security investment',
        'Recommends immediate actions that address both security risk and compliance obligations'
      ]
    },
    {
      kind: 'client',
      personaName: 'James Harrington',
      personaRole: 'VP of Compliance, Meridian Health Systems',
      situation: 'The compliance officer needs the penetration test results formatted for the board of directors and regulatory filing.',
      openingMessage:
        'We need to file our annual HIPAA risk assessment with the board next week and your penetration test results are a key input. Can you prepare a summary that the board can understand and that satisfies our regulatory filing requirements?',
      expectedPoints: [
        'Translates technical findings into a compliance-focused risk assessment format',
        'Maps findings to specific HIPAA Security Rule safeguards and implementation specifications',
        'Provides a board-ready executive summary with risk ratings and recommended actions',
        'Addresses the specific requirements of HIPAA risk assessment documentation'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'During an authorized penetration test, your exploitation of a SQL injection vulnerability causes the target database to return an error that is visible to end users on the production website. The client\'s support team is receiving reports from customers about the error messages.',
      requiredActions: [
        { action: 'Immediately stop exploitation of the affected vulnerability and notify the client\'s technical contact', good: true, note: 'Stopping prevents further customer impact and demonstrates professional judgment when unintended consequences occur.' },
        { action: 'Document exactly what was tested and what caused the error for the client\'s investigation', good: true, note: 'Detailed documentation helps the client understand the root cause and prevents repeat incidents.' },
        { action: 'Work with the client to determine whether any data was exposed through the error messages', good: true, note: 'Assessing the actual impact of the unintended error demonstrates thoroughness and supports the client\'s incident assessment.' },
        { action: 'Continue testing other vulnerabilities while the error is being investigated by the client', good: false, note: 'Continuing to test while the client is dealing with customer complaints shows poor judgment and could cause additional impact.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'Halfway through a two-week penetration test engagement, the client discovers a new cloud application that was deployed without their knowledge and is processing sensitive data. They ask you to include it in the current test scope.',
      requiredActions: [
        { action: 'Request a formal scope change amendment to the Rules of Engagement before testing the new application', good: true, note: 'Testing without written authorization for the new scope violates the engagement agreement regardless of the client\'s verbal request.' },
        { action: 'Perform passive reconnaissance on the new application while waiting for the formal scope amendment', good: true, note: 'Passive reconnaissance does not directly interact with the target and can inform the scope discussion without requiring immediate authorization.' },
        { action: 'Assess whether the two-week timeline is sufficient to include the new application without compromising test quality', good: true, note: 'A qualified penetration tester knows when scope expansion requires timeline adjustment to maintain thoroughness.' },
        { action: 'Begin testing the new application immediately since the client verbally authorized it', good: false, note: 'Verbal authorization is insufficient for penetration testing. Without written scope amendment, testing the new application is unauthorized access.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Walk through your methodology for testing a web application against the OWASP Top 10. How do you ensure comprehensive coverage without missing vulnerability classes?',
      guidancePoints: [
        'Begin with automated scanning to establish a baseline, then follow with manual testing focused on business logic',
        'Map each OWASP category to specific test cases in the testing plan before starting',
        'Use PortSwigger labs to practice each vulnerability class before applying to real targets',
        'Test each input vector (URL parameters, form fields, headers, cookies) against every relevant category',
        'Document negative results as well as positive findings to demonstrate thorough coverage'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between authenticated and unauthenticated testing, and describe a scenario where each approach is appropriate.',
      guidancePoints: [
        'Unauthenticated testing reveals the external attack surface visible to any internet attacker',
        'Authenticated testing reveals vulnerabilities behind login that only insider threats or compromised accounts can reach',
        'A public-facing application needs both: unauthenticated for perimeter security and authenticated for access control testing',
        'Compliance requirements (PCI DSS, HIPAA) may mandate specific testing types based on data exposure',
        'The testing approach should match the threat model: external attacker simulation versus insider threat simulation'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'You are testing a web application and discover a potential SQL injection vulnerability, but the application returns the same response regardless of your input. How do you determine whether this is a true vulnerability or a false positive?',
      guidancePoints: [
        'Test time-based blind SQL injection using database-specific delay functions to observe response timing',
        'Test boolean-based blind injection by comparing responses to true and false conditions',
        'Check whether WAF or input validation is silently modifying your payloads before they reach the database',
        'Test with database-specific syntax to determine the backend database type and tailor payloads accordingly',
        'Examine HTTP response headers and timing for subtle differences that indicate injection success'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'During a penetration test, you discover that a vulnerability you exploited has caused data corruption in the client\'s production database. How do you handle this situation?',
      guidancePoints: [
        'Immediately stop all testing activities and notify the client\'s emergency contact per the Rules of Engagement',
        'Document exactly which actions were taken and which caused the corruption for the client\'s investigation',
        'Assist the client with data recovery using backups if requested and within your capability',
        'Conduct a root cause analysis of whether the testing methodology or the vulnerability itself caused the damage',
        'Update the engagement procedures to include additional safeguards against similar incidents in the future'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'A client asks you to perform a penetration test but explicitly tells you not to test their third-party payment processor integration because "it is handled by a different vendor." How do you respond?',
      guidancePoints: [
        'Document the excluded scope clearly in the Rules of Engagement and explain the risk of untested components',
        'Assess whether the excluded component represents a significant attack surface in the overall threat model',
        'Recommend that the client request a separate penetration test from the payment processor vendor',
        'Consider whether the integration points between the in-scope application and the excluded processor could be tested without testing the processor itself',
        'Ensure the report explicitly notes the excluded scope and its potential security implications'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'During a penetration test, you discover evidence that the client\'s system has already been compromised by a third party before your engagement began. How do you handle this discovery?',
      guidancePoints: [
        'Stop active exploitation immediately to avoid interfering with the ongoing compromise or destroying evidence',
        'Notify the client\'s designated security contact immediately about the discovery of a real threat actor',
        'Document the indicators of compromise you observed without conducting a full forensic investigation',
        'Recommend the client engage their incident response team or an IR retainer to handle the active compromise',
        'Adjust the penetration test scope and timeline to account for the incident response activities'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain to a non-technical client why a penetration test takes two weeks and cannot be completed in two days. What are you doing during that time?',
      guidancePoints: [
        'Reconnaissance and enumeration require multiple passes to map the complete attack surface thoroughly',
        'Each vulnerability class requires specific testing techniques that cannot be automated entirely',
        'Exploitation attempts must be conducted carefully to avoid disrupting production services',
        'Post-exploitation activities demonstrate real business impact which adds value beyond simple vulnerability discovery',
        'Professional reporting with evidence, remediation guidance and executive summaries takes significant time to produce'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'You have completed a penetration test and found no critical vulnerabilities, but the client\'s board expected significant findings. How do you present these results constructively?',
      guidancePoints: [
        'Frame the absence of critical findings as validation of the client\'s existing security investments',
        'Present all findings regardless of severity, including low and informational items that demonstrate thoroughness',
        'Provide specific recommendations for hardening beyond the current posture even without critical vulnerabilities',
        'Compare the results to industry benchmarks to contextualize the security maturity level',
        'Recommend a retest timeline and specific monitoring to maintain the positive security posture'
      ]
    }

  ]

}
