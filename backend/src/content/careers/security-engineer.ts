import type { CareerDef } from '../framework.js'

export const securityEngineer: CareerDef = {
  slug: 'security-engineer',
  name: 'Security Engineer',
  category: 'Security',
  order: 27,
  description:
    'Designs security architecture — identity, encryption, monitoring and automation that keeps organizations resilient.',
  difficulty: 'Advanced',
  pathSummary:
    'Security principles & infrastructure risk → Identity management & zero trust → Encryption, cloud security & secure SDLC → Monitoring, automation & incident engineering.',
  mainSkills: [
    'Security Architecture Design',
    'Identity & Access Management',
    'Encryption & Cryptographic Engineering',
    'Cloud Security & Zero Trust',
    'Security Monitoring & SIEM Engineering',
    'Threat Modeling & Risk Assessment',
    'Security Automation & Incident Engineering',
    'Compliance Frameworks & Governance'
  ],
  sourcePlatforms: [
    'NIST',
    'OWASP',
    'CISA',
    'Microsoft Security',
    'Cloud Security Documentation'
  ],
  companyName: 'IronGate Cyber Solutions',
  roleTitle: 'Security Engineer',

  chapters: [
    {
      slug: 'security-principles-infrastructure-risk',
      stage: 'Beginner',
      title: 'Security Principles & Infrastructure Risk',
      description: 'Foundational security concepts, threat modeling methodology and infrastructure risk assessment techniques every security engineer must master.',
      topics: [
        {
          slug: 'security-architecture-principles',
          title: 'Security Architecture Principles',
          minutes: 25,
          objectives: [
            'Define and apply defense-in-depth, least privilege and separation of duties in system design',
            'Explain how the CIA triad drives architectural trade-offs in real systems',
            'Map security design patterns to NIST SP 800-160 guidance on cyber-resilient systems'
          ],
          sections: [
            { heading: 'Defense-in-depth as a design philosophy', body: 'Defense-in-depth means layering controls so that no single failure compromises the system. A well-architected system places firewalls at the perimeter, micro-segmentation inside the network, application-level authentication, encrypted storage and endpoint protection — each layer independent of the others. When one layer fails, the next holds. The goal is not to prevent all attacks but to ensure that bypassing one control exposes the attacker to another.' },
            { heading: 'Least privilege and separation of duties', body: 'Least privilege restricts every account, service and process to the minimum permissions required for its function. Separation of duties ensures that no single individual can complete a critical transaction alone — the developer who writes code cannot deploy it to production, and the administrator who configures a firewall cannot approve the change request. Together, these principles eliminate both accidental misuse and deliberate abuse by limiting the blast radius of any compromised account.' },
            { heading: 'Security architecture patterns', body: 'Common architectural patterns encode these principles into repeatable designs: zero trust network architecture assumes every request is untrusted and verifies continuously; a bastion host model concentrates administrative access through a single hardened jump point; immutable infrastructure replaces servers rather than patching them, eliminating configuration drift. Understanding when to apply each pattern is the difference between ad-hoc security and systematic resilience.' }
          ],
          links: [
            { title: 'NIST SP 800-160 Vol. 2 — Cyber-Resilient Systems', url: 'https://csrc.nist.gov/publications/detail/sp/800-160/vol-2/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST guidance on engineering trustworthy, cyber-resilient systems using layered security design.' },
            { title: 'OWASP Software Assurance Maturity Model', url: 'https://owasp.org/www-project-samm/', sourceName: 'OWASP', resourceType: 'reference', relationship: 'OWASP SAMM provides a measurable framework for evaluating and improving software security practices.' },
            { title: 'Microsoft Security — Zero Trust Architecture', url: 'https://learn.microsoft.com/en-us/security/zero-trust/', sourceName: 'Microsoft Security', resourceType: 'guide', relationship: 'Microsoft reference for implementing zero trust principles across identity, devices, networks and applications.' }
          ],
          quiz: {
            prompt: 'A security architect places a web application firewall, input validation layer and parameterized database queries in front of user input. Which principle does this layered approach demonstrate?',
            options: [
              'Separation of duties',
              'Defense-in-depth',
              'Least privilege',
              'Separation of concerns'
            ],
            answerIndex: 1,
            explanation: 'Defense-in-depth applies multiple independent controls to the same attack surface. Each layer provides protection even if the others fail, creating redundant barriers against injection attacks.'
          }
        },
        {
          slug: 'threat-modeling-methodology',
          title: 'Threat Modeling Methodology',
          minutes: 30,
          objectives: [
            'Build a data flow diagram that accurately represents a system\'s trust boundaries and data paths',
            'Apply the STRIDE framework to identify threats against each component of the architecture',
            'Prioritize identified threats using risk scoring and map mitigations to architectural controls'
          ],
          sections: [
            { heading: 'Data flow diagrams as the foundation', body: 'Threat modeling starts with a data flow diagram that maps processes, data stores, data flows and trust boundaries. Every arrow that crosses a trust boundary is a potential attack surface. A DFD forces you to make the system explicit — you cannot secure what you cannot see. Start with a context diagram showing external actors, then decompose each process into its internal data flows.' },
            { heading: 'STRIDE threat classification', body: 'STRIDE categorizes threats by what property they violate: Spoofing (authentication), Tampering (integrity), Repudiation (non-repudiation), Information Disclosure (confidentiality), Denial of Service (availability) and Elevation of Privilege (authorization). Apply each category to every element in the DFD systematically. A database has no spoofing risk because it does not authenticate users, but it faces tampering, information disclosure and denial of service threats.' },
            { heading: 'Risk-based prioritization and mitigation', body: 'Not every threat deserves immediate mitigation. Use a risk matrix that combines likelihood (how easy is exploitation, how attractive is the target) with impact (what data or service is at stake). High-likelihood, high-impact threats get architectural mitigations — redesign the system. Medium risks get compensating controls — add monitoring. Low risks get accepted or deferred. Document the rationale so future reviewers understand why each decision was made.' }
          ],
          links: [
            { title: 'OWASP Threat Modeling Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'guide', relationship: 'OWASP quick reference for threat modeling process, STRIDE classification and risk-based prioritization.' },
            { title: 'NIST SP 800-154 — Guide to Data-Centric System Threat Modeling', url: 'https://csrc.nist.gov/publications/detail/sp/800-154/draft', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST guidance on systematic threat modeling using data-centric approaches.' },
            { title: 'CISA — Threat Modeling for Operational Technology', url: 'https://www.cisa.gov/topics/physical-security', sourceName: 'CISA', resourceType: 'guide', relationship: 'CISA resources on threat modeling methodology and critical infrastructure risk assessment.' }
          ],
          quiz: {
            prompt: 'During threat modeling a web application, you identify that an attacker could modify order amounts in transit between the browser and the server. Which STRIDE category does this threat fall under?',
            options: [
              'Spoofing',
              'Information Disclosure',
              'Tampering',
              'Elevation of Privilege'
            ],
            answerIndex: 2,
            explanation: 'Tampering violates integrity by modifying data without authorization. Modifying order amounts in transit is a classic integrity threat that requires transport-layer encryption and server-side validation.'
          }
        },
        {
          slug: 'infrastructure-risk-assessment',
          title: 'Infrastructure Risk Assessment',
          minutes: 30,
          objectives: [
            'Identify and catalog critical assets, their owners and their business value',
            'Evaluate threats and vulnerabilities against each asset to calculate residual risk',
            'Produce a risk register with prioritized treatment recommendations and ownership'
          ],
          sections: [
            { heading: 'Asset inventory and classification', body: 'You cannot protect what you do not know about. An infrastructure risk assessment starts with a complete asset inventory — servers, databases, APIs, certificates, credentials and data stores — classified by sensitivity and business criticality. Cloud environments compound this challenge because resources spin up and down dynamically. Automated discovery tools that scan cloud accounts, container registries and DNS zones keep the inventory current.' },
            { heading: 'Threat and vulnerability evaluation', body: 'For each asset, identify applicable threats — external attackers, insider threats, supply chain compromises, natural disasters — and map them to known vulnerabilities from scanning tools and configuration audits. A database containing customer PII faces different threats than a development staging server. The evaluation must consider both technical vulnerabilities and procedural weaknesses like unrevoked access tokens or missing audit logs.' },
            { heading: 'Risk quantification and treatment', body: 'Risk is the product of likelihood and impact. Quantify it in terms the business understands: dollars lost, hours of downtime or regulatory penalties. Risk treatment options include mitigation (add controls), transfer (insurance), avoidance (eliminate the activity) or acceptance (document the decision). Each treatment option must have an owner, a budget and a deadline — a risk register without ownership is just a spreadsheet.' }
          ],
          links: [
            { title: 'NIST SP 800-30 Rev. 1 — Guide for Conducting Risk Assessments', url: 'https://csrc.nist.gov/publications/detail/sp/800-30/rev-1/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST standard methodology for conducting risk assessments across information systems.' },
            { title: 'CISA — CPGs and Risk Assessment', url: 'https://www.cisa.gov/cpg', sourceName: 'CISA', resourceType: 'guide', relationship: 'CISA cross-sector cybersecurity performance goals mapped to risk-based security outcomes.' },
            { title: 'Cloud Security Documentation — Cloud Risk Assessment', url: 'https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-justice-risk-assessment/welcome.html', sourceName: 'Cloud Security Documentation', resourceType: 'guide', relationship: 'AWS prescriptive guidance on assessing and mitigating security risks in cloud environments.' }
          ],
          quiz: {
            prompt: 'An asset inventory reveals a legacy database containing customer payment data that was deployed two years ago and has never been scanned. What is the highest-priority first step?',
            options: [
              'Migrate the data to a new cloud database immediately',
              'Run a vulnerability scan and configuration audit against the database to establish its current risk posture',
              'Delete the database since it was not properly onboarded',
              'Add a firewall rule blocking all access to the database'
            ],
            answerIndex: 1,
            explanation: 'Before acting you must know the current state. A vulnerability scan and configuration audit establishes what risks exist so you can make informed decisions about mitigation, migration or retirement.'
          }
        }
      ]
    },
    {
      slug: 'identity-management-zero-trust',
      stage: 'Foundation',
      title: 'Identity Management & Zero Trust',
      description: 'Designing identity-centric security using authentication protocols, zero trust architecture and privilege management that eliminates implicit trust.',
      topics: [
        {
          slug: 'authentication-protocols',
          title: 'Authentication Protocols & Standards',
          minutes: 30,
          objectives: [
            'Explain how OAuth 2.0, OpenID Connect and SAML achieve delegated authorization and single sign-on',
            'Evaluate the security properties of different token formats including JWT structure and validation',
            'Design a passwordless authentication strategy using FIDO2 and WebAuthn'
          ],
          sections: [
            { heading: 'OAuth 2.0 and OpenID Connect', body: 'OAuth 2.0 delegates authorization without sharing credentials: the resource owner grants limited access to a client through an authorization server that issues access tokens. OpenID Connect layers authentication on top by adding an ID token that carries identity claims. Understanding the grant types — authorization code with PKCE for SPAs, client credentials for machine-to-machine, device code for IoT — is essential for choosing the right flow for each integration.' },
            { heading: 'JWT structure and validation', body: 'JSON Web Tokens carry claims in a signed (and optionally encrypted) payload. The header specifies the algorithm, the payload contains claims like sub, iss, exp and aud, and the signature proves integrity. Common vulnerabilities include algorithm confusion attacks (none algorithm), accepting tokens from untrusted issuers and failing to validate expiration. Every JWT consumer must verify the signature, check the issuer and audience, validate the expiration and reject tokens with unexpected claims.' },
            { heading: 'Passwordless authentication with FIDO2', body: 'FIDO2 replaces passwords with public-key cryptography: the user\'s device holds a private key and the server stores the corresponding public key. The WebAuthn API lets browsers and mobile devices authenticate using biometrics or hardware keys without transmitting secrets. This eliminates phishing, credential stuffing and password reuse entirely because there is no shared secret to steal. Deployment requires a FIDO2 server and device enrollment workflow.' }
          ],
          links: [
            { title: 'OWASP Authentication Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'guide', relationship: 'OWASP comprehensive guidance on authentication design, session management and password storage.' },
            { title: 'Microsoft Security — Identity Security', url: 'https://learn.microsoft.com/en-us/azure/active-directory/develop/', sourceName: 'Microsoft Security', resourceType: 'documentation', relationship: 'Microsoft identity platform documentation covering OAuth 2.0, OpenID Connect and app registration.' },
            { title: 'NIST SP 800-63B — Digital Identity Guidelines', url: 'https://csrc.nist.gov/publications/detail/sp/800-63/b/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST authentication and lifecycle management guidelines including passwordless and MFA requirements.' }
          ],
          quiz: {
            prompt: 'An attacker intercepts a JWT and changes the "role" claim from "user" to "admin" before forwarding it to the server. What validation step prevents this attack?',
            options: [
              'Checking the token\'s expiration claim',
              'Verifying the token\'s signature against the issuer\'s public key',
              'Validating the token\'s audience claim',
              'Checking the token\'s issued-at timestamp'
            ],
            answerIndex: 1,
            explanation: 'The JWT signature covers the header and payload. Any modification to the payload invalidates the signature, so verifying the signature against the expected public key rejects tampered tokens.'
          }
        },
        {
          slug: 'zero-trust-architecture',
          title: 'Zero Trust Architecture',
          minutes: 30,
          objectives: [
            'Design a zero trust architecture that verifies every request regardless of network location',
            'Implement micro-segmentation to contain lateral movement across cloud and on-premises environments',
            'Define and enforce adaptive access policies that incorporate device posture and risk signals'
          ],
          sections: [
            { heading: 'The zero trust model', body: 'Zero trust eliminates the concept of a trusted internal network. Every access request is verified based on identity, device health, location, behavior and resource sensitivity — every time. The architecture shifts from perimeter-centric to identity-centric: the network location of a request carries no inherent trust. A user on the corporate Wi-Fi gets the same verification as one on a hotel network.' },
            { heading: 'Micro-segmentation and software-defined boundaries', body: 'Micro-segmentation divides the network into isolated zones where each workload is protected by its own access policy. Software-defined networking creates dynamic per-application perimeters that follow workloads across cloud, data center and edge. Even if an attacker breaches one segment, the micro-segmentation boundary forces them to authenticate again before moving laterally. This turns a flat network into a series of individually defended cells.' },
            { heading: 'Adaptive and context-aware access', body: 'Static access policies fail because context changes. Adaptive access policies adjust permissions based on real-time signals: a device missing security patches gets read-only access; a login from a new country triggers step-up authentication; a request from an unmanaged device is restricted to a browser-isolated session. Implementing this requires integrating identity providers, device management platforms and threat intelligence into a single policy engine that evaluates risk in milliseconds.' }
          ],
          links: [
            { title: 'NIST SP 800-207 — Zero Trust Architecture', url: 'https://csrc.nist.gov/publications/detail/sp/800-207/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'The foundational NIST publication defining zero trust principles, architecture components and deployment models.' },
            { title: 'Microsoft Security — Zero Trust Deployment Guides', url: 'https://learn.microsoft.com/en-us/security/zero-trust/deploy/overview', sourceName: 'Microsoft Security', resourceType: 'guide', relationship: 'Microsoft step-by-step deployment guides for implementing zero trust across identity, devices, networks and applications.' },
            { title: 'Cloud Security Documentation — Zero Trust in the Cloud', url: 'https://docs.aws.amazon.com/prescriptive-guidance/latest/zero-trust-architecture/welcome.html', sourceName: 'Cloud Security Documentation', resourceType: 'guide', relationship: 'AWS prescriptive guidance on implementing zero trust architecture within cloud environments.' }
          ],
          quiz: {
            prompt: 'In a zero trust architecture, a user authenticates from a corporate laptop and is granted access to an application. The same user later connects from a personal tablet. What should the policy engine do?',
            options: [
              'Grant the same access because the user identity is the same',
              'Deny all access because the device is unmanaged',
              'Evaluate the device posture and adjust access permissions accordingly',
              'Ignore the device type since zero trust only evaluates identity'
            ],
            answerIndex: 2,
            explanation: 'Zero trust evaluates multiple signals including device posture. An unmanaged tablet would receive different access permissions than a managed corporate laptop, reflecting the higher risk of the unmanaged device.'
          }
        },
        {
          slug: 'privilege-access-management',
          title: 'Privileged Access Management',
          minutes: 25,
          objectives: [
            'Design a PAM solution that enforces just-in-time access and session recording for privileged accounts',
            'Implement role-based and attribute-based access control models with continuous verification',
            'Establish credential lifecycle management including rotation, vaulting and emergency break-glass procedures'
          ],
          sections: [
            { heading: 'Just-in-time privileged access', body: 'Standing privileged access is a persistent attack surface. Just-in-time (JIT) access grants elevated permissions only when needed, for a defined duration, with approval and logging. A database administrator who needs root access for a maintenance window requests it through a workflow that approvals, time-boxes the session and records every command. When the window expires, access is automatically revoked — no orphaned admin sessions lingering in the environment.' },
            { heading: 'RBAC and ABAC in practice', body: 'Role-based access control assigns permissions to roles and users to roles, simplifying management at scale. Attribute-based access control evaluates policies against attributes of the user, resource, action and environment — enabling fine-grained decisions like "allow read access to documents tagged CONFIDENTIAL only from managed devices during business hours." Most enterprise environments use RBAC for broad permission categories with ABAC policies layered on top for conditional access.' },
            { heading: 'Credential lifecycle management', body: 'Privileged credentials — service account passwords, API keys, database connection strings — must be vaulted, rotated automatically and never hardcoded in source code or configuration files. Break-glass accounts provide emergency access when normal authentication fails; they are stored in a sealed vault with dual-person authorization and full session recording. Every credential has a lifecycle: creation, distribution, rotation, suspension and destruction — each step logged and auditable.' }
          ],
          links: [
            { title: 'NIST SP 800-53 Rev. 5 — Access Control Family', url: 'https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST access control requirements covering identification, authentication, authorization and audit controls.' },
            { title: 'Microsoft Security — Privileged Identity Management', url: 'https://learn.microsoft.com/en-us/entra/id-privileged-identity-management/overview', sourceName: 'Microsoft Security', resourceType: 'documentation', relationship: 'Microsoft Entra PIM documentation for just-in-time access, access reviews and approval workflows.' },
            { title: 'OWASP — Credential Management Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Credential_Management_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'guide', relationship: 'OWASP guidance on secure credential storage, rotation and lifecycle management.' }
          ],
          quiz: {
            prompt: 'A developer hardcodes a database password in a configuration file that gets committed to a public GitHub repository. Which PAM control would have prevented this incident?',
            options: [
              'Multi-factor authentication for developer accounts',
              'An automated secret scanning tool that detects credentials in source code before they are committed',
              'Role-based access control on the database',
              'Quarterly access reviews'
            ],
            answerIndex: 1,
            explanation: 'Automated secret scanning in the CI pipeline or pre-commit hooks detects hardcoded credentials before they reach the repository. This is a preventive control that catches the mistake at the point of origin.'
          }
        }
      ]
    },
    {
      slug: 'encryption-cloud-security-secure-sdlc',
      stage: 'Intermediate',
      title: 'Encryption, Cloud Security & Secure SDLC',
      description: 'Applying cryptographic engineering, designing secure cloud architectures and embedding security into the software development lifecycle.',
      topics: [
        {
          slug: 'cryptographic-engineering',
          title: 'Cryptographic Engineering & Key Management',
          minutes: 30,
          objectives: [
            'Select appropriate encryption algorithms and modes for data at rest, in transit and in use',
            'Design a key management lifecycle covering generation, storage, rotation and revocation',
            'Implement envelope encryption and hardware security module integration for sensitive data'
          ],
          sections: [
            { heading: 'Algorithm selection and modes of operation', body: 'AES-256-GCM is the standard for symmetric encryption: it provides authenticated encryption with associated data, detecting both decryption and tampering. RSA-2048 or ECDSA with P-256 handle asymmetric operations like key exchange and digital signatures. ChaCha20-Poly1305 is preferred on devices without AES hardware acceleration. The critical mistake is inventing your own cryptography — use well-audited libraries like libsodium or the platform\'s native crypto APIs.' },
            { heading: 'Key management lifecycle', body: 'A key is only as secure as its management lifecycle. Generate keys using cryptographically secure random number generators — never predictable seeds. Store keys in hardware security modules or cloud KMS with access controls stricter than the data they protect. Rotate keys on a defined schedule (annually at minimum) and immediately upon suspected compromise. Revocation must be atomic: the old key stops working the moment the new key is active, with zero window where decryption fails.' },
            { heading: 'Envelope encryption and HSM integration', body: 'Envelope encryption uses a data encryption key (DEK) to encrypt the data and a key encryption key (KEK) stored in an HSM or KMS to encrypt the DEK. This separates key management from data processing — the application never sees the master key. Cloud KMS services (AWS KMS, Azure Key Vault, Google Cloud KMS) implement this pattern natively. For on-premises, FIPS 140-2 Level 3 HSMs provide tamper-resistant key storage with audit trails.' }
          ],
          links: [
            { title: 'NIST SP 800-57 Part 1 Rev. 5 — Key Management', url: 'https://csrc.nist.gov/publications/detail/sp/800-57/part-1/rev-5/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST key management recommendations covering algorithms, key lengths, lifecycle and revocation.' },
            { title: 'OWASP — Cryptographic Failures Prevention', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'guide', relationship: 'OWASP guidance on preventing cryptographic storage failures including key management best practices.' },
            { title: 'Cloud Security Documentation — KMS Best Practices', url: 'https://docs.aws.amazon.com/kms/latest/developerguide/overview.html', sourceName: 'Cloud Security Documentation', resourceType: 'documentation', relationship: 'AWS KMS documentation covering key management, encryption patterns and HSM integration.' }
          ],
          quiz: {
            prompt: 'A developer uses AES-CBC mode to encrypt database records. An attacker modifies one ciphertext block, causing the decrypted plaintext of that block and the next block to become garbage. Which mode would have detected this tampering?',
            options: [
              'AES-ECB',
              'AES-CTR',
              'AES-GCM',
              'XOR cipher'
            ],
            answerIndex: 2,
            explanation: 'AES-GCM is an authenticated encryption mode that includes an authentication tag. Any modification to the ciphertext causes authentication to fail, rejecting the tampered data rather than producing corrupted plaintext.'
          }
        },
        {
          slug: 'cloud-security-architecture',
          title: 'Cloud Security Architecture',
          minutes: 30,
          objectives: [
            'Design a cloud security architecture using the shared responsibility model across IaaS, PaaS and SaaS',
            'Implement cloud-native security controls including VPC design, IAM policies and encryption at scale',
            'Evaluate container and serverless security challenges and apply mitigations specific to each compute model'
          ],
          sections: [
            { heading: 'The shared responsibility model', body: 'Cloud security is shared: the provider secures the infrastructure (physical, hypervisor, network), the customer secures what they put on it (data, IAM, application configuration). The boundary shifts depending on the service model. In IaaS the customer manages the OS and everything above; in PaaS the provider manages the runtime but the customer controls the application and data; in SaaS the provider manages nearly everything but the customer is responsible for identity, data classification and access policies.' },
            { heading: 'Cloud-native security controls', body: 'VPC design places workloads in private subnets with NAT gateways for outbound access and load balancers for inbound traffic. Security groups act as stateful firewalls at the instance level; network ACLs provide subnet-level controls. IAM policies follow least privilege with resource-level permissions, condition keys for context-aware access and regular access reviews. Cloud security posture management tools continuously scan for misconfigurations like public S3 buckets, open security groups and unencrypted storage.' },
            { heading: 'Container and serverless security', body: 'Containers share the host kernel, so container escape is the critical risk — use minimal base images, run as non-root, apply seccomp and AppArmor profiles and scan images for CVEs in the CI pipeline. Serverless functions shift the attack surface to event triggers, IAM roles and dependency vulnerabilities. A function with an overly permissive execution role can access every resource in the account. Scan function dependencies, restrict execution roles to the minimum required permissions and validate all event inputs.' }
          ],
          links: [
            { title: 'Cloud Security Documentation — Shared Responsibility Model', url: 'https://aws.amazon.com/compliance/shared-responsibility-model/', sourceName: 'Cloud Security Documentation', resourceType: 'guide', relationship: 'AWS explanation of shared responsibility boundaries across IaaS, PaaS and SaaS.' },
            { title: 'OWASP — Cloud Security Verification Standard', url: 'https://owasp.org/www-project-cloud-security-verification-standard/', sourceName: 'OWASP', resourceType: 'reference', relationship: 'OWASP cloud security verification standard covering storage, networking, compute and data protection.' },
            { title: 'Microsoft Security — Azure Security Best Practices', url: 'https://learn.microsoft.com/en-us/azure/security/fundamentals/best-practices-and-patterns', sourceName: 'Microsoft Security', resourceType: 'guide', relationship: 'Microsoft Azure security best practices and patterns for identity, networking and data protection.' }
          ],
          quiz: {
            prompt: 'A company deploys a containerized microservice on Kubernetes in a cloud IaaS environment. According to the shared responsibility model, who is responsible for patching the container host OS?',
            options: [
              'The cloud provider, because it manages all infrastructure',
              'The customer, because IaaS responsibilities extend to the operating system layer',
              'The Kubernetes vendor, because they maintain the orchestration platform',
              'Nobody, because containers are isolated by design'
            ],
            answerIndex: 1,
            explanation: 'In IaaS the customer is responsible for the OS and everything above it. The cloud provider manages physical hardware and the hypervisor, but the customer must patch the host OS that runs the containers.'
          }
        },
        {
          slug: 'secure-sdlc-practices',
          title: 'Secure SDLC & DevSecOps',
          minutes: 25,
          objectives: [
            'Integrate security gates into each phase of the software development lifecycle',
            'Implement automated security testing including SAST, DAST, SCA and secret scanning in CI/CD pipelines',
            'Design a secure code review process that catches architectural and design-level flaws'
          ],
          sections: [
            { heading: 'Security across the SDLC', body: 'Security must be embedded from design through deployment, not bolted on after release. In the design phase, threat modeling identifies architectural risks before code is written. During development, secure coding standards and pre-commit hooks catch common vulnerability patterns. In build, SAST and dependency scanning find issues early. In deployment, infrastructure-as-code scanning catches misconfigurations. In production, runtime protection and monitoring catch what static analysis missed.' },
            { heading: 'Automated security testing in CI/CD', body: 'Static application security testing analyzes source code for vulnerability patterns like injection, buffer overflows and hardcoded secrets without running the application. Software composition analysis scans third-party dependencies for known CVEs. Dynamic application security testing probes running applications for vulnerabilities through automated fuzzing. Secret scanning detects API keys and credentials in code and configuration. These tools run in parallel in the CI pipeline and fail the build on high-severity findings.' },
            { heading: 'Secure code review methodology', body: 'Automated tools catch approximately 30-50% of vulnerabilities; the rest require human review. A structured code review focuses on authentication and authorization logic, cryptographic usage, input validation and error handling. Architecture-level review examines trust boundaries, data flows and privilege escalation paths that automated tools cannot reason about. Pairing developers with security reviewers builds organizational knowledge and reduces review backlogs over time.' }
          ],
          links: [
            { title: 'OWASP Software Assurance Maturity Model', url: 'https://owasp.org/www-project-samm/', sourceName: 'OWASP', resourceType: 'reference', relationship: 'OWASP SAMM framework for measuring and improving secure software development practices.' },
            { title: 'NIST SP 800-218 — Secure Software Development Framework', url: 'https://csrc.nist.gov/publications/detail/sp/800-218/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST secure software development framework covering design, development, deployment and maintenance practices.' },
            { title: 'Microsoft Security — DevSecOps Practices', url: 'https://learn.microsoft.com/en-us/azure/devops/devsecops/', sourceName: 'Microsoft Security', resourceType: 'guide', relationship: 'Microsoft DevSecOps reference architecture integrating security into Azure DevOps pipelines.' }
          ],
          quiz: {
            prompt: 'A developer adds a new third-party library to a Node.js project. The library has a known critical vulnerability published three days ago. Which automated CI/CD security control catches this before deployment?',
            options: [
              'Static application security testing on the project source code',
              'Software composition analysis scanning the dependency tree for known CVEs',
              'Dynamic application security testing against the running application',
              'Manual code review'
            ],
            answerIndex: 1,
            explanation: 'Software composition analysis specifically scans third-party dependencies against vulnerability databases like the NVD. SAST analyzes your own code; DAST tests the running application; SCA identifies vulnerable dependencies.'
          }
        }
      ]
    },
    {
      slug: 'monitoring-automation-incident-engineering',
      stage: 'Advanced',
      title: 'Monitoring, Automation & Incident Engineering',
      description: 'Building detection systems, automating security operations and engineering incident response capabilities that scale with the organization.',
      topics: [
        {
          slug: 'detection-engineering',
          title: 'Detection Engineering & SIEM Architecture',
          minutes: 30,
          objectives: [
            'Design a SIEM architecture that scales from log ingestion through correlation to automated response',
            'Write high-fidelity detection rules that map to MITRE ATT&CK with minimal false positives',
            'Build a detection-as-code pipeline that version-controls rules and validates them against attack simulations'
          ],
          sections: [
            { heading: 'SIEM architecture at scale', body: 'A production SIEM architecture handles millions of events per second through a tiered pipeline: collection agents at the source, streaming processors for normalization and enrichment, a storage tier optimized for time-series queries and a correlation engine for real-time alerting. Hot data lives in fast storage for seven days, warm data for 90 days and cold data in cost-optimized archives for compliance retention. The architecture must support both streaming analytics for real-time alerts and batch analytics for historical investigation.' },
            { heading: 'Detection rule design methodology', body: 'Detection engineering starts with a hypothesis: "an attacker would do X to achieve Y, and the evidence would appear in log source Z." Each rule maps to a MITRE ATT&CK technique, has a defined data source, and includes a severity score. Tune rules by analyzing true-positive rates against historical alerts and adversary simulation results. A rule that fires 100 times per day with 1 true positive is noise; a rule that fires once per month with a true positive every time is gold.' },
            { heading: 'Detection-as-code', body: 'Treating detection rules as code means version control, peer review, automated testing and CI/CD deployment. Store rules in a repository, validate them against a dataset of known attacks and known-benign traffic in a test pipeline, and deploy through infrastructure-as-code tooling. MITRE ATT&CK coverage maps show which techniques have detection rules and which are blind spots. Run regular adversary simulations using tools like Atomic Red Team to validate that detections fire as expected.' }
          ],
          links: [
            { title: 'MITRE ATT&CK — Detection Rule Repository', url: 'https://attack.mitre.org/detections/', sourceName: 'NIST', resourceType: 'reference', relationship: 'Community-contributed detection rules mapped to specific ATT&CK techniques.' },
            { title: 'Microsoft Security — Sentinel Detection Rules', url: 'https://learn.microsoft.com/en-us/azure/sentinel/detect-threats-custom', sourceName: 'Microsoft Security', resourceType: 'documentation', relationship: 'Microsoft Sentinel documentation for authoring custom scheduled and near-real-time detection rules.' },
            { title: 'OWASP — Security Logging and Monitoring Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'guide', relationship: 'OWASP guidance on what to log, how to protect logs and how to build effective monitoring.' }
          ],
          quiz: {
            prompt: 'A detection rule fires 500 times per day but analysts find only 2 are true positives. The remaining 498 are caused by a legitimate administrative tool. What is the best course of action?',
            options: [
              'Delete the rule entirely because it generates too many false positives',
              'Tune the rule by adding exclusion logic for the known administrative tool and add a second rule that specifically targets the attack vector',
              'Increase the alert severity so analysts prioritize it',
              'Send all alerts to a separate queue for weekly review'
            ],
            answerIndex: 1,
            explanation: 'Tuning preserves detection of the real attack while reducing noise. Excluding the known-benign activity and adding a more specific rule focuses the detection on the actual threat without losing coverage.'
          }
        },
        {
          slug: 'security-automation',
          title: 'Security Automation & Orchestration',
          minutes: 30,
          objectives: [
            'Design a security automation platform that orchestrates responses across multiple security tools',
            'Implement automated playbooks for common incident types including alert triage and containment',
            'Measure automation effectiveness using metrics like mean time to respond and false positive reduction'
          ],
          sections: [
            { heading: 'Security orchestration platforms', body: 'Security orchestration and automated response (SOAR) platforms connect disparate security tools through APIs and execute automated workflows called playbooks. A single playbook might pull threat intelligence, enrich alert context, check asset criticality, create a ticket and assign it to the right team — all within seconds. The platform must support bidirectional integration: ingesting alerts from SIEM and EDR, taking action on firewalls and identity providers, and updating ticketing systems.' },
            { heading: 'Designing automated playbooks', body: 'Automated playbooks should handle high-volume, low-complexity decisions that consume analyst time. Alert enrichment is the first candidate: pulling asset context, user information and threat intelligence automatically. Containment playbooks can isolate a compromised endpoint, disable a compromised account or block a malicious IP — actions that are reversible and low-risk. Decision playbooks triage alerts by severity, asset criticality and threat intelligence to route them to the right team with pre-populated context.' },
            { heading: 'Measuring automation ROI', body: 'Automation value is measured in time saved, accuracy improved and consistency achieved. Track mean time to detect (MTTD), mean time to respond (MTTR), false positive rate, analyst time per alert and playbooks executed. A successful automation program should reduce MTTR for common alert types by 80% or more, free analyst time for complex investigations and eliminate human error in repetitive tasks. Review playbook performance quarterly and retire playbooks that no longer provide value.' }
          ],
          links: [
            { title: 'NIST SP 800-154 Rev. 1 — Automated Indicator Sharing', url: 'https://csrc.nist.gov/publications/detail/sp/800-154/rev-1/draft', sourceName: 'NIST', resourceType: 'reference', relationship: 'NIST guidance on automated threat indicator sharing and machine-readable security intelligence.' },
            { title: 'Microsoft Security — Logic Apps for Security Automation', url: 'https://learn.microsoft.com/en-us/azure/logic-apps/', sourceName: 'Microsoft Security', resourceType: 'documentation', relationship: 'Microsoft Logic Apps documentation for building security automation workflows connected to Azure services.' },
            { title: 'CISA — Automated Indicator Sharing Program', url: 'https://www.cisa.gov/cyber-indicator-sharing', sourceName: 'CISA', resourceType: 'guide', relationship: 'CISA automated indicator sharing program for real-time exchange of cyber threat indicators.' }
          ],
          quiz: {
            prompt: 'A SOAR playbook automatically isolates an endpoint when the EDR reports malware detection. During a routine software deployment, the EDR incorrectly flags the installer as malware and the playbook isolates 200 workstations. What went wrong?',
            options: [
              'The SOAR platform is defective and should be replaced',
              'The playbook lacks a validation step to confirm true positives before executing high-impact containment actions',
              'The EDR should never report malware detections to the SOAR platform',
              'Endpoint isolation should never be automated'
            ],
            answerIndex: 1,
            explanation: 'High-impact actions like endpoint isolation need a validation or approval step. A well-designed playbook checks asset criticality, analyst approval or corroborating evidence before executing containment to prevent false-positive cascades.'
          }
        },
        {
          slug: 'incident-response-engineering',
          title: 'Incident Response Engineering',
          minutes: 30,
          objectives: [
            'Design and maintain incident response runbooks that scale across incident types and severity levels',
            'Build a threat hunting program that proactively identifies threats missed by automated detection',
            'Engineer forensic tooling and evidence pipelines that maintain chain of custody for legal proceedings'
          ],
          sections: [
            { heading: 'Runbook engineering', body: 'Incident response runbooks encode tribal knowledge into repeatable, executable procedures. Each runbook specifies the trigger condition, initial triage steps, containment actions by incident type, eradication procedures, recovery steps and post-incident reporting requirements. Runbooks must be tested regularly through tabletop exercises and purple-team engagements, and updated whenever the environment or threat landscape changes. Version control runbooks alongside detection rules so changes are auditable.' },
            { heading: 'Proactive threat hunting', body: 'Threat hunting assumes the automated detection is not enough — adversaries evade rules, and new techniques have no rules yet. Hunters form hypotheses based on threat intelligence ("this actor uses PowerShell for lateral movement"), query data sources for evidence and iterate until they confirm or rule out the hypothesis. Effective hunting requires a data lake of rich telemetry, hypothesis-driven methodology and analysts who understand both the attacker\'s toolkit and the organization\'s normal behavior.' },
            { heading: 'Forensic tooling and evidence pipelines', body: 'Incident response generates evidence that may be needed in legal proceedings. Forensic evidence must maintain chain of custody: who collected it, when, from where, how it was stored and who accessed it. Build evidence pipelines that automatically hash collected data, log access and store evidence in tamper-evident repositories. Endpoint detection agents, network packet captures and cloud audit logs each have different collection and preservation requirements that must be documented and practiced.' }
          ],
          links: [
            { title: 'NIST SP 800-61 Rev. 2 — Computer Security Incident Handling Guide', url: 'https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final', sourceName: 'NIST', resourceType: 'reference', relationship: 'The foundational NIST guide for building incident response programs, runbooks and capabilities.' },
            { title: 'MITRE ATT&CK — Threat Hunting Resources', url: 'https://attack.mitre.org/resources/using-attack/', sourceName: 'OWASP', resourceType: 'guide', relationship: 'MITRE guidance on using ATT&CK for threat hunting and detection gap analysis.' },
            { title: 'CISA — Incident Response Playbooks', url: 'https://www.cisa.gov/resources-tools/services/incident-response-playbooks', sourceName: 'CISA', resourceType: 'reference', relationship: 'CISA incident response playbooks for specific attack scenarios aligned to NIST IR guidance.' }
          ],
          quiz: {
            prompt: 'A threat hunter hypothesizes that an adversary is using scheduled tasks for persistence. They query Windows Event ID 4698 (task creation) across all endpoints and find 15 tasks created in the last week that do not match any known administrative automation. What is the most appropriate next step?',
            options: [
              'Delete all 15 scheduled tasks immediately',
              'Investigate each task: check the creator account, the action it performs, the binary it executes and whether the creator account has created tasks before',
              'Ignore the findings because scheduled tasks are normal system behavior',
              'Disable all scheduled task functionality across the environment'
            ],
            answerIndex: 1,
            explanation: 'Finding anomalies is only the first step. Investigating each task to determine whether it is malicious, benign-but-unusual or a true positive is the core of threat hunting methodology.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Security Architecture Design & Incident Response',
    coverage: [
      'Security Architecture & Threat Modeling',
      'Identity & Access Management Design',
      'Encryption & Key Management',
      'Detection Engineering & SIEM Architecture',
      'Incident Response & Forensic Evidence Handling'
    ],
    brief:
      'You are the lead security engineer at IronGate Cyber Solutions tasked with securing a new cloud-hosted financial services platform. Design the security architecture, implement core identity and encryption controls, build detection rules for the expected threat profile, and respond to a simulated breach during the deployment phase.',
    requirements: [
      'Produce a threat model with data flow diagrams covering the platform\'s primary trust boundaries',
      'Design a zero trust access architecture with identity, device and network verification layers',
      'Implement envelope encryption for sensitive data with a key management lifecycle',
      'Write five detection rules mapped to MITRE ATT&CK techniques relevant to financial services threats',
      'Build a detection-as-code pipeline that validates rules against a simulated attack dataset',
      'Create incident response runbooks for the top three most likely incident types identified in the threat model',
      'Respond to a simulated breach scenario: investigate, contain, eradicate and produce a post-incident report'
    ],
    expectedOutput:
      'A complete security engineering package: threat model, architecture diagrams, encryption implementation, detection rule suite with validation results, IR runbooks and a post-incident report from the simulated breach.',
    rubric: [
      { skill: 'Threat Modeling & Architecture', weight: 20, criteria: 'Threat model is comprehensive with accurate DFDs, complete STRIDE analysis and mitigations mapped to each threat' },
      { skill: 'Identity & Zero Trust Design', weight: 20, criteria: 'Zero trust architecture correctly implements identity verification, micro-segmentation and adaptive access policies' },
      { skill: 'Cryptographic Engineering', weight: 15, criteria: 'Encryption implementation uses appropriate algorithms, envelope encryption pattern and a documented key management lifecycle' },
      { skill: 'Detection Engineering', weight: 25, criteria: 'Detection rules are high-fidelity, correctly mapped to ATT&CK, validated against simulated data and integrated into a CI/CD pipeline' },
      { skill: 'Incident Response', weight: 20, criteria: 'Runbooks are actionable, the simulated breach response is methodical and the post-incident report is thorough with root cause analysis and hardening recommendations' }
    ],
    passScore: 72
  },

  assignments: [
    {
      title: 'Cloud Security Architecture Design',
      stage: 'Foundation',
      objective: 'Design a complete security architecture for a multi-tier cloud application using zero trust principles, micro-segmentation and cloud-native security controls.',
      requirements: [
        'Create a threat model with data flow diagrams for a three-tier web application in a public cloud',
        'Design VPC and subnet architecture with security groups, NACLs and private endpoints',
        'Implement an IAM policy framework following least privilege with resource-level permissions',
        'Design a secrets management strategy using cloud KMS and a vault solution',
        'Document the shared responsibility boundaries between your organization and the cloud provider'
      ],
      skillsEvaluated: ['Security Architecture Design', 'Cloud Security', 'Zero Trust', 'IAM Policy Design'],
      dueDays: 21,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the complete architecture design including threat model, network diagrams, IAM policies and secrets management plan.',
        textLabel: 'Cloud security architecture design document',
        minTextLength: 1200,
        linkLabels: ['Architecture diagrams and policy files']
      }
    },
    {
      title: 'Detection Rule Suite with Validation',
      stage: 'Intermediate',
      objective: 'Build and validate a suite of SIEM detection rules covering a specific threat profile using a detection-as-code methodology.',
      requirements: [
        'Select a threat profile (e.g., ransomware, credential theft, data exfiltration) and identify five relevant ATT&CK techniques',
        'Write detection rules in a SIEM query language (KQL, Splunk SPL or equivalent)',
        'Create a test dataset with labeled true positives and benign traffic samples',
        'Validate each rule against the test dataset and document true-positive and false-positive rates',
        'Implement the rules in a version-controlled repository with automated testing in a CI pipeline'
      ],
      skillsEvaluated: ['Detection Engineering', 'SIEM Architecture', 'MITRE ATT&CK Mapping', 'DevSecOps'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the detection rule repository, validation results with performance metrics, ATT&CK coverage map and documentation for each rule.',
        textLabel: 'Detection engineering report with validation results',
        minTextLength: 1200,
        linkLabels: ['Detection rules repository', 'Validation dataset and results']
      }
    },
    {
      title: 'Incident Response Runbook and Tabletop Execution',
      stage: 'Advanced',
      objective: 'Design incident response runbooks for three distinct incident types, then execute a tabletop exercise to validate them and produce an improvement plan.',
      requirements: [
        'Design detailed runbooks for a ransomware incident, a cloud credential compromise and a data exfiltration event',
        'Each runbook must include trigger conditions, triage steps, containment actions, eradication procedures and recovery steps',
        'Create a tabletop scenario with escalating injects that tests all three runbooks',
        'Facilitate a tabletop exercise with defined participant roles and record observations',
        'Produce a post-exercise report with findings, gaps identified and a prioritized improvement plan'
      ],
      skillsEvaluated: ['Incident Response', 'Security Automation', 'Communication', 'Process Improvement'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the three runbooks, the tabletop scenario package, facilitator notes and the post-exercise improvement report.',
        textLabel: 'IR runbooks and tabletop exercise package',
        minTextLength: 1500,
        linkLabels: ['Runbooks and exercise materials']
      }
    }
  ],

  simTasks: [
    {
      title: 'Cloud IAM misconfiguration detected in production',
      context: 'A cloud security posture management alert flags that a production IAM role in your AWS account has been modified to include s3:* and iam:* permissions. The role was originally scoped to read-only access on a single S3 bucket. The modification occurred 30 minutes ago via a console login from an IP address not previously associated with your organization.',
      requirements: [
        'Identify the IAM role that was modified and document the original versus current permissions',
        'Determine who made the change by reviewing CloudTrail logs for the console session',
        'Revoke the compromised session and revert the IAM role to its original policy',
        'Check for any resources created or accessed using the escalated permissions',
        'Implement a preventive control to detect and alert on future IAM policy changes in real time'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'IAM role reverted, attacker session revoked, scope of impact documented, CloudTrail analysis completed and preventive monitoring rule deployed.',
      skills: ['Cloud Security', 'IAM Management', 'CloudTrail Analysis', 'Security Automation']
    },
    {
      title: 'Anomalous data transfer detected from production database',
      context: 'Network monitoring has detected a sustained 2GB outbound data transfer from a production database server to an external IP address that is not on any approved destination list. The transfer started at 2 AM and has been running for four hours. The database contains customer records including names, email addresses and hashed passwords.',
      requirements: [
        'Identify the process or connection responsible for the outbound transfer on the database server',
        'Determine whether the data was encrypted in transit and whether the external IP is known malicious',
        'Block the external IP at the network firewall and terminate the unauthorized connection',
        'Assess the data exposure: calculate how many customer records were potentially transferred',
        'Notify the compliance team for breach notification assessment under applicable data protection regulations'
      ],
      priority: 'high',
      dueDayOffset: 2,
      expectedOutput: 'Connection terminated, source process identified, data exposure quantified, external IP attributed and compliance notification initiated.',
      skills: ['Network Security Analysis', 'Data Exfiltration Investigation', 'Compliance', 'Incident Response']
    },
    {
      title: 'Security automation pipeline failure during deployment',
      context: 'Your team\'s CI/CD pipeline includes SAST, SCA and secret scanning stages that automatically fail builds on high-severity findings. During a critical product deployment, the SAST tool begins returning timeout errors for every scan, blocking all deployments. The deployment deadline is in 48 hours and the team is pressuring security to bypass the gate.',
      requirements: [
        'Diagnose the root cause of the SAST tool timeout: check tool version, configuration and infrastructure capacity',
        'Determine whether the timeout is a tool failure or a genuine increase in codebase complexity',
        'Implement a temporary mitigation that maintains security coverage while the tool issue is resolved',
        'Document the risk acceptance and compensating controls for any bypasses granted',
        'Establish a monitoring mechanism to detect future pipeline failures before they block deployments'
      ],
      priority: 'normal',
      dueDayOffset: 5,
      expectedOutput: 'Root cause identified, temporary mitigation implemented with compensating controls, risk acceptance documented and monitoring rule deployed.',
      skills: ['Security Automation', 'DevSecOps', 'Risk Assessment', 'Incident Management']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Priya Sharma',
      personaRole: 'VP of Engineering',
      situation: 'The VP wants to launch a new customer-facing API in two weeks but the security architecture review is not yet complete. The product team is frustrated by delays.',
      openingMessage:
        'The board has committed to this API launch for the quarterly earnings call. We need to ship in two weeks. I understand the security review takes time, but we cannot afford to miss this deadline. What can we do?',
      expectedPoints: [
        'Acknowledges the business priority while explaining the security risks of deploying without review',
        'Proposes a rapid risk assessment scoped to the most critical attack surfaces of the API',
        'Defines minimum security requirements that must be met before launch (authentication, input validation, TLS)',
        'Agrees to a full review within a defined timeline post-launch while documenting residual risk acceptance'
      ]
    },
    {
      kind: 'team',
      personaName: 'Marcus Chen',
      personaRole: 'Cloud Infrastructure Lead',
      situation: 'The infrastructure team wants to use a new serverless platform that the security team has not yet evaluated. They need approval by Friday.',
      openingMessage:
        'We have evaluated the new serverless platform and it fits our architecture perfectly. The team needs your sign-off to start using it in production. We have done our own assessment and it looks secure.',
      expectedPoints: [
        'Requests the platform\'s security documentation, compliance certifications and shared responsibility details',
        'Identifies specific evaluation criteria: data residency, encryption at rest and in transit, IAM integration, logging capabilities',
        'Proposes a time-boxed evaluation with a clear pass/fail criteria and timeline',
        'Ensures the platform evaluation includes supply chain and dependency risk assessment'
      ]
    },
    {
      kind: 'client',
      personaName: 'Sarah Mitchell',
      personaRole: 'CISO, Vanguard Health Systems',
      situation: 'The client\'s healthcare platform needs to meet both HIPAA and NIST CSF requirements, but the security architecture was designed primarily for HIPAA compliance.',
      openingMessage:
        'Our platform was designed to pass HIPAA audits, but we are now required to demonstrate NIST CSF alignment for a government contract. We are not sure where the gaps are or how to prioritize remediation.',
      expectedPoints: [
        'Maps existing HIPAA controls to NIST CSF functions to identify overlap and gaps',
        'Identifies the most critical NIST CSF gaps that represent real risk beyond checkbox compliance',
        'Provides a prioritized remediation roadmap with effort estimates and resource requirements',
        'Explains how to build an evidence package that satisfies both HIPAA and NIST CSF auditors simultaneously'
      ]
    },
    {
      kind: 'client',
      personaName: 'David Park',
      personaRole: 'CTO, FinEdge Capital',
      situation: 'The client experienced a near-miss incident where a cloud misconfiguration exposed internal APIs for 48 hours before detection. They want to prevent recurrence.',
      openingMessage:
        'Last week, a misconfigured security group exposed our internal API endpoints to the public internet for two days. Nobody noticed until a security researcher reported it. How do we make sure this never happens again?',
      expectedPoints: [
        'Explains the root cause: lack of automated cloud security posture management and misconfiguration detection',
        'Proposes deploying a CSPM tool with real-time alerting on security group and IAM changes',
        'Designs an automated remediation workflow for common misconfigurations with human approval for ambiguous cases',
        'Recommends a periodic red team exercise specifically targeting cloud configuration weaknesses'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'A critical production database encryption key was rotated during a scheduled key management exercise, but several application services continue requesting data using the old key and are now receiving decryption errors. Customer-facing services are returning 500 errors.',
      requiredActions: [
        { action: 'Assess the scope: identify all services and applications affected by the key rotation', good: true, note: 'You cannot fix what you do not understand — scoping is always the first step.' },
        { action: 'Determine whether the old key can be temporarily re-enabled to restore service while a permanent fix is developed', good: true, note: 'Business continuity during a key rotation issue requires temporary restoration of service with compensating monitoring.' },
        { action: 'Update all affected services to use the new encryption key and verify data decryption succeeds', good: true, note: 'The permanent fix is migrating every consumer to the new key.' },
        { action: 'Blame the key management team and demand they stop rotating keys', good: false, note: 'Key rotation is a necessary security practice. The issue is that applications were not updated to handle the rotation, not that the rotation happened.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'The legal team informs the security engineering team that a new data protection regulation takes effect in 90 days, requiring end-to-end encryption for all customer data in transit and at rest, including data in processing pipelines and analytics stores that currently use plaintext.',
      requiredActions: [
        { action: 'Inventory all data stores and processing pipelines that handle customer data to determine the scope of the change', good: true, note: 'You cannot encrypt what you have not identified — data discovery is the essential first step.' },
        { action: 'Classify data by sensitivity and exposure to determine which encryption requirements apply to each store', good: true, note: 'Not all data requires the same protection level — risk-based classification drives efficient implementation.' },
        { action: 'Design an encryption strategy that covers data at rest, in transit and in use, including key management and rotation', good: true, note: 'A complete encryption strategy must address all three states of data and the key lifecycle.' },
        { action: 'Request a deadline extension because encryption is too complex to implement in 90 days', good: false, note: 'Regulatory deadlines are not negotiable. The response should be a prioritized implementation plan, not a delay request.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the differences between symmetric and asymmetric encryption. When would you use each in a production system, and what are the performance implications?',
      guidancePoints: [
        'Symmetric encryption (AES, ChaCha20) is fast and suitable for bulk data encryption; performance scales linearly with data size',
        'Asymmetric encryption (RSA, ECDSA) is orders of magnitude slower and used for key exchange, digital signatures and small-payload encryption',
        'Envelope encryption combines both: asymmetric for key exchange, symmetric for data encryption',
        'Key distribution is the fundamental challenge of symmetric encryption — solved by asymmetric key exchange or KMS services',
        'Hardware acceleration (AES-NI) makes symmetric encryption nearly free on modern processors; asymmetric has no equivalent speedup'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'You are designing a zero trust architecture for a company with 500 employees, 20 microservices and three cloud providers. Walk through your approach.',
      guidancePoints: [
        'Start with identity: implement a centralized identity provider with SSO, MFA and conditional access policies',
        'Evaluate device trust: managed vs unmanaged devices, device health attestation and compliance baselines',
        'Design micro-segmentation per service with service mesh for inter-service mTLS and policy enforcement',
        'Implement per-cloud provider IAM federation so the same identity works across all three providers',
        'Build a policy engine that evaluates identity, device posture and context to make real-time access decisions',
        'Monitor and audit every access decision for compliance and forensics'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Your SAST tool has been flagging a critical SQL injection vulnerability in a legacy module for three months. The module is scheduled for retirement in six months, but the development team refuses to fix it because "it is going away." How do you handle this?',
      guidancePoints: [
        'Assess the actual exposure: is the module internet-facing, does it process sensitive data, is there a compensating control',
        'Apply a risk-based approach: if exposure is high, a short-term fix or compensating control is necessary regardless of retirement timeline',
        'Consider a web application firewall rule as a temporary compensating control to mitigate the injection risk',
        'Document the risk acceptance decision with the business owner\'s sign-off if the risk is accepted',
        'Use the lesson to improve the SDLC: ensure new code never introduces similar vulnerabilities'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A senior engineer discovers that a production encryption key was shared via a private Slack channel between two team members six months ago. The key is still in active use. What do you do?',
      guidancePoints: [
        'Immediately rotate the encryption key and deploy the new key to all services using it',
        'Assess the exposure window: who had access to the Slack channel during those six months, could messages be exported',
        'Determine whether the compromised key was used to access data that requires breach notification',
        'Implement a technical control to prevent future key sharing (secret scanning in messaging platforms)',
        'Conduct a blameless review to understand why the key was shared and what process gap allowed it'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'The CEO wants to know why the company should invest in a security engineering team instead of just using managed security services. How do you justify the investment?',
      guidancePoints: [
        'Managed services handle monitoring and alerting but cannot design architecture, implement controls or respond to organization-specific threats',
        'A security engineering team builds custom detection rules, designs architecture aligned to business needs and integrates security into the development lifecycle',
        'Internal engineers understand the organization\'s unique risk profile, technology stack and business requirements in ways outsourced teams cannot',
        'The cost of a breach — including the engineering time to respond — far exceeds the annual cost of a security engineering team',
        'Regulatory requirements increasingly demand internal security expertise, not just outsourced monitoring'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you decide between building a security tool in-house versus buying a commercial solution?',
      guidancePoints: [
        'Buy when the problem is well-understood and commoditized: SIEM, vulnerability scanning, endpoint protection',
        'Build when the requirement is unique to your architecture, the buy solution does not integrate with your stack or the cost of customization exceeds building',
        'Consider total cost of ownership: licensing, integration effort, maintenance burden, staffing and opportunity cost',
        'Start with a buy for immediate coverage, then evaluate whether building provides strategic differentiation',
        'The hybrid approach — buy the platform, build custom integrations and detection rules — is often optimal'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain to the board of directors why the company needs to invest in security automation. Use non-technical language.',
      guidancePoints: [
        'Connect to business outcomes: automation reduces the time between detection and response from hours to seconds, limiting damage',
        'Use an analogy: security automation is like an automatic fire sprinkler system — it responds instantly without waiting for someone to arrive',
        'Quantify the risk: the average cost of a breach increases with dwell time; faster response directly reduces financial exposure',
        'Explain that security analysts are a scarce resource; automation multiplies their effectiveness so the team can focus on the hardest problems',
        'Reference industry benchmarks: organizations with security automation detect and contain breaches significantly faster than those without'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'You have just completed a threat model for a new product. The engineering team says the findings will slow down the launch. How do you present the results to get alignment?',
      guidancePoints: [
        'Lead with the business value of threat modeling: finding issues before they reach production is cheaper than fixing them after a breach',
        'Present findings ranked by risk, not by quantity — two critical findings matter more than twenty informational ones',
        'Offer practical mitigations with effort estimates so the team can make informed trade-off decisions',
        'Identify quick wins: controls that are low effort and reduce significant risk, allowing the launch to proceed safely',
        'Frame the relationship as collaborative: you are helping the team ship securely, not blocking them from shipping'
      ]
    }

  ]

}
