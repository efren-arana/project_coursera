//cambiar url de la base de datos por una variable en el servidor heroku
export const environment = {
    port: process.env.PORT || 5000,
    url : process.env.MONGODB_URL || 'mongodb+srv://dbProjectEfren:12345@cluster0-cqwe4.mongodb.net/user-registration-db',
    JWT_KEY: process.env.JWT_KEY || 'WinterIsComingGOT2019'
}