-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2025 at 02:45 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `capstone1`
--

-- --------------------------------------------------------

--
-- Table structure for table `loan_applications`
--

CREATE TABLE `loan_applications` (
  `id` int(11) NOT NULL,
  `cb_number` varchar(50) NOT NULL,
  `application_no` varchar(50) NOT NULL,
  `date_of_application` date NOT NULL,
  `account_no` varchar(50) DEFAULT NULL,
  `coop_id_no` varchar(50) DEFAULT NULL,
  `contact_no` varchar(50) DEFAULT NULL,
  `member_name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `spouse_name` varchar(255) DEFAULT NULL,
  `loan_type` enum('Salary','Regular/Agricultural','Bonuses') NOT NULL,
  `purpose` enum('Emergency','Providential','Agricultural','Farm Equipment','Crop Production','Others') NOT NULL,
  `security_offered` text DEFAULT NULL,
  `loan_amount` decimal(10,2) NOT NULL,
  `annual_income` decimal(10,2) DEFAULT NULL,
  `source_of_income` varchar(255) DEFAULT NULL,
  `signature_borrower` varchar(255) DEFAULT NULL,
  `signature_spouse` varchar(255) DEFAULT NULL,
  `signature_co_maker` varchar(255) DEFAULT NULL,
  `date_accomplish` date DEFAULT NULL,
  `paid_up_capital` decimal(10,2) DEFAULT NULL,
  `previous_loan` decimal(10,2) DEFAULT NULL,
  `outstanding_balance` decimal(10,2) DEFAULT NULL,
  `cbu_status` enum('Updated','Not Updated') NOT NULL,
  `borrower_category` enum('New Member','New Borrower','Old Member','Old Borrower') NOT NULL,
  `loan_balance_status` enum('With O/B Balance','Current','Restructured','Past Due','Others') NOT NULL,
  `loan_amount_recommended` decimal(10,2) DEFAULT NULL,
  `recommended_by` varchar(255) DEFAULT NULL,
  `recommendation_date` date DEFAULT NULL,
  `approval_status` enum('Pending','Approved','Disapproved') DEFAULT 'Pending',
  `approved_amount` decimal(10,2) DEFAULT NULL,
  `approval_date` date DEFAULT NULL,
  `approved_by` varchar(255) DEFAULT NULL,
  `operation_manager` varchar(255) DEFAULT NULL,
  `general_manager` varchar(255) DEFAULT NULL,
  `credit_committee_approval` enum('Pending','Approved','Disapproved') DEFAULT 'Pending',
  `credit_committee_remarks` text DEFAULT NULL,
  `gm_approval` enum('Pending','Approved','Disapproved') DEFAULT 'Pending',
  `gm_remarks` text DEFAULT NULL,
  `overall_remarks` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` varchar(50) DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loan_applications`
--

INSERT INTO `loan_applications` (`id`, `cb_number`, `application_no`, `date_of_application`, `account_no`, `coop_id_no`, `contact_no`, `member_name`, `address`, `spouse_name`, `loan_type`, `purpose`, `security_offered`, `loan_amount`, `annual_income`, `source_of_income`, `signature_borrower`, `signature_spouse`, `signature_co_maker`, `date_accomplish`, `paid_up_capital`, `previous_loan`, `outstanding_balance`, `cbu_status`, `borrower_category`, `loan_balance_status`, `loan_amount_recommended`, `recommended_by`, `recommendation_date`, `approval_status`, `approved_amount`, `approval_date`, `approved_by`, `operation_manager`, `general_manager`, `credit_committee_approval`, `credit_committee_remarks`, `gm_approval`, `gm_remarks`, `overall_remarks`, `created_at`, `updated_at`, `status`) VALUES
(17, 'Jen123', '12345', '2025-03-04', NULL, NULL, '09517412165', 'Jenilyn Zaulda', 'Batino Calapan, City', NULL, 'Regular/Agricultural', 'Emergency', NULL, 12000.00, 8000.00, 'work', 'dagvfsdbfdbzg', NULL, NULL, NULL, NULL, NULL, NULL, 'Updated', 'New Member', 'With O/B Balance', NULL, NULL, NULL, 'Pending', NULL, NULL, NULL, NULL, NULL, 'Pending', NULL, 'Pending', NULL, NULL, '2025-03-06 10:52:43', '2025-03-06 10:52:43', 'Pending'),
(18, 'Myrna123', '54321', '2025-03-08', NULL, NULL, '09517412165', 'Myrna Abrigante', 'Sta. Rita. Calapan City', NULL, 'Regular/Agricultural', 'Emergency', NULL, 12000.00, 8000.00, 'work', 'dagvfsdbfdbzg', NULL, NULL, NULL, NULL, NULL, NULL, 'Updated', 'New Member', 'With O/B Balance', NULL, NULL, NULL, 'Pending', NULL, NULL, NULL, NULL, NULL, 'Pending', NULL, 'Pending', NULL, NULL, '2025-03-08 12:16:44', '2025-03-08 12:16:44', 'Pending'),
(19, 'Jen123', '234', '2025-10-03', NULL, NULL, '09517412165', 'Jenilyn Zaulda', 'Batino Calapan, City', NULL, 'Regular/Agricultural', 'Others', NULL, 30000.00, 10000.00, 'wsosssssrsssssssssssssssssskssssssss', 'fgdg', NULL, NULL, NULL, NULL, NULL, NULL, 'Updated', 'New Member', 'With O/B Balance', NULL, NULL, NULL, 'Pending', NULL, NULL, NULL, NULL, NULL, 'Pending', NULL, 'Pending', NULL, NULL, '2025-03-10 07:31:38', '2025-03-10 07:31:38', 'Pending'),
(20, 'Jen123', '543', '2025-03-10', NULL, NULL, '09517412165', 'Jenilyn Zaulda', 'Batino Calapan, City', NULL, 'Regular/Agricultural', 'Emergency', NULL, 30000.00, 10000.00, 'work', 'fgdg', NULL, NULL, NULL, NULL, NULL, NULL, 'Updated', 'New Member', 'With O/B Balance', NULL, NULL, NULL, 'Pending', NULL, NULL, NULL, NULL, NULL, 'Pending', NULL, 'Pending', NULL, NULL, '2025-03-10 08:16:49', '2025-03-10 08:16:49', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `cb_number` varchar(50) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `address` text NOT NULL,
  `dob` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `beneficiaries` text DEFAULT NULL,
  `emergency_name` varchar(255) NOT NULL,
  `emergency_relationship` varchar(100) NOT NULL,
  `emergency_address` text NOT NULL,
  `emergency_contact` varchar(20) NOT NULL,
  `date_issued` date DEFAULT NULL,
  `nickname` varchar(100) DEFAULT NULL,
  `civil_status` varchar(50) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `place_of_birth` varchar(255) DEFAULT NULL,
  `nationality` varchar(100) DEFAULT NULL,
  `religion` varchar(100) DEFAULT NULL,
  `spouse_name` varchar(255) DEFAULT NULL,
  `spouse_age` int(11) DEFAULT NULL,
  `spouse_occupation` varchar(255) DEFAULT NULL,
  `father_name` varchar(255) DEFAULT NULL,
  `mother_name` varchar(255) DEFAULT NULL,
  `parent_address` text DEFAULT NULL,
  `number_of_children` int(11) DEFAULT NULL,
  `children_info` text DEFAULT NULL,
  `educational_attainment` varchar(255) DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `other_income` varchar(255) DEFAULT NULL,
  `annual_income` decimal(15,2) DEFAULT NULL,
  `elementary_school` varchar(255) DEFAULT NULL,
  `elementary_address` varchar(255) DEFAULT NULL,
  `elementary_year_graduated` year(4) DEFAULT NULL,
  `secondary_school` varchar(255) DEFAULT NULL,
  `secondary_address` varchar(255) DEFAULT NULL,
  `secondary_year_graduated` year(4) DEFAULT NULL,
  `college_school` varchar(255) DEFAULT NULL,
  `college_address` varchar(255) DEFAULT NULL,
  `college_year_graduated` year(4) DEFAULT NULL,
  `vocational_school` varchar(255) DEFAULT NULL,
  `vocational_address` varchar(255) DEFAULT NULL,
  `vocational_year_graduated` year(4) DEFAULT NULL,
  `membership_date` date DEFAULT NULL,
  `cooperative_position` varchar(255) DEFAULT NULL,
  `emergency_contact_name` varchar(255) DEFAULT NULL,
  `emergency_contact_address` text DEFAULT NULL,
  `relation` varchar(255) DEFAULT NULL,
  `agrarian_beneficiary` enum('Yes','No') DEFAULT NULL,
  `farm_area` decimal(10,2) DEFAULT NULL,
  `farm_type` enum('Irrigated','Rainfed') DEFAULT NULL,
  `is_tenant` enum('Yes','No') DEFAULT NULL,
  `recruited_by` varchar(255) DEFAULT NULL,
  `signature` varchar(255) DEFAULT NULL,
  `signed_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `cb_number`, `first_name`, `middle_name`, `last_name`, `profile_picture`, `address`, `dob`, `email`, `gender`, `contact_number`, `beneficiaries`, `emergency_name`, `emergency_relationship`, `emergency_address`, `emergency_contact`, `date_issued`, `nickname`, `civil_status`, `age`, `place_of_birth`, `nationality`, `religion`, `spouse_name`, `spouse_age`, `spouse_occupation`, `father_name`, `mother_name`, `parent_address`, `number_of_children`, `children_info`, `educational_attainment`, `occupation`, `other_income`, `annual_income`, `elementary_school`, `elementary_address`, `elementary_year_graduated`, `secondary_school`, `secondary_address`, `secondary_year_graduated`, `college_school`, `college_address`, `college_year_graduated`, `vocational_school`, `vocational_address`, `vocational_year_graduated`, `membership_date`, `cooperative_position`, `emergency_contact_name`, `emergency_contact_address`, `relation`, `agrarian_beneficiary`, `farm_area`, `farm_type`, `is_tenant`, `recruited_by`, `signature`, `signed_date`) VALUES
