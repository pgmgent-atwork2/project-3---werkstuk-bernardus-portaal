/* eslint-disable prettier/prettier */
import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: `Class`,
  tableName: 'Class',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
  },

  relations: {
    user: {
      target: 'User',
      type: 'one-to-many',
      cascade: true,
      inverseSide: 'class',
    },
  },
});
