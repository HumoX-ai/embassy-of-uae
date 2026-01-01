module.exports = {
  apps: [
    {
      name: "next-app",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      exec_mode: "fork",

      out_file: "/dev/null",
      error_file: "/dev/null",
      log_file: "/dev/null",
      merge_logs: false,

      env: {
        NODE_ENV: "production",
        NEXT_TELEMETRY_DISABLED: "1",
        NODE_OPTIONS: "--max-old-space-size=256",
        TMPDIR: "/dev/shm",
      },
    },
  ],
};
