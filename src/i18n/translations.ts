import type {
  Advantage,
  CargoCategory,
  Guarantee,
  Lane,
  QA,
  RouteOption,
  Service,
  Stat,
  Step,
} from '../data/content';

export type Lang = 'ru' | 'kk' | 'en';

export const LANGS: { code: Lang; short: string; label: string }[] = [
  { code: 'ru', short: 'RU', label: 'Русский' },
  { code: 'kk', short: 'KK', label: 'Қазақша' },
  { code: 'en', short: 'EN', label: 'English' },
];

export interface Dict {
  company: { role: string; responseTime: string };
  stats: Stat[];
  advantages: Advantage[];
  services: Service[];
  process: Step[];
  routes: string[];
  guarantees: Guarantee[];
  lanes: Lane[];
  faq: QA[];
  cargoCategories: CargoCategory[];
  routeOptions: RouteOption[];
  ui: {
    nav: {
      cta: string;
      menu: string;
      close: string;
      label: string;
      ariaHome: string;
      ariaOpen: string;
      ariaClose: string;
      items: { services: string; calculator: string; geography: string; lead: string };
    };
    hero: {
      wordmark: string;
      vertical: string;
      discoverTitle: string;
      discoverSub: string;
      titleLines: string[];
      bodyHtml: string;
      cta: string;
    };
    preloader: { sub: string };
    manifesto: { eyebrow: string; idx: string; statement: string; p1Html: string; p2: string };
    services: {
      eyebrow: string;
      index: string;
      titlePre: string;
      titleAccent: string;
      lead: string;
      flag: string;
    };
    calculator: {
      eyebrow: string;
      index: string;
      titlePre: string;
      titleAccent: string;
      lead: string;
      weight: string;
      minOrder: string;
      unitKg: string;
      unitT: string;
      cargoType: string;
      direction: string;
      to: (label: string) => string;
      weeks: (a: number, b: number) => string;
      rate: (v: string) => string;
      resultLabel: string;
      per: (rate: string, cat: string) => string;
      term: string;
      termVal: (a: number, b: number) => string;
      directionLabel: string;
      warn: string;
      disc: string;
      cta: string;
      quote: (p: {
        weight: string;
        category: string;
        route: string;
        low: string;
        high: string;
        w1: number;
        w2: number;
      }) => string;
    };
    advantages: {
      eyebrow: string;
      index: string;
      titlePre: string;
      titleAccent: string;
      lead: string;
      cards: {
        price: { badge: string; cap: string; unit: string };
        white: { badge: string; cap: string; unit: string };
      };
    };
    guarantees: {
      eyebrow: string;
      index: string;
      titlePre: string;
      titleAccent: string;
      lead: string;
    };
    process: { eyebrow: string; title: string; titleStacked: string; count: string };
    immersive: { eyebrow: string; statement: string[]; metrics: { v: string; l: string; n: string }[] };
    geography: {
      eyebrow: string;
      index: string;
      titlePre: string;
      titleAccent: string;
      lead: string;
      from: string;
      toLabel: string;
      term: string;
    };
    faq: { eyebrow: string; titlePre: string; titleAccent: string; askText: string; askBtn: string };
    lead: {
      eyebrow: string;
      index: string;
      titlePre: string;
      titleAccent: string;
      lead: string;
      fields: { name: string; phone: string; email: string; cargo: string };
      placeholders: { name: string; phone: string; email: string; cargo: string };
      submit: string;
      noteHtml: string;
      success: { title: string; body: string };
      quick: { call: string; whatsapp: string; whatsappSub: string; email: string };
      mail: { subject: string; name: string; phone: string; email: string };
    };
    footer: {
      ready: string;
      contacts: string;
      nav: string;
      items: {
        services: string;
        calculator: string;
        geography: string;
        faq: string;
        lead: string;
      };
      legal: (year: number) => string;
      top: string;
    };
  };
}

