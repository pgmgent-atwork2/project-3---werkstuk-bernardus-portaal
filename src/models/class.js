import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
name: 'Class',
tableName: 'Class',
columns: {
   id: {
   primary: true,
   type: 'int',
   generated: true,
   },
   nameClass: {
   type: 'varchar',
   },
},

relations: {
   teacher: {
      target: 'User',
      type: 'one-to-one',
      joinColumn: {
         name: 'teacher_id',
      },
      cascade: true,
      inverseSide: 'user',
   },
   student: {
      target: 'User',
      type: 'one-to-one',
      joinColumn: {
         name: 'student_id',
      },
      cascade: true,
      inverseSide: 'user',
   },
   }
});