(1, 'pot123', 'Pot', 'Pat', 'Pit', NULL, 'Sta. Rita. Calapan City', '2000-12-12', 'Pat@gmail.com', 'Male', '09517412166', NULL, '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Lai123', 'LAIREEN', 'Alias', 'ABRIGANTE', NULL, 'Sta. Rita. Calapan City', '2003-12-08', 'laireenabrigante02@gmail.com', 'Female', '09517412165', NULL, '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Eman123', 'Emmanuel', 'Manalo', 'Abrigante', NULL, 'Sta. Rita Calapan ', '1979-06-02', 'laireenabrigante@gmail.com', 'Male', '09287032144', NULL, 'Myrna Abrigante', 'Wife', 'Sta. Rita. Calapan City', '09517412165', '2025-02-19', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'John123', 'John', 'Alias', 'Abrigante', NULL, 'SXSXX', '2000-12-12', 'laireen@gmail.com', 'Male', '09517412165', NULL, 'dfacsdc', 'wdfwdcdw', 'wdfwdwdc', '09876543212', '2025-12-12', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'Kai123', 'Kaizah', 'Manalo', 'Luzon', NULL, 'Sta. Rita. Calapan City', '2000-12-12', 'pangit@gmail.com', 'Female', '09517412165', NULL, 'qwdqsdq', 'qshdqsd', 'asdsadED', '09876543212', '2025-02-21', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 'Jen123', 'Jenilyn', 'Wangit', 'Zaulda', NULL, 'Batino Calapan, City', '2004-04-21', 'zauldajenilyn08@gmail.com', '', '09456198050', NULL, 'Cristina', 'Mother', 'Batino Calapan, City', '09365022798', '2024-12-12', 'Jen', 'Single', 20, 'Batino ', 'Filipino', 'Christian', 'sfcdc', 19, 'wfewfwf', 'Rolly', 'Christian', 'Batino Calapan, City', 3, 'fvsfaagagfsdgdb', 'ADFSFDSDF', 'fsfg', '12000', 12445.00, 'Sta. Rita. elementary School', 'Sta. Rita. Calapan City', '2015', 'Canubing Natinal High School', 'labiang 2', '2021', 'Mindoro State University', 'Masipit', '2025', 'N/A', 'labiang 2', '0000', '2024-12-12', 'member', 'reyven manalo', 'Batino Calapan, City', 'DGMGJM', 'Yes', 1.00, 'Rainfed', 'Yes', 'eefDFf', 'wfgasfgasfgfd', '2025-03-01'),
(18, 'Pau123', 'Pau', 'A.', 'Abrigante', NULL, 'Sta. Rita. Calapan City', '2003-12-12', 'zauldajenilyn@gmail.com', '', '09517412165', NULL, 'ABRIGANTE, LAIREEN MAE ALIAS', 'Wife', 'Sta. Rita. Calapan City', '09517412165', '2024-12-12', 'Pau', 'Single', 21, 'Provincial', 'Filipino', 'Christian', 'sfcdc', 12, 'wfewfwf', 'Emman', 'Myrna', 'Sta. Rita. Calapan City', 2, 'oiyru6t6rditf', 'ADFSFDSDF', 'fsfg', '12000', 121344.00, 'Sta. Rita. elementary School', 'Sta. Rita. Calapan City', '2015', 'Canubing Natinal High School', 'Sta. Rita. Calapan City', '2021', 'Mindoro State University', 'Sta. Rita. Calapan', '2025', 'N/A', 'Sta. Rita. Calapan City', '0000', '2025-03-04', 'member', NULL, NULL, 'DGMGJM', 'Yes', 1.00, 'Irrigated', 'Yes', 'dfsgfsgfsg', 'FDFSDCFDS', '2025-03-04'),
(20, 'Myrna123', 'Myrna', 'Alias', 'Abrigante', NULL, 'Sta. Rita. Calapan City', '1979-11-12', 'Myrna@gmail.com', 'Female', '09517412165', NULL, 'ABRIGANTE, LAIREEN MAE ALIAS', 'Wife', 'Sta. Rita. Calapan City', '09517412165', '2025-03-08', 'Myrna', 'Single', 45, 'Provincial', 'Filipino', 'Christian', 'sfcdc', 12, 'wfewfwf', 'Emman', 'Myrna', 'Sta. Rita. Calapan City', 2, 'rhetsjsfnfsn', 'ADFSFDSDF', 'fsfg', '12000', 121344.00, 'Sta. Rita. elementary School', 'Sta. Rita. Calapan City', '2015', 'Canubing Natinal High School', 'Sta. Rita. Calapan City', '2021', 'Mindoro State University', 'Sta. Rita. Calapan', '2025', 'N/A', 'Sta. Rita. Calapan City', '0000', '2025-03-08', 'member', NULL, NULL, 'DGMGJM', 'Yes', 1.00, 'Irrigated', 'Yes', 'dfsgfsgfsg', 'FDFSDCFDS', '2025-03-08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `cb_number` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','member') NOT NULL DEFAULT 'member',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reset_token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `cb_number`, `password`, `role`, `created_at`, `reset_token`) VALUES
(3, 'ADMIN_NEW', '$2b$10$x0c0qGvm./6rJ4d4wY0fiunI7zgztEvutPN6TGEWJ.dNOGqhJc8ka', 'admin', '2025-02-16 01:57:41', NULL),
(17, 'pot123', '$2b$10$6yvuHkeX5UvTfrEPAxYnTO7lQ8P5wyvWFmZKLiSxuVnknF0JwrOhm', 'member', '2025-02-17 23:58:00', NULL),
(21, 'Lai123', '$2b$10$Wcig0cBjf0yKi.7kK5mLo.FPGcPm9MuKQ4FrMo/3WfpYXUBV2tTai', 'member', '2025-02-18 00:44:00', '5xcrtl02yjf'),
(25, 'Eman123', '$2b$10$wYocSzloCpvfEWjczIjhke2uN1DW3pd7g3VZ62K3DEibYLX/.ecVK', 'member', '2025-02-19 11:24:19', 'ktjhpp6mswf'),
(42, 'John123', '$2b$10$zy9S4dGf7.SOuzIE358Jd.p35u8hAvlYaqig1ZxW3I8PgL4eitbpK', 'member', '2025-02-22 02:51:26', NULL),
(45, 'Kai123', '$2b$10$4rDekbKrByqx5Jb8Unz87eRE2fh3VaAjQuElNnTa1ejTkv42WRxpy', 'member', '2025-02-23 05:13:09', NULL),
(50, 'Jen123', '$2b$10$1GNUQ.peJPACeqAinDTd/.cr5e6o/cjZSRKoA.IPkbojlRJiHkzi.', 'member', '2025-03-01 15:50:47', 'k6t9pf6mqgr'),
(58, 'Pau123', '$2b$10$c4/CDUxJA5roBEwHac8uy.WjBLWY.Y.vJVrrROOy7Gz5164TvUbmG', 'member', '2025-03-04 12:38:26', NULL),
(61, 'Myrna123', '$2b$10$g12o96J5vDFioHJ.KOMo6ulnkMCD5wYbzRTJn89F717KPxgJlvjem', 'member', '2025-03-08 12:08:35', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `loan_applications`
--
ALTER TABLE `loan_applications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `application_no` (`application_no`),
  ADD KEY `cb_number` (`cb_number`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cb_number` (`cb_number`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`cb_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `loan_applications`
--
ALTER TABLE `loan_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `loan_applications`
--
ALTER TABLE `loan_applications`
  ADD CONSTRAINT `loan_applications_ibfk_1` FOREIGN KEY (`cb_number`) REFERENCES `members` (`cb_number`) ON DELETE CASCADE;

--
-- Constraints for table `members`
--
ALTER TABLE `members`
  ADD CONSTRAINT `members_ibfk_1` FOREIGN KEY (`cb_number`) REFERENCES `users` (`cb_number`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
