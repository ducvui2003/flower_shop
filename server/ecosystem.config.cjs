module.exports = {
  apps: [
    {
      name: 'server',
      script: 'dist/main.js',
      instance: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
