import React, { useState } from 'react';
import { Package, Layers, Briefcase, Eye, TrendingUp, Users, MessageSquare, CheckCircle, Clock, ChevronRight, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const visitData = [
  { name: '1月', visits: 4000, inquiries: 2400 },
  { name: '2月', visits: 3000, inquiries: 1398 },
  { name: '3月', visits: 2000, inquiries: 9800 },
  { name: '4月', visits: 2780, inquiries: 3908 },
  { name: '5月', visits: 1890, inquiries: 4800 },
  { name: '6月', visits: 2390, inquiries: 3800 },
];

const salesData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const inquiryRecords = [
  { id: 1, name: 'John Doe', email: 'john@example.com', product: 'Self Adhesive Vinyl (车贴)', date: '2026-04-04 10:30', isRead: false, message: 'I am interested in bulk ordering. Could you provide a quotation for 100 rolls?' },
  { id: 2, name: 'Alice Smith', email: 'alice@company.com', product: 'PVC Flex Banner (灯箱布)', date: '2026-04-03 15:45', isRead: false, message: 'Could you provide the technical specs for the 440g banner?' },
  { id: 3, name: 'Bob Johnson', email: 'bob@agency.net', product: 'Standard Roll Up (易拉宝)', date: '2026-04-02 09:15', isRead: true, message: 'What is the lead time for 500 units shipped to Singapore?' },
  { id: 4, name: 'Emma Wong', email: 'emma@wong-designs.com', product: 'PVC Foam Board (PVC发泡板)', date: '2026-04-01 14:20', isRead: true, message: 'Do you ship to Southeast Asia? Looking for 5mm thickness.' },
  { id: 5, name: 'Michael Brown', email: 'michael@printshop.com', product: 'LED Power Supply (LED电源)', date: '2026-03-30 11:10', isRead: true, message: 'Looking for a quote on 50 units of the 200W outdoor power supply.' },
];

export default function Dashboard() {
  const [inquiryTab, setInquiryTab] = useState<'unread' | 'read'>('unread');
  const [selectedInquiry, setSelectedInquiry] = useState<typeof inquiryRecords[0] | null>(null);
  
  const filteredInquiries = inquiryRecords.filter(record => 
    inquiryTab === 'unread' ? !record.isRead : record.isRead
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">控制台总览</h1>
        <p className="text-sm text-gray-500 mt-1">欢迎回来，这里是金昱广告材料独立站的数据概览。</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="总产品数" value="128" trend="+12%" icon={Package} color="bg-blue-600" />
        <StatCard title="产品分类" value="4" trend="0%" icon={Layers} color="bg-indigo-600" />
        <StatCard title="成功案例" value="36" trend="+5%" icon={Briefcase} color="bg-purple-600" />
        <StatCard title="今日访问" value="1,204" trend="+18%" icon={Eye} color="bg-emerald-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">访问与询盘统计</h2>
            <select className="text-sm border-gray-200 rounded-md text-gray-500 outline-none focus:ring-0 cursor-pointer">
              <option>最近半年</option>
              <option>今年</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="visits" name="访问量" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="inquiries" name="询盘量" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">本周活跃度</h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 咨询记录模块 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
              最新咨询记录 (Inquiries)
            </h2>
            <p className="text-sm text-gray-500 mt-1">查看和管理来自独立站客户的询盘信息。</p>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setInquiryTab('unread')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center ${inquiryTab === 'unread' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Clock className="w-4 h-4 mr-1.5" />
              未读 ({inquiryRecords.filter(r => !r.isRead).length})
            </button>
            <button 
              onClick={() => setInquiryTab('read')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center ${inquiryTab === 'read' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <CheckCircle className="w-4 h-4 mr-1.5" />
              已读 ({inquiryRecords.filter(r => r.isRead).length})
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredInquiries.length > 0 ? (
            filteredInquiries.map(inquiry => (
              <div key={inquiry.id} className="p-6 hover:bg-gray-50/50 transition-colors group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-sm font-bold text-gray-900">{inquiry.name}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{inquiry.email}</span>
                    {!inquiry.isRead && <span className="w-2 h-2 rounded-full bg-red-500" title="未读"></span>}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-1 mb-2">{inquiry.message}</p>
                  <div className="flex items-center text-xs text-gray-500 gap-4">
                    <span className="flex items-center text-blue-600 bg-blue-50 px-2 py-0.5 rounded"><Package className="w-3.5 h-3.5 mr-1" /> 意向产品: {inquiry.product}</span>
                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {inquiry.date}</span>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <button 
                    onClick={() => setSelectedInquiry(inquiry)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
                  >
                    查看详情 <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500 text-sm">
              暂无{inquiryTab === 'unread' ? '未读' : '已读'}咨询记录
            </div>
          )}
        </div>
      </div>

      {/* 咨询详情弹窗 */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">咨询详情</h3>
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">客户姓名</p>
                  <p className="text-base font-semibold text-gray-900">{selectedInquiry.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">联系邮箱</p>
                  <p className="text-base font-semibold text-gray-900">{selectedInquiry.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">意向产品</p>
                  <p className="text-base font-semibold text-blue-600">{selectedInquiry.product}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">咨询时间</p>
                  <p className="text-base font-semibold text-gray-900">{selectedInquiry.date}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">留言内容</p>
                <div className="bg-gray-50 p-4 rounded-xl text-gray-700 text-sm leading-relaxed border border-gray-100">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
              >
                关闭
              </button>
              <a 
                href={`mailto:${selectedInquiry.email}`}
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm flex items-center"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                回复邮件
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, trend, icon: Icon, color }: { title: string, value: string, trend: string, icon: any, color: string }) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className={`font-medium flex items-center ${isPositive ? 'text-emerald-600' : 'text-gray-500'}`}>
          {isPositive && <TrendingUp className="w-4 h-4 mr-1" />}
          {trend}
        </span>
        <span className="text-gray-400 ml-2">较上月</span>
      </div>
    </div>
  );
}
