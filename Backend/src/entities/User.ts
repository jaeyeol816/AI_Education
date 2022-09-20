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
	ManyToMany
} from 'typeorm';

import { Course } from './Course';


@Entity('users')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		unique: true,
		nullable: false,
	})
	email: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Column({
		unique: false,
		nullable: false,
	})
	password: string;

	@OneToMany(
		() => Course,
		owning_course => owning_course.owned_user,
	)
	owning_course: Course[];

	@ManyToMany(
		() => Course,
		studying_courses => studying_courses.registered_users,
	)
	@JoinTable({
		name: 'register'
	})
	studying_courses: Course[]

	@ManyToMany(
		() => Course,
		ta_ing_courses => ta_ing_courses.registered_users,
	)
	@JoinTable({
		name: 'ta'
	})
	ta_ing_courses: Course[]
}