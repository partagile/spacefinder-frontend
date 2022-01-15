import { User } from '../model/Model'


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
}