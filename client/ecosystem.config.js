module.exports = {
  apps: [
    {
      name: 'client',
      script: '.next/standalone/server.js',
      instance: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
