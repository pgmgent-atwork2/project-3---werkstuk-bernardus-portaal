/* eslint-disable prettier/prettier */
import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
name: 'Subject',
tableName: 'Subjects',
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
   users: {
   target: 'User',
   type: 'many-to-many',
   joinTable: {
      name: 'subjects_users',
   },
   cascade: true,
   },
   teacher: {
      target: 'User',
      type: 'many-to-many',
      joinTable: {
         name: 'teacher_id'
      },
      cascade: true,
   },
},

});
