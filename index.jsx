import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [profile, setProfile] = useState({ name: "Guest#0001", avatar: null });
  const [balance, setBalance] = useState({ USDT: 1000, BTC: 0, ETH: 0, SOL: 0 });
  const [log, setLog] = useState([]);
  const [opening, setOpening] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  const boxes = [
    {
      id: "btc",
      title: "Cyber Gold",
      subtitle: "Chance to win BTC",
      price: 100,
      token: "BTC",
      rarities: [
        { name: "Common", chance: 70, range: [0.0001, 0.0003] },
        { name: "Rare", chance: 25, range: [0.0005, 0.002] },
        { name: "Jackpot", chance: 5, range: [0.01, 0.1] },
      ],
      color: "from-yellow-400 to-yellow-600",
    },
    {
      id: "eth",
      title: "Neon Ether",
      subtitle: "Chance to win ETH",
      price: 60,
      token: "ETH",
      rarities: [
        { name: "Common", chance: 65, range: [0.001, 0.005] },
        { name: "Rare", chance: 30, range: [0.01, 0.05] },
        { name: "Jackpot", chance: 5, range: [0.5, 2] },
      ],
      color: "from-purple-500 to-pink-600",
    },
    {
      id: "sol",
      title: "Solana Surge",
      subtitle: "Chance to win SOL",
      price: 30,
      token: "SOL",
      rarities: [
        { name: "Common", chance: 75, range: [0.1, 0.5] },
        { name: "Rare", chance: 23, range: [1, 3] },
        { name: "Jackpot", chance: 2, range: [10, 40] },
      ],
      color: "from-cyan-400 to-blue-500",
    },
  ];

  const openBox = async (box) => {
    if (opening) return;
    if (balance.USDT < box.price) {
      alert("Saldo USDT insuficiente para abrir esta caja (demo usa saldo ficticio).");
      return;
    }

    setBalance((b) => ({ ...b, USDT: +(b.USDT - box.price).toFixed(2) }));
    setOpening(box.id);

    await new Promise((r) => setTimeout(r, 2600));

    const r = Math.random() * 100;
    let cumulative = 0;
    let resultRarity = box.rarities[box.rarities.length - 1];
    for (const rty of box.rarities) {
      cumulative += rty.chance;
      if (r <= cumulative) {
        resultRarity = rty;
        break;
      }
    }

    const amount = (
      resultRarity.range[0] + Math.random() * (resultRarity.range[1] - resultRarity.range[0])
    ).toFixed(6);

    setBalance((b) => ({ ...b, [box.token]: +(b[box.token] + parseFloat(amount)).toFixed(6) }));

    const entry = {
      time: new Date().toISOString(),
      box: box.title,
      token: box.token,
      rarity: resultRarity.name,
      amount,
    };
    setLog((l) => [entry, ...l].slice(0, 30));

    setOpening(null);
  };

  const connectFakeWallet = () => {
    setConnected(true);
    setProfile({ name: "SWEAT_R1#" + Math.floor(Math.random() * 9999), avatar: null });
  };

  const resetDemo = () => {
    setBalance({ USDT: 1000, BTC: 0, ETH: 0, SOL: 0 });
    setLog([]);
    setConnected(false);
    setProfile({ name: "Guest#0001", avatar: null });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050816] to-[#00101a] -z-10">
        <div className="opacity-20 mix-blend-screen">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="#0ff" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#ff0080" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#g1)" />
          </svg>
        </div>
      </div>

      <header className="py-6 px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-400">SWEAT</div>
          <div className="text-sm text-gray-300">Where Crypto Meets the Thrill</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col text-right mr-4">
            <span className="text-xs text-gray-400">Balance (demo)</span>
            <span className="text-sm">USDT: {balance.USDT}</span>
          </div>

          {!connected ? (
            <button
              onClick={connectFakeWallet}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500"
            >
              Connect (demo)
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-300">{profile.name}</div>
              <button
                onClick={() => setShowAdmin((s) => !s)}
                className="px-3 py-1 rounded bg-gray-800/40 text-xs border border-gray-700"
              >
                Admin
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="px-8 pb-24">
        <section className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {boxes.map((box) => (
              <div key={box.id} className="relative">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className={`rounded-xl p-6 border border-white/5 shadow-xl bg-gradient-to-br ${box.color} bg-opacity-10`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">{box.title}</h3>
                      <p className="text-xs text-gray-200">{box.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">Price</div>
                      <div className="text-xl font-semibold">{box.price} USDT</div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <div
                      className="w-28 h-20 rounded-lg flex items-center justify-center transform perspective-800 hover:rotate-y-12 transition-transform duration-700"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      <div className="w-20 h-12 rounded-md flex items-center justify-center bg-black/30 border border-white/10 backdrop-blur">
                        <div className="text-xs font-bold tracking-wide">{box.token}</div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="text-xs text-gray-300">Odds</div>
                      <div className="mt-2 flex gap-2 text-xs">
                        {box.rarities.map((r) => (
                          <div key={r.name} className="px-2 py-1 bg-white/5 rounded">{r.name} {r.chance}%</div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <button
                        onClick={() => openBox(box)}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105"
                      >
                        Open
                      </button>
                      <div className="text-xs mt-2 text-gray-400">Max jackpot shown in demo</div>
                    </div>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {opening === box.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/80 rounded-xl flex items-center justify-center"
                    >
                      <div className="w-80 h-48 flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold mb-4">Rolling...</div>
                        <div className="w-64 h-12 rounded-full bg-white/5 flex items-center justify-center">
                          <div className="animate-pulse">▓▓▓▓▓▓▓▓▓▓</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <div className="rounded-xl p-6 bg-gradient-to-br from-white/2 to-white/1 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold">Recent Opens</h4>
                  <div className="text-xs text-gray-400">Demo logs (local)</div>
                </div>

                {log.length === 0 ? (
                  <div className="text-gray-400">No opens yet — be the first VIP.</div>
                ) : (
                  <div className="space-y-3">
                    {log.map((l, i) => (
                      <div key={i} className="flex items-center justify-between bg-black/20 p-3 rounded">
                        <div>
                          <div className="text-sm font-semibold">{l.box} — {l.rarity}</div>
                          <div className="text-xs text-gray-400">{l.amount} {l.token}</div>
                        </div>
                        <div className="text-xs text-gray-400">{new Date(l.time).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <aside className="rounded-xl p-6 bg-gradient-to-br from-white/2 to-white/1 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm text-gray-400">Profile</div>
                  <div className="font-bold">{profile.name}</div>
                </div>
                <div className="text-right text-xs text-gray-400">Demo</div>
              </div>

              <div className="mt-4 text-sm">
                <div className="flex justify-between"><span>BTC</span><span>{balance.BTC}</span></div>
                <div className="flex justify-between"><span>ETH</span><span>{balance.ETH}</span></div>
                <div className="flex justify-between"><span>SOL</span><span>{balance.SOL}</span></div>
                <div className="flex justify-between mt-2 font-semibold"><span>USDT</span><span>{balance.USDT}</span></div>
              </div>

              <div className="mt-4">
                <button onClick={resetDemo} className="w-full px-3 py-2 rounded bg-gray-800/40 text-sm">Reset Demo</button>
              </div>
            </aside>
          </div>

          <AnimatePresence>
            {showAdmin && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-8 p-6 rounded-xl bg-gradient-to-br from-gray-900/60 to-black border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold">Admin (simulated)</h4>
                  <div className="text-xs text-gray-400">This is a mock admin for demo only.</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {boxes.map((b) => (
                    <div key={b.id} className="p-3 rounded bg-black/30">
                      <div className="text-sm font-semibold">{b.title}</div>
                      <div className="text-xs text-gray-400">Price: {b.price} USDT</div>
                      <div className="mt-2 text-xs">Rarities:</div>
                      <div className="mt-1 text-xs">
                        {b.rarities.map((r) => (
                          <div key={r.name} className="flex justify-between text-xs py-1">
                            <span>{r.name}</span>
                            <span>{r.chance}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <footer className="fixed bottom-4 left-4 text-xs text-gray-500">SWEAT — Demo prototipo • No real funds • For investor pitches only</footer>
    </div>
  );
}
