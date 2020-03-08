module.exports = shipit => {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      deployTo: '/home/deploy/sites/sokratesapi',
      servers: 'deploy@marienschule.com',
      repositoryUrl: 'git@github.com:kuehnert/sokrates-backend.git',
      keepReleases: 5,
      deleteOnRollback: false,
    },
    staging: {
      deployTo: '/home/deploy/sites/sokratesapi-staging',
      branch: 'staging',
    },
    production: {
      deployTo: '/home/deploy/sites/sokratesapi',
      branch: 'master',
    },
  });

  shipit.on('deployed', () => {
    shipit.start('build');
    shipit.start('reload');
  });

  shipit.blTask('build', async () => {
    await shipit.copyToRemote(`.env.${shipit.config.branch}`, `${shipit.releasePath}/.env`);
    await shipit.remote(`cd ${shipit.releasePath} && npm install`);
    await shipit.remote(`cd ${shipit.releasePath} && npm run build`);
  });

  shipit.task('reload', async () => {
    await shipit.remote('sudo /home/deploy/bin/restart_sokratesapi');
  });
};

/*
  /lib/systemd/system
  sudo systemctl daemon-reload
  sudo systemctl enable sokratesapi-staging.service
  sudo systemctl status sokratesapi-staging
*/
