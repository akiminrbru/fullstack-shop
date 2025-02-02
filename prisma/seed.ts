import slug from 'slug';
import { PrismaService } from '../src/prisma.service';

const prisma = new PrismaService();

async function up() {
  await prisma.category.createMany({
    data: [
      {
        name: 'Смартфоны',
        slug: slug('Смартфоны', { lower: true }),
      },
      {
        name: 'Ноутбуки',
        slug: slug('Ноутбуки', { lower: true }),
      },
    ],
  });

  await prisma.brand.createMany({
    data: [
      {
        name: 'Poco',
      },
      {
        name: 'Samsung',
      },
      {
        name: 'Apple',
      },
      {
        name: 'Honor',
      },
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        title: 'Смартфон POCO X6 5G 12/512Gb',
        slug: slug('Смартфон POCO X6 5G 12/512Gb', { lower: true }),
        previewImage: '/assets/products/poco.webp',
        price: 30000,
        brandId: 1,
        categoryId: 1,
      },
      {
        title: 'Смартфон Samsung S24+ 12/512GB',
        slug: slug('Смартфон Samsung S24+ 12/512GB', { lower: true }),
        previewImage: '/assets/products/samsung.webp',
        price: 60000,
        brandId: 2,
        categoryId: 1,
      },
      {
        title: 'Смартфон Apple iPhone 15 512Gb',
        slug: slug('Смартфон Apple iPhone 15 512Gb', { lower: true }),
        price: 100000,
        previewImage: '/assets/products/iphone.webp',
        brandId: 3,
        categoryId: 1,
      },
      {
        title: 'Ноутбук Honor MagicBook 14, 14/R7/16Gb/512Gb/DOS (5301AFVP)',
        slug: slug(
          'Ноутбук Honor MagicBook 14, 14/R7/16Gb/512Gb/DOS (5301AFVP)',
          {
            lower: true,
          },
        ),
        previewImage: '/assets/products/honor.webp',
        price: 53980,
        brandId: 4,
        categoryId: 2,
      },
      {
        title:
          'Ноутбук Apple MacBook Air 13 Midnight, 13.6/M3/8Gb/256Gb/KB-EU,RU (MRXV3)',
        slug: slug(
          'Ноутбук Apple MacBook Air 13 Midnight, 13.6/M3/8Gb/256Gb/KB-EU,RU (MRXV3)',
          { lower: true },
        ),
        previewImage: '/assets/products/macbook.webp',
        price: 113800,
        brandId: 3,
        categoryId: 2,
      },
    ],
  });

  await prisma.review.createMany({
    data: [
      {
        productId: 1,
        comment: 'Хороший товар, но не самый лучший',
        rating: 4,
      },
      {
        productId: 1,
        comment: 'Отличный товар, все хорошо',
        rating: 5,
      },
      {
        productId: 1,
        comment: 'Такой себе товар конечно, но хорошо работает',
        rating: 3,
      },
    ],
  });

  await prisma.post.createMany({
    data: [
      {
        title: 'Искусственный интеллект: будущее технологий',
        slug: slug('Искусственный интеллект: будущее технологий', {
          lower: true,
        }),
        description:
          'В данной статье рассматриваются основные направления развития искусственного интеллекта и его влияние на различные сферы жизни.',
        content: {
          introduction:
            'Искусственный интеллект (ИИ) становится неотъемлемой частью нашей жизни, влияя на технологии, бизнес и многое другое.',
          mainPoints: [
            {
              heading: 'Автоматизация',
              text: 'ИИ помогает автоматизировать рутинные задачи, повышая эффективность и снижая затраты.',
            },
            {
              heading: 'Здравоохранение',
              text: 'В медицинской сфере ИИ используется для диагностики заболеваний и разработки индивидуализированных лечебных планов.',
            },
            {
              heading: 'Транспорт',
              text: 'Автономные автомобили и умные транспортные системы меняют наше представление о движении.',
            },
          ],
          conclusion:
            'Будущее искусственного интеллекта обещает быть ярким и насыщенным новыми возможностями.',
        },
        imageUrl: 'https://example.com/ai-future.jpg',
        tag: 'Технологии',
        readTime: 5,
      },
      {
        title: 'Путешествие по миру йоги',
        slug: slug('Путешествие по миру йоги', {
          lower: true,
        }),
        description:
          'Эта статья предлагает читателям разобраться в различных стилях йоги и выбрать тот, который подойдёт именно им.',
        content: {
          introduction:
            'Йога – это не просто физические упражнения, это целая философия и подход к жизни.',
          styles: [
            {
              name: 'Хатха-йога',
              description:
                'Подходит для начинающих и включает в себя основные асаны и дыхательные практики.',
            },
            {
              name: 'Виньяса-йога',
              description:
                'Более динамичный стиль, в котором связаны дыхание и движение.',
            },
            {
              name: 'Аштанга-йога',
              description:
                'Система, которая включает в себя строгую последовательность асан и концентрацию.',
            },
          ],
          conclusion:
            'Независимо от того, какой стиль вы выберете, йога приносит гармонию и баланс в вашу жизнь.',
        },
        imageUrl: 'https://example.com/yoga-world.jpg',
        tag: 'Здоровье',
        readTime: 4,
      },
      {
        title: 'Зачем нужно учить иностранные языки?',
        slug: slug('Зачем нужно учить иностранные языки?', {
          lower: true,
        }),
        description:
          'В статье приводятся причины для изучения иностранных языков и советы по эффективным методам обучения.',
        content: {
          introduction:
            'Изучение иностранных языков открывает множество горизонтов и возможностей.',
          benefits: [
            {
              point: 'Культурное обогащение',
              details: 'Познание новой культуры поможет вам понять мир глубже.',
            },
            {
              point: 'Карьера',
              details:
                'Знание языков делает вас более востребованным специалистом на рынке труда.',
            },
            {
              point: 'Путешествия',
              details:
                'Умение общаться на местном языке обогащает опыт путешествий.',
            },
          ],
          tips: 'Регулярная практика, использование технологий и общение с носителями языка очень помогут.',
        },
        imageUrl: 'https://example.com/language-learning.jpg',
        tag: 'образование',
        readTime: 6,
      },
      {
        title: 'Психология успеха: как достичь своих целей',
        slug: slug('Психология успеха: как достичь своих целей', {
          lower: true,
        }),
        description:
          'Эта статья рассматривает психологические аспекты достижения успеха и предлагает стратегии для личностного роста.',
        content: {
          introduction:
            'Психология успеха включает в себя множество факторов, от мотивации до планирования.',
          strategies: [
            {
              name: 'Установка целей',
              description:
                'Четкие и достижимые цели помогают фокусироваться и двигаться вперёд.',
            },
            {
              name: 'Позитивное мышление',
              description: 'Верить в себя и свои возможности - ключ к успеху.',
            },
            {
              name: 'Постоянное обучение',
              description:
                'Упор на личностный рост и развитие навыков помогает достичь новых высот.',
            },
          ],
          conclusion:
            'Успех - это не конечный пункт, а процесс, требующий настойчивости и саморазвития.',
        },
        imageUrl: 'https://example.com/success-psychology.jpg',
        tag: 'Мотивация',
        readTime: 5,
      },
      {
        title: 'Секреты успешного финансового планирования',
        slug: slug('Секреты успешного финансового планирования', {
          lower: true,
        }),
        description:
          'В этой статье разбираются основные принципы финансового планирования и управления личным бюджетом.',
        content: {
          introduction:
            'Управление финансами – это неотъемлемая часть финансовой независимости.',
          principles: [
            {
              point: 'Создание бюджета',
              details:
                'Записывайте все доходы и расходы, чтобы видеть полную картину.',
            },
            {
              point: 'Сбережения',
              details:
                'Рекомендуется отложить минимум 20% дохода на сбережения.',
            },
            {
              point: 'Инвестиции',
              details: 'Инвестируйте с умом, чтобы увеличить ваш капитал.',
            },
          ],
          conclusion:
            'Разумное финансовое планирование – это ключ к стабильности и уверенности в будущем.',
        },
        imageUrl: 'https://example.com/financial-planning.jpg',
        tag: 'финансы',
        readTime: 4,
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Brand" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
