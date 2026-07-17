/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  FoodItem,
  LaundryItem,
  SpaService,
  Therapist,
  Activity,
  Offer,
  InvoiceItem,
  Notification,
  ReservationHistory,
  TimelineEvent,
  HotelFacility,
  HotelAnnouncement,
  TodayEvent,
  ConciergeService,
  Review,
  LoyaltyTier,
  WalletTransaction,
  LocalPlace,
  FavoriteOrder,
} from './types';

export const hotelDetails = {
  name: 'منتجع الأمان والريتز الملكي',
  location: 'الرياض، المملكة العربية السعودية',
  logo: '👑',
  phone: '+966 11 456 7890',
  email: 'reception@royal-aman.com',
  wifiPassword: 'AmanRoyal@702',
  roomPhone: '7020',
  emergencyNumbers: ['99', '997', '998'],
};

// Sample Guest Data (for demo purposes)
export const sampleGuest = {
  name: 'محمد',
  lastName: 'آل سعود',
  roomNumber: '702',
  reservationNumber: 'RA-982341',
  checkInDate: '2024-01-15',
  checkOutDate: '2024-01-20',
  hotelName: 'منتجع الأمان والريتز الملكي',
  roomType: 'جناح ملكي مع إطلالة',
  bedType: 'King Size',
  guestCount: 2,
  childrenCount: 1,
  loyaltyPoints: 4500,
  balanceDue: 2500,
  paidAmount: 7500,
  totalAmount: 10000,
  taxes: 1500,
  discounts: 500,
  promoCode: 'ROYAL20',
  reservationStatus: 'مؤكد' as const,
  email: 'mohammed.alsaud@example.com',
  phone: '+966 50 123 4567',
};

export const foodCategories = [
  { id: 'all', name: 'الكل' },
  { id: 'breakfast', name: 'الفطور' },
  { id: 'lunch', name: 'الغداء' },
  { id: 'dinner', name: 'العشاء' },
  { id: 'dessert', name: 'الحلويات' },
  { id: 'drinks', name: 'المشروبات' },
  { id: 'coffee', name: 'القهوة' },
  { id: 'kids', name: 'وجبات الأطفال' },
  { id: 'snacks', name: 'الوجبات الخفيفة' },
];

// foodItems removed - now fetched from API via getMenu()

export const favoriteOrders: FavoriteOrder[] = [
  {
    id: 'fo1',
    title: 'فطور الصباح المفضل',
    items: 'فطور الرياض الفاخر، قهوة سعودية ملكية',
    lastOrdered: '2026-07-05',
  },
  {
    id: 'fo2',
    title: 'عشاء الجناح الهادئ',
    items: 'كبسة الحاشي الملكية، عصير باشن فروت',
    lastOrdered: '2026-07-04',
  },
];

export const laundryItems: LaundryItem[] = [
  { id: 'l1', name: 'بشت ملكي فاخر', price: 150, category: 'men' },
  { id: 'l2', name: 'ثوب سعودي ممتاز', price: 65, category: 'men' },
  { id: 'l3', name: 'شماغ وعقال غسيل وكي مستعجل', price: 40, category: 'men' },
  { id: 'l4', name: 'بدلة رجالية قطعتين (غسيل جاف)', price: 120, category: 'men' },
  { id: 'l5', name: 'قميص رجالي فاخر', price: 35, category: 'men' },
  { id: 'l6', name: 'عباءة حريرية مطرزة', price: 90, category: 'women' },
  { id: 'l7', name: 'فستان سهرة فاخر (غسيل جاف)', price: 180, category: 'women' },
  { id: 'l8', name: 'قفطان مغربي مطرز بخيوط ذهبية', price: 160, category: 'women' },
  { id: 'l9', name: 'طرحة أو شال حرير', price: 30, category: 'women' },
  { id: 'l10', name: 'معطف من صوف الكشمير', price: 200, category: 'dryclean' },
  { id: 'l11', name: 'سترة مخملية فاخرة', price: 110, category: 'dryclean' },
  { id: 'l12', name: 'سجادة صلاة فاخرة مطرزة بالحرير', price: 80, category: 'dryclean' },
];

