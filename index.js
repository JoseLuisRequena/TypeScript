class Room {

    constructor({name, bookings, price, discount}){
        this.name = name;
        this.bookings = bookings;
        this.price = price;
        this.discount = discount;
    }

    isOccupied(date){
        if(this.bookings.length){
            for(let i = 0 ; i < this.bookings.length; i++){
                if(date >= this.bookings[i].checkIn && date <= this.bookings[i].checkOut){
                    return this.bookings[i].name
                }
            }
        }
        return false;
    }

    occupancyPercentage(startDate, endDate){
        //poblar un array con los dias seleccionados
        if (this.bookings.length){
            const ArrayDatesSerch = arrayDate (startDate, endDate);
            let daysOccupancy = [];

            for(let day of ArrayDatesSerch){
                this.isOccupied(day) ? daysOccupancy.push(day) : 0;
            }
            const OccupancyPercentage = (daysOccupancy.length * 100) / ArrayDatesSerch.length;
            
            return OccupancyPercentage;
        }
        return 0;
    }
}

class Booking {
    constructor({name, email, room, checkIn, checkOut, discount} ){
        this.name = name;
        this.email = email;
        this.room = room;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.discount = discount;
    }

    get fee(){
        
        return ;
        //returns the fee, including discounts on room and guest
        //devuelve la tarifa, incluidos los descuentos en la habitación y el invitado
    }
}

function totalOccupancyPercentage(rooms, startDate, endDate) { 
    if(rooms.length){
        const ArrayDatesSerch = arrayDate(startDate, endDate);
        let daysOccupancy = [];
        
        for(let room of rooms){
            for(let day of ArrayDatesSerch){
                room.isOccupied(day) ? daysOccupancy.push(day) : 0;
            }
        }
        const TotalOccupancyPercentage = (daysOccupancy.length * 100) /(ArrayDatesSerch.length * rooms.length);
        
        return TotalOccupancyPercentage;
    } 
    return 0;
} 

function availableRooms(rooms, startDate, endDate){
    if(rooms.length){
        const ArrayDatesSerch = arrayDate(startDate, endDate);
        let unoccupiedRooms = [];
        
        for(let room of rooms){
            let daysOccupancy = [];
            for(let day of ArrayDatesSerch){
                room.isOccupied(day) ? daysOccupancy.push(day) : 0;
            }
            
            if(!daysOccupancy.length){
                unoccupiedRooms.push(room.name);
            }
        }
        return unoccupiedRooms;
    } 
    return false;
}

//Calcular el rango de días a comprobar
function arrayDate(startDate, endDate){
    let ArrayDates = [];

    while(startDate < endDate){
        ArrayDates = [...ArrayDates, new Date(startDate)];
        startDate.setDate(startDate.getDate() + 1);
    }
    return ArrayDates;
}

module.exports = { Room, Booking, totalOccupancyPercentage, availableRooms };