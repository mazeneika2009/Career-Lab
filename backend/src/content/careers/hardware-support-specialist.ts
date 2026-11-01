import type { CareerDef } from '../framework.js'

export const hardwareSupportSpecialist: CareerDef = {
  slug: 'hardware-support-specialist',
  name: 'Hardware Support Specialist',
  category: 'IT & Cloud',
  order: 32,
  description:
    'Diagnoses and repairs computer hardware — CPUs, memory, storage, boards and peripherals — safely and methodically.',
  difficulty: 'Beginner-friendly',
  pathSummary:
    'PC component identification & safety → CPU, memory & firmware configuration → storage, peripherals & connectivity → hardware diagnostics, repair & documentation.',
  mainSkills: [
    'PC Component Identification',
    'ESD Safety & Handling Procedures',
    'CPU & Memory Installation',
    'BIOS/UEFI Configuration',
    'Storage Technology (HDD, SSD, NVMe)',
    'Hardware Diagnostics & Troubleshooting',
    'Component Replacement & Documentation'
  ],
  sourcePlatforms: [
    'CompTIA',
    'Intel Documentation',
    'AMD Documentation',
    'Microsoft Documentation',
    'Dell Documentation',
    'HP Documentation',
    'Lenovo Documentation'
  ],
  companyName: 'TechCore Solutions',
  roleTitle: 'Hardware Support Specialist',

  chapters: [
    {
      slug: 'pc-component-fundamentals',
      stage: 'Beginner',
      title: 'PC Component Fundamentals',
      description: 'Identifying the major hardware components inside a desktop or laptop and understanding the safety procedures required before touching them.',
      topics: [
        {
          slug: 'component-identification',
          title: 'Identifying PC Components',
          minutes: 28,
          objectives: [
            'Name and describe the function of every major internal component in a modern PC',
            'Distinguish between form factors (ATX, micro-ATX, Mini-ITX) and their physical implications',
            'Locate component connectors, slots and power headers on a typical motherboard'
          ],
          sections: [
            { heading: 'The motherboard as the central backbone', body: 'Every component in a PC connects to the motherboard. The CPU socket, DIMM slots, PCIe slots, SATA ports and M.2 connectors are all mounted on this single printed circuit board. Understanding the motherboard layout — where the VRM heatsinks sit, where the front-panel headers are, and how the chipset lanes are divided — is the first skill every hardware technician needs. A misidentified header can mean a dead component.' },
            { heading: 'Core components and their roles', body: 'The CPU executes instructions, the RAM provides fast temporary working memory, the storage drive holds persistent data, the power supply converts AC to DC rails, and the case houses and cools everything. Peripherals — keyboards, mice, monitors and printers — connect through I/O controllers on the motherboard or through expansion cards. Each component has physical and electrical characteristics you must match when replacing parts.' },
            { heading: 'Form factors and compatibility', body: 'ATX, micro-ATX and Mini-ITX define the physical dimensions and mounting-hole positions for motherboards and cases. A Mini-ITX board will fit inside an ATX case, but the reverse is not true. Similarly, ATX12V versus ATX3.0 power supplies differ in connector types and wattage distribution. Checking form factor compatibility before purchasing or installing prevents costly fitment issues.' }
          ],
          links: [
            { title: 'CompTIA A+ Core 1 — PC Hardware', url: 'https://www.comptia.org/certifications/a', sourceName: 'CompTIA', resourceType: 'guide', relationship: 'CompTIA A+ certification objectives covering PC hardware identification, components and form factors.' },
            { title: 'Dell — Inside Your PC: Component Overview', url: 'https://www.dell.com/support/kbdoc/en-us/000126498/inside-your-pc-component-overview', sourceName: 'Dell Documentation', resourceType: 'guide', relationship: 'Dell guide to identifying internal PC components and their functions in Dell desktop systems.' },
            { title: 'Lenovo — Hardware Maintenance Manual', url: 'https://pcsupport.lenovo.com/us/en/products/laptops/lenovolaptops', sourceName: 'Lenovo Documentation', resourceType: 'reference', relationship: 'Lenovo hardware maintenance manuals with exploded diagrams and component identification for Lenovo systems.' }
          ],
          quiz: {
            prompt: 'A user wants to upgrade their PC but the motherboard only has micro-ATX mounting holes. Which case form factor will physically accommodate this board?',
            options: [
              'Only a micro-ATX or larger case (ATX)',
              'Only a Mini-ITX case',
              'Any case regardless of form factor',
              'Only a full-tower ATX case'
            ],
            answerIndex: 0,
            explanation: 'Micro-ATX boards can mount in micro-ATX and larger ATX cases because ATX cases have mounting holes for multiple form factors. A Mini-ITX case is too small for a micro-ATX board.'
          }
        },
        {
          slug: 'esd-safety-procedures',
          title: 'ESD Safety & Handling Procedures',
          minutes: 25,
          objectives: [
            'Explain how electrostatic discharge damages electronic components and why grounding is essential',
            'Demonstrate proper use of an anti-static wrist strap, mat and bag when handling parts',
            'Describe safe handling procedures for sensitive components such as CPUs and RAM modules'
          ],
          sections: [
            { heading: 'How ESD damages components', body: 'Electrostatic discharge occurs when two objects with different electrical charges come close together and equalize. A static shock you feel requires about 3,000 volts, but a discharge as low as 100 volts — completely imperceptible to humans — can damage or destroy transistors inside a CPU, RAM module or SSD controller. The damage may be immediate failure or latent degradation that causes crashes weeks later. ESD is invisible, silent and one of the most common causes of mysterious hardware failures.' },
            { heading: 'Grounding and anti-static equipment', body: 'An anti-static wrist strap connects your body to the computer chassis or an earth ground via a 1-megohm resistor, continuously draining any charge buildup. An anti-static mat under the PC or on the work surface provides a controlled discharge path. Never work on carpet, never wear wool or synthetic clothing while handling components, and always keep components in their anti-static bags until the moment of installation. These habits cost nothing and prevent expensive damage.' },
            { heading: 'Component-specific handling', body: 'CPUs and RAM are the most ESD-sensitive parts in a PC. Hold a CPU by its edges — never touch the gold pads or pins on the underside. Handle RAM modules by the edges and avoid touching the gold contacts. When removing a CPU cooler, twist gently before lifting to avoid pulling the CPU out of the socket. Keep screws, standoffs and small parts in a magnetic tray so they do not fall onto the motherboard during installation.' }
          ],
          links: [
            { title: 'CompTIA A+ — ESD Prevention', url: 'https://www.comptia.org/content/a-plus-core-2-practice-questions', sourceName: 'CompTIA', resourceType: 'guide', relationship: 'CompTIA A+ exam content covering ESD prevention, grounding and component handling safety.' },
            { title: 'Intel — Processor Installation Best Practices', url: 'https://www.intel.com/content/www/us/en/support/articles/000006860/processors.html', sourceName: 'Intel Documentation', resourceType: 'guide', relationship: 'Intel official guidance on safely handling and installing Intel CPUs without ESD damage.' },
            { title: 'HP — Service Handling Precautions', url: 'https://support.hp.com/us-en/document/c03656592', sourceName: 'HP Documentation', resourceType: 'reference', relationship: 'HP service manual with ESD handling precautions and component static-safety procedures.' }
          ],
          quiz: {
            prompt: 'You are about to install a new RAM module. Which of the following practices best prevents ESD damage?',
            options: [
              'Touch the PC case periodically to discharge static before handling the module',
              'Wear an anti-static wrist strap connected to ground and handle the module by its edges without touching the gold contacts',
              'Work on a carpeted floor while wearing rubber-soled shoes',
              'Place the module directly on the desk surface before installation'
            ],
            answerIndex: 1,
            explanation: 'An anti-static wrist strap provides continuous grounding, and handling by edges avoids contact with sensitive gold pads. Touching the case occasionally is not reliable grounding, and carpet increases ESD risk significantly.'
          }
        },
        {
          slug: 'motherboard-architecture',
          title: 'Motherboard Architecture & Connectors',
          minutes: 30,
          objectives: [
            'Describe the role of the chipset, VRM and expansion slots on a motherboard',
            'Identify SATA, M.2, front-panel, USB and power connectors by shape and pin layout',
            'Explain how PCIe lane allocation affects bandwidth available to graphics cards, NVMe drives and other devices'
          ],
          sections: [
            { heading: 'Chipset and bus architecture', body: 'The chipset divides motherboard lanes between the CPU and peripheral devices. On Intel platforms, the Z-series chipsets provide more PCIe lanes and overclocking support than B-series. On AMD, X-series boards offer more M.2 slots and USB ports than B-series. The chipset also controls how many SATA ports, USB headers and PCIe slots are available. Understanding lane allocation prevents the common surprise of an NVMe drive disabling two SATA ports when installed in a shared M.2 slot.' },
            { heading: 'Power delivery and VRM', body: 'The voltage regulator module converts the 12V power supply rail into the precise voltages the CPU and memory require. A motherboard with more VRM phases delivers cleaner, more stable power — critical for sustained workloads and overclocking. When troubleshooting random reboots under load, the VRM is an early suspect. Checking VRM temperatures with a thermal camera or sensor reveals whether the power delivery is being stressed beyond its design limits.' },
            { heading: 'Expansion slots and connectors', body: 'PCIe x16 slots deliver up to 64 GB/s of bandwidth in PCIe 5.0 for graphics cards. PCIe x1 and x4 slots accommodate Wi-Fi cards, NVMe adapters and additional storage controllers. SATA III ports connect 2.5-inch and 3.5-inch drives at 6 Gbps. The front-panel header connects the power button, reset switch, power LED and hard drive LED to the motherboard — getting these pins wrong means the system will not power on at all. Reference the motherboard manual for the exact pinout before connecting.' }
          ],
          links: [
            { title: 'Intel — Desktop Motherboard Chipset Comparison', url: 'https://www.intel.com/content/www/us/en/products/sku/series/700/intel-700-chipset.html', sourceName: 'Intel Documentation', resourceType: 'reference', relationship: 'Intel 700-series chipset specifications including PCIe lane count, USB ports and SATA connectivity.' },
            { title: 'AMD — AM5 Chipset Specifications', url: 'https://www.amd.com/en/products/processors/chipsets/am5.html', sourceName: 'AMD Documentation', resourceType: 'reference', relationship: 'AMD AM5 chipset lineup with PCIe lane allocation, M.2 support and feature matrix.' },
            { title: 'Dell — Motherboard Connector Reference', url: 'https://www.dell.com/support/kbdoc/en-us/000131931/how-to-identify-the-ports-and-connectors-on-your-dell-system', sourceName: 'Dell Documentation', resourceType: 'guide', relationship: 'Dell visual guide to identifying port types, connector shapes and cable routing on Dell desktops.' }
          ],
          quiz: {
            prompt: 'A user installs an NVMe SSD in the M.2_2 slot on their B660 motherboard and discovers that SATA ports 3 and 4 stopped working. What is the most likely cause?',
            options: [
              'The NVMe drive is defective and is corrupting the SATA bus',
              'The M.2_2 slot shares PCIe lanes with SATA ports 3 and 4, and populating it disables those ports',
              'The SATA cables are loose from the vibration of the NVMe installation',
              'The BIOS needs to be updated to support NVMe'
            ],
            answerIndex: 1,
            explanation: 'Many motherboards share bandwidth between M.2 slots and SATA ports. The B660 chipset has limited lanes, so using M.2_2 disables the SATA ports wired to those same lanes. Always check the motherboard manual for lane-sharing rules.'
          }
        }
      ]
    },
    {
      slug: 'processor-memory-firmware',
      stage: 'Foundation',
      title: 'Processor, Memory & Firmware',
      description: 'Deep-dive into CPU installation and thermal management, RAM configuration and the BIOS/UEFI firmware setup process.',
      topics: [
        {
          slug: 'cpu-architecture-installation',
          title: 'CPU Architecture & Installation',
          minutes: 30,
          objectives: [
            'Compare Intel and AMD CPU socket types and explain the key physical differences',
            'Install a CPU into an LGA or PGA socket following proper alignment and retention procedures',
            'Apply thermal paste correctly and mount a CPU cooler ensuring even pressure distribution'
          ],
          sections: [
            { heading: 'Socket types and pin layouts', body: 'Intel modern desktop CPUs use LGA (Land Grid Array) sockets where the pins are in the motherboard socket and the CPU has flat gold pads. AMD Ryzen desktop CPUs historically used PGA (Pin Grid Array) with pins on the CPU, though AM5 moved to LGA. The socket dictates which CPUs are compatible — you cannot physically install an AM5 CPU in an AM4 socket, and an Intel 12th-gen CPU will not fit an 11th-gen LGA1200 socket. Always verify socket compatibility before purchasing.' },
            { heading: 'Installation technique', body: 'Open the CPU socket retention lever, align the CPU using the golden triangle marker (AMD) or the corner notches (Intel), and gently lower it straight down without sliding. Close the retention lever — on Intel LGA sockets this requires significant force, which is normal. For PGA sockets, the CPU should drop into place with zero insertion force. Never force a CPU into a socket. If it does not sit flush, recheck the orientation markers.' },
            { heading: 'Thermal management', body: 'A pea-sized dot of thermal paste in the center of the CPU heat spreader is sufficient for most coolers. The mounting pressure spreads it evenly. Too much paste can overflow onto the motherboard; too little leaves air gaps that reduce heat transfer. After mounting, verify temperatures under load using monitoring software — idle temperatures of 30–40°C and load temperatures under 85°C are typical for air cooling. Consistently high temperatures indicate improper cooler mounting or degraded thermal paste.' }
          ],
          links: [
            { title: 'Intel — CPU Installation Guide for LGA 1700', url: 'https://www.intel.com/content/www/us/en/support/articles/000006751/processors.html', sourceName: 'Intel Documentation', resourceType: 'guide', relationship: 'Intel step-by-step guide for installing 12th and 13th generation CPUs into LGA 1700 sockets.' },
            { title: 'AMD — Ryzen Processor Installation Guide', url: 'https://www.amd.com/en/support/kb/faq/101', sourceName: 'AMD Documentation', resourceType: 'guide', relationship: 'AMD official instructions for installing Ryzen processors into AM4 and AM5 sockets.' },
            { title: 'CompTIA A+ — CPU and Cooling', url: 'https://www.comptia.org/certifications/a', sourceName: 'CompTIA', resourceType: 'guide', relationship: 'CompTIA A+ objectives covering CPU types, sockets and cooling system installation.' }
          ],
          quiz: {
            prompt: 'A customer complains their new PC randomly shuts down under heavy gaming load. CPU idle temperature is 35°C but peaks at 98°C during gaming. What is the most likely cause?',
            options: [
              'The power supply is insufficient for the GPU',
              'The CPU cooler is not making proper contact or thermal paste is incorrectly applied',
              'The BIOS needs a firmware update',
              'The RAM is not configured in dual-channel mode'
            ],
            answerIndex: 1,
            explanation: 'A peak temperature of 98°C triggers thermal throttling and protective shutdowns. Idle temperature is normal, which means the cooler is mounted but not transferring heat effectively under load — usually due to uneven mounting pressure or insufficient thermal paste.'
          }
        },
        {
          slug: 'memory-types-configuration',
          title: 'Memory Types & Configuration',
          minutes: 30,
          objectives: [
            'Explain the differences between DDR4, DDR5 and their speed ratings, voltage and physical notch positions',
            'Configure dual-channel and quad-channel memory correctly using the correct DIMM slot order',
            'Diagnose common memory errors using beep codes, BIOS messages and memtest86'
          ],
          sections: [
            { heading: 'DDR4 versus DDR5', body: 'DDR4 operates at 1.2V with speeds ranging from 2133 to 3200 MHz natively, while DDR5 runs at 1.1V with native speeds starting at 4800 MHz. The physical notch is in a different position on DDR5, preventing accidental installation into DDR4 slots. DDR5 includes on-module power management (PMIC) and error correction on each module. When replacing memory, you must match the DDR generation to the motherboard — they are not interchangeable.' },
            { heading: 'Dual-channel and slot configuration', body: 'Dual-channel memory doubles the data bus width from 64-bit to 128-bit by using two matched modules in the correct slots. Most motherboards require DIMMs to be installed in slots A2 and B2 first (the second and fourth slots from the CPU) for dual-channel operation. Installing two modules in adjacent slots typically runs them in single-channel mode, halving memory bandwidth. For four DIMMs, every slot is populated and dual-channel is automatically engaged.' },
            { heading: 'Memory errors and diagnostics', body: 'Frequent blue screens, application crashes and boot failures often point to faulty memory. Beep codes on POST — typically one long and three short beeps — indicate a memory error on many platforms. Running memtest86 from a USB drive performs comprehensive read/write/verify passes across all memory addresses. If errors appear in a specific address range, the corresponding DIMM is defective and should be replaced. Memory errors can also result from dirty contacts — cleaning with isopressure alcohol sometimes resolves intermittent faults.' }
          ],
          links: [
            { title: 'Crucial — DDR4 vs DDR5 Comparison', url: 'https://www.crucial.com/memory/ddr5/ddr5-ddr4-comparison', sourceName: 'CompTIA', resourceType: 'reference', relationship: 'Technical comparison of DDR4 and DDR5 specifications, performance and compatibility.' },
            { title: 'Intel — Memory Configuration Guide', url: 'https://www.intel.com/content/www/us/en/support/articles/000005803/processors.html', sourceName: 'Intel Documentation', resourceType: 'reference', relationship: 'Intel guidance on DIMM slot population order for dual-channel and quad-channel configurations.' },
            { title: 'Dell — Memory Troubleshooting', url: 'https://www.dell.com/support/kbdoc/en-us/000175639/how-to-troubleshoot-memory-issues', sourceName: 'Dell Documentation', resourceType: 'guide', relationship: 'Dell troubleshooting guide for diagnosing and resolving memory errors on Dell systems.' }
          ],
          quiz: {
            prompt: 'A technician installs two DDR5-5600 DIMMs in slots A1 and B1 on a dual-channel motherboard. Memory bandwidth tests show single-channel performance. What is wrong?',
            options: [
              'The DDR5 modules are defective',
              'The modules are in the wrong slots — they should be in A2 and B2 for dual-channel operation',
              'The BIOS does not support DDR5-5600 speeds',
              'Dual-channel is not supported with only two DIMMs'
            ],
            answerIndex: 1,
            explanation: 'Most motherboards require the second and fourth slots (A2 and B2) to be populated first for dual-channel. Populating A1 and B1 (adjacent slots) puts both modules in the same channel, resulting in single-channel operation.'
          }
        },
        {
          slug: 'bios-uefi-firmware-setup',
          title: 'BIOS/UEFI Firmware Setup',
          minutes: 28,
          objectives: [
            'Navigate the UEFI firmware interface and identify key configuration menus and options',
            'Configure boot order, Secure Boot and TPM settings required for Windows 11',
            'Update BIOS firmware safely using the manufacturer-provided utility or built-in flash tool'
          ],
          sections: [
            { heading: 'BIOS versus UEFI', body: 'Legacy BIOS uses a text-only interface with limited mouse support, while UEFI provides a graphical interface with mouse navigation, network boot support and faster initialization. All modern motherboards use UEFI, though they often include a Compatibility Support Module (CSM) for legacy BIOS emulation. UEFI stores settings on a flash chip that persists without a battery, unlike the CMOS battery that maintained legacy BIOS settings. Accessing the firmware setup is typically done by pressing Delete, F2 or F12 during POST.' },
            { heading: 'Essential UEFI configurations', body: 'The boot order menu determines which device the system attempts to boot from first — set it to the NVMe or SATA SSD for normal operation, or to a USB drive when installing an operating system. Secure Boot verifies that only signed bootloaders execute, preventing rootkits from loading before the OS. TPM (Trusted Platform Module) 2.0 is required for Windows 11 and BitLocker encryption. Enabling these settings in the correct order — TPM first, then Secure Boot, then setting the boot device — prevents boot loops.' },
            { heading: 'BIOS firmware updates', body: 'Firmware updates fix bugs, add CPU support and patch security vulnerabilities like Spectre and Meltdown. Download the correct BIOS file from the motherboard manufacturer\'s support page — using a BIOS file from a different revision or manufacturer can brick the board. Update using the built-in flash utility (often found under the "Tool" menu), a bootable USB with the manufacturer\'s update tool, or through Windows-based utilities provided by Dell, HP or Lenovo. Never power off during a BIOS update — a failed flash can render the motherboard unbootable.' }
          ],
          links: [
            { title: 'Microsoft — UEFI Firmware and Secure Boot', url: 'https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/uefi', sourceName: 'Microsoft Documentation', resourceType: 'reference', relationship: 'Microsoft documentation on UEFI firmware configuration, Secure Boot and Windows compatibility requirements.' },
            { title: 'Lenovo — BIOS Update Instructions', url: 'https://pcsupport.lenovo.com/us/en/solutions/ht500222-how-to-enter-bios-setup-on-lenovo-laptops', sourceName: 'Lenovo Documentation', resourceType: 'guide', relationship: 'Lenovo guide to accessing BIOS setup and performing firmware updates on ThinkPad and IdeaPad systems.' },
            { title: 'HP — BIOS Configuration Guide', url: 'https://support.hp.com/us-en/document/c04784151', sourceName: 'HP Documentation', resourceType: 'reference', relationship: 'HP reference for configuring BIOS settings including boot order, TPM and Secure Boot on HP systems.' }
          ],
          quiz: {
            prompt: 'A user wants to install Windows 11 but the installer reports the PC does not meet system requirements. The system has a compatible CPU and 16 GB RAM. What is the most likely missing requirement?',
            options: [
              'The hard drive is too small',
              'TPM 2.0 is not enabled in the UEFI firmware settings',
              'The system only has DDR3 memory',
              'The monitor resolution is too low'
            ],
            answerIndex: 1,
            explanation: 'Windows 11 requires TPM 2.0, which is often present on modern motherboards but disabled by default in UEFI settings. Enabling fTPM (Intel Platform Trust Technology or AMD fTPM) in the firmware resolves the requirement.'
          }
        }
      ]
    },
    {
      slug: 'storage-peripherals-connectivity',
      stage: 'Intermediate',
      title: 'Storage, Peripherals & Connectivity',
      description: 'Working with hard drives, SSDs and NVMe devices, plus display outputs, USB standards and peripheral connectivity.',
      topics: [
        {
          slug: 'storage-technologies',
          title: 'Storage Technologies — HDD, SSD, NVMe',
          minutes: 30,
          objectives: [
            'Compare HDD, SATA SSD and NVMe SSD in terms of speed, reliability and physical interface',
            'Install an M.2 NVMe SSD and a 2.5-inch SATA SSD, configuring the BIOS to recognize both',
            'Explain how TRIM, wear leveling and SMART data help monitor and maintain SSD health'
          ],
          sections: [
            { heading: 'HDD versus SSD performance', body: 'A spinning hard drive reads data using a mechanical arm across a rotating platter, achieving 80–160 MB/s sequential throughput with 5–10ms access times. A SATA SSD uses NAND flash with no moving parts, reaching 500–560 MB/s with sub-millisecond access. An NVMe SSD communicates over PCIe lanes, reaching 3,500–14,000 MB/s depending on the generation. The performance difference is dramatic: OS boot times drop from 60 seconds on HDD to under 10 seconds on NVMe. For any user-facing workload, SSDs eliminate the storage bottleneck entirely.' },
            { heading: 'Physical installation and BIOS configuration', body: 'M.2 NVMe drives install flat against the motherboard at a 30-degree angle, then screw down into the standoff. SATA SSDs connect with a 7-pin data cable and a 15-pin power connector from the power supply. When both are installed, the BIOS boot order must list the NVMe drive first. Some motherboards disable SATA ports when the M.2 slot is populated — verify lane sharing in the manual. After installation, initialize the drive in Windows Disk Management or use diskpart to create partitions.' },
            { heading: 'SSD health and maintenance', body: 'TRIM is a command the operating system sends to an SSD indicating which data blocks are no longer in use, allowing the drive to pre-erase them and maintain write performance. Wear leveling distributes writes evenly across NAND cells to prevent premature failure of heavily-written blocks. S.M.A.R.T. (Self-Monitoring, Analysis and Reporting Technology) data reports drive health metrics including reallocated sectors, temperature and remaining lifespan. Monitoring SMART data with tools like CrystalDiskInfo catches failing drives before data loss occurs.' }
          ],
          links: [
            { title: 'Samsung — NVMe SSD Installation Guide', url: 'https://semiconductor.samsung.com/consumer-storage/support/', sourceName: 'CompTIA', resourceType: 'guide', relationship: 'Samsung support articles covering NVMe SSD installation, firmware updates and health monitoring.' },
            { title: 'Intel — NVMe Storage Performance Guide', url: 'https://www.intel.com/content/www/us/en/products/docs/memory-storage/solid-state-drives/nvme-overview.html', sourceName: 'Intel Documentation', resourceType: 'reference', relationship: 'Intel explanation of NVMe protocol benefits and performance characteristics compared to SATA.' },
            { title: 'Dell — Installing Storage Drives', url: 'https://www.dell.com/support/kbdoc/en-us/000126516/how-to-install-a-hard-drive-or-ssd-in-your-dell-desktop', sourceName: 'Dell Documentation', resourceType: 'guide', relationship: 'Dell step-by-step guide for installing 2.5-inch and 3.5-inch storage drives in Dell desktop systems.' }
          ],
          quiz: {
            prompt: 'A user has a 1 TB NVMe SSD and a 2 TB SATA SSD installed. After installing the NVMe drive, the SATA SSD is no longer detected in BIOS. What should you check first?',
            options: [
              'Whether the SATA SSD has failed',
              'The motherboard manual for M.2 and SATA port lane-sharing rules',
              'Whether the SATA data cable is connected',
              'The Windows Disk Management utility'
            ],
            answerIndex: 1,
            explanation: 'Many motherboards share PCIe lanes between the M.2 NVMe slot and specific SATA ports. When the M.2 slot is populated, the shared SATA ports are disabled. The motherboard manual documents which SATA ports are affected.'
          }
        },
        {
          slug: 'display-graphics-hardware',
          title: 'Display & Graphics Hardware',
          minutes: 25,
          objectives: [
            'Compare HDMI, DisplayPort and VGA connectors in terms of resolution, refresh rate and bandwidth',
            'Install a discrete graphics card, including removing the PCIe slot cover and connecting power cables',
            'Troubleshoot a no-display scenario using POST beeps, cable swapping and monitor self-test'
          ],
          sections: [
            { heading: 'Video connector standards', body: 'HDMI 2.1 supports up to 4K at 120 Hz or 8K at 60 Hz with audio. DisplayPort 2.1 supports up to 8K at 160 Hz and daisy-chaining multiple monitors from a single output. VGA is an analog standard limited to 1080p and is being phased out. The connector you use determines the maximum resolution and refresh rate your monitor can display — plugging a 4K 144Hz monitor into a VGA cable caps the experience at 1080p 60Hz regardless of the GPU capability.' },
            { heading: 'Discrete GPU installation', body: 'Power off the system and disconnect the power cable before opening the case. Remove the appropriate PCIe slot covers from the rear of the case, align the GPU with the PCIe x16 slot, and press firmly until the retention clip clicks. Connect the required PCIe power cables from the power supply — modern GPUs may require two or three 8-pin connectors or a single 12VHPWR connector. Secure the GPU bracket with screws. On first boot, the BIOS may default to the integrated GPU; enter BIOS and set the primary display to PCIe to ensure the discrete card is used.' },
            { heading: 'No-display troubleshooting', body: 'When a system powers on but shows no image, start with the basics: verify the monitor is on and set to the correct input, swap the video cable, and test the monitor with another device. Check for POST beep codes — a pattern of beeps indicates a specific hardware failure. If the system has both integrated and discrete graphics, try connecting to the motherboard video output to rule out a GPU failure. Reseating the GPU and RAM often resolves contact issues that cause blank screens after transport.' }
          ],
          links: [
            { title: 'NVIDIA — GPU Installation Guide', url: 'https://www.nvidia.com/en-us/geforce/guides/how-to-install-geforce-graphics-card/', sourceName: 'CompTIA', resourceType: 'guide', relationship: 'NVIDIA guide to safely installing a discrete graphics card into a desktop PC.' },
            { title: 'AMD — Radeon GPU Troubleshooting', url: 'https://www.amd.com/en/support/kb/faq/gpu-702', sourceName: 'AMD Documentation', resourceType: 'reference', relationship: 'AMD troubleshooting steps for display issues related to Radeon graphics cards.' },
            { title: 'HP — Video Output Troubleshooting', url: 'https://support.hp.com/us-en/document/c01655364', sourceName: 'HP Documentation', resourceType: 'guide', relationship: 'HP diagnostic guide for resolving no-display and video output issues on HP desktops and laptops.' }
          ],
          quiz: {
            prompt: 'A user connects a brand-new 4K 144Hz gaming monitor to their RTX 4070 using a VGA cable. The monitor displays at 1080p 60Hz only. What is the problem?',
            options: [
              'The monitor is defective',
              'VGA is an analog standard that cannot carry 4K 144Hz signals; a DisplayPort or HDMI 2.1 cable is required',
              'The GPU drivers are not installed',
              'The monitor needs a firmware update'
            ],
            answerIndex: 1,
            explanation: 'VGA is limited to 1080p at 60Hz maximum. To achieve 4K 144Hz, the user needs a DisplayPort 1.4+ or HDMI 2.1 cable, both of which support the required bandwidth.'
          }
        },
        {
          slug: 'usb-peripheral-connectivity',
          title: 'USB Standards & Peripheral Connectivity',
          minutes: 28,
          objectives: [
            'Distinguish between USB 2.0, 3.0, 3.1, 3.2 and USB-C in terms of speed, power and connector type',
            'Troubleshoot a peripheral device that is not recognized by the operating system',
            'Configure device drivers and Windows Device Manager to resolve hardware conflicts'
          ],
          sections: [
            { heading: 'USB speed and connector generations', body: 'USB 2.0 (black port) delivers 480 Mbps and 500mA. USB 3.0/3.1 Gen 1 (blue port) delivers 5 Gbps and 900mA. USB 3.2 Gen 2 delivers 10 Gbps. USB4 and Thunderbolt 4 share the USB-C connector and reach 40 Gbps. The connector type (Type-A, Type-B, micro-USB, USB-C) is separate from the speed standard — a USB-C port can be wired to USB 2.0 or USB4 depending on the controller. Checking the port color and the controller specification prevents assumptions about performance.' },
            { heading: 'Device recognition failures', body: 'When a USB device is not recognized, start with the physical layer: try a different port, check for bent or recessed pins, and test the device on another PC. In Device Manager, look for devices with a yellow exclamation mark under "Other devices" — this indicates a missing driver. Uninstalling the device and scanning for hardware changes forces Windows to re-enumerate the USB bus. If multiple devices fail on the same port, the USB controller or its driver may be faulty.' },
            { heading: 'Driver management in Device Manager', body: 'Windows Device Manager lists every hardware device and its driver status. Right-clicking a device and selecting "Update driver" searches Windows Update for a newer version. The "Roll back driver" option reverts to the previous version if an update caused problems. For persistent conflicts, the Resources tab shows IRQ and memory address assignments — two devices sharing an IRQ can cause intermittent failures. Downloading drivers directly from the manufacturer (Dell, HP, Lenovo) rather than relying on Windows Update ensures you get the latest validated version for your specific model.' }
          ],
          links: [
            { title: 'Microsoft — USB Troubleshooting in Windows', url: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/usbcon/usb-driver-development-guide', sourceName: 'Microsoft Documentation', resourceType: 'reference', relationship: 'Microsoft documentation on USB driver architecture and troubleshooting unrecognized devices.' },
            { title: 'Lenovo — USB Port and Device Troubleshooting', url: 'https://pcsupport.lenovo.com/us/en/solutions/ht507605-usb-port-not-working-on-windows', sourceName: 'Lenovo Documentation', resourceType: 'guide', relationship: 'Lenovo troubleshooting steps for resolving USB device recognition failures on ThinkPad laptops.' },
            { title: 'HP — USB Device Not Recognized', url: 'https://support.hp.com/us-en/document/c03656592', sourceName: 'HP Documentation', resourceType: 'guide', relationship: 'HP support article for diagnosing USB device recognition issues on HP desktops and docking stations.' }
          ],
          quiz: {
            prompt: 'A USB 3.0 external hard drive works fine on a colleague\'s laptop but is not recognized on your desktop. Device Manager shows "Unknown USB Device (Device Descriptor Request Failed)" under Other Devices. What is the first troubleshooting step?',
            options: [
              'Replace the hard drive',
              'Try a different USB port — the current port may have damaged pins or the USB controller needs re-enumeration',
              'Reinstall the operating system',
              'Purchase a USB 3.0 hub'
            ],
            answerIndex: 1,
            explanation: 'A failed device descriptor request means the USB controller could not read the device\'s identification data. This is most commonly caused by a faulty port, damaged cable or the USB controller needing a reset — trying a different port is the fastest diagnostic step.'
          }
        }
      ]
    },
    {
      slug: 'diagnostics-repair-documentation',
      stage: 'Advanced',
      title: 'Diagnostics, Repair & Documentation',
      description: 'Using diagnostic tools and structured troubleshooting methodologies to identify and resolve hardware failures, then documenting repairs for audit trails.',
      topics: [
        {
          slug: 'diagnostic-tools-testing',
          title: 'Hardware Diagnostic Tools & Testing',
          minutes: 30,
          objectives: [
            'Use built-in manufacturer diagnostics (Dell ePSA, HP PC Hardware Diagnostics, Lenovo Vantage) to isolate faulty components',
            'Interpret POST code readouts, beep codes and LED indicator patterns to narrow down hardware failures',
            'Run memtest86, CrystalDiskInfo and FurMark to stress-test individual components'
          ],
          sections: [
            { heading: 'Manufacturer built-in diagnostics', body: 'Dell systems include ePSA (Enhanced Pre-boot System Assessment) accessible by pressing F12 during boot. It tests CPU, memory, storage, display and USB in sequence. HP PC Hardware Diagnostics runs from UEFI or a USB drive and logs error codes for later reference. Lenovo Vantage provides Windows-based hardware scans and firmware updates. Running these diagnostics before opening the case identifies the failing component and avoids unnecessary disassembly. Document the error code — it maps directly to a replacement part number in the manufacturer\'s service manual.' },
            { heading: 'POST codes and indicator patterns', body: 'When a system cannot complete POST, it communicates the failure through audible beep codes or visual LED patterns. A single short beep means successful POST. One long and two short beeps typically indicate a display adapter failure. Three short beeps signal a base 64K RAM failure. Dell OptiPlex systems use an LED blink pattern — two amber, one white means CPU failure. Recording these codes before resetting the system is critical because clearing CMOS or reseating components may reset the indicators.' },
            { heading: 'Stress testing individual components', body: 'Memtest86 runs from a bootable USB and performs read/write/verify passes across all memory addresses — a minimum of four passes (typically 2–3 hours) provides high confidence in RAM stability. CrystalDiskInfo reads SMART data to predict drive failure before it happens. FurMark pushes the GPU to maximum thermal load — if the GPU crashes or artifacts appear within minutes, the card or its cooling is faulty. CPU-Z or HWiNFO monitors temperatures and voltages during stress tests to correlate failures with thermal or power delivery issues.' }
          ],
          links: [
            { title: 'Dell — ePSA Pre-boot System Assessment', url: 'https://www.dell.com/support/kbdoc/en-us/000126523/how-to-run-dell-supportassist-pre-boot-system-assessment', sourceName: 'Dell Documentation', resourceType: 'guide', relationship: 'Dell instructions for running ePSA diagnostics to test hardware components before the OS loads.' },
            { title: 'HP — PC Hardware Diagnostics', url: 'https://support.hp.com/us-en/document/c02684653', sourceName: 'HP Documentation', resourceType: 'reference', relationship: 'HP documentation for running UEFI-based hardware diagnostics on HP computers.' },
            { title: 'Lenovo — Lenovo Vantage Hardware Scan', url: 'https://pcsupport.lenovo.com/us/en/solutions/ht507710-lenovo-vantage-hardware-scan', sourceName: 'Lenovo Documentation', resourceType: 'guide', relationship: 'Lenovo guide for running hardware scans and firmware updates through the Lenovo Vantage application.' }
          ],
          quiz: {
            prompt: 'A Dell OptiPlex desktop powers on but shows no display. The power LED blinks two amber then one white. According to Dell\'s diagnostic codes, what does this pattern indicate?',
            options: [
              'Memory failure',
              'CPU failure — the processor is faulty or not seated properly',
              'Hard drive failure',
              'Power supply failure'
            ],
            answerIndex: 1,
            explanation: 'Dell blink code two amber one white specifically indicates a CPU failure. The CPU may be unseated, have damaged pins in the LGA socket, or be thermally throttling due to a cooler mounting issue.'
          }
        },
        {
          slug: 'structured-troubleshooting',
          title: 'Structured Troubleshooting Methodology',
          minutes: 30,
          objectives: [
            'Apply the CompTIA 7-step troubleshooting methodology to real-world hardware scenarios',
            'Use a process of elimination to isolate the failing component without replacing working parts',
            'Determine when a component should be repaired versus replaced based on cost and availability'
          ],
          sections: [
            { heading: 'The seven-step methodology', body: 'The CompTIA troubleshooting methodology provides a repeatable process: (1) identify the problem by gathering information from the user and observing symptoms, (2) establish a theory of probable cause by questioning the obvious, (3) test the theory to determine the cause, (4) establish a plan of action, (5) implement the solution or escalate, (6) verify full system functionality, and (7) document findings and outcomes. Skipping steps — particularly jumping straight to a replacement — wastes time and parts when the root cause is a loose cable or a misconfigured BIOS setting.' },
            { heading: 'Process of elimination', body: 'When a PC fails to boot, do not replace components randomly. Start with the most probable and least invasive checks: is the power cable connected, is the PSU switch on, are all power connectors seated. Then check POST beeps, reseat RAM and GPU, clear CMOS, test with known-good components. Each step eliminates one possible cause. By the time you replace a part, you should have already ruled out every other possibility through testing. This approach minimizes unnecessary returns of working parts and gives you evidence-based confidence in your diagnosis.' },
            { heading: 'Repair versus replace decisions', body: 'A failed capacitor on a motherboard can be replaced by a technician with soldering skills for a few cents. A failed GPU core requires board-level repair that exceeds the cost of a replacement card. The decision depends on component cost, labor time, warranty status and whether a replacement is readily available. For enterprise environments, keep critical spare parts (PSUs, RAM kits, NICs) on hand to minimize downtime. For consumer repairs, a $15 replacement power supply always beats $50 of diagnostic time on a suspect unit.' }
          ],
          links: [
            { title: 'CompTIA — Troubleshooting Methodology', url: 'https://www.comptia.org/content/a-plus-core-2-practice-questions', sourceName: 'CompTIA', resourceType: 'guide', relationship: 'CompTIA A+ exam content detailing the seven-step hardware and software troubleshooting methodology.' },
            { title: 'Dell — Troubleshooting Desktop Not Powering On', url: 'https://www.dell.com/support/kbdoc/en-us/000131940/dell-desktop-does-not-power-on', sourceName: 'Dell Documentation', resourceType: 'guide', relationship: 'Dell step-by-step guide for troubleshooting desktop PCs that fail to power on or complete POST.' },
            { title: 'HP — Troubleshooting Startup Issues', url: 'https://support.hp.com/us-en/document/c04784151', sourceName: 'HP Documentation', resourceType: 'guide', relationship: 'HP guide for diagnosing startup failures using diagnostic codes, LED patterns and component isolation.' }
          ],
          quiz: {
            prompt: 'A PC powers on, fans spin, but no display appears. After ruling out the monitor, cables and GPU, you reseat the RAM and the system works. What step of the seven-step methodology did this follow?',
            options: [
              'Step 1 — Identify the problem',
              'Step 3 — Test the theory by reseating RAM to confirm a contact issue was the cause',
              'Step 6 — Verify functionality after the fix',
              'Step 7 — Document the findings'
            ],
            answerIndex: 1,
            explanation: 'Reseating the RAM tested the theory that a poor memory contact was causing the no-display condition. The fix confirmed the theory and restored functionality, which is step 3 of the CompTIA methodology.'
          }
        },
        {
          slug: 'repair-documentation-asset-tracking',
          title: 'Repair Documentation & Asset Tracking',
          minutes: 25,
          objectives: [
            'Write a clear repair ticket that documents the reported issue, diagnostic steps, root cause and resolution',
            'Use an asset management system to track hardware inventory, warranty status and service history',
            'Explain how repair documentation supports warranty claims, audits and recurring issue identification'
          ],
          sections: [
            { heading: 'Writing effective repair tickets', body: 'A good repair ticket answers four questions: what the user reported, what you tested, what you found, and what you did about it. Include the asset tag or serial number, the specific components involved, part numbers for replacements and the date. Avoid vague statements like "worked fine after reset" — instead write "reseated DIMM A2, ran memtest86 for 4 passes with zero errors, stress-tested under load for 30 minutes with no crashes." Specific documentation lets the next technician pick up exactly where you left off.' },
            { heading: 'Asset management systems', body: 'Every PC, laptop, monitor and peripheral should have a unique asset tag that links to a record containing: serial number, purchase date, warranty expiration, assigned user, location and service history. CMDB (Configuration Management Database) systems like ServiceNow or Snipe-IT track this information. When a component is replaced, the asset record is updated with the new part number and date. This data drives warranty claims, procurement decisions and fleet refresh planning — without it, you are guessing about the age and support status of every device.' },
            { heading: 'Documentation as a business tool', body: 'Repair documentation is not just for technicians. Warranty claims require proof of failure and the steps taken to diagnose it — manufacturers reject claims without diagnostic evidence. Audit trails prove that security-sensitive hardware was handled correctly. Trending analysis across repair tickets reveals systemic issues: if 15 of 100 identical laptops need hard drive replacement within 18 months, that model has a defect and should be replaced under warranty fleet-wide. Good documentation transforms reactive repairs into proactive fleet management.' }
          ],
          links: [
            { title: 'CompTIA A+ — Documentation Best Practices', url: 'https://www.comptia.org/certifications/a', sourceName: 'CompTIA', resourceType: 'guide', relationship: 'CompTIA A+ objectives covering professional documentation, communication and asset management.' },
            { title: 'Dell — Warranty and Service Tag Lookup', url: 'https://www.dell.com/support/home/en-us', sourceName: 'Dell Documentation', resourceType: 'reference', relationship: 'Dell support portal for checking warranty status by service tag and filing warranty claims.' },
            { title: 'Lenovo — Warranty Lookup and Support', url: 'https://pcsupport.lenovo.com/us/en/warranty-lookup', sourceName: 'Lenovo Documentation', resourceType: 'reference', relationship: 'Lenovo warranty lookup tool for checking coverage status and initiating warranty service requests.' }
          ],
          quiz: {
            prompt: 'A technician replaces a faulty motherboard and writes in the ticket: "Fixed computer. New motherboard installed. Works now." What critical information is missing?',
            options: [
              'The technician\'s name — the ticket auto-populates it',
              'The original reported symptom, diagnostic steps taken to isolate the motherboard as the cause, the old and new part numbers, and verification testing performed',
              'Nothing — the ticket is sufficient for basic documentation',
              'Only the replacement part number is needed'
            ],
            answerIndex: 1,
            explanation: 'An effective repair ticket must document the reported issue, diagnostic evidence that isolated the root cause, part numbers for both removed and installed components, and verification that the system is fully functional after the repair. This information is essential for warranty tracking, audit trails and future troubleshooting.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'PC Hardware Diagnosis & Repair Practical',
    coverage: [
      'Component Identification & ESD Safety',
      'CPU, Memory & Storage Installation',
      'BIOS/UEFI Configuration',
      'Hardware Diagnostics & Stress Testing',
      'Structured Troubleshooting Methodology',
      'Repair Documentation & Asset Tracking'
    ],
    brief:
      'You are a hardware support specialist at TechCore Solutions. A customer returns a desktop PC that randomly crashes during video editing, occasionally fails to boot entirely, and has not been serviced in three years. Diagnose the root cause using structured troubleshooting, replace faulty components, configure firmware settings, stress-test the repaired system and produce a complete repair documentation package.',
    requirements: [
      'Perform a visual inspection for dust buildup, bulging capacitors and loose connectors',
      'Run built-in manufacturer diagnostics (Dell ePSA or equivalent) and document error codes',
      'Reseat and test memory modules individually using memtest86 to isolate a faulty DIMM',
      'Check SMART data on all storage drives using CrystalDiskInfo to identify impending failure',
      'Stress-test the CPU and GPU under load using appropriate tools and document thermal behavior',
      'Replace any identified faulty components following ESD-safe procedures',
      'Configure BIOS settings for optimal boot order, memory speed and fan curves',
      'Write a complete repair ticket documenting all findings, actions taken and verification results'
    ],
    expectedOutput:
      'A documented hardware repair workflow: diagnostic logs, component test results, parts replaced with evidence of failure, BIOS configuration changes, post-repair stress test results and a professional repair ticket with asset tracking update.',
    rubric: [
      { skill: 'Diagnostic Procedure', weight: 20, criteria: 'Uses built-in diagnostics and structured methodology systematically rather than guessing; documents error codes and test outputs' },
      { skill: 'Component Testing', weight: 20, criteria: 'Isolates the failing component through process of elimination using memtest86, SMART data and thermal monitoring with clear evidence' },
      { skill: 'Safe Handling & Installation', weight: 15, criteria: 'Follows ESD procedures throughout, installs replacement components correctly and verifies physical integrity' },
      { skill: 'Firmware Configuration', weight: 15, criteria: 'Configures boot order, memory speed and thermal settings appropriately for the hardware and use case' },
      { skill: 'Documentation Quality', weight: 30, criteria: 'Repair ticket is thorough with reported symptoms, diagnostic evidence, root cause, parts used, verification steps and asset record update' }
    ],
    passScore: 72
  },

  assignments: [
    {
      title: 'Component Identification & Compatibility Audit',
      stage: 'Beginner',
      objective: 'Catalog every component in a desktop PC, verify physical compatibility and produce an upgrade recommendation report with vendor specifications.',
      requirements: [
        'Identify and record the CPU model, socket type, motherboard chipset and form factor',
        'List all installed RAM modules with capacity, speed, DDR generation and slot positions',
        'Document all storage devices with type, capacity, interface and SMART health status',
        'Verify upgrade compatibility: confirm which components can be upgraded without replacing the motherboard',
        'Produce an upgrade recommendation with specific part numbers and pricing from manufacturer documentation'
      ],
      skillsEvaluated: ['Component Identification', 'Compatibility Checking', 'Manufacturer Documentation', 'Upgrade Planning'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the complete component inventory, compatibility matrix and upgrade recommendation report with links to manufacturer specifications for each recommended part.',
        textLabel: 'Component audit and upgrade recommendation report',
        minTextLength: 800,
        linkLabels: ['Component photographs or screenshots']
      }
    },
    {
      title: 'Memory Diagnostic & Stress Test Report',
      stage: 'Foundation',
      objective: 'Run a comprehensive memory diagnostic on a multi-DIMM system, identify the failing module and produce a test report with thermal analysis.',
      requirements: [
        'Install memtest86 on a bootable USB drive and run a minimum of four complete passes',
        'Test each DIMM individually in the A2 slot to isolate which module produces errors',
        'Record error counts, error addresses and test duration for each DIMM',
        'Run a combined test with all DIMMs installed and compare error rates',
        'Document the results in a structured test report with recommendations for replacement'
      ],
      skillsEvaluated: ['memtest86 Operation', 'Memory Diagnostics', 'Test Documentation', 'Fault Isolation'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the memtest86 test logs, per-DIMM error summary and a structured diagnostic report with replacement recommendations.',
        textLabel: 'Memory diagnostic test report',
        minTextLength: 1000,
        linkLabels: ['memtest86 test output screenshots']
      }
    },
    {
      title: 'Hardware Failure Troubleshooting Case Study',
      stage: 'Intermediate',
      objective: 'Work through three documented hardware failure scenarios, applying the CompTIA seven-step methodology to isolate and resolve each one.',
      requirements: [
        'Apply the seven-step troubleshooting methodology to each of three provided failure scenarios',
        'Document your diagnostic steps, test results and conclusions for each scenario',
        'For each failure, identify whether the component should be repaired or replaced with justification',
        'Write repair tickets that include the reported symptom, root cause, action taken and verification',
        'Compare and contrast the three cases to identify patterns in common hardware failure modes'
      ],
      skillsEvaluated: ['CompTIA Troubleshooting Methodology', 'Diagnostic Reasoning', 'Repair vs Replace Decisions', 'Professional Documentation'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the three case analyses with step-by-step methodology application, repair decisions and final repair tickets for each scenario.',
        textLabel: 'Troubleshooting case study analysis',
        minTextLength: 1200,
        linkLabels: ['Diagnostic evidence screenshots']
      }
    }
  ],

  simTasks: [
    {
      title: 'Workstation fails to boot after RAM upgrade',
      context: 'A user installed two new DDR5-5600 DIMMs alongside two existing DDR5-4800 DIMMs. The system powers on — fans spin and LEDs illuminate — but never completes POST. No display output. No beep codes. The power LED on the motherboard shows a steady amber light.',
      requirements: [
        'Identify the most likely cause by examining DDR5 speed mixing and motherboard compatibility',
        'Test each DIMM individually in the A2 slot to identify whether any module is defective',
        'Consult the motherboard QVL (Qualified Vendor List) for memory compatibility',
        'Configure the correct BIOS settings for mixed-speed DIMM populations',
        'Document the resolution and advise the user on compatible memory upgrades'
      ],
      priority: 'high',
      dueDayOffset: 2,
      expectedOutput: 'Root cause identification with evidence from testing, the fix applied, BIOS configuration changes and a user-facing recommendation for compatible memory.',
      skills: ['Memory Troubleshooting', 'BIOS Configuration', 'Component Compatibility', 'User Communication']
    },
    {
      title: 'Intermittent blue screens with new NVMe drive',
      context: 'After installing a new NVMe SSD as the boot drive, the PC experiences random blue screen errors (WHEA_UNCORRECTABLE_ERROR) within the first hour of use. The NVMe drive passes CrystalDiskInfo health checks. The old SATA SSD boots Windows without errors when reinstalled.',
      requirements: [
        'Check NVMe drive firmware version and compare against manufacturer release notes',
        'Verify the M.2 slot is wired to CPU PCIe lanes rather than chipset lanes',
        'Update the motherboard BIOS to the latest version which may include NVMe compatibility fixes',
        'Test the NVMe drive in a different M.2 slot if available to rule out a slot-specific issue',
        'Run a full surface scan on the NVMe drive to check for bad blocks not reported by SMART'
      ],
      priority: 'high',
      dueDayOffset: 3,
      expectedOutput: 'Diagnostic findings, firmware or BIOS updates applied, test results confirming stability and documentation of the resolution.',
      skills: ['NVMe Troubleshooting', 'BIOS Firmware Update', 'PCIe Lane Diagnostics', 'Storage Diagnostics']
    },
    {
      title: 'Laptop overheating and thermal shutdown',
      context: 'A three-year-old laptop reaches 98°C CPU temperature within five minutes of opening a web browser and shuts down. The fan spins at maximum speed but the air exhaust feels barely warm. The laptop has not been cleaned internally since purchase.',
      requirements: [
        'Document the current thermal behavior using HWiNFO or equivalent monitoring software before opening the case',
        'Disassemble the laptop following the manufacturer\'s service manual for the specific model',
        'Clean the heatsink fins and fan of dust accumulation using compressed air',
        'Remove the old thermal paste from the CPU and GPU, apply new paste and remount the heatsink',
        'Reassemble and re-test thermal performance, documenting temperature improvement'
      ],
      priority: 'normal',
      dueDayOffset: 5,
      expectedOutput: 'Before and after thermal readings, the cleaning and repasting procedure documented with photographs and confirmation that the laptop operates within safe thermal limits.',
      skills: ['Laptop Disassembly', 'Thermal Paste Replacement', 'Fan and Heatsink Cleaning', 'Thermal Monitoring']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Marcus Johnson',
      personaRole: 'IT Help Desk Lead',
      situation: 'The help desk team is receiving increasing numbers of hardware-related tickets but lacks the diagnostic training to distinguish between hardware failures and software issues, resulting in unnecessary hardware replacements.',
      openingMessage:
        'Our hardware replacement rate has gone up 40% this quarter. The team is swapping parts without proper diagnosis — they replaced six RAM kits last month and only one was actually faulty. Can you help us build a diagnostic triage process that reduces false replacements?',
      expectedPoints: [
        'Proposes a tiered diagnostic checklist that the help desk can follow before escalating to hardware replacement',
        'Recommends installing free diagnostic tools (memtest86, CrystalDiskInfo) on a standard USB toolkit',
        'Suggests a decision tree that routes memory, storage and display issues to specific test sequences',
        'Addresses training gaps with a short knowledge-sharing session on common misdiagnosis patterns'
      ]
    },
    {
      kind: 'team',
      personaName: 'Sara Mitchell',
      personaRole: 'Procurement Coordinator',
      situation: 'The procurement team needs input on which PC models to order for a 200-seat refresh, considering serviceability, spare parts availability and warranty terms.',
      openingMessage:
        'We are refreshing 200 workstations this year. The finance team wants the cheapest option but I know serviceability matters. Can you give me criteria for evaluating bids that balance cost with long-term supportability?',
      expectedPoints: [
        'Evaluates serviceability: tool-less access to RAM, storage and PSU versus glued-in proprietary designs',
        'Compares warranty terms: next-business-day on-site versus depot repair and what each costs',
        'Assesses spare parts availability and whether the manufacturer publishes service manuals publicly',
        'Provides a weighted scoring matrix that procurement can use to objectively compare vendor bids'
      ]
    },
    {
      kind: 'client',
      personaName: 'David Chen',
      personaRole: 'Small Business Owner, Chen Architecture',
      situation: 'The client runs AutoCAD on five workstations and has been experiencing random crashes and slowdowns. An external IT consultant suggested replacing all five PCs for $25,000 without diagnosing the issue.',
      openingMessage:
        'My IT consultant wants me to spend $25,000 replacing all our workstations. The computers are only four years old and I am not convinced they are the problem. Can you diagnose what is actually causing the crashes before I approve a purchase order?',
      expectedPoints: [
        'Runs diagnostics on each workstation to determine whether the crashes are hardware or software related',
        'Checks temperatures under AutoCAD load to identify thermal throttling as a possible cause',
        'Evaluates whether a targeted upgrade (adding RAM or SSDs) could resolve the issue at a fraction of the cost',
        'Provides a data-driven recommendation that allows the client to make an informed decision without unnecessary spending'
      ]
    },
    {
      kind: 'client',
      personaName: 'Rachel Torres',
      personaRole: 'Office Manager, Torres Legal Group',
      situation: 'The client has a server closet with two Dell PowerEdge servers, a NAS and a UPS. One server has been making a clicking noise for two weeks. The office manager is worried but not sure if it is urgent.',
      openingMessage:
        'One of our servers has been making a clicking sound occasionally. I mentioned it to our IT person but they said it is probably fine. Should I be worried? I cannot afford to lose our case files.',
      expectedPoints: [
        'Identifies the clicking as a likely mechanical hard drive failure in the early stages',
        'Emphasizes urgency: clicking drives can fail completely within days or weeks without warning',
        'Recommends immediate backup verification and scheduling a drive replacement within 48 hours',
        'Explains the risk in business terms: case file loss could impact ongoing legal proceedings'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'A batch of 30 new desktop PCs arrives from the manufacturer. During initial setup, five of the 30 units fail to power on — the PSU fan spins for half a second then stops. The remaining 25 units boot normally. The purchase order is under warranty but the delivery is for a client deployment next week.',
      requiredActions: [
        { action: 'Test the five failing units with a known-good power supply to isolate whether the issue is the PSU or the motherboard', good: true, note: 'The PSU is the easiest component to swap and the most common cause of this symptom — testing it first rules out the fastest.' },
        { action: 'Run Dell or HP built-in diagnostics on the five failing units to capture specific error codes before any component swap', good: true, note: 'Diagnostic error codes document the failure for the warranty claim and confirm the root cause before replacement.' },
        { action: 'Open a warranty case with the manufacturer immediately with the serial numbers and diagnostic results for the five defective units', good: true, note: 'Warranty claims take time to process — filing early ensures replacement units arrive before the client deployment deadline.' },
        { action: 'Use five of the 25 working units for the client deployment and deal with the defective ones later', good: false, note: 'Deploying 25 units instead of 30 leaves the client short. The defect rate is 17% — if five failed, others may fail soon. The root cause must be understood before deployment.' }
      ]
    },
    {
      category: 'Process improvement',
      situation: 'The company has grown from 50 to 200 employees over two years. The current hardware tracking system is a spreadsheet with 60% incomplete entries. Asset tags are applied inconsistently — some devices have two tags, some have none. The finance team cannot reconcile hardware purchases with deployed assets.',
      requiredActions: [
        { action: 'Conduct a full physical inventory audit of every device in the building, scanning asset tags and recording missing or duplicate tags', good: true, note: 'You cannot fix a tracking system without knowing the actual current state. A physical audit is the foundation for everything else.' },
        { action: 'Implement a consistent asset tagging scheme using a barcode or QR system linked to a proper CMDB tool like Snipe-IT', good: true, note: 'Moving from a spreadsheet to a dedicated asset management tool provides search, reporting and warranty tracking that spreadsheets cannot match.' },
        { action: 'Create an onboarding checklist that includes asset tag assignment, user assignment and initial configuration documentation', good: true, note: 'Preventing future tracking gaps requires a process change at the point of deployment, not just cleaning up past records.' },
        { action: 'Focus only on the 200 current employees and ignore devices in storage or decommissioned units', good: false, note: 'Decommissioned devices still appear in financial records. Without tracking them, the finance team cannot reconcile purchase costs with asset disposal or write-off.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'What is the difference between DDR4 and DDR5 memory? Explain at least three key technical differences and how they affect system performance.',
      guidancePoints: [
        'DDR5 operates at 1.1V versus DDR4\'s 1.2V, reducing power consumption',
        'DDR5 has on-module PMIC (Power Management IC) for voltage regulation at the DIMM level',
        'DDR5 starts at 4800 MHz native speed versus DDR4\'s 2133 MHz baseline',
        'DDR5 includes on-die ECC for internal error correction that DDR4 lacks',
        'DDR5 has two 32-bit channels per module versus DDR4\'s single 64-bit channel'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between SATA SSD and NVMe SSD. When would you recommend each, and what determines whether a motherboard supports NVMe?',
      guidancePoints: [
        'SATA SSDs use the SATA III interface capped at 600 MB/s; NVMe uses PCIe lanes for up to 7,000+ MB/s',
        'NVMe requires an M.2 slot with PCIe lane connectivity — not all M.2 slots support NVMe',
        'NVMe reduces latency through a more efficient command queue (64K queues vs SATA\'s single queue)',
        'SATA SSDs are appropriate for bulk storage or older systems without M.2 NVMe support',
        'NVMe is recommended for boot drives and performance-critical applications'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A user reports their PC randomly shuts off during intensive tasks but works fine for email and web browsing. Walk through your troubleshooting approach step by step.',
      guidancePoints: [
        'Check thermal performance under load — random shutdowns under heavy load are typically thermal protection triggers',
        'Monitor CPU and GPU temperatures using HWiNFO during a stress test to correlate shutdowns with temperature',
        'Inspect the CPU cooler mounting — loose contact or degraded thermal paste causes intermittent thermal issues',
        'Test PSU voltage stability under load using a multimeter or PSU tester — weak 12V rail causes load-dependent shutdowns',
        'Check event logs for WHEA errors or kernel power events that timestamp the exact failure moment'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A newly built PC passes POST but the operating system installer does not detect any storage drives. Both the SATA SSD and NVMe SSD are visible in BIOS. What do you investigate?',
      guidancePoints: [
        'Check if the SATA controller mode in BIOS is set to AHCI rather than IDE or RAID',
        'Verify the NVMe drive appears in the BIOS boot priority and is not disabled by SATA port sharing',
        'Load storage controller drivers during OS installation if the installer does not natively support the chipset',
        'Check whether Secure Boot or TPM settings are interfering with the installer detecting the NVMe drive',
        'Test the drives in another system to rule out defective units'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'A customer insists their three-year-old laptop is "completely broken" because it is slow. Diagnostics show the hardware is functioning perfectly — the HDD has 92% SMART health and RAM is error-free. How do you handle this situation?',
      guidancePoints: [
        'Present diagnostic evidence objectively: SMART data, memtest86 results and benchmark scores',
        'Explain that the mechanical HDD is the performance bottleneck, not a hardware failure',
        'Recommend an SSD upgrade with specific performance comparison data (boot time, application load time)',
        'Provide a cost-benefit analysis showing the SSD upgrade cost versus a full laptop replacement',
        'Document the diagnostics performed and the upgrade recommendation with pricing'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'Management wants to dispose of 50 old workstations by selling them to a recycler. The drives contain sensitive client data. What security steps must be completed before the hardware leaves the building?',
      guidancePoints: [
        'Verify all drives are removed from the systems before the recycler takes possession',
        'For SSDs, perform a secure erase using the manufacturer\'s tool or encrypt-then-format',
        'For HDDs, run a full overwrite with DBAN or NIST SP 800-88 compliant wipe',
        'Document the serial number and disposal method for every drive to maintain chain of custody',
        'Obtain a certificate of destruction from the recycler for audit compliance'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'A non-technical manager asks why the hardware team needs three days to set up 10 new workstations when "it should just be plugging them in." How do you explain the actual time investment?',
      guidancePoints: [
        'Break down the process: unboxing, asset tagging, BIOS configuration, OS imaging, software deployment and testing',
        'Explain that each workstation requires individual configuration for the user\'s role and security group',
        'Use the analogy of outfitting a new employee — the desk and chair take five minutes but the access badges, email setup and training take days',
        'Offer a progress update schedule so the manager knows what to expect each day',
        'Propose a streamlined imaging process for future deployments to reduce setup time'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'You discover that a colleague has been handling ESD-sensitive components without a wrist strap and has already damaged two RAM modules. How do you address this without creating conflict?',
      guidancePoints: [
        'Approach privately and share the specific evidence: the two failed DIMMs and the cost of replacement',
        'Explain the invisible nature of ESD damage — the colleague may not realize their handling is the cause',
        'Offer to demonstrate proper ESD procedure with a wrist strap and anti-static mat on the next repair',
        'Suggest keeping ESD equipment at every workstation so there is no barrier to using it',
        'Frame it as protecting the team\'s budget and reputation rather than as criticism of the colleague\'s skills'
      ]
    }

  ]

}
