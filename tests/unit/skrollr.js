"use strict";

describe("snSkrollrProvider", function () {

  var serviceProvider, $window, $document, spy, destroy, scope, rootScope, snSkrollr, refresh, skrollrInstance;

  describe("snSkrollr - provider implementation", function () {
    beforeEach(function () {

      // Initialize the service provider by injecting it to a fake module"s config block
      angular.module("testApp", function () {})
        .config(function (snSkrollrProvider) {
          snSkrollrProvider.config = {
            smoothScrolling: true
          };
          serviceProvider = snSkrollrProvider
        });

      module("sn.skrollr", "testApp");

      inject(function ($rootScope, $injector) {
        scope = $rootScope.$new();
        rootScope = $rootScope;

        snSkrollr = $injector.get("snSkrollr");

        $window = $injector.get("$window");
        $window.skrollr = {
          init: function () {
            return {
              refresh: function () {},
              destroy: function () {}
            };
          }
        }
        spy = spyOn($window.skrollr, "init");
        spy.and.callThrough();

        $document = $injector.get("$document");
        $document.ready = function (fn) {
          fn.call(this);
        }

      });

    });

    it("should configure snSkrollr with options", function () {
      expect(serviceProvider.config).toEqual({
        smoothScrolling: true
      });
    });

    it("should call skrollr init", function () {

      snSkrollr.init();
      expect(spy).toHaveBeenCalledWith({
        smoothScrolling: true
      });
      expect(serviceProvider.hasBeenInitialised).toEqual(true);
    });

    it("should call destroy on skrollr instance", function () {

      snSkrollr.init();
      destroy = spyOn(serviceProvider.skrollrInstance, "destroy");
      snSkrollr.destroy();
      expect(destroy).toHaveBeenCalled();
      expect(serviceProvider.hasBeenInitialised).toEqual(false);

    });

    it("should not call destroy if skrollr hasn't been initialised", function () {

      serviceProvider.hasBeenInitialised = false;
      snSkrollr.destroy();
      expect(serviceProvider.skrollrInstance.destroy).toBe(undefined);
      expect(serviceProvider.hasBeenInitialised).toEqual(false);

    });

    it("should call refresh on skrollr instance", function () {

      snSkrollr.init();
      refresh = spyOn(serviceProvider.skrollrInstance, "refresh");
      snSkrollr.refresh();
      expect(refresh).toHaveBeenCalled();

    });
  });


  describe("snSkrollr - service implementation", function () {
    beforeEach(function () {

      // Initialize the service provider by injecting it
      angular.module("testApp", function () {})
        .config(function (snSkrollrProvider) {
          serviceProvider = snSkrollrProvider;
        });

      module("sn.skrollr", "testApp");

      inject(function ($rootScope, $injector) {
        scope = $rootScope.$new();
        rootScope = $rootScope;

        snSkrollr = $injector.get("snSkrollr");

        $window = $injector.get("$window");
        $window.skrollr = {
          init: function () {
            return {
              refresh: function () {},
              destroy: function () {}
            };
          }
        }
        spy = spyOn($window.skrollr, "init");
        spy.and.callThrough();

        $document = $injector.get("$document");
        $document.ready = function (fn) {
          fn.call(this);
        };

      });

    });

    it("should call skrollr init", function () {
      snSkrollr.init({
        smoothScrolling: true
      });
      expect(spy).toHaveBeenCalledWith({
        smoothScrolling: true
      });
      expect(serviceProvider.hasBeenInitialised).toEqual(true);
    });


    it("should configure snSkrollr with options", function () {
      snSkrollr.init({
        smoothScrolling: true
      });      
      expect(serviceProvider.config).toEqual({
        smoothScrolling: true
      });
    });

    it("should call destroy on skrollr instance", function () {
      snSkrollr.init({
        smoothScrolling: true
      });      
      destroy = spyOn(serviceProvider.skrollrInstance, "destroy");
      snSkrollr.destroy();
      expect(destroy).toHaveBeenCalled();
      expect(serviceProvider.hasBeenInitialised).toEqual(false);

    });

    it("should not call destroy if skrollr hasn't been initialised", function () {
      serviceProvider.hasBeenInitialised = false;
      snSkrollr.destroy();
      expect(serviceProvider.skrollrInstance.destroy).toBe(undefined);
      expect(serviceProvider.hasBeenInitialised).toEqual(false);
    });

    it("should call refresh on skrollr instance", function () {
      snSkrollr.init({
        smoothScrolling: true
      });
      refresh = spyOn(serviceProvider.skrollrInstance, "refresh");
      snSkrollr.refresh();
      expect(refresh).toHaveBeenCalled();

    });
  });

});

describe("directive: snSkrollr", function () {
  var element, scope, isolatedScope, snSkrollr, spy;

  beforeEach(module("sn.skrollr"));

  beforeEach(inject(function ($rootScope, $compile, $injector) {
    scope = $rootScope.$new();

    snSkrollr = $injector.get("snSkrollr");
    spy = spyOn(snSkrollr, "refresh");

    element =
      "<sn-skrollr>" +
      "<div id=\"elem1\"></div>" +
      "</sn-skrollr>";

    element = $compile(element)(scope);
    scope.$digest();

  }));

  it("should refresh skrollr", function () {
    expect(spy).toHaveBeenCalled();
  });

});