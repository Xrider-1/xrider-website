const DB_KEY = 'bassel_services';

const DEFAULT_SERVICES = [
  {
    id: 1,
    name: 'تصميم الهوية البصرية',
    description: 'بناء هويات بصرية متكاملة تعكس شخصية العلامة التجارية وتميزها في السوق — من الشعار إلى نظام الألوان والطباعة.'
  },
  {
    id: 2,
    name: 'تصميم واجهات المستخدم (UI)',
    description: 'تصميم واجهات تطبيقات ومواقع جذابة وسهلة الاستخدام، مع الاهتمام بأدق التفاصيل البصرية والتفاعلية.'
  },
  {
    id: 3,
    name: 'تجربة المستخدم (UX)',
    description: 'دراسة سلوك المستخدم وبناء رحلات واضحة تحول الأفكار إلى منتجات رقمية تسعد المستخدم وتحقق الأهداف التجارية.'
  },
  {
    id: 4,
    name: 'تصميم الجرافيك',
    description: 'مواد تسويقية، منشورات سوشيال ميديا، وبروشورات احترافية تعزز حضور علامتك التجارية بصريا.'
  },
  {
    id: 5,
    name: 'النمذجة والتصميم التفاعلي',
    description: 'إنشاء نماذج أولية تفاعلية (Prototypes) باستخدام Figma واختبارها قبل التطوير لتوفير الوقت والتكلفة.'
  },
  {
    id: 6,
    name: 'استشارات التصميم',
    description: 'مراجعة تصاميمك الحالية وتقديم توصيات عملية لتحسين الجودة البصرية وتجربة المستخدم وتناسق الهوية.'
  }
];

const db = {
  getAll() {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      localStorage.setItem(DB_KEY, JSON.stringify(DEFAULT_SERVICES));
      return DEFAULT_SERVICES;
    }
    return JSON.parse(raw);
  },

  save(services) {
    localStorage.setItem(DB_KEY, JSON.stringify(services));
  },

  add(service) {
    const services = this.getAll();
    const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
    const newService = { id: newId, ...service };
    services.push(newService);
    this.save(services);
    return newService;
  },

  remove(id) {
    const services = this.getAll().filter(s => s.id !== id);
    this.save(services);
  },

  update(id, data) {
    const services = this.getAll().map(s => s.id === id ? { ...s, ...data } : s);
    this.save(services);
  },

  reset() {
    localStorage.setItem(DB_KEY, JSON.stringify(DEFAULT_SERVICES));
    return DEFAULT_SERVICES;
  }
};