export const laundryPriceList = [
  { service: 'غسيل وكي عادي', price: 'من ٣٥ ر.س', time: '٢٤ ساعة' },
  { service: 'غسيل جاف فاخر', price: 'من ٨٠ ر.س', time: '٤٨ ساعة' },
  { service: 'خدمة سريعة', price: '+٥٠٪', time: '٤ ساعات' },
  { service: 'كي فقط', price: 'من ٢٠ ر.س', time: '٣ ساعات' },
];

export const laundryHistory = [
  { id: 'lh1', title: 'بشت ملكي فاخر + ثوبين سعوديين', date: '2026-07-05', status: 'مكتمل', amount: 280, delivery: 'تم التعليق بالخزانة' },
  { id: 'lh2', title: 'بدلة رجالية + قميصين', date: '2026-07-04', status: 'مكتمل', amount: 190, delivery: 'تم التسليم 08:30 م' },
  { id: 'lh3', title: 'عباءة حريرية مطرزة', date: '2026-07-03', status: 'مكتمل', amount: 90, delivery: 'تم التسليم 07:15 م' },
];

export const spaServices: SpaService[] = [
  {
    id: 's1',
    name: 'جلسة تدليك الظهر بالأحجار البركانية الساخنة',
    description: 'علاج مهدئ بزيت العود الدافئ مع الأحجار البركانية لتخفيف التوتر وتحسين الدورة الدموية.',
    duration: '90 دقيقة',
    price: 650,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 's2',
    name: 'الحمام المغربي الملكي بالذهب والتين الشوكي',
    description: 'طقوس تنظيف تقليدية بتبخير بالأوكالبتوس وتقشير بكيس الكساب وقناع بالطمي وزيت التين الشوكي.',
    duration: '120 دقيقة',
    price: 850,
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 's3',
    name: 'علاج الوجه بالإكسير الذهبي للتجديد الفوري',
    description: 'علاج مضاد للشيخوخة برقائق الذهب عيار 24 وحمض الهيالورونيك لشد البشرة وإعادة توهجها.',
    duration: '60 دقيقة',
    price: 520,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd955f5975d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 's4',
    name: 'علاج العافية الشامل ومساج العود الدافئ',
    description: 'مزيج من التدليك السويدي والتايلندي والبالي بدهن العود الكمبودي المعتق.',
    duration: '90 دقيقة',
    price: 780,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
  },
];

export const therapists: Therapist[] = [
  { id: 't1', name: 'الخبير مراد (متخصص العلاج التايلندي)', gender: 'male', rating: 4.9 },
  { id: 't2', name: 'الخبير أحمد (أخصائي الأحجار الساخنة)', gender: 'male', rating: 4.8 },
  { id: 't3', name: 'الخبيرة ناديا (أخصائية العلاج الملكي السويدي)', gender: 'female', rating: 5.0 },
  { id: 't4', name: 'الخبيرة ياسمين (أخصائية الحمام المغربي)', gender: 'female', rating: 4.9 },
];

