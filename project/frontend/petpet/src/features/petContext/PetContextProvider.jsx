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
                // Невалидный petId - редирект на дефолтного
                const defaultPetId = pets[0]?.id;
                if (defaultPetId) {
                    setSearchParams({ petId: defaultPetId }, { replace: true });
                    setActivePetId(defaultPetId);
                    // TODO: Показать toast "Питомец не найден"
                }
            }
        } else {
            // Нет petId в URL - устанавливаем дефолтного
            const defaultPetId = pets[0]?.id;
            if (defaultPetId) {
                setSearchParams({ petId: defaultPetId }, { replace: true });
                setActivePetId(defaultPetId);
            }
        }
    }, [searchParams, pets]); // eslint-disable-line react-hooks/exhaustive-deps

    // Синхронизация Zustand и URL
    useEffect(() => {
        if (isUpdatingFromUrl.current) {
            isUpdatingFromUrl.current = false;
            return;
        }

        if (activePetId) {
            const urlPetId = searchParams.get('petId');
            if (urlPetId !== activePetId) {
              setSearchParams({ petId: activePetId }, { replace: false }); // push для истории браузера
            }
        }
    }, [activePetId]); // eslint-disable-line react-hooks/exhaustive-deps

    return children;
};