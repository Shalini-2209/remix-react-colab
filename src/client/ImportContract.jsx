import React, { useState } from "react";
import Web3 from "web3";
import { StorageABI } from "../storage/abi";
import { TextField, Button, makeStyles } from "@material-ui/core";

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

const RemixContract = new web3.eth.Contract(
  StorageABI,
  "0x0c5AF3158FCd5ADC586944CAf3c81968D9663f7D"
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
  const initialval = 0;

  const [val, setVal] = useState(initialval);
  const [getVal, setGetVal] = useState(false);
  const [getNum, setGetNum] = useState(initialval);

  const setData = async (e) => {
    e.preventDefault();
    // const accounts = await window.ethereum.enable();
    const account = "0x1F03B73d9A8Edb7Ac03a9F75D83bf00177974273";

    const gas = await RemixContract.methods.setValue(val).estimateGas();
    const result = await RemixContract.methods
      .setValue(val)
      .send({ from: account, gas });
    console.log(result);
    setVal(initialval);
  };

  const getData = async (e) => {
    e.preventDefault();
    setGetVal(!getVal);
    const data = await RemixContract.methods.getData().call();
    setGetNum(data);
  };

  const handleClear = () => {
    setVal(initialval);
    setGetNum(initialval);
    setGetVal(false);
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
            <Button variant="contained" onClick={handleClear}>
              Clear
            </Button>
          </div>
          {getVal && <h3>{getNum} is the value that is set.</h3>}
        </header>
      </div>
    </>
  );
};

export default ContractFun;
