import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePetStore } from '../../shared/store/petStore';
import { getPets } from '../../shared/api/petApi';

export const PetContextProvider = ({ children }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const {
        activePetId,
        pets,
        setActivePetId,
        setPets,
        setLoading,
        setError,
    } = usePetStore();

    // Флаг для предотвращения цикличных обновлений
    const isUpdatingFromUrl = useRef(false);

    // Загрузка списка питомцев при монтировании
    useEffect(() => {
        const loadPets = async () => {
            setLoading(true);
            try {
                const petsList = await getPets();
                setPets(petsList);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadPets();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Синхронизация URL и Zustand
    useEffect(() => {
        if (pets.length === 0) return; // Ждём загрузки питомцев

        const urlPetId = searchParams.get('petId');

        if (urlPetId) {
            // Проверяем, существует ли питомец
            const petExists = pets.some(p => p.id === urlPetId);

            if (petExists && urlPetId !== activePetId) {
                isUpdatingFromUrl.current = true;
                setActivePetId(urlPetId);
            } else if (!petExists) {
                // Невалидный petId - сбрасываем на "общую ленту"
                setSearchParams({}, { replace: true }); // убираем petId из URL
                setActivePetId(null);
                // TODO: Показать toast "Питомец не найден, показана общая лента"
            }
        } else {
            // Нет petId в URL - оставляем null (общая лента)
            // НЕ устанавливаем дефолтного питомца автоматически
            if (activePetId !== null) {
                setActivePetId(null);
            }
        }
    }, [searchParams, pets, activePetId, setActivePetId, setSearchParams]);

    // Синхронизация Zustand и URL
    useEffect(() => {
        if (isUpdatingFromUrl.current) {
            isUpdatingFromUrl.current = false;
            return;
        }

        const urlPetId = searchParams.get('petId');

        if (activePetId) {
            // Выбран конкретный питомец - записываем в URL
            if (urlPetId !== activePetId) {
                setSearchParams({ petId: activePetId }, { replace: false });
            }
        } else {
            // Общая лента - убираем petId из URL
            if (urlPetId) {
                setSearchParams({}, { replace: false });
            }
        }
    }, [activePetId, searchParams, setSearchParams]);

    return children;
};