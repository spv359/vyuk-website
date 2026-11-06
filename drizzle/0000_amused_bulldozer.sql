CREATE TABLE `discovery_requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`work_email` text NOT NULL,
	`company` text NOT NULL,
	`workflow` text NOT NULL,
	`data_landscape` text,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
