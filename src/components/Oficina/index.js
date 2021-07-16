import React, { Component } from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Utils from "../../utils";
import contractAddress from "../Contract";

export default class EarnTron extends Component {
  constructor(props) {
    super(props);

    this.state = {
      direccion: "",
      link: "Haz una inversión para obtener el LINK de referido",
      registered: false,
      balanceRef: 0,
      totalRef: 0,
      invested: 0,
      paidAt: 0,
      my: 0,
      withdrawn: 0,
      id: 0,
      parners: 0,
      totalTrx: 0,
      price: 0

    };

    this.Investors = this.Investors.bind(this);
    this.Link = this.Link.bind(this);
    this.withdraw = this.withdraw.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    setInterval(() => this.Link(),1*1000);

    setInterval(() => this.Investors(),2*1000);
  };

  async Link() {

    let mydireccion = await window.tronWeb.trx.getAccount();
      mydireccion = window.tronWeb.address.fromHex(mydireccion.address);

      var user = await Utils.contract.users(mydireccion).call();

    if( await Utils.contract.isUserExists(mydireccion).call() ){

      let loc = document.location.href;
      if(loc.indexOf('?')>0){
        loc = loc.split('?')[0]
      }
      

      mydireccion = loc+'?ref='+parseInt(user.id._hex);
      this.setState({
        link: mydireccion,
        id: parseInt(user.id._hex),
        parners: parseInt(user.partnersCount._hex)
      });
    }else{
      this.setState({
        link: "Haz una inversión para obtener el LINK de referido",
        id: 0,
        parners: 0
      });
    }
  }
    

  async Investors() {

    var accountAddress =  await window.tronWeb.trx.getAccount();
    accountAddress = window.tronWeb.address.fromHex(accountAddress.address);

    var inicio = accountAddress.substr(0,5);
    var fin = accountAddress.substr(-5);

    var texto = inicio+"..."+fin;

    inicio = contractAddress.substr(0,6);
    fin = contractAddress.substr(-6);

    var texto2 = inicio+"..."+fin;

    var lastLevel = await Utils.contract.LAST_LEVEL().call();

    var totalTrx = 0;

    for (var i = lastLevel; i >= 1; i--) {

      var levelPrice = await Utils.contract.levelPrice(i).call();
      levelPrice = parseInt(levelPrice._hex)/10**6;

      if (await Utils.contract.usersActiveX3Levels(accountAddress, i).call()) {
        
        var matrix = await Utils.contract.usersX3Matrix(accountAddress, i).call();

        if (matrix[1].length > 0) {
          totalTrx +=  matrix[1].length*levelPrice;
        } 
      }
    }

    var proxyUrl = 'https://proxy-wozx.herokuapp.com/';
    var apiUrl = 'https://api.coingecko.com/api/v3/coins/tron';

    const response = await fetch(proxyUrl+apiUrl)
    .catch(error =>{console.error(error)});
    const json = await response.json();

    var price = json.market_data.current_price.usd;
    price = parseInt(price*1000);
    price = price/1000;


    this.setState({
      texto:texto,
      wallet: accountAddress,
      contractAddress: contractAddress,
      texto2: texto2,
      totalTrx: totalTrx,
      price: price

    });

  };

  async withdraw(){
    var cosa = await Utils.contract.withdraw().send();
    console.log(cosa);
  };


