//connectionsString for Heroku database
//var connectionString = '';
//
//if(process.env.DATABASE_URL !== undefined) {
//    connectionString = process.env.DATABASE_URL + '?ssl=true';
//} else {
//    connectionString = 'postgres://dqqhueitqjswre:wgvCElpoXCoYBkANPhDXVYxjLp@ec2-23-21-215-184.compute-1.amazonaws.com:5432/dfdvljek5oqofi';
//}
//
//module.exports = connectionString;



//connectionsString for localhost database
var connectionString = '';

if(process.env.DATABASE_URL !== undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/bet_shalom';
}

module.exports = connectionString;