-- MySQL Workbench Forward Engineering
-- -----------------------------------------------------
-- Schema mydb_v5
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb_v5` DEFAULT CHARACTER SET utf8 ;
USE `mydb_v5` ;

-- -----------------------------------------------------
-- Table `mydb_v5`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v5`.`Users` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `FName` VARCHAR(45) NOT NULL,
  `LName` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `PhoneNumber` VARCHAR(45) NULL,
  `Address` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(60) NOT NULL,
  `Registered` TINYINT(1) NOT NULL,
  `DateJoined` DATE NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  UNIQUE INDEX `PhoneNumber_UNIQUE` (`PhoneNumber` ASC) VISIBLE);

-- -----------------------------------------------------
-- Table `mydb_v5`.`Categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v5`.`Categories` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Parent_Category_ID` INT NULL,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_Category_Category1_idx` (`Parent_Category_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Category_Category1`
    FOREIGN KEY (`Parent_Category_ID`)
    REFERENCES `mydb_v5`.`Categories` (`ID`));

-- -----------------------------------------------------
-- Table `mydb_v5`.`Products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v5`.`Products` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Categories_ID` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Description` VARCHAR(500) NULL,
  `ImagePath` VARCHAR(45) NULL,
  `Quantity` VARCHAR(45) NOT NULL,
  `Price` VARCHAR(45) NOT NULL,
  `Color` VARCHAR(45) NULL,
  `Size` VARCHAR(45) NULL,
  `Productscol` VARCHAR(45) NULL,
  `DateAdded` DATE NOT NULL,
  `DateRemoved` DATE NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_Products_Category1_idx` (`Categories_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Products_Category1`
    FOREIGN KEY (`Categories_ID`)
    REFERENCES `mydb_v5`.`Categories` (`ID`));

-- -----------------------------------------------------
-- Table `mydb_v5`.`Receipts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v5`.`Receipts` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Users_ID` INT NOT NULL,
  `OrderDate` DATE NOT NULL,
  `OrderStatus` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_Order_Customer1_idx` (`Users_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Order_Customer1`
    FOREIGN KEY (`Users_ID`)
    REFERENCES `mydb_v5`.`Users` (`ID`));

-- -----------------------------------------------------
-- Table `mydb_v5`.`ReceiptItems`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v5`.`ReceiptItems` (
  `Receipts_ID` INT NOT NULL,
  `Products_ID` INT NOT NULL,
  `Amount` INT NOT NULL,
  INDEX `fk_OrderItems_Products1_idx` (`Products_ID` ASC) VISIBLE,
  CONSTRAINT `fk_OrderItems_Order1`
    FOREIGN KEY (`Receipts_ID`)
    REFERENCES `mydb_v5`.`Receipts` (`ID`),
  CONSTRAINT `fk_OrderItems_Products1`
    FOREIGN KEY (`Products_ID`)
    REFERENCES `mydb_v5`.`Products` (`ID`));

-- -----------------------------------------------------
-- Table `mydb_v5`.`Carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v5`.`Carts` (
  `Products_ID` INT NOT NULL,
  `Users_ID` INT NOT NULL,
  `Amount` INT NOT NULL,
  INDEX `fk_CartItems_Products1_idx` (`Products_ID` ASC) VISIBLE,
  CONSTRAINT `fk_CartItems_Products1`
    FOREIGN KEY (`Products_ID`)
    REFERENCES `mydb_v5`.`Products` (`ID`),
  CONSTRAINT `fk_CartItems_Customer1`
    FOREIGN KEY (`Users_ID`)
    REFERENCES `mydb_v5`.`Users` (`ID`));

-- -----------------------------------------------------
-- Table `mydb_v5`.`Reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v5`.`Reviews` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Users_ID` INT NOT NULL,
  `Products_ID` INT NOT NULL,
  `Rating` VARCHAR(1) NOT NULL,
  `Text` VARCHAR(45) NOT NULL,
  `Date` DATE NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_Reviews_Products1_idx` (`Products_ID` ASC) VISIBLE,
  INDEX `fk_Reviews_Customer1_idx` (`Users_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Reviews_Products1`
    FOREIGN KEY (`Products_ID`)
    REFERENCES `mydb_v5`.`Products` (`ID`),
  CONSTRAINT `fk_Reviews_Customer1`
    FOREIGN KEY (`Users_ID`)
    REFERENCES `mydb_v5`.`Users` (`ID`));

-- -----------------------------------------------------
-- Table `mydb_v5`.`Admins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v5`.`Admins` (
  `Users_ID` INT NOT NULL,
  INDEX `fk_Admins_Customer1_idx` (`Users_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Admins_Customer1`
    FOREIGN KEY (`Users_ID`)
    REFERENCES `mydb_v5`.`Users` (`ID`));