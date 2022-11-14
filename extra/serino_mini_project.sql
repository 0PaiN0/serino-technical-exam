-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2022 at 12:13 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `serino_mini_project`
--
CREATE DATABASE IF NOT EXISTS `serino_mini_project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `serino_mini_project`;

-- --------------------------------------------------------

--
-- Table structure for table `money_values`
--

CREATE TABLE `money_values` (
  `id` int(11) NOT NULL,
  `treasure_id` int(11) NOT NULL,
  `amt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `money_values`
--

INSERT INTO `money_values` (`id`, `treasure_id`, `amt`) VALUES
(1, 100, 15),
(2, 101, 10),
(3, 102, 15),
(4, 103, 15),
(5, 104, 10),
(6, 105, 15),
(7, 106, 15),
(8, 107, 10),
(9, 108, 15),
(10, 109, 15),
(11, 110, 10),
(12, 111, 15),
(13, 112, 15),
(14, 113, 10),
(15, 114, 15),
(16, 115, 15),
(17, 116, 10),
(18, 117, 15),
(19, 100, 20),
(20, 101, 25),
(21, 102, 20),
(22, 103, 25),
(23, 107, 30),
(24, 108, 30),
(25, 109, 30),
(28, 121, 15);

-- --------------------------------------------------------

--
-- Table structure for table `treasures`
--

CREATE TABLE `treasures` (
  `id` int(11) NOT NULL,
  `Latitude` varchar(45) NOT NULL,
  `Longitude` varchar(45) NOT NULL,
  `Name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `treasures`
--

INSERT INTO `treasures` (`id`, `Latitude`, `Longitude`, `Name`) VALUES
(100, '14.5437648051331', '121.019911678311', 'T1'),
(101, '14.5532076554883', '121.055774532421', 'T2'),
(102, '14.5446435656183', '121.020365629871', 'T3'),
(103, '14.5872615919051', '120.979504794655', 'T4'),
(104, '14.5732032723718', '121.023090376156', 'T5'),
(105, '14.5231131289849', '121.019457319516', 'T6'),
(106, '14.6024229153284', '121.011513378939', 'T7'),
(107, '14.6085746293116', '121.018551395794', 'T8'),
(108, '14.4911143426092', '121.043748206197', 'T9'),
(109, '14.5445595272478', '121.106088282234', 'T10'),
(110, '14.5879814117365', '121.058208029763', 'T11'),
(111, '14.5488649285797', '121.03363929755', 'T12'),
(112, '14.5371505894201', '120.990430237915', 'T13'),
(113, '14.5257966600328', '121.020868844103', 'T14'),
(114, '14.5170998780454', '120.981002106201', 'T15'),
(115, '14.502006871058', '120.991618127534', 'T16'),
(116, '14.521124409049', '121.042771368704', 'T17'),
(117, '14.4772076562187', '120.986792724064', 'T18'),
(121, '14.6437648051331', '121.319911678311', 'T19');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `password` char(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `hash` char(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `age`, `password`, `email`, `hash`, `created_at`, `updated_at`) VALUES
(1, 'Pat', 25, 'd7f42b06f682db051e0e1fcd12b60fd0', 'pat@mail.com', '700d2b9204d590c15b93d242df37888d8a971d50f02549d3da35afb4df07358cda217ea75718e9a74cbefc33394ec53231a164a20d4d6b2fdbf6f726a54d5f2e', '2022-11-13 14:35:24', '2022-11-13 14:35:24'),
(5, 'Patrick', 25, '703f58bb97d964e8627e2e640a8ba44b', 'patrick@email.com', '7ee6b287e8c08dc3ebe1e71ab2756795aee8844d69dbafd2ffb4074ed42f6e607a5c2833e6e4cbf5e68b5efd1a566ed467abcc6b8536d74d3bde86d3824863e2', '2022-11-13 10:53:12', '2022-11-13 10:53:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `money_values`
--
ALTER TABLE `money_values`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `treasures`
--
ALTER TABLE `treasures`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `money_values`
--
ALTER TABLE `money_values`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `treasures`
--
ALTER TABLE `treasures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
