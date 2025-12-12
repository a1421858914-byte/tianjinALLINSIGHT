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
        setProcessedSrc(src); 
        setLoading(false);
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;

      // 1. 绘制原图
      ctx.drawImage(img, 0, 0);

      // 2. 绘制巨大的水印 (仅下载时可见)
      const text = "ALLINSIGHT";
      const fontSize = Math.floor(canvas.width / 6); // 字体非常大
      ctx.font = `900 ${fontSize}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 6); // 倾斜30度

      // 强烈的阴影
      ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 8;
      ctx.shadowOffsetY = 8;

      // 明显的描边
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = fontSize / 15;
      ctx.strokeText(text, 0, 0);

      // 半透明填充
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.fillText(text, 0, 0);

      ctx.restore();

      try {
        const watermarkedData = canvas.toDataURL('image/jpeg', 0.9);
        setProcessedSrc(watermarkedData);
      } catch (e) {
        console.warn("Watermark failed (CORS):", e);
        setProcessedSrc(src);
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
    <div className="relative w-full h-full select-none" style={{ display: 'grid' }}>
      {/* 
        层级 1: 可见的无水印原图 
        用户在网页上看到的是这个干净的图。
      */}
      <img 
        src={src} 
        alt={alt} 
        className={className} 
        style={{ gridArea: '1/1', zIndex: 1 }}
        draggable="false"
      />

      {/* 
        层级 2: 不可见的水印图覆盖层
        完全透明 (opacity: 0) 但位于顶层 (zIndex: 2)。
        当用户右键保存或复制时，实际上操作的是这一层带水印的图片。
      */}
      <img 
        src={processedSrc || src} 
        alt={alt} 
        className={className}
        style={{ 
            gridArea: '1/1', 
            zIndex: 2, 
            opacity: 0, 
            cursor: onClick ? 'pointer' : 'default' 
        }}
        onClick={onClick}
        draggable="false"
        // 故意不阻止 contextMenu，让用户可以点击“另存为”，但存下来的是水印图
      />

      {/* 加载状态 */}
      {loading && (
        <div 
          className={`absolute inset-0 bg-gray-900/20 flex items-center justify-center z-10 rounded-lg backdrop-blur-sm pointer-events-none`} 
          style={{ gridArea: '1/1' }}
        >
           <i className="fa fa-circle-o-notch fa-spin text-white/50 text-2xl"></i>
        </div>
      )}
    </div>
  );
};

export default WatermarkedImage;
