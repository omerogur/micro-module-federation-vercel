# Microfrontend Module Federation Projesi - Detaylı Türkçe Açıklama

## İçindekiler
1. [Giriş - Bu Proje Nedir?](#giriş---bu-proje-nedir)
2. [Microfrontend Nedir?](#microfrontend-nedir)
3. [Module Federation Nedir?](#module-federation-nedir)
4. [Projedeki Uygulamalar](#projedeki-uygulamalar)
5. [Nasıl Çalışır?](#nasıl-çalışır)
6. [Proje Yapısı](#proje-yapısı)
7. [Kurulum ve Çalıştırma](#kurulum-ve-çalıştırma)
8. [Kod Örnekleri](#kod-örnekleri)
9. [Gerçek Hayat Senaryoları](#gerçek-hayat-senaryoları)
10. [Sık Sorulan Sorular](#sık-sorulan-sorular)

## 🚀 Giriş - Bu Proje Nedir?

Bu proje, **birden fazla küçük uygulamanın bir araya gelerek büyük bir uygulama oluşturduğu** modern bir yazılım mimarisi örneğidir. 

**Basit bir benzetme:** Bir alışveriş merkezini düşünün. Her mağaza (microfrontend) bağımsız çalışır ama hepsi birlikte büyük bir alışveriş deneyimi (ana uygulama) oluşturur.

## 🤔 Microfrontend Nedir?

### Geleneksel Yaklaşım (Monolitik)
```
📦 Tek Büyük Uygulama
    ├── Tüm kodlar bir arada
    ├── Tek takım geliştirir
    ├── Hep birlikte deploy edilir
    └── Bir hata = Tüm sistem çöker
```

### Microfrontend Yaklaşımı
```
🏢 Ana Uygulama (Shell)
    ├── 📱 Header Uygulaması (Bağımsız)
    ├── 📝 İçerik Uygulaması (Bağımsız)
    ├── 🛒 Sepet Uygulaması (Bağımsız)
    └── 👤 Kullanıcı Uygulaması (Bağımsız)
```

**Avantajları:**
- ✅ **Bağımsız Geliştirme:** Her takım kendi hızında ilerler
- ✅ **Küçük Deploy'lar:** Sadece değişen kısım yayınlanır
- ✅ **Hata İzolasyonu:** Bir modüldeki hata diğerlerini etkilemez
- ✅ **Teknoloji Çeşitliliği:** Farklı modüller farklı teknolojiler kullanabilir

## 🔧 Module Federation Nedir?

Module Federation, **Webpack 5** ile gelen bir özelliktir. Farklı uygulamaların **çalışma zamanında (runtime)** kod paylaşmasını sağlar.

### Geleneksel Yöntem vs Module Federation

**Geleneksel Yöntem:**
```javascript
// Build zamanında import
import Header from './components/Header';
```

**Module Federation:**
```javascript
// Çalışma zamanında import (runtime)
// Header başka bir uygulamadan geliyor!
import Header from 'navigation/header';
```

## 🏗️ Projedeki Uygulamalar

Bu projede **3 ayrı Next.js uygulaması** var:

### 1. Root App (Ana Uygulama) 🏠
- **Port:** 3024
- **Görevi:** Diğer uygulamaları birleştiren ana konteyner
- **Benzetme:** Bir TV kumandası gibi - tüm kanalları (uygulamaları) yönetir

### 2. Content App (İçerik Uygulaması) 📝
- **Port:** 3025
- **Görevi:** Sayfa içeriklerini sağlar
- **Paylaştıkları:**
  - Sayfa bileşenleri
  - İçerik componentleri

### 3. Navigation App (Navigasyon Uygulaması) 🧭
- **Port:** 3026
- **Görevi:** Header ve footer sağlar
- **Paylaştıkları:**
  - Header bileşeni
  - Footer bileşeni

## 🎯 Nasıl Çalışır?

### Adım Adım Çalışma Mantığı:

1. **Kullanıcı siteye girer** (http://localhost:3024)

2. **Root App devreye girer:**
   ```
   "Hmm, bu sayfada nelere ihtiyacım var?"
   - Header lazım → Navigation app'ten al
   - İçerik lazım → Content app'ten al  
   - Footer lazım → Navigation app'ten al
   ```

3. **Runtime'da yükleme:**
   ```javascript
   // Root app bu istekleri yapar:
   GET http://localhost:3026/remoteEntry.js  // Navigation modülleri
   GET http://localhost:3025/remoteEntry.js  // Content modülleri
   ```

4. **Bileşenler birleşir:**
   ```
   [Header from Navigation App]
   [Content from Content App]
   [Footer from Navigation App]
   ```

5. **Kullanıcı tek sayfa görür!**

## 📁 Proje Yapısı

```
microfrontends-nextjs-pages-federation/
│
├── 📂 apps/                              # Tüm uygulamalar
│   │
│   ├── 📂 root/                         # 🏠 ANA UYGULAMA
│   │   ├── 📄 package.json              # Bağımlılıklar
│   │   ├── 📄 next.config.js            # Module Federation ayarları
│   │   ├── 📄 microfrontends.json       # Uygulama yönlendirmeleri
│   │   ├── 📄 global.d.ts               # TypeScript tanımlamaları
│   │   └── 📂 pages/
│   │       └── 📄 index.tsx             # Ana sayfa (diğerlerini birleştirir)
│   │
│   ├── 📂 content/                      # 📝 İÇERİK UYGULAMASI
│   │   ├── 📄 package.json
│   │   ├── 📄 next.config.js            # Neyi paylaşacağını belirler
│   │   └── 📂 pages/
│   │       └── 📂 _content/
│   │           └── 📄 index.tsx         # Paylaşılan içerik sayfası
│   │
│   └── 📂 navigation/                   # 🧭 NAVİGASYON UYGULAMASI
│       ├── 📄 package.json
│       ├── 📄 next.config.js            # Header/Footer'ı paylaşır
│       └── 📂 pages/
│           └── 📂 _navigation/
│               ├── 📂 header/
│               │   └── 📄 index.tsx     # Paylaşılan header
│               └── 📂 footer/
│                   └── 📄 index.tsx     # Paylaşılan footer
│
├── 📂 packages/                         # 🔧 ORTAK ARAÇLAR
│   ├── 📂 eslint-config-custom/        # Kod standartları
│   └── 📂 ts-config/                   # TypeScript ayarları
│
├── 📄 package.json                      # Ana proje dosyası
├── 📄 pnpm-workspace.yaml              # Monorepo yapılandırması
└── 📄 turbo.json                       # Build hızlandırıcı

```

## 🚀 Kurulum ve Çalıştırma

### Ön Gereksinimler
- **Node.js:** 20.x veya üzeri
- **pnpm:** 9.4.0 (önerilen paket yöneticisi)

### Adım 1: Projeyi İndirin
```bash
git clone https://github.com/vercel-labs/microfrontends-nextjs-pages-module-federation.git
cd microfrontends-nextjs-pages-module-federation
```

### Adım 2: Bağımlılıkları Yükleyin
```bash
pnpm install
```

### Adım 3: Geliştirme Ortamını Başlatın
```bash
pnpm dev
```

### Adım 4: Tarayıcınızda Açın
- Ana uygulama: http://localhost:3024
- Content (arka planda): http://localhost:3025
- Navigation (arka planda): http://localhost:3026

## 💻 Kod Örnekleri

### `microfrontends.json` - Yönlendirme Yapılandırması

Bu dosya microfrontend'lerin nasıl keşfedileceğini ve yönlendirileceğini tanımlar:

```json
{
  "applications": {
    "microfrontends-nextjs-pages-federation-root": {
      "development": {
        "fallback": "microfrontends-nextjs-pages-federation-root.vercel.app"
      }
    },
    "microfrontends-nextjs-pages-federation-content": {
      "routing": [{ "paths": ["/_content/:path*"] }]
    },
    "microfrontends-nextjs-pages-federation-navigation": {
      "routing": [{ "paths": ["/_navigation/:path*"] }]
    }
  }
}
```

**Açıklama:**
- `applications`: Tüm microfrontend uygulamalarının listesi
- `development.fallback`: Development ortamında kullanılacak yedek URL
- `routing.paths`: Her microfrontend'in hangi URL yollarını karşılayacağı
  - `/_content/:path*`: Content app tüm `/_content/` ile başlayan URL'leri karşılar
  - `/_navigation/:path*`: Navigation app tüm `/_navigation/` ile başlayan URL'leri karşılar

### Module Federation Yapılandırması

Her uygulamanın kendi Next.js yapılandırması Module Federation ile geliştirilmiştir:

#### Root Uygulaması (Container/Tüketici):

```javascript
// apps/root/next.config.js
import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const nextConfig = {
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'root',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          content: `_mf_content@http://localhost:3025/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
          navigation: `_mf_navigation@http://localhost:3026/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        },
      }),
    );
    return config;
  },
};
```

**Detaylı Açıklama:**
- `name: 'root'`: Bu uygulamanın Module Federation'daki adı
- `filename`: Bu uygulamanın kendi remoteEntry dosyasının yolu
- `remotes`: Bu uygulamanın kullanacağı diğer microfrontend'ler
  - `content`: Content uygulamasına erişim için takma ad
  - `_mf_content@http://...`: Content uygulamasının gerçek adresi
  - `${isServer ? 'ssr' : 'chunks'}`: Server tarafında SSR, client tarafında chunks klasörü kullanılır
  
#### Remote Uygulamaları (Content & Navigation):

```javascript
// apps/content/next.config.js
import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const nextConfig = {
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

**Detaylı Açıklama:**
- `name: '_mf_content'`: Bu remote'un benzersiz adı (prefix ile çakışmaları önler)
- `filename`: remoteEntry.js dosyasının oluşturulacağı yer
- `exposes`: Bu uygulamanın diğerlerine sunduğu modüller
  - `'./page'`: Diğer uygulamalar `import Page from 'content/page'` ile kullanabilir
  - `'./app'`: Diğer uygulamalar `import ContentApp from 'content/app'` ile kullanabilir

### Module Federation Nasıl Çalışır?

Module Federation'ın sihri Webpack 5 teknolojisi sayesinde gerçekleşir:

#### 1. Federated Component'lerin Paylaşılması (Expose)

Remote uygulamalar, bileşenlerini Module Federation aracılığıyla paylaşır:

```javascript
// Her remote neyi paylaşacağını tanımlar
exposes: {
  './page': './pages/_content/index.tsx',      // İçerik sayfası
  './header': './pages/_navigation/header/index.tsx', // Header bileşeni
  './footer': './pages/_navigation/footer/index.tsx', // Footer bileşeni
  './app': './pages/_app.tsx'                  // App wrapper'ı
}
```

#### 2. Dinamik Component Import

Root uygulaması bu bileşenleri çalışma zamanında (runtime) dinamik olarak import eder:

```tsx
// apps/root/pages/index.tsx
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
```

**Detaylı Açıklama:**
- `import NavigationApp from 'navigation/app'`: 
  - Bu import normal görünse de, aslında runtime'da başka bir uygulamadan yükleniyor
  - Webpack bu import'u gördüğünde, navigation remote'undan app modülünü yükler
  
- `<NavigationApp Component={Header} />`:
  - NavigationApp bir wrapper component
  - Header'ı prop olarak alıp, navigation uygulamasının stillerini ve context'ini sağlar
  - Bu sayede Header, sanki navigation uygulamasının içindeymiş gibi çalışır

#### 3. Runtime Kod Paylaşımı

Module Federation şunları sağlar:

- **Paylaşılan Bağımlılıklar**: React ve diğer kütüphaneler uygulamalar arasında paylaşılır
- **Dinamik Yükleme**: Bileşenler ihtiyaç duyulduğunda runtime'da yüklenir
- **Versiyon Yönetimi**: Farklı bağımlılık versiyonlarını otomatik olarak yönetir
- **Type Güvenliği**: TypeScript desteği ile federated modüller için tip tanımlamaları

#### 4. Production Deployment

Production'da her microfrontend bağımsız olarak deploy edilir ve Module Federation federated modülleri ilgili URL'lerden çözer.

### TypeScript Desteği - Federated Modüller İçin

Proje, federated modüller için kapsamlı TypeScript desteği içerir:

```typescript
// apps/root/global.d.ts
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

// App wrapper'lar için özel tip tanımlamaları
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
- `declare module`: TypeScript'e bu modüllerin var olduğunu söyler
- `React.ComponentType`: Hem class hem de function component'leri kabul eder
- App wrapper'lar `Component` prop'u alacak şekilde tanımlanmış

### Vercel Toolbar Entegrasyonu

Development build'leri gelişmiş debugging için Vercel Toolbar içerir:

- Federated modül sınırlarının görsel göstergeleri
- Federated component'ler için performans metrikleri
- Gerçek zamanlı modül yükleme analitiği

### Error Boundaries ve Fallback'ler

Federated component'ler için yerleşik hata yönetimi:

- Remote modüller yüklenemediğinde zarif bozulma (graceful degradation)
- Her microfrontend için izole hata raporlama
- Geliştirilmiş kullanıcı deneyimi için fallback component'leri

## 🌟 Gerçek Hayat Senaryoları

### Senaryo 1: E-Ticaret Sitesi

```
🛍️ Ana Site (Shell)
    ├── 🔍 Arama (Arama Takımı)
    ├── 📦 Ürün Listesi (Katalog Takımı)
    ├── 🛒 Sepet (Sepet Takımı)
    ├── 💳 Ödeme (Ödeme Takımı)
    └── 👤 Profil (Kullanıcı Takımı)
```

**Avantajları:**
- Sepet takımı Black Friday güncellemesi yaparken
- Katalog takımı yeni ürünler ekleyebilir
- Kimse kimseyi beklemez!

### Senaryo 2: Banka Uygulaması

```
🏦 Ana Uygulama
    ├── 💰 Hesaplar (Hesap Takımı)
    ├── 💸 Transfer (İşlem Takımı)
    ├── 📊 Yatırım (Yatırım Takımı)
    └── 🎯 Kampanyalar (Pazarlama Takımı)
```

**Fayda:** Her takım kendi güvenlik ve iş kurallarını uygular.

## ❓ Sık Sorulan Sorular

### S1: Neden tüm uygulamalar aynı portta çalışıyor?

**C:** `microfrontends` CLI aracı kurulu değilse, her uygulama varsayılan porta düşer. Çözüm:
```bash
pnpm install
pnpm dev
```

### S2: Module Federation ile iframe arasındaki fark nedir?

**Module Federation:**
- ✅ Tek DOM ağacı
- ✅ Paylaşılan state
- ✅ SEO dostu
- ✅ Hızlı

**iframe:**
- ❌ Ayrı DOM ağaçları
- ❌ İletişim zorluğu
- ❌ SEO sorunları
- ❌ Performans problemleri

### S3: Her microfrontend farklı React versiyonu kullanabilir mi?

**C:** Evet, ama önerilmez. En iyisi aynı major versiyonu kullanmak.

### S4: Production'da nasıl çalışır?

**C:** Her uygulama farklı domainlerde çalışabilir:
- Root: `www.site.com`
- Content: `content.site.com`
- Navigation: `nav.site.com`

Module Federation runtime'da bunları birleştirir.

### S5: Güvenlik nasıl sağlanır?

**C:** Her microfrontend:
- Kendi authentication'ını yapabilir
- Kendi API'larını kullanabilir
- Kendi güvenlik kurallarını uygulayabilir

## 📚 Özet

**Microfrontend + Module Federation:**
- 🎯 Büyük takımlar için ideal
- 🚀 Bağımsız deployment
- 🛡️ Hata izolasyonu
- 🔧 Esnek mimari
- 📈 Ölçeklenebilir

Bu yaklaşım özellikle:
- Büyük takımlarla çalışıyorsanız
- Farklı takımların farklı hızlarda ilerlemesi gerekiyorsa
- Uygulamanız sürekli büyüyorsa
- Farklı bölümlerin farklı teknolojiler kullanması gerekiyorsa

Çok faydalıdır!

---

**Not:** Bu döküman, projeyi ilk kez görenler için hazırlanmıştır. Daha detaylı teknik bilgi için orijinal README.md dosyasına bakabilirsiniz.