### Avtomobil Ijarasi Boshqaruv Tizimi - To'liq Dokumentatsiya

## Loyiha Haqida

Bu loyiha avtomobil ijarasi va sotish boshqaruv tizimi bo'lib, Next.js 15, TypeScript va Tailwind CSS yordamida yaratilgan. Tizim ikki asosiy qismdan iborat: **Admin Panel** va **Mijoz Paneli**.

## Texnologiyalar

- **Framework**: Next.js 15 (App Router)
- **Til**: TypeScript
- **Styling**: Tailwind CSS
- **UI Komponentlar**: Radix UI primitives
- **Icons**: Lucide React
- **Font**: Lexend
- **Animatsiyalar**: tw-animate-css


## Fayl Strukturasi

```plaintext
src/
├── app/
│   ├── (admin)/                    # Admin panel route group
│   │   ├── add-cars/
│   │   │   ├── car-form.tsx       # Avtomobil qo'shish formi
│   │   │   └── page.tsx           # Sahifa wrapper
│   │   ├── all-cars/
│   │   │   └── page.tsx           # Barcha avtomobillar sahifasi
│   │   ├── customers/
│   │   │   ├── add/
│   │   │   │   ├── add-customer-form.tsx  # Mijoz qo'shish formi
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx           # Mijozlar ro'yxati
│   │   ├── debt/
│   │   │   ├── debt-client.tsx    # Qarzlar komponenti
│   │   │   └── page.tsx
│   │   ├── evaluation-results/
│   │   │   ├── evaluation-results-client.tsx  # Baholash natijalari
│   │   │   └── page.tsx
│   │   ├── finance/
│   │   │   ├── finance-client.tsx # Moliya komponenti
│   │   │   └── page.tsx
│   │   ├── fine/
│   │   │   ├── fine-client.tsx    # Jarimalar qidiruv
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx      # Jarima tafsilotlari
│   │   ├── geolocation/
│   │   │   ├── geolocation-client.tsx  # Xarita va joylashuv
│   │   │   └── page.tsx
│   │   ├── market-pricing/
│   │   │   ├── market-pricing-client.tsx  # Bozor narxlari
│   │   │   └── page.tsx
│   │   ├── overpricing/
│   │   │   ├── overpricing-client.tsx     # Qimmat narxlar
│   │   │   └── page.tsx
│   │   ├── transaction/
│   │   │   ├── transaction-client.tsx     # Tranzaksiyalar
│   │   │   ├── transaction-drawer.tsx     # Tranzaksiya modal
│   │   │   └── page.tsx
│   │   ├── underpricing/
│   │   │   ├── underpricing-client.tsx    # Arzon narxlar
│   │   │   └── page.tsx
│   │   ├── users-list/
│   │   │   ├── users-list-client.tsx      # Foydalanuvchilar
│   │   │   └── page.tsx
│   │   └── layout.tsx             # Admin layout
│   ├── customer/
│   │   ├── (user)/                # Mijoz route group
│   │   │   ├── close/page.tsx     # Yopilgan to'lovlar
│   │   │   ├── debt/page.tsx      # Mijoz qarzlari
│   │   │   ├── fine/
│   │   │   │   ├── fine-client.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── payment/page.tsx   # To'lovlar sahifasi
│   │   │   ├── payment-1/page.tsx # To'lov bosqich 1
│   │   │   ├── payment-2/page.tsx # To'lov bosqich 2
│   │   │   ├── payment-3/page.tsx # To'lov bosqich 3
│   │   │   ├── payment-4/page.tsx # To'lov bosqich 4
│   │   │   ├── payment-5/page.tsx # To'lov bosqich 5
│   │   │   ├── payment-6/page.tsx # To'lov bosqich 6
│   │   │   ├── transaction/
│   │   │   │   ├── transaction-client.tsx
│   │   │   │   ├── transaction-drawer.tsx
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx         # Mijoz layout
│   │   ├── layout.tsx             # Mijoz asosiy layout
│   │   └── page.tsx               # Mijoz dashboard
│   ├── globals.css                # Global stillar
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Bosh sahifa
├── components/
│   ├── all-cars/
│   │   ├── cars.tsx               # Avtomobillar ro'yxati
│   │   └── index.tsx              # All cars wrapper
│   ├── customers/
│   │   └── index.tsx              # Mijozlar komponenti
│   ├── dashboard/
│   │   ├── header.tsx             # Dashboard header
│   │   └── page.tsx               # Dashboard sahifasi
│   ├── layout/
│   │   ├── app-bar.tsx            # Pastki navigatsiya
│   │   ├── container.tsx          # Konteyner komponenti
│   │   └── navbar.tsx             # Yuqori navigatsiya
│   ├── ui/                        # UI komponentlari
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── drawer.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── popover.tsx
│   │   ├── radio-group.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   └── typography-h1.tsx
│   ├── action-card.tsx            # Harakat kartasi
│   ├── button.tsx                 # Custom button
│   ├── countdown-timer.tsx        # Vaqt hisoblagich
│   ├── file-upload-area.tsx       # Fayl yuklash
│   ├── icon.tsx                   # SVG icon loader
│   ├── pagination.tsx             # Sahifalash
│   ├── payment-method-card.tsx    # To'lov usuli kartasi
│   ├── progress-indicator.tsx     # Progress bar
│   └── tab-navigation.tsx         # Tab navigatsiya
├── lib/
│   ├── api.ts                     # API funksiyalari
│   ├── object-array-generator.ts  # Yordamchi generator
│   └── utils.ts                   # Utility funksiyalar
└── types/
    └── global.d.ts                # Global type definitions
```

