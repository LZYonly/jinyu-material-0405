import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Filter, ArrowLeft, Sparkles, Save, CheckCircle2, List, Eye, Upload, X } from 'lucide-react';

const initialProductsList = [
  { id: 1, name: 'Self Adhesive Vinyl (车贴)', category: 'Advertising Media', status: '上架', image: 'https://picsum.photos/seed/vinyl/100/100' },
  { id: 2, name: 'PVC Flex Banner (灯箱布)', category: 'Advertising Media', status: '上架', image: 'https://picsum.photos/seed/banner/100/100' },
  { id: 3, name: 'PVC Foam Board (PVC发泡板)', category: 'Advertising Panel', status: '上架', image: 'https://picsum.photos/seed/board/100/100' },
  { id: 4, name: 'Standard Roll Up (易拉宝)', category: 'Display Stand', status: '下架', image: 'https://picsum.photos/seed/rollup/100/100' },
  { id: 5, name: 'LED Power Supply (LED电源)', category: 'Accessory', status: '上架', image: 'https://picsum.photos/seed/led/100/100' },
];

const defaultSpecs = [
  { id: 0, name: 'Item Name', value: 'SAV120/140' },
  { id: 1, name: 'Release paper', value: '120/140g±5g' },
  { id: 2, name: 'Film', value: '80/100micron±5micron' },
  { id: 3, name: 'Surface', value: 'Glossy/ Matte' },
  { id: 4, name: 'Glue', value: 'Semi removable, 22μm±2μm' },
  { id: 5, name: 'Size', value: '1.07/1.27/1.37/1.52*50m' },
  { id: 6, name: 'Ink type', value: 'Eco solvent/ solvent' },
  { id: 7, name: 'Package', value: 'Export carton' },
];

