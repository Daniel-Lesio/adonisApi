class zzz{
    first(arg){
        console.log(arg)
    }
    second( test ){
        this.first(...arguments)
    }
}


const test = new zzz
test.second('testik')