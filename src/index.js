function Tieable (initial) {

  var prop = initial || null;
  var ties = {};
  var tieIds = 0;
  var service = this;

  function updateTies () {

    angular.forEach(ties, function (tie) {

      tie.obj[tie.prop] = service.get();
    });
  }

  service.tie = function (obj, prop) {

    id = tieIds + 1;

    ties[id] = { obj: obj, prop: prop };

    obj[prop] = service.get();

    function untie () {

      obj[prop] = undefined;
      delete ties[id];
    }

    // Auto untie scopes when destroyed
    if (angular.isDefined(obj.$on)) {
      obj.$on('$destroy', untie);
    }

    return untie;
  };

  service.set = function (val) {

    prop = angular.copy(val);
    updateTies();
  };

  service.get = function () {

    // Using angular.copy to prevent side effects due to object references.
    return angular.copy(prop);
  };
}

module.exports = Tieable;
