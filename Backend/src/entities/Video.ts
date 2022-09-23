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

import { Course } from './Course';

@Entity('videos')
export class Video extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		unique: true,
		nullable: false,
	})
	name: string;

	@Column({
		unique: false,
		nullable: true,
	})
	url: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@ManyToOne(
		() => Course,
		course => course.videos,
		{ cascade: true, onDelete: 'SET NULL' }
	)
	course: Course;

}