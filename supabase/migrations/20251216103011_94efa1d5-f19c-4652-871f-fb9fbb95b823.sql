-- Camisetas
INSERT INTO produtos (nome, descricao, preco, preco_promocional, sku, ativo, categoria_id) VALUES
  ('Camiseta Dry Fit Performance', 'Camiseta esportiva com tecnologia dry fit para máximo conforto', 89.90, 69.90, 'CAM-001', true, '648365a5-74ac-462d-859a-14614813e4d8'),
  ('Camiseta Treino Intensity', 'Camiseta de alta performance para treinos intensos', 79.90, NULL, 'CAM-002', true, '648365a5-74ac-462d-859a-14614813e4d8'),
  ('Camiseta Básica Fitness', 'Camiseta confortável para uso diário e academia', 59.90, 49.90, 'CAM-003', true, '648365a5-74ac-462d-859a-14614813e4d8'),
  ('Camiseta Compressão Pro', 'Camiseta de compressão para melhor circulação', 119.90, 99.90, 'CAM-004', true, '648365a5-74ac-462d-859a-14614813e4d8'),
  ('Camiseta Manga Longa UV', 'Proteção UV para treinos ao ar livre', 99.90, NULL, 'CAM-005', true, '648365a5-74ac-462d-859a-14614813e4d8'),
  ('Camiseta Oversized Street', 'Estilo oversized para treino e casual', 69.90, 59.90, 'CAM-006', true, '648365a5-74ac-462d-859a-14614813e4d8');

-- Bermudas
INSERT INTO produtos (nome, descricao, preco, preco_promocional, sku, ativo, categoria_id) VALUES
  ('Bermuda Training Pro', 'Bermuda leve e respirável para treinos', 99.90, 79.90, 'BER-001', true, 'c1d4e21c-0bc3-44d3-bdc2-f698c2c92aca'),
  ('Bermuda Running Light', 'Ideal para corrida e atividades aeróbicas', 89.90, NULL, 'BER-002', true, 'c1d4e21c-0bc3-44d3-bdc2-f698c2c92aca'),
  ('Bermuda Compressão 2em1', 'Bermuda com shorts de compressão interno', 129.90, 109.90, 'BER-003', true, 'c1d4e21c-0bc3-44d3-bdc2-f698c2c92aca'),
  ('Bermuda Casual Fit', 'Conforto para treino e dia a dia', 79.90, 69.90, 'BER-004', true, 'c1d4e21c-0bc3-44d3-bdc2-f698c2c92aca'),
  ('Bermuda Térmica Winter', 'Mantém o calor em dias frios', 119.90, NULL, 'BER-005', true, 'c1d4e21c-0bc3-44d3-bdc2-f698c2c92aca');

-- Regatas
INSERT INTO produtos (nome, descricao, preco, preco_promocional, sku, ativo, categoria_id) VALUES
  ('Regata Cavada Extreme', 'Regata cavada para máxima liberdade', 59.90, 49.90, 'REG-001', true, '4a67cc61-5cb2-4acc-bab9-9ea26e9e12fb'),
  ('Regata Dry Fit Classic', 'Regata clássica com tecnologia dry fit', 69.90, NULL, 'REG-002', true, '4a67cc61-5cb2-4acc-bab9-9ea26e9e12fb'),
  ('Regata Nadador Pro', 'Modelo nadador para musculação', 54.90, 44.90, 'REG-003', true, '4a67cc61-5cb2-4acc-bab9-9ea26e9e12fb'),
  ('Regata Longline Urban', 'Estilo longline para treino e casual', 64.90, NULL, 'REG-004', true, '4a67cc61-5cb2-4acc-bab9-9ea26e9e12fb');

