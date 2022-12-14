import { AfterViewInit, Component } from '@angular/core';
import { Framework } from '@superfluid-finance/sdk-core';
import { ethers, utils } from 'ethers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  receiverAddress = '0xd76ab75795c001d0ad98d7f51f4460ea0b933834';

  signer: ethers.providers.JsonRpcSigner;
  provider: ethers.providers.Web3Provider;
  sf: Framework;
  signerAddress: string;

  network: 'mumbai' | 'polygon' = 'mumbai';

  //// state
  loading: boolean = true;
  metamask: boolean = false;
  connected: boolean = false;
  stream_state: 'none' | 'starting' | 'success' | 'error' = 'none';

  //// Required addressess SuperTokens and
  addressesObject = {
    mumbai: {
      usdc: '0x42bb40bF79730451B11f6De1CbA222F17b87Afd7',
      dai: '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f',
      chainId: 80001,
      chainIdHex: '0x13881',
    },
    polygon: {
      usdc: '0xCAa7349CEA390F89641fe306D93591f87595dc1F',
      dai: '0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2',
      chainId: 137,
      chainIdHex: '0x89',
    },
  };

  ////// Check if metamask once the dom isloaded
  ngAfterViewInit() {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      this.metamask = true;
      this.loading = false;
    }
  }

  ///// if metamask available connect
  async connectMetamask() {
    try {
      this.connected = true;

      this.provider = new ethers.providers.Web3Provider(window.ethereum);

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      this.signer = this.provider.getSigner();

      this.signerAddress = await this.signer.getAddress();

      console.log('metamask is connected');

      this.changeNetwork();
    } catch (error) {
      this.connected = false;
    }
  }

  ///// Change network if not
  async changeNetwork() {
    try {
      const { chainId } = await this.provider.getNetwork();

      if (this.addressesObject[this.network].chainId !== chainId) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: this.addressesObject[this.network].chainIdHex }],
        });
        console.log('You have switched network');

        this.initializeSuperfluid();
      } else {
        this.initializeSuperfluid();
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

  //// Superfluid sdk-core initialized
  async initializeSuperfluid() {
    this.sf = await Framework.create({
      chainId: this.addressesObject[this.network].chainId,
      provider: this.provider,
    });

    console.log('superfluid initialized');
  }

  //// Start Stream
  async startStream(token: string) {
    this.stream_state = 'starting';
    let flowRate = utils
      .parseEther('50')
      .div(30 * 24 * 3600)
      .toString();

    try {
      this.loading = true;

      let superToken = this.addressesObject[this.network][token];
      console.log('sender: ', this.signerAddress);
      console.log('flowRate: ', flowRate);
      console.log('superToken: ', superToken);

      let startFlowOperation = this.sf.cfaV1.createFlow({
        overrides: { gasLimit: 1000000 },
        sender: this.signerAddress,
        receiver: this.receiverAddress,
        flowRate,
        superToken: superToken,
      });

      let tx = await startFlowOperation.exec(this.signer);
      await tx.wait();

      this.stream_state = 'success';
      this.loading = false;
      console.log(`${token}stream created successfully!`);
    } catch (error) {
      this.stream_state = 'error';
      this.loading = false;
      console.log(error);
      console.log('oops something went wrong');
    }
  }
}
