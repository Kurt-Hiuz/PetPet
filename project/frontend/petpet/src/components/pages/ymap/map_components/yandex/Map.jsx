import { useEffect, useRef } from 'react';

import classes from './styles/Map.module.css'

export default function Map({ center = [55.751574, 37.573856], zoom = 10, apiKey }) {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        if (!apiKey) {
            console.error('API key отсутствует');
            return;
        }

        // Если карта уже создана — выходим
        if (mapInstance.current) return;

        // Проверяем, загружен ли ymaps
        if (window.ymaps) {
            // Если ymaps есть, ждём его готовности
            if (window.ymaps.ready) {
                window.ymaps.ready(initMap);
            } else {
                // Если ready ещё нет — ждём вручную
                const timer = setInterval(() => {
                    if (window.ymaps?.ready) {
                        clearInterval(timer);
                        window.ymaps.ready(initMap);
                    }
                }, 100);
            }
        } else if (!window.ymapsLoading) {
            // Если ymaps ещё НЕ загружен — загружаем его
            window.ymapsLoading = true;

            const script = document.createElement('script');
            script.src = `https://api-maps.yandex.ru/2.1/?apikey= ${encodeURIComponent(apiKey)}&lang=ru_RU`;
            script.async = true;

            script.onload = () => {
                window.ymapsLoading = false;
                window.ymaps.ready(initMap);
            };

            script.onerror = () => {
                console.error('Ошибка загрузки Яндекс.Карт');
                window.ymapsLoading = false;
            };

            document.head.appendChild(script);
        }

        function initMap() {
            if (mapInstance.current || !mapRef.current) return;
            
            try {
                const map = new window.ymaps.Map(mapRef.current, {
                    center,
                    zoom,
                    controls: ['zoomControl', 'fullscreenControl'],
                });

                mapInstance.current = map;
                console.log('Карта инициализирована');
            } catch (e) {
                console.error('Ошибка создания карты:', e);
            }
        }

        return () => {
            if (mapInstance.current) {
                mapInstance.current.destroy();
                mapInstance.current = null;
            }
        };
    }, [center, zoom, apiKey]);

    return <div ref={mapRef} className={classes.map_container} />;
}