export const activities: Activity[] = [
  {
    id: 'a1',
    title: 'جولة الدرعية التاريخية الخاصة بسيارة كلاسيكية',
    description: 'اكتشف مهد الدولة السعودية الأولى في حي الطريف التاريخي المسجل في اليونسكو مع دليل خاص وعشاء في مطل البجيري.',
    time: 'يومياً، 4:00 عصراً - 9:00 مساءً',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    location: 'بوابة الدرعية التاريخية',
  },
  {
    id: 'a2',
    title: 'سفاري الكثبان الرملية الذهبية وخيمة ملكية',
    description: 'مغامرة ركوب الكثبان بسيارات الدفع الرباعي وركوب الجمال وعشاء فاخر تحت النجوم مع عروض العود.',
    time: 'يومياً، 3:00 مساءً - 10:00 مساءً',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    location: 'صحراء الرياض الذهبية',
  },
  {
    id: 'a3',
    title: 'عرض الصقور الخاص وتجربة القنص العربية',
    description: 'استعراض الصقور الحرة بإشراف مدربين سعوديين محترفين مع قهوة عربية في بيت الشعر التقليدي.',
    time: 'الخميس - السبت، 8:00 صباحاً - 11:30 صباحاً',
    price: 900,
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=800&q=80',
    location: 'واحة الصقور بالمنتجع',
  },
  {
    id: 'a4',
    title: 'ورشة الخط العربي التقليدي',
    description: 'تعلم فن الخط العربي مع خطاط محترف في أجواء تراثية أصيلة مع تذكار مكتوب باسمك.',
    time: 'يومياً، 10:00 صباحاً - 12:00 ظهراً',
    price: 350,
    image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=800&q=80',
    location: 'قاعة التراث بالمنتجع',
  },
];

// offers removed - now fetched from API via getSpecialOffers()

export const currentInvoice: InvoiceItem[] = [
  { id: 'i1', description: 'الإقامة - جناح ديلوكس الأمان الملكي (٣ ليالٍ)', date: '2026-07-04', amount: 10500 },
  { id: 'i2', description: 'خدمة الغرف - وجبة عشاء واغيو فاخر مع العصائر', date: '2026-07-04', amount: 965 },
  { id: 'i3', description: 'السبا الملكي - الحمام المغربي بالذهب ومساج الأحجار', date: '2026-07-05', amount: 1500 },
  { id: 'i4', description: 'الليموزين الفاخر - نقل VIP من مطار الملك خالد', date: '2026-07-04', amount: 450 },
  { id: 'i5', description: 'ميني بار - مشروبات ومكسرات فاخرة', date: '2026-07-05', amount: 280 },
  { id: 'i6', description: 'غسيل وكي - بشت ملكي وثوبين سعوديين', date: '2026-07-05', amount: 280 },
];

export const initialNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'مرحباً بك في منتجع الأمان الرياض 👑',
    message: 'يسرنا استضافتك سمو الشيخ سليمان. نعدك بتجربة مفعمة بالرفاهية والخصوصية التامة. مساعدك الشخصي بانتظار تلبية رغباتك.',
    time: 'منذ ساعة واحدة',
    read: false,
    type: 'info',
  },
  {
    id: 'n2',
    title: 'تأكيد حجز موعد السبا الملكي ✨',
    message: 'تم تأكيد جلسة تدليك الأحجار البركانية اليوم الساعة 6:00 مساءً مع الخبيرة ناديا. نرجو الوصول قبل 15 دقيقة.',
    time: 'منذ ساعتين',
    read: false,
    type: 'spa',
  },
  {
    id: 'n3',
    title: 'جاهزية طلب غسيل الملابس 👔',
    message: 'طلب غسيل وكي البشت الملكي جاهز وتم تعليقه بخزانتك الخاصة.',
    time: 'منذ 4 ساعات',
    read: true,
    type: 'order',
  },
  {
    id: 'n4',
    title: 'عرض حصري: ترقية الفيلا الملكية 🏰',
    message: 'خصم 35% على ترقية جناحك إلى فيلا بمسبح خاص. العرض ساري حتى نهاية إقامتك.',
    time: 'منذ 6 ساعات',
    read: false,
    type: 'promo',
  },
  {
    id: 'n5',
    title: 'تذكير: فعالية العزف على العود الليلة 🎵',
    message: 'تبدأ فعالية العزف على العود في الردهة الملكية الساعة 8:00 مساءً. الحضور مجاني لجميع النزلاء.',
    time: 'منذ 8 ساعات',
    read: true,
    type: 'info',
  },
  {
    id: 'n6',
    title: 'فاتورة جديدة: خدمة الغرف 🧾',
    message: 'تم إضافة مبلغ 965 ر.س لحسابك مقابل طلب عشاء واغيو. يمكنك مراجعة الفاتورة من قسم المدفوعات.',
    time: 'أمس',
    read: false,
    type: 'billing',
  },
];

