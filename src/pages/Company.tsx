import React from 'react';
import { Save, Globe, Phone, Mail, MapPin, Building } from 'lucide-react';

export default function Company() {
  return (
    <div className="space-y-6 max-w-5xl animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">公司介绍</h1>
          <p className="text-sm text-gray-500 mt-1">更新公司基本信息、联系方式及发展历程。</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center transition-colors shadow-sm">
          <Save className="w-4 h-4 mr-2" />
          保存所有修改
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <Building className="w-5 h-5 mr-2 text-blue-600" />
                基本信息
              </h2>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">公司名称 (中/英)</label>
                <input type="text" defaultValue="佛山市金昱广告材料有限公司 / Foshan Jin Yu Advertising Material Co., Ltd" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">公司简介 (Company Introduction)</label>
                <textarea rows={6} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all leading-relaxed" defaultValue="We are a manufacturer specializing in the integration of design, R&D, production, and sales of premium advertising materials. With a commitment to innovation and quality, we offer a diverse product portfolio tailored for various applications, supported by an extensive industry-leading material library and precision craftsmanship. Our durable, customizable, and cost-effective solutions have earned global recognition, exporting to Southeast Asia, Europe, the Americas, the Middle East, and beyond." />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">发展历程 (Our Journey)</label>
                <textarea rows={8} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all leading-relaxed" defaultValue="• Founded in [2021] : We have always been committed to quality and focused on delivering diverse products to meet client needs.
• [October 2022] : Debuted at the Canton Fair, establishing our first international client partnerships.
• [March 2023] : Launched in-house R&D team, accelerating product innovation and material development.
• [July 2023] : Expanded production capacity with advanced machinery to meet growing international demand.
• [2024] : Obtained ISO 9001 certification for quality management.
• Present : Recognized as a trusted partner by clients worldwide, continuously adapting to market trends with cutting-edge designs." />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-emerald-600" />
                联系方式
              </h2>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center">
                  <MapPin className="w-4 h-4 mr-1.5 text-gray-400" /> 公司地址
                </label>
                <textarea rows={3} defaultValue="D3168, U+Zhigu Industrial Park, LiShui Town, Nanhai District, Foshan City, Guangdong Province, China" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center">
                  <Phone className="w-4 h-4 mr-1.5 text-gray-400" /> WhatsApp
                </label>
                <input type="text" defaultValue="8613808828019" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center">
                  <Phone className="w-4 h-4 mr-1.5 text-gray-400" /> 联系电话 (Tel)
                </label>
                <input type="text" defaultValue="+86-13570441363" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center">
                  <Mail className="w-4 h-4 mr-1.5 text-gray-400" /> 电子邮箱 (E-mail)
                </label>
                <input type="email" defaultValue="vivian@materials-ad.com" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center">
                  <Globe className="w-4 h-4 mr-1.5 text-gray-400" /> 官方网站 (Web)
                </label>
                <input type="text" defaultValue="www.jinyu2021.com" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
