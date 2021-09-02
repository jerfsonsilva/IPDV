-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 02-Set-2021 às 09:38
-- Versão do servidor: 8.0.26-0ubuntu0.20.04.2
-- versão do PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ipvdteste`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `Cargo`
--

CREATE TABLE `Cargo` (
  `id` int NOT NULL,
  `descricao` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `Cargo`
--

INSERT INTO `Cargo` (`id`, `descricao`) VALUES
(1, 'Programador web'),
(3, '123456'),
(6, 'Engenheuiro1234534'),
(7, 'Havai');

-- --------------------------------------------------------

--
-- Estrutura da tabela `CentroCusto`
--

CREATE TABLE `CentroCusto` (
  `id` int NOT NULL,
  `descricao` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `CentroCusto`
--

INSERT INTO `CentroCusto` (`id`, `descricao`) VALUES
(1, 'TI'),
(3, 'Industrial');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Departamento`
--

CREATE TABLE `Departamento` (
  `id` int NOT NULL,
  `descricao` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `FKIDcentroCusto` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `Departamento`
--

INSERT INTO `Departamento` (`id`, `descricao`, `FKIDcentroCusto`) VALUES
(1, 'Software', 1),
(5, 'Energia', 3),
(6, 'Orçamentos', 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Usuario`
--

CREATE TABLE `Usuario` (
  `id` int NOT NULL,
  `nome` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `FKIDcargo` int NOT NULL,
  `FKIDdepartamento` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `Usuario`
--

INSERT INTO `Usuario` (`id`, `nome`, `email`, `password`, `FKIDcargo`, `FKIDdepartamento`) VALUES
(24, 'nadaeditad', 'nadaeditad@gmail.com', '$2b$08$PUdjnwxeF67qwEAJRTxP/.3zpcnHeu/f7nLlT7k753I1Mc9sYcEC2', 1, 5),
(25, 'asdsa', 'jerfsonlink@gmail.com', '$2b$08$nAgSCMpr/BhOBjc4sjfrb.JyZTCdugZ1Ds4zwImlxRbrUISvCwQA2', 1, 5),
(26, '123', 'jerfsonl12321ink@gmail.com', '$2b$08$6GFbYHjVrsz.QPHQxOPrNumIM876AWiAnP75RAm2qHXcz99ZBI2Ny', 1, 1),
(28, 'asdas', 'jerfsoasdsanlink@gmail.com', '$2b$08$WixCiTi2n/boZpicWAMQjePBc5XBHqOSBPRmDh4h7WW2wvjkCv8aq', 1, 1),
(29, 'asd', '123@gmail.com', '$2b$08$sZJtG5rguCvrijdxzmZMbelPU9U0KgwShGczz83lcf3I2808BTLta', 1, 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `Cargo`
--
ALTER TABLE `Cargo`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `CentroCusto`
--
ALTER TABLE `CentroCusto`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `Departamento`
--
ALTER TABLE `Departamento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKIDcentroCusto` (`FKIDcentroCusto`);

--
-- Índices para tabela `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKIDcargo` (`FKIDcargo`),
  ADD KEY `FKIDdepartamento` (`FKIDdepartamento`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `Cargo`
--
ALTER TABLE `Cargo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `CentroCusto`
--
ALTER TABLE `CentroCusto`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `Departamento`
--
ALTER TABLE `Departamento`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `Usuario`
--
ALTER TABLE `Usuario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `Departamento`
--
ALTER TABLE `Departamento`
  ADD CONSTRAINT `Departamento_ibfk_1` FOREIGN KEY (`FKIDcentroCusto`) REFERENCES `CentroCusto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `Usuario`
--
ALTER TABLE `Usuario`
  ADD CONSTRAINT `Usuario_ibfk_1` FOREIGN KEY (`FKIDcargo`) REFERENCES `Cargo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Usuario_ibfk_2` FOREIGN KEY (`FKIDdepartamento`) REFERENCES `Departamento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
