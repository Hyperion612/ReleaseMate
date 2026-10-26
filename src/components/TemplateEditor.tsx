import { useState } from 'react';
import { Code, Copy, Check, RotateCcw } from 'lucide-react';
import { templateVariables, defaultTemplate } from '../data';

interface TemplateEditorProps {
  template: string;
  onSave: (template: string) => void;
}

export default function TemplateEditor({ template, onSave }: TemplateEditorProps) {
  const [content, setContent] = useState(template);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    onSave(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setContent(defaultTemplate);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const insertVariable = (variable: string) => {
    setContent(prev => prev + variable);
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Шаблон постов</h1>
        <p className="text-sm text-gray-400">Jinja2 шаблон для генерации постов</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 p-4 bg-emerald-900/30 border border-emerald-700/30 rounded-xl">
          <Check className="w-5 h-5 text-emerald-400" />
          <span className="text-emerald-300 text-sm font-medium">Шаблон сохранён!</span>
        </div>
      )}

      {/* Editor */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900/50 border-b border-gray-700/50">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-gray-300">template.j2</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-1.5 text-gray-500 hover:text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
              title="Копировать"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 text-gray-500 hover:text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
              title="Сбросить"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={16}
          className="w-full px-4 py-3 bg-transparent text-gray-200 font-mono text-xs leading-relaxed focus:outline-none resize-none"
          spellCheck={false}
        />
      </div>

      {/* Variables */}
      <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Доступные переменные</h3>
        <div className="space-y-1.5">
          {templateVariables.map(v => (
            <button
              key={v.name}
              onClick={() => insertVariable(v.name)}
              className="w-full flex items-center justify-between px-3 py-2 bg-gray-900/30 hover:bg-gray-700/30 rounded-lg transition-colors text-left"
            >
              <code className="text-xs text-purple-300">{v.name}</code>
              <span className="text-xs text-gray-500">{v.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold rounded-xl transition-all"
      >
        💾 Сохранить шаблон
      </button>

      {/* Bot Command */}
      <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
        <p className="text-xs text-gray-400 mb-2 font-medium">💡 Команда бота для установки шаблона:</p>
        <code className="text-xs text-purple-300 bg-gray-900/50 p-2 rounded-lg block">
          /settemplate [ваш шаблон]
        </code>
      </div>
    </div>
  );
}
