import Template from './components/template/Template';

import ErrorScreen from './components/screens/error_screen/ErrorScreen';

const savedTheme = localStorage.getItem('petpet-theme') || 'light';
if (document.documentElement.getAttribute('data-theme') !== savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
}

function App() {
  const hasError = false;
  if(hasError) return <ErrorScreen error_code={503}/>

  return (
    <Template></Template>
  );
}

export default App
