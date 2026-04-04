import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const scenarios = [
  { id: 1, name: '车身广告 (Car Wrap)', desc: '适用于各类车辆的车身改色、广告宣传。', image: 'https://picsum.photos/seed/carwrap/150/100' },
  { id: 2, name: '户外大牌 (Outdoor Billboard)', desc: '高速公路、建筑外墙等大型户外广告。', image: 'https://picsum.photos/seed/outdoor/150/100' },
  { id: 3, name: '展览展示 (Exhibition)', desc: '展会搭建、易拉宝、X展架等便携展示。', image: 'https://picsum.photos/seed/exhibit/150/100' },
  { id: 4, name: '室内装饰 (Indoor Decoration)', desc: '商场、办公室玻璃贴膜、墙面装饰。', image: 'https://picsum.photos/seed/indoor/150/100' },
];

export default function Scenarios() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">应用场景管理</h1>
          <p className="text-sm text-gray-500 mt-1">管理产品适用的各类应用场景分类。</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center transition-colors shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          添加场景
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm flex overflow-hidden group hover:shadow-md transition-all">
            <div className="w-40 h-full min-h-[120px] overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-center relative">
              <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="编辑">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="删除">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1.5 pr-16">{item.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
