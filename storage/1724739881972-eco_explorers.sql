-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2024 at 02:46 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eco_explorers`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `answerText` varchar(255) NOT NULL,
  `likes` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `questionId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attractions`
--

CREATE TABLE `attractions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `difficulty` varchar(255) NOT NULL,
  `media_url` varchar(255) NOT NULL,
  `reviews` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `rating` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attractions`
--

INSERT INTO `attractions` (`id`, `name`, `description`, `location`, `difficulty`, `media_url`, `reviews`, `createdAt`, `updatedAt`, `rating`) VALUES
(1, 'Mount Everest Base Camp', 'The base camp of the world\'s highest peak, Mount Everest, is a trekker\'s dream. It offers breathtaking views of the Himalayas and a chance to experience Sherpa culture.', 'Solukhumbu District, Eastern Nepal', 'Very Difficult (Requires good physical condition and acclimatization)', '1723300150929-everest2.jpg', ' A challenging but rewarding trek with stunning landscapes. It\'s a lifetime experience for adventure enthusiasts.', '2024-08-10 14:29:10', '2024-08-10 14:29:10', 3),
(2, 'Phewa Lake', 'A serene freshwater lake located in Pokhara, surrounded by lush hills and offering views of the Annapurna range. Boating and lakeside relaxation are popular activities.', 'Pokhara, Kaski District, Western Nepal', 'Very Difficult (Requires good physical condition and acclimatization)', '1723300360083-phewa.jpg', ' A peaceful and beautiful spot, perfect for relaxation and enjoying nature. The reflection of the mountains on the lake is mesmerizing.', '2024-08-10 14:32:40', '2024-08-10 14:32:40', 5),
(3, 'Chitwan National Park', 'A UNESCO World Heritage Site and one of the most popular wildlife parks in Nepal, known for its population of one-horned rhinoceroses, Bengal tigers, and rich biodiversity.', 'Pokhara, Kaski District, Western Nepal', 'Easy (Guided tours available)', '1723300628006-chitwan.jpg', 'A must-visit for wildlife lovers. The safari experience is thrilling, and the park offers a glimpse into Nepal\'s diverse flora and fauna.', '2024-08-10 14:37:08', '2024-08-10 14:37:08', 5),
(4, 'Annapurna Circuit', 'A famous trekking route that circles the Annapurna Massif, offering a variety of landscapes, from subtropical forests to high-altitude deserts, and cultural experiences with local communities.', 'Annapurna Region, Central Nepal', 'Difficult', '1723300763455-annapurna.jpg', 'One of the best treks in the world, offering diverse landscapes and cultural experiences. The trek is physically demanding but worth every step.', '2024-08-10 14:39:23', '2024-08-10 14:39:23', 4),
(5, 'Swayambhunath (Monkey Temple)', 'An ancient stupa and a UNESCO World Heritage Site, offering panoramic views of Kathmandu. It\'s a significant religious site for both Buddhists and Hindus.', 'Kathmandu, Central Nepal', 'Moderate', '1723300904144-shyambhu.jpg', 'A spiritual and cultural landmark in Kathmandu. The view from the top is breathtaking, and the temple complex is rich in history and symbolism.', '2024-08-10 14:41:44', '2024-08-10 14:41:44', 5),
(6, 'Lumbini', 'The birthplace of Lord Buddha, a UNESCO World Heritage Site, and an important pilgrimage site for Buddhists worldwide. The area is home to numerous monasteries and the sacred Bodhi tree.', 'Rupandehi District, Southern Nepal', 'Easy', '1723301085347-lumbini.jpg', 'A peaceful and spiritually uplifting place. The gardens and monasteries are beautifully maintained, making it a serene place for reflection and learning about Buddhism.', '2024-08-10 14:44:45', '2024-08-10 14:44:45', 5),
(7, 'Bhaktapur Durbar Square', 'A historic square in Bhaktapur, showcasing traditional Newari architecture, temples, and ancient artifacts. It\'s a living museum of medieval Nepalese culture.', 'Bhaktapur, Kathmandu Valley, Central Nepal', 'Easy', '1723301286092-bhaktapur.jpg', 'A beautifully preserved cultural site. The architecture is stunning, and the square offers a glimpse into the rich history of the Kathmandu Valley.', '2024-08-10 14:48:06', '2024-08-10 14:48:06', 3),
(9, 'Rara Lake', 'The largest lake in Nepal, located in the remote Mugu District. Surrounded by Rara National Park, the lake is known for its pristine beauty and tranquility.', 'Mugu District, Northwestern Nepal', 'Moderate to Difficult', '1723301632197-rara.jpg', 'A hidden gem in Nepal. The journey is challenging, but the untouched natural beauty of Rara Lake is unparalleled. It\'s a perfect destination for solitude and nature lovers.', '2024-08-10 14:53:52', '2024-08-10 14:53:52', 3),
(10, 'Gosaikunda', 'A sacred alpine lake revered by both Hindus and Buddhists. The lake is surrounded by rugged mountains and is a popular pilgrimage site during the full moon in August.', 'Langtang Region, Central Nepal', 'Moderate to Difficult', '1723301979619-gosaikunda.jpg', 'A spiritual and scenic trek. The lake is stunning, especially during sunrise and sunset, and the trek offers a rich cultural experience with the local Tamang community.', '2024-08-10 14:59:39', '2024-08-10 14:59:39', 3),
(11, ' Patan Durbar Square', 'Another UNESCO World Heritage Site, known for its Newari architecture, temples, and ancient palaces. The square is a hub of cultural and historical significance.', ' Patan, Kathmandu Valley, Central Nepal', 'Easy', '1723302115249-patand.jpg', 'A culturally rich and architecturally impressive site. The square is less crowded than Kathmandu Durbar Square, making it a more relaxed visit with plenty to explore.', '2024-08-10 15:01:55', '2024-08-10 15:01:55', 3),
(12, 'pashupati', 'religious', 'pashupa', 'easy', '', NULL, '2024-08-10 15:22:01', '2024-08-10 15:22:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `galleries`
--

CREATE TABLE `galleries` (
  `id` int(11) NOT NULL,
  `caption` varchar(255) NOT NULL,
  `media_type` varchar(255) NOT NULL,
  `media_url` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `galleries`
--

INSERT INTO `galleries` (`id`, `caption`, `media_type`, `media_url`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 'manang', 'photo', '1723276302216-me.png', '2024-08-10 07:51:42', '2024-08-10 07:51:42', NULL),
(2, 'rojan', 'photos', '1723276691396-FB_IMG_1642985611636.jpg', '2024-08-10 07:58:11', '2024-08-10 07:58:11', NULL),
(3, 'rojan', 'photos', '1723276753298-2022-01-06-174155614.mp4', '2024-08-10 07:59:13', '2024-08-10 07:59:13', NULL),
(4, 'rojan', 'photos', '1723276845821-2022-01-06-174155614.mp4', '2024-08-10 08:00:46', '2024-08-10 08:00:46', NULL),
(5, 'rojan', 'photos', '1723276992695-2022-01-06-174155614.mp4', '2024-08-10 08:03:13', '2024-08-10 08:03:13', NULL),
(6, 'rojan', 'videos', '1723277094520-2022-01-06-174155614.mp4', '2024-08-10 08:04:55', '2024-08-10 08:04:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `guides`
--

CREATE TABLE `guides` (
  `id` int(11) NOT NULL,
  `bio` varchar(255) NOT NULL,
  `language_spoken` varchar(255) NOT NULL,
  `availability` varchar(255) NOT NULL,
  `rate` int(11) DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `review` varchar(255) DEFAULT NULL,
  `identity` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `guides`
--

INSERT INTO `guides` (`id`, `bio`, `language_spoken`, `availability`, `rate`, `location`, `review`, `identity`, `createdAt`, `updatedAt`, `userId`) VALUES
(6, 'Growing up in the Solukhumbu district, Dawa has an intimate knowledge of the terrain, culture, and challenges of trekking in the Himalayas. His deep connection with the local Sherpa community and fluency in English, Nepali, and Sherpa make him an invaluab', 'nepali,engliosh, hindi', 'yes', 5, 'solukhumbu,Kathmandu', '12', '', '2024-08-10 16:01:55', '2024-08-10 16:01:55', 21),
(7, 'a passionate cultural guide with a deep love for Nepal\'s rich history and traditions. With a background in anthropology and 10 years of guiding experience, Sita offers insightful tours through the Kathmandu Valley\'s UNESCO World Heritage Sites.', 'nepali, hindi', 'yes', 4, 'Kathmandu', '12', '', '2024-08-10 16:06:14', '2024-08-10 16:06:14', 23),
(8, 'born and raised in the Terai region of Nepal, is an expert wildlife guide with a particular focus on Chitwan National Park. With over 12 years of experience leading safaris, Ram has an exceptional eye for spotting the elusive one-horned rhinoceros, Bengal', 'Hindi,Urdu', 'yes', 3, 'Terai,Chitwan', '12', '', '2024-08-10 16:10:26', '2024-08-10 16:10:26', 25),
(9, ' a certified adventure sports guide specializing in paragliding, white-water rafting, and mountain biking. With over 8 years of experience, Bikash has guided thrill-seekers through some of Nepal\'s most exciting and challenging terrains.', 'Hindi,Urdu,chinese', 'no', 2, 'Bihar ,Terai', '12', '', '2024-08-10 16:13:30', '2024-08-10 16:13:30', 26),
(10, 'a dedicated nature enthusiast with a special interest in birdwatching. Hailing from the lush hills of the Annapurna region, Maya has spent the last 10 years guiding nature lovers through Nepal\'s diverse ecosystems. ', 'Nepali,English', 'yes', 5, 'Annapurna', '12', '', '2024-08-10 16:15:53', '2024-08-10 16:15:53', 27),
(11, 'deep respect for nature and her ability to share her knowledge in an engaging way create a serene and educational experience for her clients. Fluent in English, Nepali, and Gurung,', 'Nepali,English,Gurunag', 'yes', 4, 'Lumbini', '12', '', '2024-08-10 16:17:58', '2024-08-10 16:17:58', 28),
(12, 'deep respect for nature and her ability to share her knowledge in an engaging way create a serene and educational experience for her clients. Fluent in English, Nepali, and Gurung,', 'Nepali', 'no', 1, 'Nuwakot', '12', '', '2024-08-10 16:20:15', '2024-08-10 16:20:15', 29);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `image`, `description`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, '', 'hello', '2024-08-10 16:44:43', '2024-08-10 16:44:43', 29),
(2, '1723308398460-me.png', '', '2024-08-10 16:46:38', '2024-08-10 16:46:38', 29),
(3, '', 'hello hi how are you', '2024-08-10 16:48:02', '2024-08-10 16:48:02', 21),
(4, '', 'i am fine', '2024-08-10 18:55:01', '2024-08-10 18:55:01', 21),
(5, '', 'i am fine', '2024-08-10 19:01:16', '2024-08-10 19:01:16', 21),
(6, '', 'i am fine', '2024-08-10 19:05:50', '2024-08-10 19:05:50', 21),
(7, '', 'hello you', '2024-08-10 19:07:17', '2024-08-10 19:07:17', 21);

-- --------------------------------------------------------

--
-- Table structure for table `routes`
--

CREATE TABLE `routes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `difficulty` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`, `imageUrl`, `createdAt`, `updatedAt`) VALUES
(21, 'aashisrijal252@gmail.com', '$2b$10$aEdpo4oVCA3plxUHmNav8Oz1jrlIqH3ww/PMyXLyq28TF95RX2Zlm', 'Aashish Rijal', '1723305386964-aashis.jpg', '2024-08-10 15:56:27', '2024-08-10 15:56:27'),
(23, 'roozanaryal8@gmail.com', '$2b$10$ybCHYpDkjxA695yrptWZUO0h0d7jWklM0yx8YnrA0F7O/rxpRaZmq', 'Rojan Aryal', '1723305892471-rojan.jpg', '2024-08-10 16:04:52', '2024-08-10 16:04:52'),
(25, 'sangam.dhital72@gmail.com', '$2b$10$WG3tIvNBEdqwdeGt69rAAOGlr0EHwjusvKaom407nFQydzSVh.TYm', 'Sangam Dhital', '1723306093411-rojan.jpg', '2024-08-10 16:08:13', '2024-08-10 16:08:13'),
(26, 'dipesh12@gmail.com', '$2b$10$nOcA7VkKoLICEZ2m7ectEeahlj2.1uoKp/YXXiz9QYj42sis3kFam', 'Dipesh Devkota', '1723306297656-devkota.jpg', '2024-08-10 16:11:37', '2024-08-10 16:11:37'),
(27, 'kusal@gmail.com', '$2b$10$KWZXIWLfeAj.LbbFgS9FluYDv8nEqQgDa52mu.KrbYP8za79sAqou', 'Kusal Bhatta', '1723306481127-kusal.jpg', '2024-08-10 16:14:41', '2024-08-10 16:14:41'),
(28, 'samundra@gmail.com', '$2b$10$fjqKWDxFRupfR/qQqFFVC.xMPabqbOtIxIp0IA9732yUskBrKgGAK', 'Samundra', '1723306600722-samundra.jpg', '2024-08-10 16:16:40', '2024-08-10 16:16:40'),
(29, 'sikhar@gmail.com', '$2b$10$JGyPgVy6X/BnPDGa4/81gu4geaqYNY5pjuUmavS1iYu5Pze/pXEYW', 'Shikhar', '1723306758721-sikhar.jpg', '2024-08-10 16:19:18', '2024-08-10 16:19:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questionId` (`questionId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `attractions`
--
ALTER TABLE `attractions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `guides`
--
ALTER TABLE `guides`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `routes`
--
ALTER TABLE `routes`
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
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attractions`
--
ALTER TABLE `attractions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `galleries`
--
ALTER TABLE `galleries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `guides`
--
ALTER TABLE `guides`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `questions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `galleries`
--
ALTER TABLE `galleries`
  ADD CONSTRAINT `galleries_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `guides`
--
ALTER TABLE `guides`
  ADD CONSTRAINT `guides_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
