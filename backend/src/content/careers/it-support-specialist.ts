import type { CareerDef } from '../framework.js'

export const itSupportSpecialist: CareerDef = {
  slug: 'it-support-specialist',
  name: 'IT Support Specialist',
  category: 'IT & Cloud',
  order: 31,
  description:
    'Supports people and technology — hardware, Windows/Linux/macOS, ticketing, remote support and clear communication.',
  difficulty: 'Beginner-friendly',
  pathSummary:
    'Hardware & OS basics → networking & ticketing systems → remote support & troubleshooting → advanced administration & end-user experience management.',
  mainSkills: [
    'Hardware Diagnostics & Repair',
    'Windows/Linux/macOS Administration',
    'Active Directory & Identity Management',
    'Remote Support & Troubleshooting',
    'Ticketing System Management',
    'Network Fundamentals & Connectivity',
    'End-User Communication & Documentation'
  ],
  sourcePlatforms: [
    'CompTIA',
    'Microsoft Learn',
    'Apple Support',
    'Cisco',
    'Linux Documentation'
  ],
  companyName: 'TechBridge Support Solutions',
  roleTitle: 'IT Support Specialist',

  chapters: [
    {
      slug: 'hardware-os-foundations',
      stage: 'Beginner',
      title: 'Hardware & OS Foundations',
      description: 'Core computer hardware components, major operating system platforms and the networking basics every support technician handles daily.',
      topics: [
        {
          slug: 'computer-hardware-components',
          title: 'Computer Hardware Components & Diagnostics',
          minutes: 30,
          objectives: [
            'Identify and explain the function of CPU, RAM, storage, motherboard, PSU and expansion cards',
            'Perform basic hardware diagnostics including POST beep codes and visual inspection procedures',
            'Recommend appropriate hardware upgrades based on user requirements and budget constraints'
          ],
          sections: [
            { heading: 'Inside the computer chassis', body: 'Every desktop and laptop shares a common set of components. The CPU executes instructions, RAM provides fast temporary storage for running applications, the motherboard connects all components through buses and chipsets, storage devices (HDDs and SSDs) persist data and the power supply unit converts AC to DC. Understanding what each component does helps you quickly narrow down which part has failed when a user reports a problem.' },
            { heading: 'POST and diagnostic procedures', body: 'When a computer powers on, the BIOS/UEFI runs a Power-On Self-Test. If POST fails, the system communicates the error through beep codes or LED patterns on the motherboard. A single short beep typically means all is well. Continuous beeping or specific beep sequences point to RAM, GPU or motherboard failures. Always start diagnostics by asking what changed recently — a new USB device, a recent power outage or a software install can all be the root cause.' },
            { heading: 'Hardware upgrade decisions', body: 'When a user says their computer is slow, the diagnosis drives the upgrade. If RAM utilization consistently hits 90%, adding RAM helps. If the disk is at 95% capacity or reads are sluggish, upgrading to an SSD is transformative. If the CPU is bottlenecked at 100% during their primary workload, a processor upgrade or a new machine may be needed. Matching the upgrade to the actual bottleneck prevents wasting budget on improvements the user will never notice.' }
          ],
          links: [
            { title: 'CompTIA A+ Hardware Fundamentals', url: 'https://www.comptia.org/certifications/a', sourceName: 'CompTIA', resourceType: 'certification', relationship: 'CompTIA A+ certification covering hardware identification, diagnostics and troubleshooting for entry-level technicians.' },
            { title: 'Microsoft Learn — Windows Hardware Diagnostics', url: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/performing-a-bug-check', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Microsoft documentation on Windows hardware diagnostics and troubleshooting procedures.' },
            { title: 'Linux Hardware Detection Tools', url: 'https://www.tldp.org/HOWTO/Hardware-HOWTO.html', sourceName: 'Linux Documentation', resourceType: 'guide', relationship: 'Linux Hardware HOWTO covering hardware detection utilities like lspci, lsusb and dmidecode.' }
          ],
          quiz: {
            prompt: 'A user reports their computer takes over five minutes to boot and applications are sluggish after startup. Disk usage is at 98% and the drive is an older HDD. What is the most impactful upgrade?',
            options: [
              'Add more RAM to improve application performance',
              'Replace the HDD with an SSD to dramatically reduce boot and load times',
              'Upgrade the CPU to process applications faster',
              'Install a dedicated graphics card for better display performance'
            ],
            answerIndex: 1,
            explanation: 'A full HDD with an older spinning disk is the primary bottleneck. Upgrading to an SSD can reduce boot times from minutes to seconds and make the entire system feel significantly faster. RAM would help with running more applications simultaneously but does not address the disk bottleneck.'
          }
        },
        {
          slug: 'os-platforms-basics',
          title: 'Operating Systems: Windows, macOS & Linux',
          minutes: 30,
          objectives: [
            'Navigate and perform common administrative tasks across Windows, macOS and Linux',
            'Recognize key system files, settings panels and configuration tools unique to each platform',
            'Apply platform-specific troubleshooting approaches for common OS-level issues'
          ],
          sections: [
            { heading: 'Windows administrative essentials', body: 'Windows dominates enterprise desktops. Key tools include Event Viewer for system and application logs, Device Manager for hardware status, Task Manager for process and resource monitoring, and the Control Panel or Settings app for system configuration. PowerShell provides command-line administration capability. Knowing how to navigate these tools quickly is essential because most support tickets involve Windows machines.' },
            { heading: 'macOS support fundamentals', body: 'Apple machines require familiarity with System Settings (formerly System Preferences), Activity Monitor, Console for unified logs and Disk Utility for storage management. macOS uses a Unix-based filesystem with key directories like /Library for system-wide settings and ~/Library for user-specific data. Safe Mode boot, NVRAM reset and Recovery Mode are critical troubleshooting steps unique to the Mac platform.' },
            { heading: 'Linux in the support environment', body: 'Linux servers and developer workstations increasingly appear in support queues. The terminal is the primary administration interface: systemctl manages services, journalctl views logs, df and du check disk usage, and ip replaces the older ifconfig for network configuration. Package managers (apt, yum, dnf) handle software installation. Understanding file permissions (chmod, chown) is essential for resolving access issues.' }
          ],
          links: [
            { title: 'Microsoft Learn — Windows Server & Client Administration', url: 'https://learn.microsoft.com/en-us/windows-server/essentials/', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Microsoft Learn path covering Windows desktop and server administration fundamentals for support staff.' },
            { title: 'Apple Support — macOS Troubleshooting', url: 'https://support.apple.com/guide/mac-help/intro-to-macos-mh26612/mac', sourceName: 'Apple Support', resourceType: 'guide', relationship: 'Apple official support documentation for macOS troubleshooting and system recovery procedures.' },
            { title: 'Linux Documentation Project — System Administration', url: 'https://www.tldp.org/LDP/sag/html/index.html', sourceName: 'Linux Documentation', resourceType: 'guide', relationship: 'The Linux System Administrator Guide covering essential Linux administration tasks and best practices.' }
          ],
          quiz: {
            prompt: 'A macOS user cannot install a software update because Disk Utility reports the startup disk is full. After clearing the trash and downloads folder, the disk still has insufficient space. What should you check next?',
            options: [
              'Reinstall macOS entirely to reclaim disk space',
              'Check ~/Library/Caches and ~/Library/Application Support for large cached data from applications',
              'Replace the hard drive immediately since macOS drives cannot be resized',
              'Disable FileVault encryption to recover the used disk space'
            ],
            answerIndex: 1,
            explanation: 'macOS applications often store large amounts of cached data in the user Library folder that are not cleared by emptying the trash. Tools like Storage Management in About This Mac or third-party utilities can identify and remove these large caches without reinstalling the OS.'
          }
        },
        {
          slug: 'networking-fundamentals-for-support',
          title: 'Networking Fundamentals for Support Technicians',
          minutes: 25,
          objectives: [
            'Explain the OSI model layers relevant to everyday troubleshooting tasks',
            'Use command-line tools like ping, traceroute, ipconfig and nslookup to diagnose connectivity issues',
            'Configure and troubleshoot basic wired and wireless network connections'
          ],
          sections: [
            { heading: 'The networking layers you will actually use', body: 'Support technicians do not need to memorize all seven OSI layers, but they must understand the ones relevant to daily tickets. Layer 3 (Network) is where IP addressing lives — when a user cannot connect, check if they have a valid IP. Layer 4 (Transport) handles TCP/UDP ports — when a specific application fails, check if the required port is open. Layer 7 (Application) is where DNS and HTTP sit — when a website does not load, check DNS resolution first.' },
            { heading: 'Command-line diagnostics toolkit', body: 'ping tests basic connectivity to a remote host. traceroute (tracert on Windows) shows every hop between the workstation and the destination, revealing where a connection fails. ipconfig /all (Windows) or ifconfig/ip addr (Linux/Mac) shows the current IP configuration. nslookup or dig tests DNS resolution. These four tools form the core diagnostic toolkit for any network-related support ticket.' },
            { heading: 'Wi-Fi troubleshooting essentials', body: 'Wireless connectivity problems are among the most common support tickets. Start with the basics: is the Wi-Fi adapter enabled, is the user in range, is the correct SSID selected? Check signal strength and channel congestion with a site survey tool. Verify the user is getting an IP address via DHCP. Common fixes include forgetting and re-joining the network, updating Wi-Fi drivers and checking for interference from nearby devices on the 2.4 GHz band.' }
          ],
          links: [
            { title: 'Cisco Networking Academy — Introduction to Networking', url: 'https://www.netacad.com/courses/networking/introduction-networking', sourceName: 'Cisco', resourceType: 'course', relationship: 'Cisco Networking Academy course covering networking fundamentals including the OSI model, IP addressing and basic troubleshooting.' },
            { title: 'CompTIA Network+ Certification Objectives', url: 'https://www.comptia.org/certifications/network', sourceName: 'CompTIA', resourceType: 'certification', relationship: 'CompTIA Network+ certification covering network infrastructure, operations, security and troubleshooting.' },
            { title: 'Microsoft Learn — TCP/IP Fundamentals', url: 'https://learn.microsoft.com/en-us/training/modules/network-fundamentals/', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Microsoft Learn module covering TCP/IP networking fundamentals relevant to Windows support environments.' }
          ],
          quiz: {
            prompt: 'A user reports they cannot access an internal web application. Running ping to the server succeeds, but the browser shows a connection refused error. What is the most likely cause?',
            options: [
              'The network cable is unplugged',
              'The DNS server is not resolving the hostname',
              'The web server is running but the application is not listening on the expected port',
              'The user\'s IP address is on the wrong subnet'
            ],
            answerIndex: 2,
            explanation: 'Ping succeeding means network connectivity and IP routing work correctly. DNS is also working since the hostname resolved. A "connection refused" error specifically means the server received the request but no service is listening on the expected port — the application may be stopped, crashed or misconfigured.'
          }
        }
      ]
    },
    {
      slug: 'ticketing-user-management',
      stage: 'Foundation',
      title: 'Ticketing Systems & User Management',
      description: 'Help desk ticketing workflows, Active Directory and identity management and the structured communication that keeps support operations running smoothly.',
      topics: [
        {
          slug: 'ticketing-system-operations',
          title: 'Help Desk Ticketing System Operations',
          minutes: 25,
          objectives: [
            'Manage the full lifecycle of a support ticket from creation to resolution and closure',
            'Apply proper priority classification, SLA tracking and escalation procedures',
            'Write ticket notes that maintain a clear audit trail for future reference'
          ],
          sections: [
            { heading: 'The ticket lifecycle', body: 'Every ticket follows a predictable path: intake (user submits a request or incident), classification (categorize and set priority), assignment (route to the right technician), investigation (diagnose the issue), resolution (apply the fix) and closure (confirm with the user and document). Following this lifecycle consistently ensures nothing falls through the cracks and SLAs are met.' },
            { heading: 'Priority and SLA management', body: 'Priority is determined by impact (how many users affected) and urgency (how critical is the function). A single user unable to print is low priority. The entire finance department unable to access their ERP system is critical. SLA timers start when the ticket is created: critical incidents may require a 15-minute response, while service requests might have a 24-hour resolution target. Tracking SLA compliance prevents breaches.' },
            { heading: 'Writing effective ticket notes', body: 'Every ticket note should answer: what was reported, what was checked, what was found and what was done. Avoid vague entries like "fixed it." Instead write: "Verified user was connected to wrong Wi-Fi SSID. Disconnected from Guest network, connected to Corporate-SSID. Confirmed user can reach internal applications. Ticket resolved." Good notes save time if the ticket reopens or another technician picks it up.' }
          ],
          links: [
            { title: 'CompTIA IT Fundamentals — Ticketing Best Practices', url: 'https://www.comptia.org/certifications/itf', sourceName: 'CompTIA', resourceType: 'certification', relationship: 'CompTIA ITF+ covering help desk operations, ticketing systems and customer service fundamentals.' },
            { title: 'Microsoft Learn — IT Service Management with Microsoft', url: 'https://learn.microsoft.com/en-us/training/paths/manage-requests-services/', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Microsoft Learn path on IT service management, request fulfillment and incident management processes.' },
            { title: 'Cisco — IT Support Career Path', url: 'https://www.netacad.com/career-certifications', sourceName: 'Cisco', resourceType: 'guide', relationship: 'Cisco career pathway resources covering IT support roles including help desk and service desk operations.' }
          ],
          quiz: {
            prompt: 'A user submits a ticket saying "my computer is broken" with no additional detail. What is the best first response?',
            options: [
              'Mark the ticket as low priority and move on to more detailed tickets',
              'Ask clarifying questions about the specific symptoms, when the issue started and what changed recently',
              'Immediately dispatch a technician to the user\'s desk to inspect the machine',
              'Close the ticket and ask the user to resubmit with more information'
            ],
            answerIndex: 1,
            explanation: 'Gathering specific information up front saves time and prevents unnecessary dispatches. Ask what symptoms they see, when it started, whether anything changed (new software, hardware, updates) and whether it affects specific applications or everything. This information helps diagnose remotely or gives the dispatched technician a head start.'
          }
        },
        {
          slug: 'active-directory-identity',
          title: 'Active Directory & Identity Management',
          minutes: 30,
          objectives: [
            'Perform common Active Directory tasks including account creation, password resets and group membership changes',
            'Understand Group Policy Objects and how they enforce security and configuration across the domain',
            'Troubleshoot authentication failures and account lockouts using AD tools and logs'
          ],
          sections: [
            { heading: 'AD user and group management', body: 'Active Directory is the backbone of identity in most Windows environments. Daily tasks include creating new user accounts (setting username, assigning to organizational units, adding to security groups), resetting passwords, unlocking accounts and managing distribution and security groups. PowerShell cmdlets like New-ADUser, Set-ADAccountPassword and Add-ADGroupMember automate these tasks at scale.' },
            { heading: 'Group Policy fundamentals', body: 'Group Policy Objects (GPOs) are the mechanism that enforces corporate configurations across every domain-joined machine: password policies, software installation, drive mappings, security settings and desktop restrictions. When a user reports that a setting cannot be changed or a drive is missing, GPO is often the cause. Understanding how to check applied GPOs with gpresult and edit them through Group Policy Management Console is essential.' },
            { heading: 'Authentication troubleshooting', body: 'When a user cannot log in, the investigation follows a path: is the account locked out (check AD Users and Computers), is the password expired, is the computer correctly joined to the domain (check trust relationship with Test-ComputerSecureChannel), is the domain controller reachable, and are the DNS settings correct on the workstation. Event Viewer Security logs provide the specific error codes that pinpoint the root cause.' }
          ],
          links: [
            { title: 'Microsoft Learn — Active Directory Domain Services', url: 'https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Microsoft official documentation on Active Directory DS concepts, architecture and management tasks.' },
            { title: 'Microsoft Learn — Group Policy Fundamentals', url: 'https://learn.microsoft.com/en-us/training/modules/implement-group-policy/', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Microsoft Learn module on implementing, managing and troubleshooting Group Policy in Active Directory environments.' },
            { title: 'CompTIA Security+ — Identity and Access Management', url: 'https://www.comptia.org/certifications/security', sourceName: 'CompTIA', resourceType: 'certification', relationship: 'CompTIA Security+ covering identity management, authentication protocols and access control models.' }
          ],
          quiz: {
            prompt: 'A user reports they cannot log in to their workstation this morning. Their account is not locked out, the password is correct and other users on the same subnet can log in fine. What should you check next?',
            options: [
              'Force a password reset even though the password is correct',
              'Check whether the workstation has lost its domain trust relationship by running Test-ComputerSecureChannel',
              'Rebuild the user\'s Windows profile from scratch',
              'Disable and re-enable the user account in Active Directory'
            ],
            answerIndex: 1,
            explanation: 'When the account is fine but a specific machine cannot authenticate, the most common cause is a broken domain trust relationship. The computer account in AD may have become desynchronized. Running Test-ComputerSecureChannel -Repair or resetting the computer account in AD typically resolves this.'
          }
        },
        {
          slug: 'onboarding-offboarding-workflows',
          title: 'User Onboarding & Offboarding Workflows',
          minutes: 25,
          objectives: [
            'Execute a structured onboarding checklist that provisions all necessary accounts, access and equipment for new hires',
            'Perform a complete offboarding process that revokes access and recovers assets immediately upon termination',
            'Automate repetitive onboarding and offboarding tasks using scripts and ticketing workflows'
          ],
          sections: [
            { heading: 'New hire onboarding checklist', body: 'A new hire needs their AD account created and placed in the correct OUs and groups, email account configured, VPN and remote access provisioned, hardware assigned and imaged, software installed per their role, and any role-specific access requests fulfilled. Missing any step creates a Day 1 experience where the employee cannot do their job. A documented, repeatable checklist prevents gaps.' },
            { heading: 'Immediate offboarding', body: 'Offboarding is more urgent than onboarding because a terminated employee with active access is a security risk. Disable the AD account immediately, revoke VPN and remote access, change shared passwords the user knew, recover hardware and revoke badge access. Then schedule mailbox archival, license reclamation and data preservation within 48 hours. The account disable must happen within minutes of receiving the termination notice.' },
            { heading: 'Automation opportunities', body: 'Repetitive onboarding and offboarding steps are ideal for automation. PowerShell scripts can create AD accounts, assign group memberships and configure Exchange mailboxes from a CSV template. Ticketing system automation can trigger provisioning workflows when a new hire ticket is submitted. Automation reduces human error, ensures consistency and frees technicians for higher-value work.' }
          ],
          links: [
            { title: 'Microsoft Learn — Automate User Provisioning', url: 'https://learn.microsoft.com/en-us/azure/active-directory/app-provisioning/', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Microsoft Learn documentation on automated user provisioning and deprovisioning with Azure AD.' },
            { title: 'CompTIA — IT Asset Management', url: 'https://www.comptia.org/content/it-business-asset-management', sourceName: 'CompTIA', resourceType: 'guide', relationship: 'CompTIA guidance on IT asset management including hardware tracking during onboarding and offboarding.' },
            { title: 'Linux Documentation — User Account Management', url: 'https://www.tldp.org/LDP/intro-linux/html/sect_04_02.html', sourceName: 'Linux Documentation', resourceType: 'guide', relationship: 'Linux user account management commands including useradd, usermod and userdel for offboarding Linux systems.' }
          ],
          quiz: {
            prompt: 'An employee was terminated two hours ago but the IT department was not notified until now. The employee\'s AD account is still active and they had VPN access from home. What is the highest priority action?',
            options: [
              'Send the employee an email asking them to return company equipment',
              'Immediately disable the AD account, revoke VPN access and change any shared credentials the employee knew',
              'Wait until tomorrow morning to process the standard offboarding checklist',
              'Only remove the employee\'s email access since the account will be fully removed next week'
            ],
            answerIndex: 1,
            explanation: 'A terminated employee with active remote access represents an immediate security risk. The account must be disabled and all remote access revoked within minutes. Any shared passwords or API keys the employee had access to must also be rotated immediately to prevent unauthorized access or data exfiltration.'
          }
        }
      ]
    },
    {
      slug: 'remote-support-troubleshooting',
      stage: 'Intermediate',
      title: 'Remote Support & Troubleshooting',
      description: 'Remote access tools and techniques, systematic troubleshooting methodology and support for printers, peripherals and common application issues.',
      topics: [
        {
          slug: 'remote-access-tools',
          title: 'Remote Access & Remote Support Tools',
          minutes: 30,
          objectives: [
            'Configure and use remote desktop tools including RDP, SSH and commercial remote support platforms',
            'Troubleshoot common remote connectivity issues including firewall blocks and certificate problems',
            'Maintain security best practices when enabling remote access to internal systems'
          ],
          sections: [
            { heading: 'Remote desktop and screen sharing', body: 'Microsoft Remote Desktop Protocol (RDP) lets technicians control Windows machines remotely over port 3389. SSH provides command-line remote access to Linux and macOS systems. Commercial tools like TeamViewer, AnyDesk or built-in solutions like Windows Quick Assist enable support for users outside the corporate network. Each tool has different authentication requirements, firewall implications and logging capabilities.' },
            { heading: 'Troubleshooting remote connection failures', body: 'When a remote connection fails, check the basics first: is the target machine powered on and awake, is RDP/SSH enabled, are the correct ports open on the local firewall, and is the machine reachable over the network (ping it). Certificate errors in RDP usually mean the machine identity has changed — delete the old RDP cache entry and reconnect. VPN tunnels must be established before remote desktop connections to internal machines.' },
            { heading: 'Remote support security practices', body: 'Every remote access channel is a potential attack vector. Use network-level authentication (NLA) for RDP to authenticate before establishing a full session. Limit remote access to specific technician accounts rather than giving all IT staff permanent admin access. Enable session recording for audit compliance. Disable direct RDP exposure to the internet and route all remote access through a VPN or jump server.' }
          ],
          links: [
            { title: 'Microsoft Learn — Remote Desktop Services', url: 'https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/remote-desktop-services-overview', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Microsoft documentation on Remote Desktop Services configuration, deployment and administration.' },
            { title: 'Apple Support — Screen Sharing and Remote Management', url: 'https://support.apple.com/guide/mac-help/use-remote-management-on-mac-mh14208/mac', sourceName: 'Apple Support', resourceType: 'guide', relationship: 'Apple support guide on enabling and using remote management and screen sharing on macOS for support technicians.' },
            { title: 'Linux Documentation — SSH Configuration Guide', url: 'https://www.tldp.org/HOWTO/mini/SSH/', sourceName: 'Linux Documentation', resourceType: 'guide', relationship: 'Linux SSH mini-HOWTO covering SSH server configuration, key-based authentication and secure remote access.' }
          ],
          quiz: {
            prompt: 'A technician tries to connect to a remote Windows machine via RDP but receives an error saying the computer certificate has changed. What is the correct resolution?',
            options: [
              'Reinstall Windows on the remote machine to generate a new certificate',
              'Delete the cached RDP connection entry from the technician\'s machine and reconnect to accept the new certificate',
              'Disable certificate verification in RDP settings permanently to avoid this issue',
              'Report the certificate change as a security incident and disconnect the machine from the network'
            ],
            answerIndex: 1,
            explanation: 'RDP caches server certificates to detect man-in-the-middle attacks. When the remote machine gets a new certificate (after a Windows update, re-image or certificate renewal), the cached entry conflicts. Deleting the old entry from the RDP connection manager and reconnecting accepts the new certificate legitimately.'
          }
        },
        {
          slug: 'systematic-troubleshooting',
          title: 'Systematic Troubleshooting Methodology',
          minutes: 30,
          objectives: [
            'Apply a structured troubleshooting approach from problem identification through resolution and verification',
            'Use the process of elimination to narrow down root causes efficiently',
            'Document troubleshooting steps and resolutions to build a knowledge base for the team'
          ],
          sections: [
            { heading: 'The structured troubleshooting process', body: 'Effective troubleshooting follows a consistent methodology: identify the problem (what exactly is happening, when did it start, what changed), establish a theory of probable cause (start with the most common causes), test the theory (try the simplest fix first), establish a plan of action (what steps are needed to resolve and verify), implement the solution, verify full functionality and document the findings. Skipping steps leads to missed root causes and repeat tickets.' },
            { heading: 'Process of elimination in practice', body: 'When a user reports "the internet is down," do not immediately blame the ISP. First check: is their Wi-Fi connected, do they have an IP address, can they ping the gateway, can they reach external IPs, can they resolve DNS names. Each test eliminates one possible cause. If they can ping IPs but not resolve names, the issue is DNS, not connectivity. If they have no IP address, the issue is DHCP. This systematic approach prevents wasting time on incorrect assumptions.' },
            { heading: 'Building a knowledge base from tickets', body: 'Every resolved ticket is a potential knowledge base article. When you solve a problem you have not seen before, write a brief article: symptoms, diagnosis steps and resolution. Over time this becomes an invaluable resource — the next technician who encounters the same issue can resolve it in minutes instead of hours. Aim to document solutions for issues that take more than 30 minutes to resolve or that you have seen more than once.' }
          ],
          links: [
            { title: 'CompTIA — Troubleshooting Methodology', url: 'https://www.comptia.org/certifications/a', sourceName: 'CompTIA', resourceType: 'certification', relationship: 'CompTIA A+ certification covering the six-step troubleshooting methodology for hardware and software issues.' },
            { title: 'Microsoft Learn — Windows Troubleshooting Tools', url: 'https://learn.microsoft.com/en-us/troubleshoot/windows-client/', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Microsoft official troubleshooting documentation for Windows desktop issues including system, networking and application problems.' },
            { title: 'Linux Documentation — Troubleshooting Guide', url: 'https://www.tldp.org/LDP/sag/html/troubleshooting.html', sourceName: 'Linux Documentation', resourceType: 'guide', relationship: 'Linux System Administration Guide section on troubleshooting methodology for Linux systems.' }
          ],
          quiz: {
            prompt: 'A user reports that Microsoft Outlook cannot connect to the Exchange server. Other users in the same office can access Outlook normally. What should you check first?',
            options: [
              'Restart the Exchange server since it may have crashed',
              'Check whether the affected user\'s workstation can reach the Exchange server (network connectivity, DNS resolution)',
              'Reinstall Outlook on the user\'s machine immediately',
              'Reset the user\'s password to force an Exchange session refresh'
            ],
            answerIndex: 1,
            explanation: 'Since other users in the same office can connect, the Exchange server is likely functioning. The problem is specific to this user\'s workstation. Start by verifying basic connectivity: can the machine reach the Exchange server by IP, does DNS resolve the Exchange hostname correctly, and does the Outlook Autodiscover URL work. Narrow down the scope before making changes.'
          }
        },
        {
          slug: 'peripheral-printer-support',
          title: 'Printer, Peripheral & Application Support',
          minutes: 25,
          objectives: [
            'Diagnose and resolve common printer issues including connectivity, driver and queue problems',
            'Configure and troubleshoot peripheral devices including monitors, docking stations and USB devices',
            'Resolve common office application issues including activation failures and profile corruption'
          ],
          sections: [
            { heading: 'Printer troubleshooting workflow', body: 'Printers generate a disproportionate number of support tickets. Follow a structured flow: check the physical connection (network or USB), verify the correct driver is installed, check the print queue for stuck jobs (clear and restart the spooler service), verify the user has permissions on the print server and test with a different document or application. Network printers need a valid IP address on the correct subnet and may need to be re-added if the IP changes.' },
            { heading: 'Peripheral and docking station support', body: 'Docking stations and USB-C hubs introduce multiple failure points: the dock itself, the USB connection, the driver, the power delivery and the display output. When a dock stops working, test the dock on a known-good machine, update dock firmware and drivers, check Windows Device Manager for the dock in the USB controllers list, and verify power delivery is active. Dual-monitor issues often relate to display driver settings rather than hardware failure.' },
            { heading: 'Office application troubleshooting', body: 'Microsoft Office activation failures usually stem from expired licenses, expired password cache tokens or corrupted Office click-to-run cache. Run the Microsoft Support and Recovery Assistant as a first step. Outlook profile corruption is resolved by recreating the profile. Excel crashes often indicate corrupted add-ins — start Excel in safe mode to test. For all application issues, check whether the problem started after an Office update and whether rolling back the update resolves it.' }
          ],
          links: [
            { title: 'Microsoft Learn — Print Management', url: 'https://learn.microsoft.com/en-us/windows-server/print/print-management/overview', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Microsoft documentation on Windows Print Management for deploying, managing and troubleshooting network printers.' },
            { title: 'Apple Support — macOS Printer Troubleshooting', url: 'https://support.apple.com/en-us/102029', sourceName: 'Apple Support', resourceType: 'guide', relationship: 'Apple support article on resolving printer connection and printing issues on macOS.' },
            { title: 'CompTIA — Peripheral Device Support', url: 'https://www.comptia.org/certifications/a', sourceName: 'CompTIA', resourceType: 'certification', relationship: 'CompTIA A+ covering printer, display, storage and peripheral troubleshooting techniques.' }
          ],
          quiz: {
            prompt: 'A user reports their printer shows as offline in Windows even though it has power and is connected to the network. Other users can print to the same printer. What is the most likely cause and first fix?',
            options: [
              'The printer needs new toner cartridges',
              'The user\'s computer has a stale printer connection — remove and re-add the printer to refresh the port configuration',
              'The print spooler service on the print server is crashed and needs restarting',
              'The network switch port is faulty and needs to be replaced'
            ],
            answerIndex: 1,
            explanation: 'Since other users can print, the printer and network are functioning. The issue is specific to this workstation\'s connection to the printer. The printer port may have cached an old IP or the connection state may be stale. Removing and re-adding the printer refreshes the port configuration and typically resolves the issue immediately.'
          }
        }
      ]
    },
    {
      slug: 'advanced-administration-experience',
      stage: 'Advanced',
      title: 'Advanced Administration & End-User Experience',
      description: 'Security hardening, endpoint monitoring and scripting automation for support teams that want to prevent issues rather than just fix them.',
      topics: [
        {
          slug: 'security-hardening-basics',
          title: 'Endpoint Security Hardening for Support Teams',
          minutes: 30,
          objectives: [
            'Apply Windows security baseline configurations including firewall rules, BitLocker and Windows Defender settings',
            'Configure endpoint protection platforms and verify they are operational across managed devices',
            'Identify common social engineering tactics and guide users toward secure behavior'
          ],
          sections: [
            { heading: 'Windows security baseline essentials', body: 'Every managed workstation should have Windows Firewall enabled with a restrictive inbound policy, BitLocker drive encryption enabled to protect data at rest, Windows Defender running with real-time protection and automatic updates, Windows Update configured for automatic installation of critical patches, and local administrator accounts disabled or renamed. These baseline controls prevent the majority of common attacks without impacting user productivity.' },
            { heading: 'Endpoint protection verification', body: 'Antivirus and EDR agents must be verified as operational, not just installed. Check that real-time protection is active, definitions are current within 24 hours, the agent is communicating with its management console and no exclusions have been added that create blind spots. Use the management console to generate a compliance report rather than spot-checking individual machines. Non-compliant endpoints should generate automated alerts.' },
            { heading: 'User security awareness in support', body: 'Support technicians interact with users daily and are uniquely positioned to catch social engineering. When a user calls asking you to reset a password after clicking a link in an email, that is a phishing attempt. When a user asks you to install unauthorized software because a "vendor" told them to, verify with the vendor first. Treat every unusual request as a potential social engineering attempt and validate through official channels before taking action.' }
          ],
          links: [
            { title: 'Microsoft Learn — Windows Security Baselines', url: 'https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/windows-security-baselines', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Microsoft documentation on Windows security baselines including firewall, BitLocker and Defender configurations.' },
            { title: 'CompTIA Security+ — Security Controls', url: 'https://www.comptia.org/certifications/security', sourceName: 'CompTIA', resourceType: 'certification', relationship: 'CompTIA Security+ covering endpoint security controls, hardening techniques and social engineering awareness.' },
            { title: 'Cisco — Network Security Fundamentals', url: 'https://www.netacad.com/courses/networking/introduction-networking', sourceName: 'Cisco', resourceType: 'course', relationship: 'Cisco Networking Academy covering network and endpoint security fundamentals relevant to IT support.' }
          ],
          quiz: {
            prompt: 'A user calls saying they received an email from "IT Support" asking them to verify their password by clicking a link. The user clicked the link and entered their credentials. What is the correct immediate response?',
            options: [
              'Tell the user to change their password the next time they think about it',
              'Immediately reset the user\'s password, disable the account temporarily and report the phishing email to the security team',
              'Ignore it since the user probably did not enter the correct information',
              'Block the sender\'s email address and ask the user to delete the email'
            ],
            answerIndex: 1,
            explanation: 'The user has likely given their credentials to an attacker. Immediate actions include resetting the password (since the attacker now knows it), temporarily disabling the account to prevent unauthorized use and escalating to the security team who can check for any activity using those credentials and send a company-wide phishing alert.'
          }
        },
        {
          slug: 'monitoring-asset-management',
          title: 'Endpoint Monitoring & IT Asset Management',
          minutes: 25,
          objectives: [
            'Use remote monitoring tools to track endpoint health, disk usage and software deployment status',
            'Maintain an accurate IT asset inventory including hardware, software licenses and warranty information',
            'Proactively identify and resolve issues before they generate support tickets'
          ],
          sections: [
            { heading: 'Remote monitoring fundamentals', body: 'Tools like Microsoft Intune, SCCM, ConnectWise or Lansweeper let support teams monitor endpoint health across the entire fleet. Key metrics to track include disk space utilization (alert at 85%), memory usage patterns, pending Windows updates, antivirus definition age and hardware performance indicators. A proactive monitoring dashboard surfaces problems before users notice them, transforming the support model from reactive to preventive.' },
            { heading: 'IT asset inventory management', body: 'Every piece of hardware and software the organization owns must be tracked: serial numbers, purchase dates, warranty expiration dates, assigned user, physical location and license keys. When a laptop fails, knowing it is under warranty saves the company from buying a replacement. When a software audit occurs, having accurate license records prevents costly penalties. Asset management tools integrate with ticketing systems to auto-populate hardware details when a user opens a ticket.' },
            { heading: 'Proactive issue prevention', body: 'Monitoring data reveals patterns that predict future problems. If a workstation\'s hard drive SMART data shows increasing reallocated sectors, the drive is failing and should be replaced before data loss occurs. If a user has been consistently running out of RAM during business hours, a memory upgrade is overdue. If a batch of laptops from the same purchase order are all showing similar failures, there may be a manufacturing defect covered under warranty.' }
          ],
          links: [
            { title: 'Microsoft Learn — Microsoft Intune Overview', url: 'https://learn.microsoft.com/en-us/mem/intune/fundamentals/what-is-intune', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Microsoft documentation on Intune endpoint management, monitoring and compliance for IT support teams.' },
            { title: 'CompTIA — IT Asset Management Best Practices', url: 'https://www.comptia.org/content/it-business-asset-management', sourceName: 'CompTIA', resourceType: 'guide', relationship: 'CompTIA guidance on building and maintaining IT asset management programs including hardware and software tracking.' },
            { title: 'Linux Documentation — System Monitoring', url: 'https://www.tldp.org/HOWTO/Monitoring-Tools-HOWTO.html', sourceName: 'Linux Documentation', resourceType: 'guide', relationship: 'Linux Monitoring Tools HOWTO covering performance monitoring and proactive system health management.' }
          ],
          quiz: {
            prompt: 'Your monitoring dashboard alerts you that 15 workstations in the Accounting department are all showing disk usage above 90% simultaneously. What is the most likely cause and your response?',
            options: [
              'The users are all downloading large files — block internet access for the department',
              'A shared application or update is writing data to the same location on each machine — investigate the common application and its data storage behavior',
              'The hard drives are all failing at the same time — replace all 15 machines immediately',
              'The monitoring tool is malfunctioning — ignore the alert and reboot the dashboard server'
            ],
            answerIndex: 1,
            explanation: 'Fifteen machines in the same department hitting the same threshold at the same time points to a shared cause, not individual drive failures. Investigate what the department has in common: a specific application, a recent software deployment, a workflow that generates large temporary files or a backup process writing to local disk instead of network storage.'
          }
        },
        {
          slug: 'scripting-automation-support',
          title: 'Scripting & Automation for Support Teams',
          minutes: 25,
          objectives: [
            'Write PowerShell scripts to automate repetitive support tasks like bulk user operations and system checks',
            'Create automated diagnostic scripts that gather system information for faster ticket resolution',
            'Evaluate which support tasks are best suited for automation versus manual handling'
          ],
          sections: [
            { heading: 'PowerShell for everyday support tasks', body: 'PowerShell transforms repetitive manual tasks into one-command operations. Reset 50 user passwords from a CSV file, pull a report of all disabled accounts, check disk space across 200 machines, or create 30 new user accounts with correct group memberships — all in a single script. Start with simple one-liners in the console, then build them into saved scripts as you gain confidence. The ActiveDirectory and ExchangeOnline PowerShell modules are indispensable for support automation.' },
            { heading: 'Automated diagnostic collection', body: 'When a user reports an issue, the first step is always collecting system information: OS version, installed updates, disk space, running services, network configuration and recent event log entries. A diagnostic script that collects all of this into a single report file saves 15-20 minutes per ticket. Package it as a script the user can double-click to run, producing a text file they attach to their ticket. This gives the technician a complete picture before they even start troubleshooting.' },
            { heading: 'Knowing when not to automate', body: 'Automation is powerful but not always appropriate. Tasks involving individual user data, unique hardware configurations or judgment calls about security are better handled manually with careful attention. Automate repetitive, rule-based tasks with consistent inputs and outputs. Do not automate tasks that require human assessment of context, sensitivity or user emotion. A good rule: if you would do the exact same steps 50 times, automate it. If every instance requires different judgment, keep it manual.' }
          ],
          links: [
            { title: 'Microsoft Learn — PowerShell for IT Pros', url: 'https://learn.microsoft.com/en-us/powershell/scripting/learn/ps101/00-introduction', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Microsoft PowerShell 101 learning path covering scripting fundamentals for IT administration and support tasks.' },
            { title: 'Linux Documentation — Shell Scripting Guide', url: 'https://www.tldp.org/LDP/abs/html/', sourceName: 'Linux Documentation', resourceType: 'guide', relationship: 'Advanced Bash-Scripting Guide covering shell scripting for Linux system administration and automation.' },
            { title: 'CompTIA — Automation in IT Operations', url: 'https://www.comptia.org/certifications/a', sourceName: 'CompTIA', resourceType: 'certification', relationship: 'CompTIA A+ covering scripting and automation techniques for streamlining IT support operations.' }
          ],
          quiz: {
            prompt: 'You have been manually creating new user accounts for 20 new hires each Monday morning, each taking about 10 minutes. After creating a PowerShell script that automates the process from a CSV file, the task takes 2 minutes. What should you do with the saved time?',
            options: [
              'Leave early since the work is done faster',
              'Use the reclaimed time for proactive monitoring, knowledge base documentation and ticket backlog reduction',
              'Create more scripts to automate additional tasks until all support work is automated',
              'Report the time savings to management so they can reduce the support team size'
            ],
            answerIndex: 1,
            explanation: 'Automation should free up technician time for higher-value proactive work. Use the reclaimed minutes for monitoring dashboards, building knowledge base articles, reducing ticket backlogs or addressing security hygiene tasks. The goal of automation is to shift from reactive firefighting to proactive problem prevention.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'IT Support Specialist Ticket Resolution & Escalation',
    coverage: [
      'Hardware Diagnostics & OS Troubleshooting',
      'Network Connectivity Issue Resolution',
      'Active Directory & User Management',
      'Remote Support & Communication',
      'Security Awareness & Documentation'
    ],
    brief:
      'You are the sole IT support technician at TechBridge Support Solutions on a busy Monday morning. Multiple tickets have arrived overnight and during the morning rush. Triage each ticket, apply the appropriate troubleshooting methodology, resolve what you can, escalate what you cannot, and provide clear documentation throughout. The tickets range from a hardware failure to a potential security incident that requires careful handling.',
    requirements: [
      'Triage at least 8 tickets by priority, resolving low and medium issues directly and escalating high-priority or security-related tickets with full context',
      'Demonstrate hardware diagnostic steps for at least one physical device issue including POST interpretation and component identification',
      'Resolve a network connectivity issue using command-line diagnostic tools with documented evidence at each step',
      'Complete an Active Directory task (account creation, password reset or group change) with proper verification',
      'Handle a remote support session demonstrating secure connection practices and clear user communication',
      'Identify and appropriately respond to at least one social engineering or security-related scenario',
      'Document all troubleshooting steps and resolutions in ticket notes that another technician could follow'
    ],
    expectedOutput:
      'A complete support shift package: prioritized ticket log with disposition for each, evidence-based troubleshooting for network and hardware issues, AD task completion, remote support session notes, security incident response and well-documented ticket notes throughout.',
    rubric: [
      { skill: 'Ticket Triage & Prioritization', weight: 15, criteria: 'Correctly identifies ticket priority based on impact and urgency, follows proper escalation paths' },
      { skill: 'Hardware Diagnostics', weight: 15, criteria: 'Systematically diagnoses hardware issues using POST codes, visual inspection and component testing' },
      { skill: 'Network Troubleshooting', weight: 20, criteria: 'Uses command-line tools methodically to isolate and resolve connectivity issues with documented evidence' },
      { skill: 'Active Directory Management', weight: 15, criteria: 'Performs AD tasks accurately with proper verification steps and follows least-privilege principles' },
      { skill: 'Communication & Documentation', weight: 20, criteria: 'Writes clear ticket notes, communicates effectively with users and escalates with complete context' },
      { skill: 'Security Awareness', weight: 15, criteria: 'Identifies security concerns, follows security protocols and responds appropriately to social engineering attempts' }
    ],
    passScore: 72
  },

  assignments: [
    {
      title: 'Multi-Platform Troubleshooting Guide',
      stage: 'Beginner',
      objective: 'Create a comprehensive troubleshooting reference guide covering the 15 most common support issues across Windows, macOS and Linux, with platform-specific resolution steps for each.',
      requirements: [
        'Identify the 15 most frequent support ticket categories from a typical help desk environment',
        'For each issue, write platform-specific resolution steps for Windows, macOS and Linux where applicable',
        'Include diagnostic commands or tools unique to each operating system',
        'Add estimated resolution times and escalation criteria for each issue type',
        'Test at least five of the troubleshooting procedures on actual machines to verify accuracy'
      ],
      skillsEvaluated: ['OS Knowledge', 'Troubleshooting Methodology', 'Technical Writing', 'Cross-Platform Awareness'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the troubleshooting guide organized by issue category, with platform-specific columns for Windows, macOS and Linux resolution steps.',
        textLabel: 'Multi-platform troubleshooting reference guide',
        minTextLength: 1500,
        linkLabels: ['Test evidence or screenshots from procedure verification']
      }
    },
    {
      title: 'Onboarding Automation Project',
      stage: 'Foundation',
      objective: 'Design and implement an automated onboarding workflow using PowerShell that provisions a new user account from a CSV template, including all necessary AD configuration, email setup and access provisioning.',
      requirements: [
        'Design a CSV template that captures all required new-hire information (name, department, role, manager, start date)',
        'Write a PowerShell script that reads the CSV and creates AD accounts with correct OU placement and group memberships',
        'Include Exchange Online mailbox provisioning or Office 365 license assignment in the automation',
        'Add error handling that logs failed provisioning steps for manual review',
        'Test the script with a sample dataset of five users and document the results'
      ],
      skillsEvaluated: ['PowerShell Scripting', 'Active Directory', 'Automation Design', 'Error Handling'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the PowerShell script, CSV template, test results with five sample users, and a brief report on the automation design decisions and error handling approach.',
        textLabel: 'Onboarding automation script and test report',
        minTextLength: 1200,
        linkLabels: ['PowerShell script file', 'CSV template', 'Test run output log']
      }
    },
    {
      title: 'IT Support Knowledge Base Article Collection',
      stage: 'Advanced',
      objective: 'Research and write five production-quality knowledge base articles based on real-world IT support scenarios, each targeting a different technical domain and suitable for use by both end-users and junior technicians.',
      requirements: [
        'Write one article per domain: hardware troubleshooting, network connectivity, Active Directory, printer/peripheral support and security awareness',
        'Each article must include: symptoms description, step-by-step resolution, required tools or access and escalation criteria',
        'Include screenshots or diagrams illustrating key steps where applicable',
        'Write one article aimed at end-users (self-service instructions) and four aimed at support technicians (detailed technical procedures)',
        'Follow a consistent template and formatting standard across all five articles'
      ],
      skillsEvaluated: ['Technical Writing', 'Knowledge Management', 'Multi-Domain Expertise', 'User Communication'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the five knowledge base articles following a consistent template, with a brief introduction explaining your template design choices and how the articles fit into a support knowledge management strategy.',
        textLabel: 'Knowledge base article collection with template rationale',
        minTextLength: 2000,
        linkLabels: ['Five knowledge base article files', 'Template document']
      }
    }
  ],

  simTasks: [
    {
      title: 'Monday morning ticket storm',
      context: 'It is 8:30 AM Monday and you are the only IT support technician in the office. Six tickets are waiting: a manager cannot log in to their laptop, the finance printer is jammed and showing an error, three new hires start at 9 AM with no accounts created, the CFO reports a suspicious email asking for credentials, the CEO\'s docking station stopped working over the weekend, and the Wi-Fi in the conference room has been down since Friday.',
      requirements: [
        'Triage all six tickets by priority and decide which to handle first based on impact and urgency',
        'Identify the CFO\'s suspicious email as a potential security incident and follow the appropriate incident response procedure',
        'Create three new AD accounts with correct group memberships before the new hires arrive at 9 AM',
        'Resolve the manager\'s login issue using systematic troubleshooting methodology',
        'Address the remaining hardware and connectivity issues using available diagnostic tools',
        'Document all actions taken in each ticket with clear, followable notes'
      ],
      priority: 'high',
      dueDayOffset: 1,
      expectedOutput: 'Prioritized ticket resolution log with actions for each issue, the security incident escalation for the phishing email, three provisioned AD accounts and detailed ticket notes for all six issues.',
      skills: ['Ticket Triage', 'AD User Management', 'Security Incident Response', 'Time Management', 'Documentation']
    },
    {
      title: 'Remote support for a field office',
      context: 'A field office with 12 employees has lost all network connectivity. You are 200 miles away and must provide remote support. The field office has a VPN appliance, a managed switch and a wireless access point. The office administrator is your only hands on site and has basic technical ability but is not IT staff.',
      requirements: [
        'Establish a VPN connection to the field office network remotely to verify whether the site is reachable',
        'Guide the on-site administrator through basic diagnostic steps on the network equipment via phone',
        'Identify whether the issue is with the ISP connection, the VPN appliance, the switch or the wireless access point',
        'Resolve the connectivity issue or document the escalation path to the ISP if the problem is external',
        'Verify that all 12 users can reconnect and access necessary applications once connectivity is restored',
        'Provide the administrator with a basic network equipment checklist they can use for future quick checks'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Remote diagnostic log showing connectivity checks, step-by-step guidance provided to the on-site administrator, root cause identification, resolution steps and a basic network equipment quick-check guide.',
      skills: ['Remote Support', 'Network Troubleshooting', 'Non-Technical Communication', 'Vendor Escalation', 'Documentation']
    },
    {
      title: 'Quarterly security audit preparation',
      context: 'Your IT manager has asked you to prepare for an upcoming internal security audit in two weeks. The audit will review endpoint compliance, AD configurations, access controls and user security awareness. You need to audit the current state, remediate any gaps and produce a compliance report for the auditor.',
      requirements: [
        'Audit the entire fleet of 85 workstations for compliance with security baselines (firewall, antivirus, BitLocker, updates)',
        'Review Active Directory for stale accounts, accounts with non-expiring passwords and excessive admin group memberships',
        'Verify that all user accounts follow the principle of least privilege with no unnecessary group memberships',
        'Produce a compliance report showing current compliance percentage, identified gaps and remediation actions taken',
        'Present a prioritized remediation plan for any gaps that cannot be resolved before the audit date'
      ],
      priority: 'normal',
      dueDayOffset: 7,
      expectedOutput: 'Full security audit preparation package: fleet compliance report, AD access review with findings, remediation log of actions taken, compliance percentage dashboard and prioritized gap remediation plan.',
      skills: ['Security Hardening', 'AD Administration', 'Compliance Reporting', 'Audit Preparation', 'Risk Assessment']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Derek Huang',
      personaRole: 'IT Manager, TechBridge Support Solutions',
      situation: 'The IT manager wants to understand why a specific ticket was resolved in four hours when the SLA allows 24 hours, to use it as a model for the team.',
      openingMessage:
        'Ticket #1847 was resolved in four hours but the SLA window was 24 hours. Walk me through what you did differently so we can replicate this efficiency on similar tickets.',
      expectedPoints: [
        'Explains the systematic approach taken from intake to resolution',
        'Identifies specific time-saving steps like checking known-good solutions from the knowledge base',
        'Describes the diagnostic methodology that narrowed the issue quickly',
        'Suggests how to document this as a reusable procedure for the rest of the support team'
      ]
    },
    {
      kind: 'team',
      personaName: 'Rachel Torres',
      personaRole: 'Junior IT Support Technician',
      situation: 'The junior technician is stuck on a ticket and needs guidance on how to approach a problem they have never encountered before.',
      openingMessage:
        'I have been working on ticket #1923 for an hour and I am not making progress. The user says their Outlook keeps crashing every time they open a specific email. I have tried restarting and repairing Office but nothing works. Can you walk me through how you would approach this?',
      expectedPoints: [
        'Guides the junior technician through a structured troubleshooting approach rather than giving the answer directly',
        'Suggests checking Outlook add-ins in safe mode as a diagnostic step',
        'Explains the importance of isolating whether the issue is with the email content, the user profile or the application itself',
        'Encourages the junior technician to document the solution for the knowledge base once resolved'
      ]
    },
    {
      kind: 'client',
      personaName: 'Karen Whitfield',
      personaRole: 'Office Manager, BrightHorizon Accounting',
      situation: 'The client\'s office has experienced repeated printer failures and they are frustrated with the downtime impacting their accounting workflows during tax season.',
      openingMessage:
        'This is the third time this month that our main accounting printer has gone down and we are in the middle of tax season. We cannot afford this downtime. What are you going to do differently this time?',
      expectedPoints: [
        'Acknowledges the frustration and the business impact without making excuses',
        'Explains the root cause analysis approach being taken to prevent recurrence rather than just fixing the symptom',
        'Proposes concrete preventive measures such as proactive monitoring, scheduled maintenance or hardware replacement',
        'Sets clear expectations on resolution timeline and follow-up communication'
      ]
    },
    {
      kind: 'client',
      personaName: 'James Okonkwo',
      personaRole: 'CEO, Meridian Consulting Group',
      situation: 'The CEO is not technical and wants to understand why the company is investing in IT security measures that seem like they slow down employees.',
      openingMessage:
        'My team keeps complaining that the new security requirements make their work harder. Passwords, VPN, multi-factor authentication — it all feels like bureaucracy. Why do we need all of this?',
      expectedPoints: [
        'Explains security measures in terms of business risk and client data protection, not technical jargon',
        'Provides a real-world analogy that makes the security requirements relatable to a non-technical audience',
        'Describes the balance between security and usability and what happens if those controls are removed',
        'Offers practical suggestions for reducing the perceived burden while maintaining security (SSO, password managers, user training)'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'After a Windows update over the weekend, 40% of the company\'s workstations are experiencing blue screen errors on boot. The remaining machines are unaffected. The update was pushed through the standard Windows Update process without prior testing in the support lab.',
      requiredActions: [
        { action: 'Identify the specific Windows update causing the issue by comparing update history on working versus affected machines', good: true, note: 'Comparing the update lists on working and failing machines isolates the problematic update precisely.' },
        { action: 'Initiate a Windows rollback on affected machines using the Windows Recovery Environment to restore functionality immediately', good: true, note: 'Rolling back the update gets employees back to work quickly while root cause analysis continues in the background.' },
        { action: 'Block the problematic update in WSUS or Group Policy to prevent it from being reinstalled automatically', good: true, note: 'Without blocking the update, affected machines will attempt to reinstall it on the next update cycle, causing the same failure.' },
        { action: 'Wait for Microsoft to release a fix for the update rather than rolling back, since the update passed Microsoft\'s quality checks', good: false, note: 'Waiting for an external fix leaves 40% of machines unusable with no timeline. Taking immediate action to restore functionality while investigating is the correct approach.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'The company is transitioning from on-premises Active Directory to Azure AD (Entra ID) hybrid join for all 200 workstations over the next 90 days. The support team needs to prepare for managing devices in both environments during the transition period.',
      requiredActions: [
        { action: 'Audit the current AD environment to document all user accounts, group policies, service accounts and device objects that need to migrate', good: true, note: 'You cannot plan a migration without a complete inventory of what exists in the current environment.' },
        { action: 'Create a phased migration plan that moves departments in waves, starting with a low-risk department to validate the process', good: true, note: 'A phased approach lets the team learn from early waves and fix issues before they affect the entire organization.' },
        { action: 'Update support procedures and documentation to account for both on-premises and cloud identity management during the transition', good: true, note: 'Support technicians need to know how to handle tickets in both environments until migration is complete.' },
        { action: 'Migrate all 200 workstations simultaneously on a single weekend to minimize the transition period', good: false, note: 'A big-bang migration of all devices at once creates an unmanageable support burden and makes rollback impossible if something goes wrong.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'A user reports that their Windows machine is running extremely slowly. Walk through your diagnostic process from the moment you sit down at their desk.',
      guidancePoints: [
        'Start with Task Manager to check CPU, memory, disk and network utilization for abnormal processes',
        'Check Event Viewer for system and application errors that may indicate failing hardware or software conflicts',
        'Verify disk health using SMART data and check for disk space issues',
        'Review startup programs and background services that may be consuming resources',
        'Compare the machine\'s performance against baseline expectations for its hardware configuration'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between a domain-joined computer and a workgroup computer. What are the practical implications for support?',
      guidancePoints: [
        'Domain-joined computers authenticate against Active Directory and are centrally managed through Group Policy',
        'Workgroup computers rely on local accounts and have no centralized management or policy enforcement',
        'Domain environments allow centralized software deployment, security policy enforcement and single sign-on',
          'Support on domain machines includes remote administration, centralized patch management and automated account provisioning',
        'Workgroup machines require per-device configuration and are harder to manage at scale'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Two users in the same department report they cannot access a shared network drive, but users in other departments can. How do you troubleshoot this?',
      guidancePoints: [
        'Check whether the two users share something in common: same OU, same group memberships, same physical network segment',
        'Verify the share permissions versus NTFS permissions — the users may lack access at one layer even if granted at the other',
        'Check whether a recent Group Policy change affected the specific OU or security group the two users belong to',
        'Test with a known-working user\'s credentials on one of the affected machines to isolate whether it is an account or machine issue',
        'Check DNS resolution of the file server from the affected machines to rule out name resolution problems'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A user insists their computer is "haunted" because applications open on their own and files appear on their desktop overnight. How do you approach this investigation?',
      guidancePoints: [
        'Take the report seriously and investigate systematically — do not dismiss it as user error without evidence',
        'Check for unauthorized remote access software, shared account usage or scheduled tasks that may explain the activity',
        'Review login event logs to determine if someone else is accessing the machine outside business hours',
        'Check for multi-user confusion — verify whether the user shares credentials or has a roaming profile applied to the wrong machine',
        'If no benign explanation is found, treat it as a potential security incident and escalate following the incident response process'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'You discover that a department has been sharing a single admin account to bypass access restrictions on a financial application. How do you handle this?',
      guidancePoints: [
        'Understand the root cause — the users likely shared the account because the proper access request process is too slow or they were not aware of it',
        'Document the security risk: shared credentials eliminate accountability, violate the principle of least privilege and create audit failures',
        'Disable the shared account and work with the department to provision individual accounts with appropriate permissions',
        'Implement a faster access request process or provide training on how to request access through proper channels',
        'Report the finding to IT management and security to determine if additional controls or policy changes are needed'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'A VP demands that you bypass the standard security procedures to give them immediate access to a system they were not authorized to use. How do you respond?',
      guidancePoints: [
        'Politely explain that security procedures exist to protect the organization and that bypassing them creates risk for everyone',
        'Offer to expedite the proper access request process by contacting the system owner and security team directly',
        'Document the request and your response regardless of the outcome to create an audit trail',
        'If the VP insists, escalate to your IT manager or security team rather than complying or refusing outright',
        'Never share credentials, create unauthorized accounts or bypass security controls regardless of who is asking'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain to a non-technical executive why the company needs to replace 50 five-year-old laptops that still "work fine."',
      guidancePoints: [
        'Translate the business impact: older machines run slower, increasing per-employee productivity losses over time',
        'Highlight security risks: older hardware may not support current OS security features like TPM 2.0 and modern encryption',
        'Discuss support costs: older machines have higher failure rates, more frequent repair needs and longer troubleshooting time',
        'Present a cost comparison: the combined cost of supporting aging hardware versus the investment in reliable replacements',
        'Recommend a phased replacement plan that spreads the cost over budget cycles while prioritizing the oldest machines first'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'A frustrated user has called three times about the same issue and it has not been fully resolved. They want to speak to your manager. How do you handle this?',
      guidancePoints: [
        'Acknowledge the user\'s frustration and apologize for the inconvenience without being defensive',
        'Review all three tickets to understand what was attempted and why the issue persisted',
        'Escalate the issue proactively — contact your manager or a senior technician before the user has to repeat the story again',
        'Provide the user with a specific timeline and a named point of contact for follow-up rather than a vague promise',
        'Follow up after resolution to confirm the fix is working and to rebuild the user\'s confidence in the support team'
      ]
    }

  ]

}