export const faqs = [
  {
    q: 'ما هي أوقات تسجيل الدخول وتجربة المغادرة؟',
    a: 'تسجيل الدخول يبدأ من الساعة 2:00 ظهراً، والمغادرة المعتادة بحلول 12:00 ظهراً. لتمديد الإقامة أو مغادرة متأخرة، تواصل مع الاستقبال عبر التطبيق.',
  },
  {
    q: 'هل يتوفر مسبح خاص للعوائل؟',
    a: 'جميع الفيلات المستقلة تحتوي على مسابح خاصة مدفأة. كما يتوفر مسبح رئيسي خارجي وآخر مغلق للسيدات ملحق بمركز السبا.',
  },
  {
    q: 'كيف أطلب خدمة الخادم الشخصي؟',
    a: 'تتوفر خدمة المساعد الشخصي 24 ساعة للأجنحة الملكية مجاناً. أرسل رسالة للاستقبال أو اختر الخادم الشخصي من بوابة الخدمات.',
  },
  {
    q: 'هل يقدم السبا خدمات للرجال والنساء؟',
    a: 'يحتوي المنتجع على قسمين منفصلين للسبا: قسم فاخر للرجال وقسم ملكي للسيدات مجهز بجميع سبل الراحة.',
  },
  {
    q: 'ما هي كلمة مرور شبكة الواي فاي؟',
    a: `شبكة الواي فاي: AmanRoyal_Guest | كلمة المرور: ${hotelDetails.wifiPassword}. السرعة: 500 ميجابت/ثانية.`,
  },
  {
    q: 'كيف أبلغ عن وصول متأخر؟',
    a: 'يمكنك الإبلاغ عن الوصول المتأخر من قسم تسجيل الدخول الرقمي أو عبر دردشة الاستقبال. سنحتفظ بحجزك حتى الساعة 11 مساءً.',
  },
];

export const reservationHistory: ReservationHistory[] = [
  {
    id: 'rh1',
    reservationNumber: 'RA-982341',
    hotelName: 'منتجع رويال أمان الرياض',
    roomType: 'جناح ديلوكس الملكي',
    checkInDate: '2026-07-04',
    checkOutDate: '2026-07-11',
    totalAmount: 13915,
    status: 'قادم',
  },
  {
    id: 'rh2',
    reservationNumber: 'RA-871205',
    hotelName: 'منتجع رويال أمان جدة',
    roomType: 'فيلا شاطئية خاصة',
    checkInDate: '2026-03-15',
    checkOutDate: '2026-03-22',
    totalAmount: 28500,
    status: 'مكتمل',
  },
  {
    id: 'rh3',
    reservationNumber: 'RA-765890',
    hotelName: 'منتجع رويال أمان العلا',
    roomType: 'خيمة صحراوية فاخرة',
    checkInDate: '2025-12-20',
    checkOutDate: '2025-12-25',
    totalAmount: 15800,
    status: 'مكتمل',
  },
];

export const reservationTimeline: TimelineEvent[] = [
  {
    id: 'rt1',
    title: 'تأكيد الحجز',
    description: 'تم تأكيد حجزك رقم RA-982341 بنجاح',
    date: '2026-06-20',
    time: '10:30 ص',
    icon: '✅',
    status: 'completed',
  },
  {
    id: 'rt2',
    title: 'تسجيل الدخول الرقمي',
    description: 'اكتملت عملية تسجيل الدخول ورفع الوثائق',
    date: '2026-07-03',
    time: '08:15 م',
    icon: '📱',
    status: 'completed',
  },
  {
    id: 'rt3',
    title: 'الوصول والاستقبال',
    description: 'تم استقبالك في الردهة الملكية وتسليم مفاتيح الجناح 702',
    date: '2026-07-04',
    time: '02:45 م',
    icon: '🏨',
    status: 'completed',
  },
  {
    id: 'rt4',
    title: 'خدمات الجناح النشطة',
    description: 'طلبات الغرفة والسبا والغسيل قيد التنفيذ',
    date: '2026-07-06',
    time: 'الآن',
    icon: '⭐',
    status: 'current',
  },
  {
    id: 'rt5',
    title: 'تسجيل المغادرة',
    description: 'المغادرة المقررة يوم 11 يوليو 2026',
    date: '2026-07-11',
    time: '12:00 م',
    icon: '🚪',
    status: 'upcoming',
  },
];

