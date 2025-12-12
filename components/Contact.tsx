import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    phone: '',
    email: '',
    type: '',
    description: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // 模拟网络请求延迟，提升用户体验
    setTimeout(() => {
      // 目标邮箱 (保持与 About 页面一致)
      const targetEmail = '460117431@qq.com';
      
      // 构建邮件主题
      const subject = `【合作咨询】来自 ${formData.company || formData.name} 的合作意向`;
      
      // 构建邮件正文
      const body = `
--------------------------------------------------
【客户信息】
公司名称: ${formData.company || '未填写'}
联系人:   ${formData.name}
联系电话: ${formData.phone}
电子邮箱: ${formData.email || '未填写'}

【合作详情】
合作类型: ${getLabelForType(formData.type)}
--------------------------------------------------
【需求描述】
${formData.description || '无详细描述'}
--------------------------------------------------
(此邮件由官网自动生成，请点击发送)
      `.trim();

      // 使用 mailto 协议唤起本地邮件客户端
      // 注意：如果您希望在后台静默发送邮件而不打开客户端，建议接入 EmailJS 或 Formspree 服务
      const mailtoLink = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      window.location.href = mailtoLink;
      
      setStatus('success');
      
      // 不自动重置表单，以便用户查看刚才填写的内容
    }, 800);
  };

  return (
    <section id="contact" className="py-24 relative bg-dark">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-secondary text-sm font-bold tracking-widest uppercase mb-2 block">Contact Us</span>
          <h2 className="text-4xl font-bold text-white mb-6">开启合作之旅</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="glass-card rounded-2xl p-8 md:p-12 max-w-4xl mx-auto border-t border-white/10 relative overflow-hidden">
            {/* Success Overlay */}
            {status === 'success' && (
                <div className="absolute inset-0 z-10 bg-dark/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 animate-fade-in-up">
                    <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-6">
                        <i className="fa fa-check text-4xl text-success"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">感谢您的咨询！</h3>
                    <p className="text-gray-400 max-w-md mb-8">
                        您的邮件客户端已自动唤起，请点击客户端中的<span className="text-white font-bold">“发送”</span>按钮完成提交。<br/>
                        <span className="text-sm mt-2 block opacity-70">如未自动弹出，请手动发送至 460117431@qq.com</span>
                    </p>
                    <button 
                        onClick={() => setStatus('idle')}
                        className="px-8 py-3 rounded-xl border border-white/20 hover:bg-white/10 text-white transition-all font-medium"
                    >
                        返回表单
                    </button>
                </div>
            )}

          <form className="space-y-6 relative z-0" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">公司名称</label>
                <input 
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm transition-colors placeholder-gray-600" 
                  placeholder="请输入公司名称" 
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">联系人 <span className="text-secondary">*</span></label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm transition-colors placeholder-gray-600" 
                  placeholder="请输入联系人姓名" 
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">联系电话 <span className="text-secondary">*</span></label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm transition-colors placeholder-gray-600" 
                  placeholder="请输入联系电话" 
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">电子邮箱</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm transition-colors placeholder-gray-600" 
                  placeholder="请输入电子邮箱" 
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">合作需求 <span className="text-secondary">*</span></label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm appearance-none cursor-pointer"
              >
                <option value="">请选择合作类型</option>
                <option value="brand">品牌全案合作</option>
                <option value="video">视频制作合作</option>
                <option value="training">智能培训合作</option>
                <option value="exhibition">交互展陈合作</option>
                <option value="other">其他合作需求</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">需求描述</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4} 
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm resize-none placeholder-gray-600" 
                placeholder="请详细描述您的合作需求..."
              ></textarea>
            </div>
            <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-lg hover:shadow-primary/25 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {status === 'sending' ? (
                  <>
                    <i className="fa fa-circle-o-notch fa-spin mr-2"></i> 正在处理...
                  </>
              ) : (
                  '提交合作申请'
              )}
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">
                点击提交后将自动唤起您的邮件客户端
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
