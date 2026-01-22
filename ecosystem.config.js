module.exports = {
  apps: [
    {
      name: "next-app",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 0.0.0.0 -p 3000",
      exec_mode: "fork",
      instances: 1,

      node_args: "--max-old-space-size=512",

      max_memory_restart: "400M",

      out_file: "/var/log/pm2/next-out.log",
      error_file: "/var/log/pm2/next-error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
