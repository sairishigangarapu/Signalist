import TradingViewWidget from "@/components/TradingViewWidget";
import { MARKET_DATA_WIDGET_CONFIG } from "@/lib/constants";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";
import { getAuth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";

async function WatchlistPage() {
  const auth = await getAuth();
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email || "";

  const symbols = await getWatchlistSymbolsByEmail(email);

  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  const config =
    symbols.length === 0
      ? MARKET_DATA_WIDGET_CONFIG
      : {
          ...MARKET_DATA_WIDGET_CONFIG,
          symbolsGroups: [
            {
              name: "My Watchlist",
              symbols: symbols.map((sym) => ({
                name: `NASDAQ:${sym}`,
                displayName: sym,
              })),
            },
          ],
        };

  return (
    <div className="flex min-h-screen home-wrapper">
      <section className="grid w-full gap-8 home-section">
        {symbols.length === 0 ? (
          <div className="watchlist-empty-container">
            <div className="watchlist-empty">
              <h2 className="text-xl font-semibold text-gray-100">
                Your watchlist is empty
              </h2>
              <p className="mt-2 text-gray-400">
                Search for stocks and click &quot;Add to watchlist&quot; to
                track them here.
              </p>
            </div>
          </div>
        ) : null}

        <div className="h-full md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            title="My Watchlist"
            scriptUrl={`${scriptUrl}market-quotes.js`}
            config={config}
            height={600}
          />
        </div>
      </section>
    </div>
  );
}

export default WatchlistPage;


