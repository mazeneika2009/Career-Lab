import Editor from '@monaco-editor/react'
import './monacoSetup'

interface MonacoCodeEditorProps {
  value: string
  language: string
  onChange: (value: string) => void
  path?: string
  theme?: 'light' | 'dark'
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
  onChange,
  path,
  theme = 'light'
}: MonacoCodeEditorProps): React.JSX.Element {
  return (
    <Editor
      height="100%"
      path={path}
      language={language}
      value={value}
      onChange={(next) => onChange(next ?? '')}
      theme={theme === 'dark' ? 'career-lab-dark' : 'career-lab'}
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
        instance.editor.defineTheme('career-lab-dark', {
          base: 'vs-dark',
          inherit: true,
          rules: [
            { token: 'comment', foreground: '8fa39a', fontStyle: 'italic' },
            { token: 'keyword', foreground: 'f0a07a' },
            { token: 'string', foreground: '8fd0a9' },
            { token: 'number', foreground: 'f3b27a' },
            { token: 'type', foreground: '7fc6b1' }
          ],
          colors: {
            'editor.background': '#0f1a17',
            'editor.foreground': '#d8e5df',
            'editorLineNumber.foreground': '#52665e',
            'editorLineNumber.activeForeground': '#a9bfb5',
            'editor.selectionBackground': '#e76f3c40',
            'editor.inactiveSelectionBackground': '#e76f3c20',
            'editor.lineHighlightBackground': '#ffffff08',
            'editorCursor.foreground': '#e76f3c',
            'editorIndentGuide.background1': '#2c3d3666',
            'editorIndentGuide.activeBackground1': '#3b5148',
            'editorWidget.background': '#14211d',
            'editorWidget.border': '#2a3a34',
            'editorSuggestWidget.background': '#14211d',
            'editorSuggestWidget.border': '#2a3a34',
            'editorGutter.background': '#0f1a17'
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
