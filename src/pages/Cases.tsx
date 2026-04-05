import React, { useState } from 'react';
import { Plus, Edit, Trash2, ArrowLeft, Sparkles, Save, CheckCircle2, Eye, X, MapPin } from 'lucide-react';

const casesData = [
  { 
    id: 1, 
    region: 'Vietnam', 
    category: 'Outdoor Billboards (户外围挡)', 
    title: 'Ho Chi Minh City Highway Billboard', 
    client: 'VietAd Agency', 
    date: '2023-11-15', 
    image: 'https://picsum.photos/seed/vietnam-billboard/150/100',
    desc: 'Large-scale outdoor billboard in Ho Chi Minh City. Engineered with premium weather-resistant advertising materials. Highly waterproof and sunproof, ensuring long-lasting vibrant colors under Vietnam\'s tropical climate and heavy rainy seasons. Perfect for local B2B signage projects.'
  },
  { 
    id: 2, 
    region: 'Philippines', 
    category: 'Store Signage (门店招牌)', 
    title: 'Manila Retail Storefront Signage', 
    client: 'Manila Retail Group', 
    date: '2023-09-20', 
    image: 'https://picsum.photos/seed/ph-store/150/100',
    desc: 'Durable store signage installed in Manila. Utilizing top-grade UV-resistant and waterproof materials. Designed to withstand the Philippines\' intense sun and typhoons, providing reliable and eye-catching storefront branding for local businesses.'
  },
  { 
    id: 3, 
    region: 'Vietnam', 
    category: 'Traffic Reflection (交通反光)', 
    title: 'Hanoi Highway Reflective Signs', 
    client: 'Vietnam Transport Dept', 
    date: '2023-10-05', 
    image: 'https://picsum.photos/seed/vietnam-traffic/150/100',
    desc: 'High-visibility traffic reflective signs deployed across Hanoi highways. Features exceptional weather-resistant properties, maintaining reflectivity during heavy tropical downpours. A trusted choice for Vietnam traffic safety engineering.'
  },
  { 
    id: 4, 
    region: 'Philippines', 
    category: 'Car Wraps (车身广告)', 
    title: 'Cebu Commercial Fleet Wraps', 
    client: 'Cebu Logistics', 
    date: '2023-12-10', 
    image: 'https://picsum.photos/seed/ph-carwrap/150/100',
    desc: 'Commercial vehicle wraps for a delivery fleet in Cebu. Made with premium conformable and sunproof vinyl materials. Protects against tropical heat and peeling, ensuring long-term mobile advertising ROI for Philippines B2B clients.'
  },
  { 
    id: 5, 
    region: 'Vietnam', 
    category: 'Mall Lightboxes (商场灯箱)', 
    title: 'Da Nang Shopping Mall Lightboxes', 
    client: 'Da Nang Plaza', 
    date: '2024-01-20', 
    image: 'https://picsum.photos/seed/vietnam-lightbox/150/100',
    desc: 'Vibrant indoor and semi-outdoor mall lightboxes in Da Nang. Utilizing moisture-proof backlit films that prevent color fading in high-humidity environments. Delivering premium visual impact for Vietnam retail advertising.'
  },
];

