import React, { Component } from 'react'
import {resdriving, resmyrides} from './MyRidesFormActions'
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import {getMyRides} from './MyRidesFormActions'
import MyRidesFormContainer from './MyRidesFormContainer'


class RidesList extends Component{
  constructor(props){
    //console.log('First');
    super(props)
    this.state = {
      alldriving: '',
      allmyrides: '',
    }
  }

  handleSubmit(event) {
    event.preventDefault()
      this.props.onGetMyRidesSubmit();
  }

   render() { 
    //console.log('Second');

    /*
    getMyRides(function(res, res2){
      console.log(res);
      console.log(res2);
      this.state.alldriving = res;
      this.state.allmyrides = res2;
      console.log('Finising update');
    });
*/
    this.state.alldriving = resdriving;
    this.state.allmyrides = resmyrides;
    const driving = this.state.alldriving;  
    const myrides = this.state.allmyrides; 
    console.log(driving);
    console.log(myrides);

    return(      
      <div>
        <ReactTable
         data={driving}
         noDataText="You have no rides as a driver"
          columns={[
            {
              Header: "I'm driving",
              columns: [
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
                  Header: "Total seats",
                  accessor: "seats",
                },
                {
                  Header: "Available seats",
                  accessor: "availableseats",
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

         <ReactTable
         data={myrides}
         noDataText="You have no rides as a passenger"
          columns={[
            {
              Header: "My rides",
              columns: [
                {
                  Header: "Driver",
                  accessor: "drivername",
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
                  Header: "Total seats",
                  accessor: "seats",
                },
                {
                  Header: "#Seats",
                  accessor: "availableseats",
                },
                {
                  Header: "Cost per person",
                  accessor: "cost",
                },
              ]
            },{
              Header: "Contact Details",
              columns: [
                {
                  Header: "Phone",
                  accessor: "driverphone",
                },{
                  Header: "Email",
                  accessor: "driveremail",
                },
              ]
            }
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
        />
        <br />
        <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>

          <button type="submit" className="pure-button pure-button-primary">Get Rides</button>

        </fieldset>
      </form>
      </div>); 
}
}

export default RidesList

