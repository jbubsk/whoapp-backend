-- MySQL dump 10.13  Distrib 5.6.19, for osx10.7 (i386)
--
-- Host: 127.0.0.1    Database: whoapp
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
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
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
INSERT INTO `place` VALUES (1,'????????? ???? \"?????\"',3),(2,'??? \"?????\"',3),(3,'???????????? ???? \'InterMaestro\'',3),(4,'???????-??? ????????',3),(5,'????????? \'?????\'',3);
/*!40000 ALTER TABLE `place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `place_details`
--

LOCK TABLES `place_details` WRITE;
/*!40000 ALTER TABLE `place_details` DISABLE KEYS */;
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
-- Dumping data for table `role_roles_gourp`
--

LOCK TABLES `role_roles_gourp` WRITE;
/*!40000 ALTER TABLE `role_roles_gourp` DISABLE KEYS */;
INSERT INTO `role_roles_gourp` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `role_roles_gourp` ENABLE KEYS */;
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
INSERT INTO `user` VALUES (3,'retro45','pass3231231','1985-12-25',0,'1985-12-25',0,2,2),(4,'firstuser','pass3231231','1995-12-15',0,'1995-12-15',0,2,2),(5,'somedail','pass3231231','1985-12-25',0,'1985-12-25',0,2,2),(6,'nikita_inok','pass3231231','1990-12-15',0,'1990-12-15',0,3,2);
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
INSERT INTO `user_details` VALUES (14,'Виктор','Цыганов',1,'89444543487','2000-05-29',NULL,'viktortsiganov@er.er',NULL,3),(15,'Андрей','Степанов',1,'89456143487','1981-06-28',NULL,'andreqwууwe@er.er',NULL,4),(16,'Игорь','Попов',1,'89456443487','1996-07-29',NULL,'igoeqweqwe@er.er',NULL,5),(17,'Андрей','Цыганов',1,'89456003487','1976-06-29',NULL,'qweqw5qwe@er.er',NULL,6);
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

-- Dump completed on 2015-05-22 12:47:55
