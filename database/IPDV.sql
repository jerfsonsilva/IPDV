-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 04-Set-2021 às 09:36
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
(1, 'programador');

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
(1, 'Tecnologia da informação');

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
(1, 'Compras', 1);

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
(26, 'teste', 'jerfsonlink@gmail.com', '$2b$08$6GFbYHjVrsz.QPHQxOPrNumIM876AWiAnP75RAm2qHXcz99ZBI2Ny', 1, 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `Cargo`
--
ALTER TABLE `Cargo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `descricao` (`descricao`);

--
-- Índices para tabela `CentroCusto`
--
ALTER TABLE `CentroCusto`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `descricao` (`descricao`);

--
-- Índices para tabela `Departamento`
--
ALTER TABLE `Departamento`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `descricao` (`descricao`),
  ADD KEY `FKIDcentroCusto` (`FKIDcentroCusto`);

--
-- Índices para tabela `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `FKIDcargo` (`FKIDcargo`),
  ADD KEY `FKIDdepartamento` (`FKIDdepartamento`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `Cargo`
--
ALTER TABLE `Cargo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `CentroCusto`
--
ALTER TABLE `CentroCusto`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `Departamento`
--
ALTER TABLE `Departamento`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `Usuario`
--
ALTER TABLE `Usuario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

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
