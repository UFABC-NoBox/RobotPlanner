'use strict';

angular.module('Common', [

])

.service('Dialogs', function ($mdDialog){
  var service = this;

  this.alert = function(text, textOk, callback) {
    $mdDialog.show(
      $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('Atenção')
        .textContent(text)
        .ariaLabel('Alert Dialog')
        .ok(textOk)
        .targetEvent(callback)
    );
  };

  this.confirm = function(text, textOk, textCancel, callback) {
    var confirm = $mdDialog.confirm()
      .title('Confirmação')
      .textContent(text)
      .ariaLabel('Confirm Dialog')
      .ok(textOk)
      .cancel(textCancel)
      .targetEvent(callback)
    $mdDialog.show(confirm).then(function() {
      callback && callback(true);
    }, function() {
      callback && callback(false);
    });
  };

  service.prompt = function(text, placeholder, textDefault, callback) {
    var confirm = $mdDialog.prompt()
      .title('Pergunta...')
      .textContent(text)
      .ariaLabel('Prompt Dialog')
      .placeholder(textDefault)
      // .initialValue(placeholder)
      .ok('OK')
      .cancel('Cancelar')
      .targetEvent(callback)
    $mdDialog.show(confirm).then(function(result) {
      callback && callback(result);
    }, function() {
      callback && callback(null);
    });
  };
})
