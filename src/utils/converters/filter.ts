export class FilterValueConverter {
    toView(array:{}[], property: string, exp: string) {
        if(array === undefined || array === null || property === undefined || exp === undefined){
            return array;
        }
        return array.filter((item)=> item[property].toLowerCase().indexOf(exp.toLocaleLowerCase()) > -1)
    }
}

export class SortValueConverter {
    /**
     * Return a sorted array
     * @param  {Array<string>|Array<Object>} array    Array of strings or array of objects
     * @param  {string}             order      *asc* for ascending order *desc* for descenting order
     * @param  {string}             property  The property of the object in array to compare. If is a object
     * @return {Array}             The array sorted
     */
    toView(array:Array<string>|Array<Object>, order?: string, property?: string) {
        // Default order = asc
        if(order === undefined){
            order = 'asc'
        }
        if(array === undefined || array === null){
            return array;
        }

        if(property === undefined && order === 'asc'){
            return array.sort()
        }else if(property === undefined && order === 'desc'){
            return array.sort().reverse()
        }

        if(order == 'asc'){
          var n = array.sort((a,b) => a[property].localeCompare(b[property]))
          return n
        }else if(order == 'desc'){
            return array.sort((a,b) => -a[property].localeCompare(b[property]) )
        }else{
            window.console.error("Expression for filter order should be 'asc' or 'desc'")
        }

    }
}
