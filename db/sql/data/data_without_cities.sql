-- MySQL dump 10.13  Distrib 5.6.19, for osx10.7 (i386)
--
-- Host: 127.0.0.1    Database: whoapp_dev
-- ------------------------------------------------------
-- Server version	5.5.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `friends_request`
--

LOCK TABLES `friends_request` WRITE;
/*!40000 ALTER TABLE `friends_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `friends_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `interest`
--

LOCK TABLES `interest` WRITE;
/*!40000 ALTER TABLE `interest` DISABLE KEYS */;
INSERT INTO `interest` VALUES (33,'Гулять по полям радости'),(4,'Играть в бильярд'),(5,'Играть в теннис'),(1,'Курить кальян'),(7,'Смотреть кино'),(34,'Читать газеты'),(3,'Читать книги');
/*!40000 ALTER TABLE `interest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `place`
--

LOCK TABLES `place` WRITE;
/*!40000 ALTER TABLE `place` DISABLE KEYS */;
INSERT INTO `place` VALUES (64,'Кальянная',3),(65,'Просто Кафеъ',3),(66,'Спортзал Ч',3);
/*!40000 ALTER TABLE `place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `place_details`
--

LOCK TABLES `place_details` WRITE;
/*!40000 ALTER TABLE `place_details` DISABLE KEYS */;
INSERT INTO `place_details` VALUES (61,'','Кутузовский проспект, 50',NULL,NULL,NULL,64,13658),(62,'','улица Солянка, 5/2с1',NULL,NULL,NULL,65,13658),(63,'','Пролетарская улица, 32',NULL,NULL,NULL,66,13658);
/*!40000 ALTER TABLE `place_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `place_interest`
--

LOCK TABLES `place_interest` WRITE;
/*!40000 ALTER TABLE `place_interest` DISABLE KEYS */;
/*!40000 ALTER TABLE `place_interest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `place_status`
--

LOCK TABLES `place_status` WRITE;
/*!40000 ALTER TABLE `place_status` DISABLE KEYS */;
INSERT INTO `place_status` VALUES (1,'deleted'),(2,'active'),(3,'inactive');
/*!40000 ALTER TABLE `place_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `role_roles_group`
--

LOCK TABLES `role_roles_group` WRITE;
/*!40000 ALTER TABLE `role_roles_group` DISABLE KEYS */;
INSERT INTO `role_roles_group` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `role_roles_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `roles_group`
--

LOCK TABLES `roles_group` WRITE;
/*!40000 ALTER TABLE `roles_group` DISABLE KEYS */;
INSERT INTO `roles_group` VALUES (1,'admins'),(2,'users');
/*!40000 ALTER TABLE `roles_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `search_request`
--

