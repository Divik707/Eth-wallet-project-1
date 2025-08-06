import EthImage from '../assets/ethereum-svgrepo-com.svg'

import {
    createConfig,
    http,
    useConnect,
    useAccount,
    useDisconnect,
    WagmiProvider,
  } from "wagmi";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { mainnet } from "wagmi/chains";
  import { injected, metaMask } from "wagmi/connectors";
  import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
  
  export const config = createConfig({
    chains: [mainnet],
    connectors: [injected(), metaMask()],
    transports: {
      [mainnet.id]: http(),
    },
  });
  
  const client = new QueryClient();
  
  export function LandingPage() {
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <Header />
        </QueryClientProvider>
      </WagmiProvider>
    );
  }
  

function Header() {
  const navigate = useNavigate();  
  const [showWalletOptions, setShowWalletOptions] = useState(false);

  const { connectors, connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const refs = [
    { label: "Features", href: "/features" },
    { label: "Security", href: "/security" },
    { label: "About", href: "/about" }
  ];

  // Hide popup after connecting
  useEffect(() => {
    if (isConnected) {
      setShowWalletOptions(false);
    }
  }, [isConnected]);


  function naviagteToDashboard() {
    navigate('/dashboard')
  }
  function search() {
    window.location.href = "https://coinmarketcap.com/currencies/ethereum/?update=1754396025056";
  }
  function tip() {
    navigate('/tip')
  }
  return (
    <div className="relative bg-[#09080a] h-screen w-full ">
      {/* Header Bar */}
      <div className="bg-[#09080a] h-20 w-full flex justify-around items-center px-4">
        <div className="flex flex-row gap-3 items-center">
          <div className="bg-[#903adc] h-10 w-10 rounded-xl"></div>
          <div className="text-xl text-neutral-100 font-bold drop-shadow-amber-200">
            EtherFlow
          </div>
        </div>

        <div className="flex gap-6">
          {refs.map((ref, index) => (
            <p onClick={search}
              className="text-neutral-100 text-lg hover:scale-110 transition-transform duration-700 cursor-pointer"
              key={index}
            >
              {ref.label}
            </p>
          ))}
        </div>

        <div className="flex gap-3">
          {isConnected ? (
            <>
              <button
                className="text-green-400  px-4 py-2 rounded-xl"
                disabled
              >
                Connected
              </button>
              <button
                onClick={() => {
                  disconnect();
                  setShowWalletOptions(false);
                }}
                className="text-red-400 border border-red-400 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition duration-500"
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowWalletOptions(!showWalletOptions)}
              className="text-neutral-100 border px-4 py-2 rounded-xl hover:bg-[#903adc] hover:border-transparent transition duration-500"
            >
              Connect Wallet
            </button>
           
          )}
          <button onClick={tip} className='text-neutral-100 border px-4 py-2 rounded-xl hover:bg-[#903adc] hover:border-transparent transition duration-500'>Buy me a coffee</button>
        </div>
      </div>

      {/* Wallet Connect Options */}
      {showWalletOptions && !isConnected && (
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-white text-black p-6 rounded-xl z-50 shadow-lg w-96">
          <h3 className="text-xl font-semibold mb-4">Choose a Wallet</h3>
          <div className="flex flex-col gap-3">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                className="px-4 py-2 rounded-md bg-neutral-200 hover:bg-neutral-300 text-black"
              >
                {connector.name}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col  items-center h-screen bg-[#09080a] mt-20 text-white ">
             <p className="text-8xl hover:scale-110 transition-transform duration-700 pointer-cursor">The Future of</p>
             <p className="text-8xl hover:scale-110 transition-transform duration-700 pointer-cursor">Ethereum Wallets</p>
             <div className='flex flex-row gap-10 mx-auto items-center'>
             <img src={EthImage} alt="EtheriumImage" className='h-60 w-40 cursor-pointer' />
             <div onClick={naviagteToDashboard} className='text-xl border-1 border-amber-50 px-4 py-2 rounded-lg hover:scale-110 transition-transform duration-600'>
                Send Eth
             </div>
             </div>
             <div className='text-5xl mt-5  hover:scale-110 transition-transform duration-600'>Know more about Blockchain</div>
             <div className='bg-[#09080a] h-screen w-full flex justify-center items-center gap-20 mt-10 hover:scale-110 transition-transform duration-600'>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/Tvf7CXEjFNU?si=7kQ-7cK7pQXgL3nd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/5X1uwNJkZFw?si=WiHlxKN2eQ1-9m08" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      </div>
      <div>
      
      </div>
    </div>

  );
}