export default function Products() {
  const [products, setProducts] = useState(initialProductsList);
  const [view, setView] = useState<'list' | 'edit' | 'details'>('list');
  const [activeLang, setActiveLang] = useState('en');
  const [showAIToast, setShowAIToast] = useState(false);
  const [deleteModal, setDeleteModal] = useState<typeof initialProductsList[0] | null>(null);
  const [selectedItem, setSelectedItem] = useState<typeof initialProductsList[0] | null>(null);
  
  // Specs are now managed per language
  const [specsByLang, setSpecsByLang] = useState<Record<string, {id: number, name: string, value: string}[]>>({
    en: [...defaultSpecs.map(s => ({...s}))],
    zh: [...defaultSpecs.map(s => ({...s}))],
    vi: [...defaultSpecs.map(s => ({...s}))],
    ph: [...defaultSpecs.map(s => ({...s}))],
  });

  const [namesByLang, setNamesByLang] = useState<Record<string, string>>({
    en: "Self Adhesive Vinyl",
    zh: "车贴",
    vi: "Decal dán xe",
    ph: "Self Adhesive Vinyl",
  });

  const [productImages, setProductImages] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState('');
  const [deleteImageIndex, setDeleteImageIndex] = useState<number | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Prevent browser from opening dropped files
  React.useEffect(() => {
    const handleDragOver = (e: DragEvent) => e.preventDefault();
    const handleDrop = (e: DragEvent) => e.preventDefault();
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);
    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  // Update productImages when selectedItem changes
  React.useEffect(() => {
    if (selectedItem?.image) {
      setProductImages([selectedItem.image]);
    } else {
      setProductImages([]);
    }
  }, [selectedItem]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleAIGenerate = () => {
    setShowAIToast(true);
    
    // Generate translations for product name
    const currentName = namesByLang['en'] || 'Self Adhesive Vinyl';
    setNamesByLang(prev => ({
      ...prev,
      zh: currentName.includes('Vinyl') ? '车贴' : currentName.includes('Banner') ? '灯箱布' : currentName.includes('Board') ? 'PVC发泡板' : currentName.includes('Roll Up') ? '易拉宝' : 'LED电源',
      vi: currentName.includes('Vinyl') ? 'Decal dán xe' : currentName.includes('Banner') ? 'Bạt Hiflex' : currentName.includes('Board') ? 'Tấm Formex' : currentName.includes('Roll Up') ? 'Standee cuốn' : 'Nguồn LED',
      ph: currentName.includes('Vinyl') ? 'Self Adhesive Vinyl' : currentName.includes('Banner') ? 'Tarpaulin Banner' : currentName.includes('Board') ? 'PVC Foam Board' : currentName.includes('Roll Up') ? 'Roll Up Stand' : 'LED Power Supply',
    }));

    // Generate translations for specs
    const newSpecs = { ...specsByLang };
    
    // ZH
    newSpecs['zh'] = newSpecs['en'].map(spec => ({
      ...spec,
      name: spec.name === 'Item Name' ? '产品名称' : spec.name === 'Release paper' ? '离型纸' : spec.name === 'Film' ? '膜厚' : spec.name === 'Surface' ? '表面' : spec.name === 'Glue' ? '胶水' : spec.name === 'Size' ? '尺寸' : spec.name === 'Ink type' ? '墨水类型' : spec.name === 'Package' ? '包装' : spec.name,
      value: spec.value.includes('Glossy/ Matte') ? '光面/哑面' : spec.value.includes('Semi removable') ? '半可移胶, 22μm±2μm' : spec.value.includes('Eco solvent') ? '弱溶剂/溶剂' : spec.value.includes('Export carton') ? '出口纸箱' : spec.value
    }));

    // VI
    newSpecs['vi'] = newSpecs['en'].map(spec => ({
      ...spec,
      name: spec.name === 'Item Name' ? 'Tên sản phẩm' : spec.name === 'Release paper' ? 'Giấy đế' : spec.name === 'Film' ? 'Độ dày màng' : spec.name === 'Surface' ? 'Bề mặt' : spec.name === 'Glue' ? 'Keo' : spec.name === 'Size' ? 'Kích thước' : spec.name === 'Ink type' ? 'Loại mực' : spec.name === 'Package' ? 'Đóng gói' : spec.name,
      value: spec.value.includes('Glossy/ Matte') ? 'Bóng/ Mờ' : spec.value.includes('Semi removable') ? 'Keo bán tháo rời, 22μm±2μm' : spec.value.includes('Eco solvent') ? 'Mực Eco solvent/ solvent' : spec.value.includes('Export carton') ? 'Thùng carton xuất khẩu' : spec.value
    }));

    // PH
    newSpecs['ph'] = newSpecs['en'].map(spec => ({
      ...spec,
      name: spec.name === 'Item Name' ? 'Pangalan ng Item' : spec.name === 'Release paper' ? 'Release paper' : spec.name === 'Film' ? 'Pelikula' : spec.name === 'Surface' ? 'Ibabaw' : spec.name === 'Glue' ? 'Pandikit' : spec.name === 'Size' ? 'Sukat' : spec.name === 'Ink type' ? 'Uri ng tinta' : spec.name === 'Package' ? 'Package' : spec.name,
      value: spec.value.includes('Glossy/ Matte') ? 'Makintab/ Matte' : spec.value.includes('Semi removable') ? 'Semi removable, 22μm±2μm' : spec.value.includes('Eco solvent') ? 'Eco solvent/ solvent' : spec.value.includes('Export carton') ? 'Export carton' : spec.value
    }));

    setSpecsByLang(newSpecs);

    setTimeout(() => setShowAIToast(false), 4000);
  };

  const handleSave = () => {
    if (selectedItem) {
      setProducts(products.map(p => 
        p.id === selectedItem.id 
          ? { ...p, image: productImages[0] || p.image, name: namesByLang[activeLang] || p.name } 
          : p
      ));
    }
    showToast('产品保存成功');
    setTimeout(() => setView('list'), 500);
  };

  const handleDelete = () => {
    if (deleteModal) {
      setProducts(products.filter(p => p.id !== deleteModal.id));
    }
    setDeleteModal(null);
    showToast('产品删除成功');
  };

  const handleNameChange = (newValue: string) => {
    setNamesByLang(prev => ({ ...prev, [activeLang]: newValue }));
  };

  const handleSpecChange = (index: number, field: 'name' | 'value', newValue: string) => {
    const newSpecs = { ...specsByLang };
    newSpecs[activeLang][index][field] = newValue;
    setSpecsByLang(newSpecs);
  };

  const addSpec = () => {
    const newSpecs = { ...specsByLang };
    newSpecs[activeLang].push({ id: Date.now(), name: '', value: '' });
    setSpecsByLang(newSpecs);
  };

  const removeSpec = (index: number) => {
    const newSpecs = { ...specsByLang };
    newSpecs[activeLang].splice(index, 1);
    setSpecsByLang(newSpecs);
  };

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
            <span>AI草稿已生成！请务必手动检查并修改各语言的规格参数，确认无误后再保存。</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={() => setView('list')} className="mr-4 p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{isReadOnly ? '产品详情' : '编辑产品'}</h1>
              <p className="text-sm text-gray-500 mt-1">{isReadOnly ? '查看产品基本信息及多语言规格参数。' : '配置产品基本信息及多语言规格参数。'}</p>
            </div>
          </div>
          {!isReadOnly && (
            <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center transition-colors shadow-sm">
              <Save className="w-4 h-4 mr-2" />
              保存产品
            </button>
          )}
        </div>

        {/* Basic Info Module */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center">
            <List className="w-5 h-5 mr-2 text-blue-600" />
            基本信息 (Basic Info)
          </h2>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">产品图片 (Product Images) <span className="text-red-500">*</span> <span className="text-gray-500 font-normal ml-2">支持上传最多 6 张图片，第一张将作为主图展示</span></label>
            <div className="mt-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {/* Uploaded Images Grid */}
                {productImages.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-xl border border-gray-200 overflow-hidden group">
                    <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                    {index === 0 && (
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow-sm z-10">主图</div>
                    )}
                    {!isReadOnly && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        {index !== 0 && (
                          <button 
                            onClick={() => {
                              const newImgs = [...productImages];
                              const [removed] = newImgs.splice(index, 1);
                              newImgs.unshift(removed);
                              setProductImages(newImgs);
                            }}
                            className="text-xs bg-white text-gray-900 px-2 py-1 rounded hover:bg-gray-100"
                          >
                            设为主图
                          </button>
                        )}
                        <button 
                          onClick={() => setDeleteImageIndex(index)}
                          className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          删除
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {/* Upload Button */}
                {productImages.length < 6 && !isReadOnly && (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const file = e.dataTransfer.files?.[0];
                      if (file && file.type.startsWith('image/')) {
                        const url = URL.createObjectURL(file);
                        setProductImages([...productImages, url]);
                        showToast('图片上传成功');
                      }
                    }}
                    className="aspect-square flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-xl transition-colors bg-gray-50 hover:border-blue-500 cursor-pointer hover:bg-blue-50/50 group"
                  >
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setProductImages([...productImages, url]);
                          showToast('图片上传成功');
                        }
                        e.target.value = '';
                      }} 
                    />
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors mb-2">
                      <Upload className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <span className="text-xs font-medium text-gray-500 group-hover:text-blue-600">点击上传</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Multi-language Specs Module */}
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
                当前正在编辑 <span className="font-bold uppercase bg-blue-200 px-1.5 py-0.5 rounded text-blue-900 mx-1">{activeLang}</span> 语言版本的产品名称和规格参数。
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">产品名称 (Product Name) <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                disabled={isReadOnly}
                value={namesByLang[activeLang]}
                onChange={(e) => handleNameChange(e.target.value)}
                className={`w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none transition-all ${isReadOnly ? 'text-gray-500 cursor-not-allowed' : 'focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500'}`}
                placeholder="请输入产品名称..." 
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-md font-bold text-gray-900">规格参数 (Specifications)</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-700">
                    <tr>
                      <th className="px-4 py-3 font-semibold w-1/3 border-r border-gray-200">参数名称 (Attribute)</th>
                      <th className="px-4 py-3 font-semibold w-7/12 border-r border-gray-200">参数数值 (Value)</th>
                      <th className="px-4 py-3 font-semibold w-1/12 text-center">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {specsByLang[activeLang].map((spec, index) => (
                      <tr key={spec.id} className="bg-white hover:bg-gray-50/50 transition-colors">
                        <td className="px-0 py-0 border-r border-gray-200">
                          <input 
                            type="text" 
                            disabled={isReadOnly}
                            value={spec.name}
                            onChange={(e) => handleSpecChange(index, 'name', e.target.value)}
                            className={`w-full bg-transparent px-4 py-3 outline-none transition-colors ${isReadOnly ? 'text-gray-500 cursor-not-allowed' : 'focus:bg-blue-50/50'}`} 
                            placeholder="例如: Release paper"
                          />
                        </td>
                        <td className="px-0 py-0 border-r border-gray-200">
                          <input 
                            type="text" 
                            disabled={isReadOnly}
                            value={spec.value}
                            onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                            className={`w-full bg-transparent px-4 py-3 outline-none transition-colors ${isReadOnly ? 'text-gray-500 cursor-not-allowed' : 'focus:bg-blue-50/50'}`} 
                            placeholder="例如: 120/140g±5g"
                          />
                        </td>
                        <td className="px-4 py-2 text-center">
                          {!isReadOnly && (
                            <button 
                              onClick={() => removeSpec(index)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="删除此行"
                            >
                              <Trash2 className="w-4 h-4 mx-auto" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!isReadOnly && (
                <button 
                  onClick={addSpec}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors border border-dashed border-blue-300 w-full justify-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  添加规格参数行
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Delete Image Modal */}
        {deleteImageIndex !== null && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">确认删除图片？</h3>
                <p className="text-sm text-gray-500">
                  您确定要删除这张图片吗？此操作无法撤销。
                </p>
              </div>
              <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-center gap-3">
                <button onClick={() => setDeleteImageIndex(null)} className="flex-1 px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors">
                  取消
                </button>
                <button 
                  onClick={() => {
                    const newImgs = [...productImages];
                    newImgs.splice(deleteImageIndex, 1);
                    setProductImages(newImgs);
                    setDeleteImageIndex(null);
                    showToast('图片已删除');
                  }} 
                  className="flex-1 px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
                >
                  确认删除
                </button>
              </div>
            </div>
          </div>
        )}
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
          <h1 className="text-2xl font-bold text-gray-900">产品管理</h1>
          <p className="text-sm text-gray-500 mt-1">管理网站展示的所有产品信息及规格参数。</p>
        </div>
        <button onClick={() => { setSelectedItem(null); setView('edit'); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center transition-colors shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          发布新产品
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="搜索产品名称..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" />
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select className="w-full pl-10 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none appearance-none cursor-pointer">
                <option>所有分类</option>
                <option>Advertising Media</option>
                <option>Advertising Panel</option>
                <option>Display Stand</option>
                <option>Accessory</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4 font-semibold">产品信息</th>
                <th className="px-6 py-4 font-semibold">所属分类</th>
                <th className="px-6 py-4 font-semibold">状态</th>
                <th className="px-6 py-4 font-semibold">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                      <div className="ml-4">
                        <div className="text-sm font-bold text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">ID: #{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${product.status === '上架' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${product.status === '上架' ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => { setSelectedItem(product); setView('details'); }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="查看详情">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => { setSelectedItem(product); setView('edit'); }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="编辑">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteModal(product)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="删除">
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



      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">确认删除产品？</h3>
              <p className="text-sm text-gray-500">
                您确定要删除产品 <span className="font-semibold text-gray-900">"{deleteModal.name}"</span> 吗？此操作无法撤销。
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
