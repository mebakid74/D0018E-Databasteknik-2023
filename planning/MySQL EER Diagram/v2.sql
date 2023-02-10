-- MySQL Workbench Forward Engineering
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Customer` (
  `ID` INT NOT NULL,
  `FName` VARCHAR(45) NOT NULL,
  `LName` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `PhoneNumber` VARCHAR(45) NULL,
  `Address` VARCHAR(45) NULL,
  `Password` VARCHAR(45) NOT NULL,
  `Registered` TINYINT(1) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE);

-- -----------------------------------------------------
-- Table `mydb`.`Category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Category` (
  `ID` INT NOT NULL,
  `Parent_Category_ID` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_Category_Category1_idx` (`Parent_Category_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Category_Category1`
    FOREIGN KEY (`Parent_Category_ID`)
    REFERENCES `mydb`.`Category` (`ID`));

-- -----------------------------------------------------
-- Table `mydb`.`Products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Products` (
  `ID` INT NOT NULL,
  `Category_ID` INT NOT NULL,
  `Quantity` VARCHAR(45) NOT NULL,
  `Price` VARCHAR(45) NOT NULL,
  `Color` VARCHAR(45) NULL,
  `Size` VARCHAR(45) NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_Products_Category1_idx` (`Category_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Products_Category1`
    FOREIGN KEY (`Category_ID`)
    REFERENCES `mydb`.`Category` (`ID`));

-- -----------------------------------------------------
-- Table `mydb`.`Receipt`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Receipt` (
  `ID` INT NOT NULL,
  `Payment_ID` INT NOT NULL,
  `Customer_ID` INT NOT NULL,
  `OrderDate` DATE NOT NULL,
  `OrderStatus` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_Order_Customer1_idx` (`Customer_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Order_Customer1`
    FOREIGN KEY (`Customer_ID`)
    REFERENCES `mydb`.`Customer` (`ID`));

-- -----------------------------------------------------
-- Table `mydb`.`ReceiptItems`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ReceiptItems` (
  `Order_ID` INT NOT NULL,
  `Products_ID` INT NOT NULL,
  `Amount` INT NOT NULL,
  PRIMARY KEY (`Order_ID`),
  INDEX `fk_OrderItems_Products1_idx` (`Products_ID` ASC) VISIBLE,
  CONSTRAINT `fk_OrderItems_Order1`
    FOREIGN KEY (`Order_ID`)
    REFERENCES `mydb`.`Receipt` (`ID`),
  CONSTRAINT `fk_OrderItems_Products1`
    FOREIGN KEY (`Products_ID`)
    REFERENCES `mydb`.`Products` (`ID`));

-- -----------------------------------------------------
-- Table `mydb`.`Cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Cart` (
  `Products_ID` INT NOT NULL,
  `Customer_ID` INT NOT NULL,
  `Amount` INT NOT NULL,
  INDEX `fk_CartItems_Products1_idx` (`Products_ID` ASC) VISIBLE,
  PRIMARY KEY (`Customer_ID`),
  CONSTRAINT `fk_CartItems_Products1`
    FOREIGN KEY (`Products_ID`)
    REFERENCES `mydb`.`Products` (`ID`),
  CONSTRAINT `fk_CartItems_Customer1`
    FOREIGN KEY (`Customer_ID`)
    REFERENCES `mydb`.`Customer` (`ID`));

-- -----------------------------------------------------
-- Table `mydb`.`Reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Reviews` (
  `ID` INT NOT NULL,
  `Products_ID` INT NULL,
  `Rating` VARCHAR(1) NOT NULL,
  `Text` VARCHAR(45) NOT NULL,
  `Date` DATE NOT NULL,
  `Customer_ID` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `fk_Reviews_Products1_idx` (`Products_ID` ASC) VISIBLE,
  INDEX `fk_Reviews_Customer1_idx` (`Customer_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Reviews_Products1`
    FOREIGN KEY (`Products_ID`)
    REFERENCES `mydb`.`Products` (`ID`),
  CONSTRAINT `fk_Reviews_Customer1`
    FOREIGN KEY (`Customer_ID`)
    REFERENCES `mydb`.`Customer` (`ID`));

-- -----------------------------------------------------
-- Table `mydb`.`Admins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Admins` (
  `Customer_ID` INT NOT NULL,
  INDEX `fk_Admins_Customer1_idx` (`Customer_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Admins_Customer1`
    FOREIGN KEY (`Customer_ID`)
    REFERENCES `mydb`.`Customer` (`ID`));