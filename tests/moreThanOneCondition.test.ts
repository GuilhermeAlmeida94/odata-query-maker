import { ODataQueryBuilder } from "../src/classes/oDataQueryBuilder";
import { StringOperator } from "../src/enums/stringOperator";
import { ComparisonOperator } from "../src/enums/comparisonOperator";

const employee = {name: 'Will', salary: 5000, age: null, departament: {name: 'Sales'}};

test('Value and String operator', () => {
    //Arrange
    const expectValue = '$filter=salary eq 5000 and name.contains(\'Will\')'
    let oDataQueryBuilder = new ODataQueryBuilder();

    //Act
    oDataQueryBuilder
        .filter(f => f.valueFilter('salary', ComparisonOperator.Equals, employee.salary).and()
                        .stringFilter('name', StringOperator.Contains, employee.name));
        
    //Assert
    expect(oDataQueryBuilder.generate()).toEqual(expectValue);
});

test('Value null and String operator', () => {
    //Arrange
    const expectValue = '$filter=name.contains(\'Will\')'
    let oDataQueryBuilder = new ODataQueryBuilder();

    //Act
    oDataQueryBuilder
        .filter(f => f.valueFilter('age', ComparisonOperator.Equals, employee.age).and()
                        .stringFilter('name', StringOperator.Contains, employee.name));
        
    //Assert
    expect(oDataQueryBuilder.generate()).toEqual(expectValue);
});

test('Not ignoring value null and String operator', () => {
    //Arrange
    const expectValue = '$filter=age eq null and name.contains(\'Will\')'
    let builderOptions = {ignoreNull: false};
    let oDataQueryBuilder = new ODataQueryBuilder(builderOptions);

    //Act
    oDataQueryBuilder
        .filter(f => f.valueFilter('age', ComparisonOperator.Equals, employee.age).and()
                        .stringFilter('name', StringOperator.Contains, employee.name));
        
    //Assert
    expect(oDataQueryBuilder.generate()).toEqual(expectValue);
});