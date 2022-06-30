const config ={
    env: process.env.NODE_ENV || 'development', // differentiate btwn dev and production modes
    port: process.env.PORT || 3001, //listing port of the server
    jwtSecret: process.env.JWT_SECRET || "Your_secret_key", 
    mongoUri: process.env.MONGO_HOST || 'mongodb://'+(process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/mernproject' // location of Mongodb instance
}

export default config