export const stayTimeline: TimelineEvent[] = [
  {
    id: 'st1',
    title: 'الوصول والترحيب',
    description: 'استقبال ملكي مع عصير الترحيب الذهبي',
    date: '2026-07-04',
    time: '02:45 م',
    icon: '👑',
    status: 'completed',
  },
  {
    id: 'st2',
    title: 'جلسة السبا الملكي',
    description: 'حمام مغربي بالذهب ومساج الأحجار البركانية',
    date: '2026-07-05',
    time: '06:00 م',
    icon: '💆',
    status: 'completed',
  },
  {
    id: 'st3',
    title: 'عشاء واغيو في الجناح',
    description: 'وجبة عشاء فاخرة عبر خدمة الغرف',
    date: '2026-07-04',
    time: '08:30 م',
    icon: '🍽️',
    status: 'completed',
  },
  {
    id: 'st4',
    title: 'جولة الدرعية التاريخية',
    description: 'رحلة خاصة بسيارة رولز رويس كلاسيكية',
    date: '2026-07-07',
    time: '04:00 م',
    icon: '🏛️',
    status: 'upcoming',
  },
  {
    id: 'st5',
    title: 'تسجيل المغادرة',
    description: 'مغادرة الجناح 702',
    date: '2026-07-11',
    time: '12:00 م',
    icon: '✈️',
    status: 'upcoming',
  },
];

export const hotelFacilities: HotelFacility[] = [
  {
    id: 'spa',
    name: 'السبا الملكي',
    description: 'مركز عافية فاخر بعلاجات تقليدية وحديثة في أجواء من الخصوصية والهدوء.',
    hours: '9:00 ص - 11:00 م',
    location: 'الطابق الأرضي - الجناح الشرقي',
    capacity: '12 غرفة علاج',
    availability: 'متاح - ٣ مواعيد اليوم',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gym',
    name: 'النادي الرياضي',
    description: 'صالة رياضية مجهزة بأحدث الأجهزة مع مدربين شخصيين ومنطقة يوغا.',
    hours: '24 ساعة',
    location: 'الطابق الأول - البرج الغربي',
    capacity: '30 شخص',
    availability: 'متاح الآن',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pool',
    name: 'المسبح الخارجي',
    description: 'مسبح أولمبي مدفأ بإطلالة بانورامية على حدائق المنتجع.',
    hours: '6:00 ص - 10:00 م',
    location: 'الحديقة المركزية',
    capacity: '50 شخص',
    availability: 'متاح - ازدحام خفيف',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sauna',
    name: 'الساونا الفنلندية',
    description: 'ساونا جافة وبخار مع منطقة استرخاء وعصائر طبيعية.',
    hours: '10:00 ص - 10:00 م',
    location: 'ملحق السبا - الطابق الأرضي',
    capacity: '8 أشخاص',
    availability: 'متاح',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'steam',
    name: 'غرفة البخار',
    description: 'غرفة بخار عطرية بالأعشاب الطبيعية واليوسفي.',
    hours: '10:00 ص - 10:00 م',
    location: 'ملحق السبا - الطابق الأرضي',
    capacity: '6 أشخاص',
    availability: 'متاح',
    image: 'https://images.unsplash.com/photo-1515377901643-3387c1a0e4e0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'business',
    name: 'مركز الأعمال',
    description: 'قاعات اجتماعات مجهزة بتقنيات حديثة وخدمة ضيافة فاخرة.',
    hours: '7:00 ص - 11:00 م',
    location: 'الطابق الثاني - البرج الرئيسي',
    capacity: '4 قاعات (8-50 شخص)',
    availability: 'قاعتان متاحتان',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'kids',
    name: 'نادي الأطفال',
    description: 'منطقة ترفيه آمنة بألعاب تعليمية ومشرفين متخصصين.',
    hours: '9:00 ص - 8:00 م',
    location: 'الطابق الأرضي - الجناح الشمالي',
    capacity: '20 طفل',
    availability: 'متاح - ٨ أطفال حالياً',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tennis',
    name: 'ملعب التنس',
    description: 'ملعب تنس احترافي بإضاءة ليلية ومعدات متاحة للإيجار.',
    hours: '6:00 ص - 10:00 م',
    location: 'الحديقة الرياضية',
    capacity: '4 ملاعب',
    availability: 'ملعبان متاحان',
    image: 'https://images.unsplash.com/photo-1622167834988-1d9a9a8b0a0e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cinema',
    name: 'السينما الخاصة',
    description: 'قاعة سينما فاخرة بـ 20 مقعداً وخدمة طعام أثناء العرض.',
    hours: '2:00 م - 12:00 م',
    location: 'الطابق السفلي - البرج الرئيسي',
    capacity: '20 مقعد',
    availability: 'عرض الساعة 8:00 م',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'meetings',
    name: 'قاعات الاجتماعات',
    description: 'قاعات فاخرة مجهزة للمؤتمرات والفعاليات الخاصة.',
    hours: '7:00 ص - 11:00 م',
    location: 'الطابق الثاني',
    capacity: '8 قاعات (10-200 شخص)',
    availability: '٣ قاعات متاحة',
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80',
  },
];

