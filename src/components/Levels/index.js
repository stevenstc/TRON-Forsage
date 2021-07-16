import React, { Component } from "react";
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
      withdrawn: 0

    };

    this.Investors = this.Investors.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.deposit = this.deposit.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);

    await this.Investors();
    setInterval(() => this.Investors(),2*1000);
  };

    

  async Investors() {

    var direccion = await window.tronWeb.trx.getAccount();
    direccion = window.tronWeb.address.fromHex(direccion.address);

    var lastLevel = await Utils.contract.LAST_LEVEL().call();

    var canasta = [];

    for (var i = lastLevel; i >= 1; i--) {

      var levelPrice = await Utils.contract.levelPrice(i).call();
      levelPrice = parseInt(levelPrice._hex)/10**6;

      if (await Utils.contract.usersActiveX3Levels(direccion, i).call()) {
        
        var matrix = await Utils.contract.usersX3Matrix(direccion, i).call();

        var partners;

        if (matrix[1].length%3 !== 0) {

          if (matrix[1].length%3 === 2){

            partners = (
              <>
                <div className="matrix-children__active" style={{"background-color": "var(--color-lightblue)"}}></div>
                <div className="matrix-children__active" style={{"background-color": "var(--color-lightblue)"}}></div>
                <div className="matrix-children__nonactive"></div>

              </>

            );
            
          }else{

            partners = (
              <>
                <div className="matrix-children__active" style={{"background-color": "var(--color-lightblue)"}}></div>
                <div className="matrix-children__nonactive"></div>
                <div className="matrix-children__nonactive"></div>

              </>

            );
          }
          
        } else {

          partners = (
            <>
              <div className="matrix-children__nonactive"></div>
              <div className="matrix-children__nonactive"></div>
              <div className="matrix-children__nonactive"></div>

            </>

          );
          
        }
        
        canasta[i] = (
          <div className="ternary" key={"level"+i}>
                      <a
                        href="/"
                        className="ternary-root matrix-root__active"
                      >
                        <span className="matrix-level matrix-level__active">
                          {i}
                        </span>
                        <span className="matrix-price"> {levelPrice} </span>
                        <span
                          className="level-locked"
                          id="pre_levelx3_warning_1"
                          style={{"display": "none"}}
                        >
                          <img
                            src="files/alert.svg"
                          />
                        </span>
                      </a>
                      <div className="ternary-children">
                        {partners}
                      </div>
                      <div className="ternary-branchs">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="matrix-break"></div>
                      <div
                        className="matrix-info x3_get_level_data"
                        id={"x3_loop_"+i}
                        x3_data_plan="1"
                        x3_data_level={i}
                        style={{"cursor": "pointer"}}
                      >
                        <div className="matrix_partners__count">
                          <span><level_members>{matrix[1].length}</level_members></span>
                          <i className="matrix-icon_users"></i>
                        </div>
                        <div className="matrix_reinvest">
                          <span><level_cycles>{parseInt(matrix[1].length/3)}</level_cycles></span>
                          <i className="matrix-icon_sync"></i>
                        </div>
                      </div>
                    </div>

           );

      }else{

        canasta[i] = (
          <div className="ternary" key={"level"+i}>
                      <div
                        className="ternary-root matrix-root__nonactive"
                        onClick={() => this.deposit()}
                        tittle="Click to buy next level"
                        style={{"cursor":"pointer"}}
                      >
                        <span className="matrix-level matrix-level__active">
                          {i}
                        </span>
                        <span className="matrix-price"> {levelPrice} </span>
                        <span
                          className="level-locked"
                          id="pre_levelx3_warning_1"
                          style={{"display": "none"}}
                        >
                          <img
                            src="files/alert.svg"
                          />
                        </span>
                      </div>
                      <div className="ternary-children">
                        <div className="matrix-children__nonactive"></div>
                        <div className="matrix-children__nonactive"></div>
                        <div className="matrix-children__nonactive"></div>
                      </div>
                      <div className="ternary-branchs">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="matrix-break"></div>
                      <div
                        className="matrix-info x3_get_level_data"
                        id={"x3_loop_"+i}
                        x3_data_plan="1"
                        x3_data_level={i}
                        style={{"cursor": "pointer"}}
                      >
                        <div className="matrix_partners__count">
                          <span><level_members>0</level_members></span>
                          <i className="matrix-icon_users"></i>
                        </div>
                        <div className="matrix_reinvest">
                          <span><level_cycles>0</level_cycles></span>
                          <i className="matrix-icon_sync"></i>
                        </div>
                      </div>
                    </div>

           );

      }


      
    }


 



    this.setState({
      canastas:canasta

    });

  };

  async deposit() {
  

    var accountAddress = await window.tronWeb.trx.getAccount();
    accountAddress = window.tronWeb.address.fromHex(accountAddress.address);

    var lastLevel = await Utils.contract.LAST_LEVEL().call();

    var activeLevels = 0;

    for (var i = lastLevel; i >= 0; i--) {

      if (await Utils.contract.usersActiveX3Levels(accountAddress, i).call()) {
        activeLevels++ ;
      }
      
    }

    var amount = await Utils.contract.levelPrice(activeLevels+1).call();
    amount = parseInt(amount._hex)/10**6;


    var balanceInTRX = await window.tronWeb.trx.getBalance(); //number
    balanceInTRX = balanceInTRX/10**6;//number

    console.log(balanceInTRX);

    var owner = await Utils.contract.doner().call();

    var direccionSP = window.tronWeb.address.fromHex(owner);


    if ( balanceInTRX >= 50 && balanceInTRX >= amount){

      var loc = document.location.href;
      if(loc.indexOf('?')>0){

        loc = loc.split('?')[1];
        loc = loc.split('=')[1];


            var inversor = await Utils.contract.idToAddress(loc).call();

            if ( await Utils.contract.isUserExists(inversor).call() ) {

              direccionSP = window.tronWeb.address.fromHex(inversor);
            
            }
          
        }

        if ( amount >= 350 ){


          if ( await Utils.contract.isUserExists(accountAddress).call() ) {


            await Utils.contract.buyNewLevel(1, activeLevels+1).send({ callValue: amount*10**6});


          }else{

            await Utils.contract.registrationExt(direccionSP).send({ callValue: 2*amount*10**6});

          }

        }else{
          window.alert("Please enter an amount greater than 200 TRX");
        }

        

    }else{

      
      if (amount > 200 && balanceInTRX > 250) {

        if ( amount > balanceInTRX) {
          if (balanceInTRX <= 50) {
            window.alert("You do not have enough funds in your account you place at least 250 TRX");
          }else{
            window.alert("You must leave 50 TRX free in your account to make the transaction");
          }
          
          

        }else{

          window.alert("You must leave 50 TRX free in your account to make the transaction");
          
        }
      }else{
        window.alert("You do not have enough funds in your account you place at least 250 TRX");
      }
    }
    
  };

  async withdraw(){
    var cosa = await Utils.contract.withdraw().send();
    console.log(cosa);
  };


  render() {
    var { balanceRef, totalRef, invested,  withdrawn , my, direccion, link} = this.state;

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


            {this.state.canastas}
                   

      </>
      
    );
  }
}
