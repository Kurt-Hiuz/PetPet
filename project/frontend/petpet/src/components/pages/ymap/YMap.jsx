import classes from './styles/YMap.module.css';

import Map from './map_components/yandex/Map';
import MapHotButtons from './map_components/map_hot_buttons/MapHotButtons';
import EmergencyBtn from './map_components/emergency_btn/EmergencyBtn';
import MapSearch from './map_components/map_search/MapSearch';

export default function YMap(){
    const API_KEY = '8e972d7c-3d73-4efe-b7e2-ff7fac64f917';

    return (
        <div className={classes.map_wrapper}>
            <MapSearch/>
            <Map center={[55.751574, 37.573856]} zoom={12} apiKey={API_KEY} />
            <EmergencyBtn/>
            <MapHotButtons/>
        </div>
    );
}