import React, { Component } from "react";
import Utils from "../../utils";
import contractAddress from "../Contract";

import cons from "../../cons.js";

export default class EarnTron extends Component {
  constructor(props) {
    super(props);

    this.state = {

      min: 200,
      texto: "Register",
      sponsor: "",
  

    };

    this.deposit = this.deposit.bind(this);
    this.estado = this.estado.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    this.estado();
    setInterval(() => this.estado(),3*1000);
  };

  async estado(){


    var min = 0;

    min = parseInt(min._hex)/1000000;


    this.setState({
      min: min
    });

    //console.log(min);

    

  }


  async deposit() {


    const { min } = this.state;


    var amount = document.getElementById("amount").value;
    amount = parseFloat(amount);

    const balanceInSun = await window.tronWeb.trx.getBalance(); //number
    var balanceInTRX = window.tronWeb.fromSun(balanceInSun); //string
    balanceInTRX = parseFloat(balanceInTRX);//number

    console.log(balanceInTRX);
    console.log(amount);

    var owner = await Utils.contract.owner().call();

    var direccionSP = window.tronWeb.address.fromHex(owner);

    if ( balanceInTRX-50 >= amount ){

      var loc = document.location.href;
      if(loc.indexOf('?')>0){
          var getString = loc.split('?')[1];
          var GET = getString.split('&');
          var get = {};
          for(var i = 0, l = GET.length; i < l; i++){
              var tmp = GET[i].split('=');
              get[tmp[0]] = unescape(decodeURI(tmp[1]));
          }
          
          if (get['ref']) {
            tmp = get['ref'].split('#');

            var inversor = await Utils.contract.idToAddress(tmp[0]).call();

            if ( await Utils.contract.isUserExists(inversor).call() ) {

              direccionSP = window.tronWeb.address.fromHex(inversor);
            
            }
          }     
        }

        this.setState({
          sponsor: direccionSP
        });

        const account =  await window.tronWeb.trx.getAccount();
        var accountAddress = account.address;
        accountAddress = window.tronWeb.address.fromHex(accountAddress);


        if ( amount >= min){

          document.getElementById("amount").value = "";

          if ( await Utils.contract.isUserExists(accountAddress).call() ) {
            await Utils.contract.buyNewLevel(nivel, valor).send();


          }else{

            await Utils.contract.registrationExt(direccionSP, valor).send();

          }

        }else{
          window.alert("Please enter an amount greater than 200 TRX");
          document.getElementById("amount").value = 200;
        }

        

    }else{
      
      if (amount > 200 && balanceInTRX > 250) {

        if ( amount > balanceInTRX) {
          if (balanceInTRX-50 <= 0) {
            document.getElementById("amount").value = 0;
            window.alert("You do not have enough funds in your account you place at least 250 TRX");
          }else{
            document.getElementById("amount").value = balanceInTRX-50;
            window.alert("You must leave 50 TRX free in your account to make the transaction");
          }
          
          

        }else{

          document.getElementById("amount").value = amount-50;
          window.alert("You must leave 50 TRX free in your account to make the transaction");
          
        }
      }else{
        window.alert("You do not have enough funds in your account you place at least 250 TRX");
      }
    }
    
  };


  render() {

    var { min } = this.state;

    min = "Min. "+min+" TRX";


    
    return (
      

        <div>
          <h6 className="text-center">
            Return: <strong>200%</strong><br />
          </h6>

          <div className="form-group text-center">
            <input type="number" className="form-control mb-20 text-center" id="amount" placeholder={min}></input>
            <p className="card-text">You must have ~ 50 TRX to make the transaction</p>

            <button  onClick={() => this.deposit()} >Buy new level</button>

            
            
          </div>
          
        </div>
      

    );
  }
}
