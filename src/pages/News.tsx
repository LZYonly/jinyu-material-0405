import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, ArrowLeft, Sparkles, Save, CheckCircle2 } from 'lucide-react';

const newsList = [
  { id: 1, title: '金昱广告材料荣获ISO 9001质量管理体系认证', date: '2024-02-15', status: '已发布', views: 342 },
  { id: 2, title: '2023年产能扩建项目顺利完工，引进国际先进设备', date: '2023-08-10', status: '已发布', views: 521 },
];

export default function News() {
  const [view, setView] = useState<'list' | 'edit'>('list');
  const [activeLang, setActiveLang] = useState('en');
  const [showAIToast, setShowAIToast] = useState(false);

  const handleAIGenerate = () => {
    setShowAIToast(true);
    setTimeout(() => setShowAIToast(false), 4000);
  };

  if (view === 'edit') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 relative">
        {showAIToast && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center z-50 animate-in slide-in-from-top-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />
            <span>AI草稿已生成！请务必手动检查并修改各语言的 SEO标题、H1、Slug 及 Alt，确认无误后再保存。</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={() => setView('list')} className="mr-4 p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">编辑新闻</h1>
              <p className="text-sm text-gray-500 mt-1">配置新闻多语言详情内容。</p>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center transition-colors shadow-sm">
            <Save className="w-4 h-4 mr-2" />
            保存新闻
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row border-b border-gray-100 bg-gray-50/50 sm:items-center justify-between pr-4">
            <div className="flex overflow-x-auto hide-scrollbar">
              {[
                { id: 'en', label: 'English (EN)' },
                { id: 'zh', label: '中文 (ZH)' },
                { id: 'vi', label: 'Tiếng Việt (VI)' },
                { id: 'ph', label: 'Filipino (PH)' }
              ].map(l => (
                <button 
                  key={l.id}
                  onClick={() => setActiveLang(l.id)}
                  className={`px-6 py-3.5 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeLang === l.id ? 'border-blue-600 text-blue-700 bg-white' : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100/50'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <div className="p-3 sm:p-0">
              <button onClick={handleAIGenerate} className="flex items-center text-sm font-medium text-purple-700 hover:text-purple-800 bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-lg transition-colors w-full sm:w-auto justify-center">
                <Sparkles className="w-4 h-4 mr-1.5" />
                AI一键生成中/越/菲草稿
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="bg-blue-50 border border-blue-100 text-blue-800 text-sm px-4 py-3 rounded-lg flex items-start">
              <div className="font-medium">
                当前正在编辑 <span className="font-bold uppercase bg-blue-200 px-1.5 py-0.5 rounded text-blue-900 mx-1">{activeLang}</span> 语言版本。
                <br className="sm:hidden" />
                <span className="text-blue-700 mt-1 sm:mt-0 block sm:inline">严格拆分规则：SEO标题、H1大标题、正文详情不共用、不自动截取、不互相填充。</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">SEO标题 (SEO Title) <span className="text-red-500">*</span></label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" placeholder="用于搜索引擎优化的标题..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">H1大标题 (H1 Title) <span className="text-red-500">*</span></label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" placeholder="页面主标题..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">独立网址别名 (Slug) <span className="text-red-500">*</span></label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" placeholder="例如: iso-9001-certification" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">独立图片Alt文案 (Image Alt) <span className="text-red-500">*</span></label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" placeholder="描述图片的替代文本..." />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">正文详情 (Content) <span className="text-red-500">*</span></label>
              <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all">
                <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex space-x-2">
                  <div className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer transition-colors"></div>
                  <div className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer transition-colors"></div>
                  <div className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer transition-colors"></div>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <div className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer transition-colors"></div>
                </div>
                <textarea rows={10} className="w-full bg-white px-4 py-3 text-sm outline-none resize-y" placeholder="在此输入独立的正文详情内容（支持富文本）..."></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">新闻管理</h1>
          <p className="text-sm text-gray-500 mt-1">发布公司动态、行业资讯及展会信息。</p>
        </div>
        <button onClick={() => setView('edit')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center transition-colors shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          发布新闻
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
              <th className="px-6 py-4 font-semibold">新闻标题</th>
              <th className="px-6 py-4 font-semibold">发布日期</th>
              <th className="px-6 py-4 font-semibold">浏览量</th>
              <th className="px-6 py-4 font-semibold">状态</th>
              <th className="px-6 py-4 font-semibold text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {newsList.map((news) => (
              <tr key={news.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">{news.title}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {news.date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 flex items-center">
                  <Eye className="w-4 h-4 mr-1.5 text-gray-400" />
                  {news.views}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                    news.status === '已发布' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {news.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setView('edit')} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="编辑">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="删除">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
