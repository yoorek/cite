'use strict';

describe('Service: dataService', function () {
  // load the service's module
  beforeEach(module('citeApp'));

  // instantiate service
  var dataService, $httpBackend;

  beforeEach(inject(function (_dataService_, $injector) {
    dataService = _dataService_;

    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', dataService.getConfig().url + dataService.getConfig().endpoint)
      .respond({'who':'Geralt','cite':'Pomyliłeś niebo z gwiazdami odbitymi nocą na powierzchni stawu.'});

  }));

  it('should return data and cache it', function () {
    $httpBackend.expectGET(dataService.getConfig().url + dataService.getConfig().endpoint);
    dataService.refresh();
    $httpBackend.flush();
    expect(dataService.getLastResult().who).toBe('Geralt');
  });

});
