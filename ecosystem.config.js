module.exports = {
  apps: [{
    name: 'App10M',
    script: './server/server.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: '3.14.127.248',
      key: '~/.ssh/SDC.pem',
      ref: 'origin/master',
      repo: 'https://github.com/ten-7/dd-component.git',
      path: '/home/ubuntu/Code/DBMS',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}