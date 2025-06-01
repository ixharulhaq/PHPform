-- Create Database
CREATE DATABASE IF NOT EXISTS miniProject;
USE miniProject;

-- Create Table
CREATE TABLE IF NOT EXISTS form_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    step1_name VARCHAR(255),
    step1_email VARCHAR(255),
    step2_address TEXT,
    step2_phone VARCHAR(50),
    step3_employment_status VARCHAR(100),
    credit_score INT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);