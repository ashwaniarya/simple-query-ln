"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators = {
    equal: 'equal',
    not_equal: 'not_equal',
    in: 'in',
    not_in: 'not_in',
    less: 'less',
    less_or_equal: 'less_or_equal',
    greater: 'greater',
    greater_or_equal: 'greater_or_equal',
    between: 'between',
    not_between: 'not_between',
    begins_with: 'begins_with',
    not_begins_with: 'not_begins_with',
    contains: 'contains',
    not_contains: 'not_contains',
    ends_with: 'ends_with',
    not_ends_with: 'not_ends_with',
    is_empty: 'in_empty',
    is_not_empty: 'is_not_empty',
    is_null: 'is_null',
    is_not_null: 'is_not_null',
};
/**
 * How to use this Query Builder
 * let query = new QueryBuilder();
 *
 * query.addFilter('name','Arya');
 * query.addFilter('investment_amount',2000,'less_amount');
 * query.addFilter('return','[30,45]','between');
 *
 * console.log(query.stringify())
 * > "name:Arya,investment_amount[less_amount]:2000,return[between]:[30,45]"
 */
var QueryBuilder = /** @class */ (function () {
    function QueryBuilder() {
        this.composedFilterToken = [];
    }
    QueryBuilder.prototype.addFilter = function (field, value, operator) {
        this.composedFilterToken.push({
            field: field,
            operator: operator,
            value: value,
        });
    };
    QueryBuilder.prototype.stringify = function () {
        return this.composedFilterToken.reduce(function (acc, filter, index) {
            var stringifiedToken = "".concat(filter.field).concat(filter.operator ? '[' + filter.operator + ']' : '', ":").concat(filter.value);
            if (index === 0) {
                acc = stringifiedToken;
            }
            else {
                acc += ',' + stringifiedToken;
            }
            return acc;
        }, '');
    };
    QueryBuilder.operators = operators;
    return QueryBuilder;
}());
exports.default = QueryBuilder;
