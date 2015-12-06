import "../src/utils/converters/filter"
import {SortValueConverter} from "../src/utils/converters/filter";
describe("converters", function(){
    describe("sort", function(){
        var sort = new SortValueConverter();
        it("should sort a array of strings ascending", () =>{
            var response = sort.toView(['a','c','d','b']);
            expect(response).toEqual(['a','b','c','d']);
        })
        it("should sort a array of object by a value key ascending", () => {
            var wrong = [{p: 'a'},{p: 'c'},{p: 'd'},{p: 'b'}]
            var right = [{p: 'a'},{p: 'b'},{p: 'c'},{p: 'd'}]
            var wrong2 = [{codigo:0,situacao:"NAO_MATRICULADO"},
                          {codigo:5,situacao:"FORMADO"},
                          {codigo:7,situacao:"DESLIGADO"},
                          {codigo:3,situacao:"CANCELADO"},
                          {codigo:8, situacao:"DESCONHECIDA"}]
            var right2 = [{codigo: 3, situacao: "CANCELADO"},
                          {codigo: 8, situacao: "DESCONHECIDA"},
                          {codigo: 7, situacao: "DESLIGADO"},
                          {codigo: 5, situacao: "FORMADO"},
                          {codigo: 0, situacao: "NAO_MATRICULADO"},
                        ]

            var response = sort.toView(wrong, 'asc', 'p')
            expect(response).toEqual(right)
            response = sort.toView(wrong2, 'asc', 'situacao')
            expect(response).toEqual(right2)
        })
        it("should sort a array of string in descending order", ()=> {
            var response = sort.toView(['a','c','d','b'], 'desc');
            var right = ['a','b','c','d']
            expect(response).toEqual(right.reverse());
        })
        it("should sort a array of object by a value key descending", () => {
            var wrong = [{p: 'a'},{p: 'c'},{p: 'd'},{p: 'b'}]
            var right = [{p: 'a'},{p: 'b'},{p: 'c'},{p: 'd'}]
            var response = sort.toView(wrong, 'desc', 'p')
            expect(response).toEqual(right.reverse())
        })

    })
});