export default function Cases() {
  const [view, setView] = useState<'list' | 'edit' | 'details'>('list');
  const [activeLang, setActiveLang] = useState('en');
  const [showAIToast, setShowAIToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [deleteModal, setDeleteModal] = useState<typeof casesData[0] | null>(null);
  const [selectedItem, setSelectedItem] = useState<typeof casesData[0] | null>(null);
  const [regionFilter, setRegionFilter] = useState<'All' | 'Vietnam' | 'Philippines'>('All');

  const [caseDataByLang, setCaseDataByLang] = useState<Record<string, { seoTitle: string, h1Title: string, slug: string, alt: string, content: string }>>({
    en: { seoTitle: '', h1Title: '', slug: '', alt: '', content: '' },
    zh: { seoTitle: '', h1Title: '', slug: '', alt: '', content: '' },
    vi: { seoTitle: '', h1Title: '', slug: '', alt: '', content: '' },
    ph: { seoTitle: '', h1Title: '', slug: '', alt: '', content: '' },
  });

  // Initialize data when editing an item
  React.useEffect(() => {
    if (selectedItem) {
      setCaseDataByLang(prev => ({
        ...prev,
        en: {
          seoTitle: selectedItem.title,
          h1Title: selectedItem.title,
          slug: selectedItem.title.toLowerCase().replace(/\s+/g, '-'),
          alt: selectedItem.title,
          content: selectedItem.desc
        }
      }));
    } else {
      setCaseDataByLang({
        en: { seoTitle: '', h1Title: '', slug: '', alt: '', content: '' },
        zh: { seoTitle: '', h1Title: '', slug: '', alt: '', content: '' },
        vi: { seoTitle: '', h1Title: '', slug: '', alt: '', content: '' },
        ph: { seoTitle: '', h1Title: '', slug: '', alt: '', content: '' },
      });
    }
  }, [selectedItem]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleAIGenerate = () => {
    setShowAIToast(true);
    
    const region = selectedItem?.region || 'Vietnam';
    const generatedData = { ...caseDataByLang };
    
    if (region === 'Vietnam') {
      generatedData['en'] = {
        seoTitle: 'Ho Chi Minh City Advertising Billboard | Waterproof & Sunproof Signage',
        h1Title: 'Premium Outdoor Billboard Engineering in Ho Chi Minh City',
        slug: 'ho-chi-minh-outdoor-billboard-waterproof',
        alt: 'Ho Chi Minh City outdoor advertising billboard with weather resistance',
        content: 'Our recent advertising engineering project in Ho Chi Minh City demonstrates our commitment to quality in tropical climates. Utilizing premium materials, this outdoor signage offers exceptional waterproof and sunproof capabilities, ensuring a 3-5 year lifespan even under Vietnam\'s intense sun and heavy rainy seasons. Perfect for B2B clients seeking durable advertising solutions.'
      };
      generatedData['vi'] = {
        seoTitle: 'Biển quảng cáo ngoài trời tại TP.HCM | Chống nước & Chống nắng',
        h1Title: 'Thi công Biển quảng cáo ngoài trời cao cấp tại TP.HCM',
        slug: 'bien-quang-cao-ngoai-troi-tphcm-chong-nuoc',
        alt: 'Biển quảng cáo ngoài trời tại TP.HCM với khả năng chịu thời tiết cao',
        content: 'Dự án thi công quảng cáo gần đây của chúng tôi tại Thành phố Hồ Chí Minh thể hiện cam kết về chất lượng trong khí hậu nhiệt đới. Sử dụng vật liệu cao cấp, biển hiệu ngoài trời này cung cấp khả năng chống nước và chống tia UV vượt trội, đảm bảo độ bền từ 3-5 năm ngay cả dưới cái nắng gay gắt và mùa mưa lớn của Việt Nam. Sự lựa chọn hoàn hảo cho các khách hàng B2B đang tìm kiếm giải pháp quảng cáo bền bỉ.'
      };
      generatedData['ph'] = {
        seoTitle: 'Proyekto ng Billboard sa Ho Chi Minh | Hindi Pinapasok ng Tubig at Araw',
        h1Title: 'De-kalidad na Outdoor Billboard sa Ho Chi Minh City',
        slug: 'ho-chi-minh-outdoor-billboard-matibay',
        alt: 'Outdoor billboard sa Ho Chi Minh na may proteksyon sa panahon',
        content: 'Ang aming kamakailang proyekto sa advertising sa Ho Chi Minh City ay nagpapakita ng aming dedikasyon sa kalidad sa mga tropikal na klima. Gamit ang mga premium na materyales, ang outdoor signage na ito ay nag-aalok ng pambihirang kakayahan na hindi pinapasok ng tubig at araw, na tinitiyak ang 3-5 taong tibay kahit sa ilalim ng matinding sikat ng araw at malakas na tag-ulan sa Vietnam. Tamang-tama para sa mga kliyenteng B2B na naghahanap ng matibay na solusyon sa advertising.'
      };
    } else {
      generatedData['en'] = {
        seoTitle: 'Manila Advertising Signage Project | Weather-Resistant Outdoor Displays',
        h1Title: 'Durable Outdoor Advertising Signage in Manila',
        slug: 'manila-outdoor-advertising-signage-weatherproof',
        alt: 'Manila outdoor advertising signage with UV protection',
        content: 'This advertising engineering project in Manila highlights our expertise in creating weather-resistant outdoor displays. Designed specifically for the Philippines\' tropical climate, the materials are highly waterproof and sunproof, guaranteeing 3-5 years of vibrant color retention despite typhoons and intense heat. Ideal for local businesses needing reliable and long-lasting branding.'
      };
      generatedData['vi'] = {
        seoTitle: 'Dự án Biển quảng cáo tại Manila | Chống chịu thời tiết',
        h1Title: 'Biển quảng cáo ngoài trời bền bỉ tại Manila',
        slug: 'bien-quang-cao-ngoai-troi-manila-chong-nuoc',
        alt: 'Biển quảng cáo ngoài trời tại Manila với khả năng chống tia UV',
        content: 'Dự án thi công quảng cáo này tại Manila làm nổi bật chuyên môn của chúng tôi trong việc tạo ra các màn hình ngoài trời chịu được thời tiết. Được thiết kế đặc biệt cho khí hậu nhiệt đới của Philippines, các vật liệu có khả năng chống nước và chống nắng cao, đảm bảo giữ màu sắc sống động từ 3-5 năm bất chấp bão và nhiệt độ cao. Lý tưởng cho các doanh nghiệp địa phương cần xây dựng thương hiệu đáng tin cậy và lâu dài.'
      };
      generatedData['ph'] = {
        seoTitle: 'Proyekto ng Signage sa Maynila | Hindi Pinapasok ng Tubig at Araw',
        h1Title: 'Matibay na Outdoor Advertising Signage sa Maynila',
        slug: 'maynila-outdoor-signage-matibay',
        alt: 'Outdoor advertising signage sa Maynila na may proteksyon sa UV',
        content: 'Ang proyektong ito sa advertising sa Maynila ay nagpapakita ng aming kakayahan sa paggawa ng mga outdoor display na matibay sa panahon. Dinisenyo partikular para sa tropikal na klima ng Pilipinas, ang mga materyales ay lubos na hindi pinapasok ng tubig at araw, na ginagarantiyahan ang 3-5 taon na pananatili ng matingkad na kulay sa kabila ng mga bagyo at matinding init. Tamang-tama para sa mga lokal na negosyo na nangangailangan ng maaasahang pagba-brand.'
      };
    }
    
    setCaseDataByLang(generatedData);
    setTimeout(() => setShowAIToast(false), 4000);
  };

  const handleSave = () => {
    showToast('案例保存成功');
  };

  const handleDelete = () => {
    setDeleteModal(null);
    showToast('案例删除成功');
  };

  const filteredCases = regionFilter === 'All' 
    ? casesData 
    : casesData.filter(c => c.region === regionFilter);

  if (view === 'edit' || view === 'details') {
    const isReadOnly = view === 'details';
    return (
      <div className="space-y-6 animate-in fade-in duration-500 relative">
        {toastMsg && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center z-50 animate-in slide-in-from-top-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />
            <span>{toastMsg}</span>
          </div>
        )}
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
              <h1 className="text-2xl font-bold text-gray-900">{isReadOnly ? '案例详情' : '编辑案例'}</h1>
              <p className="text-sm text-gray-500 mt-1">{isReadOnly ? '查看案例内容及多语言SEO配置。' : '配置案例多语言详情内容。'}</p>
            </div>
          </div>
          {!isReadOnly && (
            <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center transition-colors shadow-sm">
              <Save className="w-4 h-4 mr-2" />
              保存案例
            </button>
          )}
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
              {!isReadOnly && (
                <button onClick={handleAIGenerate} className="flex items-center text-sm font-medium text-purple-700 hover:text-purple-800 bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-lg transition-colors w-full sm:w-auto justify-center">
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  AI一键生成中/越/菲草稿
                </button>
              )}
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
                <input 
                  type="text" 
                  disabled={isReadOnly} 
                  value={caseDataByLang[activeLang]?.seoTitle || ''}
                  onChange={(e) => setCaseDataByLang(prev => ({ ...prev, [activeLang]: { ...prev[activeLang], seoTitle: e.target.value } }))}
                  className={`w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none transition-all ${isReadOnly ? 'text-gray-500 cursor-not-allowed' : 'focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500'}`} 
                  placeholder="用于搜索引擎优化的标题..." 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">H1大标题 (H1 Title) <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  disabled={isReadOnly} 
                  value={caseDataByLang[activeLang]?.h1Title || ''}
                  onChange={(e) => setCaseDataByLang(prev => ({ ...prev, [activeLang]: { ...prev[activeLang], h1Title: e.target.value } }))}
                  className={`w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none transition-all ${isReadOnly ? 'text-gray-500 cursor-not-allowed' : 'focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500'}`} 
                  placeholder="页面主标题..." 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">独立网址别名 (Slug) <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  disabled={isReadOnly} 
                  value={caseDataByLang[activeLang]?.slug || ''}
                  onChange={(e) => setCaseDataByLang(prev => ({ ...prev, [activeLang]: { ...prev[activeLang], slug: e.target.value } }))}
                  className={`w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none transition-all ${isReadOnly ? 'text-gray-500 cursor-not-allowed' : 'focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500'}`} 
                  placeholder="例如: vietnam-outdoor-billboard" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">独立图片Alt文案 (Image Alt) <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  disabled={isReadOnly} 
                  value={caseDataByLang[activeLang]?.alt || ''}
                  onChange={(e) => setCaseDataByLang(prev => ({ ...prev, [activeLang]: { ...prev[activeLang], alt: e.target.value } }))}
                  className={`w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none transition-all ${isReadOnly ? 'text-gray-500 cursor-not-allowed' : 'focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500'}`} 
                  placeholder="描述图片的替代文本..." 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">地区 (Region) <span className="text-red-500">*</span></label>
                <select disabled={isReadOnly} className={`w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none transition-all ${isReadOnly ? 'text-gray-500 cursor-not-allowed' : 'focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500'}`} defaultValue={selectedItem?.region || 'Vietnam'}>
                  <option value="Vietnam">Vietnam (越南)</option>
                  <option value="Philippines">Philippines (菲律宾)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">分类 (Category) <span className="text-red-500">*</span></label>
                <select disabled={isReadOnly} className={`w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none transition-all ${isReadOnly ? 'text-gray-500 cursor-not-allowed' : 'focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500'}`} defaultValue={selectedItem?.category || 'Outdoor Billboards (户外围挡)'}>
                  <option value="Outdoor Billboards (户外围挡)">Outdoor Billboards (户外围挡)</option>
                  <option value="Store Signage (门店招牌)">Store Signage (门店招牌)</option>
                  <option value="Traffic Reflection (交通反光)">Traffic Reflection (交通反光)</option>
                  <option value="Car Wraps (车身广告)">Car Wraps (车身广告)</option>
                  <option value="Mall Lightboxes (商场灯箱)">Mall Lightboxes (商场灯箱)</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">正文详情 (Content) <span className="text-red-500">*</span></label>
              <div className={`border border-gray-200 rounded-lg overflow-hidden transition-all ${isReadOnly ? 'opacity-70' : 'focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500'}`}>
                <textarea 
                  value={caseDataByLang[activeLang]?.content || ''} 
                  onChange={(e) => setCaseDataByLang(prev => ({ ...prev, [activeLang]: { ...prev[activeLang], content: e.target.value } }))}
                  disabled={isReadOnly} 
                  rows={10} 
                  className={`w-full bg-white px-4 py-3 text-sm outline-none resize-y ${isReadOnly ? 'text-gray-500 cursor-not-allowed' : ''}`} 
                  placeholder="在此输入独立的正文详情内容（支持富文本）..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {toastMsg && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center z-50 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">案例管理</h1>
          <p className="text-sm text-gray-500 mt-1">按越南、菲律宾两大地区分类展示广告工程案例，强化耐候防水信任度。</p>
        </div>
        <button onClick={() => { setSelectedItem(null); setView('edit'); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center transition-colors shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          发布新案例
        </button>
      </div>

      {/* Region Filter */}
      <div className="flex space-x-2">
        {(['All', 'Vietnam', 'Philippines'] as const).map((region) => (
          <button
            key={region}
            onClick={() => setRegionFilter(region)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              regionFilter === region 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {region === 'All' ? '全部地区 (All Regions)' : region === 'Vietnam' ? '越南 (Vietnam)' : '菲律宾 (Philippines)'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
              <th className="px-6 py-4 font-semibold">图片</th>
              <th className="px-6 py-4 font-semibold">案例标题</th>
              <th className="px-6 py-4 font-semibold">地区/分类</th>
              <th className="px-6 py-4 font-semibold">描述 (SEO)</th>
              <th className="px-6 py-4 font-semibold">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCases.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <img src={item.image} alt={item.title} className="w-16 h-12 object-cover rounded-lg border border-gray-200" />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">{item.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.date}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 mb-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {item.region}
                  </div>
                  <div className="text-xs text-gray-500">{item.category}</div>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500 max-w-xs truncate">
                  {item.desc}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => { setSelectedItem(item); setView('details'); }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="查看详情">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => { setSelectedItem(item); setView('edit'); }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="编辑">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeleteModal(item)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="删除">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredCases.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 text-sm">
                  暂无该地区的案例数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">确认删除案例？</h3>
              <p className="text-sm text-gray-500">
                您确定要删除案例 <span className="font-semibold text-gray-900">"{deleteModal.title}"</span> 吗？此操作无法撤销。
              </p>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-center gap-3">
              <button onClick={() => setDeleteModal(null)} className="flex-1 px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors">
                取消
              </button>
              <button onClick={handleDelete} className="flex-1 px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm">
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
