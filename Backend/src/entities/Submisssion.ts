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

import { Assignment } from './Assignment';
import { User } from './User';

@Entity('submissions')
export class Submission extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		unique: false,
		nullable: true,
	})
	url: string;

	@ManyToOne(
		() => Assignment,
		assignment => assignment.submissions,
		{ cascade: true, onDelete: 'SET NULL' }
	)
	@JoinColumn({
		name: 'assignment'
	})
	assignment: Assignment;

	@ManyToOne(
		() => User,
		user => user.submissions,
		{ cascade: true, onDelete: 'CASCADE' },
	)
	@JoinColumn({
		name: 'user'
	})
	user: User;
}
