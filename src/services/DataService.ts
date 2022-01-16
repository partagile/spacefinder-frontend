import { SpaceComponent } from "../components/spaces/SpaceComponent";
import { Space } from "../model/Model";



export class DataService {
    public async getSpaces(): Promise<Space[]>{
        const result: Space[] = []
        result.push({
            location: 'Prince George',
            name: 'NHSC 9-320',
            spaceId: '123'
        })
        result.push({
            location: 'Vancouver',
            name: 'FRIE 141',
            spaceId: '1234'
        })
        result.push({
            location: 'Surrey',
            name: 'SMH 3-409',
            spaceId: '12345'
        })
        return result
    }
}