export const hotelAnnouncements: HotelAnnouncement[] = [
  {
    id: 'ann1',
    title: 'فعالية العزف على العود الليلة',
    message: 'تبدأ فعالية العزف التقليدي في الردهة الملكية الساعة 8:00 مساءً. الحضور مجاني.',
    date: '2026-07-06',
    priority: 'high',
  },
  {
    id: 'ann2',
    title: 'صيانة مجدولة للمسبح الخارجي',
    message: 'سيتم إغلاق المسبح الخارجي يوم الأربعاء من 6:00 ص إلى 10:00 ص. المسبح الداخلي متاح.',
    date: '2026-07-08',
    priority: 'normal',
  },
  {
    id: 'ann3',
    title: 'عرض الإفطار المفتوح في مطعم النخيل',
    message: 'إفطار ملكي مفتوح كل جمعة وسبت من 7:00 ص إلى 11:00 ص بسعر 195 ر.س للشخص.',
    date: '2026-07-06',
    priority: 'normal',
  },
];

export const todayEvents: TodayEvent[] = [
  { id: 'te1', title: 'جلسة يوغا عند الشروق', time: '6:30 ص', location: 'الحديقة المركزية' },
  { id: 'te2', title: 'ورشة الخط العربي', time: '10:00 ص', location: 'قاعة التراث' },
  { id: 'te3', title: 'جلسة تدليك الأحجار البركانية', time: '6:00 م', location: 'السبا الملكي' },
  { id: 'te4', title: 'عزف على العود التقليدي', time: '8:00 م', location: 'الردهة الملكية' },
];

