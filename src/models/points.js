/* eslint-disable prettier/prettier */
import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
name: 'Point',
tableName: 'Points',
columns: {
   id: {
   primary: true,
   type: 'int',
   generated: true,
   },
   point: {
   type: 'int',
   },
   comment: {
   type: 'varchar',
   nullable: true,
   },
},

relations: {
   subjects: {
      target: 'Subject',
      type: 'many-to-one',
      joinColumn: {
      name: 'subject_id',
      },
      inverseSide: 'subject',
   },
   teacher: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: {
         name: 'teacher_id'
      },
      cascade: true,
   },
   student: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: {
         name: 'student_id'
      },
      cascade: true,
   },
},
});
