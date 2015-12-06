export class NumberValueConverter {
    fromView(value){
        if(value == undefined || value == null){
            return value
        }
        try {
            return value | 0
        }catch (ex) {
            console.debug(ex)
            return value
        }
    }
    toView(value){
        if(value == undefined || value == null){
            return value
        }else{
            return value.toString()
        }
    }

}