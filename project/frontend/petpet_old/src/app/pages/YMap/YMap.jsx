import Map from '../../general/components/map/yandex/Map';
import MapHotButtons from '../../general/components/map/map_hot_buttons/MapHotButtons';
import EmergencyBtn from '../../general/components/map/emergency_btn/EmergencyBtn';
import MapSearch from '../../general/components/map/map_search/MapSearch';

export default function YMap(){
    const API_KEY = '8e972d7c-3d73-4efe-b7e2-ff7fac64f917';

    return (
        <>
            <Map center={[55.751574, 37.573856]} zoom={12} apiKey={API_KEY} />
            <MapHotButtons/>
            <EmergencyBtn/>
            <MapSearch/>
        </>
    );
}