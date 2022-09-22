import {
	Entity,
	BaseEntity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	JoinColumn,
	UpdateDateColumn,
	ManyToOne,
	ManyToMany,
	JoinTable,
	OneToMany
} from 'typeorm';

import { User } from './User';
import { Video } from './Video';
import { Group } from './Group';
import { Assignment } from './Assignment';

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
	code: string;

	@Column({
		unique: true,
		nullable: false,
	})
	ta_code: string;

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
		registered_users => registered_users.studying_courses,
	)
	registered_users: User[]

	@ManyToMany(
		() => User,
		registered_users => registered_users.ta_ing_courses,
	)
	ta_ing_users: User[]

	@OneToMany(
		() => Video,
		videos => videos.course,
	)
	videos: Video[];

	@OneToMany(
		() => Group,
		groups => groups.course,
	)
	groups: Group[];

	@OneToMany(
		() => Assignment,
		assignments => assignments.course,
	)
	assignments: Assignment[];
}