import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Web3 from "web3";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Connect = () => {
  const [accounts, setAccounts] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    let values = await web3.eth.getAccounts();

    for (let i in values) {
      let bal = await web3.eth.getBalance(values[i]);
      bal = Web3.utils.fromWei(bal, "ether");

      setAccounts((prev) => [
        ...prev,
        {
          id: i,
          account: values[i],
          bal: bal,
        },
      ]);
    }
  };

  return (
    <>
      <h1>Hi, Get to know the active accounts!</h1>
      <br />

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ACCOUNT ADDRESS</StyledTableCell>
              <StyledTableCell align="right">BALANCE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((row) => (
              <StyledTableRow key={row.account}>
                <StyledTableCell component="th" scope="row">
                  {row.account}
                </StyledTableCell>
                <StyledTableCell align="right">{row.bal} Ether</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Connect;
