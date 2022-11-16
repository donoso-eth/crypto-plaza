import { AfterViewInit, Component } from '@angular/core';
import { Framework } from '@superfluid-finance/sdk-core';
import { ethers, utils } from 'ethers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  receiverAddress = '0xe09E488A6E1B8237b63e028218CCf72a2a398CB1';

  signer: ethers.providers.JsonRpcSigner;
  provider: ethers.providers.Web3Provider;
  sf: Framework;
  signerAddress: string;

  network: 'mumbai' | 'polygon' = 'mumbai';

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

  }

  ///// if metamask available connect
  async connectMetamask() {

  }

  ///// Change network if not
  async changeNetwork() {

  }

  //// Superfluid sdk-core initialized
  async initializeSuperfluid() {

  }


  //// Start Stream
  async startStream(token: string) {
   
  }
}
