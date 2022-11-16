# Crypto Plaza Workshop 17/11/20

This project is created for the Workshop within the frame of the Crypto Plaza Forum
<h4 style="width:100%"><img align="center" height="200" src="src/assets/images/crypto_plaza.png"></h4>

## Description

We are going to cerate a very simple Angular dApp  that will connect using Metamask to the Blockchain and through the Superfluid Core Sdk we will crearte a stream of tokens to a specific 


## Hands On

Please go to following repo:
[https://github.com/donoso-eth/crypto-plaza](https://github.com/donoso-eth/crypto-plaza)

<h4><img align="center" height="200" src="src/assets/images/chart.png"></h4>

... now we can clone the repo and install

---

### Set Up

```git clone https://github.com/donoso-eth/crypto-plaza.git```

```cd crypto-plaza```

``` npm i```

---

### Step 1

Please open a second terminal
In the first terminal please checkout the first step

```git checkout step-1```

In the second please start the angular server, if you have already installed the angular cli, simply:

```ng serve```

In the case that you don't have the angular cli installed, you can spin the server locally with

```node_modules/.bin/ng serve```

alternatively you can use ```npx ng serve```

We have so far only the intro screen from angular. Let's go to the next step to build the skeleton of out dapp

---

### Step 2 Metamask Connection

```git ckecout step-2```

We will start adding the connection to metamask

---

### Step 3 Superfluid 

```git ckecout step-3```

Wew will initialize the superfluid framework and start the streams

---

### And Voilà

we have build and deploy our dApp to: [https://crypto-plaza.web.app](https://crypto-plaza.web.app)
<h4 style="width:100%"><img align="center" height="200" src="src/assets/images/web.png"></h4>

---

 

### Previous Steps

```ng new crypto-plaza```

```npm i ethers```

```npm i @superfluid-finance/sdk-core```

Add typings.d.ts types file at source folder

```
interface Window {
  ethereum: any
}
```

add the following property to the tsconfig.json ```"skipLibCheck": true,```





