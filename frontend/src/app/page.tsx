import LatestRates from "../components/LatestRates";
import ConvertCurrency from "../components/ConvertCurrency";
import HistoricalRates from "../components/HistoricalRates";

export default function HomePage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h1>Currency Exchange Dashboard</h1>
      <LatestRates />
      <ConvertCurrency />
      <HistoricalRates />
    </main>
  );
}
