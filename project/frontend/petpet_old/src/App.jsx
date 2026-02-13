import './App.css'
import Application from './app/Application';
import LoadingScreen from './app/general/screens/loading_screen/LoadingScreen';
import ErrorScreen from './app/general/screens/error_screen/ErrorScreen';
import SingIn from './app/general/screens/sing_in/SingIn';

import Map from './app/general/components/map/yandex/Map';

import { useEffect, useState, useCallback } from 'react';

function App() {
  const isMap = false;
  const isSingIn = false;
  
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  console.table(data);

  // Чтобы функция не пересоздавалась каждый раз - кешируем её
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    // TODO: сделать запрос на свой сервер
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    setData(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    try{
      fetchData();
    } catch (error){
      console.error(`Ошибка запроса: ${error}`);
      setHasError(true);
    }
  }, [fetchData]);

  const API_KEY = '8e972d7c-3d73-4efe-b7e2-ff7fac64f917';
  if(isMap) return <Map center={[55.751574, 37.573856]} zoom={12} apiKey={API_KEY} />

  if(isSingIn) return <SingIn />

  if(hasError) return <ErrorScreen error_code={404}/>

  if(isLoading) return <LoadingScreen />

  return <Application />

}

export default App
