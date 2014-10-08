describe('Tieable', function () {

  var Tieable;

  function injector () {

    var i;

    angular.mock.inject(function ($injector) {

      i = $injector;
    });

    return i;
  }

  beforeEach(function () {

    angular.mock.module('ngMock');
    Tieable = require('../src');
  });

  it('should exist', function () {

    expect(angular).toBeDefined();
    expect(angular.mock).toBeDefined();
    expect(Tieable).toBeDefined();
    expect(injector().get('$rootScope')).toBeDefined();
  });
});
