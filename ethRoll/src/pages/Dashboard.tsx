// Dashboard.tsx

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createConfig,
  http,
  WagmiProvider,
  useSendTransaction,
  injected,
  useAccount,
} from "wagmi";
import { mainnet } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";
import { useRef } from "react";
import { parseEther } from "viem";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [mainnet],
  connectors: [injected(), metaMask()],
  transports: {
    [mainnet.id]: http(),
  },
});

export const Dashboard = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SendETH />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

function SendETH() {
  const addressRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const { sendTransaction, data, isPending, isSuccess } = useSendTransaction();
  const { isConnected } = useAccount();

  const handleSend = () => {
    if (!addressRef.current || !amountRef.current) return;

    const to = addressRef.current.value.trim();
    const amount = amountRef.current.value.trim();

    if (!to || !amount) return alert("Please enter all details");

    try {
      const value = parseEther(amount);
      sendTransaction({ to, value });
    } catch (error) {
      alert("Invalid ETH amount");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white flex items-center justify-center px-4">
      <div className="bg-[#1f1f2f] p-10 rounded-2xl shadow-xl w-full max-w-md space-y-4">
        <h2 className="text-3xl font-bold text-center mb-4">Send Ethereum</h2>

        <input
          ref={addressRef}
          type="text"
          placeholder="Recipient wallet address"
          className="w-full p-3 rounded-md bg-gray-800 text-white outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <input
          ref={amountRef}
          type="text"
          placeholder="Amount in ETH"
          className="w-full p-3 rounded-md bg-gray-800 text-white outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <button
          onClick={handleSend}
          className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-200 p-3 rounded-md font-semibold"
          disabled={!isConnected || isPending}
        >
          {isPending ? "Sending..." : "Send ETH"}
        </button>

        {isSuccess && (
          <p className="text-green-400 break-words text-sm">
            Transaction Hash: <a href={`https://etherscan.io/tx/${data?.hash}`} target="_blank" rel="noopener noreferrer" className="underline">{data?.hash}</a>
          </p>
        )}
      </div>
    </div>
  );
}
