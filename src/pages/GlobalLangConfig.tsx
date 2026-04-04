import React from 'react';
import { Save, AlertCircle } from 'lucide-react';

const configItems = [
  { 
    group: '导航 (Navigation)', 
    keys: ['首页 (Home)', '产品 (Products)', '应用场景 (Scenarios)', '案例 (Cases)', '新闻 (News)', '关于我们 (About)', '联系我们 (Contact)'] 
  },
  { 
    group: '页脚 (Footer)', 
    keys: ['FAQ', '表单提示语 (Form Hint)', '按钮 (Button)', '版权 (Copyright)', '简介 (Intro)'] 
  }
];

export default function GlobalLangConfig() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">全局多语言配置</h1>
          <p className="text-sm text-gray-500 mt-1">手动配置全站固定文字，禁止前端自动翻译覆盖，确保多语言精准度。</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center transition-colors shadow-sm">
          <Save className="w-4 h-4 mr-2" />
          保存全局配置
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start">
        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
        <div className="text-sm text-amber-800">
          <p className="font-bold mb-1">配置说明：</p>
          <p>此处配置的文案将直接应用于网站前端的固定模块（如导航栏、页脚等）。请务必手动填写各语种的准确翻译，系统不会对这些固定字段进行自动机翻，以保证品牌形象和专业度。</p>
        </div>
      </div>

      <div className="space-y-8">
        {configItems.map((section, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900">{section.group}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                    <th className="px-6 py-3 font-semibold w-48">配置项</th>
                    <th className="px-6 py-3 font-semibold">English (EN)</th>
                    <th className="px-6 py-3 font-semibold">中文 (ZH)</th>
                    <th className="px-6 py-3 font-semibold">Tiếng Việt (VI)</th>
                    <th className="px-6 py-3 font-semibold">Filipino (PH)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {section.keys.map((key, kIdx) => (
                    <tr key={kIdx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{key}</td>
                      <td className="px-6 py-4"><input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="EN" /></td>
                      <td className="px-6 py-4"><input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="ZH" /></td>
                      <td className="px-6 py-4"><input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="VI" /></td>
                      <td className="px-6 py-4"><input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="PH" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
