import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const popularProducts = [
  {
    id: 1,
    type: "Living Room Furniture",
    image:
      "https://i.pinimg.com/564x/be/61/0b/be610b47a66e0a9cc5d9599796675681.jpg",
    name: "Sofa",
    price: 649.0,
    offerPrice: 454.3, 
    details:
      "Enhance your living room with the Friheten Sleeper Sectional in Skiftebo Dark Gray. This versatile sofa offers spacious seating and convenient storage, perfect for small spaces. The sleeper feature provides a comfortable bed for guests, while the modern design complements various decor styles.",
  },
  {
    id: 8,
    type: "Dining Room Furniture",
    image:
      "https://i.pinimg.com/474x/ce/80/a6/ce80a6886163ebe6241f8582db83c8e8.jpg",
    name: "Bar Stool",
    price: 39.99,
    offerPrice: 31.99,
    details:
      "Upgrade your kitchen or bar area with the Stig Bar Stool in Black. This bar stool features a supportive backrest and comfortable seat, ideal for extended use. Its minimalist design and durable construction make it a stylish and practical choice.",
  },
  {
    id: 12,
    type: "Bedroom Furniture",
    image:
      "https://i.pinimg.com/474x/df/04/e3/df04e3dc975255f9e13736145379e64b.jpg",
    name: "Bed Frame",
    price: 299.0,
    offerPrice: 239.2,
    details:
      "Upgrade your bedroom with the Malm Bed Frame in High Black-Brown/Luröy. This bed frame features a high headboard and sturdy construction, providing both style and support. Its versatile design complements various decor styles, making it a perfect centerpiece.",
  },
  {
    id: 16,
    type: "Bedroom Furniture",
    image:
      "https://i.pinimg.com/474x/47/d6/29/47d629fa9f4d366542f2ea73bf978d20.jpg",
    name: "Dresser",
    price: 249.0,
    offerPrice: 134.25,
    details:
      "Organize your entertainment area with the Besta TV Bench in Lappviken Black-Brown. This TV bench features drawers for media storage and a spacious top for TVs or decor. Its sleek design and integrated cable management create a tidy setup for your living room.",
  },
  {
    id: 18,
    type: "Bedroom Furniture",
    image:
      "https://i.pinimg.com/474x/31/60/2c/31602c096b3bfeb49dafb1d09bc095c3.jpg",
    name: "Bed with Storage",
    price: 549.0,
    offerPrice: 363.99,
    details:
      "Organize your books and decor with the Billy Bookcase in White. This bookcase features adjustable shelves and a simple design, ideal for living rooms or offices. Its versatile style and sturdy construction provide long-lasting storage solutions.",
  },
  {
    id: 22,
    type: "Dining Room Furniture",
    image:
      "https://i.pinimg.com/474x/37/30/f5/3730f5c934c76e2645d87fa829580aa7.jpg",
    name: "Drop-Leaf Table",
    price: 159.0,
    offerPrice: 127.2,
    details:
      "Black drop-leaf table suitable for small dining spaces, seats up to four people comfortably.",
  },
  {
    id: 26,
    type: "Dining Room Furniture",
    image:
      "https://i.pinimg.com/474x/17/ce/21/17ce21c8f1ee242c113c33e0fc3ca396.jpg",
    name: "Dining Set",
    price: 349.0,
    offerPrice: 244.3,
    details:
      "Versatile dining set including a table, six chairs, and a bench, great for family gatherings.",
  },
  {
    id: 30,
    type: "Dining Room Furniture",
    image:
      "https://i.pinimg.com/736x/35/97/91/359791e3d04d86067b43207ecfae65da.jpg",
    name: "Bench",
    price: 119.0,
    offerPrice: 83.3,
    details:
      "Acacia wood bench, sturdy and durable, suitable for indoor or outdoor use.",
  },
];

function Popular() {
  return (
    <div className="category">
      <div className="container card card-container m-5">
        <h2 className="text-center mt-4">Popular Products</h2>
        <div className="  p-5 ">
          <div className="row ms-3 ">
            {popularProducts.map((list) => (
              <div key={list.id} className="col-md-3 mb-4">
                <Link to={`/allproducts/${list.id}`}>
                  <img
                    src={list.image}
                    alt={list.name}
                    className="card category-image"
                  />
                </Link>
                <h5 className="text-start text-secondary mt-3 me-3">
                  {list.name}
                </h5>
                <div>
                  <h6 className="text-success">$ {list.offerPrice}</h6>
                  <small>
                    <del className="text-danger">$ {list.price}</del>
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popular;
