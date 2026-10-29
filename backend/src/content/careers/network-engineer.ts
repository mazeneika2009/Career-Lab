import type { CareerDef } from '../framework.js'

export const networkEngineer: CareerDef = {
  slug: 'network-engineer',
  name: 'Network Engineer',
  category: 'IT & Cloud',
  order: 29,
  description:
    'Designs and operates routed/switched networks — TCP/IP, VLANs, Cisco and Juniper configurations, troubleshooting.',
  difficulty: 'Advanced',
  pathSummary:
    'TCP/IP fundamentals & subnetting → VLAN design & switching → routing protocols & WAN connectivity → network security, monitoring & automation.',
  mainSkills: [
    'TCP/IP & OSI Model',
    'VLAN Design & Switching',
    'Routing Protocols (OSPF, BGP)',
    'Cisco IOS & Juniper Junos',
    'Packet Analysis with Wireshark',
    'Network Security & ACLs',
    'WAN & VPN Configuration',
    'Network Automation'
  ],
  sourcePlatforms: [
    'Cisco',
    'Juniper',
    'IETF / RFC',
    'Wireshark',
    'CompTIA'
  ],
  companyName: 'NorthBridge Networks',
  roleTitle: 'Network Engineer',

  chapters: [
    {
      slug: 'tcp-ip-fundamentals',
      stage: 'Beginner',
      title: 'TCP/IP Fundamentals & Subnetting',
      description: 'Core networking models, IP addressing, subnetting and the protocols that form every routed conversation.',
      topics: [
        {
          slug: 'osi-and-tcp-ip-models',
          title: 'OSI & TCP/IP Models',
          minutes: 28,
          objectives: [
            'Describe the seven OSI layers and the four-layer TCP/IP model and map functions to each',
            'Explain encapsulation, de-encapsulation and how PDUs change at each layer',
            'Compare the practical relevance of the TCP/IP model versus the OSI reference model in modern networks'
          ],
          sections: [
            { heading: 'The OSI reference model', body: 'The Open Systems Interconnection model defines seven layers — Physical, Data Link, Network, Transport, Session, Presentation and Application — each responsible for a distinct function. Physical handles cabling and signaling, Data Link manages frame delivery on a local segment, Network routes packets across networks, Transport ensures reliable or unreliable end-to-end delivery, and the upper layers handle session management, data formatting and user-facing applications. Understanding each layer lets you isolate problems to the correct domain quickly.' },
            { heading: 'The TCP/IP model in practice', body: 'Most production networks run the TCP/IP model, which collapses OSI layers into four: Link, Internet, Transport and Application. Ethernet and Wi-Fi operate at Link, IP at Internet, TCP and UDP at Transport, and HTTP/DNS/SSH at Application. Every routing and switching decision you make maps to one of these layers. The TCP/IP model is not just academic — it is the mental model every network engineer uses when troubleshooting.' },
            { heading: 'Encapsulation and protocol data units', body: 'As data moves down the stack, each layer wraps the payload with its own header. Application data becomes a TCP segment with port numbers, then an IP packet with source and destination addresses, then an Ethernet frame with MAC addresses. Wireshark captures let you see each layer of this wrapping. Understanding encapsulation is essential for reading packet captures and diagnosing where a conversation breaks down.' }
          ],
          links: [
            { title: 'RFC 1122 — Requirements for Internet Hosts', url: 'https://datatracker.ietf.org/doc/html/rfc1122', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'Foundational RFC defining host requirements across the TCP/IP link, internet and transport layers.' },
            { title: 'Cisco — The OSI Model and TCP/IP Model', url: 'https://www.cisco.com/c/en/us/solutions/what-is-a-network/osI-model-tcp-ip-model.html', sourceName: 'Cisco', resourceType: 'guide', relationship: 'Cisco overview comparing the OSI and TCP/IP models with practical examples.' },
            { title: 'CompTIA Network+ OSI Model', url: 'https://www.comptia.org/content/n10-008-study-guide/the-osi-model', sourceName: 'CompTIA', resourceType: 'guide', relationship: 'CompTIA Network+ study material covering the seven OSI layers and their functions.' }
          ],
          quiz: {
            prompt: 'A switch receives a frame, looks at the destination MAC address, and forwards it out the correct port. At which OSI layer is this device operating?',
            options: [
              'Network layer',
              'Transport layer',
              'Data Link layer',
              'Physical layer'
            ],
            answerIndex: 2,
            explanation: 'A switch makes forwarding decisions based on MAC addresses, which are Data Link layer (Layer 2) identifiers. Routers operate at the Network layer (Layer 3) using IP addresses.'
          }
        },
        {
          slug: 'ip-addressing-subnetting',
          title: 'IP Addressing & Subnetting',
          minutes: 30,
          objectives: [
            'Calculate subnets, broadcast addresses and usable host ranges from a CIDR notation',
            'Explain the purpose of subnet masks, default gateways and ARP in local communication',
            'Apply VLSM to design an efficient IP addressing scheme for a multi-subnet topology'
          ],
          sections: [
            { heading: 'IPv4 addressing anatomy', body: 'An IPv4 address is a 32-bit number written as four octets. The subnet mask determines which bits represent the network portion and which represent the host portion. A /24 mask (255.255.255.0) gives 256 addresses per subnet with 254 usable hosts. Understanding binary subnet math is non-negotiable — you must be able to quickly determine the network address, broadcast address and host range for any CIDR block.' },
            { heading: 'Variable Length Subnet Masking (VLSM)', body: 'VLSM lets you carve a larger network into subnets of different sizes. A /24 block can be split into two /25 subnets (126 hosts each), four /26 subnets (62 hosts each) or a mix of /25, /26 and /27 blocks. This conserves address space and avoids wasted addresses. The key rule is to allocate from the largest subnet first, then progressively smaller ones, to prevent overlapping ranges.' },
            { heading: 'ARP and local delivery', body: 'When a host wants to send a packet to another host on the same subnet, it needs the destination MAC address. The Address Resolution Protocol broadcasts an ARP request — "who has 192.168.1.50?" — and the owner replies with its MAC. The result is cached in the ARP table. ARP operates between the Network and Data Link layers and is fundamental to understanding how packets actually reach their destination on a local segment.' }
          ],
          links: [
            { title: 'RFC 919 — Classful Multicast Subnets', url: 'https://datatracker.ietf.org/doc/html/rfc919', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'RFC explaining subnet broadcast addressing in classful networks.' },
            { title: 'Cisco — IP Subnetting Calculator', url: 'https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13769-52.html', sourceName: 'Cisco', resourceType: 'tool', relationship: 'Cisco guide and reference for subnetting calculations and CIDR notation.' },
            { title: 'CompTIA Network+ IP Addressing', url: 'https://www.comptia.org/content/n10-008-study-guide/ip-addressing', sourceName: 'CompTIA', resourceType: 'guide', relationship: 'CompTIA study material covering IPv4 addressing, subnetting and VLSM.' }
          ],
          quiz: {
            prompt: 'You are given the network 172.16.10.0/24 and need to create subnets that each support at least 50 hosts. What is the largest CIDR prefix that works?',
            options: [
              '/26 (62 hosts)',
              '/27 (30 hosts)',
              '/25 (126 hosts)',
              '/28 (14 hosts)'
            ],
            answerIndex: 2,
            explanation: 'A /25 subnet provides 126 usable host addresses, which is the smallest standard subnet that supports at least 50 hosts. A /26 provides only 62 usable hosts, which also meets the requirement, but /25 is the largest prefix (fewest subnets) that satisfies it.'
          }
        },
        {
          slug: 'tcp-udp-and-core-protocols',
          title: 'TCP, UDP & Core Protocols',
          minutes: 28,
          objectives: [
            'Explain the TCP three-way handshake and how reliable delivery is maintained',
            'Compare TCP and UDP characteristics and identify which applications use each',
            'Describe the role of DNS, DHCP and ICMP in network operation and troubleshooting'
          ],
          sections: [
            { heading: 'TCP — reliable transport', body: 'TCP establishes connections through a three-way handshake: SYN, SYN-ACK, ACK. Once established, it uses sequence numbers, acknowledgments and retransmission to guarantee delivery. Flow control via sliding windows prevents a fast sender from overwhelming a slow receiver. Congestion control algorithms (slow start, congestion avoidance) prevent network collapse. TCP is the backbone of HTTP, SSH, SMTP and any application that cannot tolerate data loss.' },
            { heading: 'UDP — fast and lightweight', body: 'UDP sends datagrams with no connection setup, no acknowledgment and no retransmission. This makes it fast but unreliable. Applications that value latency over reliability — DNS queries, VoIP, video streaming, gaming — use UDP. When a UDP application needs reliability, it implements it at the application layer (like QUIC does for HTTP/3). Understanding when to use TCP versus UDP is a fundamental network design decision.' },
            { heading: 'DNS, DHCP and ICMP', body: 'DNS translates hostnames to IP addresses using a hierarchical distributed database. DHCP dynamically assigns IP addresses, subnet masks, default gateways and DNS servers to hosts. ICMP provides diagnostic and error messages — ping uses ICMP echo request/reply, and traceroute uses ICMP time-exceeded. Together these three protocols keep networks functional and make troubleshooting possible. Wireshark captures of DNS lookups and DHCP handshakes are among the first things a network engineer learns to read.' }
          ],
          links: [
            { title: 'RFC 793 — Transmission Control Protocol', url: 'https://datatracker.ietf.org/doc/html/rfc793', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'The original RFC defining TCP including the three-way handshake and reliable delivery mechanisms.' },
            { title: 'Cisco — TCP/IP Transport Layer Protocols', url: 'https://www.cisco.com/c/en/us/support/docs/ip/transmission-control-protocol-tcp/13777-tcp-udp.html', sourceName: 'Cisco', resourceType: 'guide', relationship: 'Cisco comparison of TCP and UDP characteristics and use cases.' },
            { title: 'Wireshark — Display Filter Reference', url: 'https://www.wireshark.org/docs/man-pages/wireshark-filter.html', sourceName: 'Wireshark', resourceType: 'reference', relationship: 'Wireshark filter reference for isolating TCP, UDP, DNS and ICMP traffic in captures.' }
          ],
          quiz: {
            prompt: 'An application sends small request-response messages with strict latency requirements of under 5ms and can tolerate occasional packet loss. Which transport protocol is most appropriate?',
            options: [
              'TCP with Nagle\'s algorithm disabled',
              'UDP',
              'SCTP',
              'TCP with window scaling'
            ],
            answerIndex: 1,
            explanation: 'UDP is the best choice when low latency matters more than guaranteed delivery. TCP\'s handshake, retransmission and ordering add overhead that would violate the 5ms latency requirement even with Nagle disabled.'
          }
        }
      ]
    },
    {
      slug: 'vlan-design-switching',
      stage: 'Foundation',
      title: 'VLAN Design & Layer 2 Switching',
      description: 'Building scalable switched networks with VLANs, trunking, spanning tree and link aggregation.',
      topics: [
        {
          slug: 'vlan-trunking',
          title: 'VLAN Configuration & 802.1Q Trunking',
          minutes: 30,
          objectives: [
            'Configure access and trunk ports on a Cisco switch using IOS commands',
            'Explain how 802.1Q tagging preserves VLAN information across trunk links',
            'Design a VLAN scheme that segments broadcast domains by department or function'
          ],
          sections: [
            { heading: 'Why VLANs exist', body: 'Without VLANs, every port on a switch belongs to the same broadcast domain. A single broadcast storm can bring down the entire network. VLANs logically partition a switch into separate broadcast domains — ports assigned to VLAN 10 cannot see broadcast traffic from VLAN 20 without a router. This segmentation improves security, reduces broadcast overhead and simplifies traffic management across floors, departments or functions.' },
            { heading: 'Access ports versus trunk ports', body: 'An access port belongs to a single VLAN and carries untagged traffic to end devices. A trunk port carries traffic for multiple VLANs between switches using 802.1Q tagging — a 4-byte header inserted into the Ethernet frame that identifies the VLAN. Native VLANs on trunks carry untagged traffic. Misconfiguring trunk native VLANs is one of the most common causes of VLAN hopping attacks and unexpected traffic leakage in production networks.' },
            { heading: 'VLAN design best practices', body: 'Map VLANs to functional boundaries: one VLAN per department, one for servers, one for management, one for VoIP. Use consistent VLAN numbering across the campus. Keep native VLANs unused or set to a dedicated VLAN that carries no user traffic. Document every VLAN with its ID, purpose, subnet and associated ports. This documentation is invaluable during troubleshooting and during audits.' }
          ],
          links: [
            { title: 'IEEE 802.1Q — VLAN Tagging Standard', url: 'https://standards.ieee.org/ieee/802.1Q/1032/', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'The IEEE standard defining VLAN tagging and trunking behavior on Ethernet networks.' },
            { title: 'Cisco — Configuring VLANs', url: 'https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9600/software/release/17-6/configuration_guide/vlan/b_176_vlan_9600_cg/configuring_802_1q.html', sourceName: 'Cisco', resourceType: 'documentation', relationship: 'Cisco configuration guide for creating VLANs and configuring 802.1Q trunking on Catalyst switches.' },
            { title: 'CompTIA Network+ VLANs', url: 'https://www.comptia.org/content/n10-008-study-guide/vlans', sourceName: 'CompTIA', resourceType: 'guide', relationship: 'CompTIA Network+ study material explaining VLAN concepts, benefits and configuration basics.' }
          ],
          quiz: {
            prompt: 'Two switches are connected by a trunk link. Host A on VLAN 10 sends a broadcast frame. What happens at the trunk link?',
            options: [
              'The frame is dropped because broadcasts cannot cross trunks',
              'The frame is sent with a VLAN 10 tag so the receiving switch knows which VLAN it belongs to',
              'The frame is stripped of its VLAN tag and forwarded untagged',
              'The frame is encapsulated in a new Ethernet header without any VLAN information'
            ],
            answerIndex: 1,
            explanation: '802.1Q trunking tags frames with their VLAN ID so the receiving switch can deliver them to the correct VLAN. Without tagging, the receiving switch would not know which broadcast domain the frame belongs to.'
          }
        },
        {
          slug: 'spanning-tree-protocol',
          title: 'Spanning Tree Protocol (STP)',
          minutes: 30,
          objectives: [
            'Explain why STP is necessary and how it prevents Layer 2 loops',
            'Describe the STP election process: root bridge, root ports and designated ports',
            'Configure RSTP (802.1w) for fast convergence in a redundant switched topology'
          ],
          sections: [
            { heading: 'The Layer 2 loop problem', body: 'Redundant links between switches provide high availability, but without loop prevention they create broadcast storms. A single broadcast frame endlessly circulating through redundant links will consume all available bandwidth within seconds, crashing the network. Spanning Tree Protocol solves this by logically blocking redundant paths while keeping them available as instant failovers if the active path fails.' },
            { heading: 'STP election and port roles', body: 'STP elects a root bridge — the switch with the lowest Bridge ID (priority plus MAC). Every other switch computes the shortest path to the root and blocks redundant paths. Root ports have the best path to the root, designated ports are the best path from a segment to the root, and blocked ports are redundant paths held in standby. When a link fails, STP recalculates and unblocks the best alternate path. Classic STP (802.1D) converges in 30-50 seconds; RSTP converges in under 1 second.' },
            { heading: 'RSTP and modern convergence', body: 'Rapid Spanning Tree (802.1w) replaces the old blocking/listening/learning states with discarding, learning and forwarding. It uses proposal-agreement handshakes for near-instant convergence. Combined with PortFast on access ports and BPDU Guard to protect against rogue switches, RSTP provides the fast, predictable failover that modern networks require. For multi-VLAN environments, MSTP (802.1s) maps multiple VLANs to a single STP instance to reduce CPU overhead.' }
          ],
          links: [
            { title: 'IEEE 802.1D — Spanning Tree Protocol', url: 'https://standards.ieee.org/ieee/802.1D/1045/', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'The IEEE standard defining STP for bridge loop prevention in switched networks.' },
            { title: 'Cisco — Spanning Tree Protocol Configuration', url: 'https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9600/software/release/17-6/configuration_guide/stp/b_176_stp_9600_cg/configuring_spanning_tree_portfast.html', sourceName: 'Cisco', resourceType: 'documentation', relationship: 'Cisco guide to configuring STP, RSTP, PortFast and BPDU Guard on Catalyst switches.' },
            { title: 'Juniper — Spanning Tree Protocols', url: 'https://www.juniper.net/documentation/us/en/software/junos/stp/topics/concept/stp-overview.html', sourceName: 'Juniper', resourceType: 'documentation', relationship: 'Juniper documentation on STP, RSTP and MSTP configuration in Junos OS.' }
          ],
          quiz: {
            prompt: 'Switch A has priority 32768 and Switch B has priority 4096. Both send BPDUs to elect a root bridge. Which switch wins?',
            options: [
              'Switch A because it has the higher priority number',
              'Switch B because it has the lower Bridge ID',
              'Neither — the switch with the lower MAC address wins',
              'They become co-root bridges in MSTP'
            ],
            answerIndex: 1,
            explanation: 'The switch with the lowest Bridge ID (priority + MAC address) wins the root bridge election. Switch B has a lower priority (4096 vs 32768), so it becomes the root bridge regardless of MAC address.'
          }
        },
        {
          slug: 'link-aggregation-etherchannel',
          title: 'Link Aggregation & EtherChannel',
          minutes: 25,
          objectives: [
            'Explain how LACP and PAgP negotiate bundled links between switches',
            'Configure a Cisco EtherChannel bundle using LACP in active mode',
            'Determine when link aggregation is appropriate versus when a single high-speed link is preferable'
          ],
          sections: [
            { heading: 'Why bundle links', body: 'A single 1 Gbps link between two switches is a bottleneck and a single point of failure. Link aggregation combines multiple physical links into one logical bundle, providing both increased bandwidth and redundancy. If one member link fails, traffic redistributes across the remaining links with sub-second convergence. The logical link appears as a single interface to spanning tree, so it does not create additional STP complexity.' },
            { heading: 'LACP versus PAgP', body: 'Link Aggregation Control Protocol (LACP, IEEE 802.3ad) is the open standard for negotiating EtherChannel bundles. Ports in active mode actively send LACP packets to discover partners; passive mode waits for LACP packets. Cisco Port Aggregation Protocol (PAgP) is Cisco-proprietary and uses desirable/auto modes. In multi-vendor environments, always use LACP. Both protocols verify that link speeds, duplex settings and VLAN configurations match before forming the bundle.' },
            { heading: 'Design considerations', body: 'All links in a bundle should be the same speed and duplex. Mismatched links cause unpredictable load balancing. Load balancing across bundle members is based on a hash of source/destination MAC addresses, IP addresses or TCP/UDP ports depending on the platform. A four-link bundle does not guarantee four times the throughput for a single flow — a single conversation always uses one member link. Plan bundle sizes based on the number of concurrent flows, not the peak bandwidth of a single flow.' }
          ],
          links: [
            { title: 'IEEE 802.3ad — Link Aggregation', url: 'https://standards.ieee.org/ieee/802.3ad/1044/', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'IEEE standard defining static and dynamic link aggregation with LACP.' },
            { title: 'Cisco — EtherChannel Configuration Guide', url: 'https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9600/software/release/17-6/configuration_guide/etherchannel/b_176_etherchannel_9600_cg/configuring_etherchannel.html', sourceName: 'Cisco', resourceType: 'documentation', relationship: 'Cisco guide to configuring EtherChannel with LACP and PAgP on Catalyst switches.' },
            { title: 'Juniper — Aggregated Ethernet Interfaces', url: 'https://www.juniper.net/documentation/us/en/software/junos/topics/concept/ethernet-aggregated-interfaces-overview.html', sourceName: 'Juniper', resourceType: 'documentation', relationship: 'Juniper documentation on configuring LACP-based aggregated Ethernet interfaces in Junos.' }
          ],
          quiz: {
            prompt: 'You configure a four-link EtherChannel between two switches but notice traffic only uses two of the four links. What is the most likely cause?',
            options: [
              'Two of the links failed and are in standby mode',
              'The hash algorithm only distributes traffic across two bucket groups',
              'LACP negotiation failed on two links',
              'STP blocked two of the links'
            ],
            answerIndex: 1,
            explanation: 'EtherChannel load balancing uses a hash of source/destination addresses. With a simple MAC-based hash, most flows map to the same bucket. Adjusting the hash algorithm to include IP addresses and ports distributes traffic more evenly across all member links.'
          }
        }
      ]
    },
    {
      slug: 'routing-protocols-wan',
      stage: 'Intermediate',
      title: 'Routing Protocols & WAN Connectivity',
      description: 'Dynamic routing with OSPF and BGP, static route design and connecting sites over WAN and VPN tunnels.',
      topics: [
        {
          slug: 'static-routing-ospf',
          title: 'Static Routes & OSPF',
          minutes: 30,
          objectives: [
            'Configure static routes for stub networks and default routes to edge routers',
            'Explain OSPF area design and how link-state advertisements propagate through an area',
            'Verify OSPF neighbor adjacencies and troubleshoot common adjacency failures'
          ],
          sections: [
            { heading: 'When static routes are the right choice', body: 'Static routes are appropriate for stub networks — destinations with a single exit point — and for default routes pointing to an ISP. They consume no CPU or bandwidth for route maintenance and give you deterministic forwarding. The downside is that they do not adapt to topology changes: if the next-hop link fails, the route stays in the routing table until manually removed. For any network with multiple paths, dynamic routing protocols are essential.' },
            { heading: 'OSPF fundamentals', body: 'Open Shortest Path First is a link-state routing protocol that builds a complete topology map of the network. Routers exchange link-state advertisements (LSAs) describing their directly connected links, costs and neighbors. Each router runs Dijkstra\'s algorithm to compute the shortest path tree. OSPF converges fast, scales well with area design and supports VLSM. Areas partition the network to limit LSA flooding — Area 0 is the backbone, and all other areas connect through it.' },
            { heading: 'OSPF adjacency troubleshooting', body: 'Two routers will not form an OSPF adjacency unless their hello/dead timers, area IDs, authentication settings and MTU sizes match. The most common failures are mismatched subnet masks on the shared link, ACLs blocking OSPF multicast (224.0.0.5) and area type mismatches between stub and non-stub areas. Use "show ip ospf neighbor" and "debug ip ospf adj" to diagnose state machine transitions from DOWN through INIT, 2-WAY and eventually FULL.' }
          ],
          links: [
            { title: 'RFC 2328 — OSPF Version 2', url: 'https://datatracker.ietf.org/doc/html/rfc2328', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'The foundational RFC defining OSPFv2 for IPv4 routing including LSA types and Dijkstra computation.' },
            { title: 'Cisco — OSPF Configuration Guide', url: 'https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9600/software/release/17-6/configuration_guide/iprouting/b_176_iprouting_9600_cg/configuring_ospf.html', sourceName: 'Cisco', resourceType: 'documentation', relationship: 'Cisco guide to configuring single-area and multi-area OSPF on IOS-XE platforms.' },
            { title: 'Juniper — OSPF Protocol Configuration', url: 'https://www.juniper.net/documentation/us/en/software/junos/ospf/topics/topic-map/ospf-configuration.html', sourceName: 'Juniper', resourceType: 'documentation', relationship: 'Juniper guide to configuring OSPF in Junos OS including area types and route summarization.' }
          ],
          quiz: {
            prompt: 'Two OSPF routers on the same subnet show a neighbor state of "2-WAY/DROTHER" and will not reach "FULL". What does this indicate?',
            options: [
              'A cable fault between the routers',
              'Both routers are DROTHERs — neither is the DR or BDR for this segment, which is normal behavior on broadcast networks',
              'MTU mismatch on the interface',
              'Area ID mismatch'
            ],
            answerIndex: 1,
            explanation: 'On broadcast multi-access networks, OSPF elects a Designated Router (DR) and Backup Designated Router (BDR). DROTHERs only form full adjacencies with the DR and BDR. Two DROTHERs reach 2-WAY and stop — this is expected and correct behavior.'
          }
        },
        {
          slug: 'bgp-internet-routing',
          title: 'BGP & Internet Routing',
          minutes: 30,
          objectives: [
            'Explain the difference between eBGP and iBGP and their respective roles in enterprise and ISP networks',
            'Describe how BGP path selection uses AS-path, local preference and MED to choose the best route',
            'Configure a basic eBGP peering between an enterprise edge router and an ISP'
          ],
          sections: [
            { heading: 'Why BGP exists', body: 'BGP is the protocol that holds the internet together. While OSPF and EIGRP handle routing within an autonomous system (AS), BGP routes between autonomous systems. ISPs, cloud providers and large enterprises use BGP to exchange reachability information for their IP prefixes. BGP is a path-vector protocol — it carries the AS-path, which is the sequence of autonomous systems a route has traversed. This AS-path is both a routing metric and a loop-prevention mechanism.' },
            { heading: 'eBGP versus iBGP', body: 'eBGP peers are in different autonomous systems — an enterprise peering with its ISP, or two ISPs peering at an internet exchange. iBGP peers are within the same AS and used to distribute external routes learned via eBGP across internal routers. iBGP requires a full mesh or route reflectors because it does not re-advertise routes learned from one iBGP peer to another. Understanding this distinction prevents the most common BGP misconfigurations.' },
            { heading: 'BGP path selection', body: 'BGP does not use hop count. It follows a deterministic best-path algorithm: highest weight (Cisco-specific), highest local preference, locally originated routes, shortest AS-path, lowest origin type, lowest MED, eBGP over iBGP, lowest IGP metric to next-hop, and oldest route as a tiebreaker. Manipulating local preference and AS-path with route-maps is how enterprises control which ISP link carries primary traffic versus backup.' }
          ],
          links: [
            { title: 'RFC 4271 — A Border Gateway Protocol 4', url: 'https://datatracker.ietf.org/doc/html/rfc4271', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'The core BGP specification defining path attributes, message types and the decision process.' },
            { title: 'Cisco — BGP Configuration Guide', url: 'https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_bgp/configuration/xe-16/irg-xe-16-book/bgp-config-guide-xe.html', sourceName: 'Cisco', resourceType: 'documentation', relationship: 'Cisco guide to configuring eBGP and iBGP, route-maps and path manipulation on IOS-XE.' },
            { title: 'Juniper — BGP Protocol Overview', url: 'https://www.juniper.net/documentation/us/en/software/junos/protocols/topics/ref/statement/protocols-bgp.html', sourceName: 'Juniper', resourceType: 'documentation', relationship: 'Juniper reference for BGP configuration statements and policy options in Junos OS.' }
          ],
          quiz: {
            prompt: 'An enterprise learns the same prefix from two ISPs. ISP A has a shorter AS-path (AS 100 → AS 200) while ISP B has a longer AS-path (AS 300 → AS 400 → AS 200). All other attributes are default. Which path does BGP choose?',
            options: [
              'ISP B because it has more AS hops providing better redundancy',
              'ISP A because shortest AS-path is the primary tiebreaker after local preference and origin',
              'Both — BGP load balances across both paths by default',
              'Neither — BGP cannot choose between different ISPs'
            ],
            answerIndex: 1,
            explanation: 'With default attributes, BGP selects the path with the shortest AS-path. ISP A has two AS hops versus ISP B\'s three, so ISP A wins the best-path selection.'
          }
        },
        {
          slug: 'vpn-and-wan-technologies',
          title: 'VPN Tunnels & WAN Connectivity',
          minutes: 30,
          objectives: [
            'Configure an IPsec site-to-site VPN tunnel between two Cisco routers',
            'Compare DMVPN, SD-WAN and MPLS as WAN connectivity options for branch offices',
            'Explain how GRE tunnels encapsulate traffic and when GRE over IPsec is necessary'
          ],
          sections: [
            { heading: 'Site-to-site IPsec VPN', body: 'IPsec provides encrypted, authenticated tunnels between two sites over the public internet. The IKE Phase 1 establishes a management SA with Diffie-Hellman key exchange and authentication. Phase 2 negotiates the IPSec SA specifying encryption (AES-256), hashing (SHA-256) and the traffic selectors (which subnets are permitted). GRE over IPsec combines GRE\'s ability to route multicast and non-IP protocols with IPsec\'s encryption, creating a flexible encrypted tunnel that supports OSPF, EIGRP and voice traffic across the WAN.' },
            { heading: 'DMVPN and dynamic tunnels', body: 'Dynamic Multipoint VPN (DMVPN) builds a mesh of IPsec tunnels on demand using NHRP (Next Hop Resolution Protocol). A central hub router acts as the NHRP server, and spoke routers register their public IP addresses. When spoke A needs to reach spoke B, it queries NHRP for spoke B\'s public address and builds a direct tunnel. This eliminates the need for a full-mesh IPsec configuration and reduces hub bottleneck traffic. Phase 3 DMVPN adds spoke-to-spoke shortcut switching.' },
            { heading: 'SD-WAN versus MPLS', body: 'MPLS provides private, carrier-routed WAN connectivity with traffic engineering and SLA guarantees but at significant cost. SD-WAN overlays encrypted tunnels over any combination of internet, LTE and MPLS links, using application-aware routing to steer traffic based on real-time path quality. SD-WAN is cheaper and more flexible but depends on internet quality. Many enterprises run hybrid architectures — MPLS for latency-sensitive applications, internet for bulk traffic — with SD-WAN orchestration managing both.' }
          ],
          links: [
            { title: 'RFC 4301 — Security Architecture for the Internet Protocol', url: 'https://datatracker.ietf.org/doc/html/rfc4301', sourceName: 'IETF / RFC', resourceType: 'reference', relationship: 'The foundational RFC defining the IPsec architecture including AH, ESP and security associations.' },
            { title: 'Cisco — DMVPN Configuration Guide', url: 'https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/sec_conn_dmvpn/configuration/xe-16/sec-conn-dmvpn-xe-16-book.html', sourceName: 'Cisco', resourceType: 'documentation', relationship: 'Cisco guide to deploying DMVPN with IPsec, NHRP and spoke-hub topologies on IOS-XE.' },
            { title: 'Wireshark — IPsec Decryption', url: 'https://www.wireshark.org/tools/decrypt-ietf.html', sourceName: 'Wireshark', resourceType: 'tool', relationship: 'Wireshark tools and techniques for decrypting IPsec ESP traffic during VPN troubleshooting.' }
          ],
          quiz: {
            prompt: 'You need to run OSPF between two sites over an IPsec VPN. Standard IPsec does not support multicast. What is the correct solution?',
            options: [
              'Switch to EIGRP because it uses unicast',
              'Enable OSPF unicast adjacency over the IPsec tunnel',
              'Encapsulate the OSPF traffic in a GRE tunnel and protect the GRE tunnel with IPsec',
              'Configure multicast routing on the IPsec peer interfaces'
            ],
            answerIndex: 2,
            explanation: 'GRE tunnels encapsulate any Layer 3 protocol including multicast, which OSPF needs for neighbor discovery. GRE over IPsec provides both multicast support and encryption, making it the standard solution for running dynamic routing protocols over encrypted WAN links.'
          }
        }
      ]
    },
    {
      slug: 'network-security-monitoring',
      stage: 'Advanced',
      title: 'Network Security, Monitoring & Automation',
      description: 'Securing network devices, monitoring traffic with packet analysis and automating configuration with modern tools.',
      topics: [
        {
          slug: 'access-control-lists-firewall',
          title: 'ACLs & Network Security Hardening',
          minutes: 30,
          objectives: [
            'Write standard and extended ACLs to filter traffic on Cisco routers and switches',
            'Harden network devices by securing management access, SNMP and logging',
            'Explain how stateful firewalls differ from packet-filtering ACLs'
          ],
          sections: [
            { heading: 'Standard versus extended ACLs', body: 'Standard ACLs (1-99) filter based only on source IP address and are placed close to the destination to avoid blocking traffic prematurely. Extended ACLs (100-199) filter on source and destination IP, protocol, port number and can inspect TCP flags. Extended ACLs are placed close to the source to drop unwanted traffic before it traverses the network. Both types process entries top-down and implicitly deny everything not explicitly permitted — you must remember the implicit deny at the end.' },
            { heading: 'Device hardening', body: 'Network devices are high-value targets because compromising one gives an attacker visibility into all traffic. Disable unused ports, remove default credentials, enable SSH instead of Telnet for management, use AAA with TACACS+ for centralized authentication, encrypt SNMP with SNMPv3, enable login banners and restrict management access to specific VLANs or VPN tunnels. Configuration backups should be encrypted and stored off-device for disaster recovery.' },
            { heading: 'Stateful firewall versus ACL', body: 'A packet-filtering ACL evaluates each packet in isolation. A stateful firewall tracks connection state — it knows that a SYN-ACK is part of an established TCP session and allows return traffic automatically. Stateful inspection also enables deep packet inspection, application-layer gateways and IPS integration. Modern next-generation firewalls add URL filtering, SSL decryption and user identity mapping. ACLs remain useful for quick filtering on routers; firewalls are the primary enforcement point.' }
          ],
          links: [
            { title: 'Cisco — IP Access List Configuration Guide', url: 'https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9600/software/release/17-6/configuration_guide/security/b_176_security_9600_cg/configuring_ip_access_lists.html', sourceName: 'Cisco', resourceType: 'documentation', relationship: 'Cisco guide to configuring standard and extended ACLs on Catalyst 9600 switches.' },
            { title: 'Juniper — Firewall Filter Configuration', url: 'https://www.juniper.net/documentation/us/en/software/junos/topics/concept/firewall-filter-overview.html', sourceName: 'Juniper', resourceType: 'documentation', relationship: 'Juniper documentation on configuring stateless and stateful firewall filters in Junos.' },
            { title: 'CompTIA Network+ Security', url: 'https://www.comptia.org/content/n10-008-study-guide/network-security', sourceName: 'CompTIA', resourceType: 'guide', relationship: 'CompTIA Network+ study material covering network security concepts including ACLs and firewalls.' }
          ],
          quiz: {
            prompt: 'You need to block all HTTP traffic from subnet 10.1.0.0/16 to a web server at 192.168.1.100 while allowing all other traffic. Where should you place the ACL?',
            options: [
              'As a standard ACL on the web server\'s interface',
              'As an extended ACL on the interface closest to the 10.1.0.0/16 source',
              'As an extended ACL on the web server\'s outbound interface',
              'As a standard ACL on every router in the path'
            ],
            answerIndex: 1,
            explanation: 'Extended ACLs should be placed as close to the source as possible to drop unwanted traffic before it wastes bandwidth across the network. Placing it at the source interface blocks HTTP immediately without traversing the core.'
          }
        },
        {
          slug: 'wireshark-packet-analysis',
          title: 'Wireshark & Packet Capture Analysis',
          minutes: 30,
          objectives: [
            'Capture targeted traffic using display filters and capture filters in Wireshark',
            'Analyze TCP retransmissions, latency and window size issues from a packet capture',
            'Use Wireshark IO graphs and conversation statistics to identify bandwidth-heavy flows'
          ],
          sections: [
            { heading: 'Capture planning', body: 'Before starting a capture, define what you are looking for. Capture filters (BPF syntax) reduce the capture size at the kernel level — "host 10.1.1.5 and port 443" captures only HTTPS traffic to that host. Without a capture filter, a busy link produces gigabytes of data in minutes. Always capture on the correct interface and direction — capturing on the wrong side of a router means you see routed traffic, not the original broadcast.' },
            { heading: 'TCP performance analysis', body: 'Wireshark color-codes TCP problems: black means out-of-order, red means retransmission and light purple means duplicate ACKs. A high retransmission rate indicates packet loss — check the TCP analysis flags column for "Previous segment not captured" and "Spurious retransmission." Window size shrinking to zero means the receiver is overwhelmed. Use the TCP stream graph to visualize throughput over time and identify exactly when and where performance degrades.' },
            { heading: 'IO graphs and conversation statistics', body: 'IO Graphs plot throughput over time with configurable filters — compare HTTP versus HTTPS traffic, or visualize traffic from a specific host across the capture window. Conversation Statistics shows the top talkers by bytes, packets and packets-per-second. Statistics → Endpoints lists every IP and MAC address seen. These tools transform a raw capture into actionable intelligence about which hosts and applications are consuming bandwidth or generating errors.' }
          ],
          links: [
            { title: 'Wireshark Official Documentation', url: 'https://www.wireshark.org/docs/', sourceName: 'Wireshark', resourceType: 'documentation', relationship: 'Official Wireshark documentation covering capture setup, display filters, analysis tools and protocols.' },
            { title: 'Wireshark Display Filter Reference', url: 'https://www.wireshark.org/docs/man-pages/wireshark-filter.html', sourceName: 'Wireshark', resourceType: 'reference', relationship: 'Complete reference for Wireshark display filter syntax and protocol-specific filter fields.' },
            { title: 'Cisco — Network Traffic Analysis with Wireshark', url: 'https://www.cisco.com/c/en/us/support/docs/quality-of-service-qos/wireshark-capture-files/22378-network-analysis-wireshark.html', sourceName: 'Cisco', resourceType: 'guide', relationship: 'Cisco guide to using Wireshark for network troubleshooting and traffic analysis.' }
          ],
          quiz: {
            prompt: 'In a Wireshark capture you see a high rate of TCP retransmissions from a server. The TCP window size is consistently near zero. What is the most likely root cause?',
            options: [
              'The server NIC is faulty',
              'The server is overloaded and cannot process incoming data fast enough, causing the receiver window to close',
              'The client is sending too many simultaneous connections',
              'DNS resolution is slow on the server'
            ],
            answerIndex: 1,
            explanation: 'A zero or near-zero TCP receive window means the server\'s TCP stack is overwhelmed — it has data in its receive buffer it cannot process. This causes the sender to slow down (flow control) and eventually retransmit when buffers overflow. The fix is addressing the server-side bottleneck, not the network.'
          }
        },
        {
          slug: 'network-automation-python',
          title: 'Network Automation with Python & Ansible',
          minutes: 30,
          objectives: [
            'Use Netmiko or NAPALM to connect to Cisco and Juniper devices and execute commands programmatically',
            'Write an Ansible playbook that deploys a VLAN configuration across multiple switches',
            'Explain the role of model-driven telemetry (gNMI, NETCONF) in modern network monitoring'
          ],
          sections: [
            { heading: 'Why automate the network?', body: 'Manual CLI configuration is error-prone, slow and unscalable. A single typo in a VLAN configuration on 50 switches means 50 errors. Network automation tools connect to devices via SSH or API, push validated configurations and verify the result. The same playbook that deploys a VLAN today can deploy 500 VLANs tomorrow without additional effort. Automation also creates an audit trail — every change is version-controlled and repeatable.' },
            { heading: 'Python for network engineers', body: 'Netmiko simplifies SSH connections to network devices with platform-specific handlers for Cisco IOS, Juniper Junos, Arista EOS and dozens of others. NAPALM adds a vendor-neutral API for getting and loading configurations. Use these libraries to build scripts that pull interface status from 100 routers in parallel, validate configurations against a golden template or push bulk changes with rollback capability. Python is the lingua franca of network automation because of its readability and extensive networking libraries.' },
            { heading: 'Ansible and model-driven telemetry', body: 'Ansible uses YAML playbooks and SSH (no agents) to push configurations to network devices. The cisco.ios and junipernetworks.junos collections provide modules for VLAN, interface, routing and security configuration. For modern monitoring, model-driven telemetry replaces polling with push-based streaming: gNMI (gRPC Network Management Interface) and NETCONF stream device state to collectors in real time. This provides sub-second visibility into interface counters, BGP peer state and environmental data without the overhead of SNMP polling.' }
          ],
          links: [
            { title: 'Cisco — Network Automation with Ansible', url: 'https://www.cisco.com/c/en/us/solutions/why-cisco/automate-with-ansible.html', sourceName: 'Cisco', resourceType: 'guide', relationship: 'Cisco resources for using Ansible with IOS, IOS-XE and NX-OS network platforms.' },
            { title: 'Juniper — PyEZ Automation Framework', url: 'https://www.juniper.net/documentation/us/en/software/junos/pyez/topics/concept/junos-pyez-overview.html', sourceName: 'Juniper', resourceType: 'documentation', relationship: 'Juniper Python library for automating Junos OS device configuration and operational state retrieval.' },
            { title: 'Wireshark — Capturing gNMI/NETCONF Traffic', url: 'https://www.wireshark.org/docs/man-pages/wireshark-filter.html', sourceName: 'Wireshark', resourceType: 'tool', relationship: 'Wireshark display filters for inspecting gNMI and NETCONF traffic during automation debugging.' }
          ],
          quiz: {
            prompt: 'You need to deploy the same OSPF configuration to 30 Cisco switches. Which approach provides the best repeatability, auditability and error prevention?',
            options: [
              'SSH into each switch manually and paste the configuration',
              'Write a Python script using Netmiko to push the configuration from a template and log the result',
              'Email the configuration to each switch administrator',
              'Use TFTP to copy a startup-config to each switch'
            ],
            answerIndex: 1,
            explanation: 'A Python script using Netmiko can connect to all 30 switches, push the configuration from a validated template, capture the output for verification and log every change. This provides repeatability, an audit trail and eliminates manual copy-paste errors.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Enterprise Network Design, Deployment & Troubleshooting',
    coverage: [
      'TCP/IP & Subnetting',
      'VLAN Design & Trunking',
      'OSPF Routing & Path Selection',
      'VPN Configuration',
      'Packet Analysis & Troubleshooting',
      'Network Security Hardening'
    ],
    brief:
      'You are the network engineer at NorthBridge Networks tasked with designing and deploying a new branch office network. The branch needs segmented VLANs, redundant switching with fast convergence, OSPF routing to the corporate core, an IPsec VPN tunnel back to headquarters, and hardened device configurations. Troubleshoot connectivity issues that arise during deployment and validate the design with packet captures.',
    requirements: [
      'Design an IP addressing scheme using VLSM for four VLANs (Engineering, Finance, VoIP, Management)',
      'Configure VLANs and 802.1Q trunking on access and distribution switches',
      'Implement RSTP with PortFast and BPDU Guard on access ports for fast convergence and loop prevention',
      'Configure OSPF adjacency between the branch distribution layer and the WAN edge router',
      'Establish an IPsec site-to-site VPN tunnel to headquarters and verify encrypted traffic with Wireshark',
      'Write extended ACLs to restrict management access to the management VLAN only',
      'Secure all network devices: disable unused ports, enable SSH, configure AAA and encrypt SNMP',
      'Document the full network design with a topology diagram, VLAN table and IP allocation scheme'
    ],
    expectedOutput:
      'A complete branch office network deployment: device configurations, VLAN and IP documentation, VPN verification captures, security hardening checklist and a troubleshooting log with root cause analysis for any issues encountered.',
    rubric: [
      { skill: 'IP Addressing & VLAN Design', weight: 20, criteria: 'VLSM scheme is efficient with no overlaps, VLANs are logically segmented and documentation is complete' },
      { skill: 'Switching & STP', weight: 15, criteria: 'Trunks are correctly tagged, RSTP converges in under 2 seconds and PortFast/BPDU Guard are applied to access ports' },
      { skill: 'Routing Configuration', weight: 20, criteria: 'OSPF adjacencies form correctly, routes are installed with expected costs and failover works when primary links fail' },
      { skill: 'VPN & Security', weight: 20, criteria: 'IPsec tunnel establishes successfully, ACLs are correctly applied without blocking legitimate traffic and device hardening meets standards' },
      { skill: 'Troubleshooting & Documentation', weight: 25, criteria: 'Issues are diagnosed methodically with evidence, root causes are correctly identified and documentation is thorough enough for handoff' }
    ],
    passScore: 72
  },

  assignments: [
    {
      title: 'VLSM Addressing & VLAN Design Document',
      stage: 'Beginner',
      objective: 'Design a complete IP addressing scheme using VLSM for a multi-VLAN campus network and document the design with a topology diagram and configuration guide.',
      requirements: [
        'Design IP subnets using VLSM for at least five VLANs with different host count requirements',
        'Ensure no overlapping address spaces and efficient allocation with minimal waste',
        'Create a VLAN table mapping each VLAN to its ID, purpose, subnet and gateway',
        'Write the Cisco IOS commands to configure VLANs, trunking and access ports',
        'Produce a network diagram showing the logical and physical topology'
      ],
      skillsEvaluated: ['VLSM Subnetting', 'VLAN Design', 'Cisco IOS Configuration', 'Network Documentation'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the IP addressing scheme, VLAN table, configuration commands and network diagram. Include a brief explanation of your VLSM allocation rationale.',
        textLabel: 'Network design document with VLSM calculations',
        minTextLength: 800,
        linkLabels: ['Network topology diagram']
      }
    },
    {
      title: 'OSPF Multi-Area Design & Verification',
      stage: 'Intermediate',
      objective: 'Configure a multi-area OSPF network across simulated routers, verify convergence and troubleshoot adjacency failures using show commands and packet captures.',
      requirements: [
        'Design a three-area OSPF topology with Area 0 as the backbone',
        'Configure OSPF on all routers with correct network statements and area assignments',
        'Verify neighbor adjacencies reach FULL state on all links',
        'Introduce a deliberate misconfiguration (mismatched timers or area type) and document the troubleshooting steps to identify and resolve it',
        'Capture an OSPF hello exchange with Wireshark and annotate the LSA types'
      ],
      skillsEvaluated: ['OSPF Configuration', 'Multi-Area Design', 'Troubleshooting', 'Packet Analysis'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit router configurations, "show ip ospf neighbor" and "show ip route" outputs, the troubleshooting walkthrough and annotated Wireshark capture of OSPF hellos.',
        textLabel: 'OSPF design and troubleshooting report',
        minTextLength: 1200,
        linkLabels: ['Wireshark OSPF capture', 'Router configuration files']
      }
    },
    {
      title: 'Site-to-Site VPN & Security Audit',
      stage: 'Advanced',
      objective: 'Deploy an IPsec site-to-site VPN between two network devices, harden both endpoints and produce a security audit report comparing the configurations against best practices.',
      requirements: [
        'Configure IKE Phase 1 and Phase 2 parameters on both VPN endpoints',
        'Establish the IPsec tunnel and verify encrypted traffic using ping and Wireshark capture',
        'Harden both devices: disable unused services, enable SSH, configure login banners and restrict management access',
        'Audit the final configuration against CIS Benchmark recommendations for the platform',
        'Write a security audit report with findings, risk ratings and remediation recommendations'
      ],
      skillsEvaluated: ['IPsec VPN Configuration', 'Network Security Hardening', 'CIS Benchmark Auditing', 'Security Reporting'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit VPN configurations, Wireshark capture showing encrypted ESP traffic, the hardening checklist and the security audit report with CIS benchmark mapping.',
        textLabel: 'VPN deployment and security audit report',
        minTextLength: 1500,
        linkLabels: ['Wireshark ESP capture', 'Audit findings spreadsheet']
      }
    }
  ],

  simTasks: [
    {
      title: 'Complete network outage on the branch floor',
      context: 'Users on the third floor report no network connectivity. The help desk confirms the issue affects all departments on that floor. Core and other floors are operational. You have console access to the floor distribution switch and access switches.',
      requirements: [
        'Check interface status and VLAN assignments on the distribution and access switches',
        'Verify spanning tree is not blocking all uplinks due to a misconfiguration',
        'Test whether the issue is Layer 2 (switching) or Layer 3 (routing) by checking ARP and ping from the switch',
        'Identify whether the trunk link between the access and distribution layer is operational',
        'Restore connectivity and document the root cause and resolution'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Root cause identification with supporting evidence, the fix applied to restore connectivity and a post-incident documentation with prevention recommendations.',
      skills: ['Spanning Tree Troubleshooting', 'VLAN Verification', 'Layer 2 Diagnostics', 'Incident Documentation']
    },
    {
      title: 'Slow application performance across the WAN',
      context: 'The engineering team reports that a cloud-hosted application is intermittently slow. The issue started after a network upgrade last week. Core LAN speed tests show expected performance. The problem is isolated to traffic traversing the WAN link to the cloud provider.',
      requirements: [
        'Capture traffic on the WAN interface during a slow period and analyze with Wireshark',
        'Check TCP retransmission rates and window sizes to determine if the issue is loss or latency',
        'Verify OSPF path selection has not changed after the upgrade — check for asymmetric routing',
        'Review interface counters for CRC errors, input errors and drops on the WAN link',
        'Propose and implement a fix based on findings and verify application performance improves'
      ],
      priority: 'high',
      dueDayOffset: 3,
      expectedOutput: 'Wireshark analysis identifying the root cause, interface error verification, the corrective action taken and confirmation that application performance is restored.',
      skills: ['Wireshark Analysis', 'TCP Troubleshooting', 'WAN Diagnostics', 'Performance Optimization']
    },
    {
      title: 'New switch deployment with VLAN rollout',
      context: 'A new wing of the office is being opened next week. Two new access switches need to be deployed with four VLANs configured, trunked to the existing distribution layer and integrated into the OSPF routing domain. No existing network impact is acceptable.',
      requirements: [
        'Pre-configure the new switches with VLANs, trunk ports and access port assignments before racking',
        'Verify the configuration against the IP addressing scheme and VLAN table',
        'Rack and cable the switches, then bring up trunk links to the distribution layer',
        'Confirm spanning tree converges correctly and no loops are introduced',
        'Verify OSPF adjacency forms on the new links and routing tables are updated'
      ],
      priority: 'normal',
      dueDayOffset: 7,
      expectedOutput: 'Pre-deployment configuration files, post-deployment verification outputs (show vlan, show spanning-tree, show ip ospf neighbor) and a deployment checklist confirming all steps completed.',
      skills: ['Switch Configuration', 'VLAN Deployment', 'STP Verification', 'Change Management']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Carlos Mendez',
      personaRole: 'Network Operations Manager',
      situation: 'Your manager wants to evaluate whether the team should migrate from CLI-based device management to an automation-first approach using Ansible and Python.',
      openingMessage:
        'Leadership is pushing us to reduce configuration errors and deployment time. They want to know if we should invest in network automation tools and training. Can you assess our current workflow and propose a migration plan?',
      expectedPoints: [
        'Quantifies the current time and error rate of manual CLI-based configuration',
        'Identifies the highest-value automation candidates (VLAN deployment, backup, compliance checks)',
        'Proposes a phased rollout starting with read-only automation before moving to config changes',
        'Addresses team concerns about skill gaps and recommends a training path'
      ]
    },
    {
      kind: 'team',
      personaName: 'Priya Sharma',
      personaRole: 'Security Engineer',
      situation: 'The security team is concerned that network devices have not been hardened according to the latest CIS benchmarks.',
      openingMessage:
        'Our last audit flagged 15 critical findings on network devices — default passwords, Telnet enabled, SNMPv1 in use. We need a plan to remediate these without disrupting production traffic. What do you recommend?',
      expectedPoints: [
        'Prioritizes findings by risk: default credentials and Telnet are highest priority',
        'Proposes a maintenance window approach for changes that require device restarts',
        'Describes how to use Ansible or Netmiko to audit and remediate across all devices simultaneously',
        'Addresses the risk of locking yourself out with a rollback plan for every change'
      ]
    },
    {
      kind: 'client',
      personaName: 'Frank DeLuca',
      personaRole: 'Director of IT, Summit Healthcare',
      situation: 'The client is planning a merger and needs to connect two separate networks with different IP addressing schemes and routing protocols.',
      openingMessage:
        'We are merging with Valley Medical and their network uses 10.0.0.0/8 with EIGRP while we run 172.16.0.0/12 with OSPF. We need to connect the networks without a forklift migration. Can you design a phased integration plan?',
      expectedPoints: [
        'Proposes mutual redistribution between EIGRP and OSPF with route filtering to prevent loops',
        'Designs a phased migration plan starting with connectivity between specific sites',
        'Addresses IP address overlap risks and proposes NAT or re-addressing as needed',
        'Plans for route map controls to prevent suboptimal routing and routing loops during transition'
      ]
    },
    {
      kind: 'client',
      personaName: 'Laura Kim',
      personaRole: 'CFO, NorthBridge Logistics',
      situation: 'The client wants to reduce WAN costs by replacing MPLS circuits with SD-WAN but is concerned about reliability and security for their ERP traffic.',
      openingMessage:
        'Our MPLS bill is $40,000 per month across 12 sites. We have been told SD-WAN can cut costs by 40% but our ERP system cannot tolerate downtime. How do we evaluate this without putting our business at risk?',
      expectedPoints: [
        'Explains SD-WAN overlay architecture and how it provides encryption and path selection over internet links',
        'Proposes a pilot at two sites with side-by-side MPLS and SD-WAN to compare performance',
        'Defines SLA requirements for ERP traffic and how SD-WAN application-aware routing meets them',
        'Addresses security concerns: end-to-end encryption, no split-tunneling for sensitive applications'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'After a firmware upgrade on the core switch stack, OSPF adjacencies with two remote sites intermittently flap — going down for 30 seconds then recovering. The adjacencies were stable for months before the upgrade. The upgrade changelog mentions "improved STP convergence" but nothing about routing protocol changes.',
      requiredActions: [
        { action: 'Check OSPF hello and dead timer settings on both sides to verify they did not change during the upgrade', good: true, note: 'Firmware upgrades sometimes reset interface-level protocol settings to platform defaults.' },
        { action: 'Review the OSPF adjacency log timestamps against STP topology change events to check for correlation', good: true, note: 'The "improved STP convergence" change could be triggering brief interface resets that restart the OSPF adjacency.' },
        { action: 'Capture OSPF hello packets during a flap event to see if hellos stop arriving or if the dead timer expires', good: true, note: 'Packet captures distinguish between a router stopping hellos (routing issue) and hellos arriving but being rejected (parameter mismatch).' },
        { action: 'Roll back the firmware immediately without investigating the root cause', good: false, note: 'Rolling back without understanding the cause may hide a configuration issue that will recur on the next upgrade.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'The CISO mandates that all network device management traffic must move from in-band management VLAN to an out-of-band management network within 60 days. Currently, all configuration and monitoring is done over the production network.',
      requiredActions: [
        { action: 'Inventory all network devices and their current management access methods (SSH, SNMP, syslog, NTP)', good: true, note: 'You cannot migrate management traffic if you do not know every management connection that exists.' },
        { action: 'Design the out-of-band management network addressing, routing and access controls', good: true, note: 'The OOB network needs its own IP space, routing and security policy — it is a mini-network within the network.' },
        { action: 'Develop a phased migration plan that maintains management access throughout the 60-day window', good: true, note: 'Migrating all devices simultaneously risks losing management access to critical infrastructure during the transition.' },
        { action: 'Migrate the core switches first because they are the most critical devices', good: false, note: 'Core switches are the highest risk — if OOB access fails during migration, you lose management of the entire network. Start with access-layer devices to validate the OOB design.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between OSPF and EIGRP. When would you choose one over the other?',
      guidancePoints: [
        'OSPF is an open-standard link-state protocol using Dijkstra\'s algorithm; EIGRP is Cisco-proprietary using DUAL',
        'OSPF requires area design and explicit neighbor configuration on non-broadcast networks; EIGRP auto-discovers neighbors',
        'EIGRP converges faster due to feasible successor routes; OSPF recalculates the full SPF tree on topology changes',
        'OSPF is preferred in multi-vendor environments; EIGRP is simpler to deploy in Cisco-only networks',
        'OSPF uses cost as metric; EIGRP uses a composite metric based on bandwidth, delay, reliability and load'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'A host can ping its default gateway but cannot reach any external destination. Walk through your troubleshooting methodology.',
      guidancePoints: [
        'Verify the default gateway has a route to the destination and to the internet — check routing table on the gateway',
        'Check for ACLs on the gateway that might be blocking outbound traffic from this host\'s subnet',
        'Verify NAT is functioning — the host\'s private IP must be translated to a public IP for internet traffic',
        'Check DNS resolution — ping by IP first, then by hostname to isolate DNS from routing',
        'Verify the ISP link is up and BGP or default route to the ISP is active'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'You are deploying a new VLAN across 40 switches. VLAN 50 works on 38 switches but fails on two. The trunk is up, the VLAN exists in the database on both ends, and there are no ACLs blocking traffic. How do you diagnose this?',
      guidancePoints: [
        'Verify the VLAN is in the "active" state in the VLAN database on both switches — some platforms require "no shutdown" on the VLAN',
        'Check if STP is blocking the VLAN on the trunk — "show spanning-tree vlan 50" reveals per-VLAN STP state',
        'Verify the native VLAN matches on both ends of the trunk — a native VLAN mismatch can trap VLAN 50 traffic in the wrong VLAN',
        'Check for VTP pruning or Private VLAN configuration that might be isolating the VLAN on those specific switches',
        'Capture traffic on the trunk port during a test ping to see if frames are tagged correctly'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'After a data center migration, application latency doubled even though throughput tests show expected bandwidth. How do you find the cause?',
      guidancePoints: [
        'Check for asymmetric routing — different paths for request and response increase latency and can cause firewall drops',
        'Measure latency hop-by-hop using ICMP timestamp or path ping to identify the specific link adding delay',
        'Look for MTU mismatches causing fragmentation — large packets are fragmented at the wrong hop, adding reassembly delay',
        'Verify TCP window scaling and congestion control are not being reset by intermediate devices',
        'Compare DNS resolution times before and after — DNS delays compound with every TCP connection'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'Management wants to cut the networking budget by replacing managed switches with unmanaged ones in the new office. How do you respond?',
      guidancePoints: [
        'Quantify the business risk: unmanaged switches cannot be monitored, configured or secured remotely',
        'Explain that VLAN segmentation for security and traffic separation is impossible without managed switches',
        'Present the cost of a single network outage caused by an unmanaged switch loop versus the cost difference',
        'Offer alternatives: use managed switches at the distribution layer only and unmanaged at the access layer as a compromise',
        'Recommend a risk acceptance document if management proceeds with unmanaged switches, so accountability is shared'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'Your team is asked to support a network redesign for a critical application that will be deployed in two weeks. You know the current network cannot handle the traffic load. What do you do?',
      guidancePoints: [
        'Document the current network capacity and the projected traffic requirements with evidence',
        'Present a gap analysis showing the specific links or devices that will be overwhelmed',
        'Propose a phased approach: short-term capacity increases (link upgrades, QoS prioritization) for launch, long-term redesign after',
        'Escalate with data if needed — provide management with a risk matrix showing probability and impact of failure',
        'Ensure the decision to proceed without adequate capacity is documented with the associated risk'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain to a non-technical project manager why the network team needs a maintenance window to deploy a new VLAN versus doing it during business hours.',
      guidancePoints: [
        'Explain that VLAN changes can cause brief traffic interruption as spanning tree reconverges',
        'Use an analogy: changing VLANs is like rerouting a highway — brief disruption is inevitable even with careful planning',
        'Quantify the risk: a spanning tree loop during business hours could take down the entire floor',
        'Offer the maintenance window as a small investment: 30 minutes at 2 AM versus potentially hours of outage during business hours',
        'Commit to a rollback plan and a specific time window so the PM can communicate it to stakeholders'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'You discover that a contractor installed unmanaged switches in a secure area, bypassing the approved network design. How do you report this?',
      guidancePoints: [
        'State the facts without blame: unmanaged switches were installed in the secure area, which was not part of the approved design',
        'Explain the security impact: no VLAN segmentation, no monitoring, no access control and no audit trail',
        'Describe the risk: any device plugged into these switches has unrestricted access to the secure network segment',
        'Provide an immediate remediation plan: replace with managed switches, apply the approved configuration and verify',
        'Recommend a process improvement: require network team sign-off on all physical network changes in secure areas'
      ]
    }

  ]

}
