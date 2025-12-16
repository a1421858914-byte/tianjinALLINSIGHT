import React, { useState, useEffect } from 'react';
import { portfolioItems } from '../data/portfolioData';
import { Category, PortfolioItem } from '../types';
import WatermarkedImage from './WatermarkedImage';

// 定义4个分类板块的视觉配置
const CATEGORY_SECTIONS = [
  { id: Category.BRAND, label: '品牌全案', icon: 'fa-cube', desc: 'Brand Identity & Strategy', colorClass: 'text-purple-400', bgClass: 'group-hover:bg-purple-500/10' },
  { id: Category.VIDEO, label: '视频制作', icon: 'fa-play-circle', desc: 'Video Production', colorClass: 'text-rose-400', bgClass: 'group-hover:bg-rose-500/10' },
  { id: Category.TRAINING, label: '智能培训', icon: 'fa-graduation-cap', desc: 'AI Training', colorClass: 'text-blue-400', bgClass: 'group-hover:bg-blue-500/10' },
  { id: Category.EXHIBITION, label: '交互展陈', icon: 'fa-tv', desc: 'Interactive Exhibition', colorClass: 'text-cyan-400', bgClass: 'group-hover:bg-cyan-500/10' },
];

const Portfolio: React.FC = () => {
  // 状态记录当前选中的分类，null 表示未打开分类弹窗
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // 监听分类弹窗状态，锁定/解锁背景滚动
  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedCategory]);

  // Modal 打开逻辑 (保持不变)
  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item);
    setCurrentMediaIndex(0);
    // 注意：这里不需要再设置 overflow: hidden，因为 selectedCategory 已经锁住了，
    // 但为了保险起见（比如直接打开详情），保留也没问题，或者依靠 selectedItem 的逻辑
    document.body.style.overflow = 'hidden';
  };

  // Modal 关闭逻辑 (保持不变)
  const closeModal = () => {
    setSelectedItem(null);
    // 如果分类弹窗还在，保持锁定；否则解锁
    if (selectedCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // 图片切换逻辑 (保持不变)
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedItem.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedItem.images.length) % selectedItem.images.length);
  };

  return (
    <section id="works" className="py-24 relative bg-dark">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* 标题区域：始终显示 */}
        <div className="flex flex-col justify-between items-start mb-16 gap-6 animate-fade-in-up">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">精选作品</h2>
            <p className="text-gray-400 max-w-xl">
              我们提供从创意到落地的全流程解决方案，请选择类别查看案例。
            </p>
          </div>
        </div>

        {/* 状态 1: 始终显示 4 个分类入口卡片 (去除了 !selectedCategory 判断) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
          {CATEGORY_SECTIONS.map((section) => {
            // 计算该分类下的作品数量
            const count = portfolioItems.filter(item => item.category === section.id).length;
            
            return (
              <div 
                key={section.id} 
                onClick={() => setSelectedCategory(section.id)}
                className={`group relative h-64 glass-card rounded-3xl p-8 cursor-pointer border border-white/5 hover:border-white/20 ${section.bgClass} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between overflow-hidden`}
              >
                  {/* 背景光效 */}
                  <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 blur-[50px] rounded-full group-hover:bg-white/10 transition-colors"></div>

                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform ${section.colorClass}`}>
                      <i className={`fa ${section.icon}`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-white transition-colors">{section.label}</h3>
                    <p className="text-gray-500 text-sm">{section.desc}</p>
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

        {/* 状态 2: 分类弹窗 (Modal Overlay) */}
        {selectedCategory && (
          <div className="fixed inset-0 z-[60] bg-dark/95 backdrop-blur-xl overflow-y-auto animate-fade-in-up">
            <div className="container mx-auto px-6 md:px-12 py-12">
              {/* 弹窗头部：返回按钮和标题 */}
              <div className="flex items-center gap-6 mb-12 sticky top-0 bg-dark/80 backdrop-blur-md p-4 -mx-4 md:mx-0 md:rounded-2xl z-20 border-b md:border border-white/5 shadow-2xl">
                  <button 
                    onClick={() => setSelectedCategory(null)} 
                    className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group shrink-0"
                    title="关闭"
                  >
                    <i className="fa fa-times text-xl group-hover:scale-110 transition-transform"></i>
                  </button>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                      {CATEGORY_SECTIONS.find(c => c.id === selectedCategory)?.label}
                    </h2>
                    <p className="text-gray-400 text-xs md:text-sm tracking-wider">
                      {CATEGORY_SECTIONS.find(c => c.id === selectedCategory)?.desc}
                    </p>
                  </div>
              </div>

              {/* 作品网格 (Grid) */}
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
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-white truncate pr-2">{item.title}</h3>
                          {item.awards && (
                            <span className="text-yellow-500 text-xs border border-yellow-500/30 bg-yellow-500/10 px-2 py-0.5 rounded">
                              <i className="fa fa-trophy mr-1"></i>获奖
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-400 text-sm line-clamp-2 h-10 mb-3">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                ))}
              </div>

              {/* 空状态提示 */}
              {portfolioItems.filter(item => item.category === selectedCategory).length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center mb-6 shadow-inner">
                    <i className="fa fa-folder-open-o text-3xl text-gray-600"></i>
                  </div>
                  <h3 className="text-xl font-medium text-gray-300 mb-2">该分类下暂无作品</h3>
                  <p className="text-gray-500 text-sm">我们会尽快更新更多精彩案例。</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal (完全保留原有的 Modal 逻辑和样式) */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button 
            onClick={closeModal}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
          >
            <i className="fa fa-times text-4xl"></i>
          </button>

          <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 h-[90vh] lg:h-auto">
            {/* Left: Carousel */}
            <div className="lg:w-2/3 flex flex-col justify-center relative bg-black/50 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              
              {/* Main Media Display */}
              <div className="relative w-full h-[50vh] lg:h-[600px] flex items-center justify-center bg-black">
                 {selectedItem.category === Category.VIDEO && selectedItem.videoUrl && currentImageIndex === 0 ? (
                    <video 
                      src={selectedItem.videoUrl} 
                      controls 
                      controlsList="nodownload"
                      disablePictureInPicture
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-full h-full object-contain"
                      poster={selectedItem.cover}
                    />
                 ) : (
                    <WatermarkedImage 
                      src={selectedItem.images[currentImageIndex]} 
                      alt={`Slide ${currentImageIndex}`} 
                      className="w-full h-full object-contain"
                    />
                 )}
                 
                 {/* Navigation Arrows */}
                 {selectedItem.images.length > 1 && (
                   <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-all z-20"
                    >
                      <i className="fa fa-chevron-left"></i>
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-all z-20"
                    >
                      <i className="fa fa-chevron-right"></i>
                    </button>
                   </>
                 )}
              </div>

              {/* Thumbnails */}
              {selectedItem.images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto no-scrollbar bg-dark/50 border-t border-white/5">
                  {selectedItem.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                        currentImageIndex === idx ? 'border-primary opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                      }`}
                    >
                       <WatermarkedImage src={img} className="w-full h-full object-cover" alt="thumb" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="lg:w-1/3 flex flex-col text-left overflow-y-auto max-h-[40vh] lg:max-h-[600px] p-2">
              <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2">
                {CATEGORY_SECTIONS.find(c => c.id === selectedItem.category)?.label}
              </span>
              <h3 className="text-3xl font-bold text-white mb-6">{selectedItem.title}</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">客户 / 对象</h4>
                  <p className="text-gray-200">{selectedItem.client || '自研项目'}</p>
                </div>
                
                {selectedItem.awards && selectedItem.awards.length > 0 && (
                  <div>
                    <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">获得奖项</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.awards.map(award => (
                        <span key={award} className="text-yellow-400 text-sm flex items-center">
                          <i className="fa fa-trophy mr-2"></i>{award}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">项目描述</h4>
                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                    {selectedItem.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">标签</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-white text-xs">
                        #{tag}
                      </span>
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
