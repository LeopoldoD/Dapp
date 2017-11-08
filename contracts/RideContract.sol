pragma solidity ^0.4.2;

import "./zeppelin/lifecycle/Killable.sol"; 

contract RideContract is Killable {

    struct User {
        bytes32 name;
        bytes32 email;
        uint phone;
    }

    struct Ride {
        uint id;
        string from;
        string to;
        bytes32 date;
        bytes32 time;
        string meetingpoint;
        uint seats;
        uint availableseats;
        uint cost;
        address driver;
        address[] riders;
        uint balance;
        uint prebookbalance;
    }

    struct Member {
        uint[] driving; // new
        uint[] myrides; // news
    }

    struct Booking {
        uint[] id;
        bool[] paid;
        uint[] rideid;
        uint[] seats;
        uint[] totalcost;
    }

    uint private searchid;
    uint private rideID;
    uint private bookingID;
    uint[] private rideinstances;
    address[] private regmembers;
    uint private coolcounter;
    uint private coolcounter2;
    uint private coolcounter3;
    uint private coolcounter4;
    uint private error;

    mapping (uint => Ride) private rides; 
    mapping (address => Member) private members;
    mapping (address => User) private users;
    mapping (address => Booking) private bookings;

  // AUTHENTICATION PART
    function login() public constant returns (bytes32, bytes32, uint) {
    // Check if user exists.
    // If yes, return user.
    // If no, revert().

        if (users[msg.sender].name == 0x0) {
            revert();
        }

        if (users[msg.sender].email == 0x0) {
            revert();
        }

        if (users[msg.sender].phone == 0x0) {
            revert();
        }

        return (users[msg.sender].name, users[msg.sender].email, users[msg.sender].phone); 
    }

    function signup(bytes32 name, bytes32 email, uint phone) public returns (bytes32, bytes32, uint) {
    // Validates data provided by the user, if no data is provided contract stops.
        if (name == 0x0 || email == 0x0 || phone == 0x0) {
            revert();
        }

     // Check if user has an associated account. If yes, returns user information otherwise creates new account.   
        if (users[msg.sender].name == 0x0 || users[msg.sender].email == 0x0 || users[msg.sender].phone == 0x0) {
            users[msg.sender].name = name;
            users[msg.sender].email = email;
            users[msg.sender].phone = phone;
            regmembers.push(msg.sender);

            return (users[msg.sender].name, users[msg.sender].email, users[msg.sender].phone);
        }

        return (users[msg.sender].name, users[msg.sender].email, users[msg.sender].phone);
    }

    function update(bytes32 name, bytes32 email, uint phone) public onlyMembers returns (bytes32, bytes32, uint) {
    // Update user name.

        if (name == 0x0 || email == 0x0 || phone == 0x0) {
            revert();
        }

        if (users[msg.sender].name != 0x0 || users[msg.sender].email != 0x0 || users[msg.sender].phone != 0x0) {
            users[msg.sender].name = name;
            users[msg.sender].email = email;
            users[msg.sender].phone = phone;

            return (users[msg.sender].name, users[msg.sender].email, users[msg.sender].phone);
        }

        revert();
    }

    function getuserinfo (address pubaddress) public onlyMembers constant returns (bytes32, bytes32, uint) {
        uint counter;
        for (counter = 0; counter < regmembers.length; counter++) {
            if (pubaddress == regmembers[counter]) {
                return (users[pubaddress].name, users[pubaddress].email, users[pubaddress].phone);
            }
        }
    }

    function authenticateuser () public returns (address) {
        return (msg.sender);
    }

    function checkmembership () public constant returns (bool) {
        uint iter;

    // Check if user has permissions to receive account information (member of App)
        for (iter = 0; iter < regmembers.length; iter++) {
            if (msg.sender == regmembers[iter]) {
                return true;
            }
        }
        return false;
    }

    modifier onlyMembers() {
        if (!checkmembership()) revert();
        _;
    }

//    Ride Management
    function createnewride(string from, string to, bytes32 date, bytes32 time, uint seats, uint cost, string meetingpoint) public onlyMembers returns (uint) {
    // Check if parameters exist.

        bytes memory checkfrom = bytes(from);
        bytes memory checkto = bytes(to);
        bytes memory checkpoint = bytes(meetingpoint);

        if (checkfrom.length == 0) {
            revert();
        } 

        if (checkto.length == 0) {
            revert();
        } 

        if (checkpoint.length == 0) {
            revert();
        } 

        if (date == 0x0 || time == 0x0 || seats == 0x0 || cost == 0x0) {
            revert();
        }
    
        rideID++;
        rides[rideID-1].id = rideID;
        rides[rideID-1].from = from;
        rides[rideID-1].to = to;
        rides[rideID-1].date = date;
        rides[rideID-1].time = time;
        rides[rideID-1].seats = seats;
        rides[rideID-1].cost = cost;
        rides[rideID-1].balance = seats*cost;
        rides[rideID-1].meetingpoint = meetingpoint;

        rideinstances.push(rideID);
        rides[rideID-1].driver = msg.sender;
        members[msg.sender].driving.push(rideID);

        rides[rideID-1].availableseats = seats;

        return (rideID);

    }

    function createsearchid() public onlyMembers {
        searchid++;
    }

    function getsearchid() public onlyMembers constant returns (uint) {
        return searchid;
    }

    function countresults(string from, string to, bytes32 date, uint id) public onlyMembers constant returns (uint, uint[], uint, uint) {
    // Verify input
        bytes memory checkfrom = bytes(from);
        bytes memory checkto = bytes(to);

        if (checkfrom.length == 0) {
            revert();
        } 

        if (checkto.length == 0) {
            revert();
        } 

        if (date == 0x0 || id == 0x0) {
            revert();
        }

        uint[] memory results = new uint[](10);
        uint total;
        uint iter;
        uint count;
        uint tempid;
        total = rideID;

        for (iter = 0; iter < rideinstances.length; iter++) {
            if (keccak256(from) == keccak256(rides[iter].from) && keccak256(to) == keccak256(rides[iter].to) && rides[iter].date == date) {
                tempid = rides[iter].id;
                results[count] = tempid;
                count++;
            }
        }
        return (count, results, total, id);
    }

    function checkrideid (uint rideID) public onlyMembers constant returns (bool) {
    // Check if RideID is valid/exists
        uint iter;
        for (iter = 0; iter < rideinstances.length; iter++) {
            if (rides[iter].id == rideID) {
                return true;
            }
        }  
    }

    function returnride(uint rideID) public onlyMembers constant returns (uint, string, string, bytes32, bytes32, uint) {
    // Provide ride information
        if (checkrideid(rideID)) {
            return (rides[rideID-1].id, rides[rideID-1].from, rides[rideID-1].to, rides[rideID-1].date, rides[rideID-1].time, rides[rideID-1].seats);
        }      
    }

    function returnride2(uint rideID) public onlyMembers constant returns (address, uint, string, uint) {
     // Provide driver address, seats and meeting point
        if (checkrideid(rideID)) {
            return (rides[rideID-1].driver, rides[rideID-1].availableseats, rides[rideID-1].meetingpoint, rides[rideID-1].cost);
        }
    }

    function returnbooking(uint bookingID) public onlyMembers constant returns (uint, bool, uint, uint, uint) {
    // Provide booking information
        uint counter;
        for (counter = 0; counter < bookings[msg.sender].id.length; counter++) {
            if (bookings[msg.sender].id[counter] == bookingID) {
                return (bookings[msg.sender].rideid[counter], bookings[msg.sender].paid[counter], bookings[msg.sender].seats[counter], bookings[msg.sender].totalcost[counter], bookings[msg.sender].id[counter]); 
            }
        }
    }

    function checkseatsandcost(uint rideID, uint seats) public onlyMembers constant returns (uint, uint) {
        if (!checkrideid(rideID)) {
            revert();
        }
        uint availableseats = rides[rideID-1].availableseats;

        if (seats > availableseats) {
            revert();
        }

        uint totalcost = rides[rideID-1].cost*seats;
        return(availableseats, totalcost);
    } 

    function prebook (uint rideID, uint seats) public onlyMembers {
     // Validate number of seats
        if (seats > rides[rideID-1].availableseats) {
            revert();
        }

     // Check if driver wants to book its own ride
        if (msg.sender == rides[rideID-1].driver) {
            revert();
        }

    // Check if Ride ID is valid    
        if (!checkrideid(rideID)) {
            revert();
        }

        bookings[msg.sender].id.push(bookingID);
        bookings[msg.sender].paid.push(false);
        bookings[msg.sender].rideid.push(rideID);
        bookings[msg.sender].seats.push(seats);

        uint totalcost = seats*rides[rideID-1].cost;
        bookings[msg.sender].totalcost.push(totalcost); 

        rides[rideID-1].prebookbalance += totalcost;
        bookingID++;
    }

    // fallback function
    function () public payable {
        bookride(msg.sender, msg.value);
    }

    function bookride (address payer, uint payment) public onlyMembers payable {
        uint counter;
        uint rideID;
        // Convert from wei to finney
        uint amount = (payment/1000000000000000);

        for (counter = 0; counter < bookings[payer].id.length; counter++) {
            coolcounter++;
            if (bookings[payer].paid[counter] == false) {
                rideID = bookings[payer].rideid[counter];
                coolcounter2++;
                coolcounter3 = rides[rideID-1].prebookbalance;
                coolcounter4 = amount;
                if (rides[rideID-1].prebookbalance >= amount) {
                     // Double check if seats are available   
                    if (bookings[payer].seats[counter] > rides[rideID-1].availableseats) {
                        revert();
                    }
                    // Check if contract has enough balance for transaction
                    if (this.balance < amount) {
                        revert();
                    }
                    // Double check if the balance of the ride is already exceeded
                    if (rides[rideID-1].balance < amount) {
                        revert();
                    }   
                    address to = rides[rideID-1].driver;
                    // Reduce the balance of the ride
                    rides[rideID-1].balance -= amount;
            
                    // update status of booking
                    bookings[payer].paid[counter] = true;
                 
                    // update the number of available seats
                    rides[rideID-1].availableseats -= bookings[payer].seats[counter];

                    // add the address of the rider
                    rides[rideID-1].riders.push(payer);
                    members[payer].myrides.push(rides[rideID-1].id);

                    // Make transference
                    to.transfer(payment);
                }
            }
        }
    }

    function test () public onlyMembers constant returns (uint, uint, uint, uint, uint, uint) {
        return (bookings[msg.sender].id.length, coolcounter, coolcounter2, coolcounter3, coolcounter4, error);
    }

    function getcontractaddress () public onlyMembers constant returns (address) {
        return (this);
    }

    function getrides () public onlyMembers constant returns (uint, uint[], uint, uint[], uint, uint[]) {
        return (members[msg.sender].driving.length, members[msg.sender].driving, members[msg.sender].myrides.length, members[msg.sender].myrides, bookings[msg.sender].id.length, bookings[msg.sender].id);
    }

    function getcontractbalance() public onlyMembers constant returns (uint) {
        return (this.balance);
    }

    function returnOwner() public constant returns (address) {
        return (owner);
    }
}
