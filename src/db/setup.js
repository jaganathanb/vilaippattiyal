// @flow
import path from 'path';
import { execSync } from 'child_process';

export function executeSeeds() {
  debugger; // eslint-disable-line no-debugger
  const migrationCmd = 'node -r babel-register node_modules/.bin/sequelize.cmd db:seed:all';

  const cmd = process.platform === 'win32' ? migrationCmd.replace(/\//g, '\\') : migrationCmd;

  execSync(cmd, {
    cwd: path.join(__dirname, '..', '..', 'src')
  });
}

export function executeMigrations() {
  const migrationCmd = 'node -r babel-register sequelize db:migrate:all';

  const cmd = process.platform === 'win32' ? migrationCmd.replace(/\//g, '\\') : migrationCmd;

  execSync(cmd, {
    cwd: path.join(__dirname, '..', '..', 'src')
  });
}
