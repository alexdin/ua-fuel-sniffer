
export const setValue = (key,value) => {
    localStorage.setItem(key,JSON.stringify(value))
}

export const getValue = (key) => {
   const value = localStorage.getItem(key)
    if(value == null) {
        return null
    }
    return  JSON.parse(value)
}

export const removeKey = (key) => {
    localStorage.removeItem(key)
}