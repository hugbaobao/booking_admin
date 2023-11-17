interface Basearr {
    [key: string | number]: string
}

export const objToArr = (baseobj: Basearr) => {
    let result = []
    for(let i in baseobj) {
        let arr = [] as any[]
        arr.push({
          name:i,
          url:baseobj[i]
        })
        result.push(arr)
      }
    return result  
}

 