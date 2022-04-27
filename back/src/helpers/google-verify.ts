const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async (tokenId: string = '') => {
    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        // Specify the CLIENT_ID of the app that accesses the backend
        audience: process.env.GOOGLE_CLIENT_ID,  

    });
    console.log(ticket);
    const { name, family_name: surname, picture: img, email } = ticket.getPayload();

    return { name, surname, img, email };
}

export {
    googleVerify
}