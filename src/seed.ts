/* eslint-disable sonarjs/no-duplicate-string */
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

seedSpecializayions();
