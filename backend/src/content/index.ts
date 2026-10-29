import type { CareerDef } from './framework.js'
import { validateCareer } from './framework.js'
import { webDesigner } from './careers/web-designer.js'
import { frontendDeveloper } from './careers/frontend-developer.js'
import { backendDeveloper } from './careers/backend-developer.js'
import { fullStackDeveloper } from './careers/full-stack-developer.js'
import { reactDeveloper } from './careers/react-developer.js'
import { nodejsDeveloper } from './careers/nodejs-developer.js'
import { wordpressDeveloper } from './careers/wordpress-developer.js'
import { ecommerceDeveloper } from './careers/ecommerce-developer.js'
import { androidDeveloper } from './careers/android-developer.js'
import { iosDeveloper } from './careers/ios-developer.js'
import { flutterDeveloper } from './careers/flutter-developer.js'
import { reactNativeDeveloper } from './careers/react-native-developer.js'
import { aiEngineer } from './careers/ai-engineer.js'
import { generativeAiDeveloper } from './careers/generative-ai-developer.js'
import { machineLearningEngineer } from './careers/machine-learning-engineer.js'
import { deepLearningEngineer } from './careers/deep-learning-engineer.js'
import { nlpEngineer } from './careers/nlp-engineer.js'
import { computerVisionEngineer } from './careers/computer-vision-engineer.js'
import { dataScientist } from './careers/data-scientist.js'
import { dataAnalyst } from './careers/data-analyst.js'
import { dataEngineer } from './careers/data-engineer.js'
import { biDeveloper } from './careers/bi-developer.js'
import { databaseAdministrator } from './careers/database-administrator.js'
import { cybersecurityAnalyst } from './careers/cybersecurity-analyst.js'
import { socAnalyst } from './careers/soc-analyst.js'
import { penetrationTester } from './careers/penetration-tester.js'
import { securityEngineer } from './careers/security-engineer.js'
import { cloudSecurityEngineer } from './careers/cloud-security-engineer.js'
import { networkEngineer } from './careers/network-engineer.js'
import { networkAdministrator } from './careers/network-administrator.js'
import { itSupportSpecialist } from './careers/it-support-specialist.js'
import { hardwareSupportSpecialist } from './careers/hardware-support-specialist.js'
import { systemAdministrator } from './careers/system-administrator.js'
import { cloudEngineer } from './careers/cloud-engineer.js'
import { devopsEngineer } from './careers/devops-engineer.js'
import { siteReliabilityEngineer } from './careers/site-reliability-engineer.js'
import { qaEngineer } from './careers/qa-engineer.js'
import { automationTester } from './careers/automation-tester.js'
import { uiDesigner } from './careers/ui-designer.js'
import { uxDesigner } from './careers/ux-designer.js'
import { productDesigner } from './careers/product-designer.js'
import { digitalArtist } from './careers/digital-artist.js'
import { twoDArtistIllustrator } from './careers/2d-artist-illustrator.js'
import { threeDArtist } from './careers/3d-artist.js'
import { motionDesigner } from './careers/motion-designer.js'
import { videoEditor } from './careers/video-editor.js'
import { gameDeveloper } from './careers/game-developer.js'
import { gameDesigner } from './careers/game-designer.js'
import { digitalMarketingSpecialist } from './careers/digital-marketing-specialist.js'
import { technicalWriter } from './careers/technical-writer.js'

/**
 * All authored career definitions, in catalog order.
 * Careers are added here as their curriculum files are completed.
 */
const AUTHORED_CAREERS: CareerDef[] = [
  webDesigner,
  frontendDeveloper,
  backendDeveloper,
  fullStackDeveloper,
  reactDeveloper,
  nodejsDeveloper,
  wordpressDeveloper,
  ecommerceDeveloper,
  androidDeveloper,
  iosDeveloper,
  flutterDeveloper,
  reactNativeDeveloper,
  aiEngineer,
  generativeAiDeveloper,
  machineLearningEngineer,
  deepLearningEngineer,
  nlpEngineer,
  computerVisionEngineer,
  dataScientist,
  dataAnalyst,
  dataEngineer,
  biDeveloper,
  databaseAdministrator,
  cybersecurityAnalyst,
  socAnalyst,
  penetrationTester,
  securityEngineer,
  cloudSecurityEngineer,
  networkEngineer,
  networkAdministrator,
  itSupportSpecialist,
  hardwareSupportSpecialist,
  systemAdministrator,
  cloudEngineer,
  devopsEngineer,
  siteReliabilityEngineer,
  qaEngineer,
  automationTester,
  uiDesigner,
  uxDesigner,
  productDesigner,
  digitalArtist,
  twoDArtistIllustrator,
  threeDArtist,
  motionDesigner,
  videoEditor,
  gameDeveloper,
  gameDesigner,
  digitalMarketingSpecialist,
  technicalWriter
]

export function getAuthoredCareers(): CareerDef[] {
  const sorted = [...AUTHORED_CAREERS].sort((a, b) => a.order - b.order)
  for (const c of sorted) validateCareer(c)
  return sorted
}

export * from './framework.js'
export { CAREER_CATALOG, CAREER_CATEGORIES, CAREER_SOURCE_PLATFORMS } from './catalog.js'
export type { CareerCatalogEntry } from './catalog.js'
