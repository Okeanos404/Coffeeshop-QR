const products = [
    { id: 'c1', name: 'Espresso', price: 20000, category: 'Coffee', description: 'Kopi pekat dengan crema yang sempurna.', image: 'assets/img/espresso.png' },
    { id: 'c2', name: 'Café Latte', price: 28000, category: 'Coffee', description: 'Perpaduan espresso dan susu steamed lembut.', image: 'assets/img/latte.png' },
    { id: 'c3', name: 'Caramel Macchiato', price: 32000, category: 'Coffee', description: 'Espresso dengan vanilla, susu, dan saus karamel.', image: 'assets/img/macchiato.png' },
    { id: 'c4', name: 'Cold Brew', price: 25000, category: 'Coffee', description: 'Kopi seduh dingin selama 18 jam yang menyegarkan.', image: 'assets/img/coldbrew.png' },
    { id: 'c5', name: 'V60 Pour Over', price: 30000, category: 'Coffee', description: 'Seduhan manual dengan filter kertas (Single Origin).', image: 'assets/img/v60.png' },
    { id: 's1', name: 'Butter Croissant', price: 25000, category: 'Snack', description: 'Croissant mentega klasik yang renyah di luar.', image: 'assets/img/croissant.png' },
    { id: 's2', name: 'Fudgy Brownies', price: 22000, category: 'Snack', description: 'Brownies cokelat pekat dan lembut dengan taburan chocochips.', image: 'assets/img/brownies.png' },
    { id: 's3', name: 'Truffle Fries', price: 35000, category: 'Snack', description: 'Kentang goreng renyah dengan minyak truffle dan parmesan.', image: 'assets/img/fries.png' },
    { id: 'nc1', name: 'Matcha Latte', price: 28000, category: 'Non-Coffee', description: 'Paduan bubuk teh hijau Jepang premium dan susu segar.', image: 'assets/img/matcha.png' },
    { id: 'nc2', name: 'Taro Latte', price: 25000, category: 'Non-Coffee', description: 'Minuman susu rasa taro yang manis dan creamy.', image: 'assets/img/taro.png' },
    { id: 'nc3', name: 'Red Velvet Latte', price: 26000, category: 'Non-Coffee', description: 'Rasa red velvet cake klasik dalam secangkir minuman hangat.', image: 'assets/img/redvelvet.png' },
    { id: 'nc4', name: 'Lychee Tea', price: 22000, category: 'Non-Coffee', description: 'Teh melati segar dengan potongan buah leci asli.', image: 'assets/img/lycheetea.png' },
    { id: 'nc5', name: 'Signature Chocolate', price: 28000, category: 'Non-Coffee', description: 'Cokelat pekat ala artisan yang memanjakan lidah.', image: 'assets/img/choco.png' },
    { id: 's4', name: 'Caramel Croffle', price: 28000, category: 'Snack', description: 'Croffle renyah disajikan dengan saus karamel lezat.', image: 'assets/img/caramel_croffle.png' },
    { id: 's5', name: 'Mix Platter', price: 42000, category: 'Snack', description: 'Kombinasi sosis, chicken wings, onion rings, dan potato wedges.', image: 'assets/img/mix_platter.png' },
    { id: 'rb1', name: 'Chicken Nanban Rice Bowl', price: 38000, category: 'Rice Bowls', description: 'Ayam renyah berbalut saus nanban dan tartar diatas nasi hangat.', image: 'assets/img/chicken_nanban.png' },
    { id: 'rb2', name: 'Salted Egg Dory', price: 40000, category: 'Rice Bowls', description: 'Ikan dory gurih berbalur saus telur asin creamy.', image: 'assets/img/salted_egg_dory.png' },
    { id: 'rb3', name: 'Beef Yakiniku Donburi', price: 45000, category: 'Rice Bowls', description: 'Irisan daging sapi manis gurih khas Jepang.', image: 'assets/img/beef_yakiniku.png' },
    { id: 'rb4', name: 'Chicken Sambal Matah Rice', price: 35000, category: 'Rice Bowls', description: 'Kombinasi ayam goreng dan pedas segar sambal matah.', image: 'assets/img/chicken_sambal.png' },
    { id: 'rb5', name: 'Crazy Rice Bowl', price: 37000, category: 'Rice Bowls', description: 'Nasi Gila klasik dengan sosis, bakso, dan telur bumbu rahasia.', image: 'assets/img/crazy_rice_bowl.png' }
];

const tables = [
    { id: 't1', name: 'Table 01' },
    { id: 't2', name: 'Table 02' },
    { id: 't3', name: 'Table 03' }
];