## Admin Panel Sahifalari

### 1. Dashboard (`/`)

**Fayl**: `app/page.tsx`, `components/dashboard/page.tsx`

**Xususiyatlar**:

- Logo va "Add App" tugmasi
- Dropdown select (Выкуп)
- 4 ta statistika kartasi (Просрочка, возврат, Закрите, Геолакации)
- 3 ta harakat kartasi (Добавить авто, Мой помощник, Сдать)
- Avtomobil baholash bo'limi
- 5 ta statistika bloki (Общее Поступления, Ближайшие поступления, Задолженность, Прямой доход)
- Ближайшие оплаты jadvali
- Свободное Авто bo'limi


### 2. Avtomobil Qo'shish (`/add-cars`)

**Fayl**: `app/(admin)/add-cars/car-form.tsx`

**Xususiyatlar**:

- 3 ta tab: "Сухой продажи", "Для Выкупа", "Закуп"
- Umumiy maydonlar:

- Марка автомобиля (select)
- Модель автомобиля (select)
- Комплектация (select)
- Год выпуска
- Номер ГОСТ
- Цвет автомобиля
- Пробег
- Состояние (select)
- Количество мест (select)





**Tab-ga qarab qo'shimcha maydonlar**:

- **Сухой продажи/Для Выкупа**: Цена сухой продаже, Фактически продано
- **Для Выкупа**: Продажа с выкупом, Ставка, Статус (radio)
- **Закуп**: Сумма, Укомплектующий, Ремонт, Календарь, Комментарий, Статус, До/После rasmlari


**Rasm yuklash**: Drag & drop interfeysi

### 3. Barcha Avtomobillar (`/all-cars`)

**Fayl**: `components/all-cars/cars.tsx`

**Xususiyatlar**:

- Tab navigatsiya: "Для Выкупа", "Закуп", "Продажа"
- Avtomobil kartasi:

- Rasm (28x28)
- Status badge (Актив)
- Marka va model
- Tur (Продажа)



- Pagination (10/20/50 ta element)
- "Добавить новую машину" tugmasi


### 4. Mijozlar (`/customers`)

**Fayl**: `components/customers/index.tsx`

**Xususiyatlar**:

- Qidiruv maydoni
- "Фильтр" va "Добавить клиента" tugmalari
- Mijoz kartasi:

- Avatar
- Ism
- Telefon raqam
- Telegram nick
- Manzil
- Email
- Tahrirlash va o'chirish tugmalari



- Pagination


### 5. Mijoz Qo'shish (`/customers/add`)

**Fayl**: `app/(admin)/customers/add/add-customer-form.tsx`

**Xususiyatlar**:

- Ism kiritish
- Telefon raqam
- Email
- Telegram nick
- Manzil (textarea)
- 3 ta rasm yuklash:

- Паспорт данные
- Водительские права
- Документ договора



- Har biri uchun drag & drop interfeysi


### 6. Qarzlar (`/debt`)

**Fayl**: `app/(admin)/debt/debt-client.tsx`

**Xususiyatlar**:

- Mijoz ma'lumotlari kartasi:

- Avatar va ism
- Kechikish kunlari
- Qarz summasi
- Avtomobil ma'lumotlari



