export const locales = ['az', 'ru', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'az';

export const localeNames: Record<Locale, string> = { az: 'AZ', ru: 'RU', en: 'EN' };

export const INSTAGRAM_URL = 'https://www.instagram.com/buondesign.az/';
export const INSTAGRAM_HANDLE = '@buondesign.az';

type Note = { text: string; x: number; y: number; side?: 'l' | 'r' };
type Room = { name: string; text: string; notes: Note[] };
type Tone = { id: string; name: string; text: string };

export type Dictionary = {
  meta: { title: string; description: string };
  nav: { tour: string; studio: string; work: string; tones: string; process: string; contact: string; menu: string; close: string; write: string };
  loader: { label: string };
  tour: {
    label: string;
    title: string;
    lead: string;
    cue: string;
    plan: string;
    rooms: Room[];
    outroTitle: string;
    outroText: string;
    outroCta: string;
  };
  studio: {
    statement: string;
    disciplines: { name: string; text: string }[];
  };
  office: {
    title: string;
    text: string;
    facts: { term: string; value: string }[];
    captions: string[];
  };
  tones: { title: string; text: string; hint: string; items: Tone[] };
  process: { title: string; steps: { name: string; text: string }[] };
  contact: { title: string; text: string; cta: string; rights: string; tagline: string };
};

const az: Dictionary = {
  meta: {
    title: 'Buon Design — interyer, mebel, memarlıq',
    description:
      'Buon Design Studio: interyer dizaynı, fərdi mebel və memarlıq. Konsept mənzilimizə daxil olun və gözəl yaşamağın necə hiss olunduğunu görün.',
  },
  nav: {
    tour: 'Mənzil',
    studio: 'Studiya',
    work: 'Layihə',
    tones: 'Mətbəx tonları',
    process: 'Proses',
    contact: 'Əlaqə',
    menu: 'Menyu',
    close: 'Bağla',
    write: 'Bizə yazın',
  },
  loader: { label: 'Buon Design yüklənir' },
  tour: {
    label: 'Konsept mənzil',
    title: 'Gözəl yaşayın',
    lead: 'İnteryer, mebel və memarlıq — bir studiyanın əlində.',
    cue: 'İçəri keçmək üçün aşağı sürüşdürün',
    plan: 'Mənzilin planı',
    rooms: [
      {
        name: 'Qonaq otağı',
        text: 'Bordo məxmər, Rosso Levanto mərməri və pərdələrdən süzülən axşam günəşi.',
        notes: [
          { text: 'Bordo məxmər divan', x: 19, y: 64, side: 'r' },
          { text: 'Rosso Levanto mərməri', x: 58, y: 80, side: 'r' },
          { text: 'Kətan pərdələr', x: 6, y: 28, side: 'r' },
        ],
      },
      {
        name: 'Dincəlmə guşəsi',
        text: 'Yumşaq xətlər, isti tonlar — otaq sizi qucaqlayır.',
        notes: [
          { text: 'Yun pled', x: 88, y: 62, side: 'l' },
          { text: 'Latun detallar', x: 27, y: 84, side: 'r' },
        ],
      },
      {
        name: 'Yemək zonası',
        text: 'Gips ornamentlər, buklé stullar və uzun axşamlar üçün masa.',
        notes: [
          { text: 'Gips ornament', x: 12, y: 36, side: 'r' },
          { text: 'Buklé stullar', x: 54, y: 72, side: 'r' },
        ],
      },
      {
        name: 'Oxu guşəsi',
        text: 'Pəncərə kənarında sakit künc: çiçəkli kreslo, palıd döşəmə, səhər işığı.',
        notes: [
          { text: 'Çiçək naxışlı kreslo', x: 73, y: 64, side: 'l' },
          { text: 'Palıd parket', x: 40, y: 93, side: 'r' },
        ],
      },
    ],
    outroTitle: 'Bu, konsept mənzildir.',
    outroText: 'Növbəti mənzil sizinki ola bilər.',
    outroCta: 'Layihəni müzakirə edək',
  },
  studio: {
    statement:
      'Biz məkanı bütöv düşünürük: memarlıq planından divanın parçasına, işığın düşdüyü bucaqdan qapının dəstəyinə qədər. Nəticədə ev sadəcə gözəl görünmür — orada yaşamaq gözəldir.',
    disciplines: [
      { name: 'İnteryer', text: 'Konsept, planlaşdırma, materiallar və işıq ssenarisi.' },
      { name: 'Mebel', text: 'Məkana ölçülüb-biçilmiş fərdi mebel və tekstil.' },
      { name: 'Memarlıq', text: 'Məkanın strukturu, fasad və daxili keçidlər.' },
    ],
  },
  office: {
    title: 'Rəhbər kabineti',
    text: 'Açıq palıd panellər, jalüzdən süzülən işıq və dəri çesterfild. Diqqəti yayındırmayan, statusu səssizcə bildirən iş otağı.',
    facts: [
      { term: 'Növ', value: 'Ofis interyeri' },
      { term: 'Materiallar', value: 'Palıd, qara ağac, dəri, yun' },
      { term: 'Palitra', value: 'Qrafit, qum, konyak' },
    ],
    captions: ['Kabinet və iş masası', 'Pəncərə boyu', 'Qonaq zonası', 'Panel divar və kolleksiya rəfi'],
  },
  tones: {
    title: '2027-ci ilin premium mətbəx tonları',
    text: 'Altı ton — altı xarakter. Hansının sizə yaxın olduğunu seçin.',
    hint: 'Ton seçin',
    items: [
      { id: 'boz-mavi', name: 'Boz mavi', text: 'Parlaq səth və soyuq polad notu — müasir, ciddi, zərif.' },
      { id: 'kasella', name: 'Kasella natural', text: 'İsti qoz fakturası mətbəxə ev rahatlığı qatır.' },
      { id: 'pastel-yasil', name: 'Pastel yaşıl', text: 'Zeytun çaları mərmər və latunla sakit harmoniya yaradır.' },
      { id: 'ag', name: 'Ağ', text: 'Təmiz fon işığı artırır və detalları önə çəkir.' },
      { id: 'aciq-bej', name: 'Açıq bej', text: 'Kremli, yumşaq ton — retro texnika ilə ideal cütlük.' },
      { id: 'terrakota', name: 'Solğun terrakota', text: 'Gilin və günəşin istiliyi, torpaq rəngində sakitlik.' },
    ],
  },
  process: {
    title: 'Necə işləyirik',
    steps: [
      { name: 'Tanışlıq', text: 'Məkanı, vərdişlərinizi və arzularınızı dinləyirik.' },
      { name: 'Konsept', text: 'Plan, əhval-ruhiyyə və materialların seçimi.' },
      { name: 'Vizualizasiya', text: 'Hər otağı fotoreal renderlərdə əvvəlcədən görürsünüz.' },
      { name: 'Həyata keçirmə', text: 'Mebel, işıq və tekstil — son detala qədər.' },
    ],
  },
  contact: {
    title: 'Gəlin, məkanınızdan danışaq.',
    text: 'Layihəniz barədə bizə Instagram-da yazın — cavab verib görüş təyin edək.',
    cta: 'Instagram-da yazın',
    rights: 'Bütün hüquqlar qorunur.',
    tagline: 'İnteryer • Mebel • Memarlıq',
  },
};

const ru: Dictionary = {
  meta: {
    title: 'Buon Design — интерьер, мебель, архитектура',
    description:
      'Buon Design Studio: дизайн интерьера, мебель на заказ и архитектура. Войдите в наш концепт-апартамент и почувствуйте, каково жить красиво.',
  },
  nav: {
    tour: 'Квартира',
    studio: 'Студия',
    work: 'Проект',
    tones: 'Тона кухни',
    process: 'Процесс',
    contact: 'Контакты',
    menu: 'Меню',
    close: 'Закрыть',
    write: 'Написать нам',
  },
  loader: { label: 'Загрузка Buon Design' },
  tour: {
    label: 'Концепт-квартира',
    title: 'Живите красиво',
    lead: 'Интерьер, мебель и архитектура — в руках одной студии.',
    cue: 'Прокрутите вниз, чтобы войти',
    plan: 'План квартиры',
    rooms: [
      {
        name: 'Гостиная',
        text: 'Бордовый бархат, мрамор Rosso Levanto и вечернее солнце сквозь шторы.',
        notes: [
          { text: 'Диван из бордового бархата', x: 19, y: 64, side: 'r' },
          { text: 'Мрамор Rosso Levanto', x: 58, y: 80, side: 'r' },
          { text: 'Льняные шторы', x: 6, y: 28, side: 'r' },
        ],
      },
      {
        name: 'Зона отдыха',
        text: 'Мягкие линии и тёплые тона — комната будто обнимает.',
        notes: [
          { text: 'Шерстяной плед', x: 88, y: 62, side: 'l' },
          { text: 'Латунные детали', x: 27, y: 84, side: 'r' },
        ],
      },
      {
        name: 'Столовая',
        text: 'Гипсовый орнамент, стулья из букле и стол для долгих вечеров.',
        notes: [
          { text: 'Гипсовый орнамент', x: 12, y: 36, side: 'r' },
          { text: 'Стулья из букле', x: 54, y: 72, side: 'r' },
        ],
      },
      {
        name: 'Уголок для чтения',
        text: 'Тихий угол у окна: кресло с цветочным узором, дубовый пол, утренний свет.',
        notes: [
          { text: 'Кресло с цветочным узором', x: 73, y: 64, side: 'l' },
          { text: 'Дубовый паркет', x: 40, y: 93, side: 'r' },
        ],
      },
    ],
    outroTitle: 'Это концепт-квартира.',
    outroText: 'Следующей может стать ваша.',
    outroCta: 'Обсудить проект',
  },
  studio: {
    statement:
      'Мы видим пространство целиком: от архитектурного плана до ткани дивана, от угла падения света до ручки двери. В итоге дом не просто красиво выглядит — в нём красиво жить.',
    disciplines: [
      { name: 'Интерьер', text: 'Концепция, планировка, материалы и сценарии света.' },
      { name: 'Мебель', text: 'Индивидуальная мебель и текстиль по размерам пространства.' },
      { name: 'Архитектура', text: 'Структура пространства, фасад и внутренние переходы.' },
    ],
  },
  office: {
    title: 'Кабинет руководителя',
    text: 'Панели из светлого дуба, свет сквозь жалюзи и кожаный честерфилд. Рабочее пространство, которое не отвлекает и тихо говорит о статусе.',
    facts: [
      { term: 'Тип', value: 'Офисный интерьер' },
      { term: 'Материалы', value: 'Дуб, чёрное дерево, кожа, шерсть' },
      { term: 'Палитра', value: 'Графит, песок, коньяк' },
    ],
    captions: ['Кабинет и рабочий стол', 'Вдоль окна', 'Зона для гостей', 'Стеновые панели и полка для коллекции'],
  },
  tones: {
    title: 'Премиальные тона кухни 2027 года',
    text: 'Шесть тонов — шесть характеров. Выберите тот, что ближе вам.',
    hint: 'Выберите тон',
    items: [
      { id: 'boz-mavi', name: 'Серо-голубой', text: 'Глянец и холодная нота стали — современно, строго, изящно.' },
      { id: 'kasella', name: 'Kasella natural', text: 'Тёплая фактура ореха добавляет кухне домашнего уюта.' },
      { id: 'pastel-yasil', name: 'Пастельный зелёный', text: 'Оливковый оттенок в спокойной гармонии с мрамором и латунью.' },
      { id: 'ag', name: 'Белый', text: 'Чистый фон усиливает свет и выводит детали на первый план.' },
      { id: 'aciq-bej', name: 'Светлый беж', text: 'Кремовый мягкий тон — идеальная пара для ретро-техники.' },
      { id: 'terrakota', name: 'Бледная терракота', text: 'Тепло глины и солнца, спокойствие земляных оттенков.' },
    ],
  },
  process: {
    title: 'Как мы работаем',
    steps: [
      { name: 'Знакомство', text: 'Слушаем о пространстве, ваших привычках и мечтах.' },
      { name: 'Концепция', text: 'Планировка, настроение и выбор материалов.' },
      { name: 'Визуализация', text: 'Каждую комнату вы видите заранее в фотореалистичных рендерах.' },
      { name: 'Реализация', text: 'Мебель, свет и текстиль — до последней детали.' },
    ],
  },
  contact: {
    title: 'Давайте поговорим о вашем пространстве.',
    text: 'Напишите нам о проекте в Instagram — ответим и договоримся о встрече.',
    cta: 'Написать в Instagram',
    rights: 'Все права защищены.',
    tagline: 'Интерьер • Мебель • Архитектура',
  },
};

const en: Dictionary = {
  meta: {
    title: 'Buon Design — interior, furniture, architecture',
    description:
      'Buon Design Studio: interior design, bespoke furniture and architecture. Step into our concept apartment and feel what it means to live beautifully.',
  },
  nav: {
    tour: 'Apartment',
    studio: 'Studio',
    work: 'Project',
    tones: 'Kitchen tones',
    process: 'Process',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close',
    write: 'Write to us',
  },
  loader: { label: 'Loading Buon Design' },
  tour: {
    label: 'Concept apartment',
    title: 'Live beautifully',
    lead: 'Interior, furniture and architecture — in the hands of one studio.',
    cue: 'Scroll down to step inside',
    plan: 'Apartment plan',
    rooms: [
      {
        name: 'Living room',
        text: 'Bordeaux velvet, Rosso Levanto marble and evening sun filtered through linen.',
        notes: [
          { text: 'Bordeaux velvet sofa', x: 19, y: 64, side: 'r' },
          { text: 'Rosso Levanto marble', x: 58, y: 80, side: 'r' },
          { text: 'Linen drapes', x: 6, y: 28, side: 'r' },
        ],
      },
      {
        name: 'Lounge corner',
        text: 'Soft lines and warm tones — a room that holds you.',
        notes: [
          { text: 'Wool throw', x: 88, y: 62, side: 'l' },
          { text: 'Brass details', x: 27, y: 84, side: 'r' },
        ],
      },
      {
        name: 'Dining room',
        text: 'Plaster ornament, bouclé chairs and a table made for long evenings.',
        notes: [
          { text: 'Plaster ornament', x: 12, y: 36, side: 'r' },
          { text: 'Bouclé chairs', x: 54, y: 72, side: 'r' },
        ],
      },
      {
        name: 'Reading nook',
        text: 'A quiet corner by the window: a floral armchair, oak floors, morning light.',
        notes: [
          { text: 'Floral armchair', x: 73, y: 64, side: 'l' },
          { text: 'Oak parquet', x: 40, y: 93, side: 'r' },
        ],
      },
    ],
    outroTitle: 'This is a concept apartment.',
    outroText: 'The next one could be yours.',
    outroCta: 'Discuss your project',
  },
  studio: {
    statement:
      'We think of a space as a whole: from the architectural plan to the fabric of the sofa, from the angle of the light to the handle on the door. The result is a home that doesn’t only look beautiful — it is beautiful to live in.',
    disciplines: [
      { name: 'Interior', text: 'Concept, planning, materials and lighting scenarios.' },
      { name: 'Furniture', text: 'Bespoke furniture and textiles made to the space.' },
      { name: 'Architecture', text: 'Spatial structure, facades and interior transitions.' },
    ],
  },
  office: {
    title: 'Executive office',
    text: 'Pale oak panelling, light sifting through blinds and a leather Chesterfield. A workspace that never distracts and speaks of status quietly.',
    facts: [
      { term: 'Type', value: 'Office interior' },
      { term: 'Materials', value: 'Oak, ebonised wood, leather, wool' },
      { term: 'Palette', value: 'Graphite, sand, cognac' },
    ],
    captions: ['Office and desk', 'Along the window', 'Guest seating', 'Panelled wall and display niche'],
  },
  tones: {
    title: 'Premium kitchen tones of 2027',
    text: 'Six tones, six characters. Choose the one that feels like you.',
    hint: 'Choose a tone',
    items: [
      { id: 'boz-mavi', name: 'Grey blue', text: 'High gloss with a cool steel note — modern, serious, refined.' },
      { id: 'kasella', name: 'Kasella natural', text: 'Warm walnut grain brings the comfort of home into the kitchen.' },
      { id: 'pastel-yasil', name: 'Pastel green', text: 'An olive shade in quiet harmony with marble and brass.' },
      { id: 'ag', name: 'White', text: 'A clean ground that amplifies light and lets details lead.' },
      { id: 'aciq-bej', name: 'Light beige', text: 'Soft and creamy — the natural partner for retro appliances.' },
      { id: 'terrakota', name: 'Faded terracotta', text: 'The warmth of clay and sun, the calm of earth tones.' },
    ],
  },
  process: {
    title: 'How we work',
    steps: [
      { name: 'Getting to know you', text: 'We listen to the space, your habits and what you dream of.' },
      { name: 'Concept', text: 'Plan, mood and the choice of materials.' },
      { name: 'Visualisation', text: 'You see every room in advance, in photoreal renders.' },
      { name: 'Delivery', text: 'Furniture, light and textiles — down to the last detail.' },
    ],
  },
  contact: {
    title: 'Let’s talk about your space.',
    text: 'Tell us about your project on Instagram — we’ll reply and set up a meeting.',
    cta: 'Message us on Instagram',
    rights: 'All rights reserved.',
    tagline: 'Interior • Furniture • Architecture',
  },
};

const dictionaries: Record<Locale, Dictionary> = { az, ru, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
