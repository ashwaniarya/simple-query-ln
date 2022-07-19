const QueryParser = require("./../built/QueryParser")

const queryParser = new QueryParser.default();

describe('Query Parser',()=>{
  it('Should have one parsed filter',()=>{
    const parsedObject = queryParser.parser('name:Arya');
    expect(parsedObject.parsed.length).toBe(1);
  });

  it('Should parse field and value',()=>{

    const parsedObject = queryParser.parser('name:Arya');
    expect(parsedObject.parsed[0].field).toBe('name');
    expect(parsedObject.parsed[0].operators[0].value).toBe('Arya');
  })

  it('Should have multiple filter',()=>{
    const parsedObject = queryParser.parser('name:Arya,age[greater_or_equal]:25,age[less_or_equal]:30');
    expect(parsedObject.parsed.length).toBe(2);
    parsedObject.parsed.forEach(filter=>{
      expect(filter)
    })
  })

  it('Should have combine multiple filed with same field',()=>{
    const parsedObject = queryParser.parser('age[greater_or_equal]:25,age[less_or_equal]:30');
    expect(parsedObject.parsed.length).toBe(1);
  })

})