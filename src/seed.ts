/* eslint-disable max-len */
/* eslint-disable sonarjs/no-duplicate-string */
import { CostTypeEnum } from '@prisma/client';
import prisma from './prisma';

const seedSpecializayions = async () => {
  await prisma.specialization.createMany({
    data: [
      {
        title: 'Сайты "под ключ"',
        topLevelTitle: 'Разработка',
      },
      {
        title: 'Бэкенд',
        topLevelTitle: 'Разработка',
      },
      {
        title: 'Фронтенд',
        topLevelTitle: 'Разработка',
      },
      {
        title: 'Прототипирование',
        topLevelTitle: 'Разработка',
      },
      {
        title: 'iOS',
        topLevelTitle: 'Разработка',
      },
      {
        title: 'Android',
        topLevelTitle: 'Разработка',
      },
      {
        title: 'Десктопное ПО',
        topLevelTitle: 'Разработка',
      },
      {
        title: 'Боты и парсинг данных',
        topLevelTitle: 'Разработка',
      },
      {
        title: 'Разработка игр',
        topLevelTitle: 'Разработка',
      },
      {
        title: '1C-программирование',
        topLevelTitle: 'Разработка',
      },
      {
        title: 'Скрипты и плагины',
        topLevelTitle: 'Разработка',
      },
      {
        title: 'Голосовые интерфейсы',
        topLevelTitle: 'Разработка',
      },
      {
        title: 'Сайты',
        topLevelTitle: 'Дизайн',
      },
      {
        title: 'Лендинги',
        topLevelTitle: 'Дизайн',
      },
      {
        title: 'Логотипы',
        topLevelTitle: 'Дизайн',
      },
      {
        title: 'Рисунки и илюстрации',
        topLevelTitle: 'Дизайн',
      },
      {
        title: 'Мобильные приложения',
        topLevelTitle: 'Дизайн',
      },
      {
        title: 'Иконки',
        topLevelTitle: 'Дизайн',
      },
      {
        title: 'Полиграфия',
        topLevelTitle: 'Дизайн',
      },
      {
        title: 'Баннеры',
        topLevelTitle: 'Дизайн',
      },
      {
        title: 'Векторная графика',
        topLevelTitle: 'Дизайн',
      },
      {
        title: 'Фирменный стиль',
        topLevelTitle: 'Дизайн',
      },
      {
        title: 'Презентации',
        topLevelTitle: 'Дизайн',
      },
      {
        title: '3D',
        topLevelTitle: 'Дизайн',
      },
      {
        title: 'Анимация',
        topLevelTitle: 'Дизайн',
      },
      {
        title: 'Обработка фото',
        topLevelTitle: 'Дизайн',
      },
    ],
  });
};