// ─────────────────────────────── RUSSIAN ──────────────────────────────────
const ru: Dict = {
  company: { role: 'Руководитель · ваш менеджер', responseTime: 'Отвечаем в течение рабочего дня' },
  stats: [
    { value: '$0.5', unit: '/ кг', label: 'Ставка от', note: 'Контейнером по ЖД' },
    { value: '2–6', unit: 'недель', label: 'Срок доставки', note: 'После приёма на склад в Китае' },
    { value: '1', unit: 'тонна', label: 'Заказ от', note: 'Минимальный объём партии' },
    { value: '100%', unit: 'белая', label: 'Растаможка', note: 'Полный пакет документов' },
  ],
  advantages: [
    {
      id: 'price',
      index: '01',
      title: 'Цена',
      body: 'Возим контейнерами по железной дороге — это самый выгодный способ доставки крупных партий из Китая. Ставка начинается от $0.5 за килограмм.',
      points: ['Ставка от $0.5 / кг', 'Контейнерные ЖД-перевозки', 'Прозрачный расчёт без скрытых наценок'],
    },
    {
      id: 'white',
      index: '02',
      title: 'Белая доставка',
      body: 'Мы сами занимаемся растаможкой вашего товара с полным пакетом документов. Груз проходит границу официально — без рисков для бизнеса.',
      points: ['Полная официальная растаможка', 'Полный пакет документов', 'Прозрачно и легально'],
    },
  ],
  services: [
    {
      id: 'rail',
      num: '01',
      title: 'ЖД-перевозки контейнерами',
      desc: 'Доставка грузов из Китая железнодорожными контейнерами — оптимальный баланс цены и срока для партий от 1 тонны.',
      meta: ['от $0.5 / кг', 'от 1 тонны', '2–6 недель'],
    },
    {
      id: 'customs',
      num: '02',
      title: 'Растаможка под ключ',
      desc: 'Берём на себя всё таможенное оформление: расчёт платежей, декларирование и полный пакет документов на ваш товар.',
      meta: ['Белое оформление', 'Полный пакет', 'Без рисков'],
    },
    {
      id: 'warehouse',
      num: '03',
      title: 'Склад в Китае',
      desc: 'Принимаем и консолидируем ваш товар на нашем складе в Китае. Срок доставки стартует с момента приёмки груза.',
      meta: ['Приёмка груза', 'Консолидация', 'Хранение'],
    },
    {
      id: 'delivery',
      num: '04',
      title: 'Доставка в КЗ и РФ',
      desc: 'Доводим груз до Казахстана, а при необходимости — и до России. Полный цикл от склада в Китае до вашего адреса.',
      meta: ['Казахстан', 'Россия', 'Под ключ'],
    },
  ],
  process: [
    { num: '01', title: 'Заявка и расчёт', body: 'Вы оставляете заявку с параметрами груза. Мы рассчитываем стоимость и сроки доставки контейнером по ЖД.' },
    { num: '02', title: 'Приёмка на складе в Китае', body: 'Ваш товар поступает на наш склад в Китае. С этого момента стартует срок доставки — от 2 до 6 недель.' },
    { num: '03', title: 'Перевозка по ЖД', body: 'Груз идёт контейнером железнодорожным путём — выгодно для партий от 1 тонны.' },
    { num: '04', title: 'Белая растаможка', body: 'Мы оформляем товар официально, с полным пакетом документов. Груз проходит границу легально.' },
    { num: '05', title: 'Доставка получателю', body: 'Довозим груз до вашего адреса в Казахстане или России. Полный цикл закрыт.' },
  ],
  routes: ['КИТАЙ → КАЗАХСТАН', 'КИТАЙ → РОССИЯ', 'ЖД-КОНТЕЙНЕРЫ', 'БЕЛАЯ РАСТАМОЖКА', 'ОТ $0.5 / КГ', 'СКЛАД В КИТАЕ'],
  guarantees: [
    { title: 'Официальная растаможка', body: 'Оформляем груз легально, через таможню. Никаких серых схем и риска конфискации товара на границе.' },
    { title: 'Полный пакет документов', body: 'На каждую партию — декларация и сопроводительные документы. Товар можно официально приходовать и продавать.' },
    { title: 'Прозрачная цена', body: 'Стоимость зависит только от веса и категории груза. Считаем заранее, без скрытых наценок и доплат «по факту».' },
    { title: 'Один ответственный за всё', body: 'От приёмки на складе в Китае до доставки на ваш адрес ведём груз сами — вы общаетесь с одним менеджером.' },
  ],
  lanes: [
    { from: 'Китай', to: 'Казахстан', cities: 'Алматы · Астана · Шымкент · Караганда', weeks: '2–4 недели' },
    { from: 'Китай', to: 'Россия', cities: 'Москва · Екатеринбург · Новосибирск', weeks: '3–6 недель' },
  ],
  faq: [
    { q: 'Какой минимальный объём заказа?', a: 'Мы работаем с партиями от 1 тонны. Это позволяет возить контейнером по ЖД и держать ставку от $0.5 за килограмм.' },
    { q: 'Сколько идёт доставка?', a: 'От 2 до 6 недель. Срок начинается с момента, когда ваш товар поступает на наш склад в Китае, и зависит от направления и загрузки.' },
    { q: 'Что значит «белая» доставка?', a: 'Мы официально растаможиваем груз с полным пакетом документов. Товар проходит границу легально, без серых схем — его можно спокойно приходовать и продавать.' },
    { q: 'Как формируется цена?', a: 'Стоимость считается от веса и категории груза: ставка стартует от $0.5 за кг при отправке контейнером по ЖД. Точную цену подтверждает менеджер после уточнения деталей.' },
    { q: 'Возите ли вы в Россию?', a: 'Да. Основное направление — Китай → Казахстан, но при необходимости довозим груз и до России.' },
    { q: 'Где находится склад и как отправить товар?', a: 'Склад находится в Китае. Поставщик или вы отправляете товар на наш склад, мы принимаем, консолидируем и запускаем доставку. С момента приёмки стартует срок.' },
  ],
  cargoCategories: [
    { id: 'general', label: 'Обычные товары', rate: 0.5, hint: 'Непродовольственные грузы общего назначения' },
    { id: 'textile', label: 'Текстиль и одежда', rate: 0.6, hint: 'Одежда, ткани, обувь' },
    { id: 'fragile', label: 'Хрупкие / требуют упаковки', rate: 0.75, hint: 'Стекло, керамика, мебель' },
    { id: 'electronics', label: 'Электроника', rate: 0.9, hint: 'Техника, гаджеты, комплектующие' },
  ],
  routeOptions: [
    { id: 'kz', label: 'Казахстан', factor: 1, weeks: [2, 4] },
    { id: 'ru', label: 'Россия', factor: 1.15, weeks: [3, 6] },
  ],
  ui: {
    nav: {
      cta: 'Оставить заявку',
      menu: 'Меню',
      close: 'Закрыть',
      label: 'Навигация',
      ariaHome: 'logistics.kaz — главная',
      ariaOpen: 'Открыть меню',
      ariaClose: 'Закрыть меню',
      items: { services: 'Услуги', calculator: 'Калькулятор', geography: 'География', lead: 'Заявка' },
    },
    hero: {
      wordmark: 'ЛОГИСТИКА',
      vertical: 'Доставка · Китай → Казахстан · Россия',
      discoverTitle: 'Как мы работаем',
      discoverSub: 'Путь груза за 5 шагов',
      titleLines: ['Логистика из Китая', 'под ключ'],
      bodyHtml:
        'Возим товары контейнерами по ЖД от <strong>$0.5 за кг</strong> с полной белой растаможкой. Срок 2–6 недель, заказ от 1 тонны.',
      cta: 'Оставить заявку',
    },
    preloader: { sub: 'Китай → Казахстан · Россия' },
    manifesto: {
      eyebrow: 'О компании',
      idx: '/ 01 — logistics.kaz',
      statement: 'Логистика из Китая — выгодно, легально, под ключ.',
      p1Html:
        'Мы доставляем товары из Китая в Казахстан, а при необходимости — и в Россию. Возим контейнерами по железной дороге от <strong>$0.5 за кг</strong> и берём на себя полную белую растаможку с пакетом документов.',
      p2: 'Срок доставки — от двух до шести недель с момента, когда товар поступает на наш склад в Китае. Минимальный заказ — от 1 тонны. Никаких серых схем — только официальное оформление.',
    },
    services: {
      eyebrow: 'Что мы делаем',
      index: '/ услуги',
      titlePre: 'Полный цикл доставки — ',
      titleAccent: 'от склада в Китае до вашего адреса',
      lead: 'Закрываем все этапы внутри одной компании: перевозку, таможню, склад и доставку. Вам не нужно искать подрядчиков и собирать процесс из частей.',
      flag: 'Основная услуга',
    },
    calculator: {
      eyebrow: 'Калькулятор',
      index: '/ оценка стоимости',
      titlePre: 'Прикиньте стоимость ',
      titleAccent: 'за минуту',
      lead: 'Укажите вес, тип груза и направление — покажем ориентировочную цену и срок. Точную стоимость подтвердит менеджер после уточнения деталей.',
      weight: 'Вес груза',
      minOrder: 'мин. заказ — 1 тонна',
      unitKg: 'кг',
      unitT: 'т',
      cargoType: 'Тип груза',
      direction: 'Направление',
      to: (label) => `Китай → ${label}`,
      weeks: (a, b) => `${a}–${b} недель`,
      rate: (v) => `от $${v}/кг`,
      resultLabel: 'Предварительная стоимость',
      per: (rate, cat) => `≈ $${rate} за кг · ${cat}`,
      term: 'Срок',
      termVal: (a, b) => `${a}–${b} нед.`,
      directionLabel: 'Направление',
      warn: 'Расчёт показан для минимального заказа — 1 тонна.',
      disc: 'Цена ориентировочная: зависит от точных характеристик груза, упаковки и сезона. Финальную стоимость фиксируем после уточнения.',
      cta: 'Уточнить точный расчёт',
      quote: (p) =>
        `Расчёт из калькулятора:\n• Вес: ${p.weight}\n• Категория: ${p.category}\n• Направление: Китай → ${p.route}\n• Ориентир: ${p.low}–${p.high}, срок ${p.w1}–${p.w2} нед.`,
    },
    advantages: {
      eyebrow: 'Преимущества',
      index: '/ почему мы',
      titlePre: 'Два повода выбрать нас — ',
      titleAccent: 'цена и честность',
      lead: 'Мы не пытаемся быть всем сразу. Делаем хорошо две вещи, на которых держится логистика из Китая: держим низкую ставку и возим только в белую.',
      cards: {
        price: { badge: 'ЖД · контейнеры', cap: 'ставка от', unit: '/ кг' },
        white: { badge: 'Склад · документы', cap: 'растаможка', unit: 'в белую' },
      },
    },
    guarantees: {
      eyebrow: 'Гарантии',
      index: '/ белая доставка',
      titlePre: 'Почему белая доставка — ',
      titleAccent: 'это безопасно',
      lead: '«Белая» логистика стоит чуть дороже серой, но защищает ваш бизнес: товар не застрянет на границе, его можно официально приходовать и продавать.',
    },
    process: {
      eyebrow: 'Как это работает',
      title: 'Путь груза',
      titleStacked: 'Путь груза — от заявки до вашего адреса',
      count: '05 этапов',
    },
    immersive: {
      eyebrow: 'Маршрут в движении',
      statement: [
        'Один контейнер.',
        '6 000 километров по железной дороге.',
        'Под нашим контролем — от склада в Китае до вашего адреса.',
      ],
      metrics: [
        { v: '≈6 000', l: 'км маршрута', n: 'Китай → Казахстан · РФ' },
        { v: '1', l: 'контейнер', n: 'партии от 1 тонны' },
        { v: '24/7', l: 'трекинг', n: 'статус на каждом этапе' },
      ],
    },
    geography: {
      eyebrow: 'География',
      index: '/ маршруты',
      titlePre: 'Возим из Китая в ',
      titleAccent: 'Казахстан и Россию',
      lead: 'Основное направление — Китай → Казахстан с доставкой в любой город. При необходимости довозим груз и до России.',
      from: 'Откуда',
      toLabel: 'Куда',
      term: 'срок доставки',
    },
    faq: {
      eyebrow: 'FAQ',
      titlePre: 'Частые ',
      titleAccent: 'вопросы',
      askText: 'Не нашли ответ? Задайте вопрос менеджеру — ответим и поможем с расчётом.',
      askBtn: 'Задать вопрос',
    },
    lead: {
      eyebrow: 'Оставить заявку',
      index: '/ контакты',
      titlePre: 'Рассчитаем доставку ',
      titleAccent: 'вашего груза',
      lead: 'Оставьте контакты и параметры груза — свяжемся, посчитаем стоимость и сроки. Или напишите менеджеру напрямую в удобном канале.',
      fields: { name: 'Имя', phone: 'Телефон', email: 'E-mail', cargo: 'Груз и объём' },
      placeholders: {
        name: 'Как к вам обращаться',
        phone: '+7 ___ ___ __ __',
        email: 'you@company.kz',
        cargo: 'Что везём, примерный вес / объём, откуда в Китае',
      },
      submit: 'Отправить заявку',
      noteHtml:
        'Нажимая «Отправить», вы соглашаетесь на обработку контактных данных для связи по вашему запросу.',
      success: {
        title: 'Заявка собрана',
        body: 'Мы открыли почтовый клиент с готовым письмом — отправьте его, и мы свяжемся с вами. Если письмо не открылось, напишите нам напрямую.',
      },
      quick: {
        call: 'Позвонить',
        whatsapp: 'WhatsApp',
        whatsappSub: 'Написать в мессенджере',
        email: 'E-mail',
      },
      mail: { subject: 'Заявка на доставку — logistics.kaz', name: 'Имя', phone: 'Телефон', email: 'E-mail' },
    },
    footer: {
      ready: 'Готовы везти ваш груз',
      contacts: 'Контакты',
      nav: 'Навигация',
      items: {
        services: 'Услуги',
        calculator: 'Калькулятор',
        geography: 'География',
        faq: 'Вопросы',
        lead: 'Оставить заявку',
      },
      legal: (year) => `© ${year} logistics.kaz — доставка из Китая в Казахстан и Россию`,
      top: 'Наверх ↑',
    },
  },
};

