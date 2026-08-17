import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePetStore } from '@shared/store/petStore';
import { getPets } from '@shared/api/pet/petApi';

/**
 * Провайдер контекста питомца.
 * 
 * Отвечает за:
 * - Загрузку списка питомцев при монтировании
 * - Синхронизацию activePetId с URL (?petId=...)
 * 
 * Логика синхронизации:
 * - URL -> Zustand: если в URL есть petId, устанавливаем его как активный
 * - Zustand -> URL: если activePetId изменился, обновляем URL
 */
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

    // Загрузка питомцев при монтировании
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
    }, [setLoading, setPets, setError]);

    // Синхронизация URL -> Zustand
    useEffect(() => {
        if (pets.length === 0) return;

        const urlPetId = searchParams.get('petId');

        if (urlPetId) {
            const petExists = pets.some((p) => p.id === urlPetId);
            if (petExists && urlPetId !== activePetId) {
                setActivePetId(urlPetId);
            } else if (!petExists) {
                // Невалидный petId - убираем из URL
                setSearchParams({}, { replace: true });
                setActivePetId(null);
            }
        } else if (activePetId !== null) {
            // Нет petId в URL, но activePetId установлен - сбрасываем
            setActivePetId(null);
        }
    }, [searchParams, pets, activePetId, setActivePetId, setSearchParams]);

    // Синхронизация Zustand -> URL
    useEffect(() => {
        const urlPetId = searchParams.get('petId');

        if (activePetId) {
            if (urlPetId !== activePetId) {
                setSearchParams({ petId: activePetId }, { replace: false });
            }
        } else if (urlPetId) {
            setSearchParams({}, { replace: false });
        }
    }, [activePetId, searchParams, setSearchParams]);

    return children;
};