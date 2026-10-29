import type { CareerDef } from '../framework.js'

export const cloudSecurityEngineer: CareerDef = {
  slug: 'cloud-security-engineer',
  name: 'Cloud Security Engineer',
  category: 'Security',
  order: 28,
  description:
    'Secures AWS, Azure and Google Cloud estates: IAM, network controls, secrets, logging and compliance frameworks.',
  difficulty: 'Advanced',
  pathSummary:
    'Cloud platforms & security foundations → IAM, networking & identity controls → secrets management, logging & threat detection → compliance frameworks & multi-cloud governance.',
  mainSkills: [
    'Cloud IAM & Identity Federation',
    'Cloud Network Security',
    'Infrastructure as Code Security',
    'Secrets & Key Management',
    'Cloud Logging & Monitoring',
    'CIS Benchmarks & Compliance Frameworks',
    'Container & Kubernetes Security',
    'Multi-Cloud Architecture Security'
  ],
  sourcePlatforms: [
    'AWS Security Documentation',
    'Microsoft Azure Security',
    'Google Cloud Security',
    'NIST',
    'CIS'
  ],
  companyName: 'Stratosphere Cloud Defense',
  roleTitle: 'Cloud Security Engineer',

  chapters: [
    {
      slug: 'cloud-platforms-security-foundations',
      stage: 'Beginner',
      title: 'Cloud Platforms & Security Foundations',
      description: 'Understanding the shared responsibility model, core cloud service categories and foundational security principles across AWS, Azure and GCP.',
      topics: [
        {
          slug: 'shared-responsibility-model',
          title: 'The Shared Responsibility Model',
          minutes: 25,
          objectives: [
            'Explain the shared responsibility model and how obligations shift between provider and customer',
            'Differentiate security responsibilities across IaaS, PaaS and SaaS service models',
            'Identify common misconceptions that lead to cloud misconfigurations'
          ],
          sections: [
            { heading: 'What the cloud provider secures', body: 'Cloud providers like AWS, Azure and GCP secure the physical infrastructure: data centers, hardware, hypervisors and the global network backbone. They patch the underlying host operating systems and ensure power, cooling and physical access controls. This layer is shared across all tenants and is generally outside the customer\'s control.' },
            { heading: 'What the customer secures', body: 'The customer owns data classification, identity and access management, network configuration within the VPC, encryption of data at rest and in transit, and application-level security. Misunderstanding this boundary is the number one cause of cloud breaches — assuming the provider handles something the customer is actually responsible for.' },
            { heading: 'Shifting boundaries across service models', body: 'In IaaS the customer manages everything above the hypervisor. In PaaS the provider adds OS and runtime management. In SaaS only data and user access remain customer responsibilities. Knowing where your services fall on this spectrum determines exactly which controls you must implement and which you can delegate.' }
          ],
          links: [
            { title: 'AWS Shared Responsibility Model', url: 'https://aws.amazon.com/compliance/shared-responsibility-model/', sourceName: 'AWS Security Documentation', resourceType: 'reference', relationship: 'AWS official documentation explaining the shared responsibility model with visual diagrams.' },
            { title: 'Microsoft Azure Shared Responsibility', url: 'https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility', sourceName: 'Microsoft Azure Security', resourceType: 'guide', relationship: 'Microsoft guide detailing shared responsibility across Azure service types.' },
            { title: 'Google Cloud Shared Responsibility', url: 'https://cloud.google.com/docs/shared-responsibility', sourceName: 'Google Cloud Security', resourceType: 'reference', relationship: 'GCP documentation mapping shared responsibility for different cloud service models.' }
          ],
          quiz: {
            prompt: 'A company runs a database on EC2 instances. Who is responsible for patching the database engine?',
            options: [
              'AWS patches all software on EC2 instances',
              'The customer patches the database engine running on EC2',
              'AWS and the customer share equal responsibility for database patching',
              'Neither — the database vendor handles patches independently'
            ],
            answerIndex: 1,
            explanation: 'On EC2 (IaaS), the customer manages the guest OS and all software running on it, including database engines. AWS only secures the underlying hypervisor and infrastructure.'
          }
        },
        {
          slug: 'cloud-service-categories',
          title: 'Cloud Service Categories & Attack Surfaces',
          minutes: 30,
          objectives: [
            'Classify cloud services into IaaS, PaaS, SaaS and FaaS and describe the security implications of each',
            'Identify the expanded attack surface created by cloud-native services',
            'Map common cloud attack vectors to the services they target'
          ],
          sections: [
            { heading: 'IaaS, PaaS, SaaS and FaaS', body: 'Infrastructure as a Service gives you virtual machines and networks. Platform as a Service abstracts the OS, letting you deploy code directly. Software as a Service delivers applications with no infrastructure management. Function as a Service (serverless) runs code per event with no server management at all. Each model changes what you configure, what you monitor and what you can secure.' },
            { heading: 'The expanded cloud attack surface', body: 'Cloud introduces attack vectors that do not exist on-premises: exposed S3 buckets, misconfigured security groups, overly permissive IAM roles, unencrypted snapshots, public database endpoints and leaked API keys in source code. The breadth of services means a security engineer must understand hundreds of configuration options, not just a handful of firewall rules.' },
            { heading: 'Mapping attack vectors to services', body: 'An exposed storage bucket targets object storage services. A misconfigured network ACL targets VPC networking. Stolen access keys target IAM and API gateways. Serverless functions introduce event injection attacks. Each service category has its own set of misconfiguration risks, and understanding this mapping is essential for building effective cloud security controls.' }
          ],
          links: [
            { title: 'AWS Well-Architected Framework — Security Pillar', url: 'https://docs.aws.amazon.com/wellarchitected/latest/framework/security-parameters.html', sourceName: 'AWS Security Documentation', resourceType: 'reference', relationship: 'AWS security pillar covering best practices for securing cloud architectures.' },
            { title: 'Azure Cloud Adoption Framework — Security', url: 'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/secure/overview', sourceName: 'Microsoft Azure Security', resourceType: 'guide', relationship: 'Microsoft security guidance for cloud adoption covering threat modeling and risk management.' },
            { title: 'CIS Google Cloud Computing Foundation Benchmark', url: 'https://www.cisecurity.org/benchmark/google-cloud-platform', sourceName: 'CIS', resourceType: 'reference', relationship: 'CIS benchmark providing security configuration standards for Google Cloud Platform.' }
          ],
          quiz: {
            prompt: 'A development team deploys an AWS Lambda function that queries a database. Which service category introduces unique risks around event injection and function-level permissions?',
            options: [
              'IaaS — because the function runs on a virtual machine',
              'SaaS — because the database is a managed service',
              'FaaS / Serverless — because the function is triggered by events with its own execution role',
              'PaaS — because the function shares the platform with other tenants'
            ],
            answerIndex: 2,
            explanation: 'Lambda is a FaaS (serverless) service. It is triggered by events and has its own IAM execution role. Risks include event injection, overly permissive execution roles and insufficient function-level isolation.'
          }
        },
        {
          slug: 'cis-benchmarks-cloud',
          title: 'CIS Benchmarks for Cloud Platforms',
          minutes: 25,
          objectives: [
            'Navigate CIS Benchmarks for AWS, Azure and GCP and explain their structure',
            'Run automated compliance scans against CIS Benchmark profiles',
            'Interpret benchmark findings and distinguish critical from informational items'
          ],
          sections: [
            { heading: 'What CIS Benchmarks cover', body: 'The Center for Internet Security publishes benchmark documents for every major cloud platform. They contain prescriptive configuration guidance organized by service area: IAM, storage, networking, logging and more. Each recommendation is assigned a severity level (Level 1 for essential, Level 2 for defense-in-depth) so teams can prioritize remediation.' },
            { heading: 'Running automated scans', body: 'Manual benchmark checks do not scale. Tools like AWS Config conformance packs, Azure Policy and GCP Security Command Center can evaluate environments against CIS profiles continuously. Third-party tools like Prowler (AWS), ScoutSuite (multi-cloud) and CloudSploit run CIS checks and produce reports highlighting non-compliant resources with the specific control that was violated.' },
            { heading: 'Interpreting and prioritizing findings', body: 'A single CIS scan may produce hundreds of findings. Not all are equal — a public S3 bucket (Level 1) is critical, while disabling unused regions (Level 2) is defense-in-depth. Group findings by service, severity and blast radius. Critical findings that affect customer data or internet-facing resources go first; informational findings are tracked but not urgently remediated.' }
          ],
          links: [
            { title: 'CIS AWS Foundations Benchmark', url: 'https://www.cisecurity.org/benchmark/aws', sourceName: 'CIS', resourceType: 'reference', relationship: 'CIS benchmark for foundational AWS security configurations.' },
            { title: 'CIS Microsoft Azure Foundations Benchmark', url: 'https://www.cisecurity.org/benchmark/azure', sourceName: 'CIS', resourceType: 'reference', relationship: 'CIS benchmark for foundational Azure security configurations.' },
            { title: 'CIS Google Cloud Platform Foundation Benchmark', url: 'https://www.cisecurity.org/benchmark/gcp', sourceName: 'CIS', resourceType: 'reference', relationship: 'CIS benchmark for foundational Google Cloud security configurations.' }
          ],
          quiz: {
            prompt: 'A CIS scan flags a Level 1 finding for S3 buckets and a Level 2 finding for unused AWS regions. Which should you remediate first?',
            options: [
              'The Level 2 finding because it has a higher level number',
              'The Level 1 finding because Level 1 items are essential and higher priority',
              'Both have equal priority regardless of level',
              'Neither — CIS findings are advisory only'
            ],
            answerIndex: 1,
            explanation: 'Level 1 benchmarks are essential security best practices that should be implemented first. Level 2 provides defense-in-depth and is addressed after Level 1 items are resolved.'
          }
        }
      ]
    },
    {
      slug: 'iam-identity-networking-controls',
      stage: 'Foundation',
      title: 'IAM, Identity & Network Security Controls',
      description: 'Designing least-privilege IAM policies, configuring identity federation and hardening cloud networking with security groups, VPCs and private endpoints.',
      topics: [
        {
          slug: 'least-privilege-iam',
          title: 'Least-Privilege IAM Design',
          minutes: 30,
          objectives: [
            'Write IAM policies that follow the principle of least privilege across AWS, Azure and GCP',
            'Design IAM roles for workloads instead of using long-lived access keys',
            'Audit IAM configurations to identify overly permissive policies and unused permissions'
          ],
          sections: [
            { heading: 'Why least privilege matters in the cloud', body: 'Cloud IAM is the front door to your entire estate. An overly permissive IAM policy — even one with an unnecessary wildcard — can allow an attacker who compromises a workload to escalate privileges, access sensitive data across services and pivot to other accounts. Least privilege means every identity, human or machine, gets only the permissions it needs and nothing more.' },
            { heading: 'IAM roles over access keys', body: 'Long-lived access keys are the most common source of cloud breaches. IAM roles for workloads (EC2 instance profiles, Azure managed identities, GCP service accounts) provide temporary credentials that rotate automatically. Eliminating static keys from code, CI/CD pipelines and developer machines is a foundational cloud security hygiene step.' },
            { heading: 'Auditing and right-sizing permissions', body: 'AWS IAM Access Analyzer, Azure AD Identity Governance and GCP IAM Recommender analyze usage patterns and flag permissions that have never been used. Running these tools monthly and removing unused permissions keeps policies tight. AWS also offers last-accessed timestamps in the IAM console to help you determine whether a specific permission is still needed.' }
          ],
          links: [
            { title: 'AWS IAM Policy Evaluation Logic', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html', sourceName: 'AWS Security Documentation', resourceType: 'reference', relationship: 'AWS documentation explaining how IAM policy decisions are evaluated.' },
            { title: 'Microsoft Entra ID Least Privilege', url: 'https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/delegate-by-roles', sourceName: 'Microsoft Azure Security', resourceType: 'guide', relationship: 'Microsoft guidance on implementing least-privilege RBAC in Azure and Entra ID.' },
            { title: 'NIST SP 800-206 — Cloud Security Controls', url: 'https://csrc.nist.gov/publications/detail/sp/800-206/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST guidance on cloud-specific security controls including identity and access management.' }
          ],
          quiz: {
            prompt: 'A developer needs temporary access to an S3 bucket to debug a production issue. What is the most secure approach?',
            options: [
              'Share a long-lived access key with the developer',
              'Attach an IAM policy with S3 full access to the developer\'s user',
              'Use an IAM role with a time-limited trust policy or AWS IAM Identity Center session',
              'Tell the developer to use the root account credentials'
            ],
            answerIndex: 2,
            explanation: 'Time-limited role assumption or federated sessions provide temporary, auditable access without long-lived credentials. This follows least privilege and eliminates the risk of leaked keys.'
          }
        },
        {
          slug: 'identity-federation-sso',
          title: 'Identity Federation & Single Sign-On',
          minutes: 25,
          objectives: [
            'Configure identity federation between a cloud provider and an external identity provider',
            'Explain the differences between SAML 2.0 and OIDC for cloud SSO',
            'Implement conditional access policies that enforce MFA and device compliance'
          ],
          sections: [
            { heading: 'Federation models in the cloud', body: 'Identity federation lets you authenticate users through your existing identity provider (Okta, Azure AD, Google Workspace) and grant cloud access without creating separate cloud accounts. SAML 2.0 is widely used for enterprise federation; OIDC is increasingly preferred for modern applications and serverless workloads. Both protocols exchange tokens that map to cloud IAM permissions.' },
            { heading: 'Enforcing conditional access', body: 'Federation alone is not enough — you also need to control when and how federated identities can access resources. Azure AD Conditional Access, AWS IAM Identity Center and GCP BeyondCorp policies can enforce MFA requirements, restrict access from managed devices only, block risky sign-in locations and require step-up authentication for privileged operations.' },
            { heading: 'Avoiding federation pitfalls', body: 'Common mistakes include not scoping federation to specific roles or accounts, failing to enforce MFA, not deprovisioning users from the IdP when employees leave, and allowing federation from untrusted identity providers. Each of these can be exploited to gain persistent access to cloud resources.' }
          ],
          links: [
            { title: 'AWS IAM Identity Center Integration', url: 'https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html', sourceName: 'AWS Security Documentation', resourceType: 'reference', relationship: 'AWS documentation for IAM Identity Center federation and SSO configuration.' },
            { title: 'Azure AD Conditional Access Policies', url: 'https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview', sourceName: 'Microsoft Azure Security', resourceType: 'guide', relationship: 'Microsoft guide on configuring Conditional Access policies for Azure and cloud resource access.' },
            { title: 'Google Cloud Identity-Aware Proxy', url: 'https://cloud.google.com/iap/docs/concepts-overview', sourceName: 'Google Cloud Security', resourceType: 'reference', relationship: 'GCP documentation on Identity-Aware Proxy for zero-trust access to cloud applications.' }
          ],
          quiz: {
            prompt: 'After implementing SAML federation with Okta, you discover that former employees can still access AWS resources because their Okta accounts were not deprovisioned. What is the root cause?',
            options: [
              'SAML does not support user deprovisioning',
              'The federation trust was not configured to validate user lifecycle events from the IdP',
              'AWS does not support SAML federation',
              'The former employees remembered their AWS credentials'
            ],
            answerIndex: 1,
            explanation: 'SAML federation does not automatically deprovision users when their IdP accounts are disabled. You need to configure user lifecycle monitoring or use SCIM provisioning to sync deprovisioning events with the cloud provider.'
          }
        },
        {
          slug: 'cloud-network-hardening',
          title: 'Cloud Network Security Hardening',
          minutes: 30,
          objectives: [
            'Design VPC and VNet architectures with private subnets and network segmentation',
            'Configure security groups and network ACLs following least-privilege principles',
            'Implement private endpoints and VPC peering to eliminate public internet exposure'
          ],
          sections: [
            { heading: 'VPC and VNet segmentation', body: 'A well-designed cloud network places workloads in tiered subnets: public subnets for load balancers and bastion hosts, private subnets for application servers, and isolated subnets for databases and management. Network ACLs and security groups enforce traffic rules at the subnet and instance level respectively. This mirrors on-premises DMZ architecture but with cloud-native controls.' },
            { heading: 'Security groups versus network ACLs', body: 'Security groups are stateful and operate at the instance level — if you allow inbound port 443, the return traffic is automatically allowed. Network ACLs are stateless and operate at the subnet level — you must explicitly allow both inbound and return traffic. Use security groups as your primary control and network ACLs as an additional layer of defense for subnet-wide rules.' },
            { heading: 'Private endpoints and VPC peering', body: 'Private endpoints (AWS PrivateLink, Azure Private Link, GCP Private Service Connect) allow you to access cloud services without traversing the public internet. VPC peering and transit gateways connect multiple VPCs across accounts or regions. Together these features keep sensitive traffic off the public internet and reduce the attack surface to only explicitly peered networks.' }
          ],
          links: [
            { title: 'AWS VPC Security Best Practices', url: 'https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-best-practices.html', sourceName: 'AWS Security Documentation', resourceType: 'reference', relationship: 'AWS documentation on VPC security design and best practices.' },
            { title: 'Azure Virtual Network Security', url: 'https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-security-overview', sourceName: 'Microsoft Azure Security', resourceType: 'guide', relationship: 'Microsoft guide on Azure VNet security including NSGs, ASGs and Private Endpoints.' },
            { title: 'Google Cloud VPC Firewall Rules', url: 'https://cloud.google.com/vpc/docs/firewalls', sourceName: 'Google Cloud Security', resourceType: 'reference', relationship: 'GCP documentation on VPC firewall rule configuration and best practices.' }
          ],
          quiz: {
            prompt: 'An application server in a private subnet needs to connect to a managed database in another private subnet. Which combination provides the most secure connectivity?',
            options: [
              'Route traffic through a public NAT gateway over the internet',
              'Open the database to the public internet and use a security group to restrict source IPs',
              'Use VPC peering with security group rules allowing only the application server\'s security group on the database port',
              'Use SSH tunneling through a bastion host to reach the database'
            ],
            answerIndex: 2,
            explanation: 'VPC peering keeps traffic within the private network, and security group references (rather than IP ranges) provide identity-based access control. This eliminates internet exposure and uses the most restrictive source targeting available.'
          }
        }
      ]
    },
    {
      slug: 'secrets-logging-threat-detection',
      stage: 'Intermediate',
      title: 'Secrets Management, Logging & Threat Detection',
      description: 'Managing secrets and encryption keys, configuring comprehensive cloud logging and building detection capabilities for cloud-specific threats.',
      topics: [
        {
          slug: 'secrets-management',
          title: 'Secrets & Encryption Key Management',
          minutes: 30,
          objectives: [
            'Implement a secrets management solution using cloud-native vaults',
            'Design encryption key lifecycle management with automatic rotation',
            'Eliminate hardcoded secrets from source code and configuration files'
          ],
          sections: [
            { heading: 'Why secrets management is critical', body: 'Hardcoded API keys, database passwords and certificates in source code or environment files are the leading cause of cloud credential leaks. GitHub repository scanning tools routinely find thousands of exposed AWS keys, Azure connection strings and GCP service account files. A secrets management platform centralizes storage, controls access and provides audit trails for every secret retrieval.' },
            { heading: 'Cloud-native secrets vaults', body: 'AWS Secrets Manager and Parameter Store, Azure Key Vault and GCP Secret Manager all provide managed services for storing and retrieving secrets. They support automatic rotation (especially for database credentials), fine-grained access policies and integration with IAM for access control. Choose based on your cloud footprint — use the native service for single-cloud deployments and tools like HashiCorp Vault for multi-cloud.' },
            { heading: 'Key management and rotation', body: 'Encryption keys should never be stored alongside the data they encrypt. Cloud KMS services (AWS KMS, Azure Key Vault keys, GCP Cloud KMS) manage the lifecycle: creation, rotation, disabling and destruction. Enabling automatic annual rotation ensures keys do not remain static. Customer-managed keys (CMKs) give you control over who can decrypt data, while provider-managed keys reduce operational burden at the cost of control.' }
          ],
          links: [
            { title: 'AWS Secrets Manager Documentation', url: 'https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html', sourceName: 'AWS Security Documentation', resourceType: 'reference', relationship: 'AWS Secrets Manager documentation covering storage, rotation and retrieval of secrets.' },
            { title: 'Azure Key Vault Best Practices', url: 'https://learn.microsoft.com/en-us/azure/key-vault/general/best-practices', sourceName: 'Microsoft Azure Security', resourceType: 'guide', relationship: 'Microsoft best practices for Azure Key Vault including access policies and key rotation.' },
            { title: 'Google Cloud Secret Manager', url: 'https://cloud.google.com/secret-manager/docs/overview', sourceName: 'Google Cloud Security', resourceType: 'reference', relationship: 'GCP Secret Manager documentation for storing, accessing and managing secrets.' }
          ],
          quiz: {
            prompt: 'A developer commits an AWS access key to a public GitHub repository. What is the correct immediate response?',
            options: [
              'Delete the GitHub repository to remove the key',
              'Rotate the compromised key immediately, review CloudTrail for unauthorized usage, and enable automated secret scanning',
              'Wait until the next quarterly key rotation cycle',
              'Report the developer to HR and do nothing else until the investigation is complete'
            ],
            answerIndex: 1,
            explanation: 'Compromised credentials must be rotated immediately. Reviewing CloudTrail determines if the key was used maliciously. Adding automated secret scanning (e.g., GitHub Advanced Security, GitGuardian) prevents future occurrences.'
          }
        },
        {
          slug: 'cloud-logging-monitoring',
          title: 'Cloud Logging & Security Monitoring',
          minutes: 30,
          objectives: [
            'Configure comprehensive audit logging across cloud services and regions',
            'Build CloudTrail, Activity Log and Audit Log pipelines into a centralized SIEM',
            'Create detection rules for cloud-specific attack patterns'
          ],
          sections: [
            { heading: 'Audit logging across providers', body: 'AWS CloudTrail records API calls across all services. Azure Activity Log captures control-plane operations while Azure Monitor handles resource-level telemetry. GCP Cloud Audit Logs split into admin activity, data access and system event logs. Each must be enabled in every region and account — a single disabled trail creates an investigation blind spot.' },
            { heading: 'Centralizing cloud logs', body: 'Logs scattered across individual accounts and regions are useless for correlation. Aggregate CloudTrail, Activity Logs and Audit Logs into a central SIEM (Splunk, Microsoft Sentinel, Google Chronicle) using native log forwarding or a log aggregation pipeline. CloudTrail log file validation with SHA-256 hashing ensures logs have not been tampered with.' },
            { heading: 'Cloud-specific detection rules', body: 'Cloud environments generate unique threat indicators: console logins from unusual geographies, IAM policy changes that grant elevated privileges, S3 bucket ACL changes to public, security group modifications that open sensitive ports, and root account usage. Writing detection rules for these cloud-native events catches attacks that traditional endpoint detection would miss.' }
          ],
          links: [
            { title: 'AWS CloudTrail User Guide', url: 'https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html', sourceName: 'AWS Security Documentation', resourceType: 'reference', relationship: 'AWS CloudTrail documentation for logging, monitoring and validating API activity.' },
            { title: 'Azure Monitor Activity Log', url: 'https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log-overview', sourceName: 'Microsoft Azure Security', resourceType: 'reference', relationship: 'Microsoft documentation on Azure Activity Log for tracking control-plane operations.' },
            { title: 'Google Cloud Audit Logging', url: 'https://cloud.google.com/logging/docs/audit', sourceName: 'Google Cloud Security', resourceType: 'reference', relationship: 'GCP documentation on audit logging for admin activity, data access and system events.' }
          ],
          quiz: {
            prompt: 'You discover that CloudTrail logging was disabled in one AWS region for three weeks. What is the most likely reason and the greatest risk?',
            options: [
              'The region was not in use, so no risk exists',
              'A threat actor disabled the trail to cover their tracks during the three-week window',
              'AWS automatically disables trails in inactive regions',
              'CloudTrail only works in regions with active EC2 instances'
            ],
            answerIndex: 1,
            explanation: 'Disabling CloudTrail is a classic attacker technique to erase evidence of their activity. During the three-week blind spot, any API calls — including data exfiltration, IAM changes and resource creation — went unlogged.'
          }
        },
        {
          slug: 'cloud-threat-detection',
          title: 'Cloud Threat Detection & Response',
          minutes: 25,
          objectives: [
            'Deploy cloud-native threat detection services like AWS GuardDuty, Azure Defender and GCP SCC',
            'Investigate cloud-specific incidents using resource-level telemetry',
            'Automate initial response actions using cloud-native automation tools'
          ],
          sections: [
            { heading: 'Cloud-native threat detection', body: 'AWS GuardDuty, Microsoft Defender for Cloud and Google Cloud Security Command Center use machine learning and threat intelligence to detect anomalies: unusual API call volumes, cryptomining activity, unauthorized access patterns and compromised credentials. These services are low-overhead and provide immediate detection value as a first layer of cloud threat detection.' },
            { heading: 'Investigating cloud incidents', body: 'Cloud incidents require different investigative tools than on-premises. CloudTrail shows who did what and when. VPC Flow Logs show network-level activity. CloudWatch or Azure Monitor metrics show resource utilization anomalies. GCP Asset Inventory shows resource changes over time. Combining these sources builds a full picture of what the attacker did in the cloud environment.' },
            { heading: 'Automated cloud response', body: 'AWS Lambda, Azure Logic Apps and GCP Cloud Functions can automate initial response: isolating a compromised EC2 instance by changing its security group, disabling a compromised IAM user, revoking leaked access keys or snapshotting a volume before deletion. Automation reduces response time from hours to seconds, critical when the attacker is actively moving through the cloud environment.' }
          ],
          links: [
            { title: 'AWS GuardDuty Documentation', url: 'https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html', sourceName: 'AWS Security Documentation', resourceType: 'reference', relationship: 'AWS GuardDuty documentation for threat detection and finding management.' },
            { title: 'Microsoft Defender for Cloud', url: 'https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-cloud-introduction', sourceName: 'Microsoft Azure Security', resourceType: 'reference', relationship: 'Microsoft documentation on Defender for Cloud threat protection and security posture management.' },
            { title: 'Google Cloud Security Command Center', url: 'https://cloud.google.com/security-command-center/docs/concepts-security-command-center-overview', sourceName: 'Google Cloud Security', resourceType: 'reference', relationship: 'GCP Security Command Center documentation for threat detection and security analytics.' }
          ],
          quiz: {
            prompt: 'GuardDuty generates a finding: "UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration.OutsideAWS". What does this indicate?',
            options: [
              'A legitimate user is accessing the instance from outside AWS',
              'EC2 instance credentials were used from an IP address outside of AWS infrastructure',
              'The IAM user was created outside of AWS',
              'An instance was launched from outside the VPC'
            ],
            answerIndex: 1,
            explanation: 'This finding indicates that temporary credentials obtained from an EC2 instance metadata service were used from an IP address outside AWS. This is a strong indicator of credential theft where an attacker extracted instance credentials and used them externally.'
          }
        }
      ]
    },
    {
      slug: 'compliance-multi-cloud-governance',
      stage: 'Advanced',
      title: 'Compliance Frameworks & Multi-Cloud Governance',
      description: 'Applying NIST, CIS and industry compliance frameworks to cloud environments, implementing policy-as-code and managing security across multiple cloud providers.',
      topics: [
        {
          slug: 'nist-cloud-compliance',
          title: 'NIST Frameworks for Cloud Compliance',
          minutes: 30,
          objectives: [
            'Map cloud controls to NIST SP 800-53 and NIST CSF requirements',
            'Implement continuous compliance monitoring using cloud-native tooling',
            'Prepare evidence packages for cloud-focused compliance audits'
          ],
          sections: [
            { heading: 'NIST SP 800-53 in the cloud', body: 'NIST SP 800-53 defines over 1,000 controls organized into families. In the cloud, many controls are partially or fully addressed by the provider (physical security, infrastructure maintenance), but customer-responsible controls — access control, audit logging, encryption, incident response — must be implemented and documented. Mapping each cloud service to its applicable control baseline prevents compliance gaps.' },
            { heading: 'Continuous compliance monitoring', body: 'Point-in-time audits are insufficient for dynamic cloud environments where resources are created and destroyed constantly. AWS Config Rules, Azure Policy and GCP Organization Policy provide continuous compliance evaluation. Non-compliant resources trigger alerts automatically. This approach transforms compliance from a periodic audit exercise into an ongoing, automated capability.' },
            { heading: 'Audit evidence collection', body: 'Cloud-native tools generate evidence automatically: CloudTrail logs prove who accessed what, config compliance history shows when deviations occurred and were remediated, and IAM credential reports document access key age and usage. Organizing this evidence into an auditor-ready package with clear mapping to specific NIST controls demonstrates compliance posture far more effectively than manual screenshots and spreadsheets.' }
          ],
          links: [
            { title: 'NIST SP 800-53 Rev. 5', url: 'https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'The definitive NIST catalog of security and privacy controls.' },
            { title: 'NIST Cybersecurity Framework', url: 'https://www.nist.gov/cyberframework', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST CSF framework for managing and reducing cybersecurity risk.' },
            { title: 'AWS Config Conformance Packs', url: 'https://docs.aws.amazon.com/config/latest/developerguide/conformance-packs.html', sourceName: 'AWS Security Documentation', resourceType: 'reference', relationship: 'AWS documentation on deploying conformance packs for continuous compliance monitoring.' }
          ],
          quiz: {
            prompt: 'A new microservice is deployed to production without going through the organization\'s cloud security review process. Which NIST CSF function was primarily neglected?',
            options: [
              'Respond',
              'Recover',
              'Identify',
              'Protect'
            ],
            answerIndex: 2,
            explanation: 'The Identify function includes asset management and risk assessment. Deploying without a security review means the risk was not identified or assessed before the resource entered the production environment.'
          }
        },
        {
          slug: 'policy-as-code',
          title: 'Policy-as-Code & Governance Automation',
          minutes: 30,
          objectives: [
            'Write and enforce infrastructure guardrails using Open Policy Agent or cloud-native policy services',
            'Implement pre-deployment policy checks in CI/CD pipelines',
            'Design exception management processes for policy violations'
          ],
          sections: [
            { heading: 'Policy-as-code fundamentals', body: 'Policy-as-code translates security and compliance requirements into machine-enforceable rules. Tools like Open Policy Agent (OPA), AWS Service Control Policies (SCPs), Azure Policy and GCP Organization Policies define what is allowed: permitted instance types, required encryption settings, forbidden public exposures and mandatory tagging. These policies are version-controlled, peer-reviewed and tested like application code.' },
            { heading: 'Pre-deployment policy checks', body: 'Shifting security left means validating policies before deployment, not after. Terraform plan output can be evaluated against OPA/Rego policies in the CI/CD pipeline. AWS CloudFormation Guard checks templates before stack creation. Kyverno validates Kubernetes manifests before they reach the cluster. A policy violation in the pipeline blocks deployment with a clear error message explaining which policy failed and why.' },
            { heading: 'Exception management', body: 'No policy framework works without exceptions. A team may need a non-standard instance type for a legitimate workload. The exception process should require: a documented business justification, a compensating control that mitigates the risk, an expiration date for the exception and an owner responsible for re-evaluation. Tracking exceptions in a centralized registry prevents policy drift from becoming permanent.' }
          ],
          links: [
            { title: 'AWS Service Control Policies', url: 'https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html', sourceName: 'AWS Security Documentation', resourceType: 'reference', relationship: 'AWS documentation on SCPs for setting permission guardrails across organizational units.' },
            { title: 'Azure Policy Documentation', url: 'https://learn.microsoft.com/en-us/azure/governance/policy/overview', sourceName: 'Microsoft Azure Security', resourceType: 'reference', relationship: 'Microsoft Azure Policy documentation for creating and enforcing governance policies.' },
            { title: 'Google Cloud Organization Policies', url: 'https://cloud.google.com/resource-manager/docs/organization-policy/overview', sourceName: 'Google Cloud Security', resourceType: 'reference', relationship: 'GCP Organization Policy documentation for setting constraints across GCP resources.' }
          ],
          quiz: {
            prompt: 'Your organization requires all S3 buckets to have server-side encryption enabled. Which enforcement approach catches violations earliest in the development lifecycle?',
            options: [
              'A daily Config rule scan that flags non-compliant buckets after deployment',
              'A CI/CD pipeline check that blocks Terraform deployments if encryption is not configured',
              'A manual review of bucket settings by the security team each quarter',
              'An S3 event notification that alerts when a new bucket is created without encryption'
            ],
            answerIndex: 1,
            explanation: 'A CI/CD pipeline check blocks the violation before the resource is ever created. The daily scan catches it after deployment, the quarterly review is far too late, and the event notification requires the resource to already exist.'
          }
        },
        {
          slug: 'multi-cloud-governance',
          title: 'Multi-Cloud Security Governance',
          minutes: 25,
          objectives: [
            'Design a unified security governance model across AWS, Azure and GCP',
            'Implement consistent identity, network and data protection policies across providers',
            'Evaluate trade-offs between cloud-native and third-party multi-cloud security tools'
          ],
          sections: [
            { heading: 'Why multi-cloud complicates security', body: 'Each cloud provider has different IAM models, networking constructs, logging formats and compliance certifications. Managing security separately per cloud leads to gaps: one provider might have encryption enforced by default while another does not, or logging verbosity differs dramatically. A unified governance model abstracts provider-specific differences into consistent organizational policies.' },
            { heading: 'Building a unified governance model', body: 'Start with identity: federate all cloud accounts through a single identity provider with consistent RBAC mappings. Standardize logging: forward all cloud audit logs to a single SIEM with normalized schemas. Enforce data protection: require encryption at rest and in transit across all providers using a common key management hierarchy. Align compliance: map all provider-specific controls to a single framework like NIST SP 800-53.' },
            { heading: 'Tool selection: native versus third-party', body: 'Cloud-native tools (AWS Security Hub, Azure Defender, GCP SCC) provide deep provider-specific visibility but require separate consoles and learning curves. Third-party tools (Wiz, Prisma Cloud, Orca) offer a single pane of glass across providers but may lack the depth of native tools. Most mature organizations use both: native tools for provider-specific optimization, third-party tools for unified visibility and cross-cloud correlation.' }
          ],
          links: [
            { title: 'AWS Security Hub Documentation', url: 'https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html', sourceName: 'AWS Security Documentation', resourceType: 'reference', relationship: 'AWS Security Hub documentation for centralized security findings across AWS accounts.' },
            { title: 'Microsoft Defender for Cloud Multi-Cloud', url: 'https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-cloud-introduction', sourceName: 'Microsoft Azure Security', resourceType: 'reference', relationship: 'Microsoft documentation on Defender for Cloud support for multi-cloud environments.' },
            { title: 'NIST SP 800-144 — Guidelines on Cloud Security', url: 'https://csrc.nist.gov/publications/detail/sp/800-144/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST guidelines on security and privacy in public cloud computing services.' }
          ],
          quiz: {
            prompt: 'An organization uses AWS and Azure. AWS has encryption at rest enabled by default for S3 and EBS, but Azure does not enable encryption by default for all storage types. What is the best governance approach?',
            options: [
              'Rely on AWS defaults and assume Azure behaves the same way',
              'Require encryption configuration in Terraform modules for all providers, validated by policy-as-code in the CI/CD pipeline',
              'Only audit storage encryption once per year during the compliance review',
              'Let each team decide whether encryption is necessary for their resources'
            ],
            answerIndex: 1,
            explanation: 'Provider defaults differ. Explicitly requiring encryption through policy-as-code enforced in the pipeline ensures consistent protection regardless of provider defaults and eliminates reliance on manual team decisions.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Cloud Estate Security Audit & Hardening',
    coverage: [
      'IAM Policy Review & Least-Privilege Enforcement',
      'VPC/VNet Network Security Assessment',
      'Secrets & Encryption Key Audit',
      'Cloud Logging & Threat Detection Configuration',
      'CIS Benchmark Compliance Evaluation',
      'Remediation Plan & Evidence Documentation'
    ],
    brief:
      'You are the cloud security engineer assigned to audit a multi-account AWS and Azure environment ahead of an upcoming SOC 2 Type II audit. The environment has grown rapidly over the past year with minimal governance. Conduct a full security audit, identify and prioritize misconfigurations, implement critical fixes, and produce a compliance evidence package with a remediation roadmap.',
    requirements: [
      'Review IAM policies across all accounts and identify overprivileged roles and unused credentials',
      'Audit VPC and VNet security groups and network ACLs for overly permissive rules',
      'Verify that all secrets are stored in managed vaults and no credentials are hardcoded in code or config files',
      'Confirm audit logging is enabled in all regions and accounts with no gaps',
      'Run a CIS Benchmark scan against all in-scope accounts and categorize findings by severity',
      'Implement at least three critical remediations (e.g., public bucket fix, security group lockdown, key rotation)',
      'Produce a compliance evidence package with CIS scan results, IAM credential reports and audit log verification'
    ],
    expectedOutput:
      'A complete cloud security audit package: CIS Benchmark scan results, IAM analysis, network security findings, secrets audit report, evidence of critical remediations applied and a prioritized remediation roadmap for remaining findings.',
    rubric: [
      { skill: 'IAM Audit & Least Privilege', weight: 20, criteria: 'Identifies overprivileged policies with specific evidence, demonstrates right-sizing and eliminates unnecessary access' },
      { skill: 'Network Security Assessment', weight: 15, criteria: 'Thoroughly reviews security groups and ACLs, identifies risky rules and proposes specific remediations' },
      { skill: 'Secrets & Encryption Audit', weight: 15, criteria: 'Verifies all secrets are vault-managed, identifies any hardcoded credentials and validates key rotation policies' },
      { skill: 'Logging & Detection', weight: 15, criteria: 'Confirms comprehensive audit logging, identifies gaps and validates log integrity and centralization' },
      { skill: 'Compliance & Documentation', weight: 20, criteria: 'CIS scan properly executed and findings categorized; evidence package is organized, complete and maps to specific controls' },
      { skill: 'Remediation Execution', weight: 15, criteria: 'Critical fixes are implemented correctly, tested and documented with before-and-after evidence' }
    ],
    passScore: 75
  },

  assignments: [
    {
      title: 'IAM Least-Privilege Policy Design',
      stage: 'Foundation',
      objective: 'Analyze a set of overprivileged IAM policies and rewrite them to follow least-privilege principles while maintaining operational functionality.',
      requirements: [
        'Review five provided IAM policies with documented overprivileged access patterns',
        'Identify specific permissions that violate least privilege and explain the risk each poses',
        'Rewrite each policy with scoped resources, condition keys and only required actions',
        'Document the access pattern that each rewritten policy supports',
        'Test the rewritten policies in a sandbox environment to verify functionality is preserved'
      ],
      skillsEvaluated: ['IAM Policy Writing', 'Least-Privilege Design', 'Risk Assessment', 'AWS Policy Simulator'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the original and rewritten policies with risk analysis, a justification for each retained permission and test results from the policy simulator.',
        textLabel: 'IAM least-privilege policy design report',
        minTextLength: 1000,
        linkLabels: ['Policy files and test results']
      }
    },
    {
      title: 'Cloud Security Architecture Hardening',
      stage: 'Intermediate',
      objective: 'Review a multi-tier cloud architecture diagram and implement security hardening controls across networking, IAM, encryption and logging.',
      requirements: [
        'Analyze the provided architecture diagram and identify at least eight security weaknesses',
        'Propose specific controls for each weakness aligned to CIS Benchmark recommendations',
        'Implement the controls using IaC (Terraform or CloudFormation) with inline security annotations',
        'Configure centralized logging to capture all control-plane and data-plane events',
        'Write a hardening report mapping each control to the CIS benchmark control it addresses'
      ],
      skillsEvaluated: ['Cloud Architecture Security', 'CIS Benchmarks', 'Infrastructure as Code', 'Logging Architecture'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the hardened IaC templates, the hardening report with CIS mappings and a before-and-after architecture comparison.',
        textLabel: 'Cloud security architecture hardening report',
        minTextLength: 1200,
        linkLabels: ['IaC templates and architecture diagrams']
      }
    },
    {
      title: 'Multi-Cloud Compliance Framework Mapping',
      stage: 'Advanced',
      objective: 'Map a company\'s cloud environment across AWS and Azure to NIST SP 800-53 controls, identifying gaps and building an automated compliance monitoring pipeline.',
      requirements: [
        'Create a control mapping matrix linking NIST SP 800-53 families to specific cloud services and configurations',
        'Identify controls that are provider-responsibility versus customer-responsibility in each cloud',
        'Write OPA/Rego or Azure Policy definitions to enforce the top ten highest-risk controls automatically',
        'Build a compliance dashboard that visualizes control status across both clouds',
        'Produce an audit-ready evidence package with automated collection scripts'
      ],
      skillsEvaluated: ['NIST SP 800-53', 'Multi-Cloud Governance', 'Policy-as-Code', 'Compliance Automation'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the control mapping matrix, policy-as-code files, dashboard configuration and the automated evidence collection scripts with documentation.',
        textLabel: 'Multi-cloud compliance framework and automation package',
        minTextLength: 1500,
        linkLabels: ['Policy files and compliance scripts']
      }
    }
  ],

  simTasks: [
    {
      title: 'Publicly exposed S3 bucket containing sensitive data',
      context: 'An automated scan by your cloud security tool detects that an S3 bucket named "project-x-analytics-dump" has been set to public-read. The bucket contains 2.3 GB of CSV files with customer names, email addresses and purchase history. The bucket was created by a data engineering intern six weeks ago and no one has reviewed the permissions since.',
      requirements: [
        'Immediately restrict the bucket to private access using a bucket policy that denies all public principals',
        'Determine whether the bucket was accessed externally using S3 access logs and CloudTrail',
        'Identify all objects in the bucket and classify the data sensitivity level',
        'Notify the data protection officer and affected customers if required by regulation',
        'Implement preventive controls to block future public bucket creation using SCPs or Organization policies'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Containment evidence with bucket policy change, access log analysis with IOC findings, data classification, notification decision and preventive control implementation.',
      skills: ['S3 Security', 'Cloud Incident Response', 'Data Classification', 'IAM Policy Enforcement']
    },
    {
      title: 'IAM access keys leaked in public GitHub repository',
      context: 'A developer accidentally committed an AWS access key and secret key to a public GitHub repository. The key has been exposed for 72 hours. The access key belongs to an IAM user with admin-level permissions on a production account containing customer databases.',
      requirements: [
        'Deactivate the compromised access key immediately and review all API calls made using that key',
        'Identify any resources created, modified or deleted using the compromised credentials',
        'Check for persistence mechanisms: new IAM users, access keys, security group rules or Lambda functions created by the attacker',
        'Rotate all credentials in the affected account as a precaution',
        'Implement automated secret scanning in the CI/CD pipeline and developer workstations'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Key deactivation evidence, CloudTrail investigation timeline, persistence check results, credential rotation log and secret scanning implementation.',
      skills: ['Cloud Incident Response', 'CloudTrail Investigation', 'IAM Security', 'DevSecOps']
    },
    {
      title: 'Compliance gap discovered before SOC 2 audit',
      context: 'Two weeks before the SOC 2 Type II audit, the compliance team discovers that 34% of production resources across AWS and Azure are missing mandatory encryption-at-rest. Additionally, audit logging is disabled in three AWS regions and two Azure subscriptions. The auditors have confirmed they will test these specific controls.',
      requirements: [
        'Inventory all resources lacking encryption and categorize by data sensitivity and regulatory impact',
        'Enable encryption at rest on all identified resources using KMS customer-managed keys',
        'Enable and verify audit logging in all affected regions and subscriptions',
        'Verify that enabling encryption does not break existing application functionality',
        'Prepare an evidence package with before-and-after encryption status, KMS key configuration and logging verification'
      ],
      priority: 'high',
      dueDayOffset: 7,
      expectedOutput: 'Complete encryption remediation with evidence, logging gap closure, application validation results and audit-ready evidence package.',
      skills: ['NIST SP 800-53', 'CIS Benchmarks', 'Cloud KMS', 'SOC 2 Compliance']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Priya Sharma',
      personaRole: 'Cloud Platform Lead',
      situation: 'The platform team wants to migrate a sensitive workload from on-premises to AWS but is concerned about meeting the organization\'s security requirements without slowing down the migration timeline.',
      openingMessage:
        'We have a critical workload that needs to move to AWS by end of quarter. The security team keeps adding requirements — encryption, VPC design, IAM review, logging — and we are running out of time. Can you help us figure out what is truly mandatory for launch versus what can be done post-migration?',
      expectedPoints: [
        'Separates security requirements into pre-deployment blockers and post-launch hardening items',
        'Identifies the minimum viable security controls required for any production workload (encryption, logging, IAM)',
        'Proposes a phased security implementation plan aligned with the migration timeline',
        'Documents risk acceptance for any deferred controls with clear ownership and deadlines'
      ]
    },
    {
      kind: 'team',
      personaName: 'Marcus Chen',
      personaRole: 'DevOps Engineer',
      situation: 'The DevOps team has been deploying cloud resources manually because policy-as-code slows down their pipeline. The security team needs to enforce guardrails without breaking developer velocity.',
      openingMessage:
        'We know we should be using Terraform and policies but the developers are frustrated with blocked deployments. Every time we add a new policy check, the pipeline breaks and we spend a day fixing it. How do we make this work without killing productivity?',
      expectedPoints: [
        'Acknowledges the real friction between security enforcement and developer experience',
        'Proposes a policy implementation roadmap: start with critical guardrails only, expand gradually',
        'Recommends clear, actionable error messages and self-service documentation for policy failures',
        'Suggests a feedback loop where developers can request policy exceptions through a streamlined process'
      ]
    },
    {
      kind: 'client',
      personaName: 'Lisa Park',
      personaRole: 'CISO, Northgate Healthcare',
      situation: 'The client is migrating from on-premises data centers to a multi-cloud environment and needs a cloud security strategy that satisfies HIPAA requirements while enabling clinical application teams to move quickly.',
      openingMessage:
        'We are moving our clinical systems to AWS and Azure over the next 18 months. HIPAA compliance is non-negotiable, but our clinical teams are already frustrated with the pace of security reviews. How do we build a cloud security program that keeps us compliant and keeps the business moving?',
      expectedPoints: [
        'Maps HIPAA technical safeguards to specific cloud-native controls across both providers',
        'Proposes automated compliance validation to reduce manual security review bottlenecks',
        'Recommends a cloud security operating model with clear roles between security, platform and application teams',
        'Addresses PHI-specific controls: encryption, access logging, BAAs with cloud providers and audit trail integrity'
      ]
    },
    {
      kind: 'client',
      personaName: 'David Okonkwo',
      personaRole: 'VP of Engineering, Meridian Fintech',
      situation: 'The client experienced a cloud misconfiguration that led to a data exposure incident and now needs to rebuild their cloud security posture from the ground up before an upcoming regulatory examination.',
      openingMessage:
        'We had a misconfigured database that was briefly exposed to the internet. No data was confirmed stolen but regulators are asking hard questions. We need to prove our cloud environment is secure and that we have processes to prevent this from happening again. Where do we start?',
      expectedPoints: [
        'Begins with incident root cause analysis and validates whether data was actually accessed',
        'Proposes a cloud security posture assessment against CIS Benchmarks as the baseline',
        'Recommends continuous compliance monitoring to provide ongoing evidence for regulators',
        'Addresses the regulatory response: what evidence to provide, how to demonstrate remediation and preventive measures'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'A production ECS container task fails to start after a new deployment. The application logs show the container cannot retrieve database credentials from AWS Secrets Manager. The IAM task role was not changed in the deployment, but the secret was rotated by the security team six hours ago.',
      requiredActions: [
        { action: 'Check the IAM task role permissions to confirm it has access to the specific secret ARN', good: true, note: 'Secret rotation can change the secret ARN or require IAM policy updates if the secret was recreated rather than updated in place.' },
        { action: 'Verify the secret exists in Secrets Manager and is accessible from the VPC where the task runs', good: true, note: 'Secrets Manager endpoints must be reachable from the container\'s VPC; network connectivity is a common failure after secret changes.' },
        { action: 'Check whether the secret was replaced with a new secret (new ARN) rather than rotated within the same ARN', good: true, note: 'Replacing a secret creates a new ARN. If the IAM policy references the old ARN, access will fail even if the policy is otherwise correct.' },
        { action: 'Restart the task multiple times hoping the connection resolves itself', good: false, note: 'Restarting without diagnosing the root cause wastes time and does not address the IAM or connectivity issue.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'The company is expanding into the EU market and the legal team requires that all customer data for EU residents be stored and processed exclusively within EU cloud regions, with strict access logging to meet GDPR Article 30 requirements.',
      requiredActions: [
        { action: 'Implement region-restriction policies using SCPs for AWS and Azure Policy to prevent resource creation outside EU regions', good: true, note: 'Policy-as-code enforcement ensures no EU data accidentally lands in non-EU regions, regardless of which team deploys resources.' },
        { action: 'Configure CloudTrail and Azure Activity Log with log file integrity validation for all EU accounts', good: true, note: 'GDPR Article 30 requires records of processing activities; comprehensive, tamper-evident audit logs satisfy this requirement.' },
        { action: 'Audit existing EU-region resources to confirm no customer data has been replicated or backed up to non-EU regions', good: true, note: 'Automated backups and replication can inadvertently move data across regional boundaries, violating residency requirements.' },
        { action: 'Assume the default region settings are compliant because the company has always used EU data centers', good: false, note: 'Default region settings can be overridden, and backups or disaster recovery configurations may replicate data to other regions without explicit configuration.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between IAM users, IAM roles and IAM identity federation in the cloud. When would you use each?',
      guidancePoints: [
        'IAM users have long-lived credentials and are appropriate for CI/CD systems or legacy integrations that cannot assume roles',
        'IAM roles provide temporary credentials through STS and are ideal for workloads, cross-account access and federated identities',
        'Identity federation delegates authentication to an external IdP and maps federated identities to cloud IAM roles, eliminating cloud-specific credentials',
        'Best practice: prefer roles and federation over users; eliminate long-lived access keys wherever possible'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'How would you design encryption for data at rest and in transit across a multi-cloud environment using AWS and Azure?',
      guidancePoints: [
        'Use cloud KMS (AWS KMS, Azure Key Vault) for key management with customer-managed keys for sensitive data',
        'Encrypt data at rest using service-native encryption (S3 SSE-KMS, Azure Storage Service Encryption) with explicit key configuration',
        'Enforce TLS 1.2+ for all data in transit using service-specific transport encryption settings',
        'Consider a key hierarchy: master key in one provider or a third-party HSM, with data encryption keys in each cloud KMS'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A developer reports that their Lambda function intermittently fails with "AccessDenied" errors when calling DynamoDB. The function worked yesterday. How do you troubleshoot this?',
      guidancePoints: [
        'Check if the IAM execution role policy changed or if the role was modified by another team or automated process',
        'Verify DynamoDB table-level permissions and resource-based policies have not been altered',
        'Check if the Lambda function was redeployed with a different execution role attached',
        'Examine CloudTrail for IAM and DynamoDB API calls around the time the failures started',
        'Look for SCP or permission boundary changes that might restrict the role\'s effective permissions'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Your security scanning tool detects that a container image in your ECR registry has 15 critical CVEs. The image is running in production. What is your response plan?',
      guidancePoints: [
        'Assess whether the CVEs are exploitable in the context of how the container actually runs (network exposure, user context, capabilities)',
        'Pull the image, rebuild it with updated base images and dependencies, and push a patched version',
        'Test the patched image in a staging environment to ensure the application functions correctly',
        'Deploy the patched image to production using a rolling update with rollback capability',
        'Implement image scanning in the CI/CD pipeline to catch vulnerabilities before deployment'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'The CFO proposes moving all production workloads to a single cloud provider to simplify operations and reduce costs. As the cloud security engineer, how do you evaluate and respond to this proposal?',
      guidancePoints: [
        'Acknowledge the cost and operational benefits of cloud consolidation',
        'Present the security trade-off: single-cloud concentration risk means one provider outage or compromise affects everything',
        'Evaluate whether the specific workload requirements actually benefit from multi-cloud or if single-cloud is sufficient',
        'Recommend a risk-based decision: mission-critical workloads may justify multi-cloud redundancy while non-critical workloads can consolidate',
        'Propose cost optimization within the current multi-cloud setup rather than eliminating it entirely'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you approach building a cloud security program from scratch for a startup that has already deployed significant infrastructure without security controls?',
      guidancePoints: [
        'Start with an assessment: inventory what exists, classify data sensitivity and identify the highest-risk exposures',
        'Prioritize quick wins: enable audit logging, enforce encryption defaults, eliminate public access to storage and databases',
        'Implement identity federation and least-privilege IAM to establish identity as the control plane',
        'Introduce policy-as-code gradually, starting with critical guardrails and expanding as the team matures',
        'Measure and communicate progress using metrics like CIS benchmark score, public exposure count and IAM policy tightness'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain to a non-technical executive why cloud misconfigurations are the leading cause of cloud breaches, not cloud provider vulnerabilities.',
      guidancePoints: [
        'Use the analogy of a secure building: the foundation and locks (provider) are solid, but leaving doors open (misconfiguration) lets anyone in',
        'Reference industry data: cloud misconfigurations account for the majority of cloud security incidents according to major breach reports',
        'Explain that the shared responsibility model means the customer controls configuration, access and data protection',
        'Connect to business impact: a single public S3 bucket can expose millions of records and trigger regulatory penalties',
        'Show that automated guardrails and monitoring are the solution, not moving back on-premises'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'You discover that the production Kubernetes cluster has pods running with root privileges and no network policies. How do you communicate this risk to the engineering leadership team?',
      guidancePoints: [
        'Frame the risk in terms of blast radius: root-privileged pods in a compromised cluster mean full node and potentially full cluster access',
        'Explain that missing network policies allow any pod to communicate with any other pod, enabling lateral movement without detection',
        'Quantify the exposure: list the sensitive workloads running in the cluster and what data they can access',
        'Provide a concrete remediation plan with timeline: implement PodSecurityStandards, add network policies and restrict service accounts',
        'Recommend a phased approach that does not disrupt running workloads while closing the highest-risk gaps first'
      ]
    }

  ]

}
