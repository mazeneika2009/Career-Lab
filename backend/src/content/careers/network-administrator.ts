import type { CareerDef } from '../framework.js'

export const networkAdministrator: CareerDef = {
  slug: 'network-administrator',
  name: 'Network Administrator',
  category: 'IT & Cloud',
  order: 30,
  description:
    'Runs day-to-day network operations across Linux and Windows — DNS, DHCP, configuration, monitoring, documentation.',
  difficulty: 'Intermediate',
  pathSummary:
    'Networking fundamentals & OSI model → IP addressing, subnetting & DHCP → DNS operations & name resolution → Router & switch configuration → Network monitoring & troubleshooting → Security hardening & documentation.',
  mainSkills: ['TCP/IP & OSI Model', 'DNS & DHCP', 'Router & Switch Configuration', 'Network Monitoring', 'Firewall & ACL Management', 'Linux & Windows Networking', 'Troubleshooting', 'Documentation'],
  sourcePlatforms: ['Cisco', 'Microsoft Learn', 'Linux Documentation', 'Wireshark', 'IETF / RFC'],
  companyName: 'NetPulse Infrastructure',
  roleTitle: 'Network Administrator',

  chapters: [
    {
      slug: 'networking-fundamentals',
      stage: 'Beginner',
      title: 'Networking Fundamentals & the OSI Model',
      description: 'The conceptual bedrock — protocol layers, Ethernet, and how packets traverse a network from source to destination.',
      topics: [
        {
          slug: 'osi-model-and-encapsulation',
          title: 'The OSI Model & Encapsulation',
          minutes: 28,
          objectives: ['Name and describe all seven OSI layers', 'Explain encapsulation and decapsulation as data moves down and up the stack', 'Map common protocols to their correct OSI layer'],
          sections: [
            { heading: 'Seven layers, one journey', body: 'The Physical layer transmits raw bits over a medium. Data Link frames those bits and handles MAC addressing. Network routes packets across subnets using IP. Transport provides end-to-end reliability (TCP) or speed (UDP). Session, Presentation and Application layers handle dialog management, encoding and user-facing services respectively.' },
            { heading: 'Encapsulation in practice', body: 'As data descends the stack each layer wraps the payload with a header containing control information — a TCP segment becomes an IP packet which becomes an Ethernet frame. At the receiving end each layer strips its header and passes the payload upward. Understanding this flow is essential for packet capture analysis.' },
            { heading: 'Protocol-to-layer mapping', body: 'Ethernet and Wi-Fi operate at Layer 2. IP, ICMP and routing protocols live at Layer 3. TCP and UDP occupy Layer 4. HTTP, DNS, SMTP and SSH sit at Layers 5-7. Correctly identifying which layer a problem belongs to drastically narrows troubleshooting scope.' }
          ],
          links: [
            { title: 'OSI model overview', url: 'https://www.cisco.com/c/en/us/solutions/what-is-the-osi-model.html', sourceName: 'Cisco', resourceType: 'guide', relationship: 'Cisco explanation of the seven-layer model.' },
            { title: 'OSI model – Microsoft Learn', url: 'https://learn.microsoft.com/en-us/training/modules/network-fundamentals/what-is-the-osi-model', sourceName: 'Microsoft Learn', resourceType: 'tutorial', relationship: 'Microsoft overview of OSI layers.' },
            { title: 'RFC 1122 – Host Requirements', url: 'https://datatracker.ietf.org/doc/html/rfc1122', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'Defines layering expectations for Internet hosts.' }
          ],
          quiz: {
            prompt: 'At which OSI layer does IP routing operate?',
            options: ['Layer 2 – Data Link', 'Layer 3 – Network', 'Layer 4 – Transport', 'Layer 7 – Application'],
            answerIndex: 1,
            explanation: 'IP routing makes forwarding decisions based on logical addresses at the Network layer.'
          }
        },
        {
          slug: 'ethernet-and-layer-2',
          title: 'Ethernet & Layer 2 Switching',
          minutes: 27,
          objectives: ['Describe Ethernet frame structure and MAC addressing', 'Explain how a Layer 2 switch builds its MAC address table', 'Differentiate between broadcast domains and collision domains'],
          sections: [
            { heading: 'Ethernet frame anatomy', body: 'An Ethernet frame contains a preamble, destination MAC, source MAC, optional VLAN tag (802.1Q), payload (46-1500 bytes) and a Frame Check Sequence for error detection. MTU mismatches cause fragmentation or black holes — always verify MTU end to end.' },
            { heading: 'How switches learn', body: 'A switch inspects the source MAC of every incoming frame and maps it to the receiving port. When a frame arrives for an unknown destination the switch floods it out all ports except the source. This process builds the MAC address table dynamically without manual configuration.' },
            { heading: 'Broadcast and collision domains', body: 'A hub extends a single collision domain. A switch creates a separate collision domain per port but shares one broadcast domain. VLANs partition broadcast domains logically. Uncontrolled broadcast traffic (broadcast storms) can saturate links — spanning tree and storm control mitigate this.' }
          ],
          links: [
            { title: 'Ethernet fundamentals', url: 'https://www.cisco.com/c/en/us/products/switches/what-is-an-ethernet-switch.html', sourceName: 'Cisco', resourceType: 'guide', relationship: 'How Ethernet switches forward frames.' },
            { title: 'Linux bridge networking', url: 'https://www.kernel.org/doc/html/latest/networking/bridge.html', sourceName: 'Linux Documentation', resourceType: 'documentation', relationship: 'Linux kernel bridge configuration for software switching.' },
            { title: 'IEEE 802.1Q VLAN tagging', url: 'https://datatracker.ietf.org/doc/html/rfc9268', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'Standards context for VLAN operation.' }
          ],
          quiz: {
            prompt: 'When a switch receives a frame for an unknown destination MAC, what does it do?',
            options: ['Drops the frame', 'Floods it out all ports except the source', 'Sends it back to the sender', 'Buffers it until the MAC is learned'],
            answerIndex: 1,
            explanation: 'Unknown unicast frames are flooded so the destination device can respond and populate the MAC table.'
          }
        },
        {
          slug: 'tcp-and-udp-transport',
          title: 'TCP & UDP Transport Layer',
          minutes: 30,
          objectives: ['Compare TCP connection-oriented delivery with UDP connectionless delivery', 'Describe the TCP three-way handshake and state machine', 'Identify when to choose UDP over TCP for specific applications'],
          sections: [
            { heading: 'TCP reliability mechanisms', body: 'TCP uses sequence numbers, acknowledgements and retransmission to guarantee ordered, loss-free delivery. Flow control via sliding windows prevents the sender from overwhelming the receiver. Congestion control algorithms (Slow Start, AIMD) prevent the sender from overwhelming the network.' },
            { heading: 'UDP and when to use it', body: 'UDP provides best-effort delivery without connection setup, ordering or retransmission overhead. DNS queries, VoIP, video streaming and gaming favor UDP because low latency matters more than perfect reliability. Application-layer protocols add their own recovery where needed.' },
            { heading: 'TCP state machine', body: 'A TCP connection progresses through states: LISTEN, SYN_SENT, SYN_RECEIVED, ESTABLISHED, FIN_WAIT_1/2, CLOSE_WAIT, LAST_ACK and TIME_WAIT. TIME_WAIT persists for 2MSL to handle delayed packets — short-lived high-connection workloads can exhaust ephemeral ports if this is not understood.' }
          ],
          links: [
            { title: 'TCP/IP transport overview', url: 'https://www.cisco.com/c/en/us/solutions/enterprise-networks/what-is-tcp-ip.html', sourceName: 'Cisco', resourceType: 'guide', relationship: 'TCP and UDP fundamentals in a Cisco context.' },
            { title: 'Wireshark TCP analysis', url: 'https://www.wireshark.org/docs/wsug_html_chunked/ChCapTCPAnalysis.html', sourceName: 'Wireshark', resourceType: 'guide', relationship: 'How Wireshark decodes and analyzes TCP streams.' },
            { title: 'RFC 793 – Transmission Control Protocol', url: 'https://datatracker.ietf.org/doc/html/rfc793', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'The original TCP specification.' }
          ],
          quiz: {
            prompt: 'Which TCP state occurs after a graceful connection shutdown when the host waits for any delayed packets to arrive?',
            options: ['CLOSE_WAIT', 'FIN_WAIT_1', 'TIME_WAIT', 'SYN_SENT'],
            answerIndex: 2,
            explanation: 'TIME_WAIT persists for 2×Maximum Segment Lifetime to ensure stale packets from this connection are not accepted by a future connection.'
          }
        }
      ]
    },
    {
      slug: 'ip-addressing-and-services',
      stage: 'Foundation',
      title: 'IP Addressing, DHCP & DNS',
      description: 'The logical services that make networks usable — address allocation, name resolution and the protocols behind them.',
      topics: [
        {
          slug: 'ip-addressing-and-subnetting',
          title: 'IP Addressing & Subnetting',
          minutes: 30,
          objectives: ['Perform subnet calculations using CIDR notation', 'Explain the purpose of subnet masks, wildcard masks and VLSM', 'Design a subnetting scheme for a multi-site network'],
          sections: [
            { heading: 'IPv4 addressing and CIDR', body: 'An IPv4 address is a 32-bit number written as four dotted decimals. CIDR notation (e.g. 10.0.3.0/24) specifies how many bits form the network prefix. Subnetting divides a larger network into smaller segments, reducing broadcast domains and improving security isolation.' },
            { heading: 'VLSM and supernetting', body: 'Variable Length Subnet Masks let administrators allocate different prefix lengths to different subnets — a /28 for point-to-point links, a /24 for office VLANs, a /16 for data centers. Supernetting (route aggregation) combines adjacent prefixes to shrink routing tables.' },
            { heading: 'IPv6 essentials', body: 'IPv6 uses 128-bit addresses written in hexadecimal with colon separation. /64 prefixes are standard for LANs. NDP (Neighbor Discovery Protocol) replaces ARP. Dual-stack and tunneling strategies bridge the transition — every modern administrator must understand both protocols.' }
          ],
          links: [
            { title: 'IP addressing and subnetting', url: 'https://www.cisco.com/c/en/us/solutions/what-is-an-ip-address.html', sourceName: 'Cisco', resourceType: 'guide', relationship: 'IPv4 and IPv6 addressing concepts.' },
            { title: 'Linux networking guide', url: 'https://www.kernel.org/doc/html/latest/networking/index.html', sourceName: 'Linux Documentation', resourceType: 'documentation', relationship: 'Linux networking stack and IP configuration.' },
            { title: 'RFC 4632 – Classless Inter-Domain Routing', url: 'https://datatracker.ietf.org/doc/html/rfc4632', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'The definitive CIDR specification.' }
          ],
          quiz: {
            prompt: 'How many usable host addresses are in a /28 subnet?',
            options: ['16', '14', '30', '12'],
            answerIndex: 1,
            explanation: 'A /28 has 16 total addresses; 2 are reserved (network and broadcast) leaving 14 usable hosts.'
          }
        },
        {
          slug: 'dhcp-operations',
          title: 'DHCP: Allocation & Troubleshooting',
          minutes: 29,
          objectives: ['Describe the DORA process (Discover, Offer, Request, Acknowledge)', 'Configure DHCP scopes, reservations and relay agents', 'Diagnose common DHCP failures using packet captures'],
          sections: [
            { heading: 'The DORA process', body: 'A client broadcasts a DHCP Discover. All DHCP servers on the segment reply with an Offer containing an IP, subnet mask, gateway and lease time. The client selects one and broadcasts a Request. The chosen server confirms with an Acknowledge. Understanding each step pinpoints where failures occur.' },
            { heading: 'Scopes, reservations and relay', body: 'A DHCP scope defines the address pool, lease duration and options (DNS servers, domain name, TFTP server). Reservations bind a MAC address to a specific IP for printers and servers. IP helpers (relay agents) forward DHCP broadcasts across routed boundaries so a central server can serve multiple subnets.' },
            { heading: 'Troubleshooting DHCP', body: 'Packet captures reveal the root cause: no Discover means the client NIC or driver is faulty; no Offer means the server scope is exhausted or the relay agent is misconfigured; a NAK from the server indicates the client is requesting an address from the wrong scope. Windows ipconfig /release and /renew or Linux dhclient -r cycle the lease.' }
          ],
          links: [
            { title: 'Windows Server DHCP', url: 'https://learn.microsoft.com/en-us/windows-server/networking/technologies/dhcp/dhcp-top', sourceName: 'Microsoft Learn', resourceType: 'documentation', relationship: 'DHCP server deployment and management on Windows.' },
            { title: 'ISC DHCP server manual', url: 'https://kb.isc.org/docs/aa-00445', sourceName: 'Linux Documentation', resourceType: 'guide', relationship: 'Configuring the ISC DHCP daemon on Linux.' },
            { title: 'RFC 2131 – Dynamic Host Configuration Protocol', url: 'https://datatracker.ietf.org/doc/html/rfc2131', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'The DHCP protocol specification.' }
          ],
          quiz: {
            prompt: 'A client sends a DHCP Discover but receives no Offer. What is the most likely cause on a multi-VLAN network?',
            options: ['The client NIC is broken', 'IP helper (relay agent) is not configured on the VLAN interface', 'The DNS server is down', 'The lease time is too short'],
            answerIndex: 1,
            explanation: 'DHCP broadcasts do not cross router boundaries without a relay agent (ip helper-address). Each VLAN interface must have one configured.'
          }
        },
        {
          slug: 'dns-resolution',
          title: 'DNS: Name Resolution & Zone Management',
          minutes: 28,
          objectives: ['Explain the DNS resolution chain from recursive to authoritative', 'Manage forward and reverse lookup zones', 'Implement split-horizon DNS for internal and external resolution'],
          sections: [
            { heading: 'Resolution chain', body: 'A stub resolver queries a recursive resolver (usually provided by the ISP or organization). The recursive resolver iterates through root servers, TLD servers (.com, .org) and finally authoritative servers to answer the query. Caching at each layer reduces lookup latency but can serve stale records.' },
            { heading: 'Zone types and records', body: 'Forward zones map hostnames to IP addresses. Reverse zones map IPs to hostnames (PTR records). Common record types: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail exchange), TXT (arbitrary text), SOA (start of authority) and NS (name server). Incorrect SOA serial numbers prevent zone transfers.' },
            { heading: 'Split-horizon DNS', body: 'Split-horizon DNS serves different answers depending on whether the query originates inside or outside the network. Internal clients resolve mail.corp.example to a private IP while external clients get a public IP. This is critical for security — it hides internal infrastructure from external enumeration.' }
          ],
          links: [
            { title: 'Windows DNS Server', url: 'https://learn.microsoft.com/en-us/windows-server/networking/dns/dns-top', sourceName: 'Microsoft Learn', resourceType: 'documentation', relationship: 'DNS server role on Windows Server.' },
            { title: 'BIND 9 configuration', url: 'https://bind9.readthedocs.io/en/latest/', sourceName: 'Linux Documentation', resourceType: 'documentation', relationship: 'BIND DNS server configuration and zone management.' },
            { title: 'RFC 1034 – Domain Names', url: 'https://datatracker.ietf.org/doc/html/rfc1034', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'The foundational DNS specification.' }
          ],
          quiz: {
            prompt: 'Which DNS record type maps a hostname to an IPv6 address?',
            options: ['A', 'AAAA', 'CNAME', 'PTR'],
            answerIndex: 1,
            explanation: 'AAAA (quad-A) records store 128-bit IPv6 addresses while A records store 32-bit IPv4 addresses.'
          }
        }
      ]
    },
    {
      slug: 'routing-and-switching',
      stage: 'Intermediate',
      title: 'Router & Switch Configuration',
      description: 'Hands-on device configuration — VLANs, inter-VLAN routing, static routes and dynamic routing protocols.',
      topics: [
        {
          slug: 'vlan-and-trunk-configuration',
          title: 'VLANs, Trunks & Inter-VLAN Routing',
          minutes: 30,
          objectives: ['Create and assign VLANs on Cisco switches', 'Configure 802.1Q trunk links between switches', 'Implement router-on-a-stick or Layer 3 switch routing between VLANs'],
          sections: [
            { heading: 'VLAN configuration', body: 'VLANs logically segment a physical switch into multiple broadcast domains. Create VLANs with vlan <id> name <name>, assign ports with switchport access vlan <id>, and verify with show vlan brief. Native VLANs on trunk links must match on both ends — a mismatch causes VLAN hopping vulnerabilities.' },
            { heading: 'Trunk links', body: 'A trunk carries multiple VLANs between switches using 802.1Q tagging. Configure with switchport mode trunk and restrict allowed VLANs with switchport trunk allowed vlan. Trunk negotiation (DTP) should be disabled on production ports to prevent unauthorized VLAN access.' },
            { heading: 'Inter-VLAN routing', body: 'Router-on-a-stick uses sub-interfaces on a single router port — each sub-interface corresponds to a VLAN with encapsulation dot1q <id>. Layer 3 switches use SVIs (Switch Virtual Interfaces) with ip routing enabled, offering higher throughput. Choose based on traffic volume and hardware capability.' }
          ],
          links: [
            { title: 'Cisco VLAN configuration guide', url: 'https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst/configuration-guides.html', sourceName: 'Cisco', resourceType: 'guide', relationship: 'VLAN and trunk configuration on Catalyst switches.' },
            { title: 'Linux VLAN configuration', url: 'https://www.kernel.org/doc/html/latest/networking/vlan.html', sourceName: 'Linux Documentation', resourceType: 'documentation', relationship: 'Configuring VLANs on Linux interfaces.' },
            { title: 'IEEE 802.1Q – VLAN tagging', url: 'https://datatracker.ietf.org/doc/html/rfc9268', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'VLAN tagging standards context.' }
          ],
          quiz: {
            prompt: 'What happens when the native VLAN on one end of a trunk is VLAN 10 and the other end is VLAN 20?',
            options: ['All traffic is dropped', 'Untagged traffic is placed in different VLANs on each side, creating a security risk', 'The switch auto-corrects the mismatch', 'Only VLAN 1 traffic passes'],
            answerIndex: 1,
            explanation: 'Native VLAN mismatches cause untagged frames to land in different broadcast domains on each switch, potentially enabling VLAN hopping attacks.'
          }
        },
        {
          slug: 'static-and-dynamic-routing',
          title: 'Static Routes & Dynamic Routing Protocols',
          minutes: 29,
          objectives: ['Configure static routes including default routes and floating static routes', 'Explain the difference between distance-vector and link-state routing protocols', 'Set up OSPF single-area for a small campus network'],
          sections: [
            { heading: 'Static routing', body: 'Static routes are manually configured: ip route <destination> <mask> <next-hop>. Default routes (0.0.0.0/0) send all unmatched traffic to an exit router. Floating static routes use higher administrative distances as backups — if the primary dynamic route fails, the static route activates.' },
            { heading: 'Distance-vector vs link-state', body: 'Distance-vector protocols (RIP, EIGRP) share routing tables with neighbors periodically or event-driven. Link-state protocols (OSPF, IS-IS) flood link-state information so every router builds a complete topology map. Link-state converges faster and scales better but consumes more CPU and memory.' },
            { heading: 'OSPF fundamentals', body: 'OSPF elects a Designated Router (DR) on multi-access networks to reduce adjacencies. Areas partition the OSPF domain to limit LSA flooding — Area 0 is the backbone. Cost is the metric, inversely proportional to interface bandwidth. Verify with show ip ospf neighbor and show ip route ospf.' }
          ],
          links: [
            { title: 'Cisco routing configuration', url: 'https://www.cisco.com/c/en/us/solutions/what-is-a-router.html', sourceName: 'Cisco', resourceType: 'guide', relationship: 'Router function and routing fundamentals.' },
            { title: 'Windows routing and remote access', url: 'https://learn.microsoft.com/en-us/windows-server/remote/remote-access/remote-access', sourceName: 'Microsoft Learn', resourceType: 'documentation', relationship: 'Windows Server routing configuration.' },
            { title: 'RFC 2328 – OSPF Version 2', url: 'https://datatracker.ietf.org/doc/html/rfc2328', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'The OSPFv2 specification.' }
          ],
          quiz: {
            prompt: 'Which routing protocol builds a complete topology map of the network rather than sharing routing tables with neighbors?',
            options: ['RIP', 'EIGRP', 'OSPF', 'BGP'],
            answerIndex: 2,
            explanation: 'OSPF is a link-state protocol — every router floods link-state advertisements so each can construct a full topology database and compute shortest paths independently.'
          }
        },
        {
          slug: 'access-control-lists',
          title: 'ACLs & Traffic Filtering',
          minutes: 30,
          objectives: ['Write standard and extended ACLs to filter traffic', 'Apply ACLs to interfaces in the correct direction', 'Use ACLs as part of a defense-in-depth security strategy'],
          sections: [
            { heading: 'Standard vs extended ACLs', body: 'Standard ACLs (1-99) filter only by source IP address. Extended ACLs (100-199) filter by source, destination, protocol and port number. Place extended ACLs as close to the source as possible to avoid wasting bandwidth on traffic that will be discarded anyway.' },
            { heading: 'ACL placement and direction', body: 'An inbound ACL is checked before the routing decision; an outbound ACL is checked after. Incorrect direction causesACLs to silently drop legitimate traffic. Always test ACLs with permit statements logged before switching to implicit deny — an overly broad deny rule can isolate entire network segments.' },
            { heading: 'ACLs in a broader security context', body: 'ACLs are one layer of defense. They cannot inspect application-layer content — that requires a next-gen firewall or IDS/IPS. Combine ACLs with port security, DHCP snooping, dynamic ARP inspection and 802.1X for a comprehensive access control posture.' }
          ],
          links: [
            { title: 'Cisco ACL configuration', url: 'https://www.cisco.com/c/en/us/support/docs/security/ios-12-0/12-0zz/12zz11acl.html', sourceName: 'Cisco', resourceType: 'guide', relationship: 'Extended ACL configuration and examples.' },
            { title: 'Linux iptables/nftables', url: 'https://www.netfilter.org/documentation.html', sourceName: 'Linux Documentation', resourceType: 'documentation', relationship: 'Linux firewall packet filtering.' },
            { title: 'RFC 4346 – TLS and ACL context', url: 'https://datatracker.ietf.org/doc/html/rfc4346', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'Transport layer security as a complementary filtering mechanism.' }
          ],
          quiz: {
            prompt: 'You want to block only Telnet traffic from subnet 10.1.0.0/16 to server 192.168.1.10. Which ACL type and placement is correct?',
            options: ['Standard ACL applied outbound on the server interface', 'Extended ACL applied inbound on the source-facing interface', 'Standard ACL applied inbound on the server interface', 'Extended ACL applied outbound on the destination interface'],
            answerIndex: 1,
            explanation: 'Extended ACLs filter by source, destination, protocol and port. Placing it inbound on the source-facing interface drops the traffic before it traverses the network.'
          }
        }
      ]
    },
    {
      slug: 'monitoring-security-and-docs',
      stage: 'Advanced',
      title: 'Monitoring, Security Hardening & Documentation',
      description: 'Keeping the network observable, secure and well-documented — the operations mindset that separates reactive from proactive administrators.',
      topics: [
        {
          slug: 'network-monitoring-tools',
          title: 'SNMP, NetFlow & Network Monitoring',
          minutes: 28,
          objectives: ['Configure SNMP polling and traps for device health monitoring', 'Use Wireshark captures for packet-level troubleshooting', 'Set up a basic NetFlow/sFlow collector for traffic analysis'],
          sections: [
            { heading: 'SNMP fundamentals', body: 'SNMP (v1/v2c/v3) exposes device metrics through MIBs (Management Information Bases). An NMS (Network Management System) polls agents using GET requests and receives unsolicited TRAPs or INFORMs for threshold events. SNMPv3 adds authentication and encryption — v1 and v2c send community strings in cleartext and must not be used in production.' },
            { heading: 'Wireshark for network admins', body: 'Wireshark captures and decodes every protocol in the stack. Use display filters (tcp.port == 53, ip.addr == 10.0.1.50) to isolate traffic. Follow TCP streams to reconstruct full conversations. Capture on the correct interface and use ring buffers to prevent disk exhaustion during long captures.' },
            { heading: 'NetFlow and traffic analysis', body: 'NetFlow (Cisco) and sFlow (multi-vendor) export flow records summarizing who talked to whom, when and how much data moved. Collectors like ntopng, SolarWinds or Elastiflow visualize top talkers, protocol distribution and anomaly detection. This data is essential for capacity planning and security forensics.' }
          ],
          links: [
            { title: 'Wireshark user guide', url: 'https://www.wireshark.org/docs/wsug_html_chunked/', sourceName: 'Wireshark', resourceType: 'documentation', relationship: 'Comprehensive Wireshark documentation and tutorials.' },
            { title: 'Cisco SNMP configuration', url: 'https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/snmp/configuration/15-mt/snmp-15-mt-book.html', sourceName: 'Cisco', resourceType: 'guide', relationship: 'SNMP setup on Cisco IOS devices.' },
            { title: 'Linux SNMP agent (net-snmp)', url: 'https://net-snmp.sourceforge.io/wiki/index.php/Main_Page', sourceName: 'Linux Documentation', resourceType: 'documentation', relationship: 'SNMP daemon configuration on Linux.' }
          ],
          quiz: {
            prompt: 'Why is SNMPv3 preferred over SNMPv2c in production environments?',
            options: ['SNMPv3 is faster', 'SNMPv3 adds authentication and encryption while v2c sends community strings in cleartext', 'SNMPv3 supports more MIBs', 'SNMPv2c is deprecated by Cisco'],
            answerIndex: 1,
            explanation: 'SNMPv3 uses USM (User-based Security Model) for authentication and encryption, eliminating the cleartext community string vulnerability of v1/v2c.'
          }
        },
        {
          slug: 'firewall-and-network-security',
          title: 'Firewall & Network Security Hardening',
          minutes: 30,
          objectives: ['Configure host-based and network firewalls for layered defense', 'Implement port security and DHCP snooping on switches', 'Design a network segmentation strategy using VLANs and ACLs'],
          sections: [
            { heading: 'Firewall layers', body: 'Host-based firewalls (Windows Defender Firewall, iptables/nftables) protect individual servers. Network firewalls (ASA, pfSense, cloud security groups) protect segments. Both are necessary — host-based rules travel with the VM during migration and enforce defense-in-depth.' },
            { heading: 'Switch security features', body: 'Port security limits MAC addresses per port, preventing rogue devices. DHCP snooping filters untrusted DHCP servers. Dynamic ARP Inspection (DAI) validates ARP replies against the DHCP snooping table. STP PortFast and BPDU Guard prevent topology attacks on access ports.' },
            { heading: 'Network segmentation', body: 'Segmentation limits lateral movement after a breach. Place servers in dedicated VLANs, enforce inter-VLAN ACLs, isolate IoT and guest traffic, and use DMZs for public-facing services. Zero-trust architecture extends segmentation to micro-segmentation at the workload level.' }
          ],
          links: [
            { title: 'Windows Defender Firewall', url: 'https://learn.microsoft.com/en-us/windows/security/operating-system-security/firewall/windows-firewall-overview', sourceName: 'Microsoft Learn', resourceType: 'documentation', relationship: 'Windows host-based firewall configuration.' },
            { title: 'Linux firewall with nftables', url: 'https://www.netfilter.org/projects/nftables/manpage.html', sourceName: 'Linux Documentation', resourceType: 'reference', relationship: 'nftables command reference for Linux packet filtering.' },
            { title: 'RFC 4890 – ICMP filtering recommendations', url: 'https://datatracker.ietf.org/doc/html/rfc4890', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'ICMP filtering guidance for network security.' }
          ],
          quiz: {
            prompt: 'A user plugs an unapproved switch into a wall port and suddenly has access to multiple VLANs. Which switch feature would prevent this?',
            options: ['Spanning Tree PortFast', 'DHCP snooping', 'BPDU Guard on access ports', 'Storm control'],
            answerIndex: 2,
            explanation: 'BPDU Guard immediately disables a port that receives Bridge Protocol Data Units, preventing unauthorized switches from altering the spanning tree topology.'
          }
        },
        {
          slug: 'documentation-and-change-management',
          title: 'Network Documentation & Change Management',
          minutes: 27,
          objectives: ['Create and maintain network diagrams and configuration documentation', 'Follow a structured change management process for network modifications', 'Build runbooks for common operational procedures'],
          sections: [
            { heading: 'Network documentation artifacts', body: 'Essential documents include network topology diagrams (physical and logical), IP address management (IPAM) records, VLAN and subnet inventories, configuration backups with version control, and a contact list for escalation paths. Stale documentation is worse than no documentation — establish a review cadence.' },
            { heading: 'Change management process', body: 'Every network change should follow: request → risk assessment → peer review → maintenance window → implementation → verification → rollback plan. Document before-and-after states. Automate configuration backups so every change creates a diff-able snapshot. Never make undocumented changes to production.' },
            { heading: 'Runbooks and operational playbooks', body: 'A runbook describes step-by-step procedures for recurring tasks: VLAN creation, new switch deployment, ISP circuit activation, firmware upgrade. Written so a junior administrator can execute without supervision, runbooks reduce bus factor risk and ensure consistency.' }
          ],
          links: [
            { title: 'Cisco documentation best practices', url: 'https://www.cisco.com/c/en/us/solutions/best-practices-documentation.html', sourceName: 'Cisco', resourceType: 'guide', relationship: 'Network documentation best practices.' },
            { title: 'Linux system documentation', url: 'https://www.kernel.org/doc/html/latest/admin-guide/index.html', sourceName: 'Linux Documentation', resourceType: 'documentation', relationship: 'Linux system administration and documentation guidance.' },
            { title: 'RFC 2711 – Router alert option', url: 'https://datatracker.ietf.org/doc/html/rfc2711', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'RFC process and documentation standards.' }
          ],
          quiz: {
            prompt: 'What is the single most important reason to maintain current network documentation?',
            options: ['Compliance audits require it', 'It enables consistent troubleshooting and reduces downtime when staff changes occur', 'It looks professional', 'It is required by Cisco certification'],
            answerIndex: 1,
            explanation: 'Accurate documentation ensures operational continuity when team members leave or are unavailable, and dramatically reduces mean time to repair.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Network Operations & Security Audit',
    coverage: ['IP Addressing & Subnetting', 'DHCP & DNS', 'VLAN & Routing Configuration', 'Firewall & ACL Hardening', 'Monitoring & Documentation'],
    brief:
      'Given a small multi-building campus network with misconfigured VLANs, inconsistent DHCP scopes, missing DNS records, no firewall rules on internal segments and zero monitoring, produce a complete audit and remediation plan that includes corrected subnetting, DHCP and DNS configs, VLAN segmentation, ACL/firewall rules, SNMP monitoring setup and updated network documentation.',
    requirements: [
      'IP addressing scheme with subnet calculations and VLAN assignments',
      'DHCP scope configuration with reservations and relay agent setup',
      'DNS zone files for forward and reverse lookups with split-horizon design',
      'VLAN and trunk configuration with inter-VLAN routing design',
      'ACLs and firewall rules implementing least-privilege access',
      'SNMP monitoring plan with trap thresholds and escalation contacts',
      'Updated network diagram and change log'
    ],
    expectedOutput:
      'A professional network audit and remediation document that another network administrator could execute without additional clarification.',
    rubric: [
      { skill: 'IP Addressing', weight: 20, criteria: 'Subnet calculations correct, VLSM used efficiently, IPv6 considerations present' },
      { skill: 'DHCP & DNS', weight: 20, criteria: 'Scopes and zones configured correctly, relay agents placed, split-horizon DNS designed' },
      { skill: 'VLAN & Routing', weight: 20, criteria: 'VLANs properly segmented, trunks configured securely, inter-VLAN routing functional' },
      { skill: 'Security', weight: 25, criteria: 'ACLs follow least-privilege, switch port security enabled, firewall rules documented' },
      { skill: 'Monitoring & Docs', weight: 15, criteria: 'SNMPv3 configured, thresholds defined, network diagram current, runbooks provided' }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'Campus Network Subnetting Design',
      stage: 'Beginner',
      objective: 'Design an IP addressing and subnetting plan for a campus network with three buildings, a DMZ and a server farm.',
      requirements: ['Subnet calculations using CIDR with at least 4 subnets', 'VLAN assignments per building and function', 'IPAM table documenting all allocations', 'IPv6 considerations for at least one segment', 'Justification for each subnet size decision'],
      skillsEvaluated: ['TCP/IP & OSI Model', 'DNS & DHCP', 'Router & Switch Configuration'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: { instructions: 'Submit the complete IP addressing plan with subnet calculations.', textLabel: 'IP addressing plan', minTextLength: 1200 }
    },
    {
      title: 'DHCP & DNS Configuration Guide',
      stage: 'Foundation',
      objective: 'Write a step-by-step configuration guide for setting up DHCP and DNS on a Linux server and a Windows Server for a 200-user office.',
      requirements: ['DHCP scope configuration with exclusions and reservations', 'DNS forward and reverse zone configuration', 'Split-horizon DNS setup for internal and external resolution', 'Failover configuration for both services', 'Testing and verification steps for each configuration'],
      skillsEvaluated: ['DNS & DHCP', 'Linux & Windows Networking', 'Documentation'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: { instructions: 'Submit the configuration guide with both Linux and Windows examples.', textLabel: 'Configuration guide', minTextLength: 1400, linkLabels: ['Vendor documentation referenced'] }
    },
    {
      title: 'Network Security Hardening Runbook',
      stage: 'Advanced',
      objective: 'Create a comprehensive network hardening runbook covering switch security, firewall rules and monitoring for a multi-site enterprise.',
      requirements: ['Switch port security, DHCP snooping and DAI configurations', 'Firewall rules for DMZ, internal and guest segments', 'SNMPv3 monitoring setup with trap thresholds', 'ACLs implementing least-privilege access between VLANs', 'Change management checklist for applying the runbook'],
      skillsEvaluated: ['Firewall & ACL Management', 'Network Monitoring', 'Router & Switch Configuration'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: { instructions: 'Submit the complete security hardening runbook.', textLabel: 'Hardening runbook', minTextLength: 1500 }
    }
  ],

  simTasks: [
    {
      title: 'P0: Entire office network is down',
      context: 'At 09:15 on a Monday morning, no user in the main office can reach any internal or external resource. Wi-Fi associates but gets no IP. Wired users have link lights but cannot ping the gateway. Your monitoring dashboard shows all switch uplinks as down.',
      requirements: ['Identify the root cause (uplink failure, spanning tree loop, core switch failure)', 'Provide immediate steps to restore partial connectivity', 'Design a prevention plan (redundant uplinks, spanning tree best practices, monitoring)'],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Incident report: root cause analysis, immediate restoration steps, long-term resilience improvements.',
      skills: ['Router & Switch Configuration', 'Troubleshooting', 'Network Monitoring']
    },
    {
      title: 'New VLAN deployment for IoT devices',
      context: 'Management wants all IoT sensors and smart devices (thermostats, cameras, badge readers) moved to a dedicated VLAN for security isolation. Currently they sit on the same VLAN as user workstations. There are 35 IoT devices across two floors.',
      requirements: ['Design the new VLAN including subnet, DHCP scope and firewall rules', 'Plan the migration with zero downtime for production devices', 'Document the new VLAN and update network diagrams'],
      priority: 'high',
      dueDayOffset: 4,
      expectedOutput: 'Migration plan with configuration snippets, testing checklist and updated documentation.',
      skills: ['VLAN & Trunk Configuration', 'Firewall & ACL Management', 'Documentation']
    },
    {
      title: 'DNS resolution failures after ISP change',
      context: 'After switching ISPs last night, internal users can reach some websites but not others. External DNS resolvers work fine, but the internal DNS server intermittently fails to resolve names. Users report it started at 06:00 when DNS forwarding changed.',
      requirements: ['Diagnose the DNS forwarding configuration issue', 'Implement a fix ensuring all queries resolve correctly', 'Add monitoring and alerting for DNS health'],
      priority: 'normal',
      dueDayOffset: 6,
      expectedOutput: 'Troubleshooting notes with the DNS configuration fix and monitoring setup.',
      skills: ['DNS & DHCP', 'Linux & Windows Networking', 'Network Monitoring']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Tomás Rivera',
      personaRole: 'Systems Administrator',
      situation: 'Systems team wants to open all ports between their servers and the database segment.',
      openingMessage:
        'Our monitoring agents need to reach the database on about 15 different ports. Can you just open everything between the server VLAN and the database VLAN? It will save us a lot of back and forth.',
      expectedPoints: ['Explains the security risk of opening all ports', 'Asks for the specific port list and proposes a targeted ACL', 'Offers to create a template ACL that can be reused', 'Documents the agreed rules for audit purposes']
    },
    {
      kind: 'team',
      personaName: 'Aisha Patel',
      personaRole: 'Help Desk Lead',
      situation: 'Help desk is flooded with tickets about slow internal application access.',
      openingMessage:
        'We have 30 tickets this morning about the ERP system being painfully slow. Users say it started yesterday afternoon after the network maintenance window. Any ideas?',
      expectedPoints: ['Asks whether a VLAN change or ACL modification was made', 'Suggests checking interface errors, duplex mismatches or spanning tree reconvergence', 'Proposes packet capture to isolate the bottleneck', 'Offers to help prioritize and categorize the tickets']
    },
    {
      kind: 'client',
      personaName: 'Rachel Kim',
      personaRole: 'IT Director, BrightPath Education',
      situation: 'Client wants to connect two office buildings with a VPN instead of a dedicated link.',
      openingMessage:
        'We are opening a second building two miles away and need to share our ERP and file servers. Can we set up a site-to-site VPN instead of paying for a dedicated circuit?',
      expectedPoints: ['Evaluates bandwidth and latency requirements for the shared applications', 'Compares site-to-site VPN cost and performance vs dedicated link', 'Proposes redundancy (dual VPN or VPN plus backup circuit)', 'Provides a phased implementation timeline']
    },
    {
      kind: 'client',
      personaName: 'Marcus Johnson',
      personaRole: 'Operations Manager, Greenfield Logistics',
      situation: 'Client reports intermittent Wi-Fi drops in their warehouse.',
      openingMessage:
        'Our warehouse team keeps losing Wi-Fi on their scanners. It drops for about 30 seconds every hour or so. The scanners are critical for inventory — this is costing us money.',
      expectedPoints: ['Asks about AP placement, interference sources and client density', 'Suggests a site survey with heat mapping', 'Checks for channel overlap, power levels and roaming configuration', 'Proposes a testing plan to validate the fix before closing']
    }
  ],

  workplaceScenarios: [
    {
      category: 'Incident',
      situation: 'Thursday 14:00: a spanning tree loop has been detected on the third-floor switch stack. Broadcast traffic is spiking, users are experiencing complete network outages, and the loop is spreading to other floors via trunk links.',
      requiredActions: [
        { action: 'Identify the root port and disable the port causing the loop immediately', good: true, note: 'Quick isolation prevents the broadcast storm from consuming all bandwidth.' },
        { action: 'Enable BPDU Guard on all access ports to prevent future loops', good: true, note: 'Addresses the root cause — unauthorized switches or misconfigurations on access ports.' },
        { action: 'Notify affected departments with an ETA for full restoration', good: true, note: 'Transparent communication reduces repeat calls to the help desk.' },
        { action: 'Restart the entire switch stack to clear the loop', good: false, note: 'Restarting does not address the root cause and causes additional downtime during boot.' }
      ]
    },
    {
      category: 'Disagreement',
      situation: 'The security team insists on requiring VPN for all internal access, including on-site. The operations team says this will slow down warehouse scanning workflows and reduce productivity.',
      requiredActions: [
        { action: 'Analyze the actual performance impact of VPN on warehouse applications', good: true, note: 'Data-driven analysis replaces opinion-based arguments.' },
        { action: 'Propose a segmented approach — VPN for remote access, network access control for on-site', good: true, note: 'Compromise that addresses security concerns without crippling operations.' },
        { action: 'Document the risk assessment with and without VPN for management review', good: true, note: 'Executive decision requires complete risk context.' },
        { action: 'Side with operations and dismiss the security requirement entirely', good: false, note: 'Ignoring security requirements exposes the organization to real threat vectors.' }
      ]
    }
  ],

  interviewQuestions: [
    { dimension: 'technical_knowledge', prompt: 'Explain the difference between a VLAN and a subnet. Why do you need both?', guidancePoints: ['VLAN is a Layer 2 broadcast domain; subnet is a Layer 3 network', 'VLANs segment traffic physically on switches', 'Subnets define IP addressing and routing boundaries', 'Both work together — each VLAN typically maps to one subnet'] },
    { dimension: 'technical_knowledge', prompt: 'A user reports they can ping an IP address but cannot resolve the hostname. Walk through your troubleshooting steps.', guidancePoints: ['Verify DNS server configuration on the client (ipconfig /all)', 'Test DNS resolution directly (nslookup or dig)', 'Check if the DNS server can reach the authoritative server', 'Look for stale or missing DNS records', 'Verify reverse lookup zone for the IP'] },
    { dimension: 'problem_solving', prompt: 'After a power outage, half the users in a building cannot reach the internet while the other half can. All users are on the same VLAN. What could cause this?', guidancePoints: ['Spanning tree may not have reconverged for all switch paths', 'DHCP may have handed out incorrect gateways during recovery', 'Uplinks may have come up in the wrong state', 'Check which switch stack members are active and forwarding'] },
    { dimension: 'problem_solving', prompt: 'Design a network monitoring strategy for a company with 500 users across 3 sites. What do you monitor and how?', guidancePoints: ['SNMPv3 for device health (CPU, memory, interface errors)', 'NetFlow/sFlow for traffic analysis and anomaly detection', 'Syslog aggregation for event correlation', 'Threshold-based alerting with escalation paths', 'Dashboard visibility for operations team'] },
    { dimension: 'professional_reasoning', prompt: 'You discover an unmanaged switch plugged into the network by a user who needed more ports. How do you handle it?', guidancePoints: ['Immediately assess the security exposure (MAC flooding, spanning tree impact)', 'Disable the port and relocate to a managed switch', 'Understand the user need that motivated the action', 'Propose a self-service port request process to prevent recurrence'] },
    { dimension: 'professional_reasoning', prompt: 'When would you recommend a software-defined networking (SDN) approach over traditional network configuration?', guidancePoints: ['Large-scale environments needing rapid, consistent changes', 'Multi-cloud or hybrid environments', 'When micro-segmentation is required for zero-trust', 'When manual CLI configuration cannot keep pace with demand', 'Cost-benefit analysis of SDN investment vs operational savings'] },
    { dimension: 'communication', prompt: 'Explain to a non-technical office manager why moving to a new building requires a $50,000 network infrastructure investment.', guidancePoints: ['Use analogies (plumbing, electrical) to explain network infrastructure', 'Tie costs to business outcomes (reliable access, security, growth)', 'Break costs into categories (switches, cabling, wireless, security)', 'Compare cost of doing it right vs retrofitting later'] },
    { dimension: 'communication', prompt: 'You need to schedule a network maintenance window that will cause 30 minutes of downtime. How do you communicate this?', guidancePoints: ['Send notification at least 72 hours in advance with clear impact description', 'Specify exact start and end time with timezone', 'Provide a rollback plan and contact for issues', 'Send confirmation when maintenance is complete and services are restored'] }

  ]

}