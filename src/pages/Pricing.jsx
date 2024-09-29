// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>Only $9.9/month</h2>
          <ul>
            <li>Unlimited country tracking</li>
            <li>Personalized trip recommendations</li>
            <li>Secure cloud storage for your travel history</li>
            <li>24/7 priority customer support</li>
          </ul>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
