import type { CareerDef } from '../framework.js'

export const systemAdministrator: CareerDef = {
  slug: 'system-administrator',
  name: 'System Administrator',
  category: 'IT & Cloud',
  order: 33,
  description:
    'Administers Linux and Windows Server systems — users, permissions, storage, services, virtualization and backups.',
  difficulty: 'Intermediate',
  pathSummary:
    'Linux & Windows fundamentals → user and permission management → storage, services & networking → virtualization, automation & disaster recovery.',
  mainSkills: [
    'Linux System Administration',
    'Windows Server Administration',
    'User & Permission Management',
    'Storage & Filesystem Management',
    'Virtualization (VMware / KVM)',
    'Shell & PowerShell Scripting',
    'Backup & Disaster Recovery',
    'System Monitoring & Troubleshooting'
  ],
  sourcePlatforms: ['Linux Documentation', 'Microsoft Learn', 'Red Hat Documentation', 'PowerShell Documentation', 'VMware Documentation'],
  companyName: 'Vertex Infrastructure Services',
  roleTitle: 'System Administrator',

  chapters: [
    {
      slug: 'os-foundations',
      stage: 'Beginner',
      title: 'Operating System Fundamentals',
      description: 'Core concepts of Linux and Windows Server — boot processes, filesystems, package management and the tools sysadmins use daily.',
      topics: [
        {
          slug: 'linux-boot-process-and-systemd',
          title: 'Linux Boot Process & Systemd',
          minutes: 28,
          objectives: [
            'Describe the Linux boot sequence from BIOS/UEFI through GRUB to systemd',
            'Use systemctl to start, stop, enable and inspect system services',
            'Read and interpret systemd journal logs to diagnose boot failures'
          ],
          sections: [
            { heading: 'From power-on to login prompt', body: 'When a Linux machine powers on, the firmware (BIOS or UEFI) performs a POST, locates the bootloader (GRUB2) on the EFI system partition or MBR, and loads the kernel. The kernel initializes hardware, mounts the root filesystem and hands control to systemd (PID 1). Systemd reads unit files from /etc/systemd/system and /usr/lib/systemd/system, resolves dependency ordering and brings the system to the requested target — usually multi-user.target or graphical.target. Understanding this chain is essential for diagnosing machines that hang at the bootloader or fail to reach a login prompt.' },
            { heading: 'Managing services with systemctl', body: 'Systemctl is the primary interface to systemd. "systemctl start httpd" launches a service immediately; "systemctl enable httpd" ensures it starts on boot. "systemctl status httpd" shows active state, memory usage and the last few journal lines. Masking a service (systemctl mask) prevents it from being started even manually — useful for disabling unused services. Chaining dependent services with "systemctl start" on a target starts all dependencies automatically. Every sysadmin should be fluent in systemctl before touching production systems.' },
            { heading: 'Journal logs and boot diagnostics', body: 'The systemd journal (journald) collects logs from the kernel, initramfs and all services into a structured binary format. "journalctl -b" shows logs from the current boot; "journalctl -b -1" shows the previous boot. "journalctl -u sshd -e" jumps to the end of the sshd service log. "journalctl --priority=err" filters for error-level messages. When a system fails to boot, booting into rescue mode and reading the journal is the fastest way to identify whether the issue is a failed mount, a corrupt filesystem or a misconfigured service.' }
          ],
          links: [
            { title: 'systemd unit files reference', url: 'https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html', sourceName: 'Linux Documentation', resourceType: 'reference', relationship: 'Complete systemd unit file syntax and directive reference.' },
            { title: 'systemctl command reference', url: 'https://www.freedesktop.org/software/systemd/man/latest/systemctl.html', sourceName: 'Linux Documentation', resourceType: 'reference', relationship: 'systemctl subcommands for service management.' },
            { title: 'RHEL systemd administration guide', url: 'https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/managing_systems_using_systemd/index', sourceName: 'Red Hat Documentation', resourceType: 'guide', relationship: 'RHEL 9 guide to managing services and targets with systemd.' }
          ],
          quiz: {
            prompt: 'A server hangs during boot and drops to an emergency shell. The journal shows "Failed to mount /home". What is the most likely cause?',
            options: [
              'The kernel is corrupted',
              'The /home partition or filesystem cannot be found or is corrupt',
              'systemd is not installed',
              'The network is down'
            ],
            answerIndex: 1,
            explanation: 'A failed mount of /home means the partition referenced in /etc/fstab does not exist, has a corrupt filesystem or has incorrect mount options. Booting into emergency mode lets you run fsck or correct fstab before retrying.'
          }
        },
        {
          slug: 'windows-server-administration-basics',
          title: 'Windows Server Administration Basics',
          minutes: 30,
          objectives: [
            'Navigate Server Manager, MMC snap-ins and PowerShell for server configuration',
            'Install and configure roles and features using Server Manager or DISM',
            'Use Windows Event Viewer and Performance Monitor to diagnose system health'
          ],
          sections: [
            { heading: 'Server Manager and roles', body: 'Server Manager is the central console for adding roles (Active Directory Domain Services, DNS, File and Storage Services) and features (.NET Framework, Telnet Client, Windows Defender). Each role installs services, registry keys and firewall rules. The Add Roles and Features Wizard walks through selection, confirmation and verification. For scripted deployments, DISM (Deployment Image Servicing and Management) and PowerShell Install-WindowsFeature let you add roles without the GUI — essential for headless servers.' },
            { heading: 'MMC snap-ins for targeted tasks', body: 'Microsoft Management Console snap-ins provide granular control for specific subsystems. "compmgmt.msc" opens Computer Management with local users, disks and services. "devmgmt.msc" manages hardware. "secpol.msc" configures local security policy. "services.msc" manages service start modes. These snap-ins remain relevant even on Server Core installations through MMC remote management. Mastering the run-command shortcuts (Win+R → compmgmt.msc) saves significant time during live troubleshooting.' },
            { heading: 'Event Viewer and Performance Monitor', body: 'Event Viewer logs application, security, system and setup events with severity levels (Information, Warning, Error, Critical). Custom Views filter events by source and ID — filtering Event Log 6008 (unexpected shutdown) or LSASRV 4625 (failed logon) reveals patterns invisible in raw logs. Performance Monitor collects CPU, memory, disk and network counters over time. Data Collector Sets export performance baselines. Correlating Event Viewer errors with Performance Monitor spikes is the foundation of Windows Server troubleshooting.' }
          ],
          links: [
            { title: 'Install Windows Server roles and features', url: 'https://learn.microsoft.com/en-us/windows-server/get-started/server-manager-install-roles-services', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Step-by-step guide to installing roles and features via Server Manager and PowerShell.' },
            { title: 'Windows Event Viewer overview', url: 'https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/operations/event-viewer-logs-events', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Overview of Event Viewer log categories and navigation.' },
            { title: 'Performance Monitor reference', url: 'https://learn.microsoft.com/en-us/windows-server/operations/performance-monitoring-overview', sourceName: 'Microsoft Learn', resourceType: 'reference', relationship: 'Performance Monitor counters and Data Collector Set configuration.' }
          ],
          quiz: {
            prompt: 'You need to add the DNS Server role to a Windows Server 2022 machine using only the command line. Which tool do you use?',
            options: [
              'regedit to add registry keys manually',
              'DISM or PowerShell Install-WindowsFeature to add the role',
              'msconfig to enable the feature',
              'Task Scheduler to run the installer'
            ],
            answerIndex: 1,
            explanation: 'DISM and PowerShell Install-WindowsFeature (or Add-WindowsFeature on older versions) add roles and features without the GUI. This is the standard approach for Server Core and automated deployments.'
          }
        },
        {
          slug: 'filesystems-and-package-management',
          title: 'Filesystems & Package Management',
          minutes: 27,
          objectives: [
            'Compare ext4, XFS and Btrfs filesystems and choose based on workload requirements',
            'Use yum/dnf and apt to install, update and remove packages on Linux',
            'Manage NTFS and ReFS volumes on Windows with disk management tools'
          ],
          sections: [
            { heading: 'Linux filesystem landscape', body: 'ext4 is the mature default for most Linux distributions — reliable, well-tested and efficient for general workloads. XFS excels at parallel I/O and large files, making it the default for RHEL/CentOS 7+ and ideal for database and media workloads. Btrfs provides snapshot, compression and subvolume features that simplify backup and rollback, but introduces complexity. ZFS offers enterprise-grade RAID, checksumming and compression but is not included in mainline Linux kernels. Choosing a filesystem is a long-term decision — reformatting production volumes is costly.' },
            { heading: 'Package managers: dnf/yum and apt', body: 'RHEL-based distributions use dnf (replacing yum) to install, update and remove RPM packages. "dnf install nginx" resolves dependencies and pulls from configured repositories. "dnf update" applies security patches. Debian/Ubuntu use apt with .deb packages. "apt update" refreshes package lists; "apt upgrade" applies updates. Both tools manage repository keys, handle dependency conflicts and maintain transaction history. Pinning package versions prevents unexpected upgrades on critical servers. Understanding your distribution package manager is day-one knowledge for any Linux sysadmin.' },
            { heading: 'Windows disk and volume management', body: 'Disk Management (diskmgmt.msc) creates partitions, formats volumes, assigns drive letters and converts between MBR and GPT. NTFS remains the standard for boot and data volumes with support for ACLs, compression and encryption (EFS). ReFS (Resilient File System) provides integrity streams and automatic corruption repair for data volumes. PowerShell Get-Volume, Get-Disk and Initialize-Disk cmdlets manage disks programmatically. For automated deployments, diskpart scripts or Unattend.xml files configure partitions during installation.' }
          ],
          links: [
            { title: 'Linux filesystem documentation', url: 'https://docs.kernel.org/filesystems/', sourceName: 'Linux Documentation', resourceType: 'reference', relationship: 'Kernel documentation on filesystem types, mount options and capabilities.' },
            { title: 'RHEL storage administration guide', url: 'https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/managing_file_systems/index', sourceName: 'Red Hat Documentation', resourceType: 'guide', relationship: 'RHEL 9 guide to creating, mounting and managing filesystems.' },
            { title: 'Windows Server storage overview', url: 'https://learn.microsoft.com/en-us/windows-server/storage/storage-overview', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Overview of Windows Server storage options, volumes and ReFS.' }
          ],
          quiz: {
            prompt: 'You need a filesystem on a Linux server that supports built-in snapshots for point-in-time rollback of a 500GB data volume. Which is the best choice?',
            options: [
              'ext4',
              'XFS',
              'Btrfs',
              'FAT32'
            ],
            answerIndex: 2,
            explanation: 'Btrfs natively supports snapshots via copy-on-write subvolumes, allowing instant point-in-time snapshots without LVM. ext4 and XFS do not support filesystem-level snapshots natively.'
          }
        }
      ]
    },
    {
      slug: 'users-permissions-networking',
      stage: 'Foundation',
      title: 'Users, Permissions & System Networking',
      description: 'Managing identities, access control, SSH, firewalls and the networking services that keep systems connected and secure.',
      topics: [
        {
          slug: 'user-and-group-management-linux',
          title: 'User & Group Management in Linux',
          minutes: 30,
          objectives: [
            'Create, modify and delete users and groups with useradd, usermod and userdel',
            'Interpret /etc/passwd, /etc/shadow and /etc/group to understand identity storage',
            'Configure sudo access using /etc/sudoers and the visudo editor'
          ],
          sections: [
            { heading: 'User account lifecycle', body: 'useradd creates a new user with a home directory, UID and default shell. -m creates the home directory; -s /bin/bash sets the shell. usermod changes properties: -aG docker adds a user to the docker group without removing other groups. userdel -r removes the user and their home directory. Every user has a UID (numeric identity), a primary GID (group membership) and entries in /etc/passwd (username, UID, GID, home, shell) and /etc/shadow (encrypted password, expiry dates). Understanding these files is essential for auditing and scripting.' },
            { heading: 'Group management and access patterns', body: 'Groups organize users for shared resource access. groupadd creates a new group; usermod -G overwrites supplementary groups while -aG appends. Linux groups are assigned to files and directories — a file owned by group "developers" is accessible to all members. Combining group ownership with standard Linux permissions (rwxr-x---) enables team-level access without granting individual permissions to every user. Keep groups small and purposeful; a "general" group with 200 members is an access control liability.' },
            { heading: 'Sudo and privilege escalation', body: 'Granting root access via shared passwords is a security disaster. Sudo grants temporary, auditable privilege escalation. The sudoers file (/etc/sudoers) defines who can run what as which user. "devops ALL=(ALL) /usr/bin/systemctl restart nginx" lets the devops user restart nginx as root but nothing else. Always edit sudoers with visudo, which validates syntax before saving — a broken sudoers file locks out all sudo access. Include directives (includedir /etc/sudoers.d/) let you add per-user files without modifying the main file.' }
          ],
          links: [
            { title: 'Linux user and group administration', url: 'https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/managing_users_and_groups/index', sourceName: 'Red Hat Documentation', resourceType: 'guide', relationship: 'RHEL 9 guide to creating, modifying and managing users and groups.' },
            { title: 'useradd man page', url: 'https://www.man7.org/linux/man-pages/man8/useradd.8.html', sourceName: 'Linux Documentation', resourceType: 'reference', relationship: 'Complete useradd command reference with all options and defaults.' },
            { title: 'sudoers manual', url: 'https://www.sudo.ws/docs/man/sudoers.man/', sourceName: 'Linux Documentation', resourceType: 'reference', relationship: 'sudoers file format, directives and best practices for least-privilege access.' }
          ],
          quiz: {
            prompt: 'You run "usermod -G developers alice" and later "usermod -G admins alice". What happens to alice\'s group memberships?',
            options: [
              'Alice is in both developers and admins',
              'Alice is only in admins — -G overwrites all supplementary groups',
              'Alice is in the default group only',
              'The command fails because -G cannot be used twice'
            ],
            answerIndex: 1,
            explanation: 'The -G flag overwrites all supplementary groups. To add a group without removing existing ones, use -aG (append). This is one of the most common sysadmin mistakes.'
          }
        },
        {
          slug: 'windows-active-directory-users',
          title: 'Windows Active Directory & User Management',
          minutes: 30,
          objectives: [
            'Explain the role of Active Directory Domain Services in centralized identity management',
            'Create and manage user accounts, OUs and Group Policy Objects with PowerShell',
            'Configure password policies, account lockout and fine-grained password policies'
          ],
          sections: [
            { heading: 'Active Directory architecture', body: 'Active Directory Domain Services (AD DS) centralizes authentication, authorization and policy management for Windows domains. A domain controller runs the AD database (NTDS.dit), replicates with other DCs and responds to authentication requests. Organizational Units (OUs) hierarchy containers that delegate administrative control and apply Group Policy Objects (GPOs). A well-designed OU structure mirrors organizational boundaries and enables delegated administration without exposing the entire directory.' },
            { heading: 'Managing users with PowerShell', body: 'New-ADUser creates accounts with properties like Department, Manager and ServicePrincipalName. Set-ADUser modifies attributes; Disable-ADAccount and Enable-ADAccount control login state. Get-ADUser -Filter searches by any attribute. Bulk operations pipe CSV data into New-ADUser with ForEach-Object. PowerShell AD management is faster, repeatable and scriptable compared to the ADUC snap-in. Every AD change should be scripted for auditability and rollback capability.' },
            { heading: 'Group Policy and password policies', body: 'Group Policy Objects enforce settings across the domain — password complexity, account lockout thresholds, drive mappings, firewall rules and software installation. Default Domain Policy controls password and lockout settings at the domain level. Fine-Grained Password Policies (PSOs) apply stricter rules to specific groups (e.g., admins need 16-character passwords while standard users need 12). GPOs link to OUs and are processed in order: LSDOU (Local, Site, Domain, OU). The last applied GPO wins on conflicting settings.' }
          ],
          links: [
            { title: 'Active Directory Domain Services overview', url: 'https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Overview of AD DS architecture, components and deployment.' },
            { title: 'PowerShell Active Directory module', url: 'https://learn.microsoft.com/en-us/powershell/module/activedirectory/', sourceName: 'PowerShell Documentation', resourceType: 'reference', relationship: 'Complete reference for Active Directory PowerShell cmdlets.' },
            { title: 'Group Policy overview', url: 'https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/component-updates/group-policy-overview', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Group Policy architecture, processing order and troubleshooting.' }
          ],
          quiz: {
            prompt: 'A user reports they can log into their workstation but not access a file share. Other users on the same OU can access the share. What should you check first?',
            options: [
              'Reboot the domain controller',
              'Verify the user\'s group memberships and the share\'s NTFS/Share permissions',
              'Reinstall the user\'s Windows profile',
              'Reset the domain password policy'
            ],
            answerIndex: 1,
            explanation: 'Since other users on the same OU can access the share, the issue is specific to this user. The most common cause is missing group membership or incorrect permissions assignment.'
          }
        },
        {
          slug: 'ssh-tunneling-and-firewalls',
          title: 'SSH, Tunneling & Firewall Configuration',
          minutes: 28,
          objectives: [
            'Configure key-based SSH authentication and harden the sshd service',
            'Set up SSH tunneling for secure remote access to internal services',
            'Configure firewalld/iptables on Linux and Windows Defender Firewall with rules'
          ],
          sections: [
            { heading: 'SSH hardening', body: 'Disable password authentication (PasswordAuthentication no) and permit only key-based login. Generate Ed25519 keys with ssh-keygen -t ed25519; RSA keys must be at least 4096 bits. Set PermitRootLogin no to block direct root login. Use AllowUsers or AllowGroups to whitelist who can connect. Change the default port from 22 if facing automated brute-force scans. SSH keys are not inherently secure — private keys must be protected with strong passphrases and never shared via email or chat.' },
            { heading: 'SSH tunneling and jump hosts', body: 'Local port forwarding (-L) exposes a remote service on your local machine: ssh -L 5432:db-server:5432 bastion connects your localhost:5432 to a database server through a bastion host. Remote port forwarding (-R) exposes your local port to the remote network. Dynamic forwarding (-D) creates a SOCKS proxy through the SSH connection. ProxyJump in ~/.ssh/config creates jump-host chains automatically: Host internal-proxy ProxyJump bastion. These techniques replace VPNs for ad-hoc access without routing changes.' },
            { heading: 'Firewall configuration', body: 'RHEL/CentOS use firewalld with zone-based rules. "firewall-cmd --add-port=8080/tcp --permanent" opens a port persistently. "firewall-cmd --reload" applies changes. Zones (public, internal, trusted) group trust levels. Ubuntu uses ufw (Uncomplicated Firewall): "ufw allow 443/tcp". Windows Defender Firewall blocks inbound connections by default and allows outbound. PowerShell New-NetFirewallRule creates granular rules by program, port or IP. Always test firewall changes through the existing session to avoid locking yourself out.' }
          ],
          links: [
            { title: 'OpenSSH server configuration', url: 'https://www.openssh.com/manual.html', sourceName: 'Linux Documentation', resourceType: 'reference', relationship: 'OpenSSH sshd_config directive reference and security recommendations.' },
            { title: 'RHEL firewalld guide', url: 'https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/securing_networks/using-and-configuring-firewalls_securing-networks', sourceName: 'Red Hat Documentation', resourceType: 'guide', relationship: 'RHEL 9 guide to firewalld zones, services and rich rules.' },
            { title: 'Windows Defender Firewall with Advanced Security', url: 'https://learn.microsoft.com/en-us/windows/security/operating-system-security/networking/windows-firewall/', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Windows Firewall configuration, profiles and PowerShell management.' }
          ],
          quiz: {
            prompt: 'You configure SSH key-based authentication and disable password login. Users can connect from the office but remote users get "Permission denied (publickey)". What should you check?',
            options: [
              'The SSH server is running',
              'The remote users\' public keys are in the correct authorized_keys file with proper permissions (600)',
              'The firewall allows port 22',
              'DNS resolves correctly'
            ],
            answerIndex: 1,
            explanation: 'Key-based auth fails when the authorized_keys file or .ssh directory has incorrect permissions, or when the wrong user\'s authorized_keys is missing the key. Permission denied (publickey) after password auth is disabled almost always points to this.'
          }
        }
      ]
    },
    {
      slug: 'storage-services-automation',
      stage: 'Intermediate',
      title: 'Storage, Services & Automation',
      description: 'Managing disks, LVM, system services, cron and scripting the repetitive tasks that keep infrastructure running.',
      topics: [
        {
          slug: 'lvm-and-disk-management',
          title: 'LVM, RAID & Disk Management',
          minutes: 30,
          objectives: [
            'Create and manage LVM physical volumes, volume groups and logical volumes',
            'Expand a logical volume online without downtime',
            'Configure software RAID levels and understand their trade-offs'
          ],
          sections: [
            { heading: 'LVM fundamentals', body: 'Logical Volume Management decouples filesystems from physical disks. A Physical Volume (pvcreate) wraps a disk or partition. A Volume Group (vgcreate) pools physical volumes into a storage pool. A Logical Volume (lvcreate) carves space from the pool — resizable without reformatting. "lvextend -L +10G /dev/vg0/data" adds 10GB; "resize2fs" or "xfs_growfs" expands the filesystem to fill the new space. Snapshots (lvcreate --snapshot) capture point-in-time copies for backup without unmounting. LVM is the standard for any server where storage requirements change over time.' },
            { heading: 'Online volume expansion', body: 'Growing a filesystem online is a two-step process: extend the logical volume, then resize the filesystem. For ext4: "lvextend -L +20G /dev/vg0/logs && resize2fs /dev/vg0/logs". For XFS: "xfs_growfs /dev/vg0/logs". Both operations are non-disruptive — the filesystem expands while mounted and serving I/O. Shrinking is possible only on ext4 (not XFS) and requires unmounting. Always back up before shrinking. Online expansion is one of LVM\'s greatest advantages — add a physical disk to the volume group, extend the logical volume and the filesystem grows.' },
            { heading: 'Software RAID configurations', body: 'mdadm creates software RAID arrays in Linux. RAID 0 stripes data across drives for performance but provides zero redundancy — one drive failure destroys all data. RAID 1 mirrors data for redundancy, usable capacity is one drive. RAID 5 stripes with single parity — tolerates one drive failure with good read performance but slow writes. RAID 6 adds dual parity for two-drive fault tolerance. RAID 10 (1+0) mirrors and stripes for both performance and redundancy — the preferred choice for databases. Hardware RAID controllers offload parity calculation from the CPU and provide battery-backed write cache.' }
          ],
          links: [
            { title: 'LVM administration guide', url: 'https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/managing_logical_volumes/index', sourceName: 'Red Hat Documentation', resourceType: 'guide', relationship: 'RHEL 9 guide to creating and managing LVM volumes, snapshots and thin provisioning.' },
            { title: 'Linux RAID documentation', url: 'https://raid.wiki.kernel.org/index.php/Linux_Raid', sourceName: 'Linux Documentation', resourceType: 'reference', relationship: 'Kernel RAID wiki covering mdadm configuration and best practices.' },
            { title: 'PowerShell storage cmdlets', url: 'https://learn.microsoft.com/en-us/powershell/module/storage/', sourceName: 'PowerShell Documentation', resourceType: 'reference', relationship: 'PowerShell Storage module cmdlets for disk, partition and volume management.' }
          ],
          quiz: {
            prompt: 'A logical volume on a 500GB disk is 95% full. You have an unallocated 200GB disk available. What is the correct sequence to expand the volume without downtime?',
            options: [
              'Mount the new disk, copy data, unmount the old disk',
              'Add the new disk to the volume group with vgextend, extend the logical volume with lvextend, then resize the filesystem online',
              'Reformat the original disk with a larger partition',
              'Use dd to copy the entire disk to the new one'
            ],
            answerIndex: 1,
            explanation: 'LVM lets you add a new physical volume to the existing volume group, extend the logical volume and grow the filesystem online — all without unmounting or downtime.'
          }
        },
        {
          slug: 'scheduling-and-automation',
          title: 'Cron, Task Scheduler & Automation',
          minutes: 28,
          objectives: [
            'Write and troubleshoot cron expressions for scheduled tasks on Linux',
            'Configure Windows Task Scheduler for recurring and event-driven jobs',
            'Use systemd timers as a modern alternative to cron for service-level scheduling'
          ],
          sections: [
            { heading: 'Linux cron scheduling', body: 'Cron expressions use five fields: minute, hour, day-of-month, month, day-of-week. "0 2 * * 0 /usr/local/bin/backup.sh" runs backup.sh every Sunday at 02:00. An asterisk means "every". Ranges (1-5), steps (*/5) and lists (1,3,5) provide flexibility. Cron jobs run in the user\'s environment — PATH may differ from interactive sessions. Redirect output to a log file or use a mailto variable; otherwise cron silently discards stdout. Use /etc/cron.d/ for system-level schedules and crontab -l to review the current user\'s jobs.' },
            { heading: 'Windows Task Scheduler', body: 'Task Scheduler (taskschd.msc) creates tasks triggered by time, events, user logon or system startup. Actions execute programs, scripts or send emails. Triggers support repetition intervals (every 5 minutes for 1 hour). Conditions control execution: only idle, only on AC power, only when connected to network. The Taskschd.msc library organizes tasks into folders. PowerShell New-ScheduledTask, Register-ScheduledTask and Set-ScheduledTask manage tasks programmatically. Export tasks as XML for deployment across multiple servers.' },
            { heading: 'systemd timers', body: 'Systemd timers replace cron with journal-integrated, dependency-aware scheduling. A .timer unit specifies OnCalendar (cron-like syntax), OnBootSec or OnUnitActiveSec for interval-based triggers. The matching .service unit runs the actual task. "systemctl list-timers" shows all active timers and their next trigger time. Advantages over cron: output goes to the journal (journalctl -u mytask), dependency ordering ensures prerequisites are met, and transient timers can be created at runtime for ad-hoc scheduling. Most modern distributions default to systemd timers for new services.' }
          ],
          links: [
            { title: 'crontab manual', url: 'https://man7.org/linux/man-pages/man5/crontab.5.html', sourceName: 'Linux Documentation', resourceType: 'reference', relationship: 'Complete cron expression syntax and crontab file format.' },
            { title: 'Windows Task Scheduler PowerShell', url: 'https://learn.microsoft.com/en-us/powershell/module/scheduledtasks/', sourceName: 'PowerShell Documentation', resourceType: 'reference', relationship: 'PowerShell ScheduledTasks module cmdlet reference.' },
            { title: 'systemd timers documentation', url: 'https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/automating-system-administration-tasks-with-systemd/index', sourceName: 'Red Hat Documentation', resourceType: 'guide', relationship: 'RHEL 9 guide to systemd timers for scheduling automated tasks.' }
          ],
          quiz: {
            prompt: 'A cron job scheduled for "30 4 * * *" stopped working after the server timezone was changed from UTC to EST. What is the cause?',
            options: [
              'Cron does not support timezone changes',
              'Cron runs in UTC; the timezone change shifted when 04:30 UTC executes relative to local time',
              'The cron service needs to be restarted after a timezone change',
              'Daylight saving time breaks cron expressions'
            ],
            answerIndex: 1,
            explanation: 'By default, cron executes in the system timezone. Changing from UTC to EST means 04:30 UTC is now 23:30 EST (or 22:30 during DST). Verify the TZ environment variable or use the /etc/environment file to set timezone for cron jobs.'
          }
        },
        {
          slug: 'monitoring-and-logging',
          title: 'System Monitoring & Centralized Logging',
          minutes: 29,
          objectives: [
            'Use top, htop, vmstat and iostat to identify performance bottlenecks in real time',
            'Configure rsyslog or journald forwarding for centralized log aggregation',
            'Set up basic Prometheus or Windows Performance Monitor alerts for critical thresholds'
          ],
          sections: [
            { heading: 'Real-time performance tools', body: 'top provides a live view of CPU, memory and process activity. htop adds color, mouse support and tree view. vmstat 1 reports per-second CPU, memory, I/O and context switch metrics — the "r" column (run queue) above CPU count indicates CPU saturation; "si/so" (swap in/out) indicates memory pressure. iostat -x 1 shows per-disk utilization, await and IOPS — high await times indicate disk bottleneck. sar (sysstat) records historical data for trend analysis. These tools are your first resort when a server feels slow.' },
            { heading: 'Centralized logging architecture', body: 'Syslog (rsyslog or syslog-ng) forwards logs from every server to a central collector. Rsyslog uses the @protocol://host:port syntax in /etc/rsyslog.conf to forward events. Facility and severity filters (auth.* = critical) control what gets forwarded. For structured logs, journald can be configured with ForwardToSyslog=yes. Centralized logging is a security requirement — attackers routinely delete local logs, but centralized logs survive host compromise. Retention policies, log rotation and access controls on the central collector are essential.' },
            { heading: 'Alerting and threshold monitoring', body: 'Prometheus with node_exporter collects system metrics and exposes them over HTTP. Alerting rules define thresholds: "alert HighCPU if avg(rate(cpu_seconds_total[5m])) > 0.85". Grafana dashboards visualize metrics and route alerts to Slack, email or PagerDuty. On Windows, Performance Monitor Data Collector Sets record counters to CSV for analysis, and Windows Admin Center provides a web-based monitoring dashboard. The goal is to know about problems before users report them — alert on symptoms (high latency, low disk space) not just causes.' }
          ],
          links: [
            { title: 'Linux performance monitoring tools', url: 'https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/monitoring_and_managing_system_status_and_performance/index', sourceName: 'Red Hat Documentation', resourceType: 'guide', relationship: 'RHEL 9 guide to performance analysis with top, vmstat, iostat and sar.' },
            { title: 'rsyslog configuration', url: 'https://www.rsyslog.com/doc/master/configuration/index.html', sourceName: 'Linux Documentation', resourceType: 'reference', relationship: 'rsyslog configuration syntax, modules and forwarding rules.' },
            { title: 'Windows Performance Monitor overview', url: 'https://learn.microsoft.com/en-us/windows-server/operations/performance-monitoring-overview', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Performance Monitor counters, Data Collector Sets and alert configuration.' }
          ],
          quiz: {
            prompt: 'vmstat shows a load average of 12 on a 4-CPU server. What does this indicate?',
            options: [
              'The server is underutilized',
              'The server is severely CPU-saturated with processes waiting in the run queue',
              'The memory is full',
              'The network is congested'
            ],
            answerIndex: 1,
            explanation: 'A load average of 12 on 4 CPUs means 3x oversubscription — on average, 8 processes are waiting in the run queue for CPU time. This indicates severe CPU saturation requiring investigation of top CPU consumers.'
          }
        }
      ]
    },
    {
      slug: 'virtualization-backup-operations',
      stage: 'Advanced',
      title: 'Virtualization, Backup & Production Operations',
      description: 'Building resilient infrastructure with virtualization platforms, backup strategies, disaster recovery and operational runbooks.',
      topics: [
        {
          slug: 'vmware-and-kvm-virtualization',
          title: 'VMware & KVM Virtualization',
          minutes: 30,
          objectives: [
            'Explain the architecture of VMware ESXi/vSphere and KVM/QEMU hypervisors',
            'Create, clone and configure virtual machines with appropriate resource allocation',
            'Configure VM networking (vSwitch, bridge) and storage (datastore, virtio)'
          ],
          sections: [
            { heading: 'Type 1 hypervisors: ESXi and KVM', body: 'VMware ESXi is a bare-metal hypervisor that installs directly on hardware, dedicating resources to VMs without a host OS overhead. vCenter manages clusters, vMotion live migration and resource pools. KVM (Kernel-based Virtual Machine) integrates into the Linux kernel, turning a Linux host into a hypervisor managed by libvirt and tools like virt-manager or virsh. KVM is free and open-source; ESXi requires licensing. Both provide hardware-assisted virtualization via Intel VT-x/AMD-V for near-native performance.' },
            { heading: 'Resource allocation and overcommitment', body: 'VMs are allocated vCPUs and RAM based on expected workload, not peak capacity. Overcommitment ratios (e.g., 4:1 vCPU:physical CPU) work when not all VMs peak simultaneously. Memory ballooning (vmmemctl) reclaims unused RAM from idle VMs. Reserve resources for critical VMs (database servers, domain controllers) to prevent contention. VMware DRS (Distributed Resource Scheduler) automatically balances VMs across hosts based on utilization. KVM uses cgroups and NUMA awareness to isolate and optimize VM resource access.' },
            { heading: 'VM networking and storage', body: 'VMware vSwitches and distributed switches provide virtual networking with VLAN tagging, traffic shaping and NIC teaming. Port groups map VLANs to VM network adapters. KVM uses Linux bridges or Open vSwitch for virtual networking. Storage for VMs resides on datastores (VMFS on ESXi) or on iSCSI/NFS shared storage for features like vMotion. KVM VMs use virtio drivers for near-native disk and network performance. qcow2 format supports snapshots and thin provisioning; raw format provides maximum I/O performance.' }
          ],
          links: [
            { title: 'VMware vSphere documentation', url: 'https://docs.vmware.com/en/VMware-vSphere/index.html', sourceName: 'VMware Documentation', resourceType: 'documentation', relationship: 'Official VMware vSphere and ESXi administration documentation.' },
            { title: 'KVM virtualization guide', url: 'https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/configuring_and_managing_virtualization/index', sourceName: 'Red Hat Documentation', resourceType: 'guide', relationship: 'RHEL 9 KVM administration guide covering VM creation, networking and storage.' },
            { title: 'Linux KVM documentation', url: 'https://www.kernel.org/doc/html/latest/virt/kvm/index.html', sourceName: 'Linux Documentation', resourceType: 'reference', relationship: 'Kernel-level KVM architecture documentation and API reference.' }
          ],
          quiz: {
            prompt: 'A VM running on ESXi is experiencing high CPU wait times while the host shows 40% overall CPU utilization. What is the most likely cause?',
            options: [
              'The ESXi host hardware is faulty',
              'Other VMs on the same host are consuming their full CPU allocation, causing contention for this VM\'s vCPUs',
              'The VM needs more RAM',
              'The datastore is too slow'
            ],
            answerIndex: 1,
            explanation: 'CPU wait time indicates the VM\'s vCPUs are ready to run but physical CPUs are occupied by other VMs. Overcommitment at the host level can starve individual VMs even when overall utilization appears moderate.'
          }
        },
        {
          slug: 'backup-strategies-and-disaster-recovery',
          title: 'Backup Strategies & Disaster Recovery',
          minutes: 30,
          objectives: [
            'Design a 3-2-1 backup strategy with full, incremental and offsite copies',
            'Implement automated backup verification and restore testing procedures',
            'Create a disaster recovery plan with RPO, RTO and failover procedures'
          ],
          sections: [
            { heading: 'The 3-2-1 backup rule', body: 'Keep 3 copies of data on 2 different media types with 1 copy offsite. On Linux, rsync to a remote host with SSH provides efficient incremental backups. On Windows, Windows Server Backup or Veeam handles volume-level and VM-level backups. Cloud storage (S3, Azure Blob) provides the offsite copy with versioning and lifecycle policies. Backup frequency determines RPO — hourly backups mean at most 1 hour of data loss. Test restores monthly; an untested backup is unreliable.' },
            { heading: 'Backup verification and integrity', body: 'Automated verification checks that backup files are readable and contain expected data. Restic and Borgbackup (Linux) verify checksums on every backup. Veeam SureBackup boots VMs from backups in an isolated network to verify they are functional. Catalog backup metadata so you can quickly locate a file from three months ago without downloading the entire backup set. Log verification results — auditors want proof that backups are tested, not just scheduled.' },
            { heading: 'Disaster recovery planning', body: 'RPO (Recovery Point Objective) defines maximum tolerable data loss — minutes for databases, hours for file servers. RTO (Recovery Time Objective) defines maximum tolerable downtime — measured in hours for critical systems. A DR plan documents the failover sequence: activate secondary site, restore from most recent backup, verify data integrity, redirect DNS or load balancers, notify stakeholders. DR drills test this plan under realistic conditions. Document who does what, in what order, with estimated times for each step. The plan must be accessible offline — if the disaster takes down your wiki, you cannot read the recovery plan.' }
          ],
          links: [
            { title: 'RHEL backup and recovery guide', url: 'https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/backing_up_and_restoring_systems/index', sourceName: 'Red Hat Documentation', resourceType: 'guide', relationship: 'RHEL 9 guide to backup tools, strategies and recovery procedures.' },
            { title: 'Windows Server Backup overview', url: 'https://learn.microsoft.com/en-us/windows-server/backup-and-recovery/backup-and-recovery-overview', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Windows Server Backup features, configuration and recovery options.' },
            { title: 'VMware disaster recovery guide', url: 'https://docs.vmware.com/en/VMware-Site-Recovery/index.html', sourceName: 'VMware Documentation', resourceType: 'guide', relationship: 'VMware Site Recovery for automated DR with RPO/RTO management.' }
          ],
          quiz: {
            prompt: 'Your organization requires an RPO of 1 hour and an RTO of 4 hours for the ERP database. Which backup approach best meets this RPO?',
            options: [
              'Weekly full backup with daily incremental',
              'Daily full backup with hourly transaction log backups',
              'Monthly full backup only',
              'Real-time replication without backup'
            ],
            answerIndex: 1,
            explanation: 'Hourly transaction log backups (combined with daily full) limit data loss to at most 1 hour, meeting the RPO. Weekly incrementals would risk losing up to a day of data.'
          }
        },
        {
          slug: 'runbooks-and-change-management',
          title: 'Runbooks, Change Management & Operations',
          minutes: 29,
          objectives: [
            'Write operational runbooks for common maintenance and incident response procedures',
            'Implement change management workflows with approval, rollback and verification steps',
            'Establish on-call rotation procedures and escalation policies'
          ],
          sections: [
            { heading: 'Runbook structure', body: 'A runbook is a step-by-step procedure for an operational task. Each runbook includes: trigger conditions (when to use it), prerequisites (access, tools needed), numbered steps with expected output at each step, rollback procedure if something fails and post-execution verification. Runbooks for disk expansion, user onboarding, certificate renewal and service restart should be accessible to any team member. Store runbooks in version control alongside infrastructure-as-code. Review and update runbooks quarterly — a stale runbook is worse than no runbook because it creates false confidence.' },
            { heading: 'Change management process', body: 'Every change to production follows: request (document what and why), review (technical and risk assessment), approval (management sign-off for high-risk changes), implementation (execute during maintenance window), verification (confirm expected behavior) and documentation (update CMDB and runbooks). Emergency changes fast-track approval but require post-incident review. Maintain a change calendar so teams know when changes are scheduled. Rollback plans are mandatory — every change must be reversible. CAB (Change Advisory Board) meetings review high-risk changes weekly.' },
            { heading: 'On-call and escalation', body: 'On-call rotations ensure someone responds to incidents 24/7. A well-designed rotation distributes the burden fairly with adequate handoff time. PagerDuty or Opsgenie manage escalation chains: if the primary on-call does not acknowledge within 5 minutes, escalate to secondary. Define severity levels (P1: service down, P2: degraded, P3: minor) with response time targets. Post-incident reviews (blameless) identify systemic improvements. Track incident frequency and resolution time to justify staffing and tooling investments.' }
          ],
          links: [
            { title: 'ITIL change management overview', url: 'https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/component-updates/group-policy-overview', sourceName: 'Microsoft Learn', resourceType: 'guide', relationship: 'Microsoft guidance on change management and IT service management best practices.' },
            { title: 'Linux system administration best practices', url: 'https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/managing_systems_using_systemd/index', sourceName: 'Red Hat Documentation', resourceType: 'guide', relationship: 'RHEL operational best practices including runbooks and service management.' },
            { title: 'VMware operations management', url: 'https://docs.vmware.com/en/VMware-vSphere/index.html', sourceName: 'VMware Documentation', resourceType: 'documentation', relationship: 'VMware operational guidelines for monitoring, alerts and change management in vSphere environments.' }
          ],
          quiz: {
            prompt: 'A team member executes a production change without following the change management process. The change works, but what is the primary risk?',
            options: [
              'No risk — the change was successful',
              'No rollback plan exists and no one else knows what was changed, making future troubleshooting or reversal difficult',
              'The change is too small to require documentation',
              'Only manager approval matters; the process is optional'
            ],
            answerIndex: 1,
            explanation: 'Unplanned changes create knowledge silos and make it impossible for others to troubleshoot, replicate or reverse the change. Even successful changes must be documented and tracked through the change management process.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Infrastructure Audit & Optimization',
    coverage: [
      'Linux & Windows Administration',
      'User & Permission Management',
      'Storage & LVM Configuration',
      'Service & Scheduled Task Management',
      'Virtualization & Resource Allocation',
      'Backup & Disaster Recovery'
    ],
    brief:
      'You are the sysadmin at Vertex Infrastructure Services responsible for auditing and optimizing a mixed Linux/Windows environment. The environment has several issues: overprivileged user accounts, untested backups, fragmented storage without LVM, no centralized logging and inconsistent scheduled tasks. Produce a comprehensive audit report with remediation steps for each finding.',
    requirements: [
      'Audit user accounts across Linux and Windows, identifying overprivileged accounts and recommending least-privilege fixes',
      'Design an LVM-based storage layout for a Linux server that replaces direct partitioning',
      'Document a backup strategy implementing the 3-2-1 rule with RPO/RTO targets for three workload tiers',
      'Configure systemd timers or cron jobs for automated log rotation and backup execution',
      'Create a disaster recovery runbook for the primary file server including verification steps',
      'Write a change management procedure for the team to follow for all production changes'
    ],
    expectedOutput:
      'A production-ready infrastructure audit report with prioritized findings, remediation commands and procedures, and operational runbooks that any team member could execute.',
    rubric: [
      { skill: 'User & Permission Audit', weight: 20, criteria: 'Overprivileged accounts identified with specific remediation steps; sudo/ACL changes proposed with justification' },
      { skill: 'Storage Design', weight: 20, criteria: 'LVM layout includes volume groups, logical volumes with growth plan and snapshot strategy for backups' },
      { skill: 'Backup & DR', weight: 25, criteria: '3-2-1 strategy implemented with tested restore procedures; RPO/RTO targets defined per workload tier' },
      { skill: 'Automation', weight: 15, criteria: 'Scheduled tasks (cron/systemd/timers/Task Scheduler) are documented, have error handling and log to centralized location' },
      { skill: 'Operational Process', weight: 20, criteria: 'Change management and DR runbooks are clear, step-by-step and include rollback procedures' }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'User & Permission Hardening Project',
      stage: 'Foundation',
      objective: 'Audit a multi-user Linux system for permission vulnerabilities, implement least-privilege access controls and document all changes.',
      requirements: [
        'Audit all user accounts and identify those with unnecessary sudo access or excessive group memberships',
        'Configure sudoers with per-command restrictions for at least three different roles',
        'Set up file ACLs for shared directories that require more granular access than standard permissions allow',
        'Create an onboarding script that provisions new users with correct groups, home directory permissions and SSH keys',
        'Document the permission model with a matrix showing each role and its allowed operations'
      ],
      skillsEvaluated: ['Linux User Management', 'Sudo Configuration', 'File ACLs', 'Shell Scripting'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the audit report, sudoers configuration, ACL commands, onboarding script and permission matrix.',
        textLabel: 'User hardening audit report and scripts',
        minTextLength: 1000,
        linkLabels: ['Permission audit spreadsheet']
      }
    },
    {
      title: 'LVM Storage Migration Plan',
      stage: 'Intermediate',
      objective: 'Design and document a migration plan to convert a partitioned Linux server to LVM-managed storage with snapshots and expansion capability.',
      requirements: [
        'Document current disk layout with lsblk, fdisk and df outputs',
        'Design the target LVM layout with volume groups, logical volumes and filesystem types justified per workload',
        'Write step-by-step migration commands including data backup, partition creation, LVM setup and data copy',
        'Implement at least one LVM snapshot and demonstrate rollback from the snapshot',
        'Create a runbook for future volume expansion including adding a new disk to the volume group'
      ],
      skillsEvaluated: ['LVM Management', 'Disk Migration', 'Storage Planning', 'Runbook Documentation'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the migration plan with before/after disk layouts, LVM commands, snapshot demonstration and expansion runbook.',
        textLabel: 'LVM migration plan and runbook',
        minTextLength: 1200,
        linkLabels: ['Disk layout screenshots']
      }
    },
    {
      title: 'Disaster Recovery Plan for a Mixed Environment',
      stage: 'Advanced',
      objective: 'Create a complete disaster recovery plan covering both Linux and Windows servers including backup verification, failover procedures and DR drill documentation.',
      requirements: [
        'Define RPO and RTO targets for at least four workload types (database, file server, web server, domain controller)',
        'Design backup schedules implementing the 3-2-1 rule with specific tool configurations for each platform',
        'Write a DR failover runbook with step-by-step recovery procedures for each workload type',
        'Document a DR drill procedure including success criteria, rollback if drill fails and reporting template',
        'Include a communication plan template for notifying stakeholders during a disaster event'
      ],
      skillsEvaluated: ['Backup & Disaster Recovery', 'Mixed-Platform Administration', 'Runbook Development', 'Communication Planning'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the complete DR plan including RPO/RTO definitions, backup configurations, failover runbooks, drill procedure and communication template.',
        textLabel: 'Disaster recovery plan',
        minTextLength: 1500,
        linkLabels: ['DR drill report template']
      }
    }
  ],

  simTasks: [
    {
      title: 'P0: Production server unresponsive after failed update',
      context: 'A scheduled security patch was applied to the primary file server at 01:00. By 03:00, users report they cannot access shared files. The server responds to ping but SSH connections hang. You are the on-call sysadmin.',
      requirements: [
        'Diagnose the issue using console access (check disk space, service status, journal logs)',
        'Identify whether the problem is a failed filesystem mount, a corrupted package or a service conflict',
        'Implement a rollback of the patch or restore service with minimal data loss',
        'Document the incident with timeline, root cause and prevention steps'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Incident response note: diagnosis steps, root cause, remediation actions, rollback details and prevention recommendation.',
      skills: ['Linux Troubleshooting', 'Package Management', 'Service Recovery', 'Incident Documentation']
    },
    {
      title: 'Disk space critical on database VM',
      context: 'The VMware datastore hosting a database VM\'s virtual disk reaches 92% capacity. The database logs show write errors. You have access to vCenter and the guest OS.',
      requirements: [
        'Free disk space immediately inside the guest OS (identify large log files, old backups, temp files)',
        'Expand the virtual disk in vCenter and extend the partition inside the guest OS',
        'Implement a log rotation schedule to prevent recurrence',
        'Document the procedure for future disk expansion requests'
      ],
      priority: 'high',
      dueDayOffset: 3,
      expectedOutput: 'Resolution steps with vCenter and guest OS commands, log rotation configuration and disk expansion runbook.',
      skills: ['VMware Administration', 'LVM Extension', 'Log Rotation', 'Proactive Monitoring']
    },
    {
      title: 'New employee onboarding batch',
      context: 'HR sends a list of 15 new employees starting Monday across three departments (Engineering, Marketing, Finance). Each department has different file share access requirements and software needs. Current onboarding takes 2 hours per person manually.',
      requirements: [
        'Write an onboarding script that creates Linux users, assigns groups, sets up home directories and deploys SSH keys',
        'Write a PowerShell script that creates Active Directory accounts, assigns OUs, applies department-specific GPOs and provisions Exchange mailboxes',
        'Configure department-specific file share permissions using group memberships',
        'Document the process for HR to submit future onboarding requests and verify completion'
      ],
      priority: 'normal',
      dueDayOffset: 7,
      expectedOutput: 'Linux and PowerShell onboarding scripts, group permission mapping and the HR-facing documentation for future requests.',
      skills: ['Linux User Provisioning', 'Active Directory Management', 'Group Policy', 'Scripting']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Raj Patel',
      personaRole: 'Development Team Lead',
      situation: 'Developers want root access to the production server to deploy applications without waiting for the ops team.',
      openingMessage:
        'Our deployment pipeline is blocked because we need to install a package on the production server. Can you just give the dev team root access so we can unblock ourselves? We promise we will be careful.',
      expectedPoints: [
        'Explains the security and stability risks of shared root access in production',
        'Proposes alternatives: sudo with restricted commands, a CI/CD deployment pipeline, or a service account with specific permissions',
        'Offers a timeline for setting up automated deployment that eliminates the need for manual access',
        'Documents the agreed access model and communicates it to both teams'
      ]
    },
    {
      kind: 'team',
      personaName: 'Sofia Lindgren',
      personaRole: 'IT Manager',
      situation: 'Disagreement on whether to migrate from on-premise VMware to a cloud provider for new workloads.',
      openingMessage:
        'Finance wants to move everything to AWS to reduce CapEx. The security team is concerned about data residency. Engineering wants to keep VMware for consistency. Where do you stand on this?',
      expectedPoints: [
        'Evaluates workloads individually — some are cloud-native candidates, others benefit from on-premise',
        'Addresses data residency concerns with specific cloud region and compliance controls',
        'Proposes a hybrid approach with clear criteria for which workloads go where',
        'Provides a cost comparison methodology that accounts for both CapEx and OpEx'
      ]
    },
    {
      kind: 'client',
      personaName: 'Margaret Okafor',
      personaRole: 'CFO, BrightPath Education',
      situation: 'Client wants to reduce IT costs by cutting the backup budget in half.',
      openingMessage:
        'Our CFO has mandated a 50% reduction in IT backup costs. We are spending $8,000/month on backup storage and licensing. Can you redesign our backup strategy to meet this target without unacceptable risk?',
      expectedPoints: [
        'Analyzes current backup data to identify deduplication and lifecycle optimization opportunities',
        'Proposes tiered backup storage (hot/warm/cold) with appropriate retention policies per data type',
        'Quantifies the risk reduction retained at the lower budget level versus the current setup',
        'Provides a written recommendation with cost breakdown and risk acceptance matrix'
      ]
    },
    {
      kind: 'client',
      personaName: 'James Whitfield',
      personaRole: 'VP Engineering, NovaTech Solutions',
      situation: 'Client experienced a ransomware attack and needs immediate help with recovery and prevention.',
      openingMessage:
        'We were hit by ransomware last night. Our Windows file servers are encrypted. We have backups but no one is sure if they are clean. We need help now — what do we do first?',
      expectedPoints: [
        'Isolates affected systems immediately to prevent lateral movement',
        'Assesses backup integrity before restoring — restoring infected backups re-encrypts data',
        'Provides a prioritized recovery sequence starting with the most critical business systems',
        'Recommends post-recovery hardening: endpoint detection, network segmentation, backup verification'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Incident',
      situation: 'Friday 16:45: a junior sysadmin runs a disk cleanup script on the wrong server, deleting log files from the primary database server instead of the staging server. The database relies on those logs for point-in-time recovery.',
      requiredActions: [
        { action: 'Immediately verify the database is still running and assess whether any active transactions were affected', good: true, note: 'Confirm operational status before assuming the worst — the DB may not need the deleted logs if it was idle.' },
        { action: 'Check the LVM snapshot or filesystem-level backup to recover the deleted log files', good: true, note: 'If snapshots exist, recovery is straightforward. If not, this becomes a much harder problem.' },
        { action: 'Notify the database team and document the exact scope of data lost', good: true, note: 'Transparent communication enables the DBA team to assess recovery point options.' },
        { action: 'Delete the junior admin\'s account and restrict script access to senior staff only', good: false, note: 'Punishing a mistake instead of fixing the process creates a culture of fear that prevents reporting future incidents.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'The company acquires a small firm that uses a completely different Linux distribution, different user management tools and a different backup solution. You have 30 days to integrate their 20 servers into the corporate infrastructure.',
      requiredActions: [
        { action: 'Inventory all servers documenting OS versions, running services, user accounts and backup status', good: true, note: 'You cannot integrate what you do not understand — inventory is the essential first step.' },
        { action: 'Map their user accounts to corporate Active Directory or LDAP for centralized authentication', good: true, note: 'Centralizing identity management is the highest-value integration action for security and usability.' },
        { action: 'Design a phased migration plan prioritizing servers by business criticality', good: true, note: 'Migrating all servers simultaneously is risky — start with non-critical systems to validate the approach.' },
        { action: 'Rebuild all acquired servers from scratch to eliminate unknown configurations', good: false, note: 'Rebuilding everything is a 90-day project, not a 30-day one. Pragmatic integration with documented configurations is the right approach.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between soft and hard link in Linux. When would you use each?',
      guidancePoints: [
        'Hard links share the same inode — they are indistinguishable from the original file and persist when the original is deleted',
        'Soft links (symbolic links) are pointers to a path — they break if the target is removed',
        'Hard links cannot span across filesystems; soft links can point to any path including other filesystems',
        'Use hard links for deduplication within a filesystem; use soft links for convenience and cross-filesystem references',
        'Understand that deleting the original file only removes one hard link — the data persists until all hard links are removed'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'How would you troubleshoot a Linux server where the load average is high but CPU utilization appears low?',
      guidancePoints: [
        'High load with low CPU indicates processes in uninterruptible sleep (D state) — typically waiting on I/O',
        'Check iostat for disk utilization and await times to identify I/O bottleneck',
        'Use vmstat to check the "b" (blocked) column and "si/so" (swap activity)',
        'Look for NFS mounts with high latency or unresponsive storage arrays',
        'Check dmesg for hardware errors (disk failures, NIC errors) that cause processes to block'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A Windows server is consuming 100% disk I/O but Task Manager shows no single process with high disk usage. How do you identify the cause?',
      guidancePoints: [
        'Use Resource Monitor (resmon.exe) Disk tab to see actual disk activity per process, which is more accurate than Task Manager',
        'Check for Windows Update or Windows Defender scans running in the background',
        'Use Performance Monitor to log disk queue length and identify the physical disk with highest activity',
        'Check Event Viewer for disk errors or NTFS warnings that indicate hardware issues',
        'Use Process Monitor (ProcMon) to capture file I/O operations in real time'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Your backup job completed successfully last night, but when you attempt a test restore this morning, the backup file is corrupted. What do you do?',
      guidancePoints: [
        'Attempt restore from the second most recent backup to minimize data loss',
        'Check backup logs for any warnings that were logged despite the "successful" completion status',
        'Verify the backup storage media — test the disk or tape for hardware faults',
        'Investigate whether the backup verification step was actually running and passing',
        'Implement backup verification (checksums, test restores) as a mandatory step in the backup schedule'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'Management asks you to install unauthorized software on a production server to support a deadline-driven project. The software is not approved by the security team. How do you handle this?',
      guidancePoints: [
        'Explain the risks: unauthorized software may introduce vulnerabilities, violate licensing, and void support contracts',
        'Propose alternatives: use the approved software repository, request expedited security review, or use a sandboxed environment',
        'Document the request and your response — this protects you if the issue escalates',
        'Escalate to management with a risk assessment if the deadline pressure continues',
        'Never compromise on security processes regardless of deadline pressure — the risk of a breach exceeds the risk of a missed deadline'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'You discover that a production server has not had security patches applied in 8 months because the patching process was too risky without a testing environment. What is your approach?',
      guidancePoints: [
        'Assess the current risk: identify which critical CVEs are unpatched on the server',
        'Build a lightweight testing environment — even a single VM that mirrors production configuration is better than nothing',
        'Create a phased patching plan starting with non-critical updates and progressing to kernel and security patches',
        'Implement snapshot-before-patching so each patch can be rolled back within minutes',
        'Establish a recurring patching cadence (monthly or quarterly) with testing built into the process'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain to a non-technical department head why their request to "just add more RAM" will not solve their application performance problem.',
      guidancePoints: [
        'Present data showing actual resource utilization (CPU, disk I/O, network) to demonstrate RAM is not the bottleneck',
        'Use an analogy: adding more lanes to a road does not help if the traffic lights are broken',
        'Explain what the actual bottleneck is in business terms — slow database queries, not insufficient memory',
        'Propose a performance investigation with specific deliverables and a timeline',
        'Set expectations: the real fix may take longer than adding RAM but will actually solve the problem'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'You need to inform the CEO that a misconfigured backup means the company lost two days of email data. How do you communicate this?',
      guidancePoints: [
        'Lead with the facts: what was lost, the time window, and what data remains recoverable',
        'Explain the root cause honestly without deflecting blame',
        'Present the recovery plan: what steps are being taken and when data will be fully restored',
        'Describe the preventive measures being implemented to ensure this never happens again',
        'Recommend an independent backup audit to validate the entire backup infrastructure'
      ]
    }

  ]

}