LOCK TABLES `search_request` WRITE;
/*!40000 ALTER TABLE `search_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `search_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (5,'jbubsk','08af15e1013eeb584990fa22b96fdbd9de0c0680','0.48208587104454637','2015-05-26 10:14:59',0,'2015-05-26 10:14:59',0,2,2),(6,'valera','82c8951d6edc50875e415459531ba0189f1ab0b6','0.6410746304318309','2015-05-27 11:49:45',0,'2015-05-27 11:49:45',0,2,2),(7,'user0','4b1664b884d54fb7faaaa8180ca78a66cc6ff2f6','0.26384689449332654','2015-05-28 12:42:57',0,'2015-05-28 12:42:57',0,2,2),(8,'user1','bc9da5f6b33eaf06f65a688c14d9f090765ad558','0.9666573132853955','2015-05-28 12:42:57',0,'2015-05-28 12:42:57',0,2,2),(9,'user2','1f70a1bca7005ed68c28f7c365b72aad8fddcf6f','0.8843795533757657','2015-05-28 12:42:58',0,'2015-05-28 12:42:58',0,2,2),(10,'user3','934dd8c93897f196270124723af1f2a4d8ab711a','0.6165080270729959','2015-05-28 12:42:59',0,'2015-05-28 12:42:59',0,2,2),(11,'user4','f56add3945cecfd2c6398ebf7b765991042d1aba','0.5787732617463917','2015-05-28 12:43:00',0,'2015-05-28 12:43:00',0,2,2),(12,'user5','43a2b5f89180f998db583e5c027ca4ef490419ec','0.9030238837003708','2015-05-28 12:43:00',0,'2015-05-28 12:43:00',0,2,2),(13,'user6','2bc81aa1d501f76026b1dff1870acb2d634f20f3','0.23108666646294296','2015-05-28 12:43:01',0,'2015-05-28 12:43:01',0,2,2),(14,'user7','3c985d7f3dae78ae40945cf4104e1c9dd3ce01f9','0.4814081888180226','2015-05-28 12:43:02',0,'2015-05-28 12:43:02',0,2,2),(15,'user8','6dd39225f226c9b38701a57e76419ba9fcdc9c08','0.8008331258315593','2015-05-28 12:43:02',0,'2015-05-28 12:43:02',0,2,2),(16,'user9','c7403cdcc5828136a80a5eab6626dd39c7d4012f','0.2691497120540589','2015-05-28 12:43:03',0,'2015-05-28 12:43:03',0,2,2),(17,'user10','cf9847fd656d3ee98e016156bf8f8646b57162e9','0.31076345150358975','2015-05-28 12:43:04',0,'2015-05-28 12:43:04',0,2,2),(18,'user11','8fd282c67a5c52f91a369b063528d2556bd697bb','0.0031436854042112827','2015-05-28 12:43:04',0,'2015-05-28 12:43:04',0,2,2),(19,'pavel','551962c931b5f7806d4d4fda5ec94860401a73a0','0.9731462693307549','2015-06-09 09:29:45',0,'2015-06-09 09:29:45',0,1,2),(20,'pavel','1daada8b9db8fabc907b17af44df3e8d3c32b28d','0.2337170948740095','2015-06-09 09:42:38',0,'2015-06-09 09:42:38',0,2,2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_current_interest`
--

LOCK TABLES `user_current_interest` WRITE;
/*!40000 ALTER TABLE `user_current_interest` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_current_interest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_details`
--

LOCK TABLES `user_details` WRITE;
/*!40000 ALTER TABLE `user_details` DISABLE KEYS */;
INSERT INTO `user_details` VALUES (22,NULL,NULL,0,NULL,NULL,NULL,'jbupplication@gmail.com',NULL,5),(23,NULL,NULL,0,NULL,NULL,NULL,'Valera@fgggxx.com',NULL,6),(24,NULL,NULL,0,NULL,NULL,NULL,'email@mail0.ru',NULL,7),(25,NULL,NULL,0,NULL,NULL,NULL,'email@mail1.ru',NULL,8),(26,NULL,NULL,0,NULL,NULL,NULL,'email@mail2.ru',NULL,9),(27,NULL,NULL,0,NULL,NULL,NULL,'email@mail3.ru',NULL,10),(28,NULL,NULL,0,NULL,NULL,NULL,'email@mail4.ru',NULL,11),(29,NULL,NULL,0,NULL,NULL,NULL,'email@mail5.ru',NULL,12),(30,NULL,NULL,0,NULL,NULL,NULL,'email@mail6.ru',NULL,13),(31,NULL,NULL,0,NULL,NULL,NULL,'email@mail7.ru',NULL,14),(32,NULL,NULL,0,NULL,NULL,NULL,'email@mail8.ru',NULL,15),(33,NULL,NULL,0,NULL,NULL,NULL,'email@mail9.ru',NULL,16),(34,NULL,NULL,0,NULL,NULL,NULL,'email@mail10.ru',NULL,17),(35,NULL,NULL,0,NULL,NULL,NULL,'email@mail11.ru',NULL,18),(36,NULL,NULL,0,NULL,NULL,NULL,'someemail@com.ru',NULL,19),(37,NULL,NULL,0,NULL,NULL,NULL,'someemail@fr.eu',NULL,20);
/*!40000 ALTER TABLE `user_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_persistent_interest`
--

LOCK TABLES `user_persistent_interest` WRITE;
/*!40000 ALTER TABLE `user_persistent_interest` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_persistent_interest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_status`
--

LOCK TABLES `user_status` WRITE;
/*!40000 ALTER TABLE `user_status` DISABLE KEYS */;
INSERT INTO `user_status` VALUES (1,'deleted'),(2,'active'),(3,'inactive');
/*!40000 ALTER TABLE `user_status` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-06-15 11:40:48