- To'lov grafigi:

- Har bir to'lov uchun summa
- "не оплачено" holati





### 7. Baholash Natijalari (`/evaluation-results`)

**Fayl**: `app/(admin)/evaluation-results/evaluation-results-client.tsx`

**Xususiyatlar**:

- Lacetti uchun baholash
- 30 kunlik sotish narxi: $1,800,000
- Narx diapazoni ko'rsatkichi:

- Заниженные цены (qizil)
- Рыночные цены (ko'k)
- Завышенные цены (kulrang)



- Har bir kategoriya uchun batafsil ma'lumot


### 8. Moliya (`/finance`)

**Fayl**: `app/(admin)/finance/finance-client.tsx`

**Xususiyatlar**:

- 3 ta bo'lim: Финанс, Перезадать, Продан
- Har birida avtomobil ma'lumotlari:

- Комплектация
- Номер ГОСТ
- Narxlar
- Mijoz ma'lumotlari
- To'lov grafigi



- "Удалить" va "Сохранить" tugmalari


### 9. Jarimalar (`/fine`)

**Fayl**: `app/(admin)/fine/fine-client.tsx`

**Xususiyatlar**:

- Qidiruv formi:

- Марка (select)
- Модель (select)
- ГОСТ номер (select)



- Qidiruv natijalari:

- Mijoz ma'lumotlari
- Avtomobil ma'lumotlari
- Telefon va Telegram
- "Проверить" tugmasi



- "Очистить" va "Найти" tugmalari


### 10. Jarima Tafsilotlari (`/fine/[id]`)

**Fayl**: `app/(admin)/fine/[id]/page.tsx`

**Xususiyatlar**:

- Jarima summasi (1,920,000 UZS)
- Jarima sanasi
- Havola URL
- Umumiy summa
- "Оплатить штрафы" va "Скачать справку" tugmalari


### 11. Geolokatsiya (`/geolocation`)

**Fayl**: `app/(admin)/geolocation/geolocation-client.tsx`

**Xususiyatlar**:

- Google Maps iframe
- Qidiruv maydoni (raqam bo'yicha)
- Avtomobil kartasi:

- Toyota Avanza rasmi
- Raqam va holat
- Mijoz ma'lumotlari
- Telefon va ijara muddati



- Pagination (1,2,3,4)


### 12. Bozor Narxlari (`/market-pricing`)

**Fayl**: `app/(admin)/market-pricing/market-pricing-client.tsx`

**Xususiyatlar**:

- "Заниженные цены" sarlavhasi
- 20 ta havola ro'yxati (OLX.uz)


### 13. Qimmat Narxlar (`/overpricing`)

**Fayl**: `app/(admin)/overpricing/overpricing-client.tsx`

**Xususiyatlar**:

- "Заниженные цены" sarlavhasi
- 20 ta havola ro'yxati (OLX.uz)


### 14. Arzon Narxlar (`/underpricing`)

**Fayl**: `app/(admin)/underpricing/underpricing-client.tsx`

**Xususiyatlar**:

- "Заниженные цены" sarlavhasi
- 20 ta havola ro'yxati (OLX.uz)


### 15. Tranzaksiyalar (`/transaction`)

**Fayl**: `app/(admin)/transaction/transaction-client.tsx`

**Xususiyatlar**:

- Qidiruv maydoni
- Tranzaksiya ro'yxati:

- ID
- Mijoz ismi
- Avtomobil raqami
- To'lov usuli



- Pagination
- Tranzaksiya modal (Drawer)


### 16. Foydalanuvchilar (`/users-list`)

**Fayl**: `app/(admin)/users-list/users-list-client.tsx`

**Xususiyatlar**:

- "Список пользователей" sarlavhasi
- ActionCard komponenti


## Mijoz Paneli Sahifalari

### 1. Mijoz Dashboard (`/customer`)

**Fayl**: `app/customer/page.tsx`

**Xususiyatlar**:

- Header (logo va menyu)
- "Hush kelibsiz" xabar
- Dok va Штраф tugmalari
- 4 ta harakat kartasi (Просрочка, возврат, Закрите)
- Tesla avtomobil rasmi
- Оплата tugmasi
- Ближайшие оплаты jadvali
- Мои Штрафы jadvali


### 2. Mijoz To'lovlari (`/customer/payment`)

**Fayl**: `app/customer/(user)/payment/page.tsx`

**Xususiyatlar**:

- Mijoz ma'lumotlari kartasi
- 3 ta harakat tugmasi (Оплатить, Инфо, График)
- To'lov tarixi ro'yxati
- Pagination


### 3. To'lov Bosqichlari

#### Bosqich 1 (`/customer/payment-1`)

**Fayl**: `app/customer/(user)/payment-1/page.tsx`

**Xususiyatlar**:

- Qarz ma'lumotlari
- Progress indicator (10%)
- "Оплатить" tugmasi


#### Bosqich 2 (`/customer/payment-2`)

**Fayl**: `app/customer/(user)/payment-2/page.tsx`

**Xususiyatlar**:

- "Оплата картой" tugmasi
- "Оплата в офисе" tugmasi


#### Bosqich 3 (`/customer/payment-3`)

**Fayl**: `app/customer/(user)/payment-3/page.tsx`

**Xususiyatlar**:

- "Полностью оплатить" tugmasi
- "По графику оплатить" tugmasi


#### Bosqich 4 (`/customer/payment-4`)

**Fayl**: `app/customer/(user)/payment-4/page.tsx`

**Xususiyatlar**:

- ID оплаты maydoni
- Сумма оплаты maydoni
- To'lov usuli tanlash (4 ta karta: HUMO, UzCard, VISA, Mastercard)
- Komissiya hisobi
- "Оплатить" tugmasi


#### Bosqich 5 (`/customer/payment-5`)

**Fayl**: `app/customer/(user)/payment-5/page.tsx`

**Xususiyatlar**:

- Karta raqami kiritish
- To'lov summasi
- F.I.O kiritish
- 20 daqiqalik countdown timer
- "Подтвердите оплату" tugmasi


#### Bosqich 6 (`/customer/payment-6`)

**Fayl**: `app/customer/(user)/payment-6/page.tsx`

**Xususiyatlar**:

- Tranzaksiya tafsilotlari
- To'lov summasi ($100)
- Fayl yuklash maydoni
- Tranzaksiya tavsifi
- "Оплатить" tugmasi


### 4. Yopilgan To'lovlar (`/customer/close`)

**Fayl**: `app/customer/(user)/close/page.tsx`

**Xususiyatlar**:

- Qidiruv maydoni
- Mijoz profil kartasi ("Успешна" badge)
- To'lov grafigi (40 ta to'lov)
- Pagination


### 5. Mijoz Qarzlari (`/customer/debt`)

**Fayl**: `app/customer/(user)/debt/page.tsx`

**Xususiyatlar**:

- Admin debt komponenti bilan bir xil


### 6. Mijoz Jarimlari (`/customer/fine`)

**Fayl**: `app/customer/(user)/fine/fine-client.tsx`

**Xususiyatlar**:

- Admin fine komponenti bilan bir xil


### 7. Mijoz Tranzaksiyalari (`/customer/transaction`)

**Fayl**: `app/customer/(user)/transaction/transaction-client.tsx`

**Xususiyatlar**:

- Qidiruv maydoni
- Tranzaksiya ro'yxati
- Tranzaksiya drawer (3 ta holat: details, confirmed, waiting)


## Asosiy Komponentlar

### Layout Komponentlari

#### 1. Container (`components/layout/container.tsx`)

```typescript
interface Props {
  children: React.ReactNode;
  padding?: boolean;
  bg?: string;
  minHeight?: boolean;
  className?: string;
}
```

- Responsive konteyner (max-w-md)
- Padding va background boshqaruvi
- Min-height sozlamalari


#### 2. Navbar (`components/layout/navbar.tsx`)

- Primary-500 background
- Logo (logo-white.png)
- Menyu tugmasi (AlignLeft icon)
- Sticky positioning


#### 3. AppBar (`components/layout/app-bar.tsx`)

- Qora background
- 4 ta navigatsiya tugmasi:

- Главный (Home icon)
- Помощь (TrendingUp icon)
- Оплаты (CreditCard icon)
- Штрафы (CircleX icon)



- Sticky bottom positioning


### UI Komponentlari

#### 1. Button (`components/ui/button.tsx`)

**Variantlar**:

- default, destructive, outline, secondary, ghost, link


**O'lchamlar**:

- default (h-9), sm (h-8), lg (h-10), icon (size-9)


**Xususiyatlar**:

- Focus-visible ring
- Disabled holati
- Icon qo'llab-quvvatlash


#### 2. Custom Button (`components/button.tsx`)

**Qo'shimcha xususiyatlar**:

- leftIcon va rightIcon props
- Rounded-full default
- iconPrimary variant


#### 3. Input (`components/ui/input.tsx`)

**Xususiyatlar**:

- Focus-visible ring
- Aria-invalid qo'llab-quvvatlash
- File input qo'llab-quvvatlash
- Placeholder styling


#### 4. Card (`components/ui/card.tsx`)

**Qismlar**:

- CardHeader, CardTitle, CardDescription
- CardContent, CardFooter, CardAction
- Grid layout qo'llab-quvvatlash


#### 5. Table (`components/ui/table.tsx`)

**Qismlar**:

- TableHeader, TableBody, TableFooter
- TableRow, TableHead, TableCell
- Responsive overflow


#### 6. Badge (`components/ui/badge.tsx`)

**Variantlar**:

- default, secondary, destructive, outline, success


#### 7. Avatar (`components/ui/avatar.tsx`)

- AvatarImage, AvatarFallback
- Radix UI asosida


#### 8. Select (`components/ui/select.tsx`)

- SelectTrigger, SelectContent, SelectItem
- Keyboard navigation
- Size variants (sm, default)


#### 9. Calendar (`components/ui/calendar.tsx`)

- React Day Picker asosida
- Custom styling
- Range selection qo'llab-quvvatlash


#### 10. Drawer (`components/ui/drawer.tsx`)

- Vaul library asosida
- 4 ta yo'nalish qo'llab-quvvatlash
- Overlay va content


### Maxsus Komponentlar

#### 1. Icon (`components/icon.tsx`)

```typescript
interface IconProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
}
```

- SVG fayllarni dinamik yuklash
- `/icons/` papkasidan
- O'lcham va rang sozlamalari


#### 2. Pagination (`components/pagination.tsx`)

```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}
```

- Sahifa navigatsiyasi
- Items per page selector (10/20/50)
- Responsive design


#### 3. TabNavigation (`components/tab-navigation.tsx`)

```typescript
interface TabNavigationProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}
```

- Rounded-full container
- Active tab styling
- Smooth transitions


#### 4. PaymentMethodCard (`components/payment-method-card.tsx`)

```typescript
interface PaymentMethodCardProps {
  id: string;
  name: string;
  logo: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}
```

- To'lov usuli kartasi
- Icon komponenti bilan
- Selected holat ko'rsatkichi


#### 5. CountdownTimer (`components/countdown-timer.tsx`)

```typescript
interface CountdownTimerProps {
  initialMinutes: number;
  onTimeUp?: () => void;
}
```

- Daqiqa:soniya formatida
- Real-time yangilanish
- Callback onTimeUp


#### 6. ProgressIndicator (`components/progress-indicator.tsx`)

```typescript
interface ProgressIndicatorProps {
  percentage: number;
  className?: string;
}
```

- Foiz ko'rsatkichi
- Green background
- Dynamic width


#### 7. FileUploadArea (`components/file-upload-area.tsx`)

```typescript
interface FileUploadAreaProps {
  onFileSelect: (file: File) => void;
  className?: string;
}
```

- Drag & drop qo'llab-quvvatlash
- File input hidden
- Upload icon


#### 8. ActionCard (`components/action-card.tsx`)

- Mijoz ma'lumotlari
- Edit tugmasi
- Light-50 background


### Dashboard Komponentlari

#### 1. HeaderDashboard (`components/dashboard/header.tsx`)

- Logo (157.17x21.29)
- "Add App" tugmasi
- Plus icon


#### 2. DashboardPage (`components/dashboard/page.tsx`)

**Qismlar**:

- Header
- "Hushkelbiz, BOSS👋🏻" sarlavha
- Select dropdown
- 4 ta statistika kartasi
- 3 ta harakat kartasi
- Avtomobil baholash
- 5 ta statistika bloki
- Ближайшие оплаты jadvali
- Свободное Авто bo'limi


### Avtomobil Komponentlari

#### 1. CarForm (`app/(admin)/add-cars/car-form.tsx`)

**State boshqaruvi**:

```typescript
const [activeTab, setActiveTab] = useState("purchase");
const [dateStart, setDateStart] = useState<Date | undefined>();
const [dateEnd, setDateEnd] = useState<Date | undefined>();
const [carData, setCarData] = useState({...});
```

**Xususiyatlar**:

- 3 ta tab rejimi
- Conditional rendering
- File upload boshqaruvi
- Calendar integration
- Form validation


#### 2. AllCarsClientPage (`components/all-cars/index.tsx`)

- "Добавить новую машину" tugmasi
- CarMarketplace komponenti


#### 3. CarMarketplace (`components/all-cars/cars.tsx`)

**State**:

```typescript
const [activeTab, setActiveTab] = useState("Закуп");
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10);
```

**Mock data**: 50 ta avtomobil

### Mijoz Komponentlari

#### 1. CustomerClient (`components/customers/index.tsx`)

**State**:

```typescript
const [searchTerm, setSearchTerm] = useState("");
const [itemsPerPage, setItemsPerPage] = useState("10");
const [currentPage, setCurrentPage] = useState(1);
```

**Mock data**: 4 ta mijoz

#### 2. AddClientForm (`app/(admin)/customers/add/add-customer-form.tsx`)

**State**:

```typescript
interface ClientData {
  name: string;
  phone: string;
  email: string;
  telegram: string;
  address: string;
  passportImage: string | null;
  licenseImage: string | null;
  contractImage: string | null;
}
```

### Tranzaksiya Komponentlari

#### 1. TransactionClient (`app/(admin)/transaction/transaction-client.tsx`)

- Qidiruv funksiyasi
- Pagination
- Mock data (4 ta tranzaksiya)


#### 2. TransactionDrawer (`app/(admin)/transaction/transaction-drawer.tsx`)

**3 ta holat**:

- details: Asosiy ma'lumotlar
- confirmed: Muvaffaqiyat sahifasi
- waiting: Kutish holati


**Props**:

```typescript
interface TransactionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  transactionData: TransactionData;
}
```

## Styling Tizimi

### Tailwind Konfiguratsiyasi

**Custom ranglar**:

```css
--color-primary-50: #f3f8f7;
--color-primary-100: #e0edeb;
--color-primary-500: #3563e9;
--color-light-50: #f5f5f6;
--color-information-500: #3b82f6;
--color-error-500: #ef4444;
--color-success-500: #22c55e;
--color-secondary-500: #10b981;
```

### Custom CSS

**Gradient klasslar**:

```css
.linerd {
  background: radial-gradient(
    63.25% 56.19% at 69.59% 68.04%,
    #224462 17.49%,
    #2cb391 100%
  );
}
```

### Font

- **Asosiy font**: Lexend
- **Variable**: --font-lexend-sans


## Utility Funksiyalar

### 1. cn (`lib/utils.ts`)

```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- Class name birlashtirish
- Tailwind merge


### 2. API (`lib/api.ts`)

```typescript
export const getUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/user`);
    const data = await response.json();
    return data;
  } catch {
    return null;
  }
};
```

### 3. Types (`types/global.d.ts`)

```typescript
export interface User {
  name: string;
}
```

## Rasmlar va Assetlar

### Logotiplar

- `/images/logo.png` - Asosiy logo
- `/images/logo-white.png` - Oq logo


### Avtomobil rasmlari

- `/images/lamborghini.png`
- `/images/car-tesla.png`
- `/images/car-toyota.png`


### To'lov tizimlari

- `/images/humo.png`
- `/images/uzcard.png`
- `/images/visa.png`
- `/images/mastercard.png`


### Boshqa rasmlar

- `/images/chris-evan.png`
- `/images/before.png`


### Icons papkasi

- `/icons/` - SVG iconlar
- Dinamik yuklash orqali


## Xususiyatlar

### 1. Responsive Dizayn

- Mobile-first yondashuv
- max-w-md konteyner
- Tailwind breakpoints


### 2. State Boshqaruvi

- React useState hooks
- Local state management
- Form state handling


### 3. Navigatsiya

- Next.js App Router
- Route groups: (admin), (user)
- Dynamic routes: [id]
- Nested layouts


### 4. Form Handling

- Controlled components
- File upload
- Validation
- Multi-step forms


### 5. UI/UX

- Smooth transitions
- Loading states
- Error handling
- Responsive design


### 6. Performance

- Next.js optimizations
- Image optimization
- Component lazy loading


Bu dokumentatsiya kodda mavjud bo'lgan barcha komponentlar, sahifalar va funksiyalarni to'liq qamrab oladi. Har bir komponent uchun props interfeyslari, state boshqaruvi va asosiy xususiyatlar ko'rsatilgan.