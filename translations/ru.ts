import { Translation } from '@/types/language';

export const ru: Translation = {
  common: {
    save: "Сохранить",
    cancel: "Отмена",
    edit: "Редактировать",
    delete: "Удалить",
    loading: "Загрузка...",
    search: "Поиск",
    noResults: "Результаты не найдены",
    back: "Назад",
    next: "Далее",
    done: "Готово",
    error: "Произошла ошибка",
    success: "Успешно",
    confirm: "Подтвердить",
    yes: "Да",
    no: "Нет",
    guest: "Гость",
    saveChanges: "Сохранить изменения",
  },
  auth: {
    login: "Войти",
    loginTitle: "С возвращением!",
    loginSubtitle: "Войдите в свой аккаунт",
    email: "Эл. почта",
    emailPlaceholder: "Введите вашу эл. почту",
    password: "Пароль",
    passwordPlaceholder: "Введите ваш пароль",
    forgotPassword: "Забыли пароль?",
    demoUser: "Войти как демо-пользователь",
    or: "или",
    invalidCredentials: "Неверная эл. почта или пароль",
  },
  dashboard: {
    greeting: "Доброго времени суток,",
    overview: "Обзор",
    activeProjects: "Активные проекты",
    activeCampaigns: "Активные кампании",
    totalClients: "Всего клиентов",
    revenue: "Доход (МТД)",
    upcomingDeadlines: "Предстоящие сроки",
    noDeadlines: "Нет предстоящих сроков в ближайшие 14 дней",
    activeCampaignsSection: "Активные кампании",
    noCampaigns: "На данный момент нет активных кампаний",
    clientTestimonials: "Отзывы клиентов",
    noTestimonials: "Нет избранных отзывов",
    vsLastMonth: "по сравнению с прошлым месяцем",
  },
  projects: {
    title: "Проекты",
    all: "Все",
    inProgress: "В процессе",
    planning: "Планирование",
    review: "Проверка",
    completed: "Завершено",
    onHold: "На паузе",
    noProjects: "Проекты не найдены",
    deadline: "Срок",
    teamMembers: "участников команды",
    progress: "Прогресс",
    budget: "Бюджет",
    client: "Клиент",
    startDate: "Дата начала",
    tags: "Теги",
    priority: {
      low: "НИЗКИЙ",
      medium: "СРЕДНИЙ",
      high: "ВЫСОКИЙ",
      urgent: "СРОЧНЫЙ",
    },
  },
  campaigns: {
    title: "Кампании",
    type: "Тип",
    status: {
      active: "АКТИВНА",
      scheduled: "ЗАПЛАНИРОВАНА",
      draft: "ЧЕРНОВИК",
      paused: "ПРИОСТАНОВЛЕНА",
      completed: "ЗАВЕРШЕНА",
    },
    dateRange: "Период",
    budget: "Бюджет",
    performance: "Эффективность",
    reach: "Охват",
    engagement: "Вовлеченность",
    conversion: "Конверсия",
    platforms: "Платформы",
    assets: "Материалы",
    startDate: "Дата начала",
    endDate: "Дата окончания",
    client: "Клиент",
  },
  clients: {
    title: "Клиенты",
    searchPlaceholder: "Поиск клиентов...",
    noClients: "Клиенты не найдены",
    viewProjects: "Просмотр проектов",
    contact: "Связаться",
  },
  settings: {
    title: "Настройки",
    account: "Аккаунт",
    personalInfo: "Личная информация",
    billingPayments: "Оплата и платежи",
    security: "Безопасность",
    preferences: "Предпочтения",
    notifications: "Уведомления",
    darkMode: "Темная тема",
    language: "Язык",
    support: "Помощь и поддержка",
    logout: "Выйти",
    version: "Версия",
    editProfile: "Редактировать профиль",
    fullName: "Полное имя",
    emailAddress: "Эл. почта",
    phoneNumber: "Номер телефона",
    position: "Должность",
    company: "Компания",
    saveChanges: "Сохранить изменения",
    changePhoto: "Изменить фото",
  },
  billing: {
    currentPlan: "Текущий план",
    enterprisePlan: "Корпоративный план",
    active: "АКТИВЕН",
    monthlyPrice: "/месяц",
    planDescription: "Полный доступ ко всем функциям, неограниченное количество проектов, приоритетная поддержка",
    manageSubscription: "Управление подпиской",
    paymentMethods: "Способы оплаты",
    addPaymentMethod: "Добавить способ оплаты",
    default: "ПО УМОЛЧАНИЮ",
    billingHistory: "История платежей",
    downloadPdf: "Скачать PDF",
  },
  security: {
    changePassword: "Изменить пароль",
    currentPassword: "Текущий пароль",
    newPassword: "Новый пароль",
    confirmNewPassword: "Подтвердите новый пароль",
    updatePassword: "Обновить пароль",
    twoFactorAuth: "Двухфакторная аутентификация",
    smsAuth: "SMS-аутентификация",
    smsAuthDesc: "Получать код подтверждения по SMS при входе",
    biometricAuth: "Биометрическая аутентификация",
    biometricAuthDesc: "Использовать отпечаток пальца или распознавание лица для входа",
    sessionSettings: "Настройки сессии",
    autoLogout: "Автоматический выход",
    autoLogoutDesc: "Автоматически выходить после 30 минут бездействия",
    securityAlert: "Предупреждение безопасности",
    reviewActivity: "Просмотр активности",
  },
  language: {
    title: "Язык",
    selectLanguage: "Выберите предпочитаемый язык. Это изменит язык во всем приложении.",
    availableLanguages: "Доступные языки",
    helpTranslate: "Помогите нам с переводом",
    helpTranslateDesc: "Мы всегда стремимся улучшить наши переводы. Если вы хотите помочь с переводом приложения на ваш язык, пожалуйста, свяжитесь с нашей службой поддержки.",
    contactSupport: "Связаться с поддержкой",
  },
  support: {
    title: "Помощь и поддержка",
    contactUs: "Свяжитесь с нами",
    liveChat: "Живой чат",
    callUs: "Позвоните нам",
    email: "Эл. почта",
    faq: "Часто задаваемые вопросы",
    searchFaq: "Поиск по вопросам...",
    noFaqResults: "Не найдено вопросов по вашему запросу",
    sendMessage: "Отправить нам сообщение",
    messagePlaceholder: "Введите ваш вопрос или проблему здесь...",
    sendButton: "Отправить сообщение",
    viewDocumentation: "Просмотреть документацию",
  },
};