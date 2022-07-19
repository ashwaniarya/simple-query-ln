interface IQueryParser {
  validate(token: string): boolean;
  parser(token: string): any;
}

interface IValueOperator {
  value: string;
  operator: string;
}
interface IFilter extends IValueOperator {
  field: string;
}

interface INormalFilter {
  field: string;
  operators: [IValueOperator];
}

class QueryParser implements IQueryParser {
  FILTER_TOKEN_REGEX: RegExp;
  COMPONENT_REGEX: RegExp;
  KEY_WITH_OPERATOR_REGEX: RegExp;
  OPERATOR_REGEX: RegExp;
  KEY_REGX: RegExp;

  constructor() {
    this.FILTER_TOKEN_REGEX =
      /([a-zA-Z]+)?[a-zA-Z_0-9]+([[a-zA-Z_0-9]+])?:([A-Za-z0-9]*)?([[0-9]+,[0-9]+])?,?/g;
    this.COMPONENT_REGEX =
      /([a-zA-Z]+)?[a-zA-Z_0-9]+([[a-zA-Z_0-9]+])?:([A-Za-z0-9]*)?([[0-9]+,[0-9]+])?/g;
    this.KEY_WITH_OPERATOR_REGEX = /[a-zA-Z_]+\[[a-z_]+]/;
    this.OPERATOR_REGEX = /(?<=\[)[a-z_]+(?=\])/g;
    this.KEY_REGX = /[a-zA-Z_]+(?=\[[a-z_]+\])/g;
  }

  private validateOperatorToken(token) {
    return this.KEY_WITH_OPERATOR_REGEX.test(token);
  }

  private parseLHS(token) {
    let key: string;
    let operator: string;
    if (this.validateOperatorToken(token)) {
      key = token.match(this.KEY_REGX)[0];
      operator = token.match(this.OPERATOR_REGEX)[0];
    } else {
      key = token;
    }
    return {
      key,
      operator,
    };
  }

  private parseRHS() {}

  private mergeSameKeys(filters): Array<INormalFilter> {
    const map = {};

    filters.forEach((filter: IFilter) => {
      if (map[filter.field]) {
        map[filter.field].operators.push({
          value: filter.value,
          operator: filter.operator,
        });
      } else {
        map[filter.field] = {
          field: filter.field,
          operators: [{ value: filter.value, operator: filter.operator }],
        };
      }
    });

    return Object.values(map);
  }

  private parseFilter(component): IFilter {
    let foundSeparator = false;
    let key = '';
    let value = '';
    for (const char of component) {
      if (char === ':') {
        foundSeparator = true;
      } else {
        if (foundSeparator) {
          value += char;
        } else {
          key += char;
        }
      }
    }
    const { key: parsedKey, operator } = this.parseLHS(key);

    return {
      field: parsedKey,
      value: value,
      operator,
    };
  }

  private parseComposedFilter(queryValue:string) {
    const componentArray = queryValue.match(this.COMPONENT_REGEX);
    const filters = componentArray.map((comp) => {
      return this.parseFilter(comp);
    });

    return this.mergeSameKeys(filters);
  }

  validate(token:string) {
    return this.FILTER_TOKEN_REGEX.test(token);
  }

  parser(token: string): any {
    return { parsed: this.parseComposedFilter(token), rawFilter: token };
  }
}

export default QueryParser;