-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS thoughtflow_journal_db;

-- Use the created database
USE thoughtflow_journal_db;

-- Drop tables if they exist
DROP TABLE IF EXISTS `journal_entry_mood`;
DROP TABLE IF EXISTS `journal_entry`;
DROP TABLE IF EXISTS `mood`;
DROP TABLE IF EXISTS `users`;

-- Create the users table first
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date_created` datetime(6) DEFAULT NULL,
  `date_updated` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `profile_image_url` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create the mood table
CREATE TABLE `mood` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_created` datetime(6) DEFAULT NULL,
  `date_updated` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create the journal_entry table
CREATE TABLE `journal_entry` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date_created` datetime(6) DEFAULT NULL,
  `date_updated` datetime(6) DEFAULT NULL,
  `ai_response` text,
  `content` text,
  `image_uri` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjar9l3glg5avy0aqnbscs8xh5` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create the journal_entry_mood table last
CREATE TABLE `journal_entry_mood` (
  `journal_entry_id` bigint NOT NULL,
  `mood_id` bigint NOT NULL,
  PRIMARY KEY (`journal_entry_id`,`mood_id`),
  KEY `FK_mood` (`mood_id`),
  CONSTRAINT `FK_journal_entry` FOREIGN KEY (`journal_entry_id`) REFERENCES `journal_entry` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_mood` FOREIGN KEY (`mood_id`) REFERENCES `mood` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;