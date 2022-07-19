"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryParser = /** @class */ (function () {
    function QueryParser() {
        this.FILTER_TOKEN_REGEX =
            /([a-zA-Z]+)?[a-zA-Z_0-9]+([[a-zA-Z_0-9]+])?:([A-Za-z0-9]*)?([[0-9]+,[0-9]+])?,?/g;
        this.COMPONENT_REGEX =
            /([a-zA-Z]+)?[a-zA-Z_0-9]+([[a-zA-Z_0-9]+])?:([A-Za-z0-9]*)?([[0-9]+,[0-9]+])?/g;
        this.KEY_WITH_OPERATOR_REGEX = /[a-zA-Z_]+\[[a-z_]+]/;
        this.OPERATOR_REGEX = /(?<=\[)[a-z_]+(?=\])/g;
        this.KEY_REGX = /[a-zA-Z_]+(?=\[[a-z_]+\])/g;
    }
    QueryParser.prototype.validateOperatorToken = function (token) {
        return this.KEY_WITH_OPERATOR_REGEX.test(token);
    };
    QueryParser.prototype.parseLHS = function (token) {
        var key;
        var operator;
        if (this.validateOperatorToken(token)) {
            key = token.match(this.KEY_REGX)[0];
            operator = token.match(this.OPERATOR_REGEX)[0];
        }
        else {
            key = token;
        }
        return {
            key: key,
            operator: operator,
        };
    };
    QueryParser.prototype.parseRHS = function () { };
    QueryParser.prototype.mergeSameKeys = function (filters) {
        var map = {};
        filters.forEach(function (filter) {
            if (map[filter.field]) {
                map[filter.field].operators.push({
                    value: filter.value,
                    operator: filter.operator,
                });
            }
            else {
                map[filter.field] = {
                    field: filter.field,
                    operators: [{ value: filter.value, operator: filter.operator }],
                };
            }
        });
        return Object.values(map);
    };
    QueryParser.prototype.parseFilter = function (component) {
        var foundSeparator = false;
        var key = '';
        var value = '';
        for (var _i = 0, component_1 = component; _i < component_1.length; _i++) {
            var char = component_1[_i];
            if (char === ':') {
                foundSeparator = true;
            }
            else {
                if (foundSeparator) {
                    value += char;
                }
                else {
                    key += char;
                }
            }
        }
        var _a = this.parseLHS(key), parsedKey = _a.key, operator = _a.operator;
        return {
            field: parsedKey,
            value: value,
            operator: operator,
        };
    };
    QueryParser.prototype.parseComposedFilter = function (queryValue) {
        var _this = this;
        var componentArray = queryValue.match(this.COMPONENT_REGEX);
        var filters = componentArray.map(function (comp) {
            return _this.parseFilter(comp);
        });
        return this.mergeSameKeys(filters);
    };
    QueryParser.prototype.validate = function (token) {
        return this.FILTER_TOKEN_REGEX.test(token);
    };
    QueryParser.prototype.parser = function (token) {
        return { parsed: this.parseComposedFilter(token), rawFilter: token };
    };
    return QueryParser;
}());
exports.default = QueryParser;
