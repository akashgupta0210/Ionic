angular.module('app.directives', [])

.directive('input', function () {
    return {
        restrict: 'E',
        require: '?ngModel',
        link: function (scope, elm, attr, ctrl) {
            if (!ctrl) {
                return;
            }
            if (attr.type == 'text' && attr.ngPattern === '/[0-9]/') {
                elm.bind('keyup', function () {
                    var text = this.value;
                    this.value = text.replace(/[a-zA-Z]/g, '');
                });
            }
        }
    }
});