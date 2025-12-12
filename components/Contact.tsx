import React, { useState } from 'react';

// =================================================================
// 📧 邮箱配置区域
// =================================================================
const CONTACT_CONFIG = {
  // 接收表单信息的邮箱地址
  TARGET_EMAIL: '1421858914@qq.com', 
  
  // 邮件服务接口 (使用 FormSubmit 的 AJAX 接口)
  API_URL: 'https://formsubmit.co/ajax/1421858914@qq.com',
};
// =================================================================

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    phone: '',
    email: '',
    type: '',
    description: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getLabelForType = (type: string) => {
    const map: Record<string, string> = {
      'brand': '品牌全案合作',
      'video': '视频制作合作',
      'training': '智能培训合作',
      'exhibition': '交互展陈合作',
      'other': '其他合作需求'
    };
    return map[type] || '未选择';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(CONTACT_CONFIG.API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          // 特殊字段配置 (FormSubmit配置)
          _subject: `【官网咨询】来自 ${formData.company || formData.name} 的合作意向`,
          _template: "table", // 使用表格样式让邮件更整洁
          _captcha: "false",  // 关闭验证码 (如果垃圾邮件多可开启)
          
          // 实际发送的数据 (中文Key方便您在邮件里阅读)
          "公司名称": formData.company || "未填写",
          "联系人": formData.name,
          "联系电话": formData.phone,
          "电子邮箱": formData.email || "未填写",
          "合作类型": getLabelForType(formData.type),
          "需求描述": formData.description || "无详细描述"
        })
      });

      if (response.ok) {
        setStatus('success');
        // 可选：清空表单
        // setFormData({ company: '', name: '', phone: '', email: '', type: '', description: '' });
      } else {
        console.error("提交失败", response);
        setStatus('error');
      }
    } catch (error) {
      console.error("网络错误", error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-dark">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <span className="text-secondary text-sm font-bold tracking-widest uppercase mb-2 block">Contact Us</span>
          <h2 className="text-4xl font-bold text-white mb-6">开启合作之旅</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="glass-card rounded-2xl p-8 md:p-12 max-w-4xl mx-auto border-t border-white/10 relative overflow-hidden shadow-2xl shadow-black/50">
            {/* Success Overlay */}
            {status === 'success' && (
                <div className="absolute inset-0 z-10 bg-dark/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 animate-fade-in-up">
                    <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-6 ring-1 ring-success/50">
                        <i className="fa fa-check text-4xl text-success"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">提交成功！</h3>
                    <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
                        感谢您的咨询。我们已收到您的合作意向，项目经理将在24小时内通过电话或邮件与您联系。
                    </p>
                    <button 
                        onClick={() => setStatus('idle')}
                        className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 text-white transition-all font-medium text-sm tracking-wide"
                    >
                        返回
                    </button>
                </div>
            )}

            {/* Error Overlay */}
            {status === 'error' && (
                <div className="absolute inset-0 z-10 bg-dark/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 animate-fade-in-up">
                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-6 ring-1 ring-red-500/50">
                        <i className="fa fa-exclamation-triangle text-4xl text-red-500"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">发送失败</h3>
                    <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
                        抱歉，网络连接出现问题，信息未能送达。
                        <br/>
                        请直接发送邮件至：<strong className="text-white">{CONTACT_CONFIG.TARGET_EMAIL}</strong>
                    </p>
                    <button 
                        onClick={() => setStatus('idle')}
                        className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 text-white transition-all font-medium text-sm tracking-wide"
                    >
                        返回重试
                    </button>
                </div>
            )}

          <form className="space-y-6 relative z-0" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">公司名称</label>
                <input 
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-white text-sm transition-all placeholder-gray-600 hover:border-white/20" 
                  placeholder="请输入公司名称" 
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">联系人 <span className="text-secondary">*</span></label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-white text-sm transition-all placeholder-gray-600 hover:border-white/20" 
                  placeholder="请输入联系人姓名" 
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">联系电话 <span className="text-secondary">*</span></label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-white text-sm transition-all placeholder-gray-600 hover:border-white/20" 
                  placeholder="请输入联系电话" 
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">电子邮箱</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-white text-sm transition-all placeholder-gray-600 hover:border-white/20" 
                  placeholder="请输入电子邮箱" 
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">合作需求 <span className="text-secondary">*</span></label>
              <div className="relative">
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-white text-sm appearance-none cursor-pointer hover:border-white/20"
                >
                  <option value="">请选择合作类型</option>
                  <option value="brand">品牌全案合作</option>
                  <option value="video">视频制作合作</option>
                  <option value="training">智能培训合作</option>
                  <option value="exhibition">交互展陈合作</option>
                  <option value="other">其他合作需求</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <i className="fa fa-angle-down"></i>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">需求描述</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4} 
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-white text-sm resize-none placeholder-gray-600 hover:border-white/20" 
                placeholder="请详细描述您的合作需求..."
              ></textarea>
            </div>
            <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-lg hover:shadow-primary/25 transition-all transform hover:-translate-y-1 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center tracking-wide text-sm md:text-base"
            >
              {status === 'sending' ? (
                  <>
                    <i className="fa fa-circle-o-notch fa-spin mr-2"></i> 正在发送中...
                  </>
              ) : (
                  '提交合作申请'
              )}
            </button>
            <p className="text-center text-xs text-gray-600 mt-4">
                信息将加密并直接发送至我们的官方邮箱
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
