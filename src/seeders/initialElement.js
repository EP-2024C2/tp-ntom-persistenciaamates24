const { Componente, Fabricante, Producto } = require("../models");

const initialElementData = async () => {
  try {
    const Producto1 = await Producto.create({
      // id: 1,
      nombre: "Laptop X200",
      descripcion: "Una laptop de alto rendimiento",
      precio: 1200.99,
      pathImg: "/images/productos/laptop-x200.jpg",
    });
    const Producto2 = await Producto.create({
      // id: 2,
      nombre: "Iphone 35",
      descripcion: "Smartphone de alto rendimiento",
      precio: 3400,
      pathImg: "/images/iphone-35.png",
    });

    const Fabricante1 = await Fabricante.create({
      // id: 1,
      nombre: "TechCorp",
      direccion: "1234 Elm St, Ciudad",
      numeroContacto: "+123456789",
      pathImgPerfil: "/images/fabricantes/techcorp.jpg",
    });

    const Fabricante2 = await Fabricante.create({
      // id: 2,
      nombre: "MemTech",
      direccion: "5678 Willow St, Ciudad",
      numeroContacto: "+987654321",
      pathImgPerfil: "/images/fabricantes/memtech.jpg",
    });

    const Componente1 = await Componente.create({
      // id: 1,
      nombre: "Procesador Intel i7",
      descripcion: "Procesador de octava generación",
    });

    const Componente2 = await Componente.create({
      // id: 3,
      nombre: "Memoria RAM 16GB",
      descripcion: "Memoria RAM DDR4 de alta velocidad",
    });

    Producto1.addFabricante(Fabricante1);
    Producto1.addComponente(Componente1);
    Producto1.addComponente(Componente2);

  } catch (e) {
    console.log(e);
  }
};

module.exports = {
    initialElementData,
};