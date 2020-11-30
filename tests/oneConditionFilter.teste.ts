import { ODataQueryBuilder } from "../src/classes/oDataQueryBuilder";
import { StringOperator } from "../src/enums/stringOperator";
import { ComparisonOperator } from "../src/enums/comparisonOperator";
import { Employee } from "./employee";

const employee: Employee = {name: 'Will', salary: 5000, age: null, departament: {name: 'Sales'}};
let oDataQueryBuilder = new ODataQueryBuilder<Employee>();

test('Filter with value operator', () => {
    //Arrange
    const expectValue = '$filter=salary eq 5000';

    //Act
    oDataQueryBuilder.clear();
    oDataQueryBuilder
        .filter(f => f.valueFilter(e => e.salary, ComparisonOperator.Equal, employee.salary));
        
    //Assert
    expect(oDataQueryBuilder.generate()).toEqual(expectValue);
});

test('Filter with string operator', () => {
    //Arrange
    const expectValue = '$filter=name.contains(\'Will\')';

    //Act
    oDataQueryBuilder.clear();
    oDataQueryBuilder
        .filter(f => f.stringFilter(e => e.name, StringOperator.Contains, employee.name));
        
    //Assert
    expect(oDataQueryBuilder.generate()).toEqual(expectValue);
});

test('Filter with null value', () => {
    //Arrange
    const expectValue = '';

    //Act
    oDataQueryBuilder.clear();
    oDataQueryBuilder
        .filter(f => f.valueFilter(e => e.age, ComparisonOperator.Equal, employee.age));
        
    //Assert
    expect(oDataQueryBuilder.generate()).toEqual(expectValue);
});