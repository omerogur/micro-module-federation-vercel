# Module Federation - Detaylı Kod Açıklamaları

Bu dokümanda projede kullanılan tüm kod örneklerini satır satır açıklayacağım.

## İçindekiler
1. [Root App - Ana Uygulama](#root-app---ana-uygulama)
2. [Content App - İçerik Uygulaması](#content-app---içerik-uygulaması)
3. [Navigation App - Navigasyon Uygulaması](#navigation-app---navigasyon-uygulaması)
4. [Module Federation Konfigürasyonları](#module-federation-konfigürasyonları)
5. [TypeScript Tanımlamaları](#typescript-tanımlamaları)

---

## Root App - Ana Uygulama

### 1. Ana Sayfa Kodu (`apps/root/pages/index.tsx`)

```tsx
// App import is a workaround to load the app global styles
// which are only allowed to be imported in the remote _app
import NavigationApp from 'navigation/app';
import Header from 'navigation/header';
import Footer from 'navigation/footer';
import Page from 'content/page';
import ContentApp from 'content/app';

export default function Home() {
  return (
    <>
      <NavigationApp Component={Header} />
      <ContentApp Component={Page} />
      <NavigationApp Component={Footer} />
    </>
  );
}

export const getServerSideProps = () => {
  return {
    props: {},
  };
};
```

#### Satır Satır Açıklama:

**Satır 1-2: Yorum**
```tsx
// App import is a workaround to load the app global styles
// which are only allowed to be imported in the remote _app
```
- Bu yorumlar önemli bir teknik detay veriyor
- Next.js'te global CSS stilleri sadece `_app.tsx` dosyasında import edilebilir
- Bu yüzden her microfrontend'in kendi `_app.tsx`'ini kullanıyoruz

**Satır 3-7: Import'lar**
```tsx
import NavigationApp from 'navigation/app';
import Header from 'navigation/header';
import Footer from 'navigation/footer';
import Page from 'content/page';
import ContentApp from 'content/app';
```

Bu import'ları tek tek açıklayalım:

1. `import NavigationApp from 'navigation/app'`:
   - `navigation` = Navigation microfrontend'inden geliyor
   - `/app` = `_app.tsx` dosyasını import ediyor
   - Neden? Navigation'ın global stillerini yüklemek için

2. `import Header from 'navigation/header'`:
   - Navigation uygulamasından Header bileşenini alıyor
   - Runtime'da `http://localhost:3026/_next/static/chunks/remoteEntry.js` dosyasından yüklenir

3. `import Footer from 'navigation/footer'`:
   - Navigation uygulamasından Footer bileşenini alıyor
   - Aynı şekilde runtime'da dinamik olarak yüklenir

4. `import Page from 'content/page'`:
   - Content uygulamasından ana sayfa içeriğini alıyor
   - `http://localhost:3025/_next/static/chunks/remoteEntry.js` dosyasından gelir

5. `import ContentApp from 'content/app'`:
   - Content uygulamasının `_app.tsx` dosyası
   - Content'in global stillerini yükler

**Satır 9-17: Home Component**
```tsx
export default function Home() {
  return (
    <>
      <NavigationApp Component={Header} />
      <ContentApp Component={Page} />
      <NavigationApp Component={Footer} />
    </>
  );
}
```

Açıklama:
- `<>` ve `</>`: React Fragment - Ekstra DOM elemanı oluşturmadan birden fazla element döndürür
- `<NavigationApp Component={Header} />`:
  - NavigationApp wrapper'ına Header bileşenini prop olarak geçiyor
  - Bu sayede Header, Navigation'ın stillerini kullanabilir
- `<ContentApp Component={Page} />`:
  - ContentApp wrapper'ına Page bileşenini geçiyor
  - Content uygulamasının stillerini Page'e uygular
- `<NavigationApp Component={Footer} />`:
  - Footer'ı da Navigation stillerini kullanacak şekilde render eder

**Satır 19-23: Server Side Props**
```tsx
export const getServerSideProps = () => {
  return {
    props: {},
  };
};
```
- Next.js'in Server Side Rendering (SSR) özelliği
- Bu fonksiyon sunucuda çalışır
- Boş props döndürüyor ama SSR'ı aktifleştiriyor
- Module Federation'ın SSR'da çalışması için gerekli

---

## Content App - İçerik Uygulaması

### 2. Content Page Kodu (`apps/content/pages/_content/index.tsx`)

Bu dosya çok uzun (898 satır) olduğu için önemli bölümlerini açıklayacağım:

#### Başlangıç ve Component Tanımı
```tsx
/* eslint-disable @next/next/no-img-element */

export default function Page(): React.JSX.Element {
  return (
    <>
      {/* Main Content */}
      <main className="flex-1">
```

**Açıklama:**
- `/* eslint-disable */`: Next.js'in img elementi yerine Image component kullan uyarısını kapatıyor
- `Page(): React.JSX.Element`: TypeScript ile dönüş tipini belirtiyor
- `<main className="flex-1">`: Flexbox ile tam yükseklik almasını sağlıyor

#### Hero Section (Satır 8-64)
```tsx
{/* Hero Section */}
<section className="py-20 md:py-28">
  <div className="container px-4 md:px-6">
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
      <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Your Product, Your Vision, Our Platform
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Empower your business with our cutting-edge solution.
            Streamline workflows, boost productivity, and achieve your
            goals.
          </p>
        </div>
```

**Önemli CSS Sınıfları:**
- `py-20 md:py-28`: Mobilde 20, medium ekranlarda 28 birim padding
- `container`: Merkezi hizalama ve maksimum genişlik
- `grid lg:grid-cols-2`: Large ekranlarda 2 sütunlu grid
- `text-3xl sm:text-4xl md:text-5xl lg:text-6xl`: Responsive font boyutları

#### Button Örneği (Satır 24-44)
```tsx
<button
  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 gap-1"
  type="button"
>
  Get Started
  <svg
    className="h-4 w-4"
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
</button>
```

**Açıklama:**
- `inline-flex`: Buton içindeki text ve icon'u yan yana dizer
- `bg-primary`: Tema rengini kullanır
- `hover:bg-primary/90`: Hover'da %90 opaklık
- `transition-colors`: Renk geçişlerini yumuşatır
- SVG: Ok işareti çiziyor

#### Features Section'dan Bir Örnek (Satır 79-102)
```tsx
<div className="flex flex-col items-start gap-2 rounded-lg border bg-background p-6 shadow-sm">
  <div className="rounded-full bg-primary/10 p-2 text-primary">
    <svg
      className="h-5 w-5"
      // SVG attributes...
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  </div>
  <h3 className="text-xl font-bold">Intuitive Interface</h3>
  <p className="text-muted-foreground">
    Our user-friendly interface makes navigation and operation a
    breeze for all users.
  </p>
</div>
```

**Özellik Kartı Yapısı:**
- `rounded-lg border`: Yuvarlak köşeli kenarlık
- `bg-background`: Tema arka plan rengi
- `shadow-sm`: Hafif gölge efekti
- `bg-primary/10`: %10 opaklıkta tema rengi (icon arka planı)
- SVG: Onay işareti çiziyor

---

## Navigation App - Navigasyon Uygulaması

### 3. Header Component (`apps/navigation/pages/_navigation/header/index.tsx`)

```tsx
/* eslint-disable @next/next/no-img-element */

import { MobileMenuButton } from '@/components/mobile-menu-button';

export default function Header(): React.JSX.Element {
  return (
    <header className="remote:sticky remote:top-0 remote:z-50 remote:w-full remote:border-b remote:border-b-muted remote:bg-background/95 backdrop-blur remote:supports-[backdrop-filter]:bg-background/60">
      <div className="remote:container remote:flex remote:h-16 remote:items-center remote:justify-between">
        <a className="remote:flex remote:items-center remote:gap-2" href="/">
          <img
            alt="Logo"
            className="remote:rounded"
            height="32"
            src="/abstract-geometric-logo.png"
            width="32"
          />
          <span className="remote:text-xl remote:font-bold">Company</span>
        </a>
        <nav className="remote:hidden remote:sm:flex remote:gap-6 ">
          <a
            className="remote:text-sm remote:font-medium remote:hover:text-primary"
            href="#features"
          >
            Features
          </a>
          // Diğer linkler...
        </nav>
        <MobileMenuButton />
      </div>
    </header>
  );
}
```

#### Önemli Detaylar:

**`remote:` Prefix'i Nedir?**
```css
className="remote:sticky remote:top-0 remote:z-50"
```
- `remote:` prefix'i çok önemli!
- Bu prefix Module Federation'da stil çakışmalarını önler
- Her microfrontend kendi stil scope'una sahip olur
- Örnek: `remote:sticky` sadece bu remote component'te sticky olur

**Header Stilleri Açıklaması:**
- `remote:sticky`: Scroll'da header'ı üstte sabitler
- `remote:top-0`: Üstten 0 mesafe
- `remote:z-50`: Z-index ile diğer elementlerin üstünde
- `remote:bg-background/95`: %95 opaklıkta arka plan
- `backdrop-blur`: Arka planı bulanıklaştırır (modern görünüm)
- `remote:supports-[backdrop-filter]:bg-background/60`: Eğer tarayıcı destekliyorsa %60 opaklık

**Responsive Navigation:**
```tsx
<nav className="remote:hidden remote:sm:flex remote:gap-6">
```
- `remote:hidden`: Mobilde gizle
- `remote:sm:flex`: Small (640px+) ekranlarda göster
- `remote:gap-6`: Linkler arası boşluk

### 4. Footer Component (`apps/navigation/pages/_navigation/footer/index.tsx`)

Footer component'in önemli kısımları:

```tsx
export default function Footer(): React.JSX.Element {
  return (
    <footer className="remote:border-t remote:border-muted remote:bg-background">
      <div className="remote:container remote:px-4 remote:py-12 remote:md:px-6 remote:md:py-16">
        <div className="remote:grid remote:gap-8 remote:sm:grid-cols-2 remote:md:grid-cols-4 remote:lg:grid-cols-5">
```

**Grid Yapısı:**
- Mobilde: 1 sütun
- Small: 2 sütun
- Medium: 4 sütun
- Large: 5 sütun

**Sosyal Medya İkonları Map Örneği:**
```tsx
{[
  {
    name: 'Twitter',
    icon: (
      <svg className="remote:size-5" /* ... */>
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  // Diğer sosyal medya ikonları...
].map((social) => (
  <a
    className="remote:rounded-full remote:bg-muted remote:p-2 remote:text-muted-foreground remote:hover:bg-muted/80 remote:hover:text-foreground"
    href="/"
    key={social.name}
  >
    <span className="remote:sr-only">{social.name}</span>
    {social.icon}
  </a>
))}
```

**Önemli Noktalar:**
- Array.map() ile tekrarlayan elementleri oluşturma
- `remote:sr-only`: Screen reader only (erişilebilirlik)
- Her sosyal medya ikonu SVG path ile çiziliyor

---

## Module Federation Konfigürasyonları

### 5. Root App Konfigürasyonu (`apps/root/next.config.js`)

```javascript
import { withMicrofrontends } from '@vercel/microfrontends/next/config';
import { MicrofrontendsServer } from '@vercel/microfrontends/microfrontends/server';
import { withRelatedProject } from '@vercel/related-projects';
import { withVercelToolbar } from '@vercel/toolbar/plugins/next';
import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config, options) {
    const { isServer } = options;
    const microfrontends = MicrofrontendsServer.infer();
    const apps = microfrontends.config.getAllApplications();

    const remotes = apps.reduce((remotes, app) => {
      const { name, packageName, development } = app;

      // remove the prefix from the project name to have a cleaner remote name
      const remoteName = (packageName ?? name).replace(
        'microfrontends-nextjs-pages-federation-',
        '',
      );
      const url = withRelatedProject({
        projectName: name,
        defaultHost: development.local.toString(),
      });

      if (remoteName === 'root') {
        return remotes;
      }

      remotes[remoteName] =
        `_mf_${remoteName}@${url}/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`;
      return remotes;
    }, {});

    config.plugins.push(
      new NextFederationPlugin({
        name: 'root',
        filename: 'static/chunks/remoteEntry.js',
        remotes,
      }),
    );
    return config;
  },
};

export default withVercelToolbar()(
  withMicrofrontends(nextConfig, { supportPagesRouter: true }),
);
```

#### Detaylı Açıklama:

**Webpack Konfigürasyonu (Satır 14-48):**
```javascript
webpack(config, options) {
  const { isServer } = options;
  // ...
}
```
- `isServer`: Build'in server tarafı mı client tarafı mı olduğunu belirtir
- Server ve client için farklı remoteEntry.js dosyaları oluşturulur

**Microfrontend'leri Bulma (Satır 16-17):**
```javascript
const microfrontends = MicrofrontendsServer.infer();
const apps = microfrontends.config.getAllApplications();
```
- `microfrontends.json` dosyasından tüm uygulamaları okur
- Her uygulama için remote URL'ler oluşturur

**Remote URL Oluşturma (Satır 19-39):**
```javascript
const remotes = apps.reduce((remotes, app) => {
  // ...
  remotes[remoteName] =
    `_mf_${remoteName}@${url}/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`;
  return remotes;
}, {});
```

Örnek çıktı:
```javascript
{
  content: '_mf_content@http://localhost:3025/_next/static/chunks/remoteEntry.js',
  navigation: '_mf_navigation@http://localhost:3026/_next/static/chunks/remoteEntry.js'
}
```

**Module Federation Plugin (Satır 41-47):**
```javascript
new NextFederationPlugin({
  name: 'root',                          // Bu uygulamanın adı
  filename: 'static/chunks/remoteEntry.js', // Oluşturulacak dosya
  remotes,                               // Yukarıda oluşturulan remote'lar
})
```

### 6. Content App Konfigürasyonu (`apps/content/next.config.js`)

```javascript
import { NextFederationPlugin } from '@module-federation/nextjs-mf';
import { withMicrofrontends } from '@vercel/microfrontends/next/config';
import { withVercelToolbar } from '@vercel/toolbar/plugins/next';

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: '_mf_content',
        filename: `static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        exposes: {
          './page': './pages/_content/index.tsx',
          './app': './pages/_app.tsx',
        },
      }),
    );

    return config;
  },
};
```

**Exposes Açıklaması:**
```javascript
exposes: {
  './page': './pages/_content/index.tsx',  // İçerik sayfası
  './app': './pages/_app.tsx',            // Global stiller için
}
```

- `'./page'`: Diğer uygulamalar `import Page from 'content/page'` şeklinde kullanır
- `'./app'`: Diğer uygulamalar `import ContentApp from 'content/app'` şeklinde kullanır

### 7. Navigation App Konfigürasyonu (`apps/navigation/next.config.js`)

```javascript
exposes: {
  './header': './pages/_navigation/header/index.tsx',
  './footer': './pages/_navigation/footer/index.tsx',
  './app': './pages/_app.tsx',
}
```

Navigation üç şey paylaşıyor:
1. Header bileşeni
2. Footer bileşeni
3. App wrapper'ı (stiller için)

---

## TypeScript Tanımlamaları

### 8. Global Type Definitions (`apps/root/global.d.ts`)

```typescript
declare module 'navigation/header' {
  const Header: React.ComponentType;
  export default Header;
}

