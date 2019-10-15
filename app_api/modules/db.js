const mongoose = require('mongoose');

mongoose.connection.on('connected', () => { 
    console.log(`Mongoose connected to ${dbURI}`); 
    }); 
    mongoose.connection.on('error', err => { 
    console.log('Mongoose connection error:', err); 
    }); 
    mongoose.connection.on('disconnected', () => { 
    console.log('Mongoose disconnected'); 
    });

    var options = {
        useMongoClient: true,
        socketTimeoutMS: 0,
        keepAlive: true,
        reconnectTries: 30
      };
      
    let dbURI = 'mongodb://127.0.0.1/Riordan_Patrick_wf_project';
if (process.env.NODE_ENV === 'production') {
dbURI = process.env.MONGODB_URI;
}

        
    mongoose.connect (dbURI);

    const readLine = require ('readline');
    if (process.platform === 'win32'){
    const rl = readLine.createInterface ({
    input: process.stdin,
    output: process.stdout
    });
    rl.on ('SIGINT', () => {
    process.emit ("SIGINT");
    }); 
    }

    const gracefulShutdown = (msg, callback) => { 
        mongoose.connection.close( () => { 
        console.log(`Mongoose disconnected through ${msg}`); 
        callback(); 
        });
        };

        // For nodemon restarts
        process.once('SIGUSR2', () => { 
            gracefulShutdown('nodemon restart', () => { 
            process.kill(process.pid, 'SIGUSR2'); 
            });
            });
        // For app termination   
            process.on('SIGINT', () => { 
            gracefulShutdown('app termination', () => { 
            process.exit(0); 
            });
            });
        // For Heroku app termination    
            process.on('SIGTERM', () => { 
            gracefulShutdown('Heroku app shutdown', () => { 
            process.exit(0); 
            });
            });
            
        
            require('./games');