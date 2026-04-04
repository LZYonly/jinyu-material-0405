import React from 'react';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';

const categories = [
  { id: 1, name: 'Advertising Media (广告耗材)', count: 45, desc: 'Self Adhesive Vinyl, Photo Paper, PET Film, etc.' },
  { id: 2, name: 'Advertising Panel (广告板材)', count: 28, desc: 'PVC Foam Board, Acrylic sheet, Polystyrene Sheet, etc.' },
  { id: 3, name: 'Display Stand (展示器材)', count: 32, desc: 'Roll Up, X-Banner, Flagpole, Light Box, etc.' },
  { id: 4, name: 'Accessory (配件)', count: 23, desc: 'Grommet Machine, Advertising Nail, LED, Glue, etc.' },
];

export default function Categories() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">产品分类</h1>
          <p className="text-sm text-gray-500 mt-1">管理产品目录结构，支持拖拽排序。</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center transition-colors shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          添加分类
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
              <th className="px-4 py-4 w-12"></th>
              <th className="px-6 py-4 font-semibold">分类名称</th>
              <th className="px-6 py-4 font-semibold">描述</th>
              <th className="px-6 py-4 font-semibold">产品数量</th>
              <th className="px-6 py-4 font-semibold text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-4 py-4 text-gray-300 cursor-move hover:text-gray-500">
                  <GripVertical className="w-5 h-5" />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">{cat.name}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {cat.desc}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    {cat.count} 个产品
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="编辑">
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
