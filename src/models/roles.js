/* eslint-disable prettier/prettier */
import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
name: 'Role',
tableName: 'Roles',
columns: {
   id: {
   primary: true,
   type: 'int',
   generated: true,
   },
   label: {
   type: 'varchar',
   },
},

relations: {
   users: {
   target: 'User',
   type: 'one-to-many',
   inverseSide: 'users',
   },
},
});