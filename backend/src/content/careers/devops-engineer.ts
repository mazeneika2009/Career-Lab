import type { CareerDef } from '../framework.js'

export const devopsEngineer: CareerDef = {
  slug: 'devops-engineer',
  name: 'DevOps Engineer',
  category: 'IT & Cloud',
  order: 35,
  description:
    'Automates software delivery with Docker, Kubernetes, Terraform, Jenkins and GitHub Actions across cloud platforms.',
  difficulty: 'Advanced',
  pathSummary:
    'Linux & scripting fundamentals → Containers, Docker & registry management → Kubernetes orchestration & Helm → CI/CD pipelines, IaC with Terraform & GitOps workflows.',
  mainSkills: [
    'Linux System Administration & Bash Scripting',
    'Docker Containerization & Image Management',
    'Kubernetes Orchestration & Helm Chart Development',
    'CI/CD Pipeline Design (Jenkins, GitHub Actions)',
    'Infrastructure as Code with Terraform',
    'Cloud Platform Services (AWS, Azure, GCP)',
    'Monitoring, Logging & Incident Response',
    'GitOps & Version Control Workflows'
  ],
  sourcePlatforms: [
    'Docker Documentation',
    'Kubernetes Documentation',
    'GitHub Documentation',
    'Jenkins Documentation',
    'Terraform Documentation',
    'AWS Documentation',
    'Microsoft Azure Documentation',
    'Google Cloud Documentation'
  ],
  companyName: 'PipelineOps Solutions',
  roleTitle: 'DevOps Engineer',

  chapters: [
    {
      slug: 'linux-foundations-scripting-containers',
      stage: 'Beginner',
      title: 'Linux Foundations, Scripting & Container Basics',
      description: 'Mastering Linux administration, shell scripting for automation and understanding containerization concepts with Docker fundamentals.',
      topics: [
        {
          slug: 'linux-system-administration',
          title: 'Linux System Administration for DevOps',
          minutes: 30,
          objectives: [
            'Navigate the Linux filesystem, manage permissions and configure system services using systemd',
            'Write Bash scripts to automate common system administration tasks such as user provisioning and log rotation',
            'Configure SSH key-based authentication, firewall rules with iptables or ufw and scheduled jobs with cron'
          ],
          sections: [
            { heading: 'Filesystem hierarchy, permissions and process management', body: 'Linux follows the Filesystem Hierarchy Standard with /etc for configuration, /var for logs and variable data, /home for user directories and /opt for third-party software. File permissions use the rwx model for owner, group and others, with setuid, setgid and sticky bits for special cases. Process management uses ps, top, kill and systemd for service lifecycle control. Understanding these fundamentals is essential for debugging container environments where the underlying OS directly impacts application behavior.' },
            { heading: 'Bash scripting for automation', body: 'Bash scripting transforms repetitive manual tasks into reliable, repeatable automation. Core constructs include variables, conditionals (if/case), loops (for/while), functions and command substitution. Real-world DevOps scripts handle user provisioning, log rotation, backup orchestration and environment setup. Incorporating set -euo pipefail at the top of scripts ensures they fail fast on errors, unset variables or pipeline failures — a critical practice for production automation where silent failures cause cascading issues.' },
            { heading: 'SSH, firewalls and cron scheduling', body: 'SSH key-based authentication eliminates password prompts and strengthens security for automated deployments. Generating Ed25519 keys and deploying them with ssh-copy-id is the standard approach. Firewalls control network access: ufw provides a user-friendly interface on Ubuntu while iptables offers granular control. Cron jobs schedule recurring tasks like certificate renewal, database backups and health checks. Combining SSH, firewalls and cron forms the backbone of secure, automated server management that every DevOps engineer must master.' }
          ],
          links: [
            { title: 'Linux Administration Guide', url: 'https://docs.docker.com/engine/install/', sourceName: 'Docker Documentation', resourceType: 'guide', relationship: 'Docker installation prerequisites covering Linux kernel requirements, user namespace configuration and storage drivers.' },
            { title: 'GitHub Actions — Learning Path', url: 'https://docs.github.com/en/actions/learn-github-actions', sourceName: 'GitHub Documentation', resourceType: 'guide', relationship: 'GitHub Actions getting-started guide covering workflow syntax, events, jobs and basic automation concepts.' },
            { title: 'Terraform Getting Started', url: 'https://developer.hashicorp.com/terraform/tutorials/aws-get-started/quickstart', sourceName: 'Terraform Documentation', resourceType: 'guide', relationship: 'HashiCorp introductory Terraform tutorial covering providers, resources and the basic workflow.' }
          ],
          quiz: {
            prompt: 'You need to write a Bash script that runs as a cron job every night to compress log files older than 7 days in /var/log/app and delete the originals. Which Bash construct correctly handles this?',
            options: [
              'find /var/log/app -name "*.log" -mtime +7 -exec gzip {} && rm {} \\;',
              'find /var/log/app -name "*.log" -mtime +7 -exec gzip {} \\; && find /var/log/app -name "*.gz" -mtime +7 -delete',
              'ls /var/log/app/*.log | xargs gzip && rm /var/log/app/*.log',
              'tar -czf /var/log/app-logs.tar.gz /var/log/app && rm -rf /var/log/app/*'
            ],
            answerIndex: 1,
            explanation: 'The correct approach finds files older than 7 days, compresses them with gzip, then separately finds and deletes the compressed originals. The first option fails because rm is inside the same -exec block before gzip finishes. The third option processes all logs regardless of age. The fourth option archives everything, not just old logs.'
          }
        },
        {
          slug: 'docker-fundamentals',
          title: 'Docker Fundamentals & Container Concepts',
          minutes: 30,
          objectives: [
            'Explain containerization concepts including namespaces, cgroups and the difference between containers and virtual machines',
            'Write optimized multi-stage Dockerfiles that minimize image size and follow security best practices',
            'Manage container lifecycle including networking, volumes, resource limits and Docker Compose for multi-container applications'
          ],
          sections: [
            { heading: 'Containerization architecture and Linux primitives', body: 'Containers share the host OS kernel using Linux namespaces (PID, network, mount, user) for isolation and control groups (cgroups) for resource limiting. Unlike virtual machines, containers do not include a full guest OS — they run as isolated processes on the host kernel, making them lightweight and fast to start. Docker provides the tooling to build, ship and run container images. Understanding these primitives is critical for debugging container issues, tuning performance and making informed decisions about container security and isolation boundaries.' },
            { heading: 'Writing production-ready Dockerfiles', body: 'A well-crafted Dockerfile follows multi-stage builds to separate build dependencies from runtime, resulting in minimal final images. Base images should be pinned to specific versions (not latest) and sourced from official repositories. Running containers as non-root users with USER directives reduces the attack surface. Layer ordering matters: placing frequently changing layers (application code) after static layers (dependency installation) maximizes cache utilization. .dockerignore files prevent unnecessary files from entering the build context, reducing build time and image size.' },
            { heading: 'Networking, volumes and Docker Compose', body: 'Docker networking enables container-to-container and container-to-host communication. Bridge networks provide isolated internal networking, host mode removes network isolation and overlay networks span multiple Docker hosts. Volumes persist data beyond container lifecycle — bind mounts for development and named volumes for production. Docker Compose defines multi-container applications in a YAML file, specifying services, networks and volumes declaratively. Compose profiles and override files enable environment-specific configurations for development, staging and production.' }
          ],
          links: [
            { title: 'Docker Getting Started Guide', url: 'https://docs.docker.com/get-started/', sourceName: 'Docker Documentation', resourceType: 'guide', relationship: 'Official Docker getting started guide covering image building, container management and Docker Compose basics.' },
            { title: 'Dockerfile Best Practices', url: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/', sourceName: 'Docker Documentation', resourceType: 'reference', relationship: 'Docker documentation on Dockerfile optimization, multi-stage builds and security best practices.' },
            { title: 'Kubernetes Concepts Overview', url: 'https://kubernetes.io/docs/concepts/', sourceName: 'Kubernetes Documentation', resourceType: 'reference', relationship: 'Kubernetes official documentation covering core concepts including pods, services, deployments and namespaces.' }
          ],
          quiz: {
            prompt: 'You have a Node.js application that takes 3 minutes to build but the application code changes frequently while the package.json rarely changes. How should you structure the Dockerfile for optimal cache utilization?',
            options: [
              'COPY . . && RUN npm install && RUN npm run build',
              'COPY package.json . && RUN npm install && COPY . . && RUN npm run build',
              'RUN npm install && COPY . . && RUN npm run build',
              'COPY . . && RUN npm ci --ignore-scripts && npm run build'
            ],
            answerIndex: 1,
            explanation: 'Copying package.json first and running npm install creates a cached layer that is only invalidated when dependencies change. Subsequent code changes only re-execute the COPY and build steps, not the dependency installation. This dramatically reduces rebuild time during active development.'
          }
        },
        {
          slug: 'git-version-control-workflows',
          title: 'Git Mastery & Version Control Workflows',
          minutes: 25,
          objectives: [
            'Use advanced Git operations including interactive rebase, cherry-pick, bisect and reflog for repository management',
            'Implement Git branching strategies such as GitFlow, trunk-based development and feature branching',
            'Configure Git hooks, signed commits and repository security policies for collaborative development'
          ],
          sections: [
            { heading: 'Advanced Git operations and recovery', body: 'Beyond basic commits and merges, Git offers powerful tools for repository management. Interactive rebase (git rebase -i) rewrites commit history to create clean, logical change sequences before merging. Cherry-pick applies specific commits to other branches without full merges. Git bisect performs binary search through commit history to identify the exact commit that introduced a bug. The reflog tracks every HEAD movement, enabling recovery of lost commits and deleted branches up to 90 days. Mastering these tools separates effective DevOps engineers from those who struggle with repository hygiene.' },
            { heading: 'Branching strategies for delivery pipelines', body: 'Branching strategies determine how code flows from development to production. GitFlow uses develop, feature, release and hotfix branches — suited for scheduled releases with versioned products. Trunk-based development uses short-lived feature branches merged to main multiple times daily — ideal for continuous delivery with feature flags. GitHub Flow simplifies this to feature branches and pull requests against main. The choice depends on release cadence, team size and risk tolerance. Most modern DevOps teams favor trunk-based development for its simplicity and alignment with CI/CD principles.' },
            { heading: 'Git hooks, signing and repository security', body: 'Git hooks are scripts that run automatically on git events. Pre-commit hooks validate code formatting, run linters and check for secrets before allowing commits. Pre-push hooks run tests to prevent pushing broken code. Server-side hooks (pre-receive, post-receive) enforce branch policies and trigger CI pipelines. GPG or SSH signing of commits provides cryptographic proof of authorship. Branch protection rules on GitHub enforce required reviews, status checks and linear history. These mechanisms form the quality gate at the source control level that prevents issues from reaching deployment pipelines.' }
          ],
          links: [
            { title: 'Git Documentation', url: 'https://git-scm.com/doc', sourceName: 'GitHub Documentation', resourceType: 'reference', relationship: 'Official Git documentation covering commands, workflows and advanced operations.' },
            { title: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions', sourceName: 'GitHub Documentation', resourceType: 'reference', relationship: 'GitHub Actions documentation covering workflow syntax, runners, actions marketplace and CI/CD automation.' },
            { title: 'Jenkins Pipeline Documentation', url: 'https://www.jenkins.io/doc/book/pipeline/', sourceName: 'Jenkins Documentation', resourceType: 'reference', relationship: 'Jenkins documentation on Pipeline as Code, Jenkinsfile syntax and declarative versus scripted pipelines.' }
          ],
          quiz: {
            prompt: 'Your team follows trunk-based development. A developer accidentally force-pushed a corrupted commit to the main branch. The reflog shows the previous good state was 3 commits ago. What is the safest recovery approach?',
            options: [
              'git reset --hard HEAD~3 on the main branch to undo the last 3 commits',
              'git reflog to identify the good commit hash, then git reset --hard <good-hash> on main',
              'git revert HEAD~2..HEAD to create revert commits for the corrupted changes',
              'Delete the main branch and recreate it from the last known good tag'
            ],
            answerIndex: 1,
            explanation: 'Using the reflog to identify the exact good commit hash and resetting to it is the safest approach. It precisely restores the branch to the last known good state without affecting other branches or creating unnecessary revert commits. Force-pushing after the reset restores the remote branch to the correct state.'
          }
        }
      ]
    },
    {
      slug: 'kubernetes-orchestration-helm',
      stage: 'Foundation',
      title: 'Kubernetes Orchestration & Helm Package Management',
      description: 'Deploying, scaling and managing containerized applications on Kubernetes clusters with declarative configurations and Helm chart packaging.',
      topics: [
        {
          slug: 'kubernetes-core-concepts',
          title: 'Kubernetes Architecture & Core Resources',
          minutes: 30,
          objectives: [
            'Explain the Kubernetes control plane components including API server, etcd, scheduler and controller manager',
            'Create and manage Pods, Deployments, Services and ConfigMaps using kubectl and YAML manifests',
            'Configure resource requests, limits, namespaces and RBAC for workload isolation and access control'
          ],
          sections: [
            { heading: 'Control plane architecture and component interaction', body: 'The Kubernetes API server is the central hub through which all components communicate. It stores cluster state in etcd, a distributed key-value store that provides consistency using the Raft consensus algorithm. The scheduler assigns Pods to nodes based on resource availability, affinity rules and taints. Controller managers run reconciliation loops that continuously compare desired state (defined in manifests) with actual state and take corrective action. Understanding this architecture is essential for troubleshooting: a scheduler issue manifests as Pods stuck in Pending, while an etcd issue prevents any API operations.' },
            { heading: 'Core workload resources and service discovery', body: 'Pods are the smallest deployable units, wrapping one or more containers that share network namespace and storage. Deployments manage ReplicaSets that maintain the desired Pod count, supporting rolling updates and rollbacks. Services provide stable network endpoints for Pods using ClusterIP for internal access, NodePort for external access and LoadBalancer for cloud-provisioned load balancers. ConfigMaps decouple configuration from container images, injected as environment variables or mounted as files. Ingress resources route external HTTP traffic to Services based on hostnames and paths, terminating TLS certificates at the cluster edge.' },
            { heading: 'Resource management, namespaces and RBAC', body: 'Resource requests guarantee minimum CPU and memory allocation for a Pod while limits cap maximum usage — exceeding memory limits triggers OOMKill. Namespaces provide logical isolation within a cluster, separating production, staging and development workloads. Role-Based Access Control (RBAC) defines who can perform what actions on which resources. Roles and ClusterRoles specify permissions, while RoleBindings and ClusterRoleBindings assign them to users or service accounts. Implementing RBAC properly is a security prerequisite: the default Kubernetes configuration allows full cluster access to anyone with API server credentials.' }
          ],
          links: [
            { title: 'Kubernetes Documentation', url: 'https://kubernetes.io/docs/home/', sourceName: 'Kubernetes Documentation', resourceType: 'reference', relationship: 'Official Kubernetes documentation covering architecture, core concepts and cluster administration.' },
            { title: 'Docker and Kubernetes Integration', url: 'https://docs.docker.com/desktop/kubernetes/', sourceName: 'Docker Documentation', resourceType: 'guide', relationship: 'Docker Desktop documentation on enabling and using the built-in Kubernetes cluster.' },
            { title: 'GitHub Actions for Kubernetes', url: 'https://docs.github.com/en/actions/deploying/deploying-with-kubernetes', sourceName: 'GitHub Documentation', resourceType: 'guide', relationship: 'GitHub Actions documentation on deploying applications to Kubernetes clusters using workflows.' }
          ],
          quiz: {
            prompt: 'A Pod in your Kubernetes cluster is in CrashLoopBackOff state. The kubectl logs show the application started successfully but then exited with code 0 after 10 seconds. What is the most likely cause?',
            options: [
              'The container image does not exist in the registry',
              'The Pod is exceeding its memory limit and being OOMKilled',
              'The container\'s main process exits cleanly, causing Kubernetes to restart it repeatedly',
              'The node running the Pod has insufficient disk space'
            ],
            answerIndex: 2,
            explanation: 'When a container\'s main process exits with code 0 (success), the Pod\'s restartPolicy (default: Always) causes Kubernetes to restart it. If the application is designed as a short-running task, it should use a Job or CronJob instead of a Deployment. OOMKilled would show exit code 137, and missing images would show ImagePullBackOff.'
          }
        },
        {
          slug: 'kubernetes-deployments-scaling',
          title: 'Deployments, Scaling & Service Mesh',
          minutes: 30,
          objectives: [
            'Configure rolling update strategies, canary deployments and blue-green deployments for zero-downtime releases',
            'Implement Horizontal Pod Autoscaler and Cluster Autoscaler for dynamic workload scaling',
            'Set up Ingress controllers with TLS termination, path-based routing and rate limiting'
          ],
          sections: [
            { heading: 'Deployment strategies and rollout management', body: 'Rolling updates gradually replace old Pods with new ones, controlled by maxSurge (how many extra Pods can exist) and maxUnavailable (how many Pods can be down). Setting maxSurge: 1, maxUnavailable: 0 ensures zero downtime. Canary deployments route a small percentage of traffic to the new version using separate Deployments and weighted Services or Ingress annotations. Blue-green deployments maintain two identical environments and switch traffic atomically using Service selector changes. Each strategy trades complexity for risk reduction — rolling updates are simplest but catch regressions slowly, while canary deployments detect issues before full rollout.' },
            { heading: 'Autoscaling mechanisms', body: 'Horizontal Pod Autoscaler (HPA) scales Pod replicas based on CPU utilization, memory usage or custom metrics from Prometheus. The HPA controller periodically queries metrics and adjusts replica counts, using configurable stabilization windows to prevent thrashing. Vertical Pod Autoscaler (VPA) adjusts resource requests based on actual usage but requires Pod restarts. Cluster Autoscaler adjusts the number of nodes based on pending Pods that cannot be scheduled. On cloud platforms, this triggers node pool scaling — adding or removing VMs. Combining HPA with Cluster Autoscaler ensures workloads scale at both the Pod and infrastructure levels.' },
            { heading: 'Ingress, service mesh and traffic management', body: 'Ingress controllers like NGINX or Traefik handle HTTP routing, TLS termination and load balancing. Path-based routing directs /api traffic to backend services and /static to a CDN. Rate limiting protects backend services from traffic spikes. Service mesh technologies like Istio or Linkerd add observability, traffic management and security at the network layer without application changes. Features include mutual TLS between services, circuit breaking, retry policies and distributed tracing. For most teams, a well-configured Ingress controller is sufficient — service mesh adds value in large microservice architectures requiring fine-grained traffic control.' }
          ],
          links: [
            { title: 'Kubernetes Deployments Documentation', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/', sourceName: 'Kubernetes Documentation', resourceType: 'reference', relationship: 'Kubernetes documentation on Deployment objects, rolling updates and rollout management.' },
            { title: 'Horizontal Pod Autoscaler Guide', url: 'https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/', sourceName: 'Kubernetes Documentation', resourceType: 'guide', relationship: 'Kubernetes guide on configuring HPA for automatic Pod scaling based on metrics.' },
            { title: 'Terraform Kubernetes Provider', url: 'https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs', sourceName: 'Terraform Documentation', resourceType: 'reference', relationship: 'Terraform provider documentation for managing Kubernetes resources declaratively.' }
          ],
          quiz: {
            prompt: 'You are deploying a new version of a microservice using a rolling update. The new version has a bug that causes it to crash after handling 5 requests. The deployment uses maxSurge: 25% and maxUnavailable: 25% with 12 replicas. How many old Pods remain healthy during the faulty rollout?',
            options: [
              'All 12 old Pods are replaced before any health check fails',
              'Approximately 9 old Pods remain healthy while 3 new Pods start failing',
              'Exactly 6 old Pods remain healthy while 6 new Pods are created',
              'All old Pods are terminated simultaneously and replaced with new Pods'
            ],
            answerIndex: 1,
            explanation: 'With maxSurge: 25% (3 extra Pods) and maxUnavailable: 25% (3 Pods removed), Kubernetes creates 3 new Pods before terminating 3 old ones. If the new Pods crash, the deployment rollout pauses and 9 healthy old Pods continue serving traffic. The deployment controller detects the failure and halts further replacement.'
          }
        },
        {
          slug: 'helm-charts-package-management',
          title: 'Helm Charts & Kubernetes Package Management',
          minutes: 25,
          objectives: [
            'Create Helm charts with templates, values files and helpers for reusable Kubernetes configurations',
            'Manage Helm releases with versioning, rollbacks and dependency management across environments',
            'Implement Helm chart testing, linting and packaging for distribution through OCI registries'
          ],
          sections: [
            { heading: 'Helm chart structure and templating', body: 'Helm charts package Kubernetes manifests into reusable, parameterized units. A chart contains Chart.yaml (metadata), values.yaml (default configuration), templates/ (Kubernetes manifests with Go template syntax) and helpers (_helpers.tpl). Templates access values using {{ .Values.key }} and support conditionals, loops and named templates. The tpl function enables dynamic template rendering from values. Understanding Helm templating is essential for creating charts that work across environments — a single chart should deploy to development, staging and production with different values files rather than maintaining separate manifest sets.' },
            { heading: 'Release management and versioning', body: 'Helm tracks releases — installed chart instances — with revision history enabling instant rollbacks via helm rollback. Chart versions follow semantic versioning (MAJOR.MINOR.PATCH). Values files override defaults for environment-specific configuration. Helmfile or Argo CD ApplicationSets manage declarative release definitions across multiple clusters. Dependencies between charts are declared in Chart.yaml and downloaded from chart repositories or OCI registries. Helm hooks (pre-install, post-install, pre-upgrade) run Jobs at specific lifecycle points for database migrations, schema validation and certificate provisioning.' },
            { heading: 'Testing, linting and distribution', body: 'helm lint validates chart structure and template rendering for common errors. helm template renders manifests locally without cluster access, enabling validation in CI pipelines. helm test runs pod-based tests after release installation to verify functionality — smoke tests, connectivity checks and schema validation. Charts are packaged into .tgz archives and distributed through Helm repositories (HTTP-based) or OCI registries (container-native). GitHub Actions or GitLab CI can automate chart testing, versioning and publishing on every merge, ensuring that chart changes are validated before reaching production clusters.' }
          ],
          links: [
            { title: 'Helm Documentation', url: 'https://helm.sh/docs/', sourceName: 'Kubernetes Documentation', resourceType: 'reference', relationship: 'Official Helm documentation covering chart development, packaging, repositories and release management.' },
            { title: 'Terraform Helm Provider', url: 'https://registry.terraform.io/providers/hashicorp/helm/latest/docs', sourceName: 'Terraform Documentation', resourceType: 'reference', relationship: 'Terraform Helm provider documentation for managing Helm releases declaratively alongside infrastructure.' },
            { title: 'GitHub Actions for Helm', url: 'https://docs.github.com/en/actions/use-cases-and-examples/publishing-packages/publishing-docker-images', sourceName: 'GitHub Documentation', resourceType: 'guide', relationship: 'GitHub Actions guides on publishing container images and packages to OCI registries, applicable to Helm charts.' }
          ],
          quiz: {
            prompt: 'Your Helm chart deploys an application that needs different resource limits in staging versus production. Which approach correctly separates environment-specific configuration?',
            options: [
              'Create two separate Helm charts, one for staging and one for production',
              'Use a single chart with environment-specific values files passed via helm install -f',
              'Hardcode staging values in the template and use --set only for production overrides',
              'Store environment values in ConfigMaps and read them at template render time'
            ],
            answerIndex: 1,
            explanation: 'A single chart with separate values files (values-staging.yaml, values-production.yaml) is the Helm best practice. It maintains a single source of truth for the chart while allowing environment-specific overrides. helm install -f values-production.yaml enables clean separation without duplicating templates.'
          }
        }
      ]
    },
    {
      slug: 'cicd-pipelines-automation',
      stage: 'Intermediate',
      title: 'CI/CD Pipeline Design & Automation',
      description: 'Building robust continuous integration and delivery pipelines with Jenkins, GitHub Actions, automated testing, security scanning and deployment strategies.',
      topics: [
        {
          slug: 'jenkins-pipeline-engineering',
          title: 'Jenkins Pipeline as Code',
          minutes: 30,
          objectives: [
            'Design declarative Jenkins pipelines with parallel stages, conditional execution and post-build actions',
            'Configure Jenkins shared libraries for reusable pipeline components across multiple repositories',
            'Implement Jenkins security including credential management, agent isolation and access control'
          ],
          sections: [
            { heading: 'Declarative pipeline structure and advanced features', body: 'Declarative Jenkins pipelines define CI/CD workflows in a Jenkinsfile using a structured syntax. Stages contain steps, and parallel blocks execute stages concurrently. Environment variables, when conditions and input steps control pipeline behavior. The post section defines actions for success, failure and cleanup regardless of outcome. Credentials binding injects secrets as environment variables during specific stages. Understanding declarative syntax nuances — such as script blocks for complex logic and triggers for automatic builds — enables pipelines that are both powerful and maintainable.' },
            { heading: 'Shared libraries and pipeline standardization', body: 'Jenkins shared libraries extract common pipeline logic into a separate Git repository, imported at the top of Jenkinsfiles. Libraries provide standardized functions for building Docker images, running tests, deploying to environments and sending notifications. This ensures consistency across hundreds of microservice pipelines while reducing duplication. The vars/ directory contains global functions callable from any Jenkinsfile, while src/ holds object-oriented Groovy classes for complex logic. Versioning shared libraries alongside application releases ensures pipeline behavior is reproducible and auditable.' },
            { heading: 'Security hardening and credential management', body: 'Jenkins security starts with the Security Realm (authentication) and Authorization matrix controlling who can configure and run pipelines. Credentials should use the Credentials Plugin with folder-scoped credentials limiting access to specific pipelines. Secret text and file credentials bind to environment variables during pipeline execution, never appearing in logs. Agent isolation prevents compromised builds from accessing the Jenkins controller. The OWASP CSRF protection plugin, Agent-to-controller security and audit logging complete the security posture. Regular Jenkins updates patch known vulnerabilities in the platform itself.' }
          ],
          links: [
            { title: 'Jenkins Pipeline Documentation', url: 'https://www.jenkins.io/doc/book/pipeline/', sourceName: 'Jenkins Documentation', resourceType: 'reference', relationship: 'Jenkins official documentation on Pipeline as Code, declarative syntax and pipeline best practices.' },
            { title: 'Jenkins Shared Libraries', url: 'https://www.jenkins.io/doc/book/pipeline/shared-libraries/', sourceName: 'Jenkins Documentation', resourceType: 'reference', relationship: 'Jenkins documentation on creating and using shared libraries for pipeline code reuse.' },
            { title: 'GitHub Actions Workflow Syntax', url: 'https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions', sourceName: 'GitHub Documentation', resourceType: 'reference', relationship: 'GitHub Actions syntax reference covering workflow triggers, jobs, steps and expressions.' }
          ],
          quiz: {
            prompt: 'Your Jenkins pipeline deploys to production after all tests pass. A security scan stage runs after deployment. If the security scan finds critical vulnerabilities, the pipeline should roll back the deployment. Which pipeline pattern implements this?',
            options: [
              'Put the security scan before the deployment stage and block deployment on failures',
              'Use a post { failure { } } block on the deployment stage to trigger rollback',
              'Use a try-catch in a scripted block within the security scan stage to trigger helm rollback',
              'Deploy with a canary strategy, run the security scan, and promote or rollback based on results'
            ],
            answerIndex: 3,
            explanation: 'A canary deployment strategy deploys to a subset of production, runs the security scan against the canary, and either promotes to full production or rolls back. This is the safest approach because it validates security in the production environment before full exposure. Simply running the scan before deployment does not catch runtime security issues.'
          }
        },
        {
          slug: 'github-actions-automation',
          title: 'GitHub Actions CI/CD Workflows',
          minutes: 30,
          objectives: [
            'Design multi-workflow CI/CD pipelines using GitHub Actions with reusable workflows and matrix builds',
            'Implement self-hosted runners, caching strategies and artifact management for optimized build performance',
            'Configure GitHub Actions for container image building, signing and publishing to container registries'
          ],
          sections: [
            { heading: 'Workflow composition and reusable components', body: 'GitHub Actions workflows consist of jobs containing steps that run on virtual machines or containers. Reusable workflows (workflow_call) allow one workflow to invoke another, enabling shared CI/CD logic across repositories. Matrix strategies test across multiple OS, language or dependency versions simultaneously. Composite actions bundle multi-step logic into reusable units published to the Actions marketplace. Workflow dispatch and repository_dispatch events enable manual and programmatic triggering. Understanding how workflows chain — using workflow_run triggers and artifact passing — enables sophisticated multi-stage pipelines that rival Jenkins flexibility.' },
            { heading: 'Performance optimization and caching', body: 'Build performance directly impacts developer productivity. GitHub Actions provides dependency caching through cache actions for npm, pip, Gradle and other package managers. The cache key should include the lock file hash to ensure correct cache invalidation. Artifact actions persist build outputs between jobs and workflows. Self-hosted runners provide faster builds for large monorepos, GPU workloads or environments requiring specific hardware. Concurrency groups prevent duplicate workflows on rapid pushes, canceling in-progress runs when new commits arrive. These optimizations can reduce build times from 20 minutes to under 5 minutes.' },
            { heading: 'Container image lifecycle with Actions', body: 'GitHub Actions integrates with container registries for automated image building, scanning and publishing. The docker/build-push-action builds and pushes multi-platform images. Docker layer caching through GitHub Actions cache or registry-based caching reduces build time. Image scanning with Trivy or Snyk catches vulnerabilities before publishing. Cosign signs images for supply chain verification. Container image attestation using SLSA framework provides build provenance. Images can be pushed to GitHub Container Registry (ghcr.io), Docker Hub or cloud registries with automatic tagging using git SHA, semantic version and branch name.' }
          ],
          links: [
            { title: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions', sourceName: 'GitHub Documentation', resourceType: 'reference', relationship: 'GitHub Actions complete documentation covering workflows, actions, runners and secrets management.' },
            { title: 'GitHub Actions Marketplace', url: 'https://github.com/marketplace?type=actions', sourceName: 'GitHub Documentation', resourceType: 'reference', relationship: 'GitHub Actions Marketplace for discovering and using pre-built actions for common CI/CD tasks.' },
            { title: 'Jenkins to GitHub Actions Migration', url: 'https://docs.github.com/en/actions/migrating-to-github-actions', sourceName: 'GitHub Documentation', resourceType: 'guide', relationship: 'GitHub guide on migrating Jenkins pipelines to GitHub Actions workflows.' }
          ],
          quiz: {
            prompt: 'Your GitHub Actions workflow builds Docker images and pushes them to ghcr.io. The workflow runs on every push to main but the average build time is 15 minutes because npm install runs from scratch each time. How do you reduce the build time?',
            options: [
              'Switch to a self-hosted runner with more CPU cores',
              'Cache the npm dependencies using actions/cache keyed on the package-lock.json hash',
              'Use npm install --prefer-offline to leverage local cache on the runner',
              'Pre-install all dependencies in a custom Docker image used as the build container'
            ],
            answerIndex: 1,
            explanation: 'actions/cache keyed on the package-lock.json hash stores and restores npm dependencies between workflow runs. This eliminates the npm install step on cache hits, reducing build time significantly. Self-hosted runners help but do not address the root cause. Custom Docker images work but are harder to maintain as dependency versions change.'
          }
        },
        {
          slug: 'security-scanning-supply-chain',
          title: 'Security Scanning & Supply Chain Integrity',
          minutes: 25,
          objectives: [
            'Integrate static analysis, container scanning and secret detection into CI/CD pipelines',
            'Implement software supply chain security with SLSA, SBOM generation and image signing',
            'Configure dependency vulnerability management with automated updates and policy enforcement'
          ],
          sections: [
            { heading: 'Pipeline-integrated security scanning', body: 'Security scanning in CI/CD catches vulnerabilities before they reach production. Static Application Security Testing (SAST) analyzes source code for injection flaws, insecure configurations and code quality issues using tools like SonarQube or Semgrep. Container scanning with Trivy, Grype or Snyk checks Docker images for OS and library vulnerabilities. Secret detection with gitleaks or GitLeaks scans repositories for accidentally committed API keys, passwords and tokens. Each scan type should fail the pipeline on critical findings while generating reports for less severe issues. The goal is automated security gates that prevent vulnerable code from reaching deployment without slowing development velocity.' },
            { heading: 'Software Bill of Materials and image signing', body: 'Software Bill of Materials (SBOM) documents every dependency in a software artifact, enabling vulnerability tracking and license compliance. Tools like Syft generate SBOMs in CycloneDX or SPDX format during CI builds. SBOMs are attached to container images and published alongside releases. Cosign signs container images and attestations, creating cryptographic proof of build provenance. The SLSA framework defines supply chain security levels: Level 3 requires build isolation, signed provenance and hermetic builds. Implementing these practices creates a verifiable chain of trust from source code to deployed artifact.' },
            { heading: 'Dependency management and policy enforcement', body: 'Automated dependency updates via Dependabot or Renovate create pull requests when new versions of dependencies are available. Policies enforce update frequency, automerge for patch versions and manual review for major versions. Dependency pinning to exact versions or commit SHAs prevents supply chain attacks through malicious version bumps. GitHub\'s dependency graph and security advisories provide visibility into known vulnerabilities. OWASP Dependency Check scans project dependencies against the National Vulnerability Database. Combining automated updates with security scanning creates a self-healing dependency posture that stays current without manual intervention.' }
          ],
          links: [
            { title: 'GitHub Dependabot Documentation', url: 'https://docs.github.com/en/code-security/dependabot', sourceName: 'GitHub Documentation', resourceType: 'reference', relationship: 'GitHub Dependabot documentation on automated dependency updates and security alerts.' },
            { title: 'Docker Content Trust', url: 'https://docs.docker.com/engine/security/trust/', sourceName: 'Docker Documentation', resourceType: 'reference', relationship: 'Docker documentation on Content Trust for image signing and verification using Notary.' },
            { title: 'Terraform Security Scanning', url: 'https://developer.hashicorp.com/terraform/cloud-docs/integrations', sourceName: 'Terraform Documentation', resourceType: 'reference', relationship: 'Terraform Cloud integration documentation covering policy-as-code and security scanning for infrastructure.' }
          ],
          quiz: {
            prompt: 'Your organization requires all container images deployed to production to have a Software Bill of Materials attached. Which CI/CD pipeline step correctly generates and attaches an SBOM?',
            options: [
              'Run npm audit after the build and save the output as an artifact',
              'Use Syft to generate a CycloneDX SBOM during the Docker build and attach it with Cosign attest',
              'Run docker inspect on the built image and save the metadata as JSON',
              'Use Trivy to scan the image and export the vulnerability report as the SBOM'
            ],
            answerIndex: 1,
            explanation: 'Syft generates a comprehensive SBOM listing all packages in the image. Cosign attest attaches the SBOM as a signed attestation to the image, creating a verifiable record. npm audit only covers Node.js dependencies. docker inspect shows metadata, not dependencies. Trivy produces a vulnerability report, not a complete dependency inventory.'
          }
        }
      ]
    },
    {
      slug: 'infrastructure-as-code-terraform-gitops',
      stage: 'Advanced',
      title: 'Infrastructure as Code, Terraform & GitOps',
      description: 'Designing production infrastructure with Terraform, implementing GitOps workflows with Argo CD, and building observability stacks for operational excellence.',
      topics: [
        {
          slug: 'terraform-engineering',
          title: 'Terraform Module Design & State Management',
          minutes: 30,
          objectives: [
            'Design modular Terraform configurations using modules, workspaces and provider aliasing for multi-environment management',
            'Configure remote state backends with encryption, state locking and drift detection',
            'Implement Terraform import, moved blocks and state manipulation for existing infrastructure adoption'
          ],
          sections: [
            { heading: 'Module architecture and reusable components', body: 'Terraform modules encapsulate infrastructure patterns into reusable building blocks. A well-designed module exposes a clean interface through variables and outputs while hiding implementation details. Module sources include local paths, Git repositories and the Terraform Registry. Internal modules handle shared patterns like networking, while public modules from the registry (terraform-aws-modules/vpc) provide battle-tested implementations. Variable validation enforces input constraints at plan time. Module versioning follows semantic versioning, and dependency pinning to specific versions prevents breaking changes from propagating unexpectedly.' },
            { heading: 'State management and remote backends', body: 'Terraform state maps real infrastructure to configuration, tracking resource IDs and metadata. Remote backends (S3 with DynamoDB, Azure Blob with lease, GCS with Cloud Storage backend) store state centrally with encryption at rest and state locking to prevent concurrent modifications. State locking uses distributed locks — DynamoDB conditional writes for AWS, native locking for other backends. terraform state commands (mv, rm, import, pull) manipulate state without modifying infrastructure. Drift detection compares actual resource state against configuration to identify manual changes. Regular state audits prevent configuration drift that accumulates silently over months.' },
            { heading: 'Adopting existing infrastructure into Terraform', body: 'Importing existing infrastructure into Terraform is a common migration scenario. terraform import maps existing resources to Terraform-managed state entries. The import block (Terraform 1.5+) provides declarative import with associated configuration. moved blocks rename resources without destroying and recreating them. For large-scale adoption, tools like terraformer import entire AWS accounts or Azure subscriptions. The key challenge is generating initial configuration that matches existing resources — tools like tfautomv automate configuration generation from imported state. Once imported, ongoing management through Terraform ensures infrastructure matches declared configuration.' }
          ],
          links: [
            { title: 'Terraform Documentation', url: 'https://developer.hashicorp.com/terraform/docs', sourceName: 'Terraform Documentation', resourceType: 'reference', relationship: 'Official Terraform documentation covering configuration language, providers, state and modules.' },
            { title: 'Terraform Registry', url: 'https://registry.terraform.io/', sourceName: 'Terraform Documentation', resourceType: 'reference', relationship: 'Terraform Registry for discovering, using and publishing Terraform modules and providers.' },
            { title: 'AWS Provider Documentation', url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs', sourceName: 'AWS Documentation', resourceType: 'reference', relationship: 'Terraform AWS provider documentation covering resource types, data sources and configuration.' }
          ],
          quiz: {
            prompt: 'Your team manages 50 Terraform resources across 3 environments. After a colleague runs terraform apply on the staging workspace, they realize they were in the wrong terminal and applied to production. What is the primary safeguard that should have prevented this?',
            options: [
              'Using terraform plan before apply to review changes',
              'Separate state files per workspace with distinct backend configurations and approval gates',
              'Implementing a --target flag to limit changes to specific resources',
              'Using terraform fmt to ensure consistent formatting before apply'
            ],
            answerIndex: 1,
            explanation: 'Separate workspaces with distinct backend configurations (different state files, S3 buckets or databases) prevent accidental cross-environment modifications. terraform plan helps but does not prevent wrong-workspace execution. Targeting specific resources does not prevent workspace misselection. Formatting is unrelated to safety.'
          }
        },
        {
          slug: 'gitops-argocd',
          title: 'GitOps Workflows with Argo CD',
          minutes: 30,
          objectives: [
            'Implement GitOps principles using Argo CD for declarative, version-controlled Kubernetes deployments',
            'Configure Argo CD Applications, ApplicationSets and Projects for multi-cluster and multi-tenant management',
            'Design GitOps promotion workflows with manual approval gates, automated testing and rollback procedures'
          ],
          sections: [
            { heading: 'GitOps principles and Argo CD architecture', body: 'GitOps uses Git as the single source of truth for declarative infrastructure and application configuration. Argo CD continuously monitors Git repositories and synchronizes cluster state to match the declared configuration. The Application CRD defines which Git repository, path and branch to sync, along with the target cluster and namespace. ApplicationSets generate Applications dynamically using generators (cluster, list, git directory) for managing the same application across multiple clusters. Argo CD\'s diff engine shows exactly what changes will be applied before synchronization, providing transparency and audit trails for every deployment.' },
            { heading: 'Multi-cluster and multi-tenant management', body: 'Argo CD Projects define boundaries for what Applications can do: which repositories, clusters and namespaces they can access and what resource types they can manage. This enables platform teams to provide self-service deployment capabilities while maintaining guardrails. Cluster generators in ApplicationSets automatically deploy to every registered cluster — useful for edge computing and multi-region architectures. Image updater automates container image version updates in Git by monitoring registries and committing new tags. Multi-tenancy is achieved through Projects that isolate tenant resources, quotas and RBAC within shared clusters.' },
            { heading: 'Promotion workflows and progressive delivery', body: 'GitOps promotion workflows define how code changes flow from development to production. A typical flow commits to main, deploys to staging automatically, runs integration tests, then opens a pull request for production promotion. Argo CD supports manual sync triggers for production with automated sync for lower environments. Progressive delivery tools like Argo Rollouts extend this with canary and blue-green deployments managed through custom resource definitions. Rollout steps define traffic shifting percentages, analysis queries against Prometheus metrics and automatic rollback on failure. This creates a fully auditable, automated deployment pipeline driven entirely by Git operations.' }
          ],
          links: [
            { title: 'Argo CD Documentation', url: 'https://argo-cd.readthedocs.io/en/stable/', sourceName: 'Kubernetes Documentation', resourceType: 'reference', relationship: 'Argo CD official documentation covering installation, configuration and GitOps workflow implementation.' },
            { title: 'GitHub Actions for GitOps', url: 'https://docs.github.com/en/actions/deploying/deploying-with-kubernetes', sourceName: 'GitHub Documentation', resourceType: 'guide', relationship: 'GitHub Actions guide on deploying to Kubernetes using kubectl and Argo CD in CI/CD workflows.' },
            { title: 'Terraform Cloud with GitOps', url: 'https://developer.hashicorp.com/terraform/cloud-docs/vcs', sourceName: 'Terraform Documentation', resourceType: 'guide', relationship: 'Terraform Cloud VCS integration documentation for triggering runs from Git repository changes.' }
          ],
          quiz: {
            prompt: 'Your Argo CD Application is configured to sync from the main branch. A developer pushes a broken Kubernetes manifest that creates a Pod with an invalid image reference. What is the expected Argo CD behavior?',
            options: [
              'Argo CD automatically rolls back to the previous known-good state',
              'Argo CD attempts synchronization, the Pod fails to start, and the Application enters a Degraded state',
              'Argo CD blocks the synchronization entirely because the manifest fails validation',
              'Argo CD ignores the change and continues running the previous version without notification'
            ],
            answerIndex: 1,
            explanation: 'Argo CD applies the manifest (the manifest itself is valid YAML), but the resulting Pod fails to start due to the invalid image reference. Argo CD detects the health check failure and marks the Application as Degraded. Automatic rollback requires sync waves and health checks configured in the Application or use of Argo Rollouts.'
          }
        },
        {
          slug: 'monitoring-observability-incident-response',
          title: 'Monitoring, Observability & Incident Response',
          minutes: 30,
          objectives: [
            'Build observability stacks with Prometheus, Grafana and the OpenTelemetry collector for metrics, logs and traces',
            'Design actionable alerting strategies that reduce noise while catching critical issues early',
            'Implement incident response runbooks and post-incident review processes for operational excellence'
          ],
          sections: [
            { heading: 'The three pillars of observability', body: 'Observability is the ability to understand system internal state from external outputs. Metrics provide numerical time-series data: request rates, error rates and latency percentiles (the RED method). Logs provide detailed event records with context for debugging specific failures. Traces follow requests through distributed services, identifying latency bottlenecks and failure points. OpenTelemetry provides vendor-neutral instrumentation for all three pillars, exporting data to backends like Prometheus (metrics), Loki or Elasticsearch (logs) and Jaeger or Tempo (traces). The combination enables correlation: a metric spike leads to a trace showing the slow service, which leads to logs showing the specific error.' },
            { heading: 'Alerting strategy and noise reduction', body: 'Effective alerting requires balancing sensitivity (catching real issues) with specificity (avoiding false positives). SRE principles define Service Level Indicators (SLIs) like request latency and error rate, with Service Level Objectives (SLOs) setting acceptable thresholds. Alerts fire when SLOs are at risk, not on arbitrary thresholds. Multi-window multi-burn-rate alerts combine short and long evaluation windows to catch both sudden spikes and gradual degradation. Alert routing through PagerDuty or Opsgenie ensures the right team is notified. Runbooks attached to alerts provide immediate context for on-call engineers. Alert hygiene — regular review and pruning of noisy alerts — prevents alert fatigue.' },
            { heading: 'Incident response and post-incident culture', body: 'Incident response follows structured phases: detection, triage, mitigation, resolution and post-incident review. Detection uses alerting and synthetic monitoring. Triage identifies impact scope and assigns an incident commander. Mitigation prioritizes restoring service over root cause analysis — rollbacks, traffic shifting or feature flag disabling. Resolution fixes the underlying issue. Post-incident reviews (blameless postmortems) analyze systemic factors, not individual mistakes. Action items from reviews drive infrastructure improvements: better monitoring, defensive coding, architecture changes. The goal is organizational learning, not punishment. Teams with mature incident response practices resolve incidents faster over time.' }
          ],
          links: [
            { title: 'Prometheus Documentation', url: 'https://prometheus.io/docs/introduction/overview/', sourceName: 'Kubernetes Documentation', resourceType: 'reference', relationship: 'Prometheus official documentation on time-series database, PromQL query language and alerting rules.' },
            { title: 'Grafana Documentation', url: 'https://grafana.com/docs/', sourceName: 'Kubernetes Documentation', resourceType: 'reference', relationship: 'Grafana documentation on dashboard creation, data source configuration and alerting.' },
            { title: 'GitHub Actions for Monitoring Deployment', url: 'https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing', sourceName: 'GitHub Documentation', resourceType: 'guide', relationship: 'GitHub Actions guide on building, testing and deploying monitoring configurations as code.' }
          ],
          quiz: {
            prompt: 'Your Grafana dashboard shows a spike in HTTP 5xx errors from 0.1% to 5% over the last 15 minutes. Prometheus alerts are not firing because the alert threshold is set at 10%. What is the most effective immediate action?',
            options: [
              'Wait for the error rate to exceed 10% before taking action',
              'Lower the alert threshold to 2% to catch this class of issue earlier',
              'Check the recently deployed version, correlate the spike with the deployment time and prepare a rollback',
              'Restart the affected services to clear the error state'
            ],
            answerIndex: 2,
            explanation: 'The error spike correlates with a deployment. Checking the deployment timeline and preparing a rollback addresses the root cause immediately. Waiting for a higher threshold delays response. Lowering the threshold helps for future incidents but does not address the current one. Restarting services may mask the issue temporarily without fixing it.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'End-to-End CI/CD Pipeline & Kubernetes Deployment',
    coverage: [
      'Docker Image Build & Registry Management',
      'Kubernetes Deployment & Helm Chart Packaging',
      'CI/CD Pipeline with Jenkins or GitHub Actions',
      'Infrastructure Provisioning with Terraform',
      'Monitoring, Alerting & Incident Response Setup'
    ],
    brief:
      'You are the DevOps Engineer at PipelineOps Solutions tasked with building the complete delivery infrastructure for a new microservices-based e-commerce platform. The platform consists of three services (API gateway, product service, order service) that must be containerized, deployed on Kubernetes and managed through a fully automated CI/CD pipeline. Infrastructure must be provisioned with Terraform and monitored with Prometheus and Grafana. Deliver a production-ready GitOps workflow that enables the team to ship code from commit to production in under 30 minutes.',
    requirements: [
      'Write multi-stage Dockerfiles for each microservice with security best practices (non-root user, minimal base image)',
      'Push images to a container registry with automated vulnerability scanning and image signing',
      'Create a Helm chart that deploys all three services with configurable values for staging and production',
      'Design a CI/CD pipeline that builds, tests, scans, packages and deploys on every merge to main',
      'Provision the Kubernetes cluster and supporting infrastructure (registry, monitoring stack) with Terraform modules',
      'Configure Prometheus alerting rules for error rates, latency SLOs and resource exhaustion',
      'Build Grafana dashboards showing RED metrics for each service and cluster health',
      'Document the incident response runbook for the top 3 failure scenarios'
    ],
    expectedOutput:
      'A complete DevOps infrastructure repository: Dockerfiles, Helm charts, CI/CD pipeline configurations, Terraform modules with remote state, Prometheus alerting rules, Grafana dashboard JSON and incident response runbooks.',
    rubric: [
      { skill: 'Containerization', weight: 20, criteria: 'Dockerfiles use multi-stage builds, run as non-root, pin base image versions and include .dockerignore' },
      { skill: 'Kubernetes & Helm', weight: 20, criteria: 'Helm charts are parameterized, include resource limits, health checks, network policies and support multiple environments' },
      { skill: 'CI/CD Pipeline', weight: 20, criteria: 'Pipeline automates build, test, scan, sign and deploy with quality gates, secrets management and rollback capability' },
      { skill: 'Infrastructure as Code', weight: 20, criteria: 'Terraform modules are reusable, use remote state with locking, implement variable validation and follow naming conventions' },
      { skill: 'Observability', weight: 10, criteria: 'Prometheus alerts use SLO-based thresholds, Grafana dashboards show RED metrics and runbooks are actionable' },
      { skill: 'Documentation', weight: 10, criteria: 'Architecture decisions documented, runbooks cover common failures, onboarding guide enables new team members' }
    ],
    passScore: 75
  },

  assignments: [
    {
      title: 'Docker Containerization & Registry Workflow',
      stage: 'Beginner',
      objective: 'Containerize an existing application using multi-stage Dockerfiles, push images to a container registry and implement automated vulnerability scanning in a CI pipeline.',
      requirements: [
        'Write a multi-stage Dockerfile that builds and packages a Node.js or Python application',
        'Configure .dockerignore to exclude unnecessary files from the build context',
        'Set up a container registry (Docker Hub, ghcr.io or ECR) and push the image with semantic version tags',
        'Integrate Trivy or Snyk vulnerability scanning into the build pipeline with failure on critical findings',
        'Document the image build process, tag naming convention and scanning results'
      ],
      skillsEvaluated: ['Docker', 'Container Registry', 'CI/CD Integration', 'Security Scanning'],
      dueDays: 10,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the Dockerfile, .dockerignore, CI pipeline configuration and evidence of a successful build, push and scan.',
        textLabel: 'Containerization workflow report',
        minTextLength: 1000,
        linkLabels: ['Dockerfile, pipeline config and scan results']
      }
    },
    {
      title: 'Kubernetes Deployment with Helm & Autoscaling',
      stage: 'Intermediate',
      objective: 'Create a Helm chart that deploys a multi-service application on Kubernetes with autoscaling, health checks and environment-specific configurations.',
      requirements: [
        'Design a Helm chart with templates for Deployments, Services, ConfigMaps and Ingress',
        'Create values files for staging and production with appropriate resource limits and replica counts',
        'Configure Horizontal Pod Autoscaler with CPU and memory-based scaling policies',
        'Implement liveness and readiness probes for each service',
        'Set up a CI pipeline that lints, templates and dry-runs the Helm chart before deployment'
      ],
      skillsEvaluated: ['Kubernetes', 'Helm', 'Autoscaling', 'CI/CD Pipeline Design'],
      dueDays: 18,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the Helm chart repository, environment-specific values files, HPA configuration, pipeline definition and evidence of successful deployment to a Kubernetes cluster.',
        textLabel: 'Kubernetes Helm deployment report',
        minTextLength: 1200,
        linkLabels: ['Helm chart, values files and deployment evidence']
      }
    },
    {
      title: 'Terraform Infrastructure Module for Multi-Cloud Deployment',
      stage: 'Advanced',
      objective: 'Build a Terraform module that provisions a complete application environment (networking, compute, database, monitoring) across AWS and Azure with remote state and CI/CD-driven workflow.',
      requirements: [
        'Create reusable Terraform modules for VPC/VNet, compute, database and monitoring resources',
        'Implement provider aliasing to deploy the same module to AWS and Azure',
        'Configure remote state backend with encryption, state locking and workspace separation',
        'Build a CI/CD pipeline that runs terraform plan on pull requests and terraform apply on merge',
        'Implement Sentinel or OPA policies that enforce tagging, encryption and instance size constraints'
      ],
      skillsEvaluated: ['Terraform', 'Multi-Cloud Architecture', 'Policy as Code', 'GitOps Workflow'],
      dueDays: 25,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the Terraform module repository with CI/CD pipeline, policy configurations, documentation and evidence of successful provisioning across both cloud providers.',
        textLabel: 'Multi-cloud Terraform automation report',
        minTextLength: 1500,
        linkLabels: ['Terraform repository, pipeline config, policy files and provisioning evidence']
      }
    }
  ],

  simTasks: [
    {
      title: 'Production Kubernetes cluster running out of node capacity',
      context: 'Your EKS cluster serving the production checkout and payment services has all nodes at 90% CPU utilization. New Pods are stuck in Pending state with scheduling failures. The Horizontal Pod Autoscaler wants to scale up but cannot place new Pods. Alert: 15% of checkout requests are timing out. The deployment deadline for a Black Friday feature is tomorrow and the Node group was recently changed from m5.xlarge to m5.large to save costs.',
      requirements: [
        'Identify why nodes are at capacity and confirm the recent node type change reduced available resources',
        'Scale up the node group to add capacity immediately to restore service',
        'Adjust HPA settings and resource requests to prevent future capacity exhaustion',
        'Investigate whether the Black Friday feature deployment is necessary tonight or can be delayed',
        'Document the capacity planning failure and propose a resource quota policy'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Cluster capacity restored, checkout service recovered, node group scaled up, resource quotas configured and post-incident capacity planning documented.',
      skills: ['Kubernetes Capacity Planning', 'Node Group Management', 'HPA Configuration', 'Incident Response']
    },
    {
      title: 'Terraform state lock preventing all infrastructure changes',
      context: 'A Terraform apply failed mid-execution and left the state locked. The error message reads "Error: Error locking state: ConditionalCheckFailedException". No team member can run terraform plan or apply. The last successful apply provisioned a new RDS instance that is now running in production but not in the state file. The team needs to make an emergency security group change within the hour.',
      requirements: [
        'Diagnose the state lock issue and safely release the lock using terraform force-unlock',
        'Import the RDS instance that was created outside the lock into the Terraform state',
        'Verify the state accurately reflects the actual infrastructure before making changes',
        'Apply the emergency security group change through Terraform',
        'Implement safeguards to prevent state lock issues from blocking future deployments'
      ],
      priority: 'high',
      dueDayOffset: 1,
      expectedOutput: 'State lock resolved, RDS instance imported, security group change applied, state verified accurate, lock recovery process documented.',
      skills: ['Terraform State Management', 'State Lock Recovery', 'Infrastructure Import', 'Emergency Change Management']
    },
    {
      title: 'Jenkins shared library breaking all downstream pipelines',
      context: 'A developer merged a change to the Jenkins shared library that modified the deployToProduction() function. All 12 microservice pipelines that import this library started failing on their next run. The change added a new mandatory parameter that existing Jenkinsfiles do not provide. Three pipelines had scheduled production deployments in the next 2 hours. The shared library has no tests and no version pinning.',
      requirements: [
        'Identify the breaking change in the shared library by reviewing the recent commit',
        'Pin all pipelines to the last known-good version of the shared library immediately',
        'Roll back the shared library change and verify all pipelines recover',
        'Add a testing framework and version pinning policy to the shared library',
        'Set up a CI pipeline for the shared library itself to prevent future breakages'
      ],
      priority: 'high',
      dueDayOffset: 2,
      expectedOutput: 'All pipelines recovered, shared library rolled back, version pinning enforced, shared library CI pipeline created, testing framework implemented.',
      skills: ['Jenkins Shared Libraries', 'Pipeline Recovery', 'CI/CD Governance', 'Change Impact Analysis']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Priya Sharma',
      personaRole: 'Engineering Manager',
      situation: 'The engineering manager wants to adopt Kubernetes for all new services but the team has no Kubernetes experience and the current Docker Compose setup works for existing services.',
      openingMessage:
        'Leadership wants us to move everything to Kubernetes within 6 months. The team is excited but anxious — nobody has production Kubernetes experience. We currently use Docker Compose for our staging and production environments. How do we approach this migration without breaking what works?',
      expectedPoints: [
        'Acknowledges the benefits of Kubernetes for scaling and orchestration while validating concerns about the learning curve',
        'Proposes a phased migration starting with one low-risk service as a pilot to build team expertise',
        'Recommends investing in Kubernetes training and certification before attempting production migration',
        'Suggests running Docker Compose and Kubernetes side-by-side during transition using a service mesh or API gateway'
      ]
    },
    {
      kind: 'team',
      personaName: 'Alex Chen',
      personaRole: 'Security Engineer',
      situation: 'The security team wants all container images to be scanned and signed before deployment, but the current CI pipeline only scans on merge and does not sign images.',
      openingMessage:
        'Our vulnerability scanning only runs after code is merged to main. We found 3 critical CVEs in production images last month that were caught too late. Additionally, we have no way to verify that the image running in production is the exact image that was built by CI. We need to fix both issues urgently.',
      expectedPoints: [
        'Agrees that post-merge scanning is too late and proposes moving vulnerability scanning to the pull request stage',
        'Recommends implementing Cosign for image signing with keyless signing using OIDC identity',
        'Proposes adding an SBOM generation step to the pipeline for complete dependency visibility',
        'Suggests configuring admission controllers (Kyverno or OPA Gatekeeper) to reject unsigned or vulnerable images'
      ]
    },
    {
      kind: 'client',
      personaName: 'David Okafor',
      personaRole: 'CTO, FinServ Technologies',
      situation: 'The client operates a financial services platform that requires SOC 2 compliance and wants to modernize their deployment process from manual SSH-based deployments to automated CI/CD.',
      openingMessage:
        'We currently deploy to production by SSH-ing into servers and running shell scripts. Our auditors flagged this as a SOC 2 violation — no audit trail, no access control, no rollback capability. We need a fully automated deployment pipeline with complete audit logging within 4 months. Budget is $150,000 for tooling and consulting.',
      expectedPoints: [
        'Proposes a CI/CD pipeline that eliminates direct SSH access to production servers entirely',
        'Designs a pipeline with approval gates, audit logging and deployment history for SOC 2 evidence',
        'Recommends infrastructure as code to ensure reproducible environments and eliminate configuration drift',
        'Addresses rollback capability through automated canary deployments with health check validation'
      ]
    },
    {
      kind: 'client',
      personaName: 'Sofia Martinez',
      personaRole: 'VP of Platform Engineering, GameScale',
      situation: 'The client operates a gaming platform that needs to handle 10x traffic spikes during game launches while maintaining sub-50ms API response times.',
      openingMessage:
        'Every time we launch a new game title, traffic spikes to 10x normal within minutes. Our current static infrastructure cannot scale fast enough — last launch resulted in 45 minutes of downtime. We need an infrastructure that auto-scales in minutes, not hours, while keeping API latency under 50ms even during peak load. We run on AWS with Kubernetes.',
      expectedPoints: [
        'Designs a Kubernetes Cluster Autoscaler configuration that provisions new nodes in under 3 minutes',
        'Implements HPA with custom metrics based on connection count and queue depth for gaming workloads',
        'Proposes pre-warming node pools before scheduled launches based on historical traffic patterns',
        'Recommends a CDN and edge caching strategy to offload static game assets from the cluster'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'A GitHub Actions workflow that deploys to production is failing with a "rate limit exceeded" error from the container registry. The workflow ran successfully 30 minutes ago. Three teams are blocked from deploying their services. The registry is Docker Hub and the account has a Pro plan with a 200 pull/6 hour rate limit.',
      requiredActions: [
        { action: 'Check Docker Hub rate limit dashboard to determine if the limit is genuinely exhausted or if the error is transient', good: true, note: 'Understanding whether this is a rate limit issue or a transient error determines the remediation approach.' },
        { action: 'Migrate image pulls to a mirror or cache (GitHub Container Registry, ECR pull-through cache) to avoid Docker Hub limits', good: true, note: 'Pull-through caches on ECR or using ghcr.io eliminates Docker Hub rate limits for CI/CD workloads.' },
        { action: 'Re-run the failing workflow immediately to see if it resolves the issue', good: false, note: 'Re-running a workflow that hit a rate limit will fail again immediately since the rate limit window has not expired.' },
        { action: 'Configure a Docker Hub access token with higher rate limits for CI/CD systems', good: true, note: 'Authenticated Docker Hub pulls have higher rate limits than anonymous pulls, extending the available capacity.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'The company is acquiring a startup that runs infrastructure on GCP while the company runs on AWS. The CTO wants both environments unified under a single Terraform management structure within 3 months. The startup uses Terraform but with an outdated version and no remote state backend.',
      requiredActions: [
        { action: 'Inventory all existing Terraform resources across both environments and document the current state of each', good: true, note: 'Understanding what exists is the first step before planning any migration or unification.' },
        { action: 'Upgrade the startup\'s Terraform configurations to the current version and migrate to a remote state backend', good: true, note: 'Outdated Terraform versions and local state are blockers that must be resolved before integration.' },
        { action: 'Create a unified module structure that works across both AWS and GCP providers with provider aliasing', good: true, note: 'Module abstraction allows consistent patterns while respecting provider-specific resource differences.' },
        { action: 'Merge both teams\' Terraform repositories into a single monorepo immediately to establish a single source of truth', good: false, note: 'Merging repositories without first standardizing versions, state management and naming conventions creates chaos and blocks both teams.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between Docker containers and Kubernetes Pods. When would you use a Pod with multiple containers versus multiple single-container Pods?',
      guidancePoints: [
        'A container is an isolated process with its own filesystem, network and process space managed by Docker',
        'A Pod is a Kubernetes abstraction that groups one or more containers that share network namespace and storage volumes',
        'Multi-container Pods are used for sidecar patterns (log shipping, service mesh proxy), ambassador patterns and adapter patterns',
        'Single-container Pods are the default for most workloads and are simpler to manage, scale and debug',
        'Consider shared filesystem needs — containers in a Pod can communicate via localhost and share emptyDir volumes'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'Design a zero-downtime deployment strategy for a microservice running on Kubernetes. How do you handle database schema migrations that break backward compatibility?',
      guidancePoints: [
        'Use rolling updates with readiness probes to ensure new Pods are healthy before receiving traffic',
        'Implement a two-phase migration strategy: deploy backward-compatible changes first, then deploy the application version that uses the new schema',
        'Use database migration tools (Flyway, Liquibase) with version-controlled migration scripts',
        'Consider expand-and-contract pattern: add new columns (expand) while keeping old ones, migrate data, then remove old columns (contract)',
        'Rollback strategy should account for both application rollback and database migration rollback'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Your Kubernetes cluster is experiencing intermittent pod evictions with "DiskPressure" node conditions, but kubectl top nodes shows only 60% disk usage. Pods with local ephemeral storage are affected. How do you diagnose and resolve this?',
      guidancePoints: [
        'Check kubelet eviction thresholds — the default hard eviction threshold for nodefs.available is 10%, not actual 100% usage',
        'Examine which Pods are using the most ephemeral storage with kubectl top pods --sort-by=storage',
        'Check for large log files in /var/log/containers or /var/lib/docker/containers from previous crashes',
        'Implement ephemeral storage requests and limits in Pod specifications to prevent unbounded disk consumption',
        'Consider using persistent volumes instead of ephemeral storage for stateful workloads'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A Terraform apply fails with "Error: Provider produced inconsistent result after apply" for an AWS Lambda function. The function exists in the AWS console but Terraform cannot refresh its state. How do you resolve this?',
      guidancePoints: [
        'Check if the Lambda function was modified outside Terraform — manual console changes cause state drift',
        'Try terraform refresh to update the state file with actual resource attributes from AWS',
        'If refresh fails, use terraform import to re-import the function with the correct resource address',
        'Investigate if the Lambda function uses features not yet supported by the current provider version',
        'After resolving, implement drift detection in CI to catch future manual changes'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'Your organization wants to implement canary deployments for all microservices. Some service owners are resistant because they believe canary deployments add too much complexity. How do you address this concern?',
      guidancePoints: [
        'Acknowledge the complexity concern — canary deployments do add operational overhead for traffic management',
        'Present concrete examples where canary deployments would have caught issues before full rollout, referencing past incidents',
        'Propose a gradual rollout: implement canary for one high-risk service first and demonstrate the value',
        'Offer to build the canary infrastructure as a shared platform service so individual teams do not bear the implementation burden',
        'Measure and share metrics: mean time to detection of regressions before and after canary adoption'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you decide between using a managed Kubernetes service (EKS, AKS, GKE) versus self-managed Kubernetes on EC2 instances? What factors influence this decision?',
      guidancePoints: [
        'Managed services handle control plane management, upgrades and patching — reducing operational burden for small teams',
        'Self-managed offers full control over Kubernetes version, add-ons and node configuration for specialized workloads',
        'Cost analysis: managed services have per-cluster fees but reduce engineering time; self-managed has lower infrastructure cost but higher operational cost',
        'Security requirements: some compliance frameworks require control over the entire stack including the control plane',
        'Team expertise: small teams benefit more from managed services while large platform teams may prefer self-management'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain to a development team why their feature cannot be deployed directly to production and must go through the CI/CD pipeline. The team argues that the pipeline adds 15 minutes to every deployment.',
      guidancePoints: [
        'Validate their frustration — 15 minutes is a meaningful delay for rapid iteration cycles',
        'Explain what the pipeline provides: automated testing catches bugs before users see them, security scanning prevents vulnerabilities and audit logs satisfy compliance',
        'Quantify the risk: share data on incidents caused by manual deployments in the past 6 months',
        'Propose optimizations: parallel test execution, incremental builds and cached dependencies can reduce pipeline time to under 5 minutes',
        'Offer a fast-track pipeline for hotfixes that runs a minimal subset of checks'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'You need to present a proposal to the CTO to invest $200,000 in a platform engineering initiative that will build an internal developer platform with self-service deployment capabilities. The expected outcome is that developer deployment frequency increases from weekly to daily.',
      guidancePoints: [
        'Open with the business impact: daily deployments mean features reach customers 7x faster',
        'Quantify the cost of current state: developer time spent on manual deployment tasks, incident costs from manual errors and delayed time-to-market',
        'Break down the $200,000 investment: infrastructure costs, tooling licenses and engineering time with clear timeline',
        'Show comparable metrics from industry benchmarks: elite DevOps teams deploy multiple times per day',
        'Propose a phased approach with a pilot on one team to validate the investment before full rollout'
      ]
    }

  ]

}
