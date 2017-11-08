import React, { Component } from 'react'
import {resdriving, resmyrides} from './MyRidesFormActions'
import ReactTable from "react-table";
import "react-table/react-table.css";

class MyRidesForm extends Component {
   constructor(props){

    super(props)
    this.state = {
      loaded: '',
    }
    this.handleRender = this.handleRender.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()
      this.props.onGetMyRidesSubmit();
  }
  handleRender (event){
    event.preventDefault()
    this.props.onGetMyRidesSubmit();
  }

  render() { console.log('Myridesform');
       // this.handleRender();
    return(
      <div>
      <RidesList wait={3000} testfunc={this.props.onGetMyRidesSubmit()}/>      
      </div> 
 
    )
  }
}



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
    this.props.testfunc;
    
    var that = this;
        setTimeout(function() {
            that.show();
        }, that.props.wait);
        
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
                {
                  Header: "Meeting Location",
                  accessor: "meetingpoint",
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
                  Header: "Booked Seats",
                  accessor: "seatsbooked",
                },
                {
                  Header: "Status",
                  accessor: "status",
                },
                {
                  Header: "Total Paid",
                  accessor: "paid",
                },
                {
                  Header: "Meeting Location",
                  accessor: "meetingpoint",
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
      </div>); 
}
}





export default MyRidesForm
