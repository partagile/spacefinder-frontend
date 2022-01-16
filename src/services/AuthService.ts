import { User, UserAttribute } from '../model/Model'


export class AuthService {

    public async login(emailAddress: string, password: string):Promise<User | undefined> {
        if (emailAddress === 'user@example.com' && password === 'password') {
            return {
                userName: 'user@example.com',
                email: 'user@example.com'
            }

        } else {
            return undefined
        }
    }

    public async getUserAttributes(user: User):Promise<UserAttribute[]>{
        const result: UserAttribute[] = [];
        result.push({
            Name: 'Description',
            Value: 'Description Value'
        })
        result.push({
            Name: 'Title',
            Value: 'Title value'
        })        
        result.push({
            Name: 'Stats',
            Value: 'Stats Value'
        })        
        result.push({
            Name: 'Bear',
            Value: 'Bear Value'
        })       
        return result;
    }
}