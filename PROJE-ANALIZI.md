# Vercel Microfrontends Next.js Pages Federation Proje Analizi

## Proje Genel Bakış

Bu proje, Next.js Pages Router ve Module Federation kullanarak geliştirilmiş bir microfrontend uygulamasıdır. Vercel'in microfrontends altyapısı üzerine kurulmuştur.

## Teknoloji Stack

- **Framework**: Next.js (Pages Router)
- **Module Federation**: @module-federation/nextjs-mf
- **Microfrontend Altyapısı**: @vercel/microfrontends
- **Paket Yöneticisi**: pnpm (v9.4.0)
- **Build Tool**: Turbo
- **Node Sürümü**: 20.x
- **TypeScript**: 5.7.3

## Proje Yapısı

```
/
├── apps/
│   ├── root/          # Ana uygulama (Host)
│   ├── navigation/    # Navigation microfrontend
│   └── content/       # Content microfrontend
├── packages/          # Paylaşılan paketler
├── pnpm-workspace.yaml
└── turbo.json
```

## Microfrontend Mimarisi

### 1. Root (Host) Uygulama
- **Rol**: Ana container/shell uygulama
- **Module Federation Name**: `root`
- **Remote'ları Yükler**: 
  - `navigation` → Header ve Footer componentleri
  - `content` → Ana sayfa içeriği

### 2. Navigation Microfrontend
- **Module Federation Name**: `_mf_navigation`
- **Exposed Modüller**:
  - `./header`: Header componenti
  - `./footer`: Footer componenti
  - `./app`: _app.tsx (global stiller için)
- **Route**: `/_navigation/*`

### 3. Content Microfrontend
- **Module Federation Name**: `_mf_content`
- **Exposed Modüller**:
  - `./page`: Ana sayfa içeriği
  - `./app`: _app.tsx (global stiller için)
- **Route**: `/_content/*`

## Module Federation Konfigürasyonu

### Remote URL Yapısı
```javascript
remoteName@${url}/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js
```

### Önemli Noktalar
1. **SSR Desteği**: Server ve client için ayrı remoteEntry.js dosyaları
2. **Dynamic Remote Loading**: Vercel'in related-projects sistemi ile
3. **Global Stil Yönetimi**: Her microfrontend kendi _app.tsx'ini expose ediyor

## Routing Stratejisi

`microfrontends.json` dosyasında tanımlı:
- Root uygulama: Fallback olarak çalışır
- Navigation: `/_navigation/*` path'lerini handle eder
- Content: `/_content/*` path'lerini handle eder

## Development Ortamı

- **Local Development**: `pnpm dev` ile tüm uygulamalar paralel başlar
- **Turbo**: Monorepo task orchestration
- **Hot Reload**: Her microfrontend bağımsız hot reload destekler

## Build ve Deploy

1. **Build**: `pnpm build` - Turbo ile paralel build
2. **Vercel Deploy**: Her app ayrı bir Vercel projesine deploy edilir
3. **Fallback**: Development'ta `microfrontends-nextjs-pages-federation-root.vercel.app`

## Dikkat Edilmesi Gerekenler

1. **TypeScript Errors**: Build sırasında ignore ediliyor (ignoreBuildErrors: true)
2. **ESLint**: Build sırasında ignore ediliyor (ignoreDuringBuilds: true)
3. **React Strict Mode**: Aktif
4. **Vercel Toolbar**: Tüm uygulamalarda entegre

## Potansiyel İyileştirme Alanları

1. TypeScript ve ESLint hatalarının düzeltilmesi
2. Shared component library oluşturulması
3. Common configuration package'ı
4. Testing stratejisi ve implementasyonu
5. CI/CD pipeline optimizasyonu