type TUserType = {
    name: string,
    age:number
}

type TColorType = {
    color: string
}

// interface TEmployeeType extends TUserType {
//     color: string
// }

type TEmployeeType = TUserType & {
    color: string
}

const user: TEmployeeType = {
    color:"black",
    name:"Gurmeet",
    age: 4
}

function identity(arg:number):number {
    return arg
}

identity(8)

function Identity<T>(arg:T):T {
    return arg
}

Identity<number>(9)

function username<T>(name: T):T{
    return name
}
username("Khirwar")