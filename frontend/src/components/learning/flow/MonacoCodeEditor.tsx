import Editor from '@monaco-editor/react'
import './monacoSetup'

interface MonacoCodeEditorProps {
  value: string
  language: string
  onChange: (value: string) => void
}

/**
 * Monaco is intentionally isolated in this module and loaded with React.lazy
 * by the practical exam workspace. The exam brief renders immediately while
 * the editor chunk streams in; the parent reserves the editor height so the
 * late arrival cannot shift the layout.
 */
export default function MonacoCodeEditor({
  value,
  language,
  onChange
}: MonacoCodeEditorProps): React.JSX.Element {
  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      onChange={(next) => onChange(next ?? '')}
      theme="career-lab"
      loading={
        <div className="flex h-full items-center justify-center text-sm text-primary/50" role="status">
          Loading code editor…
        </div>
      }
      beforeMount={(instance) => {
        instance.editor.defineTheme('career-lab', {
          base: 'vs',
          inherit: true,
          rules: [
            { token: 'comment', foreground: '7b8f85', fontStyle: 'italic' },
            { token: 'keyword', foreground: 'a34f2a' },
            { token: 'string', foreground: '2f6b52' },
            { token: 'number', foreground: 'b05a2b' },
            { token: 'type', foreground: '3f6f62' }
          ],
          colors: {
            'editor.background': '#fffdf7',
            'editor.foreground': '#173f35',
            'editorLineNumber.foreground': '#b7ab97',
            'editorLineNumber.activeForeground': '#6f7f76',
            'editor.selectionBackground': '#e76f3c26',
            'editor.inactiveSelectionBackground': '#e76f3c14',
            'editor.lineHighlightBackground': '#173f3508',
            'editorCursor.foreground': '#e76f3c',
            'editorIndentGuide.background1': '#ddd2bd66',
            'editorIndentGuide.activeBackground1': '#c0b39d',
            'editorWidget.background': '#fffdf7',
            'editorWidget.border': '#ddd2bd',
            'editorSuggestWidget.background': '#fffdf7',
            'editorSuggestWidget.border': '#ddd2bd',
            'editorGutter.background': '#fffdf7'
          }
        })
      }}
      options={{
        automaticLayout: true,
        fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace",
        fontSize: 13,
        lineHeight: 21,
        minimap: { enabled: false },
        wordWrap: 'on',
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        tabSize: 2,
        padding: { top: 12, bottom: 12 },
        renderLineHighlight: 'line',
        overviewRulerBorder: false,
        hideCursorInOverviewRuler: true,
        scrollbar: {
          verticalScrollbarSize: 0,
          horizontalScrollbarSize: 0,
          useShadows: false
        }
      }}
    />
  )
}
