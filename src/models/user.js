import { EntitySchema } from 'typeorm';

export default new EntitySchema({
name: 'User',
tableName: 'users',
columns: {
   id: {
      primary: true,
      type: 'int',
      generated: true,
   },
   email: {
      type: 'varchar',
   },
   firstname: {
      type: 'varchar',
   },
   lastname: {
      type: 'varchar',
   },
   username: {
      type: 'varchar',
   },
   password: {
      type: 'varchar',
   },
   age: {
      type: 'int',
   },
   phone: {
      type: 'int',
   },
   address: {
      type: 'varchar',
   },
   country: {
      type: 'varchar',
   },
   city: {
      type: 'varchar',
   },
   level: {
      type: 'varchar',
   }
},
relations: {
   roles: {
      target: 'Role',
      type: 'many-to-one',
      joinColumn: {
         name: 'role_id',
      },
      inverseSide: 'user',
   },
   subjects: {
      target: 'Subject',
      type: 'many-to-one',
      joinColumn: {
         name: 'subject_id',
      },
      inverseSide: 'Subjects',
   },
},
});
