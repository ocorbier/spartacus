import { GoogleMapRendererService } from './google-map-renderer.service';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StoreDataService } from '../facade/store-data.service';
import { StoreFinderConfig } from '../config/store-finder-config';
import { defaultStoreFinderConfig as config } from '../config/default-store-finder-config';
import { ExternalJsFileLoader } from '@spartacus/core';

const MAP_DOM_ELEMENT_INNER_HTML = 'map dom element inner html';

const locations = [
  {
    geoPoint: {
      latitude: 0,
      longitude: 0,
    },
  },
];
const selectedIndex = function () {};

class ExternalJsFileLoaderMock {
  public load(_src: string, _params?: Object, callback?: EventListener): void {
    const googleMock: any = {};
    googleMock.maps = {};
    googleMock.maps.MapTypeId = {};
    googleMock.maps.Map = function (mapDomElement: HTMLElement) {
      mapDomElement.innerHTML = MAP_DOM_ELEMENT_INNER_HTML;
      this.setCenter = function () {};
      this.setZoom = function () {};
    };
    googleMock.maps.LatLng = function () {};
    googleMock.maps.Marker = function () {
      this.setMap = function () {};
      this.addListener = function () {};
    };
    (window as any)['google'] = googleMock;
    callback(new Event('test'));
  }
}

class StoreDataServiceMock {
  getStoreLatitude(_location: any): number {
    return 10;
  }
  getStoreLongitude(_location: any): number {
    return 20;
  }
}

describe('GoogleMapRendererService', () => {
  let googleMapRendererService: GoogleMapRendererService;

  let externalJsFileLoaderMock: ExternalJsFileLoader;
  let storeDataServiceMock: StoreDataService;
  let mapDomElement: HTMLElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        GoogleMapRendererService,
        { provide: ExternalJsFileLoader, useClass: ExternalJsFileLoaderMock },
        {
          provide: StoreDataService,
          useClass: StoreDataServiceMock,
        },
        {
          provide: StoreFinderConfig,
          useValue: config,
        },
      ],
    });

    mapDomElement = document.createElement('div');
    externalJsFileLoaderMock = bed.inject(ExternalJsFileLoader);
    googleMapRendererService = bed.inject(GoogleMapRendererService);
    storeDataServiceMock = bed.inject(StoreDataService);
  });

  it('should render map', fakeAsync(() => {
    // given
    spyOn(externalJsFileLoaderMock, 'load').and.callThrough();
    spyOn(storeDataServiceMock, 'getStoreLatitude').and.callThrough();
    spyOn(storeDataServiceMock, 'getStoreLongitude').and.callThrough();

    // when
    googleMapRendererService.renderMap(mapDomElement, locations, selectedIndex);

    // then
    expect(externalJsFileLoaderMock.load).toHaveBeenCalledWith(
      config.googleMaps.apiUrl,
      Object({ key: config.googleMaps.apiKey }),
      jasmine.any(Function)
    );
    expect(storeDataServiceMock.getStoreLatitude).toHaveBeenCalled();
    expect(storeDataServiceMock.getStoreLongitude).toHaveBeenCalled();

    tick();
    expect(mapDomElement.innerHTML).toEqual(MAP_DOM_ELEMENT_INNER_HTML);
  }));

  it('should not create a new map', fakeAsync(() => {
    // given the map is already rendered
    googleMapRendererService.renderMap(mapDomElement, locations, selectedIndex);
    tick();

    spyOn(externalJsFileLoaderMock, 'load').and.callThrough();
    spyOn(storeDataServiceMock, 'getStoreLatitude').and.callThrough();
    spyOn(storeDataServiceMock, 'getStoreLongitude').and.callThrough();

    // when rendering the map one more time
    googleMapRendererService.renderMap(mapDomElement, locations, selectedIndex);

    // then google js is not loaded again
    expect(externalJsFileLoaderMock.load).toHaveBeenCalledTimes(0);
    expect(storeDataServiceMock.getStoreLatitude).toHaveBeenCalled();
    expect(storeDataServiceMock.getStoreLongitude).toHaveBeenCalled();
  }));
});
