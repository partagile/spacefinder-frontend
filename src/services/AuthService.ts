import { User } from '../model/Model'


export class AuthService {

    public async login(userName: string, password: string):Promise<User | undefined> {
        if (userName === 'user' && password === 'password') {
            return {
                userName: 'username',
                email: 'someone@example.com'
            }

        } else {
            return undefined
        }
    }
}