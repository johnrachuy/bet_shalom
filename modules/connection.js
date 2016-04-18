var connectionString = '';

if(process.env.DATABASE_URL !== undefined) {
    connectionString = process.env.DATABASE_URL + '?ssl=true';
} else {
    connectionString = 'postgres://dqqhueitqjswre:wgvCElpoXCoYBkANPhDXVYxjLp@ec2-23-21-215-184.compute-1.amazonaws.com:5432/dfdvljek5oqofi';
}

module.exports = connectionString;