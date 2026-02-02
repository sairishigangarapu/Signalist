'use server';

import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';
import { getAuth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  if (!email) return [];

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    // Better Auth stores users in the "user" collection
    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

    if (!user) return [];

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (err) {
    console.error('getWatchlistSymbolsByEmail error:', err);
    return [];
  }
}

export async function toggleWatchlistItem(symbol: string, company: string): Promise<{ isInWatchlist: boolean }> {
  const auth = await getAuth();
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email;

  if (!email) {
    throw new Error('User not authenticated');
  }

  const mongoose = await connectToDatabase();
  const db = mongoose.connection.db;
  if (!db) throw new Error('MongoDB connection not found');

  const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });
  if (!user) throw new Error('User not found');

  const userId = (user.id as string) || String(user._id || '');
  if (!userId) throw new Error('User ID not found');

  const upperSymbol = symbol.toUpperCase().trim();
  const cleanCompany = company.trim();

  const existing = await Watchlist.findOne({ userId, symbol: upperSymbol });

  if (existing) {
    await Watchlist.deleteOne({ _id: existing._id });
    return { isInWatchlist: false };
  }

  await Watchlist.create({
    userId,
    symbol: upperSymbol,
    company: cleanCompany || upperSymbol,
    addedAt: new Date(),
  });

  return { isInWatchlist: true };
}
