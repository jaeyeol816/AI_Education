import {
	Entity,
	BaseEntity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToOne,
	JoinColumn,
	OneToMany,
	UpdateDateColumn,
	JoinTable, 
	ManyToMany,
	ManyToOne
} from 'typeorm';

import { Course } from './Course';
import { Submission } from './Submisssion';

@Entity('assignments')
export class Assignment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		unique: false,
		nullable: false,
	})
	name: string;

	@Column({
		unique: false,
		nullable: true,
	})
	text: string;

	@ManyToOne(
		() => Course,
		course => course.assignments,
		{ cascade: true, onDelete: 'SET NULL' }
	)
	@JoinColumn({
		name: 'course'
	})
	course: Course;

	@OneToMany(
		() => Submission,
		submissions => submissions.assignment
	)
	submissions: Submission[];

}