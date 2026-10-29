import * as monaco from 'monaco-editor/editor/editor.api'
import { loader } from '@monaco-editor/react'
import editorWorker from 'monaco-editor/editor/editor.worker?worker'
import cssWorker from 'monaco-editor/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/language/typescript/ts.worker?worker'

// Language services (intellisense/validation) used by the curriculum.
import {
  javascriptDefaults,
  typescriptDefaults
} from 'monaco-editor/languages/features/typescript/register'
import 'monaco-editor/languages/features/css/register'
import 'monaco-editor/languages/features/html/register'

// Syntax grammars are registered eagerly but Monaco loads each tokenizer only
// when a model with that language is created. Importing the full
// `monaco-editor` entry would ship every grammar in the initial editor chunk.
import 'monaco-editor/languages/definitions/css/register'
import 'monaco-editor/languages/definitions/html/register'
import 'monaco-editor/languages/definitions/javascript/register'
import 'monaco-editor/languages/definitions/typescript/register'
import 'monaco-editor/languages/definitions/python/register'
import 'monaco-editor/languages/definitions/sql/register'
import 'monaco-editor/languages/definitions/kotlin/register'
import 'monaco-editor/languages/definitions/swift/register'
import 'monaco-editor/languages/definitions/dart/register'
import 'monaco-editor/languages/definitions/java/register'
import 'monaco-editor/languages/definitions/csharp/register'
import 'monaco-editor/languages/definitions/go/register'
import 'monaco-editor/languages/definitions/rust/register'

/**
 * Local Monaco bundle. Loading the editor from a CDN would add a runtime
 * dependency and break offline/self-hosted deployments, so the editor and its
 * language workers are bundled with the app instead.
 */
const scope = self as unknown as {
  MonacoEnvironment?: {
    getWorker: (workerId: string, label: string) => Worker
  }
}

scope.MonacoEnvironment = {
  getWorker(_workerId: string, label: string): Worker {
    switch (label) {
      case 'css':
      case 'scss':
      case 'less':
        return new cssWorker()
      case 'html':
      case 'handlebars':
      case 'razor':
        return new htmlWorker()
      case 'typescript':
      case 'javascript':
        return new tsWorker()
      default:
        return new editorWorker()
    }
  }
}

typescriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: true,
  noSyntaxValidation: false
})
javascriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: true,
  noSyntaxValidation: false
})

loader.config({ monaco })

export { monaco }