declare module 'navigation/footer' {
  const Footer: React.ComponentType;
  export default Footer;
}

declare module 'content/page' {
  const Page: React.ComponentType;
  export default Page;
}

declare module 'navigation/app' {
  const App: React.ComponentType<{ Component: React.ComponentType }>;
  export default App;
}

declare module 'content/app' {
  const App: React.ComponentType<{ Component: React.ComponentType }>;
  export default App;
}
```

**Açıklama:**
- TypeScript varsayılan olarak `navigation/header` gibi modülleri tanımaz
- Bu tanımlamalar TypeScript'e "bu modüller var ve şu tiplerde" diyor
- `React.ComponentType`: Hem class hem function component olabilir
- App components'ler `Component` prop'u alıyor

---

## Önemli Konseptler Özeti

### 1. Runtime vs Build Time
- **Build Time**: Kod derleme zamanı (npm run build)
- **Runtime**: Kod çalışma zamanı (kullanıcı siteyi açtığında)
- Module Federation runtime'da çalışır!

### 2. Remote Entry Dosyaları
- Her microfrontend bir `remoteEntry.js` dosyası oluşturur
- Bu dosya o uygulamanın paylaştığı tüm modülleri içerir
- Diğer uygulamalar bu dosyayı runtime'da yükler

### 3. SSR vs CSR
- **SSR (Server Side Rendering)**: Sunucuda HTML oluşturulur
- **CSR (Client Side Rendering)**: Tarayıcıda HTML oluşturulur
- Module Federation her ikisini de destekler

### 4. Stil İzolasyonu
- `remote:` prefix'i stil çakışmalarını önler
- Her microfrontend kendi stil scope'una sahiptir
- Global stiller `_app.tsx` üzerinden yönetilir

Bu detaylı açıklamalar Module Federation'ın nasıl çalıştığını ve kodların ne yaptığını anlamanıza yardımcı olacaktır!