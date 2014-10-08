describe('Tieable', function () {

  function injector () {

    var i;

    angular.mock.inject(function ($injector) {

      i = $injector;
    });

    return i;
  }

  beforeEach(function () {

    angular.mock.module('ngMock');
  });

  it('should exist', function () {

    expect(angular).toBeDefined();
    expect(angular.mock).toBeDefined();
    expect(Tieable).toBeDefined();
    expect(injector().get('$rootScope')).toBeDefined();
  });

  it('should get property value', function () {

    var tiable = new Tieable('foo');

    expect(tiable.get()).toBe('foo');
  });

  it('should return unique objects', function () {

    var tieable = new Tieable({
      foo: 'bar'
    });

    var i1 = tieable.get();
    var i2 = tieable.get();

    i1.foo = 'stuff';

    expect(i2.foo).not.toBe('stuff');
  });

  it('should allow setting new values', function () {

    var tieable = new Tieable('first');

    tieable.set('second');
    expect(tieable.get()).toBe('second');
  });

  it('should set ties to initial value', function () {

    var obj = {};
    var tieable = new Tieable('foo');
    tieable.tie(obj, 'myProp');

    expect(obj.myProp).toBe('foo');
  });

  it('should update ties when modified', function () {

    var obj = {};
    var tieable = new Tieable('foo');
    tieable.tie(obj, 'myProp');
    tieable.set('bar');

    expect(obj.myProp).toBe('bar');
  });

  it('should update tie to a $scope', function () {

    var $i = injector();
    var $scope = $i.get('$rootScope');
    var $compile = $i.get('$compile');
    var el = $compile('<p>{{ myProp }}</p>')($scope);
    var tieable = new Tieable();

    tieable.tie($scope, 'myProp');
    tieable.set('foo');
    $scope.$digest();

    expect(el.html()).toContain('foo');

    tieable.set('bar');
    $scope.$digest();
    expect(el.html()).toContain('bar');
  });

  it("should allow removing ties", function () {

    var obj = {};
    var tieable = new Tieable('foo');
    var untie = tieable.tie(obj, 'myProp');
    tieable.set('bar');

    expect(obj.myProp).toBe('bar');
    untie();

    tieable.set('bar');
    expect(obj.myProp).not.toBeDefined();
  });

  it("should auto cleanup tie on $scope $destroy", function () {

    var obj = {};
    var $scope = injector().get('$rootScope');
    var tieable = new Tieable();

    tieable.tie($scope, 'myProp');
    tieable.set('foo');

    expect($scope.myProp).toBe('foo');

    $scope.$destroy();
    tieable.set('bar');
    expect($scope.myProp).not.toBeDefined();
  });
});
