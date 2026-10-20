import * as migration_20261020_153155_initial from './20261020_153155_initial';

export const migrations = [
  {
    up: migration_20261020_153155_initial.up,
    down: migration_20261020_153155_initial.down,
    name: '20261020_153155_initial'
  },
];
