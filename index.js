
let obj = {
    onChange(){
        console.log('obj...onchange')
    }
}
let { onChange } = obj


let obj2 = {
    ...obj
}

console.log(onChange === obj2.onChange)

obj2.onChange = () => {
    console.log('obj2...onchange')
    if (typeof onChange === 'function') {
        // onChange('.....')
    }
}
console.log(onChange === obj2.onChange)


onChange()
obj2.onChange()