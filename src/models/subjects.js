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
   user: {
   target: 'User',
   type: 'one-to-many',
   cascade: true,
   inverseSide: 'user',
   },
   teachers: {
      target: 'User',
      type: 'many-to-many',
      joinTable: {
         name: 'subjects_teachers',
      },
      cascade: true,
   },
},
});