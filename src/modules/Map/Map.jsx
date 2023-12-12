import React, { useState } from 'react'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { defaultTheme } from './Theme'
const containerStyle = {
    width: '100%',
    height: '700px'
};

const defaultOptions = {
    panControl: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    clickableIcons: false,
    keyboardShortcuts: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
    styles: defaultTheme
}

const Map = ({ center }) => {

    const mapRef = React.useRef(undefined)

    const onLoad = React.useCallback(function callback(map) {
        mapRef.current = map
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        mapRef.current = undefined
    }, [])

    const markers = [
        { position: { lat: 49.8730914864891, lng: 24.015119139441286 }, label: (<div>Лікаря УМВС <br /> вулиця Замарстинівська 233</div>), link: 'https://lviv-tmo.mvs.gov.ua/departments/show/2' },
        { position: { lat: 49.87591325101905, lng: 24.034732732311408 }, label: (<div>Львівська міська дитяча клінічна лікарня <br /> вулиця Пилипа Орлика 4</div>), link: 'https://micto.ua/miska-dytiacha-klinichna-likarnia-i158986/' },
        { position: { lat: 49.8741924023972, lng: 24.03960621982702 }, label: (<div>Комунальна міська клінічна міська лікарня швидкої медичної допомоги<br /> вулиця Івана Миколайчука 9</div>), link: 'https://micto.ua/miska-klinichna-likarnia-shvydkoi-medychnoi-dopomohy-i158987/' },
        { position: { lat: 49.854905129613364, lng: 24.026910933718714 }, label: (<div>Лікарня князя Лева<br /> вулиця Хімічна, 7А</div>), link: 'https://helsi.me/clinic/7d8c4358-8432-4814-af2e-7afd765c9c6b' },
        { position: { lat: 49.84692509663795, lng: 24.031125325025002 }, label: (<div>Перша міська клінічна лікарня ім.Князя Лева<br />Стаціонар, вулиця Ужгородська 1</div>), link: 'https://likar.dokladno.com/clinic.php?clinicId=17' },
        { position: { lat: 49.845373775126724, lng: 24.018127908055227 }, label: (<div>Комунальна 3-тя міська клінічна лікарня<br />вулиця Якова Раппапорта 6</div>), link: 'https://ua.polomap.com/львів/27775' },
        { position: { lat: 49.844617580479536, lng: 24.020035370161953 }, label: (<div>Лікарня ЕКСПЕРТ<br />вулиця Шолом-Алейхема 11</div>), link: 'https://experthospital.com.ua/page/kontakty-p3/' },
        { position: { lat: 49.843662469782764, lng: 24.044496373685217 }, label: (<div>Львівська обласна дитяча клінічна лікарня «Охматдит»<br />вулиця Лисенка 31</div>), link: 'https://ohmatdyt.lviv.ua' },
        { position: { lat: 49.84247145352499, lng: 24.018118899980497 }, label: (<div>Клінічна лікарня Львівської залізниці<br />вулиця Івана Огієнка 5</div>), link: 'https://www.dlab.com.ua/map/5873' },
        { position: { lat: 49.838967123687006, lng: 24.04609231447861 }, label: (<div>Львівська обласна клінічна лікарня - Головний корпус, хірургічне відділення №1<br />вулиця Чернігівська 7</div>), link: 'http://hospital.lviv.ua/contacts/' },
        { position: { lat: 49.839350601419945, lng: 24.046642095448576 }, label: (<div>Львівська обласна клінічна лікарня - Головний корпус, Адміністрація лікарні<br />вулиця Чернігівська 7</div>), link: 'http://hospital.lviv.ua/contacts/' },
        { position: { lat: 49.83817069892594, lng: 24.0495791978844 }, label: (<div>Львівська обласна клінічна лікарня - Хірургічний корпус, хірургічне відділення №2<br />вулиця Юрія Руфа 4</div>), link: 'https://www.facebook.com/people/Хірургічне-відділення-3-Львівська-обласна-клінічна-лікарня/100057109404082/' },
        { position: { lat: 49.83724496517522, lng: 24.05091737893354 }, label: (<div>Львівська обласна клінічна лікарня -Проктологічний корпус, обласна консультативна поліклініка<br />вулиця Юрія Руфа 6</div>), link: 'https://uaotzyv.com/lviv/konsultativna-poliklinika-oblasnoi-klinichnoi-likarni-20967' },
        { position: { lat: 49.83716698201539, lng: 24.050894348204853 }, label: (<div>Львівська обласна клінічна лікарня, відділення щелепно-лицевої хірургії<br />вулиця Юрія Руфа 4/6</div>), link: 'https://www.dlab.com.ua/map/17520' },
        { position: { lat: 49.83617799180334, lng: 24.034131728588797 }, label: (<div>Поліклініка Комунальної 4-ої міської клінічної лікарні<br />вулиця Ярослава Стецька 3</div>), link: 'https://city-adm.lviv.ua/portal/catalog/zdorov-ja-i-krasa/medychni-zaklady/miski-zaklady-okhorony-zdorovia/likarni-ta-dispanseri/komunalna-4-a-miska-klinichna-likarnia/5385' },
        { position: { lat: 49.834358719127934, lng: 24.05067936219154 }, label: (<div>Львівська обласна інфекційна клінічна лікарня<br />вулиця Пекарська 54</div>), link: 'https://city-adm.lviv.ua/portal/catalog/zdorov-ja-i-krasa/medychni-zaklady/oblasni-zaklady-okhorony-zdorovia/likarni-polikliniky/5391' },
        { position: { lat: 49.82825036977677, lng: 24.016255148750226 }, label: (<div>Десята міська лікарня<br />вулиця Бой-Желенського 14</div>), link: 'https://city-adm.lviv.ua/portal/catalog/zdorov-ja-i-krasa/medychni-zaklady/likarni-ta-dispanseri/10-a-miska-klinichna-likarnia/5389' },
        { position: { lat: 49.82746772296419, lng: 24.0329972336676 }, label: (<div>4-а міська клінічна лікарня м. Львова<br />вулиця Паркова</div>), link: 'https://city-adm.lviv.ua/portal/catalog/zdorov-ja-i-krasa/medychni-zaklady/miski-zaklady-okhorony-zdorovia/likarni-ta-dispanseri/komunalna-4-a-miska-klinichna-likarnia' },
        { position: { lat: 49.81542144323351, lng: 24.047893142642998 }, label: (<div>Західноукраїнський спеціалізований дитячий медичний центр<br />Регіональний центр медицини дитинства, вулиця Дністерcька 27</div>), link: 'https://micto.ua/zakhidnoukrainskyi-spetsializovanyi-dytiachyi-medychnyi-tsentr-i158958/' },
        { position: { lat: 49.81357819720819, lng: 24.048321280754834 }, label: (<div>Комунальна 8-ма міська Клінічна лікарня "Мікрохірургія ока"<br />вул. Навроцького, 23</div>), link: 'https://city-adm.lviv.ua/portal/catalog/zdorov-ja-i-krasa/medychni-zaklady/medichni-centri/6247' },
        { position: { lat: 49.81314071822009, lng: 24.051005020384686 }, label: (<div>Лікарня святого Луки Першого територіального медоб’єднання Львова<br />вулиця Навроцького 23</div>), link: 'https://www.emergency-hospital.lviv.ua' },

    ];

    const [selectedMarker, setSelectedMarker] = useState(null);

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
    };

    const handleInfoWindowClose = () => {
        setSelectedMarker(null);
    };

    return (
        <div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={defaultOptions}
            >
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={marker.position}
                        onMouseOver={() => handleMarkerClick(marker)}
                    />
                ))}

                {selectedMarker && (
                    <InfoWindow
                        position={selectedMarker.position}
                        onCloseClick={handleInfoWindowClose}
                    >
                        <div>
                            <div>{selectedMarker.label}</div>
                            <br />
                            <a href={selectedMarker.link} target="_blank" rel="noopener noreferrer">
                                Дізнатись більше
                            </a>
                        </div>
                    </InfoWindow>
                )}

            </GoogleMap>
        </div>
    );
};

export { Map };