import { AfterViewInit, Component } from '@angular/core';
import { Framework } from '@superfluid-finance/sdk-core';
import { ethers, utils } from "ethers";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'v1';

  receiverAddress = '';

  signer: ethers.providers.JsonRpcSigner;
  provider: ethers.providers.Web3Provider;
  sf: Framework;
  signerAddress: string;


  addressesObject =  {
    mumbai: { usdc: '', dai:'' , chainId:80001, chainIdHex:'0x13881'},
    polygon: { usdc: '', dai:'' , chainId:137, chainIdHex:'0x89'}

  }  

async connectMetamask(){
 this.provider = new ethers.providers.Web3Provider(window.ethereum)

 this.signer = this.provider.getSigner()



this.signerAddress = await this.signer.getAddress();
 
this.changeNetwork()

}

async changeNetwork() {
  try {

    this.sf = await Framework.create({
      chainId: 80001, //i.e. 137 for matic
      provider: this.provider // i.e. the provider being used
    });


    const { chainId } = await this.provider.getNetwork()

    // await window.ethereum.request({
    //   method: 'wallet_switchEthereumChain',
    //   params: [{ chainId: "0x13881"}],
    // });
  console.log("You have succefully switched to Binance Test network")


console.log(chainId) // 42
  } catch (switchError) {
    console.log(switchError);
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
     console.log("This network is not available in your metamask, please add it")
    }
    console.log("Failed to switch to the network")
  }
}


async startStream(){

  let flowRate = (utils.parseEther("50").div(30*24*3600).toString());


  try {
  
  console.log(flowRate)

  let startFlowOperation = this.sf.cfaV1.createFlow({
    overrides:{ gasLimit:1000000},
    sender:this.signerAddress, receiver:"0x718F390819f697075b7d538636148AA97b7bFB09", flowRate, superToken:"0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f"})

  let tx = await startFlowOperation.exec(this.signer);
let result =  await tx.wait();

    console.log(result)
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


