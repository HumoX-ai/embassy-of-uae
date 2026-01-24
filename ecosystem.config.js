module.exports = {
  apps: [
    {
      name: "next-app",
      args: "start -H 0.0.0.0 -p 3000",
      script: ".next/standalone/server.js",
      cwd: "/var/www/embassy-of-uae",

      exec_mode: "fork",
      instances: 1,

      node_args: "--max-old-space-size=512",

      autorestart: true, // crash bo‘lsa restart
      max_memory_restart: "400M", // RAM oshsa restart
      restart_delay: 5000, // 5s kutib qayta turadi
      max_restarts: 15, // ketma-ket crash limiti
      exp_backoff_restart_delay: 100, // crash ko‘paysa delay oshadi

      watch: false,

      // 🔁 Agar app qotib qolsa ham vaqti-vaqti bilan tozalanadi
      cron_restart: "0 */6 * * *", // har 6 soatda restart

      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },

      out_file: "/home/app/.pm2/next-out.log",
      error_file: "/home/app/.pm2/next-error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      merge_logs: true,
    },
  ],
};
