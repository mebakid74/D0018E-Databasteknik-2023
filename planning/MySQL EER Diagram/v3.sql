-- MySQL Workbench Forward Engineering
-- -----------------------------------------------------
-- Schema mydb_v3
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb_v3` DEFAULT CHARACTER SET utf8 ;
USE `mydb_v3` ;

-- -----------------------------------------------------
-- Table `mydb_v3`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v3`.`User` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `FName` VARCHAR(45) NOT NULL,
  `LName` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `PhoneNumber` VARCHAR(45) NOT NULL,
  `Address` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `Registered` TINYINT(1) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE);

-- -----------------------------------------------------
-- Table `mydb_v3`.`Category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v3`.`Category` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Parent_Category_ID` INT NULL,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_Category_Category1_idx` (`Parent_Category_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Category_Category1`
    FOREIGN KEY (`Parent_Category_ID`)
    REFERENCES `mydb_v3`.`Category` (`ID`));

-- -----------------------------------------------------
-- Table `mydb_v3`.`Products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v3`.`Products` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Category_ID` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `ImagePath` VARCHAR(45) NULL,
  `Quantity` VARCHAR(45) NOT NULL,
  `Price` VARCHAR(45) NOT NULL,
  `Color` VARCHAR(45) NULL,
  `Size` VARCHAR(45) NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_Products_Category1_idx` (`Category_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Products_Category1`
    FOREIGN KEY (`Category_ID`)
    REFERENCES `mydb_v3`.`Category` (`ID`));

-- -----------------------------------------------------
-- Table `mydb_v3`.`Receipt`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v3`.`Receipt` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `User_ID` INT NOT NULL,
  `OrderDate` DATE NOT NULL,
  `OrderStatus` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_Order_Customer1_idx` (`User_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Order_Customer1`
    FOREIGN KEY (`User_ID`)
    REFERENCES `mydb_v3`.`User` (`ID`));

-- -----------------------------------------------------
-- Table `mydb_v3`.`ReceiptItems`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v3`.`ReceiptItems` (
  `Receipt_ID` INT NOT NULL,
  `Products_ID` INT NOT NULL,
  `Amount` INT NOT NULL,
  INDEX `fk_OrderItems_Products1_idx` (`Products_ID` ASC) VISIBLE,
  CONSTRAINT `fk_OrderItems_Order1`
    FOREIGN KEY (`Receipt_ID`)
    REFERENCES `mydb_v3`.`Receipt` (`ID`),
  CONSTRAINT `fk_OrderItems_Products1`
    FOREIGN KEY (`Products_ID`)
    REFERENCES `mydb_v3`.`Products` (`ID`));
-- -----------------------------------------------------
-- Table `mydb_v3`.`Cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v3`.`Cart` (
  `Products_ID` INT NOT NULL,
  `User_ID` INT NOT NULL,
  `Amount` INT NOT NULL,
  INDEX `fk_CartItems_Products1_idx` (`Products_ID` ASC) VISIBLE,
  CONSTRAINT `fk_CartItems_Products1`
    FOREIGN KEY (`Products_ID`)
    REFERENCES `mydb_v3`.`Products` (`ID`),
  CONSTRAINT `fk_CartItems_Customer1`
    FOREIGN KEY (`User_ID`)
    REFERENCES `mydb_v3`.`User` (`ID`));

-- -----------------------------------------------------
-- Table `mydb_v3`.`Reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v3`.`Reviews` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `User_ID` INT NOT NULL,
  `Products_ID` INT NOT NULL,
  `Rating` VARCHAR(1) NOT NULL,
  `Text` VARCHAR(45) NOT NULL,
  `Date` DATE NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_Reviews_Products1_idx` (`Products_ID` ASC) VISIBLE,
  INDEX `fk_Reviews_Customer1_idx` (`User_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Reviews_Products1`
    FOREIGN KEY (`Products_ID`)
    REFERENCES `mydb_v3`.`Products` (`ID`),
  CONSTRAINT `fk_Reviews_Customer1`
    FOREIGN KEY (`User_ID`)
    REFERENCES `mydb_v3`.`User` (`ID`));

-- -----------------------------------------------------
-- Table `mydb_v3`.`Admins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v3`.`Admins` (
  `User_ID` INT NOT NULL,
  INDEX `fk_Admins_Customer1_idx` (`User_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Admins_Customer1`
    FOREIGN KEY (`User_ID`)
    REFERENCES `mydb_v3`.`User` (`ID`));