-- Calças
INSERT INTO produtos (nome, descricao, preco, preco_promocional, sku, ativo, categoria_id) VALUES
  ('Calça Jogger Sport', 'Calça jogger confortável para treino', 149.90, 129.90, 'CAL-001', true, '31f4bd55-da75-43de-9121-965a709e278d'),
  ('Calça Moletom Premium', 'Moletom premium para dias frios', 169.90, NULL, 'CAL-002', true, '31f4bd55-da75-43de-9121-965a709e278d'),
  ('Calça Tactel Training', 'Leve e versátil para qualquer atividade', 119.90, 99.90, 'CAL-003', true, '31f4bd55-da75-43de-9121-965a709e278d'),
  ('Calça Compressão Full', 'Compressão total para performance', 139.90, NULL, 'CAL-004', true, '31f4bd55-da75-43de-9121-965a709e278d');

-- Tops
INSERT INTO produtos (nome, descricao, preco, preco_promocional, sku, ativo, categoria_id) VALUES
  ('Top Nadador High Support', 'Top com alto suporte para impacto', 89.90, 74.90, 'TOP-001', true, '5176ff87-41dd-4879-bf63-6ac488367918'),
  ('Top Cruzado Fashion', 'Design cruzado nas costas', 79.90, NULL, 'TOP-002', true, '5176ff87-41dd-4879-bf63-6ac488367918'),
  ('Top Basic Everyday', 'Conforto para uso diário', 59.90, 49.90, 'TOP-003', true, '5176ff87-41dd-4879-bf63-6ac488367918'),
  ('Top Longline Trendy', 'Modelo longline moderno', 69.90, 59.90, 'TOP-004', true, '5176ff87-41dd-4879-bf63-6ac488367918'),
  ('Top Alça Fina Minimal', 'Estilo minimalista e elegante', 64.90, NULL, 'TOP-005', true, '5176ff87-41dd-4879-bf63-6ac488367918');

-- Leggings
INSERT INTO produtos (nome, descricao, preco, preco_promocional, sku, ativo, categoria_id) VALUES
  ('Legging Cintura Alta Pro', 'Cintura alta com sustentação perfeita', 139.90, 119.90, 'LEG-001', true, '6aa9ae37-35d6-4c44-a3bc-9cee2c9f9b45'),
  ('Legging Seamless 3D', 'Sem costuras para máximo conforto', 159.90, NULL, 'LEG-002', true, '6aa9ae37-35d6-4c44-a3bc-9cee2c9f9b45'),
  ('Legging Push Up Sculpt', 'Efeito levanta bumbum', 129.90, 109.90, 'LEG-003', true, '6aa9ae37-35d6-4c44-a3bc-9cee2c9f9b45'),
  ('Legging 7/8 Essential', 'Modelo 7/8 versátil', 119.90, NULL, 'LEG-004', true, '6aa9ae37-35d6-4c44-a3bc-9cee2c9f9b45'),
  ('Legging Texturizada Wave', 'Textura exclusiva ondulada', 149.90, 129.90, 'LEG-005', true, '6aa9ae37-35d6-4c44-a3bc-9cee2c9f9b45');

-- Acessórios
INSERT INTO produtos (nome, descricao, preco, preco_promocional, sku, ativo, categoria_id) VALUES
  ('Luva Musculação Pro', 'Proteção e grip para treinos pesados', 49.90, 39.90, 'ACE-001', true, '0da6c307-3557-40b7-b259-be5bfede9970'),
  ('Cinto Lombar Power', 'Suporte lombar para agachamentos', 79.90, NULL, 'ACE-002', true, '0da6c307-3557-40b7-b259-be5bfede9970'),
  ('Munhequeira Elastic', 'Suporte para punhos', 29.90, 24.90, 'ACE-003', true, '0da6c307-3557-40b7-b259-be5bfede9970'),
  ('Bolsa Gym Essential', 'Bolsa espaçosa para academia', 99.90, 89.90, 'ACE-004', true, '0da6c307-3557-40b7-b259-be5bfede9970'),
  ('Toalha Sport Quick Dry', 'Secagem rápida para treinos', 39.90, NULL, 'ACE-005', true, '0da6c307-3557-40b7-b259-be5bfede9970');