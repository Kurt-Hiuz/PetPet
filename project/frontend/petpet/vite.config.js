import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// ESM-совместимый способ получить __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Загружаем .env файлы в зависимости от режима (development/production)
  const env = loadEnv(mode, __dirname, '')
  
  return {
    // Плагины
    plugins: [react()],
    
    // Алиасы для чистых импортов
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, './src/assets'),
        '@pages': path.resolve(__dirname, './src/components/pages'),
        '@screens': path.resolve(__dirname, './src/components/screens'),
        '@template': path.resolve(__dirname, './src/components/template'),
        '@ui': path.resolve(__dirname, './src/components/ui'),
        '@config': path.resolve(__dirname, './src/config'),
        '@data': path.resolve(__dirname, './src/data'),
        '@features': path.resolve(__dirname, './src/features'),
        '@routes': path.resolve(__dirname, './src/routes'),
        '@shared': path.resolve(__dirname, './src/shared'),
        '@api': path.resolve(__dirname, './src/shared/api'),
        '@hooks': path.resolve(__dirname, './src/shared/hooks'),
        '@utils': path.resolve(__dirname, './src/utils'),
      }
    },
    
    // Базовый URL (важно для деплоя)
    base: env.VITE_BASE_URL || '/',
    
    // Настройки dev-сервера
    server: {
      port: 5173,           // Стандартный порт Vite
      open: true,           // Автоматически открывать браузер
      strictPort: true,     // Ошибка, если порт занят (вместо автопереключения)
      
      // Proxy для gRPC-сервера на Dart (когда будет добавлен)
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
        },
        // gRPC-Web proxy (если будет использован grpc-web)
        '/grpc': {
          target: env.VITE_GRPC_URL || 'http://localhost:9090',
          changeOrigin: true,
          ws: true, // WebSocket support
        }
      }
    },
    
    // Настройки сборки
    build: {
      outDir: 'dist',                    // Папка для production-сборки
      sourcemap: mode !== 'production',  // Source maps только в dev
      minify: 'esbuild',                 // Самый быстрый минификатор
      target: 'es2020',                  // Современный JS
      rollupOptions: {
        output: {
          // Разделение кода на чанки для лучшего кэширования
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-query': ['@tanstack/react-query'],
            'vendor-ui': ['@fortawesome/react-fontawesome', 'clsx'],
          }
        }
      }
    },
    
    // CSS-настройки
    css: {
      // Для примера на будущее:
      // modules: {
      //   // Генерируем читаемые имена классов в dev
      //   localsConvention: 'camelCaseOnly',
      //   generateScopedName: mode === 'production' 
      //     ? '[hash:base64:8]'      // Короткие хэши в production
      //     : '[name]__[local]__[hash:base64:5]' // Читаемые в dev
      // }
    },
    
    // Оптимизация зависимостей
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'], // Пре-сборка тяжёлых зависимостей
    }
  }
})