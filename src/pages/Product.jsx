import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About GlobalTravelMate.</h2>
          <p>
            GlobalTravelMate is your ultimate travel companion app. It helps
            users track the countries they have visited and plan future
            adventures. With an interactive map, detailed travel logs, and
            easy-to-use features, you can explore the world and keep a record of
            your global travels.
          </p>
          <p>
            It simplifies trip planning, offers personalized recommendations,
            and ensures that your travel memories are stored safely. Whether
            you are a seasoned traveler or planning your first journey,
            GlobalTravelMate is here to guide you.
          </p>
        </div>
      </section>
    </main>
  );
}