const seedOrders = async () => {
  await prisma.order.createMany({
    data: [
      {
        cost: undefined,
        costType: CostTypeEnum.contract,
        customerId: '2d287fde-65d6-4522-87dc-c71a00d2f463',
        description: `Сайт https://dev.etalon66.ru/
        У нас будет много товаров (тысячи) с вариациями такого вида: https://gabbasov98.github.io/etalon/catalog-item.html (отройте в карточке товара вкладку "Вариации изделия"), наполнять будем ручками.
        
        Сейчас в админке вариации у товаров создаются крайне замороченно в разделе "Торговые предложения": https://disk.yandex.ru/i/YC_UvVZjPavAkQ. Нужно ходить по другим разделам админки и делать кучу лишних действий, прежде чем получится создать вариативный товар.
        
        Нужно максимально упростить и ускорить процесс наполнения сайта. Хочется иметь примерно такой интерфейс прямо в карточке редактирования товара: https://disk.yandex.ru/i/dgBoPJ1aoRYPZw, чтобы не приходилось гулять по другим разделам админки и тратить х5 времени. Хорошо бы ещё запилить импорт csv в карточку, чтобы можно было разом подгрузить вариации.
        
        Нам сообщили, что такое требование невыполнимо, цитирую: "страницы админки нельзя редактировать, так как это ядро сайта, может нарушить работу всего сайта".
        
        Можно так сделать, как я описал выше? Мб у вас есть примеры плюс-минус готовых решений? В откликах, пожалуйста, дайте подробности по реализации.
        Файлы
        `,
        files: ['https://habrastorage.org/getpro/freelansim/allfiles/17/174/174085/merocel-18-std.xlsx'],
        specializationId: '964665f7-5259-4f56-a8e9-e5b1cdb0c08a',
        tags: ['bitrix', 'bitrix cms', 'битрикс'],
        title: 'Доработка редактирования товаров в админке Bitrix CMS',
      },
      {
        cost: 350,
        costType: CostTypeEnum.inHour,
        customerId: '2d287fde-65d6-4522-87dc-c71a00d2f463',
        description: 'Необходимо разработать систему для загрузки и анализа данных с внешнего API. Информация должна автоматически обновляться каждый час. Желательно использовать Node.js и предоставить примеры реализации.',
        files: ['https://example.com/api-docs'],
        specializationId: '99265806-f516-4e8a-975a-6f8d1d09ea29',
        tags: ['node.js', 'API integration', 'data analysis'],
        title: 'Разработка системы загрузки данных с внешнего API',
      },
      {
        cost: undefined,
        costType: CostTypeEnum.contract,
        customerId: '2d287fde-65d6-4522-87dc-c71a00d2f463',
        description: 'Требуется разработка мобильного приложения для онлайн-обучения. Приложение должно поддерживать видеолекции, тестирование и чат для обсуждения. Дизайн приложения должен быть современным и интуитивно понятным.',
        files: ['https://example.com/mockups'],
        specializationId: '05ecc7ca-77b8-48c2-9967-21697d144663',
        tags: ['mobile app', 'education', 'UI/UX design'],
        title: 'Разработка мобильного приложения для онлайн-обучения',
      },
      {
        cost: 15000,
        costType: CostTypeEnum.inOrder,
        customerId: '2d287fde-65d6-4522-87dc-c71a00d2f463',
        description: 'Требуется создание лендинга для продажи эксклюзивных товаров. Дизайн должен быть привлекательным, а функционал - удобным для покупателей. Интеграция с платежными системами обязательна.',
        files: ['https://example.com/design-concept'],
        specializationId: 'bda09ca3-c520-41d6-a822-b0b012415bd1',
        tags: ['landing page', 'e-commerce', 'web design'],
        title: 'Создание лендинга для продажи эксклюзивных товаров',
      },
      {
        cost: 1000,
        costType: CostTypeEnum.inHour,
        customerId: '2d287fde-65d6-4522-87dc-c71a00d2f463',
        description: 'Необходимо разработать систему управления задачами с возможностью добавления, редактирования и отслеживания статуса задач. Предпочтительные технологии: React.js (фронтенд) и Node.js (бэкенд).',
        files: ['https://example.com/system-requirements'],
        specializationId: 'bda09ca3-c520-41d6-a822-b0b012415bd1',
        tags: ['task management', 'React.js', 'Node.js'],
        title: 'Разработка системы управления задачами',
      },
      {
        cost: 5000,
        costType: CostTypeEnum.inOrder,
        customerId: '2d287fde-65d6-4522-87dc-c71a00d2f463',
        description: 'Требуется интеграция платежной системы в веб-приложение. Пользователи должны иметь возможность осуществлять оплату услуг через различные платежные методы. Предпочтительные технологии: Django (бэкенд) и Vue.js (фронтенд).',
        files: ['https://example.com/payment-gateway-docs'],
        specializationId: '99265806-f516-4e8a-975a-6f8d1d09ea29',
        tags: ['payment integration', 'Django', 'Vue.js'],
        title: 'Интеграция платежной системы в веб-приложение',
      },
      {
        cost: 250000,
        costType: CostTypeEnum.inOrder,
        customerId: '2d287fde-65d6-4522-87dc-c71a00d2f463',
        description: 'Требуется создать систему умного дома, интегрированную с умными устройствами. Пользователи должны иметь возможность управлять освещением, климатом и безопасностью через мобильное приложение. Важна совместимость с различными устройствами.',
        files: ['https://example.com/smart-home-concept'],
        specializationId: '05ecc7ca-77b8-48c2-9967-21697d144663',
        tags: ['smart home', 'IoT', 'mobile app'],
        title: 'Разработка системы умного дома',
      },
      {
        cost: undefined,
        costType: CostTypeEnum.contract,
        customerId: '2d287fde-65d6-4522-87dc-c71a00d2f463',
        description: 'Требуется создать систему управления контентом для веб-сайта. Функционал должен включать в себя удобное добавление, редактирование и удаление контента. Пожалуйста, предоставьте примеры реализации и подробности по интеграции.',
        files: ['https://example.com/cms-requirements'],
        specializationId: '964665f7-5259-4f56-a8e9-e5b1cdb0c08a',
        tags: ['content management', 'web development'],
        title: 'Разработка системы управления контентом',
      },
      {
        cost: 200000,
        costType: CostTypeEnum.inOrder,
        customerId: '2d287fde-65d6-4522-87dc-c71a00d2f463',
        description: 'Необходимо разработать онлайн-магазин с автоматической интеграцией поставщиков. Система должна обновлять товары и цены автоматически. Интеграция с платежными системами обязательна. Предпочтительные технологии: Magento.',
        files: ['https://example.com/store-concept'],
        specializationId: 'bda09ca3-c520-41d6-a822-b0b012415bd1',
        tags: ['e-commerce', 'Magento', 'payment integration'],
        title: 'Создание онлайн-магазина с автоматической интеграцией поставщиков',
      },
      {
        cost: 15000,
        costType: CostTypeEnum.inHour,
        customerId: '2d287fde-65d6-4522-87dc-c71a00d2f463',
        description: 'Требуется разработать систему аналитики для бизнеса. Система должна собирать, обрабатывать и визуализировать данные для принятия стратегических решений. Предпочтительные технологии: Python, Power BI.',
        files: ['https://example.com/analytics-requirements'],
        specializationId: '99265806-f516-4e8a-975a-6f8d1d09ea29',
        tags: ['business analytics', 'Python', 'Power BI'],
        title: 'Разработка системы аналитики для бизнеса',
      },
      {
        cost: undefined,
        costType: CostTypeEnum.contract,
        customerId: '2d287fde-65d6-4522-87dc-c71a00d2f463',
        description: 'Требуется интеграция чат-бота для предоставления поддержки клиентам. Бот должен обрабатывать часто задаваемые вопросы и предоставлять информацию о продуктах и услугах. Пожалуйста, предоставьте примеры реализации и необходимые интеграции.',
        files: ['https://example.com/chatbot-docs'],
        specializationId: '05ecc7ca-77b8-48c2-9967-21697d144663',
        tags: ['chatbot', 'customer support'],
        title: 'Интеграция чат-бота для поддержки клиентов',
      },
      {
        cost: 250,
        costType: CostTypeEnum.inHour,
        customerId: '2d287fde-65d6-4522-87dc-c71a00d2f463',
        description: 'Необходимо разработать систему безопасности для веб-приложения. Система должна обеспечивать защиту от различных видов атак и утечек данных. Предпочтительные технологии: cybersecurity.',
        files: ['https://example.com/security-requirements'],
        specializationId: 'bda09ca3-c520-41d6-a822-b0b012415bd1',
        tags: ['web security', 'cybersecurity'],
        title: 'Разработка системы безопасности для веб-приложения',
      },

    ],
  });
};

// seedSpecializayions();
seedOrders();
