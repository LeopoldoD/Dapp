import React, { Component } from 'react'
import {resdriving, resmyrides} from './MyRidesFormActions'
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import {getMyRides} from './MyRidesFormActions'
import MyRidesFormContainer from './MyRidesFormContainer'
/*

class MyRidesForm extends Component {

  handleSubmit(event) {
    event.preventDefault()
      this.props.onGetMyRidesSubmit();
  }

  render() { console.log('Rendering Myridesform');

    return(
      <div>
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>

          <button type="submit" className="pure-button pure-button-primary">Get Rides</button>

        </fieldset>
      </form>
      </div> 

    )
  }
}

*/

/*

class RidesList extends Component{
  constructor(props){
    super(props)

    this.state = {
      alldriving: '',
      allmyrides: '',
      loaded: false,
    }
    this.handleData = this.handleData.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()
      this.props.onGetMyRidesSubmit();

  }

  handleData(){
    this.state = {
      alldriving: resdriving,
      allmyrides: resmyrides,
      loaded: true,
    }
    console.log('Data loaded');
  }
  
  getInitialState (){
    return({hidden : "hidden"});
  }

  componentWillMount() {
    console.log('Mounting data');
    this.props.onGetMyRidesSubmit();
    
    var that = this;
        setTimeout(function() {
            that.show();
        }, that.props.wait);
        
      //this.setState({alldriving : resdriving, allmyrides: resmyrides});
  }

  componentWillUnmount() {
    console.log('Unmounting data');
        this.state = {
          alldriving: '',
          allmyrides: '',
        }
     }
  show() {
    this.setState({hidden : ""});
  }

   render() {  console.log('Rendering RidesList');
    this.handleData();
    const driving = this.state.alldriving;  
    const myrides = this.state.allmyrides; 
    console.log(driving);
    console.log(myrides);

    return(      
      <div className={this.state.hidden}>
      <h1>Hola3</h1>
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
*/
