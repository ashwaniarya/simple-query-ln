const QueryBuilder = require("./../built/QueryBuilder")


describe('Query Parser',()=>{
  it('It should have name:Arya',()=>{
    const queryBuilder = new QueryBuilder.default();
    queryBuilder.addFilter('name','Arya');
    expect(queryBuilder.stringify()).toBe('name:Arya');
  });

  it('It should have name:Arya,age[greater_or_equal]:25,age[less_or_equal]:30',()=>{
    const queryBuilder = new QueryBuilder.default();
    queryBuilder.addFilter('name','Arya');
    queryBuilder.addFilter('age',25,'greater_or_equal');
    queryBuilder.addFilter('age',30,'less_or_equal');
    expect(queryBuilder.stringify()).toBe('name:Arya,age[greater_or_equal]:25,age[less_or_equal]:30');
  });

})