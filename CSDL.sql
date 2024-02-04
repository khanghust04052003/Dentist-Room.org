CREATE DATABASE  IF NOT EXISTS `nhom_4` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `nhom_4`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: nhom_4
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `Appointment ID` int NOT NULL,
  `Appoint Date` date NOT NULL,
  `Start Time` varchar(245) NOT NULL,
  `Doctor ID` int NOT NULL,
  `Patient ID` int NOT NULL,
  PRIMARY KEY (`Appointment ID`),
  UNIQUE KEY `Patient ID_UNIQUE` (`Patient ID`),
  KEY `FK5` (`Doctor ID`),
  CONSTRAINT `FK5` FOREIGN KEY (`Doctor ID`) REFERENCES `doctor` (`Doctor ID`),
  CONSTRAINT `FK6` FOREIGN KEY (`Patient ID`) REFERENCES `patient` (`Patient ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (1,'2024-01-17','8h',3,1),(5,'2024-01-17','9h',3,5);
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disease`
--

DROP TABLE IF EXISTS `disease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `disease` (
  `Patient ID` int NOT NULL,
  `Medicine Name` varchar(245) NOT NULL,
  `Disease Id` int NOT NULL AUTO_INCREMENT,
  `Disease Name` varchar(245) DEFAULT NULL,
  `Appointment ID` int NOT NULL,
  foreign key (`Appointment ID`) references appointment(`Appointment ID`),
  PRIMARY KEY (`Disease Id`),
  KEY `FK8_idx` (`Patient ID`),
  KEY `FK9_idx` (`Medicine Name`),
  CONSTRAINT `FK8` FOREIGN KEY (`Patient ID`) REFERENCES `patient` (`Patient ID`),
  CONSTRAINT `FK9` FOREIGN KEY (`Medicine Name`) REFERENCES `medicine` (`Medicine Name`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
select `Medicine Name` from `disease` where `Appointment ID`= 2;
select `Price` from `medicine` where `Medicine Name`='thuốc cảm';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disease`
--

LOCK TABLES `disease` WRITE;
/*!40000 ALTER TABLE `disease` DISABLE KEYS */;
INSERT INTO `disease` VALUES (5,'thuốc cảm',30,'ốm ','2');
/*!40000 ALTER TABLE `disease` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `Doctor ID` int NOT NULL,
  `FullName` varchar(245) NOT NULL,
  `PhoneNumber` varchar(245) NOT NULL,
  `Gmail` varchar(245) NOT NULL,
  `Work Address` varchar(245) NOT NULL,
  `UserName` varchar(245) NOT NULL,
  `Password` varchar(245) NOT NULL,
  `specialized` varchar(245) NOT NULL,
  `city` varchar(245) NOT NULL,
  PRIMARY KEY (`Doctor ID`),
  UNIQUE KEY `Doctor ID_UNIQUE` (`Doctor ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,'Nguyễn Hoàng ','0965846534','hoang@gmail.com','Bệnh Viện Y Hà Nội','hoang','123','Đa Khoa','Hà Nội'),(2,'Nguyễn Chiến','0945435234','chien@gmail.com','Bệnh Viện Nhi Trương Ương','chien','123','Tai Mũi','Thanh Hóa'),(3,'Nguyễn Tùng','0243242342','tung','Bệnh Viện 71','tung','123','Thai Nhi','Nha Trang');
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicine`
--

DROP TABLE IF EXISTS `medicine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicine` (
  `Medicine Name` varchar(245) NOT NULL,
  `Dosage` varchar(245) NOT NULL,
  `Price` varchar(245) NOT NULL,
  PRIMARY KEY (`Medicine Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicine`
--

LOCK TABLES `medicine` WRITE;
/*!40000 ALTER TABLE `medicine` DISABLE KEYS */;
INSERT INTO `medicine` VALUES ('thuốc cảm','1 ngày 1 viên ','100 000');
/*!40000 ALTER TABLE `medicine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `Patient ID` int NOT NULL AUTO_INCREMENT,
  `Full Name` varchar(245) DEFAULT NULL,
  `Birth` date DEFAULT NULL,
  `Phone Number` varchar(245) DEFAULT NULL,
  `UserName` varchar(245) NOT NULL,
  `Password` varchar(245) NOT NULL,
  `email` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`Patient ID`),
  UNIQUE KEY `Paitent ID_UNIQUE` (`Patient ID`),
  UNIQUE KEY `unique_UserName` (`UserName`),
  UNIQUE KEY `unique_email` (`email`),
  UNIQUE KEY `unique_Phone` (`Phone Number`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,'Nguyễn Việt Tùng','1970-01-01','897646546','HOANG','123456','devil09838342@gmail.com'),(2,'Trần Quang Tùng',NULL,'037485734','tung','123456','devi9838342@gmail.com'),(3,'Nguyễn Mạnh Hoàng','1970-01-01','037486734','truong','123456','devi988342@gmail.com'),(5,'Nguyễn Công Dương',NULL,'037675734','chien1','123456','devil038342@gmail.com'),(11,'Nguyễn Hữu Trang',NULL,'056756756','HOANG1','123456','devil098342@gmail.com');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


INSERT INTO `nhom_4`.`doctor` (`Doctor ID`, `FullName`, `PhoneNumber`, `Gmail`, `UserName`, `Password`, `specialized`, `city`, `Work Address`) 
VALUES ('4', 'Vũ Hà', '0918246582', 'abc@gmail.com', 'ha123', 'ha123', 'Nhan vien', 'Nam Dinh', 'Your Work Address');

