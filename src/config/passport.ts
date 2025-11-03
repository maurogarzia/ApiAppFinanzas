import { User } from "@/models/Users";
import { UserRepository } from "@/repositories/UserRepository";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const userRespository = new UserRepository()

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.GOOGLE_CALBACK_URL!,
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                const existingUser = await userRespository.findByGoogleId(profile.id)
                if (existingUser) return done(null, existingUser)

                const newUser = await User.create({
                    fullName: profile.displayName,
                    email: profile.emails?.[0].value,
                    googleId: profile.id,
                    avatar: profile.photos?.[0].value,
                    provider: 'google',
                })

                return done(null, newUser)
            } catch (error) {
                return done(error, false)
            }
        }
    )
)

passport.serializeUser((user: any, done) => done(null, user.id)) 
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err))
})

export default passport