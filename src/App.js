import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

// Product data
const PRODUCTS = [
  { id: 1, name: "Unisex Cologne", image: "cologne.jpg" },
  { id: 2, name: "Apple iWatch", image: "iwatch.jpg" },
  { id: 3, name: "Unique Mug", image: "mug.jpg" },
  { id: 4, name: "Mens Wallet", image: "wallet.jpg" },
];

function App() {
  const [qty, setQty] = useState(
    PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {})
  );

  const totalItems = Object.values(qty).reduce((s, n) => s + Number(n || 0), 0);

  const handleQty = (id, value) => {
    const n = Math.max(0, Number(value) || 0);
    setQty((q) => ({ ...q, [id]: n }));
  };

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Shop to React</h1>
        <div style={styles.cart}>
          <FontAwesomeIcon icon={faShoppingCart} />
          <span style={{ marginLeft: 8 }}>{totalItems} items</span>
        </div>
      </header>

      {/* Product List */}
      <div style={styles.list}>
        {PRODUCTS.map((p, i) => (
          <div
            key={p.id}
            style={{
              ...styles.row,
              borderTop: i === 0 ? "none" : "1px solid #eee",
            }}
          >
            <div style={styles.productContainer}>
              <h3 style={styles.productName}>{p.name}</h3>

              {/* Image + Quantity side by side */}
              <div style={styles.imageRow}>
                <img
                  src={`${process.env.PUBLIC_URL}/products/${p.image}`}
                  alt={p.name}
                  style={styles.image}
                />

                <div style={styles.quantityBox}>
                  <input
                    type="number"
                    min="0"
                    value={qty[p.id]}
                    onChange={(e) => handleQty(p.id, e.target.value)}
                    style={styles.input}
                  />
                  <span style={{ marginLeft: 8, color: "#666" }}>quantity</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Inline styles
const styles = {
  app: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    color: "#111",
    background: "#fff",
  },
  header: {
    background: "#67c8e7",
    padding: "18px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { margin: 0, fontSize: 28, fontWeight: 700 },
  cart: { display: "flex", alignItems: "center", fontSize: 14 },
  list: {
    margin: "0 16px 24px",
    background: "#fff",
    border: "1px solid #eaeaea",
  },
  row: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "22px",
  },
  productContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  productName: { margin: 0, fontSize: 18, fontWeight: 600 },
  imageRow: {
    display: "flex",
    alignItems: "center",
    gap: 20, // spacing between image and quantity
  },
  image: { width: 110, height: "auto", objectFit: "contain" },
  quantityBox: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: 46,
    height: 36,
    border: "1px solid #dcdcdc",
    textAlign: "center",
    borderRadius: 6,
    fontSize: 14,
    outline: "none",
  },
};

export default App;