// ─────────────────────────────── KAZAKH ───────────────────────────────────
const kk: Dict = {
  company: { role: 'Басшы · сіздің менеджеріңіз', responseTime: 'Жұмыс күні ішінде жауап береміз' },
  stats: [
    { value: '$0.5', unit: '/ кг', label: 'Бастапқы баға', note: 'Теміржол контейнерімен' },
    { value: '2–6', unit: 'апта', label: 'Жеткізу мерзімі', note: 'Қытайдағы қоймаға қабылдағаннан кейін' },
    { value: '1', unit: 'тонна', label: 'Тапсырыс', note: 'Партияның ең аз көлемі' },
    { value: '100%', unit: 'ақ', label: 'Кеден', note: 'Толық құжаттар топтамасы' },
  ],
  advantages: [
    {
      id: 'price',
      index: '01',
      title: 'Баға',
      body: 'Жүкті теміржол контейнерлерімен тасимыз — Қытайдан ірі партияларды жеткізудің ең тиімді тәсілі. Бағасы килограмына $0.5-тен басталады.',
      points: ['Бағасы $0.5 / кг-нан', 'Теміржол контейнерлік тасымалы', 'Жасырын үстемесіз ашық есеп'],
    },
    {
      id: 'white',
      index: '02',
      title: 'Ақ жеткізу',
      body: 'Тауарыңызды толық құжаттар топтамасымен өзіміз кедендік рәсімдейміз. Жүк шекарадан ресми түрде өтеді — бизнеске тәуекелсіз.',
      points: ['Толық ресми кедендік рәсімдеу', 'Толық құжаттар топтамасы', 'Ашық әрі заңды'],
    },
  ],
  services: [
    {
      id: 'rail',
      num: '01',
      title: 'Контейнермен теміржол тасымалы',
      desc: 'Қытайдан жүкті теміржол контейнерлерімен жеткізу — 1 тоннадан асатын партиялар үшін баға мен мерзімнің оңтайлы балансы.',
      meta: ['$0.5 / кг-нан', '1 тоннадан', '2–6 апта'],
    },
    {
      id: 'customs',
      num: '02',
      title: 'Кілтпен кедендік рәсімдеу',
      desc: 'Барлық кедендік рәсімдеуді өзімізге аламыз: төлемдерді есептеу, декларациялау және тауарыңызға толық құжаттар топтамасы.',
      meta: ['Ақ рәсімдеу', 'Толық топтама', 'Тәуекелсіз'],
    },
    {
      id: 'warehouse',
      num: '03',
      title: 'Қытайдағы қойма',
      desc: 'Тауарыңызды Қытайдағы қоймамызда қабылдап, шоғырландырамыз. Жеткізу мерзімі жүкті қабылдаған сәттен басталады.',
      meta: ['Жүкті қабылдау', 'Шоғырландыру', 'Сақтау'],
    },
    {
      id: 'delivery',
      num: '04',
      title: 'ҚР мен РФ-ға жеткізу',
      desc: 'Жүкті Қазақстанға, қажет болса Ресейге де жеткіземіз. Қытайдағы қоймадан мекенжайыңызға дейін толық цикл.',
      meta: ['Қазақстан', 'Ресей', 'Кілтпен'],
    },
  ],
  process: [
    { num: '01', title: 'Өтінім және есеп', body: 'Сіз жүк параметрлерімен өтінім қалдырасыз. Біз теміржол контейнерімен жеткізудің құны мен мерзімін есептейміз.' },
    { num: '02', title: 'Қытайдағы қоймаға қабылдау', body: 'Тауарыңыз Қытайдағы қоймамызға түседі. Осы сәттен жеткізу мерзімі басталады — 2-ден 6 аптаға дейін.' },
    { num: '03', title: 'Теміржолмен тасымал', body: 'Жүк контейнермен теміржол арқылы жүреді — 1 тоннадан асатын партияларға тиімді.' },
    { num: '04', title: 'Ақ кедендік рәсімдеу', body: 'Тауарды толық құжаттар топтамасымен ресми рәсімдейміз. Жүк шекарадан заңды түрде өтеді.' },
    { num: '05', title: 'Алушыға жеткізу', body: 'Жүкті Қазақстандағы немесе Ресейдегі мекенжайыңызға жеткіземіз. Толық цикл аяқталды.' },
  ],
  routes: ['ҚЫТАЙ → ҚАЗАҚСТАН', 'ҚЫТАЙ → РЕСЕЙ', 'ТЕМІРЖОЛ КОНТЕЙНЕРЛЕРІ', 'АҚ КЕДЕН', '$0.5 / КГ-НАН', 'ҚЫТАЙДАҒЫ ҚОЙМА'],
  guarantees: [
    { title: 'Ресми кедендік рәсімдеу', body: 'Жүкті кеден арқылы заңды рәсімдейміз. Ешқандай сұр сұлба жоқ, шекарада тәркіленү тәуекелі жоқ.' },
    { title: 'Толық құжаттар топтамасы', body: 'Әр партияға — декларация мен ілеспе құжаттар. Тауарды ресми кіріске алып, сатуға болады.' },
    { title: 'Ашық баға', body: 'Құн тек жүктің салмағы мен санатына байланысты. Алдын ала есептейміз, жасырын үстеме мен «нақты бойынша» қосымша төлемсіз.' },
    { title: 'Барлығына бір жауапты', body: 'Қытайдағы қоймаға қабылдаудан мекенжайыңызға жеткізуге дейін жүкті өзіміз жүргіземіз — сіз бір менеджермен сөйлесесіз.' },
  ],
  lanes: [
    { from: 'Қытай', to: 'Қазақстан', cities: 'Алматы · Астана · Шымкент · Қарағанды', weeks: '2–4 апта' },
    { from: 'Қытай', to: 'Ресей', cities: 'Мәскеу · Екатеринбург · Новосібір', weeks: '3–6 апта' },
  ],
  faq: [
    { q: 'Тапсырыстың ең аз көлемі қандай?', a: '1 тоннадан асатын партиялармен жұмыс істейміз. Бұл теміржол контейнерімен тасуға және килограмына $0.5-тен бағаны ұстауға мүмкіндік береді.' },
    { q: 'Жеткізу қанша уақыт алады?', a: '2-ден 6 аптаға дейін. Мерзім тауарыңыз Қытайдағы қоймамызға түскен сәттен басталады және бағыт пен жүктемеге байланысты.' },
    { q: '«Ақ» жеткізу деген не?', a: 'Жүкті толық құжаттар топтамасымен ресми кедендік рәсімдейміз. Тауар шекарадан заңды, сұр сұлбасыз өтеді — оны еркін кіріске алып, сатуға болады.' },
    { q: 'Баға қалай қалыптасады?', a: 'Құн жүктің салмағы мен санатынан есептеледі: теміржол контейнерімен жөнелткенде баға $0.5 / кг-нан басталады. Нақты бағаны менеджер мәліметтерді нақтылағаннан кейін растайды.' },
    { q: 'Ресейге тасисыздар ма?', a: 'Иә. Негізгі бағыт — Қытай → Қазақстан, бірақ қажет болса жүкті Ресейге де жеткіземіз.' },
    { q: 'Қойма қайда және тауарды қалай жөнелтемін?', a: 'Қойма Қытайда орналасқан. Жеткізуші немесе сіз тауарды қоймамызға жөнелтесіз, біз қабылдап, шоғырландырып, жеткізуді бастаймыз. Қабылдаған сәттен мерзім басталады.' },
  ],
  cargoCategories: [
    { id: 'general', label: 'Қарапайым тауарлар', rate: 0.5, hint: 'Жалпы мақсаттағы азық-түлік емес жүктер' },
    { id: 'textile', label: 'Тоқыма және киім', rate: 0.6, hint: 'Киім, мата, аяқ киім' },
    { id: 'fragile', label: 'Сынғыш / қаптауды қажет етеді', rate: 0.75, hint: 'Шыны, керамика, жиһаз' },
    { id: 'electronics', label: 'Электроника', rate: 0.9, hint: 'Техника, гаджеттер, жинақтаушылар' },
  ],
  routeOptions: [
    { id: 'kz', label: 'Қазақстан', factor: 1, weeks: [2, 4] },
    { id: 'ru', label: 'Ресей', factor: 1.15, weeks: [3, 6] },
  ],
  ui: {
    nav: {
      cta: 'Өтінім қалдыру',
      menu: 'Мәзір',
      close: 'Жабу',
      label: 'Навигация',
      ariaHome: 'logistics.kaz — басты бет',
      ariaOpen: 'Мәзірді ашу',
      ariaClose: 'Мәзірді жабу',
      items: { services: 'Қызметтер', calculator: 'Калькулятор', geography: 'География', lead: 'Өтінім' },
    },
    hero: {
      wordmark: 'ЛОГИСТИКА',
      vertical: 'Жеткізу · Қытай → Қазақстан · Ресей',
      discoverTitle: 'Қалай жұмыс істейміз',
      discoverSub: 'Жүк жолы 5 қадаммен',
      titleLines: ['Қытайдан логистика', 'кілтпен'],
      bodyHtml:
        'Тауарларды теміржол контейнерлерімен <strong>$0.5 / кг-нан</strong> тасимыз, толық ақ кедендік рәсімдеумен. Мерзім 2–6 апта, тапсырыс 1 тоннадан.',
      cta: 'Өтінім қалдыру',
    },
    preloader: { sub: 'Қытай → Қазақстан · Ресей' },
    manifesto: {
      eyebrow: 'Компания туралы',
      idx: '/ 01 — logistics.kaz',
      statement: 'Қытайдан логистика — тиімді, заңды, кілтпен.',
      p1Html:
        'Біз тауарларды Қытайдан Қазақстанға, қажет болса Ресейге де жеткіземіз. Жүкті теміржол контейнерлерімен <strong>$0.5 / кг-нан</strong> тасимыз және құжаттар топтамасымен толық ақ кедендік рәсімдеуді өзімізге аламыз.',
      p2: 'Жеткізу мерзімі — тауар Қытайдағы қоймамызға түскен сәттен екіден алты аптаға дейін. Ең аз тапсырыс — 1 тоннадан. Ешқандай сұр сұлба жоқ — тек ресми рәсімдеу.',
    },
    services: {
      eyebrow: 'Біз не істейміз',
      index: '/ қызметтер',
      titlePre: 'Жеткізудің толық циклі — ',
      titleAccent: 'Қытайдағы қоймадан мекенжайыңызға дейін',
      lead: 'Барлық кезеңді бір компанияда жабамыз: тасымал, кеден, қойма және жеткізу. Сізге мердігер іздеп, процесті бөлшектеп жинаудың қажеті жоқ.',
      flag: 'Негізгі қызмет',
    },
    calculator: {
      eyebrow: 'Калькулятор',
      index: '/ құнын бағалау',
      titlePre: 'Құнын ',
      titleAccent: 'бір минутта есептеңіз',
      lead: 'Салмақты, жүк түрін және бағытты көрсетіңіз — болжамды баға мен мерзімді көрсетеміз. Нақты құнды менеджер мәліметтерді нақтылағаннан кейін растайды.',
      weight: 'Жүк салмағы',
      minOrder: 'ең аз тапсырыс — 1 тонна',
      unitKg: 'кг',
      unitT: 'т',
      cargoType: 'Жүк түрі',
      direction: 'Бағыт',
      to: (label) => `Қытай → ${label}`,
      weeks: (a, b) => `${a}–${b} апта`,
      rate: (v) => `$${v}/кг-нан`,
      resultLabel: 'Алдын ала құны',
      per: (rate, cat) => `≈ $${rate} кг үшін · ${cat}`,
      term: 'Мерзім',
      termVal: (a, b) => `${a}–${b} апта`,
      directionLabel: 'Бағыт',
      warn: 'Есеп ең аз тапсырыс — 1 тонна үшін көрсетілген.',
      disc: 'Баға болжамды: жүктің нақты сипаттамаларына, қаптамаға және маусымға байланысты. Түпкілікті құнды нақтылағаннан кейін бекітеміз.',
      cta: 'Нақты есепті нақтылау',
      quote: (p) =>
        `Калькулятордан есеп:\n• Салмағы: ${p.weight}\n• Санаты: ${p.category}\n• Бағыты: Қытай → ${p.route}\n• Болжам: ${p.low}–${p.high}, мерзім ${p.w1}–${p.w2} апта.`,
    },
    advantages: {
      eyebrow: 'Артықшылықтар',
      index: '/ неге біз',
      titlePre: 'Бізді таңдаудың екі себебі — ',
      titleAccent: 'баға мен адалдық',
      lead: 'Біз бәрі бола беруге тырыспаймыз. Қытайдан логистика тірелетін екі нәрсені жақсы істейміз: бағаны төмен ұстаймыз және тек ақпен тасимыз.',
      cards: {
        price: { badge: 'Теміржол · контейнер', cap: 'бағасы', unit: '/ кг' },
        white: { badge: 'Қойма · құжаттар', cap: 'кеден', unit: 'ақпен' },
      },
    },
    guarantees: {
      eyebrow: 'Кепілдіктер',
      index: '/ ақ жеткізу',
      titlePre: 'Ақ жеткізу неге — ',
      titleAccent: 'қауіпсіз',
      lead: '«Ақ» логистика сұрдан сәл қымбат, бірақ бизнесіңізді қорғайды: тауар шекарада тұрып қалмайды, оны ресми кіріске алып, сатуға болады.',
    },
    process: {
      eyebrow: 'Бұл қалай жұмыс істейді',
      title: 'Жүк жолы',
      titleStacked: 'Жүк жолы — өтінімнен мекенжайыңызға дейін',
      count: '05 кезең',
    },
    immersive: {
      eyebrow: 'Қозғалыстағы бағыт',
      statement: [
        'Бір контейнер.',
        'Теміржолмен 6 000 шақырым.',
        'Біздің бақылауымызда — Қытайдағы қоймадан мекенжайыңызға дейін.',
      ],
      metrics: [
        { v: '≈6 000', l: 'км бағыт', n: 'Қытай → Қазақстан · РФ' },
        { v: '1', l: 'контейнер', n: '1 тоннадан партиялар' },
        { v: '24/7', l: 'трекинг', n: 'әр кезеңдегі мәртебе' },
      ],
    },
    geography: {
      eyebrow: 'География',
      index: '/ бағыттар',
      titlePre: 'Қытайдан ',
      titleAccent: 'Қазақстан мен Ресейге тасимыз',
      lead: 'Негізгі бағыт — Қытай → Қазақстан, кез келген қалаға жеткізумен. Қажет болса жүкті Ресейге де жеткіземіз.',
      from: 'Қайдан',
      toLabel: 'Қайда',
      term: 'жеткізу мерзімі',
    },
    faq: {
      eyebrow: 'Сұрақ-жауап',
      titlePre: 'Жиі қойылатын ',
      titleAccent: 'сұрақтар',
      askText: 'Жауап таппадыңыз ба? Менеджерге сұрақ қойыңыз — жауап беріп, есепке көмектесеміз.',
      askBtn: 'Сұрақ қою',
    },
    lead: {
      eyebrow: 'Өтінім қалдыру',
      index: '/ байланыс',
      titlePre: 'Жүгіңіздің жеткізуін ',
      titleAccent: 'есептейміз',
      lead: 'Байланыс пен жүк параметрлерін қалдырыңыз — хабарласып, құны мен мерзімін есептейміз. Немесе менеджерге ыңғайлы арнада тікелей жазыңыз.',
      fields: { name: 'Аты-жөні', phone: 'Телефон', email: 'E-mail', cargo: 'Жүк және көлемі' },
      placeholders: {
        name: 'Сізге қалай жүгінейік',
        phone: '+7 ___ ___ __ __',
        email: 'you@company.kz',
        cargo: 'Не тасимыз, шамамен салмақ / көлем, Қытайда қайдан',
      },
      submit: 'Өтінім жіберу',
      noteHtml:
        '«Жіберу» түймесін басу арқылы сіз сұрауыңыз бойынша байланыс деректерін өңдеуге келісім бересіз.',
      success: {
        title: 'Өтінім жиналды',
        body: 'Дайын хаты бар пошта клиентін аштық — оны жіберіңіз, біз сізбен хабарласамыз. Егер хат ашылмаса, бізге тікелей жазыңыз.',
      },
      quick: {
        call: 'Қоңырау шалу',
        whatsapp: 'WhatsApp',
        whatsappSub: 'Мессенджерде жазу',
        email: 'E-mail',
      },
      mail: { subject: 'Жеткізуге өтінім — logistics.kaz', name: 'Аты-жөні', phone: 'Телефон', email: 'E-mail' },
    },
    footer: {
      ready: 'Жүгіңізді тасуға дайынбыз',
      contacts: 'Байланыс',
      nav: 'Навигация',
      items: {
        services: 'Қызметтер',
        calculator: 'Калькулятор',
        geography: 'География',
        faq: 'Сұрақтар',
        lead: 'Өтінім қалдыру',
      },
      legal: (year) => `© ${year} logistics.kaz — Қытайдан Қазақстан мен Ресейге жеткізу`,
      top: 'Жоғары ↑',
    },
  },
};

