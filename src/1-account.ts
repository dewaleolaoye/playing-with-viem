import { createPublicClient, formatEther, http } from 'viem';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';

const privateKey = "0x0c35b08538e994e6ee33cb93717a79d0ef19dea4108dd60dae7a530adb3d9aa0";
// console.log(privateKey, 'PRIVATE_KEY');

const account = privateKeyToAccount(privateKey);
// address = "0x2bc6C3956464250b45768BBd7F825dd622FE4c42"
// 0x2bc6C3956464250b45768BBd7F825dd622FE4c42
// console.log(account, 'ACCOUNT');

(async () => {
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http()
  });

  const balance = await publicClient.getBalance({
    // address: "0x4D741e2B3bd2464e92D59FBa109Bb4554678fe39"
    // address: "0x4D741e2B3bd2464e92D59FBa109Bb4554678fe39"
    address: account.address
  });

  console.log(formatEther(balance), 'BALANCE');

  const getCode = await publicClient.getCode({ address: account.address });
  const estimateFeesPerGas = await publicClient.estimateFeesPerGas();
  console.log(formatEther(estimateFeesPerGas.maxFeePerGas!), formatEther(estimateFeesPerGas.maxPriorityFeePerGas!), 'estimateFeesPerGas');

  const nonce = await publicClient.getTransactionCount({ address: account.address });
  console.log(nonce, 'getTransactionCount');



})();

// console.log(account, 'ACCOUNT');