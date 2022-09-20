import {
	Entity,
	BaseEntity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToOne,
	JoinColumn,
	UpdateDateColumn,
	OneToMany,
	ManyToOne,
	ManyToMany
} from 'typeorm';

import { User } from './User';

@Entity('courses')
export class Course extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		unique: true,
		nullable: false,
	})
	name: string;

	@Column({
		unique: true,
		nullable: false,
	})
	code: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@ManyToOne(
		() => User,
		owned_user => owned_user.owning_course,
		{ cascade: true, onDelete: 'SET NULL' },
	)
	@JoinColumn({
		name: 'owned_user',
	})
	owned_user: User;

	@ManyToMany(
		() => User,
		registered_users => registered_users.studying_courses
	)
	registered_users: User[]

	@ManyToMany(
		() => User,
		registered_users => registered_users.ta_ing_courses
	)
	ta_ing_users: User[]
}