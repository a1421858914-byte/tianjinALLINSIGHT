import { Category, PortfolioItem } from '../types';

/**
 * ==================================================================================
 *  USER GUIDE: HOW TO REPLACE IMAGES AND VIDEOS
 * ==================================================================================
 * 
 * 1. Place your image files in a 'public/images' folder (create it if it doesn't exist).
 * 2. Replace the placeholder URLs (https://picsum.photos/...) with your file paths.
 *    Example: change "https://picsum.photos/800/600" to "/images/brand/project1.jpg"
 * 
 * 3. 'cover': The image shown on the main list.
 * 4. 'images': An array of images shown in the popup carousel.
 * 5. 'videoUrl': Optional. If present, shows a video player.
 */

export const portfolioItems: PortfolioItem[] = [
  // --- Brand Design (品牌全案) ---
  {
    id: 'brand-1',
    title: '节气灵兽 (Spirits of Solar Terms)',
    category: Category.BRAND,
    client: '学院奖、织采宫',
    description: '山海经 X 二十四节气 IP全案设计。通过AI辅助设计，将传统文化与现代审美结合。',
    awards: ['美国设计奖', '法国设计奖', '缪斯设计奖'],
    tags: ['IP全案', '包装设计', '文创周边'],
    cover: '/images/节气灵兽封面.png',// 对应 public/images/下的文件
    images: [
      '/images/Allinsight-品牌全案_04.jpg',
      '/images/节气灵兽1.jpg', 
      '/images/节气灵兽2.jpg', 
      '/images/节气灵兽3.jpg', 
      '/images/节气灵兽4.jpg', 
      '/images/节气灵兽5.jpg', 
      '/images/节气灵兽6.jpg', 
      '/images/节气灵兽7.jpg', 
      '/images/节气灵兽8.jpg', 
      '/images/Allinsight-品牌全案_03.jpg', 
      '/images/Allinsight-品牌全案_05.jpg',
      '/images/节气灵兽9.jpg', 
      '/images/节气灵兽10.jpg', 
      '/images/节气灵兽11.jpg'
    ]
  },
  {
    id: 'brand-2',
    title: '创小星 (Chuang Xiaoxing)',
    category: Category.BRAND,
    client: '广告人集团',
    description: '青春好物节品牌IP全案。包含LOGO设计、IP形象建模及延展文创。',
    tags: ['LOGO', 'IP形象', '文创'],
    cover: '/images/Allinsight-品牌全案_10.jpg',// 对应 public/images/下的文件
    images: [
      '/images/创小星1.jpg',
      '/images/Allinsight-品牌全案_09.jpg',
      '/images/Allinsight-品牌全案_10.jpg',
      '/images/Allinsight-品牌全案_11.jpg',
      '/images/创小星2.jpg',
      '/images/创小星3.jpg',
      '/images/创小星4.jpg',
      '/images/创小星5.jpg',
      '/images/创小星6.jpg',
      '/images/创小星7.jpg'
    ]
  },
  {
    id: 'brand-3',
    title: '傲娇小站 (Pride Station)',
    category: Category.BRAND,
    client: '津南区小站稻',
    description: '“躬身的希望，昂首的骄傲”。津南区特产小站稻的IP形象设计与文创落地。',
    tags: ['IP形象', '地方文旅', '3D打印'],
    cover: '/images/Allinsight-品牌全案_15.jpg',
    images: [
      '/images/Allinsight-品牌全案_13.jpg',
      '/images/Allinsight-品牌全案_14.jpg',
      '/images/Allinsight-品牌全案_15.jpg'
    ]
  },
  {
    id: 'brand-4',
    title: '织采采 / 香香象',
    category: Category.BRAND,
    client: '武清区织采宫',
    description: '非遗文化IP化设计，结合盲盒包装与文创产品开发。',
    tags: ['IP形象', '包装设计', '非遗'],
    cover: '/images/织采采4.jpg',
    images: [
      '/images/织采采1.jpg',
      '/images/织采采2.jpg',
      '/images/织采采3.jpg',
      '/images/织采采4.jpg',
      '/images/织采采5.jpg',
      '/images/织采采6.jpg',
      '/images/织采采7.jpg',
      '/images/织采采8.jpg',
      '/images/织采采9.jpg'
    ]
  },
  {
    id: 'brand-5',
    title: '金瑞 (Jinrui)',
    category: Category.BRAND,
    client: '天津市金街',
    description: '天津市金街IP征集设计一等奖作品。',
    awards: ['天津市金街IP征集一等奖'],
    tags: ['IP形象', '手办'],
    cover: '/images/金街2.jpg', 
    images: [
      '/images/金街1.jpg',  
      '/images/金街2.jpg', 
      '/images/金街3.jpg', 
      '/images/金街4.jpg'
    ]
  },
  {
    id: 'brand-6',
    title: '大龙邮局 龙族IP',
    category: Category.BRAND,
    client: '和平区中国邮政',
    description: '大龙邮局专属IP形象设计及邮政周边文创。',
    tags: ['IP形象', '文创', '邮政'],
    cover: '/images/大龙邮局5.jpg', 
    images: [
      '/images/大龙邮局1.jpg',   
      '/images/大龙邮局2.jpg',  
      '/images/大龙邮局3.jpg', 
      '/images/大龙邮局4.jpg', 
      '/images/大龙邮局5.jpg'
    ]
  },
   {
    id: 'brand-7',
    title: '天津金皇大酒店 IP形象设计',
    category: Category.BRAND,
    client: '天津金皇大酒店',
    description: '天津金皇大酒店专属IP形象设计及周边文创。',
    tags: ['IP形象', '文创', '培训', '智能体', '培训'],
    cover: '/images/金皇1.jpg', 
    images: [
      '/images/金皇1.jpg', 
      '/images/金皇2.jpg',
      '/images/金皇3.jpg',
      '/images/金皇4.jpg',
      '/images/金皇5.jpg',
      '/images/金皇6.jpg'
    ]
  },
  {
    id: 'brand-8',
    title: '2024中泰职业教育国际产教融合发展研讨会会议 雕塑及伴手礼',
    category: Category.BRAND,
    client: '2024中泰职业教育国际产教融合发展研讨会会议',
    description: '2024中泰职业教育国际产教融合发展研讨会会议主题雕塑及伴手礼。',
    tags: ['IP手办', '雕塑' ],
    cover: '/images/喜哥巧妹1.jpg', 
    images: [
      '/images/喜哥巧妹1.jpg',
      '/images/喜哥巧妹2.jpg',
      '/images/喜哥巧妹3.jpg',
      '/images/喜哥巧妹4.jpg',
      '/images/喜哥巧妹5.jpg'
    ]
  },
  {
    id: 'brand-9',
    title: '中建新科 IP形象',
    category: Category.BRAND,
    client: '中建新科',
    description: '中建新科IP形象及伴手礼。',
    tags: ['IP形象', '产品图册', '伴手礼' ],
    cover: '/images/科宝1.jpg', 
    images: [
      '/images/科宝1.jpg',
      '/images/科宝2.jpg',
      '/images/科宝3.jpg',
      '/images/科宝4.jpg',
      '/images/科宝5.jpg'
    ]
  },
  {
    id: 'brand-10',
    title: '武清果蔬 萌宠系列',
    category: Category.BRAND,
    client: '武清区农委',
    description: '武清果树萌宠IP。',
    tags: ['IP形象'],
    cover: '/images/武清1.png', 
    images: [
      '/images/武清1.png',
      '/images/武清2.jpg',
      '/images/武清3.jpg',
      '/images/武清4.jpg',
      '/images/武清5.jpg',
      '/images/武清6.jpg',
      '/images/武清7.jpg'
    ]
  },

  // --- Video Production (视频制作) ---
  {
    id: 'video-1',
    title: '金皇酒店宣传视频',
    category: Category.VIDEO,
    client: '天津金皇大酒店',
    description: '金皇酒店IP与实景结合的创意宣传视频。',
    tags: ['宣传视频', '实景合成'],
    cover: '/images/金皇封面1.jpg',
    videoUrl: '/images/videos/金皇.mp4', 
    images: ['https://picsum.photos/1200/800?random=20']
  },
  {
    id: 'video-2',
    title: '2024青春盛典',
    category: Category.VIDEO,
    client: '广告人集团',
    description: '创意星球学院奖颁奖典礼定制视频，大气磅礴的视觉呈现。',
    tags: ['颁奖典礼', '活动视频'],
    cover: '/images/学院奖封面1.jpg', 
    videoUrl: '/images/videos/学院奖1.mp4',
    images: ['https://picsum.photos/1200/800?random=22']
  },
  {
    id: 'video-3',
    title: '聊斋新语',
    category: Category.VIDEO,
    client: '自研',
    description: '基于AIGC生成的艺术风格化视频，重构聊斋志异的奇幻世界。',
    tags: ['AI视频', '艺术'],
    cover: '/images/画皮封面.png', 
    videoUrl: '/images/videos/聊斋新语1.mp4',
    images: ['https://picsum.photos/1200/800?random=22']
  },
  {
    id: 'video-4',
    title: '哪吒反诈之年报风云',
    category: Category.VIDEO,
    client: '津南区市场监管局',
    description: '荣获东方设计奖全国一等奖的公益普法视频，以哪吒形象进行反诈宣传。',
    awards: ['东方设计奖一等奖'],
    tags: ['公益视频', 'MG动画'],
    cover: '/images/哪吒封面1.jpg', 
    videoUrl: '/images/videos/哪吒反诈.mp4',
    images: ['https://picsum.photos/1200/800?random=23']
  },
   {
    id: 'video-5',
    title: '津问',
    category: Category.VIDEO,
    client: '河北区政府',
    description: '基于AIGC生成的艺术风格化视频。',
    tags: ['公益视频'],
    cover: '/images/津问封面1.jpg', 
    videoUrl: '/images/videos/津问.mp4',
    images: ['https://picsum.photos/1200/800?random=23']
  },

  // --- Smart Training (智能培训) ---
  {
    id: 'training-1',
    title: 'Agent智能体定制与培训',
    category: Category.TRAINING,
    client: '江苏海洋大学、东方好创意等',
    description: '提供AIGC学习、智能体搭建、八小时定向设计挑战赛等专业培训服务。',
    tags: ['AI培训', 'Agent', '教育'],
    cover: '/images/Allinsight-智能培训_02.jpg',
    images: [
      '/images/Allinsight-智能培训_02.jpg',
      '/images/Allinsight-智能培训_03.jpg', 
      '/images/Allinsight-智能培训_04.jpg',
      '/images/Allinsight-智能培训_05.jpg',
      '/images/Allinsight-智能培训_06.jpg'
    ]
  },
  {
    id: 'training-2',
    title: '中意师生共创AIGC电影',
    category: Category.TRAINING,
    client: '意大利约布斯学院',
    description: 'AIGC艺术设计培训，跨国合作项目 "Painted Skin Workshop"。',
    tags: ['国际交流', 'AI电影'],
    cover: '/images/培训意大利1.jpg', 
    images: [
      '/images/Allinsight-智能培训_07.jpg',
      '/images/Allinsight-智能培训_08.jpg',
      '/images/Allinsight-智能培训_09.jpg',     
      '/images/Allinsight-智能培训_10.jpg',      
      '/images/Allinsight-智能培训_11.jpg',      
      '/images/Allinsight-智能培训_12.jpg',     
      '/images/Allinsight-智能培训_13.jpg',       
    ]
  },

  // --- Interactive Exhibition (交互展陈) ---
  {
    id: 'exhibit-1',
    title: 'AR沉浸式数字交互方案',
    category: Category.EXHIBITION,
    client: '河北区政府',
    description: '结合AR技术与实景雕塑，实现“名人复活”般的互动体验。',
    tags: ['AR', '交互设计', '数字展陈'],
    cover: '/images/Allinsight-交互展陈_01.jpg',
    images: ['/images/交互河北区1.jpg']
  },
  {
    id: 'exhibit-2',
    title: 'AI+艺术思政协同创新中心',
    category: Category.EXHIBITION,
    client: '天津商务职业学院',
    description: '校园展陈设计，数字化互动大屏与实体展板的结合。',
    tags: ['展厅设计', '校园文化'],
    cover: '/images/Allinsight-交互展陈_01.jpg', 
    images: [
      '/images/交互学校1.jpg',
      '/images/交互学校2.jpg',
      '/images/交互学校3.jpg',
      '/images/交互学校4.jpg',
      '/images/交互学校5.jpg',
      '/images/交互学校6.jpg',
      '/images/交互学校7.jpg',
    ]
  }
];
