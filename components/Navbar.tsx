// 修复1：useState 拼写错误
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  // 修复2：变量名统一（原 setisscrolled 改为 setIsScrolled，符合驼峰命名）
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
        {/* 修复3：标签嵌套（a标签移入logo的div内部） */}
        <div className="logo">
          <a href="#" className="group flex items-center gap-3">
            {/* 修复4：img标签闭合 + 注释格式 */}
            <img 
              src="/images/logo.png"
              alt="logo" 
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold"
            />
            {/* 修复5：注释加空格 */}
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white leading-none group-hover:text-primary transition-colors">天津ALLINSIGHT</span>
              <span className="text-[10px] tracking-widest text-gray-400 uppercase">Portfolio</span>
            </div>
          </a>
        </div>

        {/* 桌面导航 */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* 移动端菜单按钮 */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <<i className="fa fa-bars"></</i>
        </button>
      </div>

      {/* 移动菜单 */}
      {mobileMenuOpen && (
        <div className="mobile-menu fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-8 text-white">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-xl font-bold tracking-tight text-white leading-none group-hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button 
              className="px-6 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-all hover:border-white/30"
              onClick={() => setMobileMenuOpen(false)}
            >
              联系我
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
