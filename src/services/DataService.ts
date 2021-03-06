import { ICreateSpaceState } from "../components/spaces/CreateSpace";
import { Space, User } from "../model/Model";
import { S3, config } from "aws-sdk";
import { config as appConfig } from "./config";
import { generateRandomId } from "../utils/Utils";

config.update({
    region: appConfig.REGION
})


export class DataService {

    private user: User | undefined;
    private s3Client: S3 | undefined

        /**
     * Due to a bug, the s3 client doesn't load the credentials after they are created
     * Here we are initializing it lazily
     */
    private getS3Client():S3 {
        if (this.s3Client) {
            return this.s3Client
        } else {
            this.s3Client = new S3({
                region: appConfig.REGION
            }) 
            return this.s3Client;
        }
    }

    public setUser(user: User){
        this.user = user;
    }

    public async createSpace(iCreateSpace: ICreateSpaceState) {
        if (iCreateSpace.photo) {
            const photoUrl = await this.uploadPublicFile(
                iCreateSpace.photo,
                appConfig.SPACES_PHOTOS_BUCKET
            )
            iCreateSpace.photoURL = photoUrl;
            iCreateSpace.photo = undefined
        }
        const requestUrl = appConfig.api.spacesUrl;
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Authorization': this.getUserIdToken()
            },
            body: JSON.stringify(iCreateSpace)
        }
        console.log('POST request URL and request options')
        console.log(requestUrl)
        console.log(requestOptions)
        const result = await fetch(requestUrl, requestOptions);
        const resultJSON = await result.json();

        return JSON.stringify(resultJSON.id);
    }

    private async uploadPublicFile(file: File, bucket: string) {
        const fileName = generateRandomId() + file.name;
        const uploadResult = await new S3({ region: appConfig.REGION }).upload({
            Bucket: bucket,
            Key: fileName,
            Body: file,
            ACL: 'public-read'

        }).promise();
        return uploadResult.Location

    }

    private getUserIdToken(){
        if (this.user) {
            return this.user.cognitoUser.getSignInUserSession()!.getIdToken().getJwtToken()
        } else {
            return '';
        }
    }
    


    public async getSpaces(): Promise<Space[]> {
        if (this.user) {
            console.log(`Using authenticated token: ${this.getUserIdToken()}`)
            const requestUrl = appConfig.api.spacesUrl
            const requestResult = await fetch(
                requestUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': this.getUserIdToken()
                    }
                }
            );
            const responseJSON = await requestResult.json();
            return responseJSON;
        } else {
            return []
        }

    }


    public async reserveSpace(spaceId: string): Promise<string | undefined> {
        if (spaceId === '123') {
            return ('5555')
        } else {
            return undefined
        }
    }
}