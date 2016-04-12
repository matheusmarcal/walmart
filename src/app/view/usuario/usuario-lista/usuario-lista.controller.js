(function () {
    'use strict';

    /** @ngInject */
    function UsuarioListaController(CommonUsuarioFactory, $scope) {
        var vm = this;

        vm.crud = {};
        vm.source = {};
        vm.source.usuarios = CommonUsuarioFactory.ObterTodos();
        vm.command = {};

        vm.paginacao = {};
        vm.command.IniciarPaginacao = function () {

            vm.paginacao.itemsPerPage = 10;
            vm.paginacao.currentPage = 1;
            vm.paginacao.maxSize = 5;
            vm.paginacao.filtro = undefined;
            var _FiltrarPagina = function (_filtrar) {
                if (!_filtrar) {
                    if (vm.source.usuarios) {
                        var _begin = (vm.paginacao.currentPage - 1) * vm.paginacao.itemsPerPage;
                        var _end = _begin + vm.paginacao.itemsPerPage;
                        vm.paginacao.paged = {};
                        if (vm.paginacao.filtro) {
                            vm.paginacao.paginado = vm.source.usuarios;
                            vm.paginacao.paged.disablepaginate = true;
                        }
                        else {
                            vm.paginacao.paginado = vm.source.usuarios.slice(_begin, _end);
                        }
                    }
                }
                else {
                    if (vm.source.usuarios) {
                        vm.paginacao.paged = {};
                        if (vm.paginacao.filtro) {
                            vm.paginacao.paginado = vm.source.usuarios;
                        }
                        else {
                            var _begin = (vm.paginacao.currentPage - 1) * vm.paginacao.itemsPerPage;
                            var _end = _begin + vm.paginacao.itemsPerPage;
                            vm.paginacao.paginado = vm.source.usuarios.slice(_begin, _end);
                        }
                    }
                }
            };

            $scope.$watch(function () {
                return vm.paginacao.filtro;
            }, function () {
                _FiltrarPagina(true);
            });

            $scope.$watch(function () {
                return vm.paginacao.currentPage;
            }, function () {
                _FiltrarPagina(false);
            });
        }
        vm.command.IniciarPaginacao();

    }

    angular.module('usuario-lista.controller', [])
        .controller('UsuarioListaController', UsuarioListaController);

})();