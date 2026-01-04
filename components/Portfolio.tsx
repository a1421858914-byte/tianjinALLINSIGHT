import React, { useState, useEffect } from 'react';
import { portfolioItems } from '../data/portfolioData';
import { Category, PortfolioItem } from '../types';
import WatermarkedImage from './WatermarkedImage';

// 定义6个分类板块的视觉配置
const CATEGORY_SECTIONS = [
  { 
    id: Category.BRAND, 
    label: '品牌全案', 
    icon: 'fa-cube', 
    desc: 'Brand Identity & Strategy', 
    colorClass: 'text-purple-400', 
    bgClass: 'group-hover:bg-purple-500/10' 
  },
  { 
    id: Category.CULTURE_IP, 
    label: '文旅IP', 
    icon: 'fa-map-signs', 
    desc: 'Culture & Tourism IP', 
    colorClass: 'text-orange-400', 
    bgClass: 'group-hover:bg-orange-500/10' 
  },
  { 
    id: Category.GRAPHIC_DESIGN, 
    label: '平面设计', 
    icon: 'fa-paint-brush', 
    desc: 'Graphic Design', 
    colorClass: 'text-emerald-400', 
    bgClass: 'group-hover:bg-emerald-500/10' 
  },
  { 
    id: Category.VIDEO, 
    label: '视频制作', 
    icon: 'fa-play-circle', 
    desc: 'Video Production', 
    colorClass: 'text-rose-400', 
    bgClass: 'group-hover:bg-rose-500/10' 
  },
  { 
    id: Category.TRAINING, 
    label: '智能培训', 
    icon: 'fa-graduation-cap', 
    desc: 'AI Training', 
    colorClass: 'text-blue-400', 
    bgClass: 'group-hover:bg-blue-500/10' 
  },
  { 
    id: Category.EXHIBITION, 
    label: '交互展陈', 
    icon: 'fa-tv', 
    desc: 'Interactive Exhibition', 
    colorClass: 'text-cyan-400', 
    bgClass: 'group-hover:bg-cyan-500/10' 
  },
];

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedCategory]);

  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item);
    setCurrentMediaIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedItem(null);
    if (selectedCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // 构造统一的媒体列表（视频+图片）
  const getMediaList = (item: PortfolioItem) => {
    const list: { type: 'video' | 'image'; url: string }[] = [];
    if (item.videoUrl) {
      list.push({ type: 'video', url: item.videoUrl });
    }
    if (item.images) {
      item.images.forEach(img => list.push({ type: 'image', url: img }));
    }
    return list;
  };

  const mediaList = selectedItem ? getMediaList(selectedItem) : [];

  const nextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mediaList.length === 0) return;
    setCurrentMediaIndex((prev) => (prev + 1) % mediaList.length);
  };

  const prevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mediaList.length === 0) return;
    setCurrentMediaIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
  };

  return (
    <section id="works" className="py-24 relative bg-dark">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col justify-between items-start mb-16 gap-6 animate-fade-in-up">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">精选作品</h2>
            <p className="text-gray-400 max-w-xl">
              我们提供从创意到落地的全流程解决方案，请选择类别查看案例。
            </p>
          </div>
        </div>

        {/* 分类入口网格 - 调整为 md:grid-cols-2 lg:grid-cols-3 以平衡6个卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
          {CATEGORY_SECTIONS.map((section) => {
            const count = portfolioItems.filter(item => item.category === section.id).length;
            
            return (
              <div 
                key={section.id} 
                onClick={() => setSelectedCategory(section.id)}
                className={`group relative h-64 glass-card rounded-3xl p-8 cursor-pointer border border-white/5 hover:border-white/20 ${section.bgClass} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between overflow-hidden`}
              >
                  <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 blur-[50px] rounded-full group-hover:bg-white/10 transition-colors"></div>

                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform ${section.colorClass}`}>
                      <i className={`fa ${section.icon}`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-white transition-colors">{section.label}</h3>
                    <p className="text-gray-500 text-sm tracking-wider uppercase opacity-80">{section.desc}</p>
                  </div>

                  <div className="relative z-10 flex justify-between items-end border-t border-white/5 pt-4 mt-4">
                    <span className="text-xs font-mono text-gray-400 tracking-wider">{count} CASES</span>
                    <span className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100`}>
                      <i className="fa fa-arrow-right"></i>
                    </span>
                  </div>
              </div>
            );
          })}
        </div>

        {/* 类别下的作品列表弹窗 */}
        {selectedCategory && (
          <div className="fixed inset-0 z-[60] bg-dark/95 backdrop-blur-xl overflow-y-auto animate-fade-in-up">
            <div className="container mx-auto px-6 md:px-12 py-12">
              <div className="flex items-center gap-6 mb-12 sticky top-0 bg-dark/80 backdrop-blur-md p-4 -mx-4 md:mx-0 md:rounded-2xl z-20 border-b md:border border-white/5 shadow-2xl">
                  <button 
                    onClick={() => setSelectedCategory(null)} 
                    className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group shrink-0"
                  >
                    <i className="fa fa-times text-xl group-hover:scale-110 transition-transform"></i>
                  </button>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {CATEGORY_SECTIONS.find(c => c.id === selectedCategory)?.label}
                    </h2>
                    <p className="text-gray-400 text-xs md:text-sm tracking-wider uppercase">
                      Explore our projects
                    </p>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                {portfolioItems
                  .filter(item => item.category === selectedCategory)
                  .map((item, index) => (
                    <div 
                      key={item.id}
                      onClick={() => openModal(item)}
                      className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/5 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <WatermarkedImage 
                          src={item.cover} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60 pointer-events-none"></div>
                        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm pointer-events-none">
                          <span className="px-6 py-2 border border-white text-white rounded-full font-bold tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            查看详情
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-white truncate mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm line-clamp-2 h-10 mb-3">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[10px] uppercase tracking-wider text-gray-400 bg-white/5 px-2 py-1 rounded">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 详情弹窗 (Detail Modal) */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button 
            onClick={closeModal}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
          >
            <i className="fa fa-times text-4xl"></i>
          </button>

          <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 h-[90vh] lg:h-auto overflow-y-auto no-scrollbar">
            {/* 媒体展示区 */}
            <div className="lg:w-2/3 flex flex-col justify-center relative bg-black/50 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <div className="relative w-full h-[40vh] lg:h-[600px] flex items-center justify-center bg-black">
                 {mediaList.length > 0 && (
                   mediaList[currentMediaIndex].type === 'video' ? (
                      <video 
                        key={mediaList[currentMediaIndex].url}
                        src={mediaList[currentMediaIndex].url} 
                        controls 
                        playsInline
                        className="w-full h-full object-contain"
                        poster={selectedItem.cover}
                      />
                   ) : (
                      <WatermarkedImage 
                        src={mediaList[currentMediaIndex].url} 
                        alt="Project Slide" 
                        className="w-full h-full object-contain"
                      />
                   )
                 )}
                 
                 {mediaList.length > 1 && (
                   <>
                    <button onClick={prevMedia} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm z-20"><i className="fa fa-chevron-left"></i></button>
                    <button onClick={nextMedia} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm z-20"><i className="fa fa-chevron-right"></i></button>
                   </>
                 )}
              </div>

              {/* 缩略图导航 */}
              {mediaList.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto no-scrollbar bg-dark/50 border-t border-white/5">
                  {mediaList.map((media, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentMediaIndex(idx)}
                      className={`relative w-20 h-14 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                        currentMediaIndex === idx ? 'border-primary opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                      }`}
                    >
                       {media.type === 'video' ? (
                         <div className="w-full h-full bg-gray-800 flex items-center justify-center"><i className="fa fa-play text-white/50"></i></div>
                       ) : (
                         <WatermarkedImage src={media.url} className="w-full h-full object-cover" alt="thumb" />
                       )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 文字详情区 */}
            <div className="lg:w-1/3 flex flex-col text-left p-2">
              <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2">
                {CATEGORY_SECTIONS.find(c => c.id === selectedItem.category)?.label}
              </span>
              <h3 className="text-3xl font-bold text-white mb-6">{selectedItem.title}</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-1">客户</h4>
                  <p className="text-gray-200">{selectedItem.client || '自研项目'}</p>
                </div>
                {selectedItem.awards && selectedItem.awards.length > 0 && (
                  <div>
                    <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-1">奖项</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.awards.map(a => <span key={a} className="text-yellow-400 text-sm flex items-center"><i className="fa fa-trophy mr-2"></i>{a}</span>)}
                    </div>
                  </div>
                )}
                <div>
                  <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-1">描述</h4>
                  <p className="text-gray-300 leading-relaxed text-sm">{selectedItem.description}</p>
                </div>
                <div>
                  <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-1">标签</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px]">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