export const conciergeServices: ConciergeService[] = [
  { id: 'c1', title: 'النقل من وإلى المطار', description: 'ليموزين فاخرة مع سائق محترف', icon: '✈️', category: 'transport' },
  { id: 'c2', title: 'سيارة أجرة', description: 'حجز تاكسي فوري أو مجدول', icon: '🚕', category: 'transport' },
  { id: 'c3', title: 'تأجير سيارات', description: 'أسطول فاخر من مرسيدس وبنتلي ورولز رويس', icon: '🚗', category: 'transport' },
  { id: 'c4', title: 'سائق خاص', description: 'سائق شخصي ليوم كامل أو نصف يوم', icon: '👔', category: 'transport' },
  { id: 'c5', title: 'حجز مطاعم', description: 'حجز طاولات في أفضل مطاعم الرياض', icon: '🍽️', category: 'dining' },
  { id: 'c6', title: 'حجز جولات سياحية', description: 'جولات خاصة مع دليل سياحي محترف', icon: '🗺️', category: 'tourism' },
  { id: 'c7', title: 'تذاكر المتاحف', description: 'حجز تذاكر المتاحف والمعارض', icon: '🏛️', category: 'tourism' },
  { id: 'c8', title: 'مراكز التسوق', description: 'دليل أفضل مراكز التسوق والبوتيكات', icon: '🛍️', category: 'shopping' },
  { id: 'c9', title: 'الشواطئ والمنتجعات', description: 'رحلات يومية للشواطئ والمنتجعات', icon: '🏖️', category: 'tourism' },
  { id: 'c10', title: 'الأماكن السياحية', description: 'أبرز المعالم السياحية في الرياض', icon: '📍', category: 'tourism' },
  { id: 'c11', title: 'تحويل العملات', description: 'خدمة صرف عملات فورية في الردهة', icon: '💱', category: 'finance' },
  { id: 'c12', title: 'السفارات والقنصليات', description: 'معلومات ومواعيد السفارات', icon: '🏢', category: 'emergency' },
  { id: 'c13', title: 'المساعدة الطبية', description: 'طبيب زائر وصيدلية 24 ساعة', icon: '🏥', category: 'emergency' },
  { id: 'c14', title: 'خدمات الطوارئ', description: 'أرقام الطوارئ والمساعدة الفورية', icon: '🆘', category: 'emergency' },
];

export const reviews: Review[] = [
  {
    id: 'rev1',
    guestName: 'فهد بن محمد',
    rating: 5,
    comment: 'تجربة استثنائية في كل التفاصيل. الجناح فاخر والخدمة لا مثيل لها.',
    date: '2026-06-28',
    category: 'الإقامة',
  },
  {
    id: 'rev2',
    guestName: 'نورة بنت عبدالله',
    rating: 5,
    comment: 'السبا الملكي من أفضل ما جربت. الحمام المغربي بالذهب تجربة لا تُنسى.',
    date: '2026-06-25',
    category: 'السبا',
  },
  {
    id: 'rev3',
    guestName: 'خالد بن سعد',
    rating: 4,
    comment: 'خدمة الغرف ممتازة والطعام لذيذ. الانتظار كان قليلاً في المطعم الرئيسي.',
    date: '2026-06-20',
    category: 'المطاعم',
  },
];

export const loyaltyTier: LoyaltyTier = {
  name: 'العضوية الذهبية الملكية',
  points: 12450,
  nextTier: 'العضوية البلاتينية',
  pointsToNext: 2550,
  benefits: [
    'ترقية مجانية للجناح عند التوفر',
    'إفطار ملكي مجاني يومياً',
    'وصول مبكر وتسجيل مغادرة متأخر',
    'خصم 15% على السبا والمطاعم',
    'مساعد شخصي على مدار الساعة',
    'نقل مجاني من وإلى المطار',
  ],
};

export const walletTransactions: WalletTransaction[] = [
  { id: 'wt1', title: 'دفع إقامة - جناح ديلوكس', amount: -10500, date: '2026-07-04', type: 'debit' },
  { id: 'wt2', title: 'إيداع نقاط الولاء', amount: 500, date: '2026-07-04', type: 'credit' },
  { id: 'wt3', title: 'خدمة الغرف - عشاء واغيو', amount: -965, date: '2026-07-04', type: 'debit' },
  { id: 'wt4', title: 'جلسة سبا ملكية', amount: -1500, date: '2026-07-05', type: 'debit' },
  { id: 'wt5', title: 'استرداد خصم العضوية الذهبية', amount: 750, date: '2026-07-05', type: 'credit' },
];

