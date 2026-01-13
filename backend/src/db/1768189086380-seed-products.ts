import { MigrationInterface, QueryRunner } from 'typeorm';

export class Db1768189086380 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO products (name, image, price, stock, description) VALUES
 ('Camiseta básica blanca', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJRT6-I7NFT75nDZA_brazRDVYmWpYGKHgQQ&s', 50, 35000, 'Camiseta de algodón 100% color blanco, ideal para uso diario'),
('Camiseta básica negra', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuxLjkkxghcniMhyf7e33mJxN9tiCEXHko8A&s', 45, 35000, 'Camiseta de algodón 100% color negro, cómoda y versátil'),
('Jean clásico azul', 'https://americaneagle.vtexassets.com/arquivos/ids/8576607-800-auto?v=638914224028470000&width=800&height=auto&aspect=true', 30, 120000, 'Jean azul de corte recto, resistente y moderno'),
('Zapatos deportivos', 'https://m.media-amazon.com/images/I/71qiU3c1qqL._AC_UY900_.jpg', 20, 180000, 'Zapatos deportivos ligeros para uso urbano y entrenamiento'),
('Chaqueta impermeable', 'https://atipic.co/wp-content/uploads/2021/01/Gris-Oscuro_Mujer.webp', 15, 220000, 'Chaqueta resistente al agua ideal para clima lluvioso'),
('Gorra ajustable', 'https://574.com.co/cdn/shop/files/C086C84E-FB47-4D2F-97E3-4D1F44809130_1024x1024.jpg?v=1736879738', 40, 45000, 'Gorra con cierre ajustable y diseño casual'),
('Mochila urbana', 'https://carlett.com/cdn/shop/files/carlett-mochila-10.jpg?v=1729671825&width=2400', 25, 160000, 'Mochila amplia con compartimentos para portátil'),
('Reloj digital', 'https://www.woodenson.co/wp-content/uploads/sites/3/2019/05/Cassius-2.jpg', 18, 95000, 'Reloj digital con cronómetro y resistencia al agua'),
('Audífonos inalámbricos', 'https://www.ktronix.com/medias/6942103112225-001-1400Wx1400H?context=bWFzdGVyfGltYWdlc3wzMzY2NHxpbWFnZS93ZWJwfGFEZGlMMmhqTmk4eE5ETTJOamt6Tnprd056SXpNQzgyT1RReU1UQXpNVEV5TWpJMVh6QXdNVjh4TkRBd1YzZ3hOREF3U0F8YmExNzQ0ZmJhNDllMzAzZWMxZGJlMWYzZWY1ODRkNGM4MGJlN2M4ZjkwZGNjZjg1NjgzNmE0YTQwMDhiYjZmYQ', 22, 210000, 'Audífonos bluetooth con estuche de carga')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM products`);
  }
}
