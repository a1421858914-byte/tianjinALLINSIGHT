import React, { useEffect, useState } from 'react';

interface WatermarkedImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

const WatermarkedImage: React.FC<WatermarkedImageProps> = ({ src, alt, className, onClick }) => {
  const [processedSrc, setProcessedSrc] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    
    // 允许跨域加载图片（对于外部图床很重要）
    img.crossOrigin = "Anonymous";
    img.src = src;

    img.onload = () => {
      if (!isMounted) return;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        setProcessedSrc(src); // 如果不支持canvas，降级显示原图
        setLoading(false);
        return;
      }

      // 设置画布大小为图片原始大小
      canvas.width = img.width;
      canvas.height = img.height;

      // 1. 绘制原图
      ctx.drawImage(img, 0, 0);

      // 2. 绘制水印配置
      const text = "ALLINSIGHT";
      
      // 动态计算字体大小 (根据图片宽度自适应，约占宽度的1/6)
      const fontSize = Math.floor(canvas.width / 8); 
      ctx.font = `900 ${fontSize}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // 旋转角度 (45度)
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 6);

      // 绘制文字阴影 (增加立体感和可读性)
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 4;
      ctx.shadowOffsetY = 4;

      // 绘制文字描边 (半透明白色)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = fontSize / 20;
      ctx.strokeText(text, 0, 0);

      // 绘制文字填充 (半透明白色)
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
      ctx.fillText(text, 0, 0);

      ctx.restore();

      // 生成带水印的图片 DataURL
      try {
        const watermarkedData = canvas.toDataURL('image/jpeg', 0.9);
        setProcessedSrc(watermarkedData);
      } catch (e) {
        console.warn("Could not watermark image (likely CORS issue):", e);
        setProcessedSrc(src); // 跨域失败降级显示原图
      }
      
      setLoading(false);
    };

    img.onerror = () => {
        if (!isMounted) return;
        setProcessedSrc(src);
        setLoading(false);
    };

    return () => { isMounted = false; };
  }, [src]);

  return (
    <>
      {/* 这是一个保护层，禁止鼠标拖拽和右键菜单 */}
      <img 
        src={processedSrc || src} 
        alt={alt} 
        className={`${className} ${loading ? 'opacity-0' : 'opacity-100'}`}
        onClick={onClick}
        onContextMenu={(e) => e.preventDefault()} // 禁用右键
        draggable="false" // 禁用拖拽
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }} // 禁用选择
      />
      {/* 加载占位 */}
      {loading && (
        <div className={`absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center ${className}`}>
           <i className="fa fa-picture-o text-white/20 text-4xl"></i>
        </div>
      )}
    </>
  );
};

export default WatermarkedImage;