export const localPlaces: LocalPlace[] = [
  {
    id: 'lp1',
    name: 'حي الطريف التاريخي',
    description: 'موقع تراثي مسجل في اليونسكو يعود لعهد الدولة السعودية الأولى.',
    distance: '٢٥ كم',
    category: 'تراث',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'lp2',
    name: 'بوليفارد الرياض',
    description: 'وجهة ترفيهية عالمية مع مطاعم فاخرة وعروض حية.',
    distance: '١٨ كم',
    category: 'تسوق',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'lp3',
    name: 'متحف المربع',
    description: 'متحف وطني يعرض تاريخ المملكة وثقافتها العريقة.',
    distance: '٢٢ كم',
    category: 'متاحف',
    image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'lp4',
    name: 'وادي حنيفة',
    description: 'متنزه طبيعي خلاب مع مسارات مشي ودراجات.',
    distance: '١٢ كم',
    category: 'طبيعة',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'lp5',
    name: 'سوق الزل',
    description: 'سوق تقليدي للتحف والسجاد والعطور العربية الأصيلة.',
    distance: '٢٠ كم',
    category: 'تسوق',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7d0e0601?auto=format&fit=crop&w=800&q=80',
  },
];

export const housekeepingItems = [
  { id: 'hk1', name: 'تنظيف الغرفة', icon: '✨' },
  { id: 'hk2', name: 'مناشف إضافية', icon: '🛁' },
  { id: 'hk3', name: 'وسائد إضافية', icon: '🛏️' },
  { id: 'hk4', name: 'بطانية إضافية', icon: '🧣' },
  { id: 'hk5', name: 'ورق حمام', icon: '🧻' },
  { id: 'hk6', name: 'صابون', icon: '🧼' },
  { id: 'hk7', name: 'شامبو', icon: '🧴' },
  { id: 'hk8', name: 'شباشب', icon: '🥿' },
  { id: 'hk9', name: 'روب استحمام', icon: '👘' },
  { id: 'hk10', name: 'مكواة', icon: '👔' },
  { id: 'hk11', name: 'مجفف شعر', icon: '💇' },
  { id: 'hk12', name: 'سرير أطفال', icon: '👶' },
];

export const maintenanceIssues = [
  { id: 'm1', name: 'عطل التكييف', priority: 'عاجل' },
  { id: 'm2', name: 'مشكلة التلفزيون', priority: 'عادي' },
  { id: 'm3', name: 'مشكلة الإنترنت', priority: 'عاجل' },
  { id: 'm4', name: 'تسرب المياه', priority: 'عاجل جداً' },
  { id: 'm5', name: 'عطل الإضاءة', priority: 'عادي' },
  { id: 'm6', name: 'مشكلة الخزنة', priority: 'عادي' },
  { id: 'm7', name: 'شكوى الضوضاء', priority: 'عادي' },
];

export const roomAmenities = [
  { id: 'ra1', name: 'مناشف قطن مصري', icon: '🛁' },
  { id: 'ra2', name: 'أردية حريرية فاخرة', icon: '🛏️' },
  { id: 'ra3', name: 'ميني بار مجهز', icon: '🍾' },
  { id: 'ra4', name: 'آلة إسبريسو نسبريسو', icon: '☕' },
  { id: 'ra5', name: 'نظام صوت بانغ أولفسن', icon: '🔊' },
  { id: 'ra6', name: 'تلفزيون 75 بوصة 4K', icon: '📺' },
  { id: 'ra7', name: 'خزنة إلكترونية', icon: '🔐' },
  { id: 'ra8', name: 'مستحضرات تجميل فاخرة', icon: '🧴' },
];

export const hotelPolicies = [
  'الالتزام بسياسة الهدوء بعد الساعة 10:00 مساءً',
  'يمنع التدخين في جميع الأجنحة والمرافق المغلقة',
  'الحفاظ على خصوصية النزلاء الآخرين',
  'الإبلاغ عن أي ضرر فور ملاحظته',
  'احترام قواعد المسبح والسبا المخصصة',
];