  render() {
    var { balanceRef, totalRef, invested,  withdrawn , my, texto, texto2, contractAddress, link, id, parners, price, wallet, totalTrx} = this.state;

    var available = (balanceRef+my);
    available = available.toFixed(6);
    available = parseFloat(available);

    balanceRef = balanceRef.toFixed(6);
    balanceRef = parseFloat(balanceRef);

    totalRef = totalRef.toFixed(6);
    totalRef = parseFloat(totalRef);

    invested = invested.toFixed(6);
    invested = parseFloat(invested);

    withdrawn = withdrawn.toFixed(6);
    withdrawn = parseFloat(withdrawn);

    my = my.toFixed(6);
    my = parseFloat(my);

    return (

      <>
      <div className="col-lg-3 mb-4">
            <div className="border-gradient section-left" id="userEarningBanner">
              <div
                className="border-gradient_content status-panel"
                style={{ "padding-bottom": "1px" }}
              >
              
                <div className="status-panel_id">
                  <a
                    href="javascript:;"
                    className="status-panel__user-id"
                  >
                    ID <span title="Show/Hide">{id}</span>
                  </a>
                  <div className="status-panel_partners__top">
                    <span>{parners}</span>
                    <img src="files/partners_light.png" alt="" />
                  </div>
                </div>
                <div className="status-panel__logo">
                  <img src="files/tronicon2.jpg" />
                </div>
                <div className="status-panel_money">
                  <div className="status-panel_money_total__dollars">
                  <script type="text/javascript">
				                
				            
				                
				            </script>
                    $ {(totalTrx*price).toFixed(2)}
                  </div>
                  <div className="status-panel_money_total__eth" title="(0)">
                    {totalTrx} TRX
                  </div>
                </div>
                
                
              </div>
            </div>
            <div className="section-right">
              <div className="border-gradient">
                <div className="border-gradient_content status-panel_partners pb-5">
                  <div className="status-panel_partners__subject">
                    <div className="status-panel_partners__count">
                      <span>{parners}</span>
                      <img src="files/partners_light.svg" alt="" />
                    </div>
                  </div>
                  <div
                    className="
                    area-text
                    status-panel_partners__link
                    trigger_value__user-refkey
                  "
                    title={link}
                  >
                    <input
                      type="text"
                      value={link}
                      id="refLink"
                      className="copy_alliliate_link"
                      readonly=""
                    />
                  </div>
                  <CopyToClipboard text={link}>
                    
                  <div className="status-panel_partners_copy copy_alliliate_btn">
                    Copy
                  </div>
                  </CopyToClipboard>
                </div>
              </div>
              <div className="border-gradient mt-5">
                <div className="border-gradient_content status-panel_wallets pb-4">
                  <div className="status-panel_wallets__subject">
                    Your TRON wallet
                  </div>
                  <div className="status-panel_wallet">{texto}</div>
                  <a
                    href={"https://tronscan.org/#/address/"+wallet}
                    target="_blank"
                    className="status-panel_wallets__btn"
                    id="copy_tronwallet_link"
                    style={{ left: "6px" }}
                  >
                    TO TRONSCAN
                  </a>
                  <input
                    type="hidden"
                    value={wallet}
                    id="userbase58"
                    name="userbase58"
                  />
                  <CopyToClipboard text={wallet}>
                    <div
                      className="status-panel_wallets__btn copy_tronwallet_btn"
                      style={{ right: "6px" }}
                    >
                      COPY
                    </div>
                  </CopyToClipboard>
                </div>
              </div>
              <div className="border-gradient mt-5">
                <div className="border-gradient_content status-panel_wallets pb-4">
                  <div className="status-panel_wallets__subject">
                    Smart Contract address
                  </div>
                  <div className="status-panel_wallet">{texto2}</div>
                  <a
                    href={"https://tronscan.org/#/address/"+contractAddress}
                    target="_blank"
                    className="status-panel_wallets__btn"
                    style={{ left: "6px" }}
                  >
                    TO TRONSCAN
                  </a>
                  <input
                    type="hidden"
                    value={contractAddress}
                    className="mainContract_btn1"
                    id="dummy"
                    name="dummy"
                  />
                  <CopyToClipboard text={contractAddress}>
                    <div
                      className="status-panel_wallets__btn mainContract_btn"
                      style={{ right: "6px" }}
                    >
                      COPY
                    </div>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </div>

        

      </>
      
    );
  }
}
