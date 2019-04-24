module.exports = {
  apps: [{
    name: 'DMBS',
    script: './server/server.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: '18.191.13.142',
      key: '~/.ssh/SDC.pem',
      ref: 'origin/master',
      repo: 'https://github.com/ten-7/dd-component.git',
      path: '/home/ubuntu/Code/DBMS',
      'post-deploy': 'npm install && npm run maria_seed && pm2 startOrRestart ecosystem.config.js'
    }
  }
}