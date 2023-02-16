-- MySQL Workbench Forward Engineering
-- -----------------------------------------------------
-- Schema mydb_v7
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb_v7` DEFAULT CHARACTER SET utf8 ;
USE `mydb_v7` ;

-- -----------------------------------------------------
-- Table `mydb_v7`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v7`.`Users` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `FName` VARCHAR(45) NOT NULL,
  `LName` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `PhoneNumber` VARCHAR(45) NULL,
  `Address` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(60) NOT NULL,
  `Registered` TINYINT(1) NOT NULL,
  `DatetimeJoined` DATETIME NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  UNIQUE INDEX `PhoneNumber_UNIQUE` (`PhoneNumber` ASC) VISIBLE);

-- -----------------------------------------------------
-- Table `mydb_v7`.`Categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v7`.`Categories` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Parent_Category_ID` INT NULL,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_Category_Category1_idx` (`Parent_Category_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Category_Category1`
    FOREIGN KEY (`Parent_Category_ID`)
    REFERENCES `mydb_v7`.`Categories` (`ID`));


-- -----------------------------------------------------
-- Table `mydb_v7`.`Products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v7`.`Products` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Categories_ID` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Description` VARCHAR(500) NULL,
  `ImagePath` VARCHAR(45) NULL,
  `Quantity` VARCHAR(45) NOT NULL,
  `Price` VARCHAR(45) NOT NULL,
  `DateAdded` DATE NOT NULL,
  `DateRemoved` DATE NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_Products_Category1_idx` (`Categories_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Products_Category1`
    FOREIGN KEY (`Categories_ID`)
    REFERENCES `mydb_v7`.`Categories` (`ID`));

-- -----------------------------------------------------
-- Table `mydb_v7`.`Receipts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v7`.`Receipts` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Users_ID` INT NOT NULL,
  `OrderDatetime` DATETIME NOT NULL,
  `OrderStatus` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_Order_Customer1_idx` (`Users_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Order_Customer1`
    FOREIGN KEY (`Users_ID`)
    REFERENCES `mydb_v7`.`Users` (`ID`));

-- -----------------------------------------------------
-- Table `mydb_v7`.`ReceiptItems`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v7`.`ReceiptItems` (
  `Receipts_ID` INT NOT NULL,
  `Products_ID` INT NOT NULL,
  `Amount` INT NOT NULL,
  INDEX `fk_OrderItems_Products1_idx` (`Products_ID` ASC) VISIBLE,
  CONSTRAINT `fk_OrderItems_Order1`
    FOREIGN KEY (`Receipts_ID`)
    REFERENCES `mydb_v7`.`Receipts` (`ID`),
  CONSTRAINT `fk_OrderItems_Products1`
    FOREIGN KEY (`Products_ID`)
    REFERENCES `mydb_v7`.`Products` (`ID`));

-- -----------------------------------------------------
-- Table `mydb_v7`.`Carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v7`.`Carts` (
  `Products_ID` INT NOT NULL,
  `Users_ID` INT NOT NULL,
  `Amount` INT NOT NULL,
  INDEX `fk_CartItems_Products1_idx` (`Products_ID` ASC) VISIBLE,
  CONSTRAINT `fk_CartItems_Products1`
    FOREIGN KEY (`Products_ID`)
    REFERENCES `mydb_v7`.`Products` (`ID`),
  CONSTRAINT `fk_CartItems_Customer1`
    FOREIGN KEY (`Users_ID`)
    REFERENCES `mydb_v7`.`Users` (`ID`));

-- -----------------------------------------------------
-- Table `mydb_v7`.`Reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v7`.`Reviews` (
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
    REFERENCES `mydb_v7`.`Products` (`ID`),
  CONSTRAINT `fk_Reviews_Customer1`
    FOREIGN KEY (`Users_ID`)
    REFERENCES `mydb_v7`.`Users` (`ID`));


-- -----------------------------------------------------
-- Table `mydb_v7`.`Admins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v7`.`Admins` (
  `Users_ID` INT NOT NULL,
  INDEX `fk_Admins_Customer1_idx` (`Users_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Admins_Customer1`
    FOREIGN KEY (`Users_ID`)
    REFERENCES `mydb_v7`.`Users` (`ID`));


-- -----------------------------------------------------
-- Table `mydb_v7`.`Collections`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v7`.`Collections` (
  `ID` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Description` VARCHAR(500) NOT NULL,
  `DatetimeAdded` DATETIME NOT NULL,
  `DatetimeRemoved` DATETIME NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE);

-- -----------------------------------------------------
-- Table `mydb_v7`.`CollectionItems`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v7`.`CollectionItems` (
  `Collections_ID` INT NOT NULL,
  `Products_ID` INT NOT NULL,
  INDEX `fk_CollectionItems_Collections1_idx` (`Collections_ID` ASC) VISIBLE,
  INDEX `fk_CollectionItems_Products1_idx` (`Products_ID` ASC) VISIBLE,
  CONSTRAINT `fk_CollectionItems_Collections1`
    FOREIGN KEY (`Collections_ID`)
    REFERENCES `mydb_v7`.`Collections` (`ID`),
  CONSTRAINT `fk_CollectionItems_Products1`
    FOREIGN KEY (`Products_ID`)
    REFERENCES `mydb_v7`.`Products` (`ID`));

-- -----------------------------------------------------
-- Table `mydb_v7`.`ProductFilters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb_v7`.`ProductFilters` (
  `Products_ID` INT NOT NULL,
  `Color` VARCHAR(45) NULL,
  `Size` VARCHAR(45) NULL,
  CONSTRAINT `fk_ProductFilters_Products1`
    FOREIGN KEY (`Products_ID`)
    REFERENCES `mydb_v7`.`Products` (`ID`));