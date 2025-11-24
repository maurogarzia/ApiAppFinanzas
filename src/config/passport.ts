import { User } from "@/models/Users";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
    new GoogleStrategy(
        {
            clientID : process.env.GOOGLE_CLIENT_ID!,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "/appFinance/auth/google/callback",
        },
        async (_accessToken: any, _refreshToken: any, profile: any, done: any) => {
            try {
                const email = profile.emails?.[0].value

                let user = await User.findOne({email})

                if (!user) {
                    user = await User.create({
                        fullName: profile.displayName,
                        email,
                        avatar: profile.photos?.[0].value,
                        googleId: profile.id,
                        provider: 'google',
                        role: 'user',
                    })
                }

                return done(null, user)
            } catch (error) {
                return done(error, false)
            }
        }
    )
)

// Pasa usuario a req.user
passport.serializeUser((user: any, done) => done(null, user.id))
passport.deserializeUser(async (id : string, done) => {
    const user = await User.findById(id)
    done(null, user)
})

export default passport