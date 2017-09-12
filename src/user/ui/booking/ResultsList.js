import React, { Component } from 'react'
import {results} from '../searchform/SearchFormActions'
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class ResultsList extends Component{
  constructor(props){
    super(props)
    this.state = {
      allresults: results,
      //resnumber : this.state.allresults.length,
    }
  }

   render() { 
    const data = this.state.allresults;  
    //const number = this.state.allresults.length;

    return(      
      <div>
        <ReactTable
         data={data}
         noDataText="No results found, try a different search"
          columns={[
            {
              Header: "Results",
              columns: [
                {
                  Header: "Option",
                  accessor: "resultnumber",
                },
                {
                  Header: "Driver",
                  accessor: "driver",
                },
                {
                  Header: "From",
                  id: "from",
                  accessor: d => d.from
                },
                {
                  Header: "To",
                  accessor: "to",
                },
                {
                  Header: "Date",
                  accessor: "date",
                },
                {
                  Header: "Time",
                  accessor: "time",
                },
                {
                  Header: "#Seats",
                  accessor: "seats",
                },
                {
                  Header: "Cost per person",
                  accessor: "cost",
                },
              ]
            },
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
        />
        <br />
      </div>);
}
}

export default ResultsList

