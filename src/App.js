import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi'
import { config } from './wagmiConfig' // Import config di sini

const queryClient = new QueryClient()

function WalletConnector() {
  const { address, isConnected } = useAccount()
  const { data: balanceData } = useBalance({ address })
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (!isConnected) {
    return (
      <div>
        <p>Connect your wallet to see balance:</p>
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => connect({ connector })}
            style={{
              padding: '12px 24px',
              margin: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '8px'
            }}
          >
            {connector.name}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div>
      <p>✅ Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
      <p>💰 ETH Balance: {balanceData?.formatted || '0'} {balanceData?.symbol}</p>
      <button
        onClick={() => disconnect()}
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '8px'
        }}
      >
        Disconnect
      </button>
    </div>
  )
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div style={{ padding: 40, fontFamily: 'Arial' }}>
          <h1>💰 Web3 Wallet Connector</h1>
          <WalletConnector />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App