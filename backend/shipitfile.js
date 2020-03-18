module.exports = shipit => {
  require("shipit-deploy")(shipit);

  shipit.initConfig({
    default: {
      dirToCopy: "backend",
      servers: "deploy@mso.onl",
      repositoryUrl: "git@github.com:kuehnert/link-shortener.git",
      keepReleases: 5,
      deleteOnRollback: false
    },
    staging: {
      deployTo: "/home/deploy/sites/linkshortener-backend-staging",
      branch: "staging"
    },
    production: {
      deployTo: "/home/deploy/sites/linkshortener-backend",
      branch: "master"
    }
  });

  shipit.on("deployed", () => {
    shipit.start("build");
    shipit.start("reload");
  });

  shipit.blTask("build", async () => {
    await shipit.copyToRemote(
      `.env.${shipit.config.branch}`,
      `${shipit.releasePath}/.env`
    );
    await shipit.remote(`cd ${shipit.releasePath} && npm install`);
    await shipit.remote(`cd ${shipit.releasePath} && npm run build`);
  });

  shipit.task("reload", async () => {
    await shipit.remote("sudo /home/deploy/bin/restart_linkshortener");
  });
};

/*
  /lib/systemd/system
  sudo systemctl daemon-reload
  sudo systemctl enable linkshortener-staging.service
  sudo systemctl status linkshortener-staging
*/
