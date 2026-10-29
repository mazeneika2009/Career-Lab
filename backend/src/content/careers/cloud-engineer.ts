import type { CareerDef } from '../framework.js'

export const cloudEngineer: CareerDef = {
  slug: 'cloud-engineer',
  name: 'Cloud Engineer',
  category: 'IT & Cloud',
  order: 34,
  description:
    'Builds on AWS, Azure and Google Cloud — compute, storage, networking, containers and infrastructure delivery.',
  difficulty: 'Intermediate',
  pathSummary:
    'Cloud platforms & compute fundamentals → Networking, load balancing & DNS → Containers, orchestration & IaC → Monitoring, automation & multi-cloud architecture.',
  mainSkills: [
    'Cloud Compute Services (EC2, Azure VMs, GCE)',
    'Cloud Storage & Data Services',
    'Virtual Networking & VPC Design',
    'Containerization & Kubernetes Orchestration',
    'Infrastructure as Code (Terraform, CloudFormation)',
    'Cloud Monitoring & Observability',
    'CI/CD Pipeline Engineering',
    'Cost Optimization & Resource Management'
  ],
  sourcePlatforms: [
    'AWS Documentation',
    'Microsoft Azure',
    'Google Cloud',
    'Kubernetes Documentation',
    'Docker Documentation'
  ],
  companyName: 'Nimbus Cloud Engineering',
  roleTitle: 'Cloud Engineer',

  chapters: [
    {
      slug: 'cloud-foundations-compute-storage',
      stage: 'Beginner',
      title: 'Cloud Foundations, Compute & Storage',
      description: 'Understanding cloud service models, deploying compute instances across AWS, Azure and GCP, and managing object, block and file storage at scale.',
      topics: [
        {
          slug: 'cloud-computing-fundamentals',
          title: 'Cloud Computing Fundamentals',
          minutes: 25,
          objectives: [
            'Differentiate between IaaS, PaaS and SaaS and explain the shared responsibility model',
            'Compare core AWS, Azure and GCP services for compute, storage and networking',
            'Set up a cloud account hierarchy with billing alerts and resource organization'
          ],
          sections: [
            { heading: 'Cloud service models and the shared responsibility boundary', body: 'Cloud computing delivers infrastructure, platforms or software over the internet on a pay-as-you-go basis. In IaaS the provider manages hardware and virtualization while you manage the OS and applications. PaaS abstracts the OS and runtime, letting you focus on code. SaaS delivers a complete application. The shared responsibility model defines where provider obligations end and customer obligations begin — a misunderstanding of this boundary is the most common cause of cloud misconfigurations and security incidents.' },
            { heading: 'Comparing AWS, Azure and GCP core services', body: 'AWS offers the broadest service catalog with EC2 for compute, S3 for object storage, VPC for networking and RDS for managed databases. Azure integrates tightly with the Microsoft ecosystem using Azure Virtual Machines, Blob Storage, Virtual Networks and Azure SQL. GCP emphasizes data analytics and machine learning with Compute Engine, Cloud Storage, VPC and Cloud SQL. Understanding the equivalent services across providers is essential for multi-cloud engineering and migration planning.' },
            { heading: 'Account organization and billing governance', body: 'A well-organized cloud estate starts with an account or subscription hierarchy. AWS uses Organizations with organizational units and service control policies. Azure uses management groups and subscriptions. GCP uses folders and organizations with organization policies. Setting up billing alerts, budget thresholds and cost allocation tags from day one prevents bill shock and enables chargeback models. Resource tagging standards should be established early — retrofitting tags across thousands of resources is painful and error-prone.' }
          ],
          links: [
            { title: 'What Is Cloud Computing?', url: 'https://aws.amazon.com/what-is-cloud-computing/', sourceName: 'AWS Documentation', resourceType: 'guide', relationship: 'AWS overview of cloud computing concepts, service models and the shared responsibility model.' },
            { title: 'Introduction to Azure', url: 'https://learn.microsoft.com/en-us/azure/azure-intro/', sourceName: 'Microsoft Azure', resourceType: 'guide', relationship: 'Microsoft introduction to Azure cloud services, account structure and core platform concepts.' },
            { title: 'Google Cloud Overview', url: 'https://cloud.google.com/docs/overview', sourceName: 'Google Cloud', resourceType: 'reference', relationship: 'Google Cloud documentation providing an overview of the platform, services and billing structure.' }
          ],
          quiz: {
            prompt: 'A company deploys a web application on Azure App Service. The provider manages the OS, runtime and networking infrastructure while the company manages the application code and data. Which cloud service model is this?',
            options: [
              'Infrastructure as a Service (IaaS)',
              'Platform as a Service (PaaS)',
              'Software as a Service (SaaS)',
              'Function as a Service (FaaS)'
            ],
            answerIndex: 1,
            explanation: 'Azure App Service is a PaaS offering. The provider manages the underlying infrastructure, OS and runtime, while the customer is responsible for the application code, data and access management.'
          }
        },
        {
          slug: 'cloud-compute-services',
          title: 'Compute Instances & Virtual Machines',
          minutes: 30,
          objectives: [
            'Launch and configure virtual machines across AWS EC2, Azure VMs and GCP Compute Engine',
            'Select appropriate instance types based on workload CPU, memory and storage requirements',
            'Implement instance lifecycle management including scaling, snapshots and termination'
          ],
          sections: [
            { heading: 'Virtual machine types and selection', body: 'Each cloud provider offers instance families optimized for different workloads. AWS provides general-purpose (M-series), compute-optimized (C-series), memory-optimized (R-series) and storage-optimized (I-series) instances. Azure offers equivalent series (D, F, E, L) and GCP uses predefined and custom machine types. Choosing the wrong instance type wastes money or starves the workload. Start with a baseline, monitor utilization metrics and right-size after collecting real performance data.' },
            { heading: 'Instance lifecycle and state management', body: 'Virtual machines follow a lifecycle: pending, running, stopping, stopped and terminated. AWS EC2 supports instance stop (preserving EBS volumes) and termination (destroying instance store data). Azure offers deallocate (stop billing) and delete. GCP distinguishes between stopping (preserving boot disk) and deleting. Understanding state transitions matters for cost management — a stopped EC2 instance still incurs EBS storage charges, while a deallocated Azure VM stops compute billing but may retain managed disk charges.' },
            { heading: 'Placement, availability and recovery', body: 'Cloud VMs run within Availability Zones — isolated data centers within a region. Spreading instances across multiple AZs provides fault tolerance: if one zone fails, instances in other zones continue serving traffic. Placement groups control physical proximity for low-latency workloads. Auto Recovery and Azure Availability Sets provide automatic recovery from hardware failures. Designing for failure from day one means assuming any single instance can fail at any time and building redundancy into the architecture.' }
          ],
          links: [
            { title: 'Amazon EC2 Instance Types', url: 'https://docs.aws.amazon.com/ec2/latest/instancetypes/gp.html', sourceName: 'AWS Documentation', resourceType: 'reference', relationship: 'AWS documentation detailing EC2 instance families, use cases and performance characteristics.' },
            { title: 'Azure Virtual Machines Overview', url: 'https://learn.microsoft.com/en-us/azure/virtual-machines/overview', sourceName: 'Microsoft Azure', resourceType: 'reference', relationship: 'Microsoft documentation on Azure VM types, sizes, availability and lifecycle management.' },
            { title: 'Compute Engine Instance Types', url: 'https://cloud.google.com/compute/docs/instances/choose-the-right-instance-type', sourceName: 'Google Cloud', resourceType: 'guide', relationship: 'Google Cloud guide on selecting Compute Engine machine types for different workload profiles.' }
          ],
          quiz: {
            prompt: 'You have a production web application that requires 99.99% availability. Which EC2 deployment strategy achieves this?',
            options: [
              'A single large EC2 instance in one Availability Zone',
              'Multiple EC2 instances across at least two Availability Zones behind an Application Load Balancer',
              'Multiple EC2 instances in the same Availability Zone with auto-scaling',
              'A single EC2 instance with Elastic IP for fast failover'
            ],
            answerIndex: 1,
            explanation: 'Deploying across multiple Availability Zones behind a load balancer ensures that if one AZ fails, traffic routes to healthy instances in other AZs. Single-AZ deployments cannot survive a zone failure regardless of instance count.'
          }
        },
        {
          slug: 'cloud-storage-services',
          title: 'Object, Block & File Storage',
          minutes: 30,
          objectives: [
            'Configure object storage with versioning, lifecycle policies and access controls',
            'Provision and attach block storage volumes with snapshots and encryption',
            'Select the appropriate storage tier based on access frequency and performance requirements'
          ],
          sections: [
            { heading: 'Object storage at scale', body: 'Object storage is the foundation of cloud-native applications. AWS S3, Azure Blob Storage and GCP Cloud Storage store data as objects in buckets with flat namespaces and HTTP-based APIs. Each object includes data, metadata and a unique key. Object storage is infinitely scalable, highly durable (99.999999999% for S3) and cost-effective for unstructured data. Understanding storage classes is critical: S3 Standard for frequently accessed data, S3 Glacier for archival, Azure Hot/Cool/Archive tiers and GCP Standard/Nearline/Coldline/Archive follow similar patterns.' },
            { heading: 'Block storage for persistent workloads', body: 'Block storage provides low-latency, high-performance persistent disks attached to virtual machines. AWS EBS, Azure Managed Disks and GCP Persistent Disks function like network-attached hard drives. EBS volume types range from gp3 (general purpose SSD) to io2 (provisioned IOPS SSD) to st1 (throughput-optimized HDD). Snapshots enable backup and disaster recovery. Encryption at rest using cloud KMS protects data on volumes. Attaching and detaching volumes allows data migration between instances, but volumes exist within a single AZ — cross-AZ migration requires snapshots or replication.' },
            { heading: 'File storage and shared access', body: 'File storage provides NFS and SMB access for workloads that need a traditional filesystem. AWS EFS and FSx, Azure Files and GCP Filestore serve different use cases. EFS provides elastic NFS for Linux workloads that scale automatically. Azure Files offers SMB and NFS shares accessible from on-premises and cloud. FSx for Windows File Server provides Active Directory integration. Shared file storage is essential for lift-and-migration of legacy applications, shared configuration in container orchestration and media processing pipelines that need concurrent file access.' }
          ],
          links: [
            { title: 'Amazon S3 User Guide', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html', sourceName: 'AWS Documentation', resourceType: 'reference', relationship: 'AWS S3 documentation covering storage classes, lifecycle policies, versioning and access management.' },
            { title: 'Azure Storage Documentation', url: 'https://learn.microsoft.com/en-us/azure/storage/', sourceName: 'Microsoft Azure', resourceType: 'reference', relationship: 'Microsoft Azure storage documentation covering blobs, disks, files and storage accounts.' },
            { title: 'Google Cloud Storage Documentation', url: 'https://cloud.google.com/storage/docs/introduction', sourceName: 'Google Cloud', resourceType: 'reference', relationship: 'GCP Cloud Storage documentation covering storage classes, buckets and data management.' }
          ],
          quiz: {
            prompt: 'A media company needs to store 500 TB of video files that are accessed frequently for the first 30 days after upload, rarely accessed between 30 and 90 days, and almost never accessed after 90 days. Which storage strategy is most cost-effective?',
            options: [
              'Store everything in S3 Standard and manually move files to Glacier after 90 days',
              'Use S3 Standard-IA for all files since they are occasionally accessed',
              'Configure an S3 Lifecycle policy that transitions objects to Standard-IA after 30 days and to Glacier after 90 days',
              'Use a single S3 bucket with S3 Intelligent-Tiering and disable all lifecycle rules'
            ],
            answerIndex: 2,
            explanation: 'A lifecycle policy automates transitions between storage classes based on access patterns. Objects move from Standard to Standard-IA at 30 days and to Glacier at 90 days, matching the access pattern and minimizing storage costs without manual intervention.'
          }
        }
      ]
    },
    {
      slug: 'networking-load-balancing-dns',
      stage: 'Foundation',
      title: 'Virtual Networking, Load Balancing & DNS',
      description: 'Designing VPC and VNet architectures, configuring load balancers for high availability and managing DNS resolution across cloud environments.',
      topics: [
        {
          slug: 'virtual-private-clouds',
          title: 'Virtual Private Cloud & Network Design',
          minutes: 30,
          objectives: [
            'Design a VPC architecture with public and private subnets across multiple Availability Zones',
            'Configure route tables, NAT gateways and internet gateways for controlled traffic flow',
            'Implement VPC peering and transit connectivity for multi-VPC communication'
          ],
          sections: [
            { heading: 'VPC subnet architecture', body: 'A well-designed VPC divides IP address space into subnets across multiple Availability Zones. Public subnets host internet-facing resources like load balancers and bastion hosts. Private subnets host application servers, databases and internal services. Using a CIDR block of /16 provides 65,536 IP addresses — enough for growth. Each AZ gets both a public and private subnet. NAT gateways in public subnets allow private subnet resources to reach the internet for updates and API calls without accepting inbound connections.' },
            { heading: 'Route tables and traffic flow', body: 'Route tables control how traffic flows between subnets, to the internet and to other VPCs. A public subnet route table has a default route (0.0.0.0/0) pointing to an internet gateway. A private subnet route table has a default route pointing to a NAT gateway. Custom routes enable communication between subnets and to on-premises networks via VPN or Direct Connect. AWS also supports VPC endpoints — route table entries that send traffic to AWS services through the private AWS network instead of the public internet.' },
            { heading: 'VPC peering and transit gateways', body: 'VPC peering connects two VPCs through a private network path. Peered VPCs can communicate using private IP addresses without traversing the public internet. However, peering is non-transitive — VPC A peered with VPC B and VPC B peered with VPC C does not allow A to reach C. For complex topologies, AWS Transit Gateway, Azure Virtual WAN and GCP Cloud VPN/Interconnect act as central hubs connecting multiple VPCs. Transit gateways simplify routing, reduce the number of peer connections and enable centralized inspection of cross-VPC traffic.' }
          ],
          links: [
            { title: 'Amazon VPC User Guide', url: 'https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html', sourceName: 'AWS Documentation', resourceType: 'reference', relationship: 'AWS VPC documentation covering subnet design, route tables, gateways and peering.' },
            { title: 'Azure Virtual Network Documentation', url: 'https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview', sourceName: 'Microsoft Azure', resourceType: 'reference', relationship: 'Microsoft Azure VNet documentation covering address spaces, subnets, peering and routing.' },
            { title: 'Google Cloud VPC Overview', url: 'https://cloud.google.com/vpc/docs/vpc', sourceName: 'Google Cloud', resourceType: 'reference', relationship: 'GCP VPC documentation covering network design, subnets, firewall rules and peering.' }
          ],
          quiz: {
            prompt: 'You have three VPCs: VPC A, VPC B and VPC C. VPC A is peered with VPC B, and VPC B is peered with VPC C. An application in VPC A needs to communicate with a database in VPC C. What configuration is required?',
            options: [
              'No additional configuration needed — VPC peering is transitive by default',
              'Create a direct VPC peering connection between VPC A and VPC C',
              'Configure a VPN tunnel between VPC A and VPC C through VPC B',
              'Move the database to VPC B so both can access it directly'
            ],
            answerIndex: 1,
            explanation: 'VPC peering is non-transitive. VPC A peered with VPC B and VPC B peered with VPC C does not provide connectivity between A and C. A direct peering connection between A and C is required, or a transit gateway can be used as a central hub.'
          }
        },
        {
          slug: 'load-balancing-traffic-distribution',
          title: 'Load Balancing & Traffic Distribution',
          minutes: 30,
          objectives: [
            'Configure application and network load balancers across AWS, Azure and GCP',
            'Implement health checks, SSL termination and sticky sessions for application availability',
            'Design multi-tier load balancing architectures with internal and external load balancers'
          ],
          sections: [
            { heading: 'Load balancer types and use cases', body: 'Application load balancers (AWS ALB, Azure Application Gateway, GCP URL maps) operate at Layer 7 and route based on HTTP headers, paths and host names. They support SSL termination, path-based routing and WebSocket connections. Network load balancers (AWS NLB, Azure Load Balancer, GCP Network Load Balancer) operate at Layer 4 and handle TCP/UDP traffic with ultra-low latency and millions of requests per second. Choosing between them depends on the protocol, latency requirements and routing complexity of the workload.' },
            { heading: 'Health checks and failover', body: 'Load balancers route traffic only to healthy backend instances. Health checks periodically probe each target using HTTP, TCP or custom protocols. Configuring appropriate check intervals, healthy thresholds and unhealthy thresholds prevents both false positives (removing healthy instances) and false negatives (routing to failed instances). Cross-zone load balancing distributes traffic evenly across all registered targets in all enabled AZs. Connection draining ensures in-flight requests complete before removing a target from rotation.' },
            { heading: 'SSL termination and end-to-end encryption', body: 'SSL termination at the load balancer offloads TLS decryption from backend instances, reducing CPU overhead and centralizing certificate management. The load balancer decrypts incoming HTTPS traffic and forwards it to backends over a private network. For sensitive workloads requiring end-to-end encryption, configure HTTPS listeners on backend targets as well. AWS Certificate Manager, Azure Key Vault and GCP Certificate Manager automate TLS certificate provisioning and renewal, eliminating the operational burden of manual certificate lifecycle management.' }
          ],
          links: [
            { title: 'Elastic Load Balancing User Guide', url: 'https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html', sourceName: 'AWS Documentation', resourceType: 'reference', relationship: 'AWS ELB documentation covering ALB, NLB, health checks, SSL termination and target groups.' },
            { title: 'Azure Load Balancer Documentation', url: 'https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-overview', sourceName: 'Microsoft Azure', resourceType: 'reference', relationship: 'Microsoft Azure Load Balancer documentation covering SKU options, health probes and load balancing rules.' },
            { title: 'Google Cloud Load Balancing Overview', url: 'https://cloud.google.com/load-balancing/docs/overview', sourceName: 'Google Cloud', resourceType: 'reference', relationship: 'GCP load balancing documentation covering external and internal load balancers, SSL proxy and URL maps.' }
          ],
          quiz: {
            prompt: 'A microservices application serves both API traffic and static frontend content. The API requires path-based routing while the frontend needs SSL offloading. Which load balancer type is most appropriate?',
            options: [
              'A network load balancer for both API and frontend traffic',
              'An application load balancer with path-based routing rules and an SSL listener',
              'A single EC2 instance running nginx as a reverse proxy',
              'A DNS round-robin configuration distributing traffic across backend servers'
            ],
            answerIndex: 1,
            explanation: 'An application load balancer operates at Layer 7 and supports path-based routing, SSL termination and host-based routing rules — exactly what is needed to handle both API and frontend traffic with a single entry point.'
          }
        },
        {
          slug: 'dns-resolution-edge-networking',
          title: 'DNS Resolution & Edge Networking',
          minutes: 25,
          objectives: [
            'Configure DNS zones and records for cloud-hosted applications using provider-native DNS services',
            'Implement latency-based and geolocation routing for global application deployment',
            'Design DNS failover strategies with health-checked routing and low TTL configurations'
          ],
          sections: [
            { heading: 'Cloud DNS services', body: 'AWS Route 53, Azure DNS and Google Cloud DNS are fully managed DNS services that host public and private DNS zones. They support standard record types (A, AAAA, CNAME, MX, TXT) and cloud-specific alias records that map directly to load balancers or CDN endpoints. Private DNS zones resolve names only within VPCs or VNets, enabling internal service discovery without exposing endpoints to the public internet. Split-horizon DNS can return different answers for the same domain depending on whether the query originates from inside or outside the VPC.' },
            { heading: 'Traffic routing policies', body: 'DNS routing policies determine which endpoint receives a query. Simple routing returns a single value. Weighted routing distributes traffic across multiple endpoints by percentage. Latency-based routing sends users to the endpoint with the lowest network latency. Geolocation routing directs traffic based on the user\'s physical location. Failover routing uses health checks to switch traffic from a primary to a secondary endpoint when the primary becomes unhealthy. Multi-value answer routing returns multiple healthy IPs, improving availability even without a load balancer.' },
            { heading: 'TTL, propagation and failover speed', body: 'Time to live (TTL) determines how long DNS resolvers cache a record. Lower TTLs (60 seconds) enable faster failover but increase DNS query volume. Higher TTLs (300-3600 seconds) reduce load but slow propagation of changes. The trade-off is between failover speed and DNS infrastructure cost. For production systems, a TTL of 60-120 seconds on critical records provides rapid failover. DNS propagation is not instantaneous — even with low TTLs, some resolvers may cache stale records, making application-level health checks and retry logic essential for resilience.' }
          ],
          links: [
            { title: 'Amazon Route 53 Developer Guide', url: 'https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html', sourceName: 'AWS Documentation', resourceType: 'reference', relationship: 'AWS Route 53 documentation covering DNS zones, routing policies, health checks and failover.' },
            { title: 'Azure DNS Documentation', url: 'https://learn.microsoft.com/en-us/azure/dns/dns-overview', sourceName: 'Microsoft Azure', resourceType: 'reference', relationship: 'Microsoft Azure DNS documentation covering zone management, record sets and DNS resolution.' },
            { title: 'Cloud DNS Documentation', url: 'https://cloud.google.com/dns/docs/', sourceName: 'Google Cloud', resourceType: 'reference', relationship: 'GCP Cloud DNS documentation covering public and private zones, record management and DNS policies.' }
          ],
          quiz: {
            prompt: 'A global e-commerce application needs to direct users in Europe to the Frankfurt region and users in Asia-Pacific to the Singapore region. Which Route 53 routing policy achieves this?',
            options: [
              'Weighted routing with equal weights for both regions',
              'Latency-based routing to automatically select the closest region',
              'Geolocation routing configured with continent-level rules for Europe and Asia-Pacific',
              'Simple routing returning both regional endpoints'
            ],
            answerIndex: 2,
            explanation: 'Geolocation routing allows you to specify routing rules based on the geographic location of the DNS query. This provides explicit control over which region serves users from specific continents, unlike latency-based routing which selects based on measured latency.'
          }
        }
      ]
    },
    {
      slug: 'containers-orchestration-iac',
      stage: 'Intermediate',
      title: 'Containers, Orchestration & Infrastructure as Code',
      description: 'Building and managing containerized applications with Docker, orchestrating at scale with Kubernetes and automating infrastructure provisioning with Terraform and CloudFormation.',
      topics: [
        {
          slug: 'docker-containerization',
          title: 'Docker & Container Fundamentals',
          minutes: 30,
          objectives: [
            'Write optimized multi-stage Dockerfiles that minimize image size and attack surface',
            'Manage container networking, volumes and environment configuration for stateless applications',
            'Push and pull images to cloud container registries with vulnerability scanning enabled'
          ],
          sections: [
            { heading: 'Dockerfile best practices', body: 'A well-written Dockerfile produces small, secure and reproducible images. Multi-stage builds separate the build stage from the runtime stage, discarding build tools and source code from the final image. Placing frequently changing layers (application code) after stable layers (dependency installation) maximizes Docker layer caching. Running containers as a non-root user prevents container breakout from gaining root on the host. Using specific base image tags instead of "latest" ensures reproducibility and prevents unexpected breaking changes from upstream updates.' },
            { heading: 'Container networking and storage', body: 'Docker containers are isolated by default but need controlled communication. The bridge network provides inter-container networking on a single host. Overlay networks enable communication across multiple Docker hosts in a swarm or cluster. Host networking removes network isolation for maximum performance but sacrifices port mapping flexibility. Volumes persist data beyond the container lifecycle — named volumes are managed by Docker, bind mounts map host directories directly. For production workloads, named volumes with cloud storage drivers provide durability and portability.' },
            { heading: 'Cloud container registries', body: 'AWS Elastic Container Registry (ECR), Azure Container Registry (ACR) and Google Container Registry (GCR) provide managed private registries for storing and distributing container images. Features include image vulnerability scanning, image signing for supply chain integrity, lifecycle policies that auto-delete old images and cross-region replication for disaster recovery. Integration with IAM controls who can push and pull images. Registry configuration should enable image scanning on push to catch known CVEs before images reach production clusters.' }
          ],
          links: [
            { title: 'Docker Documentation', url: 'https://docs.docker.com/get-started/overview/', sourceName: 'Docker Documentation', resourceType: 'guide', relationship: 'Docker official documentation covering container concepts, Dockerfile reference and image management.' },
            { title: 'Amazon ECR User Guide', url: 'https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html', sourceName: 'AWS Documentation', resourceType: 'reference', relationship: 'AWS ECR documentation covering private registries, image scanning, lifecycle policies and cross-account access.' },
            { title: 'Azure Container Registry Documentation', url: 'https://learn.microsoft.com/en-us/azure/container-registry/', sourceName: 'Microsoft Azure', resourceType: 'reference', relationship: 'Microsoft Azure ACR documentation covering registry tiers, image management and geo-replication.' }
          ],
          quiz: {
            prompt: 'A developer builds a Docker image from a Node.js application. The final image is 1.2 GB because it includes build tools, dev dependencies and source code. How do you reduce the image size?',
            options: [
              'Switch to a smaller base image like Alpine Linux without changing the Dockerfile structure',
              'Use a multi-stage build to separate the build stage from the minimal runtime stage',
              'Remove the node_modules directory before building the image',
              'Compress the image using Docker save --compress'
            ],
            answerIndex: 1,
            explanation: 'Multi-stage builds let you use a full Node.js image for the build stage (installing dependencies, compiling code) and copy only the built artifacts into a minimal runtime image. This eliminates build tools, dev dependencies and source code from the final image, drastically reducing its size.'
          }
        },
        {
          slug: 'kubernetes-orchestration',
          title: 'Kubernetes Cluster Management',
          minutes: 30,
          objectives: [
            'Deploy and manage applications using Kubernetes deployments, services and ingresses',
            'Configure horizontal pod autoscaling and cluster autoscaling for variable workloads',
            'Implement resource quotas, network policies and RBAC for multi-tenant cluster governance'
          ],
          sections: [
            { heading: 'Core Kubernetes resources', body: 'Kubernetes orchestrates containerized workloads across a cluster of nodes. A Deployment manages replica sets and rolling updates for stateless applications. A Service provides stable network endpoints (ClusterIP, NodePort or LoadBalancer) that route traffic to healthy pods. An Ingress exposes HTTP routes with host and path-based routing, TLS termination and integration with external load balancers. ConfigMaps and Secrets inject configuration and sensitive data into pods without baking them into container images. PersistentVolumeClaims request durable storage backed by cloud block or file storage.' },
            { heading: 'Autoscaling and resource management', body: 'The Horizontal Pod Autoscaler (HPA) adjusts the number of pod replicas based on CPU, memory or custom metrics. Cluster Autoscaler adds or removes nodes from the node pool based on pending pod requests. Setting resource requests (guaranteed allocation) and limits (maximum allowed) for each container prevents resource contention and enables the scheduler to make informed placement decisions. LimitRanges enforce default and maximum resource values per namespace. ResourceQuotas cap total resource consumption per namespace in multi-tenant clusters.' },
            { heading: 'Cluster security and governance', body: 'Kubernetes RBAC controls who can perform which actions on cluster resources. Roles and ClusterRoles define permissions; RoleBindings and ClusterRoleBindings assign them to users, groups or service accounts. NetworkPolicies restrict pod-to-pod communication, implementing zero-trust networking within the cluster. Pod Security Standards (replacing PodSecurityPolicies) enforce constraints like non-root execution, read-only root filesystems and disallowed privilege escalation. Audit logging records API server access for compliance and incident investigation.' }
          ],
          links: [
            { title: 'Kubernetes Documentation', url: 'https://kubernetes.io/docs/home/', sourceName: 'Kubernetes Documentation', resourceType: 'reference', relationship: 'Official Kubernetes documentation covering concepts, tasks, reference and tutorials.' },
            { title: 'Amazon EKS User Guide', url: 'https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html', sourceName: 'AWS Documentation', resourceType: 'reference', relationship: 'AWS EKS documentation covering managed Kubernetes cluster provisioning, networking and security.' },
            { title: 'Azure Kubernetes Service Documentation', url: 'https://learn.microsoft.com/en-us/azure/aks/', sourceName: 'Microsoft Azure', resourceType: 'reference', relationship: 'Microsoft Azure AKS documentation covering cluster management, networking and add-on integrations.' }
          ],
          quiz: {
            prompt: 'A Kubernetes deployment runs three pods, each requesting 512Mi of memory. A new pod enters Pending state because the cluster node does not have enough available memory. Which mechanism automatically resolves this?',
            options: [
              'The Horizontal Pod Autoscaler adding more pod replicas',
              'The Cluster Autoscaler adding a new node to the node pool',
              'The Kubernetes scheduler rescheduling the pod to a different namespace',
              'A liveness probe restarting the pod on a different node'
            ],
            answerIndex: 1,
            explanation: 'The Cluster Autoscaler detects unschedulable pods due to insufficient resources and provisions new nodes in the node pool. The HPA scales pods, not nodes. The scheduler cannot move pods across namespaces for resource reasons, and liveness probes only restart unhealthy pods.'
          }
        },
        {
          slug: 'infrastructure-as-code-terraform',
          title: 'Infrastructure as Code with Terraform',
          minutes: 30,
          objectives: [
            'Write Terraform configurations that provision multi-cloud infrastructure using HCL syntax',
            'Manage state files securely with remote backends and state locking',
            'Implement modular, reusable Terraform components with input validation and variable typing'
          ],
          sections: [
            { heading: 'Terraform workflow and providers', body: 'Terraform uses a declarative configuration language (HCL) to define desired infrastructure state. The workflow follows three steps: plan (preview changes), apply (execute changes) and destroy (tear down). Providers (AWS, Azure, GCP, Kubernetes) translate Terraform configurations into API calls for each platform. A single Terraform configuration can manage resources across multiple providers, making it ideal for multi-cloud environments. Version pinning providers and the Terraform binary ensures reproducible infrastructure across team members and CI/CD pipelines.' },
            { heading: 'State management and locking', body: 'Terraform state is a JSON file mapping configuration to real-world resources. Local state works for personal projects but breaks in team environments. Remote backends (AWS S3 with DynamoDB locking, Azure Blob Storage with lease, GCP Cloud Storage with object versioning) store state centrally and prevent concurrent modifications. State locking uses distributed locks to ensure only one person can run Terraform at a time. State should be encrypted at rest, versioned for rollback capability and accessible only to authorized team members — state files often contain secrets in plain text.' },
            { heading: 'Modules and code organization', body: 'Terraform modules encapsulate reusable infrastructure patterns. A module takes input variables, provisions a set of resources and returns outputs. Publishing modules to a private registry allows teams to consume standardized building blocks — a networking module, a database module, a Kubernetes cluster module — without understanding the implementation details. Module versioning ensures consumers can pin to a stable version and upgrade deliberately. Input variables with type constraints, validation rules and descriptive error messages make modules self-documenting and reduce misuse.' }
          ],
          links: [
            { title: 'Terraform Documentation', url: 'https://developer.hashicorp.com/terraform/docs', sourceName: 'AWS Documentation', resourceType: 'reference', relationship: 'HashiCorp Terraform documentation covering HCL syntax, providers, state management and modules.' },
            { title: 'AWS CloudFormation User Guide', url: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html', sourceName: 'AWS Documentation', resourceType: 'reference', relationship: 'AWS CloudFormation documentation for AWS-native infrastructure as code using JSON/YAML templates.' },
            { title: 'Azure Resource Manager Templates', url: 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resources-tutorial', sourceName: 'Microsoft Azure', resourceType: 'guide', relationship: 'Microsoft Azure ARM template documentation for declarative infrastructure provisioning on Azure.' }
          ],
          quiz: {
            prompt: 'Two engineers run "terraform apply" at the same time against the same S3 backend without state locking configured. What is the most likely outcome?',
            options: [
              'Both applies succeed and the infrastructure is correctly provisioned',
              'One apply succeeds and the other fails with a state conflict error',
              'Terraform detects the conflict and automatically merges both changes',
              'The state file is corrupted and must be restored from backup'
            ],
            answerIndex: 1,
            explanation: 'Without state locking, concurrent applies can produce race conditions. One engineer\'s state read may be stale by the time their apply completes, resulting in a state conflict. State locking with DynamoDB prevents concurrent operations by acquiring a distributed lock before modifying state.'
          }
        }
      ]
    },
    {
      slug: 'monitoring-automation-multi-cloud',
      stage: 'Advanced',
      title: 'Monitoring, Automation & Multi-Cloud Architecture',
      description: 'Building observability across cloud services, automating infrastructure delivery pipelines and designing resilient architectures that span multiple cloud providers.',
      topics: [
        {
          slug: 'cloud-monitoring-observability',
          title: 'Cloud Monitoring & Observability',
          minutes: 30,
          objectives: [
            'Configure metrics, logs and traces across cloud services to achieve full-stack observability',
            'Build dashboards and alerting policies that detect availability and performance degradation',
            'Implement distributed tracing to diagnose latency across microservice architectures'
          ],
          sections: [
            { heading: 'The three pillars of observability', body: 'Observability rests on three pillars: metrics (numeric time-series data like CPU utilization, request count and error rates), logs (discrete events with context like application logs, access logs and audit trails) and traces (end-to-end request paths across services showing latency at each hop). AWS CloudWatch provides metrics, logs and X-Ray traces. Azure Monitor collects metrics and logs with Application Insights for distributed tracing. GCP Cloud Monitoring, Cloud Logging and Cloud Trace provide equivalent capabilities. Instrumenting all three pillars enables you to move from reactive alerting to proactive diagnosis.' },
            { heading: 'Dashboards and alerting design', body: 'Effective dashboards tell a story: start with a high-level availability and latency overview, drill into service-level metrics and end with resource-level detail. Avoid dashboard sprawl — create role-specific views for operations, development and management. Alerting policies should have clear severity levels, escalation paths and runbook links. Static thresholds produce noise; anomaly detection using statistical baselines reduces false positives. Composite alarms that require multiple conditions (high latency AND elevated error rate) catch real incidents while ignoring transient spikes.' },
            { heading: 'Distributed tracing in microservices', body: 'In a microservice architecture, a single user request may traverse five to twenty services. Distributed tracing instruments each service to propagate a trace context (trace ID and span ID) through the entire request path. Each span records the service name, operation, duration and metadata. When a request is slow, the trace immediately reveals which service is the bottleneck — is it database queries in the order service, a slow external API call in the payment service or network latency between services? AWS X-Ray, Azure Application Insights and GCP Cloud Trace implement this pattern natively.' }
          ],
          links: [
            { title: 'Amazon CloudWatch User Guide', url: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html', sourceName: 'AWS Documentation', resourceType: 'reference', relationship: 'AWS CloudWatch documentation covering metrics, alarms, dashboards, logs and X-Ray tracing.' },
            { title: 'Azure Monitor Documentation', url: 'https://learn.microsoft.com/en-us/azure/azure-monitor/overview', sourceName: 'Microsoft Azure', resourceType: 'reference', relationship: 'Microsoft Azure Monitor documentation covering metrics, logs, alerts, workbooks and Application Insights.' },
            { title: 'Google Cloud Operations Suite', url: 'https://cloud.google.com/products/operations', sourceName: 'Google Cloud', resourceType: 'reference', relationship: 'GCP Cloud Operations documentation covering Cloud Monitoring, Cloud Logging and Cloud Trace.' }
          ],
          quiz: {
            prompt: 'A microservices application reports slow response times. The average API latency increased from 200ms to 2 seconds. CloudWatch metrics show normal CPU and memory across all services. How do you identify the bottleneck?',
            options: [
              'Increase the instance size of all services since latency increased',
              'Check distributed traces to identify which specific service or network hop introduces the latency',
              'Restart all services to clear any potential memory leaks',
              'Add more load balancers to distribute traffic across more backend instances'
            ],
            answerIndex: 1,
            explanation: 'Distributed tracing shows the time spent at each hop in the request path. When aggregate metrics look normal but latency is high, the trace reveals exactly where the slowdown occurs — whether it is a specific service, a database call or a network bottleneck between services.'
          }
        },
        {
          slug: 'cicd-infrastructure-automation',
          title: 'CI/CD & Infrastructure Automation',
          minutes: 30,
          objectives: [
            'Design CI/CD pipelines that automate testing, security scanning and deployment of infrastructure and applications',
            'Implement GitOps workflows for Kubernetes deployments using pull-based configuration management',
            'Configure automated rollback and canary deployment strategies for safe production releases'
          ],
          sections: [
            { heading: 'CI/CD pipeline architecture', body: 'A mature CI/CD pipeline automates the path from code commit to production deployment. The pipeline stages include source checkout, dependency resolution, unit and integration testing, static analysis, container image building, vulnerability scanning, infrastructure provisioning, application deployment and post-deployment verification. Each stage is a quality gate — a failure blocks progression to the next stage. Tools like GitHub Actions, GitLab CI, AWS CodePipeline and Azure DevOps orchestrate these stages. The pipeline should be idempotent: running it twice produces the same result as running it once.' },
            { heading: 'GitOps for Kubernetes', body: 'GitOps uses a Git repository as the single source of truth for desired infrastructure and application state. A pull-based agent (Argo CD, Flux) running in the cluster continuously compares the cluster state to the Git repository and reconciles differences. To deploy a new version, you update the image tag in Git — the agent detects the change and rolling-update the deployment. This provides a complete audit trail (every change is a Git commit), easy rollback (revert the commit) and drift detection (the agent catches manual cluster changes). Branching strategies like environment-per-directory or overlay-per-environment manage multi-cluster deployments.' },
            { heading: 'Deployment strategies and rollback', body: 'Blue-green deployment maintains two identical environments — production (blue) and staging (green). Deploy to green, verify, then switch the load balancer. Rollback is instant: switch back to blue. Canary deployment routes a small percentage of traffic (1-5%) to the new version while monitoring error rates and latency. If the canary is healthy, gradually increase traffic to 100%. Automated rollback triggers when error rates exceed a threshold. Rolling updates replace instances incrementally, maintaining availability throughout. Each strategy trades complexity for safety — canary deployments offer the best balance for most production workloads.' }
          ],
          links: [
            { title: 'AWS CodePipeline User Guide', url: 'https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html', sourceName: 'AWS Documentation', resourceType: 'reference', relationship: 'AWS CodePipeline documentation covering pipeline stages, actions and integration with build and deploy services.' },
            { title: 'Azure DevOps Pipelines Documentation', url: 'https://learn.microsoft.com/en-us/azure/devops/pipelines/', sourceName: 'Microsoft Azure', resourceType: 'reference', relationship: 'Microsoft Azure DevOps pipeline documentation covering YAML pipelines, stages and deployment strategies.' },
            { title: 'Kubernetes Deployment Strategies', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/', sourceName: 'Kubernetes Documentation', resourceType: 'reference', relationship: 'Kubernetes deployment documentation covering rollout strategies, updates and rollback procedures.' }
          ],
          quiz: {
            prompt: 'A canary deployment of a new API version shows a 5% error rate when receiving 5% of production traffic. The previous version had a 0.1% error rate. What is the correct automated response?',
            options: [
              'Immediately route 100% of traffic to the new version to gather more data',
              'Automatically roll back to the previous version and alert the engineering team',
              'Pause the deployment and wait for a human to manually approve the next step',
              'Increase the canary to 20% to see if the error rate stabilizes'
            ],
            answerIndex: 1,
            explanation: 'A 50x increase in error rate during canary deployment indicates a serious regression. Automated rollback immediately restores service while the team investigates. Waiting or increasing traffic exposure would worsen the impact on users.'
          }
        },
        {
          slug: 'multi-cloud-architecture-cost',
          title: 'Multi-Cloud Architecture & Cost Optimization',
          minutes: 25,
          objectives: [
            'Design multi-cloud architectures that avoid vendor lock-in while leveraging provider-specific strengths',
            'Implement cost monitoring, rightsizing recommendations and reserved capacity planning',
            'Evaluate serverless computing trade-offs against container-based architectures for specific workload patterns'
          ],
          sections: [
            { heading: 'Multi-cloud design patterns', body: 'Multi-cloud architectures serve several purposes: regulatory requirements mandating data residency in specific regions, best-of-breed services from different providers, disaster recovery across providers and avoiding concentration risk. Common patterns include active-active across providers (split traffic by geography), active-passive (primary on one provider, failover on another) and service-specific placement (compute on AWS, ML on GCP, identity on Azure). The challenge is managing consistent networking, identity and observability across providers. Tools like Terraform and Kubernetes abstract provider differences at the infrastructure layer.' },
            { heading: 'Cloud cost optimization', body: 'Cloud costs grow unmanaged. Cost optimization starts with visibility: AWS Cost Explorer, Azure Cost Management and GCP Billing provide usage breakdowns by service, team and environment. Rightsizing recommendations identify over-provisioned instances based on actual utilization. Reserved instances and savings plans offer 30-70% discounts for committed usage. Spot instances (AWS), spot VMs (GCP) and spot instances (Azure) provide 60-90% discounts for interruptible workloads. Auto-scaling ensures you pay for capacity only when needed. Tagging resources with cost centers enables chargeback and accountability.' },
            { heading: 'Serverless versus containers', body: 'Serverless (AWS Lambda, Azure Functions, GCP Cloud Functions) and containers (ECS, AKS, GKE) solve different problems. Serverless excels at event-driven, sporadic workloads: image processing on upload, API Gateway backends for low-traffic APIs, scheduled tasks and webhook handlers. Containers excel at long-running, stateful or performance-sensitive workloads: web servers, message queue consumers, databases and ML inference. The decision framework considers: request duration (serverless has execution time limits), concurrency patterns (serverless scales automatically but has cold start latency), state requirements (containers manage state more naturally) and cost at scale (containers are often cheaper for sustained high-throughput workloads).' }
          ],
          links: [
            { title: 'AWS Well-Architected Framework — Cost Optimization', url: 'https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-optimization.html', sourceName: 'AWS Documentation', resourceType: 'reference', relationship: 'AWS Cost Optimization pillar of the Well-Architected Framework covering pricing models and resource efficiency.' },
            { title: 'Azure Cost Management Documentation', url: 'https://learn.microsoft.com/en-us/azure/cost-management-billing/cost-management-billing-overview', sourceName: 'Microsoft Azure', resourceType: 'reference', relationship: 'Microsoft Azure Cost Management documentation covering budgeting, alerting and optimization recommendations.' },
            { title: 'Google Cloud Pricing Overview', url: 'https://cloud.google.com/pricing', sourceName: 'Google Cloud', resourceType: 'reference', relationship: 'GCP pricing documentation covering per-service pricing, sustained use discounts and committed use contracts.' }
          ],
          quiz: {
            prompt: 'A company runs a microservice that processes incoming images. It receives 10,000 requests per hour, each taking 3 seconds to process with 512MB memory. The service runs 24/7. Which compute model is most cost-effective?',
            options: [
              'AWS Lambda with 512MB memory configuration',
              'An ECS Fargate service running two tasks with 512MB memory each',
              'A single EC2 t3.large instance running the processing application',
              'Google Cloud Functions with the default memory allocation'
            ],
            answerIndex: 1,
            explanation: 'At sustained high throughput (10,000 requests/hour running 24/7), containers provide more predictable cost than Lambda. Lambda charges per invocation and duration — at this volume, the per-request pricing adds up significantly. Fargate provides consistent pricing for the sustained compute needed without managing servers.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Cloud Infrastructure Design, Deployment & Optimization',
    coverage: [
      'VPC and Network Architecture Design',
      'Compute and Storage Provisioning',
      'Containerization & Kubernetes Deployment',
      'Infrastructure as Code & CI/CD Pipeline',
      'Monitoring, Alerting & Cost Optimization'
    ],
    brief:
      'You are the cloud engineer at Nimbus Cloud Engineering assigned to design and deploy the infrastructure for a new SaaS analytics platform. The platform must serve users across North America and Europe with sub-200ms latency, support auto-scaling from 100 to 10,000 concurrent users, and stay within a monthly budget of $8,000. Build the complete infrastructure using IaC, containerize the application, deploy it on Kubernetes and configure monitoring and cost controls.',
    requirements: [
      'Design a multi-AZ VPC architecture with public and private subnets, NAT gateways and VPC endpoints for AWS services',
      'Provision compute and storage resources using Terraform with remote state management and state locking',
      'Containerize the application using multi-stage Dockerfiles with security best practices',
      'Deploy the application on an EKS or AKS Kubernetes cluster with horizontal pod autoscaling and resource quotas',
      'Configure an Application Load Balancer with SSL termination, health checks and path-based routing',
      'Set up a CI/CD pipeline that builds, scans and deploys container images using GitOps principles',
      'Implement CloudWatch or Azure Monitor dashboards with metric-based alerts for CPU, memory and error rates',
      'Configure cost monitoring with budget alerts and a rightsizing report for all provisioned resources'
    ],
    expectedOutput:
      'A complete cloud infrastructure package: Terraform configurations with state backend, Dockerfiles, Kubernetes manifests, CI/CD pipeline definition, monitoring dashboards and a cost optimization report with monthly spend projections.',
    rubric: [
      { skill: 'Network Architecture', weight: 20, criteria: 'VPC design correctly implements multi-AZ layout, private subnets for workloads, NAT for outbound and VPC endpoints for service access' },
      { skill: 'Infrastructure as Code', weight: 20, criteria: 'Terraform configurations are modular, use remote state with locking, include variable validation and produce reproducible infrastructure' },
      { skill: 'Containerization & Orchestration', weight: 20, criteria: 'Dockerfiles follow multi-stage best practices, Kubernetes manifests include resource limits, HPA and network policies' },
      { skill: 'CI/CD Pipeline', weight: 15, criteria: 'Pipeline automates build, test, scan and deploy stages with appropriate quality gates and GitOps-based deployment' },
      { skill: 'Monitoring & Cost', weight: 15, criteria: 'Dashboards provide meaningful operational visibility, alerts have appropriate thresholds and cost controls include budgets and rightsizing' },
      { skill: 'Documentation', weight: 10, criteria: 'Architecture decisions are documented, runbooks cover common operations and the cost report includes optimization recommendations' }
    ],
    passScore: 72
  },

  assignments: [
    {
      title: 'Multi-Tier Cloud Application Architecture',
      stage: 'Foundation',
      objective: 'Design and document a three-tier architecture for a web application across AWS or Azure, including networking, compute, storage and security components.',
      requirements: [
        'Design a VPC/VNet with public and private subnets across at least two Availability Zones',
        'Specify compute instances for web, application and database tiers with appropriate instance types',
        'Select and configure storage solutions for application assets, database backups and log retention',
        'Document security controls including security groups, IAM roles and network ACLs for each tier',
        'Create a cost estimate using the provider\'s pricing calculator for the proposed architecture'
      ],
      skillsEvaluated: ['Cloud Architecture Design', 'VPC Networking', 'Compute Selection', 'Cost Estimation'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the architecture design document with diagrams, component specifications, security control matrix and cost estimate.',
        textLabel: 'Multi-tier cloud architecture design document',
        minTextLength: 1200,
        linkLabels: ['Architecture diagrams and cost estimate spreadsheet']
      }
    },
    {
      title: 'Containerized Application Deployment with Kubernetes',
      stage: 'Intermediate',
      objective: 'Containerize an existing application, deploy it on a managed Kubernetes cluster and configure autoscaling, resource management and rolling updates.',
      requirements: [
        'Write a multi-stage Dockerfile that builds and packages the application with minimal image size',
        'Push the image to a cloud container registry with vulnerability scanning enabled',
        'Create Kubernetes Deployment, Service and Ingress manifests with resource requests and limits',
        'Configure Horizontal Pod Autoscaler based on CPU and memory metrics',
        'Implement a rolling update strategy with readiness probes and a rollback procedure'
      ],
      skillsEvaluated: ['Docker', 'Kubernetes', 'Container Registry', 'Application Deployment'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the Dockerfile, Kubernetes manifests, autoscaling configuration, deployment runbook and evidence of a successful rolling update.',
        textLabel: 'Container deployment and Kubernetes configuration report',
        minTextLength: 1200,
        linkLabels: ['Dockerfile, K8s manifests and deployment logs']
      }
    },
    {
      title: 'Multi-Cloud Infrastructure Automation with Terraform',
      stage: 'Advanced',
      objective: 'Build a Terraform project that provisions a complete environment across two cloud providers with modular code, remote state and a CI/CD pipeline for infrastructure changes.',
      requirements: [
        'Create a Terraform module for networking (VPC/VNet, subnets, routing) that works on both AWS and Azure',
        'Write provider-specific modules for compute and database resources with variable validation',
        'Configure a remote state backend with encryption and state locking',
        'Build a CI/CD pipeline that runs terraform plan on pull requests and terraform apply on merge to main',
        'Implement workspace or variable-based environment separation for staging and production'
      ],
      skillsEvaluated: ['Terraform', 'Multi-Cloud Architecture', 'CI/CD for IaC', 'State Management'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the Terraform project repository with module documentation, pipeline configuration and evidence of successful provisioning across both providers.',
        textLabel: 'Multi-cloud Terraform automation report',
        minTextLength: 1500,
        linkLabels: ['Terraform repository, pipeline config and provisioned resource evidence']
      }
    }
  ],

  simTasks: [
    {
      title: 'Production EC2 instances returning 502 errors after security group change',
      context: 'A network engineer modified the security group for your production web tier to add a new monitoring endpoint. After the change, the Application Load Balancer started returning 502 Bad Gateway errors for all user requests. The change was made 20 minutes ago and the load balancer health checks are now failing for all target instances. The deployment deadline for a critical feature is tomorrow.',
      requirements: [
        'Review the security group rules to identify what was changed and why the health checks are failing',
        'Verify the ALB target group health check configuration matches the expected port and protocol',
        'Restore the security group rules to their previous state to bring the application back online',
        'Verify the application is serving requests correctly after the rollback',
        'Document the change process and propose a change management procedure for security group modifications'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Application restored to full health, root cause identified as security group egress rule blocking health check traffic, change management process documented.',
      skills: ['AWS Security Groups', 'Load Balancer Configuration', 'Incident Response', 'Change Management']
    },
    {
      title: 'Kubernetes cluster nodes stuck in NotReady state',
      context: 'Your EKS cluster serving the production checkout service has three worker nodes. Two of them have entered NotReady state in the last hour. The remaining node is handling all traffic but is running at 95% CPU utilization. Pod eviction alerts are firing and some checkout requests are timing out. The node group was recently updated with a new AMI version.',
      requirements: [
        'Check node status and system events using kubectl to identify why nodes are NotReady',
        'Review the kubelet logs on the affected nodes to determine the root cause',
        'If the issue is node-level, force-drain pods from affected nodes to reschedule them on the healthy node',
        'Scale up the node group to add capacity and reduce pressure on the remaining node',
        'Investigate whether the recent AMI update introduced the issue and document findings'
      ],
      priority: 'high',
      dueDayOffset: 2,
      expectedOutput: 'Node health diagnosis completed, pod scheduling restored, additional capacity provisioned, AMI update correlation identified and documented.',
      skills: ['Kubernetes Administration', 'Node Troubleshooting', 'Cluster Autoscaling', 'Production Incident Response']
    },
    {
      title: 'Unexpected S3 storage costs from unmanaged versioning',
      context: 'The monthly AWS bill shows a $3,200 increase in S3 storage costs. Investigation reveals that a data pipeline bucket has S3 versioning enabled and a lifecycle policy was accidentally deleted last month. The bucket has accumulated 12 TB of old object versions and delete markers. Meanwhile, the application only needs the current version of each object.',
      requirements: [
        'Analyze the S3 bucket inventory to quantify the total size of non-current versions and delete markers',
        'Implement an S3 lifecycle policy that transitions non-current versions to Glacier after 30 days and permanently deletes them after 90 days',
        'Remove excessive delete markers that are consuming storage without providing value',
        'Calculate the projected monthly savings after the lifecycle policy takes effect',
        'Set up a Cost Explorer budget alert to notify the team when storage costs exceed the baseline'
      ],
      priority: 'normal',
      dueDayOffset: 5,
      expectedOutput: 'Lifecycle policy implemented, stale versions and delete markers cleaned up, cost savings quantified and budget alert configured.',
      skills: ['S3 Lifecycle Management', 'Cost Optimization', 'AWS Cost Explorer', 'Storage Governance']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Rachel Kim',
      personaRole: 'VP of Engineering',
      situation: 'The VP wants to cut cloud infrastructure costs by 40% before the end of the quarter but is unwilling to reduce application availability or performance.',
      openingMessage:
        'Finance is pressuring us to reduce our cloud spend by 40% this quarter. The board has approved the target and expects a plan by Friday. I cannot accept any reduction in availability or user-facing performance. What can we actually do?',
      expectedPoints: [
        'Analyzes current spend by service category to identify the largest cost drivers',
        'Proposes rightsizing over-provisioned instances based on utilization metrics from the past 90 days',
        'Recommends reserved instances or savings plans for baseline capacity to achieve guaranteed discounts',
        'Identifies low-risk savings such as cleaning up unused resources, old snapshots and idle load balancers'
      ]
    },
    {
      kind: 'team',
      personaName: 'DevOps Engineer',
      personaRole: 'Jordan Lee',
      situation: 'The DevOps team wants to adopt a new open-source container orchestration tool instead of using the managed Kubernetes service, claiming it gives more control.',
      openingMessage:
        'We have been evaluating K3s and Nomad as alternatives to our managed EKS cluster. The team feels we are losing control and paying a premium for managed Kubernetes. We want your input before making a final decision.',
      expectedPoints: [
        'Acknowledges the valid concerns about cost and operational overhead of managed services',
        'Evaluates the operational burden: who manages upgrades, security patches, etcd backups and node scaling',
        'Compares total cost of ownership including engineering time, not just infrastructure spend',
        'Recommends a proof-of-concept evaluation with clear success criteria before committing to a migration'
      ]
    },
    {
      kind: 'client',
      personaName: 'Marcus Thompson',
      personaRole: 'CTO, RetailNow',
      situation: 'The client operates a retail platform on-premises and needs to migrate to the cloud within 12 months to support Black Friday traffic spikes that overwhelm their current data center.',
      openingMessage:
        'Our on-premises infrastructure cannot handle Black Friday traffic — we lost $2 million in sales last year due to downtime. We need to migrate to the cloud within a year and ensure we can scale to ten times our normal traffic during peak events. Where do we start?',
      expectedPoints: [
        'Proposes a phased migration starting with the least-critical, highest-scaling workloads',
        'Designs an auto-scaling architecture that handles 10x traffic spikes using pre-warmed capacity',
        'Addresses data migration strategy with minimal downtime using database replication and DNS cutover',
        'Recommends a disaster recovery architecture that prevents a repeat of the Black Friday failure'
      ]
    },
    {
      kind: 'client',
      personaName: 'Elena Rodriguez',
      personaRole: 'CTO, HealthBridge Systems',
      situation: 'The client needs to deploy a HIPAA-compliant patient portal across two cloud regions with strict data residency requirements for healthcare data.',
      openingMessage:
        'We are building a patient portal that must store protected health information across two US regions for disaster recovery. HIPAA compliance is mandatory, and we need to demonstrate that our cloud architecture meets the technical safeguards. Can you help us design and validate the infrastructure?',
      expectedPoints: [
        'Designs a multi-region architecture with encrypted replication and region-restricted data storage',
        'Implements IAM controls with least-privilege access and comprehensive audit logging for PHI access',
        'Configures encryption at rest and in transit using customer-managed keys in cloud KMS',
        'Establishes a compliance evidence pipeline that continuously validates HIPAA technical safeguards'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'A production deployment of a new application version fails because the ECS task role was updated to include a new S3 bucket policy, but the previous bucket policy was removed instead of updated. The application can no longer read configuration files from S3 and returns 500 errors for all requests.',
      requiredActions: [
        { action: 'Restore the previous task role policy that included S3 read access to the configuration bucket', good: true, note: 'Reverting to the last known-good state is the fastest way to restore service while investigating the root cause.' },
        { action: 'Verify the application is serving requests correctly after the policy rollback', good: true, note: 'Always validate that the rollback actually resolved the issue before closing the incident.' },
        { action: 'Review the IAM policy change in CloudTrail to understand why the previous policy was replaced instead of merged', good: true, note: 'Understanding the root cause prevents recurrence — the issue was likely a policy replacement rather than an additive update.' },
        { action: 'Wait for the next scheduled deployment window to fix the IAM policy', good: false, note: 'Production is down. The IAM policy must be corrected immediately, not deferred to a scheduled window.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'The company is launching in Australia and New Zealand, requiring a new cloud region deployment. All customer data for ANZ users must be stored in the Sydney region, and the application must serve ANZ users with sub-100ms latency from the local region.',
      requiredActions: [
        { action: 'Deploy infrastructure in the Sydney region with VPC peering or Transit Gateway to the existing primary region', good: true, note: 'A new region deployment requires full networking connectivity to the existing environment for shared services.' },
        { action: 'Configure DNS geolocation or latency-based routing to direct ANZ users to the Sydney deployment', good: true, note: 'Geo-routing ensures ANZ users hit the local region for low-latency access and data residency compliance.' },
        { action: 'Implement cross-region database replication with data residency constraints that prevent ANZ data from leaving the Sydney region', good: true, note: 'Data residency requirements mean replication must be one-directional or restricted — ANZ data stays in Sydney.' },
        { action: 'Deploy the same number of instances in Sydney as the primary region to ensure consistent capacity', good: false, note: 'ANZ traffic volume may be much lower than the primary region. Capacity should be sized based on projected ANZ demand, not mirrored from the primary region.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the differences between VPC peering, VPC endpoints and Transit Gateway. When would you choose each for connecting workloads to AWS services and other VPCs?',
      guidancePoints: [
        'VPC peering connects two VPCs directly but is non-transitive — each pair requires its own peering connection',
        'VPC endpoints provide private connectivity to AWS services (S3, DynamoDB, ECR) without traversing the public internet',
        'Transit Gateway acts as a central hub connecting multiple VPCs and on-premises networks, simplifying hub-and-spoke topologies',
        'Choose peering for simple two-VPC connectivity, endpoints for AWS service access and Transit Gateway for complex multi-VPC or hybrid architectures',
        'Transit Gateway costs more per attachment but eliminates the O(n²) peering connection management as VPC count grows'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'Design a highly available web application architecture on AWS that can serve traffic across three Availability Zones and auto-scale from 100 to 5,000 concurrent users within minutes.',
      guidancePoints: [
        'Place an Application Load Balancer in front of EC2 Auto Scaling Groups spanning three AZs with public and private subnets',
        'Use a launch template with user data for automatic application deployment and configuration',
        'Configure target tracking scaling policies based on CPU utilization and request count per target',
        'Use ElastiCache or DynamoDB DAX for session storage and database caching to reduce database load during traffic spikes',
        'Pre-warm the Auto Scaling Group by setting a minimum capacity that handles baseline traffic without cold-start delays',
        'Place the database in a Multi-AZ RDS deployment or Aurora with read replicas for read-heavy workloads'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'After migrating a web application from an on-premises data center to AWS EC2, users report that page load times doubled. The on-premises application loaded pages in 500ms but now takes over 1 second. CPU and memory utilization on the instances are low. How do you diagnose and resolve this?',
      guidancePoints: [
        'Check network latency between the client and the EC2 instances — the migration may have introduced geographic distance',
        'Review security group and NACL rules to ensure they are not inspecting or blocking traffic unnecessarily',
        'Verify that the application is not making unnecessary external calls to resources still hosted on-premises',
        'Check if the EBS volume type provides sufficient IOPS for the application\'s disk access patterns',
        'Review DNS resolution — if the application resolves endpoints to on-premises IPs, requests may be hair-pinning through a VPN',
        'Enable X-Ray or CloudWatch X-Ray daemon to trace the actual request path and identify the slowest components'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Your ECS service is unable to pull container images from ECR during deployment. The task stays in PENDING state and the ECS agent logs show "resource undefined error". The same task definition worked yesterday. What do you investigate?',
      guidancePoints: [
        'Check if the ECR repository still exists and the image tag being referenced is correct',
        'Verify the ECS task execution role has the ecr:GetAuthorizationToken and ecr:BatchGetImage permissions',
        'Determine if the VPC where the ECS tasks run has VPC endpoints for ECR (ecr.api and ecr.dkr) or internet access for image pulls',
        'Check if the ECR lifecycle policy deleted the image tag being referenced',
        'Verify that the security group on the ECS instances allows outbound HTTPS (port 443) to ECR endpoints',
        'Review ECS events for the specific error message that explains the failure reason'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'A stakeholder suggests migrating all workloads to serverless (Lambda, API Gateway, DynamoDB) to eliminate all infrastructure management. As the cloud engineer, how do you evaluate this proposal?',
      guidancePoints: [
        'Acknowledge the benefits: reduced operational overhead, automatic scaling, no infrastructure management and pay-per-use pricing',
        'Identify workloads where serverless does not fit: long-running processes exceeding Lambda timeout limits, stateful applications, workloads requiring persistent connections (WebSockets, databases with connection pools)',
        'Evaluate cost at scale: Lambda pricing can exceed EC2 pricing for sustained high-throughput workloads',
        'Consider cold start latency impact on user-facing APIs requiring consistent sub-100ms response times',
        'Recommend a hybrid approach: serverless for event-driven and sporadic workloads, containers for sustained or stateful workloads'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you approach cloud cost optimization without compromising application reliability or security? Describe your methodology.',
      guidancePoints: [
        'Start with visibility: tag all resources by team, environment and purpose to enable cost allocation and accountability',
        'Identify quick wins: delete unused resources (orphaned EBS volumes, idle load balancers, unused Elastic IPs)',
        'Rightsize instances based on actual utilization metrics from the past 30-90 days, not theoretical maximums',
        'Purchase reserved instances or savings plans for baseline capacity that runs 24/7',
        'Use spot instances for fault-tolerant, interruptible workloads like batch processing and CI/CD runners',
        'Implement auto-scaling to match capacity with demand rather than maintaining peak capacity at all times'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain to a non-technical product manager why the team needs two weeks to set up a new cloud environment before development can begin. What do they get for that time investment?',
      guidancePoints: [
        'Use an analogy: setting up the cloud environment is like building the foundation and utilities of an office before employees can move in',
        'Explain the components: networking (roads and utilities), compute (desks and power), storage (filing cabinets) and security (locks and alarms)',
        'Connect to their priorities: a properly set up environment means faster feature development later, fewer production outages and easier compliance audits',
        'Show the timeline: networking and security in week one, compute and storage in week two, with development starting immediately after',
        'Offer visibility: provide a progress dashboard so they can see the environment taking shape'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'You have identified that the company will save $15,000 per month by implementing a few cloud cost optimization measures. Present the business case to the CFO for approval to spend 40 engineering hours implementing the changes.',
      guidancePoints: [
        'Open with the annual savings projection: $180,000 per year from a one-time 40-hour investment',
        'Quantify the engineering hours in dollar terms: at a blended rate, the implementation cost is a fraction of the first month\'s savings',
        'Break down the specific measures: reserved instances, rightsizing, spot instances and unused resource cleanup',
        'Address risk: each measure can be validated in staging and rolled back if it affects application performance',
        'Show the payback period: the investment pays for itself within the first month and generates savings for years after'
      ]
    }

  ]

}
