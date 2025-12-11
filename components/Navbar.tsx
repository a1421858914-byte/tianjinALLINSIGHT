import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '首页', href: '#home' },
    { name: '精选作品', href: '#works' },
    { name: '服务体系', href: '#services' },
    { name: '关于我们', href: '#about' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav shadow-lg shadow-black/30' : ''}`}>
      <div className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        {/* Logo 区域 */}
        <div className="logo">
          <a href="#" className="group flex items-center gap-3">
            <img 
              src="/images/logo.png"
              alt="天津ALLINSIGHT logo"
              className="w-10 h-10 rounded-lg object-contain"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">天津ALLINSIGHT</span>
              <span className="text-[10px] text-gray-400 uppercase">品牌案例</span>
            </div>
          </a>
        </div>

        {/* 桌面端导航 */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm text-gray-300 hover:text-white">
              {link.name}
            </a>
          ))}
        </div>

        {/* 移动端菜单按钮（修复标签语法 + onClick 格式） */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <<i className="fa fa-bars"></</i>
        </button>
      </div>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-8 text-white">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-xl font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button 
              className="px-6 py-2 border border-white/20 bg-white/5 hover:bg-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              联系我
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
