// jwks user to fetch jwks which publicly present to verify private key 
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import axios from "axios";
import crypto from "crypto";
import { User } from "../models/user.model.js";
import { error } from "console";

const getJwksKeys = () => {
    const jwks = jwksClient({
        jwksUri: process.env.GOOGLE_JWKS_URL, // fetch keys from google
        cache: true,
        rateLimit:true //limit the rate of requests
    });

    // console.log("getJwk:", jwks);
    return jwks
}

const getPublicKeyById = async (kid) => {
    const client = getJwksKeys();
    // getSigningKey fetch the public key which match with the KeyId
    return new Promise((resolve, reject) => {
        client.getSigningKey(kid, (err, key) => {
            if(err){
                // console.log("getSigningKey::error", err);
                return reject(err)
            }

            const signingKey = key.getPublicKey();
            resolve(signingKey);
        });
    });
};

const verifyPrivateGoogleToken = async (token) => {
    try {
        // decode the jwt token 
        // jwt token has three parts: header.payload.signature
        // decode separates the header and payload
        const decodedToken = jwt.decode(token, {complete:true});
        // complete true to return all part of jwt not only payloads

        if(!decodedToken){
            throw new Error("Invalid token");
        }

        // get kid from header and fetch the signing key(same as secure key to decode jwt token)
        const kid = decodedToken.header.kid;
        const signingKey = await getPublicKeyById(kid);

        // verify the private token using public token

        const verifiedToken = jwt.verify(token, signingKey,
            {
                algorithms: ["RS256"],
                audience: process.env.GOOGLE_CLIENT_ID
            }
        );
        // console.log("done3")
        return verifiedToken

    } catch (error) {
        // console.log("Error verifying token:", error);
        throw new Error("Token verification failed");
    }
}

// Redirect user to google login
const googleLogin = (req, res) => {
    const state = crypto.randomBytes(32).toString("hex");
    const nonce = crypto.randomBytes(32).toString("hex");

    res.cookie("oauth_state", state, {
        httpOnly: true,
        maxAge: 600000,
        sameSite: "lax"
    });
    res.cookie("oauth_nonce", nonce, {
        httpOnly: true,
        maxAge: 600000,
        sameSite: "lax"
    });

    const redirectUri = encodeURIComponent(process.env.GOOGLE_REDIRECT_URL);

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile%20openid&state=${state}&nonce=${nonce}`;

    console.log("Redirecting to Google Auth URL:", googleAuthUrl);

    res.redirect(googleAuthUrl);
};


// Handle google callback and exchange the code for token
const googleCallback = async (req, res) => {
    try {
        const {code, state} = req.query;
        // console.log("done2")
        const savedState = req.cookies.oauth_state;
        const savedNonce = req.cookies.oauth_nonce;
        res.clearCookie("oauth_state");
        res.clearCookie("oauth_nonce");

        // verify the state
        if(!state || !savedState || state!==savedState){
            return res.status(401).json({message:"Invalid state"});
        }
        // console.log("done7")
        // exchange the code for google token
        const googleTokenResponse = await axios.post(
            "https://oauth2.googleapis.com/token",
            null,
            {
                params:{
                    client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URL,
                code,
                grant_type: "authorization_code",
                },
            }
        );

        const {id_token, refresh_token} = googleTokenResponse.data;
        // console.log("done4")
        if(!id_token){
            return res.status(401).json({
                message: "Invalid Id token"
            })
        };

        // Verify the private token
        const decodedToken = await verifyPrivateGoogleToken(id_token);
        // console.log("done5")
        // verify the nonce
        if(!decodedToken.nonce || !savedNonce || decodedToken.nonce!==savedNonce){
            return res.status(401).json({message:"Invalid nonce"});
        };

        // console.log("DecodedToken: ", decodedToken);
        // find user in db
        let user = await User.findOne({email:decodedToken.email});

        // create user

        if(!user){
            const [firstName, ...rest] = decodedToken.name.split(" ");
            const lastName = rest.join(" "); 
            
            user = await User.create({
                googleId: decodedToken.sub,
                email: decodedToken.email,
                profilePicture:decodedToken.picture,
                firstName,
                lastName,
                isVerified:decodedToken.email_verified,
                refreshToken: null,
            });
        }else{
            if(!user.googleId){
                // console.log("already register with email and password");
                throw Error("a7X9vB2qLmTZ0kPf")
            }
        }

        // console.log("UserData: ", user);
        // generate own refresh token
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save();
        
        // console.log("successful")
        return res.redirect(`http://localhost:5173/auth/google/oauth/success/${refreshToken}`);
    } catch (error) {
        // console.log("OAuth Callback Error:",error.message);
        if(error.message==='a7X9vB2qLmTZ0kPf'){
            res.redirect(`http://localhost:5173/auth/google/oauth/success/a7X9vB2qLmTZ0kPf`);
        }
    } 
};

export {googleLogin, googleCallback}