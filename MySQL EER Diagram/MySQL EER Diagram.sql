-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema backend
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema backend
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `backend` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `backend` ;

-- -----------------------------------------------------
-- Table `backend`.`Customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `backend`.`Customer` (
  `ID` INT NOT NULL,
  `FName` VARCHAR(50) NOT NULL,
  `LName` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `backend`.`ContactDetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `backend`.`ContactDetails` (
  `ID` INT NOT NULL,
  `PhoneNumber` VARCHAR(50) NOT NULL,
  `Email` VARCHAR(50) NOT NULL,
  `Address` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `backend`.`Products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `backend`.`Products` (
  `ID` INT NOT NULL,
  `Quantity` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `backend`.`ProductDetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `backend`.`ProductDetails` (
  `ID` INT NOT NULL,
  `Price` DECIMAL(8,3) NOT NULL,
  `Color` VARCHAR(50) NOT NULL,
  `Size` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ProductsDetailsID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `backend`.`OrderDetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `backend`.`OrderDetails` (
  `ID` INT NOT NULL,
  `Amount` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `backend`.`Order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `backend`.`Order` (
  `ID` INT NOT NULL,
  `Cost` DECIMAL(8,3) NOT NULL,
  `OrderDate` DATE NOT NULL,
  `OrderStatus` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `Order id_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `backend`.`CartList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `backend`.`CartList` (
  `ID` INT NOT NULL,
  `Amount` INT NOT NULL,
  `Cost` DECIMAL(8,3) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `Cart id_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `backend`.`Category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `backend`.`Category` (
  `ID` INT NOT NULL,
  `Name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `backend`.`Payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `backend`.`Payment` (
  `ID` INT NOT NULL,
  `Account` VARCHAR(50) NOT NULL,
  `CVV` INT NOT NULL,
  `Expiry` DATE NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `backend`.`UserLogin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `backend`.`UserLogin` (
  `ID` INT NOT NULL,
  `Email` VARCHAR(50) NOT NULL,
  `Password` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  UNIQUE INDEX `Password_UNIQUE` (`Password` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `backend`.`Reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `backend`.`Reviews` (
  `ID` INT NOT NULL,
  `Text` VARCHAR(50) NOT NULL,
  `Rating` VARCHAR(1) NOT NULL,
  `Date` DATE NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
