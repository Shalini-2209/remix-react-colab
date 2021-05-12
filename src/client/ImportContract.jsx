import React, { useState } from "react";
import Web3 from "web3";
import { StorageABI } from "../storage/abi";
import { TextField, Button, makeStyles } from "@material-ui/core";

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

const RemixContract = new web3.eth.Contract(
  StorageABI,
  "0xd9379868915e6d9C6A83C6eFA85B51A9B4A0d7Ee"
);

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const ContractFun = () => {
  const classes = useStyles();

  const [val, setVal] = useState(0);
  const [getVal, setGetVal] = useState(false);

  const setData = async (e) => {
    e.preventDefault();
    // const accounts = await window.ethereum.enable();
    const account = "0x812338630315076f1bf65024d79000cB8dABFA8f";

    const gas = await RemixContract.methods.setValue(val).estimateGas();
    const result = await RemixContract.methods
      .setValue(val)
      .send({ from: account, gas });
    console.log(result);
  };

  const getData = async (e) => {
    setGetVal(!getVal);
    RemixContract.methods.getData().call().then(console.log);
  };

  return (
    <>
      <h2>Importing contracts from remix - sample!</h2>
      <div className={classes.root}>
        <header className="App-header">
          <TextField
            required
            id="standard-required"
            label="Required"
            value={val}
            placeholder="Enter data to be set"
            onChange={(e) => setVal(e.target.value)}
          />
          <br /> <br />
          <div className={classes.root}>
            <Button variant="contained" color="secondary" onClick={setData}>
              Set Data
            </Button>
            <Button variant="contained" color="primary" onClick={getData}>
              Get Data
            </Button>
          </div>
          {getVal && <h3>{val} is the value that is set.</h3>}
        </header>
      </div>
    </>
  );
};

export default ContractFun;