// ─────────────────────────────── ENGLISH ──────────────────────────────────
const en: Dict = {
  company: { role: 'Director · your manager', responseTime: 'We reply within one business day' },
  stats: [
    { value: '$0.5', unit: '/ kg', label: 'Rate from', note: 'By rail container' },
    { value: '2–6', unit: 'weeks', label: 'Delivery time', note: 'After intake at our China warehouse' },
    { value: '1', unit: 'tonne', label: 'Order from', note: 'Minimum batch size' },
    { value: '100%', unit: 'white', label: 'Customs', note: 'Full document package' },
  ],
  advantages: [
    {
      id: 'price',
      index: '01',
      title: 'Price',
      body: 'We ship in rail containers — the most cost-effective way to move large batches from China. Rates start from $0.5 per kilogram.',
      points: ['Rate from $0.5 / kg', 'Container rail freight', 'Transparent pricing, no hidden fees'],
    },
    {
      id: 'white',
      index: '02',
      title: 'White-label delivery',
      body: 'We handle customs clearance ourselves with a full set of documents. Your cargo crosses the border officially — with no risk to your business.',
      points: ['Full official customs clearance', 'Complete document package', 'Transparent and legal'],
    },
  ],
  services: [
    {
      id: 'rail',
      num: '01',
      title: 'Container rail freight',
      desc: 'Shipping cargo from China by rail containers — the optimal balance of price and time for batches from 1 tonne.',
      meta: ['from $0.5 / kg', 'from 1 tonne', '2–6 weeks'],
    },
    {
      id: 'customs',
      num: '02',
      title: 'Turnkey customs clearance',
      desc: 'We take care of all customs formalities: duty calculation, declaration and a full document package for your goods.',
      meta: ['White clearance', 'Full package', 'No risks'],
    },
    {
      id: 'warehouse',
      num: '03',
      title: 'Warehouse in China',
      desc: 'We receive and consolidate your goods at our warehouse in China. The delivery clock starts the moment cargo is accepted.',
      meta: ['Cargo intake', 'Consolidation', 'Storage'],
    },
    {
      id: 'delivery',
      num: '04',
      title: 'Delivery to KZ & RU',
      desc: 'We bring cargo to Kazakhstan and, if needed, on to Russia. A full cycle from our China warehouse to your address.',
      meta: ['Kazakhstan', 'Russia', 'Turnkey'],
    },
  ],
  process: [
    { num: '01', title: 'Request & quote', body: 'You leave a request with your cargo details. We calculate the cost and delivery time by rail container.' },
    { num: '02', title: 'Intake at the China warehouse', body: 'Your goods arrive at our warehouse in China. From this moment the delivery clock starts — 2 to 6 weeks.' },
    { num: '03', title: 'Rail transport', body: 'Cargo travels by rail container — cost-effective for batches from 1 tonne.' },
    { num: '04', title: 'White customs clearance', body: 'We clear the goods officially with a full document package. Cargo crosses the border legally.' },
    { num: '05', title: 'Delivery to the recipient', body: 'We deliver cargo to your address in Kazakhstan or Russia. The full cycle is complete.' },
  ],
  routes: ['CHINA → KAZAKHSTAN', 'CHINA → RUSSIA', 'RAIL CONTAINERS', 'WHITE CUSTOMS', 'FROM $0.5 / KG', 'WAREHOUSE IN CHINA'],
  guarantees: [
    { title: 'Official customs clearance', body: 'We clear cargo legally, through customs. No grey schemes and no risk of goods being seized at the border.' },
    { title: 'Full document package', body: 'Every batch comes with a declaration and supporting documents. Goods can be officially booked and sold.' },
    { title: 'Transparent price', body: 'Cost depends only on weight and cargo category. We calculate upfront, with no hidden fees or surprise charges.' },
    { title: 'One party responsible for everything', body: 'From intake at the China warehouse to delivery at your address, we run the cargo ourselves — you deal with a single manager.' },
  ],
  lanes: [
    { from: 'China', to: 'Kazakhstan', cities: 'Almaty · Astana · Shymkent · Karaganda', weeks: '2–4 weeks' },
    { from: 'China', to: 'Russia', cities: 'Moscow · Yekaterinburg · Novosibirsk', weeks: '3–6 weeks' },
  ],
  faq: [
    { q: 'What is the minimum order size?', a: 'We work with batches from 1 tonne. This lets us ship by rail container and keep the rate from $0.5 per kilogram.' },
    { q: 'How long does delivery take?', a: '2 to 6 weeks. The clock starts when your goods arrive at our warehouse in China, and depends on the route and load.' },
    { q: 'What does “white” delivery mean?', a: 'We clear cargo officially with a full document package. Goods cross the border legally, with no grey schemes — they can be safely booked and sold.' },
    { q: 'How is the price formed?', a: 'Cost is based on weight and cargo category: the rate starts from $0.5 per kg when shipping by rail container. A manager confirms the exact price after clarifying the details.' },
    { q: 'Do you ship to Russia?', a: 'Yes. The main route is China → Kazakhstan, but if needed we deliver cargo on to Russia as well.' },
    { q: 'Where is the warehouse and how do I send goods?', a: 'The warehouse is in China. You or your supplier send goods to our warehouse; we receive, consolidate and start delivery. The clock starts at intake.' },
  ],
  cargoCategories: [
    { id: 'general', label: 'General goods', rate: 0.5, hint: 'Non-food general-purpose cargo' },
    { id: 'textile', label: 'Textiles & clothing', rate: 0.6, hint: 'Clothes, fabrics, footwear' },
    { id: 'fragile', label: 'Fragile / needs packing', rate: 0.75, hint: 'Glass, ceramics, furniture' },
    { id: 'electronics', label: 'Electronics', rate: 0.9, hint: 'Devices, gadgets, components' },
  ],
  routeOptions: [
    { id: 'kz', label: 'Kazakhstan', factor: 1, weeks: [2, 4] },
    { id: 'ru', label: 'Russia', factor: 1.15, weeks: [3, 6] },
  ],
  ui: {
    nav: {
      cta: 'Get a quote',
      menu: 'Menu',
      close: 'Close',
      label: 'Navigation',
      ariaHome: 'logistics.kaz — home',
      ariaOpen: 'Open menu',
      ariaClose: 'Close menu',
      items: { services: 'Services', calculator: 'Calculator', geography: 'Geography', lead: 'Request' },
    },
    hero: {
      wordmark: 'LOGISTICS',
      vertical: 'Delivery · China → Kazakhstan · Russia',
      discoverTitle: 'How we work',
      discoverSub: 'The cargo journey in 5 steps',
      titleLines: ['Turnkey logistics', 'from China'],
      bodyHtml:
        'We ship goods in rail containers from <strong>$0.5 per kg</strong> with full white customs clearance. 2–6 weeks, orders from 1 tonne.',
      cta: 'Get a quote',
    },
    preloader: { sub: 'China → Kazakhstan · Russia' },
    manifesto: {
      eyebrow: 'About us',
      idx: '/ 01 — logistics.kaz',
      statement: 'Logistics from China — cost-effective, legal, turnkey.',
      p1Html:
        'We deliver goods from China to Kazakhstan and, if needed, on to Russia. We ship in rail containers from <strong>$0.5 per kg</strong> and take on full white customs clearance with a complete document package.',
      p2: 'Delivery takes two to six weeks from the moment goods arrive at our warehouse in China. Minimum order — from 1 tonne. No grey schemes — only official clearance.',
    },
    services: {
      eyebrow: 'What we do',
      index: '/ services',
      titlePre: 'A full delivery cycle — ',
      titleAccent: 'from our China warehouse to your address',
      lead: 'We cover every stage in-house: freight, customs, warehousing and delivery. No need to find contractors or assemble the process from pieces.',
      flag: 'Core service',
    },
    calculator: {
      eyebrow: 'Calculator',
      index: '/ cost estimate',
      titlePre: 'Estimate the cost ',
      titleAccent: 'in a minute',
      lead: 'Enter weight, cargo type and route — we’ll show an approximate price and time. A manager confirms the exact cost after clarifying the details.',
      weight: 'Cargo weight',
      minOrder: 'min. order — 1 tonne',
      unitKg: 'kg',
      unitT: 't',
      cargoType: 'Cargo type',
      direction: 'Route',
      to: (label) => `China → ${label}`,
      weeks: (a, b) => `${a}–${b} weeks`,
      rate: (v) => `from $${v}/kg`,
      resultLabel: 'Preliminary cost',
      per: (rate, cat) => `≈ $${rate} per kg · ${cat}`,
      term: 'Time',
      termVal: (a, b) => `${a}–${b} wks`,
      directionLabel: 'Route',
      warn: 'The estimate is shown for the minimum order — 1 tonne.',
      disc: 'The price is approximate: it depends on the exact cargo specs, packaging and season. We confirm the final cost after clarification.',
      cta: 'Confirm exact quote',
      quote: (p) =>
        `Calculator estimate:\n• Weight: ${p.weight}\n• Category: ${p.category}\n• Route: China → ${p.route}\n• Estimate: ${p.low}–${p.high}, time ${p.w1}–${p.w2} wks.`,
    },
    advantages: {
      eyebrow: 'Advantages',
      index: '/ why us',
      titlePre: 'Two reasons to choose us — ',
      titleAccent: 'price and honesty',
      lead: 'We don’t try to be everything at once. We do two things well, the things logistics from China rests on: keep the rate low and ship only white.',
      cards: {
        price: { badge: 'Rail · containers', cap: 'rate from', unit: '/ kg' },
        white: { badge: 'Warehouse · documents', cap: 'customs', unit: 'white' },
      },
    },
    guarantees: {
      eyebrow: 'Guarantees',
      index: '/ white delivery',
      titlePre: 'Why white delivery is — ',
      titleAccent: 'safe',
      lead: '“White” logistics costs a little more than grey, but it protects your business: goods won’t get stuck at the border, and can be officially booked and sold.',
    },
    process: {
      eyebrow: 'How it works',
      title: 'Cargo journey',
      titleStacked: 'The cargo journey — from request to your address',
      count: '05 stages',
    },
    immersive: {
      eyebrow: 'Route in motion',
      statement: [
        'One container.',
        '6,000 kilometres by rail.',
        'Under our control — from the China warehouse to your address.',
      ],
      metrics: [
        { v: '≈6,000', l: 'km route', n: 'China → Kazakhstan · RU' },
        { v: '1', l: 'container', n: 'batches from 1 tonne' },
        { v: '24/7', l: 'tracking', n: 'status at every stage' },
      ],
    },
    geography: {
      eyebrow: 'Geography',
      index: '/ routes',
      titlePre: 'We ship from China to ',
      titleAccent: 'Kazakhstan and Russia',
      lead: 'The main route is China → Kazakhstan with delivery to any city. If needed, we deliver cargo on to Russia as well.',
      from: 'From',
      toLabel: 'To',
      term: 'delivery time',
    },
    faq: {
      eyebrow: 'FAQ',
      titlePre: 'Frequently asked ',
      titleAccent: 'questions',
      askText: 'Didn’t find an answer? Ask a manager — we’ll reply and help with a quote.',
      askBtn: 'Ask a question',
    },
    lead: {
      eyebrow: 'Get a quote',
      index: '/ contacts',
      titlePre: 'We’ll cost the delivery ',
      titleAccent: 'of your cargo',
      lead: 'Leave your contacts and cargo details — we’ll get in touch and work out the cost and timing. Or message a manager directly on your preferred channel.',
      fields: { name: 'Name', phone: 'Phone', email: 'E-mail', cargo: 'Cargo & volume' },
      placeholders: {
        name: 'How should we address you',
        phone: '+7 ___ ___ __ __',
        email: 'you@company.kz',
        cargo: 'What we ship, approx. weight / volume, where in China',
      },
      submit: 'Send request',
      noteHtml:
        'By clicking “Send”, you agree to the processing of your contact details to respond to your request.',
      success: {
        title: 'Request assembled',
        body: 'We’ve opened your mail client with a ready message — just send it and we’ll get in touch. If it didn’t open, write to us directly.',
      },
      quick: {
        call: 'Call',
        whatsapp: 'WhatsApp',
        whatsappSub: 'Message on the app',
        email: 'E-mail',
      },
      mail: { subject: 'Delivery request — logistics.kaz', name: 'Name', phone: 'Phone', email: 'E-mail' },
    },
    footer: {
      ready: 'Ready to move your cargo',
      contacts: 'Contacts',
      nav: 'Navigation',
      items: {
        services: 'Services',
        calculator: 'Calculator',
        geography: 'Geography',
        faq: 'FAQ',
        lead: 'Get a quote',
      },
      legal: (year) => `© ${year} logistics.kaz — delivery from China to Kazakhstan and Russia`,
      top: 'Top ↑',
    },
  },
};

export const translations: Record<Lang, Dict> = { ru, kk, en };
