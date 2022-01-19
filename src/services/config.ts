
const spacesUrl = 'https://q68651sk71.execute-api.us-west-2.amazonaws.com/prod'

export const config = {
    REGION: 'us-west-2',
    USER_POOL_ID: 'us-west-2_ntoyPoIN1',
    APP_CLIENT_ID: '6otvml2idkamc9e2pn6l19q9lv',
    IDENTITY_POOL_ID: 'us-west-2:d033c78d-9b5f-434c-a9f9-fe8186f915a5',
    SPACES_PHOTOS_BUCKET: 'spacefinderz-photos-0abb7079cdb5',
    TEST_USER_NAME: 'hello',
    TEST_USER_PASSWORD: '5EApCsq&',
    api: {
        baseUrl: spacesUrl,
        spacesUrl: `${spacesUrl}/spaces`
    }
}