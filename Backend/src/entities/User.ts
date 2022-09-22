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

	@Column({
		unique: false,
		nullable: false,
	})
	password: string;

	@Column({
		unique: false,
		nullable: false,
	})
	name: string;

	//자동생성컬럼
	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;


	//관계 관련 컬럼
	@ManyToMany(
		() => Course,
		studying_courses => studying_courses.registered_users,
		{ cascade: true }
	)
	@JoinTable({
		name: 'register'
	})
	studying_courses: Course[]

	@OneToMany(
		() => Course,
		owning_course => owning_course.owned_user
	)
	owning_course: Course[];

	@ManyToMany(
		() => Course,
		ta_ing_courses => ta_ing_courses.ta_ing_users,
		{cascade: true}
	)
	@JoinTable({
		name: 'ta'
	})
	ta_ing_courses: Course[];
}