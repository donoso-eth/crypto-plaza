import { AfterViewInit, Component } from '@angular/core';
import { Framework } from '@superfluid-finance/sdk-core';
import { ethers, utils } from 'ethers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  receiverAddress = '';

  signer: ethers.providers.JsonRpcSigner;
  provider: ethers.providers.Web3Provider;
  sf: Framework;
  signerAddress: string;

  network : 'mumbai' | 'polygon' = 'mumbai'; 

  addressesObject = {
    mumbai: { usdc: '0x42bb40bF79730451B11f6De1CbA222F17b87Afd7', dai: '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f', chainId: 80001, chainIdHex: '0x13881' },
    polygon: { usdc: '0xCAa7349CEA390F89641fe306D93591f87595dc1F', dai: '0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2', chainId: 137, chainIdHex: '0x89' },
  };

  async connectMetamask() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);

    this.signer = this.provider.getSigner();

    this.signerAddress = await this.signer.getAddress();

    this.changeNetwork();
  }

  async changeNetwork() {
    try {
     
      const { chainId } = await this.provider.getNetwork();

      if (this.addressesObject[this.network].chainId !== chainId) {
      
        await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: this.addressesObject[this.network].chainIdHex }],
      });
      console.log('You have switched network');


      this.initializeSuperfluid()

      }
 
    } catch (switchError) {
   
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        console.log(
          'This network is not available in your metamask, please add it'
        );
      }
      console.log('Failed to switch to the network');
    }
  }


 async  initializeSuperfluid(){
    this.sf = await Framework.create({
      chainId: this.addressesObject[this.network].chainId,
      provider: this.provider, 
    });

    console.log('superfluid initialized')
  }

  startDaiStream() {}

  startUsdcStream() {}

  async startStream(token: string) {
    let flowRate = utils
      .parseEther('50')
      .div(30 * 24 * 3600)
      .toString();

    try {
      console.log(flowRate);

      let startFlowOperation = this.sf.cfaV1.createFlow({
        overrides: { gasLimit: 1000000 },
        sender: this.signerAddress,
        receiver: '0x718F390819f697075b7d538636148AA97b7bFB09',
        flowRate,
        superToken: '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f',
      });

      let tx = await startFlowOperation.exec(this.signer);
      let result = await tx.wait();

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  ngAfterViewInit() {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');

      this.connectMetamask();
    }
  }
}
