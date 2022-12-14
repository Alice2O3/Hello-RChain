# Hello-RChain

This demo will show a hello-world example on how to send and receive messages through two remote machines by RChain, which makes it a real dApp.

RChain version: v0.13.0-alpha3

RChain and node_modules are included in this project to make it user-friendly to use.

## Prerequisites

1. Two or more virtual machines with linux on the same host machine (using NAT port forwarding)

2. All virtual machines should have nodejs installed: [https://nodejs.org/en/](https://nodejs.org/en/) (currently version 18.12.1 LTS)

## Usage

1. Fetch the project on all virtual machines:

    ```bash
    git clone https://github.com/Alice2O3/Hello-RChain.git
    ```

2. Use npm to download the dependencies (if node_modules is not available):

    ```bash
    npm install
    ```

3. Let's call the machine using standalone node as machine A, and the one using bootstrap node as machine B. The default directory to store data is `rnode0`. In the standalone node, you need to configue `rnode0/bonds.txt` and `rnode0/wallets.txt`.

    Here are public/private key pairs for `rnode0/bonds.txt` (can be auto-generated by RChain):

    ```txt
    Public key: 04d01c03c0022e43390639fe67d625504b4402e08b9016276dd0792edb25c64c56e9a07c402f830415cce99d8afe88e197612cf0fcb69016ce3f6a483dc91923ae
    Private key: 718433da2d488df419cf50163c78c795785d277921937cf00024f3a4eac10ff9

    Public key: 047d92364b25cc28ee397b9ad147a931e88b044f934e31f6fe8ae5cddc2ebb616df7f0f388363929d261a04400f608f3d078f064b039a634b736d999da7a386f92
    Private key: 4670a36acb2e7af8784228ee8b51032125c0a5750e3ea7929be106f495f427fa

    Public key: 0431cdf19efba3eb6cbf459905dff5a7437376e0b0099e799a948fe3ceaf4335c37ddf36ec9289c4ed72e6d4e9c0dc8b8ba79fbfab93c57c385afe7dcd3d811d60
    Private key: 3d05b1e8cf4f3237c56176a626f2cb32d7b1c47ded625dcf7840c01b0f9ed050

    Public key: 0448b1942cb06835149ecbe76e32f2f59b40042daf5f7754e28612de4443b436dcd154c2c4d0dca87ba8050330169550f9ac65343094168aaa6947fe65ac93d671
    Private key: 75b2093b371e480a368e87655b6bdf1eea648c58f016ef78b11d72237bed7976

    Public key: 04570e5edfdcc574318a72d46efe688f96d5f0b942fb94b60a51a332d144dc459b0231239501b91e38d655b68c51e9e0fd49b62e961d2d69c5404bed7c804620d3
    Private key: 982b208ea6567daed5ed099da0ef695f264335453ad5a459271e92f79fd59289
    ```

    Here are the private key and corrsponding public key, REV and wallet files for `rnode0/wallets.txt` (generated by [https://tgrospic.github.io/rnode-client-js/](https://tgrospic.github.io/rnode-client-js/), used for deploys):

    ```txt
    Private key: 6b2c9887ce24094087896a0fa3c64e3faec8ad06f16fbe72da3a44463aeca8a9
    Public key: 045fe473dfecbf8f2c9043ce85380423f860e551c701078879f76b0ab5519074e5f1eac8ea7ebf4d503b36733e388a1774b01b3a8f93d2010a9b66202b97c45ed7
    ETH: cc6c8507b319a2fb520ee563413f9e43cc070521
    REV: 11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c
    ```

4. In machine A, configure `config.conf` as follows:

    - Set `standalone = true`
    - Set `host` in `protocol-server` and `peers-discovery` as your NAT ip address of machine A (can be shown by `ip addr`, in my case `192.168.152.130`)
    - Set `validator-private-key` in `casper` as any of the private keys above in `rnode0/bonds.txt`
    - Since we want all of the nodes in this network to propose blocks at any time, we need to set `synchrony-constraint-threshold = 0`

5. Delete everything inside `rnode0` (except for `rnode0/genesis`), then run the following command in machine A to start rnode:

    ```bash
    npm run rnode
    ```

    At the same time, keep track of the link listening my machine A:

    ```txt
    rnode://bc5f4a30b5002cf8fcf4b29223ff0f3ec2656452@192.168.152.130?protocol=40400&discovery=40404
    ```

6. In another terminal, run the following command to deploy the main contract for the blockchain:

    ```bash
    npm run deploy
    ```

7. In machine B, configure `config.conf` as follows:

    - Set `standalone = false`
    - Set `host` in `protocol-server` and `peers-discovery` as your NAT ip address of machine B (can be shown by `ip addr`, in my case `192.168.152.129`)
    - Set `bootstrap` in `protocol-client` as the link listening by node in machine A (in my case `rnode://bc5f4a30b5002cf8fcf4b29223ff0f3ec2656452@192.168.152.130?protocol=40400&discovery=40404`)
    - Set `validator-private-key` in `casper` as any of the private keys above in `rnode0/bonds.txt`, (and it should not be the same as the one in machine A)
    - Again we need to set `synchrony-constraint-threshold = 0`

8. Delete everything inside `rnode0`, then run the following command in machine B to start rnode and make it bootstrap from the node in machine A:

    ```bash
    npm run rnode
    ```

9. In another terminal, run the following command for all virtual machines to start nodejs server:

    ```bash
    npm run server
    ```

10. Input `localhost:8080` for all virtual machines with your browser, and you can see an input box and two buttons `GetInfo` and `SetInfo`.

11. Press `GetInfo` to fetch data from RChain and show it in the input box, press `SetInfo` to write data to RChain. Debug messages are shown in the console.

12. You can write anything you want and press `SetInfo` in machine A(B), then press `GetInfo` in machine B(A) to get the data, which shows the minimal data-transmission abilities of RChain.

13. Have Fun!

## Credits

RChain project: [https://github.com/rchain/rchain](https://github.com/rchain/rchain)

RChain key-pair generator: [https://tgrospic.github.io/rnode-client-js/](https://tgrospic.github.io/rnode-client-js/)

RChain-toolkit (from my knowledge it's the only working RChain api for v0.13.0-alpha3, so great thanks): [https://github.com/fabcotech/rchain-toolkit](https://github.com/fabcotech/rchain-toolkit)
