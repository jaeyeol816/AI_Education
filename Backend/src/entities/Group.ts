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
import { Course } from './Course';

@Entity('groups')	
export class Group extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		unique: false,
		nullable: true,
	})
	group_name: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@ManyToOne(
		() => Course,
		course => course.groups,
		{ cascade: true, onDelete: 'SET NULL' }
	)
	@JoinColumn({
		name: "course"
	})
	course: Course;

	@OneToMany(
		() => User,
		users => users.group
	)
	users: User[];
}