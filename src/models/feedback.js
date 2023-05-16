import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
name: 'Feedback',
tableName: 'Feedback',
columns: {
   id: {
   primary: true,
   type: 'int',
   generated: true,
   },
   text: {
   type: 'varchar',
   },
},

relations: {
   teacher: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: {
         name: 'teacher_id',
      },
      cascade: true,
      inverseSide: 'user',
   },
   student: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: {
         name: 'student_id',
      },
      cascade: true,
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