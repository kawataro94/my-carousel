DROP TABLE IF EXISTS Presentations;

CREATE TABLE IF NOT EXISTS Presentations (`id` TEXT PRIMARY KEY, `name` TEXT);

INSERT INTO
    Presentations (`id`, `name`)
VALUES
    ("cm28c6lbu00008zx71m5z3zw2", 'dog'),
    ("cm28c6x4600008zx7adxj7hkp", 'cat'),
    ("cm28c77oq00008zx7eulb5ve3", 'bird');

DROP TABLE IF EXISTS Photos;

CREATE TABLE IF NOT EXISTS Photos (
    `id` TEXT PRIMARY KEY,
    `url` TEXT
);

ALTER TABLE Photos ADD COLUMN `presentation_id` Text REFERENCES Presentations(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO
    Photos (`id`, `presentation_id`, `url`)
VALUES
    ("cm28cy64600008zx70fco8avm", 'cm28c6lbu00008zx71m5z3zw2', "pexels-photo-1805164-landscape.jpeg"),
    ("cm28cybhj00008zx7hr9jdsfo", 'cm28c6lbu00008zx71m5z3zw2', "pexels-photo-1851164-landscape.jpeg"),
    ("cm28cyeva00008zx7e1s5gldh", 'cm28c6lbu00008zx71m5z3zw2', "pexels-photo-933498-landscape.jpeg"),
    ("cm28cyifa00008zx7b44bf3mj", 'cm28c6lbu00008zx71m5z3zw2', "pexels-photo-825947-landscape.jpeg"),
    ("cm28cyn8u00008zx7cmpugetl", 'cm28c6lbu00008zx71m5z3zw2', "pexels-photo-2253275-landscape.jpeg"),
    ("cm28cyqdy00008zx7dklq954x", 'cm28c6lbu00008zx71m5z3zw2', "pexels-photo-220938-landscape.jpeg"),
    ("cm28cysxy00008zx794qr9ey8", 'cm28c6lbu00008zx71m5z3zw2', "pexels-photo-58997-landscape.jpeg"),
    ("cm28cyvj900008zx7ezvy79ay", 'cm28c6lbu00008zx71m5z3zw2', "pexels-photo-1108099-landscape.jpeg"),
    ("cm28cyydp00008zx72hho8fqv", 'cm28c6x4600008zx7adxj7hkp', "kitty-cat-kitten-pet-45201-landscape.jpeg"),
    ("cm28cz1cc00008zx7ghawbz1j", 'cm28c6x4600008zx7adxj7hkp', "cat-pet-animal-domestic-104827-landscape.jpeg"),
    ("cm28cz45z00008zx72m741a7i", 'cm28c6x4600008zx7adxj7hkp', "pexels-photo-416160-landscape.jpeg"),
    ("cm28cz76a00008zx74to94rai", 'cm28c6x4600008zx7adxj7hkp', "cat-sweet-kitty-animals-57416-landscape.jpeg"),
    ("cm28cz9xq00008zx7bl9ob6qg", 'cm28c6x4600008zx7adxj7hkp', "pexels-photo-1170986-landscape.jpeg"),
    ("cm28czci100008zx78fe22ioz", 'cm28c6x4600008zx7adxj7hkp', "pexels-photo-1741205-landscape.jpeg"),
    ("cm28czer900008zx75yxx930l", 'cm28c6x4600008zx7adxj7hkp', "pexels-photo-2071873-landscape.jpeg"),
    ("cm28czi4v00008zx79df89ny4", 'cm28c6x4600008zx7adxj7hkp', "pexels-photo-landscape.jpg"),
    ("cm28czk7b00008zx7ctx59mkz", 'cm28c77oq00008zx7eulb5ve3', "hummingbird-bird-birds-349758-landscape.jpeg"),
    ("cm28czmkw00008zx756f9d0ud", 'cm28c77oq00008zx7eulb5ve3', "osprey-adler-bird-of-prey-raptor-73825-landscape.jpeg"),
    ("cm28czorp00008zx7fmwb0wo9", 'cm28c77oq00008zx7eulb5ve3', "pexels-photo-1661179-landscape.jpeg"),
    ("cm28czrx600008zx72ac2808e", 'cm28c77oq00008zx7eulb5ve3', "pexels-photo-326900-landscape.jpeg"),
    ("cm28czvq400008zx71hozaru8", 'cm28c77oq00008zx7eulb5ve3', "pexels-photo-70069-landscape.jpeg"),
    ("cm28czy6200008zx7dihp04v9", 'cm28c77oq00008zx7eulb5ve3', "pexels-photo-1133957-landscape.jpeg"),
    ("cm28d00g000008zx799we9ahi", 'cm28c77oq00008zx7eulb5ve3', "bird-blue-cristata-cyanocitta-45851-landscape.jpeg"),
    ("cm28d02wg00008zx71smfdafn", 'cm28c77oq00008zx7eulb5ve3', "duckling-birds-yellow-fluffy-162140-landscape.jpeg"),
    ("cm28d05ow00008zx72hbx23rm", 'cm28c77oq00008zx7eulb5ve3', "pexels-photo-792416-landscape.